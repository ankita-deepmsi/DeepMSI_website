import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { Icon } from "@/components/ui/Icon";
import { solutions, site, platformLayers } from "@/lib/site";

/**
 * The audience door for eye-care professionals.
 *
 * Built in the editorial system, matching /platform, /products and /solutions:
 * flat grounds, hairline rules, mono numerals, no rounded cards. It previously
 * used PageHero / SectionHeading / Reveal-wrapped rounded cards, which is the
 * older generation the interior pages are being moved off.
 *
 * Colour is carried, not decorative. The finding cards take their accent from
 * `solutions`, the same source /solutions reads, so a clinician who follows one
 * through meets the same colour on the other side; and each clinic step takes
 * the colour of the platform layer that performs it, so /providers and
 * /platform describe the same four things in the same four colours.
 */

/** The clinic-day step keyed to the platform layer that performs it. */
const layerColor = (key: string) =>
  platformLayers.find((l) => l.key === key)!.color;

export const metadata: Metadata = {
  title: "For Providers",
  description:
    "For eye-care professionals: what the AI-Spectral platform captures, what it measures, how a multispectral capture fits a clinic day, and where the evidence currently stands.",
};

const workflow = [
  {
    n: "01",
    layer: "capture",
    title: "Capture",
    body: "A single seated acquisition at the imaging head, comparable in patient experience to a familiar fundus exam. Capture quality is scored automatically at acquisition, so a poor study is caught while the patient is still in the chair.",
  },
  {
    n: "02",
    layer: "ai",
    title: "Analysis",
    body: "The spectral stack is registered and quality-checked, then biomarkers are localised and quantified across bands — producing numbers rather than adjectives.",
  },
  {
    n: "03",
    layer: "viewer",
    title: "Review",
    body: "You review band by band in the DeepMSI Viewer, compare against the patient's own baseline, annotate, and adjust anything the model proposed.",
  },
  {
    n: "04",
    layer: "cloud",
    title: "Report",
    body: "A structured report is assembled with an audit trail for every AI suggestion, ready for the record and for onward referral.",
  },
];

const questions = [
  {
    q: "Does it replace colour fundus photography or OCT?",
    a: "No. Multispectral capture is an additional record of the same view. It is designed to sit alongside the imaging you already perform.",
  },
  {
    q: "Does the AI make the diagnosis?",
    a: "No. Every output is decision support presented for your review with an audit trail for each suggestion. The clinician remains responsible for every decision.",
  },
  {
    q: "Is it cleared for clinical use?",
    a: "The platform is investigational and progressing toward regulatory review. ",
  },
  {
    q: "What does it add to my workflow?",
    a: "A quantified, repeatable measurement that can be compared against the same patient's earlier studies.",
  },
];

export default function ProvidersPage() {
  return (
    <>
      {/* The photograph is AI-generated and says so on its face. The source file
          carries a watermark along its bottom edge, but a hero crops a 3:2
          photograph hard and cuts that edge away at every width, so the
          disclosure is drawn here rather than left to the file. The crop is
          pulled up to 30%: a centre crop takes the clinician's head off. */}
      <section className="page-hero page-hero-photo">
        <div className="page-hero-media">
          <Image
            src="/eye_doctor_provider.png"
            alt="An eye-care professional examining a patient at a slit lamp, with retinal images on the display beside them"
            fill
            sizes="100vw"
            priority
            style={{ objectPosition: "center 30%" }}
          />
        </div>
        <div className="page-hero-scrim" aria-hidden="true" />
        <p className="page-hero-tag">AI-generated illustration</p>
        <div className="container-x">
          <p className="editorial-label">
            <span className="label-rule" /> For providers
          </p>
          <h1>
            Built around how a
            <br />
            clinic actually runs.
          </h1>
          <p className="page-hero-lead">
            What {site.shortName} captures and what it measures. Designed for eye-care professionals.
          </p>
          <div className="page-hero-actions">
            <Link className="editorial-button" href="/contact">
              Request a demonstration <ArrowUpRight size={18} />
            </Link>
            <Link
              className="editorial-button editorial-button-ghost"
              href="/platform"
            >
              Inside the platform <ArrowUpRight size={18} />
            </Link>
            {/* <Link className="editorial-text-link" href="/evidence">
              Evidence &amp; regulatory <ArrowUpRight size={17} />
            </Link> */}
          </div>
        </div>
      </section>

      {/* <section className="notice-strip">
        <div className="container-x">
          <ShieldAlert size={19} />
          <div>
            <strong>Investigational</strong>
            <p>
              The platform is investigational and is not cleared for clinical
              use in all regions. Nothing on this page constitutes clinical
              guidance, and no diagnostic performance is claimed. See{" "}
              <Link href="/evidence">Evidence &amp; regulatory</Link> for the
              status of each component.
            </p>
          </div>
        </div>
      </section> */}

      {/* Clinic workflow */}
      <section className="editorial-band section-space">
        <div className="container-x">
          <div className="section-title-row">
            <div>
              <p className="editorial-label">
                <span className="label-rule" /> In the clinic
              </p>
              <h2>Four steps, one sitting.</h2>
            </div>
          </div>
          <div className="step-grid">
            {workflow.map((step) => (
              <div
                className="step-card"
                key={step.n}
                style={
                  { "--layer": layerColor(step.layer) } as React.CSSProperties
                }
              >
                <p className="step-n">{step.n}</p>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
          <div className="step-rule" aria-hidden="true" />
        </div>
      </section>

      {/* By presentation */}
      <section className="editorial-band-alt section-space">
        <div className="container-x">
          <div className="section-title-row">
            <div>
              <p className="editorial-label">
                <span className="label-rule" /> By presentation
              </p>
              <h2>Where clinicians are looking first.</h2>
            </div>
            <Link href="/solutions" className="editorial-text-link">
              All solutions <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="instrument-grid instrument-grid-2">
            {solutions.map((finding) => (
              <Link
                key={finding.id}
                href={`/solutions#${finding.id}`}
                className="instrument-card is-accented"
                style={{ "--layer": finding.accent } as React.CSSProperties}
              >
                <span className="instrument-icon">
                  <Icon name={finding.icon} />
                  <ArrowUpRight />
                </span>
                <p className="editorial-label">
                  <span className="label-rule" /> {finding.eyebrow}
                </p>
                <h3>{finding.title}</h3>
                <p className="instrument-description">{finding.approach}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Straight answers */}
      <section className="editorial-band section-space">
        <div className="container-x">
          <div className="section-title-row">
            <div>
              <p className="editorial-label">
                <span className="label-rule" /> Straight answers
              </p>
              <h2>Frequently asked questions</h2>
            </div>
          </div>
          <Reveal>
            <div className="qa-list">
              {questions.map((item, i) => (
                <div className="qa-row" key={item.q}>
                  <p className="qa-n">{String(i + 1).padStart(2, "0")}</p>
                  <div>
                    <h3>{item.q}</h3>
                    <p>{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="For providers"
        title="Want to see it on your own patients?"
        description="We run demonstrations and evaluations with clinics and research sites. Tell us about your practice and patient population."
        primary={{ label: "Request a demonstration", href: "/contact" }}
        secondary={{ label: "Research collaboration", href: "/partners" }}
      />
    </>
  );
}
