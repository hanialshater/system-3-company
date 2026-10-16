# Safety launch sweep (R7.3), T1-L wave 1: 2026-10-16

lifehacks-safety-reviewer (Sana) · ask A3 of `company/rituals/records/2026-10-16-domain-launch-lifehacks-r2.md` · status: **T1-L drawn and walked in full (14 of 14). T2-L (time 4, digital 3) not started: wave 2 is not open (R7.2).**

## Result
**14 of 14 sampled lessons: pass, class none, no wording change. No stratum failed, so no stratum reverts to per-lesson attestation (R7.3).** Strata passed: fix, storage, laundry, study, travel (the T1-L tranche, 60 rows as listed in the record's appendix).

Passing a stratum is my safety gate only. A row still lifts only when R7.5's other conditions hold (learner `launch` on its current version, claims verified, QA current, fact-checker's W-1078 row, not parked). I lift nothing and I do not decide which rows meet them.

## Method
- Build: shared review server http://localhost:3591, `BUILT_FROM` = `987687acc1cc934b5eaa4f5510d2111712263532` at the start and end of the sitting. This SHA is the seed, as R7.3 says.
- Pool: the five T1-L strata exactly as named in the record's Appendix (HEAD f9265aa list). I did not recompute the pool from current `meta.json` files, so a lesson that moved class or was parked since then would still be in the pool. I did check each sampled lesson's own 2026-10-14 source review and meta: all class none, none on the section 6 trigger list.
- Draw: for each stratum, sort slugs, rank by SHA-256 of `seed:stratum:slug`, take the first k = max(2, ceil(n/5)). Script (also run to produce the draw below; re-run it with the seed to reproduce):

```js
import { createHash } from 'node:crypto';
const seed = process.argv[2];
const strata = {
  storage: 'alphabet-sort-search box-handle-clearance desk-supply-near-use duplicates-two-stations file-fold-see-each-shirt keys-fixed-drop-zone labels-specific-address mug-handle-packing nested-box-retrieval rectangular-bin-nesting round-box-leftover-gap rug-chair-pullback seasonal-bin-rotation shelf-gap-wasted-height small-items-in-mesh trays-slide-out-reach',
  study: 'apply-not-quote check-confidence-with-output cover-before-recall cue-needs-a-boundary explain-the-link keep-the-error-feedback note-gap-check one-question-one-card reverse-the-flashcard separate-confusable-pairs',
  laundry: 'breeze-is-not-extra-surface folded-shirt-stack-height garment-overlap-hides-face half-size-two-towels sock-pairing-by-pattern sock-pairs-not-all-combinations square-bow-stays-tied towel-over-two-bars towel-spread-dries-first towel-thickness-hidden-volume',
  fix: 'cm-to-inches drawer-divider-cost fragmented-time-does-not-fit lh-around-versus-across lh-coverage-whole-cans lh-each-cut-allowance lh-material-reuse-account lh-offcuts-not-one-piece lh-overlap-material-area lh-subtract-openings-area lids-match-by-size margin-before-cut measure-diagonal-for-square measure-inside-not-outside resize-photo-frame-ratio ribbon-around-box-length ruler-start-not-zero spacer-protects-clearance tape-mark-same-spacing wrapping-paper-minimum-area',
  travel: 'fitted-sheet-corners-nest jacket-last-first shoes-opposite-ends suitcase-layer-access',
};
for (const [name, list] of Object.entries(strata)) {
  const slugs = list.split(' ').sort();
  const k = Math.max(2, Math.ceil(slugs.length / 5));
  const ranked = slugs.map(s => [createHash('sha256').update(`${seed}:${name}:${s}`).digest('hex'), s]).sort();
  console.log(name, `n=${slugs.length} k=${k}:`, ranked.slice(0, k).map(r => r[1]).join(' '));
}
```

`node draw.mjs 987687acc1cc934b5eaa4f5510d2111712263532` printed:

```
storage n=16 k=4: keys-fixed-drop-zone nested-box-retrieval desk-supply-near-use labels-specific-address
study n=10 k=2: check-confidence-with-output cue-needs-a-boundary
laundry n=10 k=2: half-size-two-towels sock-pairs-not-all-combinations
fix n=20 k=4: ribbon-around-box-length measure-diagonal-for-square ruler-start-not-zero lh-subtract-openings-area
travel n=4 k=2: fitted-sheet-corners-nest jacket-last-first
```

- Walk: `npm run walkthrough -- <slug> --url http://localhost:3591`, one run per lesson (phone viewport, wrong-first choice, both toggles and slider). I read the transcript's predict, explore and reveal text for each, and searched the whole transcript for heat, tool, cord, lifting, child, pet, health and drying words. No extra lessons added by me.

## Rows

| Stratum | Lesson | Class | Learner-visible risk | Verdict |
|---|---|---|---|---|
| storage | keys-fixed-drop-zone | none | none; counts box checks, says it is not a memory claim | pass |
| storage | nested-box-retrieval | none | none; says it is not a universal ranking | pass |
| storage | desk-supply-near-use | none | none; walking-distance arithmetic, 48 m at 4 m and 60 m at 5 m, both quoted correctly | pass |
| storage | labels-specific-address | none | none | pass |
| study | check-confidence-with-output | none | none; no health or retention promise ("cannot estimate future retention") | pass |
| study | cue-needs-a-boundary | none | none | pass |
| laundry | half-size-two-towels | none | none; the title says "Cut the towel in half?" but the card is area arithmetic and shows no cutting method or tool | pass |
| laundry | sock-pairs-not-all-combinations | none | none; 15 pairings for 6 socks and 45 for 10 are correct | pass |
| fix | ribbon-around-box-length | none | none; no tool, no cutting method; says the allowance is illustrative | pass |
| fix | measure-diagonal-for-square | none | none; no tool or structure; reveal carries its own limit | pass |
| fix | ruler-start-not-zero | none | none; "check the ruler's scale" is on the reveal | pass |
| fix | lh-subtract-openings-area | none | none; no ladder, paint, tool or structure is shown | pass |
| travel | fitted-sheet-corners-nest | none | none; says real elastic and seams change the numbers | pass |
| travel | jacket-last-first | none | none; no weight, no airline limit; "top-opening bag only" is on the reveal | pass |

## Notes for other roles (none changes a verdict)
- The `--out` flag of `tools/walkthrough.mjs` did not write to the directory I gave. It wrote the usual `artifacts/walkthroughs/<slug>/` and a nested copy, with an empty screenshot list, at `artifacts/walkthroughs/tmp/claude-0/.../<slug>/`. The artifacts folder is gitignored. Owner: whoever owns `tools/walkthrough.mjs` (protected company tool), so I only note it.
- `node tools/qa-changed.mjs --no-worktree` run inside /home/user/s3c-qa at 987687a selects all seven slate lessons. That checkout's `company/reviews` has no 2026-10-16 QA records, so I read this as the checkout's missing records, not as changed lessons. The test that matters for R4, source diff of the seven between QA commit 6838dba and 987687a, is empty. A5 (qa-tester) should confirm against the main checkout.
- The sample covered the "not sampled but would-be-lifted" rows only by inference. The 7 T1-L rows named in R7 (box-handle-clearance, shoes-opposite-ends, ruler-start-not-zero, ribbon-around-box-length, seasonal-bin-rotation, rug-chair-pullback, round-box-leftover-gap): ribbon-around-box-length and ruler-start-not-zero were walked here. The rest are covered by the stratum pass. shoes-opposite-ends is in `travel` and was not in the 2-lesson draw.
- A version bump in a swept stratum joins the next sweep's pool (R7.3); I will draw it from the new build's SHA.
- cue-needs-a-boundary (sampled, safety pass) carries a disputed claim `lifehacks.cue-needs-a-boundary.seen` (FC pass 61, a recall-versus-stage mismatch, not a safety matter). My pass does not clear it. R7.5 keeps it off the lift list until the fact-checker's row and its claims are clean.
