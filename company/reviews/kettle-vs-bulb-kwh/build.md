# Build note: kettle-vs-bulb-kwh

builder: demo-builder · 2026-10-13 · for evaluators to read after their findings

- Departure from the brief: the brief asked for power-vs-time rectangles. With 2000 W against 60 W and 3 min against 2 h, on one phone-width axis the kettle is a 6 px sliver and the bulb a 5 px strip, so area could not be judged by eye. Instead each appliance gets an energy bar on one kWh axis, built from one slice per minute: slice thickness is power (energy per minute), slice count is time. Power x time is still what is drawn, as thick-few against thin-many.
- Bulb lines are drawn every 10 minutes (1-minute slices would be 0.9 px); labelled on stage.
- Earned reveal: milestone 'bulb-overtakes'. Bulb slider is first and starts at 1 h, so two arrow presses reach 2 h (0.12 > 0.10 kWh). The reveal quotes the times at which the learner's bulb bar first passed, then the question's case.
- Readouts removed to keep stage text under 25 words; the kWh values sit on top of the bars and are hidden until the prediction.
