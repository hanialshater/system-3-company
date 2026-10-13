# Fact-check: cafe-is-five-bytes (2026-10-13)

## Pass 8

Checker: fact-checker (did not write these claims; builder-rewritten claims checked as rewritten). Brute force / simulation re-run in node (grid DP, UTF-8 bytes, parity checks, BST, topological permutations, MST subsets, BigInt counts); reveal text compared with claims. W3Techs UTF-8 share searched (about 99%, so 'a common way' holds). CLRS/Kruskal/Dijkstra/Kahn/Hamming/Shannon cites match known references.

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | Re-derived or source checked; matches the stage. |
| c2 | verified | Re-derived or source checked; matches the stage. |
| c3 | verified | Re-derived or source checked; matches the stage. |
| c4 | verified | Re-derived or source checked; matches the stage. |
| c5 | disputed | Disputed: the sentence 'plain English letters one byte and other characters two, three or four' is false for digits, spaces and punctuation, which are also one byte (ASCII, RFC 3629 s.3). Fix in stage and claim: say 'ASCII characters (English letters, digits, punctuation) take one byte; many other characters take two, three or four'. |
| c6 | verified | Re-derived or source checked; matches the stage. |

## Pass 9 (2026-10-13)

Checker: fact-checker (did not write these claims; c-claims added by an earlier fact-checker pass are quotes of the builder's stage text). Method: read Demo.tsx as rendered text first, then re-derived every number in my own node script (own copies of the sims and mulberry32; scratchpad fc9/check.mjs), and searched sources on the web. Egress to population.un.org, royalsocietypublishing.org, Wikipedia and BioNumbers is blocked (403/DNS).

| Claim | Verdict | Basis |
|---|---|---|
| c5 | disputed | Pass 9 re-check: stage reveal still says 'UTF-8 gives the plain English letters one byte and other characters two, three or four' (Demo.tsx line 52). Still false for digits, spaces and punctuation (1 byte, RFC 3629 s.3). Dispute stands; same fix as pass 8. |
