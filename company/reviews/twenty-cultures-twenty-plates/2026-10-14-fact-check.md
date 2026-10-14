# Fact-check: twenty-cultures-twenty-plates (2026-10-14)

Lesson: src/demos/life/twenty-cultures-twenty-plates/ (status draft, version 1).

## Pass 38

Checker: fact-checker, a fresh instance (set B: chemistry, life, big-ideas). I did not write, build or record these claims. Method: I read Demo.tsx on every reachable path before I read the claims, and checked the walkthrough transcript (artifacts/walkthroughs/twenty-cultures-twenty-plates/transcript.md) for learner-visible sentences. Then I re-ran every number in node from my own copies of the lesson logic. Scratch scripts were not kept in the repo; each note gives the method and the values. Web: only GitHub (raw files and public clones) and PyPI were reachable. WebFetch fails DNS, and journal, publisher, library, Gutenberg and archive.org hosts are blocked (W-583). Sources I opened: OpenStax textbooks, cloned from github.com/openstax (Chemistry 2e, Biology 2e, Concepts of Biology, Anatomy and Physiology 2e, Astronomy 2e, College Physics 2e, Psychology 2e; CNXML modules, cited by module id); PyPI chemicals 1.5.2 (CRC, JANAF, ATcT tables), ussa1976 0.3.4 (US Standard Atmosphere 1976 composition) and pyrolite 0.3.8.post1 (ICS chronostratigraphic chart 2024/12); and the NOAA CO2 series via github.com/datasets/co2-ppm. No verdict rests on a source I could not open. A claim whose cited source was not opened, but which I verified from another opened source, says so in its note.

Paths read: both rule buttons in either order; New seed (1 -> 2 -> ...) changes both rows, and the reveal's jackpot test (growing max >= 2 x drug max) picks one of two texts, both checked.

Unrecorded claims: None.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-ran from my own copies of mulberry32 and the Poisson sampler (scratch ld.mjs): seed 1 counts 1, 32, 6, 0, 0, 0, 8, 0, 0, 128, 1, 3, 0, 2, 8, 1, 0, 0, 0, 16; 9 empty, max 128. Seed 2: 8 empty, max 6, as the source says. Seed 1 is the useState start value, not tuned. Over 2,000 other seeds the reveal's jackpot branch (max >= 2 x drug max) fires 42% of the time; the reveal text covers both branches. |
| c2 | verified | Same re-run, drug rule: seed 1 counts 9, 7, 8, 12, 7, 15, 13, 10, 8, 12, 7, 10, 12, 5, 12, 10, 9, 8, 8, 11; 0 empty, 5 to 15. 'Same average of about 10': drug mean is 10 by construction (simulated 10.00); growing rule expectation is sum over g of (2^g / 2^20) x 2^(19-g) = 20 x 2^19 / 2^20 = 10 (minus a negligible correction), so the averages match in expectation even though the growing rule's typical plate is far lower. |
| c3 | verified | Derivation and code: a mutant formed at 0-indexed round g doubles in the 19 - g later rounds, 2^(19-g) cells; the stage numbers divisions from 1 (topGen + 1), so division g' gives 2^(20-g'). Re-run: the seed-1 plate of 128 had exactly one mutation event, at division 13 (2^7 = 128), so 'one mutation at division 13, copied' is literal here. |
| c4 | unverified | HELD. Luria and Delbrück (1943), Genetics 28: 491-511, could not be opened (journal, PubMed and library hosts blocked; only GitHub and PyPI reachable), and no openable source I found (OpenStax Biology 2e, Concepts of Biology, Microbiology) describes the fluctuation test. Not verified on trust. Per the brief: if it cannot be checked, cut this reveal sentence; the lesson stands on c1-c3. Needs a web-capable session (W-583) or an openable copy. |
| c5 | verified | Convention, stated on the locked stage ('20 identical cultures each grow from one cell to about a million. Resistance mutations strike at random during divisions, about once per million'); code: GENS 20 (2^20 = 1,048,576), per-division rate non/2^20, drug rule Poisson(10) = 2^20 x 10/2^20. The rates are toy choices; no real mutation rate is claimed. |

**Result (Pass 38):** 4 verified, 1 unverified.

Held: c4 (Luria and Delbrück 1943). The brief says: if it cannot be checked, cut the sentence. cm-life decides whether to cut it now or wait for W-583.
