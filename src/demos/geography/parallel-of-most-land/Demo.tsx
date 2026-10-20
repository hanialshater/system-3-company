"use client";

// Walk once around the world along a parallel (a line of latitude) and see how much of the walk is
// over land. Shares and land runs come from parallels.json, precomputed by gen.mjs from the kit's
// 1:110m land polygon (3,600 samples per parallel). Key state: 65°N (the answer option)
// and a southern one (40–60°S) have both been visited.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { WorldMap, geoEquirectangular } from "@/kit/geo";
import table from "./parallels.json";
import s from "./styles.module.css";

const W = 320;
const H = 160;
type Row_ = { lat: number; share: number; runs: [number, number][] };
const ROWS = table.rows as Row_[];
const rowAt = (lat: number) => ROWS.find((r) => r.lat === lat)!;
const pct = (lat: number) => Math.round(rowAt(lat).share * 100);
const name = (lat: number) => (lat === 0 ? "the equator" : `${Math.abs(lat)}°${lat > 0 ? "N" : "S"}`);
const PRESETS = [0, 40, 65, -60];

const projection = geoEquirectangular().scale(W / (2 * Math.PI)).translate([W / 2, H / 2]);
const xy = (lon: number, lat: number) => projection([lon, lat])!;

export default function ParallelOfMostLand({ slug }: { slug: string }) {
  const [lat, setLat] = useState(20);
  const [seen, setSeen] = useState<number[]>([]);
  const row = rowAt(lat);
  const y = xy(0, lat)[1];
  const seenPresets = PRESETS.filter((p) => seen.includes(p));
  const south = seen.filter((l) => l <= -40 && l >= -60).slice(0, 2);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A parallel is a line of latitude. You walk once around the world along one. On which of these is the largest share of your walk over land?",
        options: ["The equator", "40°N", "65°N"],
        answer: 2,
      }}
      exploreHint="Try 65°N, then the far south, and watch the land share."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            <strong>Of the three, 65°N</strong>: {pct(65)}% of that walk crosses land, through Russia, Canada, Alaska, Greenland,
            Iceland, Scandinavia and Finland.
            {seenPresets.includes(0) && ` The equator was ${pct(0)}%`}
            {seenPresets.includes(40) && `${seenPresets.includes(0) ? "," : " The"} 40°N ${pct(40)}%`}
            {(seenPresets.includes(0) || seenPresets.includes(40)) && "."}
          </p>
          <p>
            Land and sea are not mixed evenly. Most land sits in the north. Between 40°S and 60°S a walk is almost all sea
            {south.length > 0 ? ` (you saw ${south.map((l) => `${name(l)}: ${pct(l)}%`).join(", ")})` : ""}, until Antarctica fills the parallels
            near the South Pole.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["far-north", "south"]}>
          {(reach) => {
            const go = (l: number) => {
              setLat(l);
              if (!seen.includes(l)) setSeen([...seen, l]);
              if (l === 65) reach("far-north");
              if (l <= -40 && l >= -60) reach("south");
            };
            return (
              <div className={s.wrap}>
                <WorldMap
                  projection={projection}
                  width={W}
                  height={H}
                  label={`World map, equirectangular. The parallel at ${name(lat)} is drawn${locked ? "" : `; ${Math.round(row.share * 100)}% of it is over land`}.`}
                >
                  {() => (
                    <>
                      <line x1={0} y1={y} x2={W} y2={y} className={s.sea} />
                      {!locked &&
                        row.runs.map(([a, b], i) => <line key={i} x1={xy(a, lat)[0]} y1={y} x2={xy(b, lat)[0]} y2={y} className={s.land} />)}
                      <text x={4} y={y < 20 ? y + 12 : y - 4} className={s.lab}>
                        {name(lat)}
                      </text>
                    </>
                  )}
                </WorldMap>
                <Row>
                  {PRESETS.map((p) => (
                    <Control key={p} disabled={locked} className={lat === p ? "active" : ""} onClick={() => go(p)}>
                      {p === 0 ? "Equator" : name(p)}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Slider
                    label="Parallel"
                    value={lat}
                    min={-80}
                    max={80}
                    disabled={locked}
                    format={(v) => (v === 0 ? "equator" : `${Math.abs(v)}°${v > 0 ? "N" : "S"}`)}
                    onChange={go}
                  />
                </Row>
                <Row>
                  <Readout label="Walk over land" value={locked ? "?" : `${Math.round(row.share * 100)}%`} />
                  <p className={s.note}>Equirectangular map. Thick yellow: land. Dashed: sea.</p>
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
