"use client";

// An orthographic globe: the visible disc is exactly one hemisphere, centred where the learner
// points it. The readout gives the share of that half that is land, from a 2-degree land mask
// of the kit's 1:110m land polygon (mask.ts, precomputed), each cell weighted by cos(latitude).

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { WorldMap, geoOrthographic, world } from "@/kit/geo";
import { LAND_MASK_2DEG } from "./mask";
import s from "./styles.module.css";

const W = 320;
const H = 220;
const rad = Math.PI / 180;

type Cell = { x: number; y: number; z: number; w: number; land: boolean };
let CELLS: Cell[] | null = null;
function cells() {
  if (!CELLS) {
    const bin = atob(LAND_MASK_2DEG);
    CELLS = [];
    for (let a = 0; a < 90; a++)
      for (let o = 0; o < 180; o++) {
        const i = a * 180 + o;
        const la = (-89 + 2 * a) * rad;
        const lo = (-179 + 2 * o) * rad;
        CELLS.push({
          x: Math.cos(la) * Math.cos(lo),
          y: Math.cos(la) * Math.sin(lo),
          z: Math.sin(la),
          w: Math.cos(la),
          land: ((bin.charCodeAt(i >> 3) >> (i & 7)) & 1) === 1,
        });
      }
  }
  return CELLS;
}
/** Share of the hemisphere centred on (lat, lon) that is land. */
function landShare(lat: number, lon: number) {
  const x = Math.cos(lat * rad) * Math.cos(lon * rad);
  const y = Math.cos(lat * rad) * Math.sin(lon * rad);
  const z = Math.sin(lat * rad);
  let land = 0;
  let all = 0;
  for (const c of cells()) {
    if (c.x * x + c.y * y + c.z * z <= 0) continue;
    all += c.w;
    if (c.land) land += c.w;
  }
  return land / all;
}
function planetShare() {
  let land = 0;
  let all = 0;
  for (const c of cells()) {
    all += c.w;
    if (c.land) land += c.w;
  }
  return land / all;
}

// Best and worst centres from a build-time search of every 2-degree centre over this same mask.
const BEST = { name: "Western Europe", lat: 42, lon: 2 };
const WORST = { lat: -42, lon: -178 };
const CHIPS = [{ name: "North Pole", lat: 90, lon: 0 }, { name: "Mid-Pacific", lat: -10, lon: -150 }, { name: "Africa", lat: 0, lon: 20 }];
const TRIES_BEFORE_HELP = 3;
const ALL_LAND = world().countries.map((c) => c.properties.name);
const pct = (v: number) => `${Math.round(v * 100)}%`;
const fmtLat = (v: number) => `${Math.abs(v)}°${v > 0 ? "N" : v < 0 ? "S" : ""}`;
const fmtLon = (v: number) => `${Math.abs(v)}°${v > 0 ? "E" : v < 0 ? "W" : ""}`;

export default function LandHemisphere({ slug }: { slug: string }) {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(-30);
  const [best, setBest] = useState(0);
  const [low, setLow] = useState(1);
  const [tries, setTries] = useState(0);
  const [helped, setHelped] = useState(false);
  const projection = useMemo(() => geoOrthographic().rotate([-lon, -lat]).fitSize([W, H], { type: "Sphere" }), [lat, lon]);
  const share = useMemo(() => landShare(lat, lon), [lat, lon]);
  const facts = useMemo(
    () => ({ best: landShare(BEST.lat, BEST.lon), worst: landShare(WORST.lat, WORST.lon), planet: planetShare(), north: landShare(90, 0) }),
    [],
  );

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Pick the half of the globe with the most land. What share of that half is land?",
        options: ["About 90%", "Just under half", "About 29%, same as the whole planet"],
        answer: 1,
      }}
      exploreHint="Turn the globe to find the most land you can fit in one half."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            <strong>Just under half.</strong> A search of every possible centre on this map found the landiest half near{" "}
            {fmtLat(BEST.lat)}, {fmtLon(BEST.lon)}, in Western Europe, and it is still only {pct(facts.best)} land. The best half you found
            was {pct(best)}; the thinnest, {pct(low)}.
          </p>
          <p>
            The whole planet is {pct(facts.planet)} land, as the stage showed. However you cut it, every half of the Earth is mostly
            water.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["landy", "watery"]}>
          {(reach) => {
            const go = (la: number, lo: number) => {
              setLat(la);
              setLon(lo);
              const v = landShare(la, lo);
              setBest((b) => Math.max(b, v));
              setLow((b) => Math.min(b, v));
              setTries((n) => n + 1);
              if (v >= 0.38) reach("landy");
              if (v <= 0.25) reach("watery");
            };
            return (
              <div className={s.wrap}>
                <WorldMap
                  projection={projection}
                  width={W}
                  height={H}
                  highlight={ALL_LAND}
                  label={`Globe, orthographic projection, centred on ${fmtLat(lat)}, ${fmtLon(lon)}.${locked ? "" : ` This half is ${pct(share)} land.`}`}
                />
                <p className="muted tiny">The disc you see is exactly half the Earth. Blue: land. The globe turns; you look from the middle of the disc.</p>
                <div className={s.chips} role="group" aria-label="Centre the globe on">
                  {CHIPS.map((c) => (
                    <Control
                      key={c.name}
                      disabled={locked || (lat === c.lat && lon === c.lon)}
                      className={lat === c.lat && lon === c.lon ? "active" : ""}
                      onClick={() => go(c.lat, c.lon)}
                    >
                      {c.name}
                    </Control>
                  ))}
                </div>
                <Row>
                  <Slider label="Turn up/down (latitude)" value={lat} min={-90} max={90} step={2} disabled={locked} format={fmtLat} onChange={(v) => go(v, lon)} />
                  <Slider label="Turn left/right (longitude)" value={lon} min={-180} max={180} step={2} disabled={locked} format={fmtLon} onChange={(v) => go(lat, v)} />
                </Row>
                {!locked && <Row>
                  <Readout label="Land in this half" value={pct(share)} />
                  <Readout label="Most you found" value={locked || best === 0 ? "?" : pct(best)} />
                  <Readout label="Whole planet" value={pct(facts.planet)} />
                </Row>}
                {!locked && tries >= TRIES_BEFORE_HELP && (
                  <Row>
                    <Control
                      className={helped ? "active" : ""}
                      onClick={() => {
                        setHelped(true);
                        go(BEST.lat, BEST.lon);
                      }}
                    >
                      Stuck? Show the landiest half a computer found
                    </Control>
                  </Row>
                )}
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
