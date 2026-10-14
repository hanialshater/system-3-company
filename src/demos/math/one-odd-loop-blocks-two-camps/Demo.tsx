"use client";

// One odd loop blocks two camps. Six people A-F in a ring (A top, clockwise) plus one cross link
// A-D. Links are friendly unless marked enemy: A-B and D-E. A two-camp split puts friends together
// and enemies apart. Controls in order: Big ring, Right loop (A-B-C-D), Left loop (A-D-E-F) each
// highlight a loop and count its enemy links; Try all 64 splits brute-forces every camp labelling
// and shows the best one with its broken links; Move enemy link D-E to C-D toggles the second enemy.
// Numbers computed here: as given, ring 2 enemies, each small loop 1, 0 of 64 labellings work (best
// breaks 1 link). Moved: loops 2, 2, 0; 2 of 64 labellings work (one split, camp names swapped).

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
const LOOPS = {
  ring: { label: "Big ring", edges: RING },
  right: { label: "Right loop", edges: [[0, 1], [1, 2], [2, 3], [3, 0]] as Edge[] },
  left: { label: "Left loop", edges: [[0, 3], [3, 4], [4, 5], [5, 0]] as Edge[] },
};
type LoopId = keyof typeof LOOPS;
const LOOP_IDS: LoopId[] = ["ring", "right", "left"];
const MILESTONES = ["odd-loop", "tried-all"] as const;

const same = ([a, b]: Edge, [c, d]: Edge) => (a === c && b === d) || (a === d && b === c);
const isEnemy = (enemies: Edge[], e: Edge) => enemies.some((x) => same(x, e));
const enemyCount = (enemies: Edge[], loop: LoopId) => LOOPS[loop].edges.filter((e) => isEnemy(enemies, e)).length;

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
  const given = tryAll(ENEMIES_AS_GIVEN);
  const fixed = tryAll(ENEMIES_MOVED);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Six people in a ring plus one cross link. Two enemy links; the big ring has an even count. Can they split into two camps?",
        options: ["Yes", "No", "Can't tell from the loops"],
        answer: 1,
      }}
      exploreHint="Count the enemy links on each loop, then try every split."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            The big ring has {enemyCount(ENEMIES_AS_GIVEN, "ring")} enemy links, an even number, but the cross link A-D makes two
            smaller loops with {enemyCount(ENEMIES_AS_GIVEN, "right")} each. Walk round one: every enemy link switches camp, so
            after one switch you come back to A in the other camp. That is why {given.working} of the 64 splits worked.
          </p>
          <p>
            {moved
              ? `When you moved the enemy link to C-D, every loop became even and ${fixed.working} labellings worked: one split, with the camp names swapped.`
              : `Move the enemy link to C-D and every loop is even: then ${fixed.working} labellings work, one split with the camp names swapped.`}{" "}
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
              onLoop={(l) => {
                setLoop(l);
                if (!moved && enemyCount(ENEMIES_AS_GIVEN, l) % 2 === 1) reach("odd-loop");
              }}
              onTry={() => {
                setTried(true);
                if (!moved) reach("tried-all");
              }}
              onMove={() => {
                const back = moved;
                setMoved(!moved);
                if (back && tried) reach("tried-all");
                if (back && loop && enemyCount(ENEMIES_AS_GIVEN, loop) % 2 === 1) reach("odd-loop");
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
  onLoop,
  onTry,
  onMove,
}: {
  locked: boolean;
  loop: LoopId | null;
  tried: boolean;
  moved: boolean;
  onLoop: (l: LoopId) => void;
  onTry: () => void;
  onMove: () => void;
}) {
  const enemies = moved ? ENEMIES_MOVED : ENEMIES_AS_GIVEN;
  const result = tried ? tryAll(enemies) : null;
  const inLoop = (e: Edge) => loop !== null && LOOPS[loop].edges.some((x) => same(x, e));
  const k = loop ? enemyCount(enemies, loop) : 0;
  const caption = locked
    ? "Make a prediction to start."
    : result
      ? result.working === 0
        ? `0 of 64 splits work. Best try still breaks ${result.broken.length} link.`
        : `${result.working} of 64 work: one split, names swapped.`
      : loop
        ? `${LOOPS[loop].label}: ${k} enemy link${k === 1 ? "" : "s"}, ${k % 2 ? "odd" : "even"}.`
        : "Solid: friends. Red dashes: enemies.";

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
            <circle
              cx={x}
              cy={y}
              r={13}
              className={result ? (result.camp[v] ? s.campB : s.campA) : s.person}
            />
            <text x={x} y={y + 4.5} className={s.name}>
              {NAMES[v]}
            </text>
          </g>
        ))}
      </svg>

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
        <Control className={s.tap} disabled={locked} onClick={onMove}>
          {moved ? "Move it back to D-E" : "Move enemy D-E to C-D"}
        </Control>
      </div>
      <Row>
        <Readout label="Loop's enemy links" value={locked || !loop ? "?" : `${k}, ${k % 2 ? "odd" : "even"}`} />
        <Readout label="Splits that work" value={locked || !result ? "?" : `${result.working}/64`} />
      </Row>
    </div>
  );
}
