# Exhaustive, no-kit: all one-component knot diagrams with n crossings (n = argv[1]), built from
# chord diagrams (Gauss words), a local orientation and an over/under choice per crossing.
# Keeps planar ones (faces = n + 2) that are knotted (Jones != 1) and where EVERY single switch gives
# the unknot (descending base point, else Jones == 1; for <= 5 crossings Jones 1 <=> unknot because
# 3_1, 4_1, 5_1, 5_2 all have Jones != 1).
import sys, os, itertools
here = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(here, 'own.py')).read().split('\nfor name, s in')[0]
ns = {}; exec(src, ns)
faces, jones, desc, switch = ns['faces'], ns['jones_t4'], ns['descending_base'], ns['switch']
n = int(sys.argv[1]); n2 = 2 * n

def words():
    def rec(w, used, nxtsym):
        if len(w) == n2:
            yield tuple(w); return
        for s in range(nxtsym):
            if used[s] == 1:
                used[s] = 2; yield from rec(w + [s], used, nxtsym); used[s] = 1
        if nxtsym < n:
            used[nxtsym] = 1; yield from rec(w + [nxtsym], used, nxtsym + 1); used[nxtsym] = 0
    yield from rec([], [0] * n, 0)

def unknot(q):
    return desc(q) is not None or jones(q) == {0: 1}

ws = list(words()); print('chord diagrams', len(ws))
found = []; planar = 0
for w in ws:
    pos = {}
    for k, s in enumerate(w): pos.setdefault(s, []).append(k + 1)  # pass at end of edge k+1
    for choice in itertools.product(range(4), repeat=n):
        pd = []
        for s in range(n):
            p, r = pos[s]
            ch = choice[s]
            u, o = (p, r) if ch < 2 else (r, p)
            a, c_ = u, u % n2 + 1; b, d = o, o % n2 + 1
            pd.append((a, b, c_, d) if ch % 2 == 0 else (a, d, c_, b))
        if len(faces(pd)) != n + 2: continue
        planar += 1
        if any(len(set(x)) < 4 for x in pd):
            continue  # a kink crossing: switching it never changes the knot, so it cannot qualify
        if not all(unknot(switch(pd, i)) for i in range(n)): continue
        J = jones(pd)
        if J == {0: 1}: continue
        found.append((w, choice, J))
print('planar diagrams (with repeats)', planar, '; knotted with every single switch unknotting:', len(found))
for f in found[:6]: print(f)
