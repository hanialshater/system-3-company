"use client";

// Bridge carries news, not habits. Two complete groups of 5 (A: 0-4, B: 5-9) joined by one link,
// person 4 to Ben (5). People 0 and 1 start. Two spreading rules on the same graph, run in rounds
// (everyone checks their friends at once):
//   habit: join once at least half your friends have (q = 1/2)
//   news:  pass it on from any one friend
// Each rule has its own Step and Run, its own state, and a running count; the picture shows the rule
// last pressed. Habit: round 1 adds 2 and 3 (2 of 4 friends), round 2 adds Ava (4 of 5), round 3
// adds no one: Ben sees 1 of 5 friends (20%) and the habit is stuck. News reaches all 10 in 3 rounds.
// Key states (milestones): the habit stuck at the bridge, the news across it.

import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

type Rule = "habit" | "news";
const N = 10;
const BEN = 5;
const AVA = 4;
const SEEDS = [0, 1];
const MILESTONES = ["habit-stuck", "news-crossed"] as const;

const EDGES: [number, number][] = [];
for (const g of [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9]])
  for (let i = 0; i < 5; i++) for (let j = i + 1; j < 5; j++) EDGES.push([g[i], g[j]]);
EDGES.push([AVA, BEN]);
const NB: number[][] = Array.from({ length: N }, () => []);
for (const [a, b] of EDGES) {
  NB[a].push(b);
  NB[b].push(a);
}

// Group A is a pentagon with Ava pointing east; group B a pentagon with Ben pointing west.
const POS: [number, number][] = Array.from({ length: N }, (_, v) => {
  const inA = v < 5;
  const k = inA ? (v - AVA + 5) % 5 : v - BEN;
  const base = inA ? 0 : Math.PI;
  const a = base + (k * 2 * Math.PI) / 5;
  const cx = inA ? 84 : 256;
  return [cx + 52 * Math.cos(a), 92 - 52 * Math.sin(a)];
});

const adoptingFriends = (v: number, on: Set<number>) => NB[v].filter((u) => on.has(u)).length;
const joins = (rule: Rule, v: number, on: Set<number>) =>
  rule === "news" ? adoptingFriends(v, on) >= 1 : adoptingFriends(v, on) / NB[v].length >= 1 / 2;

/** One round: everyone not yet in checks their friends at the same time. */
function nextRound(rule: Rule, on: Set<number>) {
  const add: number[] = [];
  for (let v = 0; v < N; v++) if (!on.has(v) && joins(rule, v, on)) add.push(v);
  return add;
}

interface Run {
  on: number[];
  round: number;
  lastAdded: number[];
  stuck: boolean; // a round added no one
}
const START: Run = { on: SEEDS, round: 0, lastAdded: SEEDS, stuck: false };
const finished = (r: Run) => r.stuck || r.on.length === N;
function step(rule: Rule, r: Run): Run {
  if (finished(r)) return r;
  const on = new Set(r.on);
  const add = nextRound(rule, on);
  return { on: [...r.on, ...add], round: r.round + 1, lastAdded: add, stuck: add.length === 0 };
}
function runAll(rule: Rule, r: Run): Run {
  let cur = r;
  while (!finished(cur)) cur = step(rule, cur);
  return cur;
}

/** Rounds until the rule has added everyone it ever will (exported for the build note's re-run). */
export const FINAL = { habit: runAll("habit", START), news: runAll("news", START) };

export default function BridgeCarriesNewsNotHabits({ slug }: { slug: string }) {
  const [runs, setRuns] = useState<Record<Rule, Run>>({ habit: START, news: START });
  const [view, setView] = useState<Rule>("habit");
  const habitIn = FINAL.habit.on.length;
  const benSees = adoptingFriends(BEN, new Set(FINAL.habit.on));

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Two groups of 5 joined by one link. Group A adopts. Ben, across the bridge, joins if half his friends have. Does group B adopt?",
        options: ["Yes, all of B", "Only Ben", "No one in B"],
        answer: 2,
      }}
      exploreHint="Run the habit to the end, then run the news on the same people."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            You watched the habit fill group A ({habitIn} people) in {FINAL.habit.round - 1} rounds and then stop. Ben had{" "}
            {benSees} of his {NB[BEN].length} friends adopting, which is {Math.round((100 * benSees) / NB[BEN].length)}%, short of
            half. Nobody else in group B had any.
          </p>
          <p>
            The news crossed the same link and reached all {N} in {FINAL.news.round} rounds, because it needs only one friend.
          </p>
          <p>
            A bridge gives you exactly one friend on the far side: enough for news, too little for a habit that needs
            several friends.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const act = (rule: Rule, all: boolean) => {
              const next = all ? runAll(rule, runs[rule]) : step(rule, runs[rule]);
              setRuns({ ...runs, [rule]: next });
              setView(rule);
              if (rule === "habit" && next.stuck) reach("habit-stuck");
              if (rule === "news" && next.on.length === N) reach("news-crossed");
            };
            return <Stage locked={locked} runs={runs} view={view} onAct={act} />;
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

function caption(rule: Rule, r: Run) {
  if (r.round === 0) return "Two in group A start. Step a spread.";
  if (rule === "habit") {
    if (r.stuck) return `Round ${r.round}: nobody new. The habit is stuck.`;
    return `Habit, round ${r.round}: ${r.lastAdded.length} more join.`;
  }
  if (r.on.length === N) return `News, round ${r.round}: all ${N} heard.`;
  return `News, round ${r.round}: ${r.lastAdded.length} more heard.`;
}

function Stage({
  locked,
  runs,
  view,
  onAct,
}: {
  locked: boolean;
  runs: Record<Rule, Run>;
  view: Rule;
  onAct: (rule: Rule, all: boolean) => void;
}) {
  const r = runs[view];
  const on = new Set(r.on);
  const fresh = new Set(r.round > 0 ? r.lastAdded : []);
  const benCount = adoptingFriends(BEN, on);
  const text = locked ? "Make a prediction to start." : caption(view, r);

  return (
    <div className={s.wrap}>
      <svg viewBox="0 0 340 176" className={`stage-svg ${s.fit}`} role="img" aria-label={text}>
        <text x={84} y={14} className={s.group}>Group A</text>
        <text x={256} y={14} className={s.group}>Group B</text>
        {EDGES.map(([a, b], i) => {
          const bridge = a === AVA && b === BEN;
          return (
            <line
              key={i}
              x1={POS[a][0]}
              y1={POS[a][1]}
              x2={POS[b][0]}
              y2={POS[b][1]}
              className={bridge ? s.bridge : on.has(a) && on.has(b) ? s.edgeOn : s.edge}
            />
          );
        })}
        {POS.map(([x, y], v) => (
          <circle
            key={`${view}-${v}`}
            cx={x}
            cy={y}
            r={11}
            className={`${on.has(v) ? (view === "habit" ? s.habit : s.news) : s.off} ${fresh.has(v) ? s.fresh : ""}`}
          />
        ))}
        <text x={POS[BEN][0] - 14} y={POS[BEN][1] - 12} className={s.name}>Ben</text>
        {!locked && (
          <text x={(POS[AVA][0] + POS[BEN][0]) / 2} y={POS[BEN][1] + 20} className={on.has(BEN) ? s.badge : s.badgeBad}>
            {benCount} of {NB[BEN].length} friends
          </text>
        )}
      </svg>

      <p className={s.caption} aria-live="polite">
        {text}
      </p>

      {(["habit", "news"] as Rule[]).map((rule) => (
        <div key={rule} className={`${s.ruleRow} ${view === rule && !locked ? s.current : ""}`}>
          <span className={s.ruleName}>
            {rule === "habit" ? "Habit: needs half" : "News: needs one"}
            <strong className={s.count}>{locked ? "" : ` ${runs[rule].on.length}/${N}`}</strong>
          </span>
          <Control
            className={s.tap}
            disabled={locked || finished(runs[rule])}
            aria-label={`${rule === "habit" ? "Habit" : "News"}: next round`}
            onClick={() => onAct(rule, false)}
          >
            Step
          </Control>
          <Control
            className={s.tap}
            disabled={locked || finished(runs[rule])}
            aria-label={`${rule === "habit" ? "Habit" : "News"}: run to the end`}
            onClick={() => onAct(rule, true)}
          >
            Run
          </Control>
        </div>
      ))}
    </div>
  );
}
