# Build note: iss-gravity-still-there

builder: demo-builder · 2026-10-13 · for evaluators to read after their findings

- Design intent: Earth and orbits on one true scale out to geostationary height (Earth is 17 px in radius), so the ISS orbit visibly hugs the planet. A gravity bar (100% = ground) and a readout show (R / (R + h))^2.
- Height buttons instead of the brief's log slider: 0, 400, 6,371, 20,200, 35,786 km. Buttons put both key states on the QA path (QA moves a slider only two steps). The current height's button is disabled.
- Earned reveal: milestones 'iss' (400 km) and 'far' (20,200 km or more). Bar and readout hidden until the prediction.
- After screenshots: a gravity arrow at the satellite was either longer than Earth's radius (ground) or only an arrowhead (geostationary). Replaced with the bar under the picture.
- Geostationary altitude 35,786 km is measured from the equatorial radius (6,378 km); the stage uses R = 6371 km throughout, a 0.02% difference in r (noted in c3).

## Revision 2026-10-14 (wave D r5, demo-builder)

v2. Review + decision 2026-10-14-told-vs-shown: free fall told only. Changes: at 0 and 400 km the same picture zooms in (still to scale); new throw controls (3, 7, 7.67 km/s sideways from 400 km) draw the integrated path (inverse square, no air), and a "+3 min" step moves station and ball; slow throws land (961 km, 5,176 km), 7.67 km/s rides the station's orbit; gate needs a landed throw and the orbit throw; reveal points at both and at the 25% stop (twice as far, a quarter); gravity bar larger and labelled. Reopened c4, c6; new c7, c8. Risk: stage got a second control row; phone fit and the cropped-Earth minor not verified in a browser.
