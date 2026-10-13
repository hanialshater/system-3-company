# Build notes: iss-never-over-moscow

v1 (2026-10-13), Sonnet build (EXP-003). Wave 6 geography.

- Equirectangular map, idealised circular orbit, three laps with 23 degrees of Earth turn per lap. Track from sin(lat) = sin(i) sin(u). A tilt slider (step 0.1) plus two presets (ISS 51.6, polar 90) first in DOM order, so QA reaches both milestones: iss, and past (tilt at least Moscow's latitude). Dashed limit lines and in/out-of-reach readouts are hidden while locked.
- Retitled: "Where can the ISS fly over?" (the slug gives the answer away; the slug is kept).
- Initial tilt is 30 so each preset changes the picture.
- ISS inclination 51.6 (51.64 rounded); London is 10 km inside that limit, Moscow about 460 km outside.
