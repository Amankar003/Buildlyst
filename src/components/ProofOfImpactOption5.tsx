"use client";

import { useState } from "react";
import Image from "next/image";

interface FlipCardItem {
  id: string;
  title: string;
  location: string;
  roi: string;
  beforeStat: string;
  afterStat: string;
  problem: string;
  solution: string;
  imageSrc: string;
  tech: string[];
}

const TABBED_INDUSTRIES: Record<string, { name: string; cases: FlipCardItem[] }> = {
  retail: {
    name: "🛍️ Retail & D2C",
    cases: [
      {
        id: "r1",
        title: "Retail WhatsApp Loyalty Engine",
        location: "Bhopal, MP",
        roi: "+42% Retention",
        beforeStat: "25% Monthly Churn",
        afterStat: "2.5x Revenue Growth",
        problem: "Losing 25% of repeat customers monthly due to unorganized customer sales logs.",
        solution: "Cloud Data Warehouse + Automated AI WhatsApp Offer & Loyalty Engine.",
        imageSrc: "/static/img/fintech.jpg",
        tech: ["FastAPI", "WhatsApp API", "Data Warehouse"]
      },
      {
        id: "r2",
        title: "D2C Cart Recovery AI Agent",
        location: "Delhi, NCR",
        roi: "$14.5k/mo Recovered",
        beforeStat: "68% Cart Abandonment",
        afterStat: "35% Carts Recovered",
        problem: "68% cart abandonment rate burning $12,000 monthly in ad spend with zero recovery.",
        solution: "Autonomous Multi-Channel AI Re-engagement Agent operating on WhatsApp & Email.",
        imageSrc: "/static/img/ai_support.jpg",
        tech: ["LangChain", "OpenAI", "React"]
      },
      {
        id: "r3",
        title: "AI Size Recommendation Widget",
        location: "Mumbai, MH",
        roi: "52% Fewer Returns",
        beforeStat: "35% Sizing Return Rate",
        afterStat: "40% Higher Confidence",
        problem: "35% return rate due to sizing confusion, burning $18,000 monthly in return shipping.",
        solution: "AI Size Recommendation Widget trained on customer foot metrics.",
        imageSrc: "/static/img/laptop_scene.png",
        tech: ["PyTorch", "FastAPI", "Next.js"]
      }
    ]
  },
  health: {
    name: "🏥 Healthcare & Data",
    cases: [
      {
        id: "h1",
        title: "HealthTech Redshift ETL Warehouse",
        location: "Bengaluru, KA",
        roi: "100% HIPAA • 10x Speed",
        beforeStat: "3 Days Prep Time",
        afterStat: "< 5s Instant BI",
        problem: "Patient data trapped across 5 legacy database silos, blocking business decisions.",
        solution: "Secure, HIPAA-compliant ETL data pipeline normalizing records into AWS Redshift.",
        imageSrc: "/static/img/healthtech.jpg",
        tech: ["AWS Redshift", "Airflow", "Snowflake"]
      },
      {
        id: "h2",
        title: "Radiology OCR & LLM Extractor",
        location: "Hyderabad, TS",
        roi: "95% Faster Processing",
        beforeStat: "15 Hours Manual Entry",
        afterStat: "99.8% Precision",
        problem: "Radiology labs spent 15 hours daily manually keying PDF medical reports.",
        solution: "OCR + Medical LLM Entity Extraction pipeline running on edge servers.",
        imageSrc: "/static/img/method_ai.jpg",
        tech: ["OpenAI Vision", "FastAPI", "Python"]
      }
    ]
  },
  legal: {
    name: "⚖️ Legal & Finance",
    cases: [
      {
        id: "l1",
        title: "Enterprise RAG Contract Audit System",
        location: "Mumbai, MH",
        roi: "10x Audit Speed",
        beforeStat: "20 Hrs/wk Manual Review",
        afterStat: "0% Compliance Errors",
        problem: "Attorneys spent 20+ hours weekly auditing 100-page commercial contracts.",
        solution: "Enterprise RAG Document Classification & Automated Risk Audit System.",
        imageSrc: "/static/img/case_legal.png",
        tech: ["RAG", "Vector DB", "FastAPI"]
      },
      {
        id: "l2",
        title: "Automated Regulatory Risk Agent",
        location: "Gurugram, HR",
        roi: "100% Compliance",
        beforeStat: "$50k Potential Fines",
        afterStat: "15-Min Instant Alerts",
        problem: "Fintech firm missed regulatory policy changes, facing compliance fines.",
        solution: "Web Scraping & Semantic LLM Compliance Alert Agent.",
        imageSrc: "/static/img/hero_scene.png",
        tech: ["Python", "LangGraph", "PostgreSQL"]
      }
    ]
  }
};

export default function ProofOfImpactOption5() {
  const [activeTabKey, setActiveTabKey] = useState<string>("retail");
  const currentIndustry = TABBED_INDUSTRIES[activeTabKey];

  return (
    <section className="projects-section reveal" style={{ padding: "80px 0" }}>
      <div className="container">
        {/* Header */}
        <div className="section-header text-center" style={{ marginBottom: "40px" }}>
          <span
            className="overline highlight"
            style={{
              background: "rgba(138, 35, 135, 0.15)",
              color: "#c084fc",
              padding: "4px 14px",
              borderRadius: "20px"
            }}
          >
            OPTION 5: TABBED INDUSTRY PORTAL WITH FLIP REVEAL CARDS
          </span>
          <h2 className="section-heading text-gradient" style={{ fontSize: "36px", marginTop: "12px" }}>
            Industry Specific Transformation Portals
          </h2>
          <p className="subtext text-center">
            Switch between industry tabs to inspect 3 specialized case study cards per sector.
          </p>
        </div>

        {/* Industry Navigation Tabs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "40px",
            flexWrap: "wrap"
          }}
        >
          {Object.keys(TABBED_INDUSTRIES).map((key) => {
            const ind = TABBED_INDUSTRIES[key];
            const isActive = key === activeTabKey;
            return (
              <button
                key={key}
                onClick={() => setActiveTabKey(key)}
                style={{
                  padding: "10px 24px",
                  borderRadius: "30px",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  border: isActive ? "1.5px solid #c084fc" : "1px solid rgba(255,255,255,0.1)",
                  background: isActive ? "rgba(138, 35, 135, 0.25)" : "rgba(255,255,255,0.03)",
                  color: isActive ? "#ffffff" : "var(--c-text-secondary)",
                  boxShadow: isActive ? "0 0 20px rgba(192, 132, 252, 0.4)" : "none"
                }}
              >
                {ind.name}
              </button>
            );
          })}
        </div>

        {/* 3 Flip Cards Display */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px"
          }}
        >
          {currentIndustry.cases.map((cCard) => (
            <div
              key={cCard.id}
              className="glass-panel"
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                background: "rgba(10, 12, 16, 0.85)",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                position: "relative"
              }}
            >
              {/* Image Header with ROI Overlay */}
              <div style={{ position: "relative", width: "100%", height: "200px" }}>
                <Image src={cCard.imageSrc} alt={cCard.title} fill style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,12,16,0.95), transparent)" }} />
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    background: "linear-gradient(90deg, #00D2FF, #8A2387)",
                    color: "#fff",
                    fontSize: "11px",
                    fontWeight: 800,
                    boxShadow: "0 0 15px rgba(0,210,255,0.5)"
                  }}
                >
                  ⚡ {cCard.roi}
                </div>
                <div style={{ position: "absolute", bottom: "12px", left: "16px", fontSize: "11px", fontWeight: 700, color: "var(--c-accent-cyan)" }}>
                  📍 {cCard.location}
                </div>
              </div>

              {/* Body Content */}
              <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}>
                <h4 style={{ fontSize: "19px", fontWeight: 700, color: "#fff", margin: 0 }}>
                  {cCard.title}
                </h4>

                {/* Before / After Metrics Transformation Pills */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div style={{ padding: "10px", borderRadius: "10px", background: "rgba(255,95,86,0.08)", border: "1px solid rgba(255,95,86,0.2)", textAlign: "center" }}>
                    <span style={{ fontSize: "10px", color: "#ff5f56", fontWeight: 800, textTransform: "uppercase", display: "block" }}>BEFORE</span>
                    <span style={{ fontSize: "12px", color: "#fff", fontWeight: 700 }}>{cCard.beforeStat}</span>
                  </div>
                  <div style={{ padding: "10px", borderRadius: "10px", background: "rgba(39,201,63,0.08)", border: "1px solid rgba(39,201,63,0.2)", textAlign: "center" }}>
                    <span style={{ fontSize: "10px", color: "#27c93f", fontWeight: 800, textTransform: "uppercase", display: "block" }}>AFTER</span>
                    <span style={{ fontSize: "12px", color: "#27c93f", fontWeight: 700 }}>{cCard.afterStat}</span>
                  </div>
                </div>

                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)", margin: 0, lineHeight: "1.5" }}>
                  <strong>Solution:</strong> {cCard.solution}
                </p>

                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "auto", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  {cCard.tech.map((t, i) => (
                    <span key={i} className="tag" style={{ fontSize: "10.5px" }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
