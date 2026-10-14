*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r7): kmp-never-steps-back
lesson version: v5
boundary: knows-sliding-search (an adult who can search a text by sliding a word along it and count letter comparisons; does not know that a mismatch tells you where the next match could start, nor the fallback table). Same mind as r5 and r6.
Screenshots seen: yes (artifacts/walkthroughs/kmp-never-steps-back/sheet.png, 5 frames)
Verdict: launch

## 1. From the artifact (written before reading r6)

- Hook "Must a search ever step back?", title "A miss tells you where to look". Options 24 / 14 / 4, with 24 given in the stem as the restart cost. The locked stage shows both lanes at 0 and the "0 1 2 0" row under the reuse pattern. None of it equals 14. Mild lean: the title says a miss is informative, so "24" (no saving) is discouraged, and "4" is barely plausible for someone who knows all 9 text letters must be read. In practice it comes down to 24 vs 14. I'd accept that, but it is the weakest part.
- Explore: "To next miss" is the moment. The restart lane shows ✓✓✓ then a red B. The reuse lane shows the same, plus the 2 under the third A boxed in green, and the line "✗ B ≠ A. The 2 under the last match says keep 2 A's: slide 1." I saw the mechanism happen. I didn't just read about it. "Run to end" gives "Found at comparison 24 · arrow moved back 5" (5 in red) against "Found at comparison 14 · arrow moved back 0", plus "5 misses, each kept 2 A's."
- Reveal: it quotes 24, 5, 14 and 0, all on stage when it opens, and it points at the boxed 2 and the ✗. It ends on the fallback-table name.
- Minor findings, not blocking:
  1. In "3 + 2 × 5 + 1 = 14", the 2 means two comparisons per miss (the miss plus the re-check). Right after "keep 2 A's", I first read it as the 2 A's kept. One word fixes it ("2 comparisons × 5 misses").
  2. When the reveal opens, the stage is scrolled so the top of the restart lane is cut off, and the 2 is no longer boxed (the final frame shows plain 0 1 2 0). The reveal says "the boxed 2", but the box is only seen at the miss step.
  3. Lane labels ("Restart one on", "Reuse the match · number under each letter: A's kept") are still small grey type.
  4. Two lanes is two places to watch. They step together and are compared row by row, so I accept it.

## 2. Earlier findings (r6, on v4)

1. The miss and the table cell it uses were not marked (told vs shown): **fixed**. There is a ✗ on the miss, the boxed 2, and a line that ties them to "slide 1".
2. The QA path ended before the run finished, so there was no reveal: **fixed** (the walkthrough reached the reveal with one press each).
3. Lane labels tiny on phone: **not fixed** (minor 3).
4. Claims checked: now 5/8 (was 2/7). This item belongs to the fact-checker.

## 3. After reading the brief

- The two doesNotKnow items (the miss tells you where the next match starts; the fallback table) are both on stage at the "To next miss" step, and the reveal points at them. This meets "Show the why you promised".
