# Animal behavior and sensory drafts — 2026-10-28

Twelve new draft lessons, mapped by plan ID in `manifest.json`: 406, 407, 408, 413, 414, 416, 417, 420, 429, 431, 435 and 444. The proposed 421 scent-mark lesson was **not** built because it overlaps `mammal-scent-mark-after-leaving`. A search of the existing animal and life lesson metadata found no exact match for the selected ideas; an independent cross-domain semantic overlap audit is still required.

These are separate illustrated examples with a shared two-panel interaction, not twelve measured experiments or independently calibrated simulations. The response counts, routes, light records, alarm scenario, border encounter, field and matching examples are explicitly stipulated. The UV example uses false color and is not a picture of a bee's subjective experience. The graphics do not establish that a species performed the depicted behavior. All source links are broad **unverified leads**; a fact-checker must locate and verify claim-specific sources, including bee UV sensitivity and fish electroreception, before any publication.

## Pre-flight v1

1. Titles and hooks were revised to avoid directly naming the correct option: e.g. `When the light stays on` / `Two records are taken under a constant condition`, and `A sound before food` / `An animal encounters two events in sequence`. A learning designer should independently challenge remaining cues.
2. Each prediction and recall has three alternatives. Answers rotate through positions. The lever example uses three pairs of counts; others use three verbal alternatives. Some explanations are deliberately narrow, e.g. a change after practice is **consistent** with learning but does not establish its cause.
3. Before commit the visible SVG has two closed panels, a neutral heading and no animal observation, signal, answer, vector, numeric trace or highlight. Every stage control is disabled.
4. Each reveal names evidence in both opened panels: for example 413 requires the north/east outward map and southwest return arrow; 416 requires the constant-light heading and the 0 h, 24 h, 48 h record; 429 uses labeled false-color channels. Toy values and events are fixed by the question and disclosed; none are measured animal data.
5. The two first stage controls open A then B; a duplicate action guard prevents repeated clicks incrementing interactions. The second unique action enables the reveal, retaining both pictures. Source-level wiring checked; real DOM/keyboard behavior has not been verified.
6. There is no local stage Reset. Reload/remount behavior has not been exercised in a browser; do not infer a Reset pass from code inspection.
7. Phone fit and actual rendered tap sizes remain **unverified**. The controls declare minimum 44 px and the SVG uses labels at 11–14 SVG px; only a real 390×844 browser screenshot can establish that the labels and reveal meet the display floor. No full-app, touch, keyboard, screen-reader or learner pass is claimed.

## Visual inspection and limitations

`light-contact.png` and `dark-contact.png` show all twelve final stage pairs rendered in Inkscape from generator-owned graphics with theme colors. They are static stage-only sheets, not lesson-page screenshots. They were inspected for panel placement and obvious text clipping. During inspection I corrected the vector labels, added 24-hour markers to the circadian toy record, added recognizable schematic mouse/bird/fish contexts, labeled false color, increased contrast of the camouflage example, and made the toy food/object contacts visible. The bell/food association remains largely textual, the seasonal movement is a schematic rather than an actual range map, and several examples use idealized symbols; independent visual pedagogy review is needed before claiming the picture explains the mechanism.

## Checks and integration

- `node tools/zoology-sensory-second/check.mjs`: twelve metadata, option, wiring, TSX transpilation and selected scene-consistency checks passed. They are source-level checks, not behavioral browser tests.
- Generator reproduction in an isolated temporary worktree directory produced all 24 `Demo.tsx`/`meta.json` bytes identically. The generator refuses to overwrite existing lesson directories.
- `npm run check`: 797 errors and four warnings after removing the omitted duplicate, compared with 783 errors and four warnings at start. The additions are twelve not-yet-registered concepts and two stale registry files; the parent owns curriculum and registry integration.
- `npm run verify` stops at the inherited publication-readiness failure both before and after. No production build, actual browser or phone-fit check was performed here.
- Parent must register the twelve concepts and regenerate the registry, then run integration checks. Fact-checker, accessibility reviewer, learning designer and learner evaluator must independently review the current versions.
