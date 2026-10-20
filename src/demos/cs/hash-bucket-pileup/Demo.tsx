"use client";

// Hash collisions arrive early. The learner drops keys into 10 slots and watches the
// first pile-up happen around key 4 or 5, long before the table is full; then many
// tables at once build the tally. Seeded, so every QA run sees the same tables.
// One representation: the slots (with a small tally of past tables underneath).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import s from "./styles.module.css";

const SLOTS = 10;
const MAX_KEYS = 12;

function mix(a: number) {
  a = (a + 0x6d2b79f5) >>> 0;
  let t = a;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
// Deterministic "random" slot for key k in table t.
const slotOf = (t: number, k: number) => Math.floor(mix(t * 7919 + k * 104729) * SLOTS);

function firstCollision(t: number) {
  const seen = new Set<number>();
  for (let k = 1; k <= SLOTS + 1; k++) {
    const sl = slotOf(t, k);
    if (seen.has(sl)) return k;
    seen.add(sl);
  }
  return SLOTS + 1;
}

const BINS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const X0 = 14;
const COLW = 29.2;

export default function HashBucketPileup({ slug }: { slug: string }) {
  const [table, setTable] = useState(1);
  const [keys, setKeys] = useState(0); // keys dropped into the current table
  const [tally, setTally] = useState<number[]>([]); // first-collision key per finished table
  const [counted, setCounted] = useState(false); // current table already in the tally

  const placed = Array.from({ length: keys }, (_, i) => ({ k: i + 1, slot: slotOf(table, i + 1) }));
  let first = 0;
  {
    const seen = new Set<number>();
    for (const p of placed) {
      if (seen.has(p.slot)) {
        first = p.k;
        break;
      }
      seen.add(p.slot);
    }
  }
  const last = placed[placed.length - 1];
  const lastCollided = last ? placed.slice(0, -1).some((p) => p.slot === last.slot) : false;
  const histo = BINS.map((b) => tally.filter((x) => x === b).length);
  const hmax = Math.max(1, ...histo);
  const by5 = tally.filter((x) => x <= 5).length;
  const by4 = tally.filter((x) => x <= 4).length;
  // Chance that k keys all land in different slots: 1 x 0.9 x 0.8 ...
  const noCol = (k: number) => Array.from({ length: k }, (_, i) => 1 - i / SLOTS).reduce((a, b) => a * b, 1);
  const f4 = (v: number) => String(Number(v.toFixed(4)));

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A hash table is a row of 10 slots; each key you store goes to a random slot. How many keys until a collision (two keys in one slot) is more likely than not?",
        options: ["2", "5", "9"],
        answer: 1,
      }}
      exploreHint="Drop keys until two share a slot. Then try many tables."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {tally.length
              ? `In your ${tally.length} table${tally.length === 1 ? "" : "s"}, ${by5} had a collision by key 5. `
              : ""}
            The chance that 4 keys all miss each other is 1 × 0.9 × 0.8 × 0.7 = 0.504, so a collision is just under
            even. With a 5th key it falls to 0.3024: a <strong>70%</strong> chance of a collision with half the slots
            still empty.
          </p>
          <p>
            Each new key has more occupied slots to hit, and those chances multiply. That is why hash tables need a way to handle collisions, such as keeping a list of keys in each slot.
          </p>
          <p className="muted">Collisions come early. Plan for them.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const record = (t: number, upTo: number) => {
          // Count the table once, the moment its first collision is visible.
          const f = firstCollision(t);
          if (!counted && upTo >= f) {
            setCounted(true);
            setTally((x) => [...x, f]);
            interact();
          }
        };
        const nextKey = () => {
          if (locked || keys >= MAX_KEYS) return;
          setKeys(keys + 1);
          record(table, keys + 1);
        };
        const untilCollision = () => {
          if (locked || first) return;
          const f = firstCollision(table);
          setKeys(f);
          record(table, f);
        };
        const newTable = () => {
          if (locked) return;
          setTable((t) => t + 1);
          setKeys(0);
          setCounted(false);
        };
        const many = () => {
          if (locked) return;
          interact();
          const start = table + 1;
          const batch = Array.from({ length: 20 }, (_, i) => firstCollision(start + i));
          setTally((x) => [...x, ...batch]);
          const lastT = start + 19;
          setTable(lastT);
          setKeys(firstCollision(lastT));
          setCounted(true);
        };

        const msg = locked
          ? "Make a prediction to start."
          : keys === 0
            ? "An empty table. Drop a key."
            : lastCollided && last.k === first
              ? `Collision at key ${first}!`
              : first
                ? `First collision was key ${first}.`
                : `${keys} key${keys === 1 ? "" : "s"}, no collision yet.`;
        const chance =
          keys > 0 ? `Chance ${keys} random key${keys === 1 ? "" : "s"} all land in different slots: ${f4(noCol(keys))}` : "";

        return (
          <div className={s.wrap}>
            <p className={`${s.msg} ${first ? s.bad : ""}`} aria-live="polite">
              {msg}
            </p>
            <p className={s.chance}>{chance}</p>
            <svg viewBox="0 0 320 150" className="stage-svg" role="img" aria-label={`Table ${table}: ${keys} keys in ${SLOTS} slots`}>
              {Array.from({ length: SLOTS }, (_, i) => {
                const here = placed.filter((p) => p.slot === i);
                const hot = here.length > 1;
                return (
                  <g key={i}>
                    <rect
                      x={X0 + i * COLW + 2}
                      y={12}
                      width={COLW - 4}
                      height={116}
                      rx={5}
                      fill={hot ? "color-mix(in srgb, var(--bad) 18%, transparent)" : "var(--bg-2)"}
                      stroke={hot ? "var(--bad)" : "var(--line)"}
                      strokeWidth={1.5}
                    />
                    {here.map((p, j) => (
                      <g key={p.k}>
                        <rect
                          x={X0 + i * COLW + 5}
                          y={104 - j * 22}
                          width={COLW - 10}
                          height={19}
                          rx={4}
                          fill={p.k === last?.k ? "var(--domain)" : "var(--muted)"}
                        />
                        <text x={X0 + i * COLW + COLW / 2} y={118 - j * 22} textAnchor="middle" className={s.chip}>
                          {p.k}
                        </text>
                      </g>
                    ))}
                    <text x={X0 + i * COLW + COLW / 2} y={144} textAnchor="middle" className={s.axis}>
                      {i}
                    </text>
                  </g>
                );
              })}
            </svg>

            <Row>
              <Control className="active" disabled={locked || keys >= MAX_KEYS} onClick={nextKey}>
                Next key
              </Control>
              <Control disabled={locked || first > 0} onClick={untilCollision}>
                Drop until a collision
              </Control>
              <Control disabled={locked || keys === 0} onClick={newTable}>
                New table
              </Control>
              <Control disabled={locked || tally.length === 0} onClick={many}>
                +20 tables
              </Control>
            </Row>

            <div className={s.tally}>
              <span className="muted small">
                {tally.length
                  ? `${tally.length} table${tally.length === 1 ? "" : "s"}: which key number first collided? Collided by key 4: ${by4}. By key 5: ${by5}.`
                  : "Tables tried: none yet"}
              </span>
              <svg viewBox="0 0 320 66" className={s.histo} aria-hidden="true">
                {BINS.map((b, i) => {
                  const h = (histo[i] / hmax) * 34;
                  return (
                    <g key={b}>
                      <rect x={X0 + i * COLW + 4} y={38 - h} width={COLW - 8} height={h} rx={2} fill={b <= 5 ? "var(--bad)" : "var(--muted)"} />
                      {histo[i] > 0 && (
                        <text x={X0 + i * COLW + COLW / 2} y={36 - h} textAnchor="middle" className={s.axis}>
                          {histo[i]}
                        </text>
                      )}
                      <text x={X0 + i * COLW + COLW / 2} y={51} textAnchor="middle" className={s.axis}>
                        {b === 11 ? "11" : b}
                      </text>
                    </g>
                  );
                })}
                <text x={160} y={63} textAnchor="middle" className={s.axis}>
                  key number that first collided (bar height: tables)
                </text>
              </svg>
            </div>
          </div>
        );
      }}
    </Lesson>
  );
}
