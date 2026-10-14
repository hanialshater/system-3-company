# Spec: towel-spread-dries-first

owner: interaction-designer (Rafael) · 2026-10-13 · status: draft, for design review · brief: `company/domains/briefs/lifehacks.md` #1 · wireframe: `towel-spread-dries-first.svg`

**Changes requested (design lead, 2026-10-13):** the results line tags each dry time with its air (still / breeze) so the stage at reveal matches the quoted times; keep "toy ×2" on the Breeze toggle; no covered marks on the single-layer spread. Pair in the reveal is approved; use `.tap` for 44 px controls until the kit fix. Details in `company/design/reviews/2026-10-13-design-lead-decisions.md` §2 and §3.3.

**Format: Before / after toggle.** One change (fold) with one visible effect (fewer "doorways" for the water). The stage opens on the question's folded towel; the learner finds its drying time with their own hands, then opens it out. Spread is the state that persists into the reveal.

## Stage at 390×844 (stage budget: ~330 px at predict, ~480 px in explore)
1. Model line (muted, 1 line): "Toy model: drying time = water ÷ area touching air." (9 words)
2. **Edge-on towel diagram**, full width, ~200 px. The towel is drawn edge-on as 1, 2 or 4 stacked strips (spread / half / quarters), length 340 / 170 / 85 px. Evaporation **arrows** leave only from faces that touch air: one arrow per 0.1225 m² of exposed face (spread 16, half 8, quarters 4 + 1 small edge arrow), so the learner can count the doorways. Faces pressed against another layer are drawn dashed and labelled once: "covered: no air". Water is a fill inside the strips; its opacity follows "water left". Breeze on: three wind lines from the left; arrows lengthen, covered faces stay dashed.
3. Results line (≤ 12 words, appears after the first "dry"): "Dry at: quarters 11.3 h · spread 3 h" (only folds the learner has dried).
4. Controls (see below), then a `Row` of `Readout`s: "Touching air" (m², 2 dp), "Water left" (%, integer), "Hours" (1 dp).

## Controls, in DOM order (6)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control | "Hang until dry" | sets Hours to the next 0.5 h step at or after this fold's dry time (quarters: 11.5); the exact model time (11.3 h) goes in the results line; disabled when water left = 0 |
| 2 | Slider | "Hours hanging" 0–12, step 0.5, starts at **3** | water left = max(0, 1 − hours × area / (1.96 × 3)) at still air |
| 3–5 | Control chips | "Quarters" · "Half" · "Spread" (group label "Fold") | start: Quarters active (disabled, `className="active"`, `aria-pressed`). Hours are kept when switching |
| 6 | Control toggle | "Breeze: off" / "Breeze: on" (`aria-pressed`) | rate × 2 (illustrative factor; needs a claim, see below) |

QA path (each pressed once): until dry → quarters dry, slider at 11.5 h (milestone 1) · slider → 12 h · Half · Spread (milestone 2) · Breeze on. Stage at the reveal: spread, dry, breeze on, results line showing both dry times. All 6 controls render at first paint, disabled while `locked`.

## States
- **Predict:** quarters stack, 4 arrows, Hours 3, readouts "Touching air 0.52 m²", "Water left ?", results line reads "Spread: dry at 3 h" (the question's given). No arrows animate.
- **Explore, unlock:** quarters at 3 h: water fill still dark, "Water left 73%". The surprise is visible before any press: 3 hours in, three quarters of the water is still there.
- **Hang until dry:** hours run to 11.5, the fill fades (≤ 450 ms, or instant under reduced motion). Results line: "Dry at: quarters 11.3 h".
- **Spread:** 16 arrows; at any hour ≥ 3 it is dry. Results line adds "spread 3 h". Half: ~5.9 h (builder computes with ~0.02 m² of edges and states it).
- **Breeze:** both times halve; the ratio (about 3.8×) does not change, and covered faces stay dashed: the breeze cannot reach them.
- **Reveal:** stage unchanged. Reveal quotes the learner's results line: "You hung it folded: 11.3 hours. Spread: 3."

Milestones (`minInteractions=2`): `quarters-dry` (Quarters at water left 0), `spread-seen` (Spread selected after `quarters-dry`).

## Shown, not told
The learner counts 4 arrows against 16 and watches the folded towel still dark at hour 3. The number 11.3 comes from their own "hang until dry", not a caption. The reveal only names it: "a quarter of the doorway".

## Colour and access
Towel strips `--domain` (apricot) outline with water fill `--accent` at opacity = water left; arrows `--accent`; covered faces `--muted` **dashed** plus the text label; dry = fill gone **and** "Water left 0%". Never red/green for wet/dry. All controls min-height 44 px (the default `.control` is ~34 px: add a module class). Readouts rounded (no 11.3100000004).

## Illustrations (`<Illustration>` from `src/kit/Illustration.tsx`)
- **Hero 1:1** (`01.webp`): predict phase only, inside the stage at the top right, in a 96×96 wrapper beside the model line; removed on unlock so explore has one representation.
- **Before/after pair 4:3**: in the reveal, below the text, two 160 px frames side by side (before = folded, after = spread). Deviates from the request's "beside the stage diagram" (two pictures at once on a phone): design lead to approve.
- Render an `<Illustration>` only once its file is accepted into `public/illustrations/<slug>/`. A 404 is a console error and fails QA.

## Claims this spec adds (for the builder to record as `unverified`)
"Breeze doubles the rate" is an illustrative factor; it must be labelled on the stage ("toy ×2") and recorded. Flag for cm-lifehacks: brief claim (4) gives the direction, not a size.

## 200-lesson review collection

The implementation variant in the founder-requested 200-lesson PR is described in
`company/design/specs/towel-spread-dries-first-collection-200.md`. It remains in review; this addition does not attest that
the original specification or publication gates have been met.
