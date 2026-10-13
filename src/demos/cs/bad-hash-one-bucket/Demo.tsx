"use client";

// A 10-slot table with slot = key mod 10. The keys 10, 20, ..., 100 all leave remainder 0, so
// every one lands in slot 0 and the table becomes one long list. Switching the rule to mod 7
// spreads the same keys over 7 slots. One picture: the table with a chain of keys per slot.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const SLOTS = 10;
const KEYS = Array.from({ length: 10 }, (_, i) => (i + 1) * 10);
const RULES = [10, 7] as const;
type Mod = (typeof RULES)[number];

const place = (keys: number[], mod: Mod) => {
  const table: number[][] = Array.from({ length: SLOTS }, () => []);
  for (const k of keys) table[k % mod].push(k);
  return table;
};
const usedSlots = (keys: number[], mod: Mod) => new Set(keys.map((k) => k % mod)).size;

const ROW_H = 21;
const X0 = 46;
const CHIP_W = 26;

export default function BadHashOneBucket({ slug }: { slug: string }) {
  const [placed, setPlaced] = useState<number[]>([]);
  const [mod, setMod] = useState<Mod>(10);
  const [seen, setSeen] = useState<{ mod: Mod; keys: number; used: number }[]>([]); // states the learner reached

  const table = place(placed, mod);
  const used = usedSlots(placed, mod);
  const longest = Math.max(0, ...table.map((c) => c.length));
  const all10 = usedSlots(KEYS, 10);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A ${SLOTS}-slot table puts each key in slot = key mod 10 (the remainder after dividing by 10). You insert ${KEYS[0]}, ${KEYS[1]}, ${KEYS[2]}, … ${KEYS[KEYS.length - 1]}. How many different slots get used?`,
        options: [String(all10), "5", String(SLOTS)],
        answer: 0,
      }}
      exploreHint="Drop the keys in one by one. Then switch the rule."
      minInteractions={2}
      reveal={() => {
        const best10 = seen.filter((x) => x.mod === 10).sort((a, b) => b.keys - a.keys)[0];
        const best7 = seen.filter((x) => x.mod === 7).sort((a, b) => b.keys - a.keys)[0];
        return (
          <>
            <p>
              {best10 ? `You dropped ${best10.keys} keys and they all went to slot 0, while ${SLOTS - best10.used} slots stayed empty. ` : ""}
              Every multiple of 10 leaves remainder 0, so with this rule all {KEYS.length} keys share {all10} slot.
              {best7 ? ` Under mod 7 the same ${best7.keys} keys used ${best7.used} slots.` : ""}
            </p>
            <p>
              The table was big enough; the rule was the problem. Keys that land together are kept as a list in their slot,
              and finding one means walking that list, so a bad rule turns a table into one long list. A good hash breaks
              up the patterns real keys have, such as all ending in 0.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["four-stacked", "spread"]}>
          {(reach) => {
            const record = (keys: number[], m: Mod) => {
              setSeen((x) => [...x, { mod: m, keys: keys.length, used: usedSlots(keys, m) }]);
              if (m === 10 && keys.length >= 4) reach("four-stacked");
              if (m === 7 && keys.length >= 4) reach("spread");
            };
            const drop = (k: number) => {
              if (locked || placed.includes(k)) return;
              const next = [...placed, k];
              setPlaced(next);
              record(next, mod);
            };
            const switchRule = () => {
              if (locked) return;
              const m: Mod = mod === 10 ? 7 : 10;
              setMod(m);
              record(placed, m);
            };

            return (
              <div className={s.wrap}>
                <Row>
                  {KEYS.map((k) => (
                    <Control key={k} className={s.key} disabled={locked || placed.includes(k)} onClick={() => drop(k)}>
                      {k}
                    </Control>
                  ))}
                </Row>
                <p className={s.rule}>
                  slot = key mod {mod} <span>(remainder after ÷ {mod})</span>
                </p>
                <svg viewBox={`0 0 320 ${SLOTS * ROW_H + 4}`} className="stage-svg" role="img" aria-label={`${used} of ${SLOTS} slots used`}>
                  {table.map((chain, i) => {
                    const y = 2 + i * ROW_H;
                    const reachable = i < mod;
                    return (
                      <g key={i}>
                        <text x={8} y={y + 14} className={s.idx}>
                          {i}
                        </text>
                        <rect x={22} y={y + 2} width={18} height={ROW_H - 4} rx={3} fill="var(--bg-2)" stroke="var(--line)" opacity={reachable ? 1 : 0.4} />
                        {chain.map((k, j) => (
                          <g key={k}>
                            <line x1={j === 0 ? 40 : X0 + j * (CHIP_W + 1) - 1} x2={X0 + j * (CHIP_W + 1)} y1={y + ROW_H / 2} y2={y + ROW_H / 2} stroke="var(--line)" />
                            <rect x={X0 + j * (CHIP_W + 1)} y={y + 2} width={CHIP_W} height={ROW_H - 4} rx={4} fill={chain.length > 1 ? "var(--bad)" : "var(--domain)"} opacity={0.85} />
                            <text x={X0 + j * (CHIP_W + 1) + CHIP_W / 2} y={y + 14} textAnchor="middle" className={s.chip}>
                              {k}
                            </text>
                          </g>
                        ))}
                      </g>
                    );
                  })}
                </svg>
                <Row>
                  <Readout label="Slots used" value={`${used} of ${SLOTS}`} />
                  <Readout label="Longest list" value={longest} />
                  <Control disabled={locked} onClick={switchRule}>
                    Switch rule to mod {mod === 10 ? 7 : 10}
                  </Control>
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
