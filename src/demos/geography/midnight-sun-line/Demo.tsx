"use client";

// An orthographic globe on the June solstice, seen from above 60 N and from the night side. The
// Sun is fixed; the hour slider spins the Earth under it. The night side is a 90-degree circle
// centred on the antisolar point. The learner moves a town (on longitude 0) north and south; the
// readouts say whether its Sun sets and how long its day is.
// Model: geometric centre of the Sun, spherical airless Earth, declination 23.44 N.
// v3: after the lock, the globe marks the pole and the gap between the night edge and the pole along the
// midnight meridian ("23.4° gap = tilt"), so 90 − 23.4 can be read off the picture; the reveal quotes the
// highest latitude the learner saw a sunset at and the lowest they saw none at.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { WorldMap, geoCircle, geoDistance, geoOrthographic } from "@/kit/geo";
import s from "./styles.module.css";

type Pt = [number, number];
const W = 320;
const H = 220;
const DEC = 23.44;
const rad = Math.PI / 180;
const LINE = 90 - DEC; // where the night circle stops reaching at midnight
const CHIPS = [65, 70, 80];
const START_LAT = 60;

const dayHours = (lat: number) => {
  const c = -Math.tan(lat * rad) * Math.tan(DEC * rad);
  return c <= -1 ? 24 : c >= 1 ? 0 : (2 * Math.acos(c)) / rad / 15;
};
const fmtLat = (v: number) => `${v.toFixed(1)}°N`;
const fmtHour = (h: number) => `${String(Math.floor(h) % 24).padStart(2, "0")}:${h % 1 ? "30" : "00"}`;
const fmtDay = (h: number) => (h >= 24 ? "24 h" : `${Math.floor(h)} h ${String(Math.round((h % 1) * 60)).padStart(2, "0")} min`);

export default function MidnightSunLine({ slug }: { slug: string }) {
  const [lat, setLat] = useState(START_LAT);
  const [hour, setHour] = useState(0);
  const [seen, setSeen] = useState<{ sets: number | null; never: number | null }>({ sets: null, never: null });
  const sunLon = (12 - hour) * 15;
  const antiLon = sunLon + 180;
  const projection = useMemo(() => geoOrthographic().rotate([-antiLon, -60]).fitSize([W, H], { type: "Sphere" }), [antiLon]);
  const night = useMemo(() => geoCircle().center([antiLon, -DEC]).radius(90)(), [antiLon]);
  const parallel = useMemo(
    () => ({ type: "LineString" as const, coordinates: Array.from({ length: 73 }, (_, i) => [i * 5 - 180, lat] as Pt) }),
    [lat],
  );
  const town: Pt = [0, lat];
  const lit = geoDistance(town, [sunLon, DEC]) < Math.PI / 2;
  const hours = dayHours(lat);
  const p = projection(town);
  const gap = useMemo(
    () => ({ type: "LineString" as const, coordinates: Array.from({ length: 13 }, (_, i) => [antiLon, LINE + (i * (90 - LINE)) / 12] as Pt) }),
    [antiLon],
  );
  const pole = projection([0, 90]);
  const gapMid = projection([antiLon, (LINE + 90) / 2]);
  const strip = Array.from({ length: 24 }, (_, h) => geoDistance(town, [(12 - h) * 15, DEC]) < Math.PI / 2);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "June 21 is the longest day in the north. A town's latitude is how far north of the equator it is. From what latitude northward does the Sun not set at all that day?",
        options: ["66.6°N", "23.4°N", "80°N"],
        answer: 0,
      }}
      exploreHint="Move the town north and watch its day strip. Find where the dark ends."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Your town still saw a sunset at {seen.sets !== null ? fmtLat(seen.sets) : "the south end"} and none at{" "}
            {seen.never !== null ? fmtLat(seen.never) : "the north end"}. The line between is about{" "}
            <strong>{fmtLat(LINE)}</strong>: 90° minus the tilt, 90 − {DEC.toFixed(1)}.
          </p>
          <p>
            Look at the orange gap on the globe. In June the north pole leans {DEC.toFixed(1)}° toward the Sun, so the
            night side&rsquo;s edge stops {DEC.toFixed(1)}° short of the pole. A town whose circle fits inside that gap
            stays in the light all the way round. This line is the Arctic Circle. 23.4°N is the Tropic of Cancer, where the Sun is overhead at noon, not where it stops setting. This model has no air: in reality, air bends sunlight and the Sun is a
            disc, so the midnight Sun can be seen a little south of the line.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["sets", "never"]}>
          {(reach) => {
            const moveLat = (v: number) => {
              setLat(v);
              const never = dayHours(v) >= 24;
              setSeen((p) =>
                never
                  ? { ...p, never: p.never === null ? v : Math.min(p.never, v) }
                  : { ...p, sets: p.sets === null ? v : Math.max(p.sets, v) },
              );
              if (never) reach("never");
              else reach("sets");
            };
            return (
              <div className={s.wrap}>
                <WorldMap
                  projection={projection}
                  width={W}
                  height={H}
                  label={`Globe on the June solstice at ${fmtHour(hour)} at the town. Town at ${fmtLat(lat)}, ${lit ? "in sunlight" : "in darkness"}.`}
                >
                  {({ path }) => (
                    <>
                      <path d={path(night)} className={s.night} />
                      <path d={path(parallel)} className={s.parallel} />
                      {!locked && <path d={path(gap)} className={s.gap} />}
                      {!locked && pole && <circle cx={pole[0]} cy={pole[1]} r={3} className={s.pole} />}
                      {!locked && pole && (
                        <text x={pole[0]} y={pole[1] - 6} textAnchor="middle" className={s.gapText}>
                          pole
                        </text>
                      )}
                      {!locked && gapMid && (
                        <text x={gapMid[0] + 8} y={gapMid[1] + 3} className={s.gapText}>
                          {DEC.toFixed(1)}° gap = tilt
                        </text>
                      )}
                      {p && <circle cx={p[0]} cy={p[1]} r={6} className={lit ? s.townLit : s.townDark} />}
                    </>
                  )}
                </WorldMap>
                <p className="muted tiny">Shaded: night. Dot: the town; the clock spins it round the blue circle. Orange: night edge to pole. Toy: no air.</p>
                <svg viewBox="0 0 320 30" className="stage-svg" role="img" aria-label={locked ? "Day strip" : `Town's 24 hours: ${strip.filter(Boolean).length} lit`} style={{ flex: "0 0 auto", height: 30 }}>
                  {strip.map((on, h) => (
                    <rect key={h} x={8 + h * 12.9} y={4} width={12} height={14} fill={on && !locked ? "#f5c542" : "var(--bg-2)"} stroke="var(--line)" strokeWidth={0.5} />
                  ))}
                  <text x={8} y={28} className="muted" fontSize={8} fill="var(--muted)">midnight</text>
                  <text x={164} y={28} textAnchor="middle" fontSize={8} fill="var(--muted)">noon</text>
                  <text x={312} y={28} textAnchor="end" fontSize={8} fill="var(--muted)">midnight · yellow = Sun up</text>
                </svg>
                <div className={s.chips} role="group" aria-label="Move the town">
                  {CHIPS.map((c) => (
                    <Control key={c} disabled={locked || lat === c} className={lat === c ? "active" : ""} onClick={() => moveLat(c)}>
                      {fmtLat(c)}
                    </Control>
                  ))}
                </div>
                <Row>
                  <Slider label="Town latitude" value={lat} min={50} max={85} step={0.1} disabled={locked} format={fmtLat} onChange={moveLat} />
                  <Slider label="Time at the town" value={hour} min={0} max={24} step={0.5} disabled={locked} format={fmtHour} onChange={setHour} />
                </Row>
                <Row>
                  <Readout label="Daylight" value={locked ? "?" : fmtDay(hours)} />
                  <Readout label="Sun sets?" value={locked ? "?" : hours >= 24 ? "No" : "Yes"} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
