# Build note: who-pays-same-filter

builder: demo-builder (ncm-coase) · 2026-10-14 · brief: Course NCM #5 · spec: company/design/specs/who-pays-same-filter.md

- Built to the spec: two stacked panels ("Right to pollute", "Right to clean air"), same scene, one $-a-year ruler (0.8 px per $) and Total bars (0.4 px per $) on a shared x-origin. Five controls in DOM order: Offer $50, Offer $200, Offer $350, Pay $300 damages, Fit $100 filter; each pressable once.
- Numbers computed from D = 300, F = 100 (not hard-coded). Deal test strict: offer − F > 0 and −offer > −D. Node re-run: $50 refused (factory −$50), $200 deal (+$100 / −$200, total −$100), $350 refused (laundry −$350); strict range $101–$299. Liable: damages −$300 total, filter −$100 total.
- Fix 1 (spec flag): stem reads "a filter, $100 a year" (25 words), matching "$300 a year".
- Fix 2 (spec leak flag): while locked the three offer chips render in the DOM, disabled, labelled "?" (aria-label "Locked until you predict"); prices appear only after commit. Panel 2 buttons keep their labels.
- Milestones (minInteractions 2): deal-struck (only $200), liable-fits. A side keeps the best outcome seen, so no press order removes a fitted filter.
- Fade labels ("−$50 for me", "−$350: worse than smoke") are decoration (≤ 400 ms); every press also leaves a mark or changes the ledger or arrow.
- Not built: the optional reveal clause "your $50 / $350 fell outside it" (the reveal is the spec's fixed text).
- Claims c1–c5 all unverified; c5 labels the model as a simplification, and the stage line shows it through the reveal.
- Not run here (per dispatch): build, tsc, QA, walkthrough.

## Pre-flight v2 (demo-builder, 2026-10-14, fact-check pass 24 fixes)

c3 was held: the naming "This is the Coase theorem, which holds when bargaining is costless" rests on Coase 1960, which nobody here can open.
- The reveal now says "Economists call this idea the Coase theorem." and "Here bargaining is free; with costly bargaining or many people, it can fail." It no longer states as a general law that the theorem "holds when bargaining is free".
- c3 is reworded and set to unverified. c4 and c5 are unchanged.
- No mechanics changed. Not run: build, QA, walkthrough.
