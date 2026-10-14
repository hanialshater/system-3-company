"use client";

// An azimuthal equidistant map centred on Dakar: distances from Dakar are true along every straight
// line out of the centre, so a distance ring is a true circle on the ground. The learner widens the
// ring; cities inside it light up and show their great-circle distance (geoDistance x R).
// Key state: the ring holds Natal but not Paris or Rome (between about 3,000 and 4,170 km).

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Readout, Row, Slider } from "@/kit/controls";
import { WorldMap, EARTH_RADIUS_KM, geoAzimuthalEquidistant, geoCircle, geoDistance } from "@/kit/geo";
import s from "./styles.module.css";

type P = [number, number];
const W = 320;
const H = 300;
const DAKAR: P = [-17.4677, 14.7167];
const CITIES: { name: string; at: P; dx: number; dy: number }[] = [
  { name: "Natal, Brazil", at: [-35.2, -5.79], dx: 4, dy: 15 },
  { name: "Paris", at: [2.3522, 48.8566], dx: -6, dy: -4 },
  { name: "Rome", at: [12.4964, 41.9028], dx: 6, dy: 4 },
];
const distKm = (p: P) => geoDistance(DAKAR, p) * EARTH_RADIUS_KM;
const DIST = CITIES.map((c) => distKm(c.at));
const NATAL = DIST[0];
const NEAREST_EUROPE = Math.min(DIST[1], DIST[2]);
const START = 2500;
const STEP = 500;
const CLIP_DEG = 52;
const fmt = (km: number) => (Math.round(km / 10) * 10).toLocaleString("en-US");

const projection = geoAzimuthalEquidistant()
  .rotate([-DAKAR[0], -DAKAR[1]])
  .clipAngle(CLIP_DEG)
  .fitExtent([[4, 4], [W - 4, H - 4]], geoCircle().center(DAKAR).radius(CLIP_DEG)());

export default function DakarNearerBrazil({ slug }: { slug: string }) {
  const [ring, setRing] = useState(START);
  const ringShape = useMemo(() => geoCircle().center(DAKAR).radius((ring / EARTH_RADIUS_KM) * (180 / Math.PI)).precision(1)(), [ring]);
  const inside = CITIES.filter((_, i) => DIST[i] <= ring);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Of these three cities, which is nearest to Dakar, Senegal?",
        options: ["Paris", "Rome", "Natal, Brazil"],
        answer: 2,
      }}
      exploreHint="Widen the ring until one city is inside and the others are not."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            <strong>Natal.</strong> It is {fmt(NATAL)} km from Dakar, across the Atlantic, and it came inside
            your ring while Paris and Rome were still outside. Rome is {fmt(DIST[2])} km and Paris {fmt(DIST[1])} km away, as
            the labels said.
          </p>
          <p>
            This kind of map (an <strong>azimuthal equidistant</strong> projection) keeps true distance from its centre only, so a ring drawn round Dakar is a
            real circle on the ground. Distances between other pairs on it are stretched. Seen from Dakar, the far side of the Atlantic is nearer than Paris or Rome.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["natal-only"]}>
          {(reach) => (
            <div className={s.wrap}>
              <WorldMap
                projection={projection}
                width={W}
                height={H}
                graticule={false}
                label={`Map centred on Dakar with a ${ring} km ring.${locked ? "" : ` Inside: ${inside.map((c) => c.name).join(", ") || "none of the cities"}.`}`}
              >
                {({ path }) => {
                  const d = projection(DAKAR)!;
                  return (
                    <>
                      {!locked && <path d={path(ringShape)} className={s.ring} />}
                      <circle cx={d[0]} cy={d[1]} r={4} className={s.home} />
                      <text x={d[0] + 6} y={d[1] + 4} className={s.name}>
                        Dakar
                      </text>
                      {!locked && CITIES.map((c, i) => {
                        const q = projection(c.at)!;
                        const lit = !locked && DIST[i] <= ring;
                        return (
                          <g key={c.name}>
                            <circle cx={q[0]} cy={q[1]} r={4} className={lit ? s.lit : s.city} />
                            <text x={q[0] + c.dx} y={q[1] + c.dy} className={s.name} textAnchor={c.dx < 0 ? "end" : "start"}>
                              {c.name}
                              {` ${fmt(DIST[i])} km`}
                            </text>
                          </g>
                        );
                      })}
                      <text x={6} y={H - 6} className={s.small}>
                        {locked ? "Dakar is at the centre. The three cities appear once you commit." : "Distances from Dakar are true on this map; elsewhere they are stretched."}
                      </text>
                    </>
                  );
                }}
              </WorldMap>
              <Row>
                <Slider
                  label="Ring round Dakar"
                  value={ring}
                  min={STEP}
                  max={5500}
                  step={STEP}
                  disabled={locked}
                  format={(v) => `${v.toLocaleString("en-US")} km`}
                  onChange={(v) => {
                    setRing(v);
                    if (v >= NATAL && v < NEAREST_EUROPE) reach("natal-only");
                  }}
                />
              </Row>
              <Row>
                <Readout label="Inside the ring" value={locked ? "?" : inside.map((c) => c.name.split(",")[0]).join(", ") || "none yet"} />
              </Row>
            </div>
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
