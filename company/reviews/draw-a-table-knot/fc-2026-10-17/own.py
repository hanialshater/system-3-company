# Own, kit-free check of draw-a-table-knot c5 (fact-checker, 2026-10-17).
# Input: base PD codes dumped from the kit (the drawing is the kit's); everything below is own code.
# PD convention (KnotTheory): X[a,b,c,d] counter-clockwise from the incoming under-strand; labels run
# 1..2n along the orientation, so c = a+1 (mod 2n).
import json, sys
from fractions import Fraction
from itertools import product

def nxt(x, m): return x % m + 1

def switch(pd, i):
    """Own crossing change: the over-strand becomes the under-strand."""
    m = 2 * len(pd)
    a, b, c, d = pd[i]
    if d == nxt(b, m):   # over enters at b
        new = [b, c, d, a]
    else:                # over enters at d
        new = [d, a, b, c]
    return [list(x) if j != i else new for j, x in enumerate(pd)]

def sign(x, m):
    a, b, c, d = x
    return -1 if b == nxt(d, m) else +1   # flipped: consistent with the smoothing convention above (kink and integer-exponent tests)

# Laurent polys in A as dict exp->int
def padd(p, q, s=1):
    r = dict(p)
    for k, v in q.items(): r[k] = r.get(k, 0) + s * v
    return {k: v for k, v in r.items() if v}
def pmul(p, q):
    r = {}
    for a, x in p.items():
        for b, y in q.items(): r[a + b] = r.get(a + b, 0) + x * y
    return {k: v for k, v in r.items() if v}
def ppow(p, n):
    r = {0: 1}
    for _ in range(n): r = pmul(r, p)
    return r

def loops(pairs, labels):
    par = {l: l for l in labels}
    def f(x):
        while par[x] != x: par[x] = par[par[x]]; x = par[x]
        return x
    for u, v in pairs: par[f(u)] = f(v)
    return len({f(l) for l in labels})

def bracket(pd):
    labels = {l for x in pd for l in x}
    dl = {2: -1, -2: -1}
    tot = {}
    for st in product((0, 1), repeat=len(pd)):
        pairs, ea = [], 0
        for s, (a, b, c, d) in zip(st, pd):
            if s == 0: pairs += [(a, d), (b, c)]; ea += 1    # A-smoothing
            else: pairs += [(a, b), (c, d)]; ea -= 1         # A^-1 smoothing
        k = loops(pairs, labels)
        tot = padd(tot, pmul({ea: 1}, ppow(dl, k - 1)))
    return tot

def jones(pd):
    """Return V as dict exponent-of-t (Fraction) -> coeff, with A = t^(-1/4)."""
    m = 2 * len(pd)
    w = sum(sign(x, m) for x in pd)
    f = pmul({3 * (-w): (-1) ** (w % 2)}, bracket(pd))   # (-A^3)^(-w) <K>
    return {Fraction(-e, 4): v for e, v in f.items()}

def span(V): return max(V) - min(V)
def recip(V): return {-k: v for k, v in V.items()}

def det(pd):
    m = 2 * len(pd)
    labels = list(range(1, m + 1))
    par = {l: l for l in labels}
    def f(x):
        while par[x] != x: x = par[x]
        return x
    for a, b, c, d in pd: par[f(b)] = f(d)   # over-strand edges are one arc
    arcs = sorted({f(l) for l in labels}); ix = {a: i for i, a in enumerate(arcs)}
    M = [[0] * len(arcs) for _ in pd]
    for r, (a, b, c, d) in enumerate(pd):
        M[r][ix[f(b)]] += 2; M[r][ix[f(a)]] -= 1; M[r][ix[f(c)]] -= 1
    N = [row[1:] for row in M[1:]]
    N = [[Fraction(v) for v in row] for row in N]
    n = len(N); D = Fraction(1)
    for i in range(n):
        p = next((r for r in range(i, n) if N[r][i] != 0), None)
        if p is None: return 0
        if p != i: N[i], N[p] = N[p], N[i]; D = -D
        D *= N[i][i]
        for r in range(i + 1, n):
            t = N[r][i] / N[i][i]
            N[r] = [x - t * y for x, y in zip(N[r], N[i])]
    return abs(int(D))

def descending(pd):
    """True if some base point and direction meets every crossing first as over (=> unknot)."""
    m = 2 * len(pd)
    # entering edge e at crossing j: under if e == a; over if e is the incoming over edge
    enter = {}
    for j, (a, b, c, d) in enumerate(pd):
        enter[a] = (j, 'u')
        inc_over = b if d == nxt(b, m) else d
        enter[inc_over] = (j, 'o')
    exit_ = build_exit(pd)
    for rev in (False, True):
        for s in range(1, m + 1):
            seen, ok = set(), True
            for k in range(m):
                e = (s - 1 + (-k if rev else k)) % m + 1
                if rev:
                    # walking backwards along edge e we arrive at the crossing where e starts
                    j, kind = exit_[e]
                else:
                    j, kind = enter[e]
                if j not in seen:
                    seen.add(j)
                    if kind != 'o': ok = False; break
            if ok: return True
    return False

def build_exit(pd):
    m = 2 * len(pd); ex = {}
    for j, (a, b, c, d) in enumerate(pd):
        ex[c] = (j, 'u')
        out_over = d if d == nxt(b, m) else b
        ex[out_over] = (j, 'o')
    return ex

def fmt(V): return ' '.join(f'{v:+d}t^{k}' for k, v in sorted(V.items()))

kit = json.load(open(sys.argv[1]))
ATLAS_41 = [[4,2,5,1],[8,6,1,5],[6,3,7,4],[2,7,3,8]]   # Knot Atlas 4_1 PD (own typed copy)
V31 = jones(kit['3_1']); V41 = jones(ATLAS_41)
print('3_1 kit entry: det', det(kit['3_1']), 'V', fmt(V31))
print('4_1 atlas    : det', det(ATLAS_41), 'V', fmt(V41), 'amphichiral', V41 == recip(V41))
print('R1 kinks: V', fmt(jones([[1,1,2,2]])))
for name in ('6_1', '5_2'):
    pd = kit[name]
    V0 = jones(pd)
    print(f'{name} base: crossings {len(pd)} det {det(pd)} span {span(V0)}')
    for i in range(len(pd)):
        q = switch(pd, i)
        assert sorted(q[i]) == sorted(pd[i]) and len(q) == len(pd)
        global exit_; exit_ = build_exit(q)
        V = jones(q)
        tag = []
        if V == V41: tag.append('V=V(4_1)')
        if V == V31: tag.append('V=V(3_1 kit)')
        if V == recip(V31): tag.append('V=mirror V(3_1 kit)')
        if V == {Fraction(0): 1}: tag.append('V=1')
        print(f'  switch {i}: crossings {len(q)} det {det(q)} span {span(V)} descending {descending(q)} {tag}  same-as-kit {q == kit["cc"][name][i]}')
