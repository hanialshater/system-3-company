"use client";

// Exponential growth, felt backwards. The pond is full on day 30 and the algae
// doubles daily, so every day earlier halves it. The learner drags time back and
// watches the "nearly full" pond turn out to be nearly empty five days earlier.
//
// v2: the reveal is earned. Milestone "day-25": the learner has seen day 25, the day the
// question asks about. "Walk back 5 days" steps one day at a time (each step halves the algae),
// so the QA path (each control pressed once) and a hurried learner both pass through day 25.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import s from "./styles.module.css";

const FULL_DAY = 30;
const ASKED_DAY = 25;
const POND = 288; // px, the pond is POND x POND
const PAD = 16;
const GRID = 32; // 32 x 32 = 1024 cells: one cell is the pond on day 20
const CELLS = GRID * GRID;
const WALK_MS = 420;

/** Rectangle covering (1/2)^m of the pond: halve alternately across and down. */
function patch(m: number) {
  const across = Math.ceil(m / 2);
  const down = Math.floor(m / 2);
  return { w: POND / 2 ** across, h: POND / 2 ** down };
}

function percent(f: number) {
  const p = f * 100;
  if (p >= 10) return `${Number(p.toFixed(1))}%`;
  if (p >= 0.01) return `${Number(p.toPrecision(3))}%`;
  return "< 0.01%";
}

const fracOf = (m: number) => `1/${(2 ** m).toLocaleString("en-US")}`;

function Milestones({
  interact,
  names,
  children,
}: {
  interact: () => void;
  names: readonly string[];
  children: (reach: (name: string) => void) => ReactNode;
}) {
  const { reach } = useMilestones(interact, names);
  return <>{children(reach)}</>;
}

function ReachWatcher({ hit, onReach }: { hit: boolean; onReach: () => void }) {
  useEffect(() => {
    if (hit) onReach();
  }, [hit, onReach]);
  return null;
}

export default function ExponentialGrowth({ slug }: { slug: string }) {
  const [day, setDay] = useState(FULL_DAY);
  const [walking, setWalking] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const gridId = useId().replace(/:/g, "");

  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
    },
    [],
  );

  const m = FULL_DAY - day; // halvings back from full
  const f = 1 / 2 ** m;
  const { w, h } = patch(m);
  const tiny = w < 8;
  const frac = fracOf(m);
  const askedM = FULL_DAY - ASKED_DAY;
  const away = `${m} day${m === 1 ? "" : "s"} from full.`;

  const caption =
    m === 0
      ? "Day 30: the pond is full."
      : f >= 0.01
        ? `Day ${day}: ${frac} covered, ${percent(1 - f)} open water. ${away}`
        : m === 10
          ? `Day ${day}: ${frac} covered, one small grid square. ${away}`
          : tiny
            ? `Day ${day}: ${frac} covered, too small to see; the circle marks it. ${away}`
            : `Day ${day}: ${frac} covered. ${away}`;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Algae on your garden pond doubles its area every day. On day ${FULL_DAY} it covers the whole pond. How much of the pond did it cover on day ${ASKED_DAY}?`,
        options: ["About 83%", "About half", "About 3%"],
        answer: 2,
      }}
      exploreHint={`Walk the days back from ${FULL_DAY} to ${ASKED_DAY} and watch the algae.`}
      minInteractions={1}
      reveal={({ prediction }) => (
        <>
          <p>
            On day {ASKED_DAY} the algae covered <strong>{fracOf(askedM)}</strong> of the pond, about 3%. Doubling run
            backwards is halving: day 29 is half, day 28 a quarter, day {ASKED_DAY} a sliver in the corner. On day 20 it
            was one small square out of {CELLS.toLocaleString("en-US")}.
            {prediction === 0 ? " 83% is 25 of 30 days: growth in step with time. Doubling is not." : ""}
          </p>
          <p>
            Doubling hides at first and then arrives all at once. Three quarters of the pond fills in the last two days,
            so a pond that looks 97% clear is five days from full.
          </p>
          <p className="muted">Doubling 30 times multiplies by more than a billion.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["day-25"]}>
          {(reach) => {
            const go = (d: number) => {
              if (locked || walking) return;
              const next = Math.max(0, Math.min(FULL_DAY, d));
              if (next === day) return;
              setDay(next);
            };
            const walk = () => {
              if (locked || walking || day <= 0) return;
              const target = Math.max(0, day - 5);
              let d = day;
              setWalking(true);
              const tick = () => {
                d -= 1;
                setDay(d);
                if (d <= target) {
                  if (timer.current) clearInterval(timer.current);
                  timer.current = null;
                  setWalking(false);
                }
              };
              tick();
              timer.current = setInterval(tick, WALK_MS);
            };
            const step = POND / GRID;
            return (
              <div className={s.wrap}>
                <ReachWatcher hit={day === ASKED_DAY} onReach={() => reach("day-25")} />
                <span className={`tag ${s.model}`}>Puzzle pond: exact doubling every day</span>
                <svg
                  viewBox={`0 0 ${POND + PAD * 2} ${POND + PAD * 2}`}
                  className={`stage-svg ${s.fit}`}
                  role="img"
                  aria-label={`Pond on day ${day}: ${percent(f)} covered`}
                >
                  <defs>
                    <pattern id={gridId} width={step} height={step} patternUnits="userSpaceOnUse" x={PAD} y={PAD}>
                      <path d={`M ${step} 0 L 0 0 0 ${step}`} className={s.gridLine} />
                    </pattern>
                  </defs>
                  <rect x={PAD} y={PAD} width={POND} height={POND} rx={4} className={s.water} />
                  <rect x={PAD} y={PAD} width={w} height={h} className={s.algae} />
                  {/* grid on top, so the 1/1024 squares can be counted inside the algae too */}
                  <rect x={PAD} y={PAD} width={POND} height={POND} fill={`url(#${gridId})`} />
                  {tiny && <circle cx={PAD} cy={PAD} r={12} className={s.marker} />}
                  <rect x={PAD} y={PAD} width={POND} height={POND} rx={4} className={s.edge} />
                </svg>

                <p className={s.caption} aria-live="polite">
                  {locked ? `Make a prediction to start. Each small square is 1/${CELLS} of the pond.` : caption}
                </p>

                <Slider
                  label="Day"
                  value={day}
                  min={0}
                  max={FULL_DAY}
                  disabled={locked || walking}
                  onChange={go}
                  format={(v) => `day ${v}`}
                />
                <Row>
                  <Control
                    disabled={locked || walking || day <= 0}
                    onClick={() => go(day - 1)}
                    aria-label="One day earlier"
                  >
                    − 1 day
                  </Control>
                  <Control
                    disabled={locked || walking || day >= FULL_DAY}
                    onClick={() => go(day + 1)}
                    aria-label="One day later"
                  >
                    + 1 day
                  </Control>
                  <Control disabled={locked || walking || day <= 0} onClick={walk} aria-label="Walk back 5 days">
                    Walk back 5
                  </Control>
                  <Readout label="Covered" value={percent(f)} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
