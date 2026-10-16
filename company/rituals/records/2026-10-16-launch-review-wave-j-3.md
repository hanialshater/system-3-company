# Launch Review: 2026-10-16, Wave J (third slate): two launch, one hold

chair: head-of-product (Priya) · slot hop-wj-launch-3 · requested by principal-pm-verticals (mailbox 20261016T152625257Z-principal-pm-verticals-d9d5c698) · executes: head-of-product via `node tools/company.mjs publish <slug>` (the gates run inside it) · no deploy

Brief: the Wave J lessons that `node tools/publish-ready.mjs` lists as candidates after 169e88d flipped them to review: cut-the-busiest-link, which-sea-gets-the-rain, winning-bid-overpays. Read at HEAD 64519c5, main checkout, clean tree. Same method as W-1457 (`company/rituals/records/2026-10-16-launch-review-wave-j-15.md`, 7ab3934).

## Readings applied

- **Floor:** `node tools/publish-ready.mjs` (read-only) lists four candidates: these three plus zero-loses-to-this-crowd. zero-loses-to-this-crowd is left out on instruction because its c6 claim is still unchecked against its source (W-1456). It is not reviewed here and not published (objection 4).
- **Artifact before account:** I read each `artifacts/walkthroughs/<slug>/sheet.png` frame by frame, from predict to reveal, before reading the learner reviews and QA records. I checked the reveal numbers against the frames (55 km and 150 km on the ruler; the 20%/80% split on the coloured island; $99.2 / $116.5 / $105.4 / $118.6 tiles; 12 → 24 on 3–7 after cutting 5–6; groups of 6 and 4; 6 × 4 = 24 between-group pairs).
- **Sheet is current:** which-sea-gets-the-rain and winning-bid-overpays sheets are dated 2026-10-16 14:43Z, after their last `Demo.tsx` commit (0f8fa45, 14:23Z). The cut-the-busiest-link sheet is 13:36Z, after its v2 `Demo.tsx` commit (5d86720, 12:50Z). 169e88d changed only meta for these three. The `DRAFT` badge and the cut-the-busiest-link "3/5 claims checked" counter are status chrome from before the flip and fact-check, not lesson content.
- **Gates (read, then enforced again by `company publish`):** every claim on all three is verified by fact-checker; no builder checked its own claims. Learner verdicts on the current version: which-sea-gets-the-rain r11 (v3) launch, winning-bid-overpays r11 (v2) launch, cut-the-busiest-link r15 (v2) launch.
- **QA on the current version (W-1237 reading, r5):** which-sea-gets-the-rain and winning-bid-overpays each have a 2026-10-16 qa-tester record (d717b20) built from 987687a, which contains their 0f8fa45 lesson commit, with an R4 exploratory pass. **cut-the-busiest-link has only `company/reviews/cut-the-busiest-link/2026-10-14-qa.md`, which predates its v2 `Demo.tsx` (5d86720, 2026-10-16).** No qa-tester record exists on v2. The requester's own message says lane 10 still owes it (SO-10-1).

## Per-lesson decisions

| Lesson | CM | Decision | One line of reason |
|---|---|---|---|
| which-sea-gets-the-rain | cm-geography | **launch** | The drop at 55 km from the west runs east to the sea 150 km away. Then the colouring shows the divide hugging the west coast with 20%/80% printed, so the learner sees the reveal's claim before it is told. |
| winning-bid-overpays | cm-economics | **launch** | The grey guesses sit around the $100 line while the red winners sit near $116.5 (2 bidders: $105.4; 20: $118.6), so the winner's curse is on the chart before the reveal names it. |
| cut-the-busiest-link | cm-cs | **hold** | The only QA record (2026-10-14) is for v1. v2 changed `Demo.tsx` on 2026-10-16 and has no qa-tester record, so nothing shows the current version holds the contract in a browser. It launches when a qa-tester record on v2 passes and the sheet still matches. |

**Launch: 2. Hold: 1.**

## Notes to category managers (not launch conditions)

These are hypotheses for each lesson's next version. The CM owns them.

- **cm-geography (which-sea-gets-the-rain):** in frame 05 (Reset), "Rain at the dot" returns and the dashed divide stays faint. Fine, but the post-Reset stage looks half-coloured at phone size.
- **cm-economics (winning-bid-overpays):** the hollow green rings in the 2-bidder chart (winner paid under $100) have no legend. AVG GUESS reads $99.2 at all three bidder counts. r11 checked this: 99.15 / 99.17 / 99.20 round to the same value, so it is not a defect, but a learner may read the tile as stuck. The log line omits the 20-bidder run. "Each bids its guess" uses "its" for a person.
- **cm-cs (cut-the-busiest-link, for when it returns):** r15 notes the missing link-number caption on the locked stage and that the reveal's "links inside the groups changed too" goes unexplained.

## Objections

| # | Objection | Raised by | Status |
|---|---|---|---|
| 1 | publish-ready lists cut-the-busiest-link as a candidate and its learner walk says launch. Holding it overrides the tool. | chair (self) | **Declined.** The tool is the floor, not the decision. Under the W-1237 reading I applied at r5, a QA record counts only if a qa-tester wrote it on the version that ships. The 2026-10-14 record predates the v2 `Demo.tsx`. Holding costs one QA run. Launching would put an untested v2 build in front of learners. Routed to qa-tester / lane 10 (SO-10-1) through principal-pm-verticals. A gate that accepts an older-version QA record is a question for the gate owner, and I may not edit gates. |
| 2 | Both launches rest on simulated walks, not learners. | standing caveat | **Stands.** Confidence stays below "**". Nothing here claims anyone learned. |
| 3 | No accessibility review is on file for these lessons (same gap as W-1457 objection 5). | chair (self) | **Open, not a gate.** The launch gates do not include it, and I may not edit gates. It stays routed to the chief of staff's board through the W-1457 record. I do not write board.json in this slot. |
| 4 | zero-loses-to-this-crowd is a publish-ready candidate and was left out. | chair (self) | **Accepted as out of brief.** Its c6 is unchecked against source (W-1456). A launch review must cover it after fact-checker closes W-1456, before it publishes. |
| 5 | The remaining three slugs in the requester's ask (calibrated-but-unequal-alarms v3, small-gap-big-extremes v3, tug-of-war-scale v3) are not on this slate. | chair (self) | **Accepted as not yet eligible.** publish-ready does not list them. They come to a later review once lane 10 has checked them and the tool lists them. |

## Outcome

which-sea-gets-the-rain and winning-bid-overpays are published with `node tools/company.mjs publish <slug>`, one at a time, with the gates enforced per call. The results are in the commit that carries this record. cut-the-busiest-link stays in review. No deploy: no `npm run deploy`, no workflow trigger, no deploy marker in any commit. Going live needs separate founder approval.

## Next

- qa-tester (lane 10, SO-10-1): QA record on cut-the-busiest-link v2. After that, it comes back to the next Wave J launch review.
- fact-checker: W-1456 (zero-loses-to-this-crowd c6). After that, it comes to a launch review.
- category managers above: take the notes as v-next hypotheses.
- release-manager → founder: the deploy decision for these two.
- Open from r6 and not answered here: ask A3 (exploreHint craft rule, W-1333(d)). It is mine to answer in a separate turn.
