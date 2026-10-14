# Build note: good-lists-make-good-pages

Builder: ncm-c · 2026-10-14 · from brief cs.algorithms, Course NCM #2 (single card with step-run button), accepted version.

- Graph h1, h2 -> Y, Z, W; h3, h4 -> X; h5 -> X, W. Round 0: hubs 0.2 each, authority = in-link counts normalised (X 0.300, W 0.300, Y 0.200, Z 0.200). One update = hub step then authority step, each normalised to sum 1. The brief updates authority first; with in-link counts as the start the two orders differ by one round and agree after 50 (my node mirror, scratchpad ncmc/hits.mjs): Y 0.277, Z 0.277, W 0.346, X 0.099; hubs h1 = h2 0.368, h5 0.182, h3 = h4 0.041. Hub first was chosen so the first press already moves X (0.300 -> 0.200).
- Prediction text uses "mostly" for X's in-links, per the acceptance edit (h5 lists X and W).
- Controls: Update once, Run 50 updates, Reset. Link line widths follow hub scores, so weak lists' links thin out visibly; authority bars and numbers update; X's bar is red.
- Milestones `first-update`, `settled` (50 updates). The reveal quotes the 50-update values (constants), not the live state.
- Not run here: next build, typecheck, QA, walkthrough. Syntax-only transpile passed. All 5 claims `unverified`.
