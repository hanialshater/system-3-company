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
const H = 200; // v5: rows to about 40°S (was 236 / 61.6°S) so the map fits beside the reveal on a phone
const EQ_H = 158; // Equal Earth is about 2.05:1, so at width W its oval is about this tall (no empty band below)
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
    // Width spans 360°; rows from about 86°N (so all of Greenland is drawn) to about 40°S.
    const s = W / (2 * Math.PI);
    return geoMercator().scale(s).translate([W / 2, 160]).clipExtent([[0, 0], [W, H]]);
  }
  return geoEqualEarth().fitSize([W, EQ_H], { type: "Sphere" });
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
            They are about the same size; Congo is slightly bigger (2.17 vs 2.34 million km²). On your Seen line, Mercator
            went from {startText}× at {startLat}°N to {seenEq?.ratio ?? "?"}× at {latText(seenEq?.lat ?? 0)}; equal-area
            gave {seenEqual ?? "?"}×. The land never changed; the map did. Mercator, a <strong>projection</strong>,
            stretches areas more the farther they are from the equator.
          </p>
          <p>
            Made for sailors, it keeps angles true: the orange compass-bearing line is straight on it, bent on the
            equal-area map. No flat map can keep both.
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
            height={kind === "mercator" ? H : EQ_H}
            highlight={["Dem. Rep. Congo"]}
            label={`World map, ${kind === "mercator" ? "Mercator" : "equal-area (Equal Earth)"} projection. Greenland moved ${south}° south, drawn ${mapRatio.toFixed(1)} times the size of DR Congo. An orange line of one compass bearing is ${kind === "mercator" ? "straight" : "bent"}.`}
          >
            {({ path: p, projection: proj }) => (
              <>
                <path d={p(EQUATOR)} fill="none" stroke="var(--fg)" strokeWidth={0.8} opacity={0.6} />
                {(() => {
                  const at = proj([-178, 0]);
                  return at ? (
                    <text x={at[0] + 2} y={at[1] - 3} fontSize={11} fill="var(--fg)" opacity={0.8}>
                      equator
                    </text>
                  ) : null;
                })()}
                <text x={4} y={kind === "mercator" ? H - 6 : 12} fontSize={11} fill="var(--fg)" opacity={0.85}>
                  {kind === "mercator" ? "Mercator" : "Equal-area"}
                </text>
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
              Slide to equator
            </Control>
            <Control
              disabled={locked}
              className={kind === "equal" ? "active" : ""}
              onClick={() => {
                const next = kind === "mercator" ? "equal" : "mercator";
                setKind(next);
                check(next, south);
              }}
            >
              {kind === "mercator" ? "Equal-area map" : "Mercator map"}
            </Control>
          </Row>
          <Row>
            <Slider
              label="Slide south"
              value={south}
              min={0}
              max={startLat}
              disabled={locked}
              format={(v) => (v === startLat ? "equator" : `${startLat - v}°N`)}
              onChange={(v) => {
                setSouth(v);
                check(kind, v);
              }}
            />
            <Readout label="Greenland ÷ Congo" value={`${mapRatio.toFixed(1)}×`} />
          </Row>
          <p className="muted tiny" style={{ margin: "6px 0 0" }}>
            Orange: one compass bearing.{!locked && south > 0 ? " Dashed: its true place." : ""}
          </p>
          <p className="tiny" data-testid="seen" style={{ margin: "2px 0 0" }}>
            Seen: Mercator {startText}× at {startLat}°N
            {seenEq ? `, ${seenEq.ratio}× at ${latText(seenEq.lat)}` : ""}
            {seenEqual ? `; equal-area ${seenEqual}×` : ""}
          </p>
        </div>
        );
      }}
    </Lesson>
  );
}
