# Accessibility review: jackpot-once-a-week (2026-10-14)

**Verdict: fail** (lesson-level; every lesson also inherits the kit-level problems in the [published audit](../_accessibility/2026-10-13-published-audit.md), second batch section)

Reviewer: accessibility-reviewer. Method: `node tools/a11y-scan.mjs` at 390x844 against the built app on :3421 (dark and light, predict / explore / reveal, plus a reduced-motion pass). **Also checked by hand** (see below). Raw data: `artifacts/a11y/scan-2026-10-14.json` (not committed). Board W-149.

| Check | Result | Notes |
|---|---|---|
| Keyboard path predict → explore → reveal | ok | the scan completed the path with the keyboard alone; no lock-out found. Focus drop after commit is kit-level (K3) |
| Accessible names (controls, stage SVG) | ok | every control named; stage SVG has role=img and a label |
| Contrast (WCAG AA, dark and light) | FAIL | 1 failing item(s), worst: 1.66:1 (needs 4.5) light/reveal: "win!" #4fd1a5 on #eceff6 |
| Tap targets at 390 px | ok | no lesson-styled control under 44 px; kit and app chrome are kit-level (K2) |
| Reduced motion | ok | no animation still running; preference applied |
| Meaning not by colour alone | ok | no colour-only cue detected |
| SVG label tracks state | ok | label changes between predict and reveal |
| Small text (< 9 px rendered) | ok | none |

## Findings in this lesson (route to the lesson builder)

### Fail

- **contrast** (1 item): 1.66:1 (needs 4.5) light/reveal: "win!" #4fd1a5 on #eceff6

## Hand check

Hand-checked (keyboard trace; light-theme reveal screenshot): the pale green 'win!' label on the light panel is hard to read, which confirms the single failing item. The SVG label updates with the stage ('0 years' -> '1 years of weekly tickets'; minor: 'years' is not singular). Focus drops to <body> after commit (K3).

## What this record does not show

- No screen reader was run. Names, roles and live regions are read from the DOM.
- Contrast is computed from painted colours; text over images or gradients is skipped. Dimmed states are counted.
- The colour-alone and SVG-label items are prompts for a human, not verdicts.
- 200% zoom, text-only zoom and landscape were not checked.

## Next

Builder of this lesson fixes the items above, then the accessibility reviewer re-runs `node tools/a11y-scan.mjs jackpot-once-a-week`. Kit-level items (K1-K8) go to the platform engineer. Unpublish or waive is the founder's decision (F-14); this record does not unpublish anything.
