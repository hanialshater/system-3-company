# Build note: net-hourly-after-costs

builder: demo-builder · 2026-10-13

- Intent: one $22 bar for the hour; the driving cost (miles × cost per mile) is cut off its end in red, and the green rest is what you keep.
- Milestone: 15 miles at $0.50 a mile. The miles slider starts at 13, so QA's two presses reach 15; the cost-per-mile tiles follow (the active one is disabled).
- Money is in cents. The reveal quotes what other per-mile costs would leave at 15 miles, if the learner tried them.
- c3 cites AAA's 'Your Driving Costs' only for the claim that per-mile costs exist and grow with miles. The $0.25/$0.50/$0.70 are illustrative and are labelled so.

## 2026-10-14 colour-only contrast fix (W-155, demo-builder)

- same fill change as monopolist-holds-back (the "$15.50" and the minus sign now clear AA).
- Colour-only change: no pedagogy, wording or claims touched, so no version bump. Meaning is unchanged and never colour alone (letters, labels and borders still carry it).
- Re-scanned with the a11y scan on a build of this branch: no lesson-origin contrast failure remains.

