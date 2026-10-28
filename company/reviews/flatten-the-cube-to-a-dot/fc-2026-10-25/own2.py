# fact-checker 2026-10-25 (W-2037 lane M). Own model, not the curator's or designer's scripts.
# (a) Replay Demo.tsx ORDER on my own face model of the flat cube: kind of each removal.
# (b) For several convex solids and every choice of removed face, 300 random runs using only the
#     lesson's two moves (edge between the outside and one region; edge with a loose end):
#     the total stays 1 after every removal, the run never gets stuck, and it always ends at one dot.
import random
def faces_to_edges(F):
    return [frozenset(frozenset((f[i], f[(i+1) % len(f)])) for i in range(len(f))) for f in F]
def run(F, o, seed=0, order=None):
    rnd = random.Random(seed); FE = faces_to_edges(F)
    outer = set(FE[o]); faces = [set(f) for i, f in enumerate(FE) if i != o]
    edges = set().union(*FE); verts = set().union(*edges); kinds = ''
    assert len(verts) - len(edges) + len(faces) == 1
    seq = [frozenset(e) for e in order] if order else None
    while edges:
        deg = {v: sum(v in e for e in edges) for v in verts}
        R = [(e, f) for e in outer for f in faces if e in f]
        C = [e for e in edges if min(deg[v] for v in e) == 1]
        moves = [('R', m) for m in R] + [('C', m) for m in C]
        assert moves, 'stuck'
        if seq:
            e = seq.pop(0); pick = [mv for mv in moves if (mv[1][0] if mv[0] == 'R' else mv[1]) == e]
            assert pick, ('order removes an edge that is neither move', set(e)); k, m = pick[0]
        else:
            k, m = rnd.choice(moves)
        if k == 'R':
            e, f = m; faces.remove(f); outer = (outer | f) - {e}
        else:
            e = m; verts.discard([v for v in e if deg[v] == 1][0]); outer.discard(e)
        edges.discard(e); kinds += k
        assert len(verts) - len(edges) + len(faces) == 1
    return (len(verts), len(edges), len(faces)), kinds
# Demo.tsx labels: outer square 0-1-2-3 (rim of the removed top face), inner square 4-7, spokes i-(i+4).
cube = [[0,1,2,3],[4,5,6,7],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]]
ORDER = [[0,1],[3,0],[0,4],[1,2],[1,5],[2,3],[2,6],[3,7],[4,5],[5,6],[6,7],[7,4]]  # Demo.tsx line 58
print('Demo ORDER replay: end', *run(cube, 0, order=ORDER))
solids = {'tetrahedron': [[0,1,2],[0,1,3],[1,2,3],[0,2,3]],
          'octahedron': [[0,2,4],[2,1,4],[1,3,4],[3,0,4],[0,2,5],[2,1,5],[1,3,5],[3,0,5]],
          'square pyramid': [[0,1,2,3],[0,1,4],[1,2,4],[2,3,4],[3,0,4]],
          'triangular prism': [[0,1,2],[3,4,5],[0,1,4,3],[1,2,5,4],[2,0,3,5]],
          'cube': cube}
for name, F in solids.items():
    V = len({v for f in F for v in f}); E = len(set().union(*faces_to_edges(F)))
    ends = {(r[0], r[1].count('R'), r[1].count('C')) for o in range(len(F)) for s in range(300) for r in [run(F, o, s)]}
    print(f'{name}: {V}-{E}+{len(F)}={V-E+len(F)}; every run ends (corners,edges,regions), #region-moves, #corner-moves: {ends}')
