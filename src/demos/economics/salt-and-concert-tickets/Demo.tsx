"use client";

// Price elasticity. One picture: revenue as a box, price (height) × sales (width), with the
// before-box (100% × 100%) dashed. The slider raises the price; the tiles switch between two goods
// whose invented buyers cut purchases by 0.1% (salt) or 2% (concert tickets) per 1% price rise.
// Key state: both goods at +10%: salt revenue +8.9%, tickets −12%.
// Model: invented, straight-line reactions; revenue (money taken in), not profit.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type Good = "salt" | "tickets";
const GOODS: Record<Good, { name: string; cutPerPoint: number }> = {
  salt: { name: "Salt", cutPerPoint: 0.1 },
  tickets: { name: "Concert tickets", cutPerPoint: 2 },
};
const Q_RISE = 10;
const MAX_RISE = 30;
const STEP = 5; // QA's two arrow presses land on +10%
const MILESTONES = ["salt-10", "tickets-10"] as const;

/** Sales cut in % for a price rise of x %. */
const cut = (g: Good, x: number) => (GOODS[g].cutPerPoint * 10 * x) / 10;
/** Revenue as % of before: (100 + x)(100 − cut) / 100. */
const revenue = (g: Good, x: number) => ((100 + x) * (100 - cut(g, x))) / 100;
const pct = (v: number) => `${v > 0 ? "+" : v < 0 ? "−" : ""}${Math.abs(v).toFixed(Math.abs(v) % 1 ? 1 : 0)}%`;
const factor = (v: number) => (v / 100).toFixed(3).replace(/0+$/, "").replace(/\.$/, "");

const SALT_Q = revenue("salt", Q_RISE) - 100; // +8.9
const TIX_Q = revenue("tickets", Q_RISE) - 100; // −12

// Geometry (viewBox 320 × 190): sales 0..110% across, price 0..140% up.
const L = 30;
const R = 300;
const TOP = 12;
const BOT = 170;
const sx = (q: number) => L + (q / 110) * (R - L);
const sy = (p: number) => BOT - (p / 140) * (BOT - TOP);

export default function SaltAndConcertTickets({ slug }: { slug: string }) {
  const [good, setGood] = useState<Good>("salt");
  const [rise, setRise] = useState(0);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A grocer selling salt and a promoter selling concert tickets both raise prices ${Q_RISE}%. Salt buyers cut purchases by ${cut("salt", Q_RISE)}%; ticket buyers cut by ${cut("tickets", Q_RISE)}%. Whose revenue (price times sales) rises?`,
        options: ["both", "only salt", "only tickets"],
        answer: 1,
      }}
      exploreHint={`Raise each price ${Q_RISE}% and compare the box with the dashed one.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            At +{Q_RISE}%, salt sales fell {cut("salt", Q_RISE)}% and revenue became 1.1 × {factor(100 - cut("salt", Q_RISE))} ={" "}
            {factor(revenue("salt", Q_RISE))} of before: <strong>{pct(SALT_Q)}</strong>. Ticket sales fell {cut("tickets", Q_RISE)}%, so
            revenue became 1.1 × {factor(100 - cut("tickets", Q_RISE))} = {factor(revenue("tickets", Q_RISE))}:{" "}
            <strong>{pct(TIX_Q)}</strong>.
          </p>
          <p>
            Revenue is the box: price times sales. A higher price makes it taller; buyers who leave make it narrower. It grows when
            buyers barely react and shrinks when they walk away. How strongly buyers react to price is called the price elasticity
            of demand.
          </p>
          <p className="muted">A model: invented reactions, one price step, revenue not profit.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const check = (g: Good, x: number) => {
              if (x === Q_RISE) reach(g === "salt" ? "salt-10" : "tickets-10");
            };
            const setX = (x: number) => {
              setRise(x);
              check(good, x);
            };
            const pick = (g: Good) => {
              setGood(g);
              check(g, rise);
            };
            const q = 100 - cut(good, rise);
            const p = 100 + rise;
            const rev = revenue(good, rise) - 100;
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: invented buyers, revenue not profit</p>
                <svg
                  viewBox="0 0 320 190"
                  className="stage-svg"
                  role="img"
                  aria-label={locked ? "Revenue box before any price rise" : `${GOODS[good].name}: revenue ${pct(rev)}`}
                >
                  <line x1={L} y1={TOP} x2={L} y2={BOT} stroke="var(--line)" />
                  <line x1={L} y1={BOT} x2={R} y2={BOT} stroke="var(--line)" />
                  <text x={L + 4} y={TOP + 4} className={s.axis}>
                    price
                  </text>
                  <text x={R} y={BOT + 14} textAnchor="end" className={s.axis}>
                    sales
                  </text>
                  {!locked && (
                    <rect
                      x={L}
                      y={sy(p)}
                      width={sx(q) - L}
                      height={BOT - sy(p)}
                      className={rev >= 0 ? s.goodFill : s.badFill}
                    />
                  )}
                  <rect x={L} y={sy(100)} width={sx(100) - L} height={BOT - sy(100)} className={s.ghost} />
                  <text x={sx(100)} y={sy(100) - 5} textAnchor="end" className={s.axis}>
                    dashed = before
                  </text>
                  <text x={(L + sx(100)) / 2} y={(sy(100) + BOT) / 2 + 6} textAnchor="middle" className={s.big}>
                    {locked ? "revenue = price × sales" : `revenue ${pct(rev)}`}
                  </text>
                  {!locked && (
                    <text x={L + 6} y={sy(p) - 6} className={s.value}>
                      {GOODS[good].name}
                    </text>
                  )}
                </svg>

                <Slider label="Price rise" value={rise} min={0} max={MAX_RISE} step={STEP} disabled={locked} format={(v) => `+${v}%`} onChange={setX} />
                <Row>
                  {(Object.keys(GOODS) as Good[]).map((g) => (
                    <Control
                      key={g}
                      className={`${s.tile} ${good === g ? "active" : ""}`}
                      disabled={locked || good === g}
                      aria-pressed={good === g}
                      onClick={() => pick(g)}
                    >
                      {GOODS[g].name}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Readout label="Sales" value={locked ? "?" : pct(-cut(good, rise))} />
                  <Readout label="Revenue" value={locked ? "?" : pct(rev)} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
