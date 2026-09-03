import MasterIndustryPortal from "@/components/MasterIndustryPortal";
import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | Buildlyst AI & Data Engineering Studio",
  description: "Explore our in-depth case studies across Real Estate, Startups, Manufacturing, E-Commerce, and Healthcare.",
};

export default function CaseStudiesPage() {
  return (
    <main>
      <div style={{ paddingTop: "120px", minHeight: "100vh" }}>
        <MasterIndustryPortal />
      </div>
      <ContactForm />
    </main>
  );
}
