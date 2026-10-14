# Fact-check: eratosthenes-shadow (2026-10-14)

## Pass 26 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Scope: claims open after the wave G revision. Method: read Demo.tsx (and model.ts) for every reachable branch, Reset and reduced motion before the claim sources, then re-ran the numbers in my own node scripts (scratchpad fc26-b1/). No build run.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | GeoNames (npm cities.json): Alexandria 31.20176 N 29.91582 E, Aswan 24.09082 N 32.89942 E. GeographicLib WGS84 meridian: 40,007.86 km. Node: 7.11 deg, 843 km, 50.6 arcs, 42,684 km, 6.7% (7%). |
| c5 | **disputed** | Sentence states as fact that the Sun was straight overhead at Syene; Syene (24.09 N) is north of the Tropic (brief caveat 4: about 0.65 deg today). Reveal and stage label carry no 'in the account' framing. Fix: 'In the account, the Sun stood straight overhead at Syene at noon on the summer solstice, so the well had no shadow.' The question also omits the solstice. |

**Result:** 1 claim disputed; publishing blocked until the builder fixes it and a fact-checker re-checks.

## Pass 27 (2026-10-14, re-check of pass 26 disputes and rewordings, W-256)

Checker: fact-checker (wrote and built none of these claims). Method: read the pass 26 dispute, then the new Demo.tsx on every reachable branch, including the exact path that failed in pass 26, plus Reset and reduced motion where they exist. Then I re-ran the numbers in my own node scripts (session scratchpad fc27/). No builds. External source hosts were refused (proxy 403 / DNS), so nothing below is verified on an unopened source.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | held unverified | The stage now matches. The reveal is the claim word for word, the Syene label reads 'Syene, in the account:' / 'Sun overhead, no shadow', and the question has the summer solstice. The modern-fact problem from pass 26 is gone. But the sentence now asserts what the account says (overhead Sun, noon, summer solstice, a well). That cannot be derived; it rests on Cleomedes I.7 (the well may be Strabo or Pliny, not Cleomedes: unconfirmed), and none could be opened (penelope.uchicago.edu, perseus, wikipedia, mathshistory, goobi.tib.eu all refused). Search snippets only. Also, the fact-checker drafted this wording in pass 26, so a fact-checker confirming it from snippets is not independent. Board item for the evaluation-steward. |

**Result:** 0 verified, 0 disputed, 1 held unverified. Advisory: c1 (verified 2026-10-13) makes the same kind of 'in the account' statement, and its source says 'From memory, not checked online'. The 2026-10-13 pass rested it on search snippets. Raised with the evaluation-steward on the same board item.
