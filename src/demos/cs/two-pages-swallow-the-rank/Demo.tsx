"use client";

// Rank sink. Six pages; E and F link only to each other (dashed outline, no arrow leaves it).
// Chips set the number of rounds (5 or 50) and the jump rule (none or 15% random jumps); the active chip
// is disabled. Bars beside each page are its score. Milestones: 50 rounds with no jumps (the question's
// case, 100.0%) and 50 rounds with jumps (69.9%). Both 50-round results are kept in a trace line, so the
// reveal's two numbers stay on the stage whichever state the learner leaves it in.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { LINKS, PAGES, type Page, pct, scores, sinkShare } from "./model";
import s from "./styles.module.css";

const POS: Record<Page, [number, number]> = {
  A: [44, 40], B: [44, 140], C: [128, 90], D: [196, 90], E: [270, 40], F: [270, 140],
};
// Bar anchor (left x, baseline y) beside each page.
const BAR: Record<Page, [number, number]> = {
  A: [10, 58], B: [10, 158], C: [142, 76], D: [214, 124], E: [292, 58], F: [292, 158],
};
const R = 17;
const BAR_PX = 70; // px per whole score

function Arrow({ from, to, bend }: { from: Page; to: Page; bend: number }) {
  const [x1, y1] = POS[from];
  const [x2, y2] = POS[to];
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const ux = dx / len, uy = dy / len;
  const nx = -uy * bend, ny = ux * bend;
  const sx = x1 + ux * R + nx, sy = y1 + uy * R + ny;
  const ex = x2 - ux * (R + 1) + nx, ey = y2 - uy * (R + 1) + ny;
  const bx = ex - ux * 9, by = ey - uy * 9;
  return (
    <g>
      <line x1={sx} y1={sy} x2={bx} y2={by} className={s.edge} />
      <polygon points={`${ex},${ey} ${bx - uy * 4.5},${by + ux * 4.5} ${bx + uy * 4.5},${by - ux * 4.5}`} className={s.head} />
    </g>
  );
}

const ROUNDS = [5, 50] as const;

function Stage({ locked, interact, rounds, jumps, set, seen }: {
  locked: boolean; interact: () => void; rounds: number; jumps: boolean;
  set: (rounds: number, jumps: boolean) => void; seen: { basic: boolean; jumps: boolean };
}) {
  const { reach } = useMilestones(interact, ["basic-50", "jumps-50"]);
  const go = (r: number, j: boolean) => {
    set(r, j);
    if (r === 50) reach(j ? "jumps-50" : "basic-50");
  };
  const v = scores(rounds, jumps);
  const share = sinkShare(rounds, jumps);
  return (
    <div className={s.wrap}>
      <svg viewBox="0 0 340 180" className={`stage-svg ${s.svg}`} role="img"
        aria-label={`Round ${rounds}, ${jumps ? "with" : "no"} random jumps. E and F hold ${pct(share)} of the score. Bars beside each page show its score.`}>
        <rect x={232} y={6} width={104} height={168} rx={14} className={s.group} />
        <text x={316} y={95} textAnchor="middle" className={s.groupLabel}>E + F</text>
        {PAGES.flatMap((p) => LINKS[p].map((q) => {
          const pair = (p === "E" && q === "F") || (p === "F" && q === "E");
          return <Arrow key={`${p}${q}`} from={p} to={q} bend={pair ? 7 : 0} />;
        }))}
        {PAGES.map((p) => {
          const [bx, by] = BAR[p];
          const h = v[p] * BAR_PX;
          const sink = p === "E" || p === "F";
          return (
            <g key={p}>
              <line x1={bx - 2} y1={by} x2={bx + 12} y2={by} className={s.base} />
              <rect x={bx} y={by - h} width={10} height={h} className={sink ? s.barSink : s.bar} />
              <circle cx={POS[p][0]} cy={POS[p][1]} r={R} className={s.node} />
              <text x={POS[p][0]} y={POS[p][1] + 5} textAnchor="middle" className={s.name}>{p}</text>
            </g>
          );
        })}
      </svg>
      <p className={s.rule}>{jumps ? "15% of each score jumps to a random page." : "Every page splits its score among its links."}</p>
      <Row>
        {ROUNDS.map((r) => (
          <Control key={r} disabled={locked || rounds === r} className={rounds === r ? "active" : ""} onClick={() => go(r, jumps)}>
            {r} rounds
          </Control>
        ))}
      </Row>
      <Row>
        <Control disabled={locked || jumps} className={jumps ? "active" : ""} onClick={() => go(rounds, true)}>Add 15% random jumps</Control>
        <Control disabled={locked || !jumps} className={!jumps ? "active" : ""} onClick={() => go(rounds, false)}>No jumps</Control>
      </Row>
      <Row>
        <Readout label="Round" value={rounds} />
        <Readout label="E + F" value={pct(share)} />
      </Row>
      {seen.basic || seen.jumps ? (
        <p className={s.trace}>
          At 50: {seen.basic ? <>no jumps <strong>{pct(sinkShare(50, false))}</strong></> : null}
          {seen.basic && seen.jumps ? ", " : null}
          {seen.jumps ? <>jumps <strong>{pct(sinkShare(50, true))}</strong></> : null}
        </p>
      ) : null}
    </div>
  );
}

export default function TwoPagesSwallowTheRank({ slug }: { slug: string }) {
  const [rounds, setRounds] = useState(0);
  const [jumps, setJumps] = useState(false);
  const [seen, setSeen] = useState({ basic: false, jumps: false });
  const set = (r: number, j: boolean) => {
    setRounds(r);
    setJumps(j);
    if (r === 50) setSeen((p) => (j ? { ...p, jumps: true } : { ...p, basic: true }));
  };
  const hint = !seen.basic && !seen.jumps ? "Run the rounds and watch E + F."
    : !seen.jumps ? "Now add 15% random jumps at 50 rounds."
    : !seen.basic ? "Now try 50 rounds with no jumps."
    : "Compare the two 50-round results.";
  const a = scores(50, false);
  const aToD = a.A + a.B + a.C + a.D;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "E and F link only to each other. Each round every page splits its score among its links. After 50 rounds, E and F hold:",
        options: ["About 33%", "About 67%", "About 100%"],
        answer: 2,
      }}
      exploreHint={hint}
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            No arrow leaves the E + F outline, so score that reaches E or F never comes back out. Round by round it drains in: your 50 rounds left E and F with <strong>{pct(sinkShare(50, false))}</strong> and A to D with {pct(aToD)}. That is a rank sink.
          </p>
          <p>
            With 15% random jumps, part of every score lands on a random page each round, so E and F kept <strong>{pct(sinkShare(50, true))}</strong> and every page kept some. PageRank adds these jumps to fix sinks.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} rounds={rounds} jumps={jumps} set={set} seen={seen} />}
    </Lesson>
  );
}
