"use client";

import { useState } from "react";
import Image from "next/image";

interface CaseStudyOption2 {
  id: string;
  client: string;
  industry: string;
  location: string;
  metric: string;
  metricLabel: string;
  secondaryMetric: string;
  challenge: string;
  solution: string;
  imageSrc: string;
  tech: string[];
}

const PROJECTS_DATA: CaseStudyOption2[] = [
  {
    id: "bhopal-retail",
    client: "Retail Store Automation Engine",
    industry: "Retail & Local Commerce",
    location: "Bhopal, MP",
    metric: "+42%",
    metricLabel: "Repeat Retention",
    secondaryMetric: "2.5x Revenue",
    challenge: "Losing 25% of repeat customers monthly due to manual data logging and unorganized customer records.",
    solution: "Architected a custom Cloud Data Warehouse with an Automated AI WhatsApp Loyalty & Offer Dispatch Engine.",
    imageSrc: "/static/img/fintech.jpg",
    tech: ["FastAPI", "Data Warehouse", "WhatsApp API", "Python"]
  },
  {
    id: "delhi-d2c",
    client: "D2C Cart Recovery & AI Agent",
    industry: "E-Commerce",
    location: "Delhi, NCR",
    metric: "$14.5k",
    metricLabel: "Monthly Recovered",
    secondaryMetric: "35% Recovery Rate",
    challenge: "68% cart abandonment rate, burning $12,000 monthly in ad spend with zero automated follow-up.",
    solution: "Engineered an Autonomous Multi-Channel AI Re-engagement Agent operating on WhatsApp & Email.",
    imageSrc: "/static/img/ai_support.jpg",
    tech: ["Autonomous Agent", "LangChain", "OpenAI", "React"]
  },
  {
    id: "health-etl",
    client: "Enterprise HealthTech Warehouse",
    industry: "Healthcare & Data",
    location: "Bengaluru, KA",
    metric: "100%",
    metricLabel: "HIPAA Compliant",
    secondaryMetric: "< 5s Query Latency",
    challenge: "Unstructured patient data trapped across 5 legacy database silos, blocking business decisions.",
    solution: "Engineered a secure, HIPAA-compliant ETL data pipeline normalizing records into an AWS Redshift warehouse.",
    imageSrc: "/static/img/healthtech.jpg",
    tech: ["AWS Redshift", "Airflow", "Snowflake", "Python"]
  },
  {
    id: "legal-audit",
    client: "Enterprise RAG Contract Audit",
    industry: "Legal Tech",
    location: "Mumbai, MH",
    metric: "10x",
    metricLabel: "Faster Reviews",
    secondaryMetric: "0 Compliance Errors",
    challenge: "Attorneys spent 20+ hours weekly manually auditing 100-page commercial contracts for compliance risks.",
    solution: "Delivered a secure Enterprise RAG Document Classification & Automated Risk Audit System.",
    imageSrc: "/static/img/case_legal.png",
    tech: ["Enterprise RAG", "Vector DB", "FastAPI", "Python"]
  }
];

export default function ProofOfImpactOption2() {
  const [selectedId, setSelectedId] = useState<string>(PROJECTS_DATA[0].id);
  const activeProject = PROJECTS_DATA.find((p) => p.id === selectedId) || PROJECTS_DATA[0];

  return (
    <section className="projects-section reveal" style={{ padding: "80px 0", background: "rgba(0,0,0,0.3)" }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center" style={{ marginBottom: "48px" }}>
          <span className="overline highlight" style={{ background: "rgba(0, 210, 255, 0.1)", padding: "4px 14px", borderRadius: "20px" }}>
            OPTION 2: INTERACTIVE SPLIT SHOWCASE
          </span>
          <h2 className="section-heading text-gradient" style={{ fontSize: "36px", marginTop: "12px" }}>
            Enterprise Transformation Studio
          </h2>
          <p className="subtext text-center">
            Click any case study on the left to inspect the telemetry, architecture, and ROI results.
          </p>
        </div>

        {/* Split Showcase Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.3fr",
            gap: "32px",
            alignItems: "stretch"
          }}
        >
          {/* Left Column: Interactive Project List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {PROJECTS_DATA.map((proj) => {
              const isSelected = proj.id === selectedId;
              return (
                <div
                  key={proj.id}
                  onClick={() => setSelectedId(proj.id)}
                  className="glass-panel"
                  style={{
                    padding: "20px 24px",
                    borderRadius: "16px",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    border: isSelected ? "1.5px solid var(--c-accent-cyan)" : "1px solid rgba(255, 255, 255, 0.08)",
                    background: isSelected ? "rgba(0, 210, 255, 0.08)" : "rgba(10, 12, 16, 0.6)",
                    boxShadow: isSelected ? "0 0 25px rgba(0, 210, 255, 0.2)" : "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "16px"
                  }}
                >
                  <div>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--c-text-secondary)", textTransform: "uppercase" }}>
                      {proj.industry} • {proj.location}
                    </span>
                    <h4 style={{ fontSize: "17px", fontWeight: 700, color: "#fff", margin: "4px 0 0 0" }}>
                      {proj.client}
                    </h4>
                  </div>

                  {/* Impact Metric Badge */}
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: "20px", fontWeight: 800, color: "var(--c-accent-cyan)" }}>
                      {proj.metric}
                    </div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)" }}>
                      {proj.metricLabel}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Live Showcase Display Frame */}
          <div
            className="glass-panel"
            style={{
              borderRadius: "20px",
              padding: "32px",
              border: "1px solid rgba(0, 210, 255, 0.25)",
              background: "rgba(10, 12, 16, 0.85)",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              position: "relative",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)"
            }}
          >
            {/* Top Image Preview Banner */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "220px",
                borderRadius: "14px",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}
            >
              <Image
                src={activeProject.imageSrc}
                alt={activeProject.client}
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(10,12,16,0.9) 0%, transparent 60%)"
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "16px",
                  left: "20px",
                  display: "flex",
                  gap: "12px",
                  alignItems: "center"
                }}
              >
                <span
                  style={{
                    padding: "6px 16px",
                    borderRadius: "30px",
                    background: "linear-gradient(90deg, #00D2FF, #8A2387)",
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: 800,
                    boxShadow: "0 0 15px rgba(0,210,255,0.5)"
                  }}
                >
                  ⚡ {activeProject.metric} {activeProject.metricLabel}
                </span>
                <span
                  style={{
                    padding: "6px 14px",
                    borderRadius: "30px",
                    background: "rgba(0,0,0,0.6)",
                    backdropFilter: "blur(8px)",
                    color: "#27c93f",
                    fontSize: "12px",
                    fontWeight: 700,
                    border: "1px solid rgba(39,201,63,0.3)"
                  }}
                >
                  ✓ {activeProject.secondaryMetric}
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div>
              <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#fff", marginBottom: "16px" }}>
                {activeProject.client}
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "14px", lineHeight: "1.6" }}>
                <div style={{ padding: "14px", borderRadius: "10px", background: "rgba(255, 95, 86, 0.08)", borderLeft: "3px solid #ff5f56" }}>
                  <strong style={{ color: "#ff5f56", fontSize: "11px", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                    🚨 THE CHALLENGE
                  </strong>
                  <span style={{ color: "rgba(255,255,255,0.9)" }}>{activeProject.challenge}</span>
                </div>

                <div style={{ padding: "14px", borderRadius: "10px", background: "rgba(0, 210, 255, 0.08)", borderLeft: "3px solid var(--c-accent-cyan)" }}>
                  <strong style={{ color: "var(--c-accent-cyan)", fontSize: "11px", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                    ⚡ THE ENGINEERED SOLUTION
                  </strong>
                  <span style={{ color: "rgba(255,255,255,0.9)" }}>{activeProject.solution}</span>
                </div>
              </div>
            </div>

            {/* Bottom Tech Stack */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: "auto" }}>
              {activeProject.tech.map((t, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    padding: "4px 12px",
                    borderRadius: "20px",
                    background: "rgba(255,255,255,0.06)",
                    color: "var(--c-text-secondary)",
                    border: "1px solid rgba(255,255,255,0.1)"
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
