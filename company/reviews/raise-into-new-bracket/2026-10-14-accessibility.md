# Accessibility review: raise-into-new-bracket (2026-10-14)

**Verdict: fail** (lesson-level; every lesson also inherits the kit-level problems in the [published audit](../_accessibility/2026-10-13-published-audit.md), second batch section)

Reviewer: accessibility-reviewer. Method: `node tools/a11y-scan.mjs` at 390x844 against the built app on :3421 (dark and light, predict / explore / reveal, plus a reduced-motion pass). Not hand-checked; the verdict is the script's. Raw data: `artifacts/a11y/scan-2026-10-14.json` (not committed). Board W-149.

| Check | Result | Notes |
|---|---|---|
| Keyboard path predict → explore → reveal | ok | the scan completed the path with the keyboard alone; no lock-out found. Focus drop after commit is kit-level (K3) |
| Accessible names (controls, stage SVG) | ok | every control named; stage SVG has role=img and a label |
| Contrast (WCAG AA, dark and light) | FAIL | 2 failing item(s), worst: 2.9:1 (needs 4.5) dark/explore: "keep 90%" #eef1f7 on #409d82 |
| Tap targets at 390 px | ok | no lesson-styled control under 44 px; kit and app chrome are kit-level (K2) |
| Reduced motion | ok | no animation still running; preference applied |
| Meaning not by colour alone | ok | no colour-only cue detected |
| SVG label tracks state | ok | label changes between predict and reveal |
| Small text (< 9 px rendered) | fix | 12 item(s), e.g. Text rendered at 7.8px (< 9px) in dark/reveal: "$20,000" |

## Findings in this lesson (route to the lesson builder)

### Fail

- **contrast** (2 items): 2.9:1 (needs 4.5) dark/explore: "keep 90%" #eef1f7 on #409d82

### Fix

- **text-size** (12 items): Text rendered at 7.8px (< 9px) in dark/reveal: "$20,000" text.Q0Ef1q_axis:nth-of-type(1)

## What this record does not show

- No screen reader was run. Names, roles and live regions are read from the DOM.
- Contrast is computed from painted colours; text over images or gradients is skipped. Dimmed states are counted.
- The colour-alone and SVG-label items are prompts for a human, not verdicts.
- 200% zoom, text-only zoom and landscape were not checked.

## Next

Builder of this lesson fixes the items above, then the accessibility reviewer re-runs `node tools/a11y-scan.mjs raise-into-new-bracket`. Kit-level items (K1-K8) go to the platform engineer. Unpublish or waive is the founder's decision (F-14); this record does not unpublish anything.
