"use client";

// Nonlinearity-collapse toy. Layer 1: h = 3x + 1. Layer 2: y = 2h - 5. Stacked: y = 2(3x + 1) - 5 = 6x - 3,
// so x = 0, 1, 2 give -3, 3, 9, all on one straight line. With a ReLU bend between the layers
// (h -> max(0, h)) the output is flat at -5 for x < -1/3 and 6x - 3 above: a kink no single straight layer has.
// Deterministic.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
const A1 = 3;
const B1 = 1;
const A2 = 2;
const B2 = -5;
const layer1 = (x: number) => A1 * x + B1;
const relu = (h: number) => Math.max(0, h);
const stack = (x: number, bend: boolean) => {
  const h = layer1(x);
  const hh = bend ? relu(h) : h;
  return { h, hh, y: A2 * hh + B2 };
};
const ONE_A = A2 * A1; // 6
const ONE_B = A2 * B1 + B2; // -3
const one = (x: number) => ONE_A * x + ONE_B;
const KINK = -B1 / A1; // -1/3
const X_START = 0;
const CHECK_XS = [0, 1, 2];
// MODEL END

const sg = (v: number) => (v < 0 ? `−${Math.abs(v)}` : `${v}`);
const lin = (a: number, b: number, v = "x") => `${a}${v} ${b < 0 ? "−" : "+"} ${Math.abs(b)}`;

export default function StackWithoutBend({ slug }: { slug: string }) {
  const [x, setX] = useState(X_START);
  const [bend, setBend] = useState(false);
  const [seen, setSeen] = useState<number[]>([X_START]);
  const st = stack(x, bend);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `You stack two layers in a tiny network. Layer 1: h = ${lin(A1, B1)}. Layer 2: y = ${lin(A2, B2, "h")}. Which single layer does the same job as both?`,
        options: [`y = ${lin(ONE_A, ONE_B)}`, "y = 5x − 4", "None exists: two layers are stronger"],
        answer: 0,
      }}
      exploreHint="Feed in x = 0, 1, 2. Then switch on the bend."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            At x = {CHECK_XS.join(", ")} the stack gave {CHECK_XS.map((v) => sg(stack(v, false).y)).join(", ")}: every point on y ={" "}
            {lin(ONE_A, ONE_B)}, because {A2}({lin(A1, B1)}) {B2 < 0 ? "−" : "+"} {Math.abs(B2)} = {lin(ONE_A, ONE_B)}. Two straight
            layers in a row are one straight layer.
          </p>
          <p>
            With the bend on, negative h became 0 and the line kinked at x = −1/3. No single straight layer can do that.
          </p>
          <p>A bend between layers is what lets extra layers add power; neural networks commonly include nonlinear activation functions between hidden layers.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["three-points", "bend-on"]}>
          {(reach) => {
            const X = (v: number) => 40 + ((v + 1) / 3) * 260; // x in [-1, 2]
            const Y = (v: number) => 100 - v * 8.5; // y in about [-10, 10]
            const xs = Array.from({ length: 61 }, (_, i) => -1 + (i * 3) / 60);
            if (!xs.includes(KINK)) xs.push(KINK);
            xs.sort((a, b) => a - b);
            const pts = xs.map((v) => `${X(v).toFixed(1)},${Y(stack(v, bend).y).toFixed(1)}`).join(" ");
            const show = !locked;
            return (
              <div className={s.wrap}>
                <span className={`tag ${s.model}`}>Toy two-layer stack</span>
                <p className={s.caption}>ReLU bend: negative h becomes 0 before layer 2.</p>
                <svg viewBox="0 0 320 196" className="stage-svg" role="img" aria-label={`x ${x}, y ${st.y}`}>
                  <line x1={X(-1)} y1={Y(0)} x2={X(2)} y2={Y(0)} stroke="var(--line)" />
                  <line x1={X(0)} y1={Y(10)} x2={X(0)} y2={Y(-10)} stroke="var(--line)" />
                  {[-1, 0, 1, 2].map((t) => (
                    <text key={t} x={X(t)} y={Y(0) + 12} textAnchor="middle" className={s.tiny} fill="var(--muted)">
                      {sg(t)}
                    </text>
                  ))}
                  <text x={X(0) - 4} y={Y(9) + 3} textAnchor="end" className={s.tiny} fill="var(--muted)">
                    y
                  </text>
                  {show && (
                    <g>
                      <line x1={X(-1)} y1={Y(one(-1))} x2={X(2)} y2={Y(one(2))} stroke="var(--muted)" strokeDasharray="5 4" strokeWidth={1.5} />
                      <text x={X(2)} y={Y(-6)} textAnchor="end" className={s.tiny} fill="var(--muted)">
                        one layer: y = {lin(ONE_A, ONE_B)}
                      </text>
                      <polyline points={pts} fill="none" stroke="var(--domain)" strokeWidth={3} opacity={0.8} />
                      {seen.map((v) => (
                        <circle key={v} cx={X(v)} cy={Y(stack(v, bend).y)} r={4} fill="var(--domain)" />
                      ))}
                      <circle cx={X(x)} cy={Y(st.y)} r={7} fill="none" stroke="var(--fg)" strokeWidth={2} />
                      {bend && (
                        <text x={X(KINK) + 6} y={Y(-5) + 16} className={s.tiny} fill="var(--domain)">
                          kink at x = −1/3
                        </text>
                      )}
                    </g>
                  )}
                  <text x={160} y={190} textAnchor="middle" className={s.small} fill="var(--fg)">
                    h = {lin(A1, B1)} {bend && !locked ? "→ ReLU" : ""} → y = {lin(A2, B2, "h")}
                  </text>
                </svg>
                <Row>
                  <Slider
                    label="Input x"
                    value={x}
                    min={-1}
                    max={2}
                    disabled={locked}
                    format={sg}
                    onChange={(v) => {
                      setX(v);
                      const next = seen.includes(v) ? seen : [...seen, v];
                      setSeen(next);
                      if (!bend && CHECK_XS.every((c) => next.includes(c))) reach("three-points");
                    }}
                  />
                </Row>
                <Row>
                  <Control
                    className={bend ? "active" : ""}
                    disabled={locked}
                    onClick={() => {
                      const on = !bend;
                      setBend(on);
                      if (on) reach("bend-on");
                    }}
                  >
                    {bend ? "Bend: on (ReLU)" : "Bend: off"}
                  </Control>
                  <Readout label="h" value={show ? (bend ? `${sg(st.h)} → ${sg(st.hh)}` : sg(st.h)) : "–"} />
                  <Readout label="y" value={show ? sg(st.y) : "–"} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
