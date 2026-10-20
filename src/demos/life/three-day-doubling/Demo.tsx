"use client";

// A made-up outbreak with a fixed 3-day doubling time, starting from 100 cases.
// The stage is 1,024 dots; each lit dot is 100 cases, so day 30 (10 doublings)
// lights all of them. Dots light from the centre out so the outbreak reads as
// one growing cluster. The learner scrubs days and steps back 6 days from day 30.

import { useMemo, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const DAYS = 30;
const SIDE = 32; // 32 x 32 = 1,024 dots
const GAP = 9.2;
const START = 100;

const cases = (d: number) => START * 2 ** (d / 3);

// Order dots by distance from the centre (ties broken deterministically).
const ORDER = (() => {
  const c = (SIDE - 1) / 2;
  const idx = Array.from({ length: SIDE * SIDE }, (_, i) => i);
  const key = (i: number) => {
    const x = i % SIDE, y = Math.floor(i / SIDE);
    return Math.hypot(x - c, y - c) + ((i * 2654435761) % 1000) / 1e5;
  };
  idx.sort((a, b) => key(a) - key(b));
  const rank = Array(SIDE * SIDE).fill(0);
  idx.forEach((i, r) => (rank[i] = r));
  return rank;
})();

export default function ThreeDayDoubling({ slug }: { slug: string }) {
  const [day, setDay] = useState(0);
  const hit = useRef(new Set<string>());
  const lit = Math.floor(cases(day) / 100 + 1e-9);
  const dots = useMemo(
    () =>
      ORDER.map((r, i) => ({
        x: (i % SIDE) * GAP + GAP / 2,
        y: Math.floor(i / SIDE) * GAP + GAP / 2,
        on: r < lit,
      })),
    [lit],
  );
  const n = Math.round(cases(day));
  const back = DAYS - day;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Your town has 100 cases of a made-up disease, and the count doubles every 3 days. If nothing changes, about how many cases will there be after 30 days?",
        options: ["About 1,000", "About 10,000", "About 100,000"],
        answer: 2,
      }}
      exploreHint="Go to day 30. Then step back 6 days and compare."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            30 days is 10 doublings: 100 &times; 2<sup>10</sup> = <strong>102,400</strong> cases, about 100,000. The
            count does not grow by a fixed amount each day; it multiplies. The last 3 days added about as many cases as
            the first 27.
          </p>
          <p>
            Stepping back from day 30 to day 24 cut the count to a quarter, 25,600. Six days is two doublings, so in this
            model a 6-day delay means four times as many cases. When growth compounds, a few days is a lot.
          </p>
          <p className="muted">
            The disease is made up and its doubling time never changes. Real outbreaks slow as people become immune or
            change how they mix.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const go = (d: number) => {
          const nd = Math.max(0, Math.min(DAYS, d));
          setDay(nd);
          const mark = (k: string) => {
            if (!hit.current.has(k)) {
              hit.current.add(k);
              interact();
            }
          };
          if (nd === DAYS) mark("d30");
          if (hit.current.has("d30") && nd >= 21 && nd <= 27) mark("back");
        };
        const seen30 = hit.current.has("d30");
        const msg = locked
          ? "Make a prediction to start. Each lit dot is 100 cases."
          : day === 0
            ? "Day 0: 100 cases, one lit dot."
            : seen30 && back > 0 && back % 3 === 0 && back <= 12
              ? `Day ${day}: 1/${2 ** (back / 3)} of the day-30 count.`
              : `Day ${day}: ${n.toLocaleString("en-US")} cases.`;
        return (
          <div className={s.wrap}>
            <svg viewBox={`0 0 ${SIDE * GAP} ${SIDE * GAP}`} className={`stage-svg ${s.svg}`} role="img" aria-label={`Day ${day}: ${n} cases`}>
              {dots.map((d, i) => (
                <circle key={i} cx={d.x} cy={d.y} r={d.on ? 3.6 : 1.6} className={d.on ? s.on : s.off} />
              ))}
            </svg>

            <p className={s.msg} aria-live="polite">{msg}</p>

            <Slider label="Day" value={day} min={0} max={DAYS} disabled={locked} format={(v) => `day ${v}`} onChange={go} />
            <Row>
              <Control disabled={locked || day >= DAYS} onClick={() => go(day + 3)}>
                +3 days
              </Control>
              <Control disabled={locked || day >= DAYS} onClick={() => go(DAYS)}>
                To day 30
              </Control>
              <Control disabled={locked || day < 6} onClick={() => go(day - 6)}>
                6 days earlier
              </Control>
            </Row>
            <Row>
              <Readout label="Doublings" value={locked ? 0 : Math.floor(day / 3)} />
              <Readout label="Cases" value={locked ? "100" : n.toLocaleString("en-US")} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
