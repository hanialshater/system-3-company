"use client";

// Reading plate speed from a line of volcanic islands. The Pacific plate slides over a hot spot
// (treated as fixed) under Kīlauea; older volcanoes have been carried away. Distance from Kīlauea
// over age gives an average speed. Islands are markers: they do not exist in the kit's 1:110m data.
// Key state: both rulers laid (Kauaʻi and Midway) and their speeds shown, about 10 and 9 cm/yr.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { EARTH_RADIUS_KM, WorldMap, geoDistance, geoEqualEarth } from "@/kit/geo";
import s from "./styles.module.css";

const W = 320;
const H = 220;
type Pt = [number, number];
type Isle = { id: string; name: string; at: Pt; ageMyr: number };
const KILAUEA: Pt = [-155.29, 19.42];
const ISLES: Isle[] = [
  { id: "kauai", name: "Kauaʻi", at: [-159.53, 22.05], ageMyr: 5.1 },
  { id: "midway", name: "Midway", at: [-177.37, 28.21], ageMyr: 28 },
];
const km = (p: Pt) => geoDistance(KILAUEA, p) * EARTH_RADIUS_KM;
/** Average speed in cm per year: km × 100,000 cm / (Myr × 1,000,000 yr). */
const cmPerYr = (i: Isle) => (km(i.at) * 1e5) / (i.ageMyr * 1e6);
const r10 = (x: number) => (Math.round(x / 10) * 10).toLocaleString("en-US");

const projection = geoEqualEarth()
  .rotate([166, 0])
  .fitExtent([[20, 26], [W - 20, H - 20]], { type: "MultiPoint", coordinates: [KILAUEA, ...ISLES.map((i) => i.at), [-180, 32], [-152, 16]] });

export default function HawaiiChainClock({ slug }: { slug: string }) {
  const [laid, setLaid] = useState<string[]>([]);
  const [shown, setShown] = useState<string | null>(null);
  const kauai = ISLES[0];
  const cur = ISLES.find((i) => i.id === shown) ?? null;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `On Kauaʻi you stand on a volcano about ${kauai.ageMyr} million years old; Kīlauea, active today, is about ${r10(km(kauai.at))} km away. On average, how fast has the Pacific plate carried Kauaʻi away?`,
        options: ["About 1 cm a year", "About 10 cm a year", "About 1 m a year"],
        answer: 1,
      }}
      exploreHint="Lay the ruler from Kīlauea to Kauaʻi, then to Midway."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            <strong>About 10 cm a year.</strong> Kauaʻi: {r10(km(kauai.at))} km in {kauai.ageMyr} million years is {cmPerYr(kauai).toFixed(1)} cm a
            year. Midway, {r10(km(ISLES[1].at))} km away and about {ISLES[1].ageMyr} million years old, gives {cmPerYr(ISLES[1]).toFixed(1)}.
          </p>
          <p>
            Two islands, nearly the same speed. Volcanoes form over a hot spot that stays roughly put; the plate carries each one
            off to the northwest as a new one grows.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["kauai", "midway"]}>
          {(reach) => {
            const k = projection(KILAUEA)!;
            return (
              <div className={s.wrap}>
                <WorldMap
                  projection={projection}
                  width={W}
                  height={H}
                  label={`Equal Earth map of the central North Pacific with Kīlauea, Kauaʻi and Midway as markers.${cur && !locked ? ` Ruler to ${cur.name}: ${r10(km(cur.at))} km.` : ""}`}
                >
                  {({ path }) => (
                    <>
                      {!locked &&
                        laid.map((id) => {
                          const i = ISLES.find((x) => x.id === id)!;
                          return <path key={id} d={path({ type: "LineString", coordinates: [KILAUEA, i.at] })} className={s.ruler} opacity={id === shown ? 1 : 0.45} />;
                        })}
                      {ISLES.map((i) => {
                        const p = projection(i.at)!;
                        return (
                          <g key={i.id}>
                            <circle cx={p[0]} cy={p[1]} r={4} className={s.isle} />
                            <text x={p[0] - 6} y={p[1] - 8} className={s.lab}>
                              {i.name}, {i.ageMyr} million yr
                            </text>
                          </g>
                        );
                      })}
                      <circle cx={k[0]} cy={k[1]} r={5} className={s.hot} />
                      <text x={k[0] - 40} y={k[1] + 16} className={s.lab}>
                        Kīlauea, active
                      </text>
                      <text x={4} y={12} className={s.lab}>
                        Equal Earth map, central North Pacific. Islands marked as dots.
                      </text>
                    </>
                  )}
                </WorldMap>
                <Row>
                  {ISLES.map((i) => (
                    <Control
                      key={i.id}
                      disabled={locked}
                      className={shown === i.id ? "active" : ""}
                      onClick={() => {
                        setShown(i.id);
                        if (!laid.includes(i.id)) setLaid([...laid, i.id]);
                        reach(i.id);
                      }}
                    >
                      Ruler to {i.name}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Readout label="Distance" value={cur && !locked ? `${r10(km(cur.at))} km` : "?"} />
                  <Readout label="Age" value={cur && !locked ? `${cur.ageMyr} Myr` : "?"} />
                  <Readout label="Speed" value={cur && !locked ? `${cmPerYr(cur).toFixed(1)} cm/yr` : "?"} />
                </Row>
                <p className={s.note}>Speed = distance ÷ age, as if the hot spot never moved.</p>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
