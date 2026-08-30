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
    title: "Discovery & Architecture",
    description: "We analyze your data infrastructure and define the technical requirements for success. We architect highly scalable, resilient machine learning pipelines and microservices before writing a single line of code.",
    features: [
      "Technical Feasibility Audit",
      "Cloud Infrastructure Blueprinting",
      "Security & Compliance Mapping"
    ],
    imageSrc: "/static/img/method_arch.png",
    stickyTop: 100
  },
  {
    number: "02",
    title: "Rigorous Engineering",
    description: "Implementation through continuous integration and deployment. We don't just build scripts; we build fault-tolerant, production-ready systems using modern CI/CD pipelines.",
    features: [
      "Automated Unit & Integration Testing",
      "Containerization (Docker & Kubernetes)",
      "Zero-Downtime Deployments"
    ],
    imageSrc: "/static/img/method_eng.png",
    stickyTop: 140
  },
  {
    number: "03",
    title: "Model Training & Tuning",
    description: "Training neural networks on custom datasets. We fine-tune foundation models to align perfectly with your specific enterprise vocabulary, rules, and business logic constraints.",
    features: [
      "Custom Data Ingestion & Cleaning",
      "RLHF & LoRA Fine-tuning",
      "Hallucination Mitigation Architecture"
    ],
    imageSrc: "/static/img/method_ai.png",
    stickyTop: 180
  },
  {
    number: "04",
    title: "Evolution & Scaling",
    description: "Continuous optimization post-deployment. We monitor model drift, data pipeline throughput, latency constraints, and scale the compute infrastructure seamlessly as demand increases.",
    features: [
      "Model Drift & Telemetry Monitoring",
      "Pipeline Throughput Optimization",
      "Compute Auto-scaling Strategies"
    ],
    imageSrc: "/static/img/method_scale.png",
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
                  <img
                    src={phase.imageSrc}
                    alt={phase.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                    loading={idx === 0 ? "eager" : "lazy"}
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
