*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): shorter-folder-path
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Count path segments before and after removing a redundant folder.)
Screenshots seen: yes (artifacts/walkthroughs/shorter-folder-path/sheet.png, recorded 2026-10-15T21:37)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Segments traversed"; tapped Count levels (Total levels 8), Remove old level (6); opened reveal.

1. **Where understanding first broke: the prediction is not a prediction.** "Which measures this folder-navigation exercise?" with "Segments traversed" vs "File size". That is a question about the lesson's own metric, not about folders. Nothing I believe about folders is tested.
2. **"Redundant" is asserted, not shown.** The reveal says "Removing the redundant middle directory reduces the path segment count." Why is "old" redundant? In real life "old" usually means something (archived vs current). After removal, notes and maps sit directly in work/, and the old/current distinction is gone. A beginner may learn "delete folder levels to save clicks" without the condition that the level carried no meaning.
3. **The count itself is clear:** 3 + 3 + 2 = 8 becomes 2 + 2 + 2 = 6, with per-file counts on the right. The caveat "not a measured speedup or a rule against all deep folders" is honest.
4. "Exercise records", "Records ?" and "Total levels" are system words.

Fixes (for the builder):
- Ask a real prediction ("How many clicks does removing 'old' save across these three files?" 1 / 2 / 3).
- Show why the level is redundant (e.g. "old" is the only folder inside work/, or it holds everything), or name the trade-off.

Verdict reason: the prediction asks which metric the exercise uses rather than anything about folders, and the reveal calls a level "redundant" without showing why, which risks teaching "remove levels" without its condition.

## After reading the brief (meta.json)

- The objective ("Count path segments before and after removing a redundant folder") is delivered as arithmetic. The "redundant" condition is assumed, not shown (finding 2).
- The trust-sheet claim ("A passes through four folders and B through two; removing '2024' and 'old' saves two levels") describes a different fixture: there is no '2024' folder on stage. Route: fact-checker.
- Fix route: demo-builder (real prediction; show why the level is redundant).
