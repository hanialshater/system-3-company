"use client";

// Below critical mass. Toy market: a product costs $0.16 and is worth (1 - x) x share to person x.
// Each round, everyone whose value beats the price uses it, so next share = 1 - 0.16 / share
// (0 if share <= 0.16). One chart: that curve, the diagonal, and the run drawn as a cobweb.
// Fixed points 0, 0.2, 0.8; 0.2 is unstable. Key state: one run started below 20% (dies) and one above (climbs).

import { useState } from "react";
import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const PRICE = 0.16;
const TIP = 20; // percent
const LOW = 18;
const HIGH = 25;
const START = 50;
const MILESTONES = ["below-dies", "above-climbs"] as const;

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
      <p className={s.chip}>Toy model: value grows with users</p>
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
      </svg>
      <p className={s.msg} aria-live="polite">
        {locked ? "" : `Round ${round}: ${shown.map((x) => pct(x)).join(" → ")}%`} {verdict}
      </p>
      <Row>
        <Control className={`${s.tile} ${start === LOW && done ? "active" : ""}`} disabled={locked || (start === LOW && done)} onClick={() => go(LOW, "end")}>
          Start {LOW}%
        </Control>
        <Control className={`${s.tile} ${start === HIGH && done ? "active" : ""}`} disabled={locked || (start === HIGH && done)} onClick={() => go(HIGH, "end")}>
          Start {HIGH}%
        </Control>
      </Row>
      <Row>
        <Slider label="Start" value={start} min={0} max={100} disabled={locked} format={(v) => `${v}%`} onChange={(v) => go(v, 0)} />
        <Readout label="Round" value={locked ? "?" : round} />
        <Readout label="Share" value={locked ? "?" : `${pct(cur)}%`} />
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
      if (st < TIP) reach("below-dies");
      if (st > TIP) reach("above-climbs");
    }
  };
  return <Stage ctx={ctx} start={start} round={round} go={go} />;
}

export default function BelowCriticalMass({ slug }: { slug: string }) {
  const [below, setBelow] = useState<Ended | null>(null);
  const [above, setAbove] = useState<Ended | null>(null);
  const onEnded = (e: Ended) => {
    if (e.start < TIP) setBelow(e);
    if (e.start > TIP) setAbove(e);
  };
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A product costs $0.16. Its value to person x (x from 0 to 1 of the market) is (1 − x) times the share already using it. Each round, everyone whose value beats the price uses it. Launches start at ${LOW}% and ${HIGH}% of the market. Where do they end?`,
        options: [
          "Both reach about 80%",
          "Both die out",
          `The ${LOW}% launch dies; the ${HIGH}% launch reaches about 80%`,
        ],
        answer: 2,
      }}
      exploreHint={`Launch at ${LOW}% and at ${HIGH}%. Then slide the start toward ${TIP}%.`}
      minInteractions={MILESTONES.length}
      reveal={({ correct }) => (
        <>
          <p>
            {correct ? "" : "Not quite. "}
            {below && above ? (
              <>
                Your {below.start}% start died out in <strong>{below.rounds} rounds</strong>; your {above.start}% start climbed to{" "}
                <strong>{pct(above.end)}%</strong> in {above.rounds}.
              </>
            ) : (
              <>A start below {TIP}% dies out; one above it climbs to 80%.</>
            )}
          </p>
          <p>
            The curve meets the diagonal at 0%, {TIP}% and 80%, where a round changes nothing. {TIP}% is a <strong>tipping point</strong>: just
            below it the share shrinks each round, just above it grows. Below this critical mass, even a product worth buying fails.
          </p>
          <p className="muted">A toy model with made-up numbers: it shows the logic, not a forecast for any real product.</p>
        </>
      )}
    >
      {(ctx) => <Game ctx={ctx} onEnded={onEnded} />}
    </Lesson>
  );
}
