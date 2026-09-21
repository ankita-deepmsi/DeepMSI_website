"use client";

import { useState } from "react";

import { FormField } from "./FormField";
import { Button } from "@/components/ui/Button";
import { InquiryComposer } from "./InquiryComposer";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const TRACKS = [
  { key: "commercial", label: "Commercial partner", hint: "Distributor · reseller · OEM" },
  { key: "research", label: "Clinical & research", hint: "Studies · academic · collaboration" },
] as const;

export function PartnerForm() {
  const [track, setTrack] = useState<(typeof TRACKS)[number]["key"]>("commercial");

  return (
    <InquiryComposer recipient={site.partnersEmail} subject={`${site.name} partnership inquiry`}>
      <input type="hidden" name="track" value={track} />
      {/* Track selector */}
      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        {TRACKS.map((t) => (
          <button
            key={t.key}
            type="button"
            data-inquiry-option
            aria-pressed={track === t.key}
            onClick={() => setTrack(t.key)}
            className={cn(
              "rounded-2xl border p-4 text-left transition-all",
              track === t.key
                ? "border-navy-600 bg-navy-50/70 ring-2 ring-navy-500/20"
                : "border-ink-900/10 hover:border-navy-600/40",
            )}
          >
            <span className="block text-sm font-semibold text-ink-900">
              {t.label}
            </span>
            <span className="mt-0.5 block text-xs text-ink-700/65">{t.hint}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Full name" name="name" required placeholder="Jane Doe" />
        <FormField
          label="Work email"
          name="email"
          type="email"
          required
          placeholder="you@company.com"
        />
        <FormField
          label="Organization"
          name="organization"
          required
          placeholder={
            track === "commercial" ? "Company name" : "Institution / lab"
          }
        />
        <FormField label="Country / region" name="country" required placeholder="Canada" />
        {track === "commercial" ? (
          <FormField
            label="Markets you serve"
            name="markets"
            className="sm:col-span-2"
            options={[
              "Ophthalmology / eye care",
              "Optical R&D",
              "Industrial QA / machine vision",
              "Education",
              "Multiple",
            ]}
          />
        ) : (
          <FormField
            label="Area of research"
            name="research"
            className="sm:col-span-2"
            placeholder="e.g. retinal imaging, AMD biomarkers, oculomics"
          />
        )}
        <FormField
          label="Tell us about the opportunity"
          name="message"
          textarea
          required
          className="sm:col-span-2"
          placeholder="What would you like to collaborate on?"
        />
      </div>

      <label className="mt-5 flex items-start gap-2.5 text-sm text-ink-700/70">
        <input type="checkbox" required className="mt-0.5 accent-navy-600" />
        <span>
          I consent to {site.name} contacting me about this application, per the{" "}
          <a href="/legal/privacy" className="text-navy-700 underline">
            Privacy Policy
          </a>
          .
        </span>
      </label>

      <div className="mt-6">
        <Button type="submit" size="lg" arrow>
          Prepare partnership email
        </Button>
      </div>
    </InquiryComposer>
  );
}
