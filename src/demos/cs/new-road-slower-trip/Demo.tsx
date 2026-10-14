"use client";

// Braess's paradox on a 4-node road network (spec company/design/specs/new-road-slower-trip.md,
// binding changes in company/design/reviews/2026-10-14-design-review-ncm-specs.md §1).
// 4,000 drivers go S to E. S→A and B→E take cars/100 min; A→E and S→B take 45; the link A→B takes 0.
// With s drivers on S→A→B→E and the rest split evenly: new route 40 + s/100, old routes 65 + s/200.
// Switch 1,000 moves 1,000 drivers (500 from each old route) only while the new route is faster.

import { useEffect, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control } from "@/kit/controls";
import s from "./styles.module.css";

const N = 4000;
const STEP = 1000;
const R = 16; // node radius
const HEAD_L = 12; // arrowhead length
const HEAD_W = 14; // arrowhead base: 8 px wider than the widest (6 px) road
const MILESTONES = ["link-open", "nobody-gains"] as const;

const busyCars = (k: number) => 2000 + k / 2; // cars on S→A (and on B→E)
const newRoute = (k: number) => (2 * busyCars(k)) / 100; // S→A + A→B (0) + B→E
const oldRoute = (k: number) => busyCars(k) / 100 + 45;
const BEFORE = 2000 / 100 + 45; // 65
const width = (cars: number) => 2 + (4 * cars) / N;
const fmt = (n: number) => n.toLocaleString("en-US");

const P = { S: [40, 170], A: [170, 70], B: [170, 270], E: [300, 170] } as const;
type Node = keyof typeof P;

function Road({ from, to, cls, w, ink }: { from: Node; to: Node; cls: string; w: number; ink: string }) {
  const [x1, y1] = P[from];
  const [x2, y2] = P[to];
  const d = Math.hypot(x2 - x1, y2 - y1);
  const ux = (x2 - x1) / d;
  const uy = (y2 - y1) / d;
  const tip = [x2 - ux * R, y2 - uy * R];
  const base = [tip[0] - ux * HEAD_L, tip[1] - uy * HEAD_L];
  const h = HEAD_W / 2;
  return (
    <g>
      <line
        x1={x1 + ux * R}
        y1={y1 + uy * R}
        x2={base[0] + ux}
        y2={base[1] + uy}
        className={`${s.road} ${cls}`}
        style={{ strokeWidth: w, stroke: ink }}
      />
      <polygon
        points={`${tip[0]},${tip[1]} ${base[0] - uy * h},${base[1] + ux * h} ${base[0] + uy * h},${base[1] - ux * h}`}
        style={{ fill: ink }}
      />
    </g>
  );
}

function Pill({ at, text, ring }: { at: [number, number]; text: string; ring: boolean }) {
  return (
    <g className={ring ? s.ring : undefined}>
      <rect x={at[0] - 16} y={at[1] - 10} width={32} height={20} rx={10} className={s.pill} />
      <text x={at[0]} y={at[1] + 4.5} className={s.pillText}>
        {text}
      </text>
    </g>
  );
}

/** A legend swatch drawn with the same class as the road it names. */
const Swatch = ({ cls }: { cls: string }) => (
  <svg width="20" height="10" viewBox="0 0 20 10" className={s.swatch} aria-hidden>
    <line x1="1" y1="5" x2="19" y2="5" className={`${s.road} ${cls}`} style={{ strokeWidth: 2, stroke: "var(--fg)" }} />
  </svg>
);

const Faster = () => (
  <svg width="10" height="9" viewBox="0 0 10 9" className={s.mark} role="img" aria-label="faster">
    <polygon points="5,0 10,9 0,9" />
  </svg>
);

function Stage({ locked, phase, interact, onSeen }: {
  locked: boolean; phase: string; interact: () => void; onSeen: (k: number) => void;
}) {
  const { reach } = useMilestones(interact, MILESTONES);
  const [after, setAfter] = useState(false);
  const [k, setK] = useState(0); // drivers on the new route (the run's state)
  const [shown, setShown] = useState(0); // what the stage draws (catches up with k during Run)
  const [stepped, setStepped] = useState(false); // last action moved drivers: ring the changed pills

  useEffect(() => {
    if (shown >= k) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setShown(k);
    const t = setTimeout(() => setShown((v) => Math.min(k, v + STEP)), 100);
    return () => clearTimeout(t);
  }, [shown, k]);

  const reveal = phase === "reveal";
  const linkOn = after || reveal; // the reveal pins the stage to After at the furthest s reached
  const canMove = linkOn && !locked && !reveal && k < N && newRoute(k) < oldRoute(k);

  const move = (to: number) => {
    setK(to);
    setShown(Math.min(to, k + STEP));
    setStepped(true);
    onSeen(to);
    if (to >= N) reach("nobody-gains");
  };
  const step = () => move(k + STEP);
  const run = () => {
    let t = k;
    while (t < N && newRoute(t) < oldRoute(t)) t += STEP;
    move(t);
  };

  const v = linkOn ? shown : 0;
  const cars = linkOn ? busyCars(v) : 2000;
  const nw = newRoute(v);
  const od = linkOn ? oldRoute(v) : BEFORE;
  const busyW = width(cars);
  const ink = "var(--fg)";
  const ring = linkOn && stepped;
  const label = linkOn
    ? `With the link: ${fmt(v)} drivers on the new route, ${nw} minutes; switching back takes ${od}; before the link, ${BEFORE}`
    : `Before the link: ${fmt(2000)} drivers on each route, ${BEFORE} minutes`;

  return (
    <div className={s.wrap}>
      <p className={s.rule}>
        4,000 drivers, each on the fastest route. <Swatch cls={s.busy} /> Solid roads: cars ÷ 100 min.{" "}
        <Swatch cls={s.fixed} /> Dashed: 45 min.
      </p>
      <svg viewBox="0 44 340 250" className={`stage-svg ${s.svg}`} role="img" aria-label={label}>
        <Road from="S" to="A" cls={s.busy} w={busyW} ink={ink} />
        <Road from="B" to="E" cls={s.busy} w={busyW} ink={ink} />
        <Road from="A" to="E" cls={s.fixed} w={2} ink={ink} />
        <Road from="S" to="B" cls={s.fixed} w={2} ink={ink} />
        <Road from="A" to="B" cls={s.link} w={linkOn ? width(v) : 2} ink={linkOn ? ink : "var(--line)"} />
        {(Object.keys(P) as Node[]).map((n) => (
          <g key={n}>
            <circle cx={P[n][0]} cy={P[n][1]} r={R} className={s.node} />
            <text x={P[n][0]} y={P[n][1] + 5} className={s.nodeText}>
              {n}
            </text>
          </g>
        ))}
        <Pill at={[105, 120]} text={String(cars / 100)} ring={ring} />
        <Pill at={[235, 220]} text={String(cars / 100)} ring={ring} />
        <Pill at={[235, 120]} text="45" ring={false} />
        <Pill at={[105, 220]} text="45" ring={false} />
        <Pill at={[170, 170]} text="0" ring={false} />
      </svg>

      <div className={s.readout} aria-live="polite">
        <span>
          <small>On new route</small>
          <b>{linkOn ? fmt(v) : "–"}</b>
        </span>
        <span className={linkOn && nw < od ? s.win : ""}>
          <small>New route</small>
          <b>
            {locked ? "?" : linkOn ? nw : "–"}
            {linkOn && nw < od && <Faster />}
          </b>
        </span>
        <span className={linkOn && od < nw ? s.win : ""}>
          <small>Old route</small>
          <b>{od}</b>
        </span>
      </div>

      <div className={s.controls}>
        <div className={s.chips} role="group" aria-label="Road network">
          <Control
            className={`${s.tap} ${!linkOn ? "active" : ""}`}
            disabled={locked || reveal || !after}
            aria-pressed={!linkOn}
            aria-label="Before the new link"
            onClick={() => {
              setAfter(false);
              setStepped(false);
            }}
          >
            Before
          </Control>
          <Control
            className={`${s.tap} ${linkOn ? "active" : ""}`}
            disabled={locked || reveal || after}
            aria-pressed={linkOn}
            aria-label="After the new link opens"
            onClick={() => {
              setAfter(true);
              setStepped(false);
              onSeen(k);
              if (k === 0) reach("link-open");
            }}
          >
            After
          </Control>
        </div>
        <Control className={s.tap} disabled={!canMove} onClick={step}>
          Switch 1,000
        </Control>
        <Control className={s.tap} disabled={!canMove} onClick={run}>
          Run
        </Control>
      </div>
    </div>
  );
}

export default function NewRoadSlowerTrip({ slug }: { slug: string }) {
  const [seen, setSeen] = useState<number[]>([]);
  const onSeen = (k: number) => setSeen((xs) => (xs.includes(k) ? xs : [...xs, k]));
  const furthest = Math.max(0, ...seen);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "4,000 drivers go from S to E. Each route has one busy road (cars ÷ 100 minutes) and one fixed 45-minute road, so today every trip takes 65 minutes. A free link from A to B opens, and every driver takes the fastest route for them. How long does a trip take then?",
        options: ["About 40 min", "65 min, unchanged", "80 min"],
        answer: 2,
      }}
      exploreHint="Press After to open the link. Then move drivers with Switch 1,000, and Run to the end."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            With nobody on it, the new route took {newRoute(0)} against {oldRoute(0)}, so drivers moved to it.
            {seen.includes(2000) && ` At 2,000 it was still faster: ${newRoute(2000)} against ${oldRoute(2000)}.`}{" "}
            At {fmt(furthest)} it takes <strong>{newRoute(furthest)}</strong>, and switching back would take{" "}
            {oldRoute(furthest)}, so nobody leaves. Before the link every trip took {BEFORE}.
          </p>
          <p>
            Each driver made the best choice for themselves, and every one of them lost{" "}
            {newRoute(furthest) - BEFORE} minutes. A free road made every trip slower. This is Braess&apos;s paradox.
          </p>
          <p className="muted">
            A model with these numbers. A new road does not slow every network, but it can.
          </p>
        </>
      )}
    >
      {({ locked, phase, interact }) => <Stage locked={locked} phase={phase} interact={interact} onSeen={onSeen} />}
    </Lesson>
  );
}
