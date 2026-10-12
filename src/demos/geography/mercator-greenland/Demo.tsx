"use client";

// Geography exemplar. The learner slides Greenland toward the equator along its own meridian
// (a rigid rotation on the sphere, so its true size never changes) and watches the Mercator
// map shrink it. The projection does the distorting, not the land.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import {
  EARTH_RADIUS_KM,
  WorldMap,
  country,
  geoArea,
  geoCentroid,
  geoEqualEarth,
  geoMercator,
  geoPath,
  moveToLatitude,
} from "@/kit/geo";

const W = 320;
const H = 200;

function makeProjection(kind: "mercator" | "equal") {
  if (kind === "mercator") {
    // Width spans 360°; rows from about 80°N to 60°S.
    const s = W / (2 * Math.PI);
    return geoMercator().scale(s).translate([W / 2, 124]).clipExtent([[0, 0], [W, H]]);
  }
  return geoEqualEarth().fitSize([W, H], { type: "Sphere" });
}

export default function MercatorGreenland({ slug }: { slug: string }) {
  const [lat, setLat] = useState(73);
  const [kind, setKind] = useState<"mercator" | "equal">("mercator");
  const greenland = country("Greenland")!;
  const congo = country("Dem. Rep. Congo")!;
  const startLat = Math.round(geoCentroid(greenland)[1]);
  const moved = useMemo(() => moveToLatitude(greenland, lat), [greenland, lat]);
  const projection = useMemo(() => makeProjection(kind), [kind]);
  const path = useMemo(() => geoPath(projection), [projection]);

  const mapRatio = path.area(moved) / path.area(congo);
  const trueKm2 = (f: typeof greenland) => geoArea(f) * EARTH_RADIUS_KM ** 2;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "On this map Greenland (blue) looks about 15 times the size of DR Congo (green). On the real Earth, which is bigger?",
        options: ["Greenland, by far", "About the same; Congo slightly bigger", "Congo, by about 15 times"],
        answer: 1,
      }}
      exploreHint="Slide Greenland toward the equator, then try the other map."
      minInteractions={2}
      reveal={({ correct }) => (
        <>
          <p>
            {correct ? "Right: " : ""}they are close. Greenland is about 2.17 million km², DR Congo about 2.34 million.
            Greenland never changed as you slid it. The map did: Mercator stretches everything away from the equator,
            and areas grow by about 1 / cos²(latitude). At Greenland&rsquo;s latitude that is more than ten times.
          </p>
          <p>
            Mercator was made for sailors: it keeps angles true, so a straight line is a constant compass bearing. An
            equal-area map such as Equal Earth keeps sizes true instead. No flat map can keep both.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <div>
          <WorldMap
            projection={projection}
            width={W}
            height={H}
            highlight={["Dem. Rep. Congo"]}
            label={`World map, ${kind === "mercator" ? "Mercator" : "Equal Earth"} projection. Greenland moved to latitude ${lat}°, drawn ${mapRatio.toFixed(1)} times the size of DR Congo.`}
          >
            {({ path: p }) => (
              <>
                {lat !== startLat && (
                  <path d={p(greenland)} fill="none" stroke="var(--fg)" strokeDasharray="2 2" strokeWidth={0.8} />
                )}
                <path d={p(moved)} fill="#3b82f6" fillOpacity={0.85} stroke="var(--fg)" strokeWidth={0.6} />
                <path d={p(congo)} fill="var(--good)" stroke="var(--fg)" strokeWidth={0.6} />
              </>
            )}
          </WorldMap>
          <Row>
            <Slider
              label="Greenland's latitude"
              value={lat}
              min={0}
              max={startLat}
              disabled={locked}
              format={(v) => `${v}°N`}
              onChange={(v) => {
                setLat(v);
                interact();
              }}
            />
          </Row>
          <Row>
            <Readout label="On this map, Greenland ÷ Congo" value={`${mapRatio.toFixed(1)}×`} />
            <Control
              disabled={locked}
              className={kind === "equal" ? "active" : ""}
              onClick={() => {
                setKind(kind === "mercator" ? "equal" : "mercator");
                interact();
              }}
            >
              {kind === "mercator" ? "Show Equal Earth map" : "Show Mercator map"}
            </Control>
          </Row>
          {!locked && <p className="muted tiny">
            Coarse outlines (1:110m). Areas on the sphere in this data: Greenland {Math.round(trueKm2(greenland) / 1e4) / 100}M km²,
            Congo {Math.round(trueKm2(congo) / 1e4) / 100}M km².
          </p>}
        </div>
      )}
    </Lesson>
  );
}
