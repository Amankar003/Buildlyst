import MasterIndustryPortal from "@/components/MasterIndustryPortal";
import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | AI & Data Engineering Projects — Buildlyst",
  description:
    "Explore Buildlyst's portfolio of AI agent deployments, generative AI solutions, machine learning pipelines, and custom web applications across real estate, startups, manufacturing, e-commerce, healthcare, legal, and financial services.",
  alternates: {
    canonical: "https://www.buildlyst.in/case-studies",
  },
  openGraph: {
    title: "Case Studies | AI & Data Engineering Projects — Buildlyst",
    description:
      "Explore Buildlyst's portfolio of AI agent deployments, generative AI solutions, machine learning pipelines, and custom web applications built for enterprises and startups.",
    url: "https://www.buildlyst.in/case-studies",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | AI & Data Engineering Projects — Buildlyst",
    description:
      "Explore Buildlyst's portfolio of AI and data engineering projects across multiple industries.",
  },
};

export default function CaseStudiesPage() {
  return (
    <main>
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
                name: "Case Studies",
                item: "https://www.buildlyst.in/case-studies",
              },
            ],
          }),
        }}
      />
      <div style={{ paddingTop: "120px", minHeight: "100vh" }}>
        <MasterIndustryPortal />
      </div>
      <ContactForm />
    </main>
  );
}
