# Own check (fact-checker, 2026-10-16, W-1591 c5 and W-1540): no kit code. Input: PD codes as JSON (argv[1]).
# PD X[a,b,c,d]: a incoming under, counterclockwise; under strand a->c, over strand b-d.
import json, sys, itertools
from fractions import Fraction

pds = json.load(open(sys.argv[1]))

class UF:
    def __init__(s): s.p = {}
    def f(s, x):
        s.p.setdefault(x, x)
        while s.p[x] != x:
            s.p[x] = s.p[s.p[x]]; x = s.p[x]
        return x
    def u(s, a, b): s.p[s.f(a)] = s.f(b)

def labels(pd): return sorted({e for X in pd for e in X})

def components(pd):
    u = UF()
    for a, b, c, d in pd: u.u(a, c); u.u(b, d)
    return len({u.f(e) for e in labels(pd)})

def arcs(pd):
    u = UF()
    for e in labels(pd): u.f(e)
    for a, b, c, d in pd: u.u(b, d)
    roots = sorted({u.f(e) for e in labels(pd)})
    idx = {r: i for i, r in enumerate(roots)}
    return len(roots), {e: idx[u.f(e)] for e in labels(pd)}

def tricolour(pd):
    n, A = arcs(pd)
    one = two = three = 0
    for col in itertools.product(range(3), repeat=n):
        if all((col[A[a]] + col[A[c]] - 2 * col[A[b]]) % 3 == 0 for a, b, c, d in pd):
            k = len(set(col))
            if k == 1: one += 1
            elif k == 2: two += 1
            else: three += 1
    return n, 3 ** n, one, two, three

def det(M):
    M = [[Fraction(x) for x in r] for r in M]; n = len(M); D = Fraction(1)
    for i in range(n):
        p = next((r for r in range(i, n) if M[r][i] != 0), None)
        if p is None: return 0
        if p != i: M[i], M[p] = M[p], M[i]; D = -D
        D *= M[i][i]
        for r in range(i + 1, n):
            f = M[r][i] / M[i][i]
            M[r] = [x - f * y for x, y in zip(M[r], M[i])]
    return D

def determinant(pd):
    n, A = arcs(pd)
    if n == 1: return 1
    M = [[0] * n for _ in pd]
    for r, (a, b, c, d) in enumerate(pd):
        M[r][A[b]] += 2; M[r][A[a]] -= 1; M[r][A[c]] -= 1
    return abs(det([row[1:] for row in M[1:]]))

def bracket(pd):
    # Kauffman bracket as {exponent of A: coeff}; d = -A^2 - A^-2
    out = {}
    for st in itertools.product((0, 1), repeat=len(pd)):
        u = UF()
        for e in labels(pd): u.f(e)
        for s, (a, b, c, d) in zip(st, pd):
            if s == 0: u.u(a, b); u.u(c, d)
            else: u.u(a, d); u.u(b, c)
        loops = len({u.f(e) for e in labels(pd)})
        poly = {st.count(0) - st.count(1): 1}
        for _ in range(loops - 1):
            nxt = {}
            for e, c in poly.items():
                nxt[e + 2] = nxt.get(e + 2, 0) - c; nxt[e - 2] = nxt.get(e - 2, 0) - c
            poly = nxt
        for e, c in poly.items(): out[e] = out.get(e, 0) + c
    return {e: c for e, c in out.items() if c}

def jspan(pd):
    b = bracket(pd)
    return (max(b) - min(b)) // 4  # span of Jones = span of bracket / 4

for name, pd in pds.items():
    n, tot, one, two, three = tricolour(pd)
    print(f"{name:6} comps={components(pd)} crossings={len(pd)} arcs={n} tric={one+two+three}/{tot} one={one} two={two} three={three} det={determinant(pd)} jones_span={jspan(pd)}")
print("loop (one arc, no crossings): colourings", tricolour([])[2:] if False else "3 by definition")
