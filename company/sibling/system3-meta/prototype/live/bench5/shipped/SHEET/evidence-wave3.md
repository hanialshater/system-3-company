# O-6 SHEET, wave 3 revise (uat findings: wave3/cycles, wave3/propagate, wave3/edges)
SHEET wiring unchanged; it matches ARCH. Own tests pass (meta check O-6: 9/9).
Root cause is in slot B (work/MOD-B/values.mjs, owner dev-2): ERR has no CIRC singleton, so
errorFromCode("#CIRC!") falls back to ERR.VALUE and every cycle cell (and its readers, incl.
=A1:A2 in A1 and =SUM(A1:Z10) inside its own range) shows #VALUE! instead of #CIRC!.
Verified on a scratch copy: adding `CIRC: mk("#CIRC!")` to B's ERR makes cycles, readers,
whole-sheet SUM cycle and =A1:A2-in-A1 give #CIRC!, and breaking the cycle restores values.
Already raised as ISS-14 (B needs ERR.CIRC) for dev-2. No SHEET change required.
