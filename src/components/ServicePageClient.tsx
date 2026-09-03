"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { SERVICES_DATA, ServiceData } from "@/data/servicesData";
import ContactForm from "@/components/ContactForm";
import TiltCard from "@/components/TiltCard";

interface ServicePageClientProps {
  serviceKey: string;
}

export default function ServicePageClient({ serviceKey }: ServicePageClientProps) {
  const serviceData: ServiceData | undefined = SERVICES_DATA[serviceKey];
  if (!serviceData) return null;

  // 1. Sandbox Telemetry states
  const [telemetryLines, setTelemetryLines] = useState<string[]>([
    "[SYSTEM] Initializing live execution telemetry stream...",
    "[READY] Connected to Autonomous AI Agents kernel node.",
  ]);
  const [telemetryRunning, setTelemetryRunning] = useState(false);
  const [latency, setLatency] = useState("8.4ms");
  const [memory, setMemory] = useState("42.1 MB");
  const [throughput, setThroughput] = useState("4,200 req/s");
  const telemetryIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 2. 3D Model Inspector states
  const [activeNodeIdx, setActiveNodeIdx] = useState(0);
  const [flatView, setFlatView] = useState(false);

  // 3. Pricing Matrix Tiers
  const pricingTiers = {
    "ai-agents": { t1: "₹85K+", t2: "₹1.8L+", t3: "₹3.8L+" },
    "data-engineering": { t1: "₹80K+", t2: "₹1.6L+", t3: "₹3L+" },
    "gen-ai": { t1: "₹1L+", t2: "₹2.5L+", t3: "₹5L+" },
    "machine-learning": { t1: "₹85K+", t2: "₹2L+", t3: "₹3.8L+" },
    "web-development": { t1: "₹35K+", t2: "₹1.0L+", t3: "₹2.5L+" },
  }[serviceKey] || { t1: "₹85K+", t2: "₹1.8L+", t3: "₹3.8L+" };

  // 4. FAQ accordion state
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      if (telemetryIntervalRef.current) clearInterval(telemetryIntervalRef.current);
    };
  }, []);

  const handleRunTelemetry = () => {
    if (telemetryRunning) return;

    setTelemetryRunning(true);
    const sampleLogs = [
      "[INFO] Executing memory vector retrieval step...",
      "[PERF] Cache query resolved in 0.4ms.",
      "[SEC] TLS 1.3 handshake verified with client endpoint.",
      "[WORKER] Sub-thread #14 finished execution without error.",
      "[METRIC] CPU load stable @ 4.2% across 8 worker cores.",
      "[AUDIT] Event log written to SOC2 compliance vault.",
    ];

    telemetryIntervalRef.current = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0] + "." + String(now.getMilliseconds()).padStart(3, "0");
      const randomMsg = sampleLogs[Math.floor(Math.random() * sampleLogs.length)];
      const logLine = `[${timeStr}] ${randomMsg}`;

      setTelemetryLines((prev) => {
        const next = [...prev, logLine];
        if (next.length > 20) {
          next.shift();
        }
        return next;
      });

      // Fluctuate metrics
      setLatency(`${(6 + Math.random() * 4).toFixed(1)}ms`);
      setMemory(`${(40 + Math.random() * 5).toFixed(1)} MB`);
      setThroughput(`${Math.floor(4000 + Math.random() * 500).toLocaleString()} req/s`);
    }, 800);
  };

  const handleClearTelemetry = () => {
    if (telemetryIntervalRef.current) {
      clearInterval(telemetryIntervalRef.current);
      telemetryIntervalRef.current = null;
    }
    setTelemetryRunning(false);
    setTelemetryLines([]);
  };

  const selected3DNode = serviceData.nodes3d[activeNodeIdx];

  return (
    <>
      {/* Service Hero section */}
      <section id="hero" className="hero-section reveal" style={{ paddingTop: "140px", opacity: 1 }}>
        {/* Animated Gradient Waves */}
        <div className="wave-container">
          <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
            <defs>
              <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00D2FF" />
                <stop offset="50%" stopColor="#8A2387" />
                <stop offset="100%" stopColor="#3A7BD5" />
              </linearGradient>
            </defs>
            <g className="parallax-waves">
              <use xlinkHref="#gentle-wave" x="48" y="0" fill="url(#wave-gradient)" opacity="0.05" />
              <use xlinkHref="#gentle-wave" x="48" y="3" fill="url(#wave-gradient)" opacity="0.1" />
              <use xlinkHref="#gentle-wave" x="48" y="5" fill="url(#wave-gradient)" opacity="0.15" />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="url(#wave-gradient)" opacity="0.25" />
            </g>
          </svg>
        </div>

        <div className="hero-container">
          <div className="hero-content">
            <span className="overline highlight">Buildlyst Engineering Studio</span>
            <h1 className="text-gradient-hero" style={{ fontSize: "clamp(34px, 4.4vw, 54px)", lineHeight: "1.15", marginBottom: "16px" }}>
              <span style={{ display: "block" }}>Autonomous</span>
              <span style={{ display: "block" }}>{serviceData.headline}</span>
            </h1>
            <p className="subtext">{serviceData.subtext}</p>
            <div className="hero-actions">
              <Link href="#contact" className="btn btn-primary glow-border-btn">Start a Project</Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="chat-simulation-container glass-panel tilt-card">
              <div className="sim-header">
                <div className="sim-dots"><span></span><span></span><span></span></div>
                <span className="sim-title">Buildlyst AI</span>
              </div>
              <div style={{ padding: "16px", color: "#fff", fontFamily: "var(--font-mono)", fontSize: "13px", lineHeight: "1.8" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px", borderBottom: "1px solid rgba(255,255,255,0.08);", paddingBottom: "8px", flexWrap: "wrap", gap: "8px" }}>
                  <span style={{ color: "#27c93f", display: "inline-flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap" }}>● PRODUCTION READY</span>
                  <span style={{ color: "#888", whiteSpace: "nowrap" }}>LATENCY: &lt; 2ms</span>
                </div>
                <div style={{ marginBottom: "12px", color: "#e0e0e0" }}>
                  <span style={{ color: "var(--c-accent-cyan)" }}>&gt; ARCHITECTURE:</span> LangGraph Stateful Swarm
                </div>
                <div style={{ marginBottom: "12px", color: "#e0e0e0" }}>
                  <span style={{ color: "var(--c-accent-cyan)" }}>&gt; SECURITY:</span> SOC2 Compliant / Private VPC
                </div>
                <div style={{ marginBottom: "14px", color: "#e0e0e0" }}>
                  <span style={{ color: "var(--c-accent-cyan)" }}>&gt; CODE IP:</span> 100% Client Source Code Transfer
                </div>
                <div style={{ padding: "10px 14px", borderRadius: "8px", background: "rgba(0, 210, 255, 0.08)", border: "1px solid rgba(0, 210, 255, 0.2)", fontSize: "11px", color: "#00d2ff" }}>
                  ⚡ Delivered with sub-14 day production SLA guarantee.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview & Blueprint */}
      <section id="about" className="reveal" style={{ padding: "60px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container">
          <div className="responsive-grid grid-overview">
            <div>
              <div style={{ marginBottom: "14px" }}>
                <span className="overline highlight" style={{ fontSize: "11px" }}>Service Overview</span>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "6px" }}>
                  <span style={{ fontSize: "38px" }}>🤖</span>
                  <h2 className="section-heading text-gradient" style={{ margin: 0 }}>
                    {serviceData.headline}
                  </h2>
                </div>
              </div>

              <p style={{ color: "#fff", fontSize: "15.5px", fontWeight: 500, lineHeight: 1.6, marginBottom: "12px" }}>
                Autonomous {serviceData.headline} architectures engineered strictly for production workloads.
              </p>

              <p style={{ color: "var(--c-text-secondary)", fontSize: "14px", lineHeight: "1.6", marginBottom: "20px" }}>
                We build fault-tolerant, state-of-the-art enterprise nodes. Every deployment runs under private security, zero vendor lock-in, and full source code IP ownership.
              </p>

              <div className="overview-highlights-grid">
                <div style={{ padding: "12px 14px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>⚡ Stateful Architecture</span>
                  <span style={{ fontSize: "11px", color: "var(--c-text-secondary)", lineHeight: 1.4 }}>Multi-node collaborative pipelines orchestrating complex tasks with zero single point of failure.</span>
                </div>
                <div style={{ padding: "12px 14px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>🛡️ Safety Guardrails</span>
                  <span style={{ fontSize: "11px", color: "var(--c-text-secondary)", lineHeight: 1.4 }}>Define custom safety thresholds where automated tasks pause for validation.</span>
                </div>
                <div style={{ padding: "12px 14px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>🗄️ Vector Database Sync</span>
                  <span style={{ fontSize: "11px", color: "var(--c-text-secondary)", lineHeight: 1.4 }}>Integrated similarity search modules querying metadata in milliseconds.</span>
                </div>
                <div style={{ padding: "12px 14px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>🔒 100% IP Transfer</span>
                  <span style={{ fontSize: "11px", color: "var(--c-text-secondary)", lineHeight: 1.4 }}>Full copyright, weights, and codebase control delivered to your private repositories.</span>
                </div>
              </div>

              <div className="overview-buttons-container" style={{ marginTop: "20px" }}>
                <Link href="#contact" className="btn glow-border-btn" style={{ padding: "10px 22px", fontSize: "13px" }}>Build Custom Solution</Link>
                <Link href="#playground" className="btn glass-btn" style={{ padding: "10px 20px", fontSize: "13px" }}>View Live Telemetry &darr;</Link>
              </div>
            </div>

            <div className="project-blueprint-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "10px" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "11px", fontWeight: 800, color: "var(--c-accent-cyan)", textTransform: "uppercase", letterSpacing: "1.5px" }}>
                  SYSTEM ARCHITECTURE BLUEPRINT
                </span>
                <span style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: "#27c93f" }}>ACTIVE</span>
              </div>

              {serviceData.nodes3d.map((node, nIdx) => (
                <div key={nIdx}>
                  <div className="blueprint-step-node">
                    <div className="blueprint-step-icon">{node.icon}</div>
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>{node.name}</span>
                        <span style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: "var(--c-accent-cyan)", background: "rgba(0,210,255,0.1)", padding: "2px 6px", borderRadius: "4px" }}>
                          {node.tech}
                        </span>
                      </div>
                      <div style={{ fontSize: "11px", color: "var(--c-text-secondary)", marginTop: "2px" }}>{node.plain}</div>
                    </div>
                  </div>
                  {nIdx < serviceData.nodes3d.length - 1 && <div className="blueprint-connector" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="reveal" style={{ padding: "70px 0", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container">
          <div className="responsive-grid grid-deliverables">
            <div>
              <span className="overline highlight" style={{ fontSize: "11px" }}>Production Deliverables</span>
              <h2 className="section-heading text-gradient">Exactly what we build.</h2>
              <p style={{ color: "var(--c-text-secondary)", fontSize: "15px", marginBottom: "24px", lineHeight: 1.6 }}>
                We don&apos;t sell generic advice; we deliver production-ready codebases. Our standard engineering deployments include:
              </p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {serviceData.deliverables.map((item, iIdx) => (
                  <li key={iIdx} style={{ marginBottom: "14px", fontSize: "14px", color: "#e0e0e0", display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ color: "var(--c-accent-cyan)", fontSize: "16px" }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-panel deliverables-img-card" style={{ position: "relative" }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "4px", background: "linear-gradient(90deg, #00D2FF, #8A2387)" }}></div>
              <img
                src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt={`${serviceData.headline} — production deliverables built by Buildlyst`}
                style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85, filter: "contrast(1.1)", display: "block" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Telemetry Stream */}
      <section id="playground" className="reveal" style={{ padding: "70px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.25)" }}>
        <div className="container">
          <div className="section-header text-center" style={{ marginBottom: "28px" }}>
            <span className="overline highlight" style={{ fontSize: "11px" }}>Developer Sandbox</span>
            <h2 className="section-heading text-gradient">Live Execution Telemetry</h2>
            <p className="subtext text-center mx-auto" style={{ fontSize: "14px" }}>
              Real-time code inspection, live log streaming, and dynamic metric counters for your pipeline.
            </p>
          </div>

          <div className="responsive-grid grid-telemetry">
            <div className="glass-panel" style={{ padding: "20px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)", background: "#070b14", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "10px", marginBottom: "14px" }}>
                  <span style={{ color: "#fff", fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "bold" }}>apex_pipeline.py</span>
                  <span style={{ color: "#00d2ff", fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: "bold" }}>PYTHON / LANGCHAIN</span>
                </div>
                <pre style={{ margin: 0, color: "#a5d6ff", fontFamily: "var(--font-mono)", fontSize: "12px", lineHeight: 1.5, whiteSpace: "pre-wrap", maxHeight: "240px", overflowY: "auto" }}>
{`from buildlyst.pipeline import StatefulPipeline
from buildlyst.models import EmbeddingModel

# Buildlyst Custom Microservice Node
flow = StatefulPipeline(namespace="${serviceKey}")
flow.add_node("ingress_gateway", host="0.0.0.0", port=80)
flow.add_node("model_processor", model=EmbeddingModel("fast"))

flow.compile()`}
                </pre>
              </div>
              <div style={{ marginTop: "14px", paddingTop: "10px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "10px" }}>
                <button onClick={handleRunTelemetry} className="btn glass-btn" style={{ padding: "6px 14px", fontSize: "12px", borderRadius: "6px" }}>▶ Run Simulation</button>
                <button onClick={handleClearTelemetry} className="btn glass-btn" style={{ padding: "6px 14px", fontSize: "12px", borderRadius: "6px", color: "#aaa" }}>Clear Logs</button>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: "20px", borderRadius: "16px", border: "1px solid rgba(0,210,255,0.25)", background: "#03060c", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "10px", marginBottom: "14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#27c93f", boxShadow: "0 0 8px #27c93f" }}></span>
                    <span style={{ color: "#27c93f", fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: "bold" }}>TELEMETRY LOG STREAM</span>
                  </div>
                  <span style={{ color: "#00d2ff", fontFamily: "var(--font-mono)", fontSize: "10px" }}>
                    {telemetryRunning ? "STREAMING ACTIVE" : "STANDBY"}
                  </span>
                </div>
                
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", lineHeight: 1.7, color: "#d0d0d0", height: "210px", overflowY: "auto", paddingRight: "6px" }}>
                  {telemetryLines.map((line, lIdx) => (
                    <div key={lIdx}>{line}</div>
                  ))}
                </div>
              </div>

              <div className="telemetry-metrics-bar">
                <span>LATENCY: <strong style={{ color: "#00d2ff" }}>{latency}</strong></span>
                <span>MEMORY: <strong style={{ color: "#27c93f" }}>{memory}</strong></span>
                <span>THROUGHPUT: <strong style={{ color: "#fff" }}>{throughput}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Isometric System Architecture Model */}
      <section className="reveal" style={{ padding: "80px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "radial-gradient(circle at center, rgba(0, 210, 255, 0.05) 0%, transparent 80%)" }}>
        <div className="container">
          <div className="section-header text-center" style={{ marginBottom: "24px" }}>
            <span className="overline highlight" style={{ fontSize: "11px" }}>Interactive Blueprint</span>
            <h2 className="section-heading text-gradient">3D System Architecture Model</h2>
            <p className="subtext text-center mx-auto" style={{ fontSize: "14.5px", maxWidth: "640px" }}>
              Click any floating 3D microservice node to inspect its real-world function and technical specs.
            </p>
            <div style={{ marginTop: "12px", display: "flex", gap: "10px", justifyContent: "center" }}>
              <button onClick={() => setFlatView(!flatView)} className="btn glass-btn" style={{ padding: "6px 16px", fontSize: "12px", borderRadius: "30px" }}>
                🌐 Toggle 3D Isometric / 2D View
              </button>
            </div>
          </div>

          <div className="responsive-grid grid-3d">
            <div className={`arch-3d-wrapper ${flatView ? "flat-view" : ""}`}>
              <div className="arch-3d-stage">
                <div className="arch-3d-floor" />
                <div className="laser-beam-3d" style={{ top: "40px", left: "100px" }} />
                <div className="laser-beam-3d" style={{ bottom: "40px", right: "100px" }} />

                {serviceData.nodes3d.map((node, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveNodeIdx(idx)}
                    className={`node-3d-card n3d-${idx + 1} ${activeNodeIdx === idx ? "active-3d" : ""}`}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <span style={{ fontSize: "18px" }}>{node.icon}</span>
                      <span style={{ fontSize: "11px", fontWeight: "bold", color: "#fff" }}>{node.name.split(" ")[0]} Node</span>
                    </div>
                    <div style={{ fontSize: "9px", fontFamily: "var(--font-mono)", color: "var(--c-accent-cyan)" }}>{node.tech}</div>
                  </div>
                ))}
              </div>
            </div>

            {selected3DNode && (
              <div className="glass-panel" style={{ padding: "30px", borderRadius: "20px", border: "1px solid rgba(0,210,255,0.3)", background: "rgba(4, 8, 20, 0.95)", boxShadow: "0 0 35px rgba(0, 210, 255, 0.12)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "14px", marginBottom: "18px" }}>
                  <div>
                    <span style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: "var(--c-accent-cyan)", textTransform: "uppercase", letterSpacing: "1px" }}>SELECTED 3D NODE</span>
                    <h3 style={{ margin: "4px 0 0 0", color: "#fff", fontSize: "20px", fontWeight: 800 }}>{selected3DNode.name}</h3>
                  </div>
                  <span style={{ fontSize: "36px" }}>{selected3DNode.icon}</span>
                </div>

                <div style={{ padding: "14px 16px", borderRadius: "12px", background: "rgba(0, 210, 255, 0.06)", border: "1px solid rgba(0, 210, 255, 0.2)", marginBottom: "18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                    <span>🌟</span>
                    <span style={{ fontSize: "11px", fontWeight: "bold", color: "#00d2ff", textTransform: "uppercase", letterSpacing: "1px" }}>IN PLAIN ENGLISH (FOR BUSINESS)</span>
                  </div>
                  <p style={{ color: "#e0e0e0", fontSize: "13px", lineHeight: 1.5, margin: 0 }}>{selected3DNode.plain}</p>
                </div>

                <div className="cto-tech-grid">
                  <div style={{ padding: "12px", borderRadius: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <span style={{ fontSize: "10px", color: "#888", display: "block", fontWeight: 600 }}>TECH STACK</span>
                    <span style={{ fontSize: "13px", color: "#00d2ff", fontWeight: "bold" }}>{selected3DNode.tech}</span>
                  </div>
                  <div style={{ padding: "12px", borderRadius: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <span style={{ fontSize: "10px", color: "#888", display: "block", fontWeight: 600 }}>LATENCY BUDGET</span>
                    <span style={{ fontSize: "13px", color: "#27c93f", fontWeight: "bold" }}>{selected3DNode.latency}</span>
                  </div>
                </div>

                <div style={{ padding: "12px", borderRadius: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <span style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: "var(--c-accent-cyan)", display: "block", fontWeight: "bold", marginBottom: "2px" }}>REDUNDANCY & FAILOVER</span>
                  <span style={{ fontSize: "12px", color: "#ccc" }}>{selected3DNode.ha}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="reveal" style={{ padding: "80px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(0, 210, 255, 0.015)" }}>
        <div className="container">
          <div className="section-header text-center">
            <span className="overline highlight" style={{ fontSize: "11px" }}>Transparent Investment</span>
            <h2 className="section-heading text-gradient">Tailored Pricing Tiers</h2>
            <p className="subtext text-center mx-auto" style={{ fontSize: "14.5px", maxWidth: "600px" }}>Select the engagement level that fits your scale.</p>
          </div>
          
          <div className="pricing-grid-3">
            <TiltCard className="service-pricing-card glass-panel">
              <div>
                <div className="pricing-tier-title" style={{ color: "var(--c-text-secondary)" }}>Launch (MVP)</div>
                <div className="pricing-tier-price">{pricingTiers.t1}</div>
                <ul className="pricing-feature-list">
                  <li><span>✓</span> Basic integration deployment</li>
                  <li><span>✓</span> Single pipeline flow</li>
                  <li><span>✓</span> Standard schema checks</li>
                  <li><span>✓</span> Full code ownership transfer</li>
                </ul>
              </div>
              <Link href="#contact" className="btn glass-btn w-100" style={{ padding: "12px", textAlign: "center", fontSize: "14px" }}>Get Started</Link>
            </TiltCard>

            <TiltCard className="service-pricing-card glass-panel featured">
              <div className="popular-badge">Most Popular</div>
              <div>
                <div className="pricing-tier-title" style={{ color: "var(--c-accent-cyan)" }}>Build (Pro)</div>
                <div className="pricing-tier-price" style={{ color: "var(--c-accent-cyan)" }}>{pricingTiers.t2}</div>
                <ul className="pricing-feature-list">
                  <li><span>✓</span> Collaborative swarm pipelines</li>
                  <li><span>✓</span> Long term state memory caches</li>
                  <li><span>✓</span> Multi-channel API endpoints</li>
                  <li><span>✓</span> Human in the loop validation UI</li>
                  <li><span>✓</span> Developer SLA verification</li>
                </ul>
              </div>
              <Link href="#contact" className="btn glow-border-btn w-100" style={{ padding: "12px", textAlign: "center", fontSize: "14px" }}>Select Pro</Link>
            </TiltCard>

            <TiltCard className="service-pricing-card glass-panel">
              <div>
                <div className="pricing-tier-title" style={{ color: "var(--c-text-secondary)" }}>Scale (Enterprise)</div>
                <div className="pricing-tier-price">{pricingTiers.t3}</div>
                <ul className="pricing-feature-list">
                  <li><span>✓</span> Custom orchestrated private pipelines</li>
                  <li><span>✓</span> High-availability auto-scaling</li>
                  <li><span>✓</span> 24/7 dedicated container support</li>
                  <li><span>✓</span> SOC2 compliance verification</li>
                </ul>
              </div>
              <Link href="#contact" className="btn glass-btn w-100" style={{ padding: "12px", textAlign: "center", fontSize: "14px" }}>Contact Sales</Link>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Specs table */}
      <section className="reveal" style={{ padding: "70px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.01)" }}>
        <div className="container">
          <div className="section-header text-center" style={{ marginBottom: "28px" }}>
            <span className="overline highlight" style={{ fontSize: "11px" }}>Comparison Matrix</span>
            <h2 className="section-heading text-gradient">Technical Specifications</h2>
            <p className="subtext text-center mx-auto" style={{ fontSize: "14px" }}>Compare benchmarks across our Launch, Build, and Scale tiers.</p>
          </div>

          <div className="glass-panel" style={{ borderRadius: "14px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
            <table className="specs-table">
              <thead>
                <tr>
                  <th>Specification Parameter</th>
                  <th>Launch (MVP)</th>
                  <th style={{ color: "var(--c-accent-cyan)" }}>Build (Pro)</th>
                  <th>Scale (Enterprise)</th>
                </tr>
              </thead>
              <tbody>
                {serviceData.specs.map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600, color: "#fff" }}>{row.parameter}</td>
                    <td>{row.tier1}</td>
                    <td style={{ color: "var(--c-accent-cyan)", fontWeight: 600 }}>{row.tier2}</td>
                    <td>{row.tier3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQs Accordion */}
      <section id="faq" className="reveal" style={{ padding: "80px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <div className="section-header text-center" style={{ marginBottom: "36px" }}>
            <span className="overline highlight">Got Questions?</span>
            <h2 className="section-heading text-gradient">Frequently Asked Questions</h2>
            <p className="subtext text-center mx-auto" style={{ fontSize: "14px" }}>Clear answers regarding deployment timelines, IP, and data privacy.</p>
          </div>

          <div className="faq-container">
            {serviceData.faqs.map((faq, idx) => (
              <div key={idx} className={`faq-item glass-panel ${openFaqIdx === idx ? "open" : ""}`}>
                <button className="faq-question" onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}>
                  {faq.question}
                  <span className="faq-icon">{openFaqIdx === idx ? "−" : "+"}</span>
                </button>
                <div
                  className="faq-answer"
                  style={{
                    maxHeight: openFaqIdx === idx ? "300px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.4s ease-out, padding 0.3s ease-out",
                    padding: openFaqIdx === idx ? "16px 20px" : "0 20px"
                  }}
                >
                  <p style={{ marginBottom: 0, color: "var(--c-text-secondary)" }}>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ContactForm */}
      <ContactForm />

      {/* Internal cross-linking to other Buildlyst services — GEO/SEO */}
      <section style={{ padding: "60px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <div className="section-header text-center" style={{ marginBottom: "24px" }}>
            <h2 className="section-heading" style={{ color: "#fff", fontSize: "24px" }}>Explore More Buildlyst Services</h2>
            <p className="subtext text-center mx-auto" style={{ fontSize: "14px" }}>Buildlyst offers a full spectrum of AI, data, and web engineering services.</p>
          </div>
          <nav style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
            {Object.entries({
              "ai-agents": "AI Agents",
              "gen-ai": "Generative AI",
              "machine-learning": "Machine Learning",
              "data-engineering": "Data Engineering",
              "web-development": "Web Development",
            })
              .filter(([key]) => key !== serviceKey)
              .map(([key, name]) => (
                <Link
                  key={key}
                  href={`/services/${key}`}
                  className="btn glass-btn"
                  style={{ padding: "10px 20px", fontSize: "13px", borderRadius: "8px" }}
                >
                  {name}
                </Link>
              ))}
            <Link
              href="/case-studies"
              className="btn glass-btn"
              style={{ padding: "10px 20px", fontSize: "13px", borderRadius: "8px" }}
            >
              View Case Studies
            </Link>
          </nav>
        </div>
      </section>
    </>
  );
}
