"use client";

// Friends of friends. Two worlds, one picture at a time:
// - Village: 1,000 people in a ring, each knowing the 5 nearest on each side. The picture is the stretch
//   of the ring around you (texture, nothing tappable); people are coloured by their distance from you,
//   computed by breadth-first search over the whole 1,000-ring. From step 2 on, one friend (+3, ringed)
//   shows its 10 links: 7 land on you or your own friends, 3 on new people.
// - No shared friends: every friend brings 9 new people (a tree): 10, 90, 810.
// Chips in brief DOM order: [2 steps] [3 steps] [No shared friends] [Village]; the active one is disabled.
// The table under the picture fills each cell once its world and step have been shown, so it keeps what
// the reveal quotes. Milestones: village at step 2 (the question's case) and the tree at step 3.
// Brief: company/domains/briefs/math.discrete.md #10 (NCM wave J, check N10).

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useRef, useState } from "react";
import s from "./styles.module.css";

const N = 1000;
const HALF = 5;
const MILESTONES = ["village2", "tree3"] as const;

/** Breadth-first distances from person 0 on the ring. */
const RING_DIST: number[] = (() => {
  const dist = Array(N).fill(-1);
  dist[0] = 0;
  const q = [0];
  while (q.length) {
    const u = q.shift()!;
    for (let d = 1; d <= HALF; d++)
      for (const v of [(u + d) % N, (u - d + N) % N])
        if (dist[v] < 0) { dist[v] = dist[u] + 1; q.push(v); }
  }
  return dist;
})();
const ringAt = (k: number) => RING_DIST.filter((x) => x === k).length;
const treeAt = (k: number) => 2 * HALF * (2 * HALF - 1) ** (k - 1);
type World = "village" | "tree";
const at = (w: World, k: number) => (w === "village" ? ringAt(k) : treeAt(k));
const within3 = (w: World) => 1 + at(w, 1) + at(w, 2) + at(w, 3);

const W = 340;
const H = 210;
const LAYER = ["", "var(--domain)", "var(--good)", "var(--fg)"];

// Village: a stretch of a big circle, you at the top.
const SPAN = 17;
const RAD = 470;
const DTH = 9.4 / RAD;
const vpos = (i: number): [number, number] => [170 + RAD * Math.sin(i * DTH), 120 - RAD * Math.cos(i * DTH) + RAD];
const RINGED = 3; // the friend whose links are drawn
const ringedLinks = Array.from({ length: 2 * HALF + 1 }, (_, j) => RINGED - HALF + j).filter((j) => j !== RINGED);

function Village({ step }: { step: number }) {
  const ids = Array.from({ length: 2 * SPAN + 1 }, (_, j) => j - SPAN);
  const [rx, ry] = vpos(RINGED);
  return (
    <g>
      {step >= 2 &&
        ringedLinks.map((j) => {
          const [x, y] = vpos(j);
          const lift = 24 + Math.abs(j - RINGED) * 16;
          return (
            <path
              key={j}
              d={`M${rx},${ry - 7} Q${(rx + x) / 2},${Math.min(ry, y) - lift} ${x},${y - 7}`}
              className={s.link}
            />
          );
        })}
      {ids.map((i) => {
        const d = RING_DIST[(i + N) % N];
        const [x, y] = vpos(i);
        const lit = i !== 0 && d <= step;
        const fade = Math.abs(i) > SPAN - 4 ? 0.35 + 0.15 * (SPAN - Math.abs(i)) : 1;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i === 0 ? 8 : 5.5}
            fill={i === 0 ? "var(--fg)" : lit ? LAYER[d] : "var(--line)"}
            opacity={fade}
          />
        );
      })}
      {step >= 2 && <circle cx={rx} cy={ry} r={9.5} fill="none" stroke="var(--fg)" strokeWidth={2} />}
      <text x={170} y={vpos(0)[1] + 26} textAnchor="middle" className={s.lab}>
        you
      </text>
      {[1, 2, 3]
        .filter((k) => k <= step)
        .flatMap((k) =>
          [-1, 1].map((side) => {
            const [x, y] = vpos(side * (HALF * k - 2));
            return (
              <text key={`${k}${side}`} x={x} y={y + 46} textAnchor="middle" className={s.num} fill={LAYER[k]}>
                {k}
              </text>
            );
          }),
        )}
    </g>
  );
}

// No shared friends: a tree around you.
const CX = 170;
const CY = 105;
const RADII = [0, 34, 66, 98];
function treeAngle(path: number[]): number {
  // path: [friend 0..9, child 0..8, grandchild 0..8]
  let a = (path[0] / 10) * 2 * Math.PI;
  let w = (2 * Math.PI) / 10;
  for (let k = 1; k < path.length; k++) {
    w /= 9;
    a += (path[k] - 4) * w;
  }
  return a - Math.PI / 2;
}
const tp = (path: number[]): [number, number] => {
  const a = treeAngle(path);
  const r = RADII[path.length];
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
};
const F = Array.from({ length: 10 }, (_, i) => i);
const C = Array.from({ length: 9 }, (_, i) => i);

function Tree({ step }: { step: number }) {
  return (
    <g>
      {step >= 3 &&
        F.flatMap((f) =>
          C.flatMap((c) =>
            C.map((g) => {
              const [x, y] = tp([f, c, g]);
              return <circle key={`${f}.${c}.${g}`} cx={x} cy={y} r={1} fill={LAYER[3]} />;
            }),
          ),
        )}
      {step >= 2 &&
        F.flatMap((f) =>
          C.map((c) => {
            const [x1, y1] = tp([f]);
            const [x2, y2] = tp([f, c]);
            return <line key={`l${f}.${c}`} x1={x1} y1={y1} x2={x2} y2={y2} className={f === 0 ? s.linkOn : s.linkFaint} />;
          }),
        )}
      {F.map((f) => {
        const [x, y] = tp([f]);
        return <line key={`y${f}`} x1={CX} y1={CY} x2={x} y2={y} className={f === 0 && step >= 2 ? s.linkOn : s.linkFaint} />;
      })}
      {step >= 2 &&
        F.flatMap((f) =>
          C.map((c) => {
            const [x, y] = tp([f, c]);
            return <circle key={`c${f}.${c}`} cx={x} cy={y} r={2.6} fill={LAYER[2]} />;
          }),
        )}
      {F.map((f) => {
        const [x, y] = tp([f]);
        return <circle key={`f${f}`} cx={x} cy={y} r={4.5} fill={LAYER[1]} />;
      })}
      {step >= 2 && <circle cx={tp([0])[0]} cy={tp([0])[1]} r={8.5} fill="none" stroke="var(--fg)" strokeWidth={2} />}
      <circle cx={CX} cy={CY} r={7} fill="var(--fg)" />
      <text x={CX + 12} y={CY + 18} className={s.lab}>
        you
      </text>
    </g>
  );
}

type Seen = Record<World, number>; // highest step shown in each world

export default function FriendsOfFriendsOverlap({ slug }: { slug: string }) {
  const [world, setWorld] = useState<World>("village");
  const [step, setStep] = useState(1);
  const seen = useRef<Seen>({ village: 1, tree: 0 });

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "You sit in a ring of 1,000 villagers. Each knows the 5 nearest people on each side: 10 friends. How many people, other than you, are friends of your friends but not your own friends?",
        options: ["90", "45", "10"],
        answer: 2,
      }}
      exploreHint="Step out to 2 and 3 steps, then try a world where no two friends know each other."
      minInteractions={MILESTONES.length}
      reveal={() => {
        const sn = seen.current;
        const v3 = sn.village >= 3;
        return (
          <>
            <p>
              In the village, step 2 added only {at("village", 2)} new people
              {v3 ? ` and step 3 another ${at("village", 3)}: ${within3("village")} within 3 steps, counting you` : ""}. The
              ringed friend's 10 links: 7 land on you or your own friends, only 3 are new.
            </p>
            <p>
              With no shared friends every link is new: {at("tree", 2)} at step 2, {at("tree", 3)} at step 3. Multiplying 10 × 9
              assumes none of your friends know each other. In the village they do, so the count stays small.
            </p>
          </>
        );
      }}
    >
      {(ctx) => (
        <Stage {...ctx} world={world} step={step} setWorld={setWorld} setStep={setStep} seen={seen.current} />
      )}
    </Lesson>
  );
}

function Stage({
  locked,
  phase,
  interact,
  world,
  step,
  setWorld,
  setStep,
  seen,
}: StageContext & {
  world: World;
  step: number;
  setWorld: (w: World) => void;
  setStep: (n: number) => void;
  seen: Seen;
}) {
  const { reach } = useMilestones(interact, MILESTONES);
  const pinned = phase === "reveal";
  const shownWorld: World = pinned ? "village" : world;
  const shownStep = pinned ? Math.max(2, Math.min(3, seen.village)) : step;

  const show = (w: World, n: number) => {
    setWorld(w);
    setStep(n);
    seen[w] = Math.max(seen[w], n);
    if (w === "village" && n >= 2) reach("village2");
    if (w === "tree" && n >= 3) reach("tree3");
  };

  const chips: { label: string; on: boolean; go: () => void }[] = [
    { label: "2 steps", on: step === 2, go: () => show(world, 2) },
    { label: "3 steps", on: step === 3, go: () => show(world, 3) },
    { label: "No shared friends", on: world === "tree", go: () => show("tree", step) },
    { label: "Village", on: world === "village", go: () => show("village", step) },
  ];

  const cell = (w: World, k: number) => (seen[w] >= k ? at(w, k) : "?");
  const cls = (w: World, k: number) => (w === shownWorld && k <= shownStep ? s.cur : "");

  return (
    <div className={s.wrap}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={`stage-svg ${s.fit}`}
        role="img"
        aria-label={`${shownWorld === "village" ? "Village" : "No shared friends"}, step ${shownStep}: ${at(shownWorld, shownStep)} people at this step`}
      >
        {shownWorld === "village" ? <Village step={shownStep} /> : <Tree step={shownStep} />}
      </svg>
      <table className={s.table}>
        <thead>
          <tr>
            <th />
            <th className={shownWorld === "village" ? s.cur : ""}>village</th>
            <th className={shownWorld === "tree" ? s.cur : ""}>no shared</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3].map((k) => (
            <tr key={k}>
              <th>step {k}</th>
              <td className={cls("village", k)}>{cell("village", k)}</td>
              <td className={cls("tree", k)}>{cell("tree", k)}</td>
            </tr>
          ))}
          <tr>
            <th>within 3</th>
            <td>{seen.village >= 3 ? within3("village") : "?"}</td>
            <td>{seen.tree >= 3 ? within3("tree") : "?"}</td>
          </tr>
        </tbody>
      </table>
      <Row>
        {chips.map((c) => (
          <Control
            key={c.label}
            disabled={locked || pinned || c.on}
            className={`${s.tap} ${c.on ? "active" : ""}`}
            aria-pressed={c.on}
            onClick={c.go}
          >
            {c.label}
          </Control>
        ))}
      </Row>
    </div>
  );
}
