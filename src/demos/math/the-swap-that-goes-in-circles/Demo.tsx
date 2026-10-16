"use client";

// The swap that goes in circles (E&K ch. 23, section 23.2 unconfirmed): transitive preferences and the
// money pump. Max prefers apple to banana, banana to cherry, cherry to apple. A trader offers the next fruit
// round the circle (cherry -> banana -> apple -> cherry); Max pays 10¢ for any swap he prefers.
// Circle: every offer is taken, so 3 swaps bring the cherry back (30¢) and 6 swaps go round twice (60¢).
// Ranked (apple > banana > cherry): cherry -> banana -> apple, then cherry-for-apple is refused: 2 swaps, 20¢.
// Each preset replays from the cherry at once; the log strip shows every swap of the last replay.
// Milestones: six (the question's case), three, ranked. Results stay in the Seen row after "Back to the circle".

import { useState } from "react";
import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

type Fruit = "apple" | "banana" | "cherry";
type Mode = "circle" | "ranked";
const ROUTE: Record<Fruit, Fruit> = { cherry: "banana", banana: "apple", apple: "cherry" };
const RANK: Record<Fruit, number> = { apple: 3, banana: 2, cherry: 1 };
const COST = 10;

/** Does Max prefer `to` over `from`? */
function prefers(mode: Mode, to: Fruit, from: Fruit): boolean {
  if (mode === "ranked") return RANK[to] > RANK[from];
  return ROUTE[from] === to; // the circle: each fruit is beaten by the next one round
}
/** Holdings from the cherry, at most `max` swaps; stops at the first refused offer. */
function replay(mode: Mode, max: number): Fruit[] {
  const out: Fruit[] = ["cherry"];
  for (let i = 0; i < max; i++) {
    const cur = out[out.length - 1];
    const offer = ROUTE[cur];
    if (!prefers(mode, offer, cur)) break;
    out.push(offer);
  }
  return out;
}

// Card centres (viewBox 320 x 180 from y 2; the swap log runs along y 170): the offer route runs clockwise.
const AT: Record<Fruit, { x: number; y: number }> = {
  banana: { x: 160, y: 30 },
  apple: { x: 262, y: 124 },
  cherry: { x: 58, y: 124 },
};

function Glyph({ fruit, x, y, size = 1 }: { fruit: Fruit; x: number; y: number; size?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`} aria-hidden="true">
      {fruit === "apple" && (
        <>
          <circle cx={0} cy={1.5} r={7.5} className={s.apple} />
          <path d="M0,-6 L1.5,-10" className={s.stem} />
          <ellipse cx={4} cy={-8.5} rx={2.8} ry={1.4} className={s.leaf} />
        </>
      )}
      {fruit === "banana" && <path d="M-9,-3 Q0,12 9,-5 Q1,5 -9,-3 Z" className={s.banana} />}
      {fruit === "cherry" && (
        <>
          <path d="M-4,2 Q-2,-6 3,-10 M4,3 Q4,-5 3,-10" className={s.stem} />
          <circle cx={-4} cy={4} r={4.2} className={s.cherry} />
          <circle cx={4.5} cy={5} r={4.2} className={s.cherry} />
        </>
      )}
    </g>
  );
}

function Arrow({ from, to, mode }: { from: Fruit; to: Fruit; mode: Mode }) {
  const p = AT[from];
  const q = AT[to];
  const dx = q.x - p.x;
  const dy = q.y - p.y;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const pad = 38;
  const x1 = p.x + ux * pad;
  const y1 = p.y + uy * pad;
  const x2 = q.x - ux * pad;
  const y2 = q.y - uy * pad;
  const taken = prefers(mode, to, from);
  // label offset to the outside of the triangle
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const ox = uy * 14;
  const oy = -ux * 14;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} className={taken ? s.arrow : s.refused} markerEnd={taken ? "url(#swap-head)" : undefined} />
      <text x={mx + ox} y={my + oy + 4} textAnchor="middle" className={taken ? s.cost : s.refusedLab}>
        {taken ? `${COST}¢` : "✕ refused"}
      </text>
    </g>
  );
}

type Result = { swaps: number; holding: Fruit; paid: number };
type Seen = Partial<Record<"six" | "three" | "ranked", Result>>;

function Stage({ ctx, seen, record }: { ctx: StageContext; seen: Seen; record: (k: keyof Seen, r: Result) => void }) {
  const { locked } = ctx;
  const { reach } = useMilestones(ctx.interact, ["six", "three", "ranked"]);
  const [mode, setMode] = useState<Mode>("circle");
  const [log, setLog] = useState<Fruit[]>(["cherry"]);
  const [last, setLast] = useState<keyof Seen | null>(null);

  const run = (k: keyof Seen) => {
    if (locked) return;
    const m: Mode = k === "ranked" ? "ranked" : "circle";
    const path = replay(m, k === "three" ? 3 : 6);
    setMode(m);
    setLog(path);
    setLast(k);
    const r = { swaps: path.length - 1, holding: path[path.length - 1], paid: (path.length - 1) * COST };
    record(k, r);
    reach(k);
  };
  const back = () => {
    if (locked) return;
    setMode("circle");
    setLog(["cherry"]);
    setLast(null);
  };

  const holding = log[log.length - 1];
  const paid = (log.length - 1) * COST;

  return (
    <div className={s.wrap}>
      <svg viewBox="0 2 320 180" className="stage-svg" role="img" aria-label={`Max holds the ${holding}, paid ${paid} cents`}>
        <defs>
          <marker id="swap-head" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 Z" className={s.head} />
          </marker>
        </defs>
        {(Object.keys(ROUTE) as Fruit[]).map((f) => (
          <Arrow key={f} from={f} to={ROUTE[f]} mode={mode} />
        ))}
        {(Object.keys(AT) as Fruit[]).map((f) => (
          <g key={f}>
            <rect x={AT[f].x - 30} y={AT[f].y - 26} width={60} height={52} rx={8} className={f === holding ? s.cardHeld : s.card} />
            <Glyph fruit={f} x={AT[f].x} y={AT[f].y - 6} size={1.3} />
            <text x={AT[f].x} y={AT[f].y + 19} textAnchor="middle" className={s.cardLab}>
              {f}
            </text>
          </g>
        ))}
        <text x={160} y={100} textAnchor="middle" className={s.legend}>
          → swap he wants: {COST}¢
        </text>
        {log.map((f, i) => {
          const step = Math.min(42, 300 / Math.max(1, log.length));
          const x0 = 160 - ((log.length - 1) * step) / 2;
          return (
            <g key={`log${i}`}>
              {i > 0 && (
                <text x={x0 + (i - 0.5) * step} y={174} textAnchor="middle" className={s.stripArrow}>
                  ›
                </text>
              )}
              <Glyph fruit={f} x={x0 + i * step} y={170} />
            </g>
          );
        })}
      </svg>
      <p className={s.now} aria-live="polite">
        holding: {locked ? "cherry" : holding} · paid: {paid}¢
      </p>
      <p className={s.seen}>
        {(["six", "three", "ranked"] as const)
          .filter((k) => seen[k])
          .map((k, i) => {
            const r = seen[k] as Result;
            return (
              <span key={k} className={k === last ? s.seenOn : undefined}>
                {i > 0 && " · "}
                {k === "ranked" ? "ranked" : r.swaps}:{" "}
                <svg viewBox="-10 -12 20 22" className={s.inline} aria-label={r.holding}>
                  <Glyph fruit={r.holding} x={0} y={0} />
                </svg>{" "}
                {r.paid}¢
              </span>
            );
          })}
      </p>
      <Row>
        <Control className={last === "six" ? "active" : ""} disabled={locked || last === "six"} onClick={() => run("six")}>
          6 swaps
        </Control>
        <Control className={last === "three" ? "active" : ""} disabled={locked || last === "three"} onClick={() => run("three")}>
          3 swaps
        </Control>
        <Control className={last === "ranked" ? "active" : ""} disabled={locked || last === "ranked"} onClick={() => run("ranked")}>
          Rank them: apple first
        </Control>
        <Control disabled={locked || (mode === "circle" && log.length === 1)} onClick={back}>
          Back to the circle
        </Control>
      </Row>
    </div>
  );
}

export default function TheSwapThatGoesInCircles({ slug }: { slug: string }) {
  const [seen, setSeen] = useState<Seen>({});
  const record = (k: keyof Seen, r: Result) => setSeen((v) => ({ ...v, [k]: r }));
  const { six, three, ranked } = seen;
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Max prefers apple to banana, banana to cherry, cherry to apple. He pays 10¢ per preferred swap. He holds a cherry. After 6 swaps?",
        options: ["Apple, 60¢ poorer", "Cherry, 60¢ poorer", "Banana, 30¢ poorer"],
        answer: 1,
      }}
      exploreHint="Replay the swaps, then give Max a ranking and replay again."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            Every swap was one Max wanted, yet
            {three ? (
              <>
                {" "}
                after {three.swaps} he held the {three.holding} again, {three.paid}¢ poorer, and
              </>
            ) : null}{" "}
            after your {six ? six.swaps : 6} he had paid {six ? six.paid : 60}¢ for nothing.
            {ranked && (
              <>
                {" "}
                Once his preferences were ranked, the swaps stopped at his favourite after {ranked.swaps}.
              </>
            )}
          </p>
          <p>
            That is why choice models assume preferences are transitive. A group&apos;s majority can still go round in a circle even when every
            voter&apos;s preferences are ranked.
          </p>
        </>
      )}
    >
      {(ctx) => <Stage ctx={ctx} seen={seen} record={record} />}
    </Lesson>
  );
}
