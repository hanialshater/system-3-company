"use client";

// The US (lower 48 and Alaska), China and India are moved onto Africa by rigid rotations on the
// sphere (centroid to a target, then a spin), so their true areas never change. The targets come
// from gen.mjs (committed alongside), which searched for a placement inside Africa with little
// overlap on the kit's 1:110m shapes. The map is Equal Earth, so drawn areas are true areas. The
// share readout is geoArea of the placed pieces over geoArea of Africa's 51 shapes.
// Key state: all three countries placed and the share (about 73%) read.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { WorldMap, country, geoArea, geoCentroid, geoEqualEarth, geoRotation, mapFeature, type CountryFeature } from "@/kit/geo";
import placements from "./placements.json";
import africaList from "./africa.json";
import type { MultiPolygon, Position } from "geojson";
import s from "./styles.module.css";

type P = [number, number];
type PieceId = "lower48" | "alaska" | "china" | "india";
const W = 320;
const H = 330;
const KM2 = 6371.0088 * 6371.0088;
const AFRICA: string[] = africaList.AFRICA;
const COUNTRIES: { id: "us" | "china" | "india"; label: string; pieces: PieceId[]; cls: string }[] = [
  { id: "us", label: "Move the US", pieces: ["lower48", "alaska"], cls: "us" },
  { id: "china", label: "Move China", pieces: ["china"], cls: "cn" },
  { id: "india", label: "Move India", pieces: ["india"], cls: "in" },
];

/** Same rule as gen.mjs: the US arrives as its two largest polygons. */
function pieceShapes(): Record<PieceId, CountryFeature> {
  const us = country("United States of America")!;
  const polys = (us.geometry as MultiPolygon).coordinates
    .map((c) => ({ c, a: geoArea({ type: "Polygon", coordinates: c }) }))
    .sort((p, q) => q.a - p.a);
  const poly = (c: Position[][]): CountryFeature => ({ type: "Feature", properties: { name: "US" }, geometry: { type: "Polygon", coordinates: c } });
  return { lower48: poly(polys[0].c), alaska: poly(polys[1].c), china: country("China")!, india: country("India")! };
}

/** Rigid move on the sphere: centroid to the origin, spin, then to the target (same as gen.mjs). */
function place(f: CountryFeature, target: P, spin: number) {
  const c = geoCentroid(f);
  const a = geoRotation([-c[0], 0]);
  const b = geoRotation([0, -c[1]]);
  const sp = geoRotation([0, 0, spin]);
  const e = geoRotation([0, target[1]]);
  const g = geoRotation([target[0], 0]);
  return mapFeature(f, (p) => g(e(sp(b(a(p))))) as P);
}

const projection = geoEqualEarth()
  .rotate([-18, 0])
  .fitExtent([[4, 4], [W - 4, H - 22]], { type: "MultiPoint", coordinates: [[-20, 38], [52, 38], [-20, -36], [52, -36], [18, 38], [18, -36]] })
  .clipExtent([[0, 0], [W, H]]);
const mkm = (km2: number) => `${(km2 / 1e6).toFixed(1)} M km²`;

export default function ThreeGiantsInAfrica({ slug }: { slug: string }) {
  const [placed, setPlaced] = useState<string[]>([]);
  const data = useMemo(() => {
    const shapes = pieceShapes();
    const moved = {} as Record<PieceId, CountryFeature>;
    for (const id of Object.keys(shapes) as PieceId[]) {
      const pl = placements.pieces[id];
      moved[id] = place(shapes[id], pl.target as P, pl.spin);
    }
    const area = (f: CountryFeature) => geoArea(f) * KM2;
    const africaKm2 = AFRICA.reduce((sum, n) => sum + area(country(n)!), 0);
    const countryKm2 = Object.fromEntries(COUNTRIES.map((c) => [c.id, c.pieces.reduce((sum, p) => sum + area(moved[p]), 0)]));
    return { moved, africaKm2, countryKm2 };
  }, []);
  const filled = placed.reduce((sum, id) => sum + data.countryKm2[id], 0);
  const total = COUNTRIES.reduce((sum, c) => sum + data.countryKm2[c.id], 0);
  const pct = (km2: number) => Math.round((km2 / data.africaKm2) * 100);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "On a world map, you drag the United States, China and India onto Africa, keeping each at its true size. What happens when you try to fit all three?",
        options: ["They fit, with room to spare", "They fill it exactly", "Africa is too small for them"],
        answer: 0,
      }}
      exploreHint="Move all three countries onto Africa and watch the share."
      minInteractions={COUNTRIES.length}
      reveal={() => (
        <>
          <p>
            <strong>They fit, with room to spare.</strong> Together the three cover {mkm(total)}, only {pct(total)}% of Africa&rsquo;s{" "}
            {mkm(data.africaKm2)}, leaving {mkm(data.africaKm2 - total)} empty. Africa is not &ldquo;one big country&rdquo; in size: the US,
            China and India together fit inside it.
          </p>
          <p>
            Each country was turned and slid across the globe like a rigid cut-out, so its size did not change, and this Equal Earth map draws equal areas equal, so what you saw
            is true size. The usual wall map, Mercator, stretches land more the farther it is from the equator. The US and China are
            stretched more than most of Africa, so Africa looks smaller than it is.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={COUNTRIES.map((c) => c.id)}>
          {(reach) => (
            <div className={s.wrap}>
              <WorldMap
                projection={projection}
                width={W}
                height={H}
                highlight={AFRICA}
                label={`Equal Earth map of Africa.${placed.length ? ` Placed: ${placed.join(", ")}; ${pct(filled)}% of Africa's area.` : ""}`}
              >
                {({ path }) => (
                  <>
                    {COUNTRIES.filter((c) => placed.includes(c.id)).map((c) =>
                      c.pieces.map((p) => <path key={p} d={path(data.moved[p])} className={`${s.piece} ${s[c.cls]}`} />),
                    )}
                    {COUNTRIES.filter((c) => placed.includes(c.id)).map((c) => {
                      const at = projection(placements.pieces[c.pieces[0]].target as P)!;
                      return (
                        <text key={c.id} x={at[0]} y={at[1] + 4} className={s.name} textAnchor="middle">
                          {c.id === "us" ? "US" : c.id === "china" ? "China" : "India"}
                        </text>
                      );
                    })}
                    <text x={6} y={H - 18} className={s.small}>
                      Equal Earth: a map where drawn areas are true areas.
                    </text>
                    <text x={6} y={H - 6} className={s.small}>
                      Pieces spill over a coast a little (about {Math.round(placements.outsidePct)}%); totals use area.
                    </text>
                  </>
                )}
              </WorldMap>
              <div className={s.chips}>
                {COUNTRIES.map((c) => (
                  <Control
                    key={c.id}
                    disabled={locked || placed.includes(c.id)}
                    className={placed.includes(c.id) ? "active" : ""}
                    onClick={() => {
                      setPlaced([...placed, c.id]);
                      reach(c.id);
                    }}
                  >
                    {c.label}
                  </Control>
                ))}
              </div>
              <div className={s.bar} aria-hidden="true">
                <div className={s.fill} style={{ width: `${locked ? 0 : (filled / data.africaKm2) * 100}%` }} />
              </div>
              <Row>
                <Readout label="Share of Africa filled" value={locked ? "?" : `${pct(filled)}%`} />
                <Readout label="Room left" value={locked ? "?" : mkm(data.africaKm2 - filled)} />
              </Row>
            </div>
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
