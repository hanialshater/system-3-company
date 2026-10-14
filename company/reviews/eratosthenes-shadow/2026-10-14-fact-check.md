# Fact-check: eratosthenes-shadow (2026-10-14)

## Pass 26 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Scope: claims open after the wave G revision. Method: read Demo.tsx (and model.ts) for every reachable branch, Reset and reduced motion before the claim sources, then re-ran the numbers in my own node scripts (scratchpad fc26-b1/). No build run.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | GeoNames (npm cities.json): Alexandria 31.20176 N 29.91582 E, Aswan 24.09082 N 32.89942 E. GeographicLib WGS84 meridian: 40,007.86 km. Node: 7.11 deg, 843 km, 50.6 arcs, 42,684 km, 6.7% (7%). |
| c5 | **disputed** | Sentence states as fact that the Sun was straight overhead at Syene; Syene (24.09 N) is north of the Tropic (brief caveat 4: about 0.65 deg today). Reveal and stage label carry no 'in the account' framing. Fix: 'In the account, the Sun stood straight overhead at Syene at noon on the summer solstice, so the well had no shadow.' The question also omits the solstice. |

**Result:** 1 claim disputed; publishing blocked until the builder fixes it and a fact-checker re-checks.

## Pass 27 (2026-10-14, re-check of pass 26 disputes and rewordings, W-256)

Checker: fact-checker (wrote and built none of these claims). Method: read the pass 26 dispute, then the new Demo.tsx on every reachable branch, including the exact path that failed in pass 26, plus Reset and reduced motion where they exist. Then I re-ran the numbers in my own node scripts (session scratchpad fc27/). No builds. External source hosts were refused (proxy 403 / DNS), so nothing below is verified on an unopened source.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | held unverified | The stage now matches. The reveal is the claim word for word, the Syene label reads 'Syene, in the account:' / 'Sun overhead, no shadow', and the question has the summer solstice. The modern-fact problem from pass 26 is gone. But the sentence now asserts what the account says (overhead Sun, noon, summer solstice, a well). That cannot be derived; it rests on Cleomedes I.7 (the well may be Strabo or Pliny, not Cleomedes: unconfirmed), and none could be opened (penelope.uchicago.edu, perseus, wikipedia, mathshistory, goobi.tib.eu all refused). Search snippets only. Also, the fact-checker drafted this wording in pass 26, so a fact-checker confirming it from snippets is not independent. Board item for the evaluation-steward. |

**Result:** 0 verified, 0 disputed, 1 held unverified. Advisory: c1 (verified 2026-10-13) makes the same kind of 'in the account' statement, and its source says 'From memory, not checked online'. The 2026-10-13 pass rested it on search snippets. Raised with the evaluation-steward on the same board item.

## Ruling on W-258: c5 held, c1 advisory (2026-10-14, evaluation-steward)

Ruler: evaluation-steward. I wrote, built and checked none of these claims. Inputs, in this order: Demo.tsx v3 (the question, the Syene label, the "The account: 7.2°" chip, the reveal, the Seen line), then c1 and c5 in meta.json, then Pass 26 and Pass 27 above. Precedent: W-222 (three claims resting on unopenable papers were rewritten to say only what the stage shows, then re-checked in pass 25) and W-247 (company/reviews/the-slowing-half-life/2026-10-14-fact-check.md, "Ruling on W-247").

**Ruling: reword both c5 and c1 to stage-only. Neither is held.**

- **Is the history essential?** No. The objective is the geometry: with parallel sunlight, the shadow angle equals the centre angle, so circumference = (360 / angle) x distance. The stage proves that with any stipulated numbers. Who reported the well, and which writer gave which figure, is context. The lesson does not depend on it. A hold would block the lesson with no end date: hosts have been refused in passes 22, 24, 26 and 27.
- **Why "in the account" is not enough.** "In the account, X" still asserts that a source says X. That is a checkable historical claim, and here the only support for it is snippets plus memory. Pass 27 would not accept that for c5. "This lesson's story: X" stipulates X as the lesson's own setup, so its only support is the stage, and the fact-checker can check it on the stage.
- **c1 falls with c5.** c1 makes the same kind of claim ("In the account, ... 5,000 stadia, giving 250,000 stadia"). Its source says "From memory, not checked online", and it was verified on 2026-10-13 from search snippets. If c5 is not verified on that basis, c1 cannot stay verified on it either. c1 goes back to unverified with the reword, so the next check rests on the stage, not on memory.
- **Independence.** The pass 26 wording was drafted by the fact-checker. This wording is drafted by the evaluation-steward, so whichever fact-checker re-checks it is independent of the drafter.

**Exact reword (demo-builder, board item below):**

- Question: `In this lesson's story, at noon a well in Syene has no shadow; in Alexandria a pole's shadow makes 7.2°. The Earth's circumference is how many times their distance?` (The answer stays hidden.)
- Stage label, two lines: `Syene, in the story:` / `Sun overhead, no shadow`
- Chip: `The account: 7.2°` becomes `The story: 7.2°`
- Reveal, first paragraph after the parallel-rays sentence: `This lesson's story: at noon the Sun stands straight overhead at Syene, so the well there has no shadow. You saw {SEEN_ACCOUNT}: 50 × 5,000 stadia, the story's numbers.` (This replaces "In the account, the Sun stood ... no shadow." and "..., as the account tells it.")
- c5 `text`: `This lesson's story: at noon the Sun stands straight overhead at Syene, so the well there has no shadow.` `support` stays `derivation`. In `source`, keep the zenith derivation, drop the Cleomedes I.7 reading, update the stage label, and append "Reworded per W-258 ruling".
- c1 `text`: `This lesson's story: at noon a well at Syene has no shadow, a pole's shadow in Alexandria makes 7.2 degrees, and the distance is 5,000 stadia, giving 250,000 stadia.` `support` becomes `simulation` (the stage computes 360 / 7.2 x 5,000 = 250,000). In `source`, drop the Cleomedes/Strabo/Pliny sentences, name the stage basis (chip, distance line, circumference readout, Seen line), and append "Reworded per W-258 ruling".
- Both claims: `status` becomes `unverified` and `checkedBy`/`checkedOn` are cleared. The builder does not self-verify. A fact-checker then re-checks both against the stage.
- "Summer solstice" is dropped on purpose. The stage does not show the date, and the story does not need it.

**Objection (cost of this ruling), and its answer:** the lesson's misconception is "the size of the Earth could only be found after satellites or long voyages". What answers it is the history, that someone did this over 2,000 years ago. A stage-only story weakens that answer. Two learner-visible sentences outside W-258 also still lean on that history: the hook ("Over 2,000 years ago someone sized the whole planet with a stick and a walk"), which is recorded as no claim at all, and c4's "how close Eratosthenes was in km", which was verified 2026-10-13 from memory. After this reword, Eratosthenes is named only in c4. Answer: the reword stands. A learner-facing historical sentence with no opened source is worse than a weaker answer to the misconception. The method itself still refutes "only after satellites": a shadow and a distance are enough. The Cleomedes framing may come back unchanged once any checker can open Cleomedes I.7 (Bowen and Todd translation, or penelope.uchicago.edu / Perseus). The hook and c4 are not ruled here. They are routed to the demo-builder item below (record the hook as an unverified claim or reword it) and to cm-geography (whether the history is worth reopening once a source can be opened). They do not block this reword.

## Pass 28 (2026-10-14, re-check of the W-258 stage-only rewording, W-262)

Checker: fact-checker. I wrote none of these claims: the c1 and c5 wording is the evaluation-steward's (W-258), and the c6 hook was reworded by the demo-builder (W-260). Method: I read Demo.tsx v4 on every reachable path: the predict phase (locked), the opening state (angle 20, story mode, no chip active), the story chip, the slider in story mode, the modern chip, the slider in modern mode, and the reveal, which needs both milestones (minInteractions 2). Numbers were re-run in my own node port of the v4 constants with d3-geo (session scratchpad fact-checker-w262/). The v4 walkthrough has not been run: artifacts/walkthroughs/eratosthenes-shadow/transcript.md is still v3 ("The account: 7.2°"). No builds, and no historical source was needed or used.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | disputed | The claim text matches the question, the chip "The story: 7.2°" and the reveal. Node: 360/7.2 = 50 exactly, 50 x 5,000 = 250,000, SEEN_ACCOUNT = "7.2° → 50 arcs, 250,000 stadia". Of all slider values (step 0.01, 2 to 30), only 7.20 fires the account milestone, and it shows 50 / 250,000. "You saw" in the reveal is true on every path. **The stage makes a different claim:** in story mode, on every path (including predict and the opening state), the distance line reads `Distance Syene to Alexandria: 5,000 stadia.` with no story frame. That is a bare statement of a real-world distance in a unit of unknown length (c4), which is what W-258 ruled must be stage-only. Fix (demo-builder): in story mode, `Distance Syene to Alexandria, in the story: 5,000 stadia.` Modern mode is unchanged (843 km is c3). |
| c5 | verified | The reveal sentence is the claim word for word. The Syene label "Syene, in the story:" / "Sun overhead, no shadow" shows in both modes and in predict. The vertical ray runs straight to Syene, and no shadow is drawn there. Derivation (node): a shadow is h x tan(z), which is 0 only at z = 0 (0.0087 h at 0.5°, 0.126 h at 7.2°). No sentence reports a source or the real Syene's Sun. |
| c6 | verified | The hook is a question. It names no source, date or person, and no option number (7/50/360). The stage computes circ = 360/angle x distance from those two inputs alone (node: 250,000 stadia; 42,684 km). The conditions (parallel rays c2, the stipulated zero-shadow reference c5, north-south cross-section) are all supplied by the stage. It also covers the reveal's "The method needed only a shadow and a distance." Non-blocking nit: neither the question nor the reveal says the places lie north-south (the recall question does). |

**Result:** 2 verified, 1 disputed. No claim among c1, c5 and c6 now asserts what a historical source says. The one remaining unframed sentence is the stage's distance line, which is c1's address. c4 (Eratosthenes in km, verified 2026-10-13 from memory) is still the only learner-visible sentence that leans on history. It was not in scope here (cm-geography, per W-258).

## Pass 29 (2026-10-14, re-check of c1 after the v5 distance-line fix, W-273)

Checker: fact-checker. I did not write c1 (wording by the evaluation-steward, W-258; the v5 line by the demo-builder, W-272, using the pass 28 fix text). Method: I read Demo.tsx v5 on every path: predict (locked), the opening state (angle 20, story mode, no chip active), the story chip, the slider in story mode, the modern chip, the slider in modern mode, and the reveal (both milestones are needed). I re-ran the numbers in node (session scratchpad `fact-checker-w269-w273/check.mjs`). No build was run. The walkthrough transcript is still v3. No historical source was needed.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | In story mode (`modern` false), on every path including predict and the opening state, the line renders `Distance Syene to Alexandria, in the story: 5,000 stadia.` (I rendered the template in node). Modern mode renders `Distance Syene to Alexandria: 843 km.` (c3). Node results: 360/7.2 = 50, 50 x 5,000 = 250,000, and SEEN_ACCOUNT is "7.2° → 50 arcs, 250,000 stadia". Of the slider values 2.00 to 30.00, only 7.20 fires the account milestone. The question, the Syene label, the chip, the distance line and the reveal all frame the numbers as the story's, which matches c1. The pass 28 dispute is resolved. |

**Result:** 1 verified, 0 disputed. Non-blocking nits for the demo-builder: the Demo.tsx header comment has no v5 line, and the line may wrap at 360 px (that is QA's to measure). Still outside this pass: c4 (Eratosthenes in km, verified 2026-10-13 from memory, with a source that was not opened). It is with cm-geography per W-258.
