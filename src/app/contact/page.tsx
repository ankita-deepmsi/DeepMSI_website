import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MapPin, Handshake, Clock, ShieldAlert } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { site } from "@/lib/site";

/**
 * Contact.
 *
 * Built in the editorial system, matching the rest of the interior pages. It
 * previously used PageHero and two rounded-3xl panels.
 *
 * ContactForm, InquiryComposer and FormField are untouched — they are their own
 * (older) system, shared with /partners, and moving them is a separate job from
 * restyling the page around them.
 */

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} — request a Deep MSI demo, ask about non-medical optics & illumination, or explore a partnership. Based in Ottawa, Canada.`,
};

const details: { icon: typeof Mail; term: string; value: React.ReactNode }[] = [
  {
    icon: Mail,
    term: "General",
    value: <a href={`mailto:${site.email}`}>{site.email}</a>,
  },
  {
    icon: Handshake,
    term: "Partnerships",
    value: <a href={`mailto:${site.partnersEmail}`}>{site.partnersEmail}</a>,
  },
  { icon: MapPin, term: "Location", value: site.location },
  {
    icon: Clock,
    term: "Response time",
    value: "Typically within 1–2 business days.",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* The same AI-generated file /partners uses, but a different window onto
          it, for two reasons.

          The first is regulatory. The supplied frame carries an outcome-claim
          list in its top-right corner — "Early Detection / Better Outcomes /
          Healthier Vision" at x 1470-1650, y 128-258 — set beside a retinal
          analysis readout. This site makes no performance claim anywhere and
          /evidence says so in as many words, so the crop starts below that band
          and the claims are gone from the asset rather than scrimmed over.
          (They are still in /eye_doctor_partners.png, which /partners ships
          whole. That is worth a second look.)

          The second is that two pages sharing one banner pixel-for-pixel reads
          as a copy-paste. This window is the handshake, the eye cross-section
          and its anatomy labels — which are descriptive, not claims — while
          /partners keeps the wide frame with the analysis panel.

          The window also starts past every label on the left of the source, so
          nothing is cut mid-word. 1132x590 is 1.92:1, the hero's own aspect
          from 1280px to 1920px, so at the commonest widths it crops no further.

          Versioned by NAME: Next's image optimizer caches on the URL, so
          editing a file in place keeps serving the old bytes. */}
      <section className="page-hero page-hero-photo is-copy-tight">
        <div className="page-hero-media">
          <Image
            src="/contact-hero.jpg"
            alt="Two people shaking hands in a clinical setting, with a cross-section diagram of an eye labelled macula, optic disc, retina and choroid"
            fill
            sizes="100vw"
            priority
          />
        </div>
        <div className="page-hero-scrim" aria-hidden="true" />
        <p className="page-hero-tag">AI-generated illustration</p>
        <div className="container-x">
          <p className="editorial-label">
            <span className="label-rule" /> Contact
          </p>
          <h1>A conversation is a good place to start.</h1>
          <p className="page-hero-lead">
            Tell us about your imaging needs, ask about a product, or explore a
            collaboration. Prepare your inquiry below and send it from your
            email app.
          </p>
        </div>
      </section>

      <section className="editorial-band section-space">
        <div className="container-x contact-grid">
          <ContactForm />

          <aside>
            <p className="editorial-label">
              <span className="label-rule" /> Reach us directly
            </p>
            <dl className="contact-list">
              {details.map(({ icon: Glyph, term, value }) => (
                <div key={term}>
                  <dt>
                    <Glyph aria-hidden="true" />
                    {term}
                  </dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      {/* Carried across verbatim from the previous rounded gold panel. */}
      {/* <section className="notice-strip">
        <div className="container-x">
          <ShieldAlert size={19} />
          <div>
            <strong>A note on privacy</strong>
            <p>
              Please don&apos;t share patient health information through this
              site. For medical emergencies, contact your local emergency
              services. Contact details are handled per our{" "}
              <a href="/legal/privacy">Privacy Policy</a>.
            </p>
          </div>
        </div> */}
      {/* </section> */}
    </>
  );
}
