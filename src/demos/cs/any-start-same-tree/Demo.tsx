"use client";

// Prim's algorithm, side by side. The learner grows a cheap cable network from town A by tapping the
// cheapest cable that leaves the towns already joined (wrong taps are refused with a reason). A friend
// grows one from town E on the same map, one step per accepted cable. The dashed cables are the
// candidates across the cut. The order differs; the cables do not.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control } from "@/kit/controls";
import s from "./styles.module.css";

type Town = "A" | "B" | "C" | "D" | "E";
type Cable = { id: string; a: Town; b: Town; cost: number; t: number };

// The question's order, not sorted by cost. t = where along the cable its cost label sits.
const CABLES: Cable[] = [
  { id: "AB", a: "A", b: "B", cost: 4, t: 0.5 },
  { id: "AC", a: "A", b: "C", cost: 1, t: 0.5 },
  { id: "BC", a: "B", b: "C", cost: 2, t: 0.5 },
  { id: "BD", a: "B", b: "D", cost: 5, t: 0.5 },
  { id: "CD", a: "C", b: "D", cost: 8, t: 0.3 },
  { id: "CE", a: "C", b: "E", cost: 10, t: 0.5 },
  { id: "DE", a: "D", b: "E", cost: 3, t: 0.5 },
  { id: "BE", a: "B", b: "E", cost: 6, t: 0.72 },
];
const TOWNS: Record<Town, { x: number; y: number }> = {
  A: { x: 16, y: 70 },
  B: { x: 62, y: 26 },
  C: { x: 62, y: 114 },
  D: { x: 122, y: 26 },
  E: { x: 150, y: 114 },
};
const ALL: Town[] = ["A", "B", "C", "D", "E"];
const FRIEND_STARTS: Town[] = ["B", "C", "D", "E"];
const YOU: Town = "A";
const NAMES = ["both-complete", "another-start"] as const;
const byId = (id: string) => CABLES.find((c) => c.id === id)!;

// The cables crossing the cut, cheapest first.
const cutOf = (grown: Set<Town>) =>
  CABLES.filter((c) => grown.has(c.a) !== grown.has(c.b)).sort((x, y) => x.cost - y.cost);
const townsOf = (start: Town, order: string[]) => {
  const g = new Set<Town>([start]);
  for (const id of order) {
    g.add(byId(id).a);
    g.add(byId(id).b);
  }
  return g;
};
// Prim from a start: the cheapest cut cable each step (the costs leave no tie at any step).
function prim(start: Town, steps: number): string[] {
  const order: string[] = [];
  const g = new Set<Town>([start]);
  while (order.length < steps && g.size < ALL.length) {
    const c = cutOf(g)[0];
    order.push(c.id);
    g.add(c.a);
    g.add(c.b);
  }
  return order;
}
const total = (order: string[]) => order.reduce((t, id) => t + byId(id).cost, 0);
const DONE = ALL.length - 1;

function Panel({
  title,
  start,
  order,
  locked,
  label,
}: {
  title: string;
  start: Town;
  order: string[];
  locked: boolean;
  label: string;
}) {
  const grown = townsOf(start, order);
  const cut = locked ? [] : cutOf(grown).map((c) => c.id);
  return (
    <div className={s.panel}>
      <p className={s.head}>{title}</p>
      <svg viewBox="0 0 170 140" className="stage-svg" role="img" aria-label={label}>
        {CABLES.map((c) => {
          const p = TOWNS[c.a];
          const q = TOWNS[c.b];
          const k = order.indexOf(c.id);
          const added = k >= 0;
          const isCut = cut.includes(c.id);
          return (
            <line
              key={c.id}
              x1={p.x}
              y1={p.y}
              x2={q.x}
              y2={q.y}
              stroke={added ? "var(--fg)" : isCut ? "var(--domain)" : "var(--line)"}
              strokeWidth={added ? 3.5 : isCut ? 2 : 1.4}
              strokeDasharray={!added && isCut ? "4 3" : undefined}
            />
          );
        })}
        {CABLES.map((c) => {
          const p = TOWNS[c.a];
          const q = TOWNS[c.b];
          const x = p.x + (q.x - p.x) * c.t;
          const y = p.y + (q.y - p.y) * c.t;
          const k = order.indexOf(c.id);
          const len = Math.hypot(q.x - p.x, q.y - p.y);
          // badge sits to one side of the cost label
          const bx = x + (-(q.y - p.y) / len) * 12;
          const by = y + ((q.x - p.x) / len) * 12;
          return (
            <g key={c.id}>
              <text x={x} y={y + 4} textAnchor="middle" className={s.cost}>
                {c.cost}
              </text>
              {k >= 0 && (
                <g>
                  <circle cx={bx} cy={by} r={6.5} fill="var(--fg)" />
                  <text x={bx} y={by + 3.5} textAnchor="middle" className={s.badge}>
                    {k + 1}
                  </text>
                </g>
              )}
            </g>
          );
        })}
        {ALL.map((t) => {
          const on = grown.has(t);
          return (
            <g key={t}>
              <circle
                cx={TOWNS[t].x}
                cy={TOWNS[t].y}
                r={10}
                fill={on ? "var(--domain)" : "var(--bg-2)"}
                stroke={on ? "var(--fg)" : "var(--muted)"}
                strokeWidth={on ? 1.5 : 1.5}
              />
              <text x={TOWNS[t].x} y={TOWNS[t].y + 4} textAnchor="middle" className={on ? s.townOn : s.townOff}>
                {t}
              </text>
            </g>
          );
        })}
      </svg>
      <p className={s.total}>Total {locked ? "?" : total(order)}</p>
    </div>
  );
}

type St = { yours: string[]; fs: Town; seen: Town[]; msg: string };
const START: St = { yours: [], fs: "E", seen: [], msg: "" };

function Stage({
  phase,
  locked,
  reach,
  onState,
}: {
  phase: string;
  locked: boolean;
  reach: (n: (typeof NAMES)[number]) => void;
  onState: (st: St) => void;
}) {
  const [st, setSt] = useState<St>(START);
  const off = locked || phase === "reveal";
  const grown = townsOf(YOU, st.yours);
  const done = st.yours.length === DONE;
  const friend = prim(st.fs, st.yours.length);
  const friendDone = friend.length === DONE;
  const set = (n: St) => {
    setSt(n);
    onState(n);
  };

  const press = (c: Cable) => {
    if (off || st.yours.includes(c.id)) return;
    const tag = `${c.id} ${c.cost}`;
    if (grown.has(c.a) && grown.has(c.b)) return set({ ...st, msg: `${tag}: both towns already joined` });
    if (!grown.has(c.a) && !grown.has(c.b)) return set({ ...st, msg: `${tag}: not next to your towns` });
    if (cutOf(grown)[0].id !== c.id) return set({ ...st, msg: `${tag}: a cheaper cable leaves your towns` });
    const yours = [...st.yours, c.id];
    const complete = yours.length === DONE;
    set({
      ...st,
      yours,
      seen: complete && !st.seen.includes(st.fs) ? [...st.seen, st.fs] : st.seen,
      msg: complete ? "" : `${tag}: added`,
    });
    if (complete) reach("both-complete");
  };
  const pickStart = (t: Town) => {
    if (off || t === st.fs) return;
    set({
      ...st,
      fs: t,
      seen: done && !st.seen.includes(t) ? [...st.seen, t] : st.seen,
      msg: "",
    });
    if (done) reach("another-start");
  };

  const sameCables = done && friendDone && [...st.yours].sort().join() === [...friend].sort().join();
  const text = locked
    ? "Make a prediction to start."
    : st.msg || (done ? (sameCables ? "Same 4 cables" : "") : "Tap the cheapest cable leaving your towns.");

  return (
    <div className={s.wrap}>
      <p className={s.model}>Grow from your start: always add the cheapest cable to a new town.</p>
      <div className={s.panels}>
        <Panel
          title={`You: from ${YOU}`}
          start={YOU}
          order={st.yours}
          locked={locked}
          label={`You from A: ${st.yours.join(", ") || "no cables yet"}, total ${total(st.yours)}`}
        />
        <Panel
          title={`Friend: from ${st.fs}`}
          start={st.fs}
          order={friend}
          locked={locked}
          label={`Friend from ${st.fs}: ${friend.join(", ") || "no cables yet"}, total ${total(friend)}`}
        />
      </div>
      <p className={`${s.msg} ${sameCables ? s.good : ""}`} aria-live="polite">
        {text}
      </p>
      <div className={s.chips}>
        {CABLES.map((c) => {
          const taken = st.yours.includes(c.id);
          return (
            <Control
              key={c.id}
              className={`${s.chip} ${taken ? "active" : ""}`}
              disabled={off || taken || done}
              onClick={() => press(c)}
            >
              {c.id} {c.cost}
            </Control>
          );
        })}
      </div>
      <div className={s.group}>Friend starts at</div>
      <div className={s.starts}>
        {FRIEND_STARTS.map((t) => (
          <Control
            key={t}
            className={`${s.chip} ${t === st.fs ? "active" : ""}`}
            disabled={off || t === st.fs}
            aria-pressed={t === st.fs}
            onClick={() => pickStart(t)}
          >
            {t}
          </Control>
        ))}
      </div>
    </div>
  );
}

export default function AnyStartSameTree({ slug }: { slug: string }) {
  // The reveal quotes only what the learner reached.
  const [run, setRun] = useState<St>(START);
  const mine = run.yours.join(", ");
  const main: Town = run.seen.includes("E") ? "E" : (run.seen[0] ?? "E");
  const others = run.seen.filter((t) => t !== main);
  const theirs = prim(main, DONE).join(", ");
  const list = others.length > 1 ? `${others.slice(0, -1).join(", ")} and ${others[others.length - 1]}` : others.join("");
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Cables: AB 4, AC 1, BC 2, BD 5, CD 8, CE 10, DE 3, BE 6. Grow from town A, always adding the cheapest cable to a new town. A friend starts from E. Whose network is cheaper?",
        options: ["Yours", "Your friend's", "The same"],
        answer: 2,
      }}
      exploreHint="Tap the cheapest cable that leaves your towns, then try other starts for your friend."
      minInteractions={NAMES.length}
      reveal={() => (
        <>
          <p>
            You added {mine}. Your friend from {main} added {theirs}. Same cables, total 11
            {others.length ? `, and the same again from ${list}` : ""}.
          </p>
          <p>
            Whatever towns you have joined, the cheapest cable across the dashed line is always part of the cheapest
            network. So the start changes only the order. With every cable priced differently, only one of the 40 possible networks costs 11.
          </p>
        </>
      )}
    >
      {({ phase, locked, interact }) => (
        <Milestones interact={interact} names={NAMES}>
          {(reach) => <Stage phase={phase} locked={locked} reach={reach} onState={setRun} />}
        </Milestones>
      )}
    </Lesson>
  );
}
