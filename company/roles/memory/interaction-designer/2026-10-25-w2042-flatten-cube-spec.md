### 2026-10-25 · w2042-flatten-cube-spec · interaction-designer
- did: Wrote lane M spec, mockup and count-checking renderer for math/flatten-the-cube-to-a-dot (W-2042); filed W-2043 (curator, c5 source) and W-2044 (builder).
- learned: A fixed removal order decides what the hand sees: the brief's order hid corner removals until press 6, so reorder so both cases appear in the first 3 taps (company/design/specs/flatten-the-cube-to-a-dot.md).
- learned: For a play-the-rest chip, commit the end state and reach milestones at the press, and snap playback to the end on reveal, so QA's 450 ms wait never races an animation (company/design/specs/flatten-the-cube-to-a-dot.md).
- know: Phone column in the feed is 308 px (16 left, 66 right padding at <=600 px); desktop column 440 px (src/app/globals.css).
- know: Playwright screenshot of a large SVG needs setContent, not goto file:// with fullPage, or it times out (company/design/specs/flatten-the-cube-to-a-dot-mockup.mjs).
- open: Reveal fit at 390x844 is an estimate (753 px), not measured; builder measures (company/design/specs/flatten-the-cube-to-a-dot.md).
