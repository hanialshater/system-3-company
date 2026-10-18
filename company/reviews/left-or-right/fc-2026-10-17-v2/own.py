# Own check, fact-checker v2 lane left-or-right c1 c5 c6 (2026-10-17). No kit code: PD codes are pasted
# from knot('3_1').pd / knot('4_1').pd (printed by node at aae6d2d6) and everything else is computed here.
# PD convention (src/kit/knots/index.d.ts): X[i,j,k,l] counter-clockwise from the incoming under-strand.
from itertools import product
from collections import defaultdict

PD = {"3_1": [[1,4,2,5],[3,6,4,1],[5,2,6,3]],
      "4_1": [[4,1,5,2],[6,4,7,3],[8,5,1,6],[2,8,3,7]]}

def nlab(pd): return 2*len(pd)
def nxt(a, n): return a % n + 1

# Geometry of one crossing: put i at south (under runs south -> north, u = (0,1)), j east, k north, l west.
DIRS = {0: (0,-1), 1: (1,0), 2: (0,1), 3: (-1,0)}  # position of slot s on the unit circle
def over_vec(c, n):
    i,j,k,l = c
    # over strand runs from its incoming slot to its outgoing slot; incoming edge e is followed by nxt(e)
    if nxt(l, n) == j: a, b = 3, 1   # enters at l (west), leaves at j (east)
    elif nxt(j, n) == l: a, b = 1, 3
    else: raise ValueError(c)
    return (DIRS[b][0]-DIRS[a][0], DIRS[b][1]-DIRS[a][1])
U = (0, 2)  # under: south -> north

def sign_rotation(c, n):
    # PMC2853108 Fig 2E: turn the over vector onto the under vector (< 180 deg); clockwise -> negative, else positive
    o = over_vec(c, n); cross = o[0]*U[1] - o[1]*U[0]  # >0: under is counter-clockwise from over
    return 1 if cross > 0 else -1

def sign_traveller(c, n):
    # c5 wording: plus when the over-strand passes from left to right as seen travelling along the under-strand
    o = over_vec(c, n); right = (U[1], -U[0])  # the traveller's right hand when heading along U
    return 1 if o[0]*right[0] + o[1]*right[1] > 0 else -1

# Own turn-over: reflect the plane (reverse the cyclic order) then switch every crossing.
def turn_over(pd):
    n = nlab(pd); out = []
    for i,j,k,l in pd:
        r = [i,l,k,j]                       # reflected, still from incoming under i
        # switch: new under = old over strand (r[1], r[3]); start at its incoming end, keep ccw order
        if nxt(r[1], n) == r[3]: out.append([r[1],r[2],r[3],r[0]])
        else: out.append([r[3],r[0],r[1],r[2]])
    return out
def mirror(pd):  # switch every crossing (same as a page reflection up to isotopy)
    n = nlab(pd); out = []
    for i,j,k,l in pd:
        out.append([j,k,l,i] if nxt(j, n) == l else [l,i,j,k])
    return out

# Kauffman bracket by state sum; A-smoothing of X[a,b,c,d] joins (a,b),(c,d); B joins (a,d),(b,c).
def loops(pairs, labels):
    par = {x: x for x in labels}
    def f(x):
        while par[x] != x: par[x] = par[par[x]]; x = par[x]
        return x
    for a,b in pairs: par[f(a)] = f(b)
    return len({f(x) for x in labels})
def bracket(pd):
    labels = {x for c in pd for x in c}; res = defaultdict(int)  # poly in A: exponent -> coeff
    for st in product((0,1), repeat=len(pd)):
        pairs = []; na = 0
        for s,(a,b,c,d) in zip(st, pd):
            if s == 0: pairs += [(a,b),(c,d)]; na += 1
            else: pairs += [(a,d),(b,c)]
        L = loops(pairs, labels); nb = len(pd) - na
        # A^(na-nb) * d^(L-1), d = -A^2 - A^-2
        poly = {na-nb: 1}
        for _ in range(L-1):
            q = defaultdict(int)
            for e,v in poly.items(): q[e+2] -= v; q[e-2] -= v
            poly = q
        for e,v in poly.items(): res[e] += v
    return {e:v for e,v in res.items() if v}
def jones(pd, sgn):
    w = sum(sgn(c, nlab(pd)) for c in pd)
    b = bracket(pd)
    # V(t) = (-A^3)^(-w) <D>, t = A^-4
    out = {}
    for e,v in b.items():
        E = e - 3*w; assert E % 4 == 0, (e, w)
        out[-E//4] = out.get(-E//4, 0) + v * (-1)**w
    return dict(sorted((k,v) for k,v in out.items() if v))

# Sanity: the two rules must agree on every slot layout, and adding R1 kinks of either sign (PD codes pasted from
# the kit's addKink on 3_1, edge 1, both sides and both under choices) must leave the Jones polynomial unchanged.
KINKED = __import__("json").loads(open(__import__("sys").argv[1]).read()) if len(__import__("sys").argv) > 1 else []
for name, pd in PD.items():
    n = nlab(pd)
    for c in pd + turn_over(pd) + mirror(pd):
        assert sign_rotation(c, n) == sign_traveller(c, n)
    s = lambda D: [sign_traveller(c, nlab(D)) for c in D]
    J = jones(pd, sign_traveller); JT = jones(turn_over(pd), sign_traveller); JM = jones(mirror(pd), sign_traveller)
    print(name, "front signs", s(pd), "sum", sum(s(pd)))
    print(name, "turned over", s(turn_over(pd)), "sum", sum(s(turn_over(pd))))
    print(name, "mirror     ", s(mirror(pd)), "sum", sum(s(mirror(pd))))
    print(name, "Jones front", J, "| turned", JT, "| mirror", JM)
    print(name, "turned == front:", JT == J, " mirror == front:", JM == J,
          " mirror == front(1/t):", JM == {-e: v for e, v in J.items()})
for pd in KINKED:
    print("kinked 3_1 (", len(pd), "crossings) Jones", jones(pd, sign_traveller), "R1 invariant:", jones(pd, sign_traveller) == jones(PD["3_1"], sign_traveller))
