# Fact-check: wet-knit-hang-stretch

Independent claim checks for src/demos/lifehacks/wet-knit-hang-stretch. Newest pass at the bottom.

## Pass 52 (2026-10-16, Home W2)

Checker: fact-checker, a fresh instance. I did not write, build or record any of the claims checked here. Scope: Home wave W2 (r11 fix plan): the claims demo-builder reset when the lesson moved to engine 2. Method: I read the rendering code first (HomeLesson.tsx StageV2 / BowStage, src/lib/lifehacks/engine-v2.ts, home-models.ts and this lesson's home-lessons.ts spec), then ran copies in node (scratchpad fc52/scripts/home.mts) to print both Seen columns and the reveal's first sentence at the slider's start and both ends, and read meta.recall as the Feed renders it. Sources opened this pass: OpenStax College Physics 2e §13.6 and §14.6 (CNXML from the publisher's GitHub repository) and Daily-Diamond et al. 2017 (PMC OAI API). I read build.md only after the verdicts were written. No build, server or screenshot.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Limit line as rendered. Note for demo-builder: the source field still says 'g-equivalent'; the stage shows kg (resultUnit). |
| c3 | verified | Read HomeLesson.tsx StageV2 and src/lib/lifehacks/engine-v2.ts (homeColumn, homeRevealLine) first; own run of evaluateHome/homeColumn/homeRevealLine on the home-lessons.ts spec (scratchpad fc52/home.mts): case 'support-load': load = p / 2 or p / 6; at 0.6 kg: 0.3 and 0.1 kg. |
| c4 | verified | Matches the spec: title, hook (= question), options '0.3 kg' / '0.1 kg' / 'Almost nothing: it's soft', answer 0. Own run: 0.6 / 2 = 0.3 kg. Wording note for demo-builder: 'holds about 0.6 kg' can be read as the water alone; the model divides the whole wet mass, so 'weighs about 0.6 kg wet' is exact. |
| c5 | verified | Transfer prompt (spec.recall). Still not rendered: HomeLesson.tsx never reads spec.recall, and the Feed recall card uses meta.recall. Its presupposition matches the model. |
| recall | verified | Recall card: 900 ÷ 2 = 450 g, 900 ÷ 6 = 150 g; keyed option 0 is the only right one. 0.9 kg is the slider's maximum on the stage. |
| seen | verified | Read HomeLesson.tsx StageV2 and src/lib/lifehacks/engine-v2.ts (homeColumn, homeRevealLine) first; own run of evaluateHome/homeColumn/homeRevealLine on the home-lessons.ts spec (scratchpad fc52/home.mts): at p = 0.6 the reveal's first sentence is exactly the claim text. 'If the label says dry flat, lay the jumper flat' is a conditional instruction, not a fact claim. |
| c1 | held unverified | HELD UNVERIFIED. The first sentence is the model (load = p/2 or p/6, own run 0.3 / 0.1 kg at 0.6) and holds. The second, 'A care label can require flat drying', is a fact about care labelling that rests on GINETEX (ginetex.net), which this host cannot open (proxy 403); ftc.gov, ecfr.gov and govinfo.gov (the US Care Labeling Rule) are blocked too. Not verified from memory or search snippets. Needs a web-capable fact-check, or a source on an allowed host. |

**Trust-sheet check (W-1078 pattern, for this wave):** recall works 900 g, the slider's maximum (0.9 kg); no mismatch of fixture.

**Result (Pass 52):** 6 verified, 0 disputed, 1 held unverified, 0 withdrawn.

## Pass 61 (SO-10-2 [project:lifehacks-engine-v2], batch 2)

Checker: fact-checker, a fresh instance, 2026-10-16. I did not write, build or record these claims (lh-split-order-fixed-fee c5/c6 were recorded by an earlier fact-checker, FC 51, and are held for that reason). Server: http://localhost:3591, /home/user/s3c-qa/.next-review3/BUILT_FROM = 5b2fee71701e8645e3cd6e2fde60bcea004833e8 at start and end; main at 6141f65. R3a scope test (company/reviews/org/2026-10-16-r3a-scope/check.sh) passed 5b2fee7 -> main 2d6b4d5 for this lesson at the start; at 6141f65 it fails only on content/curriculum/history.json (cm-history 8bdf821), which is outside this lesson. Lesson files and src/lib/lifehacks are unchanged 2d6b4d5..6141f65.
Method: artifact first (`npm run walkthrough -- … --url http://localhost:3591`, transcript read to the trust-sheet appendix), then meta.json, then content patch r2 (company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md) row by row, then the engine on main: scripted compare of claim text with studyCatalog.ts / home-lessons.ts / resource-specs.json, and own runs of queueResult, scheduleLayout, calendarResult, homeColumn and homeRevealLine (tsx). Consolidated record: company/reviews/lifehacks-200/2026-10-16-fact-check-so-10-2-batch2.md.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | held (unverified) | HELD (blocked host www.ginetex.net, still proxy 403 / DNS failure this pass). The first sentence (equal-share model, 0.6/2 = 0.3, 0.6/6 = 0.1 kg) holds by own run; the care-label sentence still needs an opened source. Unchanged since FC 52. |
