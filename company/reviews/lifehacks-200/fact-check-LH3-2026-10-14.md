
## Batch B: `lifehacks.<slug>.recall` claims for 63 lessons (measure-inside-not-outside … zoom-does-not-rewrite)

- **Checked by:** fact-checker (independent instance; I did not write these whys, the learning designer did), 2026-10-14.
- **Scope:** the 63 slugs in the LH-3B list. Each claim's text equals `meta.json` recall.why, and all 63 recall items (question, options, answer, why) match `recall-patch-home.lines.txt` / `recall-patch-study.lines.txt` exactly (no drift).
- **Method:** (1) every number re-derived in node (wall subtraction, envelopes, loop lengths, π·15², C(8,2), SPT start-time sums, √(60²+80²), tolerance extremes, ASCII sort of draft1/2/10 variants, etc.); (2) each distractor checked for whether it could also be correct; (3) the why compared with the lesson's idea/limit/formula claims and `src/lib/lifehacks/home-models.ts`, `home-lessons.ts` and the `HomeLesson.tsx` scene; (4) checked for promised real-world effects.
- **Totals:** 58 verified, 2 disputed, 3 unverified (source could not be opened).

### Verified (58)
measure-inside-not-outside, meeting-and-preparation, name-the-next-owner, nested-box-retrieval, note-gap-check, one-person-two-jobs, one-question-one-card, packing-cube-walls, pillowcase-set-kit, plain-text-paste-scope, project-prefix-filenames, rebuild-the-procedure, record-the-reason, rectangular-bin-nesting, request-needs-the-object, reserve-an-unassigned-slot, resize-photo-frame-ratio, reverse-the-flashcard, ribbon-around-box-length, round-box-leftover-gap, rug-chair-pullback, ruler-start-not-zero, search-the-document-body, select-before-replace, selection-not-focus, separate-confusable-pairs, separate-ready-from-blocked, shelf-front-labels, shelf-gap-wasted-height, shoes-opposite-ends, short-jobs-clear-a-queue, shorter-folder-path, show-the-file-extension, small-items-in-mesh, sock-pairing-by-pattern, sock-pairs-not-all-combinations, socks-use-shoe-space, sofa-diagonal-room, spacer-protects-clearance, status-and-blocker-differ, suitcase-layer-access, tags-are-not-copies, tape-mark-same-spacing, tote-balance-sides, towel-over-two-bars, towel-spread-dries-first, towel-thickness-hidden-volume, transparent-box-visibility, trays-slide-out-reach, undo-then-redo, unlock-the-following-work, version-nine-and-ten, weight-spread-on-table, wet-knit-hang-stretch, wetter-cloth-more-water, work-back-from-a-deadline, wrapping-paper-minimum-area, zoom-does-not-rewrite.

### Disputed (2): each blocks publishing until fixed and re-checked
- **mug-handle-packing.recall:** the arithmetic is right (48/12 = 4; 48/9 = 5). But the question doesn't say which way the handles point. Turn them toward the tray depth and 5 cups (45 cm) fit side by side without overlapping handles. Option "5" is then also correct, and "they collide at the handles" holds only for handles along the row, as drawn. FIX the question to "Cups are 9 cm across, with a 3 cm handle pointing along the row. With handles not allowed to overlap, how many fit across a 48 cm tray?"
- **seasonal-bin-rotation.recall:** the lesson model gives (N−1) × uses = 16 and 4 for N = 5. The question, though, says only "two bins share a cupboard 5 deep" and never puts anything between them. With two bins, the back bin has one blocker, so "each of the 4 uses moves 4 blockers" doesn't follow and no option fits a literal reading. The model's middle items are drawn on stage but never stated in the recall. FIX the question to "Two bins share a cupboard 5 deep, with 3 other boxes between the front and back positions. …" (the why can stay).

### Unverified (3): the source could not be opened (proxy 403, egress policy)
- **spaced-beats-cram.recall:** pubmed.ncbi.nlm.nih.gov, eutils and the evullab.org author PDF are blocked. Search snippets agree with the cited Cepeda et al. 2006 abstract (839 assessments, 317 experiments; spacing benefits verbal recall). The logic and key are fine, and the why is hedged. Re-check from a connected host.
- **square-bow-stays-tied.recall:** fieggen.com and the escholarship PDF are blocked. Wikipedia and Fieggen quotes in snippets agree (matching stages give a granny bow along the shoe; opposing stages give a reef bow across it). The key and logic are fine. Re-check from a connected host.
- **wobbly-table-quarter-turn.recall:** arxiv.org is blocked. Abstract summaries agree (equal legs, continuous ground with bounded slope; balanced means four-foot contact, not level). The key and logic are fine. Re-check from a connected host.

### Observations (not disputes; on the board for the chief of staff)
- The 27 study-lesson recall claims that cite the patch file (20 `convention`, 7 `derivation`) point to `company/reviews/lifehacks-200/recall-patch-study.json`, which isn't in the repo. The patch of record is `recall-patch-study.md` + `.lines.txt`. I added this to each source note; the claim texts are unaffected.
- The study lessons' `c4` claims still read "Recall question answer and rationale: <old answer>" (e.g. work-back-from-a-deadline.c4 "Minute 10"), but the rendered recall is now the patched item (17:00 → 16:15). If c4 records the stage prediction, its label is stale. If it records the recall, it is orphaned, and the patch deleted the equivalent c4 only for apply-not-quote and calendar-needs-travel. This is for the chief of staff and demo-builder to decide. I didn't change it.

## Batch A (LH-3A): 64 lessons, alphabet-sort-search to measure-diagonal-for-square

- **Checked by:** fact-checker (Ingrid), 2026-10-14. Lesson list: the LH-3A dispatch list (64 slugs, alphabetical from alphabet-sort-search to measure-diagonal-for-square). The 31 home and 33 study recalls in meta.json match the patch `.lines.txt` exactly (question, options, key, why), and every claim text equals `recall.why`.
- **Node scripts:** the arithmetic, the cut/paste simulation, the text sort for iso-date and the exact-phrase match are re-run in scratch. All pass.
- **Result:** 54 verified, 6 left unverified (source not opened), 0 disputed. 4 more were already verified by the FC LH-2 instance (W-369) before this pass reached them: coiled-cord-bend-radius, drying-room-water-load, elastic-loop-release and group-cables-with-ends. I re-derived all four on my own and agree; I left their status and notes as they were.
- **Sources not opened:** the proxy refused CONNECT (403) for nist.gov, openstax.org, mit.edu and support.google.com, and WebFetch failed DNS. The six source claims below keep `status: unverified`, with checkedBy/checkedOn and a note. Their arithmetic and keys are correct. Only the source is owed.
- **Pointer fix (not learner-facing, no dispute):** the study recall claims cite `company/reviews/lifehacks-200/recall-patch-study.json` in their source, but that file does not exist. The record is `recall-patch-study.md` with `recall-patch-study.lines.txt`. I noted this in each affected source, and the builder can correct the string when next touching the claims.
- **Wording notes (optional, not disputes):** iso-date-filename-sort: "sort ahead of 2025" should read "sort ahead of the 2025 names". box-handle-clearance: "hides an 8 cm collision" means up to 8 cm of protrusion goes unseen.

| Lesson | Support | Status | Check |
|---|---|---|---|
| alphabet-sort-search | derivation | verified | No arithmetic. Key 1 only option giving the ordering guarantee; matches c1 (sorted comparison rules out earlier labels). |
| arrival-is-not-departure | derivation | verified | 9:00 − 35 min = 8:25 (node). 9:00 ignores trip, 8:35 is a 10-min slip. Matches c2 (start = arrival − journey). |
| bag-weight-before-volume | derivation | verified | 2 + 6 = 8 kg, 1 kg over 7 (node). Matches c1/c3 (masses sum, volume unused); 7 kg labelled as example, like c2. |
| batch-by-setup | derivation | verified | Switches: grouped 1 (2 min), both alternating orders 3 (6 min) (node). Matches c2; no concentration claim. |
| box-handle-clearance | derivation | verified | 38 + 2×4 = 46 cm; 42 is one handle (node). Matches c1/c3 envelope. Wording: 'hides an 8 cm collision' means up to 8 cm of missed protrusion; acceptable. |
| breeze-is-not-extra-surface | derivation | verified | Rate = area × flux; flux ×2 → rate ×2, area fixed 1.5 m² (node). Matches c1/c3; doubling flagged illustrative, as c2. |
| buffer-for-a-late-finish | derivation | verified | 9:30 + 10 = 9:40 (node). Matches c2 (gap absorbs up to its length); 9:35 is a slip. |
| bug-report-needs-reproduction | convention | verified | No arithmetic. Only key 1 has input, expected and actual. Matches c2; no root-cause or outcome promise. |
| calendar-needs-travel | derivation | verified | 10:30 − 25 = 10:05, so 10:00–10:05 free (node). Matches c2 (travel is a block). |
| care-label-first-choice | derivation | verified | No arithmetic. Keys 0 and 2 both line-dry a dry-flat item; only 1 complies. Matches c1/c3; no care-symbol claim. |
| check-confidence-with-output | convention | verified | No arithmetic. Only key 0 produces a checkable output. Matches c2; no retention claim. |
| choose-the-metric-first | convention | verified | No arithmetic. 1 and 2 each assume a metric; only 0 holds. Matches c2. |
| circle-tray-square-corners | derivation | verified | No arithmetic. Rotation and flipping leave a disc unchanged; only re-arrangement can change the count. Matches c1/c2. |
| cm-to-inches | source | unverified (source not opened) | Arithmetic OK: 127/2.54 = 50, 127/2.5 = 50.8, 127×2.5 = 317.5 (node); key unique; matches c1–c3. Source NIST si-units-length NOT OPENED (proxy 403; WebFetch DNS failure). |
| coiled-cord-bend-radius | derivation | verified (FC LH-2; concur) | Curvature 1/15 = 2 × 1/30; circumference 2πr smaller (node). Matches c1/c3 formulas; 'no product-specific bend limit' matches c2. Lesson c1–c5 are under W-369 re-check; this item does not depend on them. |
| copy-keeps-the-original | convention | verified | Count: source kept + one pasted = 2. Matches c2. |
| count-setup-in-the-block | derivation | verified | 10 + 20 = 30 > 25 (node). Matches c2 (setup is part of the booking). |
| cover-before-recall | convention | verified | No arithmetic. Only key 1 hides the answer. Matches c2; no memory-gain claim. |
| cue-needs-a-boundary | convention | verified | No arithmetic. Only key 1 names its context; matches c2. |
| cut-moves-the-selection | convention | verified | Simulated in node: cut B, paste after D → 'A C D B'. Matches c2. |
| deadline-needs-a-reference | convention | verified | No arithmetic. Only key 2 has date, time and zone; matches c2 (DST/conversion out of scope). |
| delegate-the-whole-handoff | convention | verified | No arithmetic. Matches c2 (handoff releases input); no speedup claim. |
| deleted-is-a-search-state | source | unverified (source not opened) | Key 2 unique; matches c2 ('retention and recovery rules differ'). Source Google Drive Help 2375114 NOT OPENED (proxy 403; WebFetch DNS failure). |
| dependency-before-priority | convention | verified | No arithmetic. Matches c2 (priority does not remove prerequisite); 'same moment' impossible since the quote is an input. |
| desk-supply-near-use | derivation | verified | 8 × 2 × 5 = 80 m; desk copy 0 m (node). 40 m forgets the return leg. Matches c1/c3; storage cost as c1. |
| do-not-starve-the-long-job | derivation | verified | 5+5+5+20 = 35 > 22; long first ends at 20 ≤ 22 (node). Matches c2. |
| door-swing-clearance | derivation | verified | Radius = door width 85 cm; c3 collision when radius < width, so 'more than 85 cm' is safe in the model; 42.5 is half-width slip. Real-handle and exit caveats match c2. |
| drawer-divider-cost | derivation | verified | (50 − 4×1)/5 = 9.2; 9.8 uses one divider; 10 ignores walls (node). Matches c1/c3 (n compartments, n−1 dividers). |
| drying-room-water-load | derivation | verified (FC LH-2; concur) | 6 × 300 = 1800 g = 1.8 kg (node). Matches c1/c3 mass balance. Scope line no longer carries the mould reassurance (safety second reader approved it, company/reviews/drying-room-water-load/2026-10-14-safety.md); does not contradict the c6 warning. |
| duplicate-before-experiment | convention | verified | No arithmetic. Rename/save still change the one file; only key 0 keeps an original. Matches c2. |
| duplicates-two-stations | derivation | verified | 6 m × 5 = 30 m; tools 1 → 2 (node). Matches c1/c3 trade-off and c2 (no 'always better'). |
| earliest-deadline-first | derivation | verified | A,B: 10 ≤ 10, 13 ≤ 30; B,A: A at 13 > 10 (node). Only key 1 meets both. Matches c2. |
| elastic-loop-release | derivation | verified (FC LH-2; concur) | No arithmetic. Key 1 unique: 0 and 2 contradict c1. The cord drawing now exists (W-358, HomeLesson.tsx loop-release branch), so the lesson has a referent. Support derivation (topology), as FC LH-1 asked. |
| equal-names-not-equal-files | convention | verified | No arithmetic. Matches c2 (names collide; compare contents). |
| estimate-a-range | derivation | verified | 13:00 + 35 = 13:35, 5 min into 13:30; +20 = 13:20, 10 min spare (node). Matches c2. |
| explain-the-link | convention | verified | No arithmetic. Only key 2 keeps cause order; matches c2. No claim that alarms always wake you. |
| file-fold-see-each-shirt | derivation | verified | Visible edges 1 (stack) and 7 (row), per c3 formula. Matches c1 (selection, not volume). |
| file-modified-not-created | convention | verified | No arithmetic. Matches c2. |
| find-next-is-navigation | convention | verified | No arithmetic. Matches c2 (tokens unchanged). |
| fit-before-fixed-slot | derivation | verified | 11:00 − 25 = 10:35 (node). 11:05 would overlap. Matches c2. |
| fitted-sheet-corners-nest | derivation | verified | 8 + 3×2 = 14; 4 × 8 = 32 (node). Matches c3 formula; elastic/seam caveat as c2. |
| furniture-through-door | derivation | verified | 90 > 75; 70 and 50 < 75 (node). Volume key wrong per c1. Corner/height caveat as c2/c3. |
| garment-overlap-hides-face | derivation | verified | 2 × 20 × 60 = 2400 cm² (node); 1200 counts one face. Matches c3 'contact hides 2×overlap×60'. |
| group-cables-with-ends | derivation | verified (FC LH-2; concur) | No arithmetic. Key 1 unique. 'In the drawing' now has a referent: cord branch draws loose ends vs 'Ends tucked into end ties' (W-358). Matches c1/c3. |
| half-size-two-towels | derivation | verified | 2 × 0.8 × 1.2 = 1.92 m² = 2 halves × 2 × 0.8 × 0.6 (node). Matches c1/c3. |
| handoff-after-finish | derivation | verified | 10:30 + 30 = 11:00 (node). Matches c2 (no partial handoff). |
| handoff-needs-a-checkpoint | convention | verified | No arithmetic. Only key 2 has artifact, last step, next check; matches c2. |
| heavy-book-close-to-back | derivation | verified | 5/25 = 1/5 (node), an 80% drop, so '20%' is wrong. Moment formula matches c3; comfort/injury caveat matches c2. |
| humidity-evaporation-gap | source | unverified (source not opened) | Arithmetic OK: (1−0.4)/(1−0.8) = 3 (node); key unique; matches c3 normalised gap. Source OpenStax §13.6 NOT OPENED (proxy 403; WebFetch DNS failure). |
| include-the-wrap-up | derivation | verified | 14:45 + 15 = 15:00 (node). Matches c2. |
| iso-date-filename-sort | derivation | verified | Sorted in node: only YYYY-MM-DD puts the 2025 file first. Wording: 'sort ahead of 2025' means ahead of the 2025 names; optional reword 'sort ahead of the 2025 names'. |
| jacket-last-first | derivation | verified | LIFO: pack scarf, sweater, jacket → unpack jacket, sweater, scarf. Matches c1/c3. |
| keys-fixed-drop-zone | derivation | verified | Worst case 6 → 1 per c3. Only key 2 maintains the address (c1); door-side bowl and tag do not. |
| labels-specific-address | derivation | verified | Category 10/2 = 5 vs 1 (node), per c3 ceil(N/2). Put-back caveat as c2. |
| laundry-gap-air-path | derivation | verified | (52 − 5×8)/4 = 3; 12/5 = 2.4 slip (node). Matches c3; no airflow claim (c2). |
| laundry-sort-before-walk | derivation | verified | 6 trips × 6 m = 36; 2 trips × 6 m = 12 (node). Capacity stipulated, consistent with c2. |
| lids-match-by-size | derivation | verified | No arithmetic beyond 18 = 18. Matches c1 (colour no constraint) and c2 (rim/seal). |
| long-cord-knots-itself | source | unverified (source not opened) | Key unique; matches c1/c2 (setup-specific frequency, not household odds). Source Raymer & Smith 2007 (mit.edu PDF) NOT OPENED (proxy 403). |
| mail-exact-phrase | source | unverified (source not opened) | Phrase match simulated in node: only 'I saw a red car' has the adjacent sequence. Source Gmail Help 7190 NOT OPENED (proxy 403; WebFetch DNS failure). |
| mail-minus-noise | source | unverified (source not opened) | Key 0 unique under the fixture rules. Source Gmail Help 7190 NOT OPENED (proxy 403; WebFetch DNS failure). |
| mail-or-vs-and | derivation | verified | Union 5 + 8 − 2 = 11; AND 2; 13 double-counts (node). Set arithmetic, support derivation; consistent with c2 (records, not conversations). |
| make-a-question-answerable | convention | verified | No arithmetic. Only key 0 names alternatives and a reply time; matches c2. |
| margin-before-cut | derivation | verified | 25 + 2×1.5 = 28; 26.5 is one fold (node). Matches c1/c3. |
| measure-diagonal-for-square | derivation | verified | With sides 60/80, diagonals 104/96 imply an ~85.2° corner (node: 103.9/95.9); square would be 100/100. 'About' is honest. Matches c1/c2 (parallelogram condition). |

**Disputes (Batch A):** none.
**Next:** a host that can open nist.gov, openstax.org, mit.edu and support.google.com re-checks the 6 source claims: cm-to-inches, deleted-is-a-search-state, humidity-evaporation-gap, long-cord-knots-itself, mail-exact-phrase and mail-minus-noise. That role is fact-checker.
