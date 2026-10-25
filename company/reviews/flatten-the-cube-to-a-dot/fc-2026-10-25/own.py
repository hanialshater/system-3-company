# Independent recount: cube, truncated cube corner, Schlegel diagram, shrink by edge removal.
import itertools
V=[(x,y,z) for x in (0,1) for y in (0,1) for z in (0,1)]
E=[(a,b) for a,b in itertools.combinations(range(8),2) if sum(p!=q for p,q in zip(V[a],V[b]))==1]
F=[[i for i,v in enumerate(V) if v[k]==s] for k in range(3) for s in (0,1)]
print("cube",len(V),len(E),len(F),len(V)-len(E)+len(F))
# slice corner 7=(1,1,1): replace it with 3 points on its 3 edges
c=7; nb=[b if a==c else a for a,b in E if c in (a,b)]
V2=[v for i,v in enumerate(V) if i!=c]+[('cut',n) for n in nb]
E2=[e for e in E if c not in e]+[(n,('cut',n)) for n in nb]+[(('cut',a),('cut',b)) for a,b in itertools.combinations(nb,2)]
F2=len(F)+1
print("sliced",len(V2),len(E2),F2,len(V2)-len(E2)+F2, "deltas",len(V2)-8,len(E2)-12,F2-6)
# Schlegel: remove top face z=1; plane graph: 8 V, 12 E; bounded faces = 5 remaining faces
print("flat",8,12,5,8-12+5)
# shrink: plane graph faces tracked as sets of edges. Bounded faces = the 5 non-top faces as edge cycles.
def fedges(face):
    s=set(face); return frozenset(e for e in E if e[0] in s and e[1] in s)
faces=[fedges(f) for f,(k,s) in zip(F,[(k,s) for k in range(3) for s in (0,1)]) if not (k==2 and s==1)]
outer=fedges(F[5])  # top face boundary = outer boundary
edges=set(E); verts=set(range(8)); faces=set(faces)
steps=0; log=[]
while edges:
    deg={v:sum(v in e for e in edges) for v in verts}
    # prefer edge on boundary of exactly one bounded region and of outer region
    done=False
    for e in sorted(edges):
        inf=[f for f in faces if e in f]
        if len(inf)==1:
            # check e is on outer boundary: e belongs to only one bounded face -> other side is outer
            faces.remove(inf[0]); 
            # merging: no other bounded face; outer absorbs it
            edges.remove(e); log.append(('R',e)); done=True; break
    if not done:
        for e in sorted(edges):
            a,b=e
            if deg[a]==1 or deg[b]==1:
                edges.remove(e); verts.discard(a if deg[a]==1 else b); log.append(('C',e)); done=True; break
    assert done
    steps+=1
    chi=len(verts)-len(edges)+len(faces)
    assert chi==1,(steps,chi)
print("shrink steps",steps,"final",len(verts),len(edges),len(faces),"R",sum(t=='R' for t,_ in log),"C",sum(t=='C' for t,_ in log))
