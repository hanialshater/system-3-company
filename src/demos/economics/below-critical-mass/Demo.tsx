"use client";

// Below critical mass. Toy market: a product costs $0.16 and is worth (1 - x) x share to person x
// (people differ; the learner is told this in plain words, not as a formula).
// Each round, everyone whose value beats the price uses it, so next share = 1 - 0.16 / share
// (0 if share <= 0.16). One chart: that curve, the diagonal, and the run drawn as a cobweb.
// Fixed points 0, 0.2, 0.8; 0.2 is unstable. Key states: the question's launches (18, 25) and the
// two starts hugging the tipping point (19 dies, 21 climbs); the learner must run all four.

import { useState } from "react";
import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const PRICE = 0.16;
const TIP = 20; // percent
const LOW = 18;
const HIGH = 25;
const EDGE_LO = 19;
const EDGE_HI = 21;
const PRESETS = [LOW, EDGE_LO, EDGE_HI, HIGH];
const START = 50;
const MILESTONES = ["launch-low", "launch-high", "edge-below", "edge-above"] as const;

const next = (x: number) => (x > PRICE ? 1 - PRICE / x : 0);

/** Shares by round from a whole-percent start; stops when a round moves less than half a point. */
function run(startPct: number): number[] {
  const a = [startPct / 100];
  for (let i = 0; i < 60; i++) {
    const cur = a[a.length - 1];
    const n = next(cur);
    a.push(n);
    if (n === 0 || Math.abs(n - cur) < 0.005) break;
  }
  return a;
}
const pct = (x: number) => Math.round(x * 100);

interface Ended {
  start: number;
  rounds: number;
  end: number;
}

// Plot geometry (viewBox 320 x 200): share now 0..100% across, next share 0..100% up.
const L = 34;
const R = 300;
const TOP = 12;
const BOT = 176;
const px = (x: number) => L + x * (R - L);
const py = (y: number) => BOT - y * (BOT - TOP);

function Stage({
  ctx,
  start,
  round,
  go,
}: {
  ctx: StageContext;
  start: number;
  round: number;
  go: (start: number, round: number | "end") => void;
}) {
  const { locked } = ctx;
  const path = run(start);
  const last = path.length - 1;
  const done = round >= last;
  const shown = path.slice(0, round + 1);
  const cur = shown[round];

  const curve: string[] = [];
  for (let i = 0; i <= 100; i++) curve.push(`${px(i / 100)},${py(next(i / 100))}`);

  // Cobweb: up from the axis to the curve, across to the diagonal, repeat.
  const web: string[] = [`${px(shown[0])},${py(0)}`];
  for (let i = 0; i < round; i++) {
    web.push(`${px(shown[i])},${py(shown[i + 1])}`, `${px(shown[i + 1])},${py(shown[i + 1])}`);
  }

  const verdict = !done
    ? ""
    : cur === 0
      ? "Dies out."
      : Math.abs(cur - TIP / 100) < 0.01
        ? "Holds at 20%."
        : `Settles near ${pct(cur)}%.`;

  return (
    <div className={s.wrap}>
      <p className={s.chip}>Toy market · price $0.16 · more users, more value</p>
      <svg
        viewBox="0 0 320 200"
        className="stage-svg"
        role="img"
        aria-label={locked ? "Next share against share now" : `Start ${start}%, round ${round}, share ${pct(cur)}%`}
      >
        <line x1={L} y1={TOP} x2={L} y2={BOT} stroke="var(--line)" />
        <line x1={L} y1={BOT} x2={R} y2={BOT} stroke="var(--line)" />
        {[0, 50, 100].map((k) => (
          <text key={k} x={px(k / 100)} y={BOT + 14} textAnchor={k === 0 ? "start" : k === 100 ? "end" : "middle"} className={s.axis}>
            {k}%
          </text>
        ))}
        <text x={L + 4} y={TOP + 8} className={s.axis}>
          next
        </text>
        <text x={R} y={BOT - 6} textAnchor="end" className={s.axis}>
          now
        </text>
        {!locked && (
          <>
            <line x1={px(0)} y1={py(0)} x2={px(1)} y2={py(1)} className={s.ghost} />
            <polyline points={curve.join(" ")} className={s.line} />
            {round > 0 && <polyline points={web.join(" ")} className={s.web} />}
            <circle cx={px(cur)} cy={py(cur)} r={6} className={s.dot} />
          </>
        )}
        {locked && (
          <text x={(L + R) / 2} y={(TOP + BOT) / 2} textAnchor="middle" className={s.axis}>
            The chart appears after you answer
          </text>
        )}
      </svg>
      <p className={s.msg} aria-live="polite">
        {locked ? "" : `Round ${round}: ${shown.map((x) => pct(x)).join(" → ")}%`} {verdict}
      </p>
      <Row>
        {PRESETS.map((p) => (
          <Control
            key={p}
            className={`${s.tile} ${start === p && done ? "active" : ""}`}
            aria-label={`Start ${p}%`}
            disabled={locked || (start === p && done)}
            onClick={() => go(p, "end")}
          >
            {p}%
          </Control>
        ))}
      </Row>
      <Row>
        <Slider label="Start" value={start} min={0} max={100} disabled={locked} format={(v) => `${v}%`} onChange={(v) => go(v, 0)} />
      </Row>
      <Row>
        <Control className={s.tile} disabled={locked || done} onClick={() => go(start, round + 1)}>
          Step
        </Control>
        <Control className={s.tile} disabled={locked || done} onClick={() => go(start, "end")}>
          To the end
        </Control>
      </Row>
    </div>
  );
}

function Game({ ctx, onEnded }: { ctx: StageContext; onEnded: (e: Ended) => void }) {
  const { reach } = useMilestones(ctx.interact, MILESTONES);
  const [start, setStart] = useState(START);
  const [round, setRound] = useState(0);
  const go = (st: number, r: number | "end") => {
    const path = run(st);
    const rr = r === "end" ? path.length - 1 : Math.min(r, path.length - 1);
    setStart(st);
    setRound(rr);
    if (rr === path.length - 1 && rr > 0) {
      onEnded({ start: st, rounds: rr, end: path[rr] });
      if (st < TIP) reach("launch-low");
      if (st > TIP) reach("launch-high");
      if (st === EDGE_LO) reach("edge-below");
      if (st === EDGE_HI) reach("edge-above");
    }
  };
  return <Stage ctx={ctx} start={start} round={round} go={go} />;
}

export default function BelowCriticalMass({ slug }: { slug: string }) {
  const [below, setBelow] = useState<Ended | null>(null);
  const [above, setAbove] = useState<Ended | null>(null);
  // Keep the finished run on each side that sits closest to the tipping point.
  const onEnded = (e: Ended) => {
    if (e.start < TIP && (!below || TIP - e.start <= TIP - below.start)) setBelow(e);
    if (e.start > TIP && (!above || e.start - TIP <= above.start - TIP)) setAbove(e);
  };
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A new product costs $0.16. People differ in how much they want it, and the more of the market already uses it, the more it is worth to each person. Each round, everyone who now values it above $0.16 starts using it. Two launches start with ${LOW}% and ${HIGH}% of the market. Where do they end up?`,
        options: [
          "Both stay near where they started",
          `The ${LOW}% launch fades to nothing; the ${HIGH}% launch grows to about 80%`,
          "Both grow to about 80%",
          "Both fade to nothing",
        ],
        answer: 1,
      }}
      exploreHint={`Launch ${LOW}% and ${HIGH}%. Then squeeze the gap: ${EDGE_LO}% against ${EDGE_HI}%. Where does the line fall?`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            {below && above ? (
              <>
                Starting at {below.start}%, the share died out in <strong>{below.rounds} rounds</strong>. Starting at {above.start}%, it climbed to{" "}
                <strong>{pct(above.end)}%</strong> in {above.rounds}.
              </>
            ) : (
              <>A start below {TIP}% dies out; one above it climbs to 80%.</>
            )}
          </p>
          <p>
            The line is a <strong>tipping point</strong> at {TIP}%: a round changes nothing there, or at 0% and 80%. With few users the product is worth less than its
            price to most people, so even fewer join. Below this critical mass, a product that most people would buy if others used it still fails.
          </p>
          <p className="muted">A toy model with made-up numbers: it shows the logic, not a forecast for any real product.</p>
        </>
      )}
    >
      {(ctx) => <Game ctx={ctx} onEnded={onEnded} />}
    </Lesson>
  );
}
