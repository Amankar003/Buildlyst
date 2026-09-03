"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();

  // Highlight active section on scroll
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sections = document.querySelectorAll("section");
    const handleScroll = () => {
      let current = "";
      const scrollPosition = window.scrollY + 200;

      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          current = section.getAttribute("id") || "";
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (!mobileMenuOpen) {
      document.body.classList.add("scroll-locked");
    } else {
      document.body.classList.remove("scroll-locked");
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.classList.remove("scroll-locked");
  };

  const isHome = pathname === "/";

  return (
    <>
      <nav className="pill-nav">
        <Link href="/" className="logo text-gradient">
          Buildlyst
        </Link>

        <div className="pill-links">
          <Link href={isHome ? "#about" : "/#about"} className={activeSection === "about" ? "active" : ""}>
            About
          </Link>
          <div className="nav-dropdown">
            <Link href={isHome ? "#services" : "/#services"} className="dropdown-toggle">
              Capabilities <span className="caret">▼</span>
            </Link>
            <div className="dropdown-menu glass-panel">
              <Link href="/services/ai-agents" className={pathname === "/services/ai-agents" ? "active" : ""}>
                🤖 AI Agents
              </Link>
              <Link href="/services/gen-ai" className={pathname === "/services/gen-ai" ? "active" : ""}>
                🧠 Gen AI
              </Link>
              <Link href="/services/machine-learning" className={pathname === "/services/machine-learning" ? "active" : ""}>
                🔬 Machine Learning
              </Link>
              <Link href="/services/data-engineering" className={pathname === "/services/data-engineering" ? "active" : ""}>
                🗄️ Data Engineering
              </Link>
              <Link href="/services/web-development" className={pathname === "/services/web-development" ? "active" : ""}>
                ⚡ Web Development
              </Link>
            </div>
          </div>
          <Link href={isHome ? "#playground" : "/#playground"} className={activeSection === "playground" ? "active" : ""}>
            Playground
          </Link>
          <Link href={isHome ? "#pricing" : "/#pricing"} className={activeSection === "pricing" ? "active" : ""}>
            Pricing
          </Link>
          <Link href="/case-studies" className={pathname === "/case-studies" ? "active" : ""}>
            Case Studies
          </Link>
        </div>

        <div className="nav-right">
          <Link href={isHome ? "#contact" : "/#contact"} className="btn btn-primary glow-border-btn pill-cta">
            Let&apos;s Talk
          </Link>
          <button
            className={`mobile-menu-btn ${mobileMenuOpen ? "active" : ""}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle Mobile Navigation"
          >
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Overlay / Drawer */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? "active" : ""}`} onClick={closeMobileMenu}>
        <div className="mobile-menu-drawer glass-panel" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-menu-header">
            <span className="logo text-gradient">Buildlyst</span>
            <button className="mobile-menu-close" onClick={closeMobileMenu}>
              &times;
            </button>
          </div>
          <div className="mobile-menu-links">
            <Link href={isHome ? "#about" : "/#about"} className="mobile-nav-link" onClick={closeMobileMenu}>
              About
            </Link>

            <span className="mobile-nav-link" style={{ color: "#fff", cursor: "default", display: "block", marginBottom: 0 }}>
              Capabilities
            </span>
            <div className="mobile-sub-links">
              <Link
                href="/services/ai-agents"
                className={pathname === "/services/ai-agents" ? "active" : ""}
                onClick={closeMobileMenu}
              >
                AI Agents
              </Link>
              <Link
                href="/services/gen-ai"
                className={pathname === "/services/gen-ai" ? "active" : ""}
                onClick={closeMobileMenu}
              >
                Gen AI
              </Link>
              <Link
                href="/services/machine-learning"
                className={pathname === "/services/machine-learning" ? "active" : ""}
                onClick={closeMobileMenu}
              >
                Machine Learning
              </Link>
              <Link
                href="/services/data-engineering"
                className={pathname === "/services/data-engineering" ? "active" : ""}
                onClick={closeMobileMenu}
              >
                Data Engineering
              </Link>
              <Link
                href="/services/web-development"
                className={pathname === "/services/web-development" ? "active" : ""}
                onClick={closeMobileMenu}
              >
                Web Development
              </Link>
            </div>

            <Link href={isHome ? "#playground" : "/#playground"} className="mobile-nav-link" onClick={closeMobileMenu}>
              Playground
            </Link>
            <Link href={isHome ? "#pricing" : "/#pricing"} className="mobile-nav-link" onClick={closeMobileMenu}>
              Pricing
            </Link>
            <Link href="/case-studies" className="mobile-nav-link" onClick={closeMobileMenu}>
              Case Studies
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
