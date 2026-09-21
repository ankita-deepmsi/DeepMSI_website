import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Check, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { StatusBadge } from "@/components/ui/Badge";
import { SpectralExplorer } from "@/components/home/SpectralExplorer";
import { DepthDiagram } from "@/components/products/DepthDiagram";
import { CtaBand } from "@/components/sections/CtaBand";
import { flagship, platformLayers, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "MSI-120",
  description:
    "The MSI-120 is the AI-Spectral flagship multispectral retinal imaging system — capturing the retina across 10 to 16 discrete wavelengths in a single sitting, from visible through near-infrared.",
};

const bands = [
  { range: "≈ 450–550 nm", label: "Blue–green", reveals: "Inner-retinal features, vascular contrast", color: "#2bb3a3" },
  { range: "≈ 550–600 nm", label: "Green–yellow", reveals: "Hemoglobin contrast, macular region", color: "#e8c65f" },
  { range: "≈ 600–680 nm", label: "Red", reveals: "Deeper penetration toward the RPE", color: "#e0705a" },
  { range: "≈ 700–950 nm", label: "Near-infrared", reveals: "RPE and choroidal-level contrast", color: "#7585c6" },
];

export default function Msi120Page() {
  return (
    <>
      {/* Flagship hero — the one ownable number leads */}
      <section className="relative overflow-hidden bg-ink-950 pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0 [background-image:radial-gradient(ellipse_at_70%_30%,rgba(11,114,133,0.4),transparent_62%)]" />
        <div className="grain absolute inset-0" />
        <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-navy-300">
              Flagship · Retinal imaging
            </p>
            <h1 className="mt-5 font-display text-4xl leading-[1.04] text-white sm:text-5xl md:text-6xl">
              {site.shortName} MSI-120
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
              {flagship.tagline} 
              {/* The capture layer of the platform — and the
              reason everything above it has something to measure. */}
            </p>

            <div className="mt-9 inline-flex items-baseline gap-4 rounded-2xl border border-white/12 bg-white/5 px-6 py-5">
              <span className="font-mono text-5xl leading-none text-white md:text-6xl">
                {site.signatureSpec.value}
              </span>
              <div>
                <p className="font-mono text-sm uppercase tracking-[0.14em] text-navy-300">
                  {site.signatureSpec.unit}
                </p>
                <p className="text-sm text-white/55">
                  {site.signatureSpec.claim}
                </p>
              </div>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button href="/contact" arrow magnetic>
                Request a demonstration
              </Button>
              {/* <StatusBadge status={flagship.status} /> */}
            </div>
          </div>

          <Reveal direction="left">
            <div className="device-turntable relative mx-auto aspect-[530/676] w-full max-w-[26rem]">
              <Image
                src="/products/msi-120-device.png"
                alt="The AI-Spectral MSI-120 multispectral retinal imaging system"
                fill
                priority
                sizes="(max-width: 1023px) 80vw, 26rem"
                className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <div className="bg-spectral h-1 w-full" />

      {/* Regulatory position, stated immediately */}
      {/* <section className="bg-white pt-10">
        <div className="container-x">
          <Disclaimer variant="investigational">
            The MSI-120 is an investigational device, progressing toward
            regulatory review. It is not available for sale in all regions and
            no claim of clearance is made. Specifications below are placeholders
            pending confirmation against the final device and its cleared
            labeling. See{" "}
            <Link href="/evidence" className="underline">
              Evidence &amp; regulatory
            </Link>
            .
          </Disclaimer>
        </div>
      </section> */}

      {/* What it does */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-x grid items-start gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHeading
              eyebrow="What it captures"
              title="Not one photograph. A spectral stack."
              description="A standard colour fundus camera records three broad channels. The MSI-120 captures the retina across a sequence of narrow wavelength bands, each reaching a different depth and responding to different tissue; producing a spectral stack rather than a single composite photograph."
            />
            <ul className="mt-8 space-y-3">
              {flagship.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-50 text-navy-700">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-ink-800">{h}</span>
                </li>
              ))}
            </ul>
          </div>
          <Reveal direction="left">
            <SpectralExplorer />
          </Reveal>
        </div>
      </section>

      {/* Band table */}
      <section className="bg-ink-50/40 py-16 md:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Wavelength & depth"
            title="What each band tends to reveal."
            description="Shorter wavelengths favouring retinal structure, longer wavelengths reaching the choroid."
            className="mb-10"
          />
          <DepthDiagram bands={bands} />

          <Link href="/technology" className="editorial-text-link mt-6 inline-flex">
            The science behind it <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      {/* Specifications — restored */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Specifications"
            title="Technical overview."
            // description="Every figure below is a placeholder pending confirmation against the final device and its cleared labeling."
            className="mb-10"
          />
          <div className="overflow-hidden rounded-2xl border border-ink-900/8">
            <table className="w-full text-sm">
              <tbody>
                {flagship.specs?.map(([k, v], i) => (
                  <tr key={k} className={i % 2 ? "bg-ink-50/40" : "bg-white"}>
                    <td className="w-1/3 px-5 py-3.5 font-medium text-ink-900">
                      {k}
                    </td>
                    <td className="px-5 py-3.5 font-mono text-ink-700/80">
                      {v}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* <p className="mt-4 font-mono text-[11px] text-gold-700">
            [TO CONFIRM] · Intended Use, Indications, Contraindications &amp;
            Warnings to be published verbatim from the cleared labeling.
          </p> */}
        </div>
      </section>

      {/* Where it sits in the platform */}
      {/* <section className="bg-ink-50/40 py-16 md:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="In context"
            title="The instrument is layer one of four."
            description="The MSI-120 is where data enters the platform. What makes that data useful is everything built on top of it."
            className="mb-10"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {platformLayers.map((layer) => (
              <Reveal key={layer.key}>
                <Link
                  href={`/platform#${layer.key}`}
                  className={`block h-full rounded-2xl border p-5 transition-colors ${
                    layer.key === "capture"
                      ? "border-navy-600/40 bg-white"
                      : "border-ink-900/8 bg-white/60 hover:border-navy-600/30"
                  }`}
                >
                  <span
                    className="font-mono text-xs font-bold"
                    style={{ color: layer.color }}
                  >
                    {layer.n}
                  </span>
                  <p className="mt-2 font-display text-base font-semibold text-ink-900">
                    {layer.name}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-ink-700/55">
                    {layer.role}
                  </p>
                  {layer.key === "capture" && (
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-navy-700">
                      You are here
                    </p>
                  )}
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section> */}

      <CtaBand
        title="See the MSI-120 in your clinic."
        description="Request a demonstration, discuss an evaluation, or talk to us about a research collaboration."
        primary={{ label: "Request a demonstration", href: "/contact" }}
        secondary={{ label: "For providers", href: "/providers" }}
      />
    </>
  );
}
