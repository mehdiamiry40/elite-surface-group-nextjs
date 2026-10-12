import type { Service } from "@/content/services";

/**
 * Solid geometric marks, one per service: vertical boards for cladding,
 * trowelled waves for render, bonded blocks for Hebel and a stud frame for
 * walling. Decorative — the service name beside it carries the meaning.
 */
export default function ServiceGlyph({
  slug,
  size = 44,
}: {
  slug: Service["slug"];
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className="service-glyph"
    >
      {slug === "cladding" ? (
        <>
          <rect x="2" y="2" width="7" height="44" />
          <rect x="13" y="2" width="7" height="44" />
          <rect x="24" y="2" width="7" height="44" />
          <rect x="35" y="2" width="7" height="44" />
        </>
      ) : null}
      {slug === "render" ? (
        <path d="M2 10c5.5-6 11-6 16.5 0s11 6 16.5 0c4-4.4 8-5.6 11-3.6v7.4c-3-2-7-.8-11 3.6-5.5 6-11 6-16.5 0S7.5 11.4 2 17.4Zm0 13c5.5-6 11-6 16.5 0s11 6 16.5 0c4-4.4 8-5.6 11-3.6v7.4c-3-2-7-.8-11 3.6-5.5 6-11 6-16.5 0S7.5 24.4 2 30.4Zm0 13c5.5-6 11-6 16.5 0s11 6 16.5 0c4-4.4 8-5.6 11-3.6v7.4c-3-2-7-.8-11 3.6-5.5 6-11 6-16.5 0S7.5 37.4 2 43.4Z" />
      ) : null}
      {slug === "hebel" ? (
        <>
          <rect x="2" y="2" width="20" height="12" />
          <rect x="26" y="2" width="20" height="12" />
          <rect x="2" y="18" width="8" height="12" />
          <rect x="14" y="18" width="20" height="12" />
          <rect x="38" y="18" width="8" height="12" />
          <rect x="2" y="34" width="20" height="12" />
          <rect x="26" y="34" width="20" height="12" />
        </>
      ) : null}
      {slug === "walling" ? (
        <path d="M2 2h44v7H40v30h6v7H2v-7h6V9H2Zm13 7v30h6V9Zm12 0v30h6V9Z" />
      ) : null}
    </svg>
  );
}
