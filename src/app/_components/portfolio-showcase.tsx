"use client";

import { useGSAP } from "@gsap/react";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { type MouseEvent, useEffect, useRef, useState } from "react";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { FiMail, FiPhone } from "react-icons/fi";
import { SiZalo } from "react-icons/si";
import { AboutSection } from "@/app/_components/portfolio/about-section";
import { ContactSection } from "@/app/_components/portfolio/contact-section";
import { CvModal } from "@/app/_components/portfolio/cv-modal";
import { EngineeringSection } from "@/app/_components/portfolio/engineering-section";
import { HeroSection } from "@/app/_components/portfolio/hero-section";
import { PipelineSection } from "@/app/_components/portfolio/pipeline-section";
import { PortfolioTopbar } from "@/app/_components/portfolio/portfolio-topbar";
import { ProjectsSection } from "@/app/_components/portfolio/projects-section";
import { SkillsSection } from "@/app/_components/portfolio/skills-section";
import type { Locale, LocalizedContent } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger, useGSAP);
const loadCvPdfViewer = () =>
  import("@/app/_components/cv-pdf-viewer").then((mod) => mod.CvPdfViewer);
const CvPdfViewer = dynamic(loadCvPdfViewer, { ssr: false });
type PortfolioShowcaseProps = { content: Record<Locale, LocalizedContent> };
const localeOptions: Array<{ label: string; value: Locale }> = [
  { label: "EN", value: "en" },
  { label: "VI", value: "vi" },
];
const localeStorageKey = "portfolio-locale";
const cvPath =
  "https://joxnjprclihzcjvagyuz.supabase.co/storage/v1/object/public/portfolio/resume/DinhQuocBaoKhang_CV.pdf";
const cvDownloadName = `DinhQuocBaoKhang_SoftwareDeveloper_${new Date().getFullYear()}.pdf`;
const buildVersionedCvPath = (version: string | null) => {
  if (!version) return cvPath;
  const url = new URL(cvPath);
  url.searchParams.set("v", version);
  return url.toString();
};
const readCvVersionFromResponse = (response: Response) => {
  const etag = response.headers.get("etag")?.replaceAll('"', "").trim();
  if (etag) return etag;
  const lastModified = response.headers.get("last-modified");
  if (!lastModified) return null;
  const timestamp = Date.parse(lastModified);
  return Number.isNaN(timestamp) ? null : String(timestamp);
};
const resolveVersionedCvPath = async () => {
  try {
    const headResponse = await fetch(cvPath, {
      method: "HEAD",
      cache: "no-store",
    });
    if (!headResponse.ok) return cvPath;
    const version = readCvVersionFromResponse(headResponse);
    return buildVersionedCvPath(version);
  } catch {
    return cvPath;
  }
};
const cvPreloadLinkId = "portfolio-cv-preload";
const cvSupabasePreconnectId = "portfolio-cv-supabase-preconnect";
const cvWorkerPreconnectId = "portfolio-cv-worker-preconnect";
const trackedSectionRoutes = {
  home: "/",
  about: "/about",
  work: "/work",
  skills: "/skills",
  pipeline: "/how-i-work",
  engineering: "/mindset",
  contact: "/contact",
  cv: "/cv",
} as const;
const pathToSectionId: Record<string, keyof typeof trackedSectionRoutes> = {
  "/": "home",
  "/about": "about",
  "/work": "work",
  "/skills": "skills",
  "/how-i-work": "pipeline",
  "/mindset": "engineering",
  "/contact": "contact",
  "/cv": "cv",
};
const scrollToSection = (sectionId: string) => {
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
  if (sectionId === "home") return window.scrollTo({ top: 0, behavior });
  document
    .getElementById(sectionId)
    ?.scrollIntoView({ behavior, block: "start" });
};
const updateBrowserPath = (path: string) => {
  if (window.location.pathname !== path) window.history.pushState({}, "", path);
};
const replaceBrowserPath = (path: string) => {
  if (window.location.pathname !== path)
    window.history.replaceState({}, "", path);
};
const trackedScrollSections: Array<
  Exclude<keyof typeof trackedSectionRoutes, "cv">
> = ["home", "about", "work", "skills", "pipeline", "engineering", "contact"];
const resolveActiveSectionFromScroll = () => {
  const scrollY = window.scrollY;
  const viewportOffset = Math.max(window.innerHeight * 0.24, 120);
  const homeThreshold = 80;
  if (scrollY <= homeThreshold) return "home" as const;

  let activeSection: Exclude<keyof typeof trackedSectionRoutes, "cv"> = "home";
  for (const section of trackedScrollSections) {
    if (section === "home") continue;
    const sectionNode = document.getElementById(section);
    if (!sectionNode) continue;
    if (sectionNode.offsetTop - viewportOffset <= scrollY) {
      activeSection = section;
    }
  }
  return activeSection;
};
const warmUpCvAssets = (resolvedCvPath: string) => {
  void loadCvPdfViewer();
  if (!document.getElementById(cvSupabasePreconnectId)) {
    const link = document.createElement("link");
    link.id = cvSupabasePreconnectId;
    link.rel = "preconnect";
    link.href = new URL(cvPath).origin;
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  }
  if (!document.getElementById(cvWorkerPreconnectId)) {
    const link = document.createElement("link");
    link.id = cvWorkerPreconnectId;
    link.rel = "preconnect";
    link.href = "https://unpkg.com";
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  }
  const preloadLink = document.getElementById(
    cvPreloadLinkId,
  ) as HTMLLinkElement | null;
  if (!preloadLink) {
    const link = document.createElement("link");
    link.id = cvPreloadLinkId;
    link.rel = "prefetch";
    link.as = "fetch";
    link.href = resolvedCvPath;
    link.type = "application/pdf";
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  } else if (preloadLink.href !== resolvedCvPath) {
    preloadLink.href = resolvedCvPath;
  }
  void fetch(resolvedCvPath, { cache: "force-cache", mode: "cors" }).catch(
    () => undefined,
  );
};

export function PortfolioShowcase({ content }: PortfolioShowcaseProps) {
  const initialPathname = usePathname();
  const root = useRef<HTMLElement | null>(null);
  const heroCopyRef = useRef<HTMLDivElement | null>(null);
  const eyebrowTextRef = useRef<HTMLSpanElement | null>(null);
  const [locale, setLocale] = useState<Locale>("en");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [isCvPrimed, setIsCvPrimed] = useState(false);
  const [resolvedCvPath, setResolvedCvPath] = useState(cvPath);
  const [currentPath, setCurrentPath] = useState(initialPathname);
  const warmUpTriggeredRef = useRef(false);
  const lastNonCvPathRef = useRef(
    initialPathname === trackedSectionRoutes.cv
      ? trackedSectionRoutes.home
      : initialPathname,
  );
  const skipNextPathScrollRef = useRef(false);
  const skipNextSectionScrollRef = useRef(false);
  const current = content[locale];
  const footerYear = new Date().getFullYear();
  const contactPhoneHref = `tel:+84${current.contactPhone.replace(/^0/, "")}`;
  const zaloUrl = `https://zalo.me/${current.contactPhone}`;
  const connectLinks = [
    {
      key: "email",
      label: current.contactEmail,
      href: `mailto:${current.contactEmail}`,
      icon: <FiMail />,
      external: false,
    },
    {
      key: "facebook",
      label: current.labels.facebook,
      href: current.facebookUrl,
      icon: <FaFacebookF />,
      external: true,
    },
    {
      key: "github",
      label: current.labels.github,
      href: current.githubUrl,
      icon: <FaGithub />,
      external: true,
    },
    {
      key: "linkedin",
      label: current.labels.linkedin,
      href: current.linkedinUrl,
      icon: <FaLinkedinIn />,
      external: true,
    },
    {
      key: "phone",
      label: current.labels.phone,
      href: contactPhoneHref,
      icon: <FiPhone />,
      external: false,
    },
    {
      key: "zalo",
      label: current.labels.zalo,
      href: zaloUrl,
      icon: <SiZalo />,
      external: true,
    },
  ];
  const navigateToSection =
    (section: keyof typeof trackedSectionRoutes) =>
    (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      const nextPath = trackedSectionRoutes[section];
      const isCurrentPath = currentPath === nextPath;
      if (section === "cv") {
        if (currentPath !== trackedSectionRoutes.cv) {
          lastNonCvPathRef.current = currentPath;
        }
        if (!isCurrentPath) {
          updateBrowserPath(nextPath);
          setCurrentPath(nextPath);
        }
        setIsCvOpen(true);
        return;
      }
      setIsCvOpen(false);
      lastNonCvPathRef.current = nextPath;
      if (isCurrentPath) return scrollToSection(section);
      updateBrowserPath(nextPath);
      setCurrentPath(nextPath);
    };
  const closeCv = () => {
    const fallbackPath = lastNonCvPathRef.current || trackedSectionRoutes.home;
    setIsCvOpen(false);
    if (currentPath !== fallbackPath) {
      skipNextPathScrollRef.current = true;
      updateBrowserPath(fallbackPath);
      setCurrentPath(fallbackPath);
    }
  };
  useEffect(() => {
    const storedLocale = window.localStorage.getItem(localeStorageKey);
    if (storedLocale === "en" || storedLocale === "vi") setLocale(storedLocale);
  }, []);
  useEffect(() => {
    window.localStorage.setItem(localeStorageKey, locale);
  }, [locale]);
  useEffect(() => {
    let isCancelled = false;
    const runWarmUp = async () => {
      if (warmUpTriggeredRef.current) return;
      warmUpTriggeredRef.current = true;
      const versionedPath = await resolveVersionedCvPath();
      if (isCancelled) return;
      setResolvedCvPath(versionedPath);
      warmUpCvAssets(versionedPath);
      setIsCvPrimed(true);
    };
    if (!isCvOpen) return;
    void runWarmUp();
    return () => {
      isCancelled = true;
    };
  }, [isCvOpen]);

  useEffect(() => {
    if (!isCvOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsCvOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCvOpen]);
  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);
  useEffect(() => {
    const section = pathToSectionId[currentPath];
    if (!section) return;
    if (section === "cv") return setIsCvOpen(true);
    lastNonCvPathRef.current = currentPath;
    setIsCvOpen(false);
    if (skipNextPathScrollRef.current) {
      skipNextPathScrollRef.current = false;
      return;
    }
    if (skipNextSectionScrollRef.current) {
      skipNextSectionScrollRef.current = false;
      return;
    }
    requestAnimationFrame(() => scrollToSection(section));
  }, [currentPath]);
  useEffect(() => {
    let rafId = 0;
    const updateFromScroll = () => {
      const nextShowScrollTop = window.scrollY > 280;
      setShowScrollTop((prev) =>
        prev === nextShowScrollTop ? prev : nextShowScrollTop,
      );
      const aboutSection = document.getElementById("about");
      const nextSticky = aboutSection
        ? window.scrollY >= aboutSection.offsetTop / 2
        : false;
      setShowStickyHeader((prev) => (prev === nextSticky ? prev : nextSticky));

      if (window.location.pathname === trackedSectionRoutes.cv) return;
      const activeSection = resolveActiveSectionFromScroll();
      const nextPath = trackedSectionRoutes[activeSection];
      if (currentPath !== nextPath) {
        skipNextSectionScrollRef.current = true;
        lastNonCvPathRef.current = nextPath;
        setCurrentPath(nextPath);
      }
      replaceBrowserPath(nextPath);
    };
    const handleScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        updateFromScroll();
      });
    };
    updateFromScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [currentPath]);
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const heroTimeline = gsap.timeline({
        defaults: { duration: 0.9, ease: "power3.out" },
      });
      heroTimeline
        .from(".js-topbar", { y: -24, autoAlpha: 0 }, "-=0.35")
        .from(".js-hero-meta", { y: 28, autoAlpha: 0, stagger: 0.08 }, "-=0.55")
        .from(
          ".js-hero-word",
          { yPercent: 120, autoAlpha: 0, stagger: 0.045, duration: 0.8 },
          "-=0.5",
        )
        .from(
          ".js-hero-panel",
          { scale: 0.96, y: 36, autoAlpha: 0, duration: 1 },
          "-=0.7",
        )
        .from(
          ".js-capability",
          { y: 18, autoAlpha: 0, stagger: 0.08, duration: 0.6 },
          "-=0.4",
        );
      gsap.to(".js-ring-slow", {
        rotation: 360,
        duration: 34,
        ease: "none",
        repeat: -1,
      });
      gsap.to(".js-ring-fast", {
        rotation: -360,
        duration: 22,
        ease: "none",
        repeat: -1,
      });
      gsap.to(".js-hero-panel", {
        yPercent: -10,
        rotateX: 4,
        ease: "none",
        scrollTrigger: {
          trigger: ".js-hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
        },
      });
      gsap.utils.toArray<HTMLElement>(".js-section").forEach((section) => {
        gsap.from(section.querySelectorAll(".js-reveal"), {
          y: 44,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 78%" },
        });
      });
      gsap.utils
        .toArray<HTMLElement>(".js-project-row")
        .forEach((row, index) => {
          gsap.from(row, {
            y: 64,
            autoAlpha: 0,
            duration: 0.95,
            ease: "power3.out",
            delay: index * 0.03,
            scrollTrigger: { trigger: row, start: "top 84%" },
          });
        });
      gsap.to(".js-progress-line", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".js-pipeline",
          start: "top 72%",
          end: "bottom 28%",
          scrub: 1,
        },
      });
    },
    { dependencies: [locale], revertOnUpdate: true, scope: root },
  );
  useGSAP(
    () => {
      const heroCopyNode = heroCopyRef.current;
      const eyebrowNode = eyebrowTextRef.current;
      const eyebrowStates = current.hero.eyebrowStates?.length
        ? current.hero.eyebrowStates
        : [current.hero.eyebrow];
      if (!eyebrowNode || eyebrowStates.length <= 1) {
        if (eyebrowNode)
          eyebrowNode.textContent = eyebrowStates[0] ?? current.hero.eyebrow;
        return;
      }
      const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+-/<>?=~";
      let eyebrowIndex = 0;
      const setScrambledText = (targetText: string, progress: number) => {
        const revealCount = Math.floor(targetText.length * progress);
        eyebrowNode.textContent = targetText
          .split("")
          .map((char, index) => {
            if (char === " " || char === "—" || char === "," || char === ".")
              return char;
            if (index < revealCount) return targetText[index];
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          })
          .join("");
      };
      eyebrowNode.textContent = eyebrowStates[0];
      gsap.set(eyebrowNode, {
        color: "#ffb074",
        textShadow: "0 0 0 rgba(0, 0, 0, 0)",
      });
      const eyebrowTimeline = gsap.timeline({ repeat: -1, repeatDelay: 0.72 });
      eyebrowStates.forEach((_state, stateIndex) => {
        eyebrowTimeline
          .to(
            eyebrowNode,
            { autoAlpha: 0.74, duration: 0.08, ease: "power1.out" },
            stateIndex === 0 ? "+=2.6" : "+=2.95",
          )
          .to(eyebrowNode, {
            duration: 0.08,
            ease: "power1.out",
            textShadow:
              "-1px 0 rgba(255, 122, 26, 0.72), 1px 0 rgba(102, 216, 255, 0.68), 0 0 8px rgba(255, 122, 26, 0.08)",
          })
          .to(eyebrowNode, {
            duration: 0.46,
            ease: "none",
            onStart: () => {
              eyebrowIndex = (eyebrowIndex + 1) % eyebrowStates.length;
            },
            onUpdate: function onUpdate() {
              setScrambledText(eyebrowStates[eyebrowIndex], this.progress());
            },
          })
          .to(eyebrowNode, {
            autoAlpha: 1,
            duration: 0.12,
            ease: "power2.out",
            textShadow:
              "0 0 0 rgba(255, 122, 26, 0), 0 0 0 rgba(102, 216, 255, 0)",
          });
      });
      if (heroCopyNode)
        ScrollTrigger.create({
          trigger: heroCopyNode,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => {
            eyebrowTimeline.paused(!self.isActive);
          },
        });
    },
    { dependencies: [locale], revertOnUpdate: true, scope: root },
  );
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        ScrollTrigger.refresh();
        return;
      }
      const heroCopyNode = heroCopyRef.current;
      const words = gsap.utils.toArray<HTMLElement>(".js-rotating-word");
      gsap.set(words, { autoAlpha: 0, yPercent: 100 });
      const wordTimeline = gsap.timeline({ repeat: -1, repeatDelay: 0.3 });
      words.forEach((word) => {
        wordTimeline
          .to(word, {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.55,
            ease: "power3.out",
          })
          .to(
            word,
            { autoAlpha: 0, yPercent: -100, duration: 0.45, ease: "power3.in" },
            "+=1.05",
          );
      });
      if (heroCopyNode)
        ScrollTrigger.create({
          trigger: heroCopyNode,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => {
            wordTimeline.paused(!self.isActive);
          },
        });
      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    { dependencies: [locale], revertOnUpdate: true, scope: root },
  );
  const handleDownload = async () => {
    const response = await fetch(resolvedCvPath);
    if (!response.ok)
      throw new Error(`Failed to download CV: ${response.status}`);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = cvDownloadName;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="portfolio-shell" ref={root}>
      <div className={`topbar-shell ${showStickyHeader ? "is-visible" : ""}`}>
        <PortfolioTopbar
          mode="sticky"
          current={current}
          locale={locale}
          localeOptions={localeOptions}
          trackedSectionRoutes={trackedSectionRoutes}
          navigateToSection={navigateToSection}
          setLocale={setLocale}
        />
      </div>
      <HeroSection
        current={current}
        locale={locale}
        trackedSectionRoutes={trackedSectionRoutes}
        navigateToSection={navigateToSection}
        heroCopyRef={heroCopyRef}
        eyebrowTextRef={eyebrowTextRef}
        topbar={
          <PortfolioTopbar
            mode="hero"
            current={current}
            locale={locale}
            localeOptions={localeOptions}
            trackedSectionRoutes={trackedSectionRoutes}
            navigateToSection={navigateToSection}
            setLocale={setLocale}
          />
        }
      />
      <AboutSection
        current={current}
        connectLinks={connectLinks}
        trackedSectionRoutes={trackedSectionRoutes}
        navigateToSection={navigateToSection}
      />
      <section className="strip-section">
        {current.capabilities.map((item) => (
          <p className="js-capability" key={item}>
            {item}
          </p>
        ))}
      </section>
      <ProjectsSection current={current} />
      <SkillsSection current={current} />
      <PipelineSection current={current} />
      <EngineeringSection current={current} />
      <ContactSection current={current} />
      <footer className="portfolio-footer">
        <p>© Dinh Quoc Bao Khang {footerYear}. All rights reserved.</p>
      </footer>
      <button
        aria-label="Scroll to top"
        className={`scroll-top-button ${showScrollTop ? "is-visible" : ""}`}
        onClick={() => {
          if (currentPath === trackedSectionRoutes.home)
            return scrollToSection("home");
          updateBrowserPath(trackedSectionRoutes.home);
          setCurrentPath(trackedSectionRoutes.home);
        }}
        type="button"
      >
        <ArrowUpIcon />
      </button>
      <CvModal
        isCvOpen={isCvOpen}
        isCvPrimed={isCvPrimed}
        cvPath={resolvedCvPath}
        cvTitle={current.labels.cvTitle}
        viewCvLabel={current.labels.viewCv}
        closeLabel={current.labels.close}
        cvMissingLabel={current.labels.cvMissing}
        downloadLabel={current.labels.downloadCv}
        onClose={closeCv}
        onDownload={handleDownload}
        CvPdfViewer={CvPdfViewer}
      />
    </main>
  );
}
