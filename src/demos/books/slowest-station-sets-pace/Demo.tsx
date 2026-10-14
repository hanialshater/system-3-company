"use client";

// The slowest station sets the pace (The Goal, Goldratt & Cox 1984; brief company/domains/briefs/books.md #1).
// Model: a serial line of four stations with rates 12, 9, 5 and 10 parts an hour. Station 1 has unlimited raw
// material. Flow into station i is the slowest rate upstream of it; the line's output is min(rates).
// The pile in front of station i after one hour is max(0, inflow - rate). Deterministic, no randomness.
// Controls (DOM order): four station taps (+2 parts/h each, 3 upgrades to spend), then presets
// [All 3 on S3] and [Double S1] (the question's own case, pressed last of the presets), then Reset.
// Milestones: "same" (a non-bottleneck upgrade leaves output unchanged), "rose" (upgrading the bottleneck
// raises output), "moved" (the bottleneck moves off station 3), "asked" (station 1 doubled to 24: output 5).
// Values the reveal quotes are recorded when their milestone fires, so Reset does not erase them.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const BASE = [12, 9, 5, 10];
const STEP = 2;
const BUDGET = 3;
const MILESTONES = ["same", "rose", "moved", "asked"] as const;

const output = (r: number[]) => Math.min(...r);
const piles = (r: number[]) => r.map((x, i) => (i === 0 ? 0 : Math.max(0, Math.min(...r.slice(0, i)) - x)));
/** Index of the unique slowest station, or -1 on a tie. */
function bottleneck(r: number[]) {
  const m = output(r);
  const idx = r.map((x, i) => (x === m ? i : -1)).filter((i) => i >= 0);
  return idx.length === 1 ? idx[0] : -1;
}

// Geometry (viewBox 340 × 150): boxes 48 wide, gaps of 28 for the piles.
const BW = 48;
const BX = (i: number) => 36 + i * 76;
const BY = 46;
const BH = 38;
const SQ = 6;
const PILE_CAP = 20;

type Rec = { asked?: number; movedTo?: number; movedOut?: number };

export default function SlowestStationSetsPace({ slug }: { slug: string }) {
  const [rates, setRates] = useState<number[]>(BASE);
  const [left, setLeft] = useState(BUDGET);
  const [rec, setRec] = useState<Rec>({});

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A four-station line can do 12, 9, 5 and 10 parts an hour. You double the fastest station to 24. How many finished parts an hour now?",
        options: ["5", "7", "10", "12"],
        answer: 0,
      }}
      exploreHint="Tap stations to speed them up, then try the two presets."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Doubling station 1 to 24 left output at <strong>{rec.asked ?? 5}</strong> an hour: the extra parts just piled up in front
            of slower stations. A line runs at the pace of its slowest step.
          </p>
          <p>
            <em>The Goal</em> builds its story on this: find the constraint, improve it, then look for the next one. You saw that:
            once station 3 sped up, the bottleneck moved to station {(rec.movedTo ?? 1) + 1}.
          </p>
          <p>
            Does it hold up? On a steady line, yes: it is standard operations maths. For whole firms, the evidence is mostly case
            reports.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const apply = (next: number[], nextLeft: number) => {
              setRates(next);
              setLeft(nextLeft);
              const b = bottleneck(next);
              if (b >= 0 && b !== 2) {
                setRec((x) => (x.movedTo === undefined ? { ...x, movedTo: b, movedOut: output(next) } : x));
                reach("moved");
              }
              if (next.join() === "24,9,5,10") {
                setRec((x) => (x.asked === undefined ? { ...x, asked: output(next) } : x));
                reach("asked");
              }
            };
            const tap = (i: number) => {
              const before = output(rates);
              const wasSlowest = rates[i] === before;
              const next = rates.map((x, j) => (j === i ? x + STEP : x));
              const after = output(next);
              if (!wasSlowest && after === before) reach("same");
              if (after > before) reach("rose");
              apply(next, left - 1);
            };
            const p = piles(rates);
            const out = output(rates);
            const is = (r: number[]) => rates.join() === r.join();
            const allOn3 = [12, 9, 11, 10];
            const doubled = [24, 9, 5, 10];
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Our model line · piles after 1 hour</p>
                <Row>
                  <Readout label="Finished an hour" value={locked ? "?" : out} />
                  <Readout label="Upgrades left" value={left} />
                </Row>
                <svg
                  viewBox="0 0 340 104"
                  className="stage-svg"
                  role="img"
                  aria-label={
                    locked
                      ? "Four stations in a row: 12, 9, 5 and 10 parts an hour"
                      : `Stations at ${rates.join(", ")} parts an hour; ${out} finished an hour`
                  }
                >
                  <line x1={4} y1={BY + BH / 2} x2={336} y2={BY + BH / 2} className={s.belt} />
                  <text x={4} y={BY - 8} className={s.axis}>
                    raw
                  </text>
                  {rates.map((r, i) => {
                    const slow = !locked && r === out;
                    const n = locked ? 0 : p[i];
                    const shown = Math.min(n, PILE_CAP);
                    const px = BX(i) - 26;
                    return (
                      <g key={i}>
                        {Array.from({ length: shown }, (_, k) => (
                          <rect
                            key={k}
                            x={px - 1 + (k % 4) * (SQ + 1)}
                            y={BY + BH - SQ - Math.floor(k / 4) * (SQ + 1)}
                            width={SQ}
                            height={SQ}
                            className={s.part}
                          />
                        ))}
                        {n > 0 && (
                          <text x={px + 11} y={BY + BH - Math.ceil(shown / 4) * (SQ + 1) - 4} textAnchor="middle" className={s.pileN}>
                            {n}
                          </text>
                        )}
                        <rect x={BX(i)} y={BY} width={BW} height={BH} rx={6} className={slow ? s.slow : s.box} />
                        <text x={BX(i) + BW / 2} y={BY - 8} textAnchor="middle" className={s.axis}>
                          S{i + 1}
                        </text>
                        <text x={BX(i) + BW / 2} y={BY + BH / 2 + 5} textAnchor="middle" className={s.value}>
                          {r}/h
                        </text>
                      </g>
                    );
                  })}
                  {!locked &&
                    rates.map((r, i) =>
                      r === out ? (
                        <text key={`slow${i}`} x={BX(i) + BW / 2} y={BY + BH + 16} textAnchor="middle" className={s.bad}>
                          slowest
                        </text>
                      ) : null,
                    )}
                </svg>
                <p className={s.rec} aria-live="polite">
                  {!locked && rec.asked !== undefined && <span className={s.recLine}>S1 at 24: {rec.asked}/h</span>}
                  {!locked && rec.movedTo !== undefined && (
                    <span className={s.recLine}>
                      S3 faster: {rec.movedOut}/h, slowest now S{rec.movedTo + 1}
                    </span>
                  )}
                </p>
                <Row>
                  {rates.map((_, i) => (
                    <Control
                      key={i}
                      aria-label={`Station ${i + 1}: +2 parts an hour`}
                      disabled={locked || left <= 0}
                      onClick={() => tap(i)}
                    >
                      S{i + 1} +2
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Control className={is(allOn3) ? "active" : ""} disabled={locked || is(allOn3)} onClick={() => apply(allOn3, 0)}>
                    All 3 on S3
                  </Control>
                  <Control
                    className={is(doubled) ? "active" : ""}
                    disabled={locked || is(doubled)}
                    onClick={() => apply(doubled, BUDGET)}
                  >
                    Double S1
                  </Control>
                  <Control disabled={locked || (is(BASE) && left === BUDGET)} onClick={() => apply(BASE, BUDGET)}>
                    Reset
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
