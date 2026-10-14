# Fact-check: screening-survival-clock (2026-10-14)

Lesson: src/demos/life/screening-survival-clock/ (status draft, version 1).

## Pass 38

Checker: fact-checker, a fresh instance (set B: chemistry, life, big-ideas). I did not write, build or record these claims. Method: I read Demo.tsx on every reachable path before I read the claims, and checked the walkthrough transcript (artifacts/walkthroughs/screening-survival-clock/transcript.md) for learner-visible sentences. Then I re-ran every number in node from my own copies of the lesson logic. Scratch scripts were not kept in the repo; each note gives the method and the values. Web: only GitHub (raw files and public clones) and PyPI were reachable. WebFetch fails DNS, and journal, publisher, library, Gutenberg and archive.org hosts are blocked (W-583). Sources I opened: OpenStax textbooks, cloned from github.com/openstax (Chemistry 2e, Biology 2e, Concepts of Biology, Anatomy and Physiology 2e, Astronomy 2e, College Physics 2e, Psychology 2e; CNXML modules, cited by module id); PyPI chemicals 1.5.2 (CRC, JANAF, ATcT tables), ussa1976 0.3.4 (US Standard Atmosphere 1976 composition) and pyrolite 0.3.8.post1 (ICS chronostratigraphic chart 2024/12); and the NOAA CO2 series via github.com/datasets/co2-ppm. No verdict rests on a source I could not open. A claim whose cited source was not opened, but which I verified from another opened source, says so in its note.

Paths read: Test on/off and the lead slider 0.5-3 in any order; the trace and the reveal use alive(3) directly.

Unrecorded claims: None beyond the recall's "fair way", noted under c3.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Node, own copy: T = 1.25 ... 7.75 (14 values); count of T + L > 5: L 0 -> 6 (43%), 0.5 -> 7, 1 -> 8, 1.5 -> 9, 2 -> 10, 2.5 -> 11, 3 -> 12 (86%). Options 43% / 64% / 86% match 6/14, 9/14, 12/14. Death positions X(t) do not depend on L in the code. |
| c2 | verified | Derivation: survival counted from diagnosis is (death - diagnosis); moving diagnosis earlier by L with death fixed adds L to every survival time, so 'alive 5 years after diagnosis' can only rise. Shown by c1 with all crosses fixed. |
| c3 | verified | Derivation, general not just in the toy: a whole group's death count or death rate over a fixed period never refers to the diagnosis date, so moving diagnosis earlier cannot change it; it is immune to lead time by construction. The cited Welch, Schwartz and Woloshin 2000 was not opened and the verdict does not rest on it. Non-blocking: the recall's 'fair way' (compare whole scanned and unscanned groups) is fair only if the groups are alike, as in a randomised trial; 'randomly assigned groups' would be more exact (cm-life's call). |
| c4 | verified | Convention, stated on the locked stage ('14 people with a made-up illness ... dies 1 to 8 years later'), in the question ('Treatment changes nothing') and the reveal ('This toy makes no claim about any real test'). T runs 1.25 to 7.75, inside '1 to 8 years'. |

**Result (Pass 38):** 4 verified.

Non-blocking for cm-life: the recall marks "Compare death rates in whole scanned and unscanned groups" as the fair test. That is immune to lead time, but a comparison of people who chose to be scanned against people who did not is not fair for other reasons (selection). "Randomly assigned groups" would make it exact.
