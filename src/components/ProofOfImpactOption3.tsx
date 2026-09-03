"use client";

import Image from "next/image";

export default function ProofOfImpactOption3() {
  return (
    <section className="projects-section reveal" style={{ padding: "80px 0" }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center" style={{ marginBottom: "48px" }}>
          <span
            className="overline highlight"
            style={{
              background: "rgba(138, 35, 135, 0.15)",
              color: "#c084fc",
              padding: "4px 14px",
              borderRadius: "20px",
              border: "1px solid rgba(192, 132, 252, 0.3)"
            }}
          >
            OPTION 3: BENTO GRID SHOWCASE
          </span>
          <h2 className="section-heading text-gradient" style={{ fontSize: "36px", marginTop: "12px" }}>
            Architected for High-Growth Enterprises
          </h2>
          <p className="subtext text-center">
            Explore our featured client transformations in a dynamic Bento grid.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px"
          }}
        >
          {/* Card 1: Large Featured Hero Bento (Spans 2 Columns) */}
          <div
            className="glass-panel"
            style={{
              gridColumn: "span 2",
              borderRadius: "24px",
              padding: "36px",
              background: "linear-gradient(135deg, rgba(15,18,25,0.9), rgba(10,12,16,0.95))",
              border: "1px solid rgba(0, 210, 255, 0.3)",
              boxShadow: "0 0 40px rgba(0, 210, 255, 0.12)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "24px",
              position: "relative",
              overflow: "hidden"
            }}
          >
            {/* Top Row: Tag & Glowing Impact Badge */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "var(--c-accent-cyan)",
                  textTransform: "uppercase",
                  letterSpacing: "1px"
                }}
              >
                🏆 FEATURED CASE STUDY • BHOPAL, MP
              </span>
              <span
                style={{
                  padding: "6px 16px",
                  borderRadius: "30px",
                  background: "linear-gradient(90deg, #00D2FF, #27c93f)",
                  color: "#000",
                  fontSize: "12px",
                  fontWeight: 800,
                  boxShadow: "0 0 20px rgba(0,210,255,0.4)"
                }}
              >
                ⚡ +42% RETENTION & 2.5X REVENUE
              </span>
            </div>

            {/* Middle: Title & 3-Part Story Grid */}
            <div>
              <h3 style={{ fontSize: "26px", fontWeight: 700, color: "#fff", marginBottom: "20px" }}>
                Retail Store Automation & AI Retention Engine
              </h3>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div style={{ padding: "16px", borderRadius: "12px", background: "rgba(255, 95, 86, 0.08)", borderLeft: "4px solid #ff5f56" }}>
                  <span style={{ fontSize: "11px", fontWeight: 800, color: "#ff5f56", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                    🚨 THE CHALLENGE
                  </span>
                  <p style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.85)", margin: 0, lineHeight: "1.5" }}>
                    Losing 25% of repeat customers monthly with zero data tracking & sales plummeting.
                  </p>
                </div>

                <div style={{ padding: "16px", borderRadius: "12px", background: "rgba(0, 210, 255, 0.08)", borderLeft: "4px solid var(--c-accent-cyan)" }}>
                  <span style={{ fontSize: "11px", fontWeight: 800, color: "var(--c-accent-cyan)", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                    ⚡ THE SOLUTION
                  </span>
                  <p style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.85)", margin: 0, lineHeight: "1.5" }}>
                    Custom Cloud Data Warehouse connected to an Automated AI WhatsApp Offer Engine.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Metrics Bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: "20px",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                marginTop: "auto"
              }}
            >
              <div style={{ display: "flex", gap: "24px" }}>
                <div>
                  <div style={{ fontSize: "24px", fontWeight: 800, color: "#27c93f" }}>+42%</div>
                  <div style={{ fontSize: "11px", color: "var(--c-text-secondary)" }}>Repeat Retention</div>
                </div>
                <div>
                  <div style={{ fontSize: "24px", fontWeight: 800, color: "var(--c-accent-cyan)" }}>2.5x</div>
                  <div style={{ fontSize: "11px", color: "var(--c-text-secondary)" }}>Revenue Growth</div>
                </div>
                <div>
                  <div style={{ fontSize: "24px", fontWeight: 800, color: "#fff" }}>60 Days</div>
                  <div style={{ fontSize: "11px", color: "var(--c-text-secondary)" }}>Time to ROI</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <span className="tag">FastAPI</span>
                <span className="tag">WhatsApp API</span>
                <span className="tag">Python</span>
              </div>
            </div>
          </div>

          {/* Card 2: Vertical Bento (1 Column) */}
          <div
            className="glass-panel"
            style={{
              borderRadius: "24px",
              padding: "28px",
              background: "rgba(10, 12, 16, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "20px"
            }}
          >
            <div>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#c084fc", textTransform: "uppercase" }}>
                E-COMMERCE • DELHI
              </span>
              <h4 style={{ fontSize: "20px", fontWeight: 700, color: "#fff", margin: "8px 0 12px 0" }}>
                D2C Cart Recovery Agent
              </h4>
              <div
                style={{
                  display: "inline-block",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  background: "rgba(39, 201, 63, 0.15)",
                  color: "#27c93f",
                  fontSize: "12px",
                  fontWeight: 800,
                  marginBottom: "16px"
                }}
              >
                ⚡ $14.5k/mo Recovered
              </div>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: "1.5", margin: 0 }}>
                Recovered 35% of abandoned carts using an Autonomous Multi-Channel AI Re-engagement Agent on WhatsApp & Email.
              </p>
            </div>

            <div style={{ paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: "6px" }}>
              <span className="tag">LangChain</span>
              <span className="tag">OpenAI</span>
            </div>
          </div>

          {/* Card 3: Vertical Bento 2 (1 Column) */}
          <div
            className="glass-panel"
            style={{
              borderRadius: "24px",
              padding: "28px",
              background: "rgba(10, 12, 16, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "20px"
            }}
          >
            <div>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--c-accent-cyan)", textTransform: "uppercase" }}>
                DATA & HEALTH • BENGALURU
              </span>
              <h4 style={{ fontSize: "20px", fontWeight: 700, color: "#fff", margin: "8px 0 12px 0" }}>
                HealthTech Redshift ETL
              </h4>
              <div
                style={{
                  display: "inline-block",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  background: "rgba(0, 210, 255, 0.15)",
                  color: "var(--c-accent-cyan)",
                  fontSize: "12px",
                  fontWeight: 800,
                  marginBottom: "16px"
                }}
              >
                ⚡ 100% HIPAA & 10x BI Speed
              </div>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: "1.5", margin: 0 }}>
                Unified 5 legacy patient data silos into 1 Redshift warehouse, reducing report prep time from 3 days to under 5 seconds.
              </p>
            </div>

            <div style={{ paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: "6px" }}>
              <span className="tag">AWS Redshift</span>
              <span className="tag">Airflow</span>
            </div>
          </div>

          {/* Card 4: Wide Full-Width Bento Banner (Spans 2 Columns) */}
          <div
            className="glass-panel"
            style={{
              gridColumn: "span 2",
              borderRadius: "24px",
              padding: "28px 36px",
              background: "rgba(10, 12, 16, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "24px"
            }}
          >
            <div>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#27c93f", textTransform: "uppercase" }}>
                LEGAL TECH • MUMBAI
              </span>
              <h4 style={{ fontSize: "20px", fontWeight: 700, color: "#fff", margin: "4px 0" }}>
                Enterprise RAG Contract Audit System
              </h4>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", margin: 0 }}>
                Accelerated contract review speed by 10x while detecting 100% of compliance anomalies with zero human error.
              </p>
            </div>

            <div
              style={{
                flexShrink: 0,
                padding: "10px 20px",
                borderRadius: "30px",
                background: "rgba(39, 201, 63, 0.15)",
                color: "#27c93f",
                border: "1px solid rgba(39, 201, 63, 0.3)",
                fontSize: "14px",
                fontWeight: 800
              }}
            >
              ⚡ 10x Audit Speed
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
