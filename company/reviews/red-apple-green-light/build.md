# Build note: red-apple-green-light

builder: demo-builder · 2026-10-13 · for evaluators to read after their findings

- Design intent: a dark room (drawn dark in both themes), one lamp, an apple, a banana and a leaf lit together. Toy three-band model: each lamp is some mix of red, green and blue; each object returns a fixed fraction of each band (REFL in Demo.tsx, labelled "Toy values" on stage, claim c4). Each object is painted in the light it returns, and three small bars under it show which colours come back, so "colour is what is sent back" is seen, not told.
- Title "A red apple under a green lamp" asks rather than answers.
- Earned reveal: milestones 'red' and 'green'. QA path: White is the starting lamp (disabled), then Red, Blue, Green in DOM order, so the last screen is the green lamp, the question's state. The reveal quotes the apple's 5% (green) and 80% (red), both visited on the QA path.
- Numbers (node): apple white 30%, red 80%, green 5%, blue 5%; banana green 70%; leaf green 45%.
- Risk for the fact-checker: c3 cites an apple reflectance paper from memory; the verifier must check it against a real curve (the brief asks for this before publication).
- After screenshots: phone reads cleanly; the black apple keeps a dashed outline so its shape stays visible.
