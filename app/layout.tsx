import type { Metadata, Viewport } from "next";
import { PORTFOLIO_DATA } from "@/lib/constants";
import { structuredData } from "@/lib/seo";
import PreloaderProvider from "@/app/providers/PreloaderProvider";
import "./globals.css";

const baseUrl = "https://karthikeya-portfolio.vercel.app";
const description =
  "GenAI Engineer specializing in Agentic AI Systems, LangGraph, RAG, and Multi-Agent Architectures";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${PORTFOLIO_DATA.name} - GenAI Engineer | Agentic AI Systems`,
    template: `%s | ${PORTFOLIO_DATA.name}`,
  },
  description,
  keywords: [
    "GenAI",
    "AI Engineer",
    "LangGraph",
    "RAG",
    "Multi-Agent Systems",
    "Agentic AI",
    "Machine Learning",
    "LLM",
    "Software Engineering",
  ],
  authors: [{ name: PORTFOLIO_DATA.name, url: baseUrl }],
  creator: PORTFOLIO_DATA.name,
  publisher: PORTFOLIO_DATA.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    title: `${PORTFOLIO_DATA.name} - GenAI Engineer`,
    description,
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: PORTFOLIO_DATA.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PORTFOLIO_DATA.name} - GenAI Engineer`,
    description,
    images: [`${baseUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0B0F19",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />

        {/* Web Manifest */}
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <PreloaderProvider>
          {/* Skip to main content link for accessibility */}
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-background focus:rounded-md"
          >
            Skip to main content
          </a>

          <main id="main" role="main">
            {children}
          </main>
        </PreloaderProvider>
      </body>
    </html>
  );
}
