"use client";

// Two eggs, 100 floors. The learner picks WHEN egg 1 breaks (1st drop, 2nd, 3rd, 4th, or never) and two plans answer:
// A drops at 50 and halves what is left; B uses shrinking gaps. An adversary makes egg 2's climb as long as it can
// be (the break is always on the last floor egg 2 tests). Plan B's gaps are computed from the rule "each gap is one
// floor shorter", never typed in, and there is no control that starts the plan at its own answer.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const FLOORS = 100;
const CHIPS = ["1st", "2nd", "3rd", "4th", "Never"] as const;

type Run = { floors: number[]; broke: number | null; lo: number; drops: number };

// Egg-1 drop floors for each plan. A: halve what is left. B: gaps shrink by one each drop, starting where the
// gaps first cover the building (smallest g with g(g+1)/2 >= 100).
function planA(): number[] {
  const out: number[] = [];
  let lo = 0;
  while (lo < FLOORS) {
    lo += Math.ceil((FLOORS - lo) / 2);
    out.push(lo);
  }
  return out;
}
function planB(): number[] {
  let g = 1;
  while ((g * (g + 1)) / 2 < FLOORS) g++;
  const out: number[] = [];
  let lo = 0;
  while (lo < FLOORS) {
    lo = Math.min(FLOORS, lo + g);
    g--;
    out.push(lo);
  }
  return out;
}
const PLANS = { A: planA(), B: planB() };

// Egg 1 breaks on its (k+1)th drop (k = 0..3), or never (k = 4).
function run(plan: number[], k: number): Run {
  if (k >= 4 || k >= plan.length) return { floors: plan, broke: null, lo: FLOORS, drops: plan.length };
  const floors = plan.slice(0, k + 1);
  const f = floors[k];
  const lo = k === 0 ? 0 : floors[k - 1];
  // egg 2 climbs lo+1 .. f-1 one at a time, and the break is as late as possible
  return { floors, broke: f, lo, drops: k + 1 + (f - 1 - lo) };
}

function Tower({ x, run: r, title, hidden }: { x: number; run: Run | null; title: string; hidden: boolean }) {
  const top = 24;
  const bottom = 184;
  const y = (f: number) => bottom - ((bottom - top) * f) / FLOORS;
  const W = 28;
  return (
    <g>
      <text x={x - 14} y={12} className={s.title}>
        {title}
      </text>
      <rect x={x} y={top} width={W} height={bottom - top} rx={3} fill="var(--bg-2)" stroke="var(--line)" />
      <text x={x - 4} y={top + 4} textAnchor="end" className={s.axis}>
        100
      </text>
      <text x={x - 4} y={bottom} textAnchor="end" className={s.axis}>
        0
      </text>
      {!hidden && r && (
        <>
          {r.broke !== null && r.broke - 1 > r.lo && (
            <rect x={x} y={y(r.broke - 1)} width={W} height={y(r.lo) - y(r.broke - 1)} fill="var(--domain)" fillOpacity={0.45} />
          )}
          {r.floors.map((f, i) => (
            <line key={i} x1={x} x2={x + W} y1={y(f)} y2={y(f)} stroke="var(--fg)" strokeWidth={1.5} />
          ))}
          {r.broke !== null && (
            <text x={x + W / 2} y={y(r.broke) + 4} textAnchor="middle" fill="var(--bad)" fontSize={14} fontWeight={800}>
              ✕
            </text>
          )}
        </>
      )}
    </g>
  );
}

function Stage({
  locked,
  tries,
  setTries,
  cur,
  setCur,
  reach,
}: {
  locked: boolean;
  tries: number[];
  setTries: (t: number[]) => void;
  cur: number | null;
  setCur: (k: number) => void;
  reach: (n: string) => void;
}) {
  const press = (k: number) => {
    if (locked) return;
    const next = tries.includes(k) ? tries : [...tries, k];
    setTries(next);
    setCur(k);
    if (k === 0) reach("early");
    if (next.length >= 3) reach("three");
  };

  const a = cur === null ? null : run(PLANS.A, cur);
  const b = cur === null ? null : run(PLANS.B, cur);
  const worst = (p: "A" | "B") => (tries.length ? Math.max(...tries.map((k) => run(PLANS[p], k).drops)) : null);
  const sorted = [...tries].sort((x, y) => x - y);

  const msg = locked
    ? "Predict first. Then choose when egg 1 breaks."
    : cur === null
      ? "Choose when egg 1 breaks and watch both plans."
      : cur === 0
        ? "Egg 1 broke at once: egg 2 must climb floor by floor."
        : cur === 4
          ? "Egg 1 never broke: both plans just go up the building."
          : `Egg 1 broke on drop ${cur + 1}: egg 2 climbs the gap below it.`;

  const side = (r: Run | null, x: number, w: "A" | "B") => (
    <g>
      <text x={x} y={60} className={s.note}>
        {r ? (r.broke !== null ? `✕ ${r.broke}` : "no break") : locked && w === "B" ? "" : "?"}
      </text>
      <text x={x} y={74} className={s.dim}>
        {r && r.broke !== null ? (r.broke - 1 > r.lo ? `egg 2: ${r.lo + 1}–${r.broke - 1}` : "egg 2: none") : ""}
      </text>
      <text x={x} y={100} className={s.note}>
        Drops: {r ? r.drops : "?"}
      </text>
      <text x={x} y={114} className={s.note}>
        Worst: {worst(w) ?? "?"}
      </text>
    </g>
  );

  return (
    <div className={s.wrap}>
      <p className={s.lead}>Egg 1 breaks on drop:</p>
      <Row>
        {CHIPS.map((c, k) => (
          <Control key={c} className={`${s.tap} ${cur === k ? "active" : ""}`} disabled={locked} onClick={() => press(k)}>
            {c}
          </Control>
        ))}
      </Row>
      <p className={s.msg} aria-live="polite">
        {msg}
      </p>
      <svg viewBox="0 0 320 196" className="stage-svg" role="img" aria-label="Two towers of 100 floors, plan A and plan B">
        <Tower x={26} run={a} title="A: start 50, halve" hidden={false} />
        {side(a, 60, "A")}
        <Tower x={186} run={b} title={locked ? "B: after you predict" : "B: shrinking gaps"} hidden={locked} />
        {!locked && side(b, 220, "B")}
      </svg>
      <table className={s.tries} aria-label="Your tries">
        <thead>
          <tr>
            <th>Your tries</th>
            <th>A</th>
            <th>B</th>
          </tr>
        </thead>
        <tbody>
          {sorted.length === 0 && (
            <tr>
              <td colSpan={3}>none yet</td>
            </tr>
          )}
          {sorted.map((k) => (
            <tr key={k}>
              <td>{k === 4 ? "Never" : CHIPS[k]}</td>
              <td className={run(PLANS.A, k).drops > 20 ? s.bad : ""}>{run(PLANS.A, k).drops}</td>
              <td>{locked ? "" : run(PLANS.B, k).drops}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function TwoEggsHundredFloors({ slug }: { slug: string }) {
  const [tries, setTries] = useState<number[]>([]);
  const [cur, setCur] = useState<number | null>(null);

  const maxOf = (p: "A" | "B") => (tries.length ? Math.max(...tries.map((k) => run(PLANS[p], k).drops)) : 0);
  const neverTried = tries.includes(4);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Find the highest safe floor of a 100-floor building with 2 eggs. A broken egg is gone. What is the fewest drops that always works?",
        options: ["7", "14", "50"],
        answer: 1,
      }}
      exploreHint="Press the chips to see when egg 1 breaks, and what each plan pays."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            When egg 1 broke on drop 1, halving cost <strong>{run(PLANS.A, 0).drops}</strong>: egg 2 climbed floors 1 to 49
            one at a time. Across your {tries.length} tries, plan A&apos;s worst was {maxOf("A")} and plan B&apos;s worst was{" "}
            <strong>{maxOf("B")}</strong>.
          </p>
          <p>
            Each drop of egg 1 uses up one drop, so the next gap is one floor shorter: 14, 13, 12 … Fourteen drops cover 105
            floors; 13 cover only 91. With one egg left you cannot halve.
          </p>
          {neverTried && (
            <p className="muted">
              If egg 1 never broke, B took {run(PLANS.B, 4).drops} drops to halving&apos;s {run(PLANS.A, 4).drops}: a small
              price for capping the worst case.
            </p>
          )}
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["early", "three"]}>
          {(reach) => <Stage locked={locked} tries={tries} setTries={setTries} cur={cur} setCur={setCur} reach={reach} />}
        </Milestones>
      )}
    </Lesson>
  );
}
