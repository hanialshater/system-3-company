# Fact-check: find-the-co2-in-air (2026-10-14)

Lesson: src/demos/chemistry/find-the-co2-in-air/ (status draft, version 1).

## Pass 38

Checker: fact-checker, a fresh instance (set B: chemistry, life, big-ideas). I did not write, build or record these claims. Method: I read Demo.tsx on every reachable path before I read the claims, and checked the walkthrough transcript (artifacts/walkthroughs/find-the-co2-in-air/transcript.md) for learner-visible sentences. Then I re-ran every number in node from my own copies of the lesson logic. Scratch scripts were not kept in the repo; each note gives the method and the values. Web: only GitHub (raw files and public clones) and PyPI were reachable. WebFetch fails DNS, and journal, publisher, library, Gutenberg and archive.org hosts are blocked (W-583). Sources I opened: OpenStax textbooks, cloned from github.com/openstax (Chemistry 2e, Biology 2e, Concepts of Biology, Anatomy and Physiology 2e, Astronomy 2e, College Physics 2e, Psychology 2e; CNXML modules, cited by module id); PyPI chemicals 1.5.2 (CRC, JANAF, ATcT tables), ussa1976 0.3.4 (US Standard Atmosphere 1976 composition) and pyrolite 0.3.8.post1 (ICS chronostratigraphic chart 2024/12); and the NOAA CO2 series via github.com/datasets/co2-ppm. No verdict rests on a source I could not open. A claim whose cited source was not opened, but which I verified from another opened source, says so in its note.

Paths read: four gas chips in any order, Magnify, One breath; chips are one-shot so every record is on stage at the reveal.

Unrecorded claims: One, correct but unrecorded: the recall's why, "A litre of air holds about 2.5 x 10^22 molecules, so 2 per million of them is still about 5 x 10^16". Node: at 25 °C and 1 atm, 1 L = 2.46e22 molecules (2.69e22 at 0 °C); x 2e-6 = 4.9e16. Builder: add it as a derivation claim so the next pass can verify it (I did not add it, because a claim I recorded is one I could not verify).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Opened the U.S. Standard Atmosphere 1976 sea-level volume fractions as transcribed in PyPI ussa1976 0.3.4 (constants.py, F: N2 0.78084, O2 0.209476, Ar 0.00934; cites NASA-TM-X-74335). Per 10,000: 7,808.4, 2,094.8, 93.4, rounded to 7,808, 2,095, 93. Cross-check: OpenStax Astronomy 2e 'The Massive Atmosphere of Venus' (m59840) table, Earth N2 78.1%, Ar 0.93%, O2 21.0%; OpenStax Chemistry 2e 9.1 (m68750) 78.1% N2, 21.0% O2. The CRC table was not opened. |
| c2 | verified | Opened NOAA GML global marine-surface annual means via the datasets/co2-ppm mirror on GitHub (data/co2-annmean-gl.csv, ODC-PDDL, sourced from NOAA ESRL): 2023 419.35 ppm, 2024 422.79, 2025 425.62; Mauna Loa 2023 421.08. 'About 420 ppm, 0.042%, about 4 of 10,000' holds for the cited 2023 value, and 4 of 10,000 still holds today (monthly global mean mid-2026 about 428). WMO Bulletin No. 20 itself was not opened. Non-blocking: the figure rises about 2.5 ppm a year and the stage gives no year; consider 'about 420 ppm (2023)' or update to about 425 (2025 global mean). cm-chemistry's call. |
| c3 | verified | Node: 7,808 + 2,095 + 93 + 4 = 10,000. The left-out gases in USSA 1976 (ussa1976 0.3.4 constants.py): Ne 18.18 + He 5.24 + Kr 1.14 + Xe 0.087 + CH4 2 + H2 0.5 = 27.15 ppm, 'about 27 ppm' and 0.27 per 10,000, under one dot. Not shown to learners. |
| c4 | verified | Node, my own constants (R = 8.314462618): n = 101,325 x 0.0005 / (R x 298.15) = 0.02044 mol; x 6.02214076e23 x 420e-6 = 5.17e18, stage shows '5 × 10¹⁸' (toFixed(0) of 5.17); at 428 ppm 5.27e18, still 5. Tidal volume opened in OpenStax Anatomy and Physiology 2e 'The Process of Breathing' (m46549): 'Tidal volume ... about 500 milliliters'. Guyton & Hall was not opened. |
| c5 | verified | Definition opened in OpenStax Chemistry 2e section 3.4 'Other Units for Solution Concentrations' (m68704): ppm, 'like percentage (part per hundred)', a share. For gases the NOAA data description (datasets/co2-ppm README) defines ppm as molecules of CO2 over all molecules in dry air. The 'huge number' follows from c4 (verified). IUPAC Gold Book not opened. |
| c6 | verified | Convention checked against the code: re-ran the mulberry32 seed 42 Fisher-Yates shuffle in node (own copy): CO2 cells (39,81), (27,45), (83,89), (38,64), closest pair 17 cells apart, none at the edge. Counts are assigned from GASES, not from the seed, so no count depends on the seed. |

**Result (Pass 38):** 6 verified.

Non-blocking for cm-chemistry: CO2 rises about 2.5 ppm a year. NOAA global annual means (datasets/co2-ppm mirror): 2023 419.35, 2024 422.79, 2025 425.62 ppm; mid-2026 monthly about 428. "About 420 ppm" with no year is already dated. Consider "about 420 ppm in 2023", or about 425 citing the 2025 NOAA global mean. "4 of 10,000" holds either way.
