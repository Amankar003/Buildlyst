"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SwarmFooter() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="new-footer">
      <div className="container">
        <div className="footer-grid-layout">
          {/* Brand Section */}
          <div className="footer-brand">
            <Link href="/" className="logo text-gradient footer-logo">
              Buildlyst
            </Link>
            <p className="footer-tagline">Build AI With Compounding Intelligence</p>

            <div className="footer-badges" style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
              <a
                href="https://www.linkedin.com/company/buildlyst/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="social-icon"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/buildlyst"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="social-icon"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://x.com/buildlystin"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="social-icon"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="footer-links-wrapper">
            <div className="footer-col">
              <h4>SERVICES</h4>
              <ul>
                <li>
                  <Link href="/services/ai-agents">AI Agents & Automation</Link>
                </li>
                <li>
                  <Link href="/services/gen-ai">Generative AI & RAG</Link>
                </li>
                <li>
                  <Link href="/services/machine-learning">Machine Learning & Predictive AI</Link>
                </li>
                <li>
                  <Link href="/services/data-engineering">Data Engineering & Analytics</Link>
                </li>
                <li>
                  <Link href="/services/ai-product-engineering">AI Product Engineering</Link>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>COMPANY</h4>
              <ul>
                <li>
                  <Link href={isHome ? "#about" : "/#about"}>About Us</Link>
                </li>
                <li>
                  <Link href="/case-studies">Case Studies</Link>
                </li>
                <li>
                  <Link href={isHome ? "#pricing" : "/#pricing"}>Pricing</Link>
                </li>
                <li>
                  <Link href={isHome ? "#contact" : "/#contact"}>Contact</Link>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>LEGAL</h4>
              <ul>
                <li>
                  <Link href="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms">Terms of Service</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mega Footer Typography */}
        <div className="mega-footer-text">BUILDLYST</div>

        {/* Bottom Row */}
        <div className="footer-bottom-row">
          <div className="footer-copyright">&copy; {new Date().getFullYear()} Buildlyst, Inc. All rights reserved.</div>
          <button className="scroll-top-btn" id="scroll-to-top-btn" onClick={handleScrollTop} aria-label="Scroll to top">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
