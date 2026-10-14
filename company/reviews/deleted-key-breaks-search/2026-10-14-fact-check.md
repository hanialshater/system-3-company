# Fact-check: deleted-key-breaks-search, 2026-10-14

Checker: fact-checker (wrote none of these claims). Read Demo.tsx (and model.ts where present) before checking each claim; re-ran numbers with own node scripts.

## Pass 19

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 | verified | Own linear-probing search (dk.mjs): probes [1 A, 2 empty], not found. Matches search() and the log line. |
| c2 | verified | Same with marker: probes [1 A, 2 gone, 3 C], found in slot 3. |
| c3 | verified | Derivation: the search loop stops at the first empty slot (CLRS 11.4 HASH-SEARCH stops on NIL), so any key stored past a slot later emptied is unreachable from its home slot. |
| c4 | verified | CLRS 11.4 DELETED marker. Note: CLRS 4e 11.5.1 also gives marker-free deletion for linear probing; the stage does not say markers are the only way. |
| c5 | verified | Derivation + own run: deletes never create empties, so empties only fall; 64-slot table at 32 keys with churn hit 0 empties and every miss probed 64 slots. Only a rebuild (or marker-free delete) restores them. Not a CLRS quote. |

Disputes: none.

Result: 5 verified, 0 disputed, 0 withdrawn.

## Pass 21 (2026-10-14)

Checker: fact-checker (wrote and built none of these claims). Method: read Demo.tsx (predict, stage, readouts, reveal) against each claim, then re-ran the numbers in my own node scripts copying the lesson's logic (session scratchpad fc21/). Primary sources were unreachable (proxy blocks the hosts); rows say where a verdict rests on derivation or on web-search secondary text instead.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | disputed | The first part holds (Demo search() stops on null; own run: probes 1 A, 2 empty, not found). But 'breaks the search for every key stored past it' is false in general: a key whose home slot is past the gap (e.g. D hashed to 3, stored in 4) is still found. Only keys whose home slot is at or before the gap and stored past it are lost. The reveal itself says only 'a gap with C past it'. Fix: reword to 'breaks the search for C (and any key whose probe path from its home slot crosses the gap)'. |
| c6 | verified | Derivation: an insert takes the first empty slot on its probe path, so every slot from the home slot to the key was full; with no deletes no slot is emptied, so no gap appears before a stored key. Without the stop, a miss has nothing to end on before checking every slot. Knuth 6.4 Algorithm L and CLRS 11.4 from memory, not opened. |

**Result:** 1 verified, 1 disputed, 0 withdrawn. Disputed claims block publishing until the builder rewords them and they are re-checked.
