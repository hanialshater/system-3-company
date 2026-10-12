"use client";

// Sunk cost. Two bars hang from a zero line: your overall result if you STOP now, and if you
// FINISH. Both contain the same grey block, the money already spent. Dragging that block
// changes both bars equally, so the gap between them never moves. Only the future (finishing
// costs $30k, brings in the benefit) changes the gap, and the decision flips at $30k.
// Simple model: ignores reputation, learning and anything but these dollars. Not advice.

import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const COST_TO_FINISH = 30000;

// Plot geometry (viewBox 320 × 210): money from +40k (top) to −190k (bottom).
const VTOP = 40000;
const VBOT = -190000;
const TOP = 26;
const BOT = 204;
const py = (v: number) => TOP + ((VTOP - v) / (VTOP - VBOT)) * (BOT - TOP);
const BAR = 92;
const XS = 46; // stop bar x
const XF = 168; // finish bar x

const k = (v: number) => `${v < 0 ? "−" : ""}$${Math.round(Math.abs(v) / 1000)}k`;

export default function SunkCostExit({ slug }: { slug: string }) {
  const [sunk, setSunk] = useState(80000);
  const [benefit, setBenefit] = useState(20000);
  const movedSunk = useRef(false);
  const flipped = useRef(false);

  const stop = -sunk;
  const diff = benefit - COST_TO_FINISH; // finish minus stop
  const finish = stop + diff;
  const better = diff > 0 ? "finish" : diff < 0 ? "stop" : "tie";

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "You have spent $80,000 on a project. Finishing costs $30,000 more and will bring in $20,000. Should you finish?",
        options: ["Yes, or the $80,000 is wasted", "No", "It depends on how much was spent"],
        answer: 1,
      }}
      exploreHint="Drag the money already spent. Then change what finishing brings in."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Stopping leaves you <strong>$80,000</strong> down. Finishing leaves you <strong>$90,000</strong> down: the
            $80,000 plus $30,000 more, minus the $20,000 it brings in. Stop.
          </p>
          <p>
            When you dragged the money already spent, both bars moved together and the $10,000 gap never changed. That
            money is in every option, so it cannot make one better than another. Only what happens next can: the choice
            flipped only when finishing brought in more than the $30,000 it costs.
          </p>
          <p className="muted">A simple model with dollars only, ignoring reputation and learning. Not advice about real projects.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const setS = (v: number) => {
          setSunk(v);
          if (!movedSunk.current) {
            movedSunk.current = true;
            interact();
          }
        };
        const setB = (v: number) => {
          setBenefit(v);
          if (v > COST_TO_FINISH && !flipped.current) {
            flipped.current = true;
            interact();
          }
        };
        const bracketX = XF + BAR + 10;
        return (
          <div className={s.wrap}>
            <svg viewBox="0 0 320 210" className="stage-svg" role="img" aria-label="Overall result if you stop or finish">
              <text x={XS + BAR / 2} y={14} textAnchor="middle" className={s.label}>
                stop
              </text>
              <text x={XF + BAR / 2} y={14} textAnchor="middle" className={s.label}>
                finish
              </text>
              <line x1={20} y1={py(0)} x2={300} y2={py(0)} stroke="var(--fg)" strokeWidth={1.5} />
              <text x={18} y={py(0) + 4} textAnchor="end" className={s.axis}>
                $0
              </text>

              {/* Money already spent: the same block in both bars. */}
              {sunk > 0 && (
                <>
                  <rect x={XS} y={py(0)} width={BAR} height={py(stop) - py(0)} className={s.sunk} />
                  <rect x={XF} y={py(0)} width={BAR} height={py(stop) - py(0)} className={s.sunk} />
                  {[XS, XF].map((x) => (
                    <text key={x} x={x + BAR / 2} y={(py(0) + py(stop)) / 2 + 4} textAnchor="middle" className={s.value} fill="var(--fg)">
                      {k(sunk)} spent
                    </text>
                  ))}
                </>
              )}

              {!locked && diff !== 0 && (
                <rect
                  x={XF}
                  y={Math.min(py(stop), py(finish))}
                  width={BAR}
                  height={Math.abs(py(finish) - py(stop))}
                  className={diff < 0 ? s.worse : s.better}
                />
              )}
              {!locked && (
                <>
                  <line x1={XS} y1={py(stop)} x2={XS + BAR} y2={py(stop)} stroke="var(--fg)" strokeWidth={2.5} />
                  <line x1={XF} y1={py(finish)} x2={XF + BAR} y2={py(finish)} stroke="var(--fg)" strokeWidth={2.5} />
                  <line x1={XS + BAR} y1={py(stop)} x2={bracketX} y2={py(stop)} stroke="var(--muted)" strokeDasharray="3 3" />
                  <text x={bracketX + 2} y={(py(stop) + py(finish)) / 2 + 4} className={s.value} fill={diff < 0 ? "var(--bad)" : diff > 0 ? "var(--good)" : "var(--muted)"}>
                    {diff === 0 ? "same" : `${diff > 0 ? "+" : "−"}$${Math.abs(diff) / 1000}k`}
                  </text>
                  <text x={XS + BAR / 2} y={py(stop) + 14} textAnchor="middle" className={s.axis}>
                    {k(stop)}
                  </text>
                  <text x={XF + BAR / 2} y={Math.max(py(finish), py(stop)) + 14} textAnchor="middle" className={s.axis}>
                    {k(finish)}
                  </text>
                </>
              )}
            </svg>

            <p className={s.msg} aria-live="polite">
              {locked
                ? "Lock in a guess to start."
                : better === "tie"
                  ? "Finishing and stopping end the same."
                  : `Better to ${better}, by $${Math.abs(diff) / 1000}k.`}
            </p>

            <Row>
              <Slider label="Already spent" value={sunk} min={0} max={150000} step={10000} disabled={locked} format={k} onChange={setS} />
            </Row>
            <Row>
              <Slider label="Finishing brings in" value={benefit} min={0} max={60000} step={10000} disabled={locked} format={k} onChange={setB} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
