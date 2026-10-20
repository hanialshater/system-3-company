"use client";

// Up hill, down hill. 60 km up at 30 km/h, 60 km back down at a speed the slider sets
// (30 to 120 in steps of 15). One chart: speed (up) against time (across). Each leg is a block
// whose width is its hours and whose height is its speed, so its area is its 60 km. The dashed
// line is the round-trip average: 120 km / total hours, the height of one block with the same
// area over the same time. Every number comes from DIST, UP and the slider.
// Key state: downhill at 60 km/h, blocks of 2 h and 1 h, average 40.

import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const DIST = 60; // km each way
const UP = 30; // km/h
const DOWN = 60; // the question's downhill speed
const MIN_V = 30;
const MAX_V = 120;
const STEP = 15;
const MILESTONES = ["down-at-60"] as const;

const hours = (v: number) => DIST / v;
const avg = (v: number) => (2 * DIST) / (hours(UP) + hours(v));
const ANSWER = avg(DOWN); // 40
const NAIVE = (UP + DOWN) / 2; // 45

const W = 320;
const H = 200;
const L = 34; // left axis
const B = 172; // baseline y
const PXH = (W - L - 12) / hours(MIN_V) / 2; // px per hour (4 h max)
const PXV = (B - 28) / MAX_V; // px per km/h

function fmtH(h: number) {
  const whole = Math.floor(h + 1e-9);
  const min = Math.round((h - whole) * 60);
  if (whole === 0) return `${min} min`;
  return min === 0 ? `${whole} h` : `${whole} h ${min} min`;
}
const fmtV = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(1));

export default function UpHillDownHill({ slug }: { slug: string }) {
  const [v, setV] = useState(MIN_V);
  const [reached, setReached] = useState(false);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `On a trip to a hilltop, you crawl ${DIST} km uphill at ${UP} km/h, then drive ${DIST} km back down at ${DOWN} km/h. What was your average speed for the round trip?`,
        options: [`${NAIVE} km/h`, `${ANSWER} km/h`, "50 km/h"],
        answer: 1,
      }}
      exploreHint={`Set the downhill speed to ${DOWN} km/h and compare the hours each way.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            <strong>{ANSWER} km/h.</strong> {reached ? `At ${DOWN} km/h down you saw` : "With the downhill at 60 km/h there are"}{" "}
            {fmtH(hours(UP))} climbing and {fmtH(hours(DOWN))} coming down: {2 * DIST} km in {fmtH(hours(UP) + hours(DOWN))}.
          </p>
          <p>
            {NAIVE} would be right only if you spent equal time at each speed. You spend twice as long at {UP}, so the slow speed
            counts twice: ({UP} + {UP} + {DOWN}) ÷ 3 = {ANSWER}. Averages of speed weigh each speed by the time spent at it, and slow
            legs take longer.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              v={v}
              onV={(nv) => {
                setV(nv);
                if (nv === DOWN) {
                  setReached(true);
                  reach("down-at-60");
                }
              }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}

function Stage({ locked, v, onV }: { locked: boolean; v: number; onV: (v: number) => void }) {
  const tUp = hours(UP);
  const tDown = hours(v);
  const a = avg(v);
  const xUp = L;
  const wUp = tUp * PXH;
  const xDown = L + wUp;
  const wDown = tDown * PXH;
  const yAvg = B - a * PXV;
  const ticks = [0, 1, 2, 3, 4];

  const caption = locked ? "Make a prediction to start." : `Average speed = ${2 * DIST} km ÷ total hours. Each block's area is ${DIST} km.`;

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
        {[30, 60, 90, 120].map((sp) => (
          <g key={sp}>
            <line x1={L} y1={B - sp * PXV} x2={W - 8} y2={B - sp * PXV} className={s.grid} />
            <text x={L - 5} y={B - sp * PXV + 4} className={s.axisY}>
              {sp}
            </text>
          </g>
        ))}
        {ticks.map((h) => (
          <text key={h} x={L + h * PXH} y={B + 14} className={s.axisX}>
            {h} h
          </text>
        ))}
        <rect x={xUp} y={B - UP * PXV} width={wUp} height={UP * PXV} className={s.up} />
        <text x={xUp + wUp / 2} y={B - (UP * PXV) / 2 - 3} className={s.lbl}>
          up
        </text>
        <text x={xUp + wUp / 2} y={B - (UP * PXV) / 2 + 10} className={s.lbl}>
          {fmtH(tUp)}
        </text>
        {!locked && (
          <>
            <rect x={xDown} y={B - v * PXV} width={wDown} height={v * PXV} className={s.down} />
            <text x={xDown + wDown / 2} y={B - (v * PXV) / 2 - 3} className={s.lbl}>
              down
            </text>
            <text x={xDown + wDown / 2} y={B - (v * PXV) / 2 + 10} className={s.lbl}>
              {fmtH(tDown)}
            </text>
            <line x1={L} y1={yAvg} x2={xDown + wDown} y2={yAvg} className={s.avg} />
            <text x={L + 4} y={yAvg - 4} className={s.avgLbl} textAnchor="start">
              average
            </text>
          </>
        )}
        <line x1={L} y1={B} x2={W - 8} y2={B} className={s.axis} />
        <line x1={L} y1={B} x2={L} y2={8} className={s.axis} />
        <text x={L + 5} y={12} className={s.unit} textAnchor="start">
          km/h
        </text>
      </svg>

      <p className={s.caption} aria-live="polite">
        {caption}
      </p>

      <Slider label="Downhill speed" value={v} min={MIN_V} max={MAX_V} step={STEP} disabled={locked} format={(x) => `${x} km/h`} onChange={onV} />
      <Row>
        <Readout label="Total time" value={locked ? "?" : fmtH(tUp + tDown)} />
        <Readout label="Average speed" value={locked ? "?" : `${fmtV(a)} km/h`} />
      </Row>
    </div>
  );
}
