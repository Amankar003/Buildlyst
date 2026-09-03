import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Buildlyst",
  description:
    "Read Buildlyst's privacy policy. Learn how we collect, use, and protect your personal data when you use our AI and data engineering services.",
  alternates: {
    canonical: "https://buildlyst.in/privacy",
  },
};

export default function PrivacyPage() {
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
                name: "Privacy Policy",
                item: "https://buildlyst.in/privacy",
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
          <h1 style={{ fontSize: "32px", marginBottom: "24px", color: "#fff" }}>Privacy Policy</h1>
          <p className="subtext" style={{ textAlign: "left", margin: "0 0 24px 0" }}>Last Updated: August 2026</p>
          
          <div style={{ color: "var(--c-text-secondary)", fontSize: "15px", lineHeight: "1.8" }}>
            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>1. Information We Collect</h2>
            <p>Buildlyst Studio (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects information that you provide directly to us when you use our website, inquire about our services, or interact with our AI assistant. This may include your name, email address, company details, and project requirements.</p>

            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>2. How We Use Your Information</h2>
            <p>We use the information we collect to communicate with you about your projects, provide service estimates, deliver our AI and Data Engineering solutions, and improve our website experience. We do not sell your personal data to third parties.</p>

            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>3. Data Security &amp; AI Processing</h2>
            <p>As an AI and Data Engineering firm, we adhere to strict SOC2 and GDPR compliance standards. Any sensitive data provided for ML model training or RAG system architecture is processed in isolated, secure environments and is never used to train public foundational models without explicit consent.</p>

            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>4. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at privacy@buildlyst.in.</p>
          </div>
        </article>
      </div>
    </section>
  );
}
