*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: sketch-the-counts
lesson version: v1
boundary: an adult who uses a phone and a laptop daily and has never programmed (no idea what a variable, array, function or "algorithm" is; comfortable with everyday apps and basic arithmetic).

## 1. From the artifact

- Prediction: the question is dense jargon ("table", "counters", "hash to counter 2", "stream") but it states the key facts: cat and dog share counter 2, 5 cats, 3 dogs. A careful reader gets 8 by adding; a hasty one says 5. That is a decent trap; "hash" is never explained and I read it as "gets sent to". The stage shows a ribbon of letters C D C E C D C D C and a row of five counters with counter 2 highlighted.
- What was SHOWN: "Next" drops one letter into counter 2; "Play all" fills it: counter 2 = 8, counter 4 = 1, with the line "cat: 8 -> smallest 8 . true 5". The words "true 5" next to 8 make the overcount concrete. "+ Row" adds a second row with different counters (5, 0, 4, 0, 0) and the line becomes "cat: 8 / 5 -> smallest 5 . true 5": I could see the second row repair the error. "dog" asked with one row says "8 . true 3", and "eel" "1 . true 1".
- Where understanding first broke: the second row. Nothing says why its numbers differ (5, 0, 4: the hash sends cat alone to counter 1 and dog plus eel to counter 3). The learner must take it on trust that this is a different way of sorting letters into counters. Because the hash assignments are hand-picked (the trust sheet says so), a learner may infer that a second row always lands the right answer; the stage never shows a case where it does not (for example dog stays 4 after a second row). Also "- Row" returns to 8 with no explanation.
- Reveal: "Counter 2 gets every cat and every dog: 5 + 3 = 8" matches. "min(8, 5) = 5" matches the stage. "Each row is an over-estimate, so the smallest is the best guess": reasonable and earned by the "true" label. "Never too low" is told, but consistent with every stage reading (8 vs 5, 8 vs 3, 1 vs 1). "Count-min sketch" appears only at the very end as a name.
- Reveal earned: yes for the main idea (shared counters over-count; extra rows with the minimum fix it). The claim "usually close" is told only.
- Problems: (1) "hash", "stream", "counter" jargon in the question; (2) second row's hash choices unexplained and hand-picked, which may overstate how well one more row works; (3) "usually close" unshown.
- No FATAL.

## 2. After reading the brief

- The brief's learner knows hashing to a counter slot (from hash-bucket-pileup) and taking the smallest; my boundary does not, but the question states what is shared. The objective (a shared counter overcounts, the smallest across rows is never too low and usually close) is shown by 8 vs true 5 and then 5 after +Row. 'Usually close' is told and the second row's hash is hand-picked and unexplained, so it may look more reliable than it is. The misconception (a small shared table must be useless) is hit by the hook.
- Claims: not assessed here (fact-checker's job); my notes about claims are limited to wording a learner reads.

Verdict: launch
