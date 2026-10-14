*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): two-writers-one-counter
lesson version: v3
boundary: adult-beginner (meta.json learner field). Knows that a variable holds a value, uses computers, has never heard of threads or race conditions. Does not know that two tasks can overwrite each other's updates.
Screenshots seen: yes (artifacts/walkthroughs/two-writers-one-counter/sheet.png)
Verdict: launch

## 1. From the artifact

- Predict: "thread" is glossed in the stem, and the exact interleaving is given. 2 is the natural wrong answer and 1 is the surprise. The locked stage shows the two thread rows, an empty trace and COUNTER "–". No leak.
- Explore: "Both read first" fills a six-column trace (step / A copy / B copy / counter). B's copy turns red "0 stale" the moment A writes, and the final counter cell is red at 1. "One at a time" fills the same table to 2. The stale cell is the cause made visible: B is working on an old copy. Step A / Step B let me build my own order. Good. This is the right stand-in.
- Where I hesitated: the trace table is tiny on a phone (the column heads "A reads, B reads, A adds ..." are about 8 px). Reading it row by row took effort, and the "stale" tint is the only thing that pulls the eye.
- Reveal: it says "Look at the trace of 'Both read first'", but on the walked path the reveal stage shows an empty trace and counter 0 (after Start over). The thing the reveal points at is gone. A learner who steps or resets before tapping "Show me why" meets the same thing.
- "A lock keeps another thread from stepping in the middle" is told context, one sentence.

## 2. After reading the brief

- doesNotKnow, "two tasks can overwrite each other's updates": **shown**. The red "0 stale" cell under A's write, and the red counter cell at 1, stand for it. The reveal points at both ("marked stale", "wrote 1 over A's 1").
- The objective's "adding 1 is three steps" is stood for by the read / add 1 / write tiles and the six-column trace. Locks are told in one claimed sentence, as the objective only asks the learner to "say" it. Show-the-why passes.

## 3. Earlier findings (v2 review, r5)

1. The stale copy (B holding 0 past A's write) was never on stage: **fixed** (trace with a red "0 stale").
2. "Own copy" introduced only after Start over: **fixed** (the caption is on the stage from the start).
3. No hand-stepped run was required: **not fixed, no longer needed**. The trace now shows the interleaving step by step, which was the point of the request.
4. "Tasks" vs "threads", thread undefined: **fixed** (the title says threads; the stem glosses it).
5. Reveal-frame instruction clipped: **not fixed** (minor; the top of the stage is still cut on reveal).

## 4. New findings

- Minor (strongest): the reveal says "Look at the trace", but if the learner has pressed Start over or stepped by hand (as the panel invites), the trace on the reveal stage is empty. Keeping the "Both read first" trace visible on reveal would keep the pointer honest.
- Minor: the trace table text is very small on a phone.
- No FATAL.
