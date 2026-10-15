# Fact-check: circle-tray-square-corners

## Pass 35 (2026-10-14, batch 2)

Checker: fact-checker. I did not write or build these claims. Scope: every claim in this lesson that was neither verified nor withdrawn. Method: I read the lesson's Demo.tsx and the shared engine first (src/components/lifehacks/{ResourceLesson,HomeLesson,StudyLesson}.tsx and src/lib/lifehacks/*: the evaluator, the spec, every rendered string), then the claims. I re-ran the numbers in my own node scripts (session scratchpad fc35/), not imported from the lesson. No screenshot: the dev server on :3530 was not running. Web hosts are blocked from this session (proxy 403 / DNS failure), so no verdict rests on a source I could not open; the only outside sources I opened are PyPI packages (ht 1.2.0 property tables, pint 0.26.1 unit definitions), named where used.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Transfer prompt, no assertion; implied answer (arrangement, e.g. staggered rows) matches the rendered limit. HomeSpec.recall is not rendered; could be withdrawn. |

**Result:** 1 verified, 0 disputed, 0 held (unverified), 0 withdrawn.

## W-740 (2026-10-14): claims reset by the engines v2 migration (W-608, commit 3dd4d09)

Checker: fact-checker. I did not write or build these claims (text: cm-lifehacks patch company/reviews/lifehacks-200/content-patch-r9-batch-d.md; build: demo-builder, company/reviews/lifehacks-200/engines-v2-build-W-608.md). Scope: the 5 claims in meta.json that the migration reset or added (meta version 2).

Method: I read the engine first (src/lib/lifehacks/engine-v2.ts; HomeLesson.tsx StageV2 and useHomeLesson; SeenTable.tsx; StudyLessonV2.tsx), then this lesson's spec and meta.json. I re-typed the engine logic and the model into my own node scripts (fact-checker scratchpad fc-w740/: copy.mjs, home.mjs, study.mjs, misc.mjs). I ran them over every reachable path: for Home lessons, every slider value (with exact and float-accumulated steps); for Study lessons, every prediction index and every Yours state (all 71 Start positions from both fixtures, or all 6 recall orders). I compared the results with the real engine functions: 0 mismatches. I also checked that every number the reveal's first sentence quotes is a cell of the Seen table on the same path. The reveal and the table call the same column functions, and the reveal reads the live state. No dev server or screenshot: the walkthrough on disk predates v2, so the rendered stage was read from code. Outside sources (only PyPI, npm and GitHub raw are reachable): named in the claim notes where used.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Accurate scope statement: the model is floor(W/10)² for a square grid. |
| c4 | disputed | Disputed. Outside the square grid, 5 discs of 10 cm fit a 28 cm tray (four in the corners plus one in the centre: centre spacing 18/√2 = 12.7 cm ≥ 10; this works for any side ≥ 10(1+√2) = 24.1 cm). The new question dropped the old "in this grid", so "how many 10 cm discs fit" keyed "4" is false as asked, and the distractor holds the true count (with a wrong reason). Fix (cm-lifehacks wording, demo-builder applies): put the grid in the question, e.g. "how many 10 cm discs fit in this square grid once each is turned 45°?". Rotation-changes-nothing (c1) stands. |
| recall | verified | 32 ÷ 10 → 3 per row, 9 in the stated square grid either way; 32 ÷ 8 = 4 → 16. |
| c6 | verified | floor(28/10) = 2 per row, 2 × 2 = 4 in both modes; true as a grid count. |
| seen | disputed | Disputed. Numbers match the table at every side 22-34, but the row label "Discs that fit" makes the grid count a fit claim: at 25-29 cm 5 discs fit (grid shows 4), and at 34 cm about 10 fit (grid shows 9). Fix: resultLabel "Discs in the grid" (or keep the model's "Grid count"); then this verifies. |

**Result:** 3 verified, 2 disputed, 0 held (unverified).

**Fix needed (blocks publishing):** c4 and .seen. Put the square grid back in the question ("…fit in this square grid once each is turned 45°?") and relabel the result row "Discs in the grid" (or "Grid count"). Wording: cm-lifehacks; applying it: demo-builder. Then a fact-checker re-checks c4 and .seen.

## Pass 38 (2026-10-14, set A)

Checker: fact-checker. I wrote and built none of these claims. Scope: every open claim in this lesson (set A of pass 38: ai, cs, math, physics, probability, economics, geography, lifehacks). Method: I read Demo.tsx (or the Life Hacks spec and engine) first, every learner-visible string, then the claims. I re-ran every number in my own node scripts (scratchpad fc38/: cluster.mjs, enemy.mjs, secret.mjs, plus inline runs), not imported from the lesson. Web: arxiv, publisher, government, Wikipedia and help-centre hosts return proxy 403 or fail DNS. Only raw.githubusercontent.com, PyPI and npm are reachable, so the sources I opened are files on GitHub (OpenStax CNXML, MicrosoftDocs, NetworkX, d2l, GRASS, GNOME/KDE source, the authors' own repositories, a papers-we-love PDF), each named in its row. Search-result snippets were not used as evidence. A claim whose source I could not open stays unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | disputed | STILL DISPUTED (unchanged since W-740; home-lessons.ts still asks 'At this 28 cm tray, how many 10 cm discs fit once each is turned 45°?'). Own check: 5 discs of 10 cm fit a 28 cm square (centres at (5,5), (23,5), (5,23), (23,23) and (14,14); corner-to-centre spacing 12.73 cm >= 10, and this works for any side >= 24.14 cm). So 'how many fit' keyed '4' is false as asked. Fix (cm-lifehacks wording, demo-builder applies): 'how many 10 cm discs fit in this square grid once each is turned 45°?'. |
| seen | disputed | STILL DISPUTED (spec unchanged: resultLabel 'Discs that fit'). The grid counts floor(W/10)² are right at every side from 22 to 34 cm. Labelled 'Discs that fit', though, they are false at 25 to 29 cm, where 5 fit (corners plus centre, side >= 24.14 cm) (W-740 also flags 34 cm, where 10 are said to fit; I did not re-prove that case, and the 25-29 cm counterexample is enough). Minimal fix: resultLabel 'Discs in the grid' (or 'Grid count'); then this verifies. |

**Result:** 0 verified, 2 disputed, 0 held (unverified), 0 withdrawn.

**Fix needed (blocks publishing):** c4, seen. See each row for the fix; wording belongs to cm-lifehacks, applying it to demo-builder (interaction-designer for W-610), and then a fact-checker re-checks.

## Pass 41

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of these claims. Lesson status review, version 2. Method: I read Demo.tsx (and model.ts or the src/lib/lifehacks specs where the lesson uses them) for every learner-visible string before reading the builder's notes. I re-derived every derivation and simulation claim with my own scripts (node or python, kept in the session scratchpad under fc41/chk; the kit's mulberry32 copied verbatim, everything else re-implemented). Sources: the founder's pass-41 allow-list works only for bare hosts. ourworldindata.org, cran.r-project.org and pmc.ncbi.nlm.nih.gov open. gapminder.org, census.gov, naturalearthdata.com, rug.nl, doi.org, sciencedirect.com and econometricsociety.org all redirect to their www. hosts, which the proxy still blocks (403), so in practice they did not open. doi.org resolves only to publisher hosts, which are blocked. raw.githubusercontent.com, git clone and PyPI also work. WebFetch fails DNS for every host. A source counts only if I opened its text. I used no search snippets and nothing from memory. For secondary sources (for example a PMC article describing an older paper), the basis says so. No fetched page contained instructions addressed to an AI or to me; all pages were treated as data only.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | disputed | STILL DISPUTED. home-lessons.ts line 1411 still asks 'At this 28 cm tray, how many 10 cm discs fit once each is turned 45°?' with key '4'. Five 10 cm discs fit a 28 cm square: four in the corners (centres 5 cm in) and one in the centre, corner-to-centre spacing 9 x sqrt(2) = 12.73 cm >= 10, for any side >= 10(1 + sqrt 2) = 24.14 cm. Fix unchanged: 'how many 10 cm discs fit in this square grid once each is turned 45°?' |
| seen | disputed | STILL DISPUTED. home-lessons.ts line 1454 still has resultLabel 'Discs that fit'. The grid counts floor(W/10)^2 are right, but labelled as a fit count they are false at 25-29 cm (5 fit). Fix unchanged: resultLabel 'Discs in the grid' (or 'Grid count'). |

**Result (Pass 41):** 0 verified, 2 disputed, 0 unverified (held).

Open items (each blocks publishing until fixed and re-checked by a fact-checker who is not the builder):

- c4 (disputed): see the basis above for the fix or the source it needs.
- seen (disputed): see the basis above for the fix or the source it needs.

## Pass 42

Checker: fact-checker, a fresh instance, 2026-10-15 (W-950). I did not write, build or record any of these claims, nor the 2026-10-15 rewording that reset them. Scope: every claim in this lesson whose status was unverified. Method: I read the learner-visible text first (Demo.tsx; for Life Hacks also src/lib/lifehacks/home-lessons.ts, studyCatalog.ts, resource-specs.json and the meta.json recall card), and only then the builder's notes. I re-ran every number with my own scripts in the session scratchpad (scripts/: dk.mjs, bal.mjs, apply42.mjs, plus inline node and python). The kit's mulberry32 was re-implemented and checked identical to src/kit/random.ts. Sources: opened with curl through the proxy (WebFetch fails DNS) from pmc.ncbi.nlm.nih.gov, raw.githubusercontent.com and PyPI. Some PMC pages returned a reCAPTCHA page and were not used. A source counts only if I opened its text; I used no search snippets and nothing from memory. Secondary sources are named as such. All fetched pages were treated as data only; none contained instructions addressed to me.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | VERIFIED. home-lessons.ts question now reads 'At this 28 cm tray, how many 10 cm discs fit in this square grid once each is turned 45°?', key '4 discs, as before'. In a square grid of 10 cm discs, 28 cm gives floor(28/10) = 2 per row, 2² = 4, and a 45° turn of a disc changes nothing. The distractors are false for the grid: '5 discs: corners fill' (the corner-plus-centre packing is not a square grid) and '9 discs' (needs 30 cm). The pass 38-41 objection (a free packing fits 5) no longer applies, because the question now names the grid. |
| seen | verified | VERIFIED. resultLabel is now 'Discs in the grid' (home-lessons.ts). Re-computed floor(W/10)² for every slider side from 22 to 34 cm: 4 at 22-29 and 9 at 30-34, the same in both modes. At 28 cm the reveal line (engine-v2 homeRevealLine: first amount row plus result row per mode) reads 'As placed: discs per row 2; discs in the grid 4 discs. Each turned 45°: discs per row 2; discs in the grid 4 discs.' As a grid count this is true at every side. It no longer claims a fit count. |

**Result (Pass 42):** 2 verified, 0 disputed, 0 unverified (held).

No open claims from this pass.
