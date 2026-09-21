import Image from "next/image";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/** AI-Spectral Technology Corp. brand lockup. The wordmark art is black, so on dark surfaces
 *  it sits on a subtle white chip to stay legible. */
export function Logo({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
  showText?: boolean;
}) {
  const img = (
    <Image
      src="/ai-spectral-logo.png"
      alt={site.name}
      width={1325}
      height={385}
      priority={tone === "light"}
      className={cn("h-8 w-auto md:h-9", className)}
    />
  );

  if (tone === "dark") {
    return (
      <span className="inline-flex items-center rounded-lg bg-white px-2.5 py-1.5 shadow-sm">
        {img}
      </span>
    );
  }
  return img;
}
