/**
 * Inline links for copy that lives in typed content modules.
 *
 * Service and location copy is stored as plain strings. A paragraph that needs
 * to point at another page writes the link as `[label](/path/)`; everything
 * else is literal text. Only site-relative paths are recognised, so content
 * cannot introduce an external link through this syntax.
 */
export type RichTextSegment =
  | { type: "text"; value: string }
  | { type: "link"; label: string; href: string };

// `(?!\/)` keeps a protocol-relative `//host` from passing as a site path.
const INLINE_LINK = /\[([^\][]+)\]\((\/(?!\/)[^()\s]*)\)/g;

export function parseRichText(source: string): RichTextSegment[] {
  const segments: RichTextSegment[] = [];
  let cursor = 0;

  for (const match of source.matchAll(INLINE_LINK)) {
    const start = match.index;
    if (start > cursor) {
      segments.push({ type: "text", value: source.slice(cursor, start) });
    }
    segments.push({ type: "link", label: match[1], href: match[2] });
    cursor = start + match[0].length;
  }

  if (cursor < source.length) {
    segments.push({ type: "text", value: source.slice(cursor) });
  }

  return segments;
}

/**
 * The copy as a reader sees it: link labels kept, link syntax dropped. Used
 * where the same string also feeds structured data.
 */
export function richTextPlain(source: string): string {
  return parseRichText(source)
    .map((segment) => (segment.type === "link" ? segment.label : segment.value))
    .join("");
}

/** Every site-relative path linked from a piece of copy. */
export function richTextLinks(source: string): string[] {
  return parseRichText(source).flatMap((segment) =>
    segment.type === "link" ? [segment.href] : [],
  );
}
