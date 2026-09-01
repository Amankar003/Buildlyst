"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

// Register ScrollTrigger globally
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable browser scroll restoration and force scroll to top on reload/fresh load
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }

    // Remove the fake loader timer to fix slow reloading
    setLoading(false);
    setShowLoader(false);

    // 2. Custom Cursor Follower
    const cursor = cursorRef.current;
    const onMouseMove = (e: MouseEvent) => {
      if (!cursor) return;
      requestAnimationFrame(() => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      });
    };

    // Event delegation for cursor hover styles
    const onMouseOver = (e: MouseEvent) => {
      if (!cursor) return;
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest("a") ||
          target.closest("button") ||
          target.closest(".btn") ||
          target.closest(".pill-links a") ||
          target.closest(".accordion-item") ||
          target.closest(".trust-logo-item") ||
          target.closest("input") ||
          target.closest("textarea"))
      ) {
        cursor.classList.add("hover");
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      if (!cursor) return;
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest("a") ||
          target.closest("button") ||
          target.closest(".btn") ||
          target.closest(".pill-links a") ||
          target.closest(".accordion-item") ||
          target.closest(".trust-logo-item") ||
          target.closest("input") ||
          target.closest("textarea"))
      ) {
        cursor.classList.remove("hover");
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    // 3. Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on("scroll", ScrollTrigger.update);
    (window as any).lenis = lenis;

    const rafTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafTicker);
    gsap.ticker.lagSmoothing(0, 0);

    // Anchor Link Click Handler (Smooth Scroll to Hash)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      if (href.startsWith("#")) {
        const targetEl = document.querySelector(href) as HTMLElement | null;
        if (targetEl) {
          e.preventDefault();
          lenis.scrollTo(targetEl);
        }
      } else if (href.startsWith("/#")) {
        const hash = href.substring(1); // e.g. "#about"
        const targetEl = document.querySelector(hash) as HTMLElement | null;
        if (targetEl) {
          e.preventDefault();
          lenis.scrollTo(targetEl);
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
      gsap.ticker.remove(rafTicker);
      (window as any).lenis = undefined;
    };
  }, []);

  // 4. GSAP ScrollTrigger Section Reveals & Hash Scroll on Load
  const pathname = usePathname();

  useEffect(() => {
    if (showLoader) return;

    // Scroll handling on route change (reset to top if no hash is present)
    if (window.location.hash) {
      const targetEl = document.querySelector(window.location.hash) as HTMLElement | null;
      if (targetEl) {
        setTimeout(() => {
          const l = (window as any).lenis;
          if (l) {
            l.scrollTo(targetEl, { immediate: true });
          } else {
            targetEl.scrollIntoView();
          }
        }, 150); // Small delay to allow layout to settle
      }
    } else {
      // Force scroll to top of the page on route change
      setTimeout(() => {
        const l = (window as any).lenis;
        if (l) {
          l.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
      }, 50); // Small delay to ensure route rendering completes
    }

    const ctx = gsap.context(() => {
      // Generic Section Reveals (Fades & Slides Up)
      gsap.utils.toArray(".reveal").forEach((el: any) => {
        if (el.id === "hero") return;
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          }
        );
      });

      // Advanced Staggers (Philosophy Cards)
      gsap.utils.toArray(".philosophy-card").forEach((card: any) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          }
        );
      });

      // Pricing Matrix Cards
      if (document.querySelector(".pricing-card")) {
        gsap.fromTo(
          ".pricing-card",
          { scale: 0.95, opacity: 0 },
          {
            scrollTrigger: {
              trigger: ".pricing-matrix",
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
            scale: 1,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.2)",
          }
        );
      }

      // Testimonial Cards
      if (document.querySelector(".testimonial-card")) {
        gsap.fromTo(
          ".testimonial-card",
          { opacity: 0, scale: 0.9 },
          {
            scrollTrigger: {
              trigger: ".testimonials-section",
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: "power2.out",
          }
        );
      }
    });

    return () => {
      ctx.revert();
    };
  }, [pathname, showLoader]);

  return (
    <>
      {/* Global Loading Splash Screen */}
      {showLoader && (
        <div
          id="global-loader"
          className={`intro-splash ${!loading ? "fade-out" : ""}`}
        >
          <div
            className="splash-screen-window"
            style={{ background: "transparent", border: "none", boxShadow: "none" }}
          >
            <div className="splash-content">
              <h2
                className="logo text-gradient"
                style={{
                  fontSize: "32px",
                  letterSpacing: "4px",
                  animation: "pulse 1.5s infinite alternate",
                }}
              >
                BUILDLYST
              </h2>
              <div
                style={{
                  width: "150px",
                  height: "2px",
                  background: "rgba(0, 210, 255, 0.2)",
                  margin: "0 auto",
                  overflow: "hidden",
                  borderRadius: "2px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "var(--c-accent-cyan)",
                    animation: "loader-bar 1.5s infinite ease-in-out",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Cursor */}
      <div className="custom-cursor" id="custom-cursor" ref={cursorRef}></div>

      {/* Noise Overlay */}
      <div className="noise-overlay"></div>

      {/* Main Content Wrapper */}
      <div id="main-content">
        {/* Ambient Background Effects */}
        <div className="ambient-glow glow-1"></div>
        <div className="ambient-glow glow-2"></div>

        {children}
      </div>
    </>
  );
}
