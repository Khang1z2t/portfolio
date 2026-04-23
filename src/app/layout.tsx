import type { Metadata, Viewport } from "next";
import { sharedSkillItems } from "@/data/portfolio";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const flattenedSkills = Array.from(new Set(sharedSkillItems.flat()));
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const metadataBase =
  siteUrl && URL.canParse(siteUrl) ? new URL(siteUrl) : undefined;

export const metadata: Metadata = {
  metadataBase,
  title: "Im Khang | Full-stack Developer Portfolio",
  description:
    "Im Khang is a full-stack developer focused on Java, Spring Boot, ReactJS, backend systems, secure APIs, Docker, CI/CD, and production-ready web products.",
  keywords: [
    "Im Khang",
    "Khang Bao",
    "full-stack developer",
    "backend developer",
    "Java developer",
    "Spring Boot",
    "ReactJS",
    "REST API",
    "Docker",
    "CI/CD",
    "portfolio",
    ...flattenedSkills,
  ],
  applicationName: "Im Khang Portfolio",
  authors: [{ name: "Im Khang" }],
  creator: "Im Khang",
  publisher: "Im Khang",
  category: "technology",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      vi: "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Im Khang | Full-stack Developer Portfolio",
    description:
      "Java, Spring Boot, ReactJS, backend systems, secure APIs, Docker, and end-to-end product delivery.",
    siteName: "Im Khang Portfolio",
    url: siteUrl || undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: "Im Khang | Full-stack Developer Portfolio",
    description:
      "Explore Im Khang's work in backend systems, APIs, Spring Boot, ReactJS, Docker, and full-stack product delivery.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
