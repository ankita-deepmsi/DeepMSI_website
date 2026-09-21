import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { SpectrumBar } from "@/components/visuals/SpectrumBar";
import { ModalityComparison } from "@/components/medical/ModalityComparison";
import { CtaBand } from "@/components/sections/CtaBand";
import { references, doiUrl } from "@/lib/references";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "The science of multispectral imaging",
  description:
    "Why imaging the retina across many discrete wavelengths reveals depth- and chromophore-dependent contrast that standard color fundus photography blends away — explained plainly and responsibly.",
};

const bands: { band: string; nm: string; emphasis: string }[] = [
  { band: "Blue–green", nm: "≈ 450–550 nm", emphasis: "Superficial / inner-retinal features, vascular contrast" },
  { band: "Green–yellow", nm: "≈ 550–600 nm", emphasis: "Hemoglobin contrast, macular region" },
  { band: "Red", nm: "≈ 600–680 nm", emphasis: "Deeper penetration toward the RPE" },
  { band: "Near-infrared", nm: "≈ 700–950 nm", emphasis: "RPE / choroidal-level contrast" },
];

const compare: { feature: string; color: string; oct: string; msi: string }[] = [
  {
    feature: "What it captures",
    color: "A single white-light photo (3 broad channels)",
    oct: "Cross-sectional depth (layers)",
    msi: "Many wavelength images of the same view",
  },
  {
    feature: "Strength",
    color: "Fast, familiar, true-to-eye",
    oct: "Layer-resolved structure",
    msi: "Depth- & chromophore-dependent contrast",
  },
  {
    feature: "Best thought of as",
    color: "The reference photograph",
    oct: "A cross-section",
    msi: "A richer photographic record",
  },
];

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        eyebrow="The science"
        title="Why multispectral imaging?"
        description="A plain-language guide to what imaging the retina across many wavelengths reveals — and an honest account of what it can and cannot do."
      />

      {/* What is MSI */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="prose-spectral prose max-w-none">
            <h2 className="font-display">What is multispectral imaging?</h2>
            <p>
              A standard color fundus photograph captures the retina the way the
              eye sees it — as a single blend of red, green and blue light
              reflected from a complex, layered tissue. It is fast, familiar and
              clinically invaluable. It also compresses a great deal of
              information into three broad channels.
            </p>
            <p>
              <strong>Multispectral imaging (MSI)</strong> takes a different
              approach: it illuminates the retina with a{" "}
              <strong>sequence of narrow wavelength bands</strong> and records a
              separate image at each. The result is a depth-aware{" "}
              <em>spectral stack</em> of the same view, rather than one composite
              picture.
            </p>
            <h3 className="font-display">Why wavelength matters</h3>
            <p>
              Light of different wavelengths penetrates the retina to different
              depths and is absorbed differently by the eye&apos;s natural
              chromophores — hemoglobin in blood, melanin in the pigment
              epithelium and choroid, and macular pigment. By comparing the same
              location across bands, MSI can make certain features easier to
              visualize than a single composite image can.
            </p>
          </div>

          {/* Wavelength-depth figure */}
          <Reveal direction="left">
            <figure className="rounded-3xl border border-ink-900/8 bg-ink-50/40 p-6">
              <figcaption className="mb-4 font-mono text-[11px] uppercase tracking-wider text-ink-700/55">
                Wavelength → depth (illustrative)
              </figcaption>
              <SpectrumBar className="mb-5" />
              <ul className="space-y-3">
                {bands.map((b) => (
                  <li
                    key={b.band}
                    className="rounded-xl border border-ink-900/8 bg-white p-3.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-ink-900">
                        {b.band}
                      </span>
                      <span className="font-mono text-xs text-navy-700">
                        {b.nm}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-ink-700/75">{b.emphasis}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[11px] leading-relaxed text-ink-700/60">
                The general direction — shorter wavelengths favouring retinal
                structure, longer wavelengths reaching the choroid — is
                consistent with published multi-wavelength imaging (Huang et al.,
                2020). Exact wavelength-to-structure mapping for any specific
                device is{" "}
                <span className="font-mono text-gold-600">[TO CONFIRM]</span>.
              </p>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-ink-50/40 py-20 md:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="In context"
            title="MSI alongside color photography and OCT."
            description="Multispectral imaging is complementary to — not a replacement for — the modalities clinicians already trust."
            className="mb-10"
          />
          <div className="overflow-x-auto rounded-2xl border border-ink-900/8 bg-white">
            <table className="w-full min-w-160 text-sm">
              <thead>
                <tr className="border-b border-ink-900/10 bg-navy-50/60 text-left">
                  <th className="px-5 py-4 font-semibold text-ink-900"></th>
                  <th className="px-5 py-4 font-semibold text-ink-900">
                    Color fundus
                  </th>
                  <th className="px-5 py-4 font-semibold text-ink-900">OCT</th>
                  <th className="px-5 py-4 font-semibold text-navy-700">
                    Multispectral
                  </th>
                </tr>
              </thead>
              <tbody>
                {compare.map((r, i) => (
                  <tr
                    key={r.feature}
                    className={i % 2 ? "bg-ink-50/30" : "bg-white"}
                  >
                    <td className="px-5 py-4 font-medium text-ink-900">
                      {r.feature}
                    </td>
                    <td className="px-5 py-4 text-ink-700/80">{r.color}</td>
                    <td className="px-5 py-4 text-ink-700/80">{r.oct}</td>
                    <td className="px-5 py-4 text-ink-800">{r.msi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-14">
            <SectionHeading
              eyebrow="Same eye, three views"
              title="See what each modality shows."
              description="Color fundus photography, a multispectral capture, and OCT correlation from the same case — cuticular drusen, one eye."
              className="mb-8"
            />
            <ModalityComparison />
          </div>
        </div>
      </section>

      {/* What it helps visualize + AI */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div className="prose-spectral prose max-w-none">
            <h2 className="font-display">What MSI can help visualize</h2>
            <p>
              Across bands, multispectral imaging can help make features such as
              drusen, pigmentary change, and vascular and hemorrhagic contrast
              easier to appreciate, and supports a richer baseline for monitoring
              change over time.
            </p>
            <p>
              The framing is deliberate throughout: MSI{" "}
              <strong>helps visualize</strong> and <strong>supports</strong>{" "}
              documentation. It does not, by itself, diagnose disease — the
              clinician remains the decision-maker.
            </p>
          </div>
          <div className="prose-spectral prose max-w-none">
            <h2 className="font-display">The role of AI</h2>
            <p>
              Modern retinal AI is moving toward{" "}
              <strong>foundation models</strong> pre-trained on enormous image
              volumes. The quality of such a model is bounded by the richness of
              its input — and a multispectral capture offers many wavelength
              channels per image rather than three.
            </p>
            <p>
              Our long-term thesis is to extend that paradigm into the spectral
              domain, responsibly and with validation. It is a direction of
              research, not a present clinical claim.
            </p>
          </div>
        </div>
      </section>

      {/* References */}
      <section className="border-t border-ink-900/8 bg-ink-50/40 py-16 md:py-24">
        <div className="container-x max-w-3xl">
          <SectionHeading
            eyebrow="References"
            title="Grounded in the literature."
            description="Selected peer-reviewed sources that support the general science described above. Each citation has been checked against its publisher / DOI. Device-specific performance, indications and exact wavelengths remain separately verified."
            className="mb-8"
          />

          <ol className="space-y-4">
            {references.map((r, i) => (
              <li
                key={r.id}
                className="rounded-2xl border border-ink-900/8 bg-white p-5"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 font-mono text-xs font-semibold text-navy-700">
                    [{i + 1}]
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm leading-relaxed text-ink-800">
                      <span className="font-medium">{r.authors}</span> {r.title}.{" "}
                      <span className="italic text-ink-700/80">{r.journal}</span>{" "}
                      ({r.year}).
                    </p>
                    {r.note && (
                      <p className="mt-1.5 text-xs leading-relaxed text-ink-700/70">
                        {r.note}
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <a
                        href={doiUrl(r.doi)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-navy-700 hover:underline"
                      >
                        doi:{r.doi}
                      </a>
                      <span className="rounded-full bg-navy-50 px-2 py-0.5 text-[10px] font-medium text-navy-700">
                        {r.topic}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8">
            <Disclaimer variant="info" title="How we use these sources">
              These references support the general principles of multispectral
              imaging, retinal AI and AMD science. They are not claims about any{" "}
              {site.name} product. Device-specific wavelengths, performance and
              indications remain{" "}
              <span className="font-mono">[TO CONFIRM]</span> until validated and
              cleared.
            </Disclaimer>
          </div>

          <div className="mt-6">
            <Button href="/news" variant="outline" arrow>
              Clinical summaries &amp; reports
            </Button>
          </div>
        </div>
      </section>

      <CtaBand
        title="Go deeper with our clinical team."
        description="Request the evidence summary, or talk to us about a research collaboration."
        primary={{ label: "Request evidence pack", href: "/contact" }}
        secondary={{ label: "Explore the platform", href: "/platform" }}
      />
    </>
  );
}
