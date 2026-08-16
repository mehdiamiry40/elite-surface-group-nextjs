import lcpBlurMap from "@/lib/lcp-blur.json";

const placeholders = lcpBlurMap as Record<string, string>;

/** Tiny blur placeholder for a full-bleed / LCP photograph, if we have one. */
export function lcpBlur(src: string): string | undefined {
  return placeholders[src];
}

type BlurProps = {
  placeholder: "blur";
  blurDataURL: string;
};

/** Spread onto `next/image` for photographs that should show a LQIP first. */
export function blurProps(src: string): BlurProps | Record<string, never> {
  const blurDataURL = lcpBlur(src);
  return blurDataURL ? { placeholder: "blur", blurDataURL } : {};
}
