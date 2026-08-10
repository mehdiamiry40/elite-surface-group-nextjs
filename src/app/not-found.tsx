import type { Metadata } from "next";
import Link from "next/link";
import { PhoneIcon } from "@/components/icons";
import { business } from "@/content/business";
import { mainNav } from "@/content/navigation";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The page you’re looking for may have moved. Explore Elite Surface Group services or contact our Adelaide team for help.",
};

export default function NotFound() {
  return (
    <section className="section">
      <div className="shell notfound">
        <div>
          <p className="eyebrow">Error 404</p>
          <h1>Page not found</h1>
          <p>
            The page you’re looking for may have moved or no longer exists.
            Explore one of the sections below, or call us and we’ll point you
            in the right direction.
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
