# fact-checker 2026-10-25 pass 2 (W-2055, at fb76d7c13): c8 unverified -> verified (checkedBy, checkedOn, note);
# c6 stays verified, note gains one sentence confirming the amended source. Asserts nothing else in meta.json moves
# and no claim's id/text/support/source changes.
import json
P = "src/demos/math/flatten-the-cube-to-a-dot/meta.json"
S = "math.flatten-the-cube-to-a-dot."
REC = " Record: company/reviews/flatten-the-cube-to-a-dot/2026-10-25-fact-check.md (pass 2)."
C8_NOTE = ("Re-checked at fb76d7c13 on a fresh build (walkthrough on .next-fc2055; the shared .next was older than the commit). "
           "Previously DISPUTED as 'Three moves show why it is always 2.' (a holed solid gives 0). New text asks instead of "
           "asserting and scopes to convex solids; the holed counterexample is not convex. What it implies, that the lesson's "
           "three moves settle it for convex solids, holds: there are exactly three cards (Slice, Flatten, Shrink), the reveal "
           "answers yes, and flatten-then-shrink is the argument verified as c6 (own2.py; PMC10239678, PMC9640434). Slice "
           "illustrates one change on an example rather than proving the general case; acceptable in a hook, nothing a learner "
           "takes from it is false. Hook sentence 1 (8-12+6=2) is c1, verified." + REC)
C6_ADD = (" Pass 2 (W-2055, fb76d7c13): amended source confirmed. 'a variant of Cauchy's (Cauchy removed triangles, the lesson "
          "removes edges)' matches PMC10239678's account (triangulate, remove triangles); doi 10.1098/rsta.2022.0052 re-confirmed "
          "via Crossref; PMC9640434 as opened in pass 1 (ncbi blocked this session). The year 1813 is still not confirmed by an "
          "opened source (not learner text, non-blocking).")

before = open(P, encoding="utf-8").read(); old = json.loads(before)
new = json.loads(before)
for c in new["claims"]:
    if c["id"] == S + "c8":
        assert c["status"] == "unverified" and c["text"] == "Every convex solid too? Three moves tell."
        c["status"] = "verified"; c["checkedBy"] = "fact-checker"; c["checkedOn"] = "2026-10-25"; c["note"] = C8_NOTE
    if c["id"] == S + "c6":
        assert c["status"] == "verified"
        c["note"] = c["note"] + C6_ADD
# rebuild c8 in key order id,text,support,source,status,checkedBy,checkedOn,note
for i, c in enumerate(new["claims"]):
    if c["id"] == S + "c8":
        new["claims"][i] = {k: c[k] for k in ("id", "text", "support", "source", "status", "checkedBy", "checkedOn", "note")}
assert {k: v for k, v in old.items() if k != "claims"} == {k: v for k, v in new.items() if k != "claims"}
for a, b in zip(old["claims"], new["claims"]):
    assert {x: a[x] for x in ("id", "text", "support", "source")} == {x: b[x] for x in ("id", "text", "support", "source")}
after = json.dumps(new, ensure_ascii=False, indent=2) + ("\n" if before.endswith("\n") else "")
open(P, "w", encoding="utf-8").write(after); print("ok")
