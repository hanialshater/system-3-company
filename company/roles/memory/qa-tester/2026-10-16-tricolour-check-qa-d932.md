### 2026-10-16 · tricolour-check-qa-d932 · qa-tester
- did: QA'd draft tricolour-check on merge d932e7d0 (133fc863 + ccr-4c6c7654-ew9ko1): contract 2/2, R4 at 390x844 and 360x640 light and dark, letters A/B/C readable; record linked in evidence.qa
- learned: Platform test #18 is the 'unquoted internal string' tripwire (registry-split.test.mjs:136); after the merge it fails for src/demos/math/draw-a-table-knot/meta.json, not tricolour-check (tests/platform/registry-split.test.mjs)
- learned: Merge conflicts in index.generated.ts resolve by taking either side and rerunning node tools/company.mjs registry (package.json registry script)
- know: Letters on the arc rings use the foreground colour (15.4:1 light, 13.7:1 dark), rendered 21 px at 390 and 17 px at 360 (company/reviews/tricolour-check/2026-10-16-qa.md)
- know: Trefoil milestone needs all-different colours (B,C,A from one tap each on arcs 1 and 2); reveal stays 'Try it first' otherwise (src/demos/math/tricolour-check/Demo.tsx)
- open: At 360x640 explore the chip row and Check all fall below the stage window (259 of 378 px) (company/reviews/tricolour-check/2026-10-16-qa.md)
- open: draw-a-table-knot meta has no checkedBy/checkedOn or review link, so platform #18 fails; needs its own QA or fact-check record (src/demos/math/draw-a-table-knot/meta.json)
