"use client";

// History: van Langren's 1644 graph, re-drawn. Twelve determinations of the longitude difference
// Toledo-Rome (history-data.mjs: langren, Langren1644.csv, columns Name, Year, Longitude), on one axis
// of degrees east of Toledo. Brief: company/domains/briefs/history.md #6. Numbers: section 6 of
// company/domains/briefs/checks/history-cycle1-check.mjs.
//
// The twelve rows below are copied from the pinned CSV (no rounding), with its Source column ("Likely source for this
// determination": Map or Astron; v2, for the limit sentence: MAPS = 2 in the pinned file). Every other number on the stage and
// in the reveal is computed from them here, with the check script's formulas: true distance from the doc's
// coordinates (Rome 12.5 E, Toledo 4.03 W), median of the twelve, km per degree = 111.32 x cos(mean latitude).
// Locked stage: the axis only (the ticks would let a learner count the answer before committing).
// Presets set the full view; milestones: `truth` (the true line and the 2-degree band) and `median`.
// No Reset (QA presses every control; the last view, "Sort by year", still shows both lines the reveal quotes).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const DATA = [
  { name: "G. Jansonius", year: 1605, lon: 17.736, source: "Map" },
  { name: "G. Mercator", year: 1567, lon: 19.872, source: "Map" },
  { name: "I. Schonerus", year: 1536, lon: 20.638, source: "Astron" },
  { name: "P. Lantsbergius", year: 1530, lon: 21.106, source: "Astron" },
  { name: "T. Brahe", year: 1578, lon: 21.447, source: "Astron" },
  { name: "I. Regiomontanus", year: 1463, lon: 25.617, source: "Astron" },
  { name: "Orontius", year: 1542, lon: 26, source: "Astron" },
  { name: "C. Clavius", year: 1567, lon: 26.34, source: "Astron" },
  { name: "C. Ptolomeus", year: 150, lon: 27.787, source: "Astron" },
  { name: "A. Argelius", year: 1610, lon: 28.17, source: "Astron" },
  { name: "A. Maginus", year: 1582, lon: 29.787, source: "Astron" },
  { name: "D. Origanus", year: 1601, lon: 30.128, source: "Astron" },
];
const ROME = { lat: 41.89, lon: 12.5 };
const TOLEDO = { lat: 39.86, lon: -4.03 };
const TRUE = ROME.lon - TOLEDO.lon;
const SORTED = DATA.map((d) => d.lon).sort((a, b) => a - b);
const MEDIAN = (SORTED[5] + SORTED[6]) / 2;
const LO = SORTED[0];
const HI = SORTED[SORTED.length - 1];
const KM_PER_DEG = 111.32 * Math.cos(((TOLEDO.lat + ROME.lat) / 2) * (Math.PI / 180));
const MEDIAN_KM = Math.round(((MEDIAN - TRUE) * KM_PER_DEG) / 10) * 10;
const WITHIN = DATA.filter((d) => Math.abs(d.lon - TRUE) <= 2);
const MAPS = DATA.filter((d) => d.source === "Map").length;
const CLOSEST = DATA.reduce((b, d) => (Math.abs(d.lon - TRUE) < Math.abs(b.lon - TRUE) ? d : b));
const BY_YEAR = [...DATA].sort((a, b) => a.year - b.year);
const EAST = DATA.filter((d) => d.lon > TRUE).length;
const SCALE_KM = 500;
const f1 = (x: number) => x.toFixed(1);

const MILESTONES = ["truth", "median"] as const;
type View = "none" | "truth" | "closest" | "median" | "year";

const W = 340;
const X0 = 30;
const X1 = 330;
const MAXDEG = 32;
const x = (deg: number) => X0 + (deg / MAXDEG) * (X1 - X0);
const ROW = 12;

function Stage({ locked, reach }: { locked: boolean; reach: (n: string) => void }) {
  const [view, setView] = useState<View>("none");
  const year = view === "year";
  const axisY = year ? 40 + ROW * 12 : 70;
  const H = axisY + 38;
  const showTruth = view !== "none";
  const showMedian = view === "median" || year;
  const showBand = view === "truth" || view === "closest" || year;

  const go = (v: View) => {
    setView(v);
    if (v === "truth" || v === "closest" || v === "year") reach("truth");
    if (v === "median" || v === "year") reach("median");
  };

  const top = 24;
  const readout = locked
    ? "?"
    : view === "none"
      ? `${DATA.length} estimates, ${f1(LO)}° to ${f1(HI)}°`
      : view === "truth"
        ? `${WITHIN.length} of ${DATA.length} within 2°`
        : view === "closest"
          ? `${CLOSEST.name}, ${CLOSEST.year}: ${f1(CLOSEST.lon)}°`
          : view === "median"
            ? `${f1(MEDIAN - TRUE)}° too far ≈ ${MEDIAN_KM} km`
            : `${MEDIAN_KM} km too far; earliest (${BY_YEAR[0].year}) ${f1(BY_YEAR[0].lon)}°, latest (${BY_YEAR[BY_YEAR.length - 1].year}) ${f1(BY_YEAR[BY_YEAR.length - 1].lon)}°`;

  const label = locked
    ? "An axis of degrees of longitude east of Toledo, from 0 to 30. The estimates are hidden until you predict."
    : `${DATA.length} estimates of Rome's longitude east of Toledo, from ${f1(LO)} to ${f1(HI)} degrees.` +
      (showTruth ? ` The true value, ${f1(TRUE)} degrees, is marked.` : "") +
      (showMedian ? ` The middle estimate, ${f1(MEDIAN)}, is marked.` : "") +
      (year ? " One row per estimate, earliest at the top." : "");

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="stage-svg" role="img" aria-label={label}>
        {/* the 2-degree band around the truth */}
        {showBand && (
          <rect x={x(TRUE - 2)} y={top + 4} width={x(TRUE + 2) - x(TRUE - 2)} height={axisY - top - 4} className={s.band} />
        )}
        {/* axis */}
        <line x1={X0} y1={axisY} x2={X1} y2={axisY} className={s.axis} />
        {[0, 5, 10, 15, 20, 25, 30].map((d) => (
          <g key={d}>
            <line x1={x(d)} y1={axisY} x2={x(d)} y2={axisY + 4} className={s.axis} />
            <text x={x(d)} y={axisY + 16} className={s.tick} textAnchor="middle">
              {d === 0 ? "Toledo" : d}
            </text>
          </g>
        ))}
        <text x={X1} y={axisY + 31} className={s.tick} textAnchor="end">
          degrees east of Toledo
        </text>
        {/* km scale bar */}
        <line x1={x(0)} y1={axisY + 27} x2={x(SCALE_KM / KM_PER_DEG)} y2={axisY + 27} className={s.scale} />
        <text x={x(SCALE_KM / KM_PER_DEG) + 4} y={axisY + 31} className={s.tick}>
          {SCALE_KM} km
        </text>

        {locked && (
          <text x={(X0 + X1) / 2} y={axisY - 24} className={s.tick} textAnchor="middle">
            The twelve estimates appear after you predict.
          </text>
        )}
        {!locked && (
          <>
            {/* true line */}
            {showTruth && (
              <g>
                <line x1={x(TRUE)} y1={top} x2={x(TRUE)} y2={axisY} className={s.truth} />
                <text x={x(TRUE) + 3} y={top - 6} className={s.lab} textAnchor="end">
                  Rome, true: {f1(TRUE)}°
                </text>
              </g>
            )}
            {showMedian && (
              <g>
                <line x1={x(MEDIAN)} y1={top} x2={x(MEDIAN)} y2={axisY} className={s.median} />
                <text x={x(MEDIAN)} y={top - 6} className={s.lab} textAnchor="middle">
                  middle: {f1(MEDIAN)}°
                </text>
              </g>
            )}
            {/* the estimates */}
            {year
              ? BY_YEAR.map((d, i) => {
                  const y = 40 + i * ROW;
                  const edge = d.lon === LO || d.lon === HI;
                  return (
                    <g key={d.name}>
                      <text x={X0 - 4} y={y + 4} className={s.year} textAnchor="end">
                        {d.year}
                      </text>
                      <line x1={X0} y1={y} x2={x(d.lon)} y2={y} className={s.guide} />
                      <circle cx={x(d.lon)} cy={y} r={4} className={Math.abs(d.lon - TRUE) <= 2 ? s.hit : s.dot} />
                      {edge && (
                        <text x={x(d.lon) + 7} y={y + 4} className={s.val}>
                          {f1(d.lon)}
                        </text>
                      )}
                    </g>
                  );
                })
              : DATA.map((d) => {
                  const hl = view === "closest" && d === CLOSEST;
                  return (
                    <line
                      key={d.name}
                      x1={x(d.lon)}
                      y1={axisY - (hl ? 22 : 14)}
                      x2={x(d.lon)}
                      y2={axisY}
                      className={hl ? s.tickHit : s.est}
                    />
                  );
                })}
            {!year && view !== "closest" && (
              <>
                <text x={x(LO)} y={axisY - 18} className={s.val} textAnchor="middle">
                  {f1(LO)}
                </text>
                <text x={x(HI)} y={axisY - 18} className={s.val} textAnchor="middle">
                  {f1(HI)}
                </text>
              </>
            )}
            {view === "closest" && (
              <text x={x(CLOSEST.lon) + 4} y={axisY - 26} className={s.lab} textAnchor="start">
                {CLOSEST.name}, {CLOSEST.year}
              </text>
            )}
          </>
        )}
      </svg>
      <Row foldAtReveal>
        <Control disabled={locked} className={view === "truth" ? "active" : ""} onClick={() => go("truth")}>
          Show the true distance
        </Control>
        <Control disabled={locked} className={view === "closest" ? "active" : ""} onClick={() => go("closest")}>
          Closest estimate
        </Control>
        <Control disabled={locked} className={view === "median" ? "active" : ""} onClick={() => go("median")}>
          Middle estimate in km
        </Control>
        <Control disabled={locked} className={view === "year" ? "active" : ""} onClick={() => go("year")}>
          Sort by year
        </Control>
      </Row>
      <Readout label={locked ? "Estimates" : "Reading"} value={readout} />
    </div>
  );
}

export default function RomePlacedTooFarEast({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Toledo to Rome is ${f1(TRUE)} degrees of longitude. Twelve astronomers and mapmakers before 1644 estimated it. How many came within 2 degrees?`,
        options: ["1 of 12", "6 of 12", "10 of 12"],
        answer: 0,
      }}
      exploreHint="Show the true distance, then find the middle estimate."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Only {WITHIN.length} of {DATA.length} came within 2 degrees, and {EAST === DATA.length ? "every one" : `${EAST}`} put
            Rome too far east: the estimates ran from {f1(LO)} to {f1(HI)} degrees. The middle one was {f1(MEDIAN)}, about{" "}
            {MEDIAN_KM} km too far.
          </p>
          <p>
            Latitude can be read from the Sun or a star, but longitude needs the difference in local time between two places,
            which nobody could then measure well.
          </p>
          <p>
            Where it stops: {MAPS} of the {DATA.length} were probably read from maps, not measured.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => <Stage locked={locked} reach={reach} />}
        </Milestones>
      )}
    </Lesson>
  );
}
