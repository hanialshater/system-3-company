# Fact-check: ethanol-and-its-twin (2026-10-14)

Lesson: src/demos/chemistry/ethanol-and-its-twin/ (status draft, version 1).

## Pass 38

Checker: fact-checker, a fresh instance (set B: chemistry, life, big-ideas). I did not write, build or record these claims. Method: I read Demo.tsx on every reachable path before I read the claims, and checked the walkthrough transcript (artifacts/walkthroughs/ethanol-and-its-twin/transcript.md) for learner-visible sentences. Then I re-ran every number in node from my own copies of the lesson logic. Scratch scripts were not kept in the repo; each note gives the method and the values. Web: only GitHub (raw files and public clones) and PyPI were reachable. WebFetch fails DNS, and journal, publisher, library, Gutenberg and archive.org hosts are blocked (W-583). Sources I opened: OpenStax textbooks, cloned from github.com/openstax (Chemistry 2e, Biology 2e, Concepts of Biology, Anatomy and Physiology 2e, Astronomy 2e, College Physics 2e, Psychology 2e; CNXML modules, cited by module id); PyPI chemicals 1.5.2 (CRC, JANAF, ATcT tables), ussa1976 0.3.4 (US Standard Atmosphere 1976 composition) and pyrolite 0.3.8.post1 (ICS chronostratigraphic chart 2024/12); and the NOAA CO2 series via github.com/datasets/co2-ppm. No verdict rests on a source I could not open. A claim whose cited source was not opened, but which I verified from another opened source, says so in its note.

Paths read: Pull / Push back, O to the middle / back, in either order; the reveal reads the records, which hBonds() sets.

Unrecorded claims: None.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Structure count re-done: CH3-CH2-OH and CH3-O-CH3 each have 2 C, 6 H, 1 O = 9 atoms. Node: 2(12.011) + 6(1.008) + 15.999 = 46.069 u (46.068 with the older weights in the chemicals 1.5.2 element table). OpenStax Chemistry 2e section 10.1 (m68761, opened from the openstax GitHub repository) gives 46 g/mol for both, and section 2.4 (m68693) calls them structural isomers of the same composition. |
| c2 | verified | Opened CRC Handbook Heat of Vaporization table as transcribed in PyPI chemicals 1.5.2: ethanol Tb 351.44 K = 78.29 °C, dimethyl ether Tb 248.35 K = -24.80 °C (Yaws table in the same package: 248.31 K). OpenStax Chemistry 2e section 10.1 (m68761) worked example: dimethylether -24.8 °C, ethanol 78.5 °C. Gap 103 °C, 'about 100 °C' holds. Non-blocking: -24.8 rounds to -25; 'about -25 °C' would be the more accurate rounding (cm-chemistry's call). |
| c3 | verified | Opened OpenStax Chemistry 2e section 10.1 (m68761): 'Molecules with F-H, O-H, or N-H moieties are very strongly attracted to similar moieties in nearby molecules ... called hydrogen bonding'; its worked example says CH3OCH3 is polar (dipole-dipole) while CH3CH2OH 'has an -OH group' and so hydrogen-bonds. Dimethyl ether has no O-H, so it cannot donate. The cited IUPAC 2011 definition was not opened; this verdict rests on OpenStax. |
| c4 | verified | Opened OpenStax Chemistry 2e section 10.1 (m68761): same shapes and molar masses (46, 46 g/mol), 'so they will exhibit similar dispersion forces'; ethanol's hydrogen bonding makes the strongest IMFs 'and thus boiling points'. Corroborated by CRC enthalpy of vaporization at Tb (chemicals 1.5.2): ethanol 38.56 kJ/mol vs dimethyl ether 21.51 kJ/mol. The cited Atkins chapter was not opened. |
| c5 | verified | Convention, checked against the code: hBonds() gives 6 dashes in the ethanol ring; pulling molecule 0 breaks donor 0->1 and donor 5->0 = 2; ether ring 0 dashes and 0 broken. Transcript reveal reads '6 dashes ... broke 2 ... 0 dashes'. One donated and one accepted H-bond per ethanol is consistent with OpenStax 10.1's O-H donor/acceptor picture. Note: the stage does not say 'schematic'; the reveal frames it as 'your ethanol ring', which does not overclaim. |

**Result (Pass 38):** 5 verified.

Non-blocking for cm-chemistry: dimethyl ether boils at -24.8 °C (CRC via chemicals 1.5.2; OpenStax 10.1), which rounds to -25 °C; the lesson says "about -24 °C". This is inside "about" and does not change the answer, but "about -25 °C" is the better rounding.
