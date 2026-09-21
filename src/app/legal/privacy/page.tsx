import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <h2>Overview</h2>
      <p>
        {site.name} (&ldquo;we&rdquo;) respects your privacy. This policy
        explains what information we collect
        through this website, how we use it, and your choices. Final content is
        pending legal review and compliance with applicable Canadian (PIPEDA),
        EU (GDPR) and other regulations.
      </p>
      <h2>Information we collect</h2>
      <p>
        Information you provide through contact and partner forms (such as name,
        email and organization), and standard technical data. We do not request
        and ask that you do not submit patient health information (PHI).
      </p>
      <h2>How we use it</h2>
      <p>
        To respond to your enquiries, manage partnerships, and improve our
        services, in accordance with your consent.
      </p>
      <h2>Your choices &amp; contact</h2>
      <p>
        You may request access to or deletion of your information. Data-handling
        specifics, retention periods, and our Data Protection contact are{" "}
        <strong>[TO CONFIRM]</strong>.
      </p>
    </LegalPage>
  );
}
