*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): short-jobs-clear-a-queue
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Compare total waiting under two orders.)
Screenshots seen: yes (artifacts/walkthroughs/short-jobs-clear-a-queue/sheet.png, recorded 2026-10-15T21:37)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Short jobs first"; tapped Run queue (long → quick → small: Wait 65m), Swap first (quick → long → small: 40m), Try target (quick → small → long: 20m); opened reveal.

1. **The numbers tell the story.** Same three jobs and the same 45 minutes of work, but total waiting falls 65 → 40 → 20 as the short jobs move forward. The hook ("Same total work, different waiting time") is shown, not asserted. The reveal's "Total waiting is the sum of each start time" is the key I needed. I could check it by hand (0 + 5 + 15 = 20).
2. **Where I wobbled: the notation.** "30m/60due", the red due line, and "Late 0 / Prereq 0" are all noise for this lesson (no deadlines or prerequisites matter here). I spent a moment wondering whether "Late" was the point.
3. **The prediction is fairly easy** ("Short jobs first" sounds right to most people), but the size of the drop (65 → 20) is the surprise.
4. "Try target" is an opaque button name. "in this fixture" in the question is system-speak.
5. The reveal is honest that this objective ignores deadlines.

Notes (not blocking):
- Hide Late/Prereq when they cannot change; explain "start time = waiting" on the bars.
- Rename "Try target" (e.g. "Shortest first").

Verdict reason: the reveal answers the learner's question (why order changes waiting when total work is the same) with the 65 → 20 sequence just seen.

## After reading the brief (meta.json)

- The objective ("Compare total waiting under two orders") is delivered (three orders, in fact).
- The trust-sheet worked example uses jobs of 2, 8 and 20 (12 vs 48), while the stage uses 5, 10 and 30 (20 vs 65). Route: fact-checker (consistency).
