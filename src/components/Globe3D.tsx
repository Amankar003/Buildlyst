"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

export default function Globe3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    if (width === 0) width = 450;
    if (height === 0) height = 450;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    
    // Adjust camera distance dynamically based on screen width to prevent mobile cropping
    if (width < 500) {
      camera.position.z = 21; // Move camera further back on small phone screens
    } else if (width < 768) {
      camera.position.z = 18; // Medium screens
    } else {
      camera.position.z = 15; // Standard desktop distance
    }

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent background for bloom
    container.appendChild(renderer.domElement);

    // Setup Post-Processing (Bloom) - adjusted for a softer, premium glow
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      1.0, // toned down strength
      0.5, // radius
      0.25 // threshold
    );
    bloomPass.threshold = 0.25;
    bloomPass.strength = 1.0; // reduced from 4.0 to stop over-exposure
    bloomPass.radius = 0.6;

    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeGroup.rotation.z = (23.5 * Math.PI) / 180;

    // 1. The Glass Sphere
    const sphereGeo = new THREE.SphereGeometry(4.8, 64, 64);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x050505,
      transparent: true,
      opacity: 0.0,
      roughness: 0.1,
      transmission: 0.9,
      thickness: 0.5,
    });
    globeGroup.add(new THREE.Mesh(sphereGeo, glassMat));

    // 2. Atmospheric Rim Light - Changed to brand Violet (0x8a2387) for a dual-tone cyan/purple effect
    const rimMat = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0x8a2387) },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying vec3 vNormal;
        void main() {
            float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 4.0);
            gl_FragColor = vec4(color, intensity * 0.35);
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    globeGroup.add(new THREE.Mesh(new THREE.SphereGeometry(5.05, 64, 64), rimMat));

    // 3. Real Continents (Texture Sampling) - Toned down color to cyan
    const dotsGeo = new THREE.BufferGeometry();
    const dotsMat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0x00bfff) }, // Cyan-blue continent dots
      },
      vertexShader: `
        attribute float aOpacity;
        varying float vOpacity;
        varying vec3 vNormal;
        void main() {
            vOpacity = aOpacity;
            vNormal = normalize(normalMatrix * position);
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = (10.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        varying float vOpacity;
        varying vec3 vNormal;
        void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            
            // Facing ratio for opacity: Front=100%, Edge=80%, Back=50%
            float facing = dot(vNormal, vec3(0.0, 0.0, 1.0));
            float angleOpacity = smoothstep(-1.0, 1.0, facing);
            float finalAngleOpacity = mix(0.5, 1.0, angleOpacity); 

            // Micro-shimmer
            float shimmer = (sin(time * 3.0 + vOpacity * 20.0) * 0.15) + 0.85;
            float alpha = finalAngleOpacity * shimmer;
            
            // Softened output (no color multiplier)
            gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    // Load map and generate points
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = "https://unpkg.com/three-globe/example/img/earth-water.png";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

      const posArray = [];
      const opacities = [];
      const R = 4.81;
      const LAT_RES = 100;
      const LNG_RES = 200;

      for (let lat = 0; lat < LAT_RES; lat++) {
        for (let lng = 0; lng < LNG_RES; lng++) {
          const latMap = (lat / LAT_RES) * 180 - 90;
          const lngMap = (lng / LNG_RES) * 360 - 180;

          const px = Math.floor(((lngMap + 180) / 360) * canvas.width);
          const py = Math.floor(((90 - latMap) / 180) * canvas.height);

          const idx = (py * canvas.width + px) * 4;
          const isLand = imgData[idx] > 128;

          if (isLand) {
            const phi = (90 - latMap) * (Math.PI / 180);
            const theta = (lngMap + 180) * (Math.PI / 180);

            posArray.push(
              -(R * Math.sin(phi) * Math.cos(theta)),
              R * Math.cos(phi),
              R * Math.sin(phi) * Math.sin(theta)
            );
            opacities.push(Math.random());
          }
        }
      }

      dotsGeo.setAttribute("position", new THREE.Float32BufferAttribute(posArray, 3));
      dotsGeo.setAttribute("aOpacity", new THREE.Float32BufferAttribute(opacities, 1));
      const dotMesh = new THREE.Points(dotsGeo, dotsMat);
      globeGroup.add(dotMesh);
    };

    // 4. Floating Particles (Dust) - Toned down sizes and opacity
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(400 * 3);
    for (let i = 0; i < 1200; i++) starPos[i] = (Math.random() - 0.5) * 35;
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMesh = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({
        color: 0x3a7bd5, // Brand blue for space dust
        size: 0.03, // smaller size
        transparent: true,
        opacity: 0.25, // lower opacity
        blending: THREE.AdditiveBlending,
      })
    );
    scene.add(starMesh);

    // 5. Accent Nodes (Teal and Purple mix)
    interface NodeObject {
      mesh: THREE.Group;
      phiOffset: number;
      thetaOffset: number;
      speed: number;
    }
    const nodes: NodeObject[] = [];
    const nodeColors = [0x00d2ff, 0x8a2387, 0x00d2ff, 0x8a2387, 0x3a7bd5];
    for (let i = 0; i < 5; i++) {
      const nodeGroup = new THREE.Group();
      const nodeColor = nodeColors[i];
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 16, 16),
        new THREE.MeshBasicMaterial({ color: nodeColor, transparent: true, opacity: 0.9 })
      );
      nodeGroup.add(node);

      const halo = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 16, 16),
        new THREE.MeshBasicMaterial({
          color: nodeColor,
          transparent: true,
          opacity: 0.4,
          blending: THREE.AdditiveBlending,
        })
      );
      nodeGroup.add(halo);

      globeGroup.add(nodeGroup);
      nodes.push({
        mesh: nodeGroup,
        phiOffset: Math.random() * Math.PI,
        thetaOffset: Math.random() * Math.PI,
        speed: 0.08 + Math.random() * 0.15,
      });
    }

    // Lighting - Toned down from 1.5 to 0.6
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dirLight = new THREE.DirectionalLight(0x3a7bd5, 0.6);
    dirLight.position.set(-5, 5, -5);
    scene.add(dirLight);

    // Animation Loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // 1 rotation / 25s
      globeGroup.rotation.y += (Math.PI * 2) / (25 * 60);
      starMesh.rotation.y += 0.0003;
      dotsMat.uniforms.time.value = time;

      nodes.forEach((n) => {
        const t = time * n.speed;
        const phi = Math.sin(t) * 0.5 + n.phiOffset;
        const theta = t + n.thetaOffset;
        n.mesh.position.set(
          -(4.85 * Math.sin(phi) * Math.cos(theta)),
          4.85 * Math.cos(phi),
          4.85 * Math.sin(phi) * Math.sin(theta)
        );
      });

      composer.render();
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      
      // Update camera distance on resize
      if (w < 500) {
        camera.position.z = 21;
      } else if (w < 768) {
        camera.position.z = 18;
      } else {
        camera.position.z = 15;
      }
      
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      // Dispose materials & geometries
      sphereGeo.dispose();
      glassMat.dispose();
      rimMat.dispose();
      dotsGeo.dispose();
      dotsMat.dispose();
      starGeo.dispose();
      starMesh.material.dispose();
      nodes.forEach((n) => {
        n.mesh.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => m.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      });
      renderer.dispose();
      composer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="global-globe-wrapper" id="three-globe-container" style={{ width: "100%", height: "450px" }} />;
}
