import { Fragment } from "react";
import Link from "next/link";
import { parseRichText } from "@/lib/rich-text";

/**
 * Renders content-module copy, turning `[label](/path/)` into internal links.
 * See `src/lib/rich-text.ts` for the syntax and its limits.
 */
export default function RichText({ text }: { text: string }) {
  return (
    <>
      {parseRichText(text).map((segment, index) =>
        segment.type === "link" ? (
          <Link key={index} href={segment.href} prefetch={false}>
            {segment.label}
          </Link>
        ) : (
          <Fragment key={index}>{segment.value}</Fragment>
        ),
      )}
    </>
  );
}
