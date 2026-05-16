import * as Popover from "@radix-ui/react-popover";
import type { MouseEvent } from "react";
import { FiChevronDown, FiMail, FiUser } from "react-icons/fi";
import type { LocalizedContent } from "@/data/portfolio";

type ConnectLink = {
  key: string;
  label: string;
  href?: string;
  icon: React.ReactNode;
  external: boolean;
};

type AboutSectionProps = {
  current: LocalizedContent;
  connectLinks: ConnectLink[];
  trackedSectionRoutes: { contact: string };
  navigateToSection: (
    section: "contact",
  ) => (event: MouseEvent<HTMLAnchorElement>) => void;
};

export function AboutSection({
  current,
  connectLinks,
  trackedSectionRoutes,
  navigateToSection,
}: AboutSectionProps) {
  return (
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
              href={trackedSectionRoutes.contact}
              onClick={navigateToSection("contact")}
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
  );
}
