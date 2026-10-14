*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): two-writers-one-counter
lesson version: v2
boundary: an adult with school-level maths, new to the topic (uses computers; has never heard of threads or race conditions).
Screenshots seen: yes (artifacts/walkthroughs/two-writers-one-counter/sheet.png)
Verdict: revise

## 1. From the artifact

- Predict: options 2, 1 and 0. 2 is the honest trap, and the stem spells out the order, so a careful reader could work it out. The title says "tasks", while the hook and stem say "threads", and "thread" is never defined. I can cope, but it is a wobble.
- Explore: "Both read first" ends with all six tiles lit, "copy 1 / copy 1", counter 1. A grey line reads "Order run: A reads, B reads, A adds, A writes, B adds, B writes". "One at a time" ends with "copy 1 / copy 2", counter 2. So I see two answers and a text line listing the order. But on the stage I never see the moment that matters: B's copy holding 0 after A has already written 1. Both copies show only their final value, so "copy 1 / copy 1" looks like nothing went wrong. "Each thread works on its own copy of what it read" appears only after I press "Start over", which is after both runs. Step A / Step B exist, but the gate opened without my using them.
- Reveal: "both read 0, both wrote 1" is the explanation. "Read 0" was never displayed. Locks are told in one line, which is fine as a pointer.

## 2. Earlier findings (v1 review)

1. The "own copy" idea is introduced only after "Start over": **not fixed**.
2. Runs jump to end state, interleaving not visible: **partly fixed** (an "Order run" text line now lists the order). The stale read itself (B holds 0 while the counter is 1) is still never on stage.
3. Copy values tiny and grey: **fixed** (bold "copy N" beside each row).
4. Hand-stepped run not required: **not fixed**.
5. Trust link 0/5: **improved** (now 4/5; fact-checker's lane).

## 3. New findings

- Top (revise): show the stale copy. For example, freeze or keep a trace after "B reads" with "A copy 0 · B copy 0 · counter 0", then after A writes, "counter 1 · B copy 0". Or require one hand-stepped run where B reads before A writes. Until a learner can see B carrying a 0 past A's write, "both read 0" is told.
- Minor: "tasks" (title) vs "threads" (hook, stem); "thread" undefined.
- Minor: in the reveal frame the stage's instruction line is clipped at the top.
- No FATAL.
