"use client";

// Birthday paradox. The payoff is the pairs: 23 people are not 23 chances,
// they are 253 chances. The stage draws every pair as a chord across a
// year-shaped ring, so the learner sees the web thicken as the room grows.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const DAYS = 365;
const MAX_PEOPLE = 60;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTH_START = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

/** Deterministic room: 60 birthdays (day 0..364), every day equally likely. */
function room(index: number): number[] {
  let x = (index + 1) * 2654435761;
  const out: number[] = [];
  for (let i = -4; i < MAX_PEOPLE; i++) {
    // xorshift32
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    if (i >= 0) out.push((x >>> 0) % DAYS);
  }
  return out;
}

function firstMatch(days: number[]): number | null {
  const seen = new Set<number>();
  for (const d of days) {
    if (seen.has(d)) return d;
    seen.add(d);
  }
  return null;
}

/** Exact chance that at least two of n share a birthday (365 equal days). */
function exactChance(n: number): number {
  let none = 1;
  for (let i = 0; i < n; i++) none *= (DAYS - i) / DAYS;
  return 1 - none;
}

function dayLabel(d: number): string {
  let m = 11;
  while (MONTH_START[m] > d) m--;
  return `${MONTHS[m]} ${d - MONTH_START[m] + 1}`;
}

const C = 160;
const R = 122;
function pos(day: number, radius: number) {
  const a = (day / DAYS) * Math.PI * 2 - Math.PI / 2;
  return { x: C + radius * Math.cos(a), y: C + radius * Math.sin(a) };
}

export default function BirthdayParadox({ slug }: { slug: string }) {
  const [n, setN] = useState(23);
  const [roomIdx, setRoomIdx] = useState(0);
  const [tally, setTally] = useState({ tried: 0, matched: 0 });

  const people = useMemo(() => room(roomIdx).slice(0, n), [roomIdx, n]);
  const match = firstMatch(people);
  const pairs = (n * (n - 1)) / 2;
  const chance = exactChance(n);

  // Which people share a day with someone else, and how deep each sits in its stack.
  const layout = useMemo(() => {
    const count = new Map<number, number>();
    for (const d of people) count.set(d, (count.get(d) ?? 0) + 1);
    const depth = new Map<number, number>();
    return people.map((d) => {
      const k = depth.get(d) ?? 0;
      depth.set(d, k + 1);
      const shared = (count.get(d) ?? 0) > 1;
      return { day: d, shared, ...pos(d, R - k * 13) };
    });
  }, [people]);

  const drawRooms = (k: number) => {
    let matched = 0;
    for (let i = 1; i <= k; i++) if (firstMatch(room(roomIdx + i).slice(0, n)) !== null) matched++;
    setTally((t) => ({ tried: t.tried + k, matched: t.matched + matched }));
    setRoomIdx((r) => r + k);
  };

  const pct = (v: number) => (v > 0.999 ? ">99.9%" : `${(v * 100).toFixed(1)}%`);
  const seenShare = tally.tried ? Math.round((tally.matched / tally.tried) * 100) : null;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "23 people are in a room. What is the chance that at least two of them share a birthday?",
        options: ["About 6%", "About 25%", "About 50%", "About 90%"],
        answer: 2,
      }}
      exploreHint="Draw some rooms of 23. Then slide the room size and watch the pairs."
      minInteractions={2}
      reveal={({ correct }) => (
        <>
          <p>
            {tally.tried > 0
              ? `You drew ${tally.tried} room${tally.tried === 1 ? "" : "s"} of ${n}; ${tally.matched} had a shared birthday. `
              : ""}
            For 23 people the exact chance is <strong>50.7%</strong>, a coin flip
            {correct ? "." : ", far more than most people guess."}
          </p>
          <p>
            The trap is asking "does anyone share <em>my</em> birthday?" That chance is only about 6%. But a match can
            happen in any pair, and 23 people make <strong>253 pairs</strong>: every line on the ring. People grow by
            one; pairs grow by the whole room.
          </p>
          <p className="muted">
            At 50 people it is 97%. This assumes 365 equally likely days; real birthdays are a little uneven, which
            only makes a match more likely.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <div className={s.wrap}>
          <svg viewBox="0 0 320 320" className={`stage-svg ${s.svg}`} role="img" aria-label={`A year drawn as a ring with ${n} birthdays and ${pairs} pairs`}>
            <circle cx={C} cy={C} r={R + 10} className={s.ring} />
            {MONTH_START.map((d, i) => {
              const a = pos(d, R + 4);
              const b = pos(d, R + 16);
              const mid = pos(d + 15, R + 26);
              return (
                <g key={d}>
                  <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} className={s.tick} />
                  <text x={mid.x} y={mid.y} className={s.month} textAnchor="middle" dominantBaseline="middle">
                    {MONTHS[i][0]}
                  </text>
                </g>
              );
            })}
            <g className={s.chords} style={{ strokeOpacity: Math.max(0.06, Math.min(0.32, 40 / Math.max(pairs, 1))) }}>
              {layout.flatMap((p, i) =>
                layout.slice(i + 1).map((q, j) => <line key={`${i}-${j}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y} />),
              )}
            </g>
            {match !== null && <circle cx={pos(match, R).x} cy={pos(match, R).y} r={16} className={s.halo} />}
            {layout.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={5.5} className={p.shared ? s.dotShared : s.dot} />
            ))}
            <text x={C} y={C - 16} textAnchor="middle" className={s.big}>
              {pairs}
            </text>
            <text x={C} y={C + 6} textAnchor="middle" className={s.label}>
              pairs among {n} people
            </text>
            <text x={C} y={C + 30} textAnchor="middle" className={match !== null ? s.hit : s.label}>
              {match !== null ? `Shared: ${dayLabel(match)}` : "No shared birthday"}
            </text>
          </svg>

          <Row>
            <Slider
              label="People in the room"
              value={n}
              min={2}
              max={MAX_PEOPLE}
              disabled={locked}
              onChange={(v) => {
                setN(v);
                setTally({ tried: 0, matched: 0 });
                interact();
              }}
            />
          </Row>
          <Row>
            <Control
              disabled={locked}
              onClick={() => {
                drawRooms(1);
                interact();
              }}
            >
              New room
            </Control>
            <Control
              disabled={locked}
              onClick={() => {
                drawRooms(20);
                interact();
              }}
            >
              20 rooms
            </Control>
            <Readout label="Rooms with a match" value={tally.tried ? `${tally.matched}/${tally.tried} (${seenShare}%)` : "—"} />
            <Readout label="Exact chance" value={locked ? "?" : pct(chance)} />
          </Row>
        </div>
      )}
    </Lesson>
  );
}
