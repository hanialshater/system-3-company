"use client";

// A made-up island seen from above (40 x 24 squares of 5 km, model in ./model.ts, a port of section
// `watershed` of company/domains/briefs/checks/geography-wave-j.mjs). Locked: outline, the dot and the two
// seas only (relief would point at the answer). On unlock the relief appears; the learner drops rain at the
// dot, drops rain west of the ridge, then colours every square by the sea its water reaches, which draws
// the divide. A Seen line keeps what was found after Reset.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control } from "@/kit/controls";
import { W, H, KM, filled, LO, HI, outlet, eastCount, trace, DOT, WEST_DROP } from "./model";
import s from "./styles.module.css";

const C = 7; // px per square
const SEA = 20; // sea strip width, px
const TOP = 26; // room for the distance line
const VW = SEA * 2 + W * C;
const VH = TOP + H * C + 30;
const MILESTONES = ["dot", "west", "divide"] as const;

const cx = (x: number) => SEA + (x + 0.5) * C;
const cy = (y: number) => TOP + (y + 0.5) * C;
const eastPct = Math.round((100 * eastCount) / (W * H));
const westKm = (DOT[0] + 1) * KM; // 55
const eastKm = (W - DOT[0]) * KM; // 150

const dotRun = trace(...DOT);
const westRun = trace(...WEST_DROP);
const pathPoints = (run: ReturnType<typeof trace>) => {
  const pts = run.path.map(([x, y]) => `${cx(x)},${cy(y)}`);
  const ly = run.path[run.path.length - 1][1];
  pts.push(`${run.sea === "east" ? VW - SEA / 2 : SEA / 2},${cy(ly)}`);
  return pts.join(" ");
};

// The divide: square edges between squares that drain to different seas.
const divideSegs: string[] = [];
for (let y = 0; y < H; y++)
  for (let x = 0; x < W; x++) {
    if (x + 1 < W && outlet[y][x] !== outlet[y][x + 1]) divideSegs.push(`M${SEA + (x + 1) * C},${TOP + y * C}v${C}`);
    if (y + 1 < H && outlet[y][x] !== outlet[y + 1][x]) divideSegs.push(`M${SEA + x * C},${TOP + (y + 1) * C}h${C}`);
  }
const divideTopX = (() => {
  for (let x = 0; x + 1 < W; x++) if (outlet[0][x] !== outlet[0][x + 1]) return SEA + (x + 1) * C;
  return SEA + 8 * C;
})();

type Seen = { dot: boolean; west: boolean; divide: boolean };

export default function WhichSeaGetsTheRain({ slug }: { slug: string }) {
  const [show, setShow] = useState<Seen>({ dot: false, west: false, divide: false });
  const [seen, setSeen] = useState<Seen>({ dot: false, west: false, divide: false });
  const [wasReset, setWasReset] = useState(false);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Rain falls at the dot on this made-up island: ${westKm} km from the west sea and ${eastKm} km from the east sea. Where does the water reach the sea?`,
        options: ["The west sea", "The east sea", "Neither: it soaks in on the way"],
        answer: 1,
      }}
      exploreHint="Drop rain at the dot, then west of the ridge, then colour the land."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Your drop ran east, to the sea {eastKm} km away, though the west sea was only {westKm} km away. Water follows
            the slope, and the slope is set by the ridge, not by the nearest coast.
          </p>
          <p>
            The ridge is a divide: your drop west of it ran west, and every square on one side ends in one sea. Here the
            divide hugs the west coast, so about four fifths of the island ({eastPct}%) drains east.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const turnOn = (k: keyof Seen) => {
              setShow((v) => ({ ...v, [k]: true }));
              setSeen((v) => ({ ...v, [k]: true }));
              reach(k);
            };
            const any = show.dot || show.west || show.divide;
            const shade = (v: number) => 0.12 + (0.62 * (v - LO)) / (HI - LO);
            return (
              <div className={s.wrap}>
                <svg
                  viewBox={`0 0 ${VW} ${VH}`}
                  className="stage-svg"
                  role="img"
                  aria-label={
                    locked
                      ? `A made-up island between a west sea and an east sea, with a dot ${westKm} km from the west sea.`
                      : `The island with its relief shaded${show.divide ? `; land coloured by the sea it drains to, ${eastPct}% east` : ""}.`
                  }
                >
                  <rect x={0} y={0} width={SEA} height={VH - 22} className={s.seaWest} />
                  <rect x={VW - SEA} y={0} width={SEA} height={VH - 22} className={s.seaEast} />
                  <text transform={`translate(${SEA / 2 + 3.5},${TOP + (H * C) / 2}) rotate(-90)`} textAnchor="middle" className={s.label}>
                    West sea
                  </text>
                  <text transform={`translate(${VW - SEA / 2 + 3.5},${TOP + (H * C) / 2}) rotate(-90)`} textAnchor="middle" className={s.label}>
                    East sea
                  </text>

                  {/* Land */}
                  {locked ? (
                    <rect x={SEA} y={TOP} width={W * C} height={H * C} className={s.landFlat} />
                  ) : (
                    <g>
                      {filled.map((row, y) =>
                        row.map((v, x) => (
                          <rect
                            key={`${x}-${y}`}
                            x={SEA + x * C}
                            y={TOP + y * C}
                            width={C + 0.3}
                            height={C + 0.3}
                            className={show.divide ? (outlet[y][x] === "east" ? s.toEast : s.toWest) : s.relief}
                            fillOpacity={show.divide ? undefined : shade(v)}
                          />
                        )),
                      )}
                    </g>
                  )}
                  <rect x={SEA} y={TOP} width={W * C} height={H * C} className={s.outline} />

                  {show.divide && (
                    <>
                      <path d={divideSegs.join("")} className={s.divide} />
                      <text x={divideTopX + 4} y={TOP + 10} className={s.halo}>
                        divide
                      </text>
                      <text x={SEA + 24 * C} y={TOP + 17 * C} textAnchor="middle" className={s.pct}>
                        {eastPct}%
                      </text>
                      <text x={SEA + 3.5 * C} y={TOP + 17 * C} textAnchor="middle" className={s.pct}>
                        {100 - eastPct}%
                      </text>
                    </>
                  )}

                  {/* Faint traces of what was found, kept after Reset */}
                  {!locked && seen.divide && !show.divide && <path d={divideSegs.join("")} className={s.divideTrace} />}
                  {!locked && seen.west && !show.west && <polyline points={pathPoints(westRun)} className={s.trace} />}
                  {!locked && seen.dot && !show.dot && <polyline points={pathPoints(dotRun)} className={s.trace} />}

                  {show.west && (
                    <>
                      <polyline points={pathPoints(westRun)} className={s.pathWest} />
                      <circle cx={cx(WEST_DROP[0])} cy={cy(WEST_DROP[1])} r={3} className={s.start2} />
                    </>
                  )}
                  {show.dot && <polyline points={pathPoints(dotRun)} className={s.path} />}

                  {/* Distances from the dot to each sea (stated in the question). */}
                  <line x1={SEA} y1={TOP - 6} x2={VW - SEA} y2={TOP - 6} className={s.dim} />
                  <line x1={cx(DOT[0])} y1={TOP - 10} x2={cx(DOT[0])} y2={TOP - 2} className={s.dim} />
                  <text x={(SEA + cx(DOT[0])) / 2} y={TOP - 10} textAnchor="middle" className={s.label}>
                    {westKm} km
                  </text>
                  <text x={(cx(DOT[0]) + VW - SEA) / 2} y={TOP - 10} textAnchor="middle" className={s.label}>
                    {eastKm} km
                  </text>
                  <circle cx={cx(DOT[0])} cy={cy(DOT[1])} r={4} className={s.dot} />

                  <text x={SEA} y={VH - 14} className={s.caption}>
                    Made-up island; 1 square = {KM} km{locked ? "" : show.divide ? "; coloured by sea reached" : "; darker = higher"}
                  </text>
                </svg>
                <div className={s.chips}>
                  <Control disabled={locked || show.dot} className={show.dot ? "active" : ""} onClick={() => turnOn("dot")}>
                    Rain at the dot
                  </Control>
                  <Control disabled={locked || show.west} className={show.west ? "active" : ""} onClick={() => turnOn("west")}>
                    {locked ? "Rain at a second spot" : "Rain west of the ridge"}
                  </Control>
                  <Control disabled={locked || show.divide} className={show.divide ? "active" : ""} onClick={() => turnOn("divide")}>
                    Colour land by its sea
                  </Control>
                  <Control
                    disabled={locked || !any}
                    onClick={() => {
                      setShow({ dot: false, west: false, divide: false });
                      setWasReset(true);
                      interact();
                    }}
                  >
                    Reset
                  </Control>
                </div>
                {wasReset && (seen.dot || seen.west || seen.divide) && (
                  <p className="tiny" data-testid="seen">
                    Seen:{" "}
                    {[seen.dot && `dot → ${dotRun.sea}`, seen.west && `west drop → ${westRun.sea}`, seen.divide && `${eastPct}% east`]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                )}
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
