# Independent fact-check of draw-a-table-knot: own bracket/Jones, Gauss-word tests, descending-unknot test,
# geometric extra-crossing count. Reads PD codes dumped from the kit; uses no kit code.
import json, sys, itertools, re
D = sys.argv[1]
data = json.load(open(D + '/pd.json'))

def padd(p, q, s=1):
    r = dict(p)
    for k, v in q.items():
        r[k] = r.get(k, 0) + s * v
    return {k: v for k, v in r.items() if v}

def pmul(p, q):
    r = {}
    for a, x in p.items():
        for b, y in q.items():
            r[a + b] = r.get(a + b, 0) + x * y
    return {k: v for k, v in r.items() if v}

def bracket(pd):
    n = len(pd)
    if n == 0:
        return {0: 1}
    dl = {2: -1, -2: -1}
    tot = {}
    for st in itertools.product((0, 1), repeat=n):
        par = {}
        def f(x):
            while par.setdefault(x, x) != x:
                x = par[x]
            return x
        def u(x, y):
            par[f(x)] = f(y)
        na = 0
        for (a, b, c, d), s in zip(pd, st):
            if s == 0:
                u(a, b); u(c, d); na += 1
            else:
                u(a, d); u(b, c)
        labels = {x for X in pd for x in X}
        loops = len({f(x) for x in labels})
        term = {na - (n - na): 1}
        for _ in range(loops - 1):
            term = pmul(term, dl)
        tot = padd(tot, term)
    return tot

def nxt(x, m):
    return x % m + 1

def signs(pd):
    m = 2 * len(pd)
    out = []
    for a, b, c, d in pd:
        # KnotTheory convention: positive iff b == d+1 (over runs d -> b), geometric check in record
        out.append(1 if b == nxt(d, m) else -1)
    return out

def jones(pd, flip=False):
    if not pd:
        return {0: 1}
    w = sum(signs(pd)) * (-1 if flip else 1)
    br = bracket(pd)
    f = {3 * (-w): (-1) ** (w % 2)}  # (-A^3)^-w
    v = pmul(f, br)
    if any(e % 4 for e in v):
        return None
    return {-e // 4: c for e, c in v.items()}

def J(pd):
    for flip in (False, True):
        v = jones(pd, flip)
        if v is not None and sum(v.values()) == 1:
            return v, flip
    raise Exception('no normalisation')

def inv(p):
    return {-k: v for k, v in p.items()}

def span(p):
    return max(p) - min(p) if p else 0

# Published Jones polynomials (Knot Atlas / KnotInfo values, up to mirror t -> 1/t), knots with c <= 6
TAB = {
    '0_1': {0: 1},
    '3_1': {1: 1, 3: 1, 4: -1},
    '4_1': {-2: 1, -1: -1, 0: 1, 1: -1, 2: 1},
    '5_1': {-7: -1, -6: 1, -5: -1, -4: 1, -2: 1},
    '5_2': {-6: -1, -5: 1, -4: -1, -3: 2, -2: -1, -1: 1},
    '6_1': {-4: 1, -3: -1, -2: 1, -1: -2, 0: 2, 1: -1, 2: 1},
    '6_2': {-1: 1, 0: -1, 1: 2, 2: -2, 3: 2, 4: -2, 5: 1},
    '6_3': {-3: -1, -2: 2, -1: -2, 0: 3, 1: -2, 2: 2, 3: -1},
}
TAB['granny'] = pmul(TAB['3_1'], TAB['3_1'])
TAB['square'] = pmul(TAB['3_1'], inv(TAB['3_1']))

def name(v):
    hits = []
    for k, p in TAB.items():
        if p == v:
            hits.append(k)
        elif inv(p) == v:
            hits.append(k + '*')
    return hits

def gauss(pd):
    # sequence of (crossing index, 'O'/'U') along the knot, following edge labels 1..2n
    m = 2 * len(pd)
    ends = {}
    for i, (a, b, c, d) in enumerate(pd):
        ends[a] = (i, 'U')
        if d == nxt(b, m):
            ends[b] = (i, 'O')
        else:
            ends[d] = (i, 'O')
    return [ends[e] for e in range(1, m + 1)]

def alternating(g):
    return all(g[k][1] != g[(k + 1) % len(g)][1] for k in range(len(g)))

def nugatory(g):
    out = []
    n = len(g) // 2
    for c in range(n):
        p = [k for k, x in enumerate(g) if x[0] == c]
        inner = [x[0] for x in g[p[0] + 1:p[1]]]
        if all(inner.count(y) == 2 for y in inner):
            out.append(c)
    return out

def descending(g):
    m = len(g)
    for seq in (g, g[::-1]):
        for s in range(m):
            seen = set(); ok = True
            for k in range(m):
                c, t = seq[(s + k) % m]
                if c not in seen:
                    seen.add(c)
                    if t != 'O':
                        ok = False; break
            if ok:
                return True
    return False

for n in ['3_1', '4_1', '5_2', '6_1']:
    pd = data[n]['pd']
    v, fl = J(pd)
    g = gauss(pd)
    print(n, 'crossings', len(pd), 'jones', sorted(v.items()), 'span', span(v), 'id', name(v),
          'alternating', alternating(g), 'nugatory', nugatory(g))
for n in ['6_1', '5_2']:
    for s in data[n]['sw']:
        pd = s['pd']
        v, fl = J(pd)
        g = gauss(pd)
        print(n, 'switch', s['i'], 'crossings', len(pd), 'id', name(v), 'span', span(v),
              'descending(unknot proof)', descending(g), 'alternating', alternating(g))

# geometry: extra crossings in the drawn pictures (gap 0), away from crossing centres
dr = json.load(open(D + '/draw.json'))
def cubic(p0, p1, p2, p3, N=80):
    pts = []
    for k in range(N + 1):
        t = k / N; u = 1 - t
        pts.append(tuple(u**3 * p0[j] + 3 * u * u * t * p1[j] + 3 * u * t * t * p2[j] + t**3 * p3[j] for j in (0, 1)))
    return pts
def parse(d):
    nums = list(map(float, re.findall(r'-?[0-9.]+', d)))
    P = [(nums[k], nums[k + 1]) for k in range(0, len(nums), 2)]
    pts = [P[0]]
    for k in range(1, len(P) - 2, 3):
        pts += cubic(pts[-1], P[k], P[k + 1], P[k + 2])[1:]
    return pts
def inter(p, q, r, s):
    def cr(o, a, b):
        return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
    d1, d2, d3, d4 = cr(r, s, p), cr(r, s, q), cr(p, q, r), cr(p, q, s)
    if d1 * d2 < 0 and d3 * d4 < 0:
        t = d1 / (d1 - d2)
        return (p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1]))
    return None
for n in ['6_1', '5_2']:
    for st in dr[n]:
        polys = [parse(e) for e in st['edges']]
        cen = [(c['x'], c['y']) for c in st['cr']]
        extra = []
        for a in range(len(polys)):
            for b in range(a + 1, len(polys)):
                for k in range(len(polys[a]) - 1):
                    for l in range(len(polys[b]) - 1):
                        x = inter(polys[a][k], polys[a][k + 1], polys[b][l], polys[b][l + 1])
                        if x and min((x[0] - c[0])**2 + (x[1] - c[1])**2 for c in cen) > 2.0:
                            extra.append(x)
        print(n, 'state', st['i'], 'drawn crossing centres', len(cen), 'edges', len(polys), 'extra crossings', len(extra))
