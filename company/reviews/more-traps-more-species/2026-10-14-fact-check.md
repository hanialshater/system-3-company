# Fact-check: more-traps-more-species (2026-10-14)

Board: W-677. Lesson: src/demos/life/more-traps-more-species/ (status draft, version 1).

Checker: fact-checker. I did not write these claims. Method: I read Demo.tsx on every reachable path before reading the claims: locked state, presets in any order, Reset, seeds, the milestones that gate the reveal, and the reveal's dynamic strings. Then I re-ran every number in node 22 (--experimental-strip-types) from copies of the lesson's own code. CS lessons use a copy of model.ts. Life lessons use the non-JSX top of Demo.tsx cut out with sed, plus a copy of src/kit/random.ts. Independent loops cross-check where noted. Scripts: artifacts/fact-check-wave-j/wj-cs-life/. I did not use the dev server. No walkthrough transcript exists for this slug yet, so the stage was read from code. Web: only PyPI, npm and GitHub raw are reachable, and every source verdict below names the file I opened.

Unrecorded claims: I compared the hook, question, options, stage text, reveal and recall against the claims list and found none unrecorded.

Reachable paths covered: Catch 50/500/5,000 in any order. New forest seed (2 -> 3 -> 1) is disabled until the first catch. The reveal sets 5,000 and reads the current seed. All three seeds' reveal texts were rendered and checked. The check script E6 section was re-run and matches.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-ran catchInsects() copied from Demo.tsx with the kit's mulberry32. Seed 2: 20/34/40; seed 3: 17/34/40; seed 1: 18/37/40 (E6 re-run agrees). Rendered reveals: seed 2 'under twice the 20', seed 3 'about twice the 17', seed 1 'about twice the 18', and all 40 at 5,000 on every seed. All are true. Note-only slip in the source field: it says '34 < 2 x 17', but 34 = 2 x 17, so the code prints 'about' for seed 3, which is right. Builder: correct the note. |
| c2 | verified | Derivation: E[species] = sum of 1 - (1 - p_i)^n with p_i proportional to 0.88^i: 18.86, 34.34, 39.97 (node; E6 agrees). The shares sum to 1; commonest 0.1207, rarest 0.00083. |
| c3 | verified | Seed 2 first-catch insect numbers match the claim (10, 12, 3, 2, 13, 4, 15, 6, 17, 53 for the top 10). Repeats between insects 50 and 500 are 96.9% (seed 2), 96.2% (seed 3) and 95.8% (seed 1). On every reachable seed, the species first found after insect 50 are mostly from the rarer half (seed 2: ranks 22, 9, 28, 14, ...). 'Each new species is a rarer one' is loose but fair against the commonest species: by insect 50 the commonest 9 (seed 2), 10 (seed 3) and 13 (seed 1) species have all been found. |
| c4 | verified | Derivation inside the model: the same forest gives 20, 34 or 40 species by catch size alone (c1). No literature sentence is on the card. |
| c5 | verified | Convention: the stage says 'A made-up forest: a few common species, many rare ones' and the shares are 0.88^i over 40, so it is accurate. The cut 'real forests' clause is not on the card. |
| c6 | verified | Seed 2 (the start seed) has 20 species at 50. Other seeds change the reveal's numbers but not the locked premise, which is shown before any seed change. |

**Result:** verified 6.

## Pass 41

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of these claims. Lesson status draft, version 2. Method: I read Demo.tsx (and model.ts or the src/lib/lifehacks specs where the lesson uses them) for every learner-visible string before reading the builder's notes. I re-derived every derivation and simulation claim with my own scripts (node or python, kept in the session scratchpad under fc41/chk; the kit's mulberry32 copied verbatim, everything else re-implemented). Sources: the founder's pass-41 allow-list works only for bare hosts. ourworldindata.org, cran.r-project.org and pmc.ncbi.nlm.nih.gov open. gapminder.org, census.gov, naturalearthdata.com, rug.nl, doi.org, sciencedirect.com and econometricsociety.org all redirect to their www. hosts, which the proxy still blocks (403), so in practice they did not open. doi.org resolves only to publisher hosts, which are blocked. raw.githubusercontent.com, git clone and PyPI also work. WebFetch fails DNS for every host. A source counts only if I opened its text. I used no search snippets and nothing from memory. For secondary sources (for example a PMC article describing an older paper), the basis says so. No fetched page contained instructions addressed to an AI or to me; all pages were treated as data only.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node re-run with a cumulative-share lookup (independent of catchInsects' subtract-walk) and the kit mulberry32: seed 1 18/37/40, seed 2 20/34/40, seed 3 17/34/40 at 50/500/5,000. Expected species at 50 = 18.86. RevealSync sets seed 2 and size 5,000 when the reveal opens, so the reveal reads '34 species ... under twice the 20 at 50' and 'found all 40', matching the question's 20 at 50. The question text ('Team A catches 50 insects ... finds 20 species') matches seed 2. |

**Result (Pass 41):** 1 verified, 0 disputed, 0 unverified (held).
