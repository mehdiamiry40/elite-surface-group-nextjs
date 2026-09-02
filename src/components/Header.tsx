"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type SyntheticEvent,
} from "react";
import QuoteButton from "@/components/QuoteButton";
import { ArrowRightIcon, PhoneIcon } from "@/components/icons";
import { business } from "@/content/business";
import { mainNav, type NavItem } from "@/content/navigation";

const desktopNav = mainNav.filter((item) => item.label !== "About");

function normalisePath(path: string) {
  return path === "/" ? path : path.replace(/\/+$/, "");
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuDisclosureRef = useRef<HTMLDetailsElement>(null);
  const menuButtonRef = useRef<HTMLElement>(null);

  const closeMenu = useCallback(() => {
    if (menuDisclosureRef.current) {
      menuDisclosureRef.current.open = false;
    }
    setMenuOpen(false);
  }, []);

  const onMenuToggle = useCallback(
    (event: SyntheticEvent<HTMLDetailsElement>) => {
      setMenuOpen(event.currentTarget.open);
    },
    [],
  );

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

  const isExactCurrent = (href: string) =>
    normalisePath(pathname) === normalisePath(href);

  const isWithin = (href: string) =>
    isExactCurrent(href) ||
    normalisePath(pathname).startsWith(`${normalisePath(href)}/`);

  const isItemCurrent = (item: NavItem) =>
    isWithin(item.href) ||
    item.children?.some((child) => isWithin(child.href)) === true;

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
            aria-current={isExactCurrent("/about") ? "page" : undefined}
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
            prefetch={false}
            aria-label={`${business.name} home`}
            onClick={closeMenu}
          >
            {/* Static WebP at display size. Do not set priority/eager — that
                preloads the logo and races the page LCP photograph. */}
            <Image
              src="/images/esg-logo-1.webp"
              alt=""
              width={123}
              height={67}
              sizes="108px"
              unoptimized
            />
          </Link>

          <nav className="site-header__desktop-nav" aria-label="Main navigation">
            {desktopNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isExactCurrent(item.href) ? "page" : undefined}
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
            <details
              ref={menuDisclosureRef}
              className="site-header__mobile-disclosure"
              onToggle={onMenuToggle}
            >
              <summary
                ref={menuButtonRef}
                className="site-header__menu-button"
                aria-controls="mobile-navigation"
                aria-label="Navigation menu"
              >
                <span className="site-header__menu-icon" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
                <span className="visually-hidden">Navigation menu</span>
              </summary>

              <div
                id="mobile-navigation"
                className="site-header__mobile-panel"
              >
                <nav
                  className="shell site-header__mobile-nav"
                  aria-label="Mobile navigation"
                >
                  {mainNav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={
                        isExactCurrent(item.href) ? "page" : undefined
                      }
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
                    restoreFocusTo={() => menuButtonRef.current}
                  >
                    Start a project
                  </QuoteButton>
                </nav>
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}
