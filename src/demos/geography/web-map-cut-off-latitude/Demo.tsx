"use client";

// A square Mercator world map (the Web Mercator tile square) has to stop somewhere. The learner
// moves the cut-off latitude north and south; the map's height grows as ψ(L) = ln tan(45° + L/2)
// and equals its width at L = atan(sinh π) = 85.05°. Beyond that, a square leaves the rest off.
// Key state: the cut set to 85.05° (the map fills the square) and a cut beyond it seen.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { WorldMap, geoMercator } from "@/kit/geo";
import s from "./styles.module.css";

const W = 320;
const H = 320;
const MW = 200;
const X0 = (W - MW) / 2;
const CY = H / 2;
const RAD = Math.PI / 180;
const SQUARE_LAT = Math.atan(Math.sinh(Math.PI)) / RAD; // 85.0511…
const CUTS = [75, 80, SQUARE_LAT, 89, 90];
const psi = (lat: number) => Math.log(Math.tan(Math.PI / 4 + (lat * RAD) / 2));
const ratio = (lat: number) => (lat >= 90 ? Infinity : psi(lat) / Math.PI);
const fmtLat = (lat: number) => (Math.abs(lat - SQUARE_LAT) < 1e-9 ? SQUARE_LAT.toFixed(2) : String(lat));
const fmtRatio = (r: number) => (r === Infinity ? "endless" : `${r.toFixed(2)}`);

export default function WebMapCutOffLatitude({ slug }: { slug: string }) {
  const [cut, setCut] = useState(60);
  const [seenBeyond, setSeenBeyond] = useState<number[]>([]);
  const scale = MW / (2 * Math.PI);
  const yOf = (lat: number) => CY - scale * psi(Math.min(lat, 89.999));
  const top = Math.max(0, yOf(cut));
  const bottom = H - top;
  const projection = useMemo(
    () => geoMercator().scale(MW / (2 * Math.PI)).translate([W / 2, CY]).clipExtent([[X0, Math.max(0, CY - (MW / (2 * Math.PI)) * psi(Math.min(cut, 89.999)))], [X0 + MW, Math.min(H, CY + (MW / (2 * Math.PI)) * psi(Math.min(cut, 89.999)))]]),
    [cut],
  );
  const sqTop = CY - MW / 2;
  const sqBottom = CY + MW / 2;
  const r89 = ratio(89);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Standard web map tiles draw the whole world as one square Mercator map. Scrolling north on your phone, how far north can you go before you hit the square's edge?",
        options: ["75°N", "85°N", "90°N, the North Pole"],
        answer: 1,
      }}
      exploreHint="Move the cut north until the map fills the square, then go further."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            <strong>About 85°N: {SQUARE_LAT.toFixed(2)}°.</strong> Mercator stretches north&ndash;south distances more and more toward the
            poles, so its height has no limit
            {seenBeyond.includes(89) ? `: cut at 89° you saw it ${r89.toFixed(2)} times as tall as wide` : ""}
            {seenBeyond.includes(90) ? ", and at the pole it never ends" : ""}.
          </p>
          <p>
            A square must stop where height equals width, at {SQUARE_LAT.toFixed(2)}° north and south. Everything closer to the poles is
            simply left off the map.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["square", "beyond"]}>
          {(reach) => {
            const go = (lat: number) => {
              setCut(lat);
              if (lat === SQUARE_LAT) reach("square");
              if (lat > SQUARE_LAT) {
                reach("beyond");
                if (!seenBeyond.includes(lat)) setSeenBeyond([...seenBeyond, lat]);
              }
            };
            return (
              <div className={s.wrap}>
                <WorldMap
                  projection={projection}
                  width={W}
                  height={H}
                  label={`Mercator world map cut at ${fmtLat(cut)}° north and south; height is ${fmtRatio(ratio(cut))} times the width.`}
                >
                  {() => (
                    <>
                      {cut > SQUARE_LAT && (
                        <>
                          <rect x={X0} y={top} width={MW} height={sqTop - top} className={s.cut} />
                          <rect x={X0} y={sqBottom} width={MW} height={bottom - sqBottom} className={s.cut} />
                        </>
                      )}
                      <rect x={X0} y={sqTop} width={MW} height={MW} className={s.frame} />
                      <line x1={X0} y1={top} x2={X0 + MW} y2={top} className={s.edge} />
                      <line x1={X0} y1={bottom} x2={X0 + MW} y2={bottom} className={s.edge} />
                      <text x={X0 + MW + 4} y={sqTop + 10} className={s.lab}>
                        square
                      </text>
                      <text x={4} y={top > 14 ? top - 3 : 12} className={s.lab}>
                        {cut >= 90 ? "never ends ↑" : `${fmtLat(cut)}°N`}
                      </text>
                      <text x={4} y={H - 4} className={s.lab}>
                        Mercator map
                      </text>
                    </>
                  )}
                </WorldMap>
                <Row>
                  {CUTS.map((c, i) => (
                    <Control key={c} disabled={locked} className={cut === c ? "active" : ""} onClick={() => go(c)}>
                      {locked ? `Cut ${i + 1}` : c >= 90 ? "To the pole" : `${fmtLat(c)}°`}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Readout label="Height ÷ width" value={locked ? "?" : fmtRatio(ratio(cut))} />
                  <p className={s.note}>Cut at the same latitude north and south. Shaded: outside the square.</p>
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
