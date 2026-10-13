"use client";

// Backprop chain toy. x = 2, h = w1 * x, y = w2 * h, loss = (y - 1)^2, with w1 = 3, w2 = 0.5: h = 6, y = 3, loss = 4.
// Chain rule: dL/dw1 = 2(y - 1) * w2 * x = 2*2*0.5*2 = 4; dL/dw2 = 2(y - 1) * h = 2*2*6 = 24.
// The stage nudges one weight by 0.001 and shows the loss change: 0.0040 (slope 4.0) and 0.0240 (slope 24.0).
// Deterministic.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
const X_IN = 2;
const W1 = 3;
const W2 = 0.5;
const TARGET = 1;
const NUDGE = 0.001;
const forward = (w1: number, w2: number) => {
  const h = w1 * X_IN;
  const y = w2 * h;
  return { h, y, loss: (y - TARGET) ** 2 };
};
const BASE = forward(W1, W2); // h 6, y 3, loss 4
const AFTER_W1 = forward(W1 + NUDGE, W2);
const AFTER_W2 = forward(W1, W2 + NUDGE);
const SLOPE_W1 = (AFTER_W1.loss - BASE.loss) / NUDGE; // 4.001
const SLOPE_W2 = (AFTER_W2.loss - BASE.loss) / NUDGE; // 24.036
const CHAIN_W1 = 2 * (BASE.y - TARGET) * W2 * X_IN; // 4
const CHAIN_W2 = 2 * (BASE.y - TARGET) * BASE.h; // 24
// MODEL END

type Mode = "w1" | "w2" | null;
const f1 = (v: number) => v.toFixed(1);
const f4 = (v: number) => v.toFixed(4);
const g = (v: number) => String(Math.round(v * 1000) / 1000);

export default function ChainOfBlame({ slug }: { slug: string }) {
  const [mode, setMode] = useState<Mode>(null);
  const st = mode === "w1" ? AFTER_W1 : mode === "w2" ? AFTER_W2 : BASE;
  const w1 = mode === "w1" ? W1 + NUDGE : W1;
  const w2 = mode === "w2" ? W2 + NUDGE : W2;
  const change = st.loss - BASE.loss;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `y = w2 · (w1 · x) with x = ${X_IN}, w1 = ${W1}, w2 = ${W2}; target ${TARGET}, loss = (y − ${TARGET})². The loss's slope with respect to w1, the early weight, is:`,
        options: ["0: w1 does not touch the loss directly", `${CHAIN_W1}`, `${CHAIN_W2}`],
        answer: 1,
      }}
      exploreHint="Nudge each weight a tiny bit and watch the loss."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Nudging w1 by {NUDGE} moved the loss by {f4(AFTER_W1.loss - BASE.loss)}: a slope of {f1(SLOPE_W1)}. That is 2(y − 1) × w2 × x
            = 2 × {BASE.y - TARGET} × {W2} × {X_IN} = {CHAIN_W1}.
          </p>
          <p>
            The output error is passed back through w2 and multiplied by what w1 worked on. Nudging w2 gave {f1(SLOPE_W2)} = 2 ×{" "}
            {BASE.y - TARGET} × h ({BASE.h}).
          </p>
          <p>
            Early weights get their share of the blame, scaled by everything between them and the output. Backpropagation applies
            this chain rule to train real networks.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["nudged-w1", "nudged-w2"]}>
          {(reach) => {
            const BW = 44;
            const bx = (i: number) => 8 + i * (BW + 8);
            const box = (i: number, label: string, value: string, hot: boolean) => (
              <g>
                <rect x={bx(i)} y={52} width={BW} height={44} rx={8} fill="var(--bg-2)" stroke={hot ? "var(--domain)" : "var(--line)"} strokeWidth={hot ? 3 : 1.5} />
                <text x={bx(i) + BW / 2} y={68} textAnchor="middle" className={s.tiny} fill="var(--muted)">
                  {label}
                </text>
                <text x={bx(i) + BW / 2} y={87} textAnchor="middle" className={s.small} fill={hot ? "var(--domain)" : "var(--fg)"}>
                  {value}
                </text>
                {i > 0 && <line x1={bx(i) - 8} y1={74} x2={bx(i) - 1} y2={74} stroke="var(--muted)" strokeWidth={1.5} />}
              </g>
            );
            const on = !locked && mode !== null;
            return (
              <div className={s.wrap}>
                <span className={`tag ${s.model}`}>Toy two-weight chain</span>
                <p className={s.caption}>Slope = loss change ÷ nudge size.</p>
                <svg viewBox="0 18 320 118" className="stage-svg" role="img" aria-label={`loss ${f4(st.loss)}`}>
                  {box(0, "input x", String(X_IN), false)}
                  {box(1, "× w1", g(w1), !locked && mode === "w1")}
                  {box(2, "h", g(st.h), !locked && mode === "w1")}
                  {box(3, "× w2", g(w2), !locked && mode === "w2")}
                  {box(4, "y", g(st.y), on)}
                  {box(5, "loss", f4(st.loss), on)}
                  <text x={160} y={126} textAnchor="middle" className={s.small} fill="var(--muted)">
                    loss = (y − {TARGET})², target {TARGET}
                  </text>
                  {on && (
                    <text x={160} y={30} textAnchor="middle" className={s.label} fill="var(--domain)">
                      {mode} nudged by +{NUDGE}
                    </text>
                  )}
                </svg>
                <Row>
                  <Control
                    className={mode === "w1" ? "active" : ""}
                    disabled={locked || mode === "w1"}
                    onClick={() => {
                      setMode("w1");
                      reach("nudged-w1");
                    }}
                  >
                    Nudge w1 +{NUDGE}
                  </Control>
                  <Control
                    className={mode === "w2" ? "active" : ""}
                    disabled={locked || mode === "w2"}
                    onClick={() => {
                      setMode("w2");
                      reach("nudged-w2");
                    }}
                  >
                    Nudge w2 +{NUDGE}
                  </Control>
                  <Control disabled={locked || mode === null} onClick={() => setMode(null)}>
                    Undo
                  </Control>
                </Row>
                <Row>
                  <Readout label="Loss change" value={on ? `+${f4(change)}` : "–"} />
                  <Readout label="Slope (change ÷ nudge)" value={on ? f1(change / NUDGE) : "–"} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
