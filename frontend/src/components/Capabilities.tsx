"use client";

import { useState } from "react";
import Link from "next/link";

interface CapabilityItem {
  title: string;
  description: string;
  link: string;
}

const CAPABILITIES: CapabilityItem[] = [
  {
    title: "AI Agents",
    description: "Autonomous systems capable of executing complex multi-step reasoning, integrating with your existing tools, and making autonomous decisions based on real-time data constraints.",
    link: "/services/ai-agents",
  },
  {
    title: "Gen AI",
    description: "Custom LLM deployments, fine-tuning, and highly secure RAG architectures tailored entirely to your proprietary enterprise data.",
    link: "/services/gen-ai",
  },
  {
    title: "Machine & Deep Learning",
    description: "Advanced predictive modeling, neural networks for computer vision, NLP, and real-time classification systems deployed at scale.",
    link: "/services/machine-learning",
  },
  {
    title: "Data Engineering",
    description: "Robust ETL pipelines, data warehousing, and interactive visualization dashboards that turn raw data into strategic assets.",
    link: "/services/data-engineering",
  },
  {
    title: "Website Development",
    description: "Premium, high-performance web applications and landing pages built with modern frameworks, deeply integrated with custom AI backends.",
    link: "/services/web-development",
  },
];

export default function Capabilities() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="services" className="services-section reveal">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-heading text-gradient">Capabilities</h2>
          <p className="subtext text-center">Cutting-edge solutions engineered for scale.</p>
        </div>

        <div className="accordion-gallery">
          {CAPABILITIES.map((cap, idx) => (
            <div
              key={idx}
              className={`accordion-item glass-panel ${activeIndex === idx ? "active" : ""}`}
              onMouseEnter={() => setActiveIndex(idx)}
              onClick={() => setActiveIndex(idx)}
            >
              <div className="accordion-title">
                <span>{cap.title}</span>
                <span className="accordion-icon">{activeIndex === idx ? "−" : "+"}</span>
              </div>
              <div className="accordion-content">
                <p>{cap.description}</p>
                <Link href={cap.link} className="btn btn-secondary glass-btn" style={{ marginTop: "16px", fontSize: "14px", display: "inline-block" }}>
                  Explore Deep Dive &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
