import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ShieldAlert } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/site";
import { WAVELENGTHS } from "@/lib/wavelengths";

/**
 * The audience door for patients.
 *
 * Built in the editorial system, matching /platform, /products, /solutions and
 * /providers. The page used to be two long runs of `prose-spectral` between
 * rounded cards; every block is now a structure a worried reader can scan —
 * numbered steps, a labelled grid, hairline rows — with prose kept only where
 * the page is explaining rather than listing.
 *
 * Nothing on this page asks the reader to contact us, and there is no CTA band
 * at the foot: the one action it points to is talking to their own eye-care
 * professional, and the closing panel says not to send us health information.
 */

export const metadata: Metadata = {
  title: "For Patients",
  description:
    "A plain-language explanation of multispectral retinal imaging: what the scan is, what to expect if your eye-care professional offers one, and what it does and does not do.",
};

/* The four paragraphs of the old prose explainer, as the
   four steps of the argument they always were. Each takes its accent from a
   real band in WAVELENGTHS, stepping short-to-long — so the colour runs
   shallow to deep exactly as the explanation does, and the two cannot drift
   because the hues come from the same array the wavelength readouts use. */
const light = [
  {
    n: "01",
    band: 0,
    title: "Your retina has layers",
    body: "The back of your eye is called the retina. It is made of several thin layers stacked on top of one another, with a layer of blood vessels beneath them.",
  },
  {
    n: "02",
    band: 3,
    title: "An ordinary photo shows the surface",
    body: "An ordinary retinal photograph uses white light and records one picture.",
  },
  {
    n: "03",
    band: 6,
    title: "Different colours reach different depths",
    body: "Blue light stops near the surface. Red light goes deeper. Infrared light goes deeper still.",
  },
  {
    n: "04",
    band: 9,
    title: "One picture per colour",
    body: "Multispectral imaging takes a series of pictures, each using a different colour of light. Instead of one picture of the surface, your eye-care professional gets a set of pictures showing different depths.",
  },
];

const expect = [
  {
    icon: "Camera",
    title: "All you do is sit",
    body: "The scan is taken while you sit at an imaging head. You rest your chin and forehead and look where the operator asks you to look.",
  },
  {
    icon: "Eye",
    title: "Nothing touches your eye",
    body: "The camera does not touch your eye. It takes pictures using light, in the same way an ordinary retinal camera does.",
  },
  {
    icon: "Clock",
    title: "It takes one short sitting",
    body: "Several images are taken one after another during the same sitting. You see brief flashes of coloured light.",
  },
  {
    icon: "Stethoscope",
    title: "Your eye-care professional reviews it",
    body: "Your eye-care professional receives the images, reviews what they show, and decides what happens next.",
  },
];

const notDo = [
  {
    claim: "It does not improve your eyesight",
    body: "It is a way of taking pictures, not a treatment.",
  },
  {
    claim: "It does not diagnose you",
    body: "The images are read by your eye-care professional, who makes the decisions.",
  },
  {
    claim: "It does not replace your usual eye tests",
    body: "It is meant to sit alongside them.",
  },
  {
    claim: "It does not give you a result on the spot",
    body: "Anything you want to know about your images should come from your eye-care professional.",
  },
];

/* Used by the commented-out "Questions worth asking" section below.
const ask = [
  "Why are you recommending this for me?",
  "What will you do with the images?",
  "Will it change what happens next in my care?",
  "Is there a cost, and is it covered?",
  "What happens to my images and who can see them?",
];
*/

export default function PatientsPage() {
  return (
    <>
      {/* A composed banner, 2.2:1 — between the hero's narrowest aspect (1.92
          at 1440px) and its widest (3.04 at 2530px), so neither end crops
          badly. A single fixed-height band crops harder the wider the screen
          gets, which is what cut both faces off on a 2530px monitor.

          LEFT is the exam, from the supplied AI-generated file, windowed to
          x 250-1250 / y 0-755. That window is the same 1.32 aspect as the
          panel, so nothing is squeezed, and it excludes the "> 90% Detection
          Accuracy" panel (x>=1265) and the bottom strip (y>=760) carrying the
          ticked findings list and the pixel-pitch figure. The capture overlays
          that remain illustrate what site.ts already describes DeepMSI AI as
          doing.

          RIGHT is a real MSI-580 capture, not an illustration — the thing the
          page is describing, shown next to the room it is taken in.

          The badge stays: half the banner is AI-generated, so the banner is.

          NOTE: versioned by NAME. Next's image optimizer caches on the URL, so
          replacing a file in place keeps serving the old bytes from
          .next/cache/images and from the browser. Rename when the picture
          changes. */}
      <section className="page-hero page-hero-photo">
        <div className="page-hero-media">
          <Image
            src="/patient-banner-msi.png"
            alt="Left: an eye-care professional examining a patient at a slit lamp. Right: a multispectral capture of the back of an eye, showing the optic disc and retinal vessels."
            fill
            sizes="100vw"
            priority
            style={{ objectPosition: "center 30%" }}
          />
        </div>
        <div className="page-hero-scrim" aria-hidden="true" />
        {/* Left half only — the right half is a real capture. */}
        <p className="page-hero-tag is-left">AI-generated illustration (left)</p>
        <div className="container-x">
          <p className="editorial-label">
            <span className="label-rule" /> For patients
          </p>
          <h1>What is a multispectral retinal scan?</h1>
          <p className="page-hero-lead">
            If your eye-care professional has mentioned multispectral imaging,
            this page explains what it is in everyday language.
          </p>
        </div>
      </section>

      {/* <section className="notice-strip">
        <div className="container-x">
          <ShieldAlert size={19} />
          <div>
            <strong>Please read this first</strong>
            <p>
              This page is general information, not medical advice. It cannot
              tell you anything about your own eyes. Only your eye-care
              professional can do that. If you have sudden vision changes, eye
              pain or an injury, contact your eye-care professional or local
              emergency services straight away.
            </p>
          </div>
        </div>
      </section> */}

      {/* How far light travels */}
      <section className="editorial-band section-space">
        <div className="container-x">
          <div className="section-title-row">
            <div>
              <p className="editorial-label">
                <span className="label-rule" /> How it works
              </p>
              <h2>How far light travels</h2>
            </div>
          </div>
          <div className="step-grid">
            {light.map((step) => (
              <div
                className="step-card"
                key={step.n}
                style={
                  {
                    "--layer": WAVELENGTHS[step.band].color,
                  } as React.CSSProperties
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

      {/* Why that can be useful */}
      <section className="editorial-band-alt section-space">
        <div className="container-x">
          <p className="editorial-label">
            <span className="label-rule" /> Why it can help
          </p>
          <h2 className="band-h2">Some changes begin below the surface.</h2>
          <p className="band-lead">
            A picture that only shows the surface may not show these changes clearly.
            Having images from several depths gives your eye-care professional
            more to look at.
          </p>
          <p className="band-body">
            Comparison over the year made possible. This
            year&apos;s images against last year&apos;s.
          </p>
        </div>
      </section>

      {/* What to expect */}
      <section className="editorial-band section-space">
        <div className="container-x">
          <div className="section-title-row">
            <div>
              <p className="editorial-label">
                <span className="label-rule" /> What to expect
              </p>
              <h2>What to expect from a scan.</h2>
            </div>
          </div>
          <div className="instrument-grid instrument-grid-2">
            {expect.map((item) => (
              <div className="instrument-card is-static" key={item.title}>
                <span className="instrument-icon">
                  <Icon name={item.icon} />
                </span>
                <h3>{item.title}</h3>
                <p className="instrument-description">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What it does not do */}
      {/* <section className="editorial-band-alt section-space">
        <div className="container-x">
          <div className="section-title-row">
            <div>
              <p className="editorial-label">
                <span className="label-rule" /> Plainly
              </p>
              <h2>What it does not do.</h2>
            </div>
          </div>
          <Reveal>
            <div className="qa-list">
              {notDo.map((item, i) => (
                <div className="qa-row" key={item.claim}>
                  <p className="qa-n">{String(i + 1).padStart(2, "0")}</p>
                  <div>
                    <h3>{item.claim}</h3>
                    <p>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section> */}

      {/* Where this technology currently stands. This is a regulatory-status
          notice, so it takes the element the rest of the site gives those. */}
      {/* <section className="notice-strip">
        <div className="container-x">
          <ShieldAlert size={19} />
          <div>
            <strong>Investigational</strong>
            <p>
              The {site.shortName} platform is still being studied and reviewed
              by health regulators, and it is not available everywhere. Whether
              it is available to you depends on your country and on your
              eye-care professional.
            </p>
          </div>
        </div>
      </section> */}

      {/* Questions worth asking — commented out.
          To restore, uncomment this block AND the `ask` array above it.
      <section className="editorial-band section-space">
        <div className="container-x">
          <div className="section-title-row">
            <div>
              <p className="editorial-label">
                <span className="label-rule" /> Questions worth asking
              </p>
              <h2>If a scan is offered to you.</h2>
            </div>
          </div>
          <p className="band-body">
            These are reasonable things to ask the person offering it.
          </p>
          <Reveal>
            <div className="qa-list">
              {ask.map((question, i) => (
                <div className="qa-row" key={question}>
                  <p className="qa-n">{String(i + 1).padStart(2, "0")}</p>
                  <div>
                    <h3>{question}</h3>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      */}

      {/* Your privacy */}
      <section className="finding-close">
        <div className="container-x">
          <p className="editorial-label">
            <span className="label-rule" /> Your privacy
          </p>
          <h2>We do not collect patient information here.</h2>
          <p>
            Please do not send us any health information or details about your eyes.
            {/* Our Privacy Policy explains how we handle information sent through
            this site. */}
          </p>
          <Link className="editorial-text-link" href="/legal/privacy">
            Read the Privacy Policy
          </Link>
        </div>
      </section>
    </>
  );
}
