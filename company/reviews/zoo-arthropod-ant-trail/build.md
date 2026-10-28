# zoo-arthropod-ant-trail: build note, 2026-10-28

Draft v1 from proposed curriculum item 324. Claims are unverified; the cited institutions are source leads, and exact supporting passages have not been checked. No independent domain, accessibility, learner, visual or browser review has occurred.

## Pre-flight v1

1. Title and hook: “A path with a message” / “Some animal signals can persist on a surface.”. Review independently for answer cues.
2. Options: A route taken on the surface, A spoken sentence, The exact population of every colony. Review precision and parallel wording.
3. The locked stage hides the figure; both stage buttons are disabled before prediction.
4. The first action shows a partial state; the second displays the evidence and calls interact(). The final drawing remains visible with the reveal. Review whether it demonstrates the promised mechanism.
5. Intended QA path: Lay a trail, then Follow the trail. This is source inspection only, not a browser pass.
6. There is no stage reset button; reload behavior is untested.
7. Strict 390 × 844 fit, crop, readable labels, accessibility and full browser contract remain untested. No screenshot or independent visual approval exists.

The figure is a simplified schematic, not a photographic record. Independent fact-checking must verify the animal identity, specific anatomy or behavior, scope of generalization, and exact citations before publication.

## Pre-flight v2 — contrast correction

The ant, chemical trail and food marker now use the theme foreground, warning and good colors rather than fixed colors; the lesson version is 2 because the learner-visible drawing changed. The question, two interaction steps, visible final state and recall are otherwise unchanged. The diagram uses labels and shape as well as color. The two controls declare 44 px minimum width and height.

Code-level contrast calculations against the repository's `--bg` and `--bg-3` tokens give minimum dark/light ratios respectively: ant 13.72 / 15.38; trail 9.56 / 5.93; food 8.13 / 5.31. These ratios are calculated from declared hex colors, not measured browser pixels. The builder inspected both final SVG states as rendered on those theme colors: `2026-10-28-v2-theme-stage.png`. The figure was rendered from the component with state and lesson kit stubbed. This is not a browser, phone-fit, accessibility or independent design review; the rest of the v1 limitations still apply to v2.
