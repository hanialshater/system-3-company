# Fact-check: file-type-then-owner (2026-10-14)

## Pass 35 (2026-10-14, batch 3)

Checker: fact-checker (fresh instance; drafted none of this wording). Artifact: lifehacks/file-type-then-owner v2. Method: read Demo.tsx and the shared Life Hacks engine (src/lib/lifehacks, src/components/lifehacks) first, tracing every reachable path, Reset (where present) and reduced motion; re-ran the numbers in node/Python with independent re-implementations; checked how-chosen notes. Web sources could not be opened from this host (web fetch DNS failure, proxy 403), so nothing here is verified on an unopened source. No screenshots: the dev server at localhost:3530 did not respond. Scripts: scratchpad fc35-3/.

| Claim | Verdict | Basis |
|---|---|---|
| recall | verified | The rule taught in the fixture (operation 'filter': step 2 keeps rows matching field and field2 together, i.e. the intersection) applied to the stipulated example: only 'budget.xlsx, owner Lee' meets type = spreadsheet AND owner = Lee; keyed answer 0. Convention, example only. |
