import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Buildlyst",
  description:
    "Read Buildlyst's privacy policy. Learn how we collect, handle, and protect information when you interact with our website and AI assistant.",
  alternates: {
    canonical: "https://www.buildlyst.in/privacy",
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
                item: "https://www.buildlyst.in",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Privacy Policy",
                item: "https://www.buildlyst.in/privacy",
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
          <p className="subtext" style={{ textAlign: "left", margin: "0 0 24px 0" }}>Last Updated: September 20, 2026</p>
          
          <div style={{ color: "var(--c-text-secondary)", fontSize: "15px", lineHeight: "1.8" }}>
            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>1. Introduction</h2>
            <p>Buildlyst (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is an independent, founder-led technology studio/brand providing software development, data engineering, and artificial intelligence solutions. This Privacy Policy outlines how we collect, use, and protect information submitted through our website (<a href="https://www.buildlyst.in" style={{ color: "var(--c-accent-cyan)" }}>buildlyst.in</a>), contact inquiry flows, and interactive AI assistant.</p>

            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>2. Information We Collect</h2>
            <p>We collect information that you voluntarily provide to us when interacting with our website:</p>
            <ul style={{ paddingLeft: "20px", margin: "12px 0" }}>
              <li style={{ marginBottom: "8px" }}><strong>Contact &amp; Project Inquiries:</strong> Your name, email address, company or business name, project details, and messages submitted through contact forms.</li>
              <li style={{ marginBottom: "8px" }}><strong>AI Assistant Inputs:</strong> Text prompts and questions entered into our website assistant widget.</li>
              <li style={{ marginBottom: "8px" }}><strong>Technical Data &amp; Server Logs:</strong> Basic technical details such as IP address, browser headers, operating system, and request timestamps automatically recorded by web servers for operational and security purposes.</li>
            </ul>

            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>3. How We Use Information</h2>
            <p>We use the information we collect to operate our studio and communicate with prospective clients:</p>
            <ul style={{ paddingLeft: "20px", margin: "12px 0" }}>
              <li style={{ marginBottom: "8px" }}>Evaluating project requirements and providing estimates, proposals, or discovery responses.</li>
              <li style={{ marginBottom: "8px" }}>Communicating with you regarding technical services or inquiries.</li>
              <li style={{ marginBottom: "8px" }}>Improving website functionality, performance, and navigation experience.</li>
              <li style={{ marginBottom: "8px" }}>Preventing spam, abuse, and security incidents.</li>
            </ul>

            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>4. AI &amp; Automated Processing</h2>
            <p>Our website features an interactive assistant to answer questions about our services. Information submitted to this assistant may be processed by third-party AI API providers (such as Groq) to generate real-time responses. Please note that public website chat interactions are not processed in an isolated on-premises environment. <strong>We strongly advise users not to submit passwords, payment card details, confidential credentials, API keys, or sensitive personal data into public website forms or the AI assistant.</strong></p>

            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>5. Third-Party Service Providers</h2>
            <p>We rely on essential third-party service infrastructure to run our website and communication channels:</p>
            <ul style={{ paddingLeft: "20px", margin: "12px 0" }}>
              <li style={{ marginBottom: "8px" }}><strong>Hosting Infrastructure:</strong> Cloud web hosting providers for serving static assets and dynamic pages.</li>
              <li style={{ marginBottom: "8px" }}><strong>AI API Providers:</strong> Groq API for generating responses in the chat assistant.</li>
              <li style={{ marginBottom: "8px" }}><strong>Email Infrastructure:</strong> SMTP email services for routing contact form submissions to our team.</li>
            </ul>
            <p>We do not share your information with third parties for advertising or marketing purposes.</p>

            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>6. Data Security</h2>
            <p>We apply reasonable technical and organizational measures to safeguard the information submitted to us. However, no internet transmission or digital storage is 100% secure. Buildlyst is an independent, early-stage studio and does not hold formal certifications such as SOC 2, ISO, or accredited GDPR certification.</p>

            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>7. Data Retention</h2>
            <p>We retain submitted inquiry and technical information only for as long as reasonably necessary to respond to requests, maintain legitimate business records, resolve disputes, and fulfill applicable legal obligations.</p>

            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>8. Data Sharing</h2>
            <p>Buildlyst does not sell, rent, or trade personal data. We only share information with third parties when necessary to operate website features (such as hosting, email delivery, or AI API processing) or when required by law, court order, or governmental authority.</p>

            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>9. Cookies &amp; Technical Logs</h2>
            <p>Our website relies on core web technologies. We do not place third-party advertising tracking cookies. Essential session state or local browser storage may be used solely for website functionality (such as managing interactive chat widget state).</p>

            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>10. Your Rights &amp; Requests</h2>
            <p>You may request access to, correction of, or deletion of any personal information you have submitted through our contact forms by emailing us at <a href="mailto:info@buildlyst.in" style={{ color: "var(--c-accent-cyan)" }}>info@buildlyst.in</a>. We will make reasonable efforts to address your request promptly.</p>

            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>11. Children&apos;s Privacy</h2>
            <p>Our website and services are intended primarily for business and professional users and are not directed toward children.</p>

            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>12. Changes to This Policy</h2>
            <p>We may update this Privacy Policy periodically. Any changes will be posted on this page with an updated &quot;Last Updated&quot; date.</p>

            <h2 style={{ color: "#fff", fontSize: "20px", marginTop: "32px" }}>13. Contact Us</h2>
            <p>For questions or privacy inquiries regarding this policy, please reach out to us at <a href="mailto:info@buildlyst.in" style={{ color: "var(--c-accent-cyan)" }}>info@buildlyst.in</a>.</p>
          </div>
        </article>
      </div>
    </section>
  );
}

