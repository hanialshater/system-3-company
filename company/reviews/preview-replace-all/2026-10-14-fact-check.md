# Fact-check: preview-replace-all (2026-10-14)

## Pass 35 (2026-10-14, batch 3)

Checker: fact-checker (fresh instance; drafted none of this wording). Artifact: lifehacks/preview-replace-all v2. Method: read Demo.tsx and the shared Life Hacks engine (src/lib/lifehacks, src/components/lifehacks) first, tracing every reachable path, Reset (where present) and reduced motion; re-ran the numbers in node/Python with independent re-implementations; checked how-chosen notes. Web sources could not be opened from this host (web fetch DNS failure, proxy 403), so nothing here is verified on an unopened source. No screenshots: the dev server at localhost:3530 did not respond. Scripts: scratchpad fc35-3/.

| Claim | Verdict | Basis |
|---|---|---|
| recall | verified | The lesson's rule (preview marks every exact match before apply; editResult step 1 highlights both 'red' tokens) applied to the stipulated example: a replace-all of 'Dr' would also hit the title in 'Dr Smith', and the preview shows it. Keyed answer 'Every match, e.g. Dr Smith' is the only option that follows the rule. Convention, example only. |
