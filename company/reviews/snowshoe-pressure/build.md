# Build note: snowshoe-pressure

builder: demo-builder · 2026-10-13 · for evaluators to read after their findings

- Design intent: side view of one leg on toy snow. Shoe length is drawn proportional to contact area (both feet together), so ten times the area is ten times as long. Above the toy snow's 3 kPa limit the foot sinks (illustrative depth 40 cm x (1 - 3/P)); at or below it the foot stays on top. A pressure bar with the limit marked sits at the right edge of the same picture.
- Controls: Boots / Snowshoes presets (the question's two cases) and a contact-area slider (0.04-0.40 m², 0.04 steps). The snow limit, sinking depth and "Toy snow" label are illustrative and say so on stage and in claim c5.
- Earned reveal: milestone 'stays-on-top' (pressure at or below the limit). "Snowshoes" is the first enabled control on QA's path. The reveal quotes the first area at which the learner's foot stayed on top.
- Open question for the fact-checker: claim c4 (snow gives way above some pressure) has no specific citation; I could not find one I could check offline, so the source says so.
- After screenshots: the pressure bar was tiny at low pressures and the snow block left a large empty area; stage shortened and the bar rescaled (3.6 px per kPa).

## Revision v2

Review 2026-10-14: the boot never visibly sank on the path. Slider is first in DOM order; new 'sinks' milestone (any area over the 3 kPa limit) plus 'stays-on-top', minInteractions 2, so boots and snowshoes are both seen. Gauge label shows 3 kPa; weight readout glossed.
