# Fact-check: vaccinate-at-the-peak, 2026-10-14

## Pass 11 (2026-10-14)

Checker: fact-checker. Scope: claims still unverified after wave C revisions. Method: re-derived in node from the Demo.tsx model code, compared claim text with the stage/reveal code, checked cited sources.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c6 R0 = 3 means that, early on, each sick person infects 3 others on aver... | verified | R0 = beta/gamma for SIR; 0.6/0.2 in node = 2.9999999999999996, Demo.tsx rounds to 3 (line 18). |

Result: 1 verified, 0 disputed.

## Pass 26 (2026-10-14, batch 2, wave G revisions)

Checker: fact-checker (wrote and built none of these claims). Method: read Demo.tsx first (every learner-visible string, every reachable branch, Reset/Start over where it exists, reduced motion where it applies; this lesson has no motion-dependent text), then the build.md Pre-flight; re-ran the numbers in my own node ports of the lesson's logic (scratchpad fc26-b2/). No builds. No sentence below is verified on an unopened source; external hosts failed DNS this pass.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own node port of simulate(): none 0.9407, day 0 0.7031, peak day round(19.19) = 19 0.7566, day 40 0.9359; whole percents 94, 70, 76, 94; 94 - 76 = 18, 94 - 70 = 24, round(100·18/24) = 75; unrounded 18.41 of 23.75 points = 0.775. Seen row lists none always, day 0 and day 19 once their milestones are hit (both needed for the reveal); peak clause "Day 19: 35% not yet infected." |
| c7 | verified | Own node: S at day 22 = 20.49%, day 23 = 17.57%; S only falls, so every day from 23 to 60 is capped (vax < DOSE) and gets the capped line. Day 40: S = vaccinated = 6.41%, final 93.6%; the generated line is exactly "Day 40 (after the peak): only 6% not yet infected, so only 6% vaccinated. Final: 94% infected." |

**Result:** 2 verified, 0 disputed, 0 held unverified.

## Pass 35 (2026-10-14)

Checker: fact-checker, a fresh instance that did not write these claims. Method: I read Demo.tsx first, covering every reachable path, the reset and reduced-motion states and every learner-visible string. Then I read the claim text and support, and only then the source fields. I re-ran the numbers in my own node ports of the lesson logic (session scratchpad fc35b1/), using the repo's own d3-geo, topojson-client and TypeScript where the lesson does. No builds and no screenshots. No verdict rests on an unopened source: every external host failed (WebFetch DNS failure, proxy 403).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | disputed | DISPUTED (wording). Own node port of simulate(null): ever infected 0.9407 ('94%') holds. But PEAK_DAY = round(argmax of I), the peak of people sick at once (prevalence), at day 19.19. New cases per day (β·S·I) peak at day 15.97, about day 16, not 19. So 'new cases peak on day 19' is false in the model. The stage itself only says 'the peak', but the recall card has the same error: 'roughly where is the epidemic when new cases peak?' / why 'The peak comes when the susceptible share falls to 1/R0'. At the new-case peak S = 1/R0 + I = 57%, not 33%. Fix (builder): say 'the number sick at once peaks on day 19' in c1 and in the recall question, or define the peak as new cases and recompute (day 16) everything that quotes it. |
| c2 | verified | Own node port: none 0.9407, day 0 0.7031, day 19 0.7566, day 40 0.9359 → 94%, 70%, 76%, 94%. Whole-percent arithmetic 94 − 76 = 18 and 94 − 70 = 24, round(100 × 18/24) = 75 (SAVED_P, SAVED_0, FRAC_SHOWN). Unrounded 18.41 of 23.75 = 77.5%. The Seen row adds day 0, day 19 and day 40 once each is visited and keeps them; the reveal needs the day-0 and peak milestones. 'Peak' here means PEAK_DAY = 19, the peak of people sick at once (see the c1 dispute); the numbers hold either way. |
| c3 | verified | Own node port: S at day 19 = 0.3455 ('35%', printed as pct(DP.sAtV) in the Seen row and the reveal). dI/dt = (βS − γ)I = 0 at S = γ/β = 1/3; in the run S = 0.3332 at the I maximum (t = 19.19). This holds for 'the peak' as Demo.tsx defines it (most people sick at once). It does not hold for the new-case peak (S = 57% there). See the c1 dispute: if the builder redefines the peak, this claim must be re-checked. |
| c5 | verified | Convention matches the code: well-mixed SIR (one S, I compartment), the dose is moved from S to V instantly with no waning or failure, and v = min(DOSE, S) goes only to the not-yet-infected. The question says '20% of the town, all not yet infected'; the stage locked line says 'all not yet infected'; the reveal muted line says 'Model, not guidance: instant, perfect protection.' exactly. BETA, GAMMA and I0 are made-up constants. |

**Result:** 3 verified, 1 disputed (c1; board W-509, demo-builder), 0 held unverified. Publishing stays blocked on the dispute.

## Pass 36 (2026-10-14, W-637 re-check after the pass 35 fixes)

Checker: fact-checker (fresh instance per the W-280 ruling; drafted none of this wording, and was not a pass 35 session). Artifact: life/vaccinate-at-the-peak v6. Order: read Demo.tsx first, then the claim text, then the source fields, this file's Pass 35 table and build.md. Numbers re-run in node (and Python where noted) from copies of the lesson logic and independent re-implementations; no dev server, no screenshots (QA and reveal-fit are W-638, not this pass). Web sources could not be opened (tc39.es DNS failure), so nothing here rests on an unopened source. Scripts: session scratchpad fc36/.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Independent node port of the Euler SIR (β 0.6, γ 0.2, I0 0.001, dt 0.01 to day 200): ever infected 0.9407 (94%); I peaks at t = 19.19 (PEAK_DAY = round = 19, the 'Peak' button); new cases β·S·I peak at t = 15.97 (about day 16). RK4 (h 0.001) cross-check: I peak 19.18, final 0.9406; final-size equation 1 − z = (1 − I0)e^(−3z) gives 0.9406. |
| recall | verified | Derivation: dI/dt = (βS − γ)I = 0 at S = γ/β = 1/R0. Own node run of the stage model: S = 0.3332 at the I peak (RK4 0.3333), so about a third never infected; ever infected 66.7% then and 94.1% at the end, so 27.4 points (29% of all infections) still to come, which supports 'many infections are still to come'. In time, half of all infections have happened by day 16.5 and 99% by day 36, consistent with the answer 'Around the middle'. |
