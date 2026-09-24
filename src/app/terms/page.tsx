import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Buildlyst",
  description:
    "Read Buildlyst's terms of service. Understand our baseline terms for AI agent development, generative AI, machine learning pipelines, and software engineering services.",
  alternates: {
    canonical: "https://www.buildlyst.in/terms",
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
                item: "https://www.buildlyst.in",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Terms of Service",
                item: "https://www.buildlyst.in/terms",
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
          <p className="subtext" style={{ textAlign: "left", margin: "0 0 24px 0" }}>Last Updated: September 20, 2026</p>
          
          <div style={{ color: "var(--c-text-secondary)", fontSize: "15px", lineHeight: "1.8" }}>
            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>1. Acceptance of Terms</h2>
            <p>By accessing or using the Buildlyst website (<a href="https://www.buildlyst.in" style={{ color: "var(--c-accent-cyan)" }}>buildlyst.in</a>) or submitting an inquiry through our platform, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, please discontinue using our website.</p>

            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>2. About Buildlyst</h2>
            <p>Buildlyst is an independent, founder-led technology studio/brand providing software engineering, data analytics, and artificial intelligence solutions. Buildlyst operates independently and is not currently an incorporated company (such as a Pvt Ltd or LLP). References to &quot;we&quot;, &quot;us&quot;, or &quot;Buildlyst&quot; refer to our independent technology studio brand and team.</p>

            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>3. Services Offered</h2>
            <p>Buildlyst provides custom technology engineering and consulting services, including:</p>
            <ul style={{ paddingLeft: "20px", margin: "12px 0" }}>
              <li style={{ marginBottom: "6px" }}>AI Agents &amp; Automation</li>
              <li style={{ marginBottom: "6px" }}>Generative AI &amp; RAG Architecture</li>
              <li style={{ marginBottom: "6px" }}>Data Engineering &amp; Analytics</li>
              <li style={{ marginBottom: "6px" }}>Machine Learning &amp; Predictive AI</li>
              <li style={{ marginBottom: "6px" }}>AI Product Engineering &amp; Full-Stack Development</li>
            </ul>

            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>4. Project Scope &amp; Client Agreements</h2>
            <p>These website Terms of Service apply to your use of this website. Specific client project deliverables, milestones, schedules, pricing, IP transfers, support, and warranties are governed exclusively by separate written agreements—such as Statements of Work (SOW), Master Service Agreements (MSA), Non-Disclosure Agreements (NDA), or signed proposals. In the event of a conflict, the terms of a executed project agreement shall govern.</p>

            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>5. Client &amp; Visitor Responsibilities</h2>
            <p>When interacting with our website or submitting project inquiries, you agree to:</p>
            <ul style={{ paddingLeft: "20px", margin: "12px 0" }}>
              <li style={{ marginBottom: "8px" }}>Provide accurate project details and valid contact information.</li>
              <li style={{ marginBottom: "8px" }}>Ensure you possess necessary rights, licenses, and permissions for any data, assets, or specifications you share.</li>
              <li style={{ marginBottom: "8px" }}>Provide timely feedback and approvals necessary for project discussions.</li>
              <li style={{ marginBottom: "8px" }}>Comply with applicable terms of third-party software, platforms, or APIs integrated into your projects.</li>
            </ul>

            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>6. Fees &amp; Payments</h2>
            <p>Fees, payment schedules, and billing terms for client engagements are established individually in the relevant project proposal, SOW, MSA, or invoice. Website content does not constitute a binding financial quote.</p>

            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>7. Intellectual Property</h2>
            <ul style={{ paddingLeft: "20px", margin: "12px 0" }}>
              <li style={{ marginBottom: "8px" }}><strong>Website Assets:</strong> Website code, text, graphics, logos, and styling remain the intellectual property of Buildlyst.</li>
              <li style={{ marginBottom: "8px" }}><strong>Client Deliverables:</strong> Ownership of custom software or ML models developed specifically for a client transfers according to the terms of the applicable project SOW/MSA upon full payment.</li>
              <li style={{ marginBottom: "8px" }}><strong>Pre-Existing Tools &amp; Libraries:</strong> Buildlyst retains rights to its pre-existing utility tools, starter frameworks, and know-how. Deliverables incorporating open-source components or third-party APIs remain subject to their respective open-source or vendor licenses.</li>
            </ul>

            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>8. AI &amp; Machine Learning Disclaimer</h2>
            <p>Artificial Intelligence (AI) and Machine Learning (ML) models operate probabilistically and may produce inaccurate or incomplete outputs. Buildlyst does not warrant that AI/ML outputs will be error-free in all instances unless specifically agreed upon in writing. Clients are responsible for implementing human oversight and verification where appropriate.</p>

            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>9. Third-Party Services &amp; Dependencies</h2>
            <p>Projects or website functionality may rely on third-party cloud hosting, AI API services (e.g., Groq, OpenAI), or external software dependencies. Buildlyst is not liable for third-party service outages, API changes, model deprecations, or third-party policy updates beyond our direct control.</p>

            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>10. Confidentiality</h2>
            <p>We treat client inquiry submissions with professional commercial care. Formal confidentiality commitments for custom projects will be governed by a separate Non-Disclosure Agreement (NDA) or SOW confidentiality clause.</p>

            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>11. Warranties &amp; Disclaimers</h2>
            <p>This website is provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind, express or implied. Buildlyst does not guarantee continuous, uninterrupted website availability.</p>

            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>12. Limitation of Liability</h2>
            <p>To the maximum extent permitted by applicable law, Buildlyst shall not be liable for any indirect, incidental, consequential, or special damages arising out of or related to your use of this website.</p>

            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>13. Project Delays</h2>
            <p>Timelines discussed on the website or in initial discovery calls are estimates. Final project schedules depend on prompt client feedback, access permissions, and third-party API availability.</p>

            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>14. Termination &amp; Suspension</h2>
            <p>We reserve the right to suspend or restrict access to website contact forms or interactive tools in cases of automated abuse, security threats, or terms violations. Commercial project termination rights are defined in individual project agreements.</p>

            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>15. Changes to Terms</h2>
            <p>We may modify these Terms of Service at any time. Revised terms will take effect immediately upon posting to this page.</p>

            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>16. Governing Law</h2>
            <p>These Terms shall be interpreted in accordance with applicable laws of India, to the extent applicable.</p>

            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>17. Contact Us</h2>
            <p>For questions or legal inquiries regarding these Terms of Service, please contact us at <a href="mailto:info@buildlyst.in" style={{ color: "var(--c-accent-cyan)" }}>info@buildlyst.in</a>.</p>
          </div>
        </article>
      </div>
    </section>
  );
}

