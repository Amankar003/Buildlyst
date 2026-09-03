"use client";

import { useState } from "react";

interface CommandStudy {
  title: string;
  clientLocation: string;
  roi: string;
  problem: string;
  solution: string;
  impact: string;
  tech: string[];
}

interface CommandTrack {
  id: string;
  sector: string;
  icon: string;
  tagline: string;
  studies: CommandStudy[];
}

const COMMAND_TRACKS: CommandTrack[] = [
  {
    id: "retail",
    sector: "Retail & D2C E-Commerce",
    icon: "🛍️",
    tagline: "Automated retention, cart recovery, and WhatsApp conversational AI.",
    studies: [
      {
        title: "Retail WhatsApp Loyalty Engine",
        clientLocation: "Bhopal, MP",
        roi: "+42% Retention • 2.5x Revenue",
        problem: "Losing 25% of repeat customers monthly due to unorganized customer sales logs.",
        solution: "Cloud Data Warehouse + Automated AI WhatsApp Offer & Loyalty Engine.",
        impact: "Completely halted customer churn and delivered 2.5x total revenue growth in 60 days.",
        tech: ["FastAPI", "WhatsApp API", "Data Warehouse"]
      },
      {
        title: "D2C Cart Recovery AI Agent",
        clientLocation: "Delhi, NCR",
        roi: "$14.5k/mo Recovered",
        problem: "68% cart abandonment rate burning $12,000 monthly in ad spend with zero recovery.",
        solution: "Autonomous Multi-Channel AI Re-engagement Agent on WhatsApp & Email.",
        impact: "Recovered 35% of abandoned carts, generating $14.5k net new monthly revenue.",
        tech: ["LangChain", "OpenAI", "React"]
      },
      {
        title: "AI Size Recommendation Widget",
        clientLocation: "Mumbai, MH",
        roi: "52% Fewer Returns",
        problem: "35% return rate due to sizing confusion, burning $18,000 monthly in return shipping.",
        solution: "AI Size Recommendation Widget trained on customer foot metrics.",
        impact: "Cut sizing returns by 52% and increased first-time buyer checkout confidence by 40%.",
        tech: ["PyTorch", "FastAPI", "Next.js"]
      }
    ]
  },
  {
    id: "health",
    sector: "Healthcare & Data Warehousing",
    icon: "🏥",
    tagline: "HIPAA-compliant ETL pipelines, Redshift analytics, and radiology OCR.",
    studies: [
      {
        title: "HealthTech Redshift ETL Warehouse",
        clientLocation: "Bengaluru, KA",
        roi: "100% HIPAA • 10x Speed",
        problem: "Patient data trapped across 5 legacy database silos, blocking business decisions.",
        solution: "HIPAA-compliant ETL data pipeline normalizing records into AWS Redshift.",
        impact: "Unified 5 data silos into 1 dashboard, cutting report time from 3 days to < 5 seconds.",
        tech: ["AWS Redshift", "Airflow", "Snowflake"]
      },
      {
        title: "Radiology OCR & LLM Extractor",
        clientLocation: "Hyderabad, TS",
        roi: "95% Faster Processing",
        problem: "Radiology labs spent 15 hours daily manually keying PDF medical reports.",
        solution: "OCR + Medical LLM Entity Extraction pipeline running on edge servers.",
        impact: "Automated 95% of report data entry with 99.8% precision accuracy.",
        tech: ["OpenAI Vision", "FastAPI", "Python"]
      }
    ]
  },
  {
    id: "legal",
    sector: "Legal Tech & Compliance",
    icon: "⚖️",
    tagline: "Enterprise RAG document intelligence and automated regulatory risk monitoring.",
    studies: [
      {
        title: "Enterprise RAG Contract Audit System",
        clientLocation: "Mumbai, MH",
        roi: "10x Audit Speed",
        problem: "Attorneys spent 20+ hours weekly auditing 100-page commercial contracts.",
        solution: "Enterprise RAG Document Classification & Automated Risk Audit System.",
        impact: "Accelerated contract review speed by 10x while detecting 100% of compliance anomalies.",
        tech: ["RAG", "Vector DB", "FastAPI"]
      },
      {
        title: "Automated Regulatory Risk Agent",
        clientLocation: "Gurugram, HR",
        roi: "100% Compliance",
        problem: "Fintech firm missed regulatory policy changes, facing compliance fines.",
        solution: "Web Scraping & Semantic LLM Compliance Alert Agent.",
        impact: "Eliminated all compliance penalties and alerted team within 15 minutes of updates.",
        tech: ["Python", "LangGraph", "PostgreSQL"]
      }
    ]
  }
];

export default function ProofOfImpactOption6() {
  const [expandedTrackId, setExpandedTrackId] = useState<string>("retail");

  const toggleTrack = (id: string) => {
    setExpandedTrackId((prev) => (prev === id ? "" : id));
  };

  return (
    <section className="projects-section reveal" style={{ padding: "80px 0", background: "rgba(0,0,0,0.3)" }}>
      <div className="container">
        {/* Header */}
        <div className="section-header text-center" style={{ marginBottom: "48px" }}>
          <span
            className="overline highlight"
            style={{
              background: "rgba(0, 210, 255, 0.15)",
              color: "var(--c-accent-cyan)",
              padding: "4px 14px",
              borderRadius: "20px"
            }}
          >
            OPTION 6: INDUSTRY COMMAND CENTER & ACCORDION MATRIX
          </span>
          <h2 className="section-heading text-gradient" style={{ fontSize: "36px", marginTop: "12px" }}>
            Enterprise Domain Blueprints
          </h2>
          <p className="subtext text-center">
            Expand any industry sector to inspect our case study blueprints and ROI telemetry.
          </p>
        </div>

        {/* Command Accordion Tracks */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {COMMAND_TRACKS.map((track) => {
            const isExpanded = track.id === expandedTrackId;
            return (
              <div
                key={track.id}
                className="glass-panel"
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: isExpanded ? "1.5px solid var(--c-accent-cyan)" : "1px solid rgba(255, 255, 255, 0.08)",
                  background: isExpanded ? "rgba(10, 12, 16, 0.9)" : "rgba(10, 12, 16, 0.6)",
                  boxShadow: isExpanded ? "0 0 30px rgba(0, 210, 255, 0.15)" : "none",
                  transition: "all 0.3s ease"
                }}
              >
                {/* Accordion Bar Header */}
                <div
                  onClick={() => toggleTrack(track.id)}
                  style={{
                    padding: "24px 32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    userSelect: "none"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <span style={{ fontSize: "32px" }}>{track.icon}</span>
                    <div>
                      <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#fff", margin: 0 }}>
                        {track.sector}
                      </h3>
                      <span style={{ fontSize: "13px", color: "var(--c-text-secondary)" }}>
                        {track.tagline}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <span
                      style={{
                        padding: "6px 14px",
                        borderRadius: "20px",
                        background: "rgba(0, 210, 255, 0.15)",
                        color: "var(--c-accent-cyan)",
                        fontSize: "12px",
                        fontWeight: 700
                      }}
                    >
                      {track.studies.length} Case Studies Available
                    </span>
                    <span style={{ fontSize: "20px", color: "var(--c-accent-cyan)", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}>
                      ▼
                    </span>
                  </div>
                </div>

                {/* Expanded Content: 2-3 Case Study Cards Side-by-Side */}
                {isExpanded && (
                  <div
                    style={{
                      padding: "0 32px 32px 32px",
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                      gap: "20px",
                      borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                      paddingTop: "24px"
                    }}
                  >
                    {track.studies.map((std, i) => (
                      <div
                        key={i}
                        style={{
                          padding: "20px",
                          borderRadius: "14px",
                          background: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px"
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--c-accent-cyan)" }}>
                            📍 {std.clientLocation}
                          </span>
                          <span style={{ fontSize: "11px", fontWeight: 800, color: "#27c93f", background: "rgba(39,201,63,0.15)", padding: "2px 8px", borderRadius: "10px" }}>
                            ⚡ {std.roi}
                          </span>
                        </div>

                        <h4 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", margin: 0 }}>
                          {std.title}
                        </h4>

                        <div style={{ fontSize: "12.5px", lineHeight: "1.4", color: "rgba(255,255,255,0.8)" }}>
                          <p style={{ margin: "0 0 6px 0" }}><strong>Problem:</strong> {std.problem}</p>
                          <p style={{ margin: "0 0 6px 0" }}><strong>Solution:</strong> {std.solution}</p>
                          <p style={{ margin: 0, color: "#fff" }}><strong>Impact:</strong> {std.impact}</p>
                        </div>

                        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "auto" }}>
                          {std.tech.map((t, idx) => (
                            <span key={idx} className="tag" style={{ fontSize: "10px" }}>{t}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
