import type { LocalizedContent } from "@/data/portfolio";

type EngineeringSectionProps = { current: LocalizedContent };

export function EngineeringSection({ current }: EngineeringSectionProps) {
  return (
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
  );
}
