import Image from "next/image";
import QuoteButton from "@/components/QuoteButton";
import { PhoneIcon } from "@/components/icons";
import { business } from "@/content/business";
import { ctaBand } from "@/content/pages";

export function CtaBand() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <Image
        className="section-background"
        src={ctaBand.background}
        alt=""
        fill
        sizes="100vw"
        aria-hidden
      />
      <div className="shell cta__inner">
        <div>
          <h2 id="cta-title">{ctaBand.title}</h2>
          <p>{ctaBand.body}</p>
        </div>
        <div className="cta__aside">
          <div className="cta__actions">
            <QuoteButton>Request a quote</QuoteButton>
            <a className="btn btn--ghost" href={`tel:${business.phone}`}>
              <PhoneIcon />
              Call {business.phoneDisplay}
            </a>
          </div>
          <p>{ctaBand.note}</p>
        </div>
      </div>
    </section>
  );
}
