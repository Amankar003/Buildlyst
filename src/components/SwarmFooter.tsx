"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SwarmFooter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    window.addEventListener("resize", handleResize);

    // Boids Simulation Configurations
    const boids: Boid[] = [];
    const numBoids = 120;
    const maxSpeed = 3;
    const maxForce = 0.05;
    const perceptionRadius = 60;
    const colors = ["#00d2ff", "#8a2387", "#00ffaa", "#ffffff"];

    interface Vector {
      x: number;
      y: number;
    }

    class Boid {
      position: Vector;
      velocity: Vector;
      acceleration: Vector;
      color: string;
      size: number;

      constructor() {
        this.position = { x: Math.random() * width, y: Math.random() * height };
        this.velocity = { x: (Math.random() - 0.5) * maxSpeed, y: (Math.random() - 0.5) * maxSpeed };
        this.acceleration = { x: 0, y: 0 };
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.size = Math.random() * 2 + 2;
      }

      edges() {
        if (this.position.x > width + 20) this.position.x = -20;
        else if (this.position.x < -20) this.position.x = width + 20;
        if (this.position.y > height + 20) this.position.y = -20;
        else if (this.position.y < -20) this.position.y = height + 20;
      }

      limit(vec: Vector, max: number): Vector {
        const mag = Math.hypot(vec.x, vec.y);
        if (mag > max) {
          return { x: (vec.x / mag) * max, y: (vec.y / mag) * max };
        }
        return vec;
      }

      align(boids: Boid[]): Vector {
        let steering: Vector = { x: 0, y: 0 };
        let total = 0;
        for (const other of boids) {
          const d = Math.hypot(this.position.x - other.position.x, this.position.y - other.position.y);
          if (other !== this && d < perceptionRadius) {
            steering.x += other.velocity.x;
            steering.y += other.velocity.y;
            total++;
          }
        }
        if (total > 0) {
          steering.x /= total;
          steering.y /= total;
          const mag = Math.hypot(steering.x, steering.y);
          if (mag > 0) {
            steering.x = (steering.x / mag) * maxSpeed;
            steering.y = (steering.y / mag) * maxSpeed;
          }
          steering.x -= this.velocity.x;
          steering.y -= this.velocity.y;
          return this.limit(steering, maxForce);
        }
        return steering;
      }

      cohesion(boids: Boid[]): Vector {
        let steering: Vector = { x: 0, y: 0 };
        let total = 0;
        for (const other of boids) {
          const d = Math.hypot(this.position.x - other.position.x, this.position.y - other.position.y);
          if (other !== this && d < perceptionRadius) {
            steering.x += other.position.x;
            steering.y += other.position.y;
            total++;
          }
        }
        if (total > 0) {
          steering.x /= total;
          steering.y /= total;
          steering.x -= this.position.x;
          steering.y -= this.position.y;
          const mag = Math.hypot(steering.x, steering.y);
          if (mag > 0) {
            steering.x = (steering.x / mag) * maxSpeed;
            steering.y = (steering.y / mag) * maxSpeed;
          }
          steering.x -= this.velocity.x;
          steering.y -= this.velocity.y;
          return this.limit(steering, maxForce);
        }
        return steering;
      }

      separation(boids: Boid[]): Vector {
        let steering: Vector = { x: 0, y: 0 };
        let total = 0;
        for (const other of boids) {
          const d = Math.hypot(this.position.x - other.position.x, this.position.y - other.position.y);
          if (other !== this && d < perceptionRadius / 2) {
            const diff = { x: this.position.x - other.position.x, y: this.position.y - other.position.y };
            if (d > 0) {
              diff.x /= d * d;
              diff.y /= d * d;
            }
            steering.x += diff.x;
            steering.y += diff.y;
            total++;
          }
        }
        if (total > 0) {
          steering.x /= total;
          steering.y /= total;
          const mag = Math.hypot(steering.x, steering.y);
          if (mag > 0) {
            steering.x = (steering.x / mag) * maxSpeed;
            steering.y = (steering.y / mag) * maxSpeed;
          }
          steering.x -= this.velocity.x;
          steering.y -= this.velocity.y;
          return this.limit(steering, maxForce * 1.5);
        }
        return steering;
      }

      swarmMouse(mouseX: number, mouseY: number): Vector {
        const steering = { x: mouseX - this.position.x, y: mouseY - this.position.y };
        const d = Math.hypot(steering.x, steering.y);
        if (d < 150) {
          const mag = Math.hypot(steering.x, steering.y);
          if (mag > 0) {
            steering.x = (steering.x / mag) * maxSpeed;
            steering.y = (steering.y / mag) * maxSpeed;
          }
          steering.x -= this.velocity.x;
          steering.y -= this.velocity.y;
          return this.limit(steering, maxForce * 1.2);
        }
        return { x: 0, y: 0 };
      }

      flock(boids: Boid[], mouseX: number, mouseY: number, isMouseActive: boolean) {
        const alignment = this.align(boids);
        const cohesion = this.cohesion(boids);
        const separation = this.separation(boids);

        this.acceleration.x += alignment.x * 1.0;
        this.acceleration.y += alignment.y * 1.0;
        this.acceleration.x += cohesion.x * 1.0;
        this.acceleration.y += cohesion.y * 1.0;
        this.acceleration.x += separation.x * 1.5;
        this.acceleration.y += separation.y * 1.5;

        if (isMouseActive) {
          const mSwarm = this.swarmMouse(mouseX, mouseY);
          this.acceleration.x += mSwarm.x * 2.0;
          this.acceleration.y += mSwarm.y * 2.0;
        }
      }

      update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;
        this.velocity = this.limit(this.velocity, maxSpeed);
        this.acceleration.x = 0;
        this.acceleration.y = 0;
      }

      draw() {
        const theta = Math.atan2(this.velocity.y, this.velocity.x) + Math.PI / 2;
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(theta);
        ctx.beginPath();
        ctx.moveTo(0, -this.size * 2);
        ctx.lineTo(-this.size, this.size * 2);
        ctx.lineTo(this.size, this.size * 2);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < numBoids; i++) {
      boids.push(new Boid());
    }

    let mouseX = 0;
    let mouseY = 0;
    let isMouseActive = false;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isMouseActive = true;
    };

    const onMouseLeave = () => {
      isMouseActive = false;
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      ctx.fillStyle = "rgba(10, 10, 10, 0.3)";
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = "lighter";

      for (const boid of boids) {
        boid.edges();
        boid.flock(boids, mouseX, mouseY, isMouseActive);
        boid.update();
        boid.draw();
      }

      ctx.globalCompositeOperation = "source-over";
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isHome = pathname === "/";

  return (
    <footer className="new-footer">
      <div className="container">
        <div className="footer-grid-layout">
          {/* Brand Section */}
          <div className="footer-brand">
            <Link href="/" className="logo text-gradient footer-logo">
              Buildlyst
            </Link>
            <p className="footer-tagline">Build AI With Compounding Intelligence</p>

            <div className="footer-badges" style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
              <a
                href="https://www.linkedin.com/company/buildlyst/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="social-icon"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/buildlyst"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="social-icon"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://x.com/buildlystin"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="social-icon"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="footer-links-wrapper">
            <div className="footer-col">
              <h4>SERVICES</h4>
              <ul>
                <li>
                  <Link href="/services/ai-agents">AI Agents</Link>
                </li>
                <li>
                  <Link href="/services/gen-ai">Generative AI</Link>
                </li>
                <li>
                  <Link href="/services/machine-learning">Machine Learning</Link>
                </li>
                <li>
                  <Link href="/services/data-engineering">Data Engineering</Link>
                </li>
                <li>
                  <Link href="/services/web-development">Web Development</Link>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>COMPANY</h4>
              <ul>
                <li>
                  <Link href={isHome ? "#about" : "/#about"}>About Us</Link>
                </li>
                <li>
                  <Link href="/case-studies">Case Studies</Link>
                </li>
                <li>
                  <Link href={isHome ? "#pricing" : "/#pricing"}>Pricing</Link>
                </li>
                <li>
                  <Link href={isHome ? "#contact" : "/#contact"}>Contact</Link>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>LEGAL</h4>
              <ul>
                <li>
                  <Link href="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms">Terms of Service</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Swarm Visual Grid Container */}
          <div className="footer-visual-grid-container" style={{ position: "relative", overflow: "hidden", borderRadius: "12px" }}>
            <canvas ref={canvasRef} id="agent-swarm-canvas" aria-label="Animated swarm intelligence visualization" style={{ width: "100%", height: "260px", display: "block" }} />

            <div style={{ position: "absolute", bottom: "12px", left: "16px", pointerEvents: "none" }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--c-text-secondary)",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span className="status-dot"></span> Active Swarm Engine
              </div>
            </div>
          </div>
        </div>

        {/* Mega Footer Typography */}
        <div className="mega-footer-text">BUILDLYST</div>

        {/* Bottom Row */}
        <div className="footer-bottom-row">
          <div className="footer-copyright">&copy; {new Date().getFullYear()} Buildlyst, Inc. All rights reserved.</div>
          <button className="scroll-top-btn" id="scroll-to-top-btn" onClick={handleScrollTop} aria-label="Scroll to top">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
