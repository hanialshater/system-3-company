# Build note: flagged-means-what

- Intent: one grid of 1,000 squares (one per scan). After the prediction the 48 flagged are outlined; "Sort the flagged" moves them to the top rows, ill (red) first then healthy (blue): 8 vs 40 side by side. "Show missed ill" outlines the 2 unflagged ill; "Flag all 1,000" toggles a flag-everyone rule. Readouts: flagged, of those ill, flag-means-ill.
- Brief offered tap-to-sort each of 48 dots; replaced by one sort button so the QA path (each control once) reaches the key state.
- Key state: the flagged sorted into ill and healthy (milestone "sorted-flagged"), first control on the QA path. Precision readouts show "?" until sorted and "–" while locked.
- Seed 7 only places dots (counts fixed by construction), disclosed in c3. Node check of tally(): 48 flagged, 8 ill, precision 0.1667, recall 0.8, accuracy 0.958; flag-all precision 0.01. Question options computed from tally().
