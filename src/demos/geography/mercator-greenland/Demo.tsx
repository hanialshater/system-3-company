"use client";

// Geography exemplar. The learner slides Greenland toward the equator along its own meridian
// (a rigid rotation on the sphere, so its true size never changes) and watches the Mercator
// map shrink it. The projection does the distorting, not the land.
// v3: the reveal is gated on two states; the equator is drawn; the readout at the start uses the
// unmoved shape, the same one the question's number comes from.
// v4: the gates are "near the equator on Mercator" and "the equal-area map shown", and each
// records the ratio the readout printed at that moment onto a Seen line that the reveal quotes.
// A "Slide to the equator" button comes first so one press reaches the near-equator state.
// An orange line of one constant compass bearing (a rhumb line) is drawn on both maps: straight
// on Mercator, bent on the equal-area map. It stands for Mercator's purpose.

import { useMemo, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
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
const MILESTONES = ["equator", "equal"] as const;
const NEAR_EQUATOR = 10; // degrees: on Mercator, within this of the equator drawn sizes are near true
const EQUATOR = {
  type: "LineString" as const,
  coordinates: [
    [-180, 0],
    [-90, 0],
    [0, 0],
    [90, 0],
    [180, 0],
  ],
};
// A rhumb line (one constant compass bearing): straight in Mercator coordinates, so lon is linear
// in y = ln tan(45° + lat/2). Sampled densely so the great-circle pieces between samples are negligible.
const rad = Math.PI / 180;
const mercY = (lat: number) => Math.log(Math.tan(Math.PI / 4 + (lat * rad) / 2));
const RHUMB = (() => {
  const [lon0, lat0, lon1, lat1] = [-50, -45, 50, 62];
  const y0 = mercY(lat0);
  const y1 = mercY(lat1);
  const coordinates = Array.from({ length: 121 }, (_, i) => {
    const t = i / 120;
    const y = y0 + t * (y1 - y0);
    return [lon0 + t * (lon1 - lon0), (2 * Math.atan(Math.exp(y)) - Math.PI / 2) / rad];
  });
  return { type: "LineString" as const, coordinates };
})();

function makeProjection(kind: "mercator" | "equal") {
  if (kind === "mercator") {
    // Width spans 360°; rows from about 85°N (so all of Greenland is drawn) to 60°S.
    const s = W / (2 * Math.PI);
    return geoMercator().scale(s).translate([W / 2, 166]).clipExtent([[0, 0], [W, H]]);
  }
  return geoEqualEarth().fitSize([W, H], { type: "Sphere" });
}
const PATHS = { mercator: geoPath(makeProjection("mercator")), equal: geoPath(makeProjection("equal")) };
const latText = (l: number) => (l === 0 ? "the equator" : `${l}°N`);

export default function MercatorGreenland({ slug }: { slug: string }) {
  const [south, setSouth] = useState(0);
  const [kind, setKind] = useState<"mercator" | "equal">("mercator");
  const greenland = country("Greenland")!;
  const congo = country("Dem. Rep. Congo")!;
  const startLat = Math.round(geoCentroid(greenland)[1]);
  const lat = startLat - south;
  const moved = useMemo(() => (south === 0 ? greenland : moveToLatitude(greenland, lat)), [greenland, lat, south]);
  const interactRef = useRef<() => void>(() => {});
  const { reach } = useMilestones(() => interactRef.current(), MILESTONES);
  const projection = useMemo(() => makeProjection(kind), [kind]);
  const path = useMemo(() => geoPath(projection), [projection]);

  // The ratio the readout prints, for any map and any slide (same rounding as the readout).
  const ratioAt = (k: "mercator" | "equal", sth: number) => {
    const shape = sth === 0 ? greenland : moveToLatitude(greenland, startLat - sth);
    return (PATHS[k].area(shape) / PATHS[k].area(congo)).toFixed(1);
  };
  const mapRatio = path.area(moved) / path.area(congo);
  // The question quotes what this lesson's own Mercator map draws at Greenland's real position.
  const startRatio = useMemo(() => Math.round(PATHS.mercator.area(greenland) / PATHS.mercator.area(congo)), [greenland, congo]);
  const startText = useMemo(() => (PATHS.mercator.area(greenland) / PATHS.mercator.area(congo)).toFixed(1), [greenland, congo]);

  // Recorded when each milestone fires; the stage keeps them on a Seen line and the reveal quotes them.
  const [seenEq, setSeenEq] = useState<{ lat: number; ratio: string } | null>(null);
  const [seenEqual, setSeenEqual] = useState<string | null>(null);

  const check = (k: "mercator" | "equal", sth: number) => {
    const l = startLat - sth;
    if (k === "mercator" && l <= NEAR_EQUATOR) {
      if (!seenEq) setSeenEq({ lat: l, ratio: ratioAt(k, sth) });
      reach("equator");
    }
    if (k === "equal") {
      if (!seenEqual) setSeenEqual(ratioAt(k, sth));
      reach("equal");
    }
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `On this map Greenland (blue) is drawn about ${startRatio} times the size of DR Congo (green). On the real Earth, how do their areas compare?`,
        options: [`Greenland about ${startRatio}× Congo`, "Greenland about 1× Congo", "Congo about 4× Greenland"],
        answer: 1,
      }}
      exploreHint="Slide Greenland to the equator, then try the equal-area map."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            They are about the same size, and Congo is slightly bigger: Greenland is about 2.17 million km², DR Congo
            about 2.34 million. Your Seen line: on Mercator the drawn ratio went from {startText}× at {startLat}°N to{" "}
            {seenEq?.ratio ?? "?"}× at {latText(seenEq?.lat ?? 0)}, and the equal-area map gave {seenEqual ?? "?"}×. The
            land never changed as you slid it; the map did. Every flat map is a <strong>projection</strong>, and Mercator
            stretches areas more the farther they are from the equator.
          </p>
          <p>
            Mercator was made for sailors: it keeps angles true, so the orange line of one compass bearing is straight on
            it and bent on the equal-area map, which keeps sizes true instead. No flat map can keep both.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        interactRef.current = interact;
        return (
        <div>
          <WorldMap
            projection={projection}
            width={W}
            height={H}
            highlight={["Dem. Rep. Congo"]}
            label={`World map, ${kind === "mercator" ? "Mercator" : "equal-area (Equal Earth)"} projection. Greenland moved ${south}° south, drawn ${mapRatio.toFixed(1)} times the size of DR Congo. An orange line of one compass bearing is ${kind === "mercator" ? "straight" : "bent"}.`}
          >
            {({ path: p, projection: proj }) => (
              <>
                <path d={p(EQUATOR)} fill="none" stroke="var(--fg)" strokeWidth={0.8} opacity={0.6} />
                {(() => {
                  const at = proj([-178, 0]);
                  return at ? (
                    <text x={at[0] + 2} y={at[1] - 3} fontSize={9} fill="var(--fg)" opacity={0.8}>
                      equator
                    </text>
                  ) : null;
                })()}
                <path d={p(RHUMB)} fill="none" stroke="#e08a00" strokeWidth={1.6} strokeDasharray="4 2" />
                {south > 0 && (
                  <path d={p(greenland)} fill="none" stroke="var(--fg)" strokeDasharray="2 2" strokeWidth={0.8} />
                )}
                <path d={p(moved)} fill="#3b82f6" fillOpacity={0.85} stroke="var(--fg)" strokeWidth={0.6} />
                <path d={p(congo)} fill="var(--good)" stroke="var(--fg)" strokeWidth={0.6} />
              </>
            )}
          </WorldMap>
          <Row>
            <Control
              disabled={locked || south === startLat}
              className={south === startLat ? "active" : ""}
              onClick={() => {
                setSouth(startLat);
                check(kind, startLat);
              }}
            >
              Slide to the equator
            </Control>
          </Row>
          <Row>
            <Slider
              label="Slide Greenland south"
              value={south}
              min={0}
              max={startLat}
              disabled={locked}
              format={(v) => (v === startLat ? "to the equator" : `${v}° (now ${startLat - v}°N)`)}
              onChange={(v) => {
                setSouth(v);
                check(kind, v);
              }}
            />
          </Row>
          <Row>
            <Readout label="On this map, Greenland ÷ Congo" value={`${mapRatio.toFixed(1)}×`} />
            <Control
              disabled={locked}
              className={kind === "equal" ? "active" : ""}
              onClick={() => {
                const next = kind === "mercator" ? "equal" : "mercator";
                setKind(next);
                check(next, south);
              }}
            >
              {kind === "mercator" ? "Show equal-area map" : "Show Mercator map"}
            </Control>
          </Row>
          <p className="muted tiny">
            {kind === "mercator" ? "Mercator" : "Equal-area (Equal Earth)"}. Orange: one compass bearing.
            {!locked && south > 0 ? " Dashed: where Greenland really is." : ""}
          </p>
          <p className="tiny" data-testid="seen">
            Seen: Mercator {startText}× at {startLat}°N
            {seenEq ? `, ${seenEq.ratio}× at ${latText(seenEq.lat)}` : ""}
            {seenEqual ? ` · equal-area ${seenEqual}×` : ""}
          </p>
        </div>
        );
      }}
    </Lesson>
  );
}
