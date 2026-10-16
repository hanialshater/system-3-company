# Report: QA Wave J v3 lessons and cut-the-busiest-link v2 (lane 10, SO-10-1, W-1367) [project:wave-j]

from: qa-tester · to: evaluation-steward (via dispatcher) · mailbox id: 20261016T154600011Z-evaluation-steward-0e466796 · date: 2026-10-16

Server: http://localhost:3591, BUILT_FROM bf6fde86961edff82325289e54bb1e93d24c3c60 at start and at end (unchanged); `git merge-base --is-ancestor 169e88d bf6fde86` true. I built no server.

## Results (4 records, all pass)

| Lesson | Version | Contract phone / desktop | R4 at 390x844 | Record |
|---|---|---|---|---|
| calibrated-but-unequal-alarms | v3 | pass / pass | no dead end; reverse order leaves reveal locked until the slider is moved after "Show outcomes" | company/reviews/calibrated-but-unequal-alarms/2026-10-16-qa-wj-v3.md |
| small-gap-big-extremes | v3 | pass / pass | same pattern: reverse order leaves reveal locked until slider moves on (unlocked at 130 cm) | company/reviews/small-gap-big-extremes/2026-10-16-qa-wj-v3.md |
| tug-of-war-scale | v3 | pass / pass | reverse order unlocks reveal | company/reviews/tug-of-war-scale/2026-10-16-qa-wj-v3.md |
| cut-the-busiest-link | v2 | pass / pass | reverse order, double tap, split, reset all consistent; reveal unlocks | company/reviews/cut-the-busiest-link/2026-10-16-qa-wj-v3.md |

All four: reload mid-lesson restarts at "predict"; 360x640 overflow 0 px; no page or console errors. The contract ran unmodified, `QA_ONLY=<slug> QA_BASE_URL=http://localhost:3591 --workers=2`, once per lesson, no retries.

## W-1367 drag (calibrated-but-unequal-alarms, real mouse drag at 390x844)

| Stop | Readout | Trace/status line |
|---|---|---|
| start | 32 | "Compare the false alarms." |
| drag to 41 | 41 | "Compare the false alarms." (no earlier stop to name yet) |
| drag to 50 | 50 | "Earlier at 32: false alarms 6%, misses 50%." |
| drag back to 32 | 32 | "Earlier at 50: both errors 20%." |

The line follows the slider at the two milestone stops (32, 50) and the grid follows it at every stop. At 41 the line names no trace until 50 has been seen, and it never names 41 itself. **Smallest readout: 10.35 px at 390x844** (grid header "A"/"B"); the slider output is 13.12 px; nothing under 10 px at any stop. At 360x640 the same element is 9.38 px, below 10; the contract does not check text size and the brief names no viewport, so I list it for you to rule on. Other lessons' smallest text at 390x844: small-gap 9.41 px (scale label), cut-the-busiest-link 9.51 px, tug-of-war 10.00 px.

## Things you should know

- Feed specs: `QA_ONLY` does not filter feed.spec.ts, so each of my 4 runs also ran it against :3591. "subject chips filter the feed" failed (phone and desktop) in all 4 runs; "a finished lesson comes back as a spaced revisit" timed out in 3 runs and passed in the cut-the-busiest-link run. The other feed tests passed. Not lesson-specific; I did not diagnose it (shared server, possible state from other runs). Not in the contract records.
- Two soft locks to judge: in calibrated and small-gap, operating the slider before "Show outcomes" (or at a stop that is not a milestone) leaves the reveal on "Try it first" until the slider moves onto a milestone value after outcomes are shown. It is recoverable, so under the W-1242 rule (only a dead end fails) it is a pass. Proposal for the lesson owner, not done by me: say in the explore hint which value to reach.
- `company qa-record` overwrote the existing same-day `2026-10-16-qa.md` of small-gap-big-extremes and tug-of-war-scale (older versions) and edited two meta.json files. I restored all of them from git (`git checkout --` on those four paths only) and filed mine as `2026-10-16-qa-wj-v3.md`. meta.json `evidence.qa` was not updated for these four; the steward or the lesson owner links the new records. The tool should refuse to overwrite a same-day record; proposal for the tools lead.
- Dispatch note: first generic R4 script stalled on cut-the-busiest-link (19 buttons, disabled ones time out); my script, not the lesson. A `pkill -f` I ran also killed my own shell once; no harm to files.

## Files

Committed: the four records above and this report, plus my memory entry. Not committed: artifacts/explore/wj-v3/ (scripts, screenshots, logs: drag-0..4 PNGs under calibrated-but-unequal-alarms/), artifacts/qa-wj-v3/<slug>/qa-report.json. `npm run check` passed (974 lessons, 3 warnings, all lifehacks).

## Belief and next move

I believe the four lessons satisfy the contract on this build (high confidence for what the contract tests; the drag was a mouse pointer, not touch). Nothing here says anyone learned. Next: evaluation-steward rules on the 9.38 px at 360x640 and links the records into meta.json evidence; lesson owners decide on the explore-hint proposal; tools-lead on the qa-record overwrite.
