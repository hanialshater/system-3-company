# Build note: brick-on-its-side

builder: demo-builder · 2026-10-13 · for evaluators to read after their findings

- Design intent: side view, brick + spring scale on a dry table (mu = 0.40). Each face button turns the brick onto that face and pulls it (the brick shifts along with a dashed trail); the scale and the 'Pull' readout show mu m g = 7.8 N, the 'Contact area' readout 288 / 96 / 48 cm². A mass slider shows what does change the pull (normal force).
- Brick 24 x 12 x 4 cm is illustrative, chosen so the long side is exactly one third of the wide face (c3).
- Earned reveal: milestones 'first-pull' and 'second-face'. A face already pulled is shown active and disabled (pressing it again would change nothing).
- Pull is instant rather than animated, so every press changes the stage within QA's 450 ms wait.
- After screenshots: brick looked small at 3 px/cm; raised to 4 px/cm and moved the model chip under the table so the 24 cm end-up brick clears it.
