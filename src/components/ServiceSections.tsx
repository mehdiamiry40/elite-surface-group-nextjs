import RichText from "@/components/RichText";
import {
  Callout,
  Checklist,
  ComparisonTable,
  CompatibilityMatrix,
  DecisionGuide,
  Glossary,
  NumberedSteps,
  ProblemsTable,
} from "@/components/ContentBlocks";
import { TickList } from "@/components/sections";
import type { SectionFormat } from "@/content/section-formats";
import type { ServiceSection } from "@/content/services";

/**
 * One structured format from a content module, on the shared content block
 * that draws it.
 *
 * A format with its own `heading` sits under an `h3`, so numbered steps drop
 * to `h4` there and no heading level is skipped. Without one, the steps sit
 * directly under the section's `h2` and keep their `h3`.
 */
export function SectionFormatBlock({ format }: { format: SectionFormat }) {
  return (
    <>
      {format.heading ? <h3 id={format.id}>{format.heading}</h3> : null}
      {format.intro ? (
        <p>
          <RichText text={format.intro} />
        </p>
      ) : null}
      {renderFormat(format)}
    </>
  );
}

function renderFormat(format: SectionFormat) {
  switch (format.type) {
    case "comparison":
      return <ComparisonTable {...format.table} />;
    case "decision":
      return (
        <DecisionGuide
          caption={format.caption}
          rows={format.rows}
          columns={format.columns}
        />
      );
    case "compatibility":
      return (
        <CompatibilityMatrix
          caption={format.caption}
          rows={format.rows}
          columns={format.columns}
        />
      );
    case "problems":
      return (
        <ProblemsTable
          caption={format.caption}
          rows={format.rows}
          columns={format.columns}
        />
      );
    case "steps":
      return (
        <NumberedSteps
          steps={format.steps}
          headingLevel={format.heading ? 4 : 3}
        />
      );
    case "checklist":
      return <Checklist items={format.items} columns={format.columns} />;
    case "glossary":
      return <Glossary terms={format.terms} />;
    case "callout":
      return (
        <Callout
          title={format.note.title}
          body={format.note.body}
          tone={format.tone}
        />
      );
  }
}

/**
 * Long-form service sections, one band per heading.
 *
 * The same bands as `ContentSections` in `sections.tsx`, with one addition:
 * a section's `formats` are drawn after its tick list and before its closing
 * paragraphs. It is a separate component so the shared one stays as the
 * location pages use it.
 */
export default function ServiceSections({
  sections,
  startTinted = false,
}: {
  sections: readonly ServiceSection[];
  startTinted?: boolean;
}) {
  return (
    <>
      {sections.map((section, index) => {
        const tinted = (index % 2 === 0) === startTinted;
        return (
          <section
            key={section.id}
            className={tinted ? "section section--tint" : "section"}
            aria-labelledby={section.id}
          >
            <div className="shell prose">
              <h2 id={section.id}>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>
                  <RichText text={paragraph} />
                </p>
              ))}
              {section.bullets ? <TickList items={section.bullets} /> : null}
              {section.formats?.map((format, formatIndex) => (
                <SectionFormatBlock
                  key={format.id ?? `${section.id}-format-${formatIndex}`}
                  format={format}
                />
              ))}
              {section.closing?.map((paragraph) => (
                <p key={paragraph}>
                  <RichText text={paragraph} />
                </p>
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
