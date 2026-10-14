"use client";

// The wheel number pulls the guess (Thinking, Fast and Slow, Kahneman 2011, ch. 11; brief
// company/domains/briefs/books.md #4). The lesson's crowd model (deterministic, no randomness):
// 30 people whose private beliefs are spread evenly from 15 to 55 (median 35). Each starts at the
// wheel's number and moves 60% of the way toward their own belief: estimate = A + 0.6 (belief − A).
// Median = 0.4 A + 21: 25 at A = 10, 47 at A = 65. With the anchor hidden, each guess is the belief (35).
// Published comparison (Tversky & Kahneman 1974): medians 25 and 45.
// Controls (DOM order): anchor slider (0–100, starts at 40), [Wheel lands on 10], [Wheel lands on 65],
// [Hide the wheel] / [Show the wheel]. Milestones: "lo" (anchor 10 shown: median recorded), "hi"
// (anchor 65 shown: median recorded), "hidden" (wheel hidden: dots at beliefs). A record line keeps the
// two medians on the stage after later presses.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const N = 30;
const PULL = 0.6;
const BELIEFS = Array.from({ length: N }, (_, i) => 15 + (40 * (i + 0.5)) / N);
/** Lane (row) of each person: a fixed shuffle (i × 7 mod 30) so the crowd is not a diagonal. */
const LANE = BELIEFS.map((_, i) => (i * 7) % N);
const MILESTONES = ["lo", "hi", "hidden"] as const;

function median(v: number[]) {
  const a = [...v].sort((x, y) => x - y);
  const m = a.length / 2;
  return a.length % 2 ? a[Math.floor(m)] : (a[m - 1] + a[m]) / 2;
}
const estimates = (anchor: number, shown: boolean) => BELIEFS.map((b) => (shown ? anchor + PULL * (b - anchor) : b));

// Geometry (viewBox 320 × 170).
const XL = 16;
const XR = 304;
const YT = 26;
const YB = 140;
const px = (v: number) => XL + (v / 100) * (XR - XL);
const py = (lane: number) => YT + (lane + 0.5) * ((YB - YT) / N);

export default function WheelNumberPullsGuess({ slug }: { slug: string }) {
  const [anchor, setAnchor] = useState(40);
  const [shown, setShown] = useState(true);
  const [rec, setRec] = useState<{ lo?: number; hi?: number }>({});
  const est = estimates(anchor, shown);
  const med = median(est);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Two groups spin a wheel that lands on 10 or on 65, then estimate the percentage of African nations in the UN. How do the groups' typical answers compare?",
        options: ["About 0 points apart", "About 5 points apart", "About 20 points apart"],
        answer: 2,
      }}
      exploreHint="Set the wheel to 10, then 65, then hide it."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            With the wheel at 10 the crowd&apos;s median was <strong>{Math.round(rec.lo ?? 25)}</strong>. At 65 it was{" "}
            <strong>{Math.round(rec.hi ?? 47)}</strong>. The number told them nothing, yet every guess started there and stopped
            adjusting too soon. In the original 1974 study the medians were 25 and 45.
          </p>
          <p>
            <em>Thinking, Fast and Slow</em> calls this anchoring. Does it hold up? Yes: it is one of the most reliably replicated
            effects in judgment research. Why it happens is still debated; insufficient adjustment, shown here, is one account.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const set = (a: number, sh: boolean) => {
              setAnchor(a);
              setShown(sh);
              const m = median(estimates(a, sh));
              if (sh && a === 10) {
                setRec((x) => (x.lo === undefined ? { ...x, lo: m } : x));
                reach("lo");
              }
              if (sh && a === 65) {
                setRec((x) => (x.hi === undefined ? { ...x, hi: m } : x));
                reach("hi");
              }
              if (!sh) reach("hidden");
            };
            const on = !locked;
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model crowd: each guess moves 60% from wheel to belief</p>
                <Row>
                  <Readout label="Wheel" value={on && shown ? anchor : "–"} />
                  <Readout label="Crowd's median guess" value={on ? `${Math.round(med)}%` : "?"} />
                </Row>
                <svg
                  viewBox="0 0 320 170"
                  className="stage-svg"
                  role="img"
                  aria-label={
                    on
                      ? `${N} guesses${shown ? ` after a wheel at ${anchor}` : " with no wheel"}; median ${Math.round(med)}%`
                      : `${N} people about to guess`
                  }
                >
                  <line x1={XL} y1={YB + 4} x2={XR} y2={YB + 4} className={s.edge} />
                  {[0, 25, 50, 75, 100].map((v) => (
                    <text key={v} x={px(v)} y={YB + 18} textAnchor="middle" className={s.axis}>
                      {v}%
                    </text>
                  ))}
                  {on && shown && (
                    <g>
                      <line x1={px(anchor)} y1={YT - 6} x2={px(anchor)} y2={YB + 4} className={s.anchor} />
                      <text x={px(anchor)} y={YT - 10} textAnchor={anchor > 80 ? "end" : anchor < 20 ? "start" : "middle"} className={s.anchorLabel}>
                        wheel {anchor}
                      </text>
                    </g>
                  )}
                  {BELIEFS.map((_, i) => {
                    const y = py(LANE[i]);
                    const x = on ? px(est[i]) : px(50);
                    return (
                      <g key={i}>
                        {on && shown && <line x1={px(anchor)} y1={y} x2={x} y2={y} className={s.trail} />}
                        <circle cx={x} cy={y} r={3.2} className={on ? s.dot : s.idle} />
                      </g>
                    );
                  })}
                  {on && (
                    <g>
                      <line x1={px(med)} y1={YT - 2} x2={px(med)} y2={YB + 4} className={s.median} />
                      <text
                        x={px(med) + (shown && anchor > med ? -4 : 4)}
                        y={YB - 2}
                        textAnchor={shown && anchor > med ? "end" : "start"}
                        className={s.medLabel}
                      >
                        median {Math.round(med)}
                      </text>
                    </g>
                  )}
                </svg>
                <p className={s.rec} aria-live="polite">
                  {on && rec.lo !== undefined && <span>Wheel 10: median {Math.round(rec.lo)}</span>}
                  {on && rec.lo !== undefined && rec.hi !== undefined && " · "}
                  {on && rec.hi !== undefined && <span>Wheel 65: median {Math.round(rec.hi)}</span>}
                </p>
                <Slider
                  label="Wheel lands on"
                  value={anchor}
                  min={0}
                  max={100}
                  step={1}
                  disabled={locked || !shown}
                  onChange={(v) => set(v, true)}
                />
                <Row>
                  <Control className={shown && anchor === 10 ? "active" : ""} disabled={locked || (shown && anchor === 10)} onClick={() => set(10, true)}>
                    Wheel: 10
                  </Control>
                  <Control className={shown && anchor === 65 ? "active" : ""} disabled={locked || (shown && anchor === 65)} onClick={() => set(65, true)}>
                    Wheel: 65
                  </Control>
                  <Control disabled={locked} onClick={() => set(anchor, !shown)}>
                    {shown ? "Hide wheel" : "Show wheel"}
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
