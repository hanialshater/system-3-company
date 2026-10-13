# Build note: sticky-cart-merge

builder: demo-builder · 2026-10-13 · for evaluators to read after their findings

- Design intent: one track with a single "total momentum" bar above it, split into each cart's share (A orange, B grey). The bar's length never changes; the split moves from all-A to shared at the crash.
- Time is explicit: Step adds 0.5 s (one step lands exactly at contact, t = 0.5 s); Play runs to 1.5 s in real time; Reset. Positions are analytic, so moving B's mass after the crash redraws the after-state at once.
- Earned reveal: milestones 'crashed' (t reaches contact) and 'other-mass' (a second B mass seen after contact). Control order Step, mass slider, Play, Reset puts both on the QA path.
- First QA run failed: QA waits 450 ms per control, Play's 1.5 s animation had not reached the crash and disabled the slider. Fixed by moving Step first and making its step land on contact.
- Speed readout is '?' until the carts touch. Reveal quotes the 1 kg case and the learner's last mass; KE 9 J -> 6 J in the muted line.
