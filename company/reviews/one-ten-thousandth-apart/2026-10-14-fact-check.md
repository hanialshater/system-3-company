# Fact-check: one-ten-thousandth-apart (2026-10-14)

Lesson: src/demos/big-ideas/one-ten-thousandth-apart/ (status draft, version 1).

## Pass 38

Checker: fact-checker, a fresh instance (set B: chemistry, life, big-ideas). I did not write, build or record these claims. Method: I read Demo.tsx on every reachable path before I read the claims, and checked the walkthrough transcript (artifacts/walkthroughs/one-ten-thousandth-apart/transcript.md) for learner-visible sentences. Then I re-ran every number in node from my own copies of the lesson logic. Scratch scripts were not kept in the repo; each note gives the method and the values. Web: only GitHub (raw files and public clones) and PyPI were reachable. WebFetch fails DNS, and journal, publisher, library, Gutenberg and archive.org hosts are blocked (W-583). Sources I opened: OpenStax textbooks, cloned from github.com/openstax (Chemistry 2e, Biology 2e, Concepts of Biology, Anatomy and Physiology 2e, Astronomy 2e, College Physics 2e, Psychology 2e; CNXML modules, cited by module id); PyPI chemicals 1.5.2 (CRC, JANAF, ATcT tables), ussa1976 0.3.4 (US Standard Atmosphere 1976 composition) and pyrolite 0.3.8.post1 (ICS chronostratigraphic chart 2024/12); and the NOAA CO2 series via github.com/datasets/co2-ppm. No verdict rests on a source I could not open. A claim whose cited source was not opened, but which I verified from another opened source, says so in its note.

Paths read: Run 30 steps, 1,000x more precise, Average 1,000 steps, Step 1, Reset; both reveal branches (with and without averages).

Unrecorded claims: None.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-iterated x -> 4x(1 - x) in node (own code, double precision): gap 0.0001 first exceeds 0.1 at step 11, gap at step 30 = 0.616; gap 0.0000001 first exceeds 0.1 at step 21, 10 steps later. Matches Demo.tsx splitStep()/series() and the reveal ('until step 11', 'only 10 more steps'). |
| c2 | verified | Derivation plus numeric check: x = sin^2(pi theta) conjugates the r = 4 map to theta -> 2 theta mod 1, so the Lyapunov exponent is ln 2 and small gaps grow by about 2 per step on average. Node: mean of ln/4 - 8x/ over 1e6 steps = 0.693146 (ln 2 = 0.693147). Consistent with c1: log2(1000) = 9.97, about 10 steps. Strogatz not opened and not needed. The recall's log2(100) = 6.64, about 7 days, also re-checked. |
| c3 | unverified | HELD (the lesson's one class-H citation). Lorenz 1963 (J. Atmos. Sci. 20(2)) could not be opened (web blocked); no openable text names Lorenz. Note for when it is opened: the 1963 paper's model is a simplified convection system; check whether 'a weather model' and the year describe it fairly. The brief's fallback is ready and I can verify it: 'Mathematicians call this sensitive dependence on initial conditions.' OpenStax College Physics 2e 'The Onset of Turbulence' (m42210) defines a chaotic system as one 'so sensitive to some factor that it is extremely difficult to predict' and uses 'extremely sensitive dependence'. If W-583 cannot open Lorenz, use the fallback. |
| c4 | verified | Node: 1,000-step averages from 0.3 and 0.3001 = 0.5119 and 0.4810, shown 0.51 and 0.48 (toFixed(2)). Exact long-run mean: the invariant density 1/(pi sqrt(x(1 - x))) is symmetric about 1/2, so the mean is 0.5. 'Matched' is fair: both are within about 0.02 of 0.5 while single steps differ by up to 1. The no-average branch of the reveal states no value and holds. |
| c5 | verified | Convention: start 0.3 and gaps 1e-4 and 1e-7 are constants in Demo.tsx (X_START, COARSE, FINE). For x in [0, 1], 4x(1 - x) has maximum 1 at x = 1/2 and minimum 0, so every value stays in [0, 1] and two runs are at most 1 apart. |

**Result (Pass 38):** 4 verified, 1 unverified.

Held: c3 (Lorenz 1963) is the one held citation. Its fallback ("Mathematicians call this sensitive dependence on initial conditions.") is verifiable now against OpenStax College Physics 2e "The Onset of Turbulence".

## Pass 41

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of these claims. Lesson status draft, version 1. Method: I read Demo.tsx (and model.ts or the src/lib/lifehacks specs where the lesson uses them) for every learner-visible string before reading the builder's notes. I re-derived every derivation and simulation claim with my own scripts (node or python, kept in the session scratchpad under fc41/chk; the kit's mulberry32 copied verbatim, everything else re-implemented). Sources: the founder's pass-41 allow-list works only for bare hosts. ourworldindata.org, cran.r-project.org and pmc.ncbi.nlm.nih.gov open. gapminder.org, census.gov, naturalearthdata.com, rug.nl, doi.org, sciencedirect.com and econometricsociety.org all redirect to their www. hosts, which the proxy still blocks (403), so in practice they did not open. doi.org resolves only to publisher hosts, which are blocked. raw.githubusercontent.com, git clone and PyPI also work. WebFetch fails DNS for every host. A source counts only if I opened its text. I used no search snippets and nothing from memory. For secondary sources (for example a PMC article describing an older paper), the basis says so. No fetched page contained instructions addressed to an AI or to me; all pages were treated as data only.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Learner text (Demo.tsx line 99): 'Edward Lorenz found this in a weather model in 1963.' Opened on PMC: Slingo and Palmer (2011), 'Uncertainty in weather and climate prediction', Phil Trans R Soc A 369: 4751-4767 (PMC3270390): 'In 1963, Lorenz published his seminal paper on Deterministic non-periodic flow, which was to change the course of weather and climate prediction profoundly ... Lorenz was able to show that even for a simple set of nonlinear equations, the evolution of the solution could be changed by minute perturbations to the initial conditions'; its reference 2 is Lorenz 1963, J Atmos Sci 20: 130-141. The year, the finding (sensitive dependence) and the atmospheric (weather) setting hold. Non-blocking (cm-big-ideas-science): the 1963 model is a 'simple set of nonlinear equations' for atmospheric flow, so 'a simplified weather model' would be more exact. |

**Result (Pass 41):** 1 verified, 0 disputed, 0 unverified (held).
