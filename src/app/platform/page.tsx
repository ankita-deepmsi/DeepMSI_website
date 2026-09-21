import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, RotateCw } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { PlatformStack } from "@/components/platform/PlatformStack";
import { SpectralExplorer } from "@/components/home/SpectralExplorer";
import { CtaBand } from "@/components/sections/CtaBand";
import { platformLayers, platformProducts, site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Built in the editorial system that the homepage uses — flat panels, hairline
 * rules, mono numerals — rather than the rounded utility cards this page
 * carried before, so following "Explore the platform" does not change design
 * language mid-journey. Shared components still on the old language (PageHero,
 * Disclaimer, SectionHeading, Button) are deliberately not used here; they are
 * still in service on the pages we have not migrated yet.
 */

/* One image per layer, keyed by layer. The two software shots are real captures
   of the research build, not mockups — a fabricated AI overlay on this page
   would depict performance that has not been validated.

   Both are cropped from the top by the card's aspect ratio against
   object-position: bottom, which drops the window chrome carrying an internal
   capture path and, on the Viewer, a trial-licence countdown. Neither belongs
   on a public page. */
const LAYER_MEDIA: Record<
  string,
  {
    src: string;
    alt: string;
    caption: string;
    product?: boolean;
    generated?: boolean;
  }
> = {
  capture: {
    src: "/products/msi-120-device.png",
    alt: "The MSI-120 multispectral retinal imaging system",
    caption: "MSI-120 — the device.",
    product: true,
  },
  ai: {
    src: "/website_pigment.png",
    alt: "DeepMSI analysis with segmentation overlaid on a single wavelength band",
    caption:
      "DeepMSI AI — segmentation overlaid on one band of the spectral stack.",
  },
  viewer: {
    src: "/website_viewer.png",
    alt: "The DeepMSI Viewer, with the wavelength filmstrip beside a 580 nm capture",
    caption:
      "DeepMSI Viewer — band-by-band review of the same eye.",
  },
  /* Unlike the three above, this is not a capture of anything that exists. It
     is a generated concept image, and the dataset sizes and percentages drawn
     inside it are invented by the generator — they are not AI-Spectral figures
     and must never be quoted as such. Hence the on-image badge and the explicit
     disclaimer in the caption. */
  cloud: {
    src: "/website_bigdata.png",
    alt: "Concept illustration of a retinal imaging data lake feeding analysis models",
    caption:
      "*AI-generated for concept illustration.",
    generated: true,
  },
};

export const metadata: Metadata = {
  title: "The Platform",
  description:
    "The AI-Spectral platform: MSI-120 multispectral capture, DeepMSI AI biomarker analysis, the DeepMSI Viewer clinician interface, and a connected data layer designed to improve each generation of models.",
};

export default function PlatformPage() {
  return (
    <>
      {/* Banner cropped from the supplied artwork. Removed, and why: the top
          band, whose headline is this page's h1 word for word and which also
          carries a "better outcomes" line; the bottom band ("AI models trained
          on millions of images", "Enterprise-grade security and compliance",
          "Better outcomes through earlier detection", and a rival tagline);
          and two panels inside the remaining band — a worked AI report naming
          a grade ("Moderate NPDR", "Risk Level: High", "Refer to Specialist")
          and an "AI RISK SCORE 0.87" readout. None of those are claims this
          site makes. What is left crops to 1536x590, 2.6:1, which is the
          hero's own working aspect.

          NOTE: the strip describes a six-stage PROCESS while the section below
          describes the platform as FOUR LAYERS. Different counts, same page. */}
      <section className="page-hero page-hero-photo">
        <div className="page-hero-media">
          <Image
            src="/platform-hero.jpg"
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
            <span className="label-rule" /> The platform
          </p>
          <h1>
            An end-to-end
            <br />
            retinal intelligence.
          </h1>
          <p className="page-hero-lead">
            {site.name} builds the whole path from light to decision:
            multispectral capture, AI biomarker analysis, a clinician-facing
            interface, and a connected data layer designed to improve each
            generation of models.
          </p>
          <div className="page-hero-actions">
            <Link className="editorial-button" href="/solutions">
              See it applied <ArrowUpRight size={18} />
            </Link>
            <Link className="editorial-text-link" href="/evidence">
              Evidence &amp; regulatory <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <PlatformStack id="stack" />

      {/* One band per layer. Each takes its accent from the same colour the
          pyramid plate uses, so the two read as the same object. */}
      {platformLayers.map((layer, idx) => {
        const media = LAYER_MEDIA[layer.key];
        return (
          <section
            key={layer.key}
            id={layer.key}
            className={cn(
              "layer-band scroll-mt-28",
              idx % 2 && "is-alt",
              layer.key === "cloud" && "is-data",
            )}
            style={{ "--layer": layer.color } as React.CSSProperties}
          >
            <div className="container-x layer-band-grid">
              <div>
                <p className="layer-band-n">{layer.n}</p>
                <p className="editorial-label">
                  <span className="label-rule" /> {layer.role}
                </p>
                <h2>{layer.name}</h2>
                <p className="layer-band-summary">{layer.summary}</p>
                <p className="layer-band-detail">{layer.detail}</p>
              </div>

              <Reveal direction="left">
                <figure className="layer-flip-figure">
                  {/* Both faces are always in the DOM, so the contributions are
                      read by assistive tech whether or not the card is flipped;
                      backface-visibility only hides them visually. Focusable so
                      the reveal is reachable by keyboard, and the CSS stacks
                      both faces on pointer-less devices where hover never
                      fires. */}
                  <div
                    className="layer-flip"
                    tabIndex={0}
                    aria-label={`${layer.name} — what it contributes`}
                  >
                    <div className="layer-flip-inner">
                      <div
                        className={cn(
                          "layer-flip-face layer-flip-front",
                          media?.product && "is-product",
                        )}
                      >
                        {media && (
                          <Image
                            src={media.src}
                            alt={media.alt}
                            fill
                            sizes="(max-width: 1023px) 100vw, 50vw"
                          />
                        )}
                        {media?.generated && (
                          <span className="layer-band-figure-tag">
                            AI-generated illustration
                          </span>
                        )}
                        <span className="layer-flip-hint">
                          <RotateCw size={13} /> What it contributes
                        </span>
                      </div>

                      <div className="layer-flip-face layer-flip-back">
                        <p>What it contributes</p>
                        <ul>
                          {layer.points.map((point, n) => (
                            <li key={point}>
                              <span>{String(n + 1).padStart(2, "0")}</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* Kept outside the card: the research-build and
                      AI-generated disclaimers must not be hidden on a face. */}
                  {media && <figcaption>{media.caption}</figcaption>}
                </figure>
              </Reveal>
            </div>
          </section>
        );
      })}

      {/* The explorer's readouts are built for a dark ground — on white its
          rails and captions wash out, which is what happened here before. */}
      <section className="spectrum-section">
        <div className="container-x spectrum-grid">
          <div className="spectrum-copy">
            <p className="editorial-label">
              <span className="label-rule" /> Layer 01, in practice
            </p>
            <h2>The same retina, across the spectrum.</h2>
            {/* <p>
              Each wavelength band reaches a different depth and responds to
              different tissue. The stack — not any single image — is what the
              analysis layer works on.
            </p> */}
            <Link className="editorial-text-link" href="/technology">
              The science behind it <ArrowUpRight size={17} />
            </Link>
          </div>
          <SpectralExplorer />
        </div>
      </section>

      {/* <section className="status-section section-space">
        <div className="container-x">
          <div className="section-title-row">
            <div>
              <p className="editorial-label">
                <span className="label-rule" /> Components
              </p>
              <h2>Where each layer stands.</h2>
            </div>
          </div>
          <p className="status-intro">
            The platform is being built and reviewed layer by layer. Status
            below reflects development and regulatory progress, not availability
            in any particular market.
          </p>
          <ul className="status-list">
            {platformProducts.map((product) => (
              <li key={product.slug}>
                <h3>{product.name}</h3>
                <span className="status-tag" data-status={product.status}>
                  {product.status}
                </span>
                <p>{product.summary}</p>
                {product.statusNote && (
                  <p className="status-note">{product.statusNote}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section> */}

      <CtaBand
        title="Bring the platform to your clinic, network or study."
        description="Talk to us about evaluation, clinical collaboration or integration."
        primary={{ label: "Start a conversation", href: "/contact" }}
        secondary={{ label: "Partner with us", href: "/partners" }}
      />
    </>
  );
}
