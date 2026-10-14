"use client";

// Duck rides the wave. Deep-water linear wave, period T = 4 s, height 0.2 m (amplitude a = 0.1 m).
// From w^2 = g k: wavelength 25.0 m, crest speed c = 6.25 m/s. The duck moves with the surface water;
// its path is integrated exactly as in artifacts/scratch/cm-physics-r4/check.mjs (Lagrangian particle
// in u = a w e^{kz} cos(kx - wt), w_z = a w e^{kz} sin(kx - wt), dt = 1 ms): one loop about 0.19 m
// across per wave, and a net drift of 0.15 m after 10 waves (Stokes drift w k a^2 = 0.004 m/s), while
// the crests travel 250 m. "1 wave" and "10 waves" draw a steady train that already fills the sea.
// "Watch the buoy" draws a train whose front starts at the duck at t = 0. In deep water the front, and
// the energy, move at the group speed c_g = dw/dk = c/2 = 3.12 m/s while the crests run through the
// train at c and fade at its front, so the buoy 100 m away starts to bob at 100 / 3.12 = 32 s.
// (v1 moved the front at c, 16 s, as the brief had it; disputed by the 2026-10-14 fact-check, W-707.)
// Brief: company/domains/briefs/physics.md round 4, #58.
//
// One picture: a side-view band of sea, 2.45 px per m across; heights drawn 80 px per m (magnified,
// disclosed in the caption). The duck's own path is drawn magnified (90 px per m) in an inset on the
// duck. Earned reveal: milestones "one-wave", "ten-waves" (the question's case), "buoy". Values are
// recorded in the Seen row when each fires. Each preset replays its simulated span in 400 ms.
// QA path (DOM order): 1 wave passes, 10 waves pass, Watch the buoy.

import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useEffect, useMemo, useState } from "react";
import s from "./styles.module.css";

const G = 9.81;
const PERIOD = 4; // s
const A = 0.1; // m
const OMEGA = (2 * Math.PI) / PERIOD;
const K = (OMEGA * OMEGA) / G;
const LAMBDA = (2 * Math.PI) / K; // 25.0 m
const C = OMEGA / K; // 6.25 m/s
const BUOY = 100; // m
const C_G = C / 2; // 3.12 m/s, deep-water group speed
const BUOY_T = BUOY / C_G; // 32 s
const SPAN = 40; // s simulated
const MILESTONES = ["one-wave", "ten-waves", "buoy"] as const;

type Preset = "one" | "ten" | "buoy";
const END: Record<Preset, number> = { one: PERIOD, ten: 10 * PERIOD, buoy: BUOY_T };

// duck path, sampled every 0.01 s
function simulate() {
  const dt = 0.001;
  const xs: number[] = [];
  const zs: number[] = [];
  let x = 0;
  let z = 0;
  for (let i = 0; i <= SPAN / dt; i++) {
    if (i % 10 === 0) {
      xs.push(x);
      zs.push(z);
    }
    const t = i * dt;
    const ph = K * x - OMEGA * t;
    const f = A * OMEGA * Math.exp(K * z);
    x += f * Math.cos(ph) * dt;
    z += f * Math.sin(ph) * dt;
  }
  return { xs, zs };
}

const W = 320;
const H = 150;
const X0 = 30; // px of the duck's start
const PXM = 2.45; // px per m across
const VY = 80; // px per m up (magnified)
const YM = 92; // mean water line, px
const X = (m: number) => X0 + m * PXM;
const INSET = { x: 4, y: 4, w: 70, h: 48 };
const IK = 90; // inset px per m

function useAnim(key: string) {
  const [p, setP] = useState(1);
  useEffect(() => {
    if (key === "") return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / 400);
      setP(k);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    setP(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [key]);
  return p;
}

export default function DuckRidesTheWave({ slug }: { slug: string }) {
  const sim = useMemo(simulate, []);
  const [preset, setPreset] = useState<Preset | null>(null);
  const [runs, setRuns] = useState(0);
  const [seen, setSeen] = useState<{ loop?: number; drift?: number; crests?: number; buoy?: number }>({});
  const p = useAnim(preset === null ? "" : `${preset}-${runs}`);

  const at = (t: number) => {
    const i = Math.max(0, Math.min(sim.xs.length - 1, Math.round(t * 100)));
    return { x: sim.xs[i], z: sim.zs[i] };
  };
  const loopWidth = () => {
    let lo = 0;
    let hi = 0;
    for (let i = 0; i <= PERIOD * 100; i++) {
      lo = Math.min(lo, sim.xs[i]);
      hi = Math.max(hi, sim.xs[i]);
    }
    return hi - lo;
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Ocean waves roll past a floating duck for 40 seconds. No wind, no current. Where does the duck end up?",
        options: ["Carried along with the crests", "Close to where it started", "Pulled back against the waves"],
        answer: 1,
      }}
      exploreHint="Let one wave pass, then ten, and watch the duck's loop."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            In one wave your duck looped about {seen.loop?.toFixed(1) ?? "?"} m across and came back, while
            the crest moved on {Math.round(C * PERIOD)} m. After ten waves the crests had travelled{" "}
            {seen.crests !== undefined ? Math.round(seen.crests) : "?"} m and your duck had shifted only about{" "}
            <strong>{seen.drift?.toFixed(2) ?? "?"} m</strong>.
          </p>
          <p>
            The buoy {BUOY} m away began to bob at {seen.buoy !== undefined ? Math.round(seen.buoy) : "?"} s, not{" "}
            {Math.round(BUOY / C)}: a wave&apos;s energy travels at half its crest speed. It carried energy there, not water. Each bit of water just circles and hands the motion on. Near the shore, where waves break,
            the water does rush forward.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const run = (pr: Preset) => {
              setPreset(pr);
              setRuns((n) => n + 1);
              if (pr === "one") {
                setSeen((x) => ({ ...x, loop: loopWidth() }));
                reach("one-wave");
              }
              if (pr === "ten") {
                setSeen((x) => ({ ...x, drift: at(10 * PERIOD).x, crests: C * 10 * PERIOD }));
                reach("ten-waves");
              }
              if (pr === "buoy") {
                setSeen((x) => ({ ...x, buoy: BUOY_T }));
                reach("buoy");
              }
            };
            const tEnd = preset === null || locked ? 0 : END[preset];
            const t = tEnd * p;
            const train = preset === "buoy" && !locked;
            const front = C_G * t; // m, front of the wave train (starts at the duck), at the group speed
            // surface height above the calm level. 1 and 10 waves: a steady train (no front). Buoy: the
            // crests move at C inside an envelope whose front, eased over half a wavelength, moves at C_G.
            const eta = (m: number) => {
              if (preset === null || locked) return 0;
              const env = train ? Math.max(0, Math.min(1, (front - m) / (LAMBDA / 2) + 0.5)) : 1;
              return env * A * Math.cos(K * m - OMEGA * t);
            };
            const surf: string[] = [];
            for (let px = 0; px <= W; px += 2) surf.push(`${px},${YM - VY * eta((px - X0) / PXM)}`);
            const duck = at(t);
            const dx = X(duck.x);
            // the duck starts on a crest top (z = 0); its loop is centred a below that
            const dy = preset === null || locked ? YM : YM - VY * (duck.z + A);
            // inset trace
            const n = Math.round(t * 100);
            const trace: string[] = [];
            const icx = INSET.x + 22;
            const icy = INSET.y + 7;
            for (let i = 0; i <= n; i += 2) trace.push(`${icx + sim.xs[i] * IK},${icy - sim.zs[i] * IK}`);
            const leadCrest = C * t; // the tinted crest is the leading one
            const buoyY = YM - VY * eta(BUOY);
            const label =
              preset === null || locked
                ? ""
                : preset === "one"
                  ? `crest moved ${Math.round(C * t)} m`
                  : preset === "ten"
                    ? `crests moved ${Math.round(C * t)} m · duck moved ${duck.x.toFixed(2)} m`
                    : t >= BUOY_T - 1e-6
                      ? `buoy starts to bob at ${Math.round(BUOY_T)} s`
                      : `t = ${t.toFixed(0)} s`;
            const caption = locked ? "Make a prediction to start." : "Heights and the duck's path drawn magnified.";
            const seenText = [
              `1 wave: ${seen.loop !== undefined ? `loop ${seen.loop.toFixed(1)} m` : "–"}`,
              `10 waves: ${seen.drift !== undefined && seen.crests !== undefined ? `duck ${seen.drift.toFixed(2)} m, crests ${Math.round(seen.crests)} m` : "–"}`,
              `buoy: ${seen.buoy !== undefined ? `${Math.round(seen.buoy)} s` : "–"}`,
            ].join(" · ");
            return (
              <div className={s.wrap}>
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className={`stage-svg ${s.fit}`}
                  role="img"
                  aria-label={locked ? "A duck on a calm sea with a buoy 100 m away" : `${caption} ${label}`}
                >
                  {/* water */}
                  <polygon points={`0,${H - 22} ${surf.join(" ")} ${W},${H - 22}`} className={s.water} />
                  <polyline points={surf.join(" ")} className={s.surface} />
                  {/* the leading crest, tinted */}
                  {!locked && preset !== null && !train && leadCrest > 1 && X(leadCrest) < W && (
                    <circle cx={X(leadCrest)} cy={YM - VY * eta(leadCrest)} r={4} className={s.crest} />
                  )}
                  {/* the train's front (buoy preset) */}
                  {train && (
                    <g>
                      <line x1={X(front)} y1={YM - 12} x2={X(front)} y2={YM + 12} className={s.front} />
                      <text x={X(front)} y={YM + 23} textAnchor="middle" className={s.small}>
                        front {C_G.toFixed(1)} m/s
                      </text>
                    </g>
                  )}
                  {/* buoy */}
                  <line x1={X(BUOY)} y1={buoyY} x2={X(BUOY)} y2={buoyY - 18} className={s.post} />
                  <path d={`M${X(BUOY) - 6},${buoyY} L${X(BUOY) + 6},${buoyY} L${X(BUOY)},${buoyY - 10} Z`} className={s.buoy} />
                  <text x={X(BUOY)} y={buoyY - 22} textAnchor="middle" className={s.lab}>
                    buoy
                  </text>
                  {/* duck */}
                  <g transform={`translate(${dx},${dy})`}>
                    <ellipse cx={0} cy={-4} rx={9} ry={5} className={s.duck} />
                    <circle cx={7} cy={-11} r={4} className={s.duck} />
                    <path d="M10,-11 L15,-10 L10,-9 Z" className={s.beak} />
                  </g>
                  {/* inset: the duck's own path, magnified */}
                  <rect x={INSET.x} y={INSET.y} width={INSET.w} height={INSET.h} rx={6} className={s.inset} />
                  <line x1={dx} y1={dy - 16} x2={INSET.x + 22} y2={INSET.y + INSET.h} className={s.leader} />
                  <circle cx={icx} cy={icy} r={1.6} className={s.start} />
                  {trace.length > 1 && <polyline points={trace.join(" ")} className={s.loop} />}
                  <text x={INSET.x + INSET.w / 2} y={INSET.y + INSET.h - 4} textAnchor="middle" className={s.small}>
                    duck&apos;s path
                  </text>
                  {/* ruler */}
                  <line x1={X(0)} y1={H - 14} x2={X(BUOY)} y2={H - 14} className={s.ruler} />
                  {[0, 25, 50, 75, 100].map((m) => (
                    <g key={m}>
                      <line x1={X(m)} y1={H - 17} x2={X(m)} y2={H - 11} className={s.ruler} />
                      <text x={X(m)} y={H - 2} textAnchor="middle" className={s.small}>
                        {m === 100 ? "100 m" : m}
                      </text>
                    </g>
                  ))}
                  {label && (
                    <text x={W - 4} y={18} textAnchor="end" className={s.labD}>
                      {label}
                    </text>
                  )}
                </svg>

                <p className={s.caption} aria-live="polite">
                  {caption}
                </p>
                <p className={s.seen}>Seen: {seenText}</p>

                <Row>
                  <Control className={preset === "one" ? "active" : ""} disabled={locked} onClick={() => run("one")}>
                    1 wave passes
                  </Control>
                  <Control className={preset === "ten" ? "active" : ""} disabled={locked} onClick={() => run("ten")}>
                    10 waves pass
                  </Control>
                  <Control className={preset === "buoy" ? "active" : ""} disabled={locked} onClick={() => run("buoy")}>
                    Watch the buoy
                  </Control>
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
