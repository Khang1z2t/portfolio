import type { LocalizedContent } from "@/data/portfolio";

type PipelineSectionProps = { current: LocalizedContent };

export function PipelineSection({ current }: PipelineSectionProps) {
  return (
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
  );
}
