"use client";

// South America (its 1:110m countries, plus French Guiana) is turned as one rigid piece on the
// sphere about the Bullard, Everett and Smith (1965) fit pole, 44°N 30.6°W, by up to 57°.
// A rotation on the sphere keeps its size and shape; only its place changes. The learner closes
// the Atlantic and sees where Brazil's eastern bulge lands.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { WorldMap, country, geoOrthographic, mapFeature } from "@/kit/geo";
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

const REGIONS: { t: string; p: Pt; a?: "end" }[] = [
  { t: "Gulf of Guinea", p: [2, 1.5] },
  { t: "Horn of Africa", p: [51, 11.5], a: "end" },
  { t: "Southern Africa", p: [24, -27] },
];

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
        question: "Turn South America across the Atlantic towards Africa. Where does Brazil's eastern bulge tuck in?",
        options: ["Southern Africa", "The Horn of Africa", "The Gulf of Guinea, West Africa"],
        answer: 2,
      }}
      exploreHint="Close the Atlantic all the way and watch the red dot."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            It tucks into the <strong>Gulf of Guinea</strong>, under West Africa&rsquo;s coast near Nigeria and Cameroon.
            You turned South America as one solid piece, {ANGLE}° about a single point in the North Atlantic, which is the
            fit Bullard, Everett and Smith published in 1965. The two coasts close up with only small gaps and overlaps,
            as you saw in the outline.
          </p>
          <p>
            The fit here is rough: their fit used the edge of the continental shelf, not today&rsquo;s beaches, and these
            outlines are coarse. Still, two coasts this far apart rarely match by chance. It is evidence the continents
            were once joined.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <div className={s.wrap}>
          <WorldMap
            projection={projection}
            width={W}
            height={H}
            graticule={false}
            label={`Orthographic view of the South Atlantic. South America turned ${pct}% of the way to its fit against Africa.`}
          >
            {({ path }) => (
              <>
                <path d={path(moved)} className={s.sa} />
                {REGIONS.map(({ t, p, a }) => {
                  const q = projection(p)!;
                  return (
                    <g key={t}>
                      <circle cx={q[0]} cy={q[1]} r={1.8} className={s.mark} />
                      <text x={a ? q[0] - 4 : q[0]} y={a ? q[1] + 3 : q[1] - 5} className={s.region} textAnchor={a ?? "middle"}>
                        {t}
                      </text>
                    </g>
                  );
                })}
                {tip && <circle cx={tip[0]} cy={tip[1]} r={3.2} className={s.tip} />}
              </>
            )}
          </WorldMap>
          <p className="muted tiny">Globe view. Grey: today&rsquo;s coasts. Blue outline: South America as you move it; gaps and overlaps show. Red dot: the bulge.</p>
          <Row>
            <Slider label="Close the Atlantic" value={pct} min={0} max={100} disabled={locked} format={(v) => `${v}%`} onChange={(v) => set(v, interact)} />
          </Row>
          <Row>
            <Control disabled={locked || pct === 100} onClick={() => set(100, interact)}>
              Close it all the way
            </Control>
            <Control disabled={locked || pct === 0} onClick={() => set(0, interact)}>
              Back to today
            </Control>
          </Row>
        </div>
      )}
    </Lesson>
  );
}
