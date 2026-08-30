"use client";

import { useState } from "react";
import Link from "next/link";

export default function PhilosophyV2() {
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
    });
  };

  return (
    <section
      id="philosophy-v2"
      className="reveal"
      style={{
        padding: "80px 0",
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        overflow: "hidden",
        background: "radial-gradient(circle at left center, rgba(0,210,255,0.02) 0%, transparent 60%)",
      }}
    >
      <div className="container" style={{ maxWidth: "1400px" }}>
        {/* UPPER PART: Heading */}
        <div className="text-center" style={{ marginBottom: "64px" }}>
          <h2 style={{ fontSize: "clamp(36px, 4.5vw, 54px)", lineHeight: 1.2, fontFamily: "var(--font-display)" }}>
            From Messy Reality to <span style={{ color: "var(--c-accent-cyan)", fontWeight: 700 }}>Automated Success</span>
          </h2>
        </div>

        {/* LOWER PART: Split Layout */}
        <div className="split-layout" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "48px", alignItems: "center" }}>
          
          {/* LEFT SIDE: 3-Column Diagram with Realistic 3D SVG Pipes */}
          <div
            className="bridge-viz-container"
            style={{
              position: "relative",
              width: "100%",
              height: "420px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 0",
            }}
          >
            {/* Realistic 3D SVG Pipes */}
            <svg className="bridge-svg" preserveAspectRatio="none" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(0, 210, 255, 0.2)" />
                  <stop offset="50%" stopColor="rgba(0, 210, 255, 0.8)" />
                  <stop offset="100%" stopColor="rgba(138, 35, 137, 0.6)" />
                </linearGradient>
                <filter id="pipeGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Pipe Outer Shells / 3D Tracks */}
              <path className="real-pipe-track" d="M 20 12 C 35 12, 35 50, 50 50" />
              <path className="real-pipe-track" d="M 20 37 C 35 37, 35 50, 50 50" />
              <path className="real-pipe-track" d="M 20 63 C 35 63, 35 50, 50 50" />
              <path className="real-pipe-track" d="M 20 88 C 35 88, 35 50, 50 50" />

              <path className="real-pipe-track" d="M 50 50 C 65 50, 65 12, 80 12" />
              <path className="real-pipe-track" d="M 50 50 C 65 50, 65 37, 80 37" />
              <path className="real-pipe-track" d="M 50 50 C 65 50, 65 63, 80 63" />
              <path className="real-pipe-track" d="M 50 50 C 65 50, 65 88, 80 88" />

              {/* Flowing Liquid Energy Core Inside Pipes */}
              <path className="real-pipe-pulse" filter="url(#pipeGlow)" d="M 20 12 C 35 12, 35 50, 50 50" style={{ animationDelay: "0s" }} />
              <path className="real-pipe-pulse" filter="url(#pipeGlow)" d="M 20 37 C 35 37, 35 50, 50 50" style={{ animationDelay: "-1.2s" }} />
              <path className="real-pipe-pulse" filter="url(#pipeGlow)" d="M 20 63 C 35 63, 35 50, 50 50" style={{ animationDelay: "-0.6s" }} />
              <path className="real-pipe-pulse" filter="url(#pipeGlow)" d="M 20 88 C 35 88, 35 50, 50 50" style={{ animationDelay: "-1.8s" }} />

              <path className="real-pipe-pulse" filter="url(#pipeGlow)" d="M 50 50 C 65 50, 65 12, 80 12" style={{ animationDelay: "-0.4s" }} />
              <path className="real-pipe-pulse" filter="url(#pipeGlow)" d="M 50 50 C 65 50, 65 37, 80 37" style={{ animationDelay: "-1.6s" }} />
              <path className="real-pipe-pulse" filter="url(#pipeGlow)" d="M 50 50 C 65 50, 65 63, 80 63" style={{ animationDelay: "-0.9s" }} />
              <path className="real-pipe-pulse" filter="url(#pipeGlow)" d="M 50 50 C 65 50, 65 88, 80 88" style={{ animationDelay: "-2.1s" }} />

              {/* Glowing Pipe Valves / Terminal Connectors */}
              <circle cx="20" cy="12" r="1.2" className="pipe-joint" />
              <circle cx="20" cy="37" r="1.2" className="pipe-joint" />
              <circle cx="20" cy="63" r="1.2" className="pipe-joint" />
              <circle cx="20" cy="88" r="1.2" className="pipe-joint" />

              <circle cx="50" cy="50" r="2.0" className="pipe-joint-center" filter="url(#pipeGlow)" />

              <circle cx="80" cy="12" r="1.2" className="pipe-joint" />
              <circle cx="80" cy="37" r="1.2" className="pipe-joint" />
              <circle cx="80" cy="63" r="1.2" className="pipe-joint" />
              <circle cx="80" cy="88" r="1.2" className="pipe-joint" />
            </svg>

            {/* Col 1: Tech Inputs */}
            <div className="bridge-col">
              <div className="compact-node"><span className="icon">🧠</span> Complex AI & Code</div>
              <div className="compact-node"><span className="icon">🗄️</span> Raw Data Lakes</div>
              <div className="compact-node"><span className="icon">☁️</span> Cloud Infra</div>
              <div className="compact-node"><span className="icon">🔌</span> Custom APIs</div>
            </div>

            {/* Col 2: Center Node (BUILDLYST) */}
            <div className="bridge-col" style={{ justifyContent: "center" }}>
              <div
                className="bridge-center-node tilt-card"
                style={{ ...tiltStyle, padding: "24px 32px", textAlign: "center" }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <h3 className="text-gradient" style={{ margin: 0, fontSize: "30px", letterSpacing: "-0.5px" }}>BUILDLYST</h3>
              </div>
            </div>

            {/* Col 3: Business Outputs */}
            <div className="bridge-col">
              <div className="compact-node highlight-green"><span className="icon">📈</span> +240% Revenue ROI</div>
              <div className="compact-node highlight-cyan"><span className="icon">⏱️</span> 10x Launch Speed</div>
              <div className="compact-node highlight-gold"><span className="icon">💰</span> Scalable Profit</div>
              <div className="compact-node highlight-purple"><span className="icon">🔒</span> 99.99% Reliability</div>
            </div>
          </div>

          {/* RIGHT SIDE: Content & Pillars */}
          <div className="content-column">
            <h3 style={{ fontSize: "28px", lineHeight: 1.3, marginBottom: "20px", color: "#fff" }}>
              You don&apos;t need to be an engineer to dominate your market.
            </h3>
            <p style={{ color: "var(--c-text-secondary)", marginBottom: "32px", lineHeight: 1.6, fontSize: "16px" }}>
              You just need an elite team to build your engine. We take your scattered data and bold ideas, process them through our custom architecture, and hand you a seamless, automated system that drives real profit.
            </p>

            {/* 4 Pillars (2x2 Grid) */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div className="glass-panel" style={{ padding: "16px", display: "flex", alignItems: "center", gap: "12px", borderRadius: "var(--radius-sm)" }}>
                <div style={{ background: "rgba(255,95,86,0.1)", color: "#ff5f56", width: "36px", height: "36px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>🎯</div>
                <div>
                  <h4 style={{ marginBottom: "2px", fontSize: "15px", color: "#fff" }}>Zero Jargon</h4>
                  <p style={{ color: "var(--c-text-secondary)", fontSize: "12px", margin: 0, lineHeight: 1.3 }}>We speak business.</p>
                </div>
              </div>
              <div className="glass-panel" style={{ padding: "16px", display: "flex", alignItems: "center", gap: "12px", borderRadius: "var(--radius-sm)" }}>
                <div style={{ background: "rgba(39,201,63,0.1)", color: "#27c93f", width: "36px", height: "36px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>🤝</div>
                <div>
                  <h4 style={{ marginBottom: "2px", fontSize: "15px", color: "#fff" }}>True Partner</h4>
                  <p style={{ color: "var(--c-text-secondary)", fontSize: "12px", margin: 0, lineHeight: 1.3 }}>Idea to launch.</p>
                </div>
              </div>
              <div className="glass-panel" style={{ padding: "16px", display: "flex", alignItems: "center", gap: "12px", borderRadius: "var(--radius-sm)" }}>
                <div style={{ background: "rgba(255,189,46,0.1)", color: "#ffbd2e", width: "36px", height: "36px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>⚡</div>
                <div>
                  <h4 style={{ marginBottom: "2px", fontSize: "15px", color: "#fff" }}>Radical Speed</h4>
                  <p style={{ color: "var(--c-text-secondary)", fontSize: "12px", margin: 0, lineHeight: 1.3 }}>10x deployment.</p>
                </div>
              </div>
              <div className="glass-panel" style={{ padding: "16px", display: "flex", alignItems: "center", gap: "12px", borderRadius: "var(--radius-sm)" }}>
                <div style={{ background: "rgba(0,210,255,0.1)", color: "var(--c-accent-cyan)", width: "36px", height: "36px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>🏆</div>
                <div>
                  <h4 style={{ marginBottom: "2px", fontSize: "15px", color: "#fff" }}>Guaranteed ROI</h4>
                  <p style={{ color: "var(--c-text-secondary)", fontSize: "12px", margin: 0, lineHeight: 1.3 }}>Built to scale.</p>
                </div>
              </div>
            </div>
            <Link href="#contact" className="btn btn-primary glow-border-btn w-100" style={{ marginTop: "20px", fontSize: "15px", padding: "14px 24px", textAlign: "center", display: "block" }}>
              Start Your Transformation →
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
