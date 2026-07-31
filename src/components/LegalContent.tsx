import { CheckIcon } from "@/components/icons";
import type { LegalBlock } from "@/content/legal";

export default function LegalContent({
  blocks,
}: {
  blocks: readonly LegalBlock[];
}) {
  return (
    <div className="prose">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          return <h2 key={`heading-${index}`}>{block.text}</h2>;
        }
        if (block.type === "paragraph") {
          if ("text" in block) {
            return <p key={`paragraph-${index}`}>{block.text}</p>;
          }
          return (
            <p key={`paragraph-${index}`}>
              {block.content.map((part, partIndex) =>
                typeof part === "string" ? (
                  part
                ) : (
                  <a
                    key={`${part.href}-${partIndex}`}
                    href={part.href}
                    rel={part.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {part.text}
                  </a>
                ),
              )}
            </p>
          );
        }
        return (
          <ul key={`list-${index}`}>
            {block.items.map((item) => (
              <li key={item}>
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
      })}
    </div>
  );
}
