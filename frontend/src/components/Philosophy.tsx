"use client";

import { useState } from "react";

export default function Philosophy() {
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
    });
  };

  return (
    <section id="about" className="philosophy-section reveal">
      <div className="container">
        <div className="philosophy-grid">
          <div className="philosophy-text">
            <span className="overline highlight">Our Philosophy</span>
            <h2 className="text-gradient">We engineer. We don&apos;t just assemble.</h2>
            <p>
              The traditional agency model is broken. It relies on bloated teams, off-the-shelf templates, and slow
              iteration cycles. At Buildlyst, we operate as a lean, elite engineering studio.
            </p>
            <p>
              We don&apos;t just wrap ChatGPT APIs. We architect custom RAG systems, fine-tune proprietary models, and
              deploy scalable data pipelines that act as the central nervous system of your enterprise. Speed, security,
              and absolute premium quality are our baselines.
            </p>
          </div>
          <div
            className="philosophy-stats glass-panel tilt-card"
            style={tiltStyle}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="spotlight"></div>
            <div className="stat-item">
              <div className="stat-number text-gradient-hero">10x</div>
              <div className="stat-label">Faster Deployment</div>
            </div>

            <div className="stat-item">
              <div className="stat-number text-gradient-hero">99.9%</div>
              <div className="stat-label">System Uptime</div>
            </div>
            <div className="stat-item">
              <div className="stat-number text-gradient-hero">0</div>
              <div className="stat-label">Templates Used</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
