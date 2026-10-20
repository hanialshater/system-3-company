"use client";

// Capped doubling game: expected value built from rare big payouts. The learner picks an entry price, plays
// batches of seeded games and watches the running average payout against that price, next to the median payout.
// Key state: a price chosen and at least 200 games played.
// Why the fair price is $20 is on the stage: a strip of 20 bars splits the learner's own average by the flip on
// which tails first came (games ending on flip k x $2^k / games). Each bar's fair share is $1 (dashed line); flips
// that came up often settle near $1, rare ones sit at $0 until one win makes them overshoot.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { MAXF, PRICES, fairPrice, payouts, pSmall, running, summary } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["priced", "many-games"] as const;
const W = 320;
const H = 186;
const PL = 30;
const PT = 8;
const PB = 104;
const money = (v: number) => `$${v >= 100 ? Math.round(v).toLocaleString("en-US") : v.toFixed(v % 1 === 0 ? 0 : 1)}`;
const FAIR = fairPrice();
// Strip geometry: bar k (flip 1..20) under the chart, $1 = 18 px, capped at $2.
const SB = 170;
const ONE = 18;
const CAP = 2;
const BW = (W - PL - 6) / MAXF;

/** Each flip's share of the average payout: (games whose first tails was on flip k) x $2^k / games. */
function shares(p: number[]): number[] {
  const out = Array<number>(MAXF + 1).fill(0);
  for (const v of p) if (v > 0) out[Math.round(Math.log2(v))] += v / p.length;
  return out.slice(1);
}
/** What the strip shows, in words the reveal can quote. */
function readStrip(sh: number[]) {
  let settled = 0;
  while (settled < MAXF && sh[settled] >= 0.5 && sh[settled] <= 1.6) settled++;
  const empty = sh.filter((v) => v === 0).length;
  let bigK = -1;
  sh.forEach((v, i) => {
    if (v > CAP && (bigK < 0 || v > sh[bigK])) bigK = i;
  });
  return { settled, empty, bigK };
}

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
  const sh = useMemo(() => shares(p), [p]);
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
        <text x={PL} y={PB + 12} className={s.lab}>average payout after each game →</text>
        <text x={PL} y={SB - CAP * ONE - 10} className={s.lab}>your average split by the flip tails came on (fair share $1 each)</text>
        <line x1={PL} x2={W - 6} y1={SB} y2={SB} className={s.axis} />
        <line x1={PL} x2={W - 6} y1={SB - ONE} y2={SB - ONE} className={s.one} />
        <text x={PL - 3} y={SB - ONE + 3} textAnchor="end" className={s.lab}>$1</text>
        {!locked &&
          sh.map((v, i) => {
            const hgt = Math.min(v, CAP) * ONE;
            return (
              <g key={i}>
                {v > 0 && <rect x={PL + i * BW + 1.5} y={SB - hgt} width={BW - 3} height={hgt} className={v > CAP ? s.barOver : s.bar} />}
                {v > CAP && (
                  <text x={PL + i * BW + BW / 2} y={SB - hgt - 2} textAnchor="middle" className={s.lab}>
                    {money(v)}
                  </text>
                )}
              </g>
            );
          })}
        {[1, 5, 10, 15, 20].map((k) => (
          <text key={k} x={PL + (k - 0.5) * BW} y={SB + 10} textAnchor="middle" className={s.lab}>
            {k === 1 ? "flip 1" : k}
          </text>
        ))}
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
        <Readout label="Your profit" value={locked || price === null || n === 0 ? "-" : `${profit! < 0 ? "-" : "+"}${money(Math.abs(profit!))}`} />
      </Row>
    </div>
  );
}

export default function CappedDoublingGame({ slug }: { slug: string }) {
  const [n, setN] = useState(0);
  const [price, setPrice] = useState<number | null>(null);
  const sm = summary(n);
  const share = sm.total > 0 ? Math.round((sm.biggest / sm.total) * 100) : 0;
  const st = readStrip(shares(payouts(n)));
  const bigShare = st.bigK >= 0 ? shares(payouts(n))[st.bigK] : 0;
  const bigWins = st.bigK >= 0 ? Math.round((bigShare * n) / 2 ** (st.bigK + 1)) : 0;
  const stripBits = [
    st.settled >= 2 ? `flips 1 to ${st.settled} each gave about $1` : "",
    st.bigK >= 0 ? `flip ${st.bigK + 1} gave ${money(bigShare)} from ${bigWins} rare win${bigWins === 1 ? "" : "s"}` : "",
    `${st.empty} of the ${MAXF} never came up, so gave $0`,
  ].filter(Boolean);
  const stripText = `In your strip, ${stripBits.slice(0, -1).join(", ")}${stripBits.length > 1 ? " and " : ""}${stripBits[stripBits.length - 1]}.`;
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `At a casino you flip a fair coin until the first tails, ${MAXF} flips at most. Tails on flip 1 wins $2, flip 2 $4, flip 3 $8, and so on; all heads wins nothing. What entry price breaks even over many games?`,
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
            Why ${FAIR}? Tails first on flip 1 pays $2 half the time: $1 of the average. On flip 2, $4 a quarter of the
            time: $1. Every flip&apos;s fair share is $1, so {MAXF} flips make ${FAIR}. {stripText} Yet{" "}
            {Math.round(pSmall() * 100)}% of plays pay $4 or less.
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
