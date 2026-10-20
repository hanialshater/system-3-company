"use client";

// Cosine similarity toy. Query Q = (1, 1). B = (k, k) for a length slider k = 1..10 (starts at 10).
// C = (1, 0.2). cos(Q, B) = 1.00 for every k; cos(Q, C) = 1.2 / (sqrt 2 * sqrt 1.04) = 0.83.
// Straight-line distance: |Q - B| = sqrt 2 * (k - 1) (12.7 at k = 10), |Q - C| = 0.8. Deterministic.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
type V = [number, number];
const Q: V = [1, 1];
const C: V = [1, 0.2];
const K_START = 10;
const bAt = (k: number): V => [k, k];
const norm = (a: V) => Math.hypot(a[0], a[1]);
const cosine = (a: V, b: V) => (a[0] * b[0] + a[1] * b[1]) / (norm(a) * norm(b));
const dist = (a: V, b: V) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const COS_C = cosine(Q, C); // 0.832
const DIST_C = dist(Q, C); // 0.8
// MODEL END

const f2 = (v: number) => v.toFixed(2);
const f1 = (v: number) => v.toFixed(1);
type Mode = "distance" | "cosine" | null;

export default function DirectionNotDistance({ slug }: { slug: string }) {
  const [k, setK] = useState(K_START);
  const [seen, setSeen] = useState<number[]>([]);
  const [mode, setMode] = useState<Mode>(null);
  const B = bAt(k);
  const cosB = cosine(Q, B);
  const dB = dist(Q, B);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Query Q = (${Q.join(", ")}). B = (${bAt(K_START).join(", ")}) is far from Q. C = (${C.join(", ")}) is close to Q. Cosine similarity compares the angle between two arrows drawn from the origin. Which is more similar to Q?`,
        options: ["B", "C", "They tie"],
        answer: 0,
      }}
      exploreHint="Change B's length, then rank by distance and by cosine."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            B kept a cosine of {f2(cosB)} at every length you tried, {seen.map((v) => `(${v}, ${v})`).join(", ")}, even when it was {f1(Math.max(...seen.map((v) => dist(Q, bAt(v)))))} away. C is only {f1(DIST_C)} away, but its cosine is {f2(COS_C)}.
          </p>
          <p>
            Cosine compares directions only: stretching an arrow never changes its angle. So by distance C wins; by cosine B wins.
          </p>
          <p>
            Some systems compare text embeddings by cosine. Vector length alone does not change the score, though a real document’s topic is not guaranteed to follow its vector’s direction.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["stretched-b", "ranked-cosine"]}>
          {(reach) => {
            // plot: 0..11 on both axes
            const ox = 30;
            const oy = 200;
            const u = 17;
            const P = (v: V) => [ox + v[0] * u, oy - v[1] * u] as const;
            const [qx, qy] = P(Q);
            const [bx, by] = P(B);
            const [cx, cy] = P(C);
            const [rx, ry] = P([11, 11]);
            const winB = mode === "cosine";
            const winC = mode === "distance";
            return (
              <div className={s.wrap}>
                <span className={`tag ${s.model}`}>Toy 2-D vectors</span>
                {!locked && <p className={s.caption}>Cosine: 1 = same direction, lower = wider angle. Length is ignored.</p>}
                <svg viewBox="0 0 320 212" className="stage-svg" role="img" aria-label={`B at ${k}, ${k}`}>
                  <line x1={ox} y1={oy} x2={ox + 11 * u} y2={oy} stroke="var(--line)" />
                  <line x1={ox} y1={oy} x2={ox} y2={oy - 11 * u} stroke="var(--line)" />
                  {!locked && <line x1={ox} y1={oy} x2={rx} y2={ry} stroke="var(--muted)" strokeDasharray="4 4" />}
                  {!locked && (
                    <text x={rx - 4} y={ry + 12} textAnchor="end" className={s.tiny} fill="var(--muted)">
                      Q&apos;s direction
                    </text>
                  )}
                  {!locked && mode === "distance" && (
                    <g>
                      <line x1={qx} y1={qy} x2={bx} y2={by} stroke="var(--bad)" strokeWidth={2} />
                      <line x1={qx} y1={qy} x2={cx} y2={cy} stroke="var(--good)" strokeWidth={2} />
                    </g>
                  )}
                  {/* B */}
                  <line x1={ox} y1={oy} x2={bx} y2={by} stroke="var(--domain)" strokeWidth={winB ? 4 : 2.5} />
                  <circle cx={bx} cy={by} r={5} fill="var(--domain)" />
                  <text x={bx + 7} y={by + 4} className={s.label} fill="var(--domain)">
                    B ({k}, {k})
                  </text>
                  {/* C */}
                  <line x1={ox} y1={oy} x2={cx} y2={cy} stroke="var(--fg)" strokeWidth={winC ? 4 : 2} />
                  <circle cx={cx} cy={cy} r={4} fill="var(--fg)" />
                  <text x={cx + 8} y={cy + 13} className={s.small} fill="var(--fg)">
                    C
                  </text>
                  {/* Q */}
                  <circle cx={qx} cy={qy} r={4.5} fill="none" stroke="var(--fg)" strokeWidth={2} />
                  <text x={qx - 7} y={qy - 6} textAnchor="end" className={s.small} fill="var(--fg)">
                    Q
                  </text>
                  {!locked && mode && (
                    <text x={312} y={170} textAnchor="end" className={s.label} fill="var(--good)">
                      Closer by {mode}: {mode === "cosine" ? "B" : "C"}
                    </text>
                  )}
                </svg>
                <Row>
                  <Slider
                    label="B's length (B = (k, k))"
                    value={k}
                    min={1}
                    max={10}
                    step={1}
                    disabled={locked}
                    format={(v) => `k = ${v}`}
                    onChange={(v) => {
                      setK(v);
                      setSeen((xs) => (xs.includes(v) ? xs : [...xs, v]));
                      reach("stretched-b");
                    }}
                  />
                </Row>
                <Row>
                  <Control className={mode === "distance" ? "active" : ""} disabled={locked || mode === "distance"} onClick={() => setMode("distance")}>
                    Rank by distance
                  </Control>
                  <Control
                    className={mode === "cosine" ? "active" : ""}
                    disabled={locked || mode === "cosine"}
                    onClick={() => {
                      setMode("cosine");
                      reach("ranked-cosine");
                    }}
                  >
                    Rank by cosine
                  </Control>
                </Row>
                <Row>
                  <Readout label="B: distance · cosine" value={locked ? "–" : `${f1(dB)} · ${f2(cosB)}`} />
                  <Readout label="C: distance · cosine" value={locked ? "–" : `${f1(DIST_C)} · ${f2(COS_C)}`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
