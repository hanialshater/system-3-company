*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r8): one-road-cuts-the-map
lesson version: v4 (meta.json version 4)
boundary: knows-dfs. Knows depth-first search visits every town it can reach, and that a map of towns and roads is a graph; does not know that some single roads are critical (bridges), or how to tell which (meta.json learner field, same tag as r6/r7).
Screenshots seen: yes (artifacts/walkthroughs/one-road-cuts-the-map/sheet.png, build 5, 11 frames; 11-reveal.png opened at full size)
Verdict: revise

## Findings (written from the walkthrough, before build.md)

Chose option 1 ("0 of 7").

1. **No answer before the commit: met.** Options "0 of 7 / 1 of 7 / 3 of 7 / 7 of 7" share one form; the locked drawing is tangled and shows no bridge. The title is now a yes/no question ("does the map split?") and no longer singular-points at "1 of 7" (r7 minor fixed).
2. **The DFS notation is now decoded (r7 top finding, fixed on the stage).** Frame 10 (after "Walk depth-first") has a legend: "Depth-first from 1. #visit order; ↩ earliest # it loops back to. Dotted: road back." Badges read "#3 ↩#3" on town 4, "#2 ↩#1" on town 3, dotted roads 1–2 / 4–5 style back-edges, 3–4 drawn thick green. "Earliest" replaces the backwards "highest"; I could read why 3–4 is the bridge from the picture: from town 4 down, nothing loops back before #3.
3. **The reveal fits only with its picture cropped (fit rule fails).** In 11-reveal.png the stage top is scrolled off: towns 1, 3, 4, the green 3–4 road and the legend are above the screen; only towns 6, 5, 2 and their badges show. Paragraph 2 points at "town 4 was visited #3 ... (↩#3). Town 3, #2" and "3–4". The new text row "Walk: town 4 #3 ↩#3, town 3 #2. Bridge: 3–4." is on screen and carries those values, which helps, but the picture the reveal is about (where 3–4 sits, the dotted loops) is not visible. Stage-top crop > 0.
4. **The reveal is 116 words** (excluding the "Not quite" line), over the 90-word budget for a new version (v4). Cutting told context is the route the standard gives; paragraph 1's "Towns 3 and 4 each touch three roads ... traffic went the other way round" is the busy-town answer and earns its place, so which sentence goes is the category manager's call.
5. **The reveal quotes what I saw: met.** 7 closed, 6 whole, 1 split, "3–4 cut towns 4, 5 and 6 off" match the tallies and frame 05; the DFS numbers match frame 10 and the Walk row.
6. **Labels at the reveal are unreadable (kit, W-287).** The visible part of the picture in 11-reveal.png is shrunk: badges "#4 ↩#3", "#5 ↩#3", "#6 ↩#1" and "6 of 6 towns reachable" are roughly 4–5 px tall at phone size. Recorded as a kit finding (W-287), not a lesson revise.

Where understanding first broke: nowhere on the explore path this time; it broke at the reveal, because the graph I was told to read is off screen.

## After reading build.md (Pre-flight v4)

v4 fixed the legend/badge consistency (W-246): "Walk depth-first" reopens all roads, so the legend shows whenever the marks do. That matches frame 10. Pre-flight v4 has no item 7 (phone fit): no word count, no stage-top crop, no 390×844 screenshot. That is the gap this review lands on. Builder notes "Not seen in a browser".

**Top finding (revise, reveal fits with its picture):** at 390×844 the open reveal crops the stage top: towns 1, 3, 4, the 3–4 road and the DFS legend are off screen while paragraph 2 points at town 4 #3 ↩#3, town 3 #2 and 3–4; and the reveal is 116 words (> 90 on v4). Cut told context (category manager picks) and fold stage text (legend / Walk row / tallies) so the graph's top and the reveal's last line are both on screen.

| r7 finding | Status |
|---|---|
| Top: "↑highest climb back" backwards, undecoded | fixed: "↩ earliest # it loops back to", legend on stage |
| Dotted / green roads have no legend | fixed: "Dotted: road back." |
| Graph and DFS labels off screen at reveal | not fixed (picture still cropped; Walk row now carries the values) |
| Singular title hints "1 of 7" | fixed ("does the map split?") |
| "a triangle road beside them" | fixed (reveal now says "those roads sit on loops") |
