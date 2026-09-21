import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ShieldAlert } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { FindingGallery } from "@/components/solutions/FindingGallery";
import { CtaBand } from "@/components/sections/CtaBand";
import { solutions } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Four retinal findings, each shown with a capture of that finding from the
 * internal case series.
 *
 * The page is organised around what the instrument records rather than around
 * diagnoses it makes. That is the honest framing — nothing here has been
 * through clinical validation — and it is also the more useful one, because
 * drusen, atrophy, neovascularisation and a nevus are what a reader is
 * actually looking at, whatever the diagnosis eventually is.
 *
 * Every image is a real MSI-120 capture from the case deck, cropped as the
 * deck crops it and carrying the deck's own annotation arrows. The comparison
 * frames in that deck (Heidelberg FAF, colour fundus, Optos) are deliberately
 * not published: they carry third-party device branding, burned-in acquisition
 * dates and, on two of them, patient identifiers. Every frame here was checked
 * edge by edge at full resolution before it was written to /public.
 *
 * Built in the editorial system, matching /platform and /products.
 */

export const metadata: Metadata = {
  title: "Clinical solutions",
  description:
    "Drusen, geographic atrophy, choroidal neovascularisation and choroidal nevus, recorded across the spectrum by the MSI-120 — what the AI-Spectral platform is pointed at, and why measuring change matters more than recognising a finding once.",
};

export default function SolutionsPage() {
  return (
    <>
      {/* Banner: the same eye at 580, 760 and 940 nm, composed from the three
          real MSI-120 captures the wavelength explorer already uses. Nothing
          illustrated and nothing synthesised, so there is no AI badge and no
          claim to strip — the panels are what the instrument records, which is
          also this page's argument: one retina, three depths.

          Each panel is zoomed 1.18x past the source frames' own bevelled black
          corners, so the collage reads as three windows rather than three
          photographs of photographs. */}
      <section className="page-hero page-hero-photo">
        <div className="page-hero-media">
          <Image
            src="/solutions-collage.jpg"
            alt="The same retina captured at three wavelengths — 580, 760 and 940 nanometres — shown side by side"
            fill
            sizes="100vw"
            priority
          />
        </div>
        <div className="page-hero-scrim" aria-hidden="true" />
        <div className="container-x">
          <p className="editorial-label">
            <span className="label-rule" /> Clinical solutions
          </p>
          <h1>
            What the retina
            <br />
            hides, measured.
          </h1>
          <p className="page-hero-lead">
            The platform exists to answer practical questions: is this patient
            changing, are they changing faster than last year, and does that change
            warrant action.
          </p>
        </div>
      </section>

      {/* Sign-off text. The page shows real captures of real findings, and the
          distance between "here is a lesion" and "here is a validated device
          that detects that lesion" is the whole regulatory question. */}
      <section className="notice-strip">
        <div className="container-x">
          <ShieldAlert size={19} />
          <div>
            <strong>Disclaimer</strong>
            <p>
              The captures below are de-identified images from an internal case
              series. They are
              not claims of diagnostic performance, and they are not a
              statement of sensitivity, specificity or intended use.
               {/* Indications
              and validated performance are established through clinical study
              and regulatory review — see{" "}
              <Link href="/evidence">Evidence &amp; regulatory</Link>. */}
            </p>
          </div>
        </div>
      </section>

      {solutions.map((finding, idx) => (
        <section
          key={finding.id}
          id={finding.id}
          className={cn("finding-band scroll-mt-28", idx % 2 && "is-alt")}
          style={{ "--layer": finding.accent } as React.CSSProperties}
        >
          <div className="container-x finding-grid">
            <div>
              <p className="finding-n">
                {String(idx + 1).padStart(2, "0")}
              </p>
              <p className="editorial-label">
                <span className="label-rule" /> {finding.eyebrow}
              </p>
              <h2>{finding.title}</h2>

              <p className="finding-heading">What it is</p>
              <p className="finding-body">{finding.problem}</p>

              <p className="finding-heading">What the platform is pointed at</p>
              <p className="finding-body">{finding.approach}</p>

              <ul className="finding-points">
                {finding.points.map((point, n) => (
                  <li key={point}>
                    <span>{String(n + 1).padStart(2, "0")}</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Reveal direction="left">
              <FindingGallery frames={finding.frames} />
            </Reveal>
          </div>
        </section>
      ))}

      <section className="finding-close">
        <div className="container-x">
          <p className="editorial-label">
            <span className="label-rule" /> Baseline
          </p>
          <h2>Measurement, not impression.</h2>
          <p>
            Every one of these depends on the same thing: turning a retinal
            image into something that can be compared against the same
            patient year after year. A finding
            recognised once is a note in a file. A finding measured twice is a
            rate of change.
          </p>
          <Link className="editorial-text-link" href="/platform">
            How the platform produces that <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      <CtaBand
        title="Which of these are you looking for?"
        description="Tell us about your patient population, screening volume or study design, and we'll talk through where the platform fits."
        primary={{ label: "Start a conversation", href: "/contact" }}
        secondary={{ label: "Inside the platform", href: "/platform" }}
      />
    </>
  );
}
