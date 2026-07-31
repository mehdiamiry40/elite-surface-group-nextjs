import Image from "next/image";
import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
} from "@/components/icons";
import { business } from "@/content/business";
import { footerBlurb, footerNav } from "@/content/navigation";

const socialLinks = [
  {
    href: business.social.facebook,
    label: `${business.name} on Facebook`,
    Icon: FacebookIcon,
  },
  {
    href: business.social.instagram,
    label: `${business.name} on Instagram`,
    Icon: InstagramIcon,
  },
].filter((link) => Boolean(link.href));

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
            {socialLinks.length ? (
              <div className="footer__social">
                {socialLinks.map(({ href, label, Icon }) => (
                  <a
                    key={href}
                    href={href}
                    aria-label={label}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <nav aria-labelledby="footer-quick-links">
            <h2 id="footer-quick-links">Quick Links</h2>
            <ul className="footer__links">
              {footerNav.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} prefetch={false}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-services">
            <h2 id="footer-services">Services</h2>
            <ul className="footer__links">
              {footerNav.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} prefetch={false}>
                    {link.label}
                  </Link>
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
            <p className="footer__hours">
              <strong>Hours:</strong> {business.openingHoursDisplay}
            </p>
          </div>
        </div>

        <div className="footer__bar">
          <p>
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          <ul>
            {footerNav.legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} prefetch={false}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
