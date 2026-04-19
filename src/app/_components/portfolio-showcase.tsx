"use client";

import { useGSAP } from "@gsap/react";
import {
  ArrowUpIcon,
  ChevronDownIcon,
  Cross2Icon,
  DownloadIcon,
} from "@radix-ui/react-icons";
import * as Popover from "@radix-ui/react-popover";
import * as Select from "@radix-ui/react-select";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { startTransition, useEffect, useRef, useState } from "react";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { FiChevronDown, FiMail, FiPhone, FiUser } from "react-icons/fi";
import { SiZalo } from "react-icons/si";
import {
  type Locale,
  type LocalizedContent,
  sharedSkillItems,
} from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CvPdfViewer = dynamic(
  () =>
    import("@/app/_components/cv-pdf-viewer").then((mod) => mod.CvPdfViewer),
  {
    ssr: false,
  },
);

type PortfolioShowcaseProps = {
  content: Record<Locale, LocalizedContent>;
};

const localeOptions: Array<{ label: string; value: Locale }> = [
  { label: "EN", value: "en" },
  { label: "VI", value: "vi" },
];
const localeStorageKey = "portfolio-locale";
const cvPath = "/resume/cv.pdf";
const cvDownloadName = `DinhQuocBaoKhang_SoftwareDeveloper_${new Date().getFullYear()}.pdf`;

export function PortfolioShowcase({ content }: PortfolioShowcaseProps) {
  const root = useRef<HTMLElement | null>(null);
  const heroCopyRef = useRef<HTMLDivElement | null>(null);
  const eyebrowTextRef = useRef<HTMLSpanElement | null>(null);
  const [locale, setLocale] = useState<Locale>("en");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [isCvOpen, setIsCvOpen] = useState(false);
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

  useEffect(() => {
    const storedLocale = window.localStorage.getItem(localeStorageKey);
    if (storedLocale === "en" || storedLocale === "vi") {
      setLocale(storedLocale);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(localeStorageKey, locale);
  }, [locale]);

  useEffect(() => {
    if (!isCvOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsCvOpen(false);
      }
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
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 280);

      const aboutSection = document.getElementById("about");
      if (!aboutSection) {
        setShowStickyHeader(false);
        return;
      }

      setShowStickyHeader(window.scrollY >= aboutSection.offsetTop / 2);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const heroTimeline = gsap.timeline({
        defaults: {
          duration: 0.9,
          ease: "power3.out",
        },
      });

      // Intro experiment is intentionally disabled for now.
      // heroTimeline.from(".js-intro-reveal", {
      //   y: 28,
      //   autoAlpha: 0,
      //   stagger: 0.12,
      //   duration: 0.85,
      // });
      heroTimeline
        .from(
          ".js-topbar",
          {
            y: -24,
            autoAlpha: 0,
          },
          "-=0.35",
        )
        .from(
          ".js-hero-meta",
          {
            y: 28,
            autoAlpha: 0,
            stagger: 0.08,
          },
          "-=0.55",
        )
        .from(
          ".js-hero-word",
          {
            yPercent: 120,
            autoAlpha: 0,
            stagger: 0.045,
            duration: 0.8,
          },
          "-=0.5",
        )
        .from(
          ".js-hero-panel",
          {
            scale: 0.96,
            y: 36,
            autoAlpha: 0,
            duration: 1,
          },
          "-=0.7",
        )
        .from(
          ".js-capability",
          {
            y: 18,
            autoAlpha: 0,
            stagger: 0.08,
            duration: 0.6,
          },
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
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
          },
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
            scrollTrigger: {
              trigger: row,
              start: "top 84%",
            },
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
        if (eyebrowNode) {
          eyebrowNode.textContent = eyebrowStates[0] ?? current.hero.eyebrow;
        }
        return;
      }

      const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+-/<>?=~";
      let eyebrowIndex = 0;

      const setScrambledText = (targetText: string, progress: number) => {
        const revealCount = Math.floor(targetText.length * progress);
        const nextText = targetText
          .split("")
          .map((char, index) => {
            if (char === " " || char === "—" || char === "," || char === ".") {
              return char;
            }

            if (index < revealCount) {
              return targetText[index];
            }

            return glyphs[Math.floor(Math.random() * glyphs.length)];
          })
          .join("");

        eyebrowNode.textContent = nextText;
      };

      eyebrowNode.textContent = eyebrowStates[0];
      gsap.set(eyebrowNode, {
        color: "#ffb074",
        textShadow: "0 0 0 rgba(0, 0, 0, 0)",
      });

      const eyebrowTimeline = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.72,
      });

      eyebrowStates.forEach((_state, stateIndex) => {
        eyebrowTimeline
          .to(
            eyebrowNode,
            {
              autoAlpha: 0.74,
              duration: 0.08,
              ease: "power1.out",
            },
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

      if (heroCopyNode) {
        ScrollTrigger.create({
          trigger: heroCopyNode,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => {
            eyebrowTimeline.paused(!self.isActive);
          },
        });
      }
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
      gsap.set(words, {
        autoAlpha: 0,
        yPercent: 100,
      });

      const wordTimeline = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.3,
      });

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
            {
              autoAlpha: 0,
              yPercent: -100,
              duration: 0.45,
              ease: "power3.in",
            },
            "+=1.05",
          );
      });

      if (heroCopyNode) {
        ScrollTrigger.create({
          trigger: heroCopyNode,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => {
            wordTimeline.paused(!self.isActive);
          },
        });
      }

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    },
    { dependencies: [locale], revertOnUpdate: true, scope: root },
  );

  const handleDownload = async () => {
    const response = await fetch(cvPath);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = cvDownloadName;
    a.click();

    URL.revokeObjectURL(url);
  };

  const renderTopbar = (mode: "hero" | "sticky") => (
    <header
      className={`topbar ${mode === "hero" ? "topbar--hero" : "topbar--sticky"} ${mode === "sticky" ? "js-topbar" : ""}`}
    >
      <a className="brand-mark" href="#home">
        {current.brand}
      </a>

      <div className="topbar-actions">
        <nav aria-label="Primary" className="topnav">
          <a href="#about">
            <span className="nav-label-desktop">{current.nav.about}</span>
            <span className="nav-label-mobile">
              {current.nav.aboutShort ?? current.nav.about}
            </span>
          </a>
          <a href="#work">
            <span className="nav-label-desktop">{current.nav.work}</span>
            <span className="nav-label-mobile">
              {current.nav.workShort ?? current.nav.work}
            </span>
          </a>
          <a href="#skills">
            <span className="nav-label-desktop">{current.nav.skills}</span>
            <span className="nav-label-mobile">
              {current.nav.skillsShort ?? current.nav.skills}
            </span>
          </a>
          <a href="#pipeline">
            <span className="nav-label-desktop">{current.nav.pipeline}</span>
            <span className="nav-label-mobile">
              {current.nav.pipelineShort ?? current.nav.pipeline}
            </span>
          </a>
          <a href="#engineering">
            <span className="nav-label-desktop">{current.nav.engineering}</span>
            <span className="nav-label-mobile">
              {current.nav.engineeringShort ?? current.nav.engineering}
            </span>
          </a>
          <a href="#contact">
            <span className="nav-label-desktop">{current.nav.contact}</span>
            <span className="nav-label-mobile">
              {current.nav.contactShort ?? current.nav.contact}
            </span>
          </a>
        </nav>

        <div className="locale-picker">
          <Select.Root
            value={locale}
            onValueChange={(value) => {
              startTransition(() => {
                setLocale(value as Locale);
              });
            }}
          >
            <Select.Trigger
              className="locale-trigger"
              aria-label={current.labels.language}
            >
              <Select.Value />
              <Select.Icon className="locale-trigger-icon">
                <ChevronDownIcon />
              </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
              <Select.Content
                className="locale-content"
                position="popper"
                sideOffset={10}
              >
                <Select.Viewport className="locale-viewport">
                  {localeOptions.map((option) => (
                    <Select.Item
                      className="locale-item"
                      key={option.value}
                      value={option.value}
                    >
                      <Select.ItemText>{option.label}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>
      </div>
    </header>
  );

  return (
    <main className="portfolio-shell" ref={root}>
      {/*
        Intro overlay experiment is paused for now.
        Keeping the markup here makes it easy to re-enable later without rebuilding it.
      <section className="intro-section js-intro" id="top">
        <div className="intro-orb intro-orb-left" />
        <div className="intro-orb intro-orb-right" />
        <div className="intro-grid-overlay" />

        <div className="intro-copy js-intro-copy">
          <p className="intro-kicker js-intro-reveal">{current.brand}</p>
          <h1 className="intro-title js-intro-reveal">{intro.title}</h1>
          <button className="intro-scroll js-intro-reveal" type="button">
            <span>{intro.action}</span>
            <ChevronDownIcon />
          </button>
        </div>
      </section>
      */}

      <div className={`topbar-shell ${showStickyHeader ? "is-visible" : ""}`}>
        {renderTopbar("sticky")}
      </div>

      <section className="hero-section js-hero" id="home">
        <div className="hero-glow hero-glow-left" />
        <div className="hero-glow hero-glow-right" />
        <div className="hero-noise" />
        {renderTopbar("hero")}

        <div className="hero-grid">
          <div className="hero-copy" ref={heroCopyRef}>
            <p className="eyebrow js-hero-meta">
              <span className="js-eyebrow-text" ref={eyebrowTextRef}>
                {current.hero.eyebrowStates?.[0] ?? current.hero.eyebrow}
              </span>
            </p>

            <div className="hero-heading" key={`${locale}-heading`}>
              {current.hero.headingWords.map((word) => (
                <span className="hero-word-wrap" key={word}>
                  <span className="hero-word js-hero-word">{word}</span>
                </span>
              ))}
            </div>

            <div className="hero-rotating js-hero-meta" aria-hidden="true">
              <span className="hero-rotating-label">
                {current.labels.nowItFeels}
              </span>
              <span
                className="hero-rotating-stage js-word-stage"
                key={`${locale}-words`}
              >
                {current.hero.animatedWords.map((word) => (
                  <span className="rotating-word js-rotating-word" key={word}>
                    {word}
                  </span>
                ))}
              </span>
            </div>

            <p className="hero-summary js-hero-meta">{current.hero.summary}</p>

            <div className="hero-actions js-hero-meta">
              <a className="button-primary" href="#work">
                {current.hero.primaryAction}
              </a>
              <a className="button-secondary" href="#skills">
                {current.hero.secondaryAction}
              </a>
              <button
                className="button-secondary button-secondary-quiet"
                onClick={() => {
                  setIsCvOpen(true);
                }}
                type="button"
              >
                {current.labels.viewCv}
              </button>
            </div>

            <div className="hero-note js-hero-meta">
              {current.hero.notes.map((note) => (
                <span key={note}>{note}</span>
              ))}
            </div>
          </div>

          <div className="hero-panel js-hero-panel">
            <div className="panel-caption">
              <span>{current.panel.captionLeft}</span>
              <span>{current.panel.captionRight}</span>
            </div>

            <div className="panel-orbit">
              <div className="orbit-core" />
              <div className="ring ring-large js-ring-slow" />
              <div className="ring ring-medium js-ring-fast" />
              <div className="ring ring-small js-ring-slow" />
              <div className="scan-line" />
            </div>

            <div className="panel-stack">
              <div className="panel-chip">
                <span>{current.panel.primaryLabel}</span>
                <strong>{current.panel.primaryValue}</strong>
              </div>
              <div className="panel-chip muted">
                <span>{current.panel.secondaryLabel}</span>
                <strong>{current.panel.secondaryValue}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section about-section js-section" id="about">
        <div className="about-grid">
          <div className="about-copy">
            <p className="eyebrow js-reveal">{current.about.eyebrow}</p>
            <h2 className="about-heading js-reveal">{current.about.heading}</h2>
            <p className="detail-copy js-reveal">{current.about.description}</p>
          </div>

          <div className="about-card js-reveal">
            <div className="about-facts-grid">
              {current.about.facts.map((fact) => (
                <div className="about-fact" key={fact.label}>
                  <p>{fact.label}</p>
                  <strong>{fact.value}</strong>
                </div>
              ))}
            </div>

            <div className="about-actions">
              <Popover.Root>
                <Popover.Trigger
                  aria-label={current.labels.connectSheet}
                  className="button-secondary connect-trigger connect-trigger-compact"
                >
                  <span className="connect-trigger-leading">
                    <FiUser />
                  </span>
                  <span className="connect-trigger-label">
                    {current.labels.connect}
                  </span>
                  <span className="connect-trigger-icon">
                    <FiChevronDown />
                  </span>
                </Popover.Trigger>

                <Popover.Portal>
                  <Popover.Content
                    align="start"
                    avoidCollisions
                    className="connect-content"
                    collisionPadding={16}
                    sideOffset={10}
                  >
                    <div className="connect-title">
                      {current.labels.connectSheet}
                    </div>

                    <div className="connect-viewport">
                      {connectLinks.map((item) =>
                        item.href ? (
                          <a
                            className="connect-item"
                            href={item.href}
                            key={item.key}
                            rel={item.external ? "noreferrer" : undefined}
                            target={item.external ? "_blank" : undefined}
                          >
                            <span className="connect-icon">{item.icon}</span>
                            <span>{item.label}</span>
                          </a>
                        ) : (
                          <span
                            aria-disabled="true"
                            className="connect-item is-disabled"
                            key={item.key}
                          >
                            <span className="connect-icon">{item.icon}</span>
                            <span>{item.label}</span>
                          </span>
                        ),
                      )}
                    </div>

                    <Popover.Arrow className="connect-arrow" />
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>

              <a
                className="button-secondary connect-trigger-compact"
                href="#contact"
              >
                <span className="connect-trigger-leading">
                  <FiMail />
                </span>
                <span className="connect-trigger-label">
                  {current.nav.contact}
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="strip-section">
        {current.capabilities.map((item) => (
          <p className="js-capability" key={item}>
            {item}
          </p>
        ))}
      </section>

      <section className="content-section js-section" id="work">
        <div className="section-heading">
          <p className="eyebrow js-reveal">{current.labels.selectedWork}</p>
          <h2 className="js-reveal">{current.projectsHeading}</h2>
        </div>

        <div className="project-list">
          {current.featuredProjects.map((project, index) => (
            <article className="project-row js-project-row" key={project.title}>
              <p className="project-index">0{index + 1}</p>
              <div className="project-body">
                <div>
                  <h3>{project.title}</h3>
                  <p className="project-type project-type-under">
                    {project.type}
                  </p>
                </div>
                <div className="project-copy">
                  <p className="project-summary">{project.summary}</p>
                  <p className="project-impact">{project.impact}</p>
                  <div className="project-links">
                    {project.repoUrl ? (
                      <a
                        className="project-link"
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {current.labels.viewRepository}
                      </a>
                    ) : null}
                    {project.liveUrl ? (
                      <a
                        className="project-link ghost"
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {current.labels.livePreview}
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section js-section" id="skills">
        <div className="section-heading">
          <p className="eyebrow js-reveal">{current.labels.skills}</p>
          <h2 className="js-reveal">{current.skillsHeading}</h2>
        </div>

        <div className="skills-grid">
          {current.skillGroups.map((group, index) => (
            <article className="skill-card js-reveal" key={group.title}>
              <p className="skill-title">{group.title}</p>
              <div className="skill-tags">
                {sharedSkillItems[index]?.map((item) => (
                  <span className="skill-tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section js-section js-pipeline" id="pipeline">
        <div className="section-heading">
          <p className="eyebrow js-reveal">{current.labels.pipeline}</p>
          <h2 className="js-reveal">{current.pipelineHeading}</h2>
          <p className="detail-copy js-reveal">{current.pipelineDescription}</p>
        </div>

        <div className="pipeline">
          <div className="pipeline-line">
            <span className="progress-line js-progress-line" />
          </div>

          <div className="pipeline-grid">
            {current.pipelineSteps.map((step) => (
              <article className="pipeline-card js-reveal" key={step.title}>
                <p className="pipeline-status">{step.status}</p>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section js-section" id="engineering">
        <div className="section-heading">
          <p className="eyebrow js-reveal">{current.labels.engineering}</p>
          <h2 className="js-reveal">{current.engineeringHeading}</h2>
        </div>

        <div className="split-layout">
          <p className="detail-copy js-reveal">
            {current.engineeringDescription}
          </p>

          <div className="upgrade-list">
            {current.engineeringPoints.map((point) => (
              <p className="js-reveal" key={point}>
                {point}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section
        className="content-section contact-section js-section"
        id="contact"
      >
        <div className="section-heading">
          <p className="eyebrow js-reveal">{current.labels.nextPass}</p>
          <h2 className="js-reveal">{current.contactHeading}</h2>
        </div>

        <div className="contact-panel js-reveal">
          <p>{current.contactDescription}</p>

          <div className="contact-links">
            <a href={`mailto:${current.contactEmail}`}>
              {current.contactEmail}
            </a>
            <a href={current.githubUrl} target="_blank" rel="noreferrer">
              {current.labels.githubProfile}
            </a>
            <a href={current.linkedinUrl} target="_blank" rel="noreferrer">
              {current.labels.connectWithMe}
            </a>
          </div>
        </div>
      </section>

      <footer className="portfolio-footer">
        <p>© Dinh Quoc Bao Khang {footerYear}. All rights reserved.</p>
      </footer>

      <button
        aria-label="Scroll to top"
        className={`scroll-top-button ${showScrollTop ? "is-visible" : ""}`}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        type="button"
      >
        <ArrowUpIcon />
      </button>

      {isCvOpen ? (
        <div
          aria-hidden="true"
          className="cv-modal-overlay"
          onClick={() => {
            setIsCvOpen(false);
          }}
        >
          <div
            aria-label={current.labels.cvTitle}
            aria-modal="true"
            className="cv-modal"
            onClick={(event) => {
              event.stopPropagation();
            }}
            onKeyDown={(event) => {
              if (event.key === " " || event.key === "Enter") {
                event.stopPropagation();
              }
            }}
            role="dialog"
            tabIndex={-1}
          >
            <div className="cv-modal-header">
              <div>
                <p className="cv-modal-eyebrow">{current.labels.viewCv}</p>
                <h3>{current.labels.cvTitle}</h3>
              </div>

              <button
                aria-label={current.labels.close}
                className="cv-close-button"
                onClick={() => {
                  setIsCvOpen(false);
                }}
                type="button"
              >
                <Cross2Icon />
              </button>
            </div>

            <div className="cv-modal-body">
              <CvPdfViewer
                fileUrl={cvPath}
                missingLabel={current.labels.cvMissing}
              />
            </div>

            <div className="cv-modal-footer">
              <button
                className="cv-download-button"
                onClick={handleDownload}
                type="button"
              >
                <DownloadIcon />
                <span>{current.labels.downloadCv}</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
