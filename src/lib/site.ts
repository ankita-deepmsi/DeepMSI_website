/* ============================================================
   AI-SPECTRAL — Site content model (single source of truth)

   POSITIONING: AI-Spectral is a digital health technology company.
   The platform — capture, AI analysis, clinician interface, data
   layer — is the product. The MSI-120 instrument is layer one of
   four, not the company.

   NOTE: Items tagged with [TO CONFIRM] contain regulatory,
   clinical, or specification claims that MUST be verified and
   approved before public launch. Regulatory-pathway wording in
   particular requires sign-off from regulatory counsel.
   ============================================================ */

export const site = {
  name: "AI-Spectral Technology Corp.",
  shortName: "AI-Spectral",
  abbr: "AIS",
  legalName: "AI-Spectral Technology Corp.",
  domain: "ai-spectral.com",
  tagline: "Beyond Vision. See deeper.",
  taglineLead: "Beyond Vision.",
  taglineEmphasis: "See deeper.",
  taglineSupport:
    "An end-to-end platform for detecting, quantifying and monitoring retinal disease.",
  signature: "Beyond Vision. See deeper.",
  /* The one ownable specification — led with, the way Optos leads with
     "200° single capture". [TO CONFIRM: exact band count before launch] */
  signatureSpec: {
    value: "10",
    unit: "wavelengths",
    claim: "in a single capture",
  },
  description:
    "AI-Spectral Technology Corp. builds an end-to-end eye health platform — multispectral capture, AI biomarker analysis, a clinician interface and a connected data layer — for earlier detection and objective monitoring of retinal disease. Based in Ottawa, Canada.",
  email: "info@ai-spectral.com",
  partnersEmail: "partners@ai-spectral.com",
  city: "Ottawa",
  country: "Canada",
  location: "Ottawa, Canada",
  experienceYears: 25, // 25+ years of optical/imaging engineering experience
  // Optical instrumentation line, retained as a specialist page rather than a
  // co-equal business arm. See /optical-technologies.
  azoraSolutionsUrl: "https://azorasolutions.com", // [TO CONFIRM: exact URL]
  social: {
    linkedin: "https://www.linkedin.com/", // [TO CONFIRM]
  },
} as const;

/* ---------------------------------- Leadership ---------------------------------- */

export type Leader = {
  name: string;
  role: string;
  bio?: string;
};

export const leadership: Leader[] = [
  {
    name: "Nick Z. Ribaric",
    role: "President & Chief Executive Officer",
    // [TO CONFIRM] full biography, headshot and any additional leadership.
  },
];

/* ============================================================
   [TO CONFIRM] — WORDING STILL NEEDS NICK Z. RIBARIC'S SIGN-OFF.

   This text is now published on /about UNDER HIS NAME, but it was drafted for
   him rather than said by him. It must be approved or replaced with his own
   words before launch. Replace `text` with what he actually says; deleting
   `presidentQuote` removes the section from /about cleanly.
   ============================================================ */
export const presidentQuote = {
  text: "An instrument that takes a better picture is not enough on its own. What changes care is turning that picture into a measurement a clinician can compare — this year against last year, this patient against a reference. That is why we built the whole platform, and not just the camera.",
};

/* ---------------------------------- Navigation ---------------------------------- */

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  label: string;
  href?: string;
  children?: NavLink[];
};

/* ---------------------------------- Audiences ---------------------------------- */
/* Audience doors, in the pattern Optos uses (Patients / Providers). These sit in
   the header utility strip rather than the main nav, so they don't compete with
   the product and platform axes. */

export type Audience = {
  key: string;
  label: string;
  href: string;
  headline: string;
  description: string;
  icon: string;
};

export const audiences: Audience[] = [
  {
    key: "providers",
    label: "For Providers",
    href: "/providers",
    headline: "For eye-care professionals",
    description:
      "What the platform captures, what it measures, and how it fits a clinic day.",
    icon: "Stethoscope",
  },
  {
    key: "patients",
    label: "For Patients",
    href: "/patients",
    headline: "For patients",
    description:
      "What a multispectral retinal scan is, what to expect, and what it is not.",
    icon: "Eye",
  },
  {
    key: "partners",
    label: "For Partners",
    href: "/partners",
    headline: "For partners & industry",
    description:
      "Distribution, OEM integration, clinical research and trial collaboration.",
    icon: "Handshake",
  },
];

export const nav: NavGroup[] = [
  {
    label: "About us",
    href: "/about",
    children: [
      {
        label: "Our story",
        href: "/about",
        description: "Who we are and why we build the whole path, not one box.",
      },
      {
        label: "Evidence & regulatory",
        href: "/evidence",
        description: "Where each component stands, and what is under study.",
      },
      {
        label: "Partners",
        href: "/partners",
        description: "Distribution, OEM integration and research collaboration.",
      },
    ],
  },
  {
    label: "Products and Solutions",
    href: "/products",
    children: [
      {
        label: "MSI-120",
        href: "/products/msi-120",
        description: "The flagship multispectral retinal imaging system.",
      },
      {
        label: "The platform",
        href: "/platform",
        description:
          "DeepMSI AI, the Viewer and the data layer — how capture, analysis, review and data fit together.",
      },
      {
        label: "Clinical solutions",
        href: "/solutions",
        description: "Dry AMD, diabetic retinopathy, screening and trials.",
      },
      {
        label: "Optical technologies",
        href: "/optical-technologies",
        description: "Metrology, illumination and capture tools for the bench.",
      },
    ],
  },
  {
    label: "Insights",
    href: "/news",
  },
  {
    label: "Contact us",
    href: "/contact",
  },
];

/* ---------------------------------- Platform ---------------------------------- */
/* The four-layer architecture. This is the company's core story: the
   instrument is the source of data, not the destination. */

export type PlatformLayer = {
  n: string;
  key: string;
  role: string;
  name: string;
  /* Engraved on the face of the pyramid on the homepage. Usually the full
     name; it is separate because the face is a fixed width and the name is
     not. A \n breaks it across two lines, which the capstone needs.

     Roughly what each face carries per line, base to apex: 17, 15, 16 and 12
     characters — it is not monotonic because each tier sets its own type size.
     Overrun it and the word hangs off the edge of the solid; see LABEL_FS in
     PlatformPyramid.tsx to trade size for length. */
  short: string;
  summary: string;
  detail: string;
  points: string[];
  icon: string;
  /* Two colours, not one. `color` is the lit top of the tier and the accent
     everything else borrows — the legend numeral, the glow, the rule — so it
     has to stay legible on a dark ground. `colorDeep` is the shaded foot of
     the same hue; the face is a gradient between them, which is what stops
     the solid reading as four flat plastic slabs. */
  color: string;
  colorDeep: string;
};

export const platformLayers: PlatformLayer[] = [
  {
    n: "01",
    key: "capture",
    short: "MSI-120 Capture",
    role: "The source",
    name: "MSI-120 Capture",
    summary:
      "Multispectral acquisition across 10 discrete wavelengths with a FOV of over 100 degrees.",
    detail:
      "A standard colour fundus camera records three broad channels. The MSI-120 captures the retina across a sequence of narrow wavelength bands, each reaching a different depth and responding to different tissue; producing a spectral stack rather than a single composite photograph.",
    points: [
      "10 discrete wavelength bands per capture", // [TO CONFIRM]
      "Visible through near-infrared coverage",
      "Single-sitting acquisition, familiar to fundus workflow",
      "Automated capture-quality scoring",
    ],
    icon: "ScanEye",
    color: "#8aabe8",
    colorDeep: "#16295c",
  },
  {
    n: "02",
    key: "ai",
    short: "DeepMSI AI",
    role: "The analysis",
    name: "DeepMSI AI",
    summary:
      "Algorithms that process the multispectral stack for automated suspicious biomarker detection and segmentation.",
    detail:
      "DeepMSI AI registers and quality-checks the spectral stack, then localises and quantifies retinal biomarkers across bands, thereby turning images into structured, comparable measurements.",
    points: [
      "Automated biomarker localisation and quantification",
      "Biomarker segmentation across wavelength bands",
      "Objective, repeatable measurement for progression tracking",
      "Human-in-the-loop: every output is clinician-reviewed",
    ],
    icon: "BrainCircuit",
    color: "#6fc0e0",
    colorDeep: "#14425f",
  },
  {
    n: "03",
    key: "viewer",
    short: "DeepMSI Viewer",
    role: "The interface",
    name: "DeepMSI Viewer",
    summary:
      "A clinician-facing platform for high-fidelity reporting, labeling and cross-clinic sharing.",
    detail:
      "The Viewer is where the platform meets practice: reviewing the spectral stack band by band, comparing a patient against their own baseline, annotating findings, and producing a structured report with an audit trail for every AI suggestion.",
    points: [
      "Band-by-band review and baseline comparison",
      "Clinician labeling and annotation",
      "Structured, reviewable reporting",
      "Cross-clinic sharing and referral workflow",
    ],
    icon: "Layers",
    color: "#6fd0c4",
    colorDeep: "#155049",
  },
  {
    n: "04",
    key: "cloud",
    short: "AI-Spectral\nCloud",
    role: "The data layer",
    name: "AI-Spectral Cloud",
    summary:
      "The connected data layer: pooled, consented imaging that compounds into continuously improving models.",
    detail:
      "Every consented study adds to a growing multispectral and biomarker dataset. That dataset is what makes the next model better than the last and what makes longitudinal, cross-population comparison possible in a way that isolated instruments never allow.",
    /* The one layer carried at full depth. The other three are held to a single
       point each; this is the layer the architecture exists to reach, so it is
       allowed to say more. */
    points: [
      "Consented, de-identified multispectral archive", // [TO CONFIRM: governance model]
      "Biomarker reference set built from consented studies",
      "Longitudinal and cross-population comparison",
      "The foundation for successive model generations",
    ],
    icon: "Waves",
    color: "#e6c47a",
    colorDeep: "#6b4f1c",
  },
];

/* ---------------------------------- Products ---------------------------------- */

export type ProductStatus =
  | "Available"
  | "Investigational"
  | "In Development"
  | "Beta";

export type Product = {
  slug: string;
  name: string;
  category: "platform" | "optical";
  kicker: string;
  tagline: string;
  summary: string;
  status: ProductStatus;
  statusNote?: string;
  href: string;
  external?: boolean; // href points to an outbound site
  highlights: string[];
  icon: string; // lucide icon name
  flagship?: boolean;
  specs?: [string, string][];
};

export const products: Product[] = [
  /* ---- Platform components ---- */
  {
    slug: "msi-120",
    name: "MSI-120",
    category: "platform",
    kicker: "Layer 01 · Capture",
    tagline: "Multispectral acquisition, by design.",
    summary:
      "The capture layer of the AI-Spectral platform: a multispectral retinal imaging system that records the eye across a sequence of discrete wavelengths, producing the spectral data the rest of the platform is built on.",
    status: "Investigational",
    statusNote:
      "Investigational device, progressing toward regulatory review. Not available for sale in all regions. [TO CONFIRM: jurisdictions and review status]",
    href: "/products/msi-120",
    icon: "ScanEye",
    flagship: true,
    highlights: [
      "10 discrete wavelength bands per capture", 
      "Visible to near-infrared coverage",
      "Single sitting acquisition",
      "Automated capture quality scoring",
    ],
    /* Restored from the former Deep MSI specification table. Every figure is a
       placeholder pending confirmation against the final device and its
       cleared labeling. */
    specs: [
      ["Modality", "Multispectral fundus imaging"],
      ["Wavelength bands", "10 discrete bands"],
      ["Spectral range", "Visible → near-infrared "],
      ["Acquisition", "Sequential narrowband capture "],
      ["Capture time", "~5seconds per eye"],
      ["Field of view", "120 degrees"],
      // ["Mydriasis", "[TO CONFIRM]"],
      ["Capture quality", "Automated scoring at acquisition"],
      ["Output", "Structured report · archive-ready  · DICOM/EMR compatible"],
      ["Software", "DeepMSI AI with human-in-the-loop · DeepMSI Viewer "],
    ],
  },
  {
    slug: "deepmsi-ai",
    name: "DeepMSI AI",
    category: "platform",
    kicker: "Layer 02 · Analysis",
    tagline: "Biomarkers, quantified.",
    summary:
      "The analysis layer: machine-learning models that register the multispectral stack, localise retinal biomarkers and quantify them into objective, comparable measurements for clinician review.",
    status: "In Development",
    statusNote:
      "Software as a Medical Device (SaMD). Performance, intended population and indications pending validation. [TO CONFIRM]",
    href: "/platform#ai",
    icon: "BrainCircuit",
    highlights: [
      "Automated drusen localisation and quantification",
      "Biomarker segmentation across wavelength bands",
      "Repeatable measurement for progression tracking",
      "Audit trail for every AI suggestion",
    ],
  },
  {
    slug: "deepmsi-viewer",
    name: "DeepMSI Viewer",
    category: "platform",
    kicker: "Layer 03 · Interface",
    tagline: "Where the platform meets practice.",
    summary:
      "The clinician-facing layer: band-by-band review, baseline comparison, annotation, structured reporting and cross-clinic sharing — the day-to-day surface of the platform.",
    status: "In Development",
    statusNote: "Feature set and deployment model [TO CONFIRM].",
    href: "/platform#viewer",
    icon: "Layers",
    highlights: [
      "Band-by-band review and baseline comparison",
      "Structured, reviewable reporting",
      "Clinician labeling and annotation",
      "Cross-clinic sharing and referral workflow",
    ],
  },
  {
    slug: "ai-spectral-cloud",
    name: "AI-Spectral Cloud",
    category: "platform",
    kicker: "Layer 04 · Data",
    tagline: "The dataset that compounds.",
    summary:
      "The connected data layer: consented, de-identified multispectral imaging and biomarker records that accumulate into a reference dataset — the foundation for successive generations of models.",
    status: "In Development",
    statusNote:
      "Data governance, residency and consent model [TO CONFIRM].",
    href: "/platform#cloud",
    icon: "Waves",
    highlights: [
      "Consented, de-identified multispectral archive",
      "Proprietary biomarker reference database",
      "Longitudinal and cross-population comparison",
      "Foundation for continuous model development",
    ],
  },

  /* ---- Optical instrumentation (specialist line, not a co-equal arm) ---- */
  {
    slug: "mtf-analyzer",
    name: "MTF Analyzer",
    category: "optical",
    kicker: "Optical metrology",
    tagline: "Quantify resolution. Trust your optics.",
    summary:
      "A desktop toolset for measuring the Modulation Transfer Function and resolution of lenses, cameras and imaging systems using slanted-edge and USAF-target methods.",
    status: "Available",
    href: "/optical-technologies#metrology",
    icon: "Crosshair",
    highlights: [
      "Slanted-edge & USAF 1951 target analysis",
      "Through-focus and best-focus determination",
      "Per-field MTF curves and CSV export",
      "Runs on the bench — no cloud required",
    ],
  },
  {
    slug: "spectral-light-box",
    name: "Spectral Light Box",
    category: "optical",
    kicker: "Multi-wavelength source",
    tagline: "Every wavelength, under your command.",
    summary:
      "A programmable LED light box with independent control of wavelength, power and timing — per-channel intensity, microsecond strobe and camera triggering for repeatable multispectral setups.",
    status: "Available",
    href: "/optical-technologies#illumination",
    icon: "Sun",
    highlights: [
      "Independent multi-wavelength LED channels (UV–VIS–NIR)", // [TO CONFIRM: exact channels]
      "Programmable per-channel power & dimming",
      "Microsecond strobe / exposure timing & camera trigger I/O",
      "Uniform, calibrated illumination field",
    ],
  },
  {
    slug: "illumination-qa",
    name: "Illumination QA Suite",
    category: "optical",
    kicker: "Light & LED test",
    tagline: "Characterize every source.",
    summary:
      "Tools to drive, sequence and characterize LED and multi-channel light sources — uniformity, intensity and spectral behaviour — for imaging systems and production lines.",
    status: "Available",
    href: "/optical-technologies#illumination",
    icon: "Lightbulb",
    highlights: [
      "Per-channel LED control & sequencing",
      "Uniformity and intensity mapping",
      "Spectral channel verification",
      "Scriptable test routines",
    ],
  },
  {
    slug: "lab-illumination-diagnostic",
    name: "Lab Illumination & Diagnostic System",
    category: "optical",
    kicker: "Benchtop system",
    tagline: "Illuminate, measure, decide — at the bench.",
    summary:
      "An integrated benchtop platform combining programmable multi-source illumination with optical measurement and diagnostics — for research labs and QA benches that need repeatable lighting and quantitative readouts in one system.",
    status: "In Development",
    statusNote:
      "For research and industrial use only — not a medical device. [TO CONFIRM: configurations]",
    href: "/optical-technologies#illumination",
    icon: "FlaskConical",
    highlights: [
      "Configurable multi-source spectral illumination",
      "Integrated optical measurement & diagnostics",
      "Scriptable test & acquisition protocols",
      "Data logging and export",
    ],
  },
  /* ---- Removed from the line ----------------------------------------------
     The Spectral Capture SDK and Azora Solutions are commented out because
     neither is our product any more. They are left here rather than deleted so
     the copy is recoverable.

     Uncommenting either one puts it back on /optical-technologies and into the
     "The line" contents list on /products automatically — both read
     `opticalProducts`. Two things would need doing by hand:
       - the SDK's href is "/optical-technologies#sdk", and that anchor now sits
         on a commented-out notice strip on that page;
       - this page's metadata description no longer mentions the SDK.

     Note also /partners still lists "Spectral Capture SDK & data tools" as a
     research-collaboration benefit. That line is now stale and was left alone.
     ---------------------------------------------------------------------- */

  // {
  //   slug: "spectral-sdk",
  //   name: "Spectral Capture SDK",
  //   category: "optical",
  //   kicker: "OEM · Research",
  //   tagline: "Multispectral acquisition, in your stack.",
  //   summary:
  //     "The acquisition and pipeline engine behind our imaging platform, offered to OEMs and research groups: synchronized multi-wavelength capture, calibration and a clean data model.",
  //   status: "Beta",
  //   statusNote: "Available under evaluation agreement. [TO CONFIRM]",
  //   href: "/optical-technologies#sdk",
  //   icon: "Layers",
  //   highlights: [
  //     "Synchronized multi-wavelength capture",
  //     "Flat-field & spectral calibration utilities",
  //     "Open data model + export",
  //     "Cross-platform capture pipeline",
  //   ],
  // },
  // {
  //   slug: "azora-solutions",
  //   name: "Azora Solutions",
  //   category: "optical",
  //   kicker: "Partner software",
  //   tagline: "Business & personal software, by Azora.",
  //   summary:
  //     "A partner software suite from Azora Solutions — local-first business and personal productivity tools spanning finance, portfolio and operations. Explore it on the Azora Solutions website.",
  //   status: "Available",
  //   href: site.azoraSolutionsUrl,
  //   external: true,
  //   icon: "AppWindow",
  //   highlights: [
  //     "Business & personal finance tracking",
  //     "Portfolio & operations tools",
  //     "Local-first and privacy-respecting",
  //     "Visit the Azora Solutions website",
  //   ],
  // },
];

export const platformProducts = products.filter(
  (p) => p.category === "platform",
);
export const flagship = products.find((p) => p.flagship)!;
export const opticalProducts = products.filter((p) => p.category === "optical");

/* ---------------------------------- Solutions ---------------------------------- */
/* Disease areas and customer segments — the "who this is for" layer that sits
   above the platform architecture. */

export type Solution = {
  id: string;
  /* Per-solution accent. The site is navy and black; these four colours are the
     one place colour is used to tell the disease areas apart at a glance. */
  accent: string;
  eyebrow: string;
  title: string;
  problem: string;
  approach: string;
  points: string[];
  icon: string;
  /* Several captures per finding, stepped through on the page. Each is the
     picture as the case deck crops it, with the deck's own annotation arrows
     drawn back on — extracting the media alone loses them, because they are
     PowerPoint connectors sitting over the picture.

     Captions name the case and say the image is de-identified. They are
     illustrative, not evidence; the page says so above them. */
  frames: { src: string; alt: string; caption: string }[];
};

export const solutions: Solution[] = [
  /* Four retinal findings, taken from the internal case deck ("For website.pptx"),
     which holds 33 slides of MSI-120 captures shown beside colour fundus, FAF
     and HD-OCT for the same eye.

     These are FINDINGS, not diseases. Drusen and geographic atrophy are stages
     of AMD, choroidal neovascularisation is its neovascular form, and a nevus
     is a benign lesion that is monitored rather than treated. Framing the page
     around what the instrument records, rather than around diagnoses it makes,
     is also the only framing available: nothing here has been through clinical
     validation, so no detection or performance claim can be attached to it.

     `problem` says what the finding is and why it is tracked; `approach` says
     what the platform is pointed at. Neither asserts performance. */
  {
    id: "drusen",
    accent: "#a87b12",
    eyebrow: "Retinal finding",
    title: "Drusen",
    problem:
      "Extracellular deposits that accumulate between the retinal pigment epithelium and Bruch's membrane. Their number, size and confluence are what early and intermediate age-related macular degeneration is staged on, and staging depends on judging change across visits that may be a year apart.",
    approach:
      "Drusen sit at a depth that different wavelengths reach differently, so the same deposit does not present the same way across the spectral stack. The platform records that whole stack in one sitting and holds it against the same patient's earlier capture, so a reader is comparing like with like rather than recalling an impression.",
    points: [
      "Soft, confluent and cuticular drusen across the case series",
      "Drusenoid pigment epithelial detachment",
      "Drusen with overlying pigment migration",
      "Band-by-band review against the patient's own baseline",
    ],
    icon: "Eye",
    frames: [
      {
        src: "/findings/drusen-1.jpg",
        alt: "A multispectral capture showing soft and confluent drusen across the posterior pole",
        caption: "Soft and confluent drusen",
      },
      {
        src: "/findings/drusen-2.jpg",
        alt: "A multispectral capture with arrows marking drusen with overlying hyperpigmentation",
        caption:
          "Soft drusen with overlying pigment (arrowed)",
      },
      {
        src: "/findings/drusen-3.jpg",
        alt: "A multispectral capture with arrows marking an area of confluent drusen",
        caption: "Confluent drusen (arrowed)",
      },
    ],

  },
  {
    id: "ga",
    accent: "#b5332a",
    eyebrow: "Retinal finding",
    title: "Geographic atrophy",
    problem:
      "Sharply demarcated loss of the retinal pigment epithelium, photoreceptors and choriocapillaris — the late, non-neovascular stage of AMD. What matters clinically is not that a lesion is present but how fast its area is growing, which is a measurement problem rather than a recognition one.",
    approach:
      "Where the pigment epithelium has gone, the choroid beneath it is no longer screened, and the longer wavelengths in the stack reach that layer. The platform's job here is to record lesion extent the same way at every visit so that growth is a difference between two measurements.",
    points: [
      "Atrophic area seen against the underlying choroidal pattern",
      "Lesion margins recorded consistently between visits",
      "Multifocal and confluent atrophy across the case series",
      "Captured alongside FAF and OCT for the same eye",
    ],
    icon: "Scan",
    frames: [
      {
        src: "/findings/ga-1.jpg",
        alt: "A multispectral capture with arrows marking the margins of an area of geographic atrophy",
        caption: "Atrophic margins (arrowed)",
      },
      {
        src: "/findings/ga-2.jpg",
        alt: "A multispectral capture showing geographic atrophy with the choroidal vasculature visible through it",
        caption: "Geographic atrophy",
      },
      {
        src: "/findings/ga-3.jpg",
        alt: "A multispectral capture showing a multifocal area of atrophy beside the optic disc",
        caption: "Geographic atrophy",
      },
    ],

  },
  {
    id: "cnv",
    accent: "#634699",
    eyebrow: "Retinal finding",
    title: "Choroidal neovascularisation",
    problem:
      "New vessels growing from the choroid through Bruch's membrane — the neovascular form of AMD, and the one where time matters most. It is identified on angiography and OCT; the question in a screening or review setting is which eyes should be sent for those tests.",
    approach:
      "The longer bands in the stack reach the choroid, which is where the process begins. The platform's role here is to surface eyes for review, not to make the call: confirmation is an angiographic and tomographic question and stays with the clinician.",
    points: [
      "Deeper bands reach the choroidal layer where the process starts",
      "Captured alongside ICGA and OCT for the same eye",
      "Flags for review — confirmation stays with angiography and OCT",
      "Longitudinal capture where a suspected lesion is being watched",
    ],
    icon: "GitBranch",
    frames: [
      {
        src: "/findings/cnv-1.jpg",
        alt: "A multispectral capture with an arrow marking a lesion under review",
        caption:
          "Suspected lesion (arrowed)",
      },
      // {
      //   src: "/findings/cnv-2.jpg",
      //   alt: "A second view of the same eye, showing the retinal vasculature over the lesion",
      //   caption: "The same eye, a second view · AZ Case-2222, OD · de-identified",
      // },
      {
        src: "/findings/cnv-3.jpg",
        alt: "A third view of the same eye, reaching the choroidal layer",
        caption: "The same eye, reaching deeper",
      },
    ],

  },
  {
    id: "nevus",
    accent: "#166f94",
    eyebrow: "Retinal finding",
    title: "Choroidal nevus",
    problem:
      "A benign pigmented lesion of the choroid, common enough to be an incidental finding and important because it has to be told apart from melanoma and then watched. That surveillance runs for years, which makes consistency between visits the whole task.",
    approach:
      "A nevus sits below the retina, so how much of it a given wavelength shows depends on how deep that wavelength reaches. Recording the full stack gives a documented margin to compare against, rather than a single photograph and a note.",
    points: [
      "Near-invisible at 580 nm, sharply bounded at 780 nm",
      "One eye recorded across the spectrum in a single sitting",
      "Margins documented for comparison at the next visit",
      "Pseudocolour and single-band views of the same capture",
    ],
    icon: "Circle",
    /* One eye across four bands rather than four different eyes. The lesion is
       all but invisible at 580 nm and unmistakable at 780 nm, which is the
       argument for multispectral capture made in a single case — a comparison
       no one-shot camera can produce. Band labels are the deck's own. */
    frames: [
      {
        src: "/findings/nevus-1.jpg",
        alt: "A pseudocolour multispectral capture of an eye with a choroidal nevus beside the optic disc",
        caption: "Choroidal retinal image",
      },
      // {
      //   src: "/findings/nevus-2.jpg",
      //   alt: "The same eye at 580 nanometres, where the nevus is barely distinguishable from surrounding retina",
      //   caption: "580 nm — the lesion barely separates from its surround · AZU Case-016, OS",
      // },
      {
        src: "/findings/nevus-3.jpg",
        alt: "The same eye at 780 nanometres, where the nevus stands out as a sharply bounded dark lesion",
        caption: "780 nm — the same lesion",
      },
      {
        src: "/findings/nevus-4.jpg",
        alt: "The same eye at 940 nanometres, showing the lesion against deeper choroidal detail",
        caption: "940 nm — against deeper choroidal detail",
      },
    ],

  },
];

/* ---------------------------------- Care settings ---------------------------------- */
/* WHERE the platform is deployed, as distinct from `solutions` above, which is
   WHAT it is pointed at (disease areas and industry segments). The homepage
   "Where it applies" section is about settings — a clinic, a screening
   programme, a trial site — so it reads from here. The /solutions and
   /providers pages still read from `solutions`.

   These describe intended application only. Nothing here is a claim of
   diagnostic performance; indications and validated performance come from
   clinical study and regulatory review. See the disclaimer on /solutions. */

export type Setting = {
  id: string;
  /* Reuses the four solution accents so the card system stays one language. */
  accent: string;
  eyebrow: string;
  title: string;
  summary: string;
  points: string[];
  icon: string;
  href: string;
};

export const settings: Setting[] = [
  {
    id: "primary-eye-care",
    accent: "#166f94",
    eyebrow: "First contact",
    title: "Optometry & primary eye care",
    summary:
      "Often where a patient is seen first, and where the question is who needs a specialist.",
    points: [
      // "Capture-quality scoring at acquisition",
      // "Structured output to support referral decisions",
      // "Central review for images captured on site",
      // "Shared record travels with the referral",
    ],
    icon: "Eye",
    href: "/providers",
  },
  {
    id: "ophthalmology",
    accent: "#a87b12",
    eyebrow: "Specialist practice",
    title: "Ophthalmology & retina clinics",
    summary:
      "Band-by-band review and quantified biomarkers let a patient be compared against their own baseline.",
    points: [
      "Band-by-band review of the spectral stack",
      "Baseline-relative progression tracking",
      "Clinician labeling and annotation",
      "Structured, reviewable reporting",
    ],
    icon: "Stethoscope",
    href: "/providers",
  },
  // {
  //   id: "screening",
  //   accent: "#634699",
  //   eyebrow: "Population scale",
  //   title: "Screening programmes & networks",
  //   summary:
  //     "A connected platform means every site captures the same way, is analysed by the same models, and contributes to a shared record that can be reviewed and audited centrally.",
  //   points: [
  //     "Consistent capture protocol across sites",
  //     "Centralised review and cross-clinic sharing",
  //     "Auditable record for every study",
  //     "Referral prioritisation support",
  //   ],
  //   icon: "Network",
  //   href: "/solutions#screening",
  // },
  // {
  //   id: "research",
  //   accent: "#b5332a",
  //   eyebrow: "Evidence & industry",
  //   title: "Research & clinical trials",
  //   summary:
  //     "Quantified biomarkers give trial teams an objective imaging endpoint and a basis for stratifying patients by early-stage disease — supporting both enrolment and response measurement.",
  //   points: [
  //     "Quantitative imaging endpoints",
  //     "Early-stage patient stratification",
  //     "Consistent multi-centre acquisition",
  //     "Structured data export for analysis",
  //   ],
  //   icon: "FlaskConical",
  //   href: "/partners",
  // },
];

/* --- Non-medical markets (optical instrumentation page) --- */
export const markets: { title: string; blurb: string; icon: string }[] = [
  {
    title: "Optical R&D",
    blurb: "Lens design verification, prototype evaluation and tolerancing.",
    icon: "Microscope",
  },
  {
    title: "Industrial QA",
    blurb: "Production-line resolution and illumination acceptance testing.",
    icon: "Factory",
  },
  {
    title: "Machine Vision",
    blurb: "Characterize cameras, optics and lighting before deployment.",
    icon: "Camera",
  },
  {
    title: "Academia & Education",
    blurb: "Teaching optics, imaging science and spectral methods.",
    icon: "GraduationCap",
  },
];

/* --- Why us / differentiators --- */
export const pillars: { title: string; blurb: string; icon: string }[] = [
  {
    title: "The platform is the product",
    blurb:
      "Capture, analysis, interface and data are built as one system. The instrument is where data enters — not where the value ends.",
    icon: "Layers",
  },
  {
    title: "Measurement, not impression",
    blurb:
      "Biomarkers are localised and quantified, so a finding can be compared against the same patient last year and against a reference population.",
    icon: "Activity",
  },
  {
    title: "AI that assists clinicians",
    blurb:
      "Human-in-the-loop from capture to report, with an audit trail for every suggestion. The professional stays in control of every decision.",
    icon: "BrainCircuit",
  },
  {
    title: "Data that compounds",
    blurb:
      "Every consented study strengthens the reference dataset, and the dataset is what makes each generation of models better than the last.",
    icon: "Waves",
  },
];

/* --- Clinical applications (retained for the medical overview page) --- */
export const applications: { title: string; blurb: string; icon: string }[] = [
  {
    title: "Age-related Macular Degeneration",
    blurb:
      "Quantify drusen and sub-retinal change across wavelengths that reach different depths.",
    icon: "Eye",
  },
  {
    title: "Diabetic Retinopathy",
    blurb:
      "Surface microvascular and hemorrhagic signals to support earlier, structured screening.",
    icon: "Droplets",
  },
  {
    title: "Glaucoma",
    blurb:
      "Assess the optic nerve head and retinal nerve fibre layer alongside the spectral record.",
    icon: "CircleDot",
  },
  {
    title: "Vascular & Systemic Signs",
    blurb:
      "The retina is a window to systemic health — image hemoglobin- and melanin-related contrast.",
    icon: "Activity",
  },
];
