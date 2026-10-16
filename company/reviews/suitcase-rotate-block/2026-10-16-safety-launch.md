# Safety launch attestation: suitcase-rotate-block

lifehacks-safety-reviewer (Sana) · 2026-10-16 · W-1082 / ask A1 of `company/rituals/records/2026-10-16-domain-launch-lifehacks-r2.md` · lesson version 2 (meta.json on main)

**Verdict: ATTEST (no changes). Safety class: none.** Rotating rigid rectangles in a bag: counting fit.

## What I walked
- Build: shared review server http://localhost:3591, `BUILT_FROM` = `987687acc1cc934b5eaa4f5510d2111712263532` (987687a, "Board: two-right-angles v2 merged"), read at the start and at the end of the sitting (unchanged). The same SHA is HEAD of /home/user/s3c-qa.
- `npm run walkthrough -- suitcase-rotate-block --url http://localhost:3591`, phone viewport, wrong-first choice, both toggles and the slider. Transcript and screenshots: `artifacts/walkthroughs/suitcase-rotate-block/` (gitignored; the `--out` flag wrote a nested copy under `artifacts/walkthroughs/tmp/...`, not to my scratch dir; see the sweep record's note). I read the transcript before the claims, `meta.json`, and my own 2026-10-14 source review.
- The lesson's source files are unchanged between the QA commit 6838dba and 987687a (`git diff 6838dba 987687a` over this lesson's folder and `src/lib/lifehacks`, `src/components/lifehacks`, `src/kit`, `HomeLesson.tsx` is empty), so the QA record of 2026-10-16 describes this build for this lesson (R4).

## What a learner could do wrong in real life
Nothing hurtful. A learner could take 'rotate and fit more' into a real suitcase and pack it heavier. The lesson states no weight or airline limit, and the reveal says real clothes are not rigid rectangles. The travel strand's 'check your airline's current limits' line is triggered only by a stated limit, and none is stated.

## Required stage warning
None. Class none carries no warning (safety.md section 4). I checked the stage, the reveal and the trust sheet: no heat, tool, food, chemical, power, body, child, animal, lifting, drying, tall furniture, care label, cord or elastic content, and nothing that reads as advice to buy, sign or take.

## What the walkthrough showed
Bag 30x36 cm, block 18x12: long way 3, quarter-turn 4 (1x3 and 2x2 checked by hand). Slider at 32 cm: still 4. Reveal: rigid rectangles, no compression or overlap.

## Wording change
None required. None for safety. Hand-off to the fact-checker (W-1078, not mine): the recall text on the trust sheet ('3 blocks across 30 cm (10 cm each) and 2 rows along 40 cm (20 cm each): 3 x 2 = 6') uses a different bag and block from the stage (30x36 cm, 18x12 cm blocks, answer 4). R6 expects recall on the stage's own fixture. It is a trust-sheet match question, not a safety one, so it does not change my verdict.

## Region notes
None. No airline limit, standard, temperature or rule is stated.

## Limits
- I judge safety only. Fact accuracy is the fact-checker's; the claims here are all marked verified in meta.json and I did not re-verify them.
- A visible-content change to this lesson after 987687acc1cc934b5eaa4f5510d2111712263532 would need a fresh read (R4).
