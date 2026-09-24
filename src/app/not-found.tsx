"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "75vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "20px",
        paddingTop: "140px",
      }}
    >
      <div className="section-header text-center" style={{ marginBottom: "20px" }}>
        <span className="overline highlight">Error 404</span>
      </div>
      <h1
        style={{
          fontSize: "clamp(60px, 8vw, 120px)",
          fontWeight: 800,
          background: "linear-gradient(90deg, #00D2FF 0%, #C084FC 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          margin: "0 0 24px 0",
          fontFamily: "var(--font-display)",
          lineHeight: 1
        }}
      >
        404
      </h1>
      <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", color: "#fff", marginBottom: "24px", fontFamily: "var(--font-display)" }}>
        Page Not Found
      </h2>
      <p style={{ color: "var(--c-text-secondary)", maxWidth: "500px", marginBottom: "40px", lineHeight: "1.6", fontSize: "16px" }}>
        The system route you are looking for doesn't exist, has been moved, or is temporarily unavailable. Let's get you back on track.
      </p>
      <Link href="/" className="btn btn-primary glow-border-btn" style={{ padding: "14px 32px", fontSize: "15px" }}>
        Return to System Core &rarr;
      </Link>
    </main>
  );
}
