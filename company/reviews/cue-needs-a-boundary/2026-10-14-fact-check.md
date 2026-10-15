# Fact-check: cue-needs-a-boundary

## W-740 (2026-10-14): claims reset by the engines v2 migration (W-608, commit 3dd4d09)

Checker: fact-checker. I did not write or build these claims (text: cm-lifehacks patch company/reviews/lifehacks-200/content-patch-r9-batch-d.md; build: demo-builder, company/reviews/lifehacks-200/engines-v2-build-W-608.md). Scope: the 4 claims in meta.json that the migration reset or added (meta version 2).

Method: I read the engine first (src/lib/lifehacks/engine-v2.ts; HomeLesson.tsx StageV2 and useHomeLesson; SeenTable.tsx; StudyLessonV2.tsx), then this lesson's spec and meta.json. I re-typed the engine logic and the model into my own node scripts (fact-checker scratchpad fc-w740/: copy.mjs, home.mjs, study.mjs, misc.mjs). I ran them over every reachable path: for Home lessons, every slider value (with exact and float-accumulated steps); for Study lessons, every prediction index and every Yours state (all 71 Start positions from both fixtures, or all 6 recall orders). I compared the results with the real engine functions: 0 mismatches. I also checked that every number the reveal's first sentence quotes is a cell of the Seen table on the same path. The reveal and the table call the same column functions, and the reveal reads the live state. No dev server or screenshot: the walkthrough on disk predates v2, so the rendered stage was read from code. Outside sources (only PyPI, npm and GitHub raw are reachable): named in the claim notes where used.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Capitals checked in two opened datasets: geonamescache 3.0.2 (PyPI, GeoNames countries.json: JP Tokyo, KE Nairobi, PE Lima) and mledoze/countries countries.json (GitHub raw: same three). Count 3 is the fixture. Source field still says "any atlas"; demo-builder may name these. |
| c2 | verified | Fixture: one note per country; candidates a = 3, b = 1. |
| recall | verified | Stipulated notes on three rivers; only a cue naming its river picks one. Convention. |
| seen | disputed | Disputed. The numbers are what the engine computes, but the sentence a learner reads, "Kenya's capital?: answers this cue fits 1; match 0/3.", pins a 0/3 failure on the specific cue. The 0/3 is the fixed wrong attempt (Lima, Tokyo, Nairobi), which is the same in both modes and has nothing to do with the cue; mode A just shows "not checked". On stage this contradicts c2. Fix: W-610 (files family), or drop the Match row for lessons that declare candidates. |

**Result:** 3 verified, 1 disputed, 0 held (unverified).

**Fix needed (blocks publishing):** .seen. The Match row under "Kenya's capital?" reads 0/3 because the fixed attempt is wrong, which makes the stage look as if the specific cue fails. Either W-610 (files family, which shows 3 vs 1 directly) or drop the Match row for recall lessons that declare `candidates`. Owner: interaction-designer (W-610), then demo-builder.

## Pass 38 (2026-10-14, set A)

Checker: fact-checker. I wrote and built none of these claims. Scope: every open claim in this lesson (set A of pass 38: ai, cs, math, physics, probability, economics, geography, lifehacks). Method: I read Demo.tsx (or the Life Hacks spec and engine) first, every learner-visible string, then the claims. I re-ran every number in my own node scripts (scratchpad fc38/: cluster.mjs, enemy.mjs, secret.mjs, plus inline runs), not imported from the lesson. Web: arxiv, publisher, government, Wikipedia and help-centre hosts return proxy 403 or fail DNS. Only raw.githubusercontent.com, PyPI and npm are reachable, so the sources I opened are files on GitHub (OpenStax CNXML, MicrosoftDocs, NetworkX, d2l, GRASS, GNOME/KDE source, the authors' own repositories, a papers-we-love PDF), each named in its row. Search-result snippets were not used as evidence. A claim whose source I could not open stays unverified.

| Claim | Verdict | Basis |
|---|---|---|
| seen | disputed | STILL DISPUTED (studyCatalog and engine unchanged since W-740; the only later commit, 7171b38, touches another lesson's meta). The row 'Kenya's capital?: ... match 0/3' pins the fixed wrong attempt's 0/3 on the specific cue, against c2. Fix as in W-740: W-610 (files family), or drop the Match row for recall lessons that declare candidates. Owner: interaction-designer, then demo-builder. |

**Result:** 0 verified, 1 disputed, 0 held (unverified), 0 withdrawn.

**Fix needed (blocks publishing):** seen. See each row for the fix; wording belongs to cm-lifehacks, applying it to demo-builder (interaction-designer for W-610), and then a fact-checker re-checks.

## Pass 41

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of these claims. Lesson status review, version 2. Method: I read Demo.tsx (and model.ts or the src/lib/lifehacks specs where the lesson uses them) for every learner-visible string before reading the builder's notes. I re-derived every derivation and simulation claim with my own scripts (node or python, kept in the session scratchpad under fc41/chk; the kit's mulberry32 copied verbatim, everything else re-implemented). Sources: the founder's pass-41 allow-list works only for bare hosts. ourworldindata.org, cran.r-project.org and pmc.ncbi.nlm.nih.gov open. gapminder.org, census.gov, naturalearthdata.com, rug.nl, doi.org, sciencedirect.com and econometricsociety.org all redirect to their www. hosts, which the proxy still blocks (403), so in practice they did not open. doi.org resolves only to publisher hosts, which are blocked. raw.githubusercontent.com, git clone and PyPI also work. WebFetch fails DNS for every host. A source counts only if I opened its text. I used no search snippets and nothing from memory. For secondary sources (for example a PMC article describing an older paper), the basis says so. No fetched page contained instructions addressed to an AI or to me; all pages were treated as data only.

| Claim | Verdict | Basis |
|---|---|---|
| seen | disputed | STILL DISPUTED. engine-v2.ts line 210 still builds the Match row from the fixed wrong attempt, so the Seen row 'Kenya's capital?: ... match 0/3' pins a 0/3 failure on the specific cue, against c2. Fix unchanged: W-610 (files family), or drop the Match row for recall lessons that declare candidates. Owner: interaction-designer, then demo-builder. |

**Result (Pass 41):** 0 verified, 1 disputed, 0 unverified (held).

Open items (each blocks publishing until fixed and re-checked by a fact-checker who is not the builder):

- seen (disputed): see the basis above for the fix or the source it needs.
