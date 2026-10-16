# Launch record: 2026-10-16: Life Hacks slate, 6 lessons published (no deploy)

owner: release-manager (Diego) · date: 2026-10-16
class: publish (`node tools/company.mjs publish <slug>`), executing ask A6 of `company/rituals/records/2026-10-16-domain-launch-lifehacks-r2.md`
inputs: safety attestations 0c64108 (W-1082), prediction d83d7b7 (W-1083), holds lifted by the chief of staff in bcbbede
board: W-586, W-1082, W-1083, W-1114
status: **published in the tree (meta.json `status: published`). NOT deployed.** The deploy needs the founder's approval of that specific deploy (company/ops/runbook-deploy.md). I ran no deploy and put no deploy marker in a commit.

## Published

Each row was checked with `node tools/publish-ready.mjs` (read-only: listed as a candidate), against its meta.json (every live claim `verified`), against the newest learner review (`Verdict: launch` naming the current version), and against `company/reviews/<slug>/2026-10-16-safety-launch.md` (`Verdict: ATTEST`). Then `company publish <slug>` ran, one at a time, and each exited 0.

| Lesson | Version | Claims | Learner verdict | Safety launch |
|---|---|---|---|---|
| packing-cube-walls | v1 | 6/6 verified | launch, v1 (r11) | ATTEST |
| pillowcase-set-kit | v1 | 6/6 verified | launch, v1 (r11) | ATTEST |
| shelf-front-labels | v1 | 6/6 verified | launch, v1 (r11) | ATTEST |
| rolled-or-folded-volume | v2 | 6/6 verified | launch, v2 (r11) | ATTEST |
| rebuild-the-procedure | v1 | 4/4 verified | launch, v1 (r11) | ATTEST |
| spaced-beats-cram | v2 | 5 verified, c2 withdrawn in v2 (W-1075, not shown to learners) | launch, v2 (r12) | ATTEST |

## Not published

- **suitcase-rotate-block**: still held by the chief of staff (trust-sheet recall differs from the stage; fact-checker W-1078 must confirm). Not touched.
- **zero-loses-to-this-crowd**: `publish-ready` also lists it as a candidate. It is not in A6 and no hold lift or attestation was given to me for it. Not published; the chief of staff or head-of-product decides.
- The other Life Hacks rows stay held by the domain hold.

## Known defect

**W-1114**: screen readers announce the chosen button as "pressed, dimmed". The sight half of the accessibility fix is in (aria-pressed, TP-1); the screen-reader half is open and its fix waits on an amendment to protected `tests/qa/contract.spec.ts` rule 3 (board). It is a known defect at publish time. Per the r2 record's R5 the head-of-product accepted publishing with it. Owner of the fix: not release-manager (route: lh-tests / demo-builder via the board).

## Rollback

`meta.json` `status` back to `review` for the slug (revert the launch commit). No deploy has happened, so nothing live changes until a deploy.

## Objections

- **W-1114 ships known.** Learners using screen readers will hear a wrong state on the chosen button. Not resolved by this record: the publish gate does not check it, and I may not decide what is ready. It is carried here, and the fix is on the board under W-1114. A deploy should not be approved without the founder seeing this line. Answer owed by: head-of-product / founder.
- **`company publish` reads neither holds nor learner verdicts** (r1 Objection 5, r2 section 1). I compensated by checking both by hand for each slug. The engineering fix remains open; not mine.
- **Withdrawn claim c2 on spaced-beats-cram.** The "every claim verified" check was read as "every live claim"; c2 is `withdrawn` and not shown. If the reviewers intended otherwise, raise it before deploy.
