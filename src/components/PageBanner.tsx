import Image from "next/image";
import Link from "next/link";

type Crumb = {
  label: string;
  href?: string;
};

type PageBannerProps = {
  title: string;
  image: string;
  /** Trail after "Home"; the last entry is rendered as the current page. */
  crumbs?: readonly Crumb[];
};

export default function PageBanner({ title, image, crumbs }: PageBannerProps) {
  return (
    <section className="banner">
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        priority
        quality={78}
        aria-hidden
      />
      <div className="shell">
        <h1>{title}</h1>
        {crumbs?.length ? (
          <nav className="crumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">Home</Link>
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
      </div>
    </section>
  );
}
