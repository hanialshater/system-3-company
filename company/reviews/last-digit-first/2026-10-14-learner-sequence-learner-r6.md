*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): last-digit-first
lesson version: v4
boundary: sequence-learner (meta.json learner field). Arrives from sorting-without-comparing, so knows sorting into buckets and that a stable sort keeps ties in order. Does not know that sorting by the least important digit first works, or that each later pass decides the order while stability keeps the earlier passes' work.
Screenshots seen: yes (artifacts/walkthroughs/last-digit-first/sheet.png, 8 frames)
Verdict: launch

## 1. From the artifact

- Predict: the hook and question are neutral, and the procedure (stable passes, last digit first) is spelled out. The locked stage shows the start row and empty buckets. 2 and 3 are believable wrong answers.
- Explore: each pass deals the numbers into buckets 0 to 9, tints the digit in use, and marks each neighbour pair < or > (red for out of order). Last-first ends all "<". On pass 3, bucket 3 is outlined with "Tie in bucket 3: kept the order earlier passes gave it". That is the cause made visible. The first-first run then ends 720 > 355 ... 657 > 329, and both endings sit stacked on stage. The comparison is right there.
- Where I slowed down: the stage is dense. There are six pass buttons, a tinted row, ten buckets, two status lines and two "ended" lines. The bucket numbers are very small on a phone, and stage text is well over 25 words once both endings show. I had to read the tinted digit to know which pass I was on. The "<"/">" marks carried me.
- Reveal: it quotes both endings exactly as seen and points at the bucket-3 tie. "Earlier digits settle ties, and the first digit, dealt last, has the last word" follows from what I watched. "Three passes ... however many there are" is told context in one line.
- Minor: on the reveal the stage is scrolled so the buckets are cut off. The endings and buttons remain.

## 2. After reading the brief

- doesNotKnow (a), "least important digit first works": **shown** (last-first ends all "<").
- doesNotKnow (b), "each later pass decides, and stability keeps the earlier work": **shown** in two places. The bucket-3 tie is outlined with a caption on the last-first pass 3, and the first-first run visibly ends sorted only by the last digit. The reveal points at both. Show-the-why passes.

## 3. Earlier findings (v2 review, r5)

1. The first-digit-first comparison was never run on the walked path: **fixed** (both runs needed for the gate; both endings shown on stage).
2. The tie that stability keeps was not pointed at: **fixed** (outlined bucket plus "Tie in bucket 3" caption).
3. "Flip the order to see..." came after the explanation: **fixed** (gone).
4. The title "smallest digit" was ambiguous: **fixed** ("Sort by the last digit first?").
5. DRAFT chip and claims not checked: **partly**. The trust link now reads 3/5 claims checked. Not a learner finding (fact-checker).

## 4. New findings

- Minor: stage density. Six pass buttons, ten small buckets, and two "ended" lines take the stage past the 25-word budget, and the bucket numbers are hard to read on a phone. The </> marks carry the meaning, so this did not stop me.
- Minor: the reveal stage crops the buckets.
- No FATAL.
