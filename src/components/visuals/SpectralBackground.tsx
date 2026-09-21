import { cn } from "@/lib/utils";

/** Ambient aurora-mesh: layered spectral radial blobs. Pure CSS (static under reduced-motion). */
export function SpectralBackground({
  className,
  intensity = 1,
}: {
  className?: string;
  intensity?: number;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <div
        className="animate-aurora absolute -left-[12%] -top-[18%] h-[60vh] w-[60vh] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, rgba(11,114,133,${0.5 * intensity}), transparent 62%)`,
        }}
      />
      <div
        className="animate-aurora absolute -right-[10%] top-[8%] h-[52vh] w-[52vh] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, rgba(184,134,11,${0.34 * intensity}), transparent 62%)`,
          animationDelay: "-6s",
        }}
      />
      <div
        className="animate-aurora absolute bottom-[-22%] left-[28%] h-[48vh] w-[48vh] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, rgba(109,91,208,${0.28 * intensity}), transparent 62%)`,
          animationDelay: "-3s",
        }}
      />
    </div>
  );
}
