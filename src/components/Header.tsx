"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import QuoteButton from "@/components/QuoteButton";
import { ChevronDownIcon, PhoneIcon } from "@/components/icons";
import { business, mainNav } from "@/content/site";

export default function Header() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const drawerId = useId();

  useEffect(() => {
    if (!drawerOpen) {
      return;
    }

    document.body.classList.add("is-locked");

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDrawerOpen(false);
      }
    };
    const query = window.matchMedia("(min-width: 1025px)");
    const onChange = () => {
      if (query.matches) {
        setDrawerOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    query.addEventListener("change", onChange);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      query.removeEventListener("change", onChange);
      document.body.classList.remove("is-locked");
    };
  }, [drawerOpen]);

  const isCurrent = (href: string) =>
    pathname === href || pathname === `${href}/`;

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <header className="header">
      <div className="shell header__inner">
        <Link className="header__logo" href="/" aria-label={`${business.name} home`}>
          <Image
            src="/images/esg-logo-1.webp"
            alt={business.name}
            width={123}
            height={67}
            priority
          />
        </Link>

        <div className="header__spacer" />

        <nav className="nav" aria-label="Main">
          {mainNav.map((item) =>
            item.children ? (
              <div
                key={item.href}
                className="nav__group"
                onMouseLeave={() => setOpenGroup(null)}
              >
                <button
                  className="nav__toggle"
                  type="button"
                  aria-expanded={openGroup === item.href}
                  onClick={() =>
                    setOpenGroup((current) =>
                      current === item.href ? null : item.href,
                    )
                  }
                >
                  {item.label}
                  <ChevronDownIcon className="nav__chevron" />
                </button>
                <div
                  className="nav__submenu"
                  data-open={openGroup === item.href}
                >
                  <Link
                    href={item.href}
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                  >
                    All {item.label}
                  </Link>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      aria-current={isCurrent(child.href) ? "page" : undefined}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                className="nav__link"
                href={item.href}
                aria-current={isCurrent(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="header__actions">
          <a className="header__phone" href={`tel:${business.phone}`}>
            <PhoneIcon />
            {business.phoneDisplay}
          </a>
          <QuoteButton />
        </div>

        <button
          className="burger"
          type="button"
          aria-expanded={drawerOpen}
          aria-controls={drawerId}
          aria-label={drawerOpen ? "Close menu" : "Open menu"}
          onClick={() => setDrawerOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        className="drawer__scrim"
        hidden={!drawerOpen}
        role="presentation"
        onClick={() => setDrawerOpen(false)}
      />

      <div id={drawerId} className="drawer" hidden={!drawerOpen}>
        <button
          className="drawer__close"
          type="button"
          aria-label="Close menu"
          onClick={() => setDrawerOpen(false)}
        >
          ×
        </button>

        <nav aria-label="Mobile">
          {mainNav.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                aria-current={isCurrent(item.href) ? "page" : undefined}
                onClick={closeDrawer}
              >
                {item.label}
              </Link>
              {item.children ? (
                <div className="drawer__sub">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      aria-current={isCurrent(child.href) ? "page" : undefined}
                      onClick={closeDrawer}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="drawer__cta">
          <a className="btn btn--dark" href={`tel:${business.phone}`}>
            <PhoneIcon />
            {business.phoneDisplay}
          </a>
          <QuoteButton />
        </div>
      </div>
    </header>
  );
}
