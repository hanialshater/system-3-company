"use client";

// Order changes total waiting. Four print jobs (8, 4, 2, 1 minutes). Each row of the timeline
// is one job: shaded = waiting before it starts, solid = printing. The learner taps a job to
// move it one place earlier and watches the total wait fall from 34 to 11 with shortest first.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import s from "./styles.module.css";

const JOBS = [8, 4, 2, 1];
const TOTAL = JOBS.reduce((a, b) => a + b, 0);
const BEST = 11;

function waits(order: number[]) {
  let t = 0;
  return order.map((d) => {
    const w = t;
    t += d;
    return w;
  });
}
const sum = (a: number[]) => a.reduce((x, y) => x + y, 0);

const X0 = 46;
const PX = 17; // px per minute
const RH = 26;

export default function ShortestJobFirstWait({ slug }: { slug: string }) {
  const [order, setOrder] = useState<number[]>(JOBS);
  const [seen, setSeen] = useState<number[]>([sum(waits(JOBS))]);

  const w = waits(order);
  const total = sum(w);
  const best = total === BEST;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "At the office printer, four jobs take 8, 4, 2 and 1 minutes. Run in that order, they wait a total of 34 minutes before starting. If you print shortest first, what is the total wait?",
        options: ["the same 34", "about a third of it", "a little less"],
        answer: 1,
      }}
      exploreHint="Tap a job to move it earlier. Watch the total wait."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            {seen.length > 2 ? `You tried ${seen.length} orders. ` : ""}
            Longest first, the jobs waited 0 + 8 + 12 + 14 = 34 minutes. Shortest first: 0 + 1 + 3 + 7 ={" "}
            <strong>11</strong>, about a third.
          </p>
          <p>
            A job at the front makes every job behind it wait, so its length is counted once for each of them. Put the
            short ones first and the 8-minute job delays nobody. If short jobs keep arriving, a long one can
            wait forever.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const set = (next: number[]) => {
          if (locked) return;
          setOrder(next);
          const t = sum(waits(next));
          setSeen((x) => (x.includes(t) ? x : [...x, t]));
          if (t === BEST) interact();
        };
        const earlier = (i: number) => {
          if (i === 0) return;
          const next = [...order];
          [next[i - 1], next[i]] = [next[i], next[i - 1]];
          set(next);
        };

        const msg = locked
          ? "Make a prediction to start."
          : best
            ? "Shortest first: total wait 11 minutes."
            : `Total wait: ${total} minutes. Tap a job to move it earlier.`;

        return (
          <div className={s.wrap}>
            <p className={`${s.msg} ${best ? s.good : ""}`} aria-live="polite">
              {msg}
            </p>
            <div className={s.queue}>
              <span className="muted small">Queue →</span>
              {order.map((d, i) => (
                <Control
                  key={d}
                  className={`${s.job} ${s[`j${d}`]}`}
                  disabled={locked || i === 0}
                  aria-label={`Move the ${d}-minute job earlier`}
                  onClick={() => earlier(i)}
                >
                  {d} min
                </Control>
              ))}
            </div>
            <svg viewBox="0 0 320 150" className="stage-svg" role="img" aria-label={`Timeline: total wait ${total} minutes`}>
              {order.map((d, i) => {
                const y = 6 + i * RH;
                return (
                  <g key={d}>
                    <text x={X0 - 6} y={y + 15} textAnchor="end" className={s.label}>
                      {d} min
                    </text>
                    {w[i] > 0 && (
                      <rect x={X0} y={y + 3} width={w[i] * PX} height={RH - 8} rx={3} fill="var(--bad)" opacity={0.22} />
                    )}
                    {w[i] >= 3 && (
                      <text x={X0 + 4} y={y + 15} className={s.wait}>
                        waits {w[i]}
                      </text>
                    )}
                    <rect x={X0 + w[i] * PX} y={y + 2} width={d * PX} height={RH - 6} rx={3} className={s[`f${d}`]} />
                  </g>
                );
              })}
              <line x1={X0} x2={X0 + TOTAL * PX} y1={112} y2={112} stroke="var(--line)" />
              {[0, 5, 10, 15].map((t) => (
                <text key={t} x={X0 + t * PX} y={124} textAnchor="middle" className={s.axis}>
                  {t}
                </text>
              ))}
              <text x={X0 + TOTAL * PX} y={138} textAnchor="end" className={s.axis}>
                minutes from now · shaded = waiting
              </text>
              <text x={4} y={146} className={`${s.total} ${best ? s.goodFill : ""}`}>
                Total wait {total}
              </text>
            </svg>
            <Row>
              <Control disabled={locked || order.join() === "8,4,2,1"} onClick={() => set([8, 4, 2, 1])}>
                Longest first
              </Control>
              <Control className="active" disabled={locked || best} onClick={() => set([1, 2, 4, 8])}>
                Shortest first
              </Control>
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
