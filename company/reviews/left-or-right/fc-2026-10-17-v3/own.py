# fact-checker, left-or-right v3 (2026-10-17): own sign check for c3 / c6, written fresh (kit code not imported).
# Part A: kit PD for 3_1 (copied as data from src/kit/knots/table.mjs via knot('3_1').pd), own sign rule,
#         own mirror and own turn-over on the PD.
# Part B: kit-free 3D trefoil (torus knot), rotate/reflect in space, project, read crossing signs numerically.
# Sign rule (PMC2853108 Fig. 2E): turn over-arrow o onto under-arrow u through < 180 deg; clockwise negative,
# otherwise positive  <=>  o_x u_y - o_y u_x > 0  is positive.
import math

PD31 = [[1, 4, 2, 5], [3, 6, 4, 1], [5, 2, 6, 3]]  # X[i,j,k,l]: ccw from incoming under i; under runs i -> k
N = 6

def nxt(a):
    return a % N + 1

def sign(x):
    i, j, k, l = x
    # place i south, j east, k north, l west (counter-clockwise); under runs south -> north, u = (0, 1)
    if l == nxt(j):
        o = (-1, 0)  # over runs east -> west
    elif j == nxt(l):
        o = (1, 0)   # over runs west -> east
    else:
        raise ValueError(x)
    u = (0, 1)
    return 1 if o[0] * u[1] - o[1] * u[0] > 0 else -1

def switch(x):
    # every crossing switched: the over strand becomes the under strand; restart at its incoming edge
    i, j, k, l = x
    return [j, k, l, i] if l == nxt(j) else [l, i, j, k]

def reflect_plane(x):
    # left-right reflection of the drawing: ccw order becomes cw; still start at incoming under i
    i, j, k, l = x
    return [i, l, k, j]

def mirror(pd):
    return [switch(x) for x in pd]

def turn_over(pd):
    # half-turn about an axis in the page = planar reflection + every crossing switched
    return [switch(reflect_plane(x)) for x in pd]

states = {
    "front": PD31,
    "turned": turn_over(PD31),
    "mirror": mirror(PD31),
    "mirror_then_turned": turn_over(mirror(PD31)),
}
print("Part A (kit PD, own rule)")
for name, pd in states.items():
    s = [sign(x) for x in pd]
    print(f"  {name:20s} signs {s} sum {sum(s):+d}")

# Part B: 3D trefoil, kit-free
def curve(t):
    return ((2 + math.cos(3 * t)) * math.cos(2 * t), (2 + math.cos(3 * t)) * math.sin(2 * t), math.sin(3 * t))

M = 1200
P0 = [curve(2 * math.pi * s / M) for s in range(M)]

def rot_y180(p):  # turn over: half-turn about the page's vertical axis
    return (-p[0], p[1], -p[2])

def refl_z(p):  # mirror in the page plane
    return (p[0], p[1], -p[2])

def crossing_signs(P):
    n = len(P)
    segs = [(P[a], P[(a + 1) % n]) for a in range(n)]
    out = []
    for a in range(n):
        p1, p2 = segs[a]
        for b in range(a + 2, n):
            if a == 0 and b == n - 1:
                continue
            q1, q2 = segs[b]
            r = (p2[0] - p1[0], p2[1] - p1[1]); s = (q2[0] - q1[0], q2[1] - q1[1])
            den = r[0] * s[1] - r[1] * s[0]
            if abs(den) < 1e-15:
                continue
            w = (q1[0] - p1[0], q1[1] - p1[1])
            t = (w[0] * s[1] - w[1] * s[0]) / den
            v = (w[0] * r[1] - w[1] * r[0]) / den
            if 0 <= t < 1 and 0 <= v < 1:
                za = p1[2] + t * (p2[2] - p1[2]); zb = q1[2] + v * (q2[2] - q1[2])  # viewer at +z
                o, u = (r, s) if za > zb else (s, r)
                out.append(1 if o[0] * u[1] - o[1] * u[0] > 0 else -1)
    return out

print("Part B (3D torus trefoil, viewer at +z)")
for name, f in [("front", lambda p: p), ("turned", rot_y180), ("mirror", refl_z),
                ("mirror_then_turned", lambda p: rot_y180(refl_z(p)))]:
    s = crossing_signs([f(p) for p in P0])
    print(f"  {name:20s} signs {s} sum {sum(s):+d}")
