# Fact-check: earliest-finish-wins, 2026-10-14

## Pass 19

Checker: fact-checker. Scope: every claim with status unverified. Method: read Demo.tsx so stage and claim agree, then re-derived or re-simulated independently in node; CLRS 4th ed. cited by section.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 half-open talks; B 1-4 and D 4-7 do not clash | verified | Demo.tsx clash() is a.start < b.end && b.start < a.end; the question states the convention. CLRS also uses half-open [s, f). |
| c2 start 1 (A), shortest 1 (C), finish 2 (B, D) | verified | Hand-ran the three rule orders through lane(): start [A]; durations A10 B3 C2 D3 so C first, then B and D clash; finish order B C D A gives B, D. |
| c3 max is 2 | verified | All 6 pairs: only {B, D} is compatible; every triple contains A or C, so none fits. |
| c4 exchange argument | verified | CLRS 4th ed. section 15.1, Theorem 15.1 (3rd ed. 16.1 / 16.1); source note added with 4th ed. numbering. |
| c5 start-first and shortest-first can book fewer | verified | Counterexample of c2. |

Result: 5 verified, 0 disputed, 0 withdrawn. All claims in this lesson are now verified.
