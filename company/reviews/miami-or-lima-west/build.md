# Build notes: miami-or-lima-west

v1 (2026-10-13, Wave 5 geography, sonnet build, EXP-003). Brief 49 (`miami-west-of-lima`), renamed because the slug gave the answer.

- Equirectangular map of the Americas, 5.8 px per degree; a red meridian is set by two buttons (Miami, Lima) or a slider. No line is drawn until the learner acts (it would show the answer). The list of countries crossed is computed from the 1:110m polygons by the same code that the reveal calls; node re-run: Miami: US, Cuba, Panama, Ecuador, Peru; Lima: Bahamas, Cuba, Jamaica, Colombia, Ecuador, Peru.
- Brief's "Lima sits to its right" kept as the visual. The brief's payoff "South America lies largely east of North America" was tightened: node bounds show the coastal tips of Peru (81.4 W) and Ecuador (81.0 W) lie west of Miami's meridian, so the reveal says "apart from the coastal tips" (claim c3).
- Gate: line through Miami and through Lima (exact longitudes within 0.06 deg, reachable by slider too). Readout "?" while locked. All claims unverified; city longitudes from memory.
