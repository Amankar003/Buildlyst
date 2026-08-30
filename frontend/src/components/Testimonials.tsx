"use client";

import TiltCard from "./TiltCard";
import Image from "next/image";

interface Testimonial {
  quote: string;
  author: string;
  company: string;
  avatar: string;
}

const ROW1_TESTIMONIALS: Testimonial[] = [
  {
    quote: "Buildlyst engineered an automated property matching agent that completely eliminated manual lead triage. Unbelievable ROI.",
    author: "Rahul",
    company: "Shivay Realty",
    avatar: "https://randomuser.me/api/portraits/men/43.jpg",
  },
  {
    quote: "We needed a robust integration and autonomous lead scoring. Buildlyst deployed a system that scaled our outreach effortlessly.",
    author: "Ankit",
    company: "Mahadev Properties",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
  },
  {
    quote: "Our latency issues vanished. They didn't just build a solution, they transformed our entire data architecture overnight.",
    author: "Sarah Jenkins",
    company: "Nexus AI",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    quote: "The speed and quality of their engineering is unmatched. We went from proof of concept to a highly secure production deployment in 6 weeks.",
    author: "Marcus Thorne",
    company: "FinScale Ltd",
    avatar: "https://randomuser.me/api/portraits/men/66.jpg",
  },
  {
    quote: "They delivered a highly secure, RAG-based LLM that acts as our internal brain. The architectural quality is second to none.",
    author: "Raman",
    company: "Azentra Solutions",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
  },
];

const ROW2_TESTIMONIALS: Testimonial[] = [
  {
    quote: "Our legacy data infrastructure was a mess. Buildlyst modernized our entire ETL pipeline in weeks, not months. Highly recommended.",
    author: "Ritik",
    company: "Loopsoop",
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
  },
  {
    quote: "Buildlyst didn't just build us a wrapper; they completely re-engineered our pipeline and integrated an agent that saves us 40 hours a week.",
    author: "Elena Rostova",
    company: "HealthTech Dynamics",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    quote: "As a tech company ourselves, we have high standards. Buildlyst exceeded them with an impeccably designed architecture.",
    author: "Arpit",
    company: "Codaris.in",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    quote: "Flawless execution from day one. Their understanding of distributed systems and generative AI models is truly world-class.",
    author: "James Wu",
    company: "DataCore Systems",
    avatar: "https://randomuser.me/api/portraits/men/77.jpg",
  },
  {
    quote: "An absolute game-changer for our cloud infrastructure. The deployment was seamless and the performance gains are massive.",
    author: "David Okafor",
    company: "CloudMatrix",
    avatar: "https://randomuser.me/api/portraits/men/88.jpg",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials-section reveal">
      <div className="container">
        <div className="section-header text-center">
          <span className="overline highlight">Proof</span>
          <h2 className="section-heading text-gradient">Client Success</h2>
        </div>

        <div className="testimonial-marquee-container">
          {/* Row 1: Moves Left */}
          <div className="testimonial-marquee">
            <div className="testimonial-track left">
              {ROW1_TESTIMONIALS.map((t, idx) => (
                <TiltCard key={`row1-${idx}`} className="testimonial-card glass-panel">
                  <p className="quote">{t.quote}</p>
                  <div className="client-info mt-auto">
                    <img src={t.avatar} alt={t.author} className="client-avatar-img" width={40} height={40} />
                    <div className="client-info-text">
                      <h4>{t.author}</h4>
                      <span>{t.company}</span>
                    </div>
                  </div>
                </TiltCard>
              ))}
              {/* Duplicate for Infinite Scroll */}
              {ROW1_TESTIMONIALS.map((t, idx) => (
                <TiltCard key={`row1-dup-${idx}`} className="testimonial-card glass-panel">
                  <p className="quote">{t.quote}</p>
                  <div className="client-info mt-auto">
                    <img src={t.avatar} alt={t.author} className="client-avatar-img" width={40} height={40} />
                    <div className="client-info-text">
                      <h4>{t.author}</h4>
                      <span>{t.company}</span>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>

          {/* Row 2: Moves Right */}
          <div className="testimonial-marquee">
            <div className="testimonial-track right">
              {ROW2_TESTIMONIALS.map((t, idx) => (
                <TiltCard key={`row2-${idx}`} className="testimonial-card glass-panel">
                  <p className="quote">{t.quote}</p>
                  <div className="client-info mt-auto">
                    <img src={t.avatar} alt={t.author} className="client-avatar-img" width={40} height={40} />
                    <div className="client-info-text">
                      <h4>{t.author}</h4>
                      <span>{t.company}</span>
                    </div>
                  </div>
                </TiltCard>
              ))}
              {/* Duplicate for Infinite Scroll */}
              {ROW2_TESTIMONIALS.map((t, idx) => (
                <TiltCard key={`row2-dup-${idx}`} className="testimonial-card glass-panel">
                  <p className="quote">{t.quote}</p>
                  <div className="client-info mt-auto">
                    <img src={t.avatar} alt={t.author} className="client-avatar-img" width={40} height={40} />
                    <div className="client-info-text">
                      <h4>{t.author}</h4>
                      <span>{t.company}</span>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
