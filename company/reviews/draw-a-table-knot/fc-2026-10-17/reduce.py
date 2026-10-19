# Own Reidemeister I/II reducer on unoriented PD (positions 0,2 = under strand, 1,3 = over strand,
# counter-clockwise). A diagram that reduces to zero crossings by R1/R2 moves is the unknot.
# Each R2 is only taken on a bigon face found by own face tracing (Euler check F = n + 2).
import json, sys

def faces(pd):
    darts = [(x, p) for x in range(len(pd)) for p in range(4)]
    where = {}
    for x, p in darts: where.setdefault(pd[x][p], []).append((x, p))
    def other(x, p):
        a, b = where[pd[x][p]]
        return b if a == (x, p) else a
    seen, out = set(), []
    for d in darts:
        if d in seen: continue
        f, cur = [], d
        while cur not in seen:
            seen.add(cur); f.append(cur)
            y, q = other(*cur)
            cur = (y, (q + 1) % 4)
        out.append(f)
    return out

def glue(pd, u, v):
    return [[v if e == u else e for e in x] for x in pd]

def step(pd):
    n = len(pd)
    F = faces(pd)
    assert len(F) == n + 2, ('euler', len(F), n)
    # R1: a monogon face
    for f in F:
        if len(f) == 1:
            x, p = f[0]
            # edge pd[x][p] leaves position p and returns at an adjacent position; drop crossing x
            c = pd[x]
            loop = c[p]
            rest = [e for e in c if e != loop]
            if len(rest) != 2: continue
            new = [y for i, y in enumerate(pd) if i != x]
            return ('R1', x), glue(new, rest[0], rest[1]) if rest[0] != rest[1] else new
    # R2: a bigon face whose two edges are both over at one crossing and both under at the other
    for f in F:
        if len(f) != 2: continue
        (x, p), (y, q) = f
        if x == y: continue
        X, Y = pd[x], pd[y]
        shared = [e for e in X if e in Y]
        if len(set(shared)) != 2: continue
        e1, e2 = sorted(set(shared))
        px = {e: X.index(e) for e in (e1, e2)}; py = {e: Y.index(e) for e in (e1, e2)}
        # same strand parity at both ends of each edge means that strand is over (or under) at both
        if px[e1] % 2 != py[e1] % 2 or px[e2] % 2 != py[e2] % 2: continue
        if px[e1] % 2 == px[e2] % 2: continue
        cont = lambda C, pos: C[(pos + 2) % 4]
        a1, b1 = cont(X, px[e1]), cont(Y, py[e1])
        a2, b2 = cont(X, px[e2]), cont(Y, py[e2])
        new = [z for i, z in enumerate(pd) if i not in (x, y)]
        if a1 != b1: new = glue(new, a1, b1)
        if a2 != b2:
            a2b = b1 if a2 == a1 else a2
            new = glue(new, a2b, b2) if a2b != b2 else new
        return ('R2', x, y), new
    return None, pd

def reduce(pd):
    moves = []
    while pd:
        m, pd2 = step(pd)
        if m is None: break
        moves.append(m); pd = pd2
    return moves, pd

if __name__ == '__main__':
    kit = json.load(open(sys.argv[1]))
    src = open(sys.argv[0].replace('reduce.py', 'own.py')).read().split('kit = json.load')[0]
    ns = {}; exec(src, ns); switch = ns['switch']  # own crossing change, no kit code
    for name in ('3_1', '6_1', '5_2'):
        pd = kit[name]
        print(name, 'base Euler faces', len(faces(pd)), 'n+2 =', len(pd) + 2, 'reduces to', len(reduce(pd)[1]))
        for i in range(len(pd)):
            mv, left = reduce(switch(pd, i))
            print(f'  switch {i}: R-moves {mv} -> {len(left)} crossings left {left}')
