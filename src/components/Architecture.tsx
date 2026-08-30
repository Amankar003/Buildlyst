"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface FlowStep {
  icon: string;
  label: string;
}

interface DisciplineFlow {
  id: string;
  title: string;
  steps: FlowStep[];
}

const DISCIPLINES: DisciplineFlow[] = [
  {
    id: "agents",
    title: "AI Agents",
    steps: [
      { icon: "👤", label: "User Intent" },
      { icon: "🧠", label: "Reasoning Engine" },
      { icon: "⚙️", label: "Tool Execution" },
      { icon: "🗄️", label: "Vector Memory" },
      { icon: "⚡", label: "Autonomous Action" },
    ],
  },
  {
    id: "genai",
    title: "Gen AI",
    steps: [
      { icon: "📄", label: "Raw Documents" },
      { icon: "📉", label: "Embedding Model" },
      { icon: "🗄️", label: "Vector Database" },
      { icon: "🔍", label: "Context Retrieval" },
      { icon: "💬", label: "Generated Response" },
    ],
  },
  {
    id: "ml",
    title: "Machine Learning",
    steps: [
      { icon: "📦", label: "Raw Data" },
      { icon: "🧹", label: "Preprocessing" },
      { icon: "🖥️", label: "Model Training" },
      { icon: "📊", label: "Evaluation" },
      { icon: "🎯", label: "Real-time Inference" },
    ],
  },
  {
    id: "data",
    title: "Data Engineering",
    steps: [
      { icon: "🌐", label: "Data Sources" },
      { icon: "⚙️", label: "ETL Pipeline" },
      { icon: "🏢", label: "Data Warehouse" },
      { icon: "📈", label: "Analytics Engine" },
      { icon: "💡", label: "Business Intelligence" },
    ],
  },
  {
    id: "web",
    title: "Web Development",
    steps: [
      { icon: "💻", label: "User Interface" },
      { icon: "🚪", label: "API Gateway" },
      { icon: "🧩", label: "Microservices" },
      { icon: "☁️", label: "Cloud Database" },
      { icon: "🌍", label: "CDN Delivery" },
    ],
  },
];

const TECHS = [
  "Python", "FastAPI", "React", "Next.js", "AWS", "Docker", "Kubernetes",
  "OpenAI", "PyTorch", "TensorFlow", "PostgreSQL", "Snowflake", "Pinecone",
  "LangChain", "Redis", "Celery"
];

export default function Architecture() {
  const [activeTab, setActiveTab] = useState("agents");
  const [activeStep, setActiveStep] = useState(0);

  // Animate the pipeline flow sequentially
  useEffect(() => {
    setActiveStep(0);
    const flow = DISCIPLINES.find((d) => d.id === activeTab);
    if (!flow) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % (flow.steps.length));
    }, 1500);

    return () => clearInterval(interval);
  }, [activeTab]);

  const activeFlow = DISCIPLINES.find((d) => d.id === activeTab);

  return (
    <section id="architecture" className="architecture-section reveal">
      <div className="container">
        <div className="section-header text-center">
          <span className="overline highlight">Engineering Core</span>
          <h2 className="section-heading text-gradient">Enterprise Architecture</h2>
          <p className="subtext text-center mx-auto">
            Built on a foundation of elite frameworks, tailored for specific autonomous use-cases.
          </p>
          <div style={{ marginTop: "24px" }}>
            <Link href="#services" className="btn btn-secondary glass-btn">
              View Full Service Technical Specs &rarr;
            </Link>
          </div>
        </div>

        {/* Infinite Tech Marquee */}
        <div className="marquee-container" style={{ marginBottom: "48px", borderRadius: "var(--radius-lg)" }}>
          <div className="marquee-content">
            {TECHS.map((tech, i) => (
              <span key={i}>{tech}</span>
            ))}
            {/* Duplicate for infinite scroll */}
            {TECHS.map((tech, i) => (
              <span key={`dup-${i}`}>{tech}</span>
            ))}
          </div>
        </div>

        {/* Architecture Tabs */}
        <div className="arch-tabs">
          {DISCIPLINES.map((d) => (
            <button
              key={d.id}
              className={`arch-tab-btn ${activeTab === d.id ? "active" : ""}`}
              onClick={() => setActiveTab(d.id)}
            >
              {d.title}
            </button>
          ))}
        </div>

        {/* Dynamic Pipeline Container */}
        <div className="pipeline-container glass-panel glow-border p-lg">
          {activeFlow && (
            <div className="pipeline-flow active" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {activeFlow.steps.map((step, idx) => {
                // Determine glow state
                // The current node is glowing if the laser is currently passing through it
                const isGlow = activeStep === idx || activeStep === idx - 1 || (activeStep === 0 && idx === 0);

                return (
                  <div key={idx} style={{ display: "flex", alignItems: "center", width: idx === activeFlow.steps.length - 1 ? "auto" : "100%" }}>
                    
                    {/* Node */}
                    <div className={`pipe-node ${isGlow ? "active-glow" : ""}`} data-label={step.label}>
                      <div className="pipe-icon">{step.icon}</div>
                    </div>

                    {/* Arrow (except last node) */}
                    {idx < activeFlow.steps.length - 1 && (
                      <div className={`pipe-arrow ${activeStep === idx ? "active-flow" : ""}`} />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
