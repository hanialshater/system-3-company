# Build note: the-loser-flips-the-winner

builder: demo-builder (ncm-specs) · 2026-10-14 · v1 draft · brief: company/domains/briefs/math.discrete.md, Course: NCM, brief 2 · spec: company/design/specs/the-loser-flips-the-winner.md (+ .svg)

- Intent, as specced: five ballot cards (3 × A > B > C, 2 × B > C > A) with name tiles; "Count points" puts Borda points on every tile and fills the score bars; the toggle "C on the ballot" ⇄ "C removed" turns C's tiles into dashed ghosts **in place** (no reflow, so A stays visibly 3rd on cards 4–5) and recounts live once counted; "A vs B on each ballot" shows the gap chips (+1 A on 1–3; +2 B with "C between" on 4–5, or +1 B with "was +2" after removal). Log keeps both counted states.
- Scores and gaps are computed from the ballots (ballotPoints/totals/gapAB), not hard-coded. Re-run via a transpile-only harness on Demo.tsx: with C A 6, B 7, C 2; without C A 3, B 2. Reveal figures (2-point lead, 4 beats 3, 7–6, 3–2) are read from the same functions.
- Milestones (minInteractions 3): count-with-c, count-without-c, gaps. QA path in DOM order: Count (B 7–6) · toggle (C removed, A 3–2) · gaps. Count and gaps disable after use; the toggle always changes tiles/rule line.
- Show the why: the cause (C between B and A doubling B's lead on ballots 4–5) is the chip pair "+2 B" → "+1 B / was +2"; the reveal points at it.
- Format "before-after"; interactions choice-before-reveal, toggle-before-after, milestone-gate. Reference: E&K chapter 23 only.
- Claims c1–c5, all unverified. c4 (Borda / IIA, E&K ch. 23, Borda 1781) carries the brief's "Attribution: fact-checker confirms" flag. c5 records the stage rule line as a convention.
- Not run, per the batch instruction: next build, typecheck, QA, walkthrough. Status stays draft until local QA.

## Pre-flight v2

r7 findings: title "Drop the loser, change the winner?" and hook "Could the winner change?" pointed at the winner changing and argued the learner out of "B again" (the misconception) before the commit; toggle read as a state ("C on the ballot"); "4 beats 3" was a sum the stage did not show. Fixes: title "Who wins once C is gone?", hook "C came last. Take C off the ballot and recount the same five voters."; toggle now reads "Remove C" / "Put C back"; once the chips are on, a stage row "Lead sums with C: B 2 + 2 = 4, A 1 + 1 + 1 = 3. Without C: A 1 + 1 + 1 = 3, B 1 + 1 = 2." (new claim c6, unverified). Reveal text unchanged.

1. **Title and hook.** "Who wins once C is gone?" / "C came last. Take C off the ballot and recount the same five voters." Neither says or hints that the winner changes; B again, A and a tie are all open.
2. **Options.** "B again" / "A" / "A tie": words, none numbered.
3. **Locked stage.** Five ballots (three A > B > C, two B > C > A), "Borda: 2 points for 1st, 1 for 2nd, 0 for 3rd.", grey bars with "?". No points, totals, chips or winner.
4. **Reveal values.** "voters 1–3 ... 4–5": the ballots, always drawn. "2-point lead", "1 each": (b) milestone "gaps", the chips and the Lead sums row. "4 beats 3": (b) milestone "gaps", Lead sums row. "B won 7–6": (b) milestone "count-with-c", log line "With C: B wins 7–6 (C 2)." "every lead is 1: A wins 3–2": (b) milestone "count-without-c", log line "Without C: A wins 3–2." and the Lead sums row.
5. **QA path.** DOM order "Count points" (count-with-c), "Remove C" (count-without-c), "A vs B on each ballot" (gaps): 3 milestones in 3 presses. Both log lines and the Lead sums row are on the stage when the reveal opens.
6. **Reset.** No Reset; "Put C back" keeps both log lines and the Lead sums row (it covers both states). Reveal from that run: "Nobody changed their mind about A versus B: voters 1–3 put A above B, voters 4–5 put B above A, before and after. With C on the ballot, C sat between B and A on ballots 4 and 5, so each gave B a 2-point lead; A's voters gave A 1 each. 4 beats 3: B won 7–6. Without C every lead is 1: A wins 3–2. Points voting like this can let a last-placed option pick the winner."

Not seen in a browser (no build/QA this wave).

## Revision v3 (phone fit, build 6 measurement, 2026-10-14)

- Build 6 (W-287 10 px label floor) measured crop 122 px at 390×844 with the reveal open, 84 words. Re-measured on the dev server (localhost:3530) before editing: 23 px; parts picture 218 (not fitted), controls 52, text 80; reveal 232 px of a 618 px window. Demo.tsx and styles.module.css were last written at 11:55 today with no build note for that change, which may explain the gap to build 6; I did not trace it. What was off screen: the rule line ("C removed: 1 point for 1st, 0 for 2nd." / "voters 1–5").
- Changes (geometry only, no text):
  - Score bars: BAR_PITCH 24 → 21, BAR_Y0 162 → 158, bar height 18 → 17, viewBox 340×232 → 340×219.
  - Stage gaps 6 → 3 px; button padding 4px 6px so "Count points" and "A vs B gaps" stay on one line (row 52 → 44 px; min-height 44 px kept).
- Reveal unchanged, 84 words with the verdict line. No claim text or described behaviour changed, so no claims reopened.
- Not changed: r8 kit finding (ballot labels small after the kit shrink). At the reveal the picture is no longer shrunk (fitted: none, drawn at scale 1).

## Pre-flight v3

1-6. Unchanged from Pre-flight v2 (title, hook, options, locked stage, reveal values, QA path, reset and reveal text are the same).
7. Phone fit (measured, `node tools/reveal-fit.mjs --url http://localhost:3530 the-loser-flips-the-winner`, dev server): crop 0 px (dev-server baseline 23; build 6 reported 122), hiddenBelow 0, phoneFit true. Stage 359 px (picture 206 at scale 1, controls 44, text 80), reveal 232 px, 84 words. Named and visible: "wins"; ballots 4 and 5, both log lines and the lead-sums row are on screen.
