"use client";

// London's sunrise, solar noon and sunset, 1 December 2026 to 15 January 2027 (./solar.ts, NOAA equations,
// a port of section `sunset` of company/domains/briefs/checks/geography-wave-j.mjs). One chart with three
// bands (sunset on top, solar noon, sunrise at the bottom), each with its own 40-minute clock scale, so
// minute-sized drifts are visible. Every date the learner visits leaves its three dots.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Row, Slider } from "@/kit/controls";
import { DAYS, clock, span } from "./solar";
import s from "./styles.module.css";

const PRESETS = [
  { k: 12, label: "13 Dec", key: "d13" },
  { k: 20, label: "21 Dec", key: "d21" },
  { k: 29, label: "30 Dec", key: "d30" },
  { k: 45, label: "15 Jan", key: "" },
];
const MILESTONES = ["d13", "d21", "d30"] as const;
const START = 0; // 1 December, not a preset

const VW = 320;
const VH = 206;
const X0 = 46;
const X1 = 312;
const xOf = (k: number) => X0 + ((X1 - X0) * k) / 45;
type Band = { name: string; field: "set" | "noon" | "rise"; top: number; h: number; lo: number; hi: number; ticks: number[] };
const BANDS: Band[] = [
  { name: "sunset", field: "set", top: 4, h: 48, lo: 946, hi: 986, ticks: [950, 980] },
  { name: "solar noon", field: "noon", top: 66, h: 48, lo: 702, hi: 742, ticks: [710, 730] },
  { name: "sunrise", field: "rise", top: 128, h: 48, lo: 456, hi: 496, ticks: [465, 485] },
];
const yOf = (b: Band, min: number) => b.top + b.h * (1 - (min - b.lo) / (b.hi - b.lo));

const Q = {
  set13: clock(DAYS[12].set),
  rise30: clock(DAYS[29].rise),
  noon13: clock(DAYS[12].noon),
  noon30: clock(DAYS[29].noon),
};

export default function DarkestEvening({ slug }: { slug: string }) {
  const [k, setK] = useState(START);
  const [visited, setVisited] = useState<number[]>([START]);
  const day = DAYS[k];
  const seen = visited.map((v) => DAYS[v]);
  const earliestSet = seen.reduce((a, b) => (b.set < a.set ? b : a));
  const latestRise = seen.reduce((a, b) => (b.rise > a.rise ? b : a));

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "In London the shortest day is about 21 December. When is London's earliest sunset?",
        options: ["About 21 December", "About 13 December", "About 30 December"],
        answer: 1,
      }}
      exploreHint="Plot 13, 21 and 30 December, then slide through the weeks and watch the three rows of dots."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            London&rsquo;s earliest sunset, {Q.set13}, comes around 13 December, a week before the shortest day. The latest
            sunrise, {Q.rise30}, comes around 30 December.
          </p>
          <p>
            The day is shortest on the 21st, but the whole day is sliding later: solar noon moves from {Q.noon13} on the 13th
            to {Q.noon30} on the 30th, mostly because of Earth&rsquo;s tilt, and partly because Earth moves fastest in early January. A
            shrinking day on a sliding noon puts the darkest evening early.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const go = (n: number) => {
              setK(n);
              setVisited((v) => (v.includes(n) ? v : [...v, n]));
              const p = PRESETS.find((q) => q.k === n);
              if (p?.key) reach(p.key);
            };
            return (
              <div className={s.wrap}>
                <svg
                  viewBox={`0 0 ${VW} ${VH}`}
                  className="stage-svg"
                  role="img"
                  aria-label={
                    locked
                      ? "Empty chart: dates from 1 December to 15 January across, clock time up, in three bands for sunset, solar noon and sunrise."
                      : `London on ${day.label}: sunrise ${clock(day.rise)}, solar noon ${clock(day.noon)}, sunset ${clock(day.set)}.`
                  }
                >
                  {BANDS.map((b) => (
                    <g key={b.name}>
                      <rect x={X0} y={b.top} width={X1 - X0} height={b.h} className={s.band} />
                      {b.ticks.map((t) => (
                        <g key={t}>
                          <line x1={X0} y1={yOf(b, t)} x2={X1} y2={yOf(b, t)} className={s.grid} />
                          <text x={X0 - 3} y={yOf(b, t) + 3.5} textAnchor="end" className={s.tick}>
                            {clock(t)}
                          </text>
                        </g>
                      ))}
                      <text x={X0 + 4} y={b.top + 11} className={s.bandName}>
                        {b.name}
                      </text>
                    </g>
                  ))}
                  {[0, 14, 31, 45].map((d) => (
                    <text key={d} x={d === 45 ? X1 : xOf(d)} y={BANDS[2].top + BANDS[2].h + 12} textAnchor={d === 45 ? "end" : "middle"} className={s.tick}>
                      {DAYS[d].label}
                    </text>
                  ))}
                  <text x={X0} y={VH - 4} className={s.tick}>
                    London, clock time (GMT), winter 2026–27
                  </text>

                  {!locked && (
                    <>
                      <line x1={xOf(k)} y1={BANDS[0].top} x2={xOf(k)} y2={BANDS[2].top + BANDS[2].h} className={s.now} />
                      {BANDS.map((b) =>
                        seen.map((d) => (
                          <circle key={`${b.name}-${d.k}`} cx={xOf(d.k)} cy={yOf(b, d[b.field])} r={d.k === k ? 3.6 : 2.6} className={d.k === k ? s.dotNow : s.dot} />
                        )),
                      )}
                      {/* The current date's times, beside its dots (the stage's readout) */}
                      {BANDS.map((b) => {
                        const isRing = visited.length > 1 && ((b.field === "set" && earliestSet.k === k) || (b.field === "rise" && latestRise.k === k));
                        if (isRing) return null;
                        const right = k < 33;
                        return (
                          <text key={`v-${b.name}`} x={xOf(k) + (right ? 7 : -7)} y={yOf(b, day[b.field]) + 3.5} textAnchor={right ? "start" : "end"} className={s.haloNow}>
                            {clock(day[b.field])}
                          </text>
                        );
                      })}
                      {visited.length > 1 && (
                        <>
                          <circle cx={xOf(earliestSet.k)} cy={yOf(BANDS[0], earliestSet.set)} r={6} className={s.ring} />
                          <text
                            x={xOf(earliestSet.k)}
                            y={yOf(BANDS[0], earliestSet.set) + 16}
                            textAnchor="middle"
                            className={s.halo}
                          >
                            earliest {clock(earliestSet.set)}
                          </text>
                          <circle cx={xOf(latestRise.k)} cy={yOf(BANDS[2], latestRise.rise)} r={6} className={s.ring} />
                          <text x={xOf(latestRise.k)} y={yOf(BANDS[2], latestRise.rise) - 9} textAnchor="middle" className={s.halo}>
                            latest {clock(latestRise.rise)}
                          </text>
                        </>
                      )}
                    </>
                  )}
                </svg>
                <div className={s.chips}>
                  {PRESETS.map((p) => (
                    <Control key={p.k} disabled={locked || k === p.k} className={k === p.k ? "active" : ""} onClick={() => go(p.k)}>
                      {p.label}
                    </Control>
                  ))}
                </div>
                <Row>
                  <Slider label="Date" value={k} min={0} max={45} disabled={locked} format={() => (locked ? day.label : `${day.label} · day ${span(day.len)}`)} onChange={go} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
