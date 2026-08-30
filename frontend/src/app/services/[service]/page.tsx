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

// Generate dynamic metadata for search engines
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const data = SERVICES_DATA[resolvedParams.service];
  if (!data) return {};

  const title = `Buildlyst | ${data.headline.replace(".", "")}`;
  return {
    title,
    description: data.subtext,
    openGraph: {
      title,
      description: data.subtext,
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

  return <ServicePageClient serviceKey={serviceKey} />;
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
