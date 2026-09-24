"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Capabilities from "@/components/Capabilities";
import PhilosophyV2 from "@/components/PhilosophyV2";
import Playground from "@/components/Playground";
import TechStackMarquee from "@/components/TechStackMarquee";
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

      {/* Trust Signal: Engineering Attributes Marquee */}
      <TechStackMarquee />

      {/* 2. Philosophy section with 3D Stats card stack */}
      <Philosophy />

      {/* 3. Capabilities accordion lists */}
      <Capabilities />

      {/* 4. Inputs to outcomes SVG pipeline bridge */}
      <PhilosophyV2 />

      {/* 5. Live Pipeline developer console playground */}
      <Playground />

      {/* 7. Scroll card methodology stacking phases */}
      <Methodology />

      {/* 8. Portfolio case studies (Featured Case Studies teaser) */}
      <FeaturedCaseStudies />

      {/* 9. Engagement pricing matrix with estimator predictor */}
      <Suspense fallback={<div style={{ minHeight: "800px" }}></div>}>
        <Pricing />
      </Suspense>

      {/* 10. Global scale network cobe globe card */}
      <section id="global-scale" className="global-section reveal">
        <div className="container">
          <div className="global-card">
            {/* Left Content */}
            <div className="global-content">
              <span className="overline highlight" style={{ marginBottom: "16px", display: "inline-block" }}>GLOBAL REACH</span>
              <h2 className="global-title" style={{ color: "#fff", fontSize: "32px", marginBottom: "16px" }}>Built for Today. Ready for What’s Next.</h2>
              <p className="global-desc" style={{ color: "var(--c-text-secondary)", lineHeight: 1.6, marginBottom: "24px" }}>
                From AI automation and GenAI applications to data engineering, machine learning, and digital products, Buildlyst builds technology that helps businesses operate smarter and scale with confidence.
              </p>

              <div className="global-outcomes-grid">
                <div className="stat-item glass-panel outcome-card">
                  <h4 className="outcome-title">WORK SMARTER</h4>
                  <p className="outcome-desc">
                    Automate work that slows you down.
                  </p>
                </div>
                
                <div className="stat-item glass-panel outcome-card">
                  <h4 className="outcome-title">DECIDE BETTER</h4>
                  <p className="outcome-desc">
                    Make sense of your business data.
                  </p>
                </div>
                
                <div className="stat-item glass-panel outcome-card">
                  <h4 className="outcome-title">SCALE FASTER</h4>
                  <p className="outcome-desc">
                    Build systems that grow with your business.
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
