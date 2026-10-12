*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: merge-sort-payoff (boundary: sorted lists)

- **Boundary used (on purpose, set by the caller):** knows what a sorted list is and how to compare two numbers. Has never heard of recursion, Merge Sort, or big-O notation.
- **Read first:** `artifacts/walkthroughs/merge-sort-payoff/transcript.md`, its 7 screenshots, and `artifacts/qa/merge-sort-payoff/phone-*.png`.
- **Driven myself (Playwright, phone 390x800, `next start -p 3410`):** (a) one full correct merge of the first deal, then "Show me why"; (b) eight "New piles" deals each merged correctly, to see how the counter varies. Deals finished in 6, 7, 7, 6, 7, 6, 7 and 5 comparisons.

## 1. From the artifact (written before reading the brief)

### Where understanding first needed an idea outside the boundary

- The hook is the first problem: **"Splitting cards into piles looks like extra work. It isn't."** This learner has never been told that anyone splits cards. The hook argues against a belief ("splitting is extra work") that the learner does not have yet, because they have never seen a split. The stage never splits anything either: it starts with two piles already made and already sorted.
- The first idea that is truly outside the boundary is in the reveal: **"That is why Merge Sort splits. Single cards are already sorted piles. Merge them into 2s, then 4s, then 8s."** Up to this sentence the lesson is about merging two sorted piles, which is inside the boundary. Here, in three short sentences, the learner gets a new named algorithm, the idea that one card counts as a sorted pile, and a merge applied over and over in rounds. None of this was on the stage. "Merge Sort" appears here for the first time; the hook never names it.
- **"For 1,000 cards that takes fewer than 10,000 comparisons."** This learner cannot get from "7 comparisons for 8 cards" to "fewer than 10,000 for 1,000". Nothing shows how many rounds there are (that 2s→4s→8s doubles, so 1,000 cards need about 10 rounds), or that each round costs at most about one comparison per card. To this learner the number is something to accept on trust. They cannot reconstruct it. Also, 1,000 is not a power of two, so "2s, then 4s, then 8s" does not come out even. The learner who tries it hits leftover cards the text never mentions.
- **"Comparing every card with every other card would take 499,500."** The learner never learned that this is how some other method sorts. It looks like a straw man brought in at the last line. Why would anyone compare every card with every other? The 28 option in the prediction (8 cards, every pair) hints at this, but nothing connects 28 to 499,500.

### What the prediction felt like

- The question ("Two piles of 4 cards, each already sorted ... what is the most comparisons you could ever need?") sits inside the boundary, and this learner can make a real guess. The options are good distractors: 16 reads as "each card in A against each card in B" (4×4) and 28 as "every pair of the 8". A learner who thinks for a moment ("each comparison places one card") can reach 7. A learner who does not think will pick 16 because it feels like a full check. That is a real, honest prediction.
- One snag: "comparison" is not defined before the guess. Does it count looking at the last leftover card? Does it count re-checking a pile I already know is sorted? The learner has to guess what counts as a comparison, and the answer depends on it. (The stage later shows that wrong taps do not count, see below.)
- "The most you could ever need" asks about the worst case. The stage, though, only ever shows one deal at a time and never says whether this deal is the worst one.

### Whether exploring answered the learner's question

- **When it is played to the end, yes, mostly.** In my full run the counter rose by one for each card placed. When pile A emptied, the stage said **"One pile is empty. The rest needs no comparisons."**, offered "Slide the rest", and finished on **"Merged with 7 comparisons."** with COMPARISONS 7, PLACED 8/8. That is the moment this learner needs: "I guessed 16, the counter stopped at 7, and I saw why it stopped." It is the strongest part of the lesson.
- **Problem: the walkthrough learner never reached that moment, and nothing stopped them.** In the recorded walkthrough the learner made one correct comparison, pressed "New piles", made one more, and pressed "Show me why" with COMPARISONS 1, PLACED 1/8 (see `07-reveal.png`). "Show me why" is a large green button that is available from the first second of Explore. A learner can skip the only part of the stage that answers their question, then be told "it was 7" by text, with no count of 7 on screen. The answer then rests on authority, not on something they saw.
- **Problem: with a lucky deal the stage seems to contradict the reveal.** Counts change from deal to deal (I saw 5, 6 and 7). A learner who merges one deal, sees "Merged with 5 comparisons", and then reads "at most 7" has to work out for themselves why the maximum is 7 when they just did 5. The difference between "at most" and "always" is never shown on the stage. Nothing marks a deal as the worst case or explains what makes one deal cost more.
- **Problem: wrong taps are free and unexplained.** Tapping the bigger top card (10 against 4) turns it red, says "That one is bigger. Compare the two tops again.", and COMPARISONS stays at 0. The learner did compare two cards, and the counter says they didn't. A learner who wants to know what counts as a comparison gets a confusing signal: the comparison they actually made is invisible to the counter.
- **Problem: the placed row is hard to tell apart from pile B in reading order.** In the transcript (that is, in DOM/screen-reader order) the placed cards come right after pile B's cards: "Pile B | 5 | 18 | 36 | 4". With an empty pile it reads "Pile B | empty | 4 | 5 | 10 ...". Visually the row is separate, and in the screenshots it is clear. A screen-reader user hears the merged row as more of pile B because the row has no label. This is an accessibility problem; I record it for the accessibility reviewer and do not claim it as a learner-comprehension finding.
- Exploring never touches the question the hook raised (splitting). Within Explore, the learner merges two piles someone else already split and sorted. "Who sorted these piles, and how?" is the obvious question for this learner, and the lesson only answers it in the reveal text ("single cards are already sorted piles").

### Whether the reveal answered it; what the learner would still be wondering

- The first paragraph answers the prediction cleanly: "Each comparison looks at only the two top cards, and the smaller one goes into the row for good. Eight cards, so at most 7 comparisons; once a pile empties, the rest just slides over for free." This sits inside the boundary and matches what a full merge shows.
- The second paragraph answers a question the learner did not have, using ideas they were not given. Questions still open after the reveal:
  - "Where did my two sorted piles come from? You said split, but I never saw a split."
  - "Why would 1-card piles help? Isn't that just the unsorted deck again?" (The key point, that a single card is trivially sorted so merging can start from nothing, gets one sentence and no stage support.)
  - "How do 7 comparisons for 8 cards turn into fewer than 10,000 for 1,000? How many rounds are there, and what does each cost?"
  - "Who sorts by comparing every card with every other card, and why is that the thing to beat?"
  - "Why did my last deal take only 5? What makes the worst case?"
- **"The splitting is setup. The merge is the payoff."** The learner can repeat this line but cannot check it, because they never saw what the splitting sets up. As the closing line, it states the lesson's thesis without the lesson having shown it.

### Findings (problems, not fixes)

1. **The reveal can be reached with the stage unfinished, and the walkthrough proved it.** The recorded learner saw "it was 7" with COMPARISONS 1 on screen. The evidence for 7 is then text, not something they did. (High. It is not a dead control or a false claim, so I do not mark it FATAL. A lesson whose answer is read rather than seen is the failure the predict→explore→reveal format exists to prevent.)
2. **The lesson's actual thesis (why Merge Sort splits, and why that beats comparing every pair) sits entirely in reveal text, past this learner's boundary, with no stage support.** Splitting, single-card piles, merge rounds and the jump from 8 to 1,000 cards are all asserted, none shown. For this boundary the lesson teaches "merging two sorted piles takes at most n−1 comparisons" and *names* the rest. (High.)
3. **The hook raises a misconception the learner has no basis to hold**, and the stage never addresses it: "Splitting looks like extra work" means nothing to someone who has not seen splitting. (Medium.)
4. **The "fewer than 10,000 for 1,000 cards" figure cannot be traced from what is on screen**, and "2s, then 4s, then 8s" does not divide 1,000 evenly. A learner who takes the number on trust has learned a fact, not a reason. (Medium.)
5. **Deals that finish in 5 or 6 sit next to "at most 7" with nothing linking them.** Nothing shows what makes the worst case, so "most you could ever need" stays abstract. (Medium.)
6. **Wrong taps are real comparisons that the counter ignores**, which muddies the very word the prediction asked about. (Low–medium.)
7. **The placed row has no label in reading order** and reads as part of pile B ("Pile B | 5 | 18 | 36 | 4"). (Accessibility. Passed to the accessibility reviewer, not judged here.)
8. **The trust sheet shows all three claims UNVERIFIED** ("0/3 claims checked") to a learner who cannot check them themselves. This is a status observation, not a learner finding. The fact-checker owns it.

**FATAL flaws:** none found from the artifact. I saw no dead control and no false statement on screen (the merge bound and the 499,500 pair count fit what I can check; the 10,000 figure I cannot check from inside the boundary). The closest is finding 1, which I rate high but not fatal.

## 2. After reading the brief

Read: `src/demos/cs/merge-sort-payoff/meta.json` (objective, misconception, learner, claims). I have not read design.md, build.md or Demo.tsx. The boundary I was given turns out to be the lesson's own `learner` field, so this is the first-boundary review and not a deliberately different one.

- **Objective, first half ("explain why merging two sorted piles of total size n needs at most n-1 comparisons"):** the experience supports this, *if the learner finishes a merge*. The counter, "One pile is empty. The rest needs no comparisons." and "Merged with 7 comparisons." together give the reason, and the recall question (10 cards → 9) checks that the learner can generalise. The gap: "Show me why" lets a learner skip the merge, as the walkthrough did, and then the reason arrives only as text.
- **Objective, second half ("and why that makes splitting worthwhile"):** the experience does not support this for this boundary. Nothing on the stage splits, sorts single cards or merges in rounds. The reasoning that cheap merges add up to about n·log n comes only through the 10,000 vs 499,500 sentence, which the learner can only take on trust (finding 2 and finding 4). As built, the lesson teaches the first half and asserts the second.
- **Misconception ("Splitting a problem into pieces adds work; merging is cleanup at the end"):** a learner at this boundary does not hold it, because they have never met splitting or merging as sorting steps. The lesson therefore spends its hook arguing against a belief the target learner cannot have yet (finding 3). The misconception belongs to someone who has *seen* Merge Sort and found it roundabout, a different learner from the one in `learner.doesNotKnow`. Also, the stage never shows splitting costing nothing (claim c7). The learner never sees a split, so the lesson cannot show it to be free. The second half of the misconception ("merging is cleanup") is the part the stage does challenge, and challenges well: the counter puts every comparison inside the merge.
- **Worst case versus a typical deal:** the predict question and claim c4 are about the maximum ("most you could ever need"), but the stage deals piles that finish in 5–7 with nothing that marks a deal as the worst case (finding 5). Intent is a bound; the experience is a set of single samples.
- **What I would tell the steward:** the gap between intent and experience is not in the facts (the claims I can check fit what is on screen). It is in what is shown versus what is told: the objective's second half and the misconception both sit in text past the boundary.

Not judged here: whether the claims are correct (fact-checker; c4–c8 are recorded as unverified), and the unlabelled placed row in reading order (accessibility reviewer).
