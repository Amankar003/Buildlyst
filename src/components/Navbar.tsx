"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, BrainCircuit, Microscope, Database, Zap } from "lucide-react";

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
  const isServicePage = pathname.startsWith("/services/");

  return (
    <>
      <nav className="pill-nav" style={{ position: 'fixed', zIndex: 2147483647 }}>
        <Link href="/" className="logo text-gradient">
          Buildlyst
        </Link>

        <div className="pill-links">
          <Link href={isHome ? "#about" : isServicePage ? `${pathname}#about` : "/#about"} className={activeSection === "about" ? "active" : ""}>
            {isServicePage ? "Overview" : "About Us"}
          </Link>
          <div className="nav-dropdown">
            <Link href={isHome ? "#services" : "/#services"} className="dropdown-toggle">
              Capabilities <span className="caret">▼</span>
            </Link>
            <div className="dropdown-menu glass-panel">
              <Link href="/services/ai-agents" className={pathname === "/services/ai-agents" ? "active" : ""} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Bot size={14} className="theme-icon theme-icon-cyan" /> AI Agents & Automation
              </Link>
              <Link href="/services/gen-ai" className={pathname === "/services/gen-ai" ? "active" : ""} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <BrainCircuit size={14} className="theme-icon theme-icon-purple" /> Generative AI & RAG
              </Link>
              <Link href="/services/machine-learning" className={pathname === "/services/machine-learning" ? "active" : ""} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Microscope size={14} className="theme-icon theme-icon-cyan" /> Machine Learning & Predictive AI
              </Link>
              <Link href="/services/data-engineering" className={pathname === "/services/data-engineering" ? "active" : ""} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Database size={14} className="theme-icon theme-icon-purple" /> Data Engineering & Analytics
              </Link>
              <Link href="/services/ai-product-engineering" className={pathname === "/services/ai-product-engineering" ? "active" : ""} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Zap size={14} className="theme-icon theme-icon-cyan" /> AI Product Engineering
              </Link>
            </div>
          </div>

          <Link href={isHome ? "#pricing" : isServicePage ? `${pathname}#pricing` : "/#pricing"} className={activeSection === "pricing" ? "active" : ""}>
            Pricing
          </Link>
          <Link href="/case-studies" className={pathname === "/case-studies" ? "active" : ""}>
            Case Studies
          </Link>
        </div>

        <div className="nav-right">
          <Link href={isHome ? "#contact" : isServicePage ? `${pathname}#contact` : "/#contact"} className="btn btn-primary glow-border-btn pill-cta">
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
            <Link href={isHome ? "#about" : isServicePage ? `${pathname}#about` : "/#about"} className="mobile-nav-link" onClick={closeMobileMenu}>
              {isServicePage ? "Overview" : "About Us"}
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
                AI Agents & Automation
              </Link>
              <Link
                href="/services/gen-ai"
                className={pathname === "/services/gen-ai" ? "active" : ""}
                onClick={closeMobileMenu}
              >
                Generative AI & RAG
              </Link>
              <Link
                href="/services/machine-learning"
                className={pathname === "/services/machine-learning" ? "active" : ""}
                onClick={closeMobileMenu}
              >
                Machine Learning & Predictive AI
              </Link>
              <Link
                href="/services/data-engineering"
                className={pathname === "/services/data-engineering" ? "active" : ""}
                onClick={closeMobileMenu}
              >
                Data Engineering & Analytics
              </Link>
              <Link
                href="/services/ai-product-engineering"
                className={pathname === "/services/ai-product-engineering" ? "active" : ""}
                onClick={closeMobileMenu}
              >
                AI Product Engineering
              </Link>
            </div>


            <Link href={isHome ? "#pricing" : isServicePage ? `${pathname}#pricing` : "/#pricing"} className="mobile-nav-link" onClick={closeMobileMenu}>
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
