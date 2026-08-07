"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import QuoteButton from "@/components/QuoteButton";
import { ArrowRightIcon, PhoneIcon } from "@/components/icons";
import { business } from "@/content/business";
import { mainNav, type NavItem } from "@/content/navigation";

const desktopNav = mainNav.filter((item) => item.label !== "About");

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = () => {
      if (desktop.matches) {
        closeMenu();
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        menuButtonRef.current?.focus();
      }
    };

    desktop.addEventListener("change", onDesktop);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      desktop.removeEventListener("change", onDesktop);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [closeMenu, menuOpen]);

  const isCurrent = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const isItemCurrent = (item: NavItem) =>
    isCurrent(item.href) ||
    item.children?.some((child) => isCurrent(child.href)) === true;

  return (
    <header
      className="site-header"
      data-raised={scrolled || menuOpen ? "true" : "false"}
    >
      <div className="site-header__utility">
        <div className="shell site-header__utility-inner">
          <span>{business.area}</span>
          <span className="site-header__utility-divider" aria-hidden="true">
            |
          </span>
          <Link
            href="/about/"
            aria-current={isCurrent("/about") ? "page" : undefined}
          >
            About
          </Link>
          <a href={`mailto:${business.email}`}>Email us</a>
          <a
            className="site-header__utility-phone"
            href={`tel:${business.phone}`}
          >
            <PhoneIcon size={14} />
            {business.phoneDisplay}
          </a>
        </div>
      </div>

      <div className="site-header__main">
        <div className="shell site-header__main-inner">
          <Link
            className="site-header__logo"
            href="/"
            aria-label={`${business.name} home`}
            onClick={closeMenu}
          >
            <Image
              src="/images/esg-logo.svg"
              alt=""
              width={123}
              height={67}
              priority
            />
          </Link>

          <nav className="site-header__desktop-nav" aria-label="Main navigation">
            {desktopNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrent(item.href) ? "page" : undefined}
                data-current={isItemCurrent(item) ? "true" : "false"}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="site-header__actions">
            <QuoteButton className="site-header__quote">
              Start a project
              <ArrowRightIcon size={16} />
            </QuoteButton>
            <button
              ref={menuButtonRef}
              className="site-header__menu-button"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className="site-header__mobile-panel"
        hidden={!menuOpen}
      >
        <nav
          className="shell site-header__mobile-nav"
          aria-label="Mobile navigation"
        >
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(item.href) ? "page" : undefined}
              onClick={closeMenu}
            >
              <span>{item.label}</span>
              <ArrowRightIcon size={20} />
            </Link>
          ))}

          <a
            className="site-header__mobile-call"
            href={`tel:${business.phone}`}
          >
            <PhoneIcon size={16} />
            Call {business.phoneDisplay}
          </a>
          <QuoteButton
            className="site-header__mobile-quote"
            onBeforeOpen={closeMenu}
          >
            Start a project
          </QuoteButton>
        </nav>
      </div>
    </header>
  );
}
