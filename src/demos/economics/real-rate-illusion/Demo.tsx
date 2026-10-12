"use client";

// Real interest rate on one number line. Your $100 earns 3% and becomes $103 (fixed marker).
// A basket that costs $100 today costs $100 × (1 + inflation) next year (moving marker).
// When the basket passes your money, the money turns red: you can buy less than today.
// Model: rates are illustrative; one year, one basket, no tax.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const INTEREST = 3;
const VMIN = 96;
const VMAX = 110;

// Number line geometry (viewBox 320 × 170).
const L = 20;
const R = 300;
const AXIS = 92;
const px = (v: number) => L + ((v - VMIN) / (VMAX - VMIN)) * (R - L);

export default function RealRateIllusion({ slug }: { slug: string }) {
  const [infl, setInfl] = useState(0);

  const money = 100 * (1 + INTEREST / 100);
  const basket = 100 * (1 + infl / 100);
  const buys = (money / basket) * 100; // % of today's basket you can buy
  const real = buys - 100;
  const tone = Math.abs(real) < 0.005 ? "even" : real > 0 ? "up" : "down";
  const moneyCls = tone === "down" ? s.markBad : tone === "up" ? s.markGood : s.markEven;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Your savings pay 3% a year; prices rise 5%. After a year, what can your money buy compared with now?",
        options: ["More", "The same", "Less"],
        answer: 2,
      }}
      exploreHint="Raise prices to 5%. Watch your money's colour."
      reveal={() => (
        <>
          <p>
            Your $100 grows to <strong>$103</strong>, but the basket now costs <strong>$105</strong>. $103 buys what about{" "}
            <strong>$98.10</strong> buys today: about <strong>1.9% less</strong>, even though your balance went up.
          </p>
          <p>
            What matters is interest relative to price rises: the <em>real</em> rate, (1.03 ÷ 1.05) − 1. For small rates
            it is roughly interest minus inflation, 3% − 5% = −2%. You saw the colour flip exactly where prices rise
            3%, the same as your interest.
          </p>
          <p className="muted">A model with illustrative rates: one year, one basket, no tax.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const set = (v: number) => {
          const i = Math.max(0, Math.min(8, Math.round(v * 2) / 2));
          setInfl(i);
          if (i >= 5) interact(); // the reveal is earned at the brief's 5%
        };
        return (
          <div className={s.wrap}>
            <svg viewBox="0 0 320 170" className="stage-svg" role="img" aria-label="Your money and the basket's price on one number line">
              <line x1={L} y1={AXIS} x2={R} y2={AXIS} stroke="var(--line)" strokeWidth={2} />
              {[96, 98, 100, 102, 104, 106, 108, 110].map((v) => (
                <g key={v}>
                  <line x1={px(v)} y1={AXIS - 4} x2={px(v)} y2={AXIS + 4} stroke="var(--line)" strokeWidth={2} />
                  <text x={px(v)} y={AXIS + 18} textAnchor="middle" className={s.axis}>
                    ${v}
                  </text>
                </g>
              ))}
              {/* Your money: above the line. */}
              <g transform={`translate(${px(money)},${AXIS})`}>
                <line y1={0} y2={-30} className={moneyCls} strokeWidth={3} />
                <circle cy={-36} r={7} className={moneyCls} />
                <text y={-50} textAnchor="middle" className={s.value} fill="var(--fg)">
                  your $100 after a year: ${money.toFixed(0)}
                </text>
              </g>
              {/* The basket: below the line. Hidden until the stage unlocks. */}
              {!locked && (
                <g transform={`translate(${px(basket)},${AXIS})`}>
                  <line y1={26} y2={44} stroke="var(--fg)" strokeWidth={3} />
                  <rect x={-8} y={44} width={16} height={12} rx={3} fill="var(--fg)" />
                  <text y={72} textAnchor={basket > 105 ? "end" : basket < 101 ? "start" : "middle"} className={s.value} fill="var(--fg)">
                    today&apos;s $100 basket costs ${basket.toFixed(2)}
                  </text>
                </g>
              )}
            </svg>

            <p className={s.msg} aria-live="polite">
              {locked
                ? "Lock in a guess to start."
                : tone === "down"
                  ? "Your money buys less than today."
                  : tone === "up"
                    ? "Your money buys more than today."
                    : "Your money buys exactly the same."}
            </p>

            <Row>
              <Readout label="Interest" value={`${INTEREST}%`} />
              <Readout label="Buys, vs today" value={locked ? "?" : `${real >= 0 ? "+" : "−"}${Math.abs(real).toFixed(1)}%`} />
            </Row>
            <Row>
              <Slider label="Prices rise" value={infl} min={0} max={8} step={0.5} disabled={locked} format={(v) => `${v.toFixed(1)}%`} onChange={set} />
              <Control disabled={locked || infl === 5} onClick={() => set(5)}>
                5%
              </Control>
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
