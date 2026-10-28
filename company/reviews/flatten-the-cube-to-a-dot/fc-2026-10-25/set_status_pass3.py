# fact-checker 2026-10-25 pass 3 (W-2064, v2 at 3e365688e): c9 unverified -> verified (checkedBy, checkedOn, note);
# c2 stays verified, its note gains one sentence: card 1's v2 line "1 corner gone, 3 new: +2 corners" is checked against it.
# Asserts nothing else in meta.json moves and no claim's id/text/support/source changes.
import json
P = "src/demos/math/flatten-the-cube-to-a-dot/meta.json"
S = "math.flatten-the-cube-to-a-dot."
REC = " Record: company/reviews/flatten-the-cube-to-a-dot/2026-10-25-fact-check.md (pass 3)."
C9_NOTE = ("Added by demo-builder 2026-10-25 for W-2063. Verified at 3e365688e on a fresh build (walkthrough on .next-fc2064). "
           "Own derivation (fc-2026-10-25/own3.py): faces derived from the 3D corner coordinates, not from REGIONS; with the "
           "top face (y=1, corners 0-3) off, 5 faces remain; the flat drawing has exactly 5 bounded regions (4-cycles holding no "
           "other dot), their areas tile the outer square, and each is one remaining face, one to one (inner square = bottom "
           "y=0, the 4 trapezoids = the 4 sides). The outer square is the removed top face's rim, so the outside is not one of "
           "the 5. On the stage the line shows only after the flatten, under 'top face off: 1 short', so 'other' has its referent." + REC)
C2_ADD = (" Pass 3 (W-2064, 3e365688e): card 1's v2 line '1 corner gone, 3 new: +2 corners' restates this claim's corner count "
          "(-1 old, +3 new); matches the stage (3 new dots on the 3 edges at the cut corner, counter 8->10) and own3.py.")
before = open(P, encoding="utf-8").read(); old = json.loads(before); new = json.loads(before)
for i, c in enumerate(new["claims"]):
    if c["id"] == S + "c9":
        assert c["status"] == "unverified" and c["text"] == "The 5 regions are the cube's other 5 faces."
        new["claims"][i] = {"id": c["id"], "text": c["text"], "support": c["support"], "source": c["source"],
                            "status": "verified", "checkedBy": "fact-checker", "checkedOn": "2026-10-25", "note": C9_NOTE}
    if c["id"] == S + "c2":
        assert c["status"] == "verified"; c["note"] = c["note"] + C2_ADD
assert {k: v for k, v in old.items() if k != "claims"} == {k: v for k, v in new.items() if k != "claims"}
for a, b in zip(old["claims"], new["claims"]):
    assert {x: a[x] for x in ("id", "text", "support", "source")} == {x: b[x] for x in ("id", "text", "support", "source")}
open(P, "w", encoding="utf-8").write(json.dumps(new, ensure_ascii=False, indent=2) + ("\n" if before.endswith("\n") else "")); print("ok")
