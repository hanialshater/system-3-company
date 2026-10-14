"use client";

// Strong Allee-effect toy: dN/dt = 0.1 N (N/50 - 1)(1 - N/1000), N animals, Euler step 0.5 year, 60 years.
// Below 50 animals the growth rate is negative (mates are hard to find); above 50 it is positive up to
// room for 1000. Start 40: under 1 animal at year 54; start 60: about 1000 by year 60 (near 1000 by ~30) (script:
// artifacts/scratch/w5life/allee.mjs). The threshold 50 and the rate 0.1 are invented.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const DT = 0.5, YEARS = 60, THRESH = 50, CAP = 1000;
const STARTS = [40, 60, 20, 80];
const step = (N: number) => N + DT * 0.1 * N * (N / THRESH - 1) * (1 - N / CAP);
function sim(n0: number) {
  const pts: number[] = [];
  let N = n0, extinct: number | null = null;
  for (let i = 0; i <= YEARS / DT; i++) {
    if (i % 2 === 0) {
      const yr = i / 2;
      pts.push(N);
      if (extinct === null && N < 1) extinct = yr;
    }
    N = step(N);
  }
  return { pts, extinct, final: pts[pts.length - 1] };
}
const SIMS = Object.fromEntries(STARTS.map((n) => [n, sim(n)])) as Record<number, ReturnType<typeof sim>>;
const fmt = (n: number) => Math.round(n).toLocaleString("en-US");
const outcome = (n0: number) => {
  const r = SIMS[n0];
  return r.extinct !== null ? `dies out (under 1 animal by year ${r.extinct})` : `grows to about ${fmt(r.final)}`;
};

const W = 320, H = 150, L = 34, R = 10, T = 8, B = 22;
const px = (yr: number) => L + ((W - L - R) * yr) / YEARS;
const py = (N: number) => T + (H - T - B) * (1 - Math.log10(Math.max(N, 1)) / 3);

function Stage({ locked, rel, release, clear }: { locked: boolean; rel: number[]; release: (n: number) => void; clear: () => void }) {
  const last = rel[rel.length - 1];
  const msg = locked
    ? `Toy: room for ${fmt(CAP)}. Log scale.`
    : last === undefined
      ? "Release a group and watch the years go by."
      : `Start ${last}: ${outcome(last)}.`;
  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.svg}`} role="img" aria-label={msg}>
        {[1, 10, 100, 1000].map((n) => (
          <g key={n}>
            <line x1={L} x2={W - R} y1={py(n)} y2={py(n)} className={s.grid} />
            <text x={L - 4} y={py(n) + 3} textAnchor="end" className={s.axis}>{fmt(n)}</text>
          </g>
        ))}
        {!locked && (
          <>
            <line x1={L} x2={W - R} y1={py(THRESH)} y2={py(THRESH)} className={s.thresh} />
            <text x={W - R} y={py(THRESH) - 3} textAnchor="end" className={s.axis}>{THRESH}: mates found</text>
          </>
        )}
        <text x={px(0)} y={H - 6} className={s.axis}>0</text>
        <text x={px(YEARS)} y={H - 6} textAnchor="end" className={s.axis}>{YEARS} years</text>
        {!locked && rel.map((n) => {
          const r = SIMS[n];
          const up = n > THRESH;
          const end = r.extinct === null ? r.pts.length : r.extinct + 1;
          const pts = r.pts.slice(0, end).map((v, yr) => `${px(yr).toFixed(1)},${py(v).toFixed(1)}`).join(" ");
          return (
            <g key={n}>
              <polyline points={pts} className={up ? s.up : s.down} />
              <text x={px(0) + 3} y={up ? py(n) - 4 : py(n) + 11} className={s.start}>{n}</text>
              {r.extinct !== null && (
                <text x={px(r.extinct)} y={py(1) - 3} textAnchor="middle" className={s.x}>✕</text>
              )}
            </g>
          );
        })}
      </svg>
      <p className={s.msg} aria-live="polite">{msg}</p>
      <Row>
        {STARTS.map((n) => (
          <Control key={n} disabled={locked || rel.includes(n)} onClick={() => release(n)}>Release {n}</Control>
        ))}
        <Control disabled={locked || rel.length === 0} onClick={clear}>Clear</Control>
      </Row>
    </div>
  );
}

export default function BelowTheThresholdCrash({ slug }: { slug: string }) {
  const [rel, setRel] = useState<number[]>([]);
  const [seen, setSeen] = useState<number[]>([]);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `These animals need mates nearby to breed. Two groups start with 40 and 60, with room for ${fmt(CAP)}. After many years:`,
        options: ["Both grow to 1,000", "The group of 40 dies out; 60 grows", "Both die out"],
        answer: 1,
      }}
      exploreHint="Release the group of 40 and the group of 60 and compare."
      minInteractions={2}
      reveal={() => {
        const list = STARTS.filter((n) => seen.includes(n)).sort((a, b) => a - b);
        return (
          <>
            <p>
              You released {list.join(", ")}: {list.map((n) => `${n} ${outcome(n)}`).join("; ")}.
            </p>
            <p>
              The same species has two fates, split by the line at {THRESH}. The line is the group size, {THRESH}, below which animals struggle to find mates. Below it each animal finds fewer mates, so the group shrinks faster; above it the group grows until food limits it at {fmt(CAP)}. Small does not always mean slow recovery: below the threshold it means none. Toy model: the threshold and rate are invented.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact, phase }) => (
        <Milestones interact={interact} names={["released-40", "released-60"]}>
          {(reach) => (
            <Stage
              locked={locked}
              rel={phase === "reveal" ? STARTS.filter((n) => seen.includes(n)) : rel}
              release={(n) => {
                setRel((x) => [...x, n]);
                setSeen((x) => (x.includes(n) ? x : [...x, n]));
                if (n === 40) reach("released-40");
                if (n === 60) reach("released-60");
              }}
              clear={() => setRel([])}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
