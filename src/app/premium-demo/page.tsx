"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import TechStackMarquee from "@/components/TechStackMarquee";
import Philosophy from "@/components/Philosophy";
import Capabilities from "@/components/Capabilities";
import PhilosophyV2 from "@/components/PhilosophyV2";
import Playground from "@/components/Playground";
import Methodology from "@/components/Methodology";
import FeaturedCaseStudies from "@/components/FeaturedCaseStudies";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import ContactForm from "@/components/ContactForm";

import "./premium.css";

export default function PremiumDemoPage() {
  const [text1, setText1] = useState("AI Agents");
  const [text2, setText2] = useState("Enterprise Ops");
  const heroRef = useRef<HTMLDivElement>(null);

  // Mouse spotlight tracking effect for cards on this demo page
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cards = document.querySelectorAll(".spotlight-card");
    cards.forEach((card: any) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  };

  return (
    <main onMouseMove={handleMouseMove} style={{ backgroundColor: "#0a0c10", color: "#fff", minHeight: "100vh" }}>
      {/* 🟢 DEMO HEADER NOTIFICATION BANNER */}
      <div style={{
        background: "linear-gradient(90deg, #8A2387, #00D2FF)",
        color: "#fff",
        textAlign: "center",
        padding: "8px 16px",
        fontSize: "13px",
        fontWeight: 700,
        letterSpacing: "0.5px",
        position: "relative",
        zIndex: 100
      }}>
        ✨ PREVIEW MODE: Ultra-Premium Design System Demo (Port 3005)
      </div>

      {/* 🚀 1. PREMIUM HERO SECTION WITH CYBERNETIC GRID & LIGHT BEAMS */}
      <section
        ref={heroRef}
        id="hero"
        className="hero-section"
        style={{
          paddingTop: "140px",
          paddingBottom: "100px",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Cybernetic Grid Overlay */}
        <div className="cyber-grid-container">
          <svg className="cyber-grid-svg" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="cyberGridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cyberGridPattern)" />
          </svg>
          {/* Animated Light Beams Traveling Across Grid */}
          <div className="light-beam-vertical" style={{ left: "20%", animationDelay: "0s" }}></div>
          <div className="light-beam-vertical" style={{ left: "75%", animationDelay: "2.5s" }}></div>
          <div className="light-beam-horizontal" style={{ top: "30%", animationDelay: "1s" }}></div>
          <div className="light-beam-horizontal" style={{ top: "70%", animationDelay: "3.5s" }}></div>
        </div>

        {/* Ambient Hero Multi-Color Orbs */}
        <div className="hero-ambient-glow hero-glow-1"></div>
        <div className="hero-ambient-glow hero-glow-2"></div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "48px", alignItems: "center" }}>
            
            {/* Left Content Column */}
            <div>
              {/* 🟢 Live Operational Status Badge */}
              <div className="status-pill-badge">
                <span className="status-indicator-dot"></span>
                <span>SYSTEM STATUS: AI PIPELINES OPERATIONAL • Q4 ENTERPRISE OPEN</span>
              </div>

              <h1 style={{ fontSize: "clamp(40px, 5.5vw, 64px)", lineHeight: 1.1, fontWeight: 800, marginBottom: "24px" }}>
                <span className="chrome-gradient-text">We engineer </span>
                <span className="neon-cyan-gradient-text">AI Agents</span>
                <br />
                <span className="chrome-gradient-text">to transform </span>
                <span className="neon-cyan-gradient-text">Enterprise Ops</span>.
              </h1>

              <p style={{ fontSize: "18px", color: "var(--c-text-secondary)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "600px" }}>
                Buildlyst designs high-performance autonomous agents, RAG systems, and custom ML data pipelines engineered for enterprise scale and speed.
              </p>

              {/* Latency / Speed Metric Tags */}
              <div style={{ display: "flex", gap: "16px", marginBottom: "36px", flexWrap: "wrap" }}>
                <div style={{ padding: "8px 14px", borderRadius: "8px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", fontSize: "12px", fontFamily: "var(--font-mono)", color: "#00D2FF" }}>
                  ⚡ Latency: &lt;14ms
                </div>
                <div style={{ padding: "8px 14px", borderRadius: "8px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", fontSize: "12px", fontFamily: "var(--font-mono)", color: "#27c93f" }}>
                  🔒 SOC2 Type II Ready
                </div>
                <div style={{ padding: "8px 14px", borderRadius: "8px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", fontSize: "12px", fontFamily: "var(--font-mono)", color: "#A0A0A5" }}>
                  🤖 Multi-Agent Orchestration
                </div>
              </div>

              <div style={{ display: "flex", gap: "16px" }}>
                <Link href="#contact" className="btn glow-border-btn" style={{ padding: "16px 32px", fontSize: "16px", fontWeight: 700 }}>
                  Start a Project
                </Link>
                <Link href="#pricing" className="btn glass-btn" style={{ padding: "16px 32px", fontSize: "16px" }}>
                  Estimate Scope →
                </Link>
              </div>
            </div>

            {/* Right Card Column: Shimmer Conic Card */}
            <div className="shimmer-card">
              <div className="shimmer-card-inner">
                <div style={{ display: "flex", alignItems: "center", justifyBetween: "space-between", marginBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "12px" }}>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56" }}></span>
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }}></span>
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f" }}></span>
                  </div>
                  <span style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--c-accent-cyan)" }}>buildlyst_agent_cluster.py</span>
                </div>

                <div style={{ fontFamily: "var(--font-mono)", fontSize: "13px", lineHeight: 1.8, color: "#d4d4d4" }}>
                  <p><span style={{ color: "#569cd6" }}>from</span> buildlyst <span style={{ color: "#569cd6" }}>import</span> AutonomousAgentCluster</p>
                  <p><span style={{ color: "#569cd6" }}>from</span> buildlyst.rag <span style={{ color: "#569cd6" }}>import</span> EnterpriseVectorStore</p>
                  <br />
                  <p style={{ color: "#6a9955" }}># Initialize multi-modal AI pipeline</p>
                  <p>cluster = AutonomousAgentCluster(</p>
                  <p style={{ paddingLeft: "20px" }}>model=<span style={{ color: "#ce9178" }}>"groq-llama-3.3-70b"</span>,</p>
                  <p style={{ paddingLeft: "20px" }}>vector_db=EnterpriseVectorStore(),</p>
                  <p style={{ paddingLeft: "20px" }}>throughput=<span style={{ color: "#b5cea8" }}>"10000 req/min"</span></p>
                  <p>)</p>
                  <br />
                  <div style={{ background: "rgba(0, 210, 255, 0.1)", border: "1px solid rgba(0, 210, 255, 0.3)", padding: "12px", borderRadius: "8px", color: "#00D2FF", fontSize: "12px" }}>
                    ✓ Cluster Ready — 99.99% Uptime SLA Guaranteed
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 💡 2. SPOTLIGHT BENTO CARDS SECTION */}
      <section style={{ padding: "80px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: "56px" }}>
            <span className="status-pill-badge">Spotlight Cursor Tracking Feature</span>
            <h2 className="chrome-gradient-text" style={{ fontSize: "36px", fontWeight: 700 }}>
              Hover over cards to see mouse tracking flashlight glow
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            <div className="spotlight-card" style={{ padding: "32px" }}>
              <div style={{ fontSize: "32px", marginBottom: "16px" }}>🤖</div>
              <h3 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, marginBottom: "12px" }}>Custom AI Agents</h3>
              <p style={{ color: "var(--c-text-secondary)", fontSize: "14px", lineHeight: 1.6 }}>
                Autonomous task execution workflows tailored to complex multi-step business logic.
              </p>
            </div>

            <div className="spotlight-card" style={{ padding: "32px" }}>
              <div style={{ fontSize: "32px", marginBottom: "16px" }}>⚡</div>
              <h3 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, marginBottom: "12px" }}>RAG & Vector Search</h3>
              <p style={{ color: "var(--c-text-secondary)", fontSize: "14px", lineHeight: 1.6 }}>
                Connect company databases directly into LLM reasoning layers with zero hallucination.
              </p>
            </div>

            <div className="spotlight-card" style={{ padding: "32px" }}>
              <div style={{ fontSize: "32px", marginBottom: "16px" }}>📊</div>
              <h3 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, marginBottom: "12px" }}>Data Engineering</h3>
              <p style={{ color: "var(--c-text-secondary)", fontSize: "14px", lineHeight: 1.6 }}>
                Scalable Python FastAPI backend architectures for real-time streaming analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Standard Sections */}
      <TechStackMarquee />
      <Philosophy />
      <Capabilities />
      <PhilosophyV2 />
      <Playground />
      <Methodology />
      <FeaturedCaseStudies />
      <Pricing />
      <Testimonials />
      <Faq />
      <ContactForm />
    </main>
  );
}
