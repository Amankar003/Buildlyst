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
  title: "Buildlyst | Premium AI & Data Engineering Studio",
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
    url: "https://buildlyst.in/",
    title: "Buildlyst | Premium AI & Data Engineering Studio",
    description: "We build high-performance AI agents, machine learning pipelines, and custom data systems that transform how businesses operate.",
    images: [
      {
        url: "https://buildlyst.vercel.app/static/img/og-preview.svg",
        width: 1200,
        height: 630,
        alt: "Buildlyst AI & Data Engineering Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Buildlyst | Premium AI & Data Engineering Studio",
    description: "We build high-performance AI agents, machine learning pipelines, and custom data systems that transform how businesses operate.",
    images: ["https://buildlyst.vercel.app/static/img/og-preview.svg"],
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
