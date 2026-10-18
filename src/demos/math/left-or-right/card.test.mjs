// Builder tests for left-or-right (spec company/design/specs/left-or-right.md, builder obligations 2 and 3;
// PE-C2, DL-C5, L-1; brief checks K17, K19, K21).
// Run from the repo root: node --test src/demos/math/left-or-right/card.test.mjs
// (Node 22.18 or later strips card.ts's types; on older Node add --import ./tests/lifehacks/register.mjs.)
// The drawings are made exactly as Demo.tsx makes them: L = layout(knot(n).pd) once, both faces
// draw(..., { layout: L, gap: 0.5 }), default size and margin. turnOver is called for numbers only.
import test from "node:test";
import assert from "node:assert/strict";
import * as K from "../../../kit/knots/index.mjs";
import { STATES, logicalPd, geoSigns, calibrate, placeBadges, screenX } from "./card.ts";

const KNOTS = ["3_1", "4_1"];
const faces = (n) => {
  const pd = K.knot(n).pd;
  const L = K.layout(pd);
  return { pd, front: K.draw(pd, { layout: L, gap: 0.5 }), back: K.draw(K.mirror(pd), { layout: L, gap: 0.5 }) };
};
const ops = { mirror: K.mirror, turnOver: K.turnOver };

// K19 / K21: the expected readouts, written out so a change in the kit cannot silently move both sides.
const EXPECT = {
  "3_1": { front: [-1, -1, -1], turned: [-1, -1, -1], mirrored: [1, 1, 1], mirroredTurned: [1, 1, 1] },
  "4_1": { front: [-1, 1, -1, 1], turned: [-1, 1, -1, 1], mirrored: [1, -1, 1, -1], mirroredTurned: [1, -1, 1, -1] },
};

test("the readout of each rest state is the brief's K19/K21 table", () => {
  for (const n of KNOTS) {
    const { pd } = faces(n);
    for (const st of STATES) assert.deepEqual(K.signs(logicalPd(st, pd, ops)), EXPECT[n][st.name], `${n} ${st.name}`);
  }
});

test("K21: signs read from each rest state's drawn lines on screen equal the readout (8 states)", () => {
  for (const n of KNOTS) {
    const f = faces(n);
    const k = calibrate(f.front);
    assert.ok(k === 1 || k === -1, `${n}: geometry sign formula is consistent with draw()'s own signs`);
    for (const st of STATES) {
      const D = st.face === "front" ? f.front : f.back;
      const screen = geoSigns(D, st.reflect).map((s) => s * k);
      assert.deepEqual(screen, K.signs(logicalPd(st, f.pd, ops)), `${n} ${st.name}`);
    }
  }
});

test("negative control: an unreflected back face (the C1 failure) shows the mirror, not the turned-over knot", () => {
  for (const n of ["3_1"]) {
    const f = faces(n);
    const k = calibrate(f.front);
    const wrong = geoSigns(f.back, false).map((s) => s * k);
    assert.notDeepEqual(wrong, K.signs(K.turnOver(f.pd)), "an unreflected mirror drawing must not read as turned over");
    assert.deepEqual(wrong, K.signs(K.mirror(f.pd)));
  }
});

test("PE-C1 numbers: crossing 0's screen x on each rest state (spec obligation 1)", () => {
  const want = { "3_1": [82.0, 18.0], "4_1": [96.4, 3.6] };
  for (const n of KNOTS) {
    const f = faces(n);
    assert.equal(f.front.crossings[0].x, f.back.crossings[0].x, "both faces share the stored layout");
    const x = f.front.crossings[0].x;
    for (const st of STATES) {
      const sx = screenX(st, x);
      const expect = st.reflect ? want[n][1] : want[n][0];
      assert.ok(Math.abs(sx - expect) < 0.05, `${n} ${st.name}: ${sx} vs ${expect}`);
    }
  }
});

test("L-1: badge edge to strand edge is at least 2.0 units on all 8 rest states (28 badges)", () => {
  let count = 0;
  let worst = { gap: Infinity, where: "" };
  for (const n of KNOTS) {
    const f = faces(n);
    for (const st of STATES) {
      const D = st.face === "front" ? f.front : f.back;
      const badges = placeBadges(D, st.reflect);
      for (const b of badges) {
        count++;
        assert.ok(b.gap >= 2.0, `${n} ${st.name} crossing ${b.i}: gap ${b.gap.toFixed(2)}`);
        if (b.gap < worst.gap) worst = { gap: b.gap, where: `${n} ${st.name} crossing ${b.i}` };
        // No badge reads as another crossing's: farther from every other crossing than from its own ring.
        for (const c of D.crossings)
          if (c.i !== b.i) assert.ok(Math.hypot(screenX(st, c.x) - b.x, c.y - b.y) > 30, `${n} ${st.name} badge ${b.i} near crossing ${c.i}`);
      }
    }
  }
  assert.equal(count, 28);
  // Spec: the minimum is 2.43 units, at 4_1's crossing 0 (the right-hand beak), turned and mirrored + turned.
  assert.ok(Math.abs(worst.gap - 2.43) < 0.01, `minimum ${worst.gap.toFixed(3)} at ${worst.where}`);
  assert.match(worst.where, /^4_1 (turned|mirroredTurned) crossing 0$/);
});
