"use client";

// Ekman transport, seen from above. Steady Ekman balance (Ekman 1905): the net transport of the
// wind-driven layer is M = (tau_y / (rho f), -tau_x / (rho f)) with f = 2 Omega sin(latitude), i.e. 90 degrees
// to the right of the wind north of the equator (f > 0) and to the left south of it (f < 0). Deep ocean with
// constant eddy viscosity: the surface current is 45 degrees off the wind, and with depth z the current turns
// a further z/D radians and shrinks as exp(-z/D) (the Ekman spiral). Checked in section `ekman` of
// company/domains/briefs/checks/geography-wave-j.mjs. The "Ocean view" is one idealised northern basin:
// trades toward the west at 15 N, westerlies toward the east at 45 N, net flows meeting near 30 N.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control } from "@/kit/controls";
import s from "./styles.module.css";

type Wind = "N" | "W" | "E";
const BEARING: Record<Wind, number> = { N: 0, E: 90, W: 270 };
const WORD: Record<Wind, string> = { N: "north", E: "east", W: "west" };
const MILESTONES = ["q", "trades", "westerlies", "south", "gyre"] as const;

const VW = 320;
const VH = 250;
const SQ = { x: 44, y: 18, w: 232, h: 216 };
const CX = SQ.x + SQ.w / 2;
const CY = SQ.y + SQ.h / 2;

const rad = (d: number) => (d * Math.PI) / 180;
const vec = (bearing: number, len: number) => [Math.sin(rad(bearing)) * len, -Math.cos(rad(bearing)) * len] as const;
const compass = (bearing: number) => ["north", "east", "south", "west"][Math.round((((bearing % 360) + 360) % 360) / 90) % 4];

function Arrow({ x, y, bearing, len, className, head = 7 }: { x: number; y: number; bearing: number; len: number; className: string; head?: number }) {
  const [dx, dy] = vec(bearing, len);
  const x2 = x + dx, y2 = y + dy;
  const [ux, uy] = vec(bearing, 1);
  const hx = x2 - ux * head, hy = y2 - uy * head;
  const px = -uy * head * 0.55, py = ux * head * 0.55;
  return (
    <g className={className}>
      <line x1={x} y1={y} x2={hx} y2={hy} />
      <polygon points={`${x2},${y2} ${hx + px},${hy + py} ${hx - px},${hy - py}`} />
    </g>
  );
}

// Ekman spiral layers: z/D = 0, 0.6, 1.2, 1.8, 2.4 (turn z/D radians further, shrink by exp(-z/D)).
const LAYERS = [0, 0.6, 1.2, 1.8, 2.4];

export default function WhichWayTheWaterGoes({ slug }: { slug: string }) {
  const [wind, setWind] = useState<Wind>("N");
  const [started, setStarted] = useState(false);
  const [south, setSouth] = useState(false);
  const [ocean, setOcean] = useState(false);
  // Net-flow directions the learner saw, recorded when each milestone fires.
  const [seen, setSeen] = useState<Record<string, string>>({});

  const side = south ? -1 : 1; // right of the wind in the north, left in the south
  const wb = BEARING[wind];
  const netB = wb + side * 90;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "North of the equator, a steady wind blows toward the north over open sea. Averaged over the wind-driven top layer, which way does the water move?",
        options: ["East", "North", "West"],
        answer: 0,
      }}
      exploreHint="Start the wind, try the trade winds and westerlies, flip to the south, then open the ocean view."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            The water went {seen.q ?? "east"}, at right angles to the wind. Earth&rsquo;s spin turns moving water to the
            right north of the equator and to the left south of it. The top layer drifts 45 degrees off the wind, each
            layer below turns further, and the layer as a whole moves 90 degrees to the right.
          </p>
          <p>
            Your trade winds pushed water {seen.trades ?? "north"}, your westerlies pushed it {seen.westerlies ?? "south"}, so
            water piles up between them, and the ocean circles that mound: a gyre.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const record = (k: string, dir: string) => {
              setSeen((v) => (v[k] ? v : { ...v, [k]: dir }));
              reach(k);
            };
            const go = (w: Wind, sth: boolean) => {
              setWind(w);
              setStarted(true);
              setOcean(false);
              const dir = compass(BEARING[w] + (sth ? -90 : 90));
              if (!sth && w === "N") record("q", dir);
              if (!sth && w === "W") record("trades", dir);
              if (!sth && w === "E") record("westerlies", dir);
              if (sth) record("south", dir);
            };
            const onSquare = (w: Wind) => !ocean && started && wind === w;
            return (
              <div className={s.wrap}>
                <svg
                  viewBox={`0 0 ${VW} ${VH}`}
                  className="stage-svg"
                  role="img"
                  aria-label={
                    ocean
                      ? "Idealised northern ocean: trade winds at 15 N push water north, westerlies at 45 N push it south, and the water circles clockwise around 30 N."
                      : `Sea seen from above, ${south ? "south" : "north"} of the equator, wind toward the ${WORD[wind]}${started ? `; net water flow toward the ${compass(netB)}` : ""}.`
                  }
                >
                  {!ocean ? (
                    <>
                      <rect {...SQ} className={s.sea} />
                      {/* Wind streaks across the square */}
                      {[-70, 0, 70].map((o) => {
                        const [px, py] = vec(wb + 90, o);
                        const [bx, by] = vec(wb, -95);
                        return <Arrow key={o} x={CX + px + bx} y={CY + py + by} bearing={wb} len={190} className={o === 0 ? s.windMain : s.wind} head={9} />;
                      })}
                      <text x={CX + vec(wb + 90, -70)[0] + vec(wb, 60)[0] + 4} y={CY + vec(wb + 90, -70)[1] + vec(wb, 60)[1] - 4} className={s.label}>
                        wind
                      </text>
                      {started && (
                        <>
                          {LAYERS.map((z, i) => (
                            <Arrow
                              key={z}
                              x={CX}
                              y={CY}
                              bearing={wb + side * (45 + (z * 180) / Math.PI)}
                              len={86 * Math.exp(-z)}
                              className={i === 0 ? s.layerTop : s.layer}
                              head={i === 0 ? 7 : 5}
                            />
                          ))}
                          <Arrow x={CX} y={CY} bearing={netB} len={78} className={s.net} head={12} />
                          <text
                            x={CX + vec(wb + side * 45, 92)[0]}
                            y={CY + vec(wb + side * 45, 92)[1] + 4}
                            textAnchor="middle"
                            className={s.halo}
                          >
                            top layer
                          </text>
                          <text x={CX + vec(netB, 100)[0]} y={CY + vec(netB, 100)[1] + 4} textAnchor="middle" className={s.haloBold}>
                            net flow
                          </text>
                        </>
                      )}
                      <text x={SQ.x + SQ.w} y={12} textAnchor="end" className={s.label}>
                        N ↑
                      </text>
                      <text x={SQ.x} y={12} className={s.labelBold}>
                        {south ? "South" : "North"} of the equator
                      </text>
                      <text x={SQ.x} y={VH - 2} className={s.caption}>
                        Idealised deep ocean, steady wind, no coasts.
                      </text>
                    </>
                  ) : (
                    <OceanView />
                  )}
                </svg>
                <div className={s.chips}>
                  <Control disabled={locked || (onSquare("N") && !south)} className={onSquare("N") && !south ? "active" : ""} onClick={() => { setSouth(false); go("N", false); }}>
                    Start the wind
                  </Control>
                  <Control disabled={locked || (onSquare("W") && !south)} className={onSquare("W") && !south ? "active" : ""} onClick={() => { setSouth(false); go("W", false); }}>
                    Wind toward the west (trade winds)
                  </Control>
                  <Control disabled={locked || (onSquare("E") && !south)} className={onSquare("E") && !south ? "active" : ""} onClick={() => { setSouth(false); go("E", false); }}>
                    Wind toward the east (westerlies)
                  </Control>
                  <Control
                    disabled={locked}
                    className={south && !ocean ? "active" : ""}
                    aria-pressed={south && !ocean}
                    onClick={() => {
                      const next = ocean ? true : !south;
                      setSouth(next);
                      go(wind, next);
                    }}
                  >
                    South of the equator
                  </Control>
                  <Control
                    disabled={locked || ocean}
                    className={ocean ? "active" : ""}
                    onClick={() => {
                      setOcean(true);
                      setSouth(false);
                      reach("gyre");
                    }}
                  >
                    Ocean view
                  </Control>
                </div>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

// One idealised northern ocean basin, latitude 0 to 60 N.
function OceanView() {
  const B = { x: 44, y: 14, w: 232, h: 210 };
  const yLat = (lat: number) => B.y + B.h * (1 - lat / 60);
  const y15 = yLat(15), y30 = yLat(30), y45 = yLat(45);
  const mx = B.x + B.w / 2;
  return (
    <>
      <rect {...B} className={s.sea} />
      {[15, 30, 45].map((l) => (
        <g key={l}>
          <line x1={B.x} y1={yLat(l)} x2={B.x + B.w} y2={yLat(l)} className={l === 30 ? s.mid : s.grid} />
          <text x={B.x - 4} y={yLat(l) + 3.5} textAnchor="end" className={s.label}>
            {l}° N
          </text>
        </g>
      ))}
      {/* The water circling the mound near 30 N, clockwise */}
      <ellipse cx={mx} cy={y30} rx={B.w / 2 - 22} ry={(y15 - y45) / 2 - 4} className={s.gyre} />
      <Arrow x={mx + 6} y={y45 + 4} bearing={90} len={14} className={s.gyreHead} head={8} />
      <Arrow x={mx - 6} y={y15 - 4} bearing={270} len={14} className={s.gyreHead} head={8} />
      {/* Winds */}
      {[-60, 30].map((o) => (
        <Arrow key={`t${o}`} x={mx + o + 30} y={y15 + 16} bearing={270} len={50} className={s.wind} head={7} />
      ))}
      {[-60, 30].map((o) => (
        <Arrow key={`w${o}`} x={mx + o - 20} y={y45 - 16} bearing={90} len={50} className={s.wind} head={7} />
      ))}
      <text x={B.x + 4} y={y15 + 34} className={s.label}>
        trade winds
      </text>
      <text x={B.x + 4} y={y45 - 26} className={s.label}>
        westerlies
      </text>
      {/* Net flows: north under the trades, south under the westerlies, meeting near 30 N */}
      <Arrow x={mx + 70} y={y15 + 6} bearing={0} len={y15 - y30 - 10} className={s.net} head={10} />
      <Arrow x={mx + 70} y={y45 - 6} bearing={180} len={y30 - y45 - 10} className={s.net} head={10} />
      <text x={mx + 78} y={y30 - 6} className={s.haloBold}>
        piles up
      </text>
      <text x={B.x} y={VH - 2} className={s.caption}>
        Net flow: thick arrows. Water circles the mound.
      </text>
    </>
  );
}
