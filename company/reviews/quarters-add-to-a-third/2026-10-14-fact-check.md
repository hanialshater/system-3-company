# Fact-check: quarters-add-to-a-third (2026-10-14)

Board: W-659. Lesson: src/demos/math/quarters-add-to-a-third/ (status draft, version 1).

Checker: fact-checker (I did not write these claims). Method: I read Demo.tsx on every reachable path before I read the claims: locked state, each control in every order, Reset, the sliders' full range, and the dynamic strings in the stage, Seen line and reveal. Then I re-ran every number in node from my own copies of the lesson logic (scripts in artifacts/fact-check-wave-j/wj-econ-phys-math-geo/; the geography models were run from type-stripped copies of model.ts and solar.ts). Brief check script: company/domains/briefs/checks/math-wave-j-check.mjs, re-run (labels A1-A5). The dev server was not used (the dispatcher's instruction). Web: only PyPI, npm, GitHub raw files and public git clones were reachable. Sources opened for this batch: None needed: definitions and arithmetic.

Unrecorded claims: I compared every learner-visible sentence (title, hook, question, options, stage labels, Seen line, reveal, recall) with the claims list. None found. The recall question was checked against the claims it rests on (see the notes).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Arithmetic: partial sums 0.2500, 0.3125, 0.3281, 0.3320, 0.3330, 0.3333; S6 = 0.333251953125 = (1 - 4^-6)/3; check A5 re-run. artifacts/fact-check-wave-j/wj-econ-phys-math-geo/math.mjs. |
| c2 | verified | Construction checked in the code: level k draws squares of side S/2^k at the top-left (solid), bottom-left (dotted) and bottom-right (hatched) of the previous leftover, and the leftover is the top-right square, so the three patterns have equal totals. |
| c3 | verified | Derivation: 3 S_n + 4^-n = 1, so S_n = (1 - 4^-n)/3 -> 1/3; the geometric series a/(1 - r) with a = r = 1/4. Recall (1/3 + 1/9 + ... = 1/2, by the same three-part picture) checks out. |

**Result:** no disputes. All claims verified.

## Pass 41

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of these claims. Lesson status draft, version 2. Method: I read Demo.tsx (and model.ts or the src/lib/lifehacks specs where the lesson uses them) for every learner-visible string before reading the builder's notes. I re-derived every derivation and simulation claim with my own scripts (node or python, kept in the session scratchpad under fc41/chk; the kit's mulberry32 copied verbatim, everything else re-implemented). Sources: the founder's pass-41 allow-list works only for bare hosts. ourworldindata.org, cran.r-project.org and pmc.ncbi.nlm.nih.gov open. gapminder.org, census.gov, naturalearthdata.com, rug.nl, doi.org, sciencedirect.com and econometricsociety.org all redirect to their www. hosts, which the proxy still blocks (403), so in practice they did not open. doi.org resolves only to publisher hosts, which are blocked. raw.githubusercontent.com, git clone and PyPI also work. WebFetch fails DNS for every host. A source counts only if I opened its text. I used no search snippets and nothing from memory. For secondary sources (for example a PMC article describing an older paper), the basis says so. No fetched page contained instructions addressed to an AI or to me; all pages were treated as data only.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Read the construction in Demo.tsx: level k draws three squares of side S/2^k (solid top-left, dotted bottom-left, hatched bottom-right of the previous leftover) and the leftover is the top-right square of side S/2^k; so the three patterns have equal totals sum_{k<=n} 4^-k at every level. The readout prints 'hatched x · dotted x · left over y' with the same solid(level) value; at level 6 each is 0.3333 (own python: 0.33325). |
| c3 | verified | 3 S_n + 4^-n = 1, so S_n = (1 - 4^-n)/3 -> 1/3. 1/4^6 = 0.000244, shown with toFixed(4) as 0.0002, and the reveal now quotes d4(1/4^6) = 0.0002, the value on screen at level 6 (the stage returns to level 6 at the reveal). |

**Result (Pass 41):** 2 verified, 0 disputed, 0 unverified (held).
