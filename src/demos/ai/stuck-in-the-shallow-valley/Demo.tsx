"use client";

// Local-minima toy. f(x) = x^4 - 3x^2 + x. Gradient descent: x <- x - 0.01 * f'(x), 2000 steps.
// Starts 1.5 and 0.5 end at x = 1.131 (f = -1.070, the shallow valley); starts -0.5 and -1.5 end at
// x = -1.301 (f = -3.514, the deeper valley). The hump between them is at x = 0.170 (root of f' = 0).
// Deterministic.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
const f = (x: number) => x ** 4 - 3 * x * x + x;
const df = (x: number) => 4 * x ** 3 - 6 * x + 1;
const RATE = 0.01;
const STEPS = 2000;
const roll = (x0: number) => {
  let x = x0;
  for (let i = 0; i < STEPS; i++) x -= RATE * df(x);
  return x;
};
const STARTS = [1.5, 0.5, -0.5, -1.5];
const ENDS = STARTS.map(roll);
const SHALLOW = roll(1.5); // 1.131
const DEEP = roll(-1.5); // -1.301
const HUMP = (() => {
  let lo = 0;
  let hi = 0.5;
  for (let i = 0; i < 60; i++) {
    const m = (lo + hi) / 2;
    if (df(lo) * df(m) <= 0) hi = m;
    else lo = m;
  }
  return lo;
})(); // 0.170
// MODEL END

const f2 = (v: number) => (v < 0 ? `−${Math.abs(v).toFixed(2)}` : v.toFixed(2));
const sx = (v: number) => (v < 0 ? `−${Math.abs(v)}` : `${v}`);

export default function StuckInTheShallowValley({ slug }: { slug: string }) {
  const [cur, setCur] = useState<number | null>(null);
  const [tried, setTried] = useState<number[]>([]);
  const end = cur === null ? null : ENDS[cur];
  const fromSide = (side: "shallow" | "deep") =>
    tried.filter((i) => (side === "shallow" ? ENDS[i] > HUMP : ENDS[i] < HUMP)).map((i) => sx(STARTS[i]));

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `f(x) = x⁴ − 3x² + x has a shallow valley near x = ${f2(SHALLOW)} (height ${f2(f(SHALLOW))}) and a deeper one near x = ${f2(DEEP)} (height ${f2(f(DEEP))}). A ball released at x = ${STARTS[0]} takes small downhill steps. It stops at:`,
        options: [`x = ${f2(DEEP)}, the deeper valley`, `x = ${f2(SHALLOW)}, the shallow valley`, "x = 0"],
        answer: 1,
      }}
      exploreHint="Release the ball from starts on both sides."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            From x = {fromSide("shallow").join(" and ")} the ball stopped at {f2(SHALLOW)}, height {f2(f(SHALLOW))}. From x ={" "}
            {fromSide("deep").join(" and ")} it reached {f2(DEEP)}, height {f2(f(DEEP))}.
          </p>
          <p>
            The hump near x = {f2(HUMP)} splits them. Each step only goes downhill from where the ball is, so it never climbs out of
            the valley it starts in.
          </p>
          <p>
            Downhill steps find the nearest valley, not the lowest: the start decides. Gradient descent in real model training uses
            the same rule, so its starting point can matter too.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["shallow-valley", "deep-valley"]}>
          {(reach) => {
            const X = (x: number) => 20 + ((x + 2) / 4) * 280;
            const Y = (y: number) => 20 + ((5 - y) / 9) * 150; // y from 5 (top) to -4 (bottom)
            const curve = Array.from({ length: 161 }, (_, i) => -2 + (i * 4) / 160)
              .filter((x) => f(x) <= 5)
              .map((x) => `${X(x).toFixed(1)},${Y(f(x)).toFixed(1)}`)
              .join(" ");
            const seg = (a: number, b: number) => {
              const lo = Math.min(a, b);
              const hi = Math.max(a, b);
              return Array.from({ length: 41 }, (_, i) => lo + ((hi - lo) * i) / 40)
                .map((x) => `${X(x).toFixed(1)},${Y(f(x)).toFixed(1)}`)
                .join(" ");
            };
            return (
              <div className={s.wrap}>
                <span className={`tag ${s.model}`}>Toy curve · small downhill steps</span>
                <svg viewBox="0 0 320 190" className="stage-svg" role="img" aria-label={end === null ? "Curve" : `Stopped at ${f2(end)}`}>
                  <line x1={X(-2)} y1={Y(0)} x2={X(2)} y2={Y(0)} stroke="var(--line)" />
                  <polyline points={curve} fill="none" stroke="var(--fg)" strokeWidth={2} />
                  <text x={X(SHALLOW)} y={Y(f(SHALLOW)) + 18} textAnchor="middle" className={s.tiny} fill="var(--muted)">
                    shallow {f2(f(SHALLOW))}
                  </text>
                  <text x={X(DEEP)} y={Y(f(DEEP)) + 16} textAnchor="middle" className={s.tiny} fill="var(--muted)">
                    deep {f2(f(DEEP))}
                  </text>
                  {!locked && (
                    <g>
                      <line x1={X(HUMP)} y1={Y(f(HUMP)) - 6} x2={X(HUMP)} y2={Y(-4)} stroke="var(--muted)" strokeDasharray="3 3" />
                      <text x={X(HUMP)} y={Y(f(HUMP)) - 10} textAnchor="middle" className={s.tiny} fill="var(--muted)">
                        hump {f2(HUMP)}
                      </text>
                    </g>
                  )}
                  {!locked &&
                    tried.map((i) => (
                      <circle key={i} cx={X(STARTS[i])} cy={Y(f(STARTS[i]))} r={4} fill="none" stroke="var(--muted)" strokeWidth={1.5} />
                    ))}
                  {!locked && cur !== null && end !== null && (
                    <g>
                      <polyline points={seg(STARTS[cur], end)} fill="none" stroke="var(--domain)" strokeWidth={5} opacity={0.6} />
                      <circle cx={X(STARTS[cur])} cy={Y(f(STARTS[cur]))} r={5} fill="none" stroke="var(--domain)" strokeWidth={2} />
                      <circle cx={X(end)} cy={Y(f(end))} r={7} fill="var(--domain)" />
                    </g>
                  )}
                  {[-2, -1, 0, 1, 2].map((t) => (
                    <text key={t} x={X(t)} y={186} textAnchor="middle" className={s.tiny} fill="var(--muted)">
                      {sx(t)}
                    </text>
                  ))}
                </svg>
                <Row>
                  {STARTS.map((x0, i) => (
                    <Control
                      key={x0}
                      className={cur === i ? "active" : ""}
                      disabled={locked || cur === i}
                      onClick={() => {
                        setCur(i);
                        setTried((t) => (t.includes(i) ? t : [...t, i]));
                        reach(ENDS[i] > HUMP ? "shallow-valley" : "deep-valley");
                      }}
                    >
                      Start {sx(x0)}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Readout label="Stopped at x" value={locked || end === null ? "–" : f2(end)} />
                  <Readout label="End height" value={locked || end === null ? "–" : f2(f(end))} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
