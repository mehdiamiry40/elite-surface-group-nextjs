import Image from "next/image";
import QuoteButton from "@/components/QuoteButton";
import { PhoneIcon } from "@/components/icons";
import { ctaBand } from "@/content/pages";
import { business } from "@/content/business";
import { blurProps } from "@/lib/lcp-blur";

export function CtaBand() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="shell cta__inner">
        <div className="cta__media">
          <Image
            src={ctaBand.background}
            alt=""
            width={1600}
            height={1067}
            sizes="(max-width: 767px) 100vw, 260px"
            loading="lazy"
            {...blurProps(ctaBand.background)}
          />
        </div>
        <div>
          <h2 id="cta-title">{ctaBand.title}</h2>
          <p>{ctaBand.body}</p>
          <div className="cta__actions">
            <QuoteButton>Request a quote</QuoteButton>
            <a className="btn btn--ghost" href={`tel:${business.phone}`}>
              <PhoneIcon />
              Call {business.phoneDisplay}
            </a>
          </div>
          <p className="cta__note">{ctaBand.note}</p>
        </div>
      </div>
    </section>
  );
}
