import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ShieldAlert } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import {
  flagship,
  opticalProducts,
  platformLayers,
  site,
  solutions,
} from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * An index of four things, not a catalogue.
 *
 * There are four ways into this company's work — the instrument, the system it
 * feeds, where that system is applied, and the optics line that sits outside
 * medicine entirely. Everything else is a layer or a component of one of those,
 * and giving components their own entries is what made the previous version of
 * this page a second, thinner copy of /platform.
 *
 * Each entry lists its own contents from site.ts rather than from a hand-kept
 * list, so adding a layer, a solution or an instrument shows up here without
 * anyone remembering to come back.
 *
 * Built in the editorial system the homepage and /platform use, rather than the
 * rounded utility cards this page carried before.
 */

export const metadata: Metadata = {
  title: "Products and solutions",
  description:
    "The AI-Spectral range: the MSI-120 multispectral retinal imaging system, the four-layer platform it feeds, the clinical settings both are applied in, and the optical metrology line for research and industry.",
};

type Entry = {
  n: string;
  eyebrow: string;
  title: string;
  summary: string;
  contents: { label: string; items: string[] };
  href: string;
  cta: string;
  media: { src: string; alt: string; fit?: "plate" | "bottom" };
  accent: string;
};

const medical: Entry[] = [
  {
    n: "01",
    eyebrow: "The instrument",
    title: flagship.name,
    summary: flagship.summary,
    contents: { label: "What it does", items: flagship.highlights.slice(0, 4) },
    href: "/products/msi-120",
    cta: `Explore the ${flagship.name}`,
    media: {
      src: "/products/msi-120-device.png",
      alt: `The ${site.shortName} ${flagship.name} multispectral retinal imaging system`,
      fit: "plate",
    },
    accent: platformLayers[0].color,
  },
  {
    n: "02",
    eyebrow: "The system",
    title: "The platform",
    summary:
      "The whole path from light to decision: multispectral capture, AI biomarker analysis, a clinician-facing interface, and a connected data layer designed to improve each generation of models. The software layers are not sold separately — they ship with the instrument as one system.",
    contents: {
      label: "Four layers",
      items: platformLayers.map((l) => l.name),
    },
    href: "/platform",
    cta: "Inside the platform",
    media: {
      /* Cropped from the top by the figure's aspect against object-position:
         bottom, which drops the window chrome carrying an internal capture path
         and a trial-licence countdown. Neither belongs on a public page. */
      src: "/website_viewer.png",
      alt: "The DeepMSI Viewer, with the wavelength filmstrip beside a 580 nm capture",
      fit: "bottom",
    },
    accent: platformLayers[1].color,
  },
  {
    n: "03",
    eyebrow: "Where it applies",
    title: "Clinical solutions",
    summary:
      "The platform exists to answer practical questions: is this patient changing, are they changing faster than last year, and does that change warrant action. These are the disease areas and care settings that question is asked in.",
    contents: {
      label: "Applied to",
      items: solutions.map((s) => s.title),
    },
    href: "/solutions",
    cta: "See it applied",
    media: {
      src: "/cases/gallery-fundus-01.jpg",
      alt: "A wide-field retinal capture",
    },
    accent: platformLayers[2].color,
  },
];

const optical: Entry = {
  n: "04",
  eyebrow: "Beyond medical",
  title: "Optical technologies",
  summary:
    "The instrumentation line for optical R&D, industrial QA and OEM integration — the same engineering discipline that built the instrument, aimed at the bench rather than the clinic.",
  contents: {
    label: "The line",
    items: opticalProducts.slice(0, 5).map((p) => p.name),
  },
  href: "/optical-technologies",
  cta: "Visit optical technologies",
  media: {
    /* The illustration's lower panel states a four-band spectral range, which
       contradicts the ten discrete bands site.ts claims for the instrument.
       This asset is cropped to the optical train above it. */
    src: "/products/optical-train.jpg",
    alt: "Illustration of a multispectral optical train: source, collimation, beamsplitter, objective and imager",
    fit: "plate",
  },
  accent: platformLayers[3].color,
};

function ProductBand({ entry, alt }: { entry: Entry; alt?: boolean }) {
  return (
    <section
      className={cn("product-band", alt && "is-alt")}
      style={{ "--layer": entry.accent } as React.CSSProperties}
    >
      <div className="container-x product-band-grid">
        <div>
          <p className="product-band-n">{entry.n}</p>
          <p className="editorial-label">
            <span className="label-rule" /> {entry.eyebrow}
          </p>
          <h2>{entry.title}</h2>
          <p className="product-band-summary">{entry.summary}</p>

          <p className="product-band-contents-label">{entry.contents.label}</p>
          <ul className="product-band-contents">
            {entry.contents.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <Link className="editorial-button" href={entry.href}>
            {entry.cta} <ArrowUpRight size={18} />
          </Link>
        </div>

        <Reveal direction="left">
          <figure
            className={cn(
              "product-figure",
              entry.media.fit === "plate" && "is-plate",
              entry.media.fit === "bottom" && "is-bottom",
            )}
          >
            <Image
              src={entry.media.src}
              alt={entry.media.alt}
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
            />
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

export default function ProductsPage() {
  return (
    <>
      {/* Banner cropped from the supplied artwork — the left third only.
          Everything to the right of x=985 is excluded, and that is where the
          claims live: a "Regulatory & Compliance" panel carrying the FDA logo,
          a CE mark and an ISO 13485 mark; a "24M+ Images" dataset figure; an
          "AI RISK SCORE 0.87" with DR, AMD, DME, GA and VH ticked; and a
          patient report naming "Moderate NPDR, DME" with a follow-up
          recommendation. Also cropped: the artwork's own title, which is this
          page's h1 word for word, a "Compliant" badge, and a bottom strip
          ending in "Better Outcomes".

          What is left is the MSI-120 with a patient, the capture thumbnail and
          the central eye — 985x380, 2.59:1, close to the hero's own aspect. */}
      <section className="page-hero page-hero-photo">
        <div className="page-hero-media">
          <Image
            src="/products-hero.jpg"
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            priority
          />
        </div>
        <div className="page-hero-scrim" aria-hidden="true" />
        <p className="page-hero-tag is-small">AI-generated</p>
        <div className="container-x">
          <p className="editorial-label">
            <span className="label-rule" /> Products and solutions
          </p>
          <h1>
            One capture.
            <br />
            Everything that follows.
          </h1>
          <p className="page-hero-lead">
            {site.shortName} builds the instrument that records the retina
            across the spectrum, the system that measures what it finds, and the
            optical tools that made both possible.
          </p>
        </div>
      </section>

      {/* Regulatory status sits above the range rather than beside one entry:
          it applies to every medical item below it. */}
      {/*
      <section className="notice-strip">
        <div className="container-x">
          <ShieldAlert size={19} />
          <div>
            <strong>Investigational</strong>
            <p>
              Platform components are investigational or in development.
              Regulatory status varies by component and jurisdiction — see
              <Link href="/evidence">Evidence &amp; regulatory</Link>.
            </p>
          </div>
        </div>
      </section>
      */}

      {medical.map((entry, i) => (
        <ProductBand key={entry.n} entry={entry} alt={i % 2 === 1} />
      ))}

      {/* The line between medicine and everything else is the one division on
          this page worth marking in the layout, not only in the copy. */}
      <div className="product-divider">
        <p className="container-x">
          Below this line — research &amp; industrial products, not medical
          devices
        </p>
      </div>

      <ProductBand entry={optical} />

      <CtaBand
        title="Not sure which part you need?"
        description="Tell us what you're trying to see or measure, and we'll point you to the right instrument, layer or collaboration."
        primary={{ label: "Talk to us", href: "/contact" }}
        secondary={{ label: "Inside the platform", href: "/platform" }}
      />
    </>
  );
}
