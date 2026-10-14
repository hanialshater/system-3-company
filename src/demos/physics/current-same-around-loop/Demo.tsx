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
// The reveal unlocks once the ammeter has been placed between the bulbs and at one other spot.
// v3: larger, higher-contrast dots (outlined) so the fading is visible; caption ties a bulb's V to energy taken.
// v2: spot buttons (ending between the bulbs on the QA path) replace the spot slider; dots fade
// after each bulb (energy handed over) while their number and speed stay the same (current);
// the battery steps by 2 V so the two bulb drops add up exactly; the reveal quotes the
// voltages the learner actually used.

import { Lesson } from "@/kit/Lesson";
import { Control, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
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

const D_BULB = [120 - T + (BULB_X[0] - L), 120 - T + (BULB_X[1] - L)]; // distance along the loop to each bulb
// Spots in DOM (button) order. "Before bulb 1" is where the ammeter starts; "between bulbs"
// comes last so the QA path (each button pressed once) ends there.
const ORDER = [0, 2, 3, 1];

export default function CurrentLoop({ slug }: { slug: string }) {
  const [volts, setVolts] = useState(6);
  const [spot, setSpot] = useState(0);
  const [phase, setPhaseOffset] = useState(0);
  const [betweenAt, setBetweenAt] = useState<number | null>(null); // battery volts when first looked between the bulbs
  const [visited, setVisited] = useState<number[]>([0]); // spots visited at the current battery voltage
  const [startV, setStartV] = useState<number | null>(null);
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
  const amps = (v: number) => (v / (2 * R_BULB)).toFixed(2);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Two identical bulbs in series on one battery. An ammeter before bulb 1 reads 0.50 A. What does it read between the bulbs?",
        options: ["Less than 0.50 A", "0.50 A", "0 A"],
        answer: 1,
      }}
      exploreHint="Move the ammeter round the loop, ending between the bulbs. Then change the battery."
      minInteractions={2}
      reveal={() => {
        const bv = betweenAt ?? 6;
        return (
          <>
            <p>
              At {bv} V the ammeter read <strong>{amps(bv)} A</strong> between the bulbs, the same as before bulb 1. In one
              loop, charge has nowhere to pile up or leak away, so the same current passes every point: the dots never
              bunched or thinned.
              {startV !== null && volts !== bv
                ? ` At ${volts} V it read ${amps(volts)} A: a bigger battery raises the current everywhere at once.`
                : ""}
            </p>
            <p>
              What the bulbs take is <strong>energy</strong>, not current: the dots faded after each bulb. Each identical
              bulb took half of the battery&rsquo;s {volts} V of push: {drop.toFixed(1)} V each.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["between", "another-spot"]}>
          {(reach) => {
            const m = SPOTS[spot];
            const labelLeft = m.x > W - 70;
            const caption = locked
              ? "A (amps): charge passing per second. V (volts): energy each charge carries."
              : visited.length === SPOTS.length
                ? `Same reading at all 4 spots at ${volts} V.`
                : spot === 1
                  ? "Between the bulbs, after bulb 1 took its share. Compare the reading."
                  : "Dots: charge. Bright = full of energy; each bulb drains some. Its V is the energy it takes.";

            const move = (v: number) => {
              setSpot(v);
              setVisited((vs) => (vs.includes(v) ? vs : [...vs, v]));
              if (v === 1) {
                if (betweenAt === null) setBetweenAt(volts);
                reach("between");
              } else if (v !== 0) reach("another-spot");
            };

            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Series circuit at ${volts} volts; ammeter ${m.name} reads ${I.toFixed(2)} amps`}>
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
                    {volts} V
                  </text>

                  {/* moving charge (direction of conventional current); brightness = energy left */}
                  {!locked &&
                    Array.from({ length: N_DOTS }, (_, k) => {
                      const d = (((phase + (k * LOOP) / N_DOTS) % LOOP) + LOOP) % LOOP;
                      const [x, y] = along(d);
                      if (y > 120 && y < 146 && Math.abs(x - L) < 1) return null;
                      const energy = d < D_BULB[0] ? 1 : d < D_BULB[1] ? 0.5 : 0.1;
                      return <circle key={k} cx={x} cy={y} r={3.4} className={s.charge} style={{ opacity: 0.12 + 0.88 * energy }} />;
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
                          takes {drop.toFixed(1)} V
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

                <div className={s.spots}>
                  {ORDER.map((i) => (
                    <Control
                      key={i}
                      className={i === spot ? "active" : ""}
                      disabled={locked || i === spot}
                      aria-pressed={i === spot}
                      onClick={() => move(i)}
                    >
                      {SPOTS[i].name}
                    </Control>
                  ))}
                </div>
                <Slider
                  label="Battery"
                  value={volts}
                  min={2}
                  max={12}
                  step={2}
                  disabled={locked}
                  format={(v) => `${v} V`}
                  onChange={(v) => {
                    setVolts(v);
                    setStartV((sv) => sv ?? volts);
                    setVisited([spot]);
                  }}
                />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
