"use client";

// Indonesia laid over the contiguous US. The learner moves Indonesia onto the US by a rigid
// rotation on the sphere (centroid to centroid; its true size and every distance inside it stay
// the same), then lays a ruler across each outline: the longest great-circle distance between two
// vertices of the kit's 1:110m outline. Key state: Indonesia sits on the US and both rulers show.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import {
  EARTH_RADIUS_KM,
  WorldMap,
  country,
  geoArea,
  geoCentroid,
  geoDistance,
  geoEqualEarth,
  geoRotation,
  mapFeature,
  type CountryFeature,
} from "@/kit/geo";
import type { Feature, Polygon } from "geojson";
import s from "./styles.module.css";

const W = 320;
const H = 200;
type Pt = [number, number];

/** Rigid rotation on the sphere that carries the shape's centroid to `to`, keeping north up there. */
function moveTo<F extends Feature>(f: F, from: Pt, to: Pt): F {
  const a = geoRotation([-from[0], 0]);
  const b = geoRotation([0, -from[1]]);
  const c = geoRotation([0, to[1]]);
  const d = geoRotation([to[0], 0]);
  return mapFeature(f, (p) => d(c(b(a(p)))) as Pt);
}

function vertices(f: Feature): Pt[] {
  const out: Pt[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const walk = (c: any) => (typeof c[0] === "number" ? out.push(c as Pt) : c.forEach(walk));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  walk((f.geometry as any).coordinates);
  return out;
}

/** Longest great-circle distance between two vertices, in km, and the pair. */
function longestSpan(f: Feature): { km: number; ends: [Pt, Pt] } {
  const v = vertices(f);
  let best = 0;
  let ends: [Pt, Pt] = [v[0], v[0]];
  for (let i = 0; i < v.length; i++)
    for (let j = i + 1; j < v.length; j++) {
      const d = geoDistance(v[i], v[j]);
      if (d > best) {
        best = d;
        ends = [v[i], v[j]];
      }
    }
  return { km: best * EARTH_RADIUS_KM, ends };
}

/** The contiguous US: the largest polygon of the 1:110m "United States of America" feature. */
function lower48(us: CountryFeature): Feature<Polygon> {
  const g = us.geometry as { type: string; coordinates: Polygon["coordinates"][] };
  const polys = g.coordinates.map((c) => ({ type: "Feature" as const, properties: {}, geometry: { type: "Polygon" as const, coordinates: c } }));
  polys.sort((p, q) => geoArea(q) - geoArea(p));
  return polys[0];
}

const fmtKm = (km: number) => `${(Math.round(km / 10) * 10).toLocaleString("en-US")} km`;

export default function IndonesiaVsTheUsWidth({ slug }: { slug: string }) {
  const [moved, setMoved] = useState(false);
  const [measured, setMeasured] = useState(false);

  const data = useMemo(() => {
    const indo = country("Indonesia")!;
    const us = lower48(country("United States of America")!);
    const from = geoCentroid(indo) as Pt;
    const to = geoCentroid(us) as Pt;
    const indoMoved = moveTo(indo, from, to);
    const iSpan = longestSpan(indo);
    const uSpan = longestSpan(us);
    const movedEnds = [moveTo({ type: "Feature", properties: {}, geometry: { type: "MultiPoint", coordinates: iSpan.ends } } as Feature, from, to)];
    const ends = vertices(movedEnds[0]) as [Pt, Pt];
    return { indo, us, indoMoved, iSpan, uSpan, movedIndoEnds: ends, to };
  }, []);

  const ratio = data.iSpan.km / data.uSpan.km;
  const pct = Math.round((ratio - 1) * 100);

  const projection = useMemo(() => {
    if (!moved) return geoEqualEarth().fitExtent([[4, 18], [W - 4, H - 4]], { type: "Sphere" });
    return geoEqualEarth()
      .rotate([-data.to[0], 0])
      .fitExtent([[18, 24], [W - 18, H - 12]], { type: "FeatureCollection", features: [data.us, data.indoMoved] });
  }, [moved, data]);

  const indoShape = moved ? data.indoMoved : data.indo;
  const indoEnds = moved ? data.movedIndoEnds : data.iSpan.ends;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Lay Indonesia over a map of the contiguous US (the 48 joined states) and compare it end to end with the US coast to coast. How far does Indonesia stretch?",
        options: ["About half as far", "About the same", "Further than the US"],
        answer: 2,
      }}
      exploreHint="Move Indonesia onto the US, then measure both."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            <strong>Further.</strong> On this lesson&rsquo;s outlines Indonesia measured {fmtKm(data.iSpan.km)} end to end and the 48
            joined states {fmtKm(data.uSpan.km)}: Indonesia is about {pct}% longer, measured the same way.
          </p>
          <p>
            Its land is far smaller than the US, but a country of islands reaches across the sea between them. Moving it
            around the globe kept its true size and every distance inside it; only where it sat changed.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["moved", "measured"]}>
          {(reach) => (
            <div className={s.wrap}>
              <WorldMap
                projection={projection}
                width={W}
                height={H}
                highlight={["United States of America"]}
                label={`Equal Earth map. Indonesia is ${moved ? "laid over the contiguous US" : "in its real place"}.${measured && !locked ? ` Rulers: Indonesia ${fmtKm(data.iSpan.km)}, US ${fmtKm(data.uSpan.km)}.` : ""}`}
              >
                {({ path, projection: proj }) => {
                  const mid = (e: [Pt, Pt]) => proj(e[0]) && proj(e[1]) ? [(proj(e[0])![0] + proj(e[1])![0]) / 2, (proj(e[0])![1] + proj(e[1])![1]) / 2] : null;
                  const mI = mid(indoEnds);
                  const mU = mid(data.uSpan.ends);
                  return (
                    <>
                      <path d={path(indoShape)} className={s.indo} />
                      {measured && !locked && (
                        <>
                          <path d={path({ type: "LineString", coordinates: data.uSpan.ends })} className={s.rulerUs} />
                          <path d={path({ type: "LineString", coordinates: indoEnds })} className={s.rulerIndo} />
                          {mU && (
                            <text x={mU[0]} y={mU[1] - 6} className={s.lab} textAnchor="middle">
                              US {fmtKm(data.uSpan.km)}
                            </text>
                          )}
                          {mI && (
                            <text x={mI[0]} y={mI[1] + 14} className={s.lab} textAnchor="middle">
                              Indonesia {fmtKm(data.iSpan.km)}
                            </text>
                          )}
                        </>
                      )}
                      <text x={6} y={12} className={s.lab}>
                        Equal Earth map (true sizes). Orange: Indonesia.
                      </text>
                    </>
                  );
                }}
              </WorldMap>
              <Row>
                <Control
                  disabled={locked}
                  className={moved ? "active" : ""}
                  onClick={() => {
                    setMoved(!moved);
                    if (!moved) reach("moved");
                    if (!moved && measured) reach("measured");
                  }}
                >
                  {moved ? "Put Indonesia back" : "Move Indonesia onto the US"}
                </Control>
                <Control
                  disabled={locked}
                  className={measured ? "active" : ""}
                  onClick={() => {
                    setMeasured(!measured);
                    if (!measured && moved) reach("measured");
                  }}
                >
                  {measured ? "Hide rulers" : "Measure both"}
                </Control>
              </Row>
              <Row>
                <Readout label="Indonesia end to end" value={measured && !locked ? fmtKm(data.iSpan.km) : "?"} />
                <Readout label="US coast to coast" value={measured && !locked ? fmtKm(data.uSpan.km) : "?"} />
              </Row>
              <p className={s.note}>Ruler: the two farthest points of each outline, measured over the globe.</p>
            </div>
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
