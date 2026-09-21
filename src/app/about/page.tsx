import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { Icon } from "@/components/ui/Icon";
import { CtaBand } from "@/components/sections/CtaBand";
import {
  site,
  pillars,
  leadership,
  platformLayers,
  flagship,
  presidentQuote,
} from "@/lib/site";

/**
 * The company page.
 *
 * Built in the editorial system, matching the rest of the interior pages:
 * flat grounds, hairline rules, mono numerals, no rounded cards. It previously
 * used PageHero / SectionHeading / Stagger around rounded cards and a
 * `prose-spectral` column.
 *
 * The hero is the flat one rather than a photo hero — the same as /platform,
 * /products and /solutions. The photo heroes are on the three audience doors
 * (/providers, /patients, /partners), which is what distinguishes them.
 */

export const metadata: Metadata = {
  title: "Company",
  description: `${site.name} is an Ottawa, Canada digital health technology company: the MSI-120 multispectral camera, the DeepMSI platform that reads what it captures, and a line of optical instrumentation for research and industry.`,
};

/* Everything the company makes, in the three pieces it actually comes in: the
   instrument, the software and data layer that reads it, and the optical line
   both grew out of. Names, status and counts are read from site.ts rather than
   restated, so a rename there lands here. */
const arms = [
  {
    eyebrow: "The instrument",
    title: flagship.name,
    body: "A multispectral retinal camera that records the eye across a sequence of discrete wavelengths in a single sitting — a spectral stack rather than one photograph.",
    href: flagship.href,
    icon: flagship.icon,
  },
  {
    eyebrow: "The platform",
    title: "DeepMSI AI, Viewer and Cloud",
    body: "Analysis that localises and quantifies retinal biomarkers, a clinician-facing interface for band-by-band review and reporting, and a connected data layer behind both.",
    href: "/platform",
    icon: "Layers",
  },
  {
    eyebrow: "Beyond medicine",
    title: "Optical Technologies",
    body: "Metrology, programmable multi-wavelength illumination and capture tooling, offered to optical labs, production lines and OEM teams.",
    href: "/optical-technologies",
    icon: "Crosshair",
  },
];

/* `text` is for a fact whose value is not a number; it takes a smaller size so
   it does not run off its own card. Everything else counts up. */
const facts: {
  value: number;
  suffix: string;
  text?: string;
  label: string;
}[] = [
  { value: site.experienceYears, suffix: "+", label: "Years in optics & imaging" },
  { value: 0, suffix: "", text: "Ottawa, CA", label: "Where the company is based" },
  { value: platformLayers.length, suffix: "", label: "Platform layers, built as one system" },
  { value: 1, suffix: "", label: "Connected dataset behind every model" },
];

export default function AboutPage() {
  return (
    <>
      {/* Unlike the three audience-door banners this one is not AI-generated so
          far as we can tell — it reads as a stock composite — so it carries no
          AI badge. Its provenance and licence are [TO CONFIRM]. The eye sits
          at the vertical centre of the frame, where a cover crop keeps it at
          every width, so no object-position override is needed. */}
      <section className="page-hero page-hero-photo">
        <div className="page-hero-media">
          <Image
            src="/abous_us_banner.jpeg"
            alt="A close-up of a human eye overlaid with a spectral analysis readout across ultraviolet, visible and infrared bands"
            fill
            sizes="100vw"
            priority
          />
        </div>
        <div className="page-hero-scrim" aria-hidden="true" />
        <div className="container-x">
          <p className="editorial-label">
            <span className="label-rule" /> Company
          </p>
          <h1>
            A digital health company
            <br />
            with an optics inheritance.
          </h1>
          <p className="page-hero-lead">
            {site.name} builds the {flagship.name} multispectral camera, the
            DeepMSI platform that reads what it captures, and the optical
            instrumentation both grew out of a foundation of more than{" "}
            <strong>{site.experienceYears} years</strong> of optical and imaging
            engineering.
          </p>
        </div>
      </section>

      {/* Story. band-wide: the prose here runs the full container width rather
          than the usual 42-46rem measure. */}
      <section className="editorial-band section-space band-wide">
        <div className="container-x">
          <div className="section-title-row">
            <div>
              <p className="editorial-label">
                <span className="label-rule" /> Our story
              </p>
              <h2>The value is in what happens after the image.</h2>
            </div>
          </div>
          <p className="band-lead">
            For over <strong>{site.experienceYears} years</strong>, we&apos;ve built precision optical and imaging systems. That&apos;s what makes our capture layer possible. But an instrument alone doesn&apos;t change care — a colour photograph discards information the right wavelengths recover, and even the richest image only matters once it becomes a measurement a clinician can compare, revisit and act on.
          </p>
          {/* <p className="band-body">
            But an instrument on its own does not change care. We started from a
            different conviction: that the value is in what happens{" "}
            <em>after</em> the image. A colour photograph throws away information
            the right wavelengths can recover — and even the richest image is
            only useful if it becomes a measurement a clinician can compare,
            revisit and act on.
          </p> */}

          <h3 className="band-h3">The platform is the product</h3>
          <p className="band-body">
            So we build the whole path: the {flagship.name}{" "}
            captures the eye across many wavelengths, DeepMSI AI quantifies
            what&apos;s in the stack, the Viewer is where a clinician reviews and
            reports, and a connected data layer sits behind all three.
          </p>
          <h3 className="band-h3">And the work that made it possible</h3>
          <p className="band-body">
            The same engineering also serves optical labs and production lines. We offer it as{" "}
            <Link href="/optical-technologies" className="underline">
              Optical Technologies
            </Link>{" "}
            — a line of instruments and software for research and industry. 
            {/* It is not a medical product line, and nothing in it is a medical
            device. */}
          </p>
        </div>
      </section>

      {/* What we make */}
      <section className="editorial-band-alt section-space">
        <div className="container-x">
          <div className="section-title-row">
            <div>
              <p className="editorial-label">
                <span className="label-rule" /> What we make
              </p>
              <h2>Three pieces, one discipline.</h2>
            </div>
          </div>
          <div className="instrument-grid">
            {arms.map((arm) => (
              <Link className="instrument-card" href={arm.href} key={arm.title}>
                <span className="instrument-icon">
                  <Icon name={arm.icon} />
                  <ArrowUpRight />
                </span>
                <p className="editorial-label">
                  <span className="label-rule" /> {arm.eyebrow}
                </p>
                <h3>{arm.title}</h3>
                <p className="instrument-description">{arm.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pull quote. The mark, the words and the attribution come in as three
          staggered reveals rather than one, so the eye lands on the mark, then
          the sentence, then the name. Reveal drops the offsets and collapses
          the duration under prefers-reduced-motion, so this degrades to a
          plain fade. */}
      <section className="quote-band">
        <div className="container-x">
          <blockquote>
            <Reveal delay={0} amount={0.4}>
              <span className="quote-mark" aria-hidden="true">
                “
              </span>
            </Reveal>
            <Reveal delay={0.12} amount={0.4}>
              <p>{presidentQuote.text}</p>
            </Reveal>
            <Reveal delay={0.28} amount={0.4}>
              <footer>
                <cite>{leadership[0].name}</cite>
                <span>{leadership[0].role}</span>
              </footer>
            </Reveal>
          </blockquote>
        </div>
      </section>

      {/* Facts */}
      <section className="editorial-band section-space">
        <div className="container-x">
          <div className="section-title-row">
            <div>
              <p className="editorial-label">
                <span className="label-rule" /> In short
              </p>
              <h2>Where we stand.</h2>
            </div>
          </div>
          <div className="step-grid">
            {facts.map((fact) => (
              <div className="step-card" key={fact.label}>
                <p className={fact.text ? "step-n is-text" : "step-n"}>
                  {fact.text ?? (
                    <CountUp value={fact.value} suffix={fact.suffix} />
                  )}
                </p>
                <p>{fact.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where we are. The photograph shows 390 March Road, Kanata, and is a
          KRP Properties image — both the address and the licence to use it are
          [TO CONFIRM]. A neighbouring tenant's signage is visible in frame. */}
      <section className="editorial-band-alt section-space">
        <div className="container-x about-where">
          <div>
            <p className="editorial-label">
              <span className="label-rule" /> Where we are
            </p>
            <h2 className="band-h2">{site.location}.</h2>
            <p className="band-lead">
              We are based in Ottawa&apos;s west-end technology park, alongside
              the optics and photonics cluster the company grew out of.
            </p>
          </div>
          <figure className="about-figure">
            <div>
              <Image
                src="/krp-properties-390-march-exterior_001.webp"
                alt="An aerial view of the low-rise office building in Ottawa's west-end technology park"
                fill
                sizes="(max-width: 1023px) 100vw, 55vw"
              />
            </div>
            <figcaption>390 March Road, Kanata, Ottawa.</figcaption>
          </figure>
        </div>
      </section>

      {/* Values */}
      <section className="editorial-band-alt section-space">
        <div className="container-x">
          <div className="section-title-row">
            <div>
              <p className="editorial-label">
                <span className="label-rule" /> What we value
              </p>
              <h2>How we work.</h2>
            </div>
          </div>
          <Reveal>
            <div className="instrument-grid instrument-grid-2">
              {pillars.map((pillar) => (
                <div className="instrument-card is-static" key={pillar.title}>
                  <span className="instrument-icon">
                    <Icon name={pillar.icon} />
                  </span>
                  <h3>{pillar.title}</h3>
                  <p className="instrument-description">{pillar.blurb}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
