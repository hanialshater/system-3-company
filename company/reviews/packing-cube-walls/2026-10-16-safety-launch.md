# Safety launch attestation: packing-cube-walls

lifehacks-safety-reviewer (Sana) · 2026-10-16 · W-1082 / ask A1 of `company/rituals/records/2026-10-16-domain-launch-lifehacks-r2.md` · lesson version 1 (meta.json on main)

**Verdict: ATTEST (no changes). Safety class: none.** Outer versus inner volume of a packing cube: arithmetic.

## What I walked
- Build: shared review server http://localhost:3591, `BUILT_FROM` = `987687acc1cc934b5eaa4f5510d2111712263532` (987687a, "Board: two-right-angles v2 merged"), read at the start and at the end of the sitting (unchanged). The same SHA is HEAD of /home/user/s3c-qa.
- `npm run walkthrough -- packing-cube-walls --url http://localhost:3591`, phone viewport, wrong-first choice, both toggles and the slider. Transcript and screenshots: `artifacts/walkthroughs/packing-cube-walls/` (gitignored; the `--out` flag wrote a nested copy under `artifacts/walkthroughs/tmp/...`, not to my scratch dir; see the sweep record's note). I read the transcript before the claims, `meta.json`, and my own 2026-10-14 source review.
- The lesson's source files are unchanged between the QA commit 6838dba and 987687a (`git diff 6838dba 987687a` over this lesson's folder and `src/lib/lifehacks`, `src/components/lifehacks`, `src/kit`, `HomeLesson.tsx` is empty), so the QA record of 2026-10-16 describes this build for this lesson (R4).

## What a learner could do wrong in real life
Nothing hurtful. The worst case is a learner who trusts 4,032 cm³ as real capacity and under-packs; the lesson says seams, zips and curved corners reduce real space, and it states no weight or airline limit, so no one is nudged to overload a bag.

## Required stage warning
None. Class none carries no warning (safety.md section 4). I checked the stage, the reveal and the trust sheet: no heat, tool, food, chemical, power, body, child, animal, lifting, drying, tall furniture, care label, cord or elastic content, and nothing that reads as advice to buy, sign or take.

## What the walkthrough showed
Stage 30x20x10 cm, wall 1 cm: usable volume 4,032 cm³ (28x18x8, checked by hand). Slider to 32 cm gives 4,320 cm³ (30x18x8 = 4,320, correct). Reveal and recall agree with the stage. The picture is labelled 'Illustrative model'.

## Wording change
None required. The limit sentence ('Real seams, zips and curved corners change usable space further') is already on the reveal.

## Region notes
None. No airline limit, standard, temperature or rule is stated.

## Limits
- I judge safety only. Fact accuracy is the fact-checker's; the claims here are all marked verified in meta.json and I did not re-verify them.
- A visible-content change to this lesson after 987687acc1cc934b5eaa4f5510d2111712263532 would need a fresh read (R4).
