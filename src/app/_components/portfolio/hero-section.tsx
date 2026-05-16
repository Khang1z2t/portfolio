import type { MouseEvent, RefObject } from "react";
import type { LocalizedContent } from "@/data/portfolio";

type HeroSectionProps = {
  current: LocalizedContent;
  locale: string;
  trackedSectionRoutes: { work: string; skills: string; cv: string };
  navigateToSection: (
    section: "work" | "skills" | "cv",
  ) => (event: MouseEvent<HTMLAnchorElement>) => void;
  heroCopyRef: RefObject<HTMLDivElement | null>;
  eyebrowTextRef: RefObject<HTMLSpanElement | null>;
  topbar: React.ReactNode;
};

export function HeroSection({
  current,
  locale,
  trackedSectionRoutes,
  navigateToSection,
  heroCopyRef,
  eyebrowTextRef,
  topbar,
}: HeroSectionProps) {
  return (
    <section className="hero-section js-hero" id="home">
      <div className="hero-glow hero-glow-left" />
      <div className="hero-glow hero-glow-right" />
      <div className="hero-noise" />
      {topbar}
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
            <a
              className="button-primary"
              href={trackedSectionRoutes.work}
              onClick={navigateToSection("work")}
            >
              {current.hero.primaryAction}
            </a>
            <a
              className="button-secondary"
              href={trackedSectionRoutes.skills}
              onClick={navigateToSection("skills")}
            >
              {current.hero.secondaryAction}
            </a>
            <a
              className="button-secondary button-secondary-quiet"
              href={trackedSectionRoutes.cv}
              onClick={navigateToSection("cv")}
            >
              {current.labels.viewCv}
            </a>
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
  );
}
