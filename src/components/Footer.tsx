import Image from "next/image";
import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
} from "@/components/icons";
import { business, footerBlurb, footerNav } from "@/content/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__grid">
          <div>
            <div className="footer__logo">
              <Image
                src="/images/footer-logo.webp"
                alt={business.name}
                width={123}
                height={67}
              />
            </div>
            <p>{footerBlurb}</p>
            <div className="footer__social">
              <a
                href={business.social.facebook}
                aria-label={`${business.name} on Facebook`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <FacebookIcon />
              </a>
              <a
                href={business.social.instagram}
                aria-label={`${business.name} on Instagram`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          <nav aria-labelledby="footer-quick-links">
            <h2 id="footer-quick-links">Quick Links</h2>
            <ul className="footer__links">
              {footerNav.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-services">
            <h2 id="footer-services">Services</h2>
            <ul className="footer__links">
              {footerNav.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 id="footer-contact">Contact Us</h2>
            <ul className="footer__contact" aria-labelledby="footer-contact">
              <li>
                <PhoneIcon />
                <a href={`tel:${business.phone}`}>{business.phoneDisplay}</a>
              </li>
              <li>
                <MailIcon />
                <a href={`mailto:${business.email}`}>{business.email}</a>
              </li>
              <li>
                <PinIcon />
                <span>{business.area}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bar">
          <p>
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          <ul>
            {footerNav.legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
