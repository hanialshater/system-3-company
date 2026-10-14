"use client";

// PageRank as a random surfer. Links A->B, B->C, C->A, D->C, E->C. Each click: with probability
// 0.15 jump to a uniformly random page (any of the 5), otherwise follow the page's one link.
// The click stream is seeded (mulberry32 seed 146, two draws per click), so the totals after n clicks
// are the same whatever buttons the learner pressed to get there. One representation: the link graph,
// each page labelled with its share of visits so far.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const PAGES = ["A", "B", "C", "D", "E"] as const;
const OUT = [1, 2, 0, 2, 2]; // A->B, B->C, C->A, D->C, E->C
const IN_LINKS = PAGES.map((_, i) => OUT.filter((t) => t === i).length); // A 1, B 1, C 3, D 0, E 0
const JUMP = 0.15;
const SEED = 146;
const MAX = 100_000;
const POS: [number, number][] = [
  [80, 42], // A
  [80, 178], // B
  [190, 110], // C
  [290, 42], // D
  [290, 178], // E
];
const R = 24;

/** Visits per page after n clicks, where the surfer is, and whether the last click was a jump. */
function surf(n: number) {
  const rng = mulberry32(SEED);
  const visits = [0, 0, 0, 0, 0];
  let at = 0;
  let jumped = false;
  for (let i = 0; i < n; i++) {
    const j = rng();
    const t = rng();
    jumped = j < JUMP;
    at = jumped ? Math.floor(t * PAGES.length) : OUT[at];
    visits[at]++;
  }
  return { visits, at, jumped };
}

const FINAL = surf(MAX).visits;
const pct = (x: number, n: number) => (n ? `${((100 * x) / n).toFixed(1)}%` : "–");

// arrow from page a to page b, trimmed to the circles
function edge(a: number, b: number) {
  const [x1, y1] = POS[a];
  const [x2, y2] = POS[b];
  const d = Math.hypot(x2 - x1, y2 - y1);
  const ux = (x2 - x1) / d;
  const uy = (y2 - y1) / d;
  return { x1: x1 + ux * R, y1: y1 + uy * R, x2: x2 - ux * (R + 6), y2: y2 - uy * (R + 6) };
}

export default function RandomSurferFindsTheRank({ slug }: { slug: string }) {
  const [clicks, setClicks] = useState(0);
  const { visits, at, jumped } = useMemo(() => surf(clicks), [clicks]);
  const shareA = clicks ? visits[0] / clicks : 0;
  const shareC = clicks ? visits[2] / clicks : 0;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A surfer clicks random links forever, jumping anywhere 15% of the time. A has 1 in-link, C has 3. A's visits compared with C's?",
        options: ["About a third", "About half", "Almost the same"],
        answer: 2,
      }}
      exploreHint="Click once to watch a move, then run the surfer to 100,000 clicks."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            After {MAX.toLocaleString("en-US")} clicks your surfer spent {pct(FINAL[0], MAX)} of its time on A and{" "}
            {pct(FINAL[2], MAX)} on C. Three in-links against one, yet almost the same share.
          </p>
          <p>
            A&apos;s one link comes from C, the busiest page, so every visit to C is followed by a trip to A unless the surfer
            jumps. D and E point at C, but the surfer only reaches them by jumping, so their links add little.
          </p>
          <p>
            Those shares are PageRank: the long-run fraction of time a random surfer who sometimes jumps spends on each page.
            Computed directly, A gets 0.312 and C 0.332.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["first-clicks", "long-run"]}>
          {(hit) => {
            const go = (n: number) => {
              if (locked) return;
              const next = Math.min(MAX, n);
              if (next === clicks) return;
              setClicks(next);
              if (next > 0) hit("first-clicks");
              if (next >= MAX) hit("long-run");
            };
            const note =
              clicks === 0
                ? "The surfer starts on A. Each page links to one other page."
                : clicks === 1 || clicks % 1000 === 1
                  ? `Click ${clicks.toLocaleString("en-US")}: ${jumped ? "jumped" : "followed a link"} to ${PAGES[at]}.`
                  : `${clicks.toLocaleString("en-US")} clicks. Shares of time on each page:`;
            return (
              <div className={s.wrap}>
                <p className={s.note}>{note}</p>
                <svg
                  viewBox="0 0 340 230"
                  className="stage-svg"
                  role="img"
                  aria-label={`After ${clicks} clicks: A ${pct(visits[0], clicks)}, C ${pct(visits[2], clicks)}`}
                >
                  <defs>
                    <marker id="rsf-arrow" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                      <path d="M0,0 L10,5 L0,10 z" fill="var(--muted)" />
                    </marker>
                  </defs>
                  {OUT.map((b, a) => {
                    const e = edge(a, b);
                    return (
                      <line
                        key={`${a}-${b}`}
                        {...e}
                        stroke="var(--muted)"
                        strokeWidth={2.5}
                        markerEnd="url(#rsf-arrow)"
                      />
                    );
                  })}
                  {PAGES.map((p, i) => {
                    const here = clicks > 0 && i === at;
                    const share = clicks ? visits[i] / clicks : 0;
                    const [x, y] = POS[i];
                    return (
                      <g key={p}>
                        <circle
                          cx={x}
                          cy={y}
                          r={R}
                          fill={i === 0 || i === 2 ? "var(--domain)" : "var(--bg-2)"}
                          stroke={here ? "var(--fg)" : "var(--line)"}
                          strokeWidth={here ? 4 : 1.5}
                        />
                        <text x={x} y={y + 6} textAnchor="middle" className={i === 0 || i === 2 ? s.pageOn : s.page}>
                          {p}
                        </text>
                        <rect x={x - 26} y={y + R + 6} width={52} height={6} rx={3} fill="var(--line)" />
                        <rect x={x - 26} y={y + R + 6} width={Math.min(52, share * 52 * 2.5)} height={6} rx={3} fill="var(--domain)" />
                        <text x={x} y={y + R + 24} textAnchor="middle" className={s.share}>
                          {pct(visits[i], clicks)}
                        </text>
                        <text x={x} y={y - R - 5} textAnchor="middle" className={s.label}>
                          {IN_LINKS[i]} in
                        </text>
                      </g>
                    );
                  })}
                </svg>
                <Row>
                  <Control disabled={locked || clicks >= MAX} onClick={() => go(clicks + 1)}>
                    1 click
                  </Control>
                  <Control disabled={locked || clicks >= MAX} onClick={() => go(clicks + 1000)}>
                    +1,000 clicks
                  </Control>
                  <Control disabled={locked || clicks >= MAX} onClick={() => go(MAX)}>
                    Run to 100,000
                  </Control>
                  <Control disabled={locked || clicks === 0} onClick={() => go(0)}>
                    Reset
                  </Control>
                </Row>
                <Row>
                  <Readout label="Clicks" value={clicks.toLocaleString("en-US")} />
                  <Readout label="Time on A" value={clicks ? `${(100 * shareA).toFixed(1)}%` : "–"} />
                  <Readout label="Time on C" value={clicks ? `${(100 * shareC).toFixed(1)}%` : "–"} />
                </Row>
                <p className={s.seed}>Seed {SEED}: the same clicks every run.</p>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
