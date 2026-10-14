# Build note: heapify-from-the-bottom (algo-pair-05, 2026-10-14)

Kept from evaluators until they report.

- Built from brief #29 and spec `company/design/specs/heapify-from-the-bottom.md`: two panels, 5 controls in the spec's DOM order (parent 3, parent 2, top, Insert next, Insert the rest). One tap sifts a parent all the way down, so QA reaches the root by three presses. The top is disabled until both lower parents are done. Milestones `heap-built` and `inserted-all`.
- Logical state updates at once; the drawn trees replay swaps from a frame queue (120 ms per level; the insert-the-rest run is compressed to about 400 ms; instant under reduced motion).
- Node reruns: bottom up 4 swaps (1, 1, 2) giving 7 5 6 4 2 1 3; insertion 10 swaps (+0 +1 +1 +2 +2 +2 +2) giving 7 4 6 1 3 2 5; maxima over all 5,040 orders are 4 and 10.
- The brief's "leaves never move" is false (7, 5, 6 rise from leaves). The lesson and claim c4 say "no sift starts at a leaf".
- Tree panels are 165 px wide (spec said 175) so two fit at 390 px.
- All claims `unverified`. Status left `draft`.
