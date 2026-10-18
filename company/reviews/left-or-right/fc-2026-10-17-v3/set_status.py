# fact-checker v3: textual edit of c3 and c6 status/note in meta.json (no json.dumps reflow); asserts nothing else moves.
import json, sys
P = "src/demos/math/left-or-right/meta.json"
before = open(P, encoding="utf-8").read()
old = json.loads(before)
REC = "Record: company/reviews/left-or-right/2026-10-17-fact-check-v3.md; own scripts company/reviews/left-or-right/fc-2026-10-17-v3/ (own.py, render.cjs)."
NOTES = {
    "math.left-or-right.c3": (
        "Lane left-or-right v3 (fact-checker, 2026-10-17, base 8a67fe3e; a fresh instance that did not write this claim or draft the branch wording): VERIFIED. "
        "Own signs, two independent ways: (A) own sign rule (PMC2853108 Fig. 2E: over-arrow o onto under-arrow u, positive iff o_x u_y - o_y u_x > 0) with own mirror (every crossing switched) and own turn-over (planar reflection, then every crossing switched) on the kit 3_1 PD [[1,4,2,5],[3,6,4,1],[5,2,6,3]]: front -,-,- (Sum -3), turned -,-,- (-3), mirror +,+,+ (+3), mirrored then turned +,+,+ (+3); "
        "(B) kit-free 3D torus trefoil, rotated 180 degrees about an in-page axis or reflected in the page, projected and read numerically: the same four sign lists. The kit's signs() agrees (comparison only), and the stage readout is signs(turnOver(mirror(pd))) on the mirrored-turned rest state (card.ts logicalPd). "
        "So the branch 'Turning the mirrored trefoil over left every mark plus' is true, and true of what that learner saw (Mirror, then Turn over: readout Sum +3 Right-handed before and after the turn). "
        "Rendered text: Reveal and seenText sliced unchanged from Demo.tsx and rendered with react-dom/server for the seen state of every Turn over / Mirror press sequence up to 6 presses that unlocks the reveal (114; own model of settle/record): the branch opener appears exactly when the plain turned state was never reached (15 sequences, seen line 'Trefoil: mirror +3'), the standard opener otherwise (seen turned -3), 0 mismatches; Mirror-Turn gives the branch, Turn-Mirror and Mirror-Turn-Mirror-Turn the standard. "
        "Not run in a browser by me: both running servers (3818, 34418) serve older builds without the branch and the two-server cap barred a third; the builder's Chromium probe v3-opener-probe.mjs (build.md v3 round) reports the same three openers. "
        "Non-blocking: on the branch path the seen line reads 'Trefoil: mirror +3', a sub-string of the quoted seen line. " + REC +
        " History: reset to unverified by demo-builder 2026-10-17 (W-1619, v3, ruling company/domains/briefs/rulings/2026-10-17-left-or-right-opener.md); before that verified by fact-checker 2026-10-17 (company/reviews/left-or-right/2026-10-17-fact-check.md)."
    ),
    "math.left-or-right.c6": (
        "Lane left-or-right v3 (fact-checker, 2026-10-17, base 8a67fe3e; a fresh instance that did not write this claim or draft the branch wording): VERIFIED. "
        "Own argument: turning over is the rotation by 180 degrees about an axis in the page; rotations by angle s in [0, 180] are a continuous family of rigid motions, so the knot is carried along without the strand passing through itself, while a reflection reverses the orientation of space and lies in no such family. "
        "Own computation: a kit-free 3D torus trefoil keeps its crossing signs -,-,- when rotated 180 degrees about an in-page axis and reads +,+,+ when reflected; reflected then rotated stays +,+,+; on the kit 3_1 PD own turn-over and mirror give the same (own.py). So the branch 'Turning the mirrored trefoil over left every mark plus: turning over is a way of moving it, so its hand stayed right.' holds: the mirrored trefoil (+3) turned over is still +3, and hand(+3) is 'Right-handed' (Demo.tsx hand()). "
        "Opened PMC5582600 (OAI full text): sec. 2.4 'knot projections can be deformed as much as desired (without the strand passing through itself) and knots are only topologically chiral if they cannot be deformed continuously to superimpose with their mirror image'; glossary 'Chiral knot A knot that cannot be continuously deformed into its mirror image'; sec. 2.1 'Positive crossings describe a right-handed helix, negative crossings a left-handed helix'. PMC8199745 amphichiral definition as quoted in the v2 note (not re-opened). "
        "Rendered text: branch sentence present only when seen.turned is undefined, standard otherwise, on all 114 unlocking press sequences up to 6 presses (render.cjs, Reveal rendered unchanged from Demo.tsx); 'turning one over never swaps them' on both paths; recall answer index 0 'A right-handed trefoil' in meta.json. Not run in a browser by me (two-server cap; running servers hold older builds); the builder's Chromium probe reports the same openers. "
        "The hand word 'right' in the branch rests on c5's convention; c5 must add 'its hand stayed right' to its quotes (see record). " + REC +
        " History: reset to unverified by demo-builder 2026-10-17 (W-1619, v3, ruling company/domains/briefs/rulings/2026-10-17-left-or-right-opener.md); before that verified by fact-checker 2026-10-17 (company/reviews/left-or-right/2026-10-17-fact-check-v2.md)."
    ),
}
lines = before.split("\n")
cur = None
for i, l in enumerate(lines):
    s = l.strip()
    if s.startswith('"id": '):
        cur = json.loads("{" + s.rstrip(",") + "}")["id"]
    if cur in NOTES and s == '"status": "unverified",':
        ind = l[: len(l) - len(l.lstrip())]
        assert lines[i + 1].strip().startswith('"note": "Reset to unverified by demo-builder 2026-10-17 (W-1619'), cur
        lines[i] = ind + '"status": "verified",\n' + ind + '"checkedBy": "fact-checker",\n' + ind + '"checkedOn": "2026-10-17",'
        end = "," if lines[i + 1].rstrip().endswith(",") else ""
        lines[i + 1] = ind + '"note": ' + json.dumps(NOTES[cur], ensure_ascii=False) + end
after = "\n".join(lines)
new = json.loads(after)
assert {k: v for k, v in old.items() if k != "claims"} == {k: v for k, v in new.items() if k != "claims"}
for a, b in zip(old["claims"], new["claims"]):
    if a["id"] in NOTES:
        assert b["status"] == "verified" and b["note"] == NOTES[a["id"]] and b["checkedBy"] == "fact-checker"
        assert {k: v for k, v in a.items() if k not in ("status", "note")} == {k: v for k, v in b.items() if k not in ("status", "note", "checkedBy", "checkedOn")}
    else:
        assert a == b
open(P, "w", encoding="utf-8").write(after)
print("ok")
