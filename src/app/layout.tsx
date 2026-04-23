import type { Metadata, Viewport } from "next";
import Script from "next/script";
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
        <div
          id="safari-debug-badge"
          style={{
            position: "fixed",
            left: "12px",
            bottom: "12px",
            zIndex: 9999,
            maxWidth: "min(82vw, 320px)",
            padding: "8px 10px",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: "12px",
            background: "rgba(8,10,15,0.92)",
            color: "#f4efe6",
            font: "600 12px/1.35 system-ui, sans-serif",
            boxShadow: "0 12px 32px rgba(0,0,0,0.28)",
            display: "none",
          }}
        >
          inline:idle
        </div>
        <Script id="safari-inline-debug" strategy="beforeInteractive">
          {`
              (function () {
                try {
                  var enabled = new URLSearchParams(window.location.search).has("debugSafari");
                  if (!enabled) return;
                  var badge = document.getElementById("safari-debug-badge");
                  if (!badge) {
                    console.error("[safari-debug:inline] badge.missing");
                    return;
                  }
                  badge.setAttribute("aria-live", "polite");
                  badge.textContent = "inline:boot";
                  badge.style.display = "block";
                  window.__portfolioSafariDebug = {
                    update: function (message, extra) {
                      try {
                        badge.textContent = extra ? message + " | " + extra : message;
                        console.log("[safari-debug:inline] stage", { message: message, extra: extra });
                      } catch (debugError) {
                        console.error("[safari-debug:inline] badge.update.failed", debugError);
                      }
                    }
                  };
                  console.log("[safari-debug:inline] boot", {
                    href: window.location.href,
                    userAgent: navigator.userAgent,
                    innerWidth: window.innerWidth,
                    innerHeight: window.innerHeight,
                    pixelRatio: window.devicePixelRatio
                  });
                  window.addEventListener("error", function (event) {
                    if (window.__portfolioSafariDebug) {
                      window.__portfolioSafariDebug.update("window.error", event.message || "unknown");
                    }
                    console.error("[safari-debug:inline] window.error", {
                      message: event.message,
                      filename: event.filename,
                      lineno: event.lineno,
                      colno: event.colno,
                      error: event.error
                    });
                  });
                  window.addEventListener("unhandledrejection", function (event) {
                    if (window.__portfolioSafariDebug) {
                      window.__portfolioSafariDebug.update("unhandledrejection");
                    }
                    console.error("[safari-debug:inline] unhandledrejection", event.reason);
                  });
                } catch (error) {
                  console.error("[safari-debug:inline] bootstrap.failed", error);
                }
              })();
            `}
        </Script>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
