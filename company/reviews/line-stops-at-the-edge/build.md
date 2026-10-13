# Build note: line-stops-at-the-edge

- Intent: one plot: five training dots on y = x² in a shaded 0-1 band, the fitted line drawn across to 3.1, a question point with the line's prediction (purple) and the truth (green) joined by a red gap. The true curve is dashed inside the data and drawn on to the query once the query leaves the band. Query buttons x = 0.5, 1, 1.5, 2, 3. Readouts: line says, truth, off by.
- Brief asked to drag the query point; buttons used so the QA path (one press each) reaches x = 3.
- Key state: query at x = 3 (milestone "far-outside"), last query button on the QA path. Readouts and query point hidden while locked.
- Node check of fit(): slope 1, intercept −0.125, max inside error 0.125, line(3) = 2.875 vs 9. Question numbers and options computed from fit()/maxInsideError().
