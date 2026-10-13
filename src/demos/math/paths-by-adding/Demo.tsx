"use client";

// Paths by adding. A BLOCKS x BLOCKS grid of city blocks has (BLOCKS+1)^2 corners. Start is
// bottom-left with 1 route. The learner taps corners to fill them; a corner can be filled
// once the corners west and south of it are filled, and its count is their sum (every
// shortest route arrives from one of the two). Buttons are in row order from Start, so the
// QA walk fills the whole grid. Key state: a corner with two neighbours, then the far corner.

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const BLOCKS = 3;
const K = BLOCKS + 1;
const MILESTONES = ["first-sum", "far-corner"] as const;

const key = (c: number, r: number) => `${c},${r}`;
const pos = (c: number, r: number) => ({ left: `${8 + (c * 84) / BLOCKS}%`, top: `${92 - (r * 84) / BLOCKS}%` });

function binom(n: number, k: number) {
  let x = 1;
  for (let i = 1; i <= k; i++) x = (x * (n - k + i)) / i;
  return Math.round(x);
}
const ROUTES = binom(2 * BLOCKS, BLOCKS);
// The distinct counts above 1 that the filled grid shows, smallest first (2, 3, 4, 6, 10, 20 for 3 blocks).
const SUMS = [...new Set(Array.from({ length: K * K }, (_, i) => binom((i % K) + Math.floor(i / K), i % K)))]
  .filter((v) => v > 1)
  .sort((a, b) => a - b);

type Filled = Record<string, number>;
const START: Filled = { [key(0, 0)]: 1 };

export default function PathsByAdding({ slug }: { slug: string }) {
  const [filled, setFilled] = useState<Filled>(START);
  const [last, setLast] = useState<[number, number] | null>(null);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `On a ${BLOCKS}-by-${BLOCKS} grid of blocks, how many shortest routes go from one corner to the opposite one (only east or north)?`,
        options: [String(2 * BLOCKS), String(BLOCKS * BLOCKS), String(ROUTES)],
        answer: 2,
      }}
      exploreHint="Fill the corners from Start. Each one adds the two before it."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            <strong>{ROUTES}.</strong> You never listed a route. Every route into a corner arrives from the west or from
            the south, so each count was the two before it added: edges of 1s, then {SUMS.slice(0, -1).join(", ")} and {ROUTES} at the
            far corner.
          </p>
          <p>
            Tilt the grid so Start is on top and these numbers are Pascal&apos;s triangle, where each entry is the sum of
            the two above it. {ROUTES} sits in the middle of row {2 * BLOCKS}: pick which {BLOCKS} of the {2 * BLOCKS} moves
            go east.
          </p>
        </>
      )}
    >
      {(ctx) => <Stage {...ctx} filled={filled} setFilled={setFilled} last={last} setLast={setLast} />}
    </Lesson>
  );
}

function Stage({
  locked,
  interact,
  filled,
  setFilled,
  last,
  setLast,
}: StageContext & {
  filled: Filled;
  setFilled: (f: Filled) => void;
  last: [number, number] | null;
  setLast: (v: [number, number] | null) => void;
}) {
  const { reach } = useMilestones(interact, MILESTONES);
  const has = (c: number, r: number) => filled[key(c, r)] !== undefined;
  const val = (c: number, r: number) => filled[key(c, r)] ?? 0;
  const ready = (c: number, r: number) => !has(c, r) && (c === 0 || has(c - 1, r)) && (r === 0 || has(c, r - 1));

  const fill = (c: number, r: number) => {
    const v = (c > 0 ? val(c - 1, r) : 0) + (r > 0 ? val(c, r - 1) : 0);
    setFilled({ ...filled, [key(c, r)]: v });
    setLast([c, r]);
    if (c > 0 && r > 0) reach("first-sum");
    if (c === BLOCKS && r === BLOCKS) reach("far-corner");
  };

  let caption = "Make a prediction to start.";
  if (!locked) {
    if (!last) caption = "Start has 1 route: stay put. Tap a corner next to it.";
    else {
      const [c, r] = last;
      const w = c > 0 ? val(c - 1, r) : 0;
      const so = r > 0 ? val(c, r - 1) : 0;
      if (c === BLOCKS && r === BLOCKS) caption = `${w} from the west + ${so} from the south = ${val(c, r)} routes. No listing needed.`;
      else if (c === 0 || r === 0) caption = "Along the edge there is only 1 way: straight.";
      else caption = `${w} from the west + ${so} from the south = ${val(c, r)} routes.`;
    }
  }

  const cells: [number, number][] = [];
  for (let r = 0; r < K; r++) for (let c = 0; c < K; c++) cells.push([c, r]);

  return (
    <div className={s.wrap}>
      <div className={s.board}>
        <svg viewBox="0 0 100 100" className={s.streets} aria-hidden="true">
          {Array.from({ length: K }, (_, i) => {
            const t = 8 + (i * 84) / BLOCKS;
            return (
              <g key={i}>
                <line x1={8} y1={t} x2={92} y2={t} className={s.street} />
                <line x1={t} y1={8} x2={t} y2={92} className={s.street} />
              </g>
            );
          })}
          {last && last[0] > 0 && (
            <line x1={8 + ((last[0] - 1) * 84) / BLOCKS} y1={92 - (last[1] * 84) / BLOCKS} x2={8 + (last[0] * 84) / BLOCKS} y2={92 - (last[1] * 84) / BLOCKS} className={s.feed} />
          )}
          {last && last[1] > 0 && (
            <line x1={8 + (last[0] * 84) / BLOCKS} y1={92 - ((last[1] - 1) * 84) / BLOCKS} x2={8 + (last[0] * 84) / BLOCKS} y2={92 - (last[1] * 84) / BLOCKS} className={s.feed} />
          )}
        </svg>
        {cells.map(([c, r]) =>
          c === 0 && r === 0 ? (
            <div key="start" className={`${s.node} ${s.start}`} style={pos(0, 0)}>
              1
            </div>
          ) : (
            <Control
              key={key(c, r)}
              disabled={locked || !ready(c, r)}
              className={`${s.node} ${has(c, r) ? s.done : ""} ${last && last[0] === c && last[1] === r ? s.last : ""} ${c === BLOCKS && r === BLOCKS ? s.end : ""}`}
              style={pos(c, r)}
              aria-label={has(c, r) ? `Corner ${c} east, ${r} north: ${val(c, r)} routes` : `Fill corner ${c} east, ${r} north`}
              onClick={() => fill(c, r)}
            >
              {has(c, r) ? val(c, r) : !locked && ready(c, r) ? "?" : ""}
            </Control>
          ),
        )}
        <span className={s.tagStart} style={pos(0, 0)}>
          Start
        </span>
        <span className={s.tagEnd} style={pos(BLOCKS, BLOCKS)}>
          End
        </span>
      </div>

      <p className={s.caption} aria-live="polite">
        {caption}
      </p>
    </div>
  );
}
