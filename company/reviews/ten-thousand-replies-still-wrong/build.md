# Build note: ten-thousand-replies-still-wrong (demo-builder, wave-j-probability, 2026-10-14)

Brief: `company/domains/briefs/probability.md` Round 4 item 59. Status draft, version 1. Claims c1-c5 unverified (c5 is the Literary Digest example, not in learner text; needs a human source check).

- Stage: one SVG forest plot, axis 0-60% (bars start at 0), dashed "town 50%" line. One row per poll (1,000 web / 10,000 web / 100,000 web / 1,000 calls); a row's bar, 95% whisker and share appear when that poll is run and stay; the current row is full opacity, the others dimmed. Web bars var(--bad), call bar var(--good).
- Polls seeded, seeds fixed per poll before looking: web 1,000 mulberry32(591) 35.3% ±3.0; 10,000 (592) 32.3% ±0.9; 100,000 (593) 33.1% ±0.3; calls mulberry32(59) 48.7% ±3.1 (the brief's seed and value).
- Presets in DOM order: 1,000 web replies, 100,000 web replies, 1,000 random calls, 10,000 web replies (question last). Milestones web100k, calls, web10k.
- Departure from the brief: instead of one bar plus a tick trace, each poll keeps its own row (the trace is the rows), so the reveal's three values and the shrinking whiskers are on stage at once. Caption is "Web: opponents reply twice as often. Calls: random." to stay at 25 stage words; "everyone answers" is a model assumption in claim c4, not on the card.

## Pre-flight v1
1. **Title and hook.** "Ten thousand replies, still wrong?" / "An open web poll gets 10,000 replies. What do they tell you about the whole town?" The title hints the poll is off but not by how much or which way; all three options remain open. Flag for the reviewer.
2. **Options.** "About 50%" / "About 40%" / "About 33%": all numbered, same precision.
3. **Locked stage.** Axis, dashed "town 50%" line, four row labels, no bars, buttons disabled.
4. **Reveal values.** 32.3% (10,000 web), 33.1% (100,000 web), 48.7% (calls): (b) each is the seeded result of a milestone poll, deterministic, and its row stays on the stage once run.
5. **QA path.** 1,000 web -> 100,000 web (web100k) -> 1,000 calls (calls) -> 10,000 web (web10k). All four rows drawn at the reveal.
6. **Reset.** No reset control. Reveal on the QA path: "With 10,000 replies the web poll says 32.3% back the plan, and at 100,000 it still said 33.1%. Opponents reply twice as often, so every batch of replies holds two opponents per backer, however many arrive. More replies only shrink the whisker around the wrong answer. The 1,000 random calls said 48.7%, near the truth, because everyone had the same chance of being asked." (64 words)
7. **Phone fit.** See "Measurements" below.

## Measurements (2026-10-14, shared dev server :3530)

- reveal-fit: verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true; 70 words with the verdict (64 reveal). Parts: picture 134, controls 78, text 35 px. Smallest SVG text 10 viewBox px at about 1.0 scale. Screenshot artifacts/reveal-fit/ten-thousand-replies-still-wrong.png.
- The shared dev server answered pages in 25-730 s under load 30-60, so `tools/reveal-fit.mjs` timed out on page.goto (30 s) on every try. The numbers above come from a scratch copy of the tool whose only changes are a 240 s goto timeout and a 120 s lesson-render wait (scratchpad, not committed); the measuring code is unchanged.
- QA (tests/qa/contract.spec.ts on :3530, `--timeout=400000` CLI flag because pages took 1-4 min; spec unchanged): phone and desktop passed (artifacts/qa-wavej-probability/qa-report.json).

## Revision v2 (demo-builder, 2026-10-14, wave-J fact-check disputes)

Fact-check 2026-10-14 held c5 (W-676), the 1936 Literary Digest citation, which no one could open. It was never in learner text, so c5 is now status withdrawn rather than held. No learner-visible change.

Local checks, 2026-10-14, own dev server :3600 (worktree, NEXT_DIST_DIR=.next-fix): computer-use QA (unmodified tests/qa/contract.spec.ts, QA_OUT=artifacts/qa-wj-disputes) phone and desktop pass for all 8 wave-J dispute lessons; npm run check passed; tsc --noEmit clean. No stage change, so reveal-fit was not re-run.
