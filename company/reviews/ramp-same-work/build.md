# Build note: ramp-same-work

builder: demo-builder · 2026-10-13 · for evaluators to read after their findings

- Design intent: side view, height fixed at 1.0 m, ramp length slider 1-8 m (1 m = a straight lift), one scale for both axes. Push arrow length is proportional to the force. "Push it up" animates the crate to the top in 1.4 s while the work counter (F x distance so far) climbs to 490.5 J.
- Earned reveal: milestones 'long-ramp' (L >= 4 m) and 'pushed-up' (a full push on such a ramp). Slider starts at 2 m so two arrow presses reach 4 m; the push finishes inside the reveal button's wait.
- Numbers shown to one decimal (122.6 N, 490.5 J) because 490.5 rounds to 491 at zero decimals, which would contradict the question's "490 N" option. Options remain "about" values.
- After screenshots: reveal repeated the 4 m case twice when the learner was at 4 m; now quotes the learner's last full push and the straight lift.


## Revision v2

Review: weight of 50 kg not given; same work across lengths told. Changes: question states 490 N; button Lift straight up; stage lists finished pushes (N x m = J); reveal needs both a 4 m push and the straight lift; push animation shortened to 350 ms so it ends inside the QA wait. New claim c5 (490 N). Version 2.
