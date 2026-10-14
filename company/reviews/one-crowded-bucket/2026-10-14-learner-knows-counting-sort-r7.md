*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r7): one-crowded-bucket
lesson version: v2
boundary: knows-counting-sort. Knows counting sort tallies values instead of comparing them; does not know that bucket sort is fast only when values spread evenly.
Screenshots seen: yes (artifacts/walkthroughs/one-crowded-bucket/sheet.png)
Verdict: revise

## 1. From the artifact (written before reading the r6 review or meta.json)

- Predict: options "About 1, as before / About 10 / About 30" are all the same kind. The locked stage shows ten empty buckets and the spread hand, with no leak. "About 1, as before" is the honest guess from counting sort. The title "Ten buckets, one of them crowded" tells me the clumped hand piles up, but the stem already shows all values are 41–50, so it doesn't give away the count. No answer before the commit: pass.
- Explore: the spread hand drops into nine buckets with 64 and 70 sharing one. Sort gives COMPARISONS 1, with a "1" on the 70 tile. The Spread / Clumped toggle is now in view. Clumped puts one tower of ten in bucket 41, and each tile carries its own count (6 on 42 and 44, 1 on 43 …). The caption reads "small number on a tile: tests it made sliding into place". The per-tile counts make the 30 into work I can see rather than a bare total. Show the why: pass. The one tall bucket plus its tile tallies is the cause.
- Reveal: "42 and 44 made 6 tests each" and "30" are on stage. **But the reveal frame has the tower's top cropped** (50, 49, 48, 47, 46 are scrolled off), so I can't check "the small numbers on the tower's tiles add up to that" from what is visible. Also "Spread out … nine buckets. Only 64 and 70 shared one" names a state that is no longer on the stage: switching to Clumped cleared the spread buckets, and only the SPREAD 1 readout survives. By the rule ("the quoted state is still visible … when the reveal opens") both are misses.
- The clumped hand still drops and sorts in one tap, so the count doesn't climb as I watch. The tile tallies mostly make up for that.
- Would a first-time learner get the idea from the stage? Yes: one crowded bucket, many tallies, 30 against 1.

## 2. Earlier findings (r6)

1. Spread/Clumped toggle clipped below the stage: **fixed**.
2. Clumped sort instant, 30 not shown as work: **mostly fixed**. Per-tile tallies show where the 30 comes from; the sort is still instant.
3. Clumped tower overflows and its top is cut on step 3 and the reveal: **not fixed** on the reveal frame.
4. "30" the only exact option: **fixed** ("About 30").
5. Claims unchecked: now 5/6 checked (fact-checker).

## 3. New findings

- **Revise (top):** on the reveal the tower's top tiles are scrolled off, so the tallies the reveal says "add up to" 30 can't all be seen. Make the tower fit when the reveal opens.
- Should fix: the reveal quotes the spread hand's layout (nine buckets, 64 and 70 together), which the clumped view has replaced. Keep a small trace of the spread result, or quote only the SPREAD 1 readout.
- No FATAL.
