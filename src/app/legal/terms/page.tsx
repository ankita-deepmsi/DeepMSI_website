import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of Use" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use">
      <h2>Acceptance</h2>
      <p>
        By using this website you agree to these Terms. If you do not agree,
        please do not use the site. Final terms are pending legal review.
      </p>
      <h2>Informational purpose only</h2>
      <p>
        This website is for general information. It does not provide medical
        advice and is not a substitute for professional medical judgment. Product
        availability and regulatory status vary by region and are{" "}
        <strong>[TO CONFIRM]</strong>.
      </p>
      <h2>Intellectual property</h2>
      <p>
        All content, trademarks and logos are the property of {site.name} or
        their respective owners.
      </p>
      <h2>Limitation of liability</h2>
      <p>
        The site is provided &ldquo;as is&rdquo; without warranties. Full
        liability and governing-law terms are <strong>[TO CONFIRM]</strong>.
      </p>
    </LegalPage>
  );
}
