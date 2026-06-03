// SEO and metadata utilities

export const generateMetadata = (
  title: string,
  description: string,
  image?: string,
) => {
  const baseUrl = "https://karthikeya-portfolio.vercel.app";
  const defaultImage = `${baseUrl}/og-image.jpg`;

  return {
    title: `${title} | Karthikeya Unnam - GenAI Engineer`,
    description,
    keywords: [
      "GenAI",
      "AI Engineer",
      "LangGraph",
      "RAG",
      "Multi-Agent Systems",
      "Agentic AI",
      "Machine Learning",
    ],
    authors: [{ name: "Karthikeya Unnam" }],
    openGraph: {
      title: `${title} | Karthikeya Unnam`,
      description,
      url: baseUrl,
      type: "website",
      images: [
        {
          url: image || defaultImage,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Karthikeya Unnam`,
      description,
      images: [image || defaultImage],
    },
  };
};

export const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Unnam Karthikeya",
  jobTitle: "GenAI Engineer | Agentic AI Systems Builder",
  email: "karthikeyaunnam1364@gmail.com",
  url: "https://karthikeya-portfolio.vercel.app",
  sameAs: [
    "https://github.com/karthikeyakunnam",
    "https://linkedin.com/in/unnam-karthikeya",
  ],
  image: "https://karthikeya-portfolio.vercel.app/profile.jpg",
  description:
    "GenAI Engineer specializing in Agentic AI Systems, LangGraph, RAG, and Multi-Agent Architectures",
  knowsAbout: [
    "Agentic AI",
    "LangGraph",
    "RAG",
    "Multi-Agent Systems",
    "LLM",
    "Python",
    "FastAPI",
  ],
};

export const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://karthikeya-portfolio.vercel.app/sitemap.xml
`;

export const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://karthikeya-portfolio.vercel.app</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://karthikeya-portfolio.vercel.app/#about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://karthikeya-portfolio.vercel.app/#projects</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://karthikeya-portfolio.vercel.app/#timeline</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://karthikeya-portfolio.vercel.app/#contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;
