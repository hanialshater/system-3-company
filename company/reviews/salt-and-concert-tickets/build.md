# Build note: salt-and-concert-tickets

builder: demo-builder · 2026-10-13

- Intent: revenue as a box (price up, sales across) with the before-box dashed. Green if revenue rose, red if it fell; "revenue = price × sales" is printed in the box while locked, so the term is defined before the reveal uses it.
- Milestones: salt at +10% and tickets at +10%. DOM order: slider first (from 0 in 5% steps, so QA's two presses land on +10% for salt), then the two good tiles (salt is active and disabled, so QA presses tickets, which keeps +10%).
- The reactions are invented straight lines (0.1% and 2% sales cut per 1% price rise) so the slider has a value at every setting; this goes beyond the brief's single 10% step and is disclosed in c3.
- "Price elasticity of demand" is named only in the reveal, defined in the same sentence.
- After screenshots: the dashed box was unlabelled; it now says "dashed = before".
