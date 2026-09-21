import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { SpectralSequence } from "./SpectralSequence";
import { site } from "@/lib/site";

export function EditorialHero() {
  return (
    <>
      <section className="photo-hero" aria-labelledby="home-title">
        <div className="photo-hero-media">
          <SpectralSequence />
        </div>
        <div className="photo-hero-scrim" aria-hidden="true" />
        <div className="photo-hero-content container-x">
          <div className="photo-hero-copy">
            <p className="editorial-label">
              <span className="label-rule" /> Digital health for eye care
            </p>
            <h1 id="home-title">
              {site.taglineLead} <em>{site.taglineEmphasis}</em>
            </h1>
            <p className="photo-hero-lead">
              An end-to-end solution for <strong>RETINAL INTELLIGENCE</strong>.
            </p>
            <p className="photo-hero-description">
              Multispectral capture, AI biomarker analysis, clinician tooling
              and a connected data layer.
              Built such that retinal change can be
              measured, not just described.
            </p>
            <div className="photo-hero-actions">
              <Link className="editorial-button" href="/platform">
                Explore the platform <ArrowUpRight size={18} />
              </Link>
              <Link className="editorial-text-link" href="/products/msi-120">
                Meet the MSI-120 <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="hero-bottom">
        <div className="hero-bottom-inner container-x">
          <p>
            One eye, ten wavelengths.{" "}
            <strong>Each one reveals a different depth.</strong>
          </p>
          <Link href="#problem">
            See what changes
            <span aria-hidden="true">
              <ArrowDown size={16} />
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
