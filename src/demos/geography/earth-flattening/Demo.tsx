"use client";

// Not a map: the outline of a 30 cm desk globe built on the WGS84 ellipsoid, drawn over a faint
// perfect circle. The learner exaggerates the flattening (x1 to x100) and comes back to true
// scale, where the two outlines cannot be told apart. Readouts give the real and drawn gaps in mm.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const A_KM = 6378.137; // WGS84 semi-major axis
const F = 1 / 298.257223563; // WGS84 flattening
const B_KM = A_KM * (1 - F);
const GLOBE_MM = 300;
const GAP_MM = GLOBE_MM * F; // pole-to-pole diameter is shorter by this on a 30 cm globe
const rad = Math.PI / 180;

/** Distance from the Earth's centre to a point at geodetic latitude lat (deg) and height h (km). */
function fromCentre(lat: number, hKm: number) {
  const e2 = F * (2 - F);
  const sin = Math.sin(lat * rad);
  const N = A_KM / Math.sqrt(1 - e2 * sin * sin);
  const x = (N + hKm) * Math.cos(lat * rad);
  const z = (N * (1 - e2) + hKm) * sin;
  return Math.hypot(x, z);
}
// Summits: Chimborazo 1.469 S, 6,263 m; Everest 27.988 N, 8,849 m.
const CHIMBORAZO = fromCentre(-1.469, 6.263);
const EVEREST = fromCentre(27.988, 8.849);

const W = 320;
const H = 236;
const CX = 160;
const CY = 112;
const RX = 100; // px for 150 mm
const CHIPS = [100, 10, 1];

export default function EarthFlattening({ slug }: { slug: string }) {
  const [k, setK] = useState(1);
  const [peaks, setPeaks] = useState(false);
  const ry = RX * (1 - F * k);
  const drawnGap = GAP_MM * k;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Shrink the Earth to a 30 cm desk globe. How much shorter is its pole-to-pole diameter than its equator?",
        options: ["About 1 mm", "About 1 cm", "About 3 cm"],
        answer: 0,
      }}
      exploreHint="Squash it 100 times, go back to true scale and look, then compare the two summits."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            <strong>About {GAP_MM.toFixed(1)} mm.</strong> The Earth&rsquo;s polar diameter is{" "}
            {Math.round(2 * (A_KM - B_KM))} km shorter than its equatorial one, only {(F * 100).toFixed(2)}%. On a 30 cm globe
            that is thinner than a coin. At true scale you could not see it on the stage; the squashed diagrams in
            textbooks exaggerate it.
          </p>
          <p>
            Small, but not nothing: the equator bulges out about {Math.round(A_KM - B_KM)} km. That is why the summit
            farthest from the Earth&rsquo;s centre is Chimborazo in Ecuador, {CHIMBORAZO.toFixed(1)} km out, not Everest,
            at {EVEREST.toFixed(1)} km, even though Everest is higher above sea level.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["squashed", "true-scale", "peaks"]}>
          {(reach, reached) => {
            const set = (v: number) => {
              setK(v);
              if (v >= 10) reach("squashed");
              if (v === 1 && reached("squashed")) reach("true-scale");
            };
            return (
              <div className={s.wrap}>
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className="stage-svg"
                  role="img"
                  aria-label={`A 30 cm globe outline, flattening exaggerated ${k} times, over a perfect circle.`}
                >
                  <circle cx={CX} cy={CY} r={RX} className={s.circle} />
                  <ellipse cx={CX} cy={CY} rx={RX} ry={ry} className={s.earth} />
                  <line x1={CX} y1={CY - ry} x2={CX} y2={CY + ry} className={s.axis} />
                  <line x1={CX - RX} y1={CY} x2={CX + RX} y2={CY} className={s.axis} />
                  <text x={CX + 4} y={CY - ry + 12} className={s.small}>
                    N pole
                  </text>
                  <text x={CX + RX - 2} y={CY - 4} className={s.small} textAnchor="end">
                    equator
                  </text>
                  <text x={6} y={H - 6} className={s.small}>
                    Dashed: a perfect ball. Solid: the Earth&rsquo;s real shape, its squash multiplied by {k}.
                  </text>
                </svg>
                <div className={s.chips} role="group" aria-label="Exaggerate the flattening">
                  {CHIPS.map((c) => (
                    <Control key={c} disabled={locked || k === c} className={k === c ? "active" : ""} onClick={() => set(c)}>
                      {c === 1 ? "True scale ×1" : `×${c}`}
                    </Control>
                  ))}
                </div>
                <Row>
                  <Slider label="Exaggeration" value={k} min={1} max={100} disabled={locked} format={(v) => `×${v}`} onChange={set} />
                </Row>
                <Row>
                  <Readout label="Drawn: poles closer by" value={locked ? "?" : `${drawnGap.toFixed(1)} mm`} />
                  <Readout label="Real 30 cm globe" value={locked ? "?" : `${GAP_MM.toFixed(1)} mm`} />
                </Row>
                {!locked && <Row>
                  <Readout label="Real Earth: poles closer by" value={locked ? "?" : `${Math.round(2 * (A_KM - B_KM))} km (${(F * 100).toFixed(2)}%)`} />
                  <Readout label="Equator bulges out" value={locked ? "?" : `${Math.round(A_KM - B_KM)} km`} />
                </Row>}
                {!locked && <Row>
                  <Control
                    disabled={locked}
                    className={peaks ? "active" : ""}
                    onClick={() => {
                      setPeaks(true);
                      reach("peaks");
                    }}
                  >
                    Which summit is farthest from the centre?
                  </Control>
                </Row>}
                {peaks && !locked && (
                  <Row>
                    <Readout label="Chimborazo (6,263 m high)" value={`${CHIMBORAZO.toFixed(1)} km from the centre`} />
                    <Readout label="Everest (8,849 m high)" value={`${EVEREST.toFixed(1)} km from the centre`} />
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
