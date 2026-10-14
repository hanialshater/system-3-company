*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r8): cut-the-rod-for-more
lesson version: v3
boundary: adult-beginner (meta.json learner: knows that smaller answers combine into bigger ones and how to add prices; does not know that the best price of a rod needs the best price of every shorter rod; has never met rod cutting as dynamic programming). Same tag as r7.
Screenshots seen: yes (artifacts/walkthroughs/cut-the-rod-for-more/sheet.png, 4 frames, recorded 2026-10-14T11:10Z, build 5 walkthrough; 04-reveal.png opened at full size)
Verdict: revise

## 1. From the artifact (written before reading build.md)

Path walked: chose "$9, sell it whole"; tapped "Fill best(1)"; tapped "Fill the rest"; opened reveal.

- **No answer before the commit: pass.** Title "What is a length-4 rod worth?" and hook "Sell it whole for $9, or cut it into pieces first. Which pays, and how much?" keep all three options open. Options "$9, sell it whole" / "$10" / "$13" each carry one dollar figure. Locked stage: price note, four dashed rows with "?", WHOLE ROD $9, SEEN ?. Nothing marks $10.
- **Show the why: pass, thinner than it could be.** At best(4) each cut line names the row it reads ("1 + best(3): $1 + $8 = $9", "2 + best(2): $5 + $5 = $10 ← keep") and row 2 is outlined in a dashed box. A beginner can now see that a cut line takes a filled row. "Fill the rest" still fills best(2) and best(3) in one tap, so I never watch a row get built and then reused. Minor.
- **Reveal quotes what you saw: pass.** $1, $5, $8, $10 are on the SEEN readout; $5 + $5, $9, $8 + $1 and "1 + best(3)" are on the cut list when the reveal opens. "Most expensive piece" now reads plainly.
- Small mismatch: the reveal points at "best(3) in '1 + best(3)'", but the outlined row is row 2 (the kept cut). A learner looks for an outline on row 3 and finds none. Minor.
- **The reveal fits with its picture: pass at 390x844, but only through the kit shrink.** In 04-reveal the stage title "best(4) = largest of ..." and the reveal's last line are both on screen. The table is drawn at about 60% of its explore size; row labels "length 1 ... length 4" are about 6 px. That is the W-287 kit finding, not a lesson revise. When W-287 sets a floor, this fit may reopen.
- **Text budget: fail (revise).** The reveal is about 113 words (whitespace count of the transcript, without the verdict line), over the 90 budget that binds this new version. The told context is the last sentence (the length-8 example with the CLRS prices, about 26 words, claim c5). Without it the reveal is about 87 words and still makes its point.

## 2. Earlier findings (r7, v2)

1. Title "Cut the rod for more money" answered the question: **fixed**.
2. Rows not linked to the cut lines (reuse told): **mostly fixed** (row names in each cut line, outline on the reused row). Fill the rest still skips the one-row-at-a-time build.
3. "Best-priced piece" unclear: **fixed** ("most expensive piece").
4. Quoted best(1..4) vanished after Start over: **fixed** (SEEN readout).

## 3. New findings

1. **Revise:** reveal about 113 words, over 90 on a new version. Cutting the length-8 sentence (c5) brings it to about 87. That sentence is told context, so which sentence goes is cm-cs's call.
2. Minor: the reveal's example "best(3) in 1 + best(3)" points at a row that has no outline; the outline is on row 2. Either quote "best(2) in 2 + best(2)" (the kept cut, which is outlined) or outline the row the reveal names.
3. Kit (W-287): table row labels about 6 px at the reveal.
- No FATAL.

## 4. After reading build.md

Pre-flight v3 matches what I saw for items 1 to 6. It has no item 7 (phone fit), and it quotes the full 113-word reveal without counting it. Findings unchanged.
