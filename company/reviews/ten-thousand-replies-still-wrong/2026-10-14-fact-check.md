# Fact-check: ten-thousand-replies-still-wrong (2026-10-14)

Board: W-655. Lesson: src/demos/probability/ten-thousand-replies-still-wrong/ (status draft, version 1).

Checker: fact-checker (I did not write these claims). Method: I read Demo.tsx (and model.ts where there is one) on every reachable path, including the dynamic strings, locked state, toggles and the order of presses, before reading the claims. Then I re-ran every number in node from my own copies of the lesson logic. The scripts are kept in artifacts/fact-check-wave-j/ (poll.mjs). Web: only PyPI, npm and raw.githubusercontent.com were reachable, so no web page, paper or book could be opened. The sources I did open: the CRC 'Standard Thermodynamic Properties of Chemical Substances' table, JANAF 1998, ATcT 1.112 and the Perry/DIPPR-105 density fits, all as transcribed in the PyPI package chemicals 1.5.2; and the NASA TM-4513 polynomials (McBride, Gordon & Reno 1993) from Cantera's data/nasa_gas.yaml and nasa_condensed.yaml. Where a verdict rests on a derivation instead of a source, the claim's note says so. No verdict rests on a source I could not open. The brief check script was also re-run (brief 59: 33.3%, +/-3.1, seed 59 48.7%). The kit's mulberry32 and the check script's mulberry32 gave the same output over 1,000 draws for seeds 58, 59 and 591.

Unrecorded claims: I compared every learner-visible sentence (hook, question, options, stage labels, reveal, recall) with the claims list and found none unrecorded.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Derivation: 0.5r / (0.5r + 0.5 x 2r) = 1/3 at any n. 95% margins at p = 1/3: 2.92, 0.92 and 0.29 points at 1,000, 10,000 and 100,000. 'Two opponents per backer' is the expected ratio. |
| c2 | verified | Simulation re-run in node with my own copy of run() and the kit mulberry32: seed 591 gives 35.3% +/-3.0, 592 gives 32.3% +/-0.9, 593 gives 33.1% +/-0.3, and 59 gives 48.7% +/-3.1. All four match the stage and the reveal. |
| c3 | verified | Derivation: 1.96 x sqrt(0.25/1,000) = 3.10 points. The seeded 48.7% is within it, so 'near the truth' holds. |
| c4 | verified | Convention, consistent: the caption 'Web: opponents reply twice as often. Calls: random.' is on the stage. The assumption that everyone called answers is in the code (p = 1/2 per call) and in this claim. |
| c5 | unverified | Held: no source on the 1936 Literary Digest poll could be opened (web blocked), and the claim cannot be derived. It is a citation, not in the lesson text, but it shows in the ledger. Withdraw it, or keep it held until someone opens a source. |

**Result:** no disputes. Held unverified: c5, because the source could not be opened (see the notes); publishing waits until these are withdrawn or sourced. Everything else is verified.

## Pass 37 (2026-10-14, W-732)

Checker: fact-checker, a fresh instance. I did not write, build or record these claims. Scope: confirm that c5, withdrawn in v2 (W-676), is never shown to learners. Method: I grepped Demo.tsx and the title, hook and recall in meta.json for the citation, and traced every route by which claims reach the client: src/lib/feed-index.ts, src/app/api/meta/[slug]/route.ts and src/components/DemoCard.tsx.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | withdrawn (kept) | NOT CONFIRMED as 'never shown'. The lesson itself is clean: the citation (the 1936 Literary Digest poll) is not in Demo.tsx, the title, the hook or the recall. But the learner-facing 'Why trust this?' sheet (src/components/DemoCard.tsx lines 103-113) lists every claim in meta.json with no status filter. It loads them from /api/meta/<slug> (the full meta) or from the full prop on /d/<slug>. So a learner who opens the sheet sees this claim's text, which begins '(Not shown to the learner.)', with a 'withdrawn' pill and its source. The footer count (src/lib/feed-index.ts line 16) also counts withdrawn claims in the total, so the lesson can never show 5/5: it shows 4/5. This is platform-wide, not specific to this lesson: 36 lesson meta.json files hold a withdrawn claim. company/knowledge/README.md line 18 says 'A withdrawn claim must also leave the lesson's text'. Whether the trust sheet counts as lesson text is a product/platform call. I route it to platform-engineer (filter withdrawn claims out of the sheet and the count, or label them as removed) and do not block on it here. |

**Result:** c5 stays withdrawn, and no claim status changed. c1-c4 are verified and were not reopened. Open item: the trust-sheet display of withdrawn claims (platform-engineer).
