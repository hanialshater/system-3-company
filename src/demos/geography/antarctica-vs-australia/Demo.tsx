"use client";

// Geography: Antarctica against Australia, in Mercator and Equal Earth. Australia can be slid onto
// Antarctica by a rigid rotation on the sphere (kit moveToLatitude), so its true area never changes.
// The question's "about 30 times" and the readout come from the same projection and path.area().
// Key state: Australia has been put on Antarctica on the Mercator map AND on the Equal Earth map.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { WorldMap, country, geoEqualEarth, geoMercator, geoPath, moveToLatitude } from "@/kit/geo";

const W = 320;
const H = 168;
const MILESTONES = ["on-mercator", "on-equal"] as const;
const TARGET_LAT = -72;
type Kind = "mercator" | "equal";

function makeProjection(kind: Kind) {
  if (kind === "mercator") {
    // Equator 8 px from the top; the map stops where the bottom edge reaches 85°S.
    return geoMercator().scale(W / (2 * Math.PI)).translate([W / 2, 8]).clipExtent([[0, 0], [W, H]]);
  }
  return geoEqualEarth().fitExtent([[0, 0], [W, H]], { type: "Sphere" });
}

function Stage({ locked, reach }: { locked: boolean; reach: (n: string) => void }) {
  const [kind, setKind] = useState<Kind>("mercator");
  const [moved, setMoved] = useState(false);
  const antarctica = country("Antarctica")!;
  const australia = country("Australia")!;
  const projection = useMemo(() => makeProjection(kind), [kind]);
  const shape = useMemo(() => (moved ? moveToLatitude(australia, TARGET_LAT) : australia), [moved, australia]);
  const ratio = useMemo(() => {
    const p = geoPath(projection);
    return p.area(antarctica) / p.area(shape);
  }, [projection, shape, antarctica]);
  const look = (m: boolean, k: Kind) => {
    if (m) reach(k === "mercator" ? "on-mercator" : "on-equal");
  };
  return (
    <div>
      <WorldMap
        projection={projection}
        width={W}
        height={H}
        label={`${kind === "mercator" ? "Mercator" : "Equal Earth"} world map. Antarctica is drawn ${ratio.toFixed(1)} times the area of Australia${moved ? ", which has been moved onto it" : ""}.`}
      >
        {({ path }) => (
          <>
            <path d={path(antarctica)} fill="var(--good)" fillOpacity={0.85} stroke="var(--fg)" strokeWidth={0.6} />
            {moved && <path d={path(australia)} fill="none" stroke="var(--fg)" strokeDasharray="2 2" strokeWidth={0.8} />}
            <path d={path(shape)} fill="#3b82f6" fillOpacity={0.8} stroke="var(--fg)" strokeWidth={0.6} />
          </>
        )}
      </WorldMap>
      <p className="muted tiny">
        {kind === "mercator" ? "Mercator map, stops at 85°S." : "Equal Earth map."} Australia blue, Antarctica green.
      </p>
      <Row>
        <Control
          disabled={locked}
          className={moved ? "active" : ""}
          onClick={() => {
            const m = !moved;
            setMoved(m);
            look(m, kind);
          }}
        >
          {moved ? "Move Australia back" : "Put Australia on Antarctica"}
        </Control>
        <Control
          disabled={locked}
          className={kind === "equal" ? "active" : ""}
          onClick={() => {
            const k: Kind = kind === "mercator" ? "equal" : "mercator";
            setKind(k);
            look(moved, k);
          }}
        >
          {kind === "mercator" ? "Show Equal Earth map" : "Show Mercator map"}
        </Control>
      </Row>
      <Row>
        <Readout label="On this map, Antarctica ÷ Australia" value={`${ratio.toFixed(1)}×`} />
      </Row>
    </div>
  );
}

const startRatio = (() => {
  const p = geoPath(makeProjection("mercator"));
  return p.area(country("Antarctica")!) / p.area(country("Australia")!);
})();
const trueRatio = (() => {
  const p = geoPath(makeProjection("equal"));
  return p.area(country("Antarctica")!) / p.area(country("Australia")!);
})();

export default function AntarcticaVsAustralia({ slug }: { slug: string }) {
  const drawn = Math.round(startRatio / 5) * 5;
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `On this Mercator wall map, Antarctica (green) is drawn about ${drawn} times the area of Australia (blue). On the real Earth, how many Australias fit in Antarctica?`,
        options: [`About ${drawn}, as drawn`, "Under 2", "About 4"],
        answer: 1,
      }}
      exploreHint="Put Australia on Antarctica, then switch to the Equal Earth map."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Under 2. On the Equal Earth map, which keeps areas true, Antarctica is {trueRatio.toFixed(1)} times
            Australia, wherever you put Australia. Mercator drew it {drawn} times, and still had to stop at 85°S: it cannot show the pole.
          </p>
          <p>
            This map&rsquo;s coastline leaves out ice shelves. With them, published areas of about 14.2 and 7.69 million
            km² give about 1.8.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => <Stage locked={locked} reach={reach} />}
        </Milestones>
      )}
    </Lesson>
  );
}
