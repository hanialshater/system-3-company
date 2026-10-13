# Build note: toaster-trips-breaker

builder: demo-builder · 2026-10-13 · for evaluators to read after their findings

- Design intent: one ammeter gauge (0-25 A, red arc above 15 A) above a strip of four sockets (TV 200 W, blender 600 W, toaster 1200 W, heater 1500 W, heater on at the start). Each Plug/Unplug button toggles a device; the gauge shows the circuit's current, and the moment demand passes 15 A the ideal breaker opens ("TRIPPED: 0 A"). "Reset breaker" is enabled only once the demand is back under 15 A, so it never resets into an instant re-trip that would change nothing on screen.
- Departure from the brief (numbers): the brief's extra devices were 200 / 400 / 600 W. With a 1500 W heater those give 14.2 / 15.8 / 17.5 A; a real 15 A breaker can carry 105% for a long time and 117% for many minutes (UL 489 only requires a trip at 135% within an hour), so "400 W trips it" would teach a false real-world fact even with an "ideal" label. I used 200 / 600 / 1200 W (14.2 / 17.5 / 22.5 A); the 600 W case is still a modest overload, which is why the question, the stage and the reveal all say "ideal breaker" and claim c4 gives the time-curve caveat. The answer (200 W) is unchanged.
- Earned reveal: milestones 'holds' (heater plus one more device, breaker holding) and 'trips'. QA's path presses TV (14.2 A, holds) then blender (19.2 A, trips). The reveal quotes the exact combinations and currents the learner produced.
- The "number of plugs" misconception is answered by the heater toggle: TV + blender + toaster without the heater still trips (16.7 A).
- After screenshots: "TRIPPED: 0 A" sat on the gauge's 0 label; moved down with the socket strip.
