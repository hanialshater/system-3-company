*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: unknot-game
lesson version: v2
boundary: knows a knot is a closed loop drawn with over and under crossings; does not know that switching one crossing can free a knot (a strand then lies on top at two crossings in a row and slides off), nor that on the trefoil and the figure-eight any one switch does it (meta.json `learner`, read before walking, nothing else read)
Screenshots seen: yes (artifacts/walkthroughs/unknot-game/sheet.png, recorded 2026-10-17T01:33:02Z, Pixel 7 profile; plus my own 390x844 probe screenshots, 5 paths, listed below)
Verdict: launch

Walked at main e337d74c (meta.json version 2), built into `.next-le-unknot2`. Walkthrough on port 3861 (its own server, exited by itself); 390x844 probe (`isMobile`, `hasTouch`, DPR 2) on my own `next start -p 3862`, killed by PID after. Probe paths, all at 390x844:

| path | prediction | taps | reveal |
|---|---|---|---|
| p1 (QA path) | 1 | C1, C2, C3, Reset, Figure-eight | unlocks after C3; stage at reveal: trefoil, crossing 3 switched, tint on, "Plain loop" |
| p2 | 2 | C1 (locked), C2 (locked), C3 | unlocks after C3; "Not quite: it was '1'." then the same body |
| p3 | 3 | C1, C2, C3, Figure-eight, figure-eight C2 | stage jumps back to trefoil crossing 3 switched, tint on |
| p4 | 1 | Figure-eight, its C1-C4 (4 of 4) | **stays locked** ("Try it first"), trefoil 0 of 3 |
| p5 | 1 | C1, C2, C3, Reset | stage at reveal: trefoil crossing 3 switched, tint on (Reset undone for the reveal) |

On every unlocked path the reveal box sat at y 582-787 of the 844 viewport: the whole reveal, the tinted strand and the tally are on one screen with no scrolling.

## Findings (written from the walkthrough before reading build.md, design.md or the rest of meta.json)

1. **Where understanding first broke: the word "Plain loop" over a drawing that still has three crossings.** After my first tap the badge says "Plain loop" with a green tick, but the picture is the same trefoil with one gap moved. With my boundary I know a knot is "a loop drawn with crossings"; this one still has three. What carries me past it is the blue strand and its legend, "On top twice: it slides off". I can see the blue strand pass over the circled crossing and over the next one, and "slides off" gives me a picture I can run in my head (pull that blue arc sideways and it is no longer caught). I do not see it slide, and I do not see "the twist left over falls out" at all: that half of the mechanism is told, not shown. For a 60-second card I accept the telling, because the visible half (two overs in a row) is the surprising part and it is on stage. Not blocking; a short slide animation on tap would remove the stall.

2. **What the prediction felt like.** The question is fair and I had a real reason to pick each option: "3 crossings, so maybe 3", "half of them, so 2", or the hook's "until it falls open" hinting at more than one. I picked 1 on the QA path, 2 and 3 in the probe. The explore panel ("You said 1. Tap a crossing to switch it, then try each of the others") gives me a job, and the tally "Trefoil 1 of 3 ... 3 of 3" fills as I do it, so I know when I am done. "Try it first" stays on the button until the third trefoil crossing; I did not get stuck on the trefoil path.

3. **Whether the reveal answered the question I actually had.** My question after three taps was "why does one switch do it, and does it matter which one?" The reveal answers both: "Each crossing you switched freed the trefoil on its own: 3 of 3. No crossing was special" (matches the three ticks beside it), and "the tinted strand lay on top at two crossings in a row, so it slides off". **The tinted strand is on stage when I read that sentence**: on the QA path the stage returns from the figure-eight to the trefoil with crossing 3 switched and the blue arc drawn (07-reveal.png; p1 viewport shot), and it does the same after Reset (p5) and after a figure-eight switch (p3). Looking from the sentence to the picture, the blue arc does pass over the circled crossing and over the next crossing along. The wrong-option predictor (p2, p3) gets "Not quite: it was '1'." and then the same explanation, which answers them too: the 3-of-3 tally is the reason their 2 or 3 was too many.

4. **The "On top twice: it slides off" legend is gone at reveal time.** During explore the blue swatch has that caption; at reveal the stage shows the blue arc but no caption, and the reveal calls it "the tinted strand". The colour is distinctive and the reveal sentence restates the caption's content, so I could still match them. Minor.

5. **The figure-eight half of the reveal is told, not seen, on the QA path.** The reveal says "1 for the trefoil, and for the figure-eight too" while the tally beside it reads "Figure-eight 0 of 4": on the QA path I opened the figure-eight but never switched a crossing (the walkthrough taps it last). A learner who does the obvious thing (switch one figure-eight crossing, see "Plain loop", p3 shows 1 of 4) has seen it. The sentence is not contradicted by the stage (0 of 4 means untried, not failed), but a sceptical learner could read "0 of 4" as "zero worked". Minor.

6. **Figure-eight first locks the reveal with no hint why (p4).** If I start on the figure-eight and switch all four (4 of 4, all ticks), the button still says "Try it first". The panel says "Tap a crossing to switch it, then try each of the others" and does not say "on the trefoil". The question and title are about the trefoil, so I would probably tap Trefoil next, but for a moment it feels like the lesson is ignoring my four ticks. Minor; it is the shell's generic hint (the reveal is held for the trefoil, which is what the question asks).

Verdict reason: no finding blocks a first-time learner with this boundary; the v1 blocker (the reveal names a tinted strand the stage did not show) is closed on every path I probed, and findings 1, 4, 5 and 6 are notes for a later version.

## After reading the v1 walk and meta.json

(written after the section above)
- Read after the findings above were written: the v1 walk (`2026-10-17-learner-walk.md`), meta.json (`objective`, `misconception`, `keyState`, `evidence`, version 2, status draft) and build.md's "v2 fix round" section. Nothing above was edited after reading them.

### The v1 findings, one by one

| v1 finding | status at v2 | what I saw |
|---|---|---|
| 1. "Plain loop" rests on the readout; the slide and "the twist left over falls out" are never shown | **open, not blocking** (unchanged by design) | Same static picture; v2 changed no learner text and added no motion (build.md v2: "No learner text changed"). My finding 1 meets the same stall and the same bridge (tint + caption). I keep it as a hypothesis for a human test, as v1 did, not as a launch blocker: the "on top twice" half is on stage and readable. |
| 2. The reveal's "tinted strand" was not on stage (QA path ended on an unswitched figure-eight) | **closed** | On the QA path the reveal now opens on the trefoil with crossing 3 switched, "Plain loop", the crossing ringed and the blue arc drawn (07-reveal.png, recorded 01:33:02Z; my 390x844 p1 shot). Also holds after Reset (p5), after a figure-eight switch (p3) and for wrong predictions (p2, p3). The arc visibly passes over the ringed crossing and the next one, so the sentence matches the picture beside it. build.md v2 D3 (`lastTre` restored on entering the reveal) is the mechanism; I verified the outcome, not the code. |
| 3. The prediction is fair and the 3-of-3 tally answers "is there a special crossing?" | **holds** | Same in v2 (my finding 2 and 3). |
| 4. Taps replace silently; the hint does not say the earlier switch is undone | **open, note** | Unchanged: each tap shows one switched crossing (stage aria "crossing N switched"), the panel still says "then try each of the others". Not blocking, as in v1. |
| 5. "and for the figure-eight too" is told, not seen, on the QA path | **open, note** | Unchanged (my finding 5): the tally beside the sentence reads "Figure-eight 0 of 4" on the QA path. Claimed context, as build.md says. |
| 6. Small: reveal crop not measured | **closed at 390x844** | At 390x844 the reveal box sits at y 582-787 with scrollY 0 on all four unlocked paths; readout, picture, tally and the whole reveal are on one screen. build.md v2 records a 115 px crop at 360x740 (not the standard's size); I did not walk that size. |

### New in this walk

- My finding 4 (caption hidden at reveal) is deliberate: build.md v2 D1 (`.atReveal .caption { display: none; }`) from the design-lead S4 record. The reveal sentence restates the caption, so I leave it as a note for design-lead, not a defect.
- My finding 6 (figure-eight 4 of 4 still says "Try it first") is the reveal gate working as `keyState` says (milestone `allThree` is trefoil-only); the generic shell hint not naming the untried part is the kit-level issue earlier records already note (company/reviews/the-swap-that-goes-in-circles/2026-10-16-learner-knows-preference-r2.md). Not a lesson defect.
- `evidence.simulatedLearner` in meta.json is empty: neither the v1 walk nor this one is linked. The lesson owner links them; I did not edit meta.json.
- The objective ("can explain that one switch frees the trefoil whichever crossing it is, because after the switch a strand lies on top twice in a row and slides off") is the sentence the stage plus reveal now hand me with the picture beside it. Whether a person can then explain it is for a human test, not for this review.
