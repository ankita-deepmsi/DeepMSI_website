"use client";

import { Lock } from "lucide-react";
import { FormField } from "./FormField";
import { Button } from "@/components/ui/Button";
import { InquiryComposer } from "./InquiryComposer";
import { site } from "@/lib/site";

/** Contact inquiry with an explicit email handoff. */
export function ContactForm() {

  return (
    <InquiryComposer recipient={site.email} subject={`${site.name} product inquiry`}>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Full name" name="name" required placeholder="Dr. Jane Doe" />
        <FormField
          label="Work email"
          name="email"
          type="email"
          required
          placeholder="you@clinic.com"
        />
        <FormField
          label="Organization"
          name="organization"
          placeholder="Clinic, lab or company"
        />
        <FormField
          label="I am a…"
          name="role"
          options={[
            "Eye-care professional",
            "Researcher / academic",
            "Distributor / reseller",
            "Industry / OEM",
            "Other",
          ]}
        />
        <FormField
          label="I'm interested in"
          name="interest"
          className="sm:col-span-2"
          options={[
            "Deep MSI (medical)",
            "Non-medical optics & illumination",
            "Partnership",
            "General enquiry",
          ]}
        />
        <FormField
          label="How can we help?"
          name="message"
          textarea
          required
          className="sm:col-span-2"
          placeholder="Tell us a little about your needs…"
        />
      </div>

      <label className="mt-5 flex items-start gap-2.5 text-sm text-ink-700/70">
        <input type="checkbox" required className="mt-0.5 accent-navy-600" />
        <span>
          I consent to {site.name} contacting me about my enquiry, per the{" "}
          <a href="/legal/privacy" className="text-navy-700 underline">
            Privacy Policy
          </a>
          .
        </span>
      </label>

      <p className="mt-3 flex items-center gap-1.5 text-xs text-ink-700/70">
        <Lock className="h-3.5 w-3.5" />
        Please do not include patient health information (PHI). This form is not
        for medical emergencies.
      </p>

      <div className="mt-6">
        <Button type="submit" size="lg" arrow>
          Prepare email
        </Button>
      </div>
    </InquiryComposer>
  );
}
