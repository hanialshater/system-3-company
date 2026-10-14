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
