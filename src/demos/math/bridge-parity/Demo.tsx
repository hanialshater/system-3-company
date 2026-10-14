"use client";

// Bridge parity. A diagram of Konigsberg's four land areas and seven bridges (layout simplified,
// connections as in Euler 1736: island-north x2, island-south x2, island-east, north-east,
// south-east). The bridges are the controls: from where you stand you may cross any unused
// bridge that touches your place; others are disabled. Every route gets stuck with bridges left.
// "Count bridges at each place" labels each place with its bridge count (5, 3, 3, 3: all odd).
// "Close bridge 7" gives a map with only two odd places, where a full walk exists.
// Key states: stuck on the seven-bridge map; the counts shown.
// DOM order of bridges is chosen so QA's single in-order pass walks N-I-N-E-I-S-I and is stuck.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

type Place = "N" | "I" | "S" | "E";
const NAME: Record<Place, string> = { N: "North bank", I: "Island", S: "South bank", E: "East side" };
const SHORT: Record<Place, string> = { N: "North", I: "Island", S: "South", E: "East" };
// where the walker stands (and the trail turns), where the name (and count tag) sits
const ANCHOR: Record<Place, { x: number; y: number }> = {
  N: { x: 80, y: 24 },
  I: { x: 112, y: 126 },
  S: { x: 80, y: 216 },
  E: { x: 329, y: 150 },
};
const LABEL: Record<Place, { x: number; y: number }> = {
  N: { x: 36, y: 28 },
  I: { x: 135, y: 112 },
  S: { x: 36, y: 220 },
  E: { x: 329, y: 104 },
};
const BRIDGES: { a: Place; b: Place; x: number; y: number; x1: number; y1: number; x2: number; y2: number }[] = [
  { a: "I", b: "N", x: 105, y: 72, x1: 105, y1: 46, x2: 105, y2: 100 },
  { a: "I", b: "N", x: 165, y: 72, x1: 165, y1: 46, x2: 165, y2: 100 },
  { a: "N", b: "E", x: 271, y: 26, x1: 244, y1: 26, x2: 298, y2: 26 },
  { a: "I", b: "E", x: 243, y: 120, x1: 190, y1: 120, x2: 298, y2: 120 },
  { a: "I", b: "S", x: 105, y: 168, x1: 105, y1: 140, x2: 105, y2: 194 },
  { a: "I", b: "S", x: 165, y: 168, x1: 165, y1: 140, x2: 165, y2: 194 },
  { a: "S", b: "E", x: 271, y: 214, x1: 244, y1: 214, x2: 298, y2: 214 },
];
const CLOSABLE = 6; // index of bridge 7
const PLACES: Place[] = ["N", "I", "S", "E"];
const MILESTONES = ["stuck", "counted"] as const;
const W = 360;
const H = 240;

const open = (closed: boolean) => BRIDGES.map((_, i) => !(closed && i === CLOSABLE));
const degree = (p: Place, closed: boolean) => BRIDGES.filter((b, i) => open(closed)[i] && (b.a === p || b.b === p)).length;

export default function BridgeParity({ slug }: { slug: string }) {
  const [closed, setClosed] = useState(false);
  const [start, setStart] = useState<Place>("N");
  const [steps, setSteps] = useState<number[]>([]);
  const [counted, setCounted] = useState(false);
  const [stuckAt, setStuckAt] = useState<{ place: Place; left: number } | null>(null);
  const [solved, setSolved] = useState(false);

  const odd7 = PLACES.filter((p) => degree(p, false) % 2 === 1);
  const counts7 = PLACES.map((p) => degree(p, false)).sort((a, b) => b - a);
  const odd6 = PLACES.filter((p) => degree(p, true) % 2 === 1).length;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Königsberg had 4 pieces of land joined by 7 bridges. Can you walk a route that crosses every bridge exactly once?",
        options: ["Yes", "No", "Only if you start on the island"],
        answer: 1,
      }}
      exploreHint="Tap bridges to walk. Try to cross all seven, then count the bridges at each place."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            <strong>No, from any starting place.</strong>{" "}
            {stuckAt
              ? `You got stuck on the ${NAME[stuckAt.place]} with ${stuckAt.left} bridge${stuckAt.left === 1 ? "" : "s"} still uncrossed, and every route gets stuck.`
              : "Every route gets stuck with a bridge left over."}
          </p>
          <p>
            Each time you pass through a place you use two bridges, one in and one out. So every place in the middle of the
            walk needs an even count; only the start and the end can be odd. On the full seven-bridge map the counts are {counts7.join(", ")}:{" "}
            {odd7.length} odd places, two too many.
            {solved ? ` With bridge 7 closed only ${odd6} places were odd, and you crossed all six.` : ""}
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const reset = () => setSteps([]);
            return (
              <Stage
                locked={locked}
                closed={closed}
                start={start}
                steps={steps}
                counted={counted}
                onCross={(i) => {
                  const next = [...steps, i];
                  setSteps(next);
                  const here = whereAfter(start, next);
                  const used = new Set(next);
                  const avail = BRIDGES.filter((b, j) => open(closed)[j] && !used.has(j));
                  const fromHere = avail.filter((b) => b.a === here || b.b === here);
                  if (avail.length === 0) setSolved(true);
                  else if (fromHere.length === 0 && !closed) {
                    setStuckAt({ place: here, left: avail.length });
                    reach("stuck");
                  }
                }}
                onCount={() => {
                  setCounted(!counted);
                  reach("counted");
                }}
                onClose={() => {
                  setClosed(!closed);
                  reset();
                }}
                onStart={() => {
                  setStart(PLACES[(PLACES.indexOf(start) + 1) % PLACES.length]);
                  reset();
                }}
                onReset={reset}
              />
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

function whereAfter(start: Place, steps: number[]): Place {
  let here = start;
  for (const i of steps) {
    const b = BRIDGES[i];
    here = b.a === here ? b.b : b.a;
  }
  return here;
}

function Stage({
  locked,
  closed,
  start,
  steps,
  counted,
  onCross,
  onCount,
  onClose,
  onStart,
  onReset,
}: {
  locked: boolean;
  closed: boolean;
  start: Place;
  steps: number[];
  counted: boolean;
  onCross: (i: number) => void;
  onCount: () => void;
  onClose: () => void;
  onStart: () => void;
  onReset: () => void;
}) {
  const here = whereAfter(start, steps);
  const isOpen = open(closed);
  const total = isOpen.filter(Boolean).length;
  const used = new Set(steps);
  const left = total - steps.length;
  const canGo = (i: number) => isOpen[i] && !used.has(i) && (BRIDGES[i].a === here || BRIDGES[i].b === here);
  const stuck = left > 0 && !BRIDGES.some((_, i) => canGo(i));

  // trail: start anchor, then bridge midpoint and destination anchor for each step
  const trail: string[] = [`${ANCHOR[start].x},${ANCHOR[start].y}`];
  let at = start;
  for (const i of steps) {
    const b = BRIDGES[i];
    at = b.a === at ? b.b : b.a;
    trail.push(`${b.x},${b.y}`, `${ANCHOR[at].x},${ANCHOR[at].y}`);
  }

  // places the learner passed through (not the start, not the final stop): each used 2 bridges
  const walkVisits: Place[] = [];
  {
    let w = start;
    steps.forEach((i, k) => {
      const b = BRIDGES[i];
      w = b.a === w ? b.b : b.a;
      if (k < steps.length - 1) walkVisits.push(w);
    });
  }

  const caption = locked
    ? "Make a prediction to start."
    : counted && walkVisits.length > 0
      ? "Rings mark places you passed through: 2 bridges each, in and out. Odd places can only be a start or end."
      : counted && closed
        ? "Bridge 7 closed: only 2 places are odd, so a walk can start at one and end at the other. Try all 6."
        : counted
          ? "Passing through uses two bridges, in and out. Odd places can only be a start or end."
      : left === 0
        ? `All ${total} bridges crossed, each exactly once.`
        : stuck
          ? `Stuck on the ${NAME[here]}: ${left} bridge${left === 1 ? "" : "s"} left, none from here.`
          : steps.length === 0
            ? `You are on the ${NAME[start]}. Tap a bridge to cross it.`
            : `On the ${NAME[here]}. ${left} bridge${left === 1 ? "" : "s"} left.`;

  return (
    <div className={s.wrap}>
      <div className={s.map}>
        <svg viewBox={`0 0 ${W} ${H}`} className={s.svg} role="img" aria-label={caption}>
          <rect x={0} y={0} width={W} height={H} className={s.water} />
          <rect x={0} y={0} width={244} height={46} rx={6} className={s.land} />
          <rect x={0} y={194} width={244} height={46} rx={6} className={s.land} />
          <rect x={298} y={0} width={62} height={240} rx={6} className={s.land} />
          {BRIDGES.map((b, i) => (
            <line
              key={i}
              x1={b.x1}
              y1={b.y1}
              x2={b.x2}
              y2={b.y2}
              className={!isOpen[i] ? s.gone : used.has(i) ? s.bridgeUsed : s.bridge}
            />
          ))}
          <ellipse cx={135} cy={120} rx={60} ry={26} className={s.land} />
          {!locked && steps.length > 0 && <polyline points={trail.join(" ")} className={s.trail} />}
          {counted &&
            walkVisits.map((p, k) => (
              <circle key={`pass${k}`} cx={ANCHOR[p].x} cy={ANCHOR[p].y} r={12} className={s.pass} />
            ))}
          {PLACES.map((p) => {
            const d = degree(p, closed);
            return (
              <g key={p}>
                {counted && (
                  <rect x={LABEL[p].x - 33} y={LABEL[p].y - 12} width={66} height={17} rx={4} className={d % 2 ? s.odd : s.even} />
                )}
                <text x={LABEL[p].x} y={LABEL[p].y} className={counted ? s.tag : s.place}>
                  {counted ? `${SHORT[p]} · ${d}` : SHORT[p]}
                </text>
              </g>
            );
          })}
          {!locked && <circle cx={ANCHOR[here].x} cy={ANCHOR[here].y} r={7} className={s.you} />}
        </svg>
        {BRIDGES.map((b, i) =>
          isOpen[i] ? (
            <Control
              key={i}
              disabled={locked || !canGo(i)}
              className={`${s.bridgeBtn} ${used.has(i) ? "active" : ""} ${!locked && canGo(i) ? s.can : ""}`}
              style={{ left: `${(b.x / W) * 100}%`, top: `${(b.y / H) * 100}%` }}
              aria-label={used.has(i) ? `Bridge ${i + 1}, crossed` : `Cross bridge ${i + 1}`}
              onClick={() => onCross(i)}
            >
              {i + 1}
            </Control>
          ) : null,
        )}
      </div>

      <p className={s.caption} aria-live="polite">
        {caption}
      </p>

      <Row>
        <Control disabled={locked} className={counted ? "active" : ""} aria-pressed={counted} onClick={onCount}>
          {counted ? "Hide counts" : "Count bridges"}
        </Control>
        <Control disabled={locked} className={closed ? "active" : ""} aria-pressed={closed} onClick={onClose}>
          {closed ? "Reopen bridge 7" : "Close bridge 7"}
        </Control>
        <Control disabled={locked} onClick={onStart}>
          New start
        </Control>
        <Control disabled={locked || steps.length === 0} onClick={onReset}>
          Restart
        </Control>
        <Readout label="Crossed" value={locked ? "?" : `${steps.length} of ${total}`} />
      </Row>
    </div>
  );
}
