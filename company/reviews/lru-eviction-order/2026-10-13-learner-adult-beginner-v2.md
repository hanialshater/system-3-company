*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: lru-eviction-order
lesson version: v2
boundary: an adult who remembers school arithmetic and science, new to the topic.

## 1. From the artifact

Screenshots seen: predict, step 2 ("Play to the end"), reveal (all viewed).

- Prediction: a real guess, with the rule named in the question ("least recently used rule") and the hook contrasting it with the "oldest arrival". "A" is the oldest-arrival answer and the trap; "B" is correct; "C" is a random pick. Terms "cache", "evicted" and "requests" are used without a definition, but the hook ("The cache is full and a new item arrives. Does the oldest arrival go, or someone else?") gives me the picture. The locked stage shows the stream A B C A D with numbers, three empty slots and a HITS/MISSES counter: clear.
- Where understanding first broke: HITS and MISSES (undefined until the stage says "A misses and moves in" at step 1, and a hit is never named in a sentence on my path). After "Play to the end" the stage reads "Step 5: D misses. B is evicted" with each slot carrying "used step 4 / 5 / 3". That is an explanation I can follow without knowing what a hit is.
- What was SHOWN: the slot labels "used step N" make the rule readable: B is gone because it is the one with the oldest "used" step (2). Switching the rule to first-in-first-out shows A evicted instead ("in since step 5 / 2 / 3"). Seeing both outcomes for the same stream is the whole lesson, and it is on the stage.
- Values in the reveal never on the stage at the time of reading: the screenshot of the reveal shows the stage after "Restart" (empty cache, "Send the first request"), so "You saw B evicted under LRU and A under FIFO" refers to a state the learner has just wiped; the sentences "Both rules scored the same" (hits/misses equal) and "if B is asked for again, FIFO keeps it" are told. "Operating systems and web caches use this rule" is told.
- Reveal earned: yes. "Recency, not arrival, decides who stays" follows from what I saw.
- Terms before definition: cache, evicted, hit, miss, "least recently used" (defined by the slot labels, not in words).
- Problems: (1) the QA path ends on Restart so the stage is blank under the reveal; (2) "hit" and "miss" never defined in a sentence; (3) "both rules scored the same" is told.
- No FATAL.

## 2. After reading the brief

- Previous review (v1, launch): hook hints the oldest does not go; HITS/MISSES undefined; "keeps more hits" not demonstrated by the stage. Now: the reveal says both rules scored the same on this stream, which matches the stage; the third finding is fixed. The hook and the undefined hit and miss remain.
- The brief's learner does not know what a cache is; the objective (D evicts B because A was refreshed) is shown by the "used step N" labels. The misconception (a full cache drops whatever arrived first) is hit by option A, with FIFO shown for contrast.
- Claims verified.

Verdict: launch
