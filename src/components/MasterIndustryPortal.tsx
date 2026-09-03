"use client";

import { useState } from "react";
import Image from "next/image";
import { SECTORS } from "../data/sectors";

export default function MasterIndustryPortal() {
  const [activeSectorId, setActiveSectorId] = useState<string>("real-estate");

  const activeSector = SECTORS.find((s) => s.id === activeSectorId) || SECTORS[0];

  const handleSectorChange = (sectorId: string) => {
    setActiveSectorId(sectorId);
  };

  return (
    <section id="master-industry-portal" className="projects-section reveal mip-section">
      <div className="container">
        {/* Header */}
        <div className="section-header text-center mip-header-container">
          <span className="overline highlight mip-header-badge">
            🚀 INDUSTRY PROOF OF IMPACT
          </span>
          <h2 className="section-heading text-gradient mip-header-title">
            Tailored AI & Software Solutions Across 7 Sectors
          </h2>
        </div>

        {/* SINGLE HORIZONTAL LINE CATEGORY TABS */}
        <div className="mip-tabs-container">
          {SECTORS.map((sec) => {
            const isActive = sec.id === activeSectorId;
            return (
              <button
                key={sec.id}
                onClick={() => handleSectorChange(sec.id)}
                className={`mip-tab-btn ${isActive ? "active" : ""}`}
              >
                <span>{sec.icon}</span>
                <span>{sec.name}</span>
              </button>
            );
          })}
        </div>

        {/* ALL CARDS DISPLAY */}
        <div className="mip-cards-grid">
          {activeSector.cases.map((cCard, i) => {
            return (
              <div
                key={`${cCard.id}-${i}`}
                className="glass-panel glowing-card mip-card-split"
              >
                {/* LEFT SIDE: Image */}
                <div className="mip-split-left">
                  <Image src={cCard.imageSrc} alt={`${cCard.title} — ${cCard.subDomain} project by Buildlyst`} fill className="mip-card-img" />
                  <div className="mip-card-img-overlay" />
                  <div className="mip-card-location-badge">
                    📍 {cCard.location}
                  </div>
                </div>

                {/* RIGHT SIDE: Content */}
                <div className="mip-split-right">
                  <div>
                    <span className="mip-subdomain">
                      {cCard.subDomain}
                    </span>
                    <h4 className="mip-card-title">
                      {cCard.title}
                    </h4>
                  </div>

                  <div className="mip-problem-solution-grid">
                    <div className="mip-ps-card">
                      <span className="mip-ps-label" style={{ color: "var(--c-accent-purple)" }}>The Challenge</span>
                      <p className="mip-ps-text">{cCard.problem}</p>
                    </div>
                    <div className="mip-ps-card">
                      <span className="mip-ps-label" style={{ color: "var(--c-accent-cyan)" }}>Our Solution</span>
                      <p className="mip-ps-text">{cCard.solution}</p>
                    </div>
                  </div>

                  <p className="mip-business-impact">
                    <strong className="mip-accent-cyan">Business Impact:</strong> {cCard.impact}
                  </p>

                  <div className="mip-tech-section">
                    <span className="mip-tech-title">TECH & SCOPE</span>
                    <div className="mip-tech-list-grid">
                      {cCard.deliverables.map((del, dIdx) => (
                        <div key={dIdx} className="mip-tech-item">
                          <span className="mip-check">✓</span> <span>{del}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mip-tags-container">
                      {cCard.tags.map((t, idx) => (
                        <span key={idx} className="mip-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mip-card-footer">
                    <div className="mip-stat-wrapper">
                      <span className="mip-big-stat">
                        {cCard.bigStat}
                      </span>
                      <span className="mip-stat-label">
                        {cCard.bigStatLabel}
                      </span>
                    </div>
                    <div className="mip-roi-badge">
                      ⏱️ {cCard.timeToRoi}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
