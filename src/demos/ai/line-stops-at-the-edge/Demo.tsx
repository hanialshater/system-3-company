"use client";

// Distribution shift / extrapolation. A least-squares line is fitted to y = x^2 at x = 0, 0.25,
// 0.5, 0.75, 1: slope 1, intercept -0.125, largest error inside [0, 1] is 0.125. At x = 3 the
// line says 2.875 while the truth is 9 (gap 6.125). Deterministic.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
const TRAIN_X = [0, 0.25, 0.5, 0.75, 1];
const truth = (x: number) => x * x;
function fit() {
  const n = TRAIN_X.length;
  const mx = TRAIN_X.reduce((a, b) => a + b, 0) / n;
  const ys = TRAIN_X.map(truth);
  const my = ys.reduce((a, b) => a + b, 0) / n;
  let sxy = 0;
  let sxx = 0;
  TRAIN_X.forEach((x, i) => {
    sxy += (x - mx) * (ys[i] - my);
    sxx += (x - mx) ** 2;
  });
  const slope = sxy / sxx;
  return { slope, intercept: my - slope * mx };
}
const FIT = fit();
const line = (x: number) => FIT.slope * x + FIT.intercept;
function maxInsideError() {
  let m = 0;
  for (let i = 0; i <= 1000; i++) m = Math.max(m, Math.abs(truth(i / 1000) - line(i / 1000)));
  return m;
}
const QUERIES = [0.5, 1, 1.5, 2, 3] as const;
const Q_X = 3;
// MODEL END

const X = (x: number) => 14 + (x + 0.1) * 95;
const Y = (y: number) => 172 - (y + 0.5) * 16.5;
const MAX_IN = maxInsideError();
const f3 = (v: number) => (Math.abs(v - Math.round(v)) < 1e-9 ? String(Math.round(v)) : v.toFixed(3).replace(/\.?0+$/, ""));

export default function LineStopsAtTheEdge({ slug }: { slug: string }) {
  const [qx, setQx] = useState<number>(QUERIES[0]);
  const [farthest, setFarthest] = useState(0);

  const pred = line(qx);
  const tru = truth(qx);
  const outside = qx > 1;
  const curveTo = Math.max(1, qx);
  const curve = Array.from({ length: 41 }, (_, i) => {
    const x = (curveTo * i) / 40;
    return `${i ? "L" : "M"}${X(x).toFixed(1)},${Y(truth(x)).toFixed(1)}`;
  }).join(" ");

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A straight line is fitted to y = x² using x = ${TRAIN_X.join(", ")} (off by at most ${f3(MAX_IN)} anywhere in that range). At x = ${Q_X} the line predicts:`,
        options: [`About ${f3(truth(Q_X))}`, `About ${line(Q_X).toFixed(1)}`, "About 5"],
        answer: 1,
      }}
      exploreHint="Move the question point right, past the training data."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            Inside 0 to 1 the line and the curve never differed by more than {f3(MAX_IN)}. At x = {Q_X} the line said{" "}
            <strong>{f3(line(Q_X))}</strong> while the truth was {f3(truth(Q_X))}: off by {f3(truth(Q_X) - line(Q_X))}.
            {farthest >= Q_X ? " You watched the gap open as you left the dots." : ""}
          </p>
          <p>
            Nothing in the training error warned of this: every training point was between 0 and 1. A model is only tested
            where its data lived. Before trusting a prediction, ask whether the new case looks like the training cases.
          </p>
          <p className="muted">Toy truth y = x², invented.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["far-outside"]}>
          {(reach) => (
            <div className={s.wrap}>
              <span className={`tag ${s.model}`}>Toy: truth y = x² · line fitted on 0 to 1</span>
              <svg viewBox="0 0 320 180" className="stage-svg" role="img" aria-label={`Question point at x = ${qx}`}>
                {/* axes */}
                <line x1={X(0)} y1={Y(0)} x2={X(3.1)} y2={Y(0)} stroke="var(--line)" />
                <line x1={X(0)} y1={Y(-0.4)} x2={X(0)} y2={Y(9.4)} stroke="var(--line)" />
                {[0, 1, 2, 3].map((t) => (
                  <text key={t} x={X(t)} y={Y(0) + 12} textAnchor="middle" className={s.tiny} fill="var(--muted)">
                    {t}
                  </text>
                ))}
                <rect x={X(0)} y={Y(9.4)} width={X(1) - X(0)} height={Y(-0.4) - Y(9.4)} fill="var(--domain)" opacity={0.08} />
                <text x={(X(0) + X(1)) / 2} y={Y(9) } textAnchor="middle" className={s.tiny} fill="var(--muted)">
                  training data
                </text>
                {!locked && <path d={curve} fill="none" stroke="var(--good)" strokeWidth={2} strokeDasharray={outside ? "none" : "3 3"} />}
                <line x1={X(-0.05)} y1={Y(line(-0.05))} x2={X(3.1)} y2={Y(line(3.1))} stroke="var(--domain)" strokeWidth={2.5} />
                {TRAIN_X.map((x) => (
                  <circle key={x} cx={X(x)} cy={Y(truth(x))} r={4} fill="var(--fg)" />
                ))}
                {!locked && (
                  <g>
                    <line x1={X(qx)} y1={Y(pred)} x2={X(qx)} y2={Y(tru)} stroke="var(--bad)" strokeWidth={2} />
                    <circle cx={X(qx)} cy={Y(pred)} r={5} fill="var(--domain)" stroke="var(--fg)" />
                    <circle cx={X(qx)} cy={Y(tru)} r={5} fill="var(--good)" stroke="var(--fg)" />
                  </g>
                )}
                <text x={X(2.1)} y={Y(line(2.1)) + 16} textAnchor="middle" className={s.tiny} fill="var(--domain)">
                  fitted line
                </text>
                {!locked && outside && (
                  <text x={X(curveTo) - 6} y={Y(truth(curveTo)) + 4} textAnchor="end" className={s.tiny} fill="var(--good)">
                    truth
                  </text>
                )}
              </svg>
              <Row>
                {QUERIES.map((q) => (
                  <Control
                    key={q}
                    className={qx === q ? "active" : ""}
                    disabled={locked || qx === q}
                    onClick={() => {
                      setQx(q);
                      setFarthest((m) => Math.max(m, q));
                      if (q === Q_X) reach("far-outside");
                    }}
                  >
                    x = {q}
                  </Control>
                ))}
              </Row>
              <Row>
                <Readout label="Line says" value={locked ? "–" : f3(pred)} />
                <Readout label="Truth" value={locked ? "–" : f3(tru)} />
                <Readout label="Off by" value={locked ? "–" : f3(Math.abs(tru - pred))} />
              </Row>
            </div>
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
