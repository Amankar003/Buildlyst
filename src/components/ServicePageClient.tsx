"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SERVICES_DATA, ServiceData } from "@/data/servicesData";
import ContactForm from "@/components/ContactForm";
import TiltCard from "@/components/TiltCard";
import { Bot, Zap, ShieldCheck, Database, Lock, Check, ArrowRight, ArrowUpRight, BrainCircuit, Code2, Cpu } from "lucide-react";

interface ServicePageClientProps {
  serviceKey: string;
}

export default function ServicePageClient({ serviceKey }: ServicePageClientProps) {
  const serviceData: ServiceData | undefined = SERVICES_DATA[serviceKey];
  if (!serviceData) return null;

  // Scope labels for pricing tiers (no hardcoded prices)
  const scopeLabels = { t1: "MVP Scope", t2: "Professional", t3: "Custom Enterprise" };

  // FAQ accordion state
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // Pipeline Animation State
  const [activePipeStep, setActivePipeStep] = useState(0);
  const [hoveredUseCaseIdx, setHoveredUseCaseIdx] = useState<number | null>(null);

  useEffect(() => {
    setActivePipeStep(0);
    const interval = setInterval(() => {
      setActivePipeStep((prev) => (prev + 1) % (serviceData?.nodes3d?.length || 1));
    }, 1500);
    return () => clearInterval(interval);
  }, [serviceData]);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          1. HERO
          ═══════════════════════════════════════════════════════ */}
      <section id="hero" className="hero-section reveal" style={{ paddingTop: "140px", opacity: 1 }}>
        {/* Animated Gradient Waves */}
        <div className="wave-container">
          <style dangerouslySetInnerHTML={{ __html: `
            .use-case-row { display: flex; align-items: center; padding: 40px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: var(--c-text-secondary); transition: all 0.4s ease; cursor: default; }
            .use-case-row:hover { color: #fff; }
            .use-case-row-idx { width: 80px; font-size: 18px; font-family: var(--font-mono); opacity: 0.5; transition: opacity 0.4s ease; }
            .use-case-row:hover .use-case-row-idx { opacity: 1; }
            .use-case-row-title { flex: 1; font-size: 32px; font-weight: 300; margin: 0; }
            .use-case-row-desc { width: 400px; font-size: 14px; line-height: 1.6; opacity: 0; transform: translateX(-10px); transition: all 0.4s ease; color: #aaa; margin: 0; }
            .use-case-row:hover .use-case-row-desc { opacity: 1; transform: translateX(0); }
            .use-case-row-icon { margin-left: 40px; opacity: 0.2; transform: translateY(0); transition: all 0.4s ease; color: var(--c-accent-cyan); }
            .use-case-row:hover .use-case-row-icon { opacity: 1; transform: translateY(-4px); }
            
            .deliverables-bento { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; max-width: 1000px; margin: 0 auto; }
            .deliverable-card { padding: 32px 28px; border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.08); background: linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.2) 100%); backdrop-filter: blur(10px); box-shadow: inset 0 0 15px rgba(255,255,255,0.02); display: flex; align-items: center; gap: 24px; transition: all 0.3s ease; position: relative; overflow: hidden; }
            .deliverable-card:hover { border-color: rgba(138, 35, 135, 0.4); background: linear-gradient(145deg, rgba(138, 35, 135, 0.05) 0%, rgba(0, 210, 255, 0.02) 100%); transform: scale(1.02); box-shadow: 0 10px 40px -10px rgba(138, 35, 135, 0.15); }
            .deliverable-index { font-family: var(--font-display); font-size: 42px; font-weight: 800; background: -webkit-linear-gradient(90deg, #00D2FF, #8A2387); -webkit-background-clip: text; -webkit-text-fill-color: transparent; line-height: 1; min-width: 52px; flex-shrink: 0; opacity: 0.9; }
            .deliverable-content { display: flex; flex-direction: column; gap: 8px; }
            .deliverable-title { font-size: 16px; color: #fff; line-height: 1.4; font-weight: 600; }
            .deliverable-icon-row { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--c-accent-cyan); font-weight: 500; }
            .deliverable-highlight { border-color: rgba(0, 210, 255, 0.2); background: linear-gradient(145deg, rgba(0, 210, 255, 0.08) 0%, rgba(0, 0, 0, 0.2) 100%); }
            
            @media (max-width: 900px) {
              .use-case-row { flex-direction: column; align-items: flex-start; gap: 16px; padding: 32px 0; }
              .use-case-row-idx { width: auto; font-size: 14px; }
              .use-case-row-title { font-size: 24px; }
              .use-case-row-desc { width: 100%; opacity: 0.7; transform: none; }
              .use-case-row:hover .use-case-row-desc { opacity: 1; transform: none; }
              .use-case-row-icon { display: none; }
            }
            @media (max-width: 650px) { .deliverables-bento { grid-template-columns: 1fr; } .deliverable-card { padding: 18px 16px; } }
            @media (max-width: 768px) {
              .pipeline-flow { flex-direction: column !important; align-items: center !important; gap: 12px; }
              .pipeline-flow > div { flex-direction: column !important; width: auto !important; align-items: center !important; }
              .pipe-arrow { width: 3px !important; min-width: 3px !important; min-height: 24px; height: 24px !important; }
            }
            
            .explore-more-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
            .explore-card { padding: 24px; border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.05); background: rgba(255, 255, 255, 0.015); transition: all 0.3s ease; position: relative; overflow: hidden; display: flex; flex-direction: column; text-decoration: none; }
            .explore-card:hover { border-color: rgba(0, 210, 255, 0.3); background: rgba(0, 210, 255, 0.04); transform: translateY(-3px); box-shadow: 0 10px 30px -10px rgba(0, 210, 255, 0.1); }
            .explore-card-icon { margin-bottom: 16px; color: var(--c-accent-cyan); display: flex; align-items: center; justify-content: center; width: 48px; height: 48px; border-radius: 12px; background: rgba(0, 210, 255, 0.05); border: 1px solid rgba(0, 210, 255, 0.1); }
            .explore-card-title { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 8px; font-family: var(--font-display); }
            .explore-card-desc { font-size: 13px; color: var(--c-text-secondary); line-height: 1.5; margin: 0; padding-right: 20px; }
            .explore-card-arrow { position: absolute; right: 24px; top: 24px; color: rgba(255,255,255,0.2); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); transform: translateX(-10px); opacity: 0; }
            .explore-card:hover .explore-card-arrow { transform: translateX(0); opacity: 1; color: var(--c-accent-cyan); }
            
            @media (max-width: 1024px) { .explore-more-grid { grid-template-columns: repeat(2, 1fr); } }
            @media (max-width: 600px) { .explore-more-grid { grid-template-columns: 1fr; } }
          ` }} />
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
              {serviceData.headline}
            </h1>
            <p className="subtext">{serviceData.heroSubtext}</p>
            <div className="hero-actions">
              <Link href="#contact" className="btn btn-primary glow-border-btn">Build Your Solution</Link>
              <Link href="#use-cases" className="btn btn-secondary glass-btn">Explore Solutions</Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="chat-simulation-container glass-panel tilt-card">
              <div className="sim-header">
                <div className="sim-dots"><span></span><span></span><span></span></div>
                <span className="sim-title">Buildlyst AI</span>
              </div>
              <div style={{ padding: "16px", color: "#fff", fontFamily: "var(--font-mono)", fontSize: "13px", lineHeight: "1.8" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "8px", flexWrap: "wrap", gap: "8px" }}>
                  <span style={{ color: "#27c93f", display: "inline-flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap" }}>● PRODUCTION READY</span>
                  <span style={{ color: "#888", whiteSpace: "nowrap" }}>SYSTEM: ONLINE</span>
                </div>
                <div style={{ marginBottom: "12px", color: "#e0e0e0" }}>
                  <span style={{ color: "var(--c-accent-cyan)" }}>&gt; SERVICE:</span> {serviceData.headline.replace(".", "")}
                </div>
                <div style={{ marginBottom: "12px", color: "#e0e0e0" }}>
                  <span style={{ color: "var(--c-accent-cyan)" }}>&gt; SECURITY:</span> Private &amp; Secure Infrastructure
                </div>
                <div style={{ marginBottom: "14px", color: "#e0e0e0" }}>
                  <span style={{ color: "var(--c-accent-cyan)" }}>&gt; CODE IP:</span> 100% Client Source Code Ownership
                </div>
                <div style={{ padding: "10px 14px", borderRadius: "8px", background: "rgba(0, 210, 255, 0.08)", border: "1px solid rgba(0, 210, 255, 0.2)", fontSize: "11px", color: "#00d2ff" }}>
                  ⚡ Fast delivery. Clear timelines. Full code ownership.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. OVERVIEW + ARCHITECTURE BLUEPRINT
          ═══════════════════════════════════════════════════════ */}
      <section id="about" className="reveal" style={{ padding: "80px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container">
          <div className="responsive-grid grid-overview">
            <div>
              <div style={{ marginBottom: "14px" }}>
                <span className="overline highlight" style={{ fontSize: "11px" }}>Service Overview</span>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "6px" }}>
                  <span style={{ fontSize: "38px", display: "flex" }}><Bot size={38} className="theme-icon theme-icon-cyan" /></span>
                  <h2 className="section-heading text-gradient" style={{ margin: 0 }}>
                    {serviceData.headline}
                  </h2>
                </div>
              </div>

              <p style={{ color: "#fff", fontSize: "15.5px", fontWeight: 500, lineHeight: 1.6, marginBottom: "12px" }}>
                {serviceData.heroSubtext}
              </p>

              <p style={{ color: "var(--c-text-secondary)", fontSize: "14px", lineHeight: "1.6", marginBottom: "20px" }}>
                {serviceData.subtext}
              </p>

              <div className="overview-highlights-grid">
                <div style={{ padding: "12px 14px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: "6px" }}><Zap size={14} className="theme-icon theme-icon-cyan" /> Production Architecture</span>
                  <span style={{ fontSize: "11px", color: "var(--c-text-secondary)", lineHeight: 1.4 }}>Systems designed for reliability and growth — built for real business workloads, not demos.</span>
                </div>
                <div style={{ padding: "12px 14px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: "6px" }}><ShieldCheck size={14} className="theme-icon theme-icon-cyan" /> Security &amp; Privacy</span>
                  <span style={{ fontSize: "11px", color: "var(--c-text-secondary)", lineHeight: 1.4 }}>Your data stays yours. We build with privacy and security as a foundation, not an afterthought.</span>
                </div>
                <div style={{ padding: "12px 14px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: "6px" }}><Lock size={14} className="theme-icon theme-icon-cyan" /> Full Code Ownership</span>
                  <span style={{ fontSize: "11px", color: "var(--c-text-secondary)", lineHeight: 1.4 }}>You own 100% of the code, models, and intellectual property. No vendor lock-in, ever.</span>
                </div>
                <div style={{ padding: "12px 14px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: "6px" }}><Database size={14} className="theme-icon theme-icon-cyan" /> Seamless Integration</span>
                  <span style={{ fontSize: "11px", color: "var(--c-text-secondary)", lineHeight: 1.4 }}>Built to connect with your existing tools, databases, and business systems without disruption.</span>
                </div>
              </div>

              <div className="overview-buttons-container" style={{ marginTop: "20px" }}>
                <Link href="#contact" className="btn glow-border-btn" style={{ padding: "10px 22px", fontSize: "13px" }}>Build Custom Solution</Link>
                <Link href="#use-cases" className="btn glass-btn" style={{ padding: "10px 20px", fontSize: "13px" }}>See What We Build ↓</Link>
              </div>
            </div>

            {/* Architecture Blueprint — KEPT & REFINED */}
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

      {/* ═══════════════════════════════════════════════════════
          3. USE CASES — "What can this do for your business?"
          ═══════════════════════════════════════════════════════ */}
      <section id="use-cases" className="reveal" style={{ padding: "80px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container">
          <div className="section-header text-center" style={{ marginBottom: "48px" }}>
            <span className="overline highlight" style={{ fontSize: "11px" }}>Real-World Applications</span>
            <h2 className="section-heading text-gradient">What can this do for your business?</h2>
            <p className="subtext text-center mx-auto" style={{ fontSize: "14.5px", maxWidth: "600px" }}>
              From automation to analytics — here are the specific problems we solve with this service.
            </p>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            {serviceData.useCases.map((uc, idx) => (
              <div 
                key={idx} 
                className="use-case-row"
                onMouseEnter={() => setHoveredUseCaseIdx(idx)}
                onMouseLeave={() => setHoveredUseCaseIdx(null)}
              >
                <div className="use-case-row-idx">0{idx + 1}</div>
                <h4 className="use-case-row-title">{uc.title}</h4>
                <p className="use-case-row-desc">{uc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. DELIVERABLES — Redesigned Bento Grid (no stock photos)
          ═══════════════════════════════════════════════════════ */}
      <section className="reveal" style={{ padding: "80px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container">
          <div className="section-header text-center" style={{ marginBottom: "48px" }}>
            <span className="overline highlight" style={{ fontSize: "11px" }}>Production Deliverables</span>
            <h2 className="section-heading text-gradient">What you get.</h2>
            <p className="subtext text-center mx-auto" style={{ fontSize: "14.5px", maxWidth: "600px" }}>
              We don&apos;t sell advice — we deliver production-ready systems. Every engagement includes:
            </p>
          </div>

          <div className="deliverables-bento">
            {serviceData.deliverables.map((item, idx) => (
              <div key={idx} className="deliverable-card">
                <div className="deliverable-index">{String(idx + 1).padStart(2, "0")}</div>
                <div className="deliverable-content">
                  <div className="deliverable-title">{item}</div>
                  <div className="deliverable-icon-row">
                    <Check size={14} /> Included in Engagement
                  </div>
                </div>
              </div>
            ))}
            {/* Standard deliverables included in every engagement */}
            <div className="deliverable-card deliverable-highlight">
              <div className="deliverable-index">+</div>
              <div className="deliverable-content">
                <div className="deliverable-title">Complete source code &amp; documentation handoff</div>
                <div className="deliverable-icon-row">
                  <Check size={14} /> Full IP Ownership
                </div>
              </div>
            </div>
            <div className="deliverable-card deliverable-highlight">
              <div className="deliverable-index">+</div>
              <div className="deliverable-content">
                <div className="deliverable-title">Deployment to your preferred cloud environment</div>
                <div className="deliverable-icon-row">
                  <Check size={14} /> Seamless Integration
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5. SOLUTION TIERS / PRICING
          ═══════════════════════════════════════════════════════ */}
      <section id="pricing" className="reveal" style={{ padding: "80px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(0, 210, 255, 0.015)" }}>
        <div className="container">
          <div className="section-header text-center">
            <span className="overline highlight" style={{ fontSize: "11px" }}>Transparent Investment</span>
            <h2 className="section-heading text-gradient">Solution Tiers</h2>
            <p className="subtext text-center mx-auto" style={{ fontSize: "14.5px", maxWidth: "600px" }}>Select the engagement level that fits your scale.</p>
          </div>
          
          <div className="pricing-grid-3">
            <TiltCard className="service-pricing-card glass-panel">
              <div>
                <div className="pricing-tier-title" style={{ color: "var(--c-text-secondary)" }}>Launch (MVP)</div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--c-accent-cyan)", marginBottom: "12px", letterSpacing: "0.5px" }}>{scopeLabels.t1}</div>
                <ul className="pricing-feature-list">
                  <li><span style={{ display: "inline-flex" }}><Check size={12} className="theme-icon theme-icon-cyan" /></span> Core functionality deployment</li>
                  <li><span style={{ display: "inline-flex" }}><Check size={12} className="theme-icon theme-icon-cyan" /></span> Single workflow or pipeline</li>
                  <li><span style={{ display: "inline-flex" }}><Check size={12} className="theme-icon theme-icon-cyan" /></span> Standard quality checks</li>
                  <li><span style={{ display: "inline-flex" }}><Check size={12} className="theme-icon theme-icon-cyan" /></span> Full code ownership transfer</li>
                </ul>
              </div>
              <Link href="#contact" className="btn glass-btn w-100" style={{ padding: "12px", textAlign: "center", fontSize: "14px" }}>Get Started →</Link>
            </TiltCard>

            <TiltCard className="service-pricing-card glass-panel featured">
              <div className="popular-badge">Most Popular</div>
              <div>
                <div className="pricing-tier-title" style={{ color: "var(--c-accent-cyan)" }}>Build (Pro)</div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--c-accent-cyan)", marginBottom: "12px", letterSpacing: "0.5px" }}>{scopeLabels.t2}</div>
                <ul className="pricing-feature-list">
                  <li><span style={{ display: "inline-flex" }}><Check size={12} className="theme-icon theme-icon-cyan" /></span> Multi-step workflows &amp; integrations</li>
                  <li><span style={{ display: "inline-flex" }}><Check size={12} className="theme-icon theme-icon-cyan" /></span> Persistent data &amp; memory</li>
                  <li><span style={{ display: "inline-flex" }}><Check size={12} className="theme-icon theme-icon-cyan" /></span> Multiple API connections</li>
                  <li><span style={{ display: "inline-flex" }}><Check size={12} className="theme-icon theme-icon-cyan" /></span> Review &amp; approval workflows</li>
                  <li><span style={{ display: "inline-flex" }}><Check size={12} className="theme-icon theme-icon-cyan" /></span> Dedicated support period</li>
                </ul>
              </div>
              <Link href="#contact" className="btn glow-border-btn w-100" style={{ padding: "12px", textAlign: "center", fontSize: "14px" }}>Get Started →</Link>
            </TiltCard>

            <TiltCard className="service-pricing-card glass-panel">
              <div>
                <div className="pricing-tier-title" style={{ color: "var(--c-text-secondary)" }}>Scale (Enterprise)</div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--c-accent-cyan)", marginBottom: "12px", letterSpacing: "0.5px" }}>{scopeLabels.t3}</div>
                <ul className="pricing-feature-list">
                  <li><span style={{ display: "inline-flex" }}><Check size={12} className="theme-icon theme-icon-cyan" /></span> Custom architecture &amp; private deployment</li>
                  <li><span style={{ display: "inline-flex" }}><Check size={12} className="theme-icon theme-icon-cyan" /></span> High-availability &amp; auto-scaling</li>
                  <li><span style={{ display: "inline-flex" }}><Check size={12} className="theme-icon theme-icon-cyan" /></span> Dedicated infrastructure support</li>
                  <li><span style={{ display: "inline-flex" }}><Check size={12} className="theme-icon theme-icon-cyan" /></span> Advanced security &amp; compliance</li>
                </ul>
              </div>
              <Link href="#contact" className="btn glass-btn w-100" style={{ padding: "12px", textAlign: "center", fontSize: "14px" }}>Get Started →</Link>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6. SPECS TABLE + ANIMATED PIPELINE
          ═══════════════════════════════════════════════════════ */}
      <section className="reveal" style={{ padding: "70px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.01)" }}>
        <div className="container">
          <div className="section-header text-center" style={{ marginBottom: "28px" }}>
            <span className="overline highlight" style={{ fontSize: "11px", textTransform: "uppercase" }}>WHAT&apos;S INCLUDED</span>
            <h2 className="section-heading text-gradient">Solution Comparison</h2>
            <p className="subtext text-center mx-auto" style={{ fontSize: "14px" }}>{serviceData.specsDescription}</p>
          </div>

          <div className="glass-panel" style={{ borderRadius: "14px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
            <table className="specs-table">
              <thead>
                <tr>
                  <th>Feature</th>
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

          {/* Animated Pipeline — PRIMARY architecture visualizer */}
          <div className="glass-panel" style={{ marginTop: "32px", padding: "32px 40px", borderRadius: "14px", border: "1px solid rgba(0,210,255,0.15)", background: "rgba(0,0,0,0.3)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "10px" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "11px", fontWeight: 800, color: "var(--c-accent-cyan)", textTransform: "uppercase", letterSpacing: "1.5px" }}>
                HOW IT WORKS
              </span>
              <span style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: "#27c93f", animation: "pulse 2s infinite" }}>LIVE</span>
            </div>
            
            <div className="pipeline-flow active" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "20px 0" }}>
              {serviceData.nodes3d.map((node, nIdx) => {
                const isGlow = activePipeStep === nIdx || activePipeStep === nIdx - 1 || (activePipeStep === 0 && nIdx === 0);
                return (
                  <div key={nIdx} style={{ display: "flex", alignItems: "center", width: nIdx === serviceData.nodes3d.length - 1 ? "auto" : "100%" }}>
                    <div className={`pipe-node ${isGlow ? "active-glow" : ""}`} data-label={node.name.split(" ")[0]} style={{ width: "56px", height: "56px", background: "rgba(255,255,255,0.03)" }}>
                      <div className="pipe-icon" style={{ fontSize: "22px" }}>{node.icon}</div>
                    </div>
                    {nIdx < serviceData.nodes3d.length - 1 && (
                      <div className={`pipe-arrow ${activePipeStep === nIdx ? "active-flow" : ""}`} style={{ minWidth: "30px", height: "3px" }} />
                    )}
                  </div>
                );
              })}
            </div>
            
            <div style={{ textAlign: "center", marginTop: "24px", minHeight: "40px" }}>
              <span style={{ color: "var(--c-accent-cyan)", fontWeight: 600, fontSize: "14px", marginRight: "10px" }}>{serviceData.nodes3d[activePipeStep]?.name}:</span>
              <span style={{ color: "var(--c-text-secondary)", fontSize: "13px" }}>{serviceData.nodes3d[activePipeStep]?.plain}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          7. FAQ ACCORDION
          ═══════════════════════════════════════════════════════ */}
      <section id="faq" className="reveal" style={{ padding: "80px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <div className="section-header text-center" style={{ marginBottom: "36px" }}>
            <span className="overline highlight">Got Questions?</span>
            <h2 className="section-heading text-gradient">Frequently Asked Questions</h2>
            <p className="subtext text-center mx-auto" style={{ fontSize: "14px" }}>Clear answers about our process, timelines, and how we work.</p>
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



      {/* ═══════════════════════════════════════════════════════
          CROSS-LINK NAVIGATION (SEO)
          ═══════════════════════════════════════════════════════ */}
      <section className="reveal" style={{ padding: "80px 0", borderTop: "1px solid rgba(255,255,255,0.05)", background: "linear-gradient(180deg, transparent 0%, rgba(0, 210, 255, 0.015) 100%)" }}>
        <div className="container">
          <div className="section-header text-center" style={{ marginBottom: "48px" }}>
            <span className="overline highlight" style={{ fontSize: "11px" }}>Our Capabilities</span>
            <h2 className="section-heading text-gradient" style={{ fontSize: "32px", marginBottom: "24px" }}>Explore More Solutions</h2>
            <p className="subtext text-center mx-auto" style={{ fontSize: "14.5px", maxWidth: "600px" }}>
              Buildlyst offers a full spectrum of AI, data, and engineering services tailored for production.
            </p>
          </div>
          
          <div className="explore-more-grid">
            {Object.entries({
              "ai-agents": { name: "AI Agents", icon: <Bot size={22} />, desc: "Autonomous workflows and intelligent assistants." },
              "gen-ai": { name: "Generative AI", icon: <BrainCircuit size={22} />, desc: "Custom LLMs and private knowledge retrieval." },
              "machine-learning": { name: "Predictive ML", icon: <Cpu size={22} />, desc: "Forecasting, vision, and real-time inference." },
              "data-engineering": { name: "Data Engineering", icon: <Database size={22} />, desc: "Cloud pipelines, streaming, and BI." },
              "ai-product-engineering": { name: "Product Engineering", icon: <Code2 size={22} />, desc: "Full-stack SaaS and enterprise web apps." },
            })
              .filter(([key]) => key !== serviceKey)
              .map(([key, data]) => (
                <Link
                  key={key}
                  href={`/services/${key}`}
                  className="explore-card"
                >
                  <div className="explore-card-icon">{data.icon}</div>
                  <h3 className="explore-card-title">{data.name}</h3>
                  <p className="explore-card-desc">{data.desc}</p>
                  <div className="explore-card-arrow"><ArrowRight size={18} /></div>
                </Link>
              ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Link
              href="/case-studies"
              className="btn btn-primary glow-border-btn"
              style={{ padding: "12px 28px", fontSize: "14px" }}
            >
              View Client Case Studies
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CONTACT FORM
          ═══════════════════════════════════════════════════════ */}
      <ContactForm />
    </>
  );
}
