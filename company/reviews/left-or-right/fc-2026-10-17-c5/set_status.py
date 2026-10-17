# Sets c5 status/checkedBy/checkedOn/note textually (no json reflow). Run from the repo root with python3 -I.
import json
P = "src/demos/math/left-or-right/meta.json"
src = open(P, encoding="utf-8").read()
before = json.loads(src)
c5 = [c for c in before["claims"] if c["id"] == "math.left-or-right.c5"][0]
assert c5["status"] == "unverified"
NEW = (
    "Lane left-or-right c5 v3 (fact-checker, 2026-10-17, base da5fb903; a fresh instance that did not write the claim, "
    "did not draft the W-1651 quote and did not run 2026-10-17-fact-check-v3.md): VERIFIED, the claim as a whole. "
    "Own derivation, kit-free (company/reviews/left-or-right/fc-2026-10-17-c5/own.py): the rule as worded (o . (u_y, -u_x) > 0) "
    "gives +1 at every crossing of a right-handed double helix (cos t, sin t, ct), c > 0, seen side-on and -1 for c < 0, "
    "so plus = right-handed by the helix's own geometry; own PD rule on the kit 3_1 code 142536415263 gives -,-,- (sum -3, "
    "the table trefoil is left-handed), turned over -,-,-, mirrored +,+,+, mirrored and turned over +,+,+ (sum +3, right-handed); "
    "the kit's signs() through card.ts logicalPd gives the same four rows. Opened: PMC2853108 (Witz and Stasiak, NAR 2010) "
    "Fig. 2E 'If that rotation is clockwise, the crossing is negative and it is positive otherwise' (turning over onto under: "
    "under north, over west is clockwise, minus, as the rule says), Fig. 3B 'If that rotation is clockwise the crossing is "
    "left-handed and it is right-handed otherwise', and 'the Wr of a torsionally relaxed left-handed trefoil knot is of ~-3.41'; "
    "PMC5582600 (Fielden, Leigh and Woltering, Angew 2017) sec. 2.1 'Positive crossings describe a right-handed helix, negative "
    "crossings a left-handed helix'. Rendered: Demo.tsx hand() 'Left-handed' below 0, 'Right-handed' above 0; badges '+' / '−'; "
    "'Sum'; predict question as quoted; Reveal line 367-369: 'its hand stayed right' only when seen.turned is undefined, which "
    "(milestones are the only interact calls, minInteractions 2, 'turned' fires on any trefoil turn-over but records only the "
    "plain turned state) means every trefoil turn-over the learner made was of the mirrored trefoil, whose marks are +,+,+ "
    "(sum +3, right); otherwise 'its hand stayed left' after the plain turned -,-,-. v3-opener-probe.mjs run on a served build of "
    "an identical Demo.tsx/card.ts (port 38422): mirror-then-turn branch, turn-then-mirror and mirror-turn-x2 standard, ok at "
    "390x844 and 360x740 (fc-2026-10-17-c5/opener-probe-360x740.log). Record: company/reviews/left-or-right/2026-10-17-fact-check-c5-v3.md. "
    "History: "
)
old_note = c5["note"]
old_line = '      "status": "unverified",\n      "note": ' + json.dumps(old_note, ensure_ascii=False) + "\n"
assert src.count(old_line) == 1, "note line not found verbatim"
new_line = ('      "status": "verified",\n      "checkedBy": "fact-checker",\n      "checkedOn": "2026-10-17",\n'
            '      "note": ' + json.dumps(NEW + old_note, ensure_ascii=False) + "\n")
out = src.replace(old_line, new_line)
after = json.loads(out)
for k in before:
    if k != "claims":
        assert before[k] == after[k], k
for a, b in zip(before["claims"], after["claims"]):
    if a["id"] != "math.left-or-right.c5":
        assert a == b, a["id"]
    else:
        for k in ("id", "text", "support", "source"):
            assert a[k] == b[k], k
open(P, "w", encoding="utf-8").write(out)
print("ok")
