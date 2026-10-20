"use client";

// Self-selection bias. A town split 50/50 on a plan; opponents reply to an open web poll at twice the rate of
// backers, so each web reply backs the plan with chance 1/3 at any size. Random calls ask anyone, and everyone
// answers (a model assumption, claim c4), so each call backs it with chance 1/2.
// Seeded polls (seeds fixed by size, not chosen for their result): web 1,000 mulberry32(591) 35.3% ±3.0;
// web 10,000 (592) 32.3% ±0.9; web 100,000 (593) 33.1% ±0.3; random 1,000 calls mulberry32(59) 48.7% ±3.1
// (the brief's seed). Margin = 1.96 sqrt(p(1-p)/n) at the observed share, in points.
// One row per poll (a forest plot): a poll's row appears when it is run and stays, so all four results are on
// the stage at the reveal. Presets in DOM order: 1,000 web, 100,000 web, 1,000 calls, 10,000 web (question last).
// Milestones: web100k, calls, web10k.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Row } from "@/kit/controls";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

type Poll = { id: string; button: string; label: string; n: number; p: number; seed: number };
const POLLS: Poll[] = [
  { id: "web1k", button: "1,000 web replies", label: "1,000 web", n: 1000, p: 1 / 3, seed: 591 },
  { id: "web10k", button: "10,000 web replies", label: "10,000 web", n: 10000, p: 1 / 3, seed: 592 },
  { id: "web100k", button: "100,000 web replies", label: "100,000 web", n: 100000, p: 1 / 3, seed: 593 },
  { id: "calls", button: "1,000 random calls", label: "1,000 calls", n: 1000, p: 1 / 2, seed: 59 },
];
const ORDER = ["web1k", "web100k", "calls", "web10k"]; // DOM order of the buttons
const MILESTONES = ["web100k", "calls", "web10k"] as const;

type Res = { share: number; margin: number };
function run(poll: Poll): Res {
  const rng = mulberry32(poll.seed);
  let a = 0;
  for (let i = 0; i < poll.n; i++) if (rng() < poll.p) a++;
  const sh = a / poll.n;
  return { share: Math.round(1000 * sh) / 10, margin: Math.round(1960 * Math.sqrt((sh * (1 - sh)) / poll.n)) / 10 };
}
const RESULTS: Record<string, Res> = Object.fromEntries(POLLS.map((p) => [p.id, run(p)]));
const pct = (x: number) => `${x.toFixed(1)}%`;

const W = 320;
const X0 = 84;
const XMAX = 60; // axis 0..60%, bars start at 0
const PX = (W - X0 - 46) / XMAX;
const ROW0 = 26;
const ROWH = 26;
const xOf = (v: number) => X0 + v * PX;

function Stage({ locked, reach, current, setCurrent, run: ran, setRun }: {
  locked: boolean;
  reach: (n: string) => void;
  current: string | null;
  setCurrent: (v: string) => void;
  run: string[];
  setRun: (v: string[]) => void;
}) {
  const pick = (id: string) => {
    if (locked || id === current) return;
    setCurrent(id);
    if (!ran.includes(id)) setRun([...ran, id]);
    reach(id);
  };
  const cur = locked ? null : current;
  const curPoll = POLLS.find((p) => p.id === cur);

  return (
    <div className={s.wrap}>
      <p className={s.msg}>
        {locked
          ? "Make a prediction to start."
          : "Web: opponents reply twice as often. Calls: random."}
      </p>
      <svg viewBox={`0 0 ${W} ${ROW0 + ROWH * POLLS.length + 4}`} className={`stage-svg ${s.svg}`} role="img" aria-label={curPoll ? `${curPoll.button}: ${pct(RESULTS[curPoll.id].share)} back the plan` : "Share backing the plan; whole town 50%"}>
        <text x={X0} y={11} className={s.small}>Backing the plan</text>
        <line x1={X0} x2={X0} y1={ROW0 - 8} y2={ROW0 + ROWH * POLLS.length - 4} className={s.axis} />
        <line x1={xOf(50)} x2={xOf(50)} y1={14} y2={ROW0 + ROWH * POLLS.length - 4} className={s.town} />
        <text x={xOf(50)} y={11} textAnchor="middle" className={s.small}>town 50%</text>
        {POLLS.map((p, k) => {
          const y = ROW0 + k * ROWH;
          const shown = !locked && ran.includes(p.id);
          const r = RESULTS[p.id];
          const on = cur === p.id;
          return (
            <g key={p.id} className={on ? s.on : s.off}>
              <text x={X0 - 6} y={y + 9} textAnchor="end" className={s.label}>{p.label}</text>
              {shown && (
                <>
                  <rect x={X0} y={y} width={r.share * PX} height={12} rx={2} className={p.p === 0.5 ? s.barCall : s.bar} />
                  <line x1={xOf(r.share - r.margin)} x2={xOf(r.share + r.margin)} y1={y + 6} y2={y + 6} className={s.whisker} />
                  <line x1={xOf(r.share - r.margin)} x2={xOf(r.share - r.margin)} y1={y + 1} y2={y + 11} className={s.whisker} />
                  <line x1={xOf(r.share + r.margin)} x2={xOf(r.share + r.margin)} y1={y + 1} y2={y + 11} className={s.whisker} />
                  <text x={xOf(XMAX) + 4} y={y + 10} className={s.label}>{pct(r.share)}</text>
                </>
              )}
            </g>
          );
        })}
      </svg>
      <Row>
        {ORDER.map((id) => {
          const p = POLLS.find((q) => q.id === id)!;
          return (
            <Control key={id} disabled={locked} className={!locked && current === id ? "active" : ""} aria-pressed={!locked && current === id} onClick={() => pick(id)}>
              {p.button}
            </Control>
          );
        })}
      </Row>
    </div>
  );
}

export default function TenThousandRepliesStillWrong({ slug }: { slug: string }) {
  const [current, setCurrent] = useState<string | null>(null);
  const [ran, setRun] = useState<string[]>([]);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: "A town is split 50/50 on a plan. Opponents are twice as likely to answer an open web poll. What share of the 10,000 replies back it?",
        options: ["About 50%", "About 40%", "About 33%"],
        answer: 2,
      }}
      exploreHint="Try each poll; watch each bar and its margin."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            With 10,000 replies the web poll says {pct(RESULTS.web10k.share)} back the plan, and at 100,000 it still said{" "}
            {pct(RESULTS.web100k.share)}. Opponents reply twice as often, so every batch of replies holds two opponents per
            backer, however many arrive.
          </p>
          <p>
            More replies only shrink the margin around the wrong answer. The 1,000 random calls said{" "}
            {pct(RESULTS.calls.share)}, near the truth, because everyone had the same chance of being asked.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => <Stage locked={locked} reach={reach} current={current} setCurrent={setCurrent} run={ran} setRun={setRun} />}
        </Milestones>
      )}
    </Lesson>
  );
}
