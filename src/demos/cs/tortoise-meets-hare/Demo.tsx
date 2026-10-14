"use client";

// A chain of 7 boxes whose last arrow goes back to box 3 (or to nowhere). Two markers start on box 1:
// slow moves 1 box per tick, fast moves 2. The learner presses a tick tape: only the next tile is live,
// so each press is exactly one tick, and played tiles scrub back. The readout counts the gap down
// 3, 2, 1, 0. One representation: the chain, with the tape as its time axis.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control } from "@/kit/controls";
import s from "./styles.module.css";

const TAIL_END = 3; // the last arrow goes back to this box in the looping list
const LAST = 7;
const TILES = 8;
const NAMES = ["met", "no-loop"] as const;

type Pos = { s: number; f: number };
const next = (b: number, nowhere: boolean): number | null => (b < LAST ? b + 1 : nowhere ? null : TAIL_END);

// Marker positions at tick t. Fast stops on the last box in the nowhere list.
function at(t: number, nowhere: boolean): Pos {
  let sl = 1;
  let fa = 1;
  for (let k = 0; k < t; k++) {
    sl = next(sl, nowhere) ?? sl;
    const a = next(fa, nowhere);
    fa = a === null ? fa : (next(a, nowhere) ?? a);
  }
  return { s: sl, f: fa };
}
// The run halts when the markers share a box, or when fast has no arrow left to follow.
const halted = (t: number, nowhere: boolean) => {
  const p = at(t, nowhere);
  return t > 0 && (p.s === p.f || next(p.f, nowhere) === null);
};
const haltTick = (nowhere: boolean) => {
  for (let t = 1; t <= TILES; t++) if (halted(t, nowhere)) return t;
  return TILES;
};
// How many boxes fast is behind slow along the ring (boxes 3..7), once both are in it.
function gapOf(p: Pos): number | null {
  if (p.s < TAIL_END || p.f < TAIL_END) return null;
  const ring = LAST - TAIL_END + 1;
  return ((((p.s - TAIL_END) - (p.f - TAIL_END)) % ring) + ring) % ring;
}

// Box centres: tail on the left, the ring on the right.
const RING_C = { x: 247, y: 84 };
const RING_R = 52;
const rad = (d: number) => (d * Math.PI) / 180;
const CENTRE: Record<number, { x: number; y: number }> = {
  1: { x: 28, y: 84 },
  2: { x: 96, y: 84 },
  ...Object.fromEntries(
    [3, 4, 5, 6, 7].map((b, i) => [
      b,
      { x: RING_C.x + RING_R * Math.cos(rad(180 + 72 * i)), y: RING_C.y + RING_R * Math.sin(rad(180 + 72 * i)) },
    ]),
  ),
};
const HALF = 17;

function Arrow({ from, to }: { from: number; to: number }) {
  const a = CENTRE[from];
  const b = CENTRE[to];
  const d = Math.hypot(b.x - a.x, b.y - a.y);
  const ux = (b.x - a.x) / d;
  const uy = (b.y - a.y) / d;
  const cut = HALF + 2;
  return (
    <line
      x1={a.x + ux * cut}
      y1={a.y + uy * cut}
      x2={b.x - ux * (cut + 1)}
      y2={b.y - uy * (cut + 1)}
      stroke="var(--muted)"
      strokeWidth={1.5}
      markerEnd="url(#th-arrow)"
    />
  );
}

function Slow({ x, y, ghost }: { x: number; y: number; ghost?: boolean }) {
  return ghost ? (
    <circle cx={x} cy={y} r={6} fill="none" stroke="var(--domain)" strokeWidth={1.2} opacity={0.5} strokeDasharray="2 2" />
  ) : (
    <circle cx={x} cy={y} r={6} fill="var(--domain)" stroke="var(--fg)" strokeWidth={1} />
  );
}
function Fast({ x, y, ghost }: { x: number; y: number; ghost?: boolean }) {
  const pts = `${x},${y - 7} ${x - 7},${y + 6} ${x + 7},${y + 6}`;
  return ghost ? (
    <polygon points={pts} fill="none" stroke="var(--warn-fill)" strokeWidth={1.4} opacity={0.7} strokeDasharray="2 2" />
  ) : (
    <polygon points={pts} fill="var(--warn-fill)" stroke="var(--fg)" strokeWidth={1} />
  );
}

type St = { tick: number; nowhere: boolean; maxLoop: number; maxNo: number };
const START: St = { tick: 0, nowhere: false, maxLoop: 0, maxNo: 0 };

function Stage({
  phase,
  locked,
  reach,
}: {
  phase: string;
  locked: boolean;
  reach: (n: (typeof NAMES)[number]) => void;
}) {
  const [st, setSt] = useState<St>(START);
  const reveal = phase === "reveal";
  // At the reveal the stage pins the learner's loop run at its meeting.
  const view: St = reveal ? { ...st, tick: haltTick(false), nowhere: false } : st;
  const { tick, nowhere } = view;
  const pos = at(tick, nowhere);
  const prev = tick > 0 ? at(tick - 1, nowhere) : null;
  const gap = gapOf(pos);
  const stop = halted(tick, nowhere);
  const met = stop && pos.s === pos.f;
  const ended = stop && !met;
  const max = nowhere ? st.maxNo : st.maxLoop;
  const halt = haltTick(nowhere);

  const goTo = (k: number) => {
    if (locked || reveal) return;
    const n = { ...st, tick: k };
    if (nowhere) n.maxNo = Math.max(st.maxNo, k);
    else n.maxLoop = Math.max(st.maxLoop, k);
    setSt(n);
    if (halted(k, nowhere)) reach(nowhere ? "no-loop" : "met");
  };
  const toggle = () => {
    if (locked || reveal) return;
    const to = !nowhere;
    const k = Math.min(tick, haltTick(to));
    setSt({
      tick: k,
      nowhere: to,
      maxLoop: to ? st.maxLoop : Math.max(st.maxLoop, k),
      maxNo: to ? Math.max(st.maxNo, k) : st.maxNo,
    });
    if (halted(k, to)) reach(to ? "no-loop" : "met");
  };

  const status = locked
    ? "Make a prediction to start."
    : met
      ? `Same box at tick ${tick}: loop found`
      : ended
        ? `Fast hit the end at tick ${tick}: no loop`
        : tick === 0
          ? "Press tick 1."
          : `Slow on ${pos.s}, fast on ${pos.f}.`;
  const gapText = locked || tick === 0 ? "?" : gap === null ? "—" : String(gap);
  const markerOffset = (box: number, who: "s" | "f") => {
    const c = CENTRE[box];
    return { x: c.x + (who === "s" ? -8 : 8), y: c.y + 6 };
  };

  return (
    <div className={s.wrap}>
      <p className={s.model}>Slow moves 1 box per tick, fast moves 2. Nothing else is remembered.</p>
      <svg
        viewBox="0 0 330 168"
        className="stage-svg"
        role="img"
        aria-label={`Tick ${tick}: slow on box ${pos.s}, fast on box ${pos.f}`}
      >
        <defs>
          <marker id="th-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="var(--muted)" />
          </marker>
        </defs>
        {[1, 2, 3, 4, 5, 6].map((b) => (
          <Arrow key={b} from={b} to={b + 1} />
        ))}
        {nowhere ? (
          <g data-arrow="nowhere">
            <line
              x1={CENTRE[LAST].x - 14}
              y1={CENTRE[LAST].y + 14}
              x2={CENTRE[LAST].x - 36}
              y2={CENTRE[LAST].y + 26}
              stroke="var(--muted)"
              strokeWidth={1.5}
            />
            <line
              x1={CENTRE[LAST].x - 40}
              y1={CENTRE[LAST].y + 19}
              x2={CENTRE[LAST].x - 33}
              y2={CENTRE[LAST].y + 33}
              stroke="var(--muted)"
              strokeWidth={2}
            />
          </g>
        ) : (
          <g data-arrow="to-3">
            <Arrow from={LAST} to={TAIL_END} />
          </g>
        )}
        {[1, 2, 3, 4, 5, 6, 7].map((b) => {
          const c = CENTRE[b];
          const meet = met && pos.s === b;
          return (
            <g key={b}>
              <rect
                x={c.x - HALF}
                y={c.y - HALF}
                width={HALF * 2}
                height={HALF * 2}
                rx={7}
                fill="var(--bg-2)"
                stroke={meet ? "var(--fg)" : "var(--line)"}
                strokeWidth={meet ? 3 : 1.2}
              />
              <text x={c.x} y={c.y - 4} textAnchor="middle" className={s.num}>
                {b}
              </text>
            </g>
          );
        })}
        {prev && prev.s !== pos.s && <Slow ghost {...markerOffset(prev.s, "s")} />}
        {prev && prev.f !== pos.f && <Fast ghost {...markerOffset(prev.f, "f")} />}
        <Slow {...markerOffset(pos.s, "s")} />
        <Fast {...markerOffset(pos.f, "f")} />
      </svg>
      <p className={s.legend}>
        <span className={s.dotSlow} aria-hidden="true" /> slow &nbsp; <span className={s.triFast} aria-hidden="true" /> fast
      </p>
      <p className={s.read} aria-live="polite">
        Tick {tick} · Gap{" "}
        <span key={gapText} className={s.gap}>
          {gapText}
        </span>{" "}
        · Memory: 2 markers
      </p>
      <p className={`${s.status} ${met ? s.good : ""}`}>{reveal ? `Your run: tick ${tick}, box ${pos.s}. ${status}` : status}</p>
      <div className={s.group}>Tick</div>
      <div className={s.tape}>
        {Array.from({ length: TILES }, (_, i) => i + 1).map((k) => {
          const current = k === tick;
          const live = k <= max + 1 && k <= halt && !current;
          return (
            <Control
              key={k}
              className={`${s.tile} ${current ? "active" : ""}`}
              disabled={locked || reveal || !live}
              aria-label={`Tick ${k}`}
              onClick={() => goTo(k)}
            >
              {k}
            </Control>
          );
        })}
      </div>
      <Control
        className={s.toggle}
        aria-pressed={nowhere}
        disabled={locked || reveal}
        onClick={toggle}
      >
        {nowhere ? "Last arrow: nowhere" : `Last arrow: to box ${TAIL_END}`}
      </Control>
    </div>
  );
}

export default function TortoiseMeetsHare({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A chain of 7 boxes may loop back on itself. One marker moves 1 box per tick, another 2. If there is a loop, will they ever land on the same box?",
        options: ["Yes, always", "Only if the loop length is even", "No, the fast one can jump over"],
        answer: 0,
      }}
      exploreHint="Press the ticks in order and watch the gap. Then point the last arrow at nowhere."
      minInteractions={NAMES.length}
      reveal={() => (
        <>
          <p>
            Your fast marker was 3 boxes behind, then 2, then 1, then on the same box at tick 5. In a loop the fast one
            gains exactly one box per tick, so the gap counts down and cannot step over 0. With the last arrow pointing
            nowhere, fast hit the end at tick 3: no loop.
          </p>
          <p>
            Two markers, no list of visited boxes. This is Floyd&apos;s tortoise and hare, and it also works for tails
            of 0 to 10 boxes and loops of 1 to 10.
          </p>
          <p className="muted">The gap shrinks by one each tick, so it must hit zero.</p>
        </>
      )}
    >
      {({ phase, locked, interact }) => (
        <Milestones interact={interact} names={NAMES}>
          {(reach) => <Stage phase={phase} locked={locked} reach={reach} />}
        </Milestones>
      )}
    </Lesson>
  );
}
