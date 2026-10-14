"use client";

// PageRank on ten pages. A (X's linker) and H (a hub) are hand-placed; node size is the score.
// Trap: after round 1 X leads (0.270 v 0.100), which confirms "most links wins". Round 2 flips it.
// Key state: round 2 reached (Step twice, or Settle). The reveal quotes only rounds the learner saw.
// Network stage rules: company/design/reviews/2026-10-14-design-lead-ncm-rulings.md section 2.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { LINKS, PAGES, S, SETTLED_ROUND, score } from "./model";
import s from "./styles.module.css";

const POS: Record<string, [number, number]> = {
  A: [32, 32], B: [32, 98], C: [32, 164], D: [32, 230],
  H: [140, 170], Y: [275, 205],
  X: [175, 60], P: [305, 22], Q: [305, 70], R: [305, 118],
};
const radius = (v: number) => 14 + 30 * v;
const f3 = (v: number) => v.toFixed(3);

function Arrow({ from, to, round, bend }: { from: string; to: string; round: number; bend: number }) {
  const [x1, y1] = POS[from];
  const [x2, y2] = POS[to];
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const ux = dx / len, uy = dy / len;
  const nx = -uy * bend, ny = ux * bend;
  const r1 = radius(score(round, from)), r2 = radius(score(round, to)) + 1;
  const sx = x1 + ux * r1 + nx, sy = y1 + uy * r1 + ny;
  const ex = x2 - ux * r2 + nx, ey = y2 - uy * r2 + ny;
  const bx = ex - ux * 9, by = ey - uy * 9;
  return (
    <g>
      <line x1={sx} y1={sy} x2={bx} y2={by} className={s.edge} />
      <polygon points={`${ex},${ey} ${bx - uy * 4.5},${by + ux * 4.5} ${bx + uy * 4.5},${by - ux * 4.5}`} className={s.head} />
    </g>
  );
}

function Stage({ locked, interact, round, setRound, see }: {
  locked: boolean; interact: () => void; round: number; setRound: (r: number) => void; see: (r: number) => void;
}) {
  const { reach } = useMilestones(interact, ["round-two"]);
  const go = (r: number) => {
    setRound(r);
    see(r);
    if (r >= 2) reach("round-two");
  };
  const x = score(round, "X"), y = score(round, "Y");
  return (
    <div className={s.wrap}>
      <svg viewBox="0 0 340 250" className={`stage-svg ${s.svg}`} role="img"
        aria-label={`Round ${round}. Page X ${f3(x)}, page Y ${f3(y)}. Bigger circle, higher score.`}>
        {LINKS.map(([a, b]) => {
          const pair = (a === "H" && b === "Y") || (a === "Y" && b === "H");
          return <Arrow key={`${a}${b}`} from={a} to={b} round={round} bend={pair ? 6 : 0} />;
        })}
        {PAGES.map((p) => {
          const asked = p === "X" || p === "Y";
          return (
            <g key={p}>
              <circle cx={POS[p][0]} cy={POS[p][1]} r={radius(score(round, p))} className={asked ? s.asked : s.node} />
              <text x={POS[p][0]} y={POS[p][1] + 5} textAnchor="middle" className={s.name}>{p}</text>
            </g>
          );
        })}
      </svg>
      <p className={s.rule}>Each page splits {Math.round(S * 100)}% of its score among its links; all get 1.5% free.</p>
      <p className={s.legend}>Arrow: links to. Size: score.</p>
      <Row>
        <Control disabled={locked || round >= SETTLED_ROUND} onClick={() => go(round + 1)}>Step</Control>
        <Control disabled={locked || round >= SETTLED_ROUND} onClick={() => go(SETTLED_ROUND)}>Settle</Control>
        <Control disabled={locked || round === 0} onClick={() => go(0)}>Reset</Control>
      </Row>
      <Row>
        <Readout label="Round" value={round} />
        <Readout label="Page X" value={f3(x)} />
        <Readout label="Page Y" value={f3(y)} />
      </Row>
    </div>
  );
}

export default function OneGoodLinkBeatsMany({ slug }: { slug: string }) {
  const [round, setRound] = useState(0);
  const [seen, setSeen] = useState<number[]>([]);
  const see = (r: number) => setSeen((p) => (p.includes(r) ? p : [...p, r]));
  const r1 = seen.includes(1), r2 = seen.includes(2), r51 = seen.includes(SETTLED_ROUND);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Page X has 3 links pointing at it. Page Y has 1 link, from page H. After the scores settle, which page ranks higher?",
        options: ["X: three links beat one", "Y: its one link comes from a page many pages link to", "They tie"],
        answer: 1,
      }}
      exploreHint="Press Step twice and watch X and Y. Then Settle."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            {r2 && r1 ? (
              <>After round 1, X led, <strong>{f3(score(1, "X"))}</strong> to {f3(score(1, "Y"))}. By round 2, Y had <strong>{f3(score(2, "Y"))}</strong> and X {f3(score(2, "X"))}, and X never moved again. </>
            ) : null}
            {r51 ? <>At round {SETTLED_ROUND} the scores had settled: Y {f3(score(SETTLED_ROUND, "Y"))}, X {f3(score(SETTLED_ROUND, "X"))}.</> : null}
          </p>
          <p>
            X&rsquo;s three links come from pages nobody links to,{" "}
            {r2 ? <>so each passes on only about {f3(S * score(1, "P"))}.</> : <>so they pass on almost nothing.</>} Y&rsquo;s one link comes from H, which five pages link to, so it passes on far more.
          </p>
          <p>
            A link passes on a share of the linking page&rsquo;s own score. PageRank ranks a page by who links to it, weighted by how important those linkers are.
          </p>
          <p className="muted">A ten-page toy; the real web is far bigger.</p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} round={round} setRound={setRound} see={see} />}
    </Lesson>
  );
}
