"use client";

// Gas-station circuit. Five stops round a loop; each number is fuel gained there minus fuel used
// on the next leg. Pick a start: the chart shows the tank after each leg, in driving order.
// The car stalls at the first negative tank (later legs faded). From A the tank is lowest right
// after B; starting at C, the next stop, the tank never goes below zero.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const STOPS = ["A", "B", "C", "D", "E"];
const NET = [1, -3, 4, -2, 1];
const N = STOPS.length;

function drive(start: number) {
  let f = 0;
  let stall = -1;
  const tank = Array.from({ length: N }, (_, k) => {
    f += NET[(start + k) % N];
    if (f < 0 && stall < 0) stall = k;
    return f;
  });
  return { tank, stall };
}
const FROM_A = drive(0).tank;
const DIP = FROM_A.indexOf(Math.min(...FROM_A)); // leg after which A's running total is lowest
const AFTER_DIP = (DIP + 1) % N;

const X0 = 40;
const GW = 54;
const ZERO = 84;
const UNIT = 11;
const fmt = (v: number) => (v > 0 ? `+${v}` : `${v}`);

export default function StartAfterTheDeficit({ slug }: { slug: string }) {
  const [start, setStart] = useState<number | null>(null);
  const [tried, setTried] = useState<number[]>([]);
  const run = start === null ? null : drive(start);
  const made = run !== null && run.stall < 0;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Your delivery van circles a loop with five fuel stops. Fuel gained at each, minus fuel used on the next leg: A +1, B −3, C +4, D −2, E +1. Starting with an empty tank, where can you begin and get all the way round?",
        options: ["A", "C", "E"],
        answer: 1,
      }}
      exploreHint="Start at A and find the lowest point. Then start just after it."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            From A the tank went 1, −2, 2, 0, 1: lowest right after B. Starting at C, the next stop, it went 4, 2, 3, 4, 1
            and never dropped below zero. {tried.length > 2 ? `You tried ${tried.length} starts; ` : ""}C is the only start
            that works.
          </p>
          <p>
            The whole loop adds up to +1, so some start must work. Begin just after the deepest dip and every later total
            is measured from the bottom, so it cannot go below zero. One pass from A finds it; no need to try all five.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["ran-from-a", "made-it-round"]}>
          {(reach) => {
        const go = (i: number) => {
          if (locked) return;
          setStart(i);
          setTried((t) => (t.includes(i) ? t : [...t, i]));
          if (i === 0) reach("ran-from-a");
          if (drive(i).stall < 0 && tried.includes(0)) reach("made-it-round");
        };

        const msg = locked
          ? "Make a prediction to start."
          : run === null
            ? "Tap a stop to start there with an empty tank."
            : made
              ? `From ${STOPS[start!]}: all the way round, never below zero.`
              : `From ${STOPS[start!]}: stalled after leg ${run.stall + 1}, tank ${run.tank[run.stall]}.`;

        return (
          <div className={s.wrap}>
            <p className={`${s.msg} ${made ? s.good : run ? s.bad : ""}`} aria-live="polite">
              {msg}
            </p>
            <svg viewBox="0 0 320 160" className="stage-svg" role="img" aria-label={run ? `Tank after each leg: ${run.tank.join(", ")}` : "No start chosen"}>
              <line x1={X0 - 6} x2={316} y1={ZERO} y2={ZERO} stroke="var(--fg)" strokeWidth={1} />
              <text x={X0 - 10} y={ZERO + 4} textAnchor="end" className={s.axis}>
                0
              </text>
              <text x={X0 - 10} y={14} textAnchor="end" className={s.axis}>
                tank
              </text>
              {run &&
                run.tank.map((v, k) => {
                  const after = run.stall >= 0 && k > run.stall;
                  const x = X0 + k * GW + 8;
                  const h = Math.abs(v) * UNIT;
                  const stop = (start! + k) % N;
                  return (
                    <g key={k} opacity={after ? 0.25 : 1}>
                      <rect
                        x={x}
                        y={v >= 0 ? ZERO - h : ZERO}
                        width={GW - 16}
                        height={Math.max(h, 1.5)}
                        rx={3}
                        fill={v < 0 ? "var(--bad)" : "var(--good)"}
                        strokeDasharray={after ? "3 2" : undefined}
                      />
                      <text x={x + (GW - 16) / 2} y={v >= 0 ? ZERO - h - 4 : ZERO + h + 12} textAnchor="middle" className={s.val}>
                        {v}
                      </text>
                      <text x={x + (GW - 16) / 2} y={142} textAnchor="middle" className={s.leg}>
                        {STOPS[stop]} {fmt(NET[stop])}
                      </text>
                    </g>
                  );
                })}
              <text x={X0} y={156} className={s.axis}>
                tank after each stop and leg, in driving order
              </text>
            </svg>
            <Row>
              {STOPS.map((name, i) => (
                <Control key={name} className={start === i ? "active" : ""} disabled={locked || start === i} aria-label={`Start at ${name}`} onClick={() => go(i)}>
                  {name} {fmt(NET[i])}
                </Control>
              ))}
            </Row>
            <Row>
              <Control className="active" disabled={locked || !tried.includes(0) || start === AFTER_DIP} onClick={() => go(AFTER_DIP)}>
                Start just after A&apos;s lowest point
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
