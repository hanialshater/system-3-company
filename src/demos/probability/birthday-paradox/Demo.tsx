"use client";

// Birthday paradox. The payoff is the pairs: 23 people are not 23 chances,
// they are 253 chances. The stage draws every pair as a chord across a
// year-shaped ring, so the learner sees the web thicken as the room grows.
//
// v2 (revision): the question's room (23) is the comparison. Rooms are tallied per room size,
// the reveal quotes only the tally of rooms of 23, and the reveal is gated on 20+ rooms of 23
// plus one change of room size. In the reveal phase the ring returns to 23 people so "every line
// on the ring" means 253 lines. While locked, the stage hides whether the sample room has a match.

import { useEffect, useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const DAYS = 365;
const MAX_PEOPLE = 60;
const QUESTION_N = 23;
const ENOUGH_ROOMS = 20;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTH_START = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
const MILESTONES = ["rooms-of-23", "changed-size"] as const;

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
const pairsOf = (n: number) => (n * (n - 1)) / 2;
const Q_PAIRS = pairsOf(QUESTION_N);
const Q_CHANCE = (exactChance(QUESTION_N) * 100).toFixed(1);
/** Treating each pair as a separate 1-in-365 chance: the chance every pair misses. */
const ALL_MISS = Math.round(Math.pow((DAYS - 1) / DAYS, Q_PAIRS) * 100);

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

type Tally = { tried: number; matched: number };
const EMPTY: Tally = { tried: 0, matched: 0 };

function Gate({ interact, at23, sizeChanged }: { interact: () => void; at23: Tally; sizeChanged: boolean }) {
  const { reach } = useMilestones(interact, MILESTONES);
  useEffect(() => {
    if (at23.tried >= ENOUGH_ROOMS) reach("rooms-of-23");
    if (sizeChanged) reach("changed-size");
  });
  return null;
}

/** Lifts the kit's phase into this component so the ring can return to 23 in the reveal. */
function PhaseSync({ phase, onPhase }: { phase: string; onPhase: (p: string) => void }) {
  useEffect(() => onPhase(phase), [phase, onPhase]);
  return null;
}

export default function BirthdayParadox({ slug }: { slug: string }) {
  const [nSet, setN] = useState(QUESTION_N);
  const [roomIdx, setRoomIdx] = useState(0);
  const [tallies, setTallies] = useState<Record<number, Tally>>({});
  const [sizeChanged, setSizeChanged] = useState(false);
  const [phaseNow, setPhaseNow] = useState<string>("predict");

  // In the reveal the ring returns to the question's room so the text and the drawing agree.
  const n = phaseNow === "reveal" ? QUESTION_N : nSet;
  const people = useMemo(() => room(roomIdx).slice(0, n), [roomIdx, n]);
  const locked = phaseNow === "predict";
  const match = locked ? null : firstMatch(people);
  const pairs = pairsOf(n);
  const chance = exactChance(n);
  const tally = tallies[n] ?? EMPTY;
  const at23 = tallies[QUESTION_N] ?? EMPTY;

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
    setTallies((all) => {
      const t = all[n] ?? EMPTY;
      return { ...all, [n]: { tried: t.tried + k, matched: t.matched + matched } };
    });
    setRoomIdx((r) => r + k);
  };

  const pct = (v: number) => (v > 0.999 ? ">99.9%" : `${(v * 100).toFixed(1)}%`);
  const tallyText = !tally.tried
    ? "—"
    : tally.tried < ENOUGH_ROOMS
      ? `${tally.matched} of ${tally.tried}`
      : `${tally.matched} of ${tally.tried} (${Math.round((tally.matched / tally.tried) * 100)}%)`;

  const note = (() => {
    if (locked) return "Predict first. Each dot will be a birthday.";
    if (phaseNow === "reveal") return `Back to ${QUESTION_N} people: every line is one of the ${Q_PAIRS} pairs.`;
    if (at23.tried < ENOUGH_ROOMS && n !== QUESTION_N) return `Back to ${QUESTION_N} people to test the question.`;
    if (at23.tried < ENOUGH_ROOMS) return `Draw at least ${ENOUGH_ROOMS} rooms of ${QUESTION_N}. One room proves little.`;
    return "Every line is a pair that could match. Slide the room size.";
  })();

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `${QUESTION_N} people are in a room. What is the chance that at least two of them share a birthday?`,
        options: ["About 6%", "About 25%", "About 50%", "About 90%"],
        answer: 2,
      }}
      exploreHint={`Draw ${ENOUGH_ROOMS} rooms of ${QUESTION_N} and count the matches. Then slide the room size.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            You drew {at23.tried} rooms of {QUESTION_N}; {at23.matched} had a shared birthday. The exact chance is{" "}
            <strong>{Q_CHANCE}%</strong>, a coin flip. A few dozen rooms wobble around it.
          </p>
          <p>
            Compare a different question: does anyone share <em>my</em> birthday? Only about 6%. But a match can
            happen in any pair, and {QUESTION_N} people make <strong>{Q_PAIRS} pairs</strong>: every line on the ring.
            Each pair matches only 1 time in 365, yet the chance that all {Q_PAIRS} miss is only about {ALL_MISS}%.
            Each new person makes a pair with everyone already there.
          </p>
          <p className="muted">
            At 50 people it is 97%. This assumes 365 equally likely days; real birthdays are a little uneven, which
            only makes a match more likely.
          </p>
        </>
      )}
    >
      {({ phase, interact }) => {
        return (
          <div className={s.wrap}>
            <PhaseSync phase={phase} onPhase={setPhaseNow} />
            <Gate interact={interact} at23={at23} sizeChanged={sizeChanged} />
            <svg
              viewBox="0 0 320 320"
              className={`stage-svg ${s.svg}`}
              role="img"
              aria-label={`A year drawn as a ring with ${n} birthdays and ${pairs} pairs`}
            >
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
                <circle key={i} cx={p.x} cy={p.y} r={5.5} className={p.shared && !locked ? s.dotShared : s.dot} />
              ))}
              <text x={C} y={C - 16} textAnchor="middle" className={s.big}>
                {pairs}
              </text>
              <text x={C} y={C + 6} textAnchor="middle" className={s.label}>
                pairs among {n} people
              </text>
              <text x={C} y={C + 30} textAnchor="middle" className={match !== null ? s.hit : s.label}>
                {locked ? "Shared birthday?" : match !== null ? `Shared: ${dayLabel(match)}` : "No shared birthday"}
              </text>
            </svg>

            <p className={s.note} aria-live="polite">{note}</p>

            <Row>
              <Control disabled={locked} onClick={() => drawRooms(1)}>
                New room
              </Control>
              <Control disabled={locked} onClick={() => drawRooms(ENOUGH_ROOMS)}>
                {ENOUGH_ROOMS} rooms
              </Control>
              <Readout label={`Rooms of ${n} with a match`} value={tallyText} />
              <Readout label="Exact chance" value={locked ? "?" : pct(chance)} />
            </Row>
            <Row>
              <Slider
                label="People in the room"
                value={n}
                min={2}
                max={MAX_PEOPLE}
                disabled={locked || phase === "reveal"}
                onChange={(v) => {
                  setN(v);
                  if (v !== QUESTION_N) setSizeChanged(true);
                }}
              />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
