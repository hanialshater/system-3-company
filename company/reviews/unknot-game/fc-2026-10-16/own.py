# Own, no-kit check for unknot-game (fact-checker, 2026-10-16 lane).
# PD convention (KnotAtlas): X[a,b,c,d] ccw, a = incoming under, c = outgoing under, b,d = over.
# Edges labelled 1..2n in traversal order. Input strings copied from src/kit/knots/table.mjs.
import itertools
from collections import defaultdict

def parse(s):
    d = [int(ch) for ch in s]
    return [tuple(d[i:i+4]) for i in range(0, len(d), 4)]

def nxt(e, n2):
    return e % n2 + 1

def switch(pd, i):
    n2 = 2 * len(pd)
    a, b, c, d = pd[i]
    q = list(pd)
    # old over strand b-d becomes under; incoming one goes first, ccw order kept
    q[i] = (b, c, d, a) if nxt(b, n2) == d else (d, a, b, c)
    return q

def passes(pd):
    """For each edge e: (crossing at its head, 'O' or 'U')."""
    n2 = 2 * len(pd)
    head = {}
    for ci, (a, b, c, d) in enumerate(pd):
        head[a] = (ci, 'U')
        # over: the incoming over edge is the one whose successor is the other over slot
        if nxt(b, n2) == d: head[b] = (ci, 'O')
        elif nxt(d, n2) == b: head[d] = (ci, 'O')
        else: raise ValueError('bad over strand at %d' % ci)
        assert nxt(a, n2) == c, 'bad under strand'
    return head

def gauss(pd):
    h = passes(pd)
    n2 = 2 * len(pd)
    return [h[e] for e in range(1, n2 + 1)]  # pass at the end of edge e

def descending_base(pd):
    g = gauss(pd)
    n2 = len(g)
    for s in range(n2):
        seen = set(); ok = True
        for k in range(n2):
            c, t = g[(s + k) % n2]
            if c not in seen:
                seen.add(c)
                if t != 'O': ok = False; break
        if ok: return s + 1  # start just after edge s, i.e. base point on edge s+1
    return None

def faces(pd):
    # occurrences of each edge: (crossing, slot)
    occ = defaultdict(list)
    for ci, x in enumerate(pd):
        for sl, e in enumerate(x): occ[e].append((ci, sl))
    corners = {(ci, sl) for ci in range(len(pd)) for sl in range(4)}
    out = []
    while corners:
        start = corners.pop() if not out or True else None
        face = [start]; edges = []
        cur = start
        while True:
            ci, sl = cur
            e = pd[ci][(sl + 1) % 4]
            edges.append(e)
            other = [o for o in occ[e] if o != (ci, (sl + 1) % 4)]
            if not other:  # loop edge at same crossing in two slots
                other = [o for o in occ[e] if o != (ci, (sl + 1) % 4)]
            oc, osl = other[0]
            nc = (oc, osl)
            if nc == start: break
            corners.discard(nc); face.append(nc); cur = nc
        out.append((face, edges))
    return out

def bracket(pd):
    # Kauffman bracket by state sum, polynomial in A as dict exp->coef; returns Jones-normalised check via writhe
    n = len(pd)
    total = defaultdict(int)
    for st in itertools.product((0, 1), repeat=n):
        parent = {}
        def f(x):
            while parent.setdefault(x, x) != x: x = parent[x]
            return x
        def u(x, y): parent[f(x)] = f(y)
        for (a, b, c, d), s in zip(pd, st):
            if s == 0: u(a, b); u(c, d)   # A-smoothing joins a-b, c-d
            else: u(a, d); u(b, c)        # B-smoothing
        loops = len({f(e) for x in pd for e in x})
        na = st.count(0); nb = n - na
        # A^(na-nb) * (-A^2 - A^-2)^(loops-1)
        poly = {na - nb: 1}
        for _ in range(loops - 1):
            np_ = defaultdict(int)
            for k, v in poly.items():
                np_[k + 2] -= v; np_[k - 2] -= v
            poly = np_
        for k, v in poly.items(): total[k] += v
    return {k: v for k, v in sorted(total.items()) if v}

def writhe(pd):
    n2 = 2 * len(pd); w = 0
    for a, b, c, d in pd:
        w += -1 if nxt(b, n2) == d else 1   # KnotAtlas: X[i,j,k,l] with l = j+1 is negative
    return w

def jones_t4(pd):
    # V(t) as dict exponent of t^(1/4): (-A^3)^(-w) <D>, A = t^(-1/4)
    w = writhe(pd); br = bracket(pd)
    sign = (-1) ** (w % 2)
    return {-(k - 3 * w): sign * v for k, v in br.items()}

for name, s in (('3_1', '142536415263'), ('4_1', '4152647385162837')):
    pd = parse(s)
    print('==', name, pd)
    F = faces(pd)
    print(' faces', len(F), 'expected', len(pd) + 2, 'sizes', sorted(len(e) for _, e in F))
    print(' base: gauss', gauss(pd), 'descending base', descending_base(pd), 'Jones t^(1/4)', jones_t4(pd))
    bigons = [tuple(sorted(e)) for _, e in F if len(e) == 2]
    for i in range(len(pd)):
        q = switch(pd, i)
        h = passes(q)
        tail = {}
        n2 = 2 * len(q)
        for e in range(1, n2 + 1): tail[nxt(e, n2)] = h[e]  # pass at the start of edge e
        ready = []
        for e1, e2 in bigons:
            for o, u_ in ((e1, e2), (e2, e1)):
                # pass at start of edge = pass at end of previous edge
                po = (h[(o - 2) % n2 + 1][1], h[o][1]); pu = (h[(u_ - 2) % n2 + 1][1], h[u_][1])
                if po == ('O', 'O') and pu == ('U', 'U'): ready.append((o, u_))
        print(' switch', i, 'desc base', descending_base(q), 'Jones', jones_t4(q), 'R2-ready bigons (over edge, under edge)', ready)
