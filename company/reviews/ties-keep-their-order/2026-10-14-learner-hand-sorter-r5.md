*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (first learner review, filed as r5 in wave D): ties-keep-their-order
lesson version: v2
boundary: from meta.json learner field: an adult who sorts a hand of cards by sliding them left (insertion by hand), but does not know that two sorting methods can give different results when items tie, or what a stable sort is.
Screenshots seen: yes (artifacts/walkthroughs/ties-keep-their-order/sheet.png, all 5 frames)
Verdict: revise

## 1. From the artifact (written before reading meta.json)

- Predict leak (top finding): the hook says "Two correct sorts of one list can disagree about who comes first among equals." The third option is "It depends on the sorting method". The hook states the answer before the question is asked, so "Ana, as before", the honest belief this lesson exists to test, is undercut before the learner chooses. The question itself is clear and well built.
- Locked stage: two lanes of the same four cards (Ana B, Ben A, Cal B, Dee A, with name-order numbers 1–4), labelled "Slide left past higher grades" and "Swap smallest grade to front", each with "Inside B: ?". Fine.
- Explore: one "Slide next card" step moves Ben in front of Ana, with an arrow. One "Swap smallest to front" step swaps Ben and Ana. Then "Both: rest of the steps" runs everything else, adding rows with "Cal stays", "Ana passed Cal" (Ana's and Cal's cards outlined in red) and "already smallest". It ends with "Inside B: Ana, Cal · name order kept" (green) against "Inside B: Cal, Ana · name order lost" (red). The two outcomes side by side are the payoff, and a learner sees it without the reveal.
- Weak spots: the key moment, swap 2 throwing Ana past Cal, happens inside the auto-run, so the learner doesn't cause it. On a phone the cards are tiny: names on cards and the annotations "Ana passed Cal" and "Cal stays" are near the limit of legibility, and the four-row trails per lane are dense. Why the swap jumps Ana over Cal (the swap moves Ana a long way, past an equal) is shown by an arrow but not said until the reveal.
- Reveal: the opening reads "Not quite: it was 'It depends on the sorting method'. Not quite." Saying "Not quite" twice is a copy bug. The rest matches the stage ("On swap 2, swapping threw Ana past Cal"). "Stable", "insertion sort" and "selection sort" are names added after the experience. The spreadsheet example is a good transfer.
- Status: the badge says DRAFT and the trust link reads "0/4 claims checked" (fact-checker lane).

## 2. Earlier findings

- No earlier learner review exists for this lesson (company/reviews/ties-keep-their-order/ has only a fact-check and build notes). Nothing to mark fixed.
- After reading meta.json: the learner knows sliding cards left, which is the "slide" lane, so the familiar method keeps name order and the unfamiliar one breaks it. That is a good design for this boundary. The doesNotKnow item "two methods can give different results when items tie" is exactly what the hook states outright.

## 3. New findings

- Top (blocks launch): rewrite the hook so it does not state the result (for example "Sort four students by grade. Who leads the Bs?").
- Make swap 2 a learner step (stop the auto-run before it, or prompt "Swap once more") so the learner causes the moment Ana passes Cal.
- Fix the doubled "Not quite" in the reveal.
- Minor: card text and annotations are too small on a phone.
- No FATAL.
