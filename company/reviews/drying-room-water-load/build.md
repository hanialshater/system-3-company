# Build note: drying-room-water-load

## Pre-flight v2

2026-10-14, demo-builder. Board W-361(a).

- **Problem (safety second read, company/reviews/drying-room-water-load/2026-10-14-safety.md):** the reveal's ventilation line "Dry indoors with a window open or a vent on: the water ends up in the room." contradicts itself. With a window open, the water leaves the room.
- **Change:** the `warning` in `src/lib/lifehacks/home-lessons.ts` is now the reviewer's first proposed wording, verbatim: "Dry indoors with a window open or a vent on: the water you dry goes into the room's air, and without ventilation it can cause damp and mould." Claim c6 has the same text.
- **Claims:** c6 is unverified (advice claim, source still owed, fact-checker). c1 to c4 keep their fact-checker verdicts because their text did not change. c5 was already unverified. Version 1 → 2.
- **Still open, not mine:** (1) The reviewer wrote this wording, so a reader outside lifehacks-safety-reviewer must approve it (W-361(c), suggested evaluation-steward). (2) `recall.why` still has the "do not infer mould or health outcomes" phrase, which waits on the session 2 recall patch. (3) International should check the region flag: opening a window may not help in humid or air-conditioned climates.
- **Not done:** no build and no QA. The line renders in the reveal only (HomeLesson.tsx), and I did not screenshot the reveal.

## Pre-flight note (W-383, version unchanged)

2026-10-14, demo-builder. From FC LH-2 Pass LH-2. The unrendered c5 transfer prompt is deleted (`.recall` replaces it). Nothing a learner sees changed, so the version stays 2.
