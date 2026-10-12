"use client";

// Current is not used up. One loop: a battery and two identical bulbs in series.
// The learner moves an ammeter to any point on the loop; it reads the same
// everywhere. What each bulb takes is energy (half the battery voltage each).
//
// Physics: ideal battery (no internal resistance), ideal wires, two 6 ohm bulbs
// treated as fixed resistors. I = V / (R1 + R2); drop per bulb = I R; power I^2 R.
// Kirchhoff's current law: in a single loop the same current passes every point.
// The moving dots show the direction of conventional current; their speed is
// proportional to I but is not the real drift speed of electrons.
// The reveal unlocks once the ammeter has been placed between the bulbs.

import { Lesson } from "@/kit/Lesson";
import { Row, Slider } from "@/kit/controls";
import { useEffect, useRef, useState } from "react";
import s from "./styles.module.css";

const R_BULB = 6; // ohm each
const W = 300;
const H = 196;
const L = 44, R = 262, T = 46, B = 168; // loop corners, px
const BULB_X = [112, 196];
const SPOTS = [
  { name: "before bulb 1", x: 70, y: T },
  { name: "between bulbs", x: 154, y: T },
  { name: "after bulb 2", x: R, y: 110 },
  { name: "bottom wire", x: 152, y: B },
];

// loop path in the direction of conventional current: up the left side from the battery's + end
const PATH: [number, number][] = [
  [L, 120],
  [L, T],
  [R, T],
  [R, B],
  [L, B],
  [L, 120],
];
const SEGS = PATH.slice(1).map((p, i) => {
  const a = PATH[i];
  return { a, b: p, len: Math.hypot(p[0] - a[0], p[1] - a[1]) };
});
const LOOP = SEGS.reduce((n, sg) => n + sg.len, 0);

function along(d: number): [number, number] {
  let r = ((d % LOOP) + LOOP) % LOOP;
  for (const sg of SEGS) {
    if (r <= sg.len) {
      const f = r / sg.len;
      return [sg.a[0] + (sg.b[0] - sg.a[0]) * f, sg.a[1] + (sg.b[1] - sg.a[1]) * f];
    }
    r -= sg.len;
  }
  return PATH[0];
}

const N_DOTS = 22;

export default function CurrentLoop({ slug }: { slug: string }) {
  const [volts, setVolts] = useState(6);
  const [spot, setSpot] = useState(0);
  const [phase, setPhaseOffset] = useState(0);
  const [visitedBetween, setVisitedBetween] = useState(false);
  const [betweenV, setBetweenV] = useState(6); // battery voltage when the learner first looked between the bulbs
  const [visited, setVisited] = useState<number[]>([0]);
  const currentRef = useRef(0.5);

  const I = volts / (2 * R_BULB);
  currentRef.current = I;

  useEffect(() => {
    let raf = 0;
    let last: number | null = null;
    const tick = (now: number) => {
      if (last !== null) {
        const dt = Math.min(0.05, (now - last) / 1000);
        setPhaseOffset((p) => (p + dt * 40 * (currentRef.current / 0.5)) % LOOP);
      }
      last = now;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const drop = I * R_BULB;
  const glow = Math.min(1, (I * I * R_BULB) / 6); // 6 W at 12 V is full glow

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Two identical bulbs in series on one battery. An ammeter before bulb 1 reads 0.50 A. What does it read between the bulbs?",
        options: ["Less than 0.50 A", "0.50 A", "0 A"],
        answer: 1,
      }}
      exploreHint="Move the ammeter between the bulbs, then anywhere else on the loop."
      reveal={() => (
        <>
          <p>
            With the battery at {betweenV.toFixed(1)} V, the ammeter read{" "}
            <strong>{(betweenV / (2 * R_BULB)).toFixed(2)} A</strong> between the bulbs: the same as before bulb 1. Any
            spot on the loop reads the same. In a single loop, charge has nowhere to pile up or leak away, so the same current
            passes every point.
          </p>
          <p>
            What the bulbs use up is <strong>energy</strong>, not current. Each identical bulb turned half of the
            battery&rsquo;s 6 V into light and heat: 3 V each. A bigger battery raises the current everywhere at once.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const m = SPOTS[spot];
        const labelLeft = m.x > W - 70;
        const caption = locked
          ? "Make a prediction to start."
          : visited.length === SPOTS.length
            ? "Same reading at every spot. Bulbs take energy, not current."
            : visitedBetween
              ? "Between the bulbs: the same as before bulb 1. Try other spots."
            : "Dots show the current's direction. Move the ammeter.";

        return (
          <div className={s.wrap}>
            <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Series circuit; ammeter ${m.name} reads ${I.toFixed(2)} amps`}>
              {/* wires */}
              <polyline points={PATH.map((p) => p.join(",")).join(" ")} className={s.wire} />

              {/* battery on the left side: long plate (+) on top */}
              <rect x={L - 14} y={122} width={28} height={22} className={s.gap} />
              <line x1={L - 13} y1={126} x2={L + 13} y2={126} className={s.plateLong} />
              <line x1={L - 7} y1={136} x2={L + 7} y2={136} className={s.plateShort} />
              <text x={L - 18} y={129} textAnchor="end" className={s.label}>
                +
              </text>
              <text x={L + 18} y={150} className={s.label}>
                {volts.toFixed(1)} V
              </text>

              {/* moving charge (direction of conventional current) */}
              {!locked &&
                Array.from({ length: N_DOTS }, (_, k) => {
                  const [x, y] = along(phase + (k * LOOP) / N_DOTS);
                  if (y > 120 && y < 146 && Math.abs(x - L) < 1) return null;
                  return <circle key={k} cx={x} cy={y} r={2.2} className={s.charge} />;
                })}

              {/* bulbs */}
              {BULB_X.map((bx, i) => (
                <g key={bx}>
                  <circle cx={bx} cy={T} r={22} className={s.glow} style={{ opacity: 0.15 + 0.6 * glow }} />
                  <circle cx={bx} cy={T} r={11} className={s.bulb} />
                  <path d={`M ${bx - 7} ${T - 7} L ${bx + 7} ${T + 7} M ${bx - 7} ${T + 7} L ${bx + 7} ${T - 7}`} className={s.filament} />
                  <text x={bx} y={T - 28} textAnchor="middle" className={s.label}>
                    Bulb {i + 1}
                  </text>
                  {!locked && (
                    <text x={bx} y={T + 30} textAnchor="middle" className={s.drop}>
                      uses {drop.toFixed(1)} V
                    </text>
                  )}
                </g>
              ))}

              {/* ammeter */}
              <g className={s.meter}>
                <circle cx={m.x} cy={m.y} r={11} className={s.meterBody} />
                <text x={m.x} y={m.y + 4} textAnchor="middle" className={s.meterA}>
                  A
                </text>
                <rect
                  x={labelLeft ? m.x - 64 : m.x + (m.y === T ? -26 : 14)}
                  y={m.y === T ? m.y - 38 : m.y - 11}
                  width={52}
                  height={22}
                  rx={5}
                  className={s.readBox}
                />
                <text
                  x={(labelLeft ? m.x - 64 : m.x + (m.y === T ? -26 : 14)) + 26}
                  y={(m.y === T ? m.y - 38 : m.y - 11) + 15}
                  textAnchor="middle"
                  className={s.reading}
                >
                  {I.toFixed(2)} A
                </text>
              </g>
            </svg>

            <p className={s.caption} aria-live="polite">
              {caption}
            </p>

            <Row>
              <Slider
                label="Ammeter"
                value={spot}
                min={0}
                max={SPOTS.length - 1}
                step={1}
                disabled={locked}
                format={(v) => SPOTS[v].name}
                onChange={(v) => {
                  setSpot(v);
                  setVisited((vs) => (vs.includes(v) ? vs : [...vs, v]));
                  if (v === 1 && !visitedBetween) setBetweenV(volts);
                  const between = visitedBetween || v === 1;
                  setVisitedBetween(between);
                  if (between) interact();
                }}
              />
              <Slider
                label="Battery"
                value={volts}
                min={1.5}
                max={12}
                step={1.5}
                disabled={locked}
                format={(v) => `${v.toFixed(1)} V`}
                onChange={(v) => {
                  setVolts(v);
                  if (visitedBetween) interact();
                }}
              />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
