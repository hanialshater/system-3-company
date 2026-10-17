# Founder question: may the website order show reason line L3 over head-of-product's objection?

owner: vp-personalization (Mateo) · date: 2026-10-17 · run: vp-l3-1017 · batch 5 §19 (company/personalization/batches/2026-10-17-batch-5.md)
status: **waiting on founder.** The chief of staff may put the section "The question" to the founder word for word. No agent message is the founder's answer.

## The question (verbatim for the founder)

**Decision needed.** The personalised order on the website can move a lesson earlier. Each moved lesson shows one line saying why. One of the seven lines, L3, says: "This lesson moved ahead of some lessons. It shares an idea with a lesson you've finished, “{title}”." The words are true every time it shows. But in most cases where it shows, the finished lesson it names actually holds the card *back*, not forward (616 of 616 built test cases; company/personalization/copy/2026-10-17-hop-copy-factcheck.md, row L3). A reader who takes it as "it moved ahead because I finished that" is wrong. L3 is rare. It never showed in 3.24 million cards from 78,000 simulated learner histories. It needs a device with only 2 to 11 unseen pilot lessons left, out of 230. Nothing short of a new candidate can fix it, and M1 has no candidates left (batch 5 §18.1).

Head-of-product refused L3 under the copy standard they set (no line whose implied cause is false; company/product/2026-10-17-personalised-order-copy-review.md §O1). So L3 fails my honest-copy rule G7. I may not override that without putting it to you.

**Options.**
- **A. Accept L3 over head-of-product's objection.** The website part of M1 stays possible. It still has to pass every other gate (see "Still required" below). The rare cards that reach L3 show a true sentence whose implied cause is mostly false. My guard and withdrawal triggers stay on (batch 5 §18.1: if L3 shows up more than rarely in any probe or QA run, the question reopens before release).
- **B. Do not accept.** Under rule G6(a), M1 ships with the HQ part only, and the website shows the default order to everyone. The v3 record stays as it is. No further candidate is allowed under M1.

**My recommendation: A, moderate confidence.** The sentence is literally true, and a true reason that holds up (`passed-known`) exists on every such card. The failure is in which true fact gets voiced, not in a false one. The state is very rare and is watched by the triggers. B removes the website part for every learner over a card that no simulated learner reached. Against A: head-of-product's point is fair. The few readers who see L3 are our most engaged, and rarity limits the harm without making the line true. If you see it that way, B is a sound answer, and I will carry it out without reopening it.

**Objection attached (head-of-product, verbatim):** "On the cards where L3 shows, the reason it implies is false for most readers. Rarity limits the harm but does not make the line true."

**Timing.** Your answer counts only if G is otherwise GO. If K6 or K7 scores NO-GO, the website part closes anyway, and this question lapses. I ask now so it is not the last blocker.

## Still required before G and release, whatever the answer

- K6 (personalization-eval, running), then K7 (score v3 by sha256 53981ab0…c195 under 3b), R4 and R5 reproductions, then my G record under batch 5 §4 and §12.
- Copy rewording: W-1642 (head-of-product: I3, I4, C1, R1, the L7 fallback, F-a; plus the choice of L3's wording if A, see batch 5 §19.2) and W-1643 (privacy-reviewer with head-of-product: D1 data text, because every finish already sends a `complete` beacon), with the fact-checker re-reading the changed sentences.
- W-1585 (the amendment for an always-on order, with the cold-start and review-lesson statements) ratified by you; W-1587 (counsel) answered.
- Privacy's diff and rendered-page re-reads; the MR checklist (batch 5 §5 with §12); your deploy approval, asked separately.

## If answered

- A: I record it in batch 5 §19, O1 goes into the release note's internal part 7, and head-of-product records the outcome under §O1.
- B: I record G6(a) in batch 5 §19, and the website part of M1 closes. K7 may still be scored for the record, but nothing ships on the website under M1.

## Objections

- **head-of-product (O1 ruling, company/product/2026-10-17-personalised-order-copy-review.md §O1):** "On the cards where L3 shows, the reason it implies is false for most readers. Rarity limits the harm but does not make the line true." **What happened to it:** I do not override it. It goes to the founder with this question, attached to option A. If the founder chooses A, it stays recorded beside the decision and in the release note's internal part 7. If B, it is upheld, and G6(a) follows.
- **fact-checker (company/personalization/copy/2026-10-17-hop-copy-factcheck.md, row L3):** the rewritten L3 states the implied cause at least as directly as RC's. **What happened to it:** if A, head-of-product chooses the L3 wording, and the fact-checker re-reads it (batch 5 §19.2).
