# Fact-check: two-writers-one-counter (2026-10-13)

## Pass 9 (2026-10-13)

Checker: fact-checker (did not write these claims; c-claims added by an earlier fact-checker pass are quotes of the builder's stage text). Method: read Demo.tsx as rendered text first, then re-derived every number in my own node script (own copies of the sims and mulberry32; scratchpad fc9/check.mjs), and searched sources on the web. Egress to population.un.org, royalsocietypublishing.org, Wikipedia and BioNumbers is blocked (403/DNS).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node, own interpreter with a private register per thread: order A,B,A,A,B,B ends at 1 (both read 0, both write 1). |
| c2 | verified | node: A,A,A,B,B,B ends at 2; of all 20 interleavings 2 end at 2 and 18 at 1. |
| c3 | verified | Silberschatz, Galvin, Gagne, Operating System Concepts, process synchronization chapter: count++ as load, increment, store (race condition example). |
| c4 | verified | Mutual-exclusion lock around the critical section prevents the A,B interleaving (Silberschatz et al.). The stage's 'which is why locks exist' reads as a reason, not the only one. |
| c5 | verified | Demo.tsx run(): reg[t] is per thread; stage shows 'holds' from st.reg[t]. |
