import type { Metadata } from "next";
import Link from "next/link";
import { PhoneIcon } from "@/components/icons";
import { business, mainNav } from "@/content/site";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The page you requested does not exist or has moved. Browse Elite Surface Group services or call us for help.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="section">
      <div className="shell notfound">
        <div>
          <p className="eyebrow">Error 404</p>
          <h1>Page not found</h1>
          <p>
            The page you requested does not exist or has moved. Try one of the
            links below, or give us a call and we will point you in the right
            direction.
          </p>
          <p style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
            <Link className="btn" href="/">
              Return home
            </Link>
            <a className="btn btn--dark" href={`tel:${business.phone}`}>
              <PhoneIcon />
              {business.phoneDisplay}
            </a>
          </p>
          <nav aria-label="Site sections" style={{ marginTop: 34 }}>
            <ul style={{ display: "flex", flexWrap: "wrap", gap: 20, listStyle: "none" }}>
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
