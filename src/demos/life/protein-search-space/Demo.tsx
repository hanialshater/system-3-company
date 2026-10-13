"use client";

// Levinthal toy model: every link of a chain has 3 possible bends, so n links have 3^n shapes.
// The stage builds a chain and draws the shape count on a log ruler (powers of ten). "Race" adds
// the all-tries marker: 10^13 tries a second for the age of the universe (13.8 billion years).
// Key states: a 100-link chain, then the race on at 100 links. Deterministic, no randomness.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const BENDS = 3, MAX = 100, START = 1;
const RATE = 1e13, YEAR = 3.15576e7, UNIVERSE_YEARS = 13.8e9;
const MILESTONES = ["chain-100", "race-100"] as const;

const shapes = (n: number) => Math.pow(BENDS, n);
const digits = (n: number) => (BigInt(BENDS) ** BigInt(n)).toString();
const log10 = (x: number) => Math.log10(x);
const TRIES = RATE * UNIVERSE_YEARS * YEAR; // all tries since the Big Bang
const yearsFor = (n: number) => shapes(n) / RATE / YEAR;

function sci(x: number): string {
  if (x < 1000) return String(Math.round(x));
  let e = Math.floor(log10(x));
  let m = Math.round((x / Math.pow(10, e)) * 100) / 100;
  if (m >= 10) { m = 1; e += 1; }
  return `${m.toFixed(2)} × 10^${e}`;
}
function timeFor(n: number): string {
  const sec = shapes(n) / RATE;
  if (sec < 1) return "under a second";
  if (sec < YEAR) return `${sec < 100 ? sec.toFixed(1) : Math.round(sec)} seconds`;
  const y = yearsFor(n);
  return y < 1000 ? `${Math.round(y)} years` : `${sci(y)} years`;
}

const TOP = digits(MAX);
const FIRST_DIGIT = TOP[0];
const MORE_DIGITS = TOP.length - 1;
const EXP_100 = log10(shapes(MAX));
const EXP_TRIES = log10(TRIES);
const RATIO = yearsFor(MAX) / UNIVERSE_YEARS;

const X0 = 12, X1 = 328, EMAX = 50;
const px = (e: number) => X0 + (e / EMAX) * (X1 - X0);

function Stage({ locked, interact }: { locked: boolean; interact: () => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const [n, setN] = useState(START);
  const [race, setRace] = useState(false);
  const set = (v: number, r = race) => {
    setN(v);
    if (v === MAX) {
      reach("chain-100");
      if (r) reach("race-100");
    }
  };
  const e = log10(shapes(n));
  const over = race && e > EXP_TRIES;
  const msg = locked
    ? "Toy chain: each link bends one of 3 ways."
    : race
      ? `Trying 10^13 shapes a second needs ${timeFor(n)}.`
      : `${n} link${n === 1 ? "" : "s"}, 3 bends each. Every link multiplies the shapes by 3.`;
  // a little zig-zag chain, one bead per link up to 20 beads
  const beads = Math.min(n, 20);
  const pts = Array.from({ length: beads }, (_, i) => [14 + i * 16, 14 + (i % 2 === 0 ? 0 : 8)]);

  return (
    <div className={s.wrap}>
      <p className={s.msg} aria-live="polite">{msg}</p>
      <svg viewBox="0 0 340 112" className={`stage-svg ${s.svg}`} role="img" aria-label={`${n} links, about ${sci(shapes(n))} shapes`}>
        <polyline className={s.chain} points={pts.map((p) => p.join(",")).join(" ")} />
        {pts.map((p, i) => <circle key={i} className={s.bead} cx={p[0]} cy={p[1]} r={3.5} />)}
        <text className={s.tick} x={X1} y={14} style={{ textAnchor: "end" }}>{n > 20 ? `${n} links` : ""}</text>
        <rect className={over ? s.barOver : s.bar} x={X0} y={50} width={Math.max(2, px(e) - X0)} height={16} rx={3} />
        <line className={s.axis} x1={X0} x2={X1} y1={72} y2={72} />
        {[0, 10, 20, 30, 40, 50].map((t) => (
          <g key={t}>
            <line className={s.axis} x1={px(t)} x2={px(t)} y1={72} y2={77} />
            <text className={s.tick} x={px(t)} y={89}>{`10^${t}`}</text>
          </g>
        ))}
        {race && (
          <g>
            <line className={s.mark} x1={px(EXP_TRIES)} x2={px(EXP_TRIES)} y1={40} y2={72} />
            <text className={s.markText} x={px(EXP_TRIES)} y={36}>all tries since the Big Bang</text>
          </g>
        )}
        <text className={s.tick} x={170} y={106}>number of shapes (log ruler)</text>
      </svg>
      <Row>
        <Control disabled={locked || n >= MAX} onClick={() => set(n + 1)}>Add 1 link</Control>
        <Control disabled={locked || n >= MAX} onClick={() => set(Math.min(MAX, n + 10))}>Add 10 links</Control>
        <Control disabled={locked || n >= MAX} onClick={() => set(MAX)}>Jump to {MAX} links</Control>
        <Control
          className={race ? "active" : ""}
          disabled={locked}
          onClick={() => {
            const r = !race;
            setRace(r);
            if (r && n === MAX) reach("race-100");
          }}
        >
          {race ? "Hide the race" : "Race the universe"}
        </Control>
        <Control disabled={locked || n === START} onClick={() => set(START)}>Reset</Control>
      </Row>
      <Row>
        <Readout label="Links" value={n} />
        <Readout label="Shapes" value={locked ? "?" : sci(shapes(n))} />
        {race && <Readout label="Time to try all" value={timeFor(n)} />}
      </Row>
    </div>
  );
}

export default function ProteinSearchSpace({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A chain of ${MAX} links can bend ${BENDS} ways at each link. How many different shapes could it take?`,
        options: [
          `About ${BENDS * MAX} (${BENDS} × ${MAX})`,
          "About a trillion (1 with 12 zeros)",
          `About ${FIRST_DIGIT} with ${MORE_DIGITS} more digits after it`,
        ],
        answer: 2,
      }}
      exploreHint={`Build the chain to ${MAX} links, then race the universe.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            You built {MAX} links: {BENDS}^{MAX} = <strong>{sci(shapes(MAX))}</strong> shapes. Each link multiplies the count by {BENDS}, so it grows
            far faster than {BENDS} × {MAX}.
          </p>
          <p>
            At 10^13 tries a second, trying them all takes {sci(yearsFor(MAX))} years, about {sci(RATIO)} times the age of the universe
            (13.8 billion years). Real proteins fold in milliseconds to seconds, so folding is guided, not a blind search.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} />}
    </Lesson>
  );
}
