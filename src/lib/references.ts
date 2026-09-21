/* Verified peer-reviewed references (checked against the publisher / DOI).
   Only add an entry here AFTER confirming the citation via a primary source.
   These support general-science statements on the site; device-specific
   performance and indications remain [TO CONFIRM]. */

export type Reference = {
  id: string;
  authors: string;
  title: string;
  journal: string;
  year: number;
  doi: string;
  topic: "Multispectral imaging" | "AI & foundation models" | "AMD" | "Oculomics";
  note?: string;
};

export const references: Reference[] = [
  {
    id: "huang-2020",
    authors: "Huang Z, Jiang Z, Hu Y, et al.",
    title:
      "Retinal choroidal vessel imaging based on multi-wavelength fundus imaging with the guidance of optical coherence tomography",
    journal: "Biomedical Optics Express 11(9):5212–5224",
    year: 2020,
    doi: "10.1364/BOE.397750",
    topic: "Multispectral imaging",
    note: "Shorter wavelengths (<605 nm) predominantly imaged retinal structure; longer wavelengths (>605 nm) revealed choroidal and scleral features.",
  },
  {
    id: "zhou-2023",
    authors: "Zhou Y, Chia MA, Wagner SK, et al.",
    title: "A foundation model for generalizable disease detection from retinal images",
    journal: "Nature 622:156–163",
    year: 2023,
    doi: "10.1038/s41586-023-06555-x",
    topic: "AI & foundation models",
    note: "RETFound — self-supervised pre-training on ~1.6M retinal images, adaptable to many downstream tasks.",
  },
  {
    id: "abramoff-2018",
    authors: "Abràmoff MD, Lavin PT, Birch M, Shah N, Folk JC.",
    title:
      "Pivotal trial of an autonomous AI-based diagnostic system for detection of diabetic retinopathy in primary care offices",
    journal: "npj Digital Medicine 1:39",
    year: 2018,
    doi: "10.1038/s41746-018-0040-6",
    topic: "AI & foundation models",
    note: "Autonomous AI for diabetic retinopathy; informed the first FDA clearance of an autonomous diagnostic AI.",
  },
  {
    id: "poplin-2018",
    authors: "Poplin R, Varadarajan AV, Blumer K, et al.",
    title:
      "Prediction of cardiovascular risk factors from retinal fundus photographs via deep learning",
    journal: "Nature Biomedical Engineering 2:158–164",
    year: 2018,
    doi: "10.1038/s41551-018-0195-0",
    topic: "Oculomics",
    note: "Early oculomics work inferring systemic cardiovascular signals from retinal images.",
  },
  {
    id: "areds2-2013",
    authors: "The Age-Related Eye Disease Study 2 (AREDS2) Research Group.",
    title:
      "Lutein + zeaxanthin and omega-3 fatty acids for age-related macular degeneration (AREDS2): a randomized clinical trial",
    journal: "JAMA 309(19):2005–2015",
    year: 2013,
    doi: "10.1001/jama.2013.4997",
    topic: "AMD",
    note: "Landmark randomized trial on nutritional supplementation in age-related macular degeneration.",
  },
];

export function doiUrl(doi: string) {
  return `https://doi.org/${doi}`;
}
