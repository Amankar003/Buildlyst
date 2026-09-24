"use client";

import React from "react";

const STUDIO_ATTRIBUTES = [
  "AI-Powered",
  "Custom Built",
  "Business Ready",
  "Smart Automation",
  "Data Driven",
  "Production Ready",
  "Built to Scale",
  "Real-World AI",
  "Secure by Design",
  "Future Ready",
  "Clean Engineering",
  "End-to-End"
];

export default function TechStackMarquee() {
  // We extract the rendering of a single set of items into a function
  // so we can render it exactly twice for a perfect seamless infinite loop.
  const renderMarqueeContent = (isDuplicate = false) => (
    <div 
      className="premium-marquee-content" 
      aria-hidden={isDuplicate ? "true" : undefined}
    >
      {STUDIO_ATTRIBUTES.map((text, idx) => (
        <React.Fragment key={idx}>
          <div className="premium-marquee-item">
            {text}
          </div>
          {/* Elegant glowing diamond separator */}
          <div className="premium-separator">◆</div>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <section className="premium-marquee-wrapper">
      {/* Strong horizontal fade mask on BOTH sides */}
      <div className="marquee-fade-mask"></div>
      
      <div className="premium-marquee-track">
        {/* Render Original */}
        {renderMarqueeContent(false)}
        {/* Render Duplicate for Seamless Loop */}
        {renderMarqueeContent(true)}
      </div>
    </section>
  );
}
