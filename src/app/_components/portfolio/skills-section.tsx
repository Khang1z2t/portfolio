import { type LocalizedContent, sharedSkillItems } from "@/data/portfolio";

type SkillsSectionProps = { current: LocalizedContent };
export function SkillsSection({ current }: SkillsSectionProps) {
  return (
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
  );
}
