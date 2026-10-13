"use client";

// k-nearest neighbours with one bad label. Six blue dots, one orange dot sitting among them
// (a labelling mistake) and six orange dots in their own group. The new dot lands next to the
// bad label. Fixed layout (no randomness). Votes at the question's dot: k = 1 orange; k = 3
// 2 blue 1 orange; k = 5 4 blue 1 orange; k = 7 6 blue 1 orange; k = 13 (every dot) 6 blue
// 7 orange, so orange: the overall majority.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
type Lab = "blue" | "orange";
interface Pt {
  x: number;
  y: number;
  lab: Lab;
  bad?: boolean;
}
const DOTS: Pt[] = [
  { x: 2.6, y: 3.4, lab: "blue" },
  { x: 3.8, y: 3.8, lab: "blue" },
  { x: 2.4, y: 2.2, lab: "blue" },
  { x: 4.2, y: 2.4, lab: "blue" },
  { x: 1.6, y: 3.0, lab: "blue" },
  { x: 3.0, y: 1.2, lab: "blue" },
  { x: 3.4, y: 2.8, lab: "orange", bad: true },
  { x: 6.6, y: 2.0, lab: "orange" },
  { x: 7.4, y: 3.6, lab: "orange" },
  { x: 8.2, y: 2.4, lab: "orange" },
  { x: 7.0, y: 4.6, lab: "orange" },
  { x: 8.6, y: 4.0, lab: "orange" },
  { x: 7.8, y: 1.4, lab: "orange" },
];
const KS = [1, 3, 5, 7, 13] as const;
const QUERIES: [number, number][] = [
  [3.2, 3.0],
  [5.4, 3.0],
  [7.6, 3.0],
];
const Q_K = 5;

/** Indices of the k nearest dots to (qx, qy), nearest first. */
function nearest(qx: number, qy: number, k: number) {
  return DOTS.map((p, i) => ({ i, d: Math.hypot(p.x - qx, p.y - qy) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, k);
}
function vote(qx: number, qy: number, k: number) {
  const nb = nearest(qx, qy, k);
  const blue = nb.filter((n) => DOTS[n.i].lab === "blue").length;
  const orange = nb.length - blue;
  return { nb, blue, orange, label: (blue > orange ? "blue" : "orange") as Lab, radius: nb[nb.length - 1].d };
}
// MODEL END

const COL: Record<Lab, string> = { blue: "#3b82f6", orange: "#f59e0b" };
const X = (x: number) => 20 + x * 28;
const Y = (y: number) => 172 - y * 28;

export default function OneBadLabelKnn({ slug }: { slug: string }) {
  const [k, setK] = useState<number>(1);
  const [q, setQ] = useState(0);
  const [seen, setSeen] = useState<Record<number, ReturnType<typeof vote>>>({});

  const [qx, qy] = QUERIES[q];
  const v = vote(qx, qy, k);
  const v1 = vote(...QUERIES[0], 1);
  const vQ = vote(...QUERIES[0], Q_K);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A new dot lands next to one wrongly labelled orange dot inside a blue group. With k = 1 it is labelled orange. With k = ${Q_K} (its ${Q_K} nearest dots: ${vQ.blue} blue, ${vQ.orange} orange) its label is:`,
        options: ["Orange", "Blue", "Undecided"],
        answer: 1,
      }}
      exploreHint="Change k and watch who votes. Then try k = 13 and move the dot."
      minInteractions={1}
      reveal={() => {
        const v13 = seen[13];
        return (
          <>
            <p>
              With k = 1 the only voter was the mislabelled dot, so the new dot turned {v1.label}. At k = {Q_K} you saw{" "}
              <strong>
                {vQ.blue} blue and {vQ.orange} orange
              </strong>{" "}
              votes: the majority outvoted the one bad label and the dot turned {vQ.label}.
            </p>
            <p>
              Asking several neighbours averages out a single mistake.{" "}
              {v13
                ? `But at k = 13 every dot voted (${v13.blue} blue, ${v13.orange} orange) and the new dot turned ${v13.label}, wherever it sat: too large a k erases real boundaries.`
                : "Push k to 13 and every dot votes, so every new dot gets the overall majority: too large a k erases real boundaries."}
            </p>
            <p>Choosing k trades following noise (small k) against blurring the borders (large k).</p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["k5-at-bad-label"]}>
          {(reach) => {
            const pick = (kk: number, qq: number) => {
              setK(kk);
              setQ(qq);
              if (qq === 0) setSeen((m) => ({ ...m, [kk]: vote(...QUERIES[0], kk) }));
              if (kk === Q_K && qq === 0) reach("k5-at-bad-label");
            };
            const voters = new Set(v.nb.map((n) => n.i));
            return (
              <div className={s.wrap}>
                <svg viewBox="0 0 320 190" className="stage-svg" role="img" aria-label={`New dot with k = ${k}`}>
                  <text x={160} y={14} textAnchor="middle" className={s.small} fill="var(--muted)">
                    {locked ? "Ringed orange dot: a labelling mistake" : `k = ${k}: the ${k} nearest dots vote`}
                  </text>
                  {!locked && (
                    <circle cx={X(qx)} cy={Y(qy)} r={v.radius * 28 + 7} fill="none" stroke="var(--line)" strokeDasharray="4 3" />
                  )}
                  {!locked &&
                    v.nb.map((n) => (
                      <line
                        key={`l${n.i}`}
                        x1={X(qx)}
                        y1={Y(qy)}
                        x2={X(DOTS[n.i].x)}
                        y2={Y(DOTS[n.i].y)}
                        stroke={COL[DOTS[n.i].lab]}
                        strokeWidth={1.5}
                      />
                    ))}
                  {DOTS.map((p, i) => (
                    <g key={i}>
                      <circle
                        cx={X(p.x)}
                        cy={Y(p.y)}
                        r={7}
                        fill={COL[p.lab]}
                        stroke="var(--fg)"
                        strokeWidth={!locked && voters.has(i) ? 2 : 0.8}
                        opacity={locked || voters.has(i) ? 1 : 0.55}
                      />
                      {p.bad && <circle cx={X(p.x)} cy={Y(p.y)} r={11} fill="none" stroke="var(--bad)" strokeWidth={1.5} />}
                    </g>
                  ))}
                  <rect
                    x={X(qx) - 7}
                    y={Y(qy) - 7}
                    width={14}
                    height={14}
                    fill={locked ? "var(--bg-2)" : COL[v.label]}
                    stroke="var(--fg)"
                    strokeWidth={2}
                    transform={`rotate(45 ${X(qx)} ${Y(qy)})`}
                  />
                </svg>
                <Row>
                  {KS.map((kk) => (
                    <Control key={kk} className={k === kk ? "active" : ""} disabled={locked || k === kk} onClick={() => pick(kk, q)}>
                      k = {kk}
                    </Control>
                  ))}
                  <Control disabled={locked} onClick={() => pick(k, (q + 1) % QUERIES.length)}>
                    Move new dot
                  </Control>
                </Row>
                <Row>
                  <Readout label="Votes" value={locked ? "–" : `${v.blue} blue · ${v.orange} orange`} />
                  <Readout label="New dot (◆)" value={locked ? "–" : v.label} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
