"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "What is the typical timeline for an AI integration?",
    answer: "Timelines vary based on complexity. Proof of Concepts (PoCs) and basic RAG architectures take 2-4 weeks. Full-scale autonomous agents and custom model fine-tuning generally take 2-3 months to reach production-ready status.",
  },
  {
    question: "Do you use off-the-shelf templates or tools?",
    answer: "No. We engineer everything custom for your specific use-case. While we utilize state-of-the-art foundation models and cloud infrastructure, the architecture, pipelines, and frontend interfaces are built from scratch to ensure maximum performance and security.",
  },
  {
    question: "Who owns the intellectual property (IP)?",
    answer: "You do. All custom code, fine-tuned models, and architectures developed during our engagement are 100% owned by your company upon project completion and final payment.",
  },
  {
    question: "How do you handle data security and privacy?",
    answer: "We implement enterprise-grade security protocols, including end-to-end encryption, VPC isolation, and compliance-driven architectures. For highly sensitive data, we can deploy open-source models (like Llama 3) directly onto your on-premise servers so data never leaves your environment.",
  },
  {
    question: "What does your pricing structure look like?",
    answer: "We offer transparent, fixed-price engagements based on project scope, rather than unpredictable hourly billing. Engagements typically start at ₹35K for basic web setups and scale to ₹5L+ for enterprise Gen AI deployments. You can use our AI Predictor on the Pricing page to get an estimate.",
  },
  {
    question: "Do you provide post-delivery support and maintenance?",
    answer: "Yes, we offer flexible post-deployment SLA (Service Level Agreement) packages. These include 24/7 monitoring, regular model retraining, bug fixes, and infrastructure scaling to ensure your AI systems remain highly performant as your user base grows.",
  },
  {
    question: "What is your communication cadence during a project?",
    answer: "We believe in radical transparency. You will have a dedicated Slack/Teams channel with our core engineers, weekly sprint review calls, and a live Notion dashboard where you can track every task, milestone, and deliverable in real-time.",
  },
  {
    question: "How is your team structured?",
    answer: "We don't use junior developers or offshore intermediaries. When you hire Buildlyst, you work directly with senior AI engineers, data architects, and full-stack developers who have built scalable systems for leading enterprises and high-growth startups.",
  },
];

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="faq-section reveal">
      <div className="container">
        <div className="section-header text-center">
          <span className="overline highlight">Knowledge Base</span>
          <h2 className="section-heading text-gradient">Frequently Asked Questions</h2>
        </div>
        <div className="faq-container">
          {FAQS.map((faq, idx) => (
            <div key={idx} className={`faq-item glass-panel ${openIdx === idx ? "open" : ""}`}>
              <button className="faq-question" onClick={() => toggleFaq(idx)}>
                {faq.question}
                <span className="faq-icon">{openIdx === idx ? "−" : "+"}</span>
              </button>
              <div
                className="faq-answer"
                style={{
                  maxHeight: openIdx === idx ? "200px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease-out, padding 0.3s ease-out",
                  padding: openIdx === idx ? "16px 20px" : "0 20px"
                }}
              >
                <p style={{ margin: 0, color: "var(--c-text-secondary)" }}>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
