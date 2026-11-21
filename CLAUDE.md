# Spine Chassis

A 3D atlas of the human spine under load. Real CT (VerSe 2020) → 3D U-Net vertebra segmentation → high-quality meshes → geometry (centreline, Cobb angle, endplate areas) → first-order posture load model → an interactive anatomy-atlas viewer in the browser. Not a diagnostic tool.

Author: Muktanan Mohapatra (github.com/tinySage). © 2026. Code: MIT. Portfolio: https://momoportfoliomukta.netlify.app (Netlify). Related repos: tinySage/TELAIO, tinySage/wingloop_llm, tinySage/APEX_Engineering_Results, tinySage/spider-stairs.

## Git workflow (mandatory)

* Never commit to main. One branch per task: feat/, fix/, perf/, chore/, docs/.
* Git identity for every commit: Muktanan Mohapatra <muktamohapatra672@gmail.com>.
* NEVER add Co-Authored-By, Claude-Session, "Generated with Claude Code" or any AI attribution to commits, PR titles or PR descriptions.
* Small commits, Conventional Commits format (feat:, fix:, docs:, perf:...).
* Task done → lint + tests pass → push → `gh pr create` (summary, changes, how to test, screenshots for UI) → `gh pr checks --watch` → fix until green → `gh pr merge --squash --delete-branch` → `git checkout main && git pull`.
* Leave nothing behind: every TODO or known bug becomes a `gh issue create`, referenced in PRs ("Closes #N"). Stale branches get deleted.
* Never commit data/, *.nii.gz, *.nii, *.pt, *.ckpt, *.pth, .env, or any file over 20 MB. Only small, compressed demo meshes go in demo_cases/.

## Layout

train/ MONAI 3D U-Net: data prep, training (Colab-ready), eval
pipeline/ segment → clean → mesh → geometry → loads
api/ FastAPI (optional local inference; never used by the live site)
web/ Vite + Three.js site (landing + viewer)
demo_cases/ precomputed cases: meshes (.glb, meshopt) + metrics.json
docs/ assets, validation, results, screenshots

## Data

VerSe 2020 (github.com/anjany/verse), real clinical CT with expert per-vertebra labels, CC BY-SA 4.0. Use the official download links from its README. Credit VerSe + BibTeX in README; demo meshes derived from VerSe carry CC BY-SA 4.0. Prefer demo cases with ≤1 mm slices and full T1–L5 coverage.

## Quality bars

* Meshes: largest connected component + hole fill + light Gaussian on each label mask → marching cubes → Taubin smoothing (not Laplacian) → decimate to ~40k tris per vertebra → meshopt compression.
* Segmentation: report per-vertebra Dice in docs/results.md; issue for any level below 0.85. Enforce top-to-bottom label order in post-processing.
* Load model: body-weight fraction above each level (cited table), F = W_above·cosθ + M/0.05, σ = F / endplate area. Validate L3/L4 against Nachemson / Wilke 1999 in docs/validation.md with a stated tolerance.
* Web: Lighthouse ≥90 performance + accessibility (mobile); 60 fps viewer; respects prefers-reduced-motion.

## Design (inspiration: anatomy3datlas.com)

Clean, professional, educational anatomy product. Dark charcoal base so the anatomy is the only bright thing on screen.

* Colours: bg #262626, deeper #1B1B1B, panels #2F2F2F, hairlines #3A3A3A, text #F2EFEA, muted #9A9690. Anatomical palette: bone #E9DFC8, disc #9FB7C9, cord/nerve #E8C15A, stress ramp bone → amber → #B3261E.
* Type: clean sans for UI (Inter), small tracked uppercase labels ("LEVEL 1 — REGION"), numbered section markers (01, 02, 03), tabular mono for every number (JetBrains Mono).
* Rendering: realistic, not cartoon. MeshPhysicalMaterial bone with subtle subsurface feel, HDR environment, soft shadows, SSAO, gentle rim light.
* Atlas behaviour: rotate 360°, layer toggles ("dissect": Bone / Discs / Cord / Stress), region tabs (Cervical · Thoracic · Lumbar · Sacral), click a vertebra → camera flies in, info card with anatomical name ("L4 — Fourth lumbar vertebra"), measurements and load.
* Landing: hero with a large render and headline, three stats (e.g. "24 vertebrae · 3 postures · 360° rotation"), region card grid, numbered method / validation / limitations sections, clean footer.
* Footer on every page: © 2026 Muktanan Mohapatra · github.com/tinySage · momoportfoliomukta.netlify.app.
* No emoji, no filler copy, no generic SaaS gradients.
