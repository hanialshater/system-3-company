### 2026-10-25 · content-hub-prod-review-1025 · principal-engineer
- did: Production-boundary review of rnd/content-hub-prototype (d35c87dff): ran hub tests 8/8, scenario, spike --all on main; wrote integration plan, C1-C10, P1-P6
- learned: Main's DemoCard reaches into lesson DOM (reveal-fit, fold, card-hook :has); a cross-origin frame silently loses all three (src/components/DemoCard.tsx)
- learned: Branch react-compiler copies the kit into every artifact dir, so no cross-lesson kit cache; spike frameHtml shares one kit URL (spike/build.mjs)
- know: Next 16.4.0 is in npm audit critical range (GHSA-2464-fhr4-w9xw); upgrade moves every webpack bundle hash, so upgrade before any artifact build (company/engineering/reviews/2026-10-25-content-hub-production-review.md)
- know: Running 'company board add --help' adds an empty item; read cmdBoard instead of probing (tools/company.mjs)
- open: C2/C3/C6/C7 block production flag-on; work items 1-11 not yet filed on board, need fresh IDs (company/engineering/reviews/2026-10-25-content-hub-production-review.md)
