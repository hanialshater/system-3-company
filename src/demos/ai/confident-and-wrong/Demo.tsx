"use client";

// Cross-entropy for one example: penalty = -ln(p), p = the chance the model gave the true answer.
// p = 0.5: 0.693; 0.1: 2.303; 0.01: 4.605 (6.6x the 50% penalty, = log2(100) halvings of 100%);
// 0.9: 0.105. As p -> 0 the penalty grows without bound. Deterministic.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
const penalty = (p: number) => -Math.log(p);
const P_START = 50; // percent
const P_Q = 1;
const PRESETS = [50, 10, 1] as const;
const Q_HALF = penalty(0.5); // 0.693
const Q_ONE = penalty(0.01); // 4.605
// MODEL END

const PX = (p: number) => 40 + p * 2.6; // p in percent
const PY = (v: number) => 160 - v * 28;
const f2 = (v: number) => v.toFixed(2);
const curve = Array.from({ length: 100 }, (_, i) => {
  const p = 1 + i;
  return `${i ? "L" : "M"}${PX(p).toFixed(1)},${PY(penalty(p / 100)).toFixed(1)}`;
}).join(" ");

export default function ConfidentAndWrong({ slug }: { slug: string }) {
  const [p, setP] = useState(P_START);
  const [seen, setSeen] = useState<number[]>([P_START]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Penalty = −ln(chance the model gave the true answer). Giving the truth 50% costs ${f2(Q_HALF)}. Giving it 1% costs about:`,
        options: [(2 * Q_HALF).toFixed(1), Q_ONE.toFixed(1), "50"],
        answer: 1,
      }}
      exploreHint="Lower the chance given to the true answer. Watch how fast the penalty climbs."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            At 50% the penalty was {f2(Q_HALF)}. {seen.includes(10) ? `At 10% it was ${f2(penalty(0.1))}. ` : ""}At 1% it was{" "}
            {f2(Q_ONE)}, {(Q_ONE / Q_HALF).toFixed(1)} times as much, and the curve was rising steeply at the left edge.
          </p>
          <p>
            Every halving of the chance adds the same {f2(Q_HALF)}. 50% is one halving away from certainty; 1% is about{" "}
            {(Q_ONE / Q_HALF).toFixed(1)}. Pushed toward 0%, the penalty has no ceiling.
          </p>
          <p>
            Models trained to make this penalty small are punished far more for being confidently wrong than for hedging.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["ten", "one-percent"]}>
          {(reach) => {
            const set = (v: number) => {
              setP(v);
              setSeen((xs) => [...xs, v]);
              if (v <= 10) reach("ten");
              if (v === P_Q) reach("one-percent");
            };
            const v = penalty(p / 100);
            return (
              <div className={s.wrap}>
                <span className={`tag ${s.model}`}>One example · −ln(chance on truth)</span>
                <svg viewBox="0 0 320 185" className="stage-svg" role="img" aria-label={locked ? "Penalty curve, hidden" : `Chance ${p}%, penalty ${f2(v)}`}>
                  <line x1={PX(0)} y1={PY(0)} x2={PX(100)} y2={PY(0)} stroke="var(--line)" />
                  <line x1={PX(0)} y1={PY(0)} x2={PX(0)} y2={PY(5.2)} stroke="var(--line)" />
                  {[0, 1, 2, 3, 4, 5].map((t) => (
                    <text key={t} x={PX(0) - 6} y={PY(t) + 3} textAnchor="end" className={s.tiny} fill="var(--muted)">
                      {t}
                    </text>
                  ))}
                  {[0, 25, 50, 75, 100].map((t) => (
                    <text key={t} x={PX(t)} y={PY(0) + 13} textAnchor="middle" className={s.tiny} fill="var(--muted)">
                      {t}%
                    </text>
                  ))}
                  <text x={PX(100)} y={PY(0) + 24} textAnchor="end" className={s.tiny} fill="var(--muted)">
                    chance given to the true answer
                  </text>
                  <text x={PX(0) + 4} y={PY(5.2) + 2} className={s.tiny} fill="var(--muted)">
                    penalty
                  </text>
                  {!locked && <path d={curve} fill="none" stroke="var(--domain)" strokeWidth={2.5} />}
                  {!locked && (
                    <line x1={PX(p)} y1={PY(0)} x2={PX(p)} y2={PY(v)} stroke="var(--fg)" strokeDasharray="3 3" />
                  )}
                  <circle cx={PX(locked ? P_START : p)} cy={PY(locked ? Q_HALF : v)} r={7} fill="var(--bad)" stroke="var(--fg)" strokeWidth={1.5} />
                </svg>
                <Row>
                  {PRESETS.map((x) => (
                    <Control key={x} className={p === x ? "active" : ""} disabled={locked || p === x} onClick={() => set(x)}>
                      {x}%
                    </Control>
                  ))}
                </Row>
                <Slider label="Chance on the truth" value={p} min={1} max={99} disabled={locked} format={(x) => `${x}%`} onChange={set} />
                <Row>
                  <Readout label="Penalty" value={locked ? f2(Q_HALF) : f2(v)} />
                  <Readout label="× the 50% penalty" value={locked ? "–" : (v / Q_HALF).toFixed(1)} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
