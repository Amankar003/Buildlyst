"use client";

import { useState } from "react";
import Image from "next/image";

interface SubCaseStudy {
  title: string;
  location: string;
  roi: string;
  problem: string;
  solution: string;
  impact: string;
  tags: string[];
  imageSrc: string;
}

interface IndustryGroup {
  id: string;
  name: string;
  icon: string;
  description: string;
  cases: SubCaseStudy[];
}

const INDUSTRIES_DATA: IndustryGroup[] = [
  {
    id: "retail",
    name: "Retail & D2C E-Commerce",
    icon: "🛍️",
    description: "Automating customer retention, cart recovery, and personalized AI shopping experiences.",
    cases: [
      {
        title: "Retail Store Automation Engine",
        location: "Bhopal, MP",
        roi: "+42% Retention",
        problem: "Losing 25% of repeat customers monthly due to unorganized customer sales logs.",
        solution: "Built a Cloud Data Warehouse with an Automated WhatsApp Offer Engine.",
        impact: "Halted churn, +42% repeat retention, and 2.5x revenue in 60 days.",
        tags: ["FastAPI", "WhatsApp API", "Data Warehouse"],
        imageSrc: "/static/img/fintech.jpg"
      },
      {
        title: "Autonomous D2C Cart Recovery Agent",
        location: "Delhi, NCR",
        roi: "$14.5k/mo Recovered",
        problem: "68% cart abandonment rate burning $12,000 monthly in ad spend with zero recovery.",
        solution: "Engineered an Autonomous AI Re-engagement Agent on WhatsApp & Email.",
        impact: "Recovered 35% of abandoned carts, generating $14.5k net new monthly revenue.",
        tags: ["LangChain", "OpenAI", "React"],
        imageSrc: "/static/img/ai_support.jpg"
      },
      {
        title: "AI Size & Fit Recommendation Widget",
        location: "Mumbai, MH",
        roi: "52% Fewer Returns",
        problem: "35% return rate due to sizing confusion, burning $18,000 monthly in return shipping.",
        solution: "Built an AI Size Recommendation Widget trained on customer foot metrics.",
        impact: "Cut sizing returns by 52% and increased first-time buyer checkout confidence by 40%.",
        tags: ["PyTorch", "FastAPI", "Next.js"],
        imageSrc: "/static/img/laptop_scene.png"
      }
    ]
  },
  {
    id: "health",
    name: "Healthcare & Data Engineering",
    icon: "🏥",
    description: "HIPAA-compliant data warehouses, patient ETL pipelines, and predictive analytics.",
    cases: [
      {
        title: "HealthTech Redshift ETL Pipeline",
        location: "Bengaluru, KA",
        roi: "100% HIPAA • 10x BI",
        problem: "Patient data trapped across 5 legacy database silos, blocking analytics.",
        solution: "Engineered a secure ETL data pipeline into an AWS Redshift warehouse.",
        impact: "Unified 5 data silos into 1 dashboard, cutting report time from 3 days to < 5 seconds.",
        tags: ["AWS Redshift", "Airflow", "Snowflake"],
        imageSrc: "/static/img/healthtech.jpg"
      },
      {
        title: "AI Diagnostics Document Parser",
        location: "Hyderabad, TS",
        roi: "95% Faster Processing",
        problem: "Radiology labs spent 15 hours daily manually keying PDF medical reports.",
        solution: "Deployed an OCR + Medical LLM Entity Extraction pipeline.",
        impact: "Automated 95% of report data entry with 99.8% precision accuracy.",
        tags: ["OpenAI Vision", "FastAPI", "Python"],
        imageSrc: "/static/img/method_ai.jpg"
      }
    ]
  },
  {
    id: "legal",
    name: "Legal Tech & Compliance",
    icon: "⚖️",
    description: "Secure Enterprise RAG, automated contract audits, and compliance anomaly detection.",
    cases: [
      {
        title: "Enterprise RAG Contract Audit System",
        location: "Mumbai, MH",
        roi: "10x Speed • 0 Errors",
        problem: "Attorneys spent 20+ hours weekly auditing 100-page commercial contracts.",
        solution: "Delivered an Enterprise RAG Document Classification & Audit System.",
        impact: "Accelerated contract reviews by 10x while detecting 100% of anomalies.",
        tags: ["RAG", "Vector DB", "FastAPI"],
        imageSrc: "/static/img/case_legal.png"
      },
      {
        title: "Automated Regulatory Risk Monitor",
        location: "Gurugram, HR",
        roi: "100% Compliance",
        problem: "Fintech firm missed regulatory policy changes, facing compliance fines.",
        solution: "Engineered a Web Scraping & Semantic LLM Compliance Alert Agent.",
        impact: "Eliminated all compliance penalties and alerted team within 15 minutes of updates.",
        tags: ["Python", "LangGraph", "PostgreSQL"],
        imageSrc: "/static/img/hero_scene.png"
      }
    ]
  },
  {
    id: "manufacturing",
    name: "Manufacturing & Industrial IoT",
    icon: "🏭",
    description: "Predictive maintenance streams, factory uptime ML, and supply chain optimization.",
    cases: [
      {
        title: "IoT Factory Predictive Maintenance Engine",
        location: "Ahmedabad, GJ",
        roi: "99.99% Uptime",
        problem: "Motor breakdowns halted production lines, costing $45,000 per outage.",
        solution: "Installed IoT Sensor Data Streaming with Predictive Maintenance ML.",
        impact: "Achieved 99.99% factory uptime and saved $180,000 annually.",
        tags: ["IoT Streaming", "PyTorch", "Docker"],
        imageSrc: "/static/img/method_arch.jpg"
      },
      {
        title: "Supply Chain Route & Inventory Optimizer",
        location: "Chennai, TN",
        roi: "18% Fuel Savings",
        problem: "Logistics fleet suffered 22% delayed deliveries due to route inefficiencies.",
        solution: "Built a Dynamic Graph Routing Algorithm integrated with GPS telematics.",
        impact: "Reduced delivery delays by 85% and saved 18% in monthly fleet fuel costs.",
        tags: ["FastAPI", "Redis", "Python"],
        imageSrc: "/static/img/case_supply.png"
      }
    ]
  }
];

export default function ProofOfImpactOption4() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("retail");
  const activeGroup = INDUSTRIES_DATA.find((ind) => ind.id === selectedIndustry) || INDUSTRIES_DATA[0];

  return (
    <section className="projects-section reveal" style={{ padding: "80px 0", background: "rgba(10,12,16,0.6)" }}>
      <div className="container">
        {/* Header */}
        <div className="section-header text-center" style={{ marginBottom: "40px" }}>
          <span
            className="overline highlight"
            style={{
              background: "rgba(39, 201, 63, 0.12)",
              color: "#27c93f",
              padding: "4px 14px",
              borderRadius: "20px"
            }}
          >
            OPTION 4: INDUSTRY CARDS → EXPANDABLE SUB-CASE MATRIX
          </span>
          <h2 className="section-heading text-gradient" style={{ fontSize: "36px", marginTop: "12px" }}>
            Tailored AI & Engineering by Industry
          </h2>
          <p className="subtext text-center">
            Select an industry sector below to reveal our 2-3 specific case studies and client ROI.
          </p>
        </div>

        {/* STEP 1: Industry Selection Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px",
            marginBottom: "40px"
          }}
        >
          {INDUSTRIES_DATA.map((ind) => {
            const isSelected = ind.id === selectedIndustry;
            return (
              <div
                key={ind.id}
                onClick={() => setSelectedIndustry(ind.id)}
                className="glass-panel"
                style={{
                  padding: "20px",
                  borderRadius: "16px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  border: isSelected ? "1.5px solid var(--c-accent-cyan)" : "1px solid rgba(255, 255, 255, 0.08)",
                  background: isSelected ? "rgba(0, 210, 255, 0.12)" : "rgba(255, 255, 255, 0.02)",
                  boxShadow: isSelected ? "0 0 25px rgba(0, 210, 255, 0.25)" : "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "28px" }}>{ind.icon}</span>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "3px 10px",
                      borderRadius: "12px",
                      background: isSelected ? "var(--c-accent-cyan)" : "rgba(255,255,255,0.08)",
                      color: isSelected ? "#000" : "var(--c-text-secondary)"
                    }}
                  >
                    {ind.cases.length} Case Studies
                  </span>
                </div>

                <h4 style={{ fontSize: "17px", fontWeight: 700, color: "#fff", margin: 0 }}>
                  {ind.name}
                </h4>
                <p style={{ fontSize: "12px", color: "var(--c-text-secondary)", margin: 0, lineHeight: 1.4 }}>
                  {ind.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* STEP 2: Display 2-3 Sub-Case Studies for Selected Industry */}
        <div style={{ marginTop: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <span style={{ fontSize: "24px" }}>{activeGroup.icon}</span>
            <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#fff", margin: 0 }}>
              {activeGroup.name} Case Studies ({activeGroup.cases.length} Featured)
            </h3>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "24px"
            }}
          >
            {activeGroup.cases.map((cItem, idx) => (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  background: "rgba(10, 12, 16, 0.8)",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                {/* Header Image */}
                <div style={{ position: "relative", width: "100%", height: "180px" }}>
                  <Image src={cItem.imageSrc} alt={cItem.title} fill style={{ objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,12,16,0.95), transparent)" }} />
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      padding: "4px 12px",
                      borderRadius: "14px",
                      background: "linear-gradient(90deg, #00D2FF, #27c93f)",
                      color: "#000",
                      fontSize: "11px",
                      fontWeight: 800
                    }}
                  >
                    ⚡ {cItem.roi}
                  </div>
                  <div style={{ position: "absolute", bottom: "12px", left: "16px", fontSize: "11px", fontWeight: 700, color: "var(--c-accent-cyan)" }}>
                    📍 {cItem.location}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "14px", flex: 1 }}>
                  <h4 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", margin: 0 }}>
                    {cItem.title}
                  </h4>

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px" }}>
                    <div>
                      <strong style={{ color: "#ff5f56", fontSize: "11px", display: "block" }}>🚨 THE CHALLENGE</strong>
                      <span style={{ color: "rgba(255,255,255,0.85)" }}>{cItem.problem}</span>
                    </div>
                    <div>
                      <strong style={{ color: "var(--c-accent-cyan)", fontSize: "11px", display: "block" }}>⚡ SOLUTION DELIVERED</strong>
                      <span style={{ color: "rgba(255,255,255,0.85)" }}>{cItem.solution}</span>
                    </div>
                    <div>
                      <strong style={{ color: "#27c93f", fontSize: "11px", display: "block" }}>📈 MEASURABLE ROI</strong>
                      <span style={{ color: "#fff", fontWeight: 600 }}>{cItem.impact}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "auto", paddingTop: "10px" }}>
                    {cItem.tags.map((t, i) => (
                      <span key={i} className="tag" style={{ fontSize: "10.5px" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
