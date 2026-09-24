import Link from "next/link";
import Image from "next/image";

interface MethodCard {
  number: string;
  title: string;
  description: string;
  features: string[];
  imageSrc: string;
  stickyTop: number;
}

const PHASES: MethodCard[] = [
  {
    number: "01",
    title: "Discovery & Planning",
    description: "We start by understanding your business goals, requirements, existing workflows, data, and technical environment. We define the project scope, identify the right approach, and create a clear roadmap before development begins.",
    features: [
      "Business & Requirement Analysis",
      "Technical Feasibility & Scope",
      "Project Roadmap & Planning"
    ],
    imageSrc: "/static/img/method_arch.jpg",
    stickyTop: 100
  },
  {
    number: "02",
    title: "Design & Architecture",
    description: "We design the right technical foundation for your solution — from system architecture and databases to APIs, AI workflows, and user experiences. Every decision is made with reliability, scalability, and maintainability in mind.",
    features: [
      "System & Solution Architecture",
      "Database & API Design",
      "AI, Data & Product Workflows"
    ],
    imageSrc: "/static/img/method_eng.jpg",
    stickyTop: 140
  },
  {
    number: "03",
    title: "Development & Testing",
    description: "We turn the approved design into a working solution through structured development, integration, and testing. Whether it is an AI system, data pipeline, ML model, or digital product, we validate the solution against real-world requirements before release.",
    features: [
      "Development & Integration",
      "Testing & Quality Validation",
      "Security & Performance Checks"
    ],
    imageSrc: "/static/img/method_ai.jpg",
    stickyTop: 180
  },
  {
    number: "04",
    title: "Deployment & Evolution",
    description: "We take the solution into production and continue improving it after launch. We monitor performance, resolve issues, optimize the system, and make it easier to scale as your business and requirements grow.",
    features: [
      "Production Deployment",
      "Monitoring & Optimization",
      "Continuous Improvements"
    ],
    imageSrc: "/static/img/method_scale.jpg",
    stickyTop: 220
  }
];

export default function Methodology() {
  return (
    <section id="methodology" className="scroll-stack-section reveal">
      <div className="container">
        <div className="section-header text-center">
          <span className="overline highlight">Process</span>
          <h2 className="section-heading text-gradient">Engineering Methodology</h2>
          <p className="subtext text-center mx-auto">
            A disciplined, scalable engineering approach built for production AI systems.
          </p>
        </div>

        <div className="scroll-stack-container">
          {PHASES.map((phase, idx) => (
            <div
              key={idx}
              className="stack-card glass-panel"
              style={{
                position: "sticky",
                top: `${phase.stickyTop}px`,
                marginBottom: idx === PHASES.length - 1 ? "0" : "40px"
              }}
            >
              <div className="stack-card-inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "stretch" }}>
                <div className="stack-content">
                  <div className="step-number text-gradient" style={{ fontSize: "64px", lineHeight: "1", fontWeight: 700, marginBottom: "16px" }}>
                    {phase.number}
                  </div>
                  <h3 style={{ fontSize: "28px", marginBottom: "16px" }}>{phase.title}</h3>
                  <p style={{ color: "var(--c-text-secondary)", marginBottom: "24px" }}>{phase.description}</p>
                  <ul className="pricing-features">
                    {phase.features.map((feat, fIdx) => (
                      <li key={fIdx}>{feat}</li>
                    ))}
                  </ul>
                </div>
                <div
                  className="stack-visual"
                  style={{
                    borderRadius: "var(--radius-md)",
                    overflow: "hidden",
                    border: "1px solid var(--c-border)",
                    height: "100%",
                    minHeight: "250px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                    position: "relative"
                  }}
                >
                  <Image
                    src={phase.imageSrc}
                    alt={phase.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{
                      objectFit: "cover"
                    }}
                    priority={idx === 0}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
