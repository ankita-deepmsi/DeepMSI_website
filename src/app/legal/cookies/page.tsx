import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata: Metadata = { title: "Cookie Policy" };

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie Policy">
      <h2>About cookies</h2>
      <p>
        Cookies are small files stored on your device. This site aims to use only
        what is necessary, and to seek consent for any non-essential or analytics
        cookies.
      </p>
      <h2>Categories</h2>
      <ul>
        <li>
          <strong>Essential</strong> — required for the site to function.
        </li>
        <li>
          <strong>Analytics</strong> — only with consent; never placed on pages
          containing health information.
        </li>
      </ul>
      <h2>Managing cookies</h2>
      <p>
        You can control cookies through your browser and our consent tool. The
        full cookie inventory and consent-management details are{" "}
        <strong>[TO CONFIRM]</strong>.
      </p>
    </LegalPage>
  );
}
