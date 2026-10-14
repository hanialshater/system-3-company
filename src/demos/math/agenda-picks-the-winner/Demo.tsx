"use client";

// Agenda picks the winner. Three voters with fixed rankings; every voter votes for whichever of
// the two options on the ballot they rank higher (sincere voting); the option with 2 votes wins.
// An agenda chip runs two votes: first pair, then the winner against the held-back option.
// A beats B, B beats C, C beats A (each 2-1), so the option held to the last vote wins.
// Key state: all three agendas run (one milestone per chip). All numbers come from RANK.

import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

type Opt = "A" | "B" | "C";
const RANK: Opt[][] = [
  ["A", "B", "C"],
  ["B", "C", "A"],
  ["C", "A", "B"],
];
// Agenda = [first, second, held back to the last vote]
const AGENDAS: [Opt, Opt, Opt][] = [
  ["A", "B", "C"],
  ["B", "C", "A"],
  ["A", "C", "B"],
];
const MILESTONES = ["agenda-1", "agenda-2", "agenda-3"] as const;
const OPTS: Opt[] = ["A", "B", "C"];

const votesFor = (x: Opt, y: Opt) => RANK.filter((r) => r.indexOf(x) < r.indexOf(y)).length;
const duel = (x: Opt, y: Opt) => {
  const vx = votesFor(x, y);
  const vy = RANK.length - vx;
  return vx > vy ? { win: x, lose: y, w: vx, l: vy } : { win: y, lose: x, w: vy, l: vx };
};
const run = (ag: [Opt, Opt, Opt]) => {
  const v1 = duel(ag[0], ag[1]);
  const v2 = duel(v1.win, ag[2]);
  return { v1, v2, champ: v2.win };
};
const key = (x: Opt, y: Opt) => [x, y].sort().join("");
const label = (ag: [Opt, Opt, Opt]) => `${ag[0]} vs ${ag[1]}, then ${ag[2]}`;

// triangle: A top, B bottom right, C bottom left (arrows run clockwise)
const POS: Record<Opt, { x: number; y: number }> = { A: { x: 80, y: 20 }, B: { x: 140, y: 108 }, C: { x: 20, y: 108 } };
const NODE_R = 14;

export default function AgendaPicksTheWinner({ slug }: { slug: string }) {
  const [ran, setRan] = useState<number[]>([]);
  const [cur, setCur] = useState<number | null>(null);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Three voters rank A, B, C. First vote: A against B. The winner then faces C. Who wins?",
        options: OPTS,
        answer: OPTS.indexOf(run(AGENDAS[0]).champ),
      }}
      exploreHint="Run all three agendas and watch who wins."
      minInteractions={MILESTONES.length}
      reveal={() => {
        const out = AGENDAS.map((ag) => `${label(ag)} elects ${run(ag).champ}`);
        return (
          <>
            <p>
              <strong>Same voters, same rankings, three winners.</strong> {out[0]}; {out[1]}; {out[2]}. The option held back to the
              last vote won every time.
            </p>
            <p>
              {/* v3 (learner r9, W-577): tightened from 94 to 86 words; no sentence dropped. */}
              Each voter&apos;s ranking is consistent, yet the group&apos;s majorities loop: A beats B, B beats C, C beats A, each 2 to 1.
              No option is the majority favourite, so whoever sets the order picks the winner, as long as everyone votes for the
              option they like better.
            </p>
          </>
        );
      }}
    >
      {({ locked, phase, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              reveal={phase === "reveal"}
              ran={ran}
              cur={cur}
              onRun={(i) => {
                setCur(i);
                setRan((r) => (r.includes(i) ? r : [...r, i]));
                reach(MILESTONES[i]);
              }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}

function Stage({ locked, reveal, ran, cur, onRun }: { locked: boolean; reveal: boolean; ran: number[]; cur: number | null; onRun: (i: number) => void }) {
  const seen = new Set<string>();
  const arrows: { win: Opt; lose: Opt }[] = [];
  for (const i of ran) {
    const r = run(AGENDAS[i]);
    for (const d of [r.v1, r.v2]) {
      if (!seen.has(key(d.win, d.lose))) {
        seen.add(key(d.win, d.lose));
        arrows.push({ win: d.win, lose: d.lose });
      }
    }
  }
  // the reveal pins the stage to the agenda the question asked about (agenda 0)
  const shownIdx = reveal ? 0 : cur;
  const ag = shownIdx === null || locked ? null : AGENDAS[shownIdx];
  const shown = ag ? run(ag) : null;
  const pairs: [Opt, Opt][] = [
    ["A", "B"],
    ["B", "C"],
    ["C", "A"],
  ];
  const caption = locked ? "Predict first." : shown ? `${seen.size} of 3 pairs seen.` : "Pick an agenda.";

  const edge = (a: Opt, b: Opt, shrinkEnd: number) => {
    const p = POS[a];
    const q = POS[b];
    const d = Math.hypot(q.x - p.x, q.y - p.y);
    const ux = (q.x - p.x) / d;
    const uy = (q.y - p.y) / d;
    return { x1: p.x + ux * NODE_R, y1: p.y + uy * NODE_R, x2: q.x - ux * shrinkEnd, y2: q.y - uy * shrinkEnd };
  };

  return (
    <div className={s.wrap}>
      <div className={s.voters} role="group" aria-label="Voter rankings, best first">
        {RANK.map((r, i) => (
          <div key={i} className={s.voter} aria-label={`Voter ${i + 1}: ${r.join(" then ")}`}>
            <span className={s.vname}>{i + 1}</span>
            <span className={s.rk}>{r.join(" > ")}</span>
          </div>
        ))}
      </div>

      {reveal ? (
        <p className={s.asked}>Your question: {label(AGENDAS[0])}</p>
      ) : (
        <div className={s.chips} role="group" aria-label="Agenda">
          {AGENDAS.map((a, i) => (
            <Control key={i} disabled={locked} className={cur === i ? "active" : ""} aria-pressed={cur === i} onClick={() => onRun(i)}>
              {label(a)}
            </Control>
          ))}
        </div>
      )}

      <div className={s.lower}>
        <div className={s.votes} aria-live="polite">
          <p className={s.vote}>
            <span className={s.vn}>Vote 1</span>
            {ag && shown ? (
              <span>
                {ag[0]} vs {ag[1]}: <strong>{shown.v1.win}</strong> {shown.v1.w}–{shown.v1.l}
              </span>
            ) : (
              <span>?</span>
            )}
          </p>
          <p className={s.vote}>
            <span className={s.vn}>Vote 2</span>
            {ag && shown ? (
              <span>
                {shown.v1.win} vs {ag[2]}: <strong>{shown.v2.win}</strong> {shown.v2.w}–{shown.v2.l}
              </span>
            ) : (
              <span>?</span>
            )}
          </p>
          <p className={s.champ}>Winner: {shown ? shown.champ : "?"}</p>
        </div>

        <svg viewBox="0 0 160 128" className={`stage-svg ${s.tri}`} role="img" aria-label={`Who beats whom: ${seen.size} of 3 pairs seen`}>
          <defs>
            <marker id="agenda-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill="var(--fg)" />
            </marker>
          </defs>
          {pairs.map(([a, b]) => {
            const hit = arrows.find((x) => key(x.win, x.lose) === key(a, b));
            if (!hit) return <line key={key(a, b)} {...edge(a, b, NODE_R)} className={s.unseen} />;
            return <line key={key(a, b)} {...edge(hit.win, hit.lose, NODE_R + 2)} className={s.beat} markerEnd="url(#agenda-arrow)" />;
          })}
          {OPTS.map((o) => {
            const on = shown?.champ === o;
            return (
              <g key={o}>
                <circle cx={POS[o].x} cy={POS[o].y} r={NODE_R} className={on ? s.nodeOn : s.node} />
                <text x={POS[o].x} y={POS[o].y + 5} className={on ? s.lblOn : s.lbl}>
                  {o}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <p className={s.caption}>{caption}</p>
      <p className={s.legend}>Arrow: beats, 2–1. Filled: winner.</p>
    </div>
  );
}
