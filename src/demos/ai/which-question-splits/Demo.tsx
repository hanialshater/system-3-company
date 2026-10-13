"use client";

// Decision-tree split toy. Labels at x = 1..8: 0,0,1,0,1,1,1,1. A cut between two dots makes a left
// and a right group; weighted Gini = sum over groups of (size / 8) * (1 - p1^2 - p0^2).
// Cuts: 1|2 0.357, 2|3 0.208, 3|4 0.367, 4|5 0.1875 (lowest), 5|6 0.300, 6|7 0.375, 7|8 0.429. Deterministic.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
const LABELS = [0, 0, 1, 0, 1, 1, 1, 1];
const n = LABELS.length;
const gini = (g: number[]) => {
  if (g.length === 0) return 0;
  const p = g.reduce((a, b) => a + b, 0) / g.length;
  return 1 - p * p - (1 - p) * (1 - p);
};
/** Weighted Gini for a cut after the c-th dot (c = 1..7, cut between dot c and c + 1). */
const weighted = (c: number) => {
  const l = LABELS.slice(0, c);
  const r = LABELS.slice(c);
  return (l.length * gini(l) + r.length * gini(r)) / n;
};
const CUTS = Array.from({ length: n - 1 }, (_, i) => i + 1);
const OPTION_CUTS = [2, 4, 6]; // 2|3, 4|5, 6|7
const BEST = CUTS.reduce((a, b) => (weighted(b) < weighted(a) ? b : a)); // 4
// MODEL END

const f2 = (v: number) => v.toFixed(2);
const cutName = (c: number) => `${c}|${c + 1}`;

export default function WhichQuestionSplits({ slug }: { slug: string }) {
  const [cut, setCut] = useState(1);
  const [seen, setSeen] = useState<number[]>([1]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Labels at x = 1 to ${n}: ${LABELS.join(", ")}. One cut splits the dots into two groups. Which cut leaves the least mixed groups (lowest weighted Gini)?`,
        options: OPTION_CUTS.map((c) => `Between ${c} and ${c + 1}`),
        answer: OPTION_CUTS.indexOf(BEST),
      }}
      exploreHint="Try all three cuts and compare their mix scores."
      minInteractions={OPTION_CUTS.length}
      reveal={() => (
        <>
          <p>
            {OPTION_CUTS.map((c) => `${cutName(c)} scored ${f2(weighted(c))}`).join(", ")}. At {cutName(BEST)} the left group{" "}
            {LABELS.slice(0, BEST).join(",")} has one stray and the right group is all 1s.
          </p>
          <p>
            At 2|3 the left is pure too, but the stray 0 at x = 4 sits in the big right group of six, which counts for more.
          </p>
          <p>
            A tree picks its first question by trying cuts and keeping the one whose groups come out most alike: the lowest mix
            score.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={OPTION_CUTS.map((c) => `cut-${c}`)}>
          {(reach) => {
            const go = (c: number) => {
              setCut(c);
              setSeen((xs) => (xs.includes(c) ? xs : [...xs, c]));
              if (OPTION_CUTS.includes(c)) reach(`cut-${c}`);
            };
            const X = (i: number) => 30 + i * 37; // dot i (0-based)
            const cutX = (c: number) => (X(c - 1) + X(c)) / 2;
            const left = LABELS.slice(0, cut);
            const right = LABELS.slice(cut);
            const seenBest = seen.reduce((a, b) => (weighted(b) < weighted(a) ? b : a));
            const summary = (name: string, g: number[], y: number) => {
              const ones = g.filter((v) => v === 1).length;
              return (
                <text x={6} y={y} className={s.small} fill="var(--fg)">
                  {name} group: {ones} × 1, {g.length - ones} × 0 · Gini {f2(gini(g))}
                </text>
              );
            };
            return (
              <div className={s.wrap}>
                <span className={`tag ${s.model}`}>Toy labels</span>
                <p className={s.caption}>Gini mix: 0 = one label only, 0.5 = half and half. Weighted by group size.</p>
                <svg viewBox="0 0 320 185" className="stage-svg" role="img" aria-label={`Cut ${cutName(cut)}`}>
                  {LABELS.map((v, i) => (
                    <g key={i}>
                      <circle cx={X(i)} cy={50} r={11} fill={v === 1 ? "var(--domain)" : "var(--bg-2)"} stroke={v === 1 ? "var(--domain)" : "var(--muted)"} strokeWidth={2} />
                      <text x={X(i)} y={54} textAnchor="middle" className={s.label} fill="var(--fg)">
                        {v}
                      </text>
                      <text x={X(i)} y={78} textAnchor="middle" className={s.tiny} fill="var(--muted)">
                        x={i + 1}
                      </text>
                    </g>
                  ))}
                  {!locked && (
                    <>
                      <line x1={cutX(cut)} y1={22} x2={cutX(cut)} y2={90} stroke="var(--fg)" strokeWidth={3} />
                      <rect x={X(0) - 12} y={86} width={X(cut - 1) - X(0) + 24} height={5} rx={2} fill="var(--fg)" opacity={0.35} />
                      <rect x={X(cut) - 12} y={86} width={X(n - 1) - X(cut) + 24} height={5} rx={2} fill="var(--domain)" opacity={0.5} />
                      {summary("Left", left, 110)}
                      {summary("Right", right, 128)}
                    </>
                  )}
                  {CUTS.map((c) =>
                    !locked && seen.includes(c) ? (
                      <text key={c} x={cutX(c)} y={170} textAnchor="middle" className={s.tiny} fill={c === seenBest ? "var(--good)" : "var(--muted)"}>
                        {f2(weighted(c))}
                      </text>
                    ) : null,
                  )}
                  {!locked && (
                    <text x={6} y={156} className={s.tiny} fill="var(--muted)">
                      cuts tried, weighted Gini:
                    </text>
                  )}
                </svg>
                <Row>
                  <Slider label="Cut position" value={cut} min={1} max={n - 1} disabled={locked} format={cutName} onChange={go} />
                </Row>
                <Row>
                  {OPTION_CUTS.map((c) => (
                    <Control key={c} className={cut === c ? "active" : ""} disabled={locked || cut === c} onClick={() => go(c)}>
                      Cut {cutName(c)}
                    </Control>
                  ))}
                  <Readout label="Weighted Gini" value={locked ? "–" : f2(weighted(cut))} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
