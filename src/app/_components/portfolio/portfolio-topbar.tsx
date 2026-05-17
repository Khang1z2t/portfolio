import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";
import { type MouseEvent, startTransition } from "react";
import type { Locale, LocalizedContent } from "@/data/portfolio";

type PortfolioTopbarProps = {
  mode: "hero" | "sticky";
  current: LocalizedContent;
  locale: Locale;
  localeOptions: Array<{ label: string; value: Locale }>;
  trackedSectionRoutes: {
    home: string;
    about: string;
    work: string;
    skills: string;
    pipeline: string;
    engineering: string;
    contact: string;
  };
  navigateToSection: (
    section:
      | "home"
      | "about"
      | "work"
      | "skills"
      | "pipeline"
      | "engineering"
      | "contact",
  ) => (event: MouseEvent<HTMLAnchorElement>) => void;
  setLocale: (locale: Locale) => void;
};

export function PortfolioTopbar({
  mode,
  current,
  locale,
  localeOptions,
  trackedSectionRoutes,
  navigateToSection,
  setLocale,
}: PortfolioTopbarProps) {
  return (
    <header
      className={`topbar ${mode === "hero" ? "topbar--hero" : "topbar--sticky"} ${mode === "sticky" ? "js-topbar" : ""}`}
    >
      <a
        className="brand-mark"
        href={trackedSectionRoutes.home}
        onClick={navigateToSection("home")}
      >
        {current.brand}
      </a>

      <div className="topbar-actions">
        <nav aria-label="Primary" className="topnav">
          <a
            href={trackedSectionRoutes.about}
            onClick={navigateToSection("about")}
          >
            <span className="nav-label-desktop">{current.nav.about}</span>
            <span className="nav-label-mobile">
              {current.nav.aboutShort ?? current.nav.about}
            </span>
          </a>
          <a
            href={trackedSectionRoutes.work}
            onClick={navigateToSection("work")}
          >
            <span className="nav-label-desktop">{current.nav.work}</span>
            <span className="nav-label-mobile">
              {current.nav.workShort ?? current.nav.work}
            </span>
          </a>
          <a
            href={trackedSectionRoutes.skills}
            onClick={navigateToSection("skills")}
          >
            <span className="nav-label-desktop">{current.nav.skills}</span>
            <span className="nav-label-mobile">
              {current.nav.skillsShort ?? current.nav.skills}
            </span>
          </a>
          <a
            href={trackedSectionRoutes.pipeline}
            onClick={navigateToSection("pipeline")}
          >
            <span className="nav-label-desktop">{current.nav.pipeline}</span>
            <span className="nav-label-mobile">
              {current.nav.pipelineShort ?? current.nav.pipeline}
            </span>
          </a>
          <a
            href={trackedSectionRoutes.engineering}
            onClick={navigateToSection("engineering")}
          >
            <span className="nav-label-desktop">{current.nav.engineering}</span>
            <span className="nav-label-mobile">
              {current.nav.engineeringShort ?? current.nav.engineering}
            </span>
          </a>
          <a
            href={trackedSectionRoutes.contact}
            onClick={navigateToSection("contact")}
          >
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
                side="bottom"
                align="end"
                sideOffset={6}
                alignOffset={0}
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
}
