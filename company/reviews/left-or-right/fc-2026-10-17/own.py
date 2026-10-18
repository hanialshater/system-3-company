# Own, kit-free check of left-or-right c1-c8 numbers (fact-checker, 2026-10-17).
# Input: kit.json (PD codes and the kit's drawings, dumped once). Everything below is own code; kit signs,
# mirror and turnOver are only compared against, never used.
# PD (KnotTheory): X[a,b,c,d] counter-clockwise from the incoming under edge a; labels 1..2n along the orientation.
# Geometric sign: z toward the viewer, y up; sign = sign((t_over x t_under)_z). This is the right-handed
# twist: two upward strands of a right-handed double helix along the page's y axis, X = sin t, Z = cos t,
# Y = ct and its half-turn copy, cross with over SW->NE, under SE->NW, and (1,c,0) x (-1,c,0) has z = 2c > 0.
# The same sign comes from the Gauss linking integrand (r1-r2).(dr1 x dr2) with r1 over, r2 under.
import json, sys
from fractions import Fraction
from itertools import product

def nxt(x, m): return x % m + 1

def pd_sign(x, m):
    # place a at S (under heading N), then ccw: b at E, c at N, d at W.
    a, b, c, d = x
    if d == nxt(b, m):   # over enters at b (E) heading W: (-1,0) x (0,1) = -1
        return -1
    return +1            # over enters at d (W) heading E: (1,0) x (0,1) = +1

def switch_all(pd, m):
    out = []
    for a, b, c, d in pd:
        out.append([b, c, d, a] if d == nxt(b, m) else [d, a, b, c])
    return out

def reflect_plane(pd):
    # planar reflection reverses the cyclic order; a stays the incoming under edge
    return [[a, d, c, b] for a, b, c, d in pd]

def turn_over(pd, m): return switch_all(reflect_plane(pd), m)
def mirror_reflect(pd): return reflect_plane(pd)          # mirror as the lesson draws it: reflect in the page
def mirror_switch(pd, m): return switch_all(pd, m)        # mirror in the plane of the page

# ---- Jones from own Kauffman bracket. A-smoothing joins the regions swept counter-clockwise by the over
# strand (NE between b,c and SW between d,a), so it pairs (a,b) and (c,d).
def padd(p, q):
    r = dict(p)
    for k, v in q.items(): r[k] = r.get(k, 0) + v
    return {k: v for k, v in r.items() if v}
def pmul(p, q):
    r = {}
    for a, x in p.items():
        for b, y in q.items(): r[a + b] = r.get(a + b, 0) + x * y
    return {k: v for k, v in r.items() if v}
def loops(pairs, labels):
    par = {l: l for l in labels}
    def f(x):
        while par[x] != x: x = par[x]
        return x
    for u, v in pairs: par[f(u)] = f(v)
    return len({f(l) for l in labels})
def jones(pd):
    m = 2 * len(pd); labels = {l for x in pd for l in x}
    tot = {}
    for st in product((0, 1), repeat=len(pd)):
        pairs, ea = [], 0
        for s, (a, b, c, d) in zip(st, pd):
            if s == 0: pairs += [(a, b), (c, d)]; ea += 1
            else: pairs += [(a, d), (b, c)]; ea -= 1
        k = loops(pairs, labels)
        p = {0: 1}
        for _ in range(k - 1): p = pmul(p, {2: -1, -2: -1})
        tot = padd(tot, pmul({ea: 1}, p))
    w = sum(pd_sign(x, m) for x in pd)
    f = pmul({-3 * w: (-1) ** (w % 2)}, tot)
    return {Fraction(-e, 4): v for e, v in f.items()}
def fmt(V): return ' '.join(f'{v:+d}t^{k}' for k, v in sorted(V.items()))
def recip(V): return {-k: v for k, v in V.items()}

# ---- geometry from the drawn lines
def cub(d):
    import re
    n = [float(v) for v in re.findall(r'-?\d+(?:\.\d+)?', d)]
    return [(n[0], n[1]), (n[2], n[3]), (n[4], n[5]), (n[6], n[7])]
def geo_signs(D, reflect, swap=False):
    """Screen signs, y up. reflect: x -> 100-x. swap: over and under exchanged (the card's far side seen
    through it, i.e. a half-turn about the vertical axis)."""
    out = []
    for c in D['crossings']:
        C = (c['x'], c['y'])
        inc = [cub(e['d']) for e in D['edges'] if e['to'] == c['i']]
        assert len(inc) == 2
        inc.sort(key=lambda b: (b[3][0] - C[0]) ** 2 + (b[3][1] - C[1]) ** 2)
        over, under = inc  # the over edge runs to the centre; the under edge stops short (gap)
        if swap: over, under = under, over
        def t(b):
            dx, dy = b[3][0] - b[2][0], b[3][1] - b[2][1]
            return (-dx if reflect else dx, -dy)  # y down -> y up
        o, u = t(over), t(under)
        out.append(1 if o[0] * u[1] - o[1] * u[0] > 0 else -1)
    return out

kit = json.load(open(sys.argv[1]))
for k in ('3_1', '4_1'):
    E = kit[k]; pd = E['pd']; m = 2 * len(pd)
    S = lambda q: [pd_sign(x, m) for x in q]
    print(f'== {k} pd {pd}')
    print(' own PD signs  front', S(pd), ' turned', S(turn_over(pd, m)), ' mirrored(page reflect)', S(mirror_reflect(pd)),
          ' mirrored(switch)', S(mirror_switch(pd, m)), ' mirrored+turned', S(turn_over(mirror_reflect(pd), m)))
    print(' kit signs (compare only): front', E['front']['crossings'] and [c['sign'] for c in E['front']['crossings']],
          ' back', [c['sign'] for c in E['back']['crossings']])
    F, B = E['front'], E['back']
    print(' screen geometry  front', geo_signs(F, False), ' turned(back face, reflected)', geo_signs(B, True),
          ' mirrored(front reflected)', geo_signs(F, True), ' mirroredTurned(back face)', geo_signs(B, False))
    print(' physical half-turn of the front drawing (reflect x, swap over/under)', geo_signs(F, True, swap=True))
    V = jones(pd); Vm = jones(mirror_switch(pd, m)); Vt = jones(turn_over(pd, m))
    print(' Jones front', fmt(V)); print(' Jones mirror', fmt(Vm)); print(' Jones turned', fmt(Vt))
    print(' V(mirror) == V(front):', V == Vm, ' V(turned) == V(front):', V == Vt, ' V palindromic:', V == recip(V))
