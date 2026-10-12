"use client";

// Logistic growth felt as fish and room. The pond has 1,000 spots (at most
// 1,000 fish). New fish per month = r N (1 - N/K) with a made-up r = 0.5 per
// month and K = 1,000. Fish fill spots in a seeded order; this month's new
// fish take the next empty spots. Deterministic.

import { useMemo, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const K = 1000;
const COLS = 40;
const ROWS = 25;
const GAP = 7.5;
const R = 0.5;

const born = (n: number) => Math.round(R * n * (1 - n / K));

const RANK = (() => {
  let x = 777;
  const next = () => (x = (x * 48271) % 2147483647) / 2147483647;
  const idx = Array.from({ length: K }, (_, i) => i);
  for (let i = K - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  const r = Array(K).fill(0);
  idx.forEach((spot, k) => (r[spot] = k));
  return r;
})();

export default function FastestAtTheBend({ slug }: { slug: string }) {
  const [n, setN] = useState(100);
  const hit = useRef(new Set<string>());
  const g = born(n);
  const spots = useMemo(() => RANK.map((rk) => (rk < n ? "fish" : rk < n + g ? "new" : "room")), [n, g]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A pond holds at most 1,000 fish, and the population grows logistically (an S-curve). At what population is it adding fish fastest?",
        options: ["100 fish", "500 fish", "900 fish"],
        answer: 1,
      }}
      exploreHint="Compare new fish per month at 100, 500 and 900 fish."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            At 100 fish: 45 new per month. At 900: also 45. At 500: <strong>125</strong>, the most. Growth needs parents
            and room. With few fish there are few parents; near 1,000 there is almost no room left.
          </p>
          <p>
            In the logistic model, new fish = 0.5 &times; fish &times; share of room left. That product is biggest
            halfway, at 500 fish, half of what the pond can hold. That is where the S-curve bends from speeding up to
            slowing down.
          </p>
          <p className="muted">
            The growth rate is made up and the limit is fixed. Real populations can lag behind, overshoot or crash.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const go = (v: number) => {
          setN(v);
          const mark = (k: string) => {
            if (!hit.current.has(k)) {
              hit.current.add(k);
              interact();
            }
          };
          if (v > 0 && v <= 200) mark("low");
          if (v === 500) mark("mid");
          if (v >= 800 && v < K) mark("high");
        };
        return (
          <div className={s.wrap}>
            <svg viewBox={`0 0 ${COLS * GAP} ${ROWS * GAP}`} className={`stage-svg ${s.svg}`} role="img" aria-label={`${n} fish${locked ? "" : `, ${g} new this month`}`}>
              <rect x={0} y={0} width={COLS * GAP} height={ROWS * GAP} rx={8} className={s.pond} />
              {spots.map((st, i) => {
                const show = locked && st === "new" ? "room" : st;
                return (
                  <circle
                    key={i}
                    cx={(i % COLS) * GAP + GAP / 2}
                    cy={Math.floor(i / COLS) * GAP + GAP / 2}
                    r={show === "room" ? 1.2 : show === "new" ? 3.3 : 2.7}
                    className={s[show]}
                  />
                );
              })}
            </svg>

            <div className={s.legend} aria-hidden>
              <span><i className={s.fish} />fish</span>
              <span><i className={s.new} />born this month</span>
              <span><i className={s.room} />room</span>
            </div>

            <p className={s.msg} aria-live="polite">
              {locked
                ? "Make a prediction to start. The pond has room for 1,000 fish."
                : `${n} fish, room for ${K - n} more: ${g} new fish this month.`}
            </p>

            <Slider label="Fish in pond" value={n} min={0} max={K} step={50} disabled={locked} onChange={go} />
            <Row>
              {[100, 500, 900].map((v) => (
                <Control key={v} className={s.chip} disabled={locked || n === v} onClick={() => go(v)}>
                  {v} fish
                </Control>
              ))}
              <Readout label="New per month" value={locked ? "?" : g} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
