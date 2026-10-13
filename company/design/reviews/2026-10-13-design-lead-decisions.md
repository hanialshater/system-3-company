# Design lead decisions, 2026-10-13

decider: design-lead (Ines), first run of the role · inputs: `company/design/formats.md`, `company/design/system.md`, `company/design/illustration.md`, the five specs and wireframes in `company/design/specs/` (looked at as 390-wide renders of the .svg files), `src/app/globals.css`, `src/kit/Lesson.tsx` (read only).
Scope: this record covers formats and spec design only. It does not decide what to teach (category managers, learning designer). It does not change the lesson contract. Each spec's author is the interaction designer (Rafael), so these approvals are not self-approval. The ABM format rules below are mine, so the reference lesson's design review must be chaired by someone other than me (see 1.4).

## 1. Agent-based simulation (NetLogo-style): **approved with changes**

**Why approve.** Simulation run covers many *independent* trials. It cannot show agents reacting to each other on one shared world, and that reaction is the whole payoff of emergence lessons (Schelling, and later things like traffic, flocking and fire spread). No existing format shows that idea honestly, and the spec for `mild-preferences-sharp-divides` shows it works on a 390 px phone and on the QA path.

**Changes made at approval (these are the format's rules):**
1. **World.** One grid world, ≤ 50×50 cells, cells ≥ 6 CSS px at 390 width (≤ 300 px square), no wrap unless the rule line says so. Agent groups differ by **shape and hue**. Agent state (e.g. unhappy) is shown by **fill vs hollow**, never by colour alone. Give the grid an `aria-label` that states the tick and the metric.
2. **Rule on the card.** Use one muted line of ≤ 20 words, starting "Toy model.", that states the agent rule with the **active parameter value substituted** (e.g. "under 30%"), not a symbol like "T". The line must match the code, `meta.json` and the fact-check word for word in meaning. Show world size, empty share and seed on a second small line.
3. **Randomness.** mulberry32, seed shown on the stage. **New mix** (next seed) is the first control in DOM order, so the QA path can never end on an emptied world. Any chosen seed is disclosed (`disclose-chosen-seeds`).
4. **Controls (≤ 7, all rendered at first paint, disabled while locked):** New mix · Step · Run · parameter chips. Use chips for the values the question and reveal name. Use a slider only when no exact value is named.
5. **Run.** Compute ticks synchronously to the stop condition (settled, or a tick cap of ≤ 100 shown on the axis). Then replay within 400 ms (frames may be skipped), and show it instantly under `prefers-reduced-motion`. Milestones fire on press, from the computed result. A run that never settles is reported as such ("2% still unhappy at tick 60"), never hidden.
6. **Parameter change after a finished run** shows the settled end of the **same starting mix** at the new value, so runs compare like for like.
7. **Metric chart.** Full width, ≥ 64 px plot height, axes labelled, with a dashed ghost baseline for the start. The current run is drawn `--fg`. Earlier runs stay as thin `--muted` lines. **End labels never overlap or clip:** put them in a right-hand gutter (≥ 40 px), nudged ≥ 11 px apart, or move them into a one-line legend.
8. **Reveal.** The stage pins to the run the reveal quotes, with a label ("Your 30% run, tick 13"). The controls agree with the pin: the pinned run's chip shows active. The reveal quotes the learner's own numbers. It carries the model caveat: the model shows what *can* happen, not what causes a real case.
9. **Budget.** The engine and drawing fit the 15 KB lesson bundle. Draw the grid as one `<canvas>`, or one SVG path per group and state, not 1,600 DOM nodes. Each frame stays under 16 ms on a mid phone.
10. **Kit path (rule of two).** The first two lessons (`mild-preferences-sharp-divides`, `schelling-on-new-york`) are built by hand. The second reuses the first's defaults above. After both ship, the platform engineer lifts `src/kit/abm` with an engineering review (principal engineer, tier 2 because it touches the kit). No other lesson uses the format before then, unless the design lead approves an exception in writing.

**Reference lesson.** `mild-preferences-sharp-divides`, once it passes design review. Because I wrote these rules, that review is chaired by the visual designer (Kiri) with the accessibility reviewer, not by me. Until then, the format is approved for those two lessons only. This uses my authority to "block a new format until it has a spec and a reference lesson", applied as a limit, not a block. **The Schelling lessons are unblocked** (the first after its spec changes in 3.2 are made).

Objection considered: "Run" plus 1,600 agents might break the 450 ms QA wait. Answer: rule 5 computes synchronously and replays within 400 ms. The designer's node check settles at 30% in 8–16 ticks, and the 70% case is capped at 60 ticks. Rule 9 limits drawing cost. If QA flakes on the first build, the fallback is instant replay, not a longer wait.

## 2. The interaction designer's open asks

### 2a. Illustrations: **approved as a catalogue rule**
- **Hero (1:1): predict phase only**, ≤ 96×96 inside the stage at the top right, removed on unlock, so explore has one representation. The hero must not cover or push off-screen the object the question asks about, or any chart label (see `spaced-beats-cram`, where it covers the "A month later" marker). If the stage has no free corner, drop the hero.
- **Image pairs (before/after, comparison, 4:3): in the reveal**, below the reveal text, as two frames side by side, each ≤ 160 px wide (they fit 328 px with an 8 px gap), with captions as stage text, not text in the image. Reason: two pictures beside a live diagram on a phone means three representations of one idea at once. The reveal is where the learner wants the "real thing" picture. The reveal already scrolls inside the card body (`globals.css`), and an image is ReactNode in the existing `reveal` slot, so **no contract change** is needed. The ≤ 90-word reveal budget is for text only.
- Render an `<Illustration>` only once its file is accepted (a 404 fails QA). This rule is unchanged.
- Follow-up: `company/design/illustration-requests/towel-spread-dries-first-pair.md` still says the pair sits "beside the stage's own diagram". Its "Where they go on the card" line should be changed to "in the reveal, below the text" (owner: interaction designer, with cm-lifehacks as requester). The composition notes ("same rack, camera does not move") still hold.

### 2b. 44 px tap targets: **kit fix, with a temporary module class**
- Fact: `.control` in `src/app/globals.css` is `padding: 8px 12px` at 0.88 rem, about **34–35 px tall**. `system.md` already requires ≥ 44 px. The kit is out of line with the design system, so the fix belongs in the kit, not in 500 lessons.
- **Request to the platform engineer:** add `min-height: 44px` (and `min-width: 44px`) to `.control` in `globals.css`, and reflow-check the whole feed with `npm run verify` plus a contact-sheet sample across all domains before merging. Lessons whose stages overflow at 390×844 are fixed by the platform engineer or routed to their builders. Not tier 2: `globals.css` is not protected and the contract is untouched.
- **Until that lands:** the five lessons in this wave may add one module class, `.tap { min-height: 44px; }`, to their controls. It must use the same name in every lesson, so it can be removed with one search when the kit fix ships. No other per-lesson sizing hacks.
- The accessibility reviewer co-owns the design system and is asked to confirm that 44 px is the target for chips as well as buttons (WCAG 2.5.5 AAA, 2.5.8 AA is 24 px). I believe 44 px is right for a thumb-driven feed.

## 3. The five specs

| Spec | Format | Decision |
|---|---|---|
| `square-bow-stays-tied` | Side-by-side comparison | **Approved** |
| `towel-spread-dries-first` | Before / after toggle | **Changes requested** (small) |
| `long-cord-knots-itself` | Simulation run | **Changes requested** (small) |
| `spaced-beats-cram` | Storyboard / scrub | **Changes requested** |
| `mild-preferences-sharp-divides` | Agent-based simulation | **Changes requested** (small; the format is approved) |

### 3.1 square-bow-stays-tied: approved
It is the right format: one shared Walk and two wraps keep "same laces, same pull" true on the stage. The tell (across or along) is visible before any knot name appears. The QA path ends on the swapped pair, which proves the wrap decides. Shape-coded toggle icons and text meters mean colour is never the only cue. The pair in the reveal follows 2a. Note for the build: at predict, the hero must not push the two bows off the first screen (the wireframe passes, with the toggles below the fold).

### 3.2 mild-preferences-sharp-divides: changes requested
1. Rule line: replace "under T" with the active value ("Moves if under 30% like neighbours (of 8)…"). This is format rule 2.
2. Chart end labels collide and clip at the right edge in the reveal wireframe ("30", "10"). Apply format rule 7: a right gutter with nudged labels, or a legend line.
3. Reveal pin: the wireframe shows the grid pinned to the 30% run while the 70% chip is active. When pinned, show 30% as active (format rule 8).
4. Before build sign-off, the accessibility reviewer checks the square vs circle and hollow vs filled cues at the real 7.2 px cell size on a 390 px contact sheet. If shape does not read at that size, enlarge the cells (and reduce the grid, e.g. 36×36 at 8 px) rather than add colour.
5. Count stage words (rule line, seed line, axis labels, "mixed start") against the ≤ 25 budget, not counting numeric readouts. Drop the "mixed start" label first if it is over.
Everything else is accepted as the format's defaults.

### 3.3 towel-spread-dries-first: changes requested
1. The QA path ends with Breeze on, but the results line and reveal quote still-air times (11.3 h, 3 h). The stage must show what the reveal describes. Tag each results entry with its air ("quarters 11.3 h still"), and add breeze runs as separate tagged entries. Alternatively, keep the results line still-air only and say so ("still air:").
2. The Breeze toggle shows "toy ×2" on the stage (the spec already asks for this). Keep it in the build.
3. The spread diagram in the reveal wireframe has stray dashed "covered" marks at the left end. A single layer has no covered faces, so draw none.
4. The pair goes in the reveal (2a: approved), and the 44 px controls use `.tap` until the kit fix (2b).

### 3.4 long-cord-knots-itself: changes requested
1. The "Ends clipped" toggle redraws a box icon that does not appear in the stage anatomy, and on the QA path it ends "on" with nothing visible, while the reveal wireframe shows a clipped ring. Make it do something: **turning clipped on immediately tumbles 20 at the current length with ends joined** (ring at 0/20). This also makes the QA end state match the wireframe. Alternatively, add the box icon to the anatomy and drop the ring from the wireframe.
2. Dot labels at 0.3 m and 0.5 m overlap ("0/20", "1/20"), and the 3 m label clips at the right edge ("9/2"). Extend the x domain to 3.3 m, or anchor end labels inward, and nudge labels so they never overlap (put the lower one below the dot).
3. Keep the honest linear length axis. Do not switch to evenly spaced categories.

### 3.5 spaced-beats-cram: changes requested
1. **Axis.** Days 0–4.5, where half the payoff happens (the morning when cramming wins), get about 45 px of a 340 px chart. The three B sessions and the A jump cannot be read. Use a **broken x axis**: days 0–5 take about 40% of the width, days 5–34 the rest, with a visible break mark and tick labels on both sides. The scrubber maps to the same piecewise scale. This is honest (labelled), and it is the only way both test days read on a phone.
2. Cursor tags collide at the next morning ("A 80%" over "B 78%"), exactly when the two curves are within 3 points. Put the two tags on opposite sides of the cursor (A left, B right) or stack them with ≥ 14 px between. The readouts already carry the values.
3. The hero covers the "A month later" marker label in the predict wireframe. Move the hero under the model line at the left, or drop it (2a).
4. Wireframe values (A 80%) and spec values (A 81%) disagree. The builder's node run decides, and the reveal quotes whatever the stage shows.

## Routing (I do not own these steps; the caller is asked to put them on the board)
- interaction-designer: revise the four specs as above. Change the towel pair request's placement line.
- platform-engineer: `.control` to 44 px min-height across the kit, with a feed reflow check (2b).
- accessibility-reviewer: the 7.2 px shape check (3.2.4), and confirm the 44 px target (2b).
- visual-designer: chair the design review of the ABM reference lesson (1, reference lesson).
- builders: may start `square-bow-stays-tied` now, and the other four once their spec carries "Approved by design lead".
