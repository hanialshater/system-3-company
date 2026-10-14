"use client";

// One odd loop blocks two camps. Six people A-F in a ring (A top, clockwise) plus one cross link
// A-D. Links are friendly unless marked enemy: A-B and D-E. A two-camp split puts friends together
// and enemies apart. Controls in order: Big ring, Right loop (A-B-C-D), Left loop (A-D-E-F) each
// highlight a loop and count its enemy links; Try all 64 splits brute-forces every camp labelling
// and shows the best one with its broken links; Move enemy link D-E to C-D toggles the second enemy.
// Numbers computed here: as given, ring 2 enemies, each small loop 1, 0 of 64 labellings work (best
// breaks 1 link). Moved: loops 2, 2, 0; 2 of 64 labellings work (one split, camp names swapped).
// v2 (r6): selecting a loop walks it from A on stage: each person on the loop is tinted by the camp the walk
// gives them, switching at every red link, and A gets an outer ring in the camp the walk returns with (a clash
// mark when odd). A legend is always shown; the best-try caption names the two camps and the thick broken link.
// The enemy position is two buttons ("Enemy on D-E" / "Enemy on C-D"), not one that relabels itself. Loop counts
// and split results are recorded per layout in a row the reveal quotes.
// v3 (W-265, phone fit): "Try all 64 splits" shares one three-column row with the two enemy buttons (DOM order
// unchanged), and the reveal is trimmed from 95 to 81 words, so the ring stays on screen at 390x844 at the reveal.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const NAMES = ["A", "B", "C", "D", "E", "F"];
type Edge = [number, number];
const RING: Edge[] = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]];
const CHORD: Edge = [0, 3];
const EDGES: Edge[] = [...RING, CHORD];
const ENEMIES_AS_GIVEN: Edge[] = [[0, 1], [3, 4]];
const ENEMIES_MOVED: Edge[] = [[0, 1], [2, 3]];
const pathEdges = (p: number[]): Edge[] => p.map((v, i) => [v, p[(i + 1) % p.length]] as Edge);
const LOOPS = {
  ring: { label: "Big ring", path: [0, 1, 2, 3, 4, 5], edges: pathEdges([0, 1, 2, 3, 4, 5]) },
  right: { label: "Right loop", path: [0, 1, 2, 3], edges: pathEdges([0, 1, 2, 3]) },
  left: { label: "Left loop", path: [0, 3, 4, 5], edges: pathEdges([0, 3, 4, 5]) },
};
type LoopId = keyof typeof LOOPS;
const LOOP_IDS: LoopId[] = ["ring", "right", "left"];
const MILESTONES = ["odd-loop", "tried-all"] as const;

const same = ([a, b]: Edge, [c, d]: Edge) => (a === c && b === d) || (a === d && b === c);
const isEnemy = (enemies: Edge[], e: Edge) => enemies.some((x) => same(x, e));
const enemyCount = (enemies: Edge[], loop: LoopId) => LOOPS[loop].edges.filter((e) => isEnemy(enemies, e)).length;
/** Walk a loop from A: camp 0 at A, switch at each enemy link. Returns each visited person's camp and A's camp on return. */
function walk(enemies: Edge[], loop: LoopId) {
  const p = LOOPS[loop].path;
  const camp: Record<number, number> = { [p[0]]: 0 };
  let c = 0;
  p.forEach((v, i) => {
    const next = p[(i + 1) % p.length];
    if (isEnemy(enemies, [v, next])) c = 1 - c;
    if (i < p.length - 1) camp[next] = c;
  });
  return { camp, back: c };
}
type Layout = "given" | "moved";
type Seen = Record<Layout, { loops: Partial<Record<LoopId, number>>; working?: number }>;
const LAYOUT_NAME: Record<Layout, string> = { given: "enemy on D-E", moved: "enemy on C-D" };

/** Every labelling of the 6 people into camps 0/1; a link is broken if friends are split or enemies share a camp. */
export function tryAll(enemies: Edge[]) {
  let working = 0;
  let best = { broken: [] as Edge[], camp: [] as number[] };
  let bestCount = Infinity;
  for (let m = 0; m < 64; m++) {
    const camp = NAMES.map((_, i) => (m >> i) & 1);
    const broken = EDGES.filter((e) => (camp[e[0]] === camp[e[1]]) === isEnemy(enemies, e));
    if (broken.length === 0) working++;
    if (broken.length < bestCount) {
      bestCount = broken.length;
      best = { broken, camp };
    }
  }
  return { working, ...best };
}

const POS: [number, number][] = NAMES.map((_, i) => {
  const ang = ((90 - 60 * i) * Math.PI) / 180;
  return [170 + 76 * Math.cos(ang), 98 - 76 * Math.sin(ang)];
});

export default function OneOddLoopBlocksTwoCamps({ slug }: { slug: string }) {
  const [loop, setLoop] = useState<LoopId | null>(null);
  const [tried, setTried] = useState(false);
  const [moved, setMoved] = useState(false);
  const [seen, setSeen] = useState<Seen>({ given: { loops: {} }, moved: { loops: {} } });
  const g = seen.given;
  const m = seen.moved;
  const ringG = g.loops.ring ?? enemyCount(ENEMIES_AS_GIVEN, "ring");
  const oddG = (["right", "left"] as LoopId[]).filter((l) => g.loops[l] !== undefined);
  const record = (lay: Layout, l: LoopId | null, tr: boolean) =>
    setSeen((s0) => {
      const enemies = lay === "moved" ? ENEMIES_MOVED : ENEMIES_AS_GIVEN;
      const cur = s0[lay];
      return {
        ...s0,
        [lay]: {
          loops: l ? { ...cur.loops, [l]: enemyCount(enemies, l) } : cur.loops,
          working: tr ? tryAll(enemies).working : cur.working,
        },
      };
    });

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Friends share a camp; enemies sit in opposite camps. Six people in a ring plus one cross link A-D; the red dashed links are enemies. Can they split into two camps?",
        options: ["Yes", "No", "Can't tell from the loops"],
        answer: tryAll(ENEMIES_AS_GIVEN).working > 0 ? 0 : 1,
      }}
      exploreHint="Walk each loop from A, then try every split."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Your big ring had {ringG} enemy links, even, but the cross link A-D makes two smaller loops
            {oddG.length ? ` (${oddG.map((l) => `${LOOPS[l].label.toLowerCase()}: ${g.loops[l]}`).join(", ")})` : ""}, each
            odd. Every red link switched camp, so those walks came back to A in the other camp: {g.working ?? tryAll(ENEMIES_AS_GIVEN).working}{" "}
            of 64 splits worked.
          </p>
          <p>
            {m.working !== undefined
              ? `With the enemy on C-D every loop was even and ${m.working} of 64 worked (one split, names swapped).`
              : `With the enemy on C-D every loop is even: ${tryAll(ENEMIES_MOVED).working} of 64 work (one split, names swapped).`}{" "}
            A network splits into two camps exactly when every loop has an even number of enemy links.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              loop={loop}
              tried={tried}
              moved={moved}
              seen={seen}
              onLoop={(l) => {
                setLoop(l);
                record(moved ? "moved" : "given", l, tried);
                if (!moved && enemyCount(ENEMIES_AS_GIVEN, l) % 2 === 1) reach("odd-loop");
              }}
              onTry={() => {
                setTried(true);
                record(moved ? "moved" : "given", loop, true);
                if (!moved) reach("tried-all");
              }}
              onMove={(to) => {
                setMoved(to);
                record(to ? "moved" : "given", loop, tried);
                if (!to && tried) reach("tried-all");
                if (!to && loop && enemyCount(ENEMIES_AS_GIVEN, loop) % 2 === 1) reach("odd-loop");
              }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}

function Stage({
  locked,
  loop,
  tried,
  moved,
  seen,
  onLoop,
  onTry,
  onMove,
}: {
  locked: boolean;
  loop: LoopId | null;
  tried: boolean;
  moved: boolean;
  seen: Seen;
  onLoop: (l: LoopId) => void;
  onTry: () => void;
  onMove: (to: boolean) => void;
}) {
  const enemies = moved ? ENEMIES_MOVED : ENEMIES_AS_GIVEN;
  const result = tried ? tryAll(enemies) : null;
  const inLoop = (e: Edge) => loop !== null && LOOPS[loop].edges.some((x) => same(x, e));
  const k = loop ? enemyCount(enemies, loop) : 0;
  const w = !locked && loop && !result ? walk(enemies, loop) : null;
  const caption = locked
    ? "Make a prediction to start."
    : result
      ? result.working === 0
        ? `0 of 64 splits work. Best try (filled vs dotted camps) still breaks ${result.broken.length} link (thick).`
        : `${result.working} of 64 work: one split, names swapped.`
      : loop && w
        ? `${LOOPS[loop].label}: ${k} enemy link${k === 1 ? "" : "s"}. Walk from A, switching at each: back at A in the ${w.back ? "other camp: clash" : "same camp"}.`
        : "Pick a loop to walk it from A.";
  const rows = (Object.keys(seen) as Layout[])
    .filter((lay) => Object.keys(seen[lay].loops).length || seen[lay].working !== undefined)
    .map(
      (lay) =>
        `${LAYOUT_NAME[lay]}: ${LOOP_IDS.filter((l) => seen[lay].loops[l] !== undefined)
          .map((l) => `${LOOPS[l].label.toLowerCase()} ${seen[lay].loops[l]}`)
          .join(", ")}${seen[lay].working !== undefined ? `; ${seen[lay].working}/64 work` : ""}`,
    );

  return (
    <div className={s.wrap}>
      <svg viewBox="0 0 340 196" className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
        {EDGES.map((e) => {
          const enemy = isEnemy(enemies, e);
          const broken = result?.broken.some((x) => same(x, e));
          return (
            <g key={e.join("-")}>
              {inLoop(e) && (
                <line x1={POS[e[0]][0]} y1={POS[e[0]][1]} x2={POS[e[1]][0]} y2={POS[e[1]][1]} className={s.loop} />
              )}
              <line
                x1={POS[e[0]][0]}
                y1={POS[e[0]][1]}
                x2={POS[e[1]][0]}
                y2={POS[e[1]][1]}
                className={`${enemy ? s.enemy : s.friend} ${broken ? s.broken : ""}`}
              />
            </g>
          );
        })}
        {POS.map(([x, y], v) => (
          <g key={v}>
            {w && v === 0 && <circle cx={x} cy={y} r={18} fill="none" className={w.back ? s.backB : s.backA} />}
            <circle
              cx={x}
              cy={y}
              r={13}
              className={
                result ? (result.camp[v] ? s.campB : s.campA) : w && w.camp[v] !== undefined ? (w.camp[v] ? s.campB : s.campA) : s.person
              }
            />
            <text x={x} y={y + 4.5} className={s.name}>
              {NAMES[v]}
            </text>
          </g>
        ))}
      </svg>

      <p className={s.legend}>Green solid: friends · red dashes: enemies</p>
      <p className={s.caption} aria-live="polite">
        {caption}
      </p>

      <div className={s.loops} role="group" aria-label="Count enemy links on a loop">
        {LOOP_IDS.map((l) => (
          <Control
            key={l}
            className={`${s.tap} ${loop === l ? "active" : ""}`}
            disabled={locked || loop === l}
            onClick={() => onLoop(l)}
          >
            {LOOPS[l].label}
          </Control>
        ))}
      </div>
      <div className={s.actions}>
        <Control className={s.tap} disabled={locked || tried} onClick={onTry}>
          Try all 64 splits
        </Control>
        <Control className={`${s.tap} ${!moved ? "active" : ""}`} disabled={locked || !moved} onClick={() => onMove(false)}>
          Enemy on D-E
        </Control>
        <Control className={`${s.tap} ${moved ? "active" : ""}`} disabled={locked || moved} onClick={() => onMove(true)}>
          Enemy on C-D
        </Control>
      </div>
      <Row>
        <Readout label="Loop's enemy links" value={locked || !loop ? "?" : `${k}, ${k % 2 ? "odd" : "even"}`} />
        <Readout label="Splits that work" value={locked || !result ? "?" : `${result.working}/64`} />
      </Row>
      <p className={s.legend}>{locked ? "" : rows.join(" · ")}</p>
    </div>
  );
}
