"use client";

// Linear probing: a key that hashes to a full slot walks right to the next free one. So a run of
// full slots catches every key that hashes anywhere into it, and long runs grow fastest.
// The bands under the slots show each empty slot's catch area (how many of the 10 hash values
// end there). Hash values come from mulberry32 seed 2, chosen and disclosed (claim c5).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const SLOTS = 10;
const START_FULL = [2, 3, 4, 7];
const SEED = 2;
const rng = mulberry32(SEED);
const HASHES = Array.from({ length: SLOTS }, () => Math.floor(rng() * SLOTS));

type Ins = { k: number; hash: number; slot: number; probes: number };

function build(count: number) {
  const full: (number | null)[] = Array(SLOTS).fill(null);
  START_FULL.forEach((i) => (full[i] = 0)); // 0 = an old key already in the table
  const ins: Ins[] = [];
  for (let k = 1; k <= count; k++) {
    const hash = HASHES[k - 1];
    let slot = hash;
    let probes = 1;
    while (full[slot] !== null) {
      slot = (slot + 1) % SLOTS;
      probes++;
    }
    full[slot] = k;
    ins.push({ k, hash, slot, probes });
  }
  return { full, ins };
}
function catchAreas(full: (number | null)[]) {
  const area: Record<number, number[]> = {};
  for (let h = 0; h < SLOTS; h++) {
    let sl = h;
    let n = 0;
    while (full[sl] !== null && n < SLOTS) {
      sl = (sl + 1) % SLOTS;
      n++;
    }
    if (full[sl] === null) (area[sl] ??= []).push(h);
  }
  return area;
}
function longestRun(full: (number | null)[]) {
  let best = 0;
  for (let st = 0; st < SLOTS; st++) {
    let n = 0;
    while (n < SLOTS && full[(st + n) % SLOTS] !== null) n++;
    best = Math.max(best, n);
  }
  return best;
}
const FREE = SLOTS - START_FULL.length;

const X0 = 15;
const CW = 29;

export default function ProbingClustersGrow({ slug }: { slug: string }) {
  const [count, setCount] = useState(0);
  const { full, ins } = build(count);
  const area = catchAreas(full);
  const run = longestRun(full);
  const last = ins[ins.length - 1];

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "10 slots; 2, 3, 4 and 7 are full. A new key hashes to a random slot and, if full, moves right to the next free one. Which empty slot is most likely to receive it?",
        options: ["All equally likely", "Slot 5", "Slot 8"],
        answer: 1,
      }}
      exploreHint="Insert keys and watch the full stretches grow."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            At the start, slot 5 caught keys hashing to 2, 3, 4 or 5: <strong>4 in 10</strong>. Slot 8 caught 2 in 10, the
            rest 1 in 10. {ins.length >= 3 ? `Your 2nd and 3rd keys hashed to ${ins[1].hash} and ${ins[2].hash}, inside that run, and both landed past it.` : ""}
          </p>
          <p>
            A run of full slots catches every key that hashes anywhere inside it, so the longest run grows fastest and
            keys walk further: {last ? `your last key took ${last.probes} probes.` : "probes get longer as it fills."} This
            is called primary clustering.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const insert = (to: number) => {
          if (locked || count >= FREE) return;
          const n = Math.min(FREE, to);
          setCount(n);
          if (longestRun(build(n).full) >= 5) interact();
        };
        const untilFive = () => {
          let n = count + 1;
          while (n < FREE && longestRun(build(n).full) < 5) n++;
          insert(n);
        };

        const msg = locked
          ? "Make a prediction to start."
          : last
            ? last.probes > 1
              ? `Key ${last.k} hashed to ${last.hash}, full: walked to ${last.slot} (${last.probes} probes).`
              : `Key ${last.k} hashed to ${last.hash}: free, 1 probe.`
            : "Bands show which hash values end in each empty slot.";

        return (
          <div className={s.wrap}>
            <p className={s.msg} aria-live="polite">
              {msg}
            </p>
            <svg viewBox="0 0 320 150" className="stage-svg" role="img" aria-label={`${START_FULL.length + count} of 10 slots full; longest run ${run}`}>
              {full.map((v, i) => {
                const isLast = last?.slot === i;
                const isHash = last?.hash === i && last.probes > 1;
                return (
                  <g key={i}>
                    <rect
                      x={X0 + i * CW + 2}
                      y={20}
                      width={CW - 4}
                      height={40}
                      rx={4}
                      fill={v === null ? "var(--bg-2)" : isLast ? "var(--domain)" : "var(--muted)"}
                      stroke={isHash ? "var(--warn)" : "var(--line)"}
                      strokeWidth={isHash ? 2.5 : 1}
                    />
                    {v !== null && v > 0 && (
                      <text x={X0 + i * CW + CW / 2} y={45} textAnchor="middle" className={s.key}>
                        {v}
                      </text>
                    )}
                    <text x={X0 + i * CW + CW / 2} y={14} textAnchor="middle" className={s.axis}>
                      {i}
                    </text>
                  </g>
                );
              })}
              {last && last.probes > 1 && (
                <path
                  d={`M ${X0 + last.hash * CW + CW / 2} 66 H ${last.slot > last.hash ? X0 + last.slot * CW + CW / 2 - 4 : 316}`}
                  stroke="var(--warn)"
                  strokeWidth={2}
                  markerEnd="url(#arrow)"
                  fill="none"
                />
              )}
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0,0 L10,5 L0,10 z" fill="var(--warn)" />
                </marker>
              </defs>
              {!locked && Object.entries(area).map(([slot, hs]) => {
                const sl = Number(slot);
                const n = hs.length;
                return (
                  <g key={slot}>
                    {hs.map((h) => (
                      <rect
                        key={h}
                        x={X0 + h * CW + 1}
                        y={78}
                        width={CW - 2}
                        height={14}
                        fill="var(--domain)"
                        opacity={0.18 + 0.16 * n}
                      />
                    ))}
                    <text x={X0 + sl * CW + CW / 2} y={108} textAnchor="middle" className={`${s.catch} ${n === Math.max(...Object.values(area).map((a) => a.length)) ? s.top : ""}`}>
                      {n}/10
                    </text>
                  </g>
                );
              })}
              <text x={X0} y={128} className={s.axis}>
                {locked ? "Which empty slot will catch the next key?" : "band = hash values that end in the empty slot (n/10 = chance)"}
              </text>
              <text x={X0} y={144} className={s.axis}>
                longest full run: {run} · keys inserted: {count}
              </text>
            </svg>
            <Row>
              <Control className="active" disabled={locked || count >= FREE} onClick={() => insert(count + 1)}>
                Insert key
              </Control>
              <Control disabled={locked || count >= FREE || run >= 5} onClick={untilFive}>
                Until a run of 5 or more
              </Control>
              <Control disabled={locked || count >= FREE} onClick={() => insert(FREE)}>
                Fill the table
              </Control>
            </Row>
            <p className={s.count}>
              Keys (hash → slot, probes): {ins.length ? ins.map((x) => `${x.hash}→${x.slot} (${x.probes})`).join(", ") : "none yet"}
            </p>
          </div>
        );
      }}
    </Lesson>
  );
}
