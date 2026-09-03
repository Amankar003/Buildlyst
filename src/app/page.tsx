"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Capabilities from "@/components/Capabilities";
import PhilosophyV2 from "@/components/PhilosophyV2";
import Playground from "@/components/Playground";
import Architecture from "@/components/Architecture";
import Methodology from "@/components/Methodology";
import FeaturedCaseStudies from "@/components/FeaturedCaseStudies";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import ContactForm from "@/components/ContactForm";

// Dynamically import Three.js Globe with SSR disabled to prevent server-side window exceptions
const Globe3D = dynamic(() => import("@/components/Globe3D"), { ssr: false });

export default function Home() {
  return (
    <main>
      {/* 1. Hero banner with typewriter headlines and simulated chat */}
      <Hero />

      {/* 2. Philosophy section with 3D Stats card stack */}
      <Philosophy />

      {/* 3. Capabilities accordion lists */}
      <Capabilities />

      {/* 4. Inputs to outcomes SVG pipeline bridge */}
      <PhilosophyV2 />

      {/* 5. Live Pipeline developer console playground */}
      <Playground />

      {/* 6. Enterprise tech stack marquee & dynamic step arrows */}
      <Architecture />

      {/* 7. Scroll card methodology stacking phases */}
      <Methodology />

      {/* 8. Portfolio case studies (Featured Case Studies teaser) */}
      <FeaturedCaseStudies />

      {/* 9. Engagement pricing matrix with estimator predictor */}
      <Pricing />

      {/* 10. Global scale network cobe globe card */}
      <section id="global-scale" className="global-section reveal">
        <div className="container">
          <div className="global-card">
            {/* Left Content */}
            <div className="global-content">
              <span className="overline highlight" style={{ marginBottom: "16px", display: "inline-block" }}>Global Reach</span>
              <h2 className="global-title" style={{ color: "#fff", fontSize: "32px", marginBottom: "16px" }}>Enterprise Data Infrastructure</h2>
              <p className="global-desc" style={{ color: "var(--c-text-secondary)", lineHeight: 1.6, marginBottom: "24px" }}>
                Buildlyst architects and deploys robust ETL pipelines and intelligent AI agents that process massive datasets seamlessly across global networks. We modernize your legacy systems for scale.
              </p>

              <div className="global-stats" style={{ display: "flex", gap: "24px" }}>
                <div className="stat-item" style={{ flex: 1 }}>
                  <h3 className="text-gradient" style={{ fontSize: "28px", fontWeight: "bold" }}>40+ Hrs</h3>
                  <p style={{ color: "var(--c-text-secondary)", fontSize: "13px", lineHeight: 1.4, marginTop: "4px" }}>
                    Saved per week for our clients by automating complex data workflows with custom AI agents.
                  </p>
                </div>
                <div className="stat-item" style={{ flex: 1 }}>
                  <h3 className="text-gradient" style={{ fontSize: "28px", fontWeight: "bold" }}>100%</h3>
                  <p style={{ color: "var(--c-text-secondary)", fontSize: "13px", lineHeight: 1.4, marginTop: "4px" }}>
                    Bespoke architecture designed specifically to handle your unique enterprise data requirements.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Globe Canvas */}
            <Globe3D />
          </div>
        </div>
      </section>

      {/* 11. Client reviews infinite marquee tracks */}
      <Testimonials />

      {/* 12. Knowledge base FAQ accordions */}
      <Faq />

      {/* 13. Conversational projects contact lead bubble */}
      <ContactForm />
    </main>
  );
}
