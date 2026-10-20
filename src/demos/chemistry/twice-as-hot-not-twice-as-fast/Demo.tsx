"use client";

// A box of 30 air molecules and one speed bar. The learner drags the kelvin temperature;
// the molecules visibly speed up and the bar shows their typical (root-mean-square)
// speed against two marks: the 300 K start and twice that. Doubling the kelvins only
// gets the bar to 1.41x; it takes four times the kelvins (1,200 K) to reach 2x.

import { useEffect, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const K_B = 1.380649e-23; // J/K
const M_AIR = 28.97e-3 / 6.02214076e23; // kg per molecule, mean for dry air
const T0 = 300;
const vrms = (T: number) => Math.sqrt((3 * K_B * T) / M_AIR);
const V0 = vrms(T0);

const N = 30;
const BW = 320;
const BH = 170;
const R = 5;
const PX_PER_S_AT_T0 = 46; // on-screen speed of a typical molecule at 300 K

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Seeded start: positions, directions and a spread of relative speeds (Rayleigh-like, mean square 1).
const rnd = mulberry32(2718);
const START = Array.from({ length: N }, () => {
  const a = rnd() * Math.PI * 2;
  const sp = Math.sqrt(-Math.log(1 - rnd() * 0.98)); // mean square about 1
  return { x: R + rnd() * (BW - 2 * R), y: R + rnd() * (BH - 2 * R), dx: Math.cos(a) * sp, dy: Math.sin(a) * sp };
});

// Bar geometry
const BAR_Y = BH + 30;
const BAR_X = 8;
const BAR_W = BW - 16;
const BAR_MAX = 1100; // m/s
const bx = (v: number) => BAR_X + (v / BAR_MAX) * BAR_W;

function Box({ temp }: { temp: number }) {
  const refs = useRef<(SVGCircleElement | null)[]>([]);
  const state = useRef(START.map((p) => ({ ...p })));
  const scale = useRef(Math.sqrt(temp / T0));
  scale.current = Math.sqrt(temp / T0);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const k = PX_PER_S_AT_T0 * scale.current * dt;
      state.current.forEach((p, i) => {
        p.x += p.dx * k;
        p.y += p.dy * k;
        if (p.x < R) { p.x = 2 * R - p.x; p.dx = Math.abs(p.dx); }
        if (p.x > BW - R) { p.x = 2 * (BW - R) - p.x; p.dx = -Math.abs(p.dx); }
        if (p.y < R) { p.y = 2 * R - p.y; p.dy = Math.abs(p.dy); }
        if (p.y > BH - R) { p.y = 2 * (BH - R) - p.y; p.dy = -Math.abs(p.dy); }
        const el = refs.current[i];
        if (el) {
          el.setAttribute("cx", p.x.toFixed(1));
          el.setAttribute("cy", p.y.toFixed(1));
        }
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <rect x={0.5} y={0.5} width={BW - 1} height={BH - 1} rx={6} className={s.box} />
      {START.map((p, i) => (
        <circle key={i} ref={(el) => { refs.current[i] = el; }} cx={p.x} cy={p.y} r={R} className={s.molecule} />
      ))}
    </>
  );
}

export default function TwiceAsHot({ slug }: { slug: string }) {
  const [temp, setTemp] = useState(T0);
  const v = vrms(temp);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Your oven heats air from 300 K, a room at 27 °C, to 600 K (327 °C). Kelvin (K) is the temperature scale that starts at absolute zero. The typical speed of the air's molecules becomes about…",
        options: ["2 times as fast", "1.4 times as fast", "Unchanged"],
        answer: 1,
      }}
      exploreHint="Heat to 600 K and read the speed bar. Then heat to 1,200 K."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            At 600 K you saw the typical speed go from about 510 to about <strong>720 m/s</strong>: 1.41 times, not 2. At
            1,200 K, four times the kelvins, it reached about 1,020 m/s: double.
          </p>
          <p>
            Temperature tracks the average energy of motion, and energy grows with speed squared. So doubling the kelvins
            multiplies the speed by only √2 ≈ 1.41.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["at-600", "at-1200"]}>
        {(reach) => {
          const heat = (tk: number) => {
            setTemp(tk);
            if (tk === 600) reach("at-600");
            if (tk === 1200) reach("at-1200");
          };
          return (
        <div className={s.wrap}>
          <svg viewBox={`0 0 ${BW} ${BAR_Y + 30}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Air molecules at ${temp} kelvin, typical speed ${Math.round(v)} metres per second`}>
            <Box temp={temp} />
            {/* speed bar */}
            <rect x={BAR_X} y={BAR_Y - 7} width={BAR_W} height={14} rx={4} className={s.track} />
            <rect x={BAR_X} y={BAR_Y - 7} width={bx(v) - BAR_X} height={14} rx={4} className={s.bar} />
            <line x1={bx(V0)} x2={bx(V0)} y1={BAR_Y - 9} y2={BAR_Y + 9} className={s.mark} />
            <text x={bx(V0)} y={BAR_Y + 22} textAnchor="middle" className={s.markLabel}>
              300 K speed
            </text>
            <line x1={bx(2 * V0)} x2={bx(2 * V0)} y1={BAR_Y - 9} y2={BAR_Y + 9} className={s.mark2} />
            <text x={bx(2 * V0)} y={BAR_Y + 22} textAnchor="middle" className={s.markLabel}>
              2×
            </text>
            <text x={BAR_X} y={BAR_Y - 14} className={s.speed}>
              typical speed {Math.round(v / 10) * 10} m/s ({(v / V0).toFixed(2)}×)
            </text>
          </svg>
          <Row>
            <Control disabled={locked} onClick={() => heat(600)}>
              Heat to 600 K
            </Control>
            <Control disabled={locked} onClick={() => heat(1200)}>
              Heat to 1,200 K
            </Control>
          </Row>
          <Row>
            <Slider
              label="Temperature"
              value={temp}
              min={150}
              max={1200}
              step={50}
              disabled={locked}
              format={(t) => `${t} K (${t - 273} °C)`}
              onChange={heat}
            />
          </Row>
        </div>
          );
        }}
        </Milestones>
      )}
    </Lesson>
  );
}
