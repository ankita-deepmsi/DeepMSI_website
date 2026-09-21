/* The ten aligned OD captures, ordered short → long wavelength.
   Colours approximate the perceived hue of each band and are used for the
   readouts and band indicators — near-infrared has no visible colour, so those
   are represented on a cool-to-deep ramp.
   [TO CONFIRM] band-to-structure descriptions before launch. */

export type Wavelength = {
  nm: number;
  src: string;
  band: "Visible" | "Near-infrared";
  reveals: string;
  color: string;
};

export const WAVELENGTHS: Wavelength[] = [
  { nm: 580, src: "/fundus/spectral/msi-580.webp", band: "Visible", reveals: "Inner retina · vessel detail", color: "#e8c65f" },
  { nm: 590, src: "/fundus/spectral/msi-590.webp", band: "Visible", reveals: "Hemoglobin contrast", color: "#e9a94f" },
  { nm: 660, src: "/fundus/spectral/msi-660.webp", band: "Visible", reveals: "Macular region", color: "#e0705a" },
  { nm: 680, src: "/fundus/spectral/msi-680.webp", band: "Visible", reveals: "Toward the pigment epithelium", color: "#cf5a63" },
  { nm: 740, src: "/fundus/spectral/msi-740.webp", band: "Near-infrared", reveals: "Pigment epithelium", color: "#a86ea8" },
  { nm: 760, src: "/fundus/spectral/msi-760.webp", band: "Near-infrared", reveals: "Sub-retinal detail", color: "#8d78bd" },
  { nm: 780, src: "/fundus/spectral/msi-780.webp", band: "Near-infrared", reveals: "Deeper sub-retinal layers", color: "#7585c6" },
  { nm: 810, src: "/fundus/spectral/msi-810.webp", band: "Near-infrared", reveals: "Choroidal boundary", color: "#5f92c9" },
  { nm: 850, src: "/fundus/spectral/msi-850.webp", band: "Near-infrared", reveals: "Choroidal vasculature", color: "#4f9cc4" },
  { nm: 940, src: "/fundus/spectral/msi-940.webp", band: "Near-infrared", reveals: "Deepest penetration", color: "#48a6b8" },
];
