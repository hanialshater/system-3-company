*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r5 wave, first learner review): last-digit-first
lesson version: v2
boundary (from meta.json learner field): knows sorting into buckets and that a stable sort keeps ties in order; does not know that sorting by the least important digit first works, or that each later pass decides the order while stability keeps the earlier passes' work. (Filename tag "sequence-learner": this learner arrives from the sorting-without-comparing lesson.)
Screenshots seen: yes (artifacts/walkthroughs/last-digit-first/sheet.png, 6 frames)
Verdict: revise

## 1. From the artifact

- Predict: the question states the procedure exactly (last, middle, first digit; ties keep order) and asks fully sorted / first digit only / scrambled. A real belief test: "doing the least important digit first" sounds backwards to a beginner. The title "Sort by the smallest digit first?" is ambiguous: "smallest digit" reads as "the digit with the lowest value", not "the ones place". Locked stage: the seven numbers and empty buckets 0 to 9; no leak.
- Explore: each pass deals the cards into buckets by the highlighted digit and collects them; between neighbours a "<" or red ">" marks order. After pass 1: four red/green marks, with two ">" (720 > 355, 657 > 329). After pass 2: two ">" left. After pass 3: all "<", "Last digit first ended: 329 355 436 457 657 720 839". The disorder shrinking to zero is visible and good.
- Where it stopped: the gate opened after the last-digit-first run. "Order: first digit first" was tapped, but its three passes were never run on the walked path; the stage reset to Start. So the comparison the panel asks for ("then flip the order and try again"), and the title asks about ("which order works?"), was never seen. I learned that last-digit-first works, not that first-digit-first fails, so I do not know that the order matters.
- Told-not-shown: "cards with the same digit kept the order the earlier digits had given them". It is visible in principle (329 above 355 in bucket 3 on pass 3) but nothing points at it.
- Reveal: "Flip the order to see..." is an instruction to do the experiment after the explanation, the wrong way round. "Three passes sort three-digit numbers, however many there are" is told.
- Status chip says DRAFT and the trust link reads 0/5 claims checked: not launch-ready on the claims side regardless of the learner finding.

## 2. Earlier findings

No earlier learner review exists for this lesson (only 2026-10-14-fact-check.md). Nothing to compare.

## 3. After reading the brief's learner field

- The doesNotKnow "each later pass decides the order and stability keeps the earlier passes' work" is the heart of it, and the stage shows it only if the learner also runs first-digit-first and watches it fail. On the walked path that never happens.
- Note: meta.json lists 5 verified claims, but the served build's trust link says 0/5 and the chip says DRAFT. The build on port 3450 may predate the fact-check, or status is not yet promoted. Route to product-owner/fact-checker to confirm; not a learner finding.

## 4. What would move this to launch

- Top: gate the reveal on both runs (last-digit-first and first-digit-first), and show the two final lists side by side ("Last digit first ended: ... / First digit first ended: ..."), with the red ">" marks on the failing one.
- During pass 3 (last-first), highlight a bucket with two cards (e.g. 329 above 355 in bucket 3) with a caption like "tie on first digit: the earlier passes already put these in order".
- Retitle so "smallest digit" can't be read as "lowest value" (e.g. "Sort by the last digit first?").
- Drop "Flip the order to see..." from the reveal once the flip is required.
- No FATAL.
