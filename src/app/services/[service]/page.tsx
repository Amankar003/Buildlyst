import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES_DATA } from "@/data/servicesData";
import ServicePageClient from "@/components/ServicePageClient";

interface Params {
  service: string;
}

interface PageProps {
  params: Promise<Params>;
}

// Human-readable service names for metadata
const SERVICE_NAMES: Record<string, string> = {
  "ai-agents": "AI Agents",
  "gen-ai": "Generative AI",
  "machine-learning": "Machine Learning",
  "data-engineering": "Data Engineering",
  "web-development": "Web Development",
};

// Generate dynamic metadata for search engines
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const data = SERVICES_DATA[resolvedParams.service];
  if (!data) return {};

  const serviceName = SERVICE_NAMES[resolvedParams.service] || resolvedParams.service;
  const title = `${serviceName} Services | Buildlyst AI & Data Engineering Studio`;
  const description = data.subtext;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.buildlyst.in/services/${resolvedParams.service}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.buildlyst.in/services/${resolvedParams.service}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const serviceKey = resolvedParams.service;

  // Retrieve the page content mapping
  const serviceData = SERVICES_DATA[serviceKey];
  if (!serviceData) {
    notFound();
  }

  const serviceName = SERVICE_NAMES[serviceKey] || serviceKey;

  // Build FAQPage JSON-LD from the service's genuine FAQ data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: serviceData.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // Build Service JSON-LD
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${serviceName} Development`,
    description: serviceData.subtext,
    provider: {
      "@type": "Organization",
      name: "Buildlyst",
      url: "https://www.buildlyst.in",
    },
    serviceType: serviceName,
    areaServed: "Worldwide",
  };

  // Build BreadcrumbList JSON-LD
  const breadcrumbSchema = {
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
        name: "Services",
        item: "https://www.buildlyst.in",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: serviceName,
        item: `https://www.buildlyst.in/services/${serviceKey}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServicePageClient serviceKey={serviceKey} />
    </>
  );
}

// Generate static parameters for build caching
export function generateStaticParams() {
  return [
    { service: "ai-agents" },
    { service: "gen-ai" },
    { service: "machine-learning" },
    { service: "data-engineering" },
    { service: "web-development" },
  ];
}
export const dynamicParams = false; // block unknown subpaths
