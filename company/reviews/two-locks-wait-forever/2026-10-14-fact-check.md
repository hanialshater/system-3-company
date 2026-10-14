# Fact-check: two-locks-wait-forever (2026-10-14)

## Pass 35 (2026-10-14)

Checker: fact-checker, fresh instance (wrote none of these claims). Method: read Demo.tsx v1 first (Step P, Step Q with their wait labels, Reset, 'P all, then Q', 'Q takes A first' toggle (clears the run), 'Take turns', message line, wait arrows, trace lines, reveal with and without jamSeen; hook and recall), then claim text and support, then source fields. Enumerated every maximal interleaving with my own node copy of the lesson's step rules (fc35/locks.mjs). Opened sources for c4 (fetched 2026-10-14 from raw.githubusercontent.com, torvalds/linux master): Documentation/locking/lockdep-design.rst lines 143-154 and Documentation/kernel-hacking/locking.rst lines 899-933.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own enumeration, opposite orders: exactly 4 maximal runs, PPPQQQ (finish), PQ (jam), QP (jam), QQQPPP (finish), so 2 of 4 jam. In both jams the holders are A = P, B = Q, with P waiting for B and Q waiting for A; 'P all, then Q' (PPPQQQ) finishes. |
| c2 | verified | Own check over all 4 runs: jam occurs exactly when both first-lock steps come before either second-lock step (true for PQ and QP, false for PPPQQQ and QQQPPP). |
| c3 | verified | Own enumeration with the toggle on: only 2 maximal runs (PPPQQQ, QQQPPP), both finish, no jam; the only waits ever recorded are for A (Q->A or P->A), which matches the hard-coded trace 'Same order: X waited for A'. The same-order milestone needs a run with a wait, and both runs have one. |
| c4 | verified | Opened: Linux lockdep-design.rst: two locks 'taken in inverse order ... could lead to a deadlock - referred to as lock inversion deadlock - as attempts to acquire the two locks form a circle which could lead to the two contexts waiting for each other permanently.' Linux kernel-hacking/locking.rst: "Textbooks will tell you that if you always lock in the same order, you will never get this kind of deadlock" (it adds that this is hard to scale, which does not contradict 'a standard cure'). Both parts of the claim are supported by opened text; the stage reproduces the circle. |
| c5 | verified | Convention, consistent with code: STEP_LABEL gives 'take first', 'take second', 'release'; canStep blocks a worker whose next lock is held by the other; release frees both locks. |

**Result:** all five verified. No disputes.
