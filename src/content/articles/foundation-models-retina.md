---
title: "Foundation models for the retina: from RETFound to spectral pretraining"
slug: "foundation-models-retina"
type: "feature-story"
surface: "news"
summary: "How large, pre-trained 'foundation' models are reshaping retinal AI — and why extending the paradigm into the spectral domain is a natural next step."
publishDate: "2026-05-06"
author:
  name: "AI-Spectral Technology Corp. Research"
  title: "Feature"
topics: ["AI & Technology", "Retina", "Oculomics/Systemic"]
heroAlt: "A foundation model learning from many retinal images"
toConfirm: true
---

For most of the past decade, retinal AI meant training a separate model for each task — one for diabetic retinopathy, another for AMD, another for image quality. Each needed its own large, carefully labeled dataset. **Foundation models** change that economics.

## What a foundation model does

A foundation model is pre-trained on an enormous volume of images **without task-specific labels**, learning general visual representations of the retina. It can then be adapted ("fine-tuned") to a specific task with comparatively little labeled data — and often generalizes better to new devices and populations. Publicly described retinal foundation models have demonstrated this transfer across multiple disease-detection and even systemic-prediction tasks. *[TO CONFIRM: specific models, datasets and results.]*

## The data bottleneck

The quality of a foundation model is bounded by the **richness of its input**. Most retinal foundation models to date learn from color (RGB) fundus images — three channels. That is a lot of images, but a relatively thin spectral description of each one.

## Spectral pretraining: the next axis

This is where multispectral imaging becomes interesting for AI. A multispectral capture provides **many wavelength channels per image**, each carrying depth- and chromophore-dependent information. Pre-training on spectral data could, in principle, let a model learn representations that simply are not present in RGB.

> If RGB foundation models added a new axis of *scale*, spectral pretraining adds a new axis of *signal*.

AI-Spectral Technology Corp.'s long-term thesis is to extend the foundation-model paradigm into the spectral domain — responsibly, with validation, and with the clinician in the loop. It is a direction of research and product strategy, **not a present clinical claim**.

---

*Forward-looking discussion of research strategy. Not medical advice; not a description of a cleared capability.*
