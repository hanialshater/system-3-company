*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): steady-catch-from-a-lake
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows logistic growth, a population grows fastest at half full; does not know that this peak growth sets a hard ceiling on any fixed yearly catch, or that a catch just above it empties a full lake slowly and then fast)
Screenshots seen: yes (artifacts/walkthroughs/steady-catch-from-a-lake/sheet.png, recorded 2026-10-14T18:53)
Verdict: pass

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "About 870"; moved "Catch per year" from 110 to 130 (one drag); opened reveal.

1. **The prediction is genuine.** "only 13%" in the hook baits "About 870"; "About 600" is the settle-somewhere answer. "About 0" feels absurd for 13%, which is the point.
2. **The payoff is on the chart.** The 130 line falls slowly past the dashed "half full: grows fastest, 125 a year" line and then dives to "130: empty", "empty, year 55". Slow-then-fast is visible in the curve's shape. The fish-dot row (• = 10 fish) going hollow at year 60 is a nice second read.
3. **"In your run ... a catch of 120 settled near 600" quotes something I did not choose.** I made one drag from 110 to 130. The faint lines and the "600 (120)" label appeared because the drag passed through 120. The legend says "Faint lines: catches you tried", which is true by the slider's logic, but I did not *try* 120; I noticed it only when the reveal named it. A tap-or-keyboard user who jumps straight to 130 may not get those lines at all.
4. **Where the idea I lack first appears: "Any catch above 125 takes more than the lake can ever replace" (reveal).** The stage shows the dashed half-full line labelled 125 a year, but not why that number is a ceiling for a *catch*: the lake's growth at every other level is less than 125. A one-line "growth at this level" readout as the curve falls would make it seen. My boundary knows "fastest at half full", so I can join the dots; it is told, not shown.
5. Reveal fits with its picture (03-reveal): both endings, the dashed line and "empty, year 55" on screen. "Toy lake: no weather, no luck." is said.
6. Trust link reads "0/4 claims checked" (fact-checker's lane).

Verdict reason: the hard ceiling and its slow-then-fast collapse are seen on the chart; finding 3 is a "seen" wording issue, not a falsehood.

Fixes (hypotheses for the builder, not tested):
- Gate or prompt the 120 case explicitly ("now set 120"), or reword the reveal to "a catch of 120 settles near 600 (faint line)" without "in your run".
- Show "lake adds N a year" for the current level on the falling curve.

## After reading build.md (Pre-flight v1)

- The "settled" milestone fires on the first catch at or below 120 that the learner sets, and the reveal is gated on it, so the 120 case is always recorded before the reveal. On a keyboard path (110 → 120 → 130) the learner does set 120 deliberately. On a drag path, as walked here, 120 is passed through, and "In your run" over-claims a little (finding 3). Kept as a wording hypothesis.
- Fix route: none required for launch.
