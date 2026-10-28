# fact-checker 2026-10-25 pass 3 (W-2064, v2 at 3e365688e): own check of c9 ("The 5 regions are the cube's other 5 faces.")
# and card 1's line "1 corner gone, 3 new: +2 corners" against c2. Inputs copied by hand from Demo.tsx (CUBE, ALL_E, FP, CUT);
# the region list is NOT taken from Demo.tsx REGIONS: faces are derived from the 3D coordinates, then compared.
from itertools import combinations
CUBE = [(0,1,1),(1,1,1),(1,1,0),(0,1,0),(0,0,1),(1,0,1),(1,0,0),(0,0,0)]
E = [(0,1),(1,2),(2,3),(3,0),(4,5),(5,6),(6,7),(7,4),(0,4),(1,5),(2,6),(3,7)]
FP = {0:(60,8),1:(240,8),2:(240,166),3:(60,166),4:(116,52),5:(184,52),6:(184,122),7:(116,122)}
# faces of the cube: vertex sets with one coordinate fixed
faces = {}
for k in range(3):
    for v in (0,1):
        faces[("xyz"[k],v)] = frozenset(i for i,p in enumerate(CUBE) if p[k]==v)
top = faces[("y",1)]; assert top == {0,1,2,3}
rest = {n:f for n,f in faces.items() if f != top}
print("faces left after the top comes off:", len(rest))
# bounded regions of the flat drawing: find all 4-cycles of edges whose polygon contains no other vertex, and are not the outer rim
adj = {i:set() for i in range(8)}
for a,b in E: adj[a].add(b); adj[b].add(a)
def area(poly):
    return abs(sum(FP[poly[i]][0]*FP[poly[(i+1)%len(poly)]][1]-FP[poly[(i+1)%len(poly)]][0]*FP[poly[i]][1] for i in range(len(poly))))/2
def inside(pt, poly):
    x,y = pt; c=False
    for i in range(len(poly)):
        (x1,y1),(x2,y2) = FP[poly[i]], FP[poly[(i+1)%len(poly)]]
        if (y1>y)!=(y2>y) and x < x1+(y-y1)*(x2-x1)/(y2-y1): c = not c
    return c
cycles={}  # vertex set -> one ordering (each 4-cycle is found 8 times)
for a in range(8):
    for b in adj[a]:
        for c in adj[b]-{a}:
            for d in adj[c]-{a,b}:
                if a in adj[d]: cycles.setdefault(frozenset((a,b,c,d)), (a,b,c,d))
regions=[]
for poly in cycles.values():
    if any(inside(FP[v],poly) for v in range(8) if v not in poly): continue  # contains other dots: not a single region
    regions.append((frozenset(poly),poly))
print("bounded regions in the flat drawing:", len(regions))
outer = area((0,1,2,3))
print("outer square (rim) vertex set == top face:", frozenset((0,1,2,3))==top, "| sum of region areas == outer square area:", sum(area(p) for _,p in regions)==outer)
match = all(any(s==f for f in rest.values()) for s,_ in regions) and len(regions)==len(rest)
print("each region is exactly one remaining face, one to one:", match)
for s,p in sorted(regions, key=lambda r: sorted(r[0])):
    n=[n for n,f in rest.items() if f==s][0]; print("  region", sorted(s), "= face", n[0]+"="+str(n[1]))
# card 1: slicing the corner CUT=2
CUT=2; deg=len(adj[CUT])
V=8-1+deg; Ed=12+deg; F=6+1
print(f"corner {CUT} has {deg} edges; corners 8 -1 +{deg} = {V} (net +{V-8}); edges {Ed}; faces {F}; V-E+F = {V-Ed+F}")
