# Fact-check: early-fatality-count (2026-10-14)

Lesson: src/demos/life/early-fatality-count/ (status draft, version 1).

## Pass 38

Checker: fact-checker, a fresh instance (set B: chemistry, life, big-ideas). I did not write, build or record these claims. Method: I read Demo.tsx on every reachable path before I read the claims, and checked the walkthrough transcript (artifacts/walkthroughs/early-fatality-count/transcript.md) for learner-visible sentences. Then I re-ran every number in node from my own copies of the lesson logic. Scratch scripts were not kept in the repo; each note gives the method and the values. Web: only GitHub (raw files and public clones) and PyPI were reachable. WebFetch fails DNS, and journal, publisher, library, Gutenberg and archive.org hosts are blocked (W-583). Sources I opened: OpenStax textbooks, cloned from github.com/openstax (Chemistry 2e, Biology 2e, Concepts of Biology, Anatomy and Physiology 2e, Astronomy 2e, College Physics 2e, Psychology 2e; CNXML modules, cited by module id); PyPI chemicals 1.5.2 (CRC, JANAF, ATcT tables), ussa1976 0.3.4 (US Standard Atmosphere 1976 composition) and pyrolite 0.3.8.post1 (ICS chronostratigraphic chart 2024/12); and the NOAA CO2 series via github.com/datasets/co2-ppm. No verdict rests on a source I could not open. A claim whose cited source was not opened, but which I verified from another opened source, says so in its note.

Paths read: Day 45 / 90 / 135 presets and the slider in steps of 5; the reveal uses lateDay when the learner ends before day 120.

Unrecorded claims: None. The recall's "about 3 weeks" is a hypothetical in the question, not a fact.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-ran the model in node from my own copy (scratch cfr.mjs): day 30 0.2259% (1 in 443), 45 0.2470% (1 in 405), 60 1 in 401, 75 1 in 88, 90 1 in 53, 105 1 in 50, 120 1.9984%, 125 1.9993%, 135 2.0000%. Matches the claim and ratioText() rounding. Note: day 120 is 1.998%, which the readout shows as '1 in 50'. |
| c2 | verified | Derivation: 15 / 5 = 3 doublings, 2^3 = 8; in steady growth cumulative cases and deaths both grow as 2^(d/5), so the ratio tends to 0.02 x 2^-3 = 0.25%. Node: day 60 (end of growth) 0.2496%. |
| c3 | verified | Convention, stated on the locked stage ('Made-up outbreak: cases double every 5 days. Exactly 2 in 100 cases die, always 15 days after being counted') and in Demo.tsx constants (DOUBLE 5, CFR 0.02, LAG 15). No real-world number is shown, so nothing about real outbreaks rests on it. Ghani et al. 2005 was not opened and is not needed. |
| c4 | verified | Convention checked in the code: dots are drawn at deaths(d) x 50 = 0.02 x 50 x cases(d - 15) = cases(d - 15), the same height as the bar 15 days earlier; the stage caption says 'drawn ×50'. |

**Result (Pass 38):** 4 verified.
