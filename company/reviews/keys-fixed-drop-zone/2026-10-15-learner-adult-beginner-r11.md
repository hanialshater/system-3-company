*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): keys-fixed-drop-zone
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: In the stated worst-case search, an unknown location may require checking every box. A maintained address directs the search to one box; the benefit depends on returning the item to that address.)
Screenshots seen: yes (artifacts/walkthroughs/keys-fixed-drop-zone/sheet.png, recorded 2026-10-15T21:34:28.358Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Unknown box"; tapped Known address; slid Possible places 6 -> 8; opened reveal.

1. **No real prediction.** "Which search needs fewer possible box checks?" with "Unknown box" vs "Known address" answers itself. The interesting belief (a fixed spot only helps if you always put the keys back) is never put to me as a choice.
2. **The unknown-box count is never shown.** I saw "Worst-case checks 1" twice. The 6 (then 8) checks for an unknown box never appear, so the slider I moved changed nothing visible.
3. **Where understanding first broke: the key point is only in text.** "The benefit depends on returning the item to that address" is the real hack, but nothing on stage lets me skip returning the keys and watch the search grow back to every box.
4. Layout jumps between a 2×3 grid (locked) and a single row (explore); box 1 is highlighted for no stated reason. Button highlight stuck on "Unknown box". "6boxes · knownaddress" label run-together text.
5. Honest hedge: "This counts checks, not forgetfulness or memory performance."

Verdict reason: the prediction answers itself, the unknown-box worst case is never displayed, and the put-it-back condition the reveal depends on is never shown.

## After reading the brief (meta.json)

- Objective is the reveal sentence. Claim c3 says worst case = N for unknown, 1 for a maintained address; the N never appears on stage (finding 2), and the "maintained" condition has no control (finding 3).
- The recall card ("leave them elsewhere once and the search can be all 6 places again") is the best sentence in the lesson; it should be on stage.
- Fix route: demo-builder.
