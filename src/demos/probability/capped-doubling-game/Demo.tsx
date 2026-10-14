"use client";

// Capped doubling game: expected value built from rare big payouts. The learner picks an entry price, plays
// batches of seeded games and watches the running average payout against that price, next to the median payout.
// Key state: a price chosen and at least 200 games played. The exact $20 is shown only in the reveal.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { MAXF, PRICES, fairPrice, payouts, pSmall, running, summary } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["priced", "many-games"] as const;
const W = 320;
const H = 120;
const PL = 30;
const PT = 8;
const PB = 104;
const money = (v: number) => `$${v >= 100 ? Math.round(v).toLocaleString("en-US") : v.toFixed(v % 1 === 0 ? 0 : 1)}`;
const FAIR = fairPrice();

function Stage({ locked, reach, n, setN, price, setPrice }: {
  locked: boolean;
  reach: (m: string) => void;
  n: number;
  setN: (n: number) => void;
  price: number | null;
  setPrice: (p: number) => void;
}) {
  const p = useMemo(() => payouts(n), [n]);
  const sm = useMemo(() => summary(n, p), [n, p]);
  const run = useMemo(() => running(p), [p]);
  const ymax = Math.max(30, Math.ceil(Math.max(0, ...run) / 10) * 10 + 10);
  const px = (i: number) => PL + (i / Math.max(1, n - 1)) * (W - PL - 6);
  const py = (v: number) => PB - (v / ymax) * (PB - PT);
  const step = Math.max(1, Math.floor(n / 150));
  const pts = run.filter((_, i) => i % step === 0 || i === n - 1).map((v, j, arr) => {
    const i = j === arr.length - 1 ? n - 1 : j * step;
    return `${px(i).toFixed(1)},${py(v).toFixed(1)}`;
  });
  const play = (d: number) => {
    setN(n + d);
    if (n + d >= 200) reach("many-games");
  };
  const show = (v: string) => (locked ? "?" : n === 0 ? "-" : v);
  const profit = price === null ? null : sm.total - price * n;

  return (
    <div className={s.wrap}>
      <p className={s.msg}>
        {locked
          ? "Make a prediction to start."
          : `Flip until tails (at most ${MAXF} flips). Tails on flip 1 pays $2, flip 2 $4, flip 3 $8… All heads pays $0.`}
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.svg}`} role="img" aria-label={`Running average payout after ${n} games`}>
        <line x1={PL} x2={W - 6} y1={PB} y2={PB} className={s.axis} />
        <text x={PL - 3} y={PB + 3} textAnchor="end" className={s.lab}>$0</text>
        <text x={PL - 3} y={PT + 6} textAnchor="end" className={s.lab}>${ymax}</text>
        {price !== null && (
          <>
            <line x1={PL} x2={W - 6} y1={py(price)} y2={py(price)} className={s.price} />
            <text x={W - 8} y={py(price) - 3} textAnchor="end" className={s.lab}>price ${price}</text>
          </>
        )}
        {n > 1 && <polyline points={pts.join(" ")} fill="none" className={s.avg} />}
        <text x={PL} y={H - 4} className={s.lab}>average payout after each game →</text>
      </svg>
      <Row>
        {PRICES.map((v) => (
          <Control
            key={v}
            className={price === v ? "active" : ""}
            disabled={locked}
            onClick={() => {
              setPrice(v);
              reach("priced");
            }}
          >
            Price ${v}
          </Control>
        ))}
      </Row>
      <Row>
        <Control disabled={locked} onClick={() => play(50)}>Play 50 games</Control>
        <Control disabled={locked} onClick={() => play(500)}>Play 500 games</Control>
      </Row>
      <Row>
        <Readout label="Games" value={locked ? "?" : n} />
        <Readout label="Average" value={show(money(sm.avg))} />
        <Readout label="Median" value={show(money(sm.median))} />
        <Readout label="Biggest" value={show(money(sm.biggest))} />
        <Readout label="Profit" value={locked || price === null || n === 0 ? "-" : `${profit! < 0 ? "-" : "+"}${money(Math.abs(profit!))}`} />
      </Row>
    </div>
  );
}

export default function CappedDoublingGame({ slug }: { slug: string }) {
  const [n, setN] = useState(0);
  const [price, setPrice] = useState<number | null>(null);
  const sm = summary(n);
  const share = sm.total > 0 ? Math.round((sm.biggest / sm.total) * 100) : 0;
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Flip a fair coin until the first tails, at most ${MAXF} flips. First tails on flip 1 wins $2, on flip 2 wins $4, on flip 3 wins $8, and so on, doubling (all heads wins nothing). What is the fair entry price?`,
        options: ["$2", "$10", `$${FAIR}`],
        answer: 2,
      }}
      exploreHint="Pick a price, then play 50 games and 500 more."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            After your {n} games the average payout was {money(sm.avg)} but the median only {money(sm.median)}. Your biggest, {money(sm.biggest)}, was {share}% of everything paid out.
          </p>
          <p>
            Why ${FAIR}? Tails first on flip 1 pays $2 half the time: $1 on average. On flip 2, $4 a quarter of the time: $1. On flip 3, $8 an eighth of the time: $1. Every flip adds $1, so {MAXF} flips make ${FAIR}, even though {Math.round(pSmall() * 100)}% of plays pay $4 or less. Another run could show a lower average: the big wins are rare.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => <Stage locked={locked} reach={reach} n={n} setN={setN} price={price} setPrice={setPrice} />}
        </Milestones>
      )}
    </Lesson>
  );
}
