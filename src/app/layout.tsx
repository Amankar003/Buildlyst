import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans, Fira_Code } from "next/font/google";
import ClientWrapper from "@/components/ClientWrapper";
import Navbar from "@/components/Navbar";
import SwarmFooter from "@/components/SwarmFooter";
import ChatbotWidget from "@/components/ChatbotWidget";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.buildlyst.in"),
  title: "Buildlyst | AI & Data Engineering Studio",
  description: "We build high-performance AI agents, machine learning pipelines, and custom data systems that transform how businesses operate.",
  keywords: [
    "AI Agency",
    "Data Engineering Studio",
    "Custom AI Agents",
    "GenAI Development",
    "Machine Learning Pipelines",
    "Python FastAPI Developers",
    "RAG Systems",
    "Enterprise AI Solutions India",
    "AI Agency Bhopal Delhi Bangalore"
  ],
  authors: [{ name: "Buildlyst Studio" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://buildlyst.in/",
  },
  openGraph: {
    type: "website",
    url: "https://www.buildlyst.in/",
    title: "Buildlyst | AI & Data Engineering Studio",
    description: "We build high-performance AI agents, machine learning pipelines, and custom data systems that transform how businesses operate.",
    siteName: "Buildlyst",
    images: [
      {
        url: "/static/img/og-preview.svg",
        width: 1200,
        height: 630,
        alt: "Buildlyst — AI & Data Engineering Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Buildlyst | AI & Data Engineering Studio",
    description: "We build high-performance AI agents, machine learning pipelines, and custom data systems that transform how businesses operate.",
    images: ["/static/img/og-preview.svg"],
  },
  icons: {
    icon: [
      { url: "/static/img/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/static/img/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable} ${firaCode.variable}`}>
      <body className="dark-theme">
        {/* Global JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Buildlyst",
              url: "https://www.buildlyst.in",
              logo: "https://www.buildlyst.in/static/img/og-preview.svg",
              description:
                "Buildlyst is a technology company and an AI and data engineering studio. We build custom AI agents, generative AI solutions, machine learning pipelines, data engineering infrastructure, and high-performance web applications for enterprises and startups.",
              sameAs: [
                "https://www.linkedin.com/company/buildlyst/",
                "https://www.instagram.com/buildlyst",
                "https://x.com/buildlystin",
              ],
              knowsAbout: [
                "AI Agents",
                "Generative AI",
                "Machine Learning",
                "Data Engineering",
                "Web Development",
                "RAG Systems",
                "LLM Fine-Tuning",
                "Computer Vision",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Buildlyst",
              url: "https://www.buildlyst.in",
              description:
                "AI & Data Engineering Studio. We build custom AI agents, machine learning pipelines, and enterprise data systems.",
            }),
          }}
        />
        <ClientWrapper>
          <Navbar />
          {children}
          <SwarmFooter />
          <ChatbotWidget />
        </ClientWrapper>
      </body>
    </html>
  );
}
