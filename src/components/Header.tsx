"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import QuoteButton from "@/components/QuoteButton";
import { useDialog } from "@/components/useDialog";
import {
  ArrowRightIcon,
  ChevronDownIcon,
  PhoneIcon,
} from "@/components/icons";
import { business } from "@/content/business";
import {
  mainNav,
  primaryNav,
  utilityNav,
  type NavItem,
} from "@/content/navigation";

export default function Header() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const drawerId = useId();
  const submenuId = useId();
  const navGroupRef = useRef<HTMLDivElement>(null);
  const submenuToggleRef = useRef<HTMLButtonElement>(null);
  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    setOpenGroup(null);
  }, []);
  const drawerRef = useDialog(drawerOpen, closeDrawer);

  useEffect(() => {
    if (!drawerOpen) {
      return;
    }

    const query = window.matchMedia("(min-width: 1025px)");
    const onChange = () => {
      if (query.matches) {
        closeDrawer();
      }
    };

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [closeDrawer, drawerOpen]);

  useEffect(() => {
    if (!openGroup || drawerOpen) {
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
  }, [drawerOpen, openGroup]);

  const isCurrent = (href: string) =>
    pathname === href || pathname === `${href}/`;

  const isItemCurrent = (item: NavItem) =>
    isCurrent(item.href) ||
    item.children?.some((child) => isCurrent(child.href)) === true;

  return (
    <header className="header">
      <div className="header__utility">
        <div className="shell header__utility-inner">
          <nav className="header__utility-links" aria-label="Secondary">
            {utilityNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrent(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            <span aria-hidden="true" />
            <a href={`mailto:${business.email}`}>Email us</a>
          </nav>
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

        <nav className="nav" aria-label="Main">
          {primaryNav.map((item) =>
            item.children ? (
              <div
                key={item.href}
                className="nav__group"
                ref={navGroupRef}
                onMouseEnter={() => setOpenGroup(item.href)}
                onMouseLeave={() => setOpenGroup(null)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    setOpenGroup(null);
                  }
                }}
              >
                <button
                  ref={submenuToggleRef}
                  className="nav__toggle"
                  type="button"
                  aria-expanded={openGroup === item.href}
                  aria-controls={submenuId}
                  data-current={isItemCurrent(item)}
                  onFocus={() => setOpenGroup(item.href)}
                  onClick={() => setOpenGroup(item.href)}
                >
                  {item.label}
                  <ChevronDownIcon className="nav__chevron" />
                </button>
                <div
                  id={submenuId}
                  className="nav__submenu"
                  data-open={openGroup === item.href}
                >
                  <div className="shell nav__submenu-inner">
                    <Link
                      className="nav__submenu-overview"
                      href={item.href}
                      aria-current={isCurrent(item.href) ? "page" : undefined}
                      onClick={() => setOpenGroup(null)}
                    >
                      <span className="nav__submenu-kicker">Services</span>
                      <span className="nav__submenu-title">
                        Every surface, one experienced team.
                      </span>
                      <span className="nav__submenu-copy">
                        Explore cladding, render, Hebel and walling systems for
                        residential and commercial projects across Adelaide.
                      </span>
                      <span className="nav__submenu-overview-link">
                        View all services
                        <ArrowRightIcon />
                      </span>
                    </Link>

                    <ul className="nav__service-grid">
                      {item.children.map((child, index) => (
                        <li key={child.href}>
                          <Link
                            className="nav__service-link"
                            href={child.href}
                            aria-current={
                              isCurrent(child.href) ? "page" : undefined
                            }
                            onClick={() => setOpenGroup(null)}
                          >
                            <span
                              className="nav__service-index"
                              aria-hidden="true"
                            >
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="nav__service-copy">
                              <strong>{child.label}</strong>
                              <span>{child.description}</span>
                            </span>
                            <ArrowRightIcon className="nav__service-arrow" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
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
        <div className="drawer__head">
          <Link
            className="drawer__logo"
            href="/"
            aria-label={`${business.name} home`}
            onClick={closeDrawer}
          >
            <Image
              src="/images/esg-logo-1.webp"
              alt={business.name}
              width={123}
              height={67}
            />
          </Link>
          <button
            className="drawer__close"
            type="button"
            aria-label="Close menu"
            onClick={closeDrawer}
          >
            ×
          </button>
        </div>

        <div className="drawer__body">
          <nav aria-label="Mobile">
            {mainNav.map((item) => (
              <div className="drawer__item" key={item.href}>
                {item.children ? (
                  <>
                    <button
                      className="drawer__toggle"
                      type="button"
                      aria-expanded={openGroup === item.href}
                      aria-controls={`${drawerId}-${item.label}`}
                      data-current={isItemCurrent(item)}
                      onClick={() =>
                        setOpenGroup((current) =>
                          current === item.href ? null : item.href,
                        )
                      }
                    >
                      {item.label}
                      <ChevronDownIcon />
                    </button>
                    <div
                      id={`${drawerId}-${item.label}`}
                      className="drawer__sub"
                      hidden={openGroup !== item.href}
                    >
                      <Link href={item.href} onClick={closeDrawer}>
                        View all {item.label.toLowerCase()}
                      </Link>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          aria-current={
                            isCurrent(child.href) ? "page" : undefined
                          }
                          onClick={closeDrawer}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                    onClick={closeDrawer}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="drawer__cta">
            <a className="btn btn--outline" href={`tel:${business.phone}`}>
              <PhoneIcon />
              {business.phoneDisplay}
            </a>
            <QuoteButton onBeforeOpen={closeDrawer}>Start a project</QuoteButton>
          </div>

          <div className="drawer__meta">
            <span>{business.area}</span>
            <a href={`mailto:${business.email}`}>{business.email}</a>
          </div>
        </div>
      </div>
    </header>
  );
}
