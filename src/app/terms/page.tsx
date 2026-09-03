import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Buildlyst",
  description:
    "Read Buildlyst's terms of service. Understand our terms for AI agent development, generative AI integration, machine learning pipelines, and web engineering services.",
  alternates: {
    canonical: "https://buildlyst.in/terms",
  },
};

export default function TermsPage() {
  return (
    <section className="legal-section" style={{ paddingTop: "120px", minHeight: "80vh" }}>
      
      {/* Back button override positioning */}
      <style dangerouslySetInnerHTML={{ __html: `
        .legal-back-btn {
          position: absolute;
          top: 100px;
          left: 5%;
          z-index: 10;
          color: var(--c-text-secondary);
          font-weight: 500;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .legal-back-btn:hover {
          color: #fff;
        }
      `}} />

      {/* BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://buildlyst.in",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Terms of Service",
                item: "https://buildlyst.in/terms",
              },
            ],
          }),
        }}
      />

      <Link href="/" className="legal-back-btn">
        &larr; Back to Home
      </Link>

      <div className="container">
        <article className="glass-panel p-lg" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "32px", marginBottom: "24px", color: "#fff" }}>Terms of Service</h1>
          <p className="subtext" style={{ textAlign: "left", margin: "0 0 24px 0" }}>Last Updated: August 2026</p>
          
          <div style={{ color: "var(--c-text-secondary)", fontSize: "15px", lineHeight: "1.8" }}>
            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>1. Acceptance of Terms</h2>
            <p>By accessing or using the Buildlyst Studio website and services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.</p>

            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>2. Services Provided</h2>
            <p>Buildlyst provides custom AI agent development, generative AI integration, machine learning pipelines, and full-stack web engineering. All final deliverables, scopes, and timelines will be dictated by individual Master Service Agreements (MSAs) and Statements of Work (SOWs) signed by both parties.</p>

            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>3. Intellectual Property</h2>
            <p>Unless otherwise stated in a specific SOW, all custom code, ML models, and infrastructure architectures developed specifically for a client remain the intellectual property of the client upon final payment. Buildlyst retains rights to its proprietary internal tools, frameworks, and pre-existing IP used to accelerate development.</p>

            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>4. Limitation of Liability</h2>
            <p>Buildlyst shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of, or inability to access or use the services or any content on the services.</p>
            
            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>5. Contact</h2>
            <p>For legal inquiries, please contact legal@buildlyst.in.</p>
          </div>
        </article>
      </div>
    </section>
  );
}
