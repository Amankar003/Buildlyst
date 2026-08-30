"use client";

import { useState } from "react";
import TiltCard from "./TiltCard";
import Link from "next/link";

interface PricingTier {
  title: string;
  price: string;
  features: string[];
}

interface PricingCategory {
  t1: PricingTier;
  t2: PricingTier;
  t3: PricingTier;
}

const PRICING_MATRIX: Record<string, PricingCategory> = {
  web: {
    t1: { title: "Launch", price: "₹35K+", features: ["Custom UI/UX", "Responsive frontend", "Basic backend/API", "Deployment"] },
    t2: { title: "Build", price: "₹1L+", features: ["Full-stack application architecture", "Database design", "Authentication", "Admin dashboard", "One third-party integration", "Deployment"] },
    t3: { title: "Scale", price: "₹2.5L+", features: ["Scalable application architecture", "Advanced security", "Cloud deployment", "Multiple third-party integrations", "Performance optimization"] }
  },
  data: {
    t1: { title: "Insight", price: "₹40K+", features: ["Data cleaning", "Exploratory data analysis", "KPI analysis", "Interactive dashboard", "Business insights"] },
    t2: { title: "Pipeline", price: "₹90K+", features: ["Automated ETL/ELT", "Multiple data sources", "Database optimization", "Scheduled data pipelines", "Basic data warehouse setup"] },
    t3: { title: "Data Platform", price: "₹1.75L+", features: ["Cloud data warehouse", "Multiple data pipelines", "Data quality checks", "Analytics layer", "API/data access"] }
  },
  ml: {
    t1: { title: "Predict", price: "₹75K+", features: ["Data preparation", "Feature engineering", "ML model development", "Model evaluation", "Prediction report"] },
    t2: { title: "Intelligence", price: "₹1.5L+", features: ["Advanced ML", "Multiple features/models", "Prediction API", "Analytics dashboard", "Model deployment"] },
    t3: { title: "Enterprise ML", price: "₹3L+", features: ["Production ML pipeline", "Model serving", "Model monitoring", "Automated retraining", "Scalable infrastructure"] }
  },
  ai: {
    t1: { title: "AI Workflow", price: "₹50K+", features: ["LLM integration", "Single AI workflow", "Prompt/system design", "Basic tool/API integration", "Deployment"] },
    t2: { title: "AI Knowledge System", price: "₹1.5L+", features: ["Custom RAG", "Vector database", "Data ingestion", "Retrieval optimization", "Citations", "AI chat interface"] },
    t3: { title: "Autonomous AI", price: "₹3.5L+", features: ["Multi-agent architecture", "Tool orchestration", "Advanced RAG", "AI guardrails", "Monitoring", "Production deployment"] }
  },
  consulting: {
    t1: { title: "Tech Audit", price: "₹20K+", features: ["Codebase review", "Architecture review", "Dependency assessment", "Basic security assessment", "Technical improvement report"] },
    t2: { title: "Strategy Sprint", price: "₹50K+", features: ["One-week discovery", "Architecture planning", "Technology stack selection", "Feasibility analysis", "Prototype blueprint", "Implementation roadmap"] },
    t3: { title: "Fractional CTO", price: "₹1.5L+/mo", features: ["Weekly strategy sessions", "Architecture leadership", "Engineering roadmap", "Team guidance", "Vendor evaluation", "Technical decision support"] }
  }
};

const CATEGORIES = [
  { key: "web", label: "Web & Product Engineering" },
  { key: "data", label: "Data Engineering & Analytics" },
  { key: "ml", label: "Data Science & ML" },
  { key: "ai", label: "GenAI & AI Agents" },
  { key: "consulting", label: "Strategy Consulting" }
];

export default function Pricing() {
  const [activeCat, setActiveCat] = useState("web");
  const [fade, setFade] = useState(false);

  // Predictor states
  const [service, setService] = useState("1");
  const [complexity, setComplexity] = useState("1");
  const [timeline, setTimeline] = useState("1");
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictedPrice, setPredictedPrice] = useState<string | null>(null);

  const handleCategoryChange = (key: string) => {
    setFade(true);
    setTimeout(() => {
      setActiveCat(key);
      setFade(false);
    }, 200);
  };

  const handlePredict = () => {
    setIsPredicting(true);
    setPredictedPrice(null);

    // Cost Predictor Model Simulation
    setTimeout(() => {
      const serviceVal = parseInt(service);
      const complexityVal = parseInt(complexity);
      const timelineVal = parseFloat(timeline);

      // Base Price
      let base = 0;
      if (serviceVal === 1) base = 30000;
      if (serviceVal === 2) base = 99000;
      if (serviceVal === 3) base = 150000;
      if (serviceVal === 4) base = 300000;

      // Complexity Multiplier
      let multiplier = 1;
      if (complexityVal === 2) multiplier = 1.8;
      if (complexityVal === 3) multiplier = 3.5;

      const finalCost = Math.round(base * multiplier * timelineVal);
      const formatted = finalCost.toLocaleString("en-IN");

      setPredictedPrice(`₹${formatted}`);
      setIsPredicting(false);
    }, 800);
  };

  const activeData = PRICING_MATRIX[activeCat];

  return (
    <section id="pricing" className="pricing-section reveal">
      <div className="container">
        <div className="section-header text-center" style={{ marginBottom: "48px" }}>
          <span className="overline highlight">Engagement Models</span>
          <h2 className="section-heading text-gradient" style={{ fontSize: "32px" }}>Tailored Pricing Matrix</h2>
          <p className="subtext text-center">Select a service category to view our engagement tiers.</p>
        </div>

        <div className="pricing-matrix" style={{ display: "flex", gap: "48px", marginBottom: "48px", alignItems: "stretch" }}>
          {/* Left: Sidebar Tabs */}
          <div className="pricing-sidebar" style={{ flex: "0 0 280px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                className={`pricing-tab ${activeCat === cat.key ? "active" : ""}`}
                onClick={() => handleCategoryChange(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Right: Dynamic Cards */}
          <div
            className="pricing-content"
            style={{
              flex: 1,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
              opacity: fade ? 0 : 1,
              transition: "opacity 0.2s ease",
              minHeight: "480px"
            }}
          >
            {/* Tier 1 */}
            <TiltCard className="pricing-card glass-panel" style={{ padding: "32px 24px", textAlign: "left" }}>
              <h4 style={{ color: "var(--c-text-secondary)", marginBottom: "8px" }}>{activeData.t1.title}</h4>
              <div className="price" style={{ fontSize: "32px", marginBottom: "24px" }}>{activeData.t1.price}</div>
              <ul className="pricing-features" style={{ minHeight: "140px" }}>
                {activeData.t1.features.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>
              <Link href="#contact" className="btn glass-btn w-100">Get Started</Link>
            </TiltCard>

            {/* Tier 2 (Pro/Featured) */}
            <TiltCard
              className="pricing-card glass-panel featured-pricing"
              style={{
                padding: "36px 24px 32px 24px",
                textAlign: "left",
                position: "relative",
                overflow: "visible",
                border: "1px solid rgba(0, 210, 255, 0.5)",
                boxShadow: "0 0 30px rgba(0, 210, 255, 0.15)"
              }}
            >
              <div
                className="popular-badge"
                style={{
                  position: "absolute",
                  top: "-14px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: "10px",
                  fontWeight: 800,
                  padding: "4px 14px",
                  borderRadius: "12px",
                  background: "linear-gradient(90deg, #00D2FF, #8A2387)",
                  color: "#ffffff",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  boxShadow: "0 0 15px rgba(0,210,255,0.6)",
                  zIndex: 10,
                  whiteSpace: "nowrap"
                }}
              >
                Most Popular
              </div>
              <h4 style={{ color: "var(--c-accent-cyan)", marginBottom: "8px" }}>{activeData.t2.title}</h4>
              <div className="price" style={{ fontSize: "32px", marginBottom: "24px" }}>{activeData.t2.price}</div>
              <ul className="pricing-features" style={{ minHeight: "140px" }}>
                {activeData.t2.features.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>
              <Link href="#contact" className="btn glow-border-btn w-100">Select Pro</Link>
            </TiltCard>

            {/* Tier 3 */}
            <TiltCard className="pricing-card glass-panel" style={{ padding: "32px 24px", textAlign: "left" }}>
              <h4 style={{ color: "var(--c-text-secondary)", marginBottom: "8px" }}>{activeData.t3.title}</h4>
              <div className="price" style={{ fontSize: "32px", marginBottom: "24px" }}>{activeData.t3.price}</div>
              <ul className="pricing-features" style={{ minHeight: "140px" }}>
                {activeData.t3.features.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>
              <Link href="#contact" className="btn glass-btn w-100">Contact Sales</Link>
            </TiltCard>
          </div>
        </div>

        {/* Bottom Predictor Banner (Single Line Strip) */}
        <div
          className="pricing-predictor-banner glass-panel compact-banner"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 32px",
            borderRadius: "100px",
            gap: "24px",
            background: "rgba(0,0,0,0.4)",
            border: "1px solid rgba(0,210,255,0.2)"
          }}
        >
          <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "24px" }}>🔮</span>
            <h4 style={{ margin: 0, fontSize: "16px" }}>AI Predictor</h4>
          </div>

          <form style={{ flex: 1, display: "flex", gap: "12px", margin: 0 }}>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="glass-input"
              style={{ flex: 1, padding: "10px 16px", borderRadius: "50px", background: "#fff", color: "#000", border: "none", outline: "none", fontWeight: 500 }}
            >
              <option value="1">Web & App</option>
              <option value="2">AI Agents</option>
              <option value="3">Data Pipeline</option>
              <option value="4">Enterprise</option>
            </select>

            <select
              value={complexity}
              onChange={(e) => setComplexity(e.target.value)}
              className="glass-input"
              style={{ flex: 1, padding: "10px 16px", borderRadius: "50px", background: "#fff", color: "#000", border: "none", outline: "none", fontWeight: 500 }}
            >
              <option value="1">Basic MVP</option>
              <option value="2">Scalable</option>
              <option value="3">Enterprise</option>
            </select>

            <select
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              className="glass-input"
              style={{ flex: 1, padding: "10px 16px", borderRadius: "50px", background: "#fff", color: "#000", border: "none", outline: "none", fontWeight: 500 }}
            >
              <option value="1">Relaxed Timeline</option>
              <option value="1.2">Standard Delivery</option>
              <option value="1.5">Rush (Fast-Track)</option>
            </select>

            <button
              type="button"
              onClick={handlePredict}
              disabled={isPredicting}
              className="btn glow-border-btn"
              style={{ padding: "10px 32px", borderRadius: "50px" }}
            >
              {isPredicting ? "Running Model..." : "Run Model"}
            </button>
          </form>

          {/* Predictor output display */}
          <div
            id="predictionResult"
            style={{
              flex: "0 0 140px",
              textAlign: "right",
              display: predictedPrice ? "block" : "none"
            }}
          >
            <div
              className="price text-gradient"
              style={{
                fontSize: "28px",
                margin: 0,
                fontWeight: "bold",
                lineHeight: 1,
                animation: predictedPrice ? "pulse 1s" : "none"
              }}
            >
              {predictedPrice}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
