# fact-checker 2026-10-25 (W-2037 lane M): set status/checkedBy/checkedOn/note on c1-c7, record the hook's
# unrecorded claim as c8 (disputed). Textual edit; asserts nothing outside the claims array moves and no claim text changes.
import json
P = "src/demos/math/flatten-the-cube-to-a-dot/meta.json"
REC = " Record: company/reviews/flatten-the-cube-to-a-dot/2026-10-25-fact-check.md; own scripts company/reviews/flatten-the-cube-to-a-dot/fc-2026-10-25/."
S = "math.flatten-the-cube-to-a-dot."
V = {
 "c1": ("verified", "Own recount (own.py, own coordinates, not the curator's script): cube 8-12+6=2; corner (1,1,1) cut on its 3 edges gives 10-15+7=2. Matches the drawn wireframe (8 dots, 12 lines, hidden ones dashed) and the sliced drawing (3 new dots on a shaded triangle) in the walkthrough at 283a3ed50."),
 "c2": ("verified", "Own recount: deltas +2 corners (-1 old, +3 new), +3 edges (the 3 old edges are shortened, 3 new edges bound the triangle), +1 face; +2-3+1=0. Holds for any cut that crosses only the 3 edges at a corner where 3 edges meet."),
 "c3": ("verified", "Own count of the flat drawing on the stage (square inside a square, 4 spokes): 8 dots, 12 lines, 5 bounded regions (inner square and 4 trapezoids); the outside is not counted, it stands for the removed top face: 8-12+5=1."),
 "c4": ("verified", "Own derivation: an edge between the outside and one region: corners 0, edges -1, regions -1, change 0-(-1)+(-1)=0; an edge with a loose end: corners -1, edges -1, change -1-(-1)+0=0. own2.py asserts the total after every such move on 5 solids x every removed face x 300 random orders."),
 "c5": ("verified", "Own replay of Demo.tsx ORDER (line 58) on my own face model (own2.py): kinds R R C R C R C C R C C C, 12 removals, 5 regions and 7 corners, total 1 after each, ends 1-0+0. Matches the stage strip at the reveal (5 squares, 7 circles in that order) and readout 1-0+0=1 with '+ the top face = 2'. Also matches both curator/designer scripts (run as a cross-check after my own count)."),
 "c6": ("verified", "Opened PMC10239678 (Phil. Trans. R. Soc. A, doi 10.1098/rsta.2022.0052; OAI full text): Lakatos's book [Proofs and refutations, CUP 1976] 'starts with a proof, due to Cauchy': 'a face is removed from the polyhedron and it is stretched onto the plane', the pieces are removed one at a time, 'V - E + F = 1' at the end, 'this invariant is preserved by each step, except the first', so V - E + F = 2; its counterexamples (hollow cube, star polyhedron) are ones where flattening is impossible. Opened PMC9640434: Euler's conjecture 'applies to all polyhedra except for those with holes running through them'. Convex solids have no holes and flatten (central projection from a point just outside one face); own derivation that the shrink works for any connected flat drawing, checked on 5 convex solids x every face x 300 random orders (own2.py): never stuck, always one dot. Caveats in the record: Cauchy removes triangles, the lesson removes edges (a variant, not 'Cauchy's proof' as the source field says); Richeson ch. 12 'Cauchy's Flattened Polyhedra' pp. 112-118 confirmed by Crossref metadata only (10.2307/j.ctvbj7gs1.17), text not opened; the Lakatos book itself not opened (two secondary accounts); the year 1813 not confirmed from an opened source. None of these is learner text."),
 "c7": ("verified", "Opened PMC7459769 (Acta Cryst. A, doi 10.1107/S2053273320007093; OAI full text): 'The famous Euler's formula (Euler, 1758) states that for any three-dimensional polyhedron ... F + V is by two larger than E', reference 'Euler, L. (1758). Novi Commun. Acad. Sci. Imp. Petropol. 4 (1752-3), 109-140', the volume the claim's source names. PMC10239678 and PMC9640434 also name it Euler's theorem/conjecture. Note: the reveal shows 'This is Euler's formula.'; the trust sheet shows this claim text with 'for solids'; both true."),
}
C8 = {"id": S + "c8", "text": "Three moves show why it is always 2.", "support": "source",
      "source": "Hook (meta.json hook, second sentence), recorded by the fact-checker 2026-10-25 as an unrecorded learner-visible claim.",
      "status": "disputed", "checkedBy": "fact-checker", "checkedOn": "2026-10-25",
      "note": "DISPUTED: 'always' is unqualified, and corners - edges + faces is not always 2: a solid with a hole through it (picture frame) gives 16-32+16=0 (company/domains/briefs/checks/math-lane-m-euler-check.mjs prints it; PMC9640434: the formula fails for polyhedra 'with holes running through them'). The lesson's own reveal and c6 say 'any convex solid'. Fix (category-curator, owner of the hook): qualify it, e.g. '... why it is 2 for every convex solid' or '... why it is 2 for solids like it'; then a fact-checker re-checks." + REC}
before = open(P, encoding="utf-8").read(); old = json.loads(before)
lines = before.split("\n"); cur = None; done = set()
for i, l in enumerate(lines):
    s = l.strip()
    if s.startswith('"id": '):
        cur = json.loads("{" + s.rstrip(",") + "}")["id"]
    k = cur.split(".")[-1] if cur and cur.startswith(S) else None
    if k in V and s == '"status": "unverified"':
        ind = l[: len(l) - len(l.lstrip())]; st, note = V[k]
        lines[i] = ind + '"status": "' + st + '",\n' + ind + '"checkedBy": "fact-checker",\n' + ind + '"checkedOn": "2026-10-25",\n' + ind + '"note": ' + json.dumps(note + REC, ensure_ascii=False)
        done.add(k)
assert done == set(V), done
after = "\n".join(lines); new = json.loads(after)
new["claims"].append(C8)
assert {k: v for k, v in old.items() if k != "claims"} == {k: v for k, v in new.items() if k != "claims"}
for a, b in zip(old["claims"], new["claims"]):
    assert {x: a[x] for x in ("id", "text", "support", "source")} == {x: b[x] for x in ("id", "text", "support", "source")}
# re-serialise only the claims array textually: append c8 after the last claim
last = after.rfind('"status": "verified"'); close = after.find("}", last)
ind = "    "; c8txt = json.dumps(C8, ensure_ascii=False, indent=2).replace("\n", "\n" + ind)
after = after[:close + 1] + ",\n" + ind + c8txt + after[close + 1:]
assert json.loads(after) == new
open(P, "w", encoding="utf-8").write(after); print("ok")
