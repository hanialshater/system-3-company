*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r6, first learner review): more-copying-bigger-stars
lesson version: v1
boundary: knows rich-get-richer (early popularity attracts more popularity, lesson same-songs-different-hits); does not know how strongly the share of copying controls the size of the biggest winner (from meta.json learner field).
Screenshots seen: yes (artifacts/walkthroughs/more-copying-bigger-stars/sheet.png)
Verdict: revise

## 1. From the artifact
- Title "Copy a link, crown a giant" says copying makes a giant, which leans toward "Hundreds of times more". The hook ("a bit bigger, or far bigger?") is a fair question. Mild-to-moderate leak.
- Predict: same / double / hundreds of times. The stem's gloss of copying ("link to what another page links to") is compact but readable. The locked stage shows three empty bars ("not run") on a 0–6k axis. The 6k axis hints at large numbers, but nothing else leaks.
- Explore: run 0%: biggest page 12, top 1% hold 7%. Run 50%: 160, 27%. Run 90%: a long yellow bar to 6,278, 84%. That jump is the surprise, and it is on stage. Sliding "pages so far" back to 8,000 shrinks the bars (144, 5,124): the leader is already huge earlier. "Next seed" clears everything to "not run" on seed 2.
- Where it broke: the reveal says "In seed 2, the biggest page ended with 18 links with no copying and 4,537 with 90% copying ... 7% to 86%". I never saw any seed-2 number. After "Next seed" every row said "not run", and the slider sat at 8,000, not 10,000. The numbers I did see (seed 1: 12 and 6,278, 84%) are not mentioned. The reveal is quoting a state the learner never visited, which breaks "write the reveal from what the learner actually saw".
- The why (a page with 500 links is 500 times more likely to be copied, so links flow to the rich) is told only. Nothing on stage shows a copy event landing on a big page, or the leader's share of new links. The time slider shows the leader got big, but not why.
- The "Top 1% of pages hold" readout shows only the last run's value, so 7% → 84% is visible only if you watch it change.
- On the reveal the stage is cropped (only the 90% row's "not run" shows).

## 2. Earlier findings

No earlier learner review exists (only a fact-check). The boundary is taken from meta.json.

## 3. Show the why you promised

- doesNotKnow ("how strongly copying controls the winner's size") is shown. The 12 → 160 → 6,278 bars are on stage. Passes.
- The objective's cause ("copying ... lands on a page with chance proportional to the links it already has") is told only. This learner knows rich-get-richer in general, but the objective asks them to explain this mechanism, and nothing on the stage stands for it. A stand-in on the existing bars: step a few single new pages at 90% and highlight which page each copied link landed on, or show "the leader got N of the last 1,000 links" next to its share. Then the reveal can point at it.

## 4. New findings

- Blocking (top finding): the reveal quotes seed-2 results (18 links, 4,537, 86%) that the learner never saw. After "Next seed", every row read "not run" at 8,000 pages. The reveal must use the learner's last completed runs (here seed 1: 12, 6,278, 84%), or say that nothing has been run on this seed.
- Blocking: the proportional-chance cause is told only (section 3).
- Should fix: the title "Copy a link, crown a giant" tips toward the answer.
- Should fix: the stage is cropped over the reveal; keep the bars in view.
- Minor: show the top-1% share per row, not only for the last run.
- No FATAL.
