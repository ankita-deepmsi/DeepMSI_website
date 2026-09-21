import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Info } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { CtaBand } from "@/components/sections/CtaBand";
import { opticalProducts, markets, site } from "@/lib/site";

/**
 * The optical instrumentation line.
 *
 * Built in the editorial system, matching the rest of the interior pages: flat
 * grounds, hairline rules, no rounded cards. It previously used PageHero /
 * SectionHeading / Stagger around rounded-3xl panels.
 *
 * The product cards are deliberately NOT converted. ProductCard carries the one
 * distinction this page exists to make — a gold rule and a "Not a medical
 * device" chip on every optical product, against navy for the clinical platform
 * — and that signal is worth more than stylistic uniformity.
 *
 * The #metrology, #illumination and #sdk anchors are load-bearing: every entry
 * in `opticalProducts` points at one of them.
 */

export const metadata: Metadata = {
  title: "Optical Technologies",
  description:
    "The optical instrumentation line behind the AI-Spectral platform: MTF metrology, programmable multi-wavelength illumination and light-source characterisation, for laboratory and industrial use. Not medical devices.",
};

export default function OpticalTechnologiesPage() {
  return (
    <>
      {/* The banner is AI-generated and says so on its face.
          Unlike the files supplied for /evidence and /products it carries no
          regulatory mark and no performance figure, so it ships close to whole:
          what it shows is a labelled optical train — light source, collimation
          lens, beamsplitter, objective, imager — which is this page's subject.
          The NA, focal-length and sensor-format figures beside those labels are
          schematic annotation, not specification: nothing sold on this page is a
          lens or a camera, so a reader has nothing to attach them to.

          ONE panel was destroyed in the asset: a bracketed box headed "SPECTRAL
          RANGE" listing 450/550/650/850 nm. That one does map onto something we
          sell — the Spectral Light Box — whose published channels read
          "(UV-VIS-NIR)" with an explicit [TO CONFIRM: exact channels] marker in
          site.ts. Publishing four named channels here would have stated a spec
          our own source file says is unconfirmed. It is resampled away rather
          than covered over, so the glyphs are gone from the pixel data.

          The unheaded "450nm / 550nm / 650nm / 850nm" captions under the colour
          swatches remain: without the "SPECTRAL RANGE" heading they assert
          nothing about a product — 450 nm is blue light whoever is selling it.

          The source frame is 1.78:1, narrower than the hero at every width, so
          the full optical train is always in view and only height is cropped.
          objectPosition pulls the crop up to 25% because a centre crop at 2560
          takes the top callout labels off.

          Versioned by NAME (/light.png -> /optical-hero.jpg): Next's image
          optimizer caches on the URL, so editing a file in place keeps serving
          the old bytes. Rename when the picture changes. */}
      <section className="page-hero page-hero-photo">
        <div className="page-hero-media">
          <Image
            src="/optical-hero.jpg"
            alt="A rendered optical train — light source, collimation lens, beamsplitter, objective lens and a spectral imager — with a beam dispersing into its component wavelengths across the sensor"
            fill
            sizes="100vw"
            priority
            style={{ objectPosition: "center 25%" }}
          />
        </div>
        <div className="page-hero-scrim" aria-hidden="true" />
        <p className="page-hero-tag">AI-generated illustration</p>
        <div className="container-x">
          <p className="editorial-label">
            <span className="label-rule" /> Beyond medical
          </p>
          <h1>
            Instrumentation that
            <br />
            reaches beyond medicine.
          </h1>
          <p className="page-hero-lead">
            {/* Explicit {" "}: SWC drops the literal space between an
                expression and the text that follows it, and the lead renders
                "AI-Spectraloffers". */}
            {site.shortName}{" "}
            offers a specialist line for optical R&amp;D, industrial QA and OEM
            integration.
          </p>
          <div className="page-hero-actions">
            <Link className="editorial-button" href="#metrology">
              See the line <ArrowUpRight size={18} />
            </Link>
            <Link
              className="editorial-button editorial-button-ghost"
              href="/platform"
            >
              See the platform <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Commented out, as it was before this restyle — carried across in the
          editorial markup so uncommenting lands a finished section rather than
          the old rounded-card one. It also needs `AlertTriangle` added back to
          the lucide-react import above.

          Worth knowing what is currently off the page: with the per-row
          "Not a medical device" chip commented out too, the page metadata
          description is now the ONLY place the site says these are not medical
          devices on this page — and a description is not visible to a reader.

      <section className="notice-strip">
        <div className="container-x">
          <AlertTriangle size={19} />
          <div>
            <strong>For research &amp; industrial use only</strong>
            <p>
              The products on this page are <strong>not medical devices</strong>
              and are not intended to diagnose, treat, cure or prevent any
              disease. They are intended for laboratory, industrial and
              educational use, and are entirely separate from the clinical
              platform.
            </p>
          </div>
        </div>
      </section>
      */}

      {/* Why this line exists — commented out, carried across in the editorial
          markup for the same reason.

      <section className="editorial-band section-space">
        <div className="container-x">
          <div className="section-title-row">
            <div>
              <p className="editorial-label">
                <span className="label-rule" /> Shared lineage
              </p>
              <h2>One optics discipline, two destinations.</h2>
            </div>
          </div>
          <p className="band-lead">
            The calibration, illumination control and capture engineering that
            make clinical multispectral imaging possible are the same
            capabilities optical labs and production lines need. Rather than
            keep them internal, we offer them as instruments and software.
          </p>
          <h3 className="band-h3">Where this fits</h3>
          <p className="band-body">
            This line is a specialist offering, not a second business. The
            company&apos;s focus is the clinical platform — multispectral
            capture, AI biomarker analysis, clinician tooling and the connected
            data layer.
          </p>
          <p className="mt-6">
            <Link href="/platform" className="editorial-text-link">
              See the platform <ArrowUpRight size={18} />
            </Link>
          </p>
        </div>
      </section>
      */}

      {/* Markets */}
      <section className="editorial-band section-space">
        <div className="container-x">
          <div className="section-title-row">
            <div>
              <p className="editorial-label">
                <span className="label-rule" /> Who it&apos;s for
              </p>
              <h2>Built for the people who measure light.</h2>
            </div>
          </div>
          {/* One row of four, not a card grid. Three words and one sentence
              each do not need a box, and in the three-column .instrument-grid
              the fourth dropped to a row of its own with three empty cells
              beside it. */}
          <div className="market-row">
            {markets.map((m) => (
              <div className="market-item" key={m.title}>
                <h3>
                  <Icon name={m.icon} />
                  {m.title}
                </h3>
                <p>{m.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instruments */}
      <section
        id="metrology"
        className="editorial-band-alt section-space scroll-mt-28"
      >
        <div className="container-x">
          <div className="section-title-row">
            <div>
              <p className="editorial-label">
                <span className="label-rule" /> The line
              </p>
              <h2>Instruments &amp; software.</h2>
            </div>
          </div>
          <p className="band-lead">
            Metrology, illumination and capture tooling available individually
            or as an integrated bench setup.
          </p>
          {/* A list, not a grid of ProductCards. Four instruments with a
              status, a summary and a four-point spec list each do not divide
              into three columns, and every card padded itself out to the
              tallest. Rows also put the statuses in one column a buyer can run
              down, which is the first thing anyone asks of this page.

              One Reveal around the whole list rather than one per row: the
              rows are short, and staggering them makes the page feel like it
              is still loading. Vertical, not direction="left" — that starts
              each element translated 28px to the right, which on mobile pushes
              a full-width row past the viewport and raises a horizontal
              scrollbar until it animates in.

              ProductCard is no longer used anywhere after this change. */}
          <Reveal>
            <div id="illumination" className="product-list mt-12 scroll-mt-28">
              {opticalProducts.map((product, i) => (
                <article className="product-row" key={product.slug}>
                  <p className="product-n">{String(i + 1).padStart(2, "0")}</p>
                  <div>
                    <p className="product-kicker">
                      <Icon name={product.icon} />
                      {product.kicker}
                    </p>
                    <h3>{product.name}</h3>
                    <p className="product-summary">{product.summary}</p>
                    <details className="product-details">
                      <summary>Product details</summary>
                      <ul className="finding-points">
                        {product.highlights.map((item, j) => (
                          <li key={item}>
                            <span>{String(j + 1).padStart(2, "0")}</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      {product.statusNote && (
                        <p className="product-note">{product.statusNote}</p>
                      )}
                    </details>
                  </div>
                  <div className="product-aside">
                    <span
                      className="status-tag is-inline"
                      data-status={product.status}
                    >
                      {product.status}
                    </span>
                    {/* <p className="product-chip">Not a medical device</p> */}
                    {/* Nothing in `opticalProducts` is external today — Azora
                        Solutions was the only one and it is commented out in
                        site.ts — but the branch stays so uncommenting it does
                        not silently point an outside product at our own
                        contact form. */}
                    {product.external ? (
                      <a
                        className="editorial-text-link"
                        href={product.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit site <ArrowUpRight size={17} />
                      </a>
                    ) : (
                      <Link className="editorial-text-link" href="/contact">
                        Discuss this product <ArrowUpRight size={17} />
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* <section id="sdk" className="notice-strip scroll-mt-28">
        <div className="container-x">
          <Info size={19} />
          <div>
            <strong>OEM &amp; integration</strong>
            <p>
              The Spectral Capture SDK is the acquisition engine used in our own
              platform, offered under evaluation agreement to OEMs and research
              groups building their own spectral applications.
            </p>
          </div>
        </div>
      </section> */}

      <CtaBand
        eyebrow="Research & industry"
        title="Tell us what you're measuring."
        description="From a single light box to an lab illumination systems: Let's scope it together."
        primary={{ label: "Contact us", href: "/contact" }}
        // secondary={{ label: "OEM & integration", href: "/partners" }}
      />
    </>
  );
}
