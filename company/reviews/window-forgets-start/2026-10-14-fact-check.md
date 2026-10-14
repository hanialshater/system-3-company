# Fact-check: window-forgets-start, 2026-10-14

## Pass 19

Checker: fact-checker. Scope: every claim with status unverified. Method: read Demo.tsx so stage and claim agree, then re-derived or re-simulated independently in node; CLRS 4th ed. cited by section.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 window 8 of 20: positions 13-20, 40%; position 5 outside | verified | firstVisible(8) = 13; share = 0.4; readout "8 of 20 = 40%"; 5 < 13. |
| c2 seed 1 gives 7 of 20; long run 40% | verified | Re-ran hits() with mulberry32 copied from src/kit/random.ts: seed 1 = 7; seeds 1-500 mean 7.938; seeds 1-20000 = 40.1%. Source cites a spread() that no longer exists in Demo.tsx (stale reference, not a wrong number); note appended. |

Result: 2 verified, 0 disputed, 0 withdrawn. All claims in this lesson are now verified.

## Pass 20

Checker: fact-checker (did not write these claims). Source-only audit: the builder edited the source field, not the claim text; checked the new source against Demo.tsx/model.ts and the cited reference.

| Claim | Result | Basis |
|---|---|---|
| c2 | verified | Pass 20 source audit: hits(seed, w) and drops(seed) exist in Demo.tsx, mulberry32 is in src/kit/random.ts; own node: seed 1 at window 8 = 7 of 20, mean over seeds 1-500 = 7.938. Source now correct. |
