import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-data",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const headline = `${site.name} — Digital health platform for eye care`;

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: headline,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "retinal biomarkers",
    "multispectral retinal imaging",
    "AI ophthalmology",
    "software as a medical device",
    "digital health eye care",
    "diabetic retinopathy screening",
    "dry AMD monitoring",
    "Ottawa medical imaging",
  ],
  authors: [{ name: site.legalName }],
  openGraph: {
    title: headline,
    description: site.description,
    url: `https://${site.domain}`,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: headline,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${mono.variable} h-full antialiased`}
    >
      {/* suppressHydrationWarning is here for extensions, not for our own
          markup. Grammarly and friends write attributes onto <body>
          (data-gr-ext-installed, data-new-gr-c-s-check-loaded) before React
          hydrates, which React reports as a mismatch we cannot fix from here.
          It suppresses ONE level only, so any real mismatch inside the app is
          still reported. */}
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-(--background) text-ink-800"
      >
        <a className="skip-link" href="#main-content">Skip to content</a>
        <ScrollProgress />
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
