# AI-Spectral website handover

## Stewardship record

- Original project steward and direction: **Alborz**
- Organization: **AI-Spectral / Azora Optical Solutions Inc.**
- Record prepared: **11 September 2026**
- Handover recipient: ______________________________
- Handover date: ______________________________

This document records project continuity. It is not a legal assignment of copyright, intellectual property, employment rights, or corporate ownership.

## Current project

This folder contains the Next.js website for AI-Spectral. It includes the homepage, medical and non-medical product areas, Deep MSI and technology pages, product catalogue, insights and articles, partnerships, company and contact pages, and policy drafts.

The printable whole-site review pack is:

`output/pdf/AI-Spectral-Team-Review.pdf`

It includes stable page references, handwritten note space, owner and priority fields, and a consolidated action log.

## Continue locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Before changing framework-sensitive code, read the relevant installed Next.js 16 documentation in `node_modules/next/dist/docs/`, as required by `AGENTS.md`.

## Verification

Run before sharing a revised build:

```bash
npm run lint
npm run build
```

Also review the site at desktop, tablet, and mobile widths. Check navigation, wavelength controls, forms and email handoff, product disclosures, article filtering, internal links, and all policy pages.

## Current review boundaries

- Text marked `TO CONFIRM` remains intentionally unresolved.
- Product specifications, availability, regulatory status, legal text, references, company details, contact details, and image rights require authorized human confirmation where indicated.
- Local build or browser checks do not constitute regulatory, legal, clinical, accessibility, deployment, or production approval.
- Deployment remains a separate, authorized step. This handover does not state that the current folder is deployed.
- Check `git status` before editing. Preserve unrelated or pre-existing work and do not reset or clean the working tree without Alborz's approval.

## Handover checklist

- [ ] Recipient can install dependencies and start the local site.
- [ ] Recipient has reviewed `README.md`, `AGENTS.md`, and this file.
- [ ] Recipient has received the latest printable review pack and marked decisions.
- [ ] Every requested change has a page reference, owner, priority, and acceptance check.
- [ ] All `TO CONFIRM` items have an authorized owner or remain visibly unresolved.
- [ ] Lint and production build results are recorded after the next change set.
- [ ] Deployment owner, target, and approval process are agreed separately.

## Continuation record

| Date | Contributor | Summary | Evidence or commit |
|---|---|---|---|
| 2026-09-11 | Alborz | Original stewardship and project direction recorded for handover. | Current working folder |

Future maintainers should add a short row for material milestones without removing the original stewardship record.
