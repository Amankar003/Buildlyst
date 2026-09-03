import Navbar from "@/components/Navbar";
import SwarmFooter from "@/components/SwarmFooter";
import MasterIndustryPortal from "@/components/MasterIndustryPortal";
import ProofOfImpactHybrid from "@/components/ProofOfImpactHybrid";
import ProofOfImpactOption2 from "@/components/ProofOfImpactOption2";
import ProofOfImpactOption3 from "@/components/ProofOfImpactOption3";

export default function PreviewImpactPage() {
  return (
    <main className="main-wrapper" style={{ background: "var(--c-bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* Quick Navigation Toolbar */}
      <div
        style={{
          position: "sticky",
          top: "80px",
          zIndex: 900,
          background: "rgba(10, 12, 16, 0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0, 210, 255, 0.3)",
          padding: "12px 0",
          textAlign: "center"
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: "11px", fontWeight: 800, color: "var(--c-accent-cyan)", textTransform: "uppercase" }}>
            ⭐ MASTER INDUSTRY PORTAL (7 SECTORS):
          </span>
          <a href="#master-portal" style={{ padding: "5px 14px", borderRadius: "20px", background: "linear-gradient(90deg, #00D2FF, #8A2387)", color: "#fff", fontSize: "12px", fontWeight: 800, textDecoration: "none", boxShadow: "0 0 15px rgba(0,210,255,0.4)" }}>
            ✨ Master 7-Sector Portal (New!)
          </a>
          <a href="#option1" style={{ padding: "5px 12px", borderRadius: "20px", background: "rgba(255,255,255,0.06)", color: "var(--c-text-secondary)", fontSize: "11px", textDecoration: "none" }}>
            Option 1 Carousel
          </a>
          <a href="#option2" style={{ padding: "5px 12px", borderRadius: "20px", background: "rgba(255,255,255,0.06)", color: "var(--c-text-secondary)", fontSize: "11px", textDecoration: "none" }}>
            Option 2 Split Studio
          </a>
          <a href="#option3" style={{ padding: "5px 12px", borderRadius: "20px", background: "rgba(255,255,255,0.06)", color: "var(--c-text-secondary)", fontSize: "11px", textDecoration: "none" }}>
            Option 3 Bento Grid
          </a>
        </div>
      </div>

      <div style={{ paddingTop: "20px" }}>
        {/* NEW MASTER INDUSTRY PORTAL (7 SECTORS & 20 CASE STUDIES) */}
        <div id="master-portal">
          <MasterIndustryPortal />
        </div>

        <hr style={{ borderColor: "rgba(255,255,255,0.08)", margin: "60px 0" }} />

        {/* Previous Options for Reference */}
        <div id="option1">
          <ProofOfImpactHybrid />
        </div>

        <hr style={{ borderColor: "rgba(255,255,255,0.08)", margin: "60px 0" }} />

        <div id="option2">
          <ProofOfImpactOption2 />
        </div>

        <hr style={{ borderColor: "rgba(255,255,255,0.08)", margin: "60px 0" }} />

        <div id="option3">
          <ProofOfImpactOption3 />
        </div>
      </div>

      <SwarmFooter />
    </main>
  );
}
