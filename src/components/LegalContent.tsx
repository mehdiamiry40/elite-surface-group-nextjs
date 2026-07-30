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
          return <h2 key={block.text}>{block.text}</h2>;
        }
        if (block.type === "paragraph") {
          return <p key={`${index}-${block.text.slice(0, 24)}`}>{block.text}</p>;
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
