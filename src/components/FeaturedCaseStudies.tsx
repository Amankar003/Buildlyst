"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SECTORS } from "../data/sectors";

export default function FeaturedCaseStudies() {
  const [activeSectorId, setActiveSectorId] = useState<string>("real-estate");
  const activeSector = SECTORS.find((s) => s.id === activeSectorId) || SECTORS[0];
  
  // Only display the very first case study for the active sector
  const featuredCase = activeSector.cases[0];

  return (
    <section id="master-industry-portal" className="projects-section reveal mip-section">
      <div className="container">
        {/* Header */}
        <div className="section-header text-center mip-header-container">
          <span className="overline highlight mip-header-badge">
            🚀 FEATURED WORK
          </span>
          <h2 className="section-heading text-gradient mip-header-title">
            Tailored AI & Software Solutions
          </h2>
        </div>

        {/* SINGLE HORIZONTAL LINE CATEGORY TABS */}
        <div className="mip-tabs-container">
          {SECTORS.map((sec) => {
            const isActive = sec.id === activeSectorId;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSectorId(sec.id)}
                className={`mip-tab-btn ${isActive ? "active" : ""}`}
              >
                <span>{sec.icon}</span>
                <span>{sec.name}</span>
              </button>
            );
          })}
        </div>

        {/* SINGLE FEATURED CARD DISPLAY */}
        <div className="mip-cards-grid">
          <div className="glass-panel glowing-card mip-card-split">
            {/* LEFT SIDE: Image */}
            <div className="mip-split-left">
              <Image src={featuredCase.imageSrc} alt={`${featuredCase.title} — ${featuredCase.subDomain} project by Buildlyst`} fill className="mip-card-img" />
              <div className="mip-card-img-overlay" />
              <div className="mip-card-location-badge">
                📍 {featuredCase.location}
              </div>
            </div>

            {/* RIGHT SIDE: Content */}
            <div className="mip-split-right">
              <div>
                <span className="mip-subdomain">
                  {featuredCase.subDomain}
                </span>
                <h4 className="mip-card-title">
                  {featuredCase.title}
                </h4>
              </div>

              <div className="mip-problem-solution-grid">
                <div className="mip-ps-card">
                  <span className="mip-ps-label" style={{ color: "var(--c-accent-purple)" }}>The Challenge</span>
                  <p className="mip-ps-text">{featuredCase.problem}</p>
                </div>
                <div className="mip-ps-card">
                  <span className="mip-ps-label" style={{ color: "var(--c-accent-cyan)" }}>Our Solution</span>
                  <p className="mip-ps-text">{featuredCase.solution}</p>
                </div>
              </div>

              <p className="mip-business-impact">
                <strong className="mip-accent-cyan">Business Impact:</strong> {featuredCase.impact}
              </p>

              <div className="mip-tech-section">
                <span className="mip-tech-title">TECH & SCOPE</span>
                <div className="mip-tech-list-grid">
                  {featuredCase.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="mip-tech-item">
                      <span className="mip-check">✓</span> <span>{del}</span>
                    </div>
                  ))}
                </div>
                <div className="mip-tags-container">
                  {featuredCase.tags.map((t, idx) => (
                    <span key={idx} className="mip-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mip-card-footer">
                <div className="mip-stat-wrapper">
                  <span className="mip-big-stat">
                    {featuredCase.bigStat}
                  </span>
                  <span className="mip-stat-label">
                    {featuredCase.bigStatLabel}
                  </span>
                </div>
                <div className="mip-roi-badge">
                  ⏱️ {featuredCase.timeToRoi}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FUNNEL CTA TO DEDICATED PAGE */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
          <Link href="/case-studies" className="btn btn-primary glow-border-btn" style={{ padding: "16px 40px", fontSize: "16px" }}>
            View All Case Studies & ROI Details →
          </Link>
        </div>
      </div>
    </section>
  );
}
