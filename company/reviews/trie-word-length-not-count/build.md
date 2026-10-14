# Build note: trie-word-length-not-count (demo-builder, algo-pair-07, 2026-10-14)

- Built from brief #11 and spec `company/design/specs/trie-word-length-not-count.md`. Format: before / after toggle.
- Answer re-checked in node before building (3 steps with 10 words, 3 with 1,000; steps = word length for all 1,000 words). The brief held. The spec's fix for the brief's "walk twice" key state was applied as specced: the toggle carries the walk across and re-traces it hop by hop (90 ms per hop), so the QA path c, a, t, Add 990 words reaches both milestones (`walked-small`, `walked-big`).
- Spec deviations:
  - The 990 added words are seeded invented letter strings (mulberry32, seed 1000), not a real word list. There is no licensed list in the repo and no network. Disclosed in claim c2; the stage never calls them real words.
  - Walked path position: in the 1,000-word tree the c-a-t path runs down the far-left column (26 first-letter stubs at 13.5 px, alphabetical), not at the same x as in the 10-word tree. It keeps the same three rows. Keeping the same x would mean squeezing the other 25 stubs below 9 px spacing.
  - Every end-of-word node has a faint double ring; the cat ring turns green with a tick when reached, so "cat found" is not shown by colour alone.
  - Grey fans have a count under each first letter (counted from the list); no "deeper" wedge.
- Reveal: static text, true because both milestones need depth 3 in each dictionary. The stage in the reveal is pinned to the 1,000-word tree with the full path, labelled "Your walk, 1,000 words".
- Keys: c enabled at depth 0 or 3 (fresh walk), a at depth 1, t at depth 2. All four controls render at first paint.
- Claims c1 to c6 all unverified. Builder verified nothing.
- Checks run: node answer check, tsc typecheck (passed), npm run check (passed). Skipped on coordinator order (machine out of memory): next build, lesson QA, walkthrough. Layout never seen in a browser.
