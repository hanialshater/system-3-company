"use client";

// Public goods and free riding. One picture: ten piles of money, "you" first. Each pile is what that
// neighbour kept plus their equal share of the pot (every dollar given becomes $3, split ten ways).
// Key state: you give $10 while the others give nothing (you $3, each of them $13, group $120), then
// everyone gives $10 (everyone $30, group $300).
// Model: one round, no talking, no punishment. The "mixed" neighbours are a seeded draw
// (mulberry32 seed 7, untuned: the first seed tried), $0 to $10 each.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32, randInt } from "@/kit/random";
import s from "./styles.module.css";

const N = 10;
const HOLD = 10;
const MULT = 3;
const START_GIVE = 8;
const SEED = 7;
const MILESTONES = ["lone-giver", "all-give"] as const;

type Mode = "none" | "mixed" | "all";
const MIXED = (() => {
  const rng = mulberry32(SEED);
  return Array.from({ length: N - 1 }, () => randInt(rng, 0, HOLD));
})();
const othersFor = (m: Mode) => (m === "none" ? Array(N - 1).fill(0) : m === "all" ? Array(N - 1).fill(HOLD) : MIXED);

/** Final money for everyone (index 0 is you). */
function payoffs(gifts: number[]) {
  const pot = gifts.reduce((a, b) => a + b, 0);
  const share = (pot * MULT) / N;
  return gifts.map((g) => ({ kept: HOLD - g, share, total: HOLD - g + share }));
}
const BACK_PER_DOLLAR = MULT / N; // 0.30 back to you for each $1 you give
const q = payoffs([HOLD, ...othersFor("none")]);
const ANSWER = q[0].total; // 3
const ALL = payoffs(Array(N).fill(HOLD))[0].total; // 30
const sum = (xs: { total: number }[]) => xs.reduce((a, b) => a + b.total, 0);
const money = (v: number) => `$${Number.isInteger(v) ? v : v.toFixed(2)}`;

// Geometry (viewBox 320 × 200): $0..$40 up.
const L = 8;
const W = 30;
const BOT = 170;
const TOP = 14;
const VMAX = 40;
const py = (v: number) => BOT - (v / VMAX) * (BOT - TOP);

export default function FreeRiderPot({ slug }: { slug: string }) {
  const [give, setGive] = useState(START_GIVE);
  const [mode, setMode] = useState<Mode>("none");

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `${N} neighbours each hold $${HOLD}. Every dollar put in the pot becomes $${MULT}, shared equally by all ${N}. You put in all $${HOLD}; the others put in nothing. What do you end up with?`,
        options: [money(HOLD * MULT), money(ANSWER), money(HOLD + ANSWER)],
        answer: 1,
      }}
      exploreHint={`Give all $${HOLD} while the others give nothing. Then let everyone give.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Giving ${HOLD} alone left you <strong>{money(ANSWER)}</strong> while each neighbour had {money(q[1].total)}; the group
            went from ${N * HOLD} to {money(sum(q))}. When everyone gave ${HOLD}, everyone ended with <strong>{money(ALL)}</strong>.
          </p>
          <p>
            Each dollar you give becomes ${MULT}, but you get back only a tenth: {Math.round(BACK_PER_DOLLAR * 100)} cents. So whatever
            the others do, each dollar you hold back leaves you {Math.round((1 - BACK_PER_DOLLAR) * 100)} cents better off, while
            the group loses ${MULT - 1}. What pays for each person is not what pays for the group.
          </p>
          <p className="muted">
            A model: one round, no talking, no punishment. In lab versions of this game many people do give, at least at first.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const gifts = [give, ...othersFor(mode)];
            const pay = payoffs(gifts);
            const check = (g: number, m: Mode) => {
              if (g === HOLD && m === "none") reach("lone-giver");
              if (g === HOLD && m === "all") reach("all-give");
            };
            return (
              <div className={s.wrap}>
                <p className={s.chip}>One round, no talking · $1 in → ${MULT} shared</p>
                <svg
                  viewBox="0 0 320 200"
                  className="stage-svg"
                  role="img"
                  aria-label={locked ? "Ten neighbours with $10 each" : `You end with ${money(pay[0].total)}`}
                >
                  <line x1={4} y1={BOT} x2={316} y2={BOT} stroke="var(--line)" />
                  <line x1={4} y1={py(HOLD)} x2={316} y2={py(HOLD)} stroke="var(--muted)" strokeDasharray="3 3" />
                  {pay.map((p, i) => {
                    const x = L + i * (W + 1.3);
                    const kept = locked ? HOLD : p.kept;
                    const share = locked ? 0 : p.share;
                    return (
                      <g key={i}>
                        <rect x={x} y={py(kept)} width={W - 2} height={BOT - py(kept)} className={i === 0 ? s.main : s.soft} />
                        {share > 0 && (
                          <rect x={x} y={py(kept + share)} width={W - 2} height={py(kept) - py(kept + share)} className={s.goodFill} />
                        )}
                        <text x={x + (W - 2) / 2} y={py(kept + share) - 4} textAnchor="middle" className={s.small}>
                          {locked ? `$${HOLD}` : money(Math.round(p.total * 10) / 10)}
                        </text>
                      </g>
                    );
                  })}
                  <text x={L + (W - 2) / 2} y={BOT + 14} textAnchor="middle" className={s.value}>
                    you
                  </text>
                  <text x={L + W + (8 * (W + 1.3)) / 2 + W / 2} y={BOT + 14} textAnchor="middle" className={s.axis}>
                    neighbours
                  </text>
                </svg>

                <Row>
                  <Readout label="You end with" value={locked ? "?" : money(Math.round(pay[0].total * 10) / 10)} />
                  <Readout label={`Group (start $${N * HOLD})`} value={locked ? "?" : money(Math.round(sum(pay) * 10) / 10)} />
                </Row>
                <Slider
                  label="You give"
                  value={give}
                  min={0}
                  max={HOLD}
                  disabled={locked}
                  format={(v) => `$${v}`}
                  onChange={(v) => {
                    setGive(v);
                    check(v, mode);
                  }}
                />
                <Row>
                  <span className={s.rowLabel}>Others give:</span>
                  {(
                    [
                      ["none", "nothing"],
                      ["mixed", "some"],
                      ["all", "all $10"],
                    ] as const
                  ).map(([m, label]) => (
                    <Control
                      key={m}
                      className={mode === m ? "active" : ""}
                      disabled={locked || mode === m}
                      aria-pressed={mode === m}
                      aria-label={`Others give ${label}`}
                      onClick={() => {
                        setMode(m);
                        check(give, m);
                      }}
                    >
                      {label}
                    </Control>
                  ))}
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
