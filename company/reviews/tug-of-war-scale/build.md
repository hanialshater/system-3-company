# Build note: tug-of-war-scale

Builder: demo-builder (wave-j-physics), 2026-10-14. Brief: `company/domains/briefs/physics.md` round 4, #56. Status draft; every claim unverified.

Built as briefed: one rope band, two pullers (the right one becomes a wall), a spring whose stretch and two equal tension arrows grow with the tension, and a dial. Three preset buttons in brief order; each disables itself while active. Departures: the title and hook were not in the brief (written here: "Tug of war on a spring scale" / "Two friends pull a rope from opposite ends. What does a scale in the middle read?"). The spring stretch and arrow lengths are schematic (claim c4). No Reset control (the brief lists none); the Seen row is never cleared.

## Pre-flight v1

1. **Title and hook.** "Tug of war on a spring scale" / "Two friends pull a rope from opposite ends. What does a scale in the middle read?" No number, no hint of 100 vs 200.
2. **Options.** "0 N", "100 N", "200 N": all numbered, same precision.
3. **Locked stage.** Slack rope, two pullers, spring at rest length, dial with ticks 0-250 labelled 0, 100, 200 (all three options alike), needle at 0, "0 N". No arrows, no tension label.
4. **Reveal values.** "100 N" (pair): milestone pair-100, Seen row. "100 N" (wall): milestone wall-100, Seen row. "200 N": milestone pair-200, Seen row. "not 200", "the second friend": text.
5. **QA path.** DOM order: Both pull 100 N (pair-100, the question's case), Tie right end to a wall (wall-100), Both pull 200 N (pair-200). Three presses reach all three. At the reveal the stage shows 200 + 200 and the Seen row "100 + 100: 100 N · wall: 100 N · 200 + 200: 200 N".
6. **Reset.** No Reset; switching presets never clears the Seen row. Reveal text from the QA path: "With each friend pulling 100 N, your scale read 100 N, not 200. Tied to a wall, one friend's 100 N pull also read 100 N: the wall pulls back exactly as hard, just as the second friend did. A scale measures the tension in the rope, the pull passed through it, and it can only be stretched if both ends are pulled equally. Only when both pulled 200 N did it read 200 N."
7. **Phone fit.** `tools/reveal-fit.mjs` logic at 390×844 on :3530, 2026-10-14: verdict fit, crop 0 px, hiddenBelow 0, namedHidden 0, 81 reveal words (tool count, including the verdict line), phoneFit true, picScale 1. Run with a scratch copy of the tool whose only change is longer page-load timeouts (600 s for goto and the lesson locator), because the unmodified tool timed out on every lesson (the shared server, load 30-55 on 4 CPUs, took about 50 s to deliver a page and about 200 s to render the lesson). Output `artifacts/reveal-fit/wavej-physics.json`, screenshots under `artifacts/reveal-fit/`. Builder's own probe agrees Builder's own probe (Playwright, 390×844, touch, first option committed, each enabled control pressed once in DOM order with 450 ms waits, reveal opened): stage top at 174 px from the viewport top (on screen, no scroll), reveal bottom at 681 px of 844, 81 reveal words including the verdict line, smallest SVG label 10 px as drawn, every control at least 44 px tall, no horizontal overflow, every press changed the stage, no console errors on a clean load. The reveal points at the dial and spring at 200 N, the tension label and the Seen row; all on screen in the 390×844 screenshot. This is testimony until reveal-fit confirms it.

## QA

Computer-use QA, unmodified `tests/qa/contract.spec.ts`, `QA_BASE_URL=http://localhost:3530 QA_ONLY=<the 5 Wave J physics slugs> QA_OUT=artifacts/qa-wavej-physics`, 2026-10-14. With the default 45 s test timeout every test failed at `page.goto` (server load), before any check. With only the test timeout raised on the command line (`--timeout=900000`), phone and desktop both passed. Status stays draft as the dispatch asked; the qa-tester's own run on a quiet server or build is still owed.

## Revision v2 (demo-builder, 2026-10-16, verticals r5 B1: W-834, W-711)

Kept from evaluators until they report. Worktree s3c-wjd5, branch wj-design-r5b1.

- **W-834 (design review 2026-10-14, finding 4): fixed.** `.labT` (the "tension N" label under the spring) is now `fill: var(--fg); font-size: 11px` (was `fill: var(--domain); font-size: 10.5px`). The end-pull labels `.lab` ("100 N") go from 10.5 px to 11 px as well (already fg ink). The spring, needle and tension arrows keep the domain colour: they are strokes, not text. Probe at 390×844: the tension label renders rgb(20, 24, 36) at 11 px, SVG scale 1.
- **W-711 (fact-check c1 wording note): fixed.** Reveal sentence now reads "A scale measures the tension in the rope, the pull passed through it, and at rest it is stretched only when both ends are pulled equally." (was "and it can only be stretched if both ends are pulled equally"). **c1 reset to unverified**, its quote updated, the v1 record kept in its note. No other claim text changed.
- Nothing else changed: same presets, milestones, Seen row, no Reset.

### Stage word budget (v2, decision 2026-10-16 with Ruling 2: a unit after a number counts 0)

| Busiest frame: explore, "Tie right end to a wall" active, 100 + 100 already seen | words |
|---|---|
| Picture: "wall" / "100 N" ×2 / "tension 100 N" / dial ticks and "100 N" | 1 + 0 + 1 + 0 |
| Caption "Right end tied to a wall. The wall pulls back." | 10 |
| "Seen: 100 + 100: 100 N · wall: 100 N · 200 + 200: –" | 2 |
| Controls "Both pull 100 N" / "Tie right end to a wall" / "Both pull 200 N" | 2 + 6 + 2 |
| **Total** (no stimulus) | **24** |

Other frames: locked 17, slack explore 19, pair frames 16. Unchanged from v1 (no stage word changed).

## Pre-flight v2

1-5. Unchanged from v1 (title, hook, options, locked stage, reveal sources, QA path).
6. **Reset.** No Reset. Reveal text on the QA path (rendered, reveal-fit run below): "With each friend pulling 100 N, your scale read 100 N, not 200. Tied to a wall, one friend's 100 N pull also read 100 N: the wall pulls back exactly as hard, just as the second friend did. A scale measures the tension in the rope, the pull passed through it, and at rest it is stretched only when both ends are pulled equally. Only when both pulled 200 N did it read 200 N."
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3647 <4 slugs> --jobs 2 --out artifacts/reveal-fit/wjd5-r5b1.json --shots` (own production build, NEXT_DIST_DIR=.next-wjd5, 2026-10-16, unmodified tool, tool commit 79c22aa, clean): `verdict fit, crop 0, phoneFit true, revealWords 82, hiddenBelow 0, namedHidden 0 (named 100, 200 visible), picScale 1, stageH 280`. Screenshot artifacts/reveal-fit/tug-of-war-scale.png: dial and spring at 200 N, "tension 200 N" label and the Seen row all on screen.

### QA (v2)

`QA_BASE_URL=http://localhost:3647 QA_ONLY=tug-of-war-scale,secret-in-the-counts,which-sea-gets-the-rain,winning-bid-overpays QA_OUT=artifacts/qa-wjd5-r5b1 npx playwright test tests/qa/contract.spec.ts --workers=2` on the own production build: 8 passed (phone and desktop, all four lessons), default timeouts. Status stays draft.

## v3 · 2026-10-16 · demo-builder (Wave J revisions, mailbox 20261016T152552171Z-principal-pm-verticals-57f8213a item 4)

Worktree s3c-wjrev6, branch wj-rev-r6, from d37f621. Finding: `2026-10-16-learner-adult-beginner-r11.md`, blocking finding 3 (the reveal answers the 200 N picker but not the 0 N picker; the c1 sentence reads as "equal pulls are what stretch it"). No cm-physics wording for this finding was on disk (checked `company/domains/briefs/physics.md` §56 and the reviews folder), so the brief's fix is used. Version 3, status `draft`. Kept from evaluators until they report.

| Item | What was done | Result |
|---|---|---|
| One reveal for both wrong answers | Paragraph 1 is now: "With each friend pulling 100 N, your scale read 100 N, not 200 or 0. The two pulls do cancel: that is why the scale stays still. But a scale at rest reads the one pull passing through it: the tension its two ends share." | fixed |
| c1 sentence | "A scale measures the tension in the rope, the pull passed through it, and at rest it is stretched only when both ends are pulled equally." is gone; c1's quote is now "But a scale at rest reads the one pull passing through it: the tension its two ends share." c1 reset to unverified. | fixed |
| New claim | c5 (derivation, unverified): the pulls cancel (net force zero, at rest) and the reading is the tension. | new |
| Kept | Paragraph 2 (wall sentence, c2's quote; "Only when both pulled 200 N ...", c3). c2, c3, c4 still verified. Stage, controls, milestones unchanged. Predict question, options and answer (100 N) unchanged. | as before |

Fit on the way: the first v3 draft (the brief's two sentences added and the c1 sentence replaced in place) measured 100 reveal words, over 90. I merged the c1 sentence into paragraph 1 ("But a scale at rest reads the one pull passing through it: the tension its two ends share."), which removed the separate "A scale at rest has equal pulls on its two ends and reads that one common tension." No claim caption was dropped: 88 words.

### Stage word budget (v3, decision 2026-10-16, Ruling 2: a unit after a number counts 0)

Stage text unchanged from v2, recounted from the rendered DOM on the QA path. Busiest frame: "Tie right end to a wall" active, 100 + 100 seen = **24** (32 raw tokens with a letter, minus 8 "N" after a number): picture "wall" 1, "tension" 1; caption "Right end tied to a wall. The wall pulls back." 10; "Seen:" + "wall:" 2; controls 2 + 6 + 2. Other frames: locked 17, slack 19, 100 + 100: 16, 200 + 200 and reveal: 18. No stimulus.

### Reveal-fit (production build)

Same run as calibrated v3 (own build `.next-r6`, port 4163, 2026-10-16T15:38:38Z, tool commit 79c22aa, clean):

```
tug-of-war-scale fit crop 0 phoneFit true hiddenBelow 0 namedHidden 0 words 88 lines 11 stage 280 {"picture":150,"table":0,"controls":50,"text":46} thumb false
```

Screenshot `artifacts/reveal-fit/tug-of-war-scale.png` (I looked: dial and spring at 200 N, "tension 200 N", the Seen row and both reveal paragraphs on screen, with room below).

### Local contract QA (v3)

Same run as calibrated v3: 12 passed across the six slugs (phone and desktop). Not a QA record.
