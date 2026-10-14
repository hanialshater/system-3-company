*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r5, first learner review): kmp-never-steps-back
lesson version: v2
boundary: adult who knows how to search a text by sliding a word along it and how to count letter comparisons; does not know that a mismatch tells you where the next match could start, nor the fallback table (from meta.json learner field).
Screenshots seen: yes (artifacts/walkthroughs/kmp-never-steps-back/sheet.png, 4 frames)
Verdict: revise

## 1. From the artifact

- Predict: search for AAAB in AAAAAAAAB. Restarting one letter on takes 24 comparisons; never moving back takes about 24 / 14 / 4? The locked stage shows two rows ("Restart one on", "Reuse the match"), each with the text, the pattern under it, an arrow and "Comparisons 0 · arrow moved back 0". The reuse row has an unexplained "0 1 2 0" under the pattern. Nothing leaks. The question is about **total comparisons**.
- Explore: Compare once, then ×4. Both rows stop at "Comparisons 5". Restart-one-on: "arrow moved back 1", with the pattern slid one place and the arrow back under text letter 2. Reuse-the-match: "arrow moved back 0", with the arrow still at text letter 4 and the pattern slid so its third A sits under it. "Show me why" lights here, after 5 comparisons.
- **Where it loses me (blocking):** the prediction asks for a total (24 vs 14 vs 4), and the stage never shows either total. Neither search is run to the end, so I never see 24 or 14 counted, and the gate opens at 5. The reveal then says "it was 14" and explains only arrow movement ("moved back 1 time" vs "0 times"), which does not get me to 14. A learner who picked 24 is told they're wrong with no evidence on the stage, and a learner who picked 4 gets nothing against 4. (I checked: the reuse search does take 14, 3 + 2 × 5 + 1. The number is right, but it is told.)
- Finding (moderate): the "0 1 2 0" table under the pattern is the mechanism of the reuse search, and it is unlabelled on the stage. The reveal names it in one grey sentence. For a newcomer it is a row of mystery numbers.
- Finding (moderate): "arrow moved back" counts times, not distance, and the readout text is very small at phone size. The difference between the rows (1 vs 0) is the only evidence shown, and it is easy to miss.
- Finding (minor): the hook "Must a search ever step back?" is fine. The title "A miss tells you where to look" is good.
- Finding (route): the card shows DRAFT and "0/6 claims checked". The claims have not been fact-checked (fact-checker item).
- A fix would let both searches run to the end, with the comparison counters reaching 24 and 14 side by side ("Run to end"), gated on finishing, and label the table, e.g. "after a miss here, keep this many".

## 2. Earlier findings

- No earlier learner review exists for this lesson (only a fact-check), so there is nothing to check off.
- Compared with the brief (read after section 1): the objective explicitly includes "14 comparisons against 24". The stage shows neither count. The misconception (move one on and re-read) is shown only through the "arrow moved back 1 vs 0" readout at comparison 5.

## 3. New findings

- **Revise:** run both searches to completion on the stage so 24 and 14 are seen, and gate "Show me why" on that.
- Moderate: label the fallback table; make the "moved back" contrast visible, not a tiny readout.
- Route to fact-checker: 0/6 claims checked.
- No FATAL.
