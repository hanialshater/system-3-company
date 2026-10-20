"use client";

// Order of the bad year. $100k, one year +25% and one year -20%, money moved at each year-end:
// v = v * (1 + r) + flow. Without flows both orders end at $100k (1.25 * 0.8 = 1). Withdrawing $20k
// a year, gain first ends at $64k and loss first at $55k. Depositing $20k flips it (loss first $145k,
// gain first $136k).
// Picture: one two-year balance line (current order solid); once the learner has seen both orders,
// the other order is ghosted (dashed). End values are labelled at the right edge.
// Milestones: "withdraw" (both orders seen at withdraw $20k, the question's case) and "noflow" (flow
// $0 with both orders shown). Optional: deposit $20k with both orders shown adds the flip sentence.
// Records are kept in a row under the chart so the reveal's numbers stay on the stage.
// Model: two years, flows at year-end, no fees, taxes or inflation.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type Order = "loss" | "gain";
const START = 100; // $k
const RET: Record<Order, [number, number]> = { loss: [-0.2, 0.25], gain: [0.25, -0.2] };
const Q_FLOW = -20;
const MILESTONES = ["withdraw", "noflow"] as const;

const path = (o: Order, flow: number) => {
  const v = [START];
  for (const r of RET[o]) v.push(Math.round((v[v.length - 1] * (1 + r) + flow) * 100) / 100);
  return v;
};
const k = (v: number) => `$${Number.isInteger(v) ? v : v.toFixed(1)}k`;
const flowText = (f: number) => (f < 0 ? `withdraw ${k(-f)}` : f > 0 ? `deposit ${k(f)}` : "no money moves");

// Chart geometry (viewBox 320 x 190).
const X = [50, 136, 222];
const YT = 14;
const YB = 160;
const VMAX = 160;
const py = (v: number) => YB - (v / VMAX) * (YB - YT);

type Rec = { flow: number; gain: number; loss: number };

export default function OrderOfTheBadYear({ slug }: { slug: string }) {
  const [order, setOrder] = useState<Order>("loss");
  const [flow, setFlow] = useState(Q_FLOW);
  const [seen, setSeen] = useState<Order[]>(["loss"]);
  const [recs, setRecs] = useState<Rec[]>([]);
  const both = seen.length === 2;
  const rec = (f: number) => recs.find((r) => r.flow === f);
  const w = rec(Q_FLOW);
  const z = rec(0);
  const d = rec(20);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "You have $100k invested for two years: one year it gains 25%, the other it loses 20%. You withdraw $20k at the end of each year to live on. Which order leaves you more?",
        options: ["Same either way", "The gain year first", "The loss year first"],
        answer: 1,
      }}
      exploreHint="Swap the order, then slide to “no money moves” and compare the two lines."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            With no withdrawals both orders ended at <strong>{k(z?.gain ?? 100)}</strong>: ×1.25 then ×0.8 equals ×0.8 then ×1.25.
            Withdrawing $20k a year, gain first ended at <strong>{k(w?.gain ?? 64)}</strong> and loss first at {k(w?.loss ?? 55)}.
          </p>
          <p>
            A withdrawal after the loss comes out of a smaller pot, and that money is not there for the recovery.
            {d ? ` Adding money flips it: loss first ended at ${k(d.loss)}, because the deposit went in low.` : ""}
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const update = (f: number, sn: Order[]) => {
              if (sn.length < 2) return;
              if (f === Q_FLOW || f === 0 || f === 20) {
                const g = path("gain", f)[2];
                const l = path("loss", f)[2];
                setRecs((rs) => (rs.some((r) => r.flow === f) ? rs : [...rs, { flow: f, gain: g, loss: l }].sort((a, b) => a.flow - b.flow)));
              }
              if (f === Q_FLOW) reach("withdraw");
              if (f === 0) reach("noflow");
            };
            const pick = (o: Order) => {
              const sn = seen.includes(o) ? seen : [...seen, o];
              setOrder(o);
              setSeen(sn);
              update(flow, sn);
            };
            const slide = (f: number) => {
              setFlow(f);
              update(f, seen);
            };
            const other: Order = order === "loss" ? "gain" : "loss";
            const cur = path(order, flow);
            const oth = path(other, flow);
            const pts = (v: number[]) => v.map((y, i) => `${X[i]},${py(y)}`).join(" ");
            const same = Math.abs(cur[2] - oth[2]) < 1e-9;
            const lbl = (o: Order) => (o === "loss" ? "loss first" : "gain first");
            // End labels: keep them apart when the two ends are close.
            const yc = py(cur[2]);
            const yo = py(oth[2]);
            const apart = Math.abs(yc - yo) < 14 ? (yc < yo ? [-7, 7] : [7, -7]) : [0, 0];
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: returns +25% and −20%; money moves at each year-end</p>
                <svg viewBox="0 0 320 190" className="stage-svg" role="img" aria-label={locked ? "Balance over two years" : `${lbl(order)}: ends at ${k(cur[2])}`}>
                  <line x1={X[0]} y1={YB} x2={X[2]} y2={YB} className={s.edge} />
                  {["start", "year 1", "year 2"].map((t, i) => (
                    <text key={t} x={X[i]} y={YB + 18} textAnchor="middle" className={s.axis}>
                      {t}
                    </text>
                  ))}
                  {!locked && (
                    <g>
                      {[50, 100, 150].map((v) => (
                        <g key={v}>
                          <line x1={X[0]} y1={py(v)} x2={X[2]} y2={py(v)} className={s.grid} />
                          <text x={X[0] - 6} y={py(v) + 4} textAnchor="end" className={s.axis}>
                            {k(v)}
                          </text>
                        </g>
                      ))}
                      {both && <polyline points={pts(oth)} className={s.ghost} />}
                      {both && oth.slice(1).map((y, i) => <circle key={`o${i}`} cx={X[i + 1]} cy={py(y)} r={4} className={s.ghostDot} />)}
                      <polyline points={pts(cur)} className={s.line} />
                      {cur.map((y, i) => (
                        <circle key={`c${i}`} cx={X[i]} cy={py(y)} r={5} className={s.dot} />
                      ))}
                      {both && same ? (
                        <text x={X[2] + 8} y={yc + 4} className={s.value}>
                          both {k(cur[2])}
                        </text>
                      ) : (
                        <>
                          <text x={X[2] + 8} y={yc + 4 + apart[0]} className={s.value}>
                            {k(cur[2])}
                          </text>
                          {both && (
                            <text x={X[2] + 8} y={yo + 4 + apart[1]} className={s.valueMuted}>
                              {k(oth[2])}
                            </text>
                          )}
                        </>
                      )}
                      <text x={X[1]} y={py(cur[1]) + (cur[1] >= oth[1] ? -10 : 20)} textAnchor="middle" className={s.value}>
                        {lbl(order)}
                      </text>
                      {both && (
                        <text x={X[1]} y={py(oth[1]) + (oth[1] > cur[1] ? -10 : 20)} textAnchor="middle" className={s.valueMuted}>
                          {lbl(other)}
                        </text>
                      )}
                    </g>
                  )}
                </svg>
                <p className={s.rec} aria-live="polite">
                  {locked
                    ? ""
                    : recs.length === 0
                      ? "Swap the order to compare."
                      : recs.map((r) => (r.flow === 0 ? `none: both ${k(r.gain)}` : `${flowText(r.flow)}: gain first ${k(r.gain)}, loss first ${k(r.loss)}`)).join(" · ")}
                </p>
                <Row>
                  {(["loss", "gain"] as Order[]).map((o) => (
                    <Control key={o} className={order === o ? "active" : ""} disabled={locked || order === o} onClick={() => pick(o)}>
                      {o === "loss" ? "Loss year first" : "Gain year first"}
                    </Control>
                  ))}
                </Row>
                <Slider label="At each year-end" value={flow} min={-20} max={20} step={10} format={flowText} disabled={locked} onChange={slide} />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
