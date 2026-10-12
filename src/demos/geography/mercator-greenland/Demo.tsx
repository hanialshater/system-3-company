"use client";

// Geography exemplar. The learner slides Greenland toward the equator along its own meridian
// (a rigid rotation on the sphere, so its true size never changes) and watches the Mercator
// map shrink it. The projection does the distorting, not the land.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import {
    WorldMap,
  country,
  geoCentroid,
  geoEqualEarth,
  geoMercator,
  geoPath,
  moveToLatitude,
} from "@/kit/geo";

const W = 320;
const H = 236;

function makeProjection(kind: "mercator" | "equal") {
  if (kind === "mercator") {
    // Width spans 360°; rows from about 85°N (so all of Greenland is drawn) to 60°S.
    const s = W / (2 * Math.PI);
    return geoMercator().scale(s).translate([W / 2, 166]).clipExtent([[0, 0], [W, H]]);
  }
  return geoEqualEarth().fitSize([W, H], { type: "Sphere" });
}

export default function MercatorGreenland({ slug }: { slug: string }) {
  const [south, setSouth] = useState(0);
  const [kind, setKind] = useState<"mercator" | "equal">("mercator");
  const greenland = country("Greenland")!;
  const congo = country("Dem. Rep. Congo")!;
  const startLat = Math.round(geoCentroid(greenland)[1]);
  const lat = startLat - south;
  const moved = useMemo(() => moveToLatitude(greenland, lat), [greenland, lat]);
  const projection = useMemo(() => makeProjection(kind), [kind]);
  const path = useMemo(() => geoPath(projection), [projection]);

  const mapRatio = path.area(moved) / path.area(congo);
  // The question quotes what this lesson's own Mercator map draws at Greenland's real position.
  const startRatio = useMemo(() => {
    const p = geoPath(makeProjection("mercator"));
    return Math.round(p.area(greenland) / p.area(congo));
  }, [greenland, congo]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `On this map Greenland (blue) is drawn about ${startRatio} times the size of DR Congo (green). On the real Earth, which is bigger?`,
        options: [`Greenland, about ${startRatio}× bigger`, "About the same size", "Congo, about 4× bigger"],
        answer: 1,
      }}
      exploreHint="Slide Greenland south toward the equator, then try the other map."
      minInteractions={2}
      reveal={({ correct }) => (
        <>
          <p>
            They are about the same size, and Congo is slightly bigger: Greenland is about 2.17 million km², DR Congo
            about 2.34 million. Greenland never changed as you slid it. The map did. Every flat map is a{" "}
            <strong>projection</strong> of a round Earth, and the Mercator projection stretches areas away from the
            equator by about 1 / cos²(latitude): more than ten times at Greenland&rsquo;s latitude.
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
            label={`World map, ${kind === "mercator" ? "Mercator" : "Equal Earth"} projection. Greenland moved ${south}° south, drawn ${mapRatio.toFixed(1)} times the size of DR Congo.`}
          >
            {({ path: p }) => (
              <>
                {south > 0 && (
                  <path d={p(greenland)} fill="none" stroke="var(--fg)" strokeDasharray="2 2" strokeWidth={0.8} />
                )}
                <path d={p(moved)} fill="#3b82f6" fillOpacity={0.85} stroke="var(--fg)" strokeWidth={0.6} />
                <path d={p(congo)} fill="var(--good)" stroke="var(--fg)" strokeWidth={0.6} />
              </>
            )}
          </WorldMap>
          <Row>
            <Slider
              label="Slide Greenland south"
              value={south}
              min={0}
              max={startLat}
              disabled={locked}
              format={(v) => (v === startLat ? "to the equator" : `${v}°`)}
              onChange={(v) => {
                setSouth(v);
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
          {!locked && south > 0 && <p className="muted tiny">Dashed outline: where Greenland really is.</p>}
        </div>
      )}
    </Lesson>
  );
}
