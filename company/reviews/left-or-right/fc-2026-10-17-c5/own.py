# Fact-check left-or-right c5 (v3), fresh instance, 2026-10-17. Kit-free; numpy-free.
# Run: python3 -I company/reviews/left-or-right/fc-2026-10-17-c5/own.py
import math

# A. The claim's rule, as worded: plus when the over-strand passes from left to right
#    as seen by a traveller moving along the under-strand. Screen frame: x right, y up.
def rule(o, u):
    right = (u[1], -u[0])          # traveller heading along u: right hand
    d = o[0] * right[0] + o[1] * right[1]
    return 1 if d > 0 else -1

# B. 3-D curves -> projected crossings -> signs by the rule.
def crossings(curves, view):
    """curves: list of closed polylines (lists of 3-D points). view(p) -> (X, Y, depth); larger depth = nearer viewer."""
    segs = []
    for ci, pts in enumerate(curves):
        n = len(pts)
        for k in range(n):
            segs.append((ci, k, pts[k], pts[(k + 1) % n], n))
    out = []
    P = [(s, view(s[2]), view(s[3])) for s in segs]
    for a in range(len(P)):
        for b in range(a + 1, len(P)):
            (sa, a0, a1), (sb, b0, b1) = P[a], P[b]
            if sa[0] == sb[0] and (abs(sa[1] - sb[1]) <= 1 or abs(sa[1] - sb[1]) >= sa[4] - 1):
                continue
            dax, day = a1[0] - a0[0], a1[1] - a0[1]
            dbx, dby = b1[0] - b0[0], b1[1] - b0[1]
            den = dax * dby - day * dbx
            if abs(den) < 1e-12:
                continue
            t = ((b0[0] - a0[0]) * dby - (b0[1] - a0[1]) * dbx) / den
            s = ((b0[0] - a0[0]) * day - (b0[1] - a0[1]) * dax) / den
            if 0 <= t < 1 and 0 <= s < 1:
                za = a0[2] + t * (a1[2] - a0[2])
                zb = b0[2] + s * (b1[2] - b0[2])
                da, db = (dax, day), (dbx, dby)
                o, u = (da, db) if za > zb else (db, da)
                out.append(rule(o, u))
    return out

N = 600
# Helix handedness (geometric definition): (cos t, sin t, c t), c > 0, turning counter-clockwise seen from
# above while rising, is right-handed (right-hand rule: fingers curl with the turn, thumb along the axis).
def helix_pair(c, turns=3):
    A, B = [], []
    for k in range(N):
        t = 2 * math.pi * turns * k / N
        A.append((math.cos(t), math.sin(t), c * t))
        B.append((-math.cos(t), -math.sin(t), c * t))
    # open strands: close them far away so the closing arcs add no crossings with each other in this view
    return A, B
def side_view(p):  # viewer on +y looking along -y; screen right = world -x, up = world z, depth = y
    return (-p[0], p[2], p[1])

def open_crossings(A, B, view):
    # only crossings between the two strands (no closing), strands oriented the same way
    out = []
    for i in range(len(A) - 1):
        a0, a1 = view(A[i]), view(A[i + 1])
        for j in range(len(B) - 1):
            b0, b1 = view(B[j]), view(B[j + 1])
            dax, day = a1[0] - a0[0], a1[1] - a0[1]
            dbx, dby = b1[0] - b0[0], b1[1] - b0[1]
            den = dax * dby - day * dbx
            if abs(den) < 1e-12:
                continue
            t = ((b0[0] - a0[0]) * dby - (b0[1] - a0[1]) * dbx) / den
            s = ((b0[0] - a0[0]) * day - (b0[1] - a0[1]) * dax) / den
            if 0 <= t < 1 and 0 <= s < 1:
                za = a0[2] + t * (a1[2] - a0[2]); zb = b0[2] + s * (b1[2] - b0[2])
                o, u = ((dax, day), (dbx, dby)) if za > zb else ((dbx, dby), (dax, day))
                out.append(rule(o, u))
    return out

print("B1 right-handed double helix, side view, signs:", open_crossings(*helix_pair(+0.3), side_view))
print("B2 left-handed double helix,  side view, signs:", open_crossings(*helix_pair(-0.3), side_view))

# C. Torus trefoil T(2,3) and its 3-D mirror image and its turned-over copy, top view (viewer on +z).
def trefoil(m=1):
    pts = []
    for k in range(N):
        t = 2 * math.pi * k / N
        r = 2 + math.cos(3 * t)
        pts.append((r * math.cos(2 * t), r * math.sin(2 * t), m * math.sin(3 * t)))
    return pts
top = lambda p: (p[0], p[1], p[2])
T = trefoil(1)
M = [(x, y, -z) for (x, y, z) in T]            # mirror in the plane z = 0 (a reflection)
TO = [(-x, y, -z) for (x, y, z) in T]          # rotate 180 deg about the screen's y-axis (a motion)
MTO = [(-x, y, -z) for (x, y, z) in M]
for name, C in [("T", T), ("mirror(T)", M), ("turnover(T)", TO), ("turnover(mirror(T))", MTO)]:
    sg = crossings([C], top)
    print("C", name, "signs", sg, "sum", sum(sg))

# D. PD codes. X[i,j,k,l]: labels counter-clockwise from the incoming under-edge i.
#    Put i at the south (under heading north, u = (0,1)); j east, k north, l west.
#    Over runs j->l (east to west, o = (-1,0)) when l follows j along the knot, else l->j (o = (1,0)).
def follows(a, b, n2):  # b is the edge after a
    return b == a % n2 + 1
def pd_signs(pd):
    n2 = 2 * len(pd)
    out = []
    for (i, j, k, l) in pd:
        o = (-1, 0) if follows(j, l, n2) else (1, 0)
        out.append(rule(o, (0, 1)))
    return out
def pd_mirror(pd):  # switch every crossing: the over-strand's incoming edge becomes the new i
    n2 = 2 * len(pd)
    return [(j, k, l, i) if follows(j, l, n2) else (l, i, j, k) for (i, j, k, l) in pd]
def pd_reflect(pd):  # planar reflection: cyclic order reverses, heights kept
    return [(i, l, k, j) for (i, j, k, l) in pd]
def pd_turnover(pd):  # turning over = planar reflection + every height reversed
    return pd_mirror(pd_reflect(pd))
def parse(s):
    a = [int(c) for c in s]
    return [tuple(a[4 * c:4 * c + 4]) for c in range(len(a) // 4)]
K31 = parse("142536415263")  # src/kit/knots/table.mjs line 11
for name, pd in [("front", K31), ("turned", pd_turnover(K31)), ("mirrored", pd_mirror(K31)),
                 ("mirroredTurned", pd_turnover(pd_mirror(K31)))]:
    sg = pd_signs(pd)
    s = sum(sg)
    hand = "Left-handed" if s < 0 else "Right-handed" if s > 0 else ""
    print("D 3_1", name, pd, "signs", sg, "sum", s, hand)
