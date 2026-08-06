"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import QuoteButton from "@/components/QuoteButton";
import { useDialog } from "@/components/useDialog";
import { ChevronDownIcon, PhoneIcon } from "@/components/icons";
import { business } from "@/content/business";
import { mainNav } from "@/content/navigation";

export default function Header() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const drawerId = useId();
  const submenuId = useId();
  const navGroupRef = useRef<HTMLDivElement>(null);
  const submenuToggleRef = useRef<HTMLButtonElement>(null);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const drawerRef = useDialog(drawerOpen, closeDrawer);

  useEffect(() => {
    if (!drawerOpen) {
      return;
    }

    const query = window.matchMedia("(min-width: 1025px)");
    const onChange = () => {
      if (query.matches) {
        setDrawerOpen(false);
      }
    };

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [drawerOpen]);

  useEffect(() => {
    if (!openGroup) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (
        navGroupRef.current &&
        event.target instanceof Node &&
        !navGroupRef.current.contains(event.target)
      ) {
        setOpenGroup(null);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenGroup(null);
        submenuToggleRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openGroup]);

  const isCurrent = (href: string) =>
    pathname === href || pathname === `${href}/`;

  return (
    <header className="header">
      <div className="header__utility">
        <div className="shell header__utility-inner">
          <p>
            <span>Adelaide &amp; South Australia</span>
            <span aria-hidden="true">·</span>
            <span>Residential &amp; commercial projects</span>
          </p>
          <div className="header__utility-links">
            <a href={`mailto:${business.email}`}>Email us</a>
            <span aria-hidden="true" />
            <a href={`tel:${business.phone}`}>{business.phoneDisplay}</a>
          </div>
        </div>
      </div>

      <div className="shell header__inner">
        <Link className="header__logo" href="/" aria-label={`${business.name} home`}>
          <Image
            src="/images/esg-logo-1.webp"
            alt={business.name}
            width={123}
            height={67}
          />
        </Link>

        <div className="header__spacer" />

        <nav className="nav" aria-label="Main">
          {mainNav.map((item) =>
            item.children ? (
              <div
                key={item.href}
                className="nav__group"
                ref={navGroupRef}
                onMouseLeave={() => setOpenGroup(null)}
              >
                <button
                  ref={submenuToggleRef}
                  className="nav__toggle"
                  type="button"
                  aria-expanded={openGroup === item.href}
                  aria-controls={submenuId}
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
                  id={submenuId}
                  className="nav__submenu"
                  data-open={openGroup === item.href}
                >
                  <Link
                    href={item.href}
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                    onClick={() => setOpenGroup(null)}
                  >
                    All {item.label}
                  </Link>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      aria-current={isCurrent(child.href) ? "page" : undefined}
                      onClick={() => setOpenGroup(null)}
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
          <QuoteButton>Start a project</QuoteButton>
        </div>

        {/* Phone is the primary lead channel for this business, so the mobile
            header keeps a tap-to-call button rather than burying the number
            behind the menu. */}
        <a
          className="header__call"
          href={`tel:${business.phone}`}
          aria-label={`Call ${business.phoneDisplay}`}
        >
          <PhoneIcon size={18} />
        </a>

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

      <div
        ref={drawerRef}
        id={drawerId}
        className="drawer"
        hidden={!drawerOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
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
          <QuoteButton onBeforeOpen={closeDrawer}>Start a project</QuoteButton>
        </div>
      </div>
    </header>
  );
}
