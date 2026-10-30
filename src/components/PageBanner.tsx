import Image from "next/image";
import Link from "next/link";
import { blurProps } from "@/lib/lcp-blur";

type Crumb = {
  label: string;
  href?: string;
};

type PageBannerProps = {
  title: string;
  image: string;
  /**
   * Set when this photograph is the page's only copy of the shot.
   * Otherwise the banner is decorative and the body image carries the alt.
   */
  imageAlt?: string;
  /** Trail after "Home"; the last entry is rendered as the current page. */
  crumbs?: readonly Crumb[];
};

export default function PageBanner({
  title,
  image,
  imageAlt,
  crumbs,
}: PageBannerProps) {
  return (
    // Long article titles drop a size so they stay within three lines.
    <section className={title.length > 42 ? "banner banner--long" : "banner"}>
      <div className="shell">
        {crumbs?.length ? (
          <nav className="crumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/" prefetch={false}>
                  Home
                </Link>
              </li>
              {crumbs.map((crumb, index) => (
                <li key={crumb.label}>
                  {crumb.href && index < crumbs.length - 1 ? (
                    <Link href={crumb.href}>{crumb.label}</Link>
                  ) : (
                    <span aria-current="page">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <h1>{title}</h1>
        <div className="banner__media">
          <Image
            src={image}
            alt={imageAlt ?? ""}
            fill
            sizes="(max-width: 1280px) 100vw, 1220px"
            priority
            fetchPriority="high"
            aria-hidden={imageAlt ? undefined : true}
            {...blurProps(image)}
          />
        </div>
      </div>
    </section>
  );
}
