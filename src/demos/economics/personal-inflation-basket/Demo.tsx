"use client";

// Price index. One figure: the household budget as three blocks sized by spending share, each
// shaded by its price rise, above one bar that fills with each block's contribution (share x rise).
// Key state: rent, food and fun all added at the question's 50/30/20 split: overall rise 3.6%.
// Model: fixed basket, invented shares and rises, no switching of goods.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const ITEMS = [
  { key: "rent", name: "Rent", rise: 6 },
  { key: "food", name: "Food", rise: 2 },
  { key: "fun", name: "Fun", rise: 0 },
] as const;
const FOOD = 30;
const Q_RENT = 50;
const MILESTONES = ["all-added"] as const;

/** Spending shares (percent) for a given rent share: food fixed, fun takes the rest of 100. */
const shares = (rent: number) => [rent, FOOD, 100 - FOOD - rent];
const contrib = (rent: number, i: number) => (shares(rent)[i] * ITEMS[i].rise) / 100;
const total = (rent: number) => ITEMS.reduce((t, _, i) => t + contrib(rent, i), 0);
const PLAIN = ITEMS.reduce((t, it) => t + it.rise, 0) / ITEMS.length;
const Q_TOTAL = total(Q_RENT);
const pct = (v: number) => `${(Math.round(v * 10) / 10).toFixed(1)}%`;

const L = 12;
const W = 296;
const SCALE = 6; // bar runs 0..6 points

export default function PersonalInflationBasket({ slug }: { slug: string }) {
  const [added, setAdded] = useState([false, false, false]);
  const [rent, setRent] = useState(Q_RENT);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Your household spends ${Q_RENT}% of its budget on rent (up 6%), ${FOOD}% on food (up 2%) and ${100 - FOOD - Q_RENT}% on fun (up 0%). By how much did your total cost of living rise?`,
        options: [pct(PLAIN), pct(Q_TOTAL), "6%"],
        answer: 1,
      }}
      exploreHint="Add each block's share of the rise to the bar, at the 50% rent split."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            With the 50/30/20 budget, rent added <strong>{contrib(Q_RENT, 0).toFixed(1)}</strong> points, food{" "}
            <strong>{contrib(Q_RENT, 1).toFixed(1)}</strong> and fun <strong>{contrib(Q_RENT, 2).toFixed(1)}</strong>:{" "}
            <strong>{pct(Q_TOTAL)}</strong> in all. The plain average of 6, 2 and 0 is {pct(PLAIN)}, which ignores that half
            the budget goes to the item that rose most.
          </p>
          <p>A price index weights each price by its share of spending, so a household&apos;s own inflation depends on its own mix.</p>
          <p className="muted">A model: invented shares and rises, a fixed basket, no switching of goods.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const check = (a: boolean[], r: number) => {
              if (a.every(Boolean) && r === Q_RENT) reach("all-added");
            };
            const add = (i: number) => {
              const a = added.map((v, j) => (j === i ? true : v));
              setAdded(a);
              check(a, rent);
            };
            const all = added.every(Boolean);
            const sh = shares(rent);
            let x = L;
            const blocks = ITEMS.map((it, i) => {
              const w = (sh[i] / 100) * W;
              const b = { x, w, i, it };
              x += w;
              return b;
            });
            let bx = L;
            const segs = ITEMS.map((_, i) => {
              if (!added[i]) return null;
              const w = (contrib(rent, i) / SCALE) * W;
              const seg = { x: bx, w };
              bx += w;
              return seg;
            });
            const sum = ITEMS.reduce((t, _, i) => t + (added[i] ? contrib(rent, i) : 0), 0);
            const plainX = L + (PLAIN / SCALE) * W;
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: fixed basket, invented numbers</p>
                <svg viewBox="0 0 320 150" className="stage-svg" role="img" aria-label="Budget shares and the overall rise">
                  <text x={L} y={14} className={s.axis}>
                    Budget by share, shaded by price rise
                  </text>
                  {blocks.map(({ x: bx0, w, i, it }) => (
                    <g key={it.key}>
                      <rect x={bx0} y={20} width={w} height={30} fill="var(--bad)" fillOpacity={0.12 + (0.6 * it.rise) / 6} stroke="var(--line)" />
                      <text x={bx0 + w / 2} y={33} textAnchor="middle" className={s.small}>
                        {it.name} {sh[i]}%
                      </text>
                      <text x={bx0 + w / 2} y={45} textAnchor="middle" className={s.small}>
                        up {it.rise}%
                      </text>
                    </g>
                  ))}
                  <text x={L} y={84} className={s.axis}>
                    Overall rise: each block adds share x rise
                  </text>
                  <rect x={L} y={90} width={W} height={24} rx={3} className={s.ghostFill} />
                  {segs.map(
                    (g, i) => g && <rect key={i} x={g.x} y={90} width={g.w} height={24} className={i === 0 ? s.main : i === 1 ? s.soft : s.goodFill} />,
                  )}
                  <text x={L} y={130} className={s.axis}>
                    0%
                  </text>
                  <text x={L + W} y={130} textAnchor="end" className={s.axis}>
                    6%
                  </text>
                  {all && !locked && (
                    <>
                      <line x1={plainX} y1={86} x2={plainX} y2={118} stroke="var(--fg)" strokeWidth={1.5} strokeDasharray="3 3" />
                      <text x={plainX} y={142} textAnchor="middle" className={s.axis}>
                        plain average {pct(PLAIN)}
                      </text>
                    </>
                  )}
                </svg>
                <Row>
                  <Readout label="Overall rise" value={locked ? "?" : all ? pct(sum) : added.some(Boolean) ? `${pct(sum)} so far` : "none yet"} />
                </Row>
                {all && rent !== Q_RENT && <p className={s.msg}>Set rent back to {Q_RENT}% to match the question.</p>}
                <Row>
                  {ITEMS.map((it, i) => (
                    <Control key={it.key} disabled={locked || added[i]} onClick={() => add(i)} aria-label={`Add ${it.name}`}>
                      {added[i] ? `${it.name} added` : `Add ${it.name.toLowerCase()}`}
                    </Control>
                  ))}
                  <Control disabled={locked || !added.some(Boolean)} onClick={() => setAdded([false, false, false])} aria-label="Clear the bar">
                    Clear
                  </Control>
                </Row>
                <Slider
                  label="Rent share (fun gets the rest)"
                  value={rent}
                  min={20}
                  max={70}
                  step={5}
                  format={(v) => `${v}%`}
                  disabled={locked}
                  onChange={(v) => {
                    setRent(v);
                    check(added, v);
                  }}
                />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
