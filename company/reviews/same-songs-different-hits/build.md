# Build note: same-songs-different-hits (demo-builder, 2026-10-14)

Built from the brief (`company/domains/briefs/probability.chance.md`, NCM batch 1 #3), the spec `company/design/specs/same-songs-different-hits.md`, and the binding changes in **`company/design/reviews/2026-10-14-design-review-ncm-specs.md` §3** (the review wins over the spec), plus its all-lessons legend-swatch rule.

- Format: simulation run, small multiples (8 worlds, 2 x 4 panels of 80 x 70, 9 gutters, fixed song order, one 0–50% share scale for all panels and both modes). Seeded `mulberry32(k)` for world k = 1..8, one draw per listener, the same draws in both modes. The rule is computed once at module load (16 runs x 1,000 listeners, checkpoints every 100).
- Review §3 changes applied: (1) world number and second rule line at 11 px (bar area is y 16–58 in panel units, so the 11 px number sits above the tallest possible bar); (2) chips "On" / "Off" inside `role="group" aria-label="Copy others"`, each with `aria-label` "Copying on" / "Copying off", `aria-pressed`, and the active one disabled by attribute. All 4 controls exist at first paint.
- Legend-swatch rule: the "best song" legend entry is an inline 14 px SVG drawn with the same `Tri` component as the stage triangles (no glyph).
- Deviation from the spec, on purpose: the spec says "`interact()` on every control press". With `minInteractions = 2` that would unlock the reveal after any two presses, without the two 1,000-listener states. `interact()` is called only through the milestones `copy-1000` and `nocopy-1000`, fired on the press that reaches each state. The learning designer may want to correct the spec.
- Bars animate with a 300 ms CSS transform transition (covers both "All 1,000" ≤ 400 ms and chip ≤ 300 ms); reduced motion is handled by the global rule.
- Reveal: quotes only values computed from the stage's own 1,000-listener runs (lowest finish and its world, top-share ranges), both of which are required to unlock it. Reveal ~95 words.
- Numbers re-run in node with the exact Demo.tsx rule: on 3,1,7,1,4,1,1,3 / off 2,1,2,1,2,1,2,1; top share on 34.9–48.2%, off 14.7–17.6%; world 3 copying picks 33,40,7,38,214,158,482,28; world 3 is 7th at 100, 200, 300, 500 and 1,000 listeners. Highest share at any checkpoint is 48.2%, so the 50% scale never clips.
- MusicLab (Salganik, Dodds & Watts 2006): **not in any learner text.** Kept as claim c7, unverified, marked "NOT SHOWN TO LEARNERS until a human source check".
- Reference: easley-kleinberg-2010 ch. 18, section recorded as 18.3. **Section unconfirmed** (brief: 18.3–18.4, book site blocked). Claim c8 records it for the fact-checker.
- Recall question written by the builder (products in two towns), not by the CM.
- Open: in the predict phase on a 390 x 844 phone the chip row sits at the bottom edge of the stage (visible but tight); the reveal scrolls the card so the two rule lines sit just above the visible frame. Visual designer / accessibility reviewer: check the ▲ and dashed-frame cues at 80 x 70 (review routing).

## Revision v2 (demo-builder, 2026-10-14, session 2)

Findings from the learner review (quality-wins-assumption) and the fact-check advisory, each answered:

- **Finding 4 (best song 1st in 4 of 8 both ways; contrast hidden):** the stage summary now shows the spread of the best song's finishes, "on 1st-7th, off 1st-2nd" (from the 1,000-listener states reached), replacing "lowest finish". The reveal says outright that the best song was 1st in 4 of 8 worlds with copying on and 4 of 8 off ("copying did not hide quality, it made the result unpredictable") and quotes the range of finishes first, top-song share second. New claim c9 (unverified) covers the counts and ranges.
- **Phone clipping of the On/Off row:** the two rule lines were merged into one ("Pick weight = ... · appeal 1.0-1.7"), which removes one line and the jargon "seeds 1-8". In the 390 px walkthrough predict frame the whole chip row is now inside the stage frame.
- **Fact-check advisory (c3):** stage line reads "Pick weight". c3 text reworded, back to **unverified**.
- **Finding 2 (answer hinted by hook):** hook rewritten to "How alike do the worlds turn out?" (no suggested answer).
- **Finding 1 (jargon):** "seeds" removed from the stage.
- **Not done:** finding 5 (early lock-in not forced) and finding 8 (Off jumps to the final state) need a design choice, not a build fix. Finding 3 (worst of 8 is a selection) is in the question wording, unchanged; c1's source discloses it.
- Claims now unverified: c3 (text changed), c9 (new). All others unchanged.
- Numbers: counts of 1st and ranges are computed in code from RUNS (on 3,1,7,1,4,1,1,3 gives 4 firsts, 1st-7th; off 2,1,2,1,2,1,2,1 gives 4 firsts, 1st-2nd), matching the screenshots.

## Revision v3 (demo-builder, 2026-10-14, polish)

- Reveal wording: "copying did not hide quality, it made the result unpredictable" replaced by "Copying did not stop the best song winning as often: 4 of 8 worlds with copying on and 4 of 8 with it off. It made the result unpredictable: ..." (counts computed in code). Claim c9 text matched and back to **unverified**; other claims unchanged.
