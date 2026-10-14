# Fact-check: acid-diluted-a-thousandfold (2026-10-14)

Lesson: src/demos/chemistry/acid-diluted-a-thousandfold/ (status draft, version 1).

## Pass 38

Checker: fact-checker, a fresh instance (set B: chemistry, life, big-ideas). I did not write, build or record these claims. Method: I read Demo.tsx on every reachable path before I read the claims, and checked the walkthrough transcript (artifacts/walkthroughs/acid-diluted-a-thousandfold/transcript.md) for learner-visible sentences. Then I re-ran every number in node from my own copies of the lesson logic. Scratch scripts were not kept in the repo; each note gives the method and the values. Web: only GitHub (raw files and public clones) and PyPI were reachable. WebFetch fails DNS, and journal, publisher, library, Gutenberg and archive.org hosts are blocked (W-583). Sources I opened: OpenStax textbooks, cloned from github.com/openstax (Chemistry 2e, Biology 2e, Concepts of Biology, Anatomy and Physiology 2e, Astronomy 2e, College Physics 2e, Psychology 2e; CNXML modules, cited by module id); PyPI chemicals 1.5.2 (CRC, JANAF, ATcT tables), ussa1976 0.3.4 (US Standard Atmosphere 1976 composition) and pyrolite 0.3.8.post1 (ICS chronostratigraphic chart 2024/12); and the NOAA CO2 series via github.com/datasets/co2-ppm. No verdict rests on a source I could not open. A claim whose cited source was not opened, but which I verified from another opened source, says so in its note.

Paths read: x10, x100, x1,000, x10,000 in DOM order and in other orders; the reveal reads solve(dil) for the preset on stage when it opens, so I checked its ratio sentence for every preset.

Unrecorded claims: None. Hook covered by c1; reveal by c2, c3, c6, c7; the recall (vinegar approaches 7 from below) follows from c6, since the charge balance holds for a weak acid too.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Derivation re-run in node with my own bisection on the charge balance h = c + Kw/h (not the lesson's closed form; scratch acid.mjs): x1 pH 5.0000, x10 pH 5.9957, shown 6.00. pH = -log10(c) when c >> 1e-7, so tenfold dilution adds 1. Hook qualifier 'strong acid' rests on c4 (verified). |
| c2 | verified | Opened OpenStax Chemistry 2e (2019; git clone of github.com/openstax/osbooks-chemistry-bundle), section 14.1 (module m68803): 'at 25 °C, Kw has a value of 1.0 × 10^-14' and in pure water [H3O+] = [OH-] = 1.0 × 10^-7 M; section 14.2 (m68804): neutral solution at 25 °C has pH = 7.00. The cited CRC table was not opened; this verdict rests on OpenStax. |
| c3 | verified | Derivation re-run in node with an independent bisection solver: x1,000 pH 6.9783 (shown 6.98), acid 1.0e-8, water 9.512e-8; x10,000 pH 6.9978 (shown 7.00); x100 6.791. Matches Demo.tsx solve() and the stage readouts. Rests on Kw (c2) and full dissociation (c4), both verified. |
| c4 | verified | Opened OpenStax Chemistry 2e section 4.2 (m68710): 'Virtually every HCl molecule that dissolves in water will undergo this reaction ... called strong acids', HCl in the 'Common Strong Acids' table; section 11.2 (m68781): 'essentially 100% complete for HCl'. Applies a fortiori at 1e-5 to 1e-9 mol/L. The cited pKa -6 was not checked and is not shown to learners. |
| c5 | verified | Convention, stated in the question ('pure water at 25 °C'). The factual half ('water left open to air absorbs CO2 and is slightly acidic') checked in OpenStax Chemistry 2e section 14.2 (m68804): 'Normal rainwater has a pH between 5 and 6 due to the presence of dissolved CO2 which forms carbonic acid'. |
| c6 | verified | Derivation: [H+] = c + [OH-] >= [OH-] with [H+][OH-] = Kw gives [H+]^2 >= Kw, so pH <= 7.00 at 25 °C for any c >= 0. Node: x100,000 pH 6.9998, approaching 7 from below. The stage total bar never crosses the pH 7 line on any preset. |
| c7 | verified | Node (scratch acid.mjs) with the reveal's rounding (toPrecision(2)): x10 'acid supplies 100 times more', x100 'acid still supplies 1.6 times more', x1,000 'water supplies 9.5 times more', x10,000 'water supplies 100 times more' (99.5 -> 100). Water's H+ 9.9e-9, 6.18e-8, 9.51e-8, 9.95e-8. Minor wording in the source field: 'Below x100 the acid supplies more' should read 'up to and including x100' (x100 is 1.6 to 1); learner text unaffected. |

**Result (Pass 38):** 7 verified.
