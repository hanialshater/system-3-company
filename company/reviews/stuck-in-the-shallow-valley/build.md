# Build note: stuck-in-the-shallow-valley

- Brief 47 (local-minima). Retitled "Downhill all the way: which valley?" (the slug names the answer; the title does not).
- Stage: one curve f(x) = x⁴ − 3x² + x on [−2, 2], both valleys labelled with their heights (given in the question). Pressing a start shows the start ring, the path along the curve and the ball where it stopped; earlier starts stay as small rings. After unlock the hump (x ≈ 0.17) is marked.
- Interaction changed from the brief's "drag the start and press roll": QA presses each control once, so a drag plus one Roll button would reach only one valley. Four start buttons (1.5, 0.5, −0.5, −1.5) each release and roll at once (no animation to wait for).
- Key states (milestones): "shallow-valley" (a start that ends at 1.13) and "deep-valley" (ends at −1.30). QA path visits all four starts.
- Node check (step 0.01, 2000 steps): 1.5 → 1.131, 0.5 → 1.131, −0.5 → −1.301, −1.5 → −1.301; f = −1.070, −3.514; hump 0.1699.
- Real-systems sentence kept weak on purpose (claim c4 notes Choromanska / Dauphin: many minima found in big networks are similar).
