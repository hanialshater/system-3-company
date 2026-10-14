"use client";

// PageRank on ten pages. A (X's linker) and H (a hub) are hand-placed; node size is the score.
// Trap: after round 1 X leads (0.270 v 0.100), which confirms "most links wins". The stage then
// says "Step again", Run is disabled at round 0 and, from round 1, shows round 2 before jumping on; the reveal unlocks at round 2.
// Arrow thickness and the numbers on the four arrows into X and Y show the score passed along links.
// No Reset: the reveal always sits beside the round the learner reached.
// Network stage rules: company/design/reviews/2026-10-14-design-lead-ncm-rulings.md section 2.

import { useEffect, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { LINKS, PAGES, S, SETTLED_ROUND, passed, score } from "./model";
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
  const amt = round > 0 ? passed(round, from) : 0;
  const labelled = round > 0 && (to === "X" || (from === "H" && to === "Y"));
  return (
    <g>
      <line x1={sx} y1={sy} x2={bx} y2={by} className={s.edge} style={{ strokeWidth: 1.5 + amt * 14 }} />
      <polygon points={`${ex},${ey} ${bx - uy * 4.5},${by + ux * 4.5} ${bx + uy * 4.5},${by - ux * 4.5}`} className={s.head} />
      {labelled ? (
        <text x={(sx + ex) / 2} y={(sy + ey) / 2 + (from === "H" ? 16 : -4)} textAnchor="middle" className={s.amt}>{f3(amt)}</text>
      ) : null}
    </g>
  );
}

function Stage({ locked, interact, round, setRound }: {
  locked: boolean; interact: () => void; round: number; setRound: (r: number) => void;
}) {
  const { reach } = useMilestones(interact, ["round-two"]);
  const go = (r: number) => {
    setRound(r);
    if (r >= 2) reach("round-two");
  };
  const [running, setRunning] = useState(false);
  // From round 1, Run shows round 2 for 1.5 s before jumping on, so nobody skips the flip.
  useEffect(() => {
    if (!running || round !== 2) return;
    const t = setTimeout(() => { setRound(SETTLED_ROUND); setRunning(false); }, 1500);
    return () => clearTimeout(t);
  }, [running, round, setRound]);
  const run = () => {
    if (round < 2) { setRunning(true); go(2); } else go(SETTLED_ROUND);
  };
  const x = score(round, "X"), y = score(round, "Y");
  return (
    <div className={s.wrap}>
      <svg viewBox="0 0 340 250" className={`stage-svg ${s.svg}`} role="img"
        aria-label={`Round ${round}. Page X ${f3(x)}, page Y ${f3(y)}. Bigger circle, higher score. Numbers on arrows into X and Y are the score passed that round.`}>
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
      <p className={s.rule}>Each round a page passes {Math.round(S * 100)}% of its score down its links; every page gets a free 1.5%.</p>
      <p className={s.legend}>Size: score. Thick arrow: more passed.</p>
      <Row>
        <Control disabled={locked || running || round >= SETTLED_ROUND} onClick={() => go(round + 1)}>Step</Control>
        <Control disabled={locked || running || round < 1 || round >= SETTLED_ROUND} onClick={run}>Run to round {SETTLED_ROUND}</Control>
      </Row>
      <Row>
        <Readout label="Round" value={round} />
        <Readout label="X" value={f3(x)} />
        <Readout label="Y" value={f3(y)} />
      </Row>
    </div>
  );
}

const hintFor = (round: number) =>
  round === 0 ? "Press Step."
    : round === 1 ? "X leads so far. Step again."
    : round < SETTLED_ROUND ? "Compare the numbers on the arrows into X and Y. Then run to round 51."
    : "The scores have stopped changing.";

export default function OneGoodLinkBeatsMany({ slug }: { slug: string }) {
  const [round, setRound] = useState(0);
  const r51 = round === SETTLED_ROUND;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Every page has a score: how important it is. Page X has 3 links pointing at it. Page Y has 1 link, from page H. After many rounds of updating, which page has the higher score?",
        options: ["X, with 3 links in", "They tie", "Y, with 1 link in"],
        answer: 2,
      }}
      exploreHint={hintFor(round)}
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            After round 1, X led, <strong>{f3(score(1, "X"))}</strong> to {f3(score(1, "Y"))}. By round 2, Y had <strong>{f3(score(2, "Y"))}</strong> and X {f3(score(2, "X"))}, and X never moved again.{" "}
            {r51 ? <>At round {SETTLED_ROUND} the scores had stopped changing: Y {f3(score(SETTLED_ROUND, "Y"))}, X {f3(score(SETTLED_ROUND, "X"))}.</> : null}
          </p>
          <p>
            X&rsquo;s three links come from pages nobody links to, so in round 2 each passed on only about {f3(passed(2, "P"))}. Y&rsquo;s one link comes from H, which five pages link to, so H passed on {f3(passed(2, "H"))}.
          </p>
          <p>
            A link passes on a share of the linking page&rsquo;s own score. PageRank ranks a page by who links to it, weighted by how important those linkers are.
          </p>
          <p className="muted">A ten-page toy; the real web is far bigger.</p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} round={round} setRound={setRound} />}
    </Lesson>
  );
}
