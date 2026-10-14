"use client";

// Shake faster, same speed. A 4 m rope (mass per length 0.1 kg/m) held at 0.4 N carries waves at
// v = sqrt(T/mu) = 2 m/s; 4x the tension (1.6 N) gives 4 m/s. The hand shakes f times a second
// (0.5, 1 or 2); the wavelength is v/f. The first crest leaves the hand a quarter period after the
// hand starts moving and reaches the far end L/v later: 2.0 s on the normal rope at every rate,
// 1.0 s on the tight one. Ideal rope: no damping, no dispersion, values illustrative.
// Numbers re-run in artifacts/scratch/cm-physics-r3/check.mjs and in node by demo-builder.
//
// One picture: the rope with the first crest tinted, its trip time, and a ruler between the first
// two crests when the first one arrives. The cause (the rope's tension) is a control on the stage.
// Each rate or tension chip sends a new wave at once (the brief's separate Send is folded into the
// chips so one press of each in DOM order reaches every milestone). A trip replays in at most
// 400 ms of wall time but reports simulated seconds.
// Earned reveal (v1): milestones "f1" (normal rope, 1/s), "f2" (normal, 2/s), "tight" (4x tension).
// QA path (DOM order): 0.5/s, 1/s (f1), 2/s (f2), Normal (disabled: already sent), 4x tighter (tight).

import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useEffect, useRef, useState } from "react";
import s from "./styles.module.css";

const L = 4; // m
const MU = 0.1; // kg/m
const TENSION = { normal: 0.4, tight: 1.6 } as const; // N
type Tension = keyof typeof TENSION;
const RATES = [0.5, 1, 2] as const;
type Rate = (typeof RATES)[number];
const speed = (tn: Tension) => Math.sqrt(TENSION[tn] / MU);
const WALL_MS_PER_S = 160; // wall ms per simulated s (longest trip, 2.5 s incl. the first quarter shake, = 400 ms)

type Config = { rate: Rate; tension: Tension };
const key = (c: Config) => `${c.tension}-${c.rate}`;
type Seen = { trip: number; lambda: number };
const MILESTONES = ["f1", "f2", "tight"] as const;
const rateLabel = (f: number) => (f === 0.5 ? "½" : String(f));

const W = 320;
const H = 160;
const X0 = 32;
const X1 = 300;
const K = (X1 - X0) / L; // px per m
const ROPE_Y = 70;
const AMP = 20;

export default function ShakeFasterSameSpeed({ slug }: { slug: string }) {
  const [config, setConfig] = useState<Config>({ rate: 1, tension: "normal" });
  const [sent, setSent] = useState<string | null>(null);
  const [seen, setSeen] = useState<Partial<Record<(typeof MILESTONES)[number], Seen>>>({});

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "You shake the rope's end twice as often. Compared with before, each crest now reaches the far end...",
        options: ["Twice as fast", "In the same time", "Half as fast"],
        answer: 1,
      }}
      exploreHint="Shake at 1 and at 2 a second, then make the rope tighter."
      minInteractions={3}
      reveal={() => {
        const a = seen.f1;
        const b = seen.f2;
        const c = seen.tight;
        const sec = (x?: Seen) => (x ? `${x.trip.toFixed(1)} s` : "?");
        const m = (x?: Seen) => (x ? `${x.lambda.toFixed(0)} m` : "?");
        return (
          <>
            <p>
              At 1 shake a second and at 2 a second, your crest took the same <strong>{sec(a)}</strong>
              {b && a && Math.abs(b.trip - a.trip) > 1e-9 ? ` and ${sec(b)}` : ""} to cross the {L} m rope:{" "}
              {a ? (L / a.trip).toFixed(0) : "?"} m/s both times. Shaking faster only packed the crests closer: {m(a)}{" "}
              apart, then {m(b)}.
            </p>
            <p>
              Speed is set by the rope, not your hand: when you made the rope four times tighter, the crest arrived in{" "}
              {sec(c)}, twice as fast. Wavelength equals speed divided by frequency.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Stage locked={locked} interact={interact} config={config} setConfig={setConfig} sent={sent} setSent={setSent} seen={seen} setSeen={setSeen} />
      )}
    </Lesson>
  );
}

function Stage(p: {
  locked: boolean;
  interact: () => void;
  config: Config;
  setConfig: (c: Config) => void;
  sent: string | null;
  setSent: (k: string | null) => void;
  seen: Partial<Record<(typeof MILESTONES)[number], Seen>>;
  setSeen: (x: Partial<Record<(typeof MILESTONES)[number], Seen>>) => void;
}) {
  const { locked, config, sent, seen } = p;
  const { reach } = useMilestones(p.interact, MILESTONES);
  const [tau, setTau] = useState(0); // simulated s since the hand started
  const raf = useRef(0);
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const v = speed(config.tension);
  const f = config.rate;
  const t0 = 1 / (4 * f); // the first crest leaves the hand
  const tEnd = t0 + L / v;
  const lambda = v / f;

  const send = (c: Config) => {
    const vv = speed(c.tension);
    const end = 1 / (4 * c.rate) + L / vv;
    const rec: Seen = { trip: L / vv, lambda: vv / c.rate };
    p.setConfig(c);
    p.setSent(key(c));
    const next = { ...seen };
    if (c.tension === "normal" && c.rate === 1) next.f1 = rec;
    if (c.tension === "normal" && c.rate === 2) next.f2 = rec;
    if (c.tension === "tight") next.tight = rec;
    p.setSeen(next);
    if (next.f1) reach("f1");
    if (next.f2) reach("f2");
    if (next.tight) reach("tight");
    cancelAnimationFrame(raf.current);
    setTau(0);
    let start: number | null = null;
    const tick = (now: number) => {
      if (start === null) start = now;
      const tt = Math.min(end, (now - start) / WALL_MS_PER_S);
      setTau(tt);
      if (tt < end) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  };

  const active = sent === key(config);
  const tt = active ? tau : 0;
  const done = active && tt >= tEnd - 1e-9;
  const y = (x: number) => (x <= v * tt ? AMP * Math.sin(2 * Math.PI * f * (tt - x / v)) : 0);
  const pts: string[] = [];
  for (let i = 0; i <= 136; i++) {
    const x = (L * i) / 136;
    pts.push(`${(X0 + x * K).toFixed(1)},${(ROPE_Y - y(x)).toFixed(1)}`);
  }
  const crestX = tt >= t0 ? Math.min(L, v * (tt - t0)) : null;
  const trip = tt >= t0 ? Math.min(L / v, tt - t0) : 0;
  const handY = ROPE_Y - y(0);
  const busy = active && !done;
  const isSent = (c: Config) => key(c) === sent && !busy;

  return (
    <div className={s.wrap}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={`stage-svg ${s.fit}`}
        role="img"
        aria-label={`Rope, ${config.tension === "tight" ? "four times tighter" : "normal tension"}, shaken ${f} times a second${done ? `; crest crossed in ${(L / v).toFixed(1)} s` : ""}`}
      >
        <text x={8} y={14} className={s.label}>
          {locked ? "crest trip ? s" : `crest trip ${trip.toFixed(1)} s`}
        </text>
        {/* far-end post */}
        <rect x={X1} y={ROPE_Y - 34} width={8} height={68} rx={2} className={s.post} />
        {/* rope */}
        <polyline points={pts.join(" ")} className={config.tension === "tight" ? s.ropeTight : s.rope} />
        {/* hand */}
        <rect x={X0 - 22} y={handY - 9} width={20} height={18} rx={6} className={s.hand} />
        {/* the tinted first crest */}
        {!locked && crestX !== null && <circle cx={X0 + crestX * K} cy={ROPE_Y - y(crestX)} r={6} className={s.crest} />}
        {/* ruler between the first two crests when the first arrives */}
        {done && lambda <= L + 1e-9 && (
          <g className={s.ruler}>
            <line x1={X0 + (L - lambda) * K} y1={ROPE_Y + 34} x2={X1} y2={ROPE_Y + 34} />
            <line x1={X0 + (L - lambda) * K} y1={ROPE_Y + 28} x2={X0 + (L - lambda) * K} y2={ROPE_Y + 40} />
            <line x1={X1} y1={ROPE_Y + 28} x2={X1} y2={ROPE_Y + 40} />
            <text x={X0 + (L - lambda / 2) * K} y={ROPE_Y + 50} textAnchor="middle" className={s.rulerLabel}>
              {lambda.toFixed(0)} m apart
            </text>
          </g>
        )}
        <text x={W - 8} y={14} textAnchor="end" className={s.chip}>
          {L} m rope
        </text>
        {/* the record */}
        {!locked &&
          MILESTONES.map((k, i) => {
            const r = seen[k];
            if (!r) return null;
            const tag = k === "f1" ? "1/s" : k === "f2" ? "2/s" : "tight";
            return (
              <text key={k} x={8 + i * 106} y={H - 6} className={s.seen}>
                {k === "tight" ? `${tag}: ${r.trip.toFixed(1)} s` : `${tag}: ${r.trip.toFixed(1)} s, ${r.lambda.toFixed(0)} m`}
              </text>
            );
          })}
      </svg>

      <Row>
        {RATES.map((r) => {
          const c = { rate: r, tension: config.tension };
          return (
            <Control key={r} className={config.rate === r ? "active" : ""} disabled={locked || isSent(c)} onClick={() => send(c)}>
              {rateLabel(r)} / s
            </Control>
          );
        })}
      </Row>
      <Row>
        {(["normal", "tight"] as Tension[]).map((tn) => {
          const c = { rate: config.rate, tension: tn };
          return (
            <Control key={tn} className={config.tension === tn ? "active" : ""} disabled={locked || isSent(c)} onClick={() => send(c)}>
              {tn === "normal" ? "Normal rope" : "4× tighter"}
            </Control>
          );
        })}
      </Row>
    </div>
  );
}
