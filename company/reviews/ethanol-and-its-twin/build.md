# Build note: ethanol-and-its-twin

Builder: demo-builder (wave-i-chemistry), 2026-10-14. Brief: `company/domains/briefs/chemistry.matter-reactions.md` #1 (format before / after toggle). Status draft; every claim unverified.

Departures from the brief: the cluster is a ring of six molecules in which each ethanol lends its O–H to the next one's O (6 dashes), so "pull one out" breaks exactly the 2 dashes that molecule takes part in. Only heavy atoms and the H on O are drawn (the C–H hydrogens are left out; claim c5 says so). The boiling temperatures and dash counts live in two record lines under the ring, one per form, instead of a separate readout row, so both forms' records stay on stage after every toggle. The brief's water sentence (18 u, 100 °C) was cut to keep the reveal at 3 short paragraphs; claim 4 of the brief is therefore not used. The button label is "O to the middle" (the brief's "Move the O to the middle" did not fit a phone button). Fact-checker flag: CRC gives dimethyl ether −24.8 °C, which rounds to −25; the brief and the lesson say "about −24 °C" (claim c2).

## Pre-flight v1

1. **Title and hook.** "Ethanol and its twin" / "Same nine atoms, same mass, one atom moved. Does the twin boil at the same temperature?" They set up the tension (same mass) but give no temperature and do not rank 35 °C against −24 °C.
2. **Options.** "about 78 °C", "about 35 °C", "about −24 °C": all numbered, all to the degree, all with "about".
3. **Locked stage.** The ethanol ring (6 molecules, red O, white H on O, 6 dashes), the key "Red: O. Dashes: hydrogen bonds." and one record line "Ethanol boils 78 °C · 6 dashes" (78 °C is in the question). No ether is drawn and no ether temperature is shown.
4. **Reveal values.** "about 78 °C", "about −24 °C", "46 u", "100 °C apart": constants of the two molecules, shown in the record lines once each form is seen (milestone "ether-shown" for −24 °C). "6 dashes": computed from the ethanol ring (`hBonds`), on the ethanol record line from the start. "broke 2": recorded when the ethanol is pulled (milestone "pulled-both"). "0 dashes, nothing to break": recorded when the ether is shown and pulled (milestones "ether-shown" and "pulled-both").
5. **QA path.** DOM order "Pull one out" (ethanol pulled: 2 dashes break, record "pull broke 2"), "O to the middle" (ring becomes ether with the molecule still out: "0 dashes · pull broke 0"; both milestones reached on the 2nd press). When the reveal opens both record lines are on the stage, and the ether ring with the pulled molecule is drawn.
6. **Reset.** There is no Reset. The two toggles ("Push it back", "O back to the end") change the picture but never clear a record line. Reveal text from the QA-path run: "Same nine atoms, same 46 u, yet the boiling points sit about 100 °C apart: ethanol about 78 °C, dimethyl ether about −24 °C. In your ethanol ring, 6 dashes linked an O–H to a neighbour's O, and pulling one molecule out broke 2. With the O in the middle, no H sits on oxygen: 0 dashes, nothing to break. Boiling pulls molecules apart, so that grip, the hydrogen bond, sets the temperature, not the weight."
7. **Phone fit.** `node tools/reveal-fit.mjs` at 390×844, 2026-10-14: verdict fit, crop 0 px, hiddenBelow 0, namedHidden 0, 83 reveal words (the tool's count, including the kit's "Not quite" line), phoneFit true, picScale 1. Screenshot `artifacts/reveal-fit/ethanol-and-its-twin.png`. The reveal points at the dash counts and the two boiling temperatures; the ring and both record lines are visible. Smallest picture label 10.5 px at scale 1; controls 35 px tall.

Measured on my own `next dev` of this worktree (port 3547), not on :3530: the shared dev server on 3530 serves the main checkout, which does not have these files yet. Stage text at most 24 words (key and two record lines). No console errors. Not run: next build, computer-use QA, walkthrough (the task said not to).

## v2: learner r10 fixes (W-840, demo-builder, 2026-10-14)

Review: company/reviews/ethanol-and-its-twin/2026-10-14-learner-adult-beginner-r10.md. Changed claims are reset to unverified; no claim marked verified by the builder.

- Legend now: 'Red: O. White: H on O. Dashes: hydrogen bonds.' and 'Grey: C, each with its own Hs (not drawn).' so the ether visibly still has its H's.
- Reveal: 'nothing to break' became 'only a weaker pull to break', and the O–H link is said: '(the O pulls electrons off its H, leaving it bare)'. 'about 100 °C apart' dropped for budget. c2, c3, c5 rewritten (unverified).

## Pre-flight v2

1. Unchanged.
2. Unchanged.
3. Locked: ring of ethanols with the new two-line legend (no boiling points).
4. Reveal values unchanged (6 dashes, broke 2, 0: recorded).
5. QA path unchanged.
6. Reset: no Reset (about 79 reveal words).
7. **Phone fit.** reveal-fit verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true, 92 tool words.

QA: tests/qa/contract.spec.ts against next dev on :3632 (QA_BASE_URL, QA_ONLY = the 18 r10 lessons), phone and desktop both passed (36/36, artifacts/qa-f2/final/qa-report.json, harness stamp clean). Fit: committed tools/reveal-fit.mjs --url http://localhost:3632 --strict, tool stamp clean (artifacts/reveal-fit/f2-final.json; screenshot artifacts/reveal-fit/<slug>.png). The tool's word count includes the verdict line and the trust link (about 6 words).
