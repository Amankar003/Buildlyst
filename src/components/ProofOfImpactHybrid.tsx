"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface ProjectCaseStudy {
  id: string;
  title: string;
  category: "AI & Automation" | "Data Engineering" | "Retail & D2C" | "Enterprise";
  location: string;
  roiBadge: string;
  challenge: string;
  solution: string;
  impact: string;
  imageSrc: string;
  tags: string[];
}

const CASE_STUDIES: ProjectCaseStudy[] = [
  {
    id: "bhopal-retail",
    title: "Retail Store Automation & AI Retention Engine",
    category: "Retail & D2C",
    location: "Bhopal, MP",
    roiBadge: "+42% Retention • 2.5x Revenue",
    challenge: "A retail business was losing 25% of repeat customers monthly with zero customer tracking and sales dropping.",
    solution: "Built a custom Cloud Data Warehouse connected to an Automated AI WhatsApp Offer & Loyalty Engine.",
    impact: "Completely halted customer churn, boosted repeat retention by +42%, and delivered 2.5x total revenue growth in 60 days.",
    imageSrc: "/static/img/fintech.jpg",
    tags: ["Data Warehouse", "FastAPI", "WhatsApp API", "Python"]
  },
  {
    id: "delhi-d2c",
    title: "Autonomous D2C Cart Recovery & AI Agent",
    category: "Retail & D2C",
    location: "Delhi, NCR",
    roiBadge: "$14.5k/mo Recovered Sales",
    challenge: "A fashion brand suffered a 68% cart abandonment rate, burning $12,000 monthly in ad spend with zero automated recovery.",
    solution: "Engineered an Autonomous Multi-Channel AI Re-engagement Agent operating on WhatsApp & Email.",
    impact: "Recovered 35% of abandoned carts, generating $14.5k in net new monthly revenue while cutting acquisition costs.",
    imageSrc: "/static/img/ai_support.jpg",
    tags: ["Autonomous Agent", "LangChain", "OpenAI", "React"]
  },
  {
    id: "health-etl",
    title: "Enterprise HealthTech ETL & Analytics Warehouse",
    category: "Data Engineering",
    location: "Bengaluru, KA",
    roiBadge: "100% HIPAA • 10x Faster BI",
    challenge: "A healthcare provider had unstructured patient data trapped across 5 legacy database silos, blocking business decisions.",
    solution: "Engineered a secure, HIPAA-compliant ETL data pipeline normalizing records into a centralized AWS Redshift warehouse.",
    impact: "Unified 5 data silos into 1 dashboard, cutting executive report prep time from 3 days to under 5 seconds.",
    imageSrc: "/static/img/healthtech.jpg",
    tags: ["AWS Redshift", "Airflow", "Snowflake", "Python"]
  },
  {
    id: "edtech-tutor",
    title: "24/7 Adaptive AI Code Tutor Agent",
    category: "AI & Automation",
    location: "Remote / Global",
    roiBadge: "2.8x Course Completion",
    challenge: "An EdTech platform saw a 70% student drop-out during complex coding modules due to lack of immediate night-time help.",
    solution: "Built an Adaptive AI Code Tutor Agent providing 24/7 instant debug assistance and context-aware feedback.",
    impact: "Increased course completion rates by 2.8x and boosted student satisfaction scores from 3.2 to 4.9 stars.",
    imageSrc: "/static/img/method_ai.jpg",
    tags: ["AI Agent", "RAG", "Pinecone", "FastAPI"]
  },
  {
    id: "legal-audit",
    title: "Enterprise RAG Contract Audit System",
    category: "Enterprise",
    location: "Mumbai, MH",
    roiBadge: "10x Audit Speed • 0 Error",
    challenge: "Attorneys spent 20+ hours weekly manually auditing 100-page commercial contracts for compliance risks.",
    solution: "Delivered a secure Enterprise RAG Document Classification & Automated Risk Audit System.",
    impact: "Accelerated contract review speed by 10x while detecting 100% of compliance anomalies automatically.",
    imageSrc: "/static/img/case_legal.png",
    tags: ["Enterprise RAG", "Vector DB", "FastAPI", "Python"]
  },
  {
    id: "mfg-predictive",
    title: "IoT Factory Predictive Maintenance Engine",
    category: "Enterprise",
    location: "Ahmedabad, GJ",
    roiBadge: "99.99% Uptime • $180k Saved",
    challenge: "A manufacturing plant suffered motor breakdowns that halted production lines unexpectedly, costing $45k per outage.",
    solution: "Installed an IoT Sensor Data Streaming Pipeline paired with Predictive Maintenance ML Models.",
    impact: "Achieved 99.99% factory uptime, completely eliminated emergency outages, and saved $180,000 annually.",
    imageSrc: "/static/img/method_arch.jpg",
    tags: ["IoT Streaming", "PyTorch", "TimesScaleDB", "Docker"]
  }
];

const FILTER_CATEGORIES = ["All", "AI & Automation", "Data Engineering", "Retail & D2C", "Enterprise"];

export default function ProofOfImpactHybrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (trackRef.current) {
      const scrollAmount = 440;
      trackRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const filteredProjects = activeCategory === "All"
    ? CASE_STUDIES
    : CASE_STUDIES.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="projects-section reveal" style={{ padding: "80px 0" }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center" style={{ marginBottom: "40px" }}>
          <span className="overline highlight">Proof of Impact</span>
          <h2 className="section-heading text-gradient" style={{ fontSize: "36px" }}>
            Featured Case Studies & ROI
          </h2>
          <p className="subtext text-center">
            Real enterprise challenges transformed into measurable business outcomes.
          </p>
        </div>

        {/* Industry Filter Chips */}
        <div
          className="scenario-filter-chips"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "40px"
          }}
        >
          {FILTER_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`chip-btn ${activeCategory === cat ? "active" : ""}`}
              style={{
                padding: "8px 20px",
                borderRadius: "30px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s ease",
                border: activeCategory === cat ? "1.5px solid var(--c-accent-cyan)" : "1px solid rgba(255, 255, 255, 0.12)",
                background: activeCategory === cat ? "rgba(0, 210, 255, 0.18)" : "rgba(255, 255, 255, 0.03)",
                color: activeCategory === cat ? "#ffffff" : "var(--c-text-secondary)",
                boxShadow: activeCategory === cat ? "0 0 20px rgba(0, 210, 255, 0.35)" : "none"
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Carousel Container */}
        <div className="projects-carousel" style={{ position: "relative" }}>
          <div
            className="carousel-track"
            id="projects-track"
            ref={trackRef}
            style={{
              display: "flex",
              gap: "28px",
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              paddingBottom: "24px",
              scrollbarWidth: "none"
            }}
          >
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="project-card glass-panel"
                style={{
                  flex: "0 0 420px",
                  maxWidth: "420px",
                  scrollSnapAlign: "start",
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  background: "rgba(10, 12, 16, 0.75)",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease"
                }}
              >
                {/* Hero Image Container with ROI Badge */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "220px",
                    overflow: "hidden"
                  }}
                >
                  <Image
                    src={proj.imageSrc}
                    alt={proj.title}
                    fill
                    style={{
                      objectFit: "cover",
                      objectPosition: "top center",
                      transition: "transform 0.5s ease"
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(10,12,16,0.95) 0%, rgba(10,12,16,0.3) 60%, transparent 100%)"
                    }}
                  />

                  {/* Top-Left Location Tag */}
                  <div
                    style={{
                      position: "absolute",
                      top: "14px",
                      left: "14px",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      background: "rgba(0, 0, 0, 0.65)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#fff"
                    }}
                  >
                    📍 {proj.location}
                  </div>

                  {/* Top-Right Glowing ROI Badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "14px",
                      right: "14px",
                      padding: "5px 12px",
                      borderRadius: "20px",
                      background: "linear-gradient(90deg, rgba(0,210,255,0.9), rgba(39,201,63,0.9))",
                      color: "#000000",
                      fontSize: "11px",
                      fontWeight: 800,
                      boxShadow: "0 0 15px rgba(0,210,255,0.5)",
                      letterSpacing: "0.5px"
                    }}
                  >
                    ⚡ {proj.roiBadge}
                  </div>

                  {/* Card Title on Image */}
                  <h3
                    style={{
                      position: "absolute",
                      bottom: "16px",
                      left: "20px",
                      right: "20px",
                      fontSize: "19px",
                      fontWeight: 700,
                      color: "#ffffff",
                      margin: 0,
                      lineHeight: 1.3,
                      textShadow: "0 2px 8px rgba(0,0,0,0.8)"
                    }}
                  >
                    {proj.title}
                  </h3>
                </div>

                {/* Card Body Content */}
                <div
                  className="project-content"
                  style={{
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    flex: 1
                  }}
                >
                  {/* Clean 3-Phase Story Format */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "13.5px", lineHeight: "1.5" }}>
                    <div>
                      <strong style={{ color: "#ff5f56", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.8px", display: "block", marginBottom: "3px" }}>
                        🚨 The Challenge
                      </strong>
                      <span style={{ color: "rgba(255, 255, 255, 0.85)" }}>{proj.challenge}</span>
                    </div>

                    <div>
                      <strong style={{ color: "var(--c-accent-cyan)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.8px", display: "block", marginBottom: "3px" }}>
                        ⚡ The Solution
                      </strong>
                      <span style={{ color: "rgba(255, 255, 255, 0.85)" }}>{proj.solution}</span>
                    </div>

                    <div>
                      <strong style={{ color: "#27c93f", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.8px", display: "block", marginBottom: "3px" }}>
                        📈 Measurable ROI
                      </strong>
                      <span style={{ color: "#ffffff", fontWeight: 500 }}>{proj.impact}</span>
                    </div>
                  </div>

                  {/* Tech Tags */}
                  <div
                    className="project-tags"
                    style={{
                      display: "flex",
                      gap: "8px",
                      flexWrap: "wrap",
                      marginTop: "auto",
                      paddingTop: "12px",
                      borderTop: "1px solid rgba(255, 255, 255, 0.08)"
                    }}
                  >
                    {proj.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="tag"
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          padding: "4px 10px",
                          borderRadius: "12px",
                          background: "rgba(255, 255, 255, 0.05)",
                          color: "var(--c-text-secondary)",
                          border: "1px solid rgba(255, 255, 255, 0.08)"
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <div className="carousel-controls" style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "24px" }}>
            <button
              className="carousel-btn glass-btn"
              onClick={() => scroll("left")}
              aria-label="Previous Case Study"
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer"
              }}
            >
              ❮
            </button>
            <button
              className="carousel-btn glass-btn"
              onClick={() => scroll("right")}
              aria-label="Next Case Study"
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer"
              }}
            >
              ❯
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
