"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

/* ─── Data ─── */

const TECHS = [
  "Python", "FastAPI", "React", "Next.js", "AWS", "Docker", "Kubernetes",
  "OpenAI", "PyTorch", "TensorFlow", "PostgreSQL", "Snowflake", "Pinecone",
  "LangChain", "Redis", "Celery"
];

interface FlowStep {
  icon: string;
  label: string;
}

interface Phase {
  id: string;
  number: string;
  title: string;
  description: string;
  features: string[];
  imageSrc: string;
  pipelineLabel: string;
  pipeline: FlowStep[];
  color: string;
}

const PHASES: Phase[] = [
  {
    id: "discover",
    number: "01",
    title: "Discovery & Planning",
    description: "We audit your business goals, existing workflows, data lakes, and technical environment to define a clear roadmap before development begins.",
    features: [
      "Business & Requirement Analysis",
      "Technical Feasibility & Scope",
      "Project Roadmap & Planning",
    ],
    imageSrc: "/static/img/method_arch.jpg",
    color: "#00D2FF",
    pipelineLabel: "Data Engineering Pipeline",
    pipeline: [
      { icon: "🌐", label: "Data Sources" },
      { icon: "⚙️", label: "ETL Engine" },
      { icon: "🏢", label: "Data Warehouse" },
      { icon: "📈", label: "Analytics" },
      { icon: "💡", label: "BI Insights" },
    ],
  },
  {
    id: "design",
    number: "02",
    title: "Design & Architecture",
    description: "We design the technical foundation — from system architecture and high-dimensional vector databases to APIs and automated AI workflows.",
    features: [
      "System & Solution Architecture",
      "Database & API Design",
      "AI & Data Workflows",
    ],
    imageSrc: "/static/img/method_eng.jpg",
    color: "#9D7AFF",
    pipelineLabel: "Generative AI & RAG",
    pipeline: [
      { icon: "📄", label: "Raw Docs" },
      { icon: "📉", label: "Embedding" },
      { icon: "🗄️", label: "Vector DB" },
      { icon: "🔍", label: "Retrieval" },
      { icon: "💬", label: "Generation" },
    ],
  },
  {
    id: "develop",
    number: "03",
    title: "Development & Testing",
    description: "We turn the approved design into a working solution through structured development, integration, and strict quality assurance validation.",
    features: [
      "Development & Integration",
      "Testing & Validation",
      "Security & Performance",
    ],
    imageSrc: "/static/img/method_ai.jpg",
    color: "#7EE787",
    pipelineLabel: "AI Agents & Automation",
    pipeline: [
      { icon: "👤", label: "User Intent" },
      { icon: "🧠", label: "Reasoning" },
      { icon: "⚙️", label: "Execution" },
      { icon: "🗄️", label: "Memory" },
      { icon: "⚡", label: "Action" },
    ],
  },
  {
    id: "deploy",
    number: "04",
    title: "Deployment & Evolution",
    description: "We deploy the solution securely into production, monitoring system telemetry, resolving anomalies, and scaling as your enterprise grows.",
    features: [
      "Production Deployment",
      "Monitoring & Optimization",
      "Continuous Improvements",
    ],
    imageSrc: "/static/img/method_scale.jpg",
    color: "#F5A623",
    pipelineLabel: "Cloud Architecture",
    pipeline: [
      { icon: "💻", label: "Interface" },
      { icon: "🚪", label: "API Gateway" },
      { icon: "🧩", label: "Microservices" },
      { icon: "☁️", label: "Cloud DB" },
      { icon: "🌍", label: "CDN" },
    ],
  },
];

/* ─── Main Component ─── */

export default function HowWeBuild() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const activePhase = PHASES[activeIdx];

  // Pipeline animation
  useEffect(() => {
    setActiveStep(0);
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % activePhase.pipeline.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [activeIdx, activePhase.pipeline.length]);

  return (
    <section id="how-we-build" className="how-we-build-section reveal">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <span className="overline highlight">How We Build AI</span>
          <h2 className="section-heading text-gradient">Enterprise Engineering</h2>
          <p className="subtext text-center mx-auto" style={{ maxWidth: "800px" }}>
            A disciplined process powered by elite frameworks — from discovery to deployment.
          </p>
        </div>

        {/* Tech Stack Marquee */}
        <div className="marquee-container" style={{ marginBottom: "64px", borderRadius: "var(--radius-lg)" }}>
          <div className="marquee-content">
            {TECHS.map((tech, i) => (
              <span key={i}>{tech}</span>
            ))}
            {TECHS.map((tech, i) => (
              <span key={`dup-${i}`}>{tech}</span>
            ))}
          </div>
        </div>

        {/* Interactive Dashboard / Command Center */}
        <div className="dashboard-container glass-panel">
          
          {/* Left Sidebar Navigation */}
          <div className="dashboard-sidebar">
            <div className="mono-label" style={{ padding: "0 24px", marginBottom: "24px", color: "var(--c-text-secondary)" }}>
              PROJECT LIFECYCLE
            </div>
            <div className="dashboard-nav-list">
              {PHASES.map((phase, idx) => (
                <button
                  key={phase.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`dashboard-nav-btn ${activeIdx === idx ? "active" : ""}`}
                  style={{ borderLeftColor: activeIdx === idx ? phase.color : "transparent" }}
                >
                  <span className="mono-label" style={{ color: activeIdx === idx ? phase.color : "var(--c-text-secondary)", transition: "color 0.3s" }}>
                    PHASE {phase.number}
                  </span>
                  <span className="nav-title">{phase.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Main Stage */}
          <div className="dashboard-main">
            {/* Background Image of current phase (highly faded) */}
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, opacity: 0.1 }}>
              <Image
                src={activePhase.imageSrc}
                alt={activePhase.title}
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>

            <div className="dashboard-content" key={activePhase.id}>
              
              {/* Top Text Content */}
              <div className="dashboard-text-block">
                <h3 style={{ fontSize: "36px", marginBottom: "16px", color: "#fff" }}>
                  {activePhase.title}
                </h3>
                <p style={{ color: "var(--c-text-secondary)", fontSize: "18px", lineHeight: 1.6, maxWidth: "600px", marginBottom: "32px" }}>
                  {activePhase.description}
                </p>
                
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  {activePhase.features.map((feat, fIdx) => (
                    <div key={fIdx} className="feature-chip" style={{ border: `1px solid ${activePhase.color}40`, color: activePhase.color }}>
                      {feat}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Pipeline Visualization */}
              <div className="dashboard-pipeline-block glass-panel">
                <div className="mono-label" style={{ color: activePhase.color, marginBottom: "32px", textAlign: "center", letterSpacing: "2px" }}>
                  [ {activePhase.pipelineLabel} ]
                </div>
                
                <div className="pipeline-flow active" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                  {activePhase.pipeline.map((step, idx) => {
                    const isGlow = activeStep === idx || activeStep === idx - 1 || (activeStep === 0 && idx === 0);
                    return (
                      <div key={idx} style={{ display: "flex", alignItems: "center", width: idx === activePhase.pipeline.length - 1 ? "auto" : "100%" }}>
                        
                        <div className={`pipe-node ${isGlow ? "active-glow" : ""}`} data-label={step.label} style={isGlow ? { borderColor: activePhase.color, boxShadow: `0 0 20px ${activePhase.color}40` } : {}}>
                          <div className="pipe-icon">{step.icon}</div>
                        </div>

                        {idx < activePhase.pipeline.length - 1 && (
                          <div className={`pipe-arrow ${activeStep === idx ? "active-flow" : ""}`} style={activeStep === idx ? { background: `linear-gradient(90deg, ${activePhase.color}, transparent)` } : {}} />
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
