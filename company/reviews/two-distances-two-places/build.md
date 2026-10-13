# Build notes: two-distances-two-places

v1 (2026-10-13), Sonnet build (EXP-003). Wave 6 geography.

- Equal Earth map zoomed on Europe (fitExtent on a lon/lat box), rings via geoCircle, crossings computed by vector algebra from the drawn radii. The start state is 600/400 km (no crossing), so the question's state is reached by the "Set the signal" button, first in DOM order, then the Madrid toggle. The "Places that fit" readout shows "?" while locked.
- Brief error: with these coordinates Madrid is 602 km from the sea crossing and 1,804 km from the Austrian one (the brief says 810 and 2,280). The Madrid ring radius is derived in code from the crossings.
- Country names appear only in the reveal (claim c2: Austria from the 1:110m data, the sea point read from its coordinates).
