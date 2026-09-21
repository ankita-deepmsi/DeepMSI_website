import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Accessibility Statement" };

export default function AccessibilityPage() {
  return (
    <LegalPage title="Accessibility Statement">
      <h2>Our commitment</h2>
      <p>
        {site.name} is committed to making this website accessible and usable for
        everyone. We aim to conform to the Web Content Accessibility Guidelines
        (WCAG) 2.1 Level AA.
      </p>
      <h2>Measures we take</h2>
      <ul>
        <li>Semantic structure and keyboard-navigable interfaces</li>
        <li>Visible focus states and sufficient color contrast</li>
        <li>Respect for reduced-motion preferences</li>
        <li>Descriptive alternative text for meaningful imagery</li>
      </ul>
      <h2>Feedback</h2>
      <p>
        If you encounter a barrier, please contact us so we can address it. A
        formal conformance audit and contact route are{" "}
        <strong>[TO CONFIRM]</strong>.
      </p>
    </LegalPage>
  );
}
