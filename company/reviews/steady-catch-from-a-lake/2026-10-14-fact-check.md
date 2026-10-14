# Fact-check: steady-catch-from-a-lake (2026-10-14)

Lesson: src/demos/life/steady-catch-from-a-lake/ (status draft, version 1).

## Pass 38

Checker: fact-checker, a fresh instance (set B: chemistry, life, big-ideas). I did not write, build or record these claims. Method: I read Demo.tsx on every reachable path before I read the claims, and checked the walkthrough transcript (artifacts/walkthroughs/steady-catch-from-a-lake/transcript.md) for learner-visible sentences. Then I re-ran every number in node from my own copies of the lesson logic. Scratch scripts were not kept in the repo; each note gives the method and the values. Web: only GitHub (raw files and public clones) and PyPI were reachable. WebFetch fails DNS, and journal, publisher, library, Gutenberg and archive.org hosts are blocked (W-583). Sources I opened: OpenStax textbooks, cloned from github.com/openstax (Chemistry 2e, Biology 2e, Concepts of Biology, Anatomy and Physiology 2e, Astronomy 2e, College Physics 2e, Psychology 2e; CNXML modules, cited by module id); PyPI chemicals 1.5.2 (CRC, JANAF, ATcT tables), ussa1976 0.3.4 (US Standard Atmosphere 1976 composition) and pyrolite 0.3.8.post1 (ICS chronostratigraphic chart 2024/12); and the NOAA CO2 series via github.com/datasets/co2-ppm. No verdict rests on a source I could not open. A claim whose cited source was not opened, but which I verified from another opened source, says so in its note.

Paths read: slider 80-150 in steps of 10, in any order; the reveal uses the first settling catch or 120.

Unrecorded claims: None.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-checked two independent ways in node (not the lesson's Euler): RK4 with dt 0.001 and the closed form. Writing u = N - 500, dN/dt = -(r/K)u^2 - (H - 125), time to empty from full = (2/sqrt(ab)) atan(500 sqrt(a/b)) with a = 5e-4, b = H - 125: H 130 -> 54.94 yr (year 55), 140 -> 28.57 (year 29), 150 -> 20.58 (year 21). Equilibria 500 + sqrt(250000 - 2000H): 80 -> 800, 90 -> 764.6, 100 -> 723.6, 110 -> 673.2, 120 -> 600 (RK4 at year 60: 600.33, rounds to 600). All match the claim. |
| c2 | verified | Derivation: g(N) = 0.5N(1 - N/1000) has g'(N) = 0.5 - N/1000 = 0 at N = 500, g(500) = 125 = rK/4. Stage label 'half full: grows fastest, 125 a year'. |
| c3 | verified | Derivation: g(N) <= 125 for all N, so with H > 125, dN/dt <= 125 - H < 0 everywhere and N falls at least (H - 125) a year; it reaches 0 in finite time (closed form in c1). The hook's 'only 13%' is 130/1000. |
| c4 | verified | Convention, stated on the locked stage ('A lake holds at most 1,000 fish and starts full. A few fish multiply fast; a crowded lake barely grows') and the unlocked stage ('Toy lake: no weather, no luck'); matches K = 1000, r = 0.5, N(0) = K in Demo.tsx. The Schaefer 1954 context is not on the card and was not checked. |

**Result (Pass 38):** 4 verified.
