import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { PartnerForm } from "@/components/forms/PartnerForm";
import { site } from "@/lib/site";

/**
 * The audience door for distributors, OEMs and research collaborators.
 *
 * Built in the editorial system, matching /platform, /products, /solutions,
 * /providers and /patients: flat grounds, hairline rules, mono numerals, no
 * rounded cards.
 *
 * The application form itself is untouched. PartnerForm, FormField and
 * InquiryComposer are their own (older) system, shared with /contact, and
 * moving them is a separate job from restyling the page around them.
 */

export const metadata: Metadata = {
  title: "Become a Partner",
  description: `Partner with ${site.name} — as a commercial distributor, reseller or OEM, or as a clinical & research collaborator advancing multispectral retinal imaging.`,
};

const tracks = [
  {
    n: "01",
    icon: "Handshake",
    tag: "Commercial",
    title: "Distributors, resellers & OEMs",
    body: "Bring multispectral imaging and precision optics to your market.",
    benefits: [
      "Territory options & commercial terms",
      "Demonstration units & sales training",
      "Co-marketing materials & campaign support",
      "Regulatory & onboarding support",
      "Priority technical support",
      "OEM & technology-integration paths",
    ],
  },
  {
    n: "02",
    icon: "FlaskConical",
    tag: "Clinical & Research",
    title: "Researchers, clinics & academia",
    body: "Collaborate on the science of spectral imaging and DeepMSI AI.",
    benefits: [
      // Instrument is the MSI-120; the model is DeepMSI AI (not "Deep MSI").
      "Early access to the MSI-120",
      "Spectral Capture SDK & data tools",
      "Multispectral datasets for research",
      "Protocol & study-design support",
      "Co-authorship & publication opportunities",
      "Direct engineering collaboration",
    ],
  },
];

export default function PartnersPage() {
  return (
    <>
      {/* The banner is AI-generated and says so on its face. Unlike the file
          supplied for /patients this one carries no quantitative performance
          figure and no specification claim, so it ships whole. The handshake
          sits at the vertical centre of the frame, which is where a cover crop
          keeps it at every width, so no object-position override is needed. */}
      <section className="page-hero page-hero-photo">
        <div className="page-hero-media">
          <Image
            src="/eye_doctor_partners.png"
            alt="Two people shaking hands in a clinical setting, overlaid with multispectral retinal imaging and analysis graphics"
            fill
            sizes="100vw"
            priority
          />
        </div>
        <div className="page-hero-scrim" aria-hidden="true" />
        <p className="page-hero-tag">AI-generated illustration</p>
        <div className="container-x">
          <p className="editorial-label">
            <span className="label-rule" /> Partners
          </p>
          <h1>Build the spectral future with us.</h1>
          <p className="page-hero-lead">
            Whether you sell, integrate, or research — we partner with
            organizations that want to bring more wavelengths and better insight
            to eye care and optics.
          </p>
          <div className="page-hero-actions">
            <Link className="editorial-button" href="#apply">
              Start a conversation <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Two tracks */}
      <section className="editorial-band section-space">
        <div className="container-x">
          <div className="section-title-row">
            <div>
              <p className="editorial-label">
                <span className="label-rule" /> Two ways in
              </p>
              <h2>How we work with partners.</h2>
            </div>
          </div>
          <div className="instrument-grid instrument-grid-2">
            {tracks.map((track) => (
              <div className="instrument-card is-static" key={track.tag}>
                <span className="instrument-icon">
                  <Icon name={track.icon} />
                </span>
                <p className="editorial-label">
                  <span className="label-rule" /> {track.tag}
                </p>
                <h3>{track.title}</h3>
                <p className="instrument-description">{track.body}</p>
                <ul className="finding-points">
                  {track.benefits.map((benefit, i) => (
                    <li key={benefit}>
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application */}
      <section id="apply" className="editorial-band-alt section-space">
        <div className="container-x apply-grid">
          <div>
            <p className="editorial-label">
              <span className="label-rule" /> Apply
            </p>
            <h2 className="band-h2">Start a conversation.</h2>
            <p className="band-lead">
              Tell us a little about your organization and how you&apos;d like
              to work together.
            </p>
            {/* <p className="band-body">
              Our partnerships team reviews every application personally.
            </p> */}
          </div>
          {/* Vertical reveal, not direction="left": that starts the element
              translated 28px to the right, and on mobile the form is full
              width, so it sits 8px past the viewport and creates a horizontal
              scrollbar until it animates in. */}
          <Reveal>
            <PartnerForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
