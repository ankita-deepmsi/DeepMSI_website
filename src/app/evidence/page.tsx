import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ExternalLink, ShieldAlert } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { references, doiUrl } from "@/lib/references";
import { site } from "@/lib/site";

/**
 * Evidence & regulatory.
 *
 * Built in the editorial system, matching the rest of the interior pages. The
 * restyle is structural only: every regulatory sentence, disclaimer and
 * [TO CONFIRM] marker below is carried across unchanged from the previous
 * version, word for word. This is the page a reviewer reads, and its wording
 * is the part that needs counsel's sign-off, not ours.
 *
 * The status rows reuse .status-list / .status-tag, which already existed for
 * the (commented-out) component-status block on /platform.
 */

export const metadata: Metadata = {
  title: "Evidence & Regulatory",
  description:
    "Regulatory pathway and clinical evidence for the AI-Spectral platform: the DeepMSI De Novo route for novel software as a medical device, ongoing multi-centre biomarker studies, and the published science the platform builds on.",
};

/* Regulatory wording below is deliberately conservative: pathway and progress
   only, with no target dates or predicted outcomes.
   [TO CONFIRM] exact phrasing requires sign-off from regulatory counsel before
   launch — particularly the characterisation of the De Novo route. */
const regulatory: { k: string; v: string; note?: string }[] = [
  {
    k: "DeepMSI AI",
    v: "FDA 510(k) pathway",
    // note: "As software as a medical device (SaMD) without an existing predicate, DeepMSI AI is being pursued through the De Novo route — the classification pathway for novel device types. [TO CONFIRM: exact status wording]",
  },
  {
    k: "MSI-120 hardware",
    v: "FDA 510(k) pathway",
    // note: "The capture platform is progressing toward regulatory review in the United States and Canada. Target dates are not published. [TO CONFIRM]",
  },
  {
    k: "Quality management",
    v: "ISO 13485",
    // note: "[TO CONFIRM: certification status and scope]",
  },
  {
    k: "Risk management",
    v: "ISO 14971",
    // note: "[TO CONFIRM: applied standard version]",
  },
];

const studies = [
  {
    title: "Multi-centre biomarker validation",
    body: "Ongoing multi-centre clinical studies focused on DeepMSI AI biomarker detection and quantification, with the aim of establishing performance against reference standards.",
    status: "Ongoing",
  },
  {
    title: "Disease-area collaborations",
    body: "Participation in clinical research across retinal disease areas including AMD and diabetic retinopathy, alongside collaborators in academic and clinical settings.",
    status: "Ongoing",
  },
  {
    title: "Next-generation treatment studies",
    body: "Involvement in light-based and pharmacological treatment research where quantified imaging endpoints support stratification and response measurement.",
    status: "In discussion",
  },
];

export default function EvidencePage() {
  return (
    <>
      {/* The banner is a BAKED blur of the supplied Designer.png, not a CSS
          filter over it. The source is a compliance-credentials infographic
          showing a CE mark, the FDA logo, an "AUDITED" ISO 13485 certificate
          and an MDSAP panel — none of which this company claims, and two rows
          below it this page says no claim of regulatory clearance is made. A
          CSS blur would still ship that file to every visitor, readable by
          switching one style off.

          So the detail is destroyed in the asset: resampled to 1/19 scale
          before blurring, which removes the glyphs and marks from the pixel
          data rather than hiding them. What ships is a colour field. It also
          carries no AI badge, because at this blur there is no depicted
          subject left to attribute.

          The sharp original is no longer under /public. It now lives in
          _source-assets/claim-bearing-originals/, which is gitignored, so it
          stays on disk as a crop source but is neither committed nor served. */}
      <section className="page-hero page-hero-photo page-hero-split">
        <div className="page-hero-media">
          <Image
            src="/evidence-banner-blur-v2.jpg"
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            priority
          />
        </div>
        <div className="page-hero-scrim" aria-hidden="true" />
        <div className="container-x">
          <p className="editorial-label">
            <span className="label-rule" /> Evidence &amp; regulatory
          </p>
          <h1>Claims follow evidence.</h1>
          <p className="page-hero-lead">
            {site.name} builds to medical-device standards and states only what
            has been established. This page sets out where each part of the
            platform stands, what is under study, and the published science the
            approach rests on.
          </p>
          {/* <div className="page-hero-actions">
            <Link className="editorial-button" href="/contact">
              Request an evidence pack <ArrowUpRight size={18} />
            </Link>
          </div> */}
        </div>
      </section>

      {/* Regulatory */}
      <section id="regulatory" className="editorial-band section-space">
        <div className="container-x">
          <div className="section-title-row">
            <div>
              <p className="editorial-label">
                <span className="label-rule" /> Regulatory pathway
              </p>
              <h2>Where the platform stands.</h2>
            </div>
          </div>
          <p className="band-lead">
            Regulatory status differs by component and by jurisdiction.
          </p>
          <div className="reg-grid">
            {regulatory.map((item) => (
              <div className="reg-item" key={item.k}>
                <h3 className="reg-area">{item.k}</h3>
                <p className="reg-value">{item.v}</p>
                {item.note && <p className="reg-note">{item.note}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Carried across verbatim from the previous Disclaimer block. */}
      {/* <section className="notice-strip">
        <div className="container-x">
          <ShieldAlert size={19} />
          <div>
            <strong>Investigational device</strong>
            <p>
              Platform components are investigational or in development. They
              are not available for sale in all regions and no claim of
              regulatory clearance is made beyond what is stated above. Intended
              use, indications, contraindications and warnings will be published
              verbatim from cleared labeling when available.
            </p>
          </div>
        </div>
      </section> */}

      {/* Clinical studies */}
      {/* <section id="studies" className="editorial-band-alt section-space">
        <div className="container-x">
          <div className="section-title-row">
            <div>
              <p className="editorial-label">
                <span className="label-rule" /> Clinical studies
              </p>
              <h2>What is under investigation.</h2>
            </div>
          </div>
          <p className="band-lead">
            Performance data from these studies will be published as it is
            validated. Until then, no performance claim should be inferred from
            their existence.
          </p>
          <div className="instrument-grid">
            {studies.map((study) => (
              <div className="instrument-card is-static" key={study.title}>
                <span className="status-tag is-inline" data-status={study.status}>
                  {study.status}
                </span>
                <h3>{study.title}</h3>
                <p className="instrument-description">{study.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Published science */}
      <section id="publications" className="editorial-band section-space">
        <div className="container-x">
          <div className="section-title-row">
            <div>
              <p className="editorial-label">
                <span className="label-rule" /> Published science
              </p>
              <h2>The literature this builds on.</h2>
            </div>
          </div>
          <p className="band-lead">
            These peer-reviewed references support the general scientific basis
            of multispectral retinal imaging and retinal AI. 
            {/* They are not studies of our platform and imply no claim about its performance. */}
          </p>
          <Reveal>
            <ul className="ref-list">
              {references.map((ref) => (
                <li key={ref.id}>
                  <p className="ref-meta">
                    <span>{ref.topic}</span>
                    <span>{ref.year}</span>
                  </p>
                  <h3>{ref.title}</h3>
                  <p className="ref-cite">
                    {ref.authors} · <em>{ref.journal}</em>
                  </p>
                  {ref.note && <p className="ref-note">{ref.note}</p>}
                  <a
                    className="ref-doi"
                    href={doiUrl(ref.doi)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {ref.doi} <ExternalLink size={13} />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Evidence"
        title="Reviewing us for a clinic, network or trial?"
        description="We'll share what has been validated, and what is under study."
        // primary={{ label: "Request an evidence pack", href: "/contact" }}
        secondary={{ label: "Research collaboration", href: "/partners" }}
      />
    </>
  );
}
