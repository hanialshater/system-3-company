# NCM batch 1: final contract QA (session 2)

date: 2026-10-14 · tested HEAD: 33d7dfbf0947739113aac197078b02323bc4b51e (includes 1a879c6 useRevealFit fix) · recorded by: qa-tester

Method: `npm run build` (NEXT_DIST_DIR=.next-qa2), then `npm run qa` with QA_ONLY set to the 17 slugs, QA_PORT=3172, phone (Pixel 7) and desktop (1280x800) projects. Records filed with `company qa-record`.

## Result: contract 34/34 runs pass (17 lessons x 2 viewports), no retries needed

All 17 pass: mild-preferences-sharp-divides, penalty-kick-mix, bid-what-its-worth, below-critical-mass, prices-sort-the-buyers, agenda-picks-the-winner, news-comes-from-acquaintances, enemy-of-my-enemy, cluster-stops-the-cascade, web-bow-tie-reach, one-good-link-beats-many, new-road-slower-trip, two-said-blue, few-shortcuts-shrink-the-world, same-songs-different-hits, the-giant-appears, contact-order-matters.

The 7 lessons that previously failed the post-reveal 24px tap-target check (the re-recorded ones: below-critical-mass, bid-what-its-worth, contact-order-matters, mild-preferences-sharp-divides, penalty-kick-mix, prices-sort-the-buyers, two-said-blue) now pass on both viewports.

## Caveat: feed spec "subject chips filter the feed" fails, an artifact of the filter
feed.spec.ts failed on phone and desktop only because QA_ONLY narrows the lesson list the spec compares against, while the live feed shows all lessons. It is not a lesson defect and is not a contract check. Not run unfiltered here.

A pass means the contract held in a browser. It is not evidence that anyone learned.

Received from session 2 by message (its pushes are blocked), committed by session 1's chief of staff. The per-lesson `company/reviews/<slug>/2026-10-14-qa.md` files for the 7 re-recorded lessons live on session 2's branch; they are regenerated on our side by `company qa-record` when PR #3 merges.
