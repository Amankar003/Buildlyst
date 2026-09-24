"use client";

import { useState } from "react";
import Link from "next/link";

interface CapabilityItem {
  title: React.ReactNode;
  description: string;
  link: string;
}

const CAPABILITIES: CapabilityItem[] = [
  {
    title: <>AI Agents <br /> & Automation</>,
    description: "Build intelligent AI agents that automate sales, customer support, operations, and repetitive business workflows — helping teams save time and scale efficiently. (Use cases: AI Sales Agents · Customer Support Agents · WhatsApp Automation · CRM Automation · Workflow Automation)",
    link: "/services/ai-agents",
  },
  {
    title: "Generative AI & RAG",
    description: "Build production-ready GenAI solutions that understand your business knowledge, documents, and data to deliver accurate answers, intelligent assistance, and automated workflows. (Use cases: RAG Systems · AI Copilots · Knowledge Bases · Document Intelligence · LLM Applications)",
    link: "/services/gen-ai",
  },
  {
    title: <>Data Engineering & <br /> Analytics</>,
    description: "Build reliable data pipelines and analytics systems that turn scattered business data into clean, accessible, and actionable insights. (Use cases: ETL/ELT Pipelines · Data Warehousing · Data Integration · Business Intelligence · Analytics Dashboards)",
    link: "/services/data-engineering",
  },
  {
    title: <>Machine Learning & <br /> Predictive AI</>,
    description: "Build machine learning systems that use your business data to predict outcomes, identify patterns, and support smarter decisions. (Use cases: Forecasting · Lead Scoring · Churn Prediction · Recommendation Systems · Anomaly Detection)",
    link: "/services/machine-learning",
  },
  {
    title: <>AI Product Engineering <br /> & Web Development</>,
    description: "Turn AI ideas into production-ready products with robust applications, APIs, backend systems, integrations, and scalable infrastructure. (Use cases: AI SaaS · AI-Powered Web Apps · APIs · Backend Systems · MVP to Production)",
    link: "/services/ai-product-engineering",
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
