# Fact-check: ten-times-taller-giant (2026-10-14)

Lesson: src/demos/big-ideas/ten-times-taller-giant/ (status draft, version 2).

## Pass 38

Checker: fact-checker, a fresh instance (set B: chemistry, life, big-ideas). I did not write, build or record these claims. Method: I read Demo.tsx on every reachable path before I read the claims, and checked the walkthrough transcript (artifacts/walkthroughs/ten-times-taller-giant/transcript.md) for learner-visible sentences. Then I re-ran every number in node from my own copies of the lesson logic. Scratch scripts were not kept in the repo; each note gives the method and the values. Web: only GitHub (raw files and public clones) and PyPI were reachable. WebFetch fails DNS, and journal, publisher, library, Gutenberg and archive.org hosts are blocked (W-583). Sources I opened: OpenStax textbooks, cloned from github.com/openstax (Chemistry 2e, Biology 2e, Concepts of Biology, Anatomy and Physiology 2e, Astronomy 2e, College Physics 2e, Psychology 2e; CNXML modules, cited by module id); PyPI chemicals 1.5.2 (CRC, JANAF, ATcT tables), ussa1976 0.3.4 (US Standard Atmosphere 1976 composition) and pyrolite 0.3.8.post1 (ICS chronostratigraphic chart 2024/12); and the NOAA CO2 series via github.com/datasets/co2-ppm. No verdict rests on a source I could not open. A claim whose cited source was not opened, but which I verified from another opened source, says so in its note.

Paths read: scale slider 1-10, Make it 10x, Legs same/thicker toggle.

Unrecorded claims: None.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Derivation: similar solids scaled by k have volume x k^3 (so weight x k^3 at the same density) and every area x k^2, so load per unit bone area = k^3 / k^2 = k. Node: k = 10 gives 1,000 / 100 = 10; Demo.tsx scaleOf(10, false) gives the same, and the reveal prints them. The recall's statue (k = 3: 27 / 9 = 3) is the same derivation. The model is static axial load only; the claim says so. |
| c2 | unverified | HELD (class P). Galileo 1638, Two New Sciences, Second Day, could not be opened: no public-domain copy is reachable from this host (Gutenberg, archive.org and Wikisource blocked; no OpenStax text discusses it). Not verified on trust. The lesson does not need it: the 'thicker legs' result is c1/c4 derivation. If W-583 cannot open it, cut the Galileo sentence (cm-big-ideas-science's call). |
| c3 | unverified | HELD (the lesson's one class-H citation). Biewener 1989 (Science 245) could not be opened (web blocked), and no openable source covers limb posture and bone stress scaling. Not verified on trust. The v2 fallback is ready and verifiable as convention: 'Where it stops: real animals change shape and posture as they grow.' Use it if W-583 cannot open Biewener. |
| c4 | verified | Convention: LIMIT = 4 in Demo.tsx, and the stage labels the line 'limit (illustrative)'; the reveal calls it 'the illustrative limit'. Thicker legs: diameter x k^1.5 gives area x k^3, load x 1 (node: 1 at k = 2, 3, 5, 10). The reason given for 4x (Biewener 1990 safety factors of 2 to 4) is not on the learner path and was not checked; it does not affect this verdict. |
| c5 | verified | Derivation: 10 > 4 (c1, c4), and the code turns legs and bar red when load > LIMIT. The lesson makes no collapse claim, so nothing here rests on real bone strength. |

**Result (Pass 38):** 3 verified, 2 unverified.

Held: c3 (Biewener 1989, the one H) and c2 (Galileo 1638, class P). Neither could be opened. c3's v2 fallback is ready. Galileo should be cut if W-583 cannot open it; the lesson teaches without it.
