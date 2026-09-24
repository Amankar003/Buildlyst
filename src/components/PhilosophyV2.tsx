"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Database, 
  Settings, 
  Unplug, 
  GitBranch, 
  LineChart, 
  Timer, 
  BarChart, 
  ShieldCheck, 
  Target, 
  Handshake, 
  Zap, 
  TrendingUp,
  Cpu,
  Sparkles,
  ArrowRight
} from "lucide-react";

interface PipelineItem {
  id: number;
  inputTitle: string;
  inputIcon: React.ReactNode;
  outputTitle: string;
  outputIcon: React.ReactNode;
}

export default function PhilosophyV2() {
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [activePipe, setActivePipe] = useState<number | null>(null);

  const UNIFIED_COLOR = "#00d2ff";
  const UNIFIED_GLOW = "rgba(0, 210, 255, 0.6)";
  const UNIFIED_BG = "rgba(0, 210, 255, 0.12)";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
    });
  };

  const pipelines: PipelineItem[] = [
    {
      id: 0,
      inputTitle: "Scattered Data",
      inputIcon: <Database size={15} />,
      outputTitle: "Measurable Business Impact",
      outputIcon: <LineChart size={15} />,
    },
    {
      id: 1,
      inputTitle: "Manual Processes",
      inputIcon: <Settings size={15} />,
      outputTitle: "Faster Time to Market",
      outputIcon: <Timer size={15} />,
    },
    {
      id: 2,
      inputTitle: "Disconnected Systems",
      inputIcon: <Unplug size={15} />,
      outputTitle: "Built to Scale",
      outputIcon: <BarChart size={15} />,
    },
    {
      id: 3,
      inputTitle: "Complex Workflows",
      inputIcon: <GitBranch size={15} />,
      outputTitle: "Reliable by Design",
      outputIcon: <ShieldCheck size={15} />,
    },
  ];

  // Proportional Geometry (Percentage based 0-100%):
  // Col 1 (Left Nodes): X from 0% to 31% -> Touch Right Edge = X: 31
  // Col 2 (BUILDLYST Center Core): X from 42.5% to 57.5% -> Hidden Start = X: 48 (Left), X: 52 (Right)
  // Col 3 (Right Nodes): X from 69% to 100% -> Touch Left Edge = X: 69

  const leftPaths = [
    { d: "M 48 39 C 39 39, 37 8, 31 8", yNode: 8 },
    { d: "M 48 46.3 C 39 46.3, 37 36, 31 36", yNode: 36 },
    { d: "M 48 53.7 C 39 53.7, 37 64, 31 64", yNode: 64 },
    { d: "M 48 61 C 39 61, 37 92, 31 92", yNode: 92 },
  ];

  const rightPaths = [
    { d: "M 52 39 C 61 39, 63 8, 69 8", yNode: 8 },
    { d: "M 52 46.3 C 61 46.3, 63 36, 69 36", yNode: 36 },
    { d: "M 52 53.7 C 61 53.7, 63 64, 69 64", yNode: 64 },
    { d: "M 52 61 C 61 61, 63 92, 69 92", yNode: 92 },
  ];

  return (
    <section
      id="philosophy-v2"
      className="reveal"
      style={{
        padding: "90px 0 70px 0",
        minHeight: "85vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        overflow: "hidden",
        background: "radial-gradient(circle at 30% 50%, rgba(0, 210, 255, 0.03) 0%, rgba(138, 35, 137, 0.02) 40%, transparent 70%)",
        scrollMarginTop: "80px",
      }}
    >
      <style>{`
        .split-layout {
          display: grid;
          grid-template-columns: 1.35fr 0.65fr;
          gap: 36px;
          align-items: center;
        }
        .compact-node span {
          font-size: 12px;
          white-space: nowrap;
        }
        @media (max-width: 992px) {
          .split-layout {
            grid-template-columns: 1fr;
          }
          .bridge-viz-container {
            height: 380px !important;
          }
          .compact-node {
            padding: 6px !important;
            height: auto !important;
            min-height: 48px;
          }
          .compact-node span {
            font-size: 9.5px !important;
            white-space: normal !important;
            line-height: 1.2;
          }
          #philosophy-v2 {
            padding: 120px 0 60px 0 !important;
          }
        }
      `}</style>
      <div className="container" style={{ maxWidth: "1400px" }}>
        {/* UPPER PART: Heading */}
        <div className="text-center" style={{ marginBottom: "48px" }}>
          <div 
            style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: "8px", 
              padding: "5px 14px", 
              borderRadius: "20px", 
              background: "rgba(0, 210, 255, 0.06)", 
              border: "1px solid rgba(0, 210, 255, 0.2)", 
              color: "var(--c-accent-cyan)", 
              fontSize: "11px", 
              fontWeight: 700, 
              letterSpacing: "1.5px", 
              textTransform: "uppercase", 
              marginBottom: "14px" 
            }}
          >
            <Sparkles size={13} /> AI Pipeline Architecture
          </div>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.2, fontFamily: "var(--font-display)", margin: 0 }}>
            From Messy Reality to <span style={{ color: "var(--c-accent-cyan)", fontWeight: 700 }}>Automated Success</span>
          </h2>
        </div>

        {/* LOWER PART: Split Layout (Expanded Viz Area to 1.35fr for Full Text Visibility) */}
        <div className="split-layout">
          
          {/* LEFT VIZ CONTAINER */}
          <div
            className="bridge-viz-container"
            style={{
              position: "relative",
              width: "100%",
              height: "410px",
            }}
          >
            {/* SVG OVERLAY - Unified Cyan Energy Lines */}
            <svg
              className="bridge-svg"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 2,
                overflow: "visible",
              }}
            >
              <defs>
                <linearGradient id="unifiedPipeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={UNIFIED_COLOR} stopOpacity="0.25" />
                  <stop offset="50%" stopColor={UNIFIED_COLOR} stopOpacity="1" />
                  <stop offset="100%" stopColor={UNIFIED_COLOR} stopOpacity="0.35" />
                </linearGradient>

                <filter id="pipeGlowNormal" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="1" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <filter id="pipeGlowActive" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* 4 LEFT PIPELINES */}
              {leftPaths.map((path, idx) => {
                const isActive = activePipe === idx;
                const isDimmed = activePipe !== null && !isActive;

                return (
                  <g key={`left-pipe-${idx}`} style={{ transition: "all 0.3s ease", opacity: isDimmed ? 0.2 : 1 }}>
                    <path
                      d={path.d}
                      fill="none"
                      stroke={UNIFIED_COLOR}
                      strokeOpacity={isActive ? "0.55" : "0.2"}
                      strokeWidth={isActive ? "2.6" : "1.6"}
                      strokeLinecap="round"
                    />

                    <path
                      d={path.d}
                      fill="none"
                      stroke="url(#unifiedPipeGrad)"
                      strokeWidth={isActive ? "3" : "1.8"}
                      strokeLinecap="round"
                      strokeDasharray="6 14"
                      filter={isActive ? "url(#pipeGlowActive)" : "url(#pipeGlowNormal)"}
                      style={{
                        animation: `pipeLiquid ${isActive ? "0.9s" : "2s"} linear infinite`,
                        animationDelay: `-${idx * 0.4}s`,
                      }}
                    />

                    <circle r={isActive ? "1.8" : "1.2"} fill={UNIFIED_COLOR} filter="url(#pipeGlowNormal)">
                      <animateMotion
                        path={path.d}
                        dur={isActive ? "1.1s" : "2.3s"}
                        repeatCount="indefinite"
                        begin={`-${idx * 0.5}s`}
                      />
                    </circle>
                  </g>
                );
              })}

              {/* 4 RIGHT PIPELINES */}
              {rightPaths.map((path, idx) => {
                const isActive = activePipe === idx;
                const isDimmed = activePipe !== null && !isActive;

                return (
                  <g key={`right-pipe-${idx}`} style={{ transition: "all 0.3s ease", opacity: isDimmed ? 0.2 : 1 }}>
                    <path
                      d={path.d}
                      fill="none"
                      stroke={UNIFIED_COLOR}
                      strokeOpacity={isActive ? "0.55" : "0.2"}
                      strokeWidth={isActive ? "2.6" : "1.6"}
                      strokeLinecap="round"
                    />

                    <path
                      d={path.d}
                      fill="none"
                      stroke="url(#unifiedPipeGrad)"
                      strokeWidth={isActive ? "3" : "1.8"}
                      strokeLinecap="round"
                      strokeDasharray="6 14"
                      filter={isActive ? "url(#pipeGlowActive)" : "url(#pipeGlowNormal)"}
                      style={{
                        animation: `pipeLiquid ${isActive ? "0.9s" : "2s"} linear infinite`,
                        animationDelay: `-${idx * 0.4 + 0.2}s`,
                      }}
                    />

                    <circle r={isActive ? "1.8" : "1.2"} fill={UNIFIED_COLOR} filter="url(#pipeGlowNormal)">
                      <animateMotion
                        path={path.d}
                        dur={isActive ? "1.1s" : "2.3s"}
                        repeatCount="indefinite"
                        begin={`-${idx * 0.5 + 0.2}s`}
                      />
                    </circle>
                  </g>
                );
              })}
            </svg>

            {/* COLUMN 1: Tech Inputs (Absolute Position X: 0% to 31%) */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: "31%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                zIndex: 3,
              }}
            >
              {pipelines.map((pipe) => {
                const isActive = activePipe === pipe.id;
                return (
                  <div
                    key={`input-node-${pipe.id}`}
                    className="compact-node"
                    onMouseEnter={() => setActivePipe(pipe.id)}
                    onMouseLeave={() => setActivePipe(null)}
                    style={{
                      width: "100%",
                      height: "52px",
                      padding: "8px 14px",
                      background: isActive ? "rgba(16, 24, 40, 0.95)" : "rgba(8, 8, 12, 0.85)",
                      border: `1px solid ${isActive ? UNIFIED_COLOR : "rgba(255, 255, 255, 0.12)"}`,
                      boxShadow: isActive ? `0 0 16px ${UNIFIED_GLOW}` : "0 4px 12px rgba(0, 0, 0, 0.5)",
                      transform: isActive ? "scale(1.02)" : "none",
                      transition: "all 0.25s ease",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      borderRadius: "8px",
                      boxSizing: "border-box",
                    }}
                  >
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "6px",
                        background: UNIFIED_BG,
                        color: UNIFIED_COLOR,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        border: `1px solid ${UNIFIED_COLOR}40`,
                      }}
                    >
                      {pipe.inputIcon}
                    </div>
                    <span 
                      style={{ 
                        fontSize: "12px", 
                        fontWeight: 600, 
                        color: isActive ? "#ffffff" : "#d0d0d0",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {pipe.inputTitle}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* COLUMN 2: BUILDLYST Core Card (Absolute Position X: 42.5% to 57.5%) */}
            <div
              style={{
                position: "absolute",
                left: "42.5%",
                width: "15%",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 4,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                className="bridge-center-node tilt-card"
                style={{
                  ...tiltStyle,
                  width: "100%",
                  padding: "16px 10px",
                  textAlign: "center",
                  background: "rgba(6, 9, 18, 0.96)",
                  backdropFilter: "blur(16px)",
                  border: `1px solid ${activePipe !== null ? UNIFIED_COLOR : "var(--c-accent-cyan)"}`,
                  borderRadius: "14px",
                  boxShadow: activePipe !== null 
                    ? `0 0 35px ${UNIFIED_GLOW}` 
                    : "0 0 30px rgba(0, 210, 255, 0.25), inset 0 0 15px rgba(0, 210, 255, 0.08)",
                  transition: "all 0.3s ease",
                  position: "relative",
                  boxSizing: "border-box",
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* Status Badge */}
                <div
                  style={{
                    fontSize: "8.5px",
                    fontWeight: 700,
                    letterSpacing: "0.8px",
                    textTransform: "uppercase",
                    color: UNIFIED_COLOR,
                    marginBottom: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                  }}
                >
                  <span
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: UNIFIED_COLOR,
                      boxShadow: `0 0 6px ${UNIFIED_COLOR}`,
                    }}
                  />
                  {activePipe !== null ? "ACTIVE" : "AI ENGINE"}
                </div>

                <h3
                  className="text-gradient"
                  style={{
                    margin: 0,
                    fontSize: "18px",
                    letterSpacing: "-0.3px",
                    fontWeight: 800,
                    fontFamily: "var(--font-display)",
                  }}
                >
                  BUILDLYST
                </h3>

                <div 
                  style={{ 
                    marginTop: "4px", 
                    fontSize: "9.5px", 
                    color: "rgba(255,255,255,0.45)", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    gap: "4px" 
                  }}
                >
                  <Cpu size={10} /> 4 Pipelines
                </div>
              </div>
            </div>

            {/* COLUMN 3: Business Outputs (Absolute Position X: 69% to 100%) */}
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: "31%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                zIndex: 3,
              }}
            >
              {pipelines.map((pipe) => {
                const isActive = activePipe === pipe.id;
                return (
                  <div
                    key={`output-node-${pipe.id}`}
                    className="compact-node"
                    onMouseEnter={() => setActivePipe(pipe.id)}
                    onMouseLeave={() => setActivePipe(null)}
                    style={{
                      width: "100%",
                      height: "52px",
                      padding: "8px 14px",
                      background: isActive ? "rgba(16, 24, 40, 0.95)" : "rgba(8, 8, 12, 0.85)",
                      border: `1px solid ${isActive ? UNIFIED_COLOR : "rgba(0, 210, 255, 0.25)"}`,
                      boxShadow: isActive ? `0 0 16px ${UNIFIED_GLOW}` : "0 4px 12px rgba(0, 0, 0, 0.5)",
                      transform: isActive ? "scale(1.02)" : "none",
                      transition: "all 0.25s ease",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      borderRadius: "8px",
                      boxSizing: "border-box",
                    }}
                  >
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "6px",
                        background: UNIFIED_BG,
                        color: UNIFIED_COLOR,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        border: `1px solid ${UNIFIED_COLOR}40`,
                      }}
                    >
                      {pipe.outputIcon}
                    </div>
                    <span 
                      style={{ 
                        fontSize: "12px", 
                        fontWeight: 600, 
                        color: isActive ? "#ffffff" : UNIFIED_COLOR,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {pipe.outputTitle}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE: Content & Pillars */}
          <div className="content-column">
            <h3 style={{ fontSize: "26px", lineHeight: 1.3, marginBottom: "18px", color: "#fff", fontWeight: 700 }}>
              You don&apos;t need to be technical to build a smarter business.
            </h3>
            <p style={{ color: "var(--c-text-secondary)", marginBottom: "28px", lineHeight: 1.6, fontSize: "15px" }}>
              We turn scattered data, manual processes, and ambitious ideas into AI-powered systems that simplify operations, accelerate growth, and scale with your business.
            </p>

            {/* 4 Pillars (2x2 Grid) */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div 
                className="glass-panel" 
                style={{ 
                  padding: "14px", 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "12px", 
                  borderRadius: "10px", 
                  background: "rgba(255, 255, 255, 0.03)", 
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <div style={{ background: "rgba(255,95,86,0.12)", color: "#ff5f56", width: "36px", height: "36px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "1px solid rgba(255,95,86,0.2)" }}><Target size={18} /></div>
                <div>
                  <h4 style={{ marginBottom: "2px", fontSize: "14px", color: "#fff", fontWeight: 600 }}>Business First</h4>
                  <p style={{ color: "var(--c-text-secondary)", fontSize: "11px", margin: 0, lineHeight: 1.3 }}>We speak your language.</p>
                </div>
              </div>

              <div 
                className="glass-panel" 
                style={{ 
                  padding: "14px", 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "12px", 
                  borderRadius: "10px", 
                  background: "rgba(255, 255, 255, 0.03)", 
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <div style={{ background: "rgba(39,201,63,0.12)", color: "#27c93f", width: "36px", height: "36px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "1px solid rgba(39,201,63,0.2)" }}><Handshake size={18} /></div>
                <div>
                  <h4 style={{ marginBottom: "2px", fontSize: "14px", color: "#fff", fontWeight: 600 }}>Built With You</h4>
                  <p style={{ color: "var(--c-text-secondary)", fontSize: "11px", margin: 0, lineHeight: 1.3 }}>From idea to execution.</p>
                </div>
              </div>

              <div 
                className="glass-panel" 
                style={{ 
                  padding: "14px", 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "12px", 
                  borderRadius: "10px", 
                  background: "rgba(255, 255, 255, 0.03)", 
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <div style={{ background: "rgba(255,189,46,0.12)", color: "#ffbd2e", width: "36px", height: "36px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "1px solid rgba(255,189,46,0.2)" }}><Zap size={18} /></div>
                <div>
                  <h4 style={{ marginBottom: "2px", fontSize: "14px", color: "#fff", fontWeight: 600 }}>Faster Execution</h4>
                  <p style={{ color: "var(--c-text-secondary)", fontSize: "11px", margin: 0, lineHeight: 1.3 }}>Move from plan to product faster.</p>
                </div>
              </div>

              <div 
                className="glass-panel" 
                style={{ 
                  padding: "14px", 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "12px", 
                  borderRadius: "10px", 
                  background: "rgba(255, 255, 255, 0.03)", 
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <div style={{ background: "rgba(0,210,255,0.12)", color: "var(--c-accent-cyan)", width: "36px", height: "36px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "1px solid rgba(0,210,255,0.2)" }}><TrendingUp size={18} /></div>
                <div>
                  <h4 style={{ marginBottom: "2px", fontSize: "14px", color: "#fff", fontWeight: 600 }}>Built to Scale</h4>
                  <p style={{ color: "var(--c-text-secondary)", fontSize: "11px", margin: 0, lineHeight: 1.3 }}>Technology that grows with you.</p>
                </div>
              </div>
            </div>

            <Link
              href="#contact"
              className="btn btn-primary glow-border-btn w-100"
              style={{
                marginTop: "22px",
                fontSize: "14px",
                padding: "12px 20px",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              Start Your Transformation <ArrowRight size={15} />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}


