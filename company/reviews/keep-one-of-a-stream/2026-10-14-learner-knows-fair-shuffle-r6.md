*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (first learner review, wave E r6): keep-one-of-a-stream
lesson version: v1
boundary: knows what a fair shuffle is (fair-shuffle-trap); does not know you can pick a uniform random item from a stream of unknown length in one pass; leans towards "early items are favoured" or "store it all first". (From meta.json learner field; there is no earlier learner review.)
Screenshots seen: yes (artifacts/walkthroughs/keep-one-of-a-stream/sheet.png)
Verdict: revise

## 1. From the artifact
- Predict: clean. The locked stage shows item 1 kept with a full bar of 1. Nothing leaks 1/4. "1/2" is a real pull, because item 1 only "has to beat" one draw in my head.
- Shown well: "Next item" splits the bars to 1/2 / 1/2. The readout "Item 1 stays: 1 × 1/2 × 2/3 × 3/4" builds item 1's survival as a product. "Run 1,000 streams" puts tallies 236 / 250 / 257 / 257 under four equal 1/4 bars. That item 1 ends at 1/4, and that all four are equal, is on stage.
- **Top finding: the "why it is fair" half is told, not shown.** The reveal's key sentence is "Each later item had a smaller chance to get in, but fewer draws left to survive." On stage only item 1's product is ever spelled out. Nothing shows item 3 entering at 1/3 and then surviving 3/4, or item 4 entering at 1/4 and surviving nothing. "Rest of the stream" jumps from the after-2 state straight to after-4. That skips the 1/3-each moment and item 3's winning draw (0.003); only item 4's draw caption is left on screen. The objective asks the learner to explain exactly this trade-off, so under "Show the why you promised" this is a revise. Cheap fix on the same bars: tap a bar to switch the "stays" readout to that item (e.g. "Item 3: gets in 1/3 × stays 3/4"). Or make "Rest of the stream" step through item 3 so the 1/3 bars and their caption are seen.
- **Told, not shown: unknown length.** The hook promises "when you don't know how long it is", and the reveal ends "never needed to know the stream would stop at 4". The stream is always exactly 4 on stage. An "Item 5" press (bars go to 1/5, the rule unchanged) would show the stream could have kept going. This is the brief's single doesNotKnow item, so it is part of the same revise.
- Minor: the bars are exact probabilities, while the "kept" frame is one random run (item 3). A beginner can read "kept: Item 3" next to equal bars as a contradiction. One word on the bars ("chance") would help.
- Minor: the trust link reads 0/6 claims checked, including an unopened citation (fact-checker lane).
- No FATAL.

## 2. Earlier findings
None: this is the first learner review.

## 3. Against the brief (read after section 1)
The objective names item 1's 1/2 × 2/3 × 3/4 (shown) and "each later item has a smaller chance to get in but fewer draws to survive" (told only). doesNotKnow, "one pass over a stream of unknown length", is told only, because the length is fixed at 4. The misconception "favour early items" is answered by the equal bars. "Store the whole stream" is answered only by the last told sentence.
