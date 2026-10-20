"use client";

// South America (its 1:110m countries, plus French Guiana) is turned as one rigid piece on the
// sphere about a pole at 44°N 30.6°W, by up to 57° (parameters recalled from the Bullard, Everett and Smith
// 1965 fit; v3: their table could not be opened and secondary sources disagree, so the learner is no longer
// told these are the published values; the reveal says only what the stage did).
// A rotation on the sphere keeps its size and shape; only its place changes. The learner closes
// the Atlantic and sees where Brazil's eastern bulge lands.
// v6 (learner r8, phone fit): region labels 10.5px (they drew at 8.5px); the slider is labelled "Turned" (its output
// is the angle) and shares a row with the size readout, replacing the separate Turned readout; at the reveal the two
// preset buttons and the legend line are hidden (the stage is synced to 57°, the fit the reveal describes; the slider
// stays, so the learner can still turn it and watch the size hold), so the globe top with the pivot arrow, the slider,
// the size readout and the reveal's last line share a 390×844 screen. The told "small gaps and overlaps"
// sentence left the reveal (nothing on the stage marks them). "Horn of Africa" now sits under its dot, clear of
// the Gulf of Guinea label.

import { useEffect, useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { EARTH_RADIUS_KM, WorldMap, country, geoArea, geoOrthographic, mapFeature } from "@/kit/geo";
import type { Feature, FeatureCollection, Geometry, MultiPolygon } from "geojson";
import s from "./styles.module.css";

type Pt = [number, number];
const W = 320;
const H = 270;
const POLE: Pt = [-30.6, 44];
const ANGLE = 57;
const TIP: Pt = [-34.8, -7.1]; // Brazil's eastern bulge (Cabo Branco area)
const SA_NAMES = ["Brazil", "Argentina", "Chile", "Uruguay", "Paraguay", "Bolivia", "Peru", "Ecuador", "Colombia", "Venezuela", "Guyana", "Suriname"];
const rad = Math.PI / 180;

const toV = ([lon, lat]: Pt) => [Math.cos(lat * rad) * Math.cos(lon * rad), Math.cos(lat * rad) * Math.sin(lon * rad), Math.sin(lat * rad)];
const toLL = ([x, y, z]: number[]): Pt => [Math.atan2(y, x) / rad, Math.asin(Math.max(-1, Math.min(1, z))) / rad];
/** Rotation by `deg` about the axis through `pole` (Rodrigues' formula). */
function rotation(pole: Pt, deg: number) {
  const k = toV(pole);
  const c = Math.cos(deg * rad);
  const sn = Math.sin(deg * rad);
  return (p: Pt): Pt => {
    const v = toV(p);
    const kv = k[0] * v[0] + k[1] * v[1] + k[2] * v[2];
    const cr = [k[1] * v[2] - k[2] * v[1], k[2] * v[0] - k[0] * v[2], k[0] * v[1] - k[1] * v[0]];
    return toLL([0, 1, 2].map((i) => v[i] * c + cr[i] * sn + k[i] * kv * (1 - c)));
  };
}

function southAmerica(): FeatureCollection<Geometry> {
  const feats: Feature<Geometry>[] = SA_NAMES.map((n) => country(n)! as Feature<Geometry>);
  const fr = country("France")!.geometry as MultiPolygon;
  const guiana = fr.coordinates.filter((poly) => poly[0][0][0] < -40);
  feats.push({ type: "Feature", properties: {}, geometry: { type: "MultiPolygon", coordinates: guiana } });
  return { type: "FeatureCollection", features: feats };
}

// Label offsets from each region's dot (v6: Gulf of Guinea sits up-left, clear of the red dot that lands right of it;
// Horn of Africa under its dot, clear of the Gulf label).
const REGIONS: { t: string; p: Pt; a: "start" | "middle" | "end"; dx: number; dy: number }[] = [
  { t: "Gulf of Guinea", p: [2, 1.5], a: "end", dx: 2, dy: -6 },
  { t: "Horn of Africa", p: [51, 11.5], a: "end", dx: 2, dy: 14 },
  { t: "Southern Africa", p: [24, -27], a: "middle", dx: 0, dy: -5 },
];

const deg = (pct: number) => Math.round((ANGLE * pct) / 100);
// Area on the sphere in million km², at the stage's rounding (one decimal). A rotation cannot change it.
const areaM = (fc: FeatureCollection<Geometry>) => ((geoArea(fc) * EARTH_RADIUS_KM * EARTH_RADIUS_KM) / 1e6).toFixed(1);

/** When the reveal opens after a fit, put the slider back on the fit the reveal describes. */
function SyncOnReveal({ on, sync }: { on: boolean; sync: () => void }) {
  useEffect(() => {
    if (on) sync();
  }, [on]); // only when the reveal opens; afterwards the learner may move the slider again
  return null;
}

export default function ContinentalJigsaw({ slug }: { slug: string }) {
  const [pct, setPct] = useState(0);
  const [fitted, setFitted] = useState(false);
  const sa = useMemo(southAmerica, []);
  const projection = useMemo(() => {
    const africa = ["Nigeria", "South Africa", "Somalia", "Morocco", "Brazil", "Argentina", "Colombia"].map((n) => country(n)!);
    return geoOrthographic()
      .rotate([18, 10])
      .fitExtent([[6, 6], [W - 6, H - 6]], { type: "FeatureCollection", features: africa } as FeatureCollection);
  }, []);
  const turn = useMemo(() => rotation(POLE, (ANGLE * pct) / 100), [pct]);
  const moved = useMemo(
    () => ({ ...sa, features: sa.features.map((f) => mapFeature(f, turn)) }),
    [sa, turn],
  );
  const tip = projection(turn(TIP));
  // The bulge's trail: where the tip has been on the way from today to the current turn (an arc about the pivot).
  const trail = useMemo(() => {
    const pts: string[] = [];
    for (let k = 0; k <= pct; k += 2) {
      const q = projection(rotation(POLE, (ANGLE * k) / 100)(TIP));
      if (q) pts.push(`${q[0].toFixed(1)},${q[1].toFixed(1)}`);
    }
    const end = projection(rotation(POLE, (ANGLE * pct) / 100)(TIP));
    if (end) pts.push(`${end[0].toFixed(1)},${end[1].toFixed(1)}`);
    return pts.join(" ");
  }, [pct, projection]);
  const pivot = projection(POLE);
  const area = areaM(moved);

  const set = (v: number, interact: () => void) => {
    setPct(v);
    if (!fitted && v >= 98) {
      setFitted(true);
      interact();
    }
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Like testing a jigsaw piece, turn South America across the Atlantic towards Africa. Where does Brazil's eastern bulge tuck in?",
        options: ["Southern Africa", "The Horn of Africa", "The Gulf of Guinea"],
        answer: 2,
      }}
      exploreHint="Close the Atlantic all the way and watch the red dot."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            It tucks into the <strong>Gulf of Guinea</strong>, near Nigeria and Cameroon.
            You turned South America as one solid piece, {ANGLE}° about the pivot in the North Atlantic: the red
            dot&rsquo;s trail is an arc around it. It looked bigger near the middle of the globe, but its size stayed{" "}
            {areaM(sa)} million km² throughout.
          </p>
          <p>
            The fit here is rough: these outlines are coarse. Still, two coasts this far apart rarely match by chance. It is evidence the continents
            were once joined.
          </p>
        </>
      )}
    >
      {({ locked, interact, phase }) => {
        const shape = moved;
        const dot = tip;
        return (
        <div className={s.wrap}>
          {/* In the reveal the stage shows the closed fit the reveal describes, even if the learner went back to today. */}
          <SyncOnReveal on={phase === "reveal" && fitted} sync={() => setPct(100)} />
          <WorldMap
            projection={projection}
            width={W}
            height={H}
            graticule={false}
            label={`Orthographic view of the South Atlantic. South America turned ${deg(pct)} degrees about a pivot in the North Atlantic.`}
          >
            {({ path }) => (
              <>
                <path d={path(shape)} className={s.sa} />
                {REGIONS.map(({ t, p, a, dx, dy }) => {
                  const q = projection(p)!;
                  return (
                    <g key={t}>
                      <circle cx={q[0]} cy={q[1]} r={1.8} className={s.mark} />
                      <text x={q[0] + dx} y={q[1] + dy} className={s.region} textAnchor={a}>
                        {t}
                      </text>
                    </g>
                  );
                })}
                {pct > 0 && <polyline points={trail} className={s.trail} />}
                {pivot && !locked &&
                  (pivot[1] >= 8 ? (
                    <g>
                      <path d={`M${pivot[0] - 5},${pivot[1]} h10 M${pivot[0]},${pivot[1] - 5} v10`} className={s.pivot} />
                      <text x={pivot[0] + 7} y={pivot[1] + 3} className={s.region}>
                        pivot
                      </text>
                    </g>
                  ) : (
                    // The pivot (44°N) sits just above this view: an arrow at the top edge points to it.
                    <g>
                      <path d={`M${pivot[0]},3 l-5,8 h10 z`} className={s.pivotArrow} />
                      <text x={pivot[0] + 8} y={11} className={s.region}>
                        pivot just above (44°N)
                      </text>
                    </g>
                  ))}
                {dot && <circle cx={dot[0]} cy={dot[1]} r={3.2} className={s.tip} />}
              </>
            )}
          </WorldMap>
          {phase !== "reveal" && (
            <p className="muted tiny">
              Grey: today&rsquo;s coasts. Blue: South America, turned about the pivot. Red dot: the bulge, with its trail. The
              globe squashes shapes near its edge.
            </p>
          )}
          {/* v6: the slider's own label is the "Turned" readout, sharing a row with the size readout. */}
          <Row>
            <Slider label="Turned" value={pct} min={0} max={100} disabled={locked} format={(v) => `${deg(v)}°`} onChange={(v) => set(v, interact)} />
            <Readout label="Size on the globe" value={`${area} million km²`} />
          </Row>
          {phase !== "reveal" && (
          <Row>
            <Control disabled={locked || pct === 100} onClick={() => set(100, interact)}>
              Close it all the way
            </Control>
            <Control disabled={locked || pct === 0} onClick={() => set(0, interact)}>
              Back to today
            </Control>
          </Row>
          )}
        </div>
        );
      }}
    </Lesson>
  );
}
