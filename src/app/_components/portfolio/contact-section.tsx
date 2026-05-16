import type { LocalizedContent } from "@/data/portfolio";

type ContactSectionProps = { current: LocalizedContent };

export function ContactSection({ current }: ContactSectionProps) {
  return (
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
          <a href={`mailto:${current.contactEmail}`}>{current.contactEmail}</a>
          <a href={current.githubUrl} target="_blank" rel="noreferrer">
            {current.labels.githubProfile}
          </a>
          <a href={current.linkedinUrl} target="_blank" rel="noreferrer">
            {current.labels.connectWithMe}
          </a>
        </div>
      </div>
    </section>
  );
}
