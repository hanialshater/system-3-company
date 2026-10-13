"use client";

// Checking every pair among n files is n(n-1)/2 comparisons: 5 -> 10, 10 -> 45, 20 -> 190,
// 1,000 -> 499,500. The learner sets the group size; every pair is drawn as a line and the
// sizes they visited are listed with their pair counts. One picture: dots on a ring.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const pairs = (n: number) => (n * (n - 1)) / 2;
const fmt = (n: number) => n.toLocaleString("en-US");
const PRESETS = [5, 10, 20, 1000] as const;
const START = 10;
const BIG = 1000;
const MAX_DRAWN = 20;

const CX = 160;
const CY = 112;
const R = 96;
const pt = (i: number, n: number) => {
  const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
  return [CX + R * Math.cos(a), CY + R * Math.sin(a)] as const;
};

export default function QuadraticWall({ slug }: { slug: string }) {
  const [n, setN] = useState(START);
  const [seen, setSeen] = useState<number[]>([]); // sizes visited, in the order first seen

  const sorted = [...seen].filter((k) => (PRESETS as readonly number[]).includes(k)).sort((a, b) => a - b);
  const drawn = n <= MAX_DRAWN;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Checking every pair among ${START} files takes ${pairs(START)} comparisons. About how many for ${fmt(BIG)} files?`,
        options: [fmt(pairs(START) * (BIG / START)), fmt(pairs(BIG)), fmt(pairs(START) * BIG * BIG)],
        answer: 1,
      }}
      exploreHint="Try 5, 10 and 20 files and watch the pairs. Then 1,000."
      minInteractions={4}
      reveal={() => (
        <>
          <p>
            You saw {sorted.map((k) => `${fmt(k)} files → ${fmt(pairs(k))} pairs`).join(", ")}. Doubling the files from 10 to
            20 multiplied the pairs by {(pairs(20) / pairs(10)).toFixed(1)}, not by 2: each new file has to be checked
            against every file already there.
          </p>
          <p>
            That is n × (n − 1) ÷ 2, so {fmt(BIG)} files need {fmt(BIG)} × {fmt(BIG - 1)} ÷ 2 = {fmt(pairs(BIG))}{" "}
            comparisons: {fmt(pairs(BIG) / pairs(START))} times the work for {BIG / START} times the files. Work that grows with the
            square of the input hits a wall long before the input looks big.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={PRESETS.map((k) => `n${k}`)}>
          {(reach) => {
            const go = (k: number) => {
              if (locked) return;
              setN(k);
              setSeen((x) => (x.includes(k) ? x : [...x, k]));
              reach(`n${k}`);
            };

            const lines: [number, number][] = [];
            if (drawn) for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) lines.push([i, j]);
            // 1,000 dots as one path of tiny marks (no lines: 499,500 would not fit)
            const ring = drawn
              ? ""
              : Array.from({ length: n }, (_, i) => {
                  const [x, y] = pt(i, n);
                  return `M${x.toFixed(1)} ${y.toFixed(1)}h0.01`;
                }).join("");

            return (
              <div className={s.wrap}>
                <svg viewBox="0 0 320 224" className="stage-svg" role="img" aria-label={`${n} files, ${pairs(n)} pairs`}>
                  {lines.map(([i, j]) => {
                    const [x1, y1] = pt(i, n);
                    const [x2, y2] = pt(j, n);
                    return <line key={`${i}-${j}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--domain)" strokeWidth={0.8} opacity={0.55} />;
                  })}
                  {drawn &&
                    Array.from({ length: n }, (_, i) => {
                      const [x, y] = pt(i, n);
                      return <circle key={i} cx={x} cy={y} r={5} fill="var(--fg)" />;
                    })}
                  {!drawn && <path d={ring} stroke="var(--fg)" strokeWidth={2.4} strokeLinecap="round" />}
                  <rect x={CX - 62} y={CY - 26} width={124} height={48} rx={10} fill="var(--bg-2)" opacity={0.92} />
                  <text x={CX} y={CY - 4} textAnchor="middle" className={s.big}>
                    {fmt(pairs(n))}
                  </text>
                  <text x={CX} y={CY + 14} textAnchor="middle" className={s.small}>
                    {drawn ? `pairs among ${n} files` : `pairs: too many to draw`}
                  </text>
                </svg>
                <p className={s.key}>Dot = file · line = one comparison of two files</p>
                <Row>
                  {PRESETS.map((k) => (
                    <Control key={k} className={n === k ? "active" : ""} disabled={locked || (n === k && seen.includes(k))} onClick={() => go(k)}>
                      {fmt(k)} files
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Slider label="Files" value={Math.min(n, MAX_DRAWN)} min={2} max={MAX_DRAWN} disabled={locked} onChange={(v) => go(v)} />
                </Row>
                <p className={s.log}>
                  {sorted.length ? sorted.map((k) => `${fmt(k)} → ${fmt(pairs(k))}`).join(" · ") : " "}
                </p>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
