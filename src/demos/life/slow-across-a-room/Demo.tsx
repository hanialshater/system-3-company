"use client";

// Diffusion as a picture of space (across) and time (down). 30 sugar molecules
// start together and random-walk in one dimension; their paths run down the
// plot. Typical spread obeys x^2 = 2 D t with D = 5e-10 m^2/s, so 10 um takes
// 0.1 s and 1 mm takes 1,000 s. The learner picks a distance; the line shows
// when the typical spread reaches it. Seeded random walks.

import { useMemo, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const STOPS = [10, 20, 50, 100, 200, 300, 500, 700, 1000]; // micrometres
const T_MAX = 1200; // seconds shown
const DT = 5; // seconds per walk step
const WALKERS = 30;
const PX_MM = 105; // px per millimetre
const CX = 164;
const TOP = 16;
const PX_S = 250 / T_MAX;

const tOf = (um: number) => um * um * 1e-3; // seconds, from x^2 = 2Dt with D = 5e-10 m^2/s

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// paths[w][k] = position in mm after k steps of DT seconds.
const PATHS = (() => {
  const r = rng(424242);
  const sd = Math.sqrt(1e-3 * DT); // mm per step: 2D = 1e-3 mm^2/s
  return Array.from({ length: WALKERS }, () => {
    const p = [0];
    for (let k = 1; k <= T_MAX / DT; k++) {
      const z = Math.sqrt(-2 * Math.log(1 - r())) * Math.cos(2 * Math.PI * r());
      p.push(p[k - 1] + sd * z);
    }
    return p;
  });
})();

function when(t: number) {
  if (t < 1) return `${t.toFixed(1)} s`;
  if (t < 90) return `${Math.round(t)} s`;
  return `${Math.round(t).toLocaleString("en-US")} s (${Math.round(t / 60)} min)`;
}

const dist = (um: number) => (um >= 1000 ? `${um / 1000} mm` : `${um} µm`);

export default function SlowAcrossARoom({ slug }: { slug: string }) {
  const [i, setI] = useState(0);
  const hit = useRef(new Set<string>());
  const um = STOPS[i];
  const t = tOf(um);
  const y = TOP + t * PX_S;
  const k = Math.min(PATHS[0].length - 1, Math.round(t / DT));

  const trails = useMemo(
    () =>
      PATHS.map((p) =>
        p
          .slice(0, k + 1)
          .map((x, j) => `${j ? "L" : "M"}${(CX + x * PX_MM).toFixed(1)} ${(TOP + j * DT * PX_S).toFixed(1)}`)
          .join(" "),
      ),
    [k],
  );
  const edge = useMemo(() => {
    const pts: string[] = [];
    for (let tt = 0; tt <= T_MAX; tt += 10) pts.push(`${(Math.sqrt(tt / 1000) * PX_MM).toFixed(1)} ${(TOP + tt * PX_S).toFixed(1)}`);
    return pts;
  }, []);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "By diffusion alone, a sugar molecule typically spreads 10 micrometres (one cell's width) in about 0.1 second. About how long to spread 1 millimetre, 100 times farther?",
        options: ["About 10 seconds", "About 17 minutes", "About 3 hours"],
        answer: 1,
      }}
      exploreHint="Pick a cell's width, then 1 mm, and see how far down the line moves."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Diffusion time grows with distance <em>squared</em>. 100 times farther took 100 &times; 100 = 10,000 times
            longer: 0.1 s &times; 10,000 = 1,000 seconds, <strong>about 17 minutes</strong>.
          </p>
          <p>
            On the plot the cloud&rsquo;s edge is a curve, not a straight line: twice as far takes four times as long.
            So diffusion is quick across a cell and hopeless across a body; large animals move oxygen and food by blood
            flow instead.
          </p>
          <p className="muted">
            Typical spread in one direction: distance&sup2; = 2 &times; D &times; time, with D = 5 &times; 10&#8315;&sup1;&#8304;
            m&sup2;/s, roughly a sugar molecule in water. Single molecules arrive sooner or later than this.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const go = (ni: number) => {
          setI(ni);
          const mark = (key: string) => {
            if (!hit.current.has(key)) {
              hit.current.add(key);
              interact();
            }
          };
          if (STOPS[ni] <= 100) mark("small");
          if (STOPS[ni] === 1000) mark("mm");
        };
        const dx = (um / 1000) * PX_MM;
        return (
          <div className={s.wrap}>
            <svg viewBox="0 0 300 278" className={`stage-svg ${s.svg}`} role="img" aria-label={`Spreading ${dist(um)} takes about ${when(t)}`}>
              <line x1={CX} x2={CX} y1={TOP} y2={TOP + 250} className={s.axis} />
              {[-1, -0.5, 0.5, 1].map((mm) => (
                <g key={mm}>
                  <line x1={CX + mm * PX_MM} x2={CX + mm * PX_MM} y1={TOP} y2={TOP + 250} className={s.grid} />
                  <text x={CX + mm * PX_MM} y={TOP - 4} textAnchor="middle" className={s.tick}>
                    {Math.abs(mm)} mm
                  </text>
                </g>
              ))}
              {!locked && (
                <>
                  {[5, 10, 15, 20].map((m) => (
                    <text key={m} x={2} y={TOP + m * 60 * PX_S + 3} className={s.tick}>
                      {m} min
                    </text>
                  ))}
                  {trails.map((d, w) => (
                    <path key={w} d={d} className={s.trail} />
                  ))}
                  <path d={`M${edge.map((p) => `${CX + Number(p.split(" ")[0])} ${p.split(" ")[1]}`).join(" L")}`} className={s.edge} />
                  <path d={`M${edge.map((p) => `${CX - Number(p.split(" ")[0])} ${p.split(" ")[1]}`).join(" L")}`} className={s.edge} />
                  <line x1={CX - dx} x2={CX + dx} y1={y} y2={y} className={s.now} />
                  {PATHS.map((p, w) => (
                    <circle key={w} cx={CX + p[k] * PX_MM} cy={y} r={2.6} className={s.mol} />
                  ))}
                  <text x={2} y={TOP - 4} className={s.tick}>time ↓</text>
                </>
              )}
              <circle cx={CX} cy={TOP} r={4} className={s.start} />
            </svg>

            <p className={s.msg} aria-live="polite">
              {locked
                ? "Make a prediction to start. Molecules start together at the top and wander."
                : `Typical spread reaches ${dist(um)} after ${when(t)}.`}
            </p>

            <Slider
              label="Distance"
              value={i}
              min={0}
              max={STOPS.length - 1}
              disabled={locked}
              format={(v) => dist(STOPS[v])}
              onChange={go}
            />
            <Row>
              <Control className={s.chip} disabled={locked || i === 0} onClick={() => go(0)}>
                10 µm (a cell)
              </Control>
              <Control className={s.chip} disabled={locked || i === STOPS.length - 1} onClick={() => go(STOPS.length - 1)}>
                1 mm
              </Control>
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
