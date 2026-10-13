*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: lru-eviction-order
lesson version: v1
boundary: an adult who uses a phone and a laptop daily and has never programmed (no idea what a variable, array, function or "algorithm" is; comfortable with everyday apps and basic arithmetic).

## 1. From the artifact

- Prediction: "cache" and "evicted" are new, but the question is a puzzle I can reason about: 3 slots, requests A, B, C, A, D, and the rule named in brackets ("least recently used"). The words say what to do, so a careful reader gets B by reasoning; a skimmer picks A (the oldest). That is a real, decent trap. The hook ("Does the oldest arrival go, or someone else?") does give the contrast away: it tells me the answer is probably not the oldest.
- What was SHOWN: Next request / Play to the end fills the three slots and labels each "used step 4", "used step 3", etc. After the run it states "Step 5: D misses. B is evicted." and the slot labels show A used step 4, C step 3. Then toggling the rule to "first in, first out" shows "A is evicted" with labels "in since step ...". That side-by-side is clear and is the core of the lesson. HITS and MISSES counters are unexplained but harmless.
- Where understanding first broke: nothing blocking. Mildest: "used step 1" on the first step does not tell me what a hit is, so "HITS 1" at the end is a little mysterious (the repeat A at step 4 is a hit; the reveal explains it afterwards: "asking for A again refreshed it").
- Reveal: B evicted under LRU, A under FIFO: both seen. "B was last used at step 2, C at step 3 and A at step 4": matches the labels. "Things used recently tend to be used again soon... Operating systems and web caches use this rule" is told, not shown, but it is a supporting aside. The reveal sits next to a restarted (empty) stage.
- Reveal earned: yes.
- Problems: (1) hook hints the oldest does not go; (2) HITS/MISSES not defined; (3) the "usually keeps more hits" claim is not demonstrated (the stage's counters were identical, 1 hit and 4 misses under both rules, so nothing here shows LRU beats FIFO).
- No FATAL. Point (3) is worth fixing: the stage's own numbers do not support the reveal's "keeps more hits".

## 2. After reading the brief

- The brief's learner knows that far fetches are slow; they do not know what a cache is, and neither did I, but the slots and labels carried it. The objective (A refreshed at step 4 so D evicts B; first-in would evict A) is shown in both rules. The misconception (a full cache drops whatever arrived first) is hit by option A and the hook. The reveal's 'usually keeps more hits' is not supported by the stage's own counters, which were equal under both rules.
- Claims: not assessed here (fact-checker's job); my notes about claims are limited to wording a learner reads.

Verdict: launch
