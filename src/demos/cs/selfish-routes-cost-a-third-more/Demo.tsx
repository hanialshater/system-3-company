"use client";

// Price of anarchy (Pigou's example). Road A always takes 60 min; road B takes 60 min × its share of
// drivers. Selfish drivers all take B (it is never slower), so everyone takes 60 min. Average trip
// for a split x on B: (1 − x)·60 + x·60x, lowest at x = 0.5 (45 min). 60 / 45 = 4/3.
// One representation: the average-trip curve against the share on B, with the current split marked.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const A_MIN = 60;
const timeB = (pct: number) => (A_MIN * pct) / 100;
const avg = (pct: number) => ((100 - pct) / 100) * A_MIN + (pct / 100) * timeB(pct);
const BEST = 50; // grid search over 0..100: avg(50) = 45 is the minimum
const fmt = (m: number) => (Number.isInteger(m) ? String(m) : m.toFixed(1));

// chart geometry
const X0 = 44;
const X1 = 320;
const Y0 = 176; // 30 min
const Y1 = 24; // 65 min
const px = (pct: number) => X0 + ((X1 - X0) * pct) / 100;
const py = (min: number) => Y0 - ((Y0 - Y1) * (min - 30)) / 35;
const CURVE = Array.from({ length: 101 }, (_, i) => `${i ? "L" : "M"}${px(i).toFixed(1)},${py(avg(i)).toFixed(1)}`).join(" ");

export default function SelfishRoutesCostAThirdMore({ slug }: { slug: string }) {
  const [onB, setOnB] = useState(100);
  const b = timeB(onB);
  const a = avg(onB);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Road A always takes 60 min. Road B takes 60 min × its share of drivers. Selfish drivers average 60. Can a planner beat that?",
        options: ["No, 60 is best", "Yes, to 45", "Yes, to 30"],
        answer: 1,
      }}
      exploreHint="Slide drivers off road B onto A and watch the average trip."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Selfish drivers all pile onto B, because B is never slower than A: everyone takes 60 minutes and no one gains by
            switching. You found that sending half to A cuts B to 30 minutes and the average to 45, the lowest any split
            reaches. 30 is out of reach: whoever stays on A still takes 60.
          </p>
          <p>
            Each driver who joins B slows everyone already on it, a cost that driver never feels. Here selfish routing costs
            60 / 45 = 4/3 of the best, a third more. With delays that are a fixed time plus a part proportional to traffic, that
            is the worst it can ever be.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["tried-a-split", "found-best"]}>
          {(hit) => {
            const set = (v: number) => {
              if (locked || v === onB) return;
              setOnB(v);
              if (v < 100) hit("tried-a-split");
              if (v === BEST) hit("found-best");
            };
            const note =
              onB === 100
                ? "Everyone on B: both roads take 60 min. No driver gains by switching."
                : onB === 0
                  ? "Everyone on A: B would take 0 min, so drivers want to switch."
                  : `B takes ${fmt(b)} min, A takes 60, so drivers on A want to switch.`;
            return (
              <div className={s.wrap}>
                <p className={s.note}>{note}</p>
                <svg viewBox="0 0 340 220" className="stage-svg" role="img" aria-label={`${onB}% on road B, average trip ${fmt(a)} minutes`}>
                  {[30, 45, 60].map((m) => (
                    <g key={m}>
                      <line x1={X0} x2={X1} y1={py(m)} y2={py(m)} stroke="var(--line)" strokeDasharray={m === 60 ? "4 4" : undefined} />
                      <text x={X0 - 6} y={py(m) + 4} textAnchor="end" className={s.tick}>
                        {m}
                      </text>
                    </g>
                  ))}
                  {[0, 50, 100].map((p) => (
                    <text key={p} x={px(p)} y={Y0 + 16} textAnchor="middle" className={s.tick}>
                      {p}%
                    </text>
                  ))}
                  <text x={(X0 + X1) / 2} y={Y0 + 34} textAnchor="middle" className={s.axis}>
                    share of drivers on road B
                  </text>
                  <text x={12} y={py(47.5)} className={s.axis} transform={`rotate(-90 12 ${py(47.5)})`} textAnchor="middle">
                    average trip (min)
                  </text>
                  <path d={CURVE} fill="none" stroke="var(--domain)" strokeWidth={3} />
                  <line x1={px(onB)} x2={px(onB)} y1={Y1} y2={Y0} stroke="var(--muted)" strokeDasharray="3 3" />
                  <circle cx={px(onB)} cy={py(a)} r={8} fill={onB === BEST ? "var(--good)" : "var(--domain)"} stroke="var(--fg)" strokeWidth={2} />
                  <text
                    x={Math.min(Math.max(px(onB), X0 + 30), X1 - 30)}
                    y={py(a) - 14}
                    textAnchor="middle"
                    className={s.value}
                  >
                    {fmt(a)} min
                  </text>
                </svg>
                <Slider label="Drivers on road B" value={onB} min={0} max={100} step={5} onChange={set} disabled={locked} format={(v) => `${v}%`} />
                <Row>
                  <Control disabled={locked || onB === 100} onClick={() => set(100)}>
                    All on B (selfish)
                  </Control>
                  <Control disabled={locked || onB === BEST} onClick={() => set(BEST)}>
                    Half on each
                  </Control>
                </Row>
                <Row>
                  <Readout label="Road A" value="60 min" />
                  <Readout label="Road B" value={`${fmt(b)} min`} />
                  <Readout label="Average" value={`${fmt(a)} min`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
