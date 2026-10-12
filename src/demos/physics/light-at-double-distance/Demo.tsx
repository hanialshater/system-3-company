"use client";

// Light at double distance. A small lamp shines through a square opening, so its
// light fills a square beam that grows as it travels. The page is one tile: at
// 1 m the beam exactly covers it. Move the page back and the same light covers
// a d x d patch of tiles; the page catches 1 / d^2 of it.
//
// Physics: point source in empty space, no reflections; illuminance on a surface
// facing the source E = I / d^2 (inverse-square law). 100 lux at 1 m.
// Drawn in an oblique view: the beam runs left to right, each patch is a square
// standing across the beam. The reveal unlocks once the page has reached 2 m.

import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import { useState } from "react";
import s from "./styles.module.css";

const E1 = 100; // lux at 1 m
const W = 320;
const H = 186;
const SX = 22; // lamp
const SY = 92;
const KZ = 88; // px per metre along the beam
const KY = 40; // px per metre across the beam (vertical)
const SKEW_X = 0.42; // oblique: horizontal-across axis drawn slanted
const SKEW_Y = -0.3;

/** Screen point for a spot at distance z, across-beam offsets (u horizontal, v vertical), metres. */
const P = (z: number, u: number, v: number) => ({
  x: SX + z * KZ + u * SKEW_X * KY,
  y: SY - v * KY + u * SKEW_Y * KY,
});

function quad(z: number, u0: number, u1: number, v0: number, v1: number) {
  const a = P(z, u0, v0), b = P(z, u1, v0), c = P(z, u1, v1), d = P(z, u0, v1);
  return `M ${a.x} ${a.y} L ${b.x} ${b.y} L ${c.x} ${c.y} L ${d.x} ${d.y} Z`;
}

export default function LightAtDoubleDistance({ slug }: { slug: string }) {
  const [d, setD] = useState(1);
  const [seen2, setSeen2] = useState(false);
  const lux = E1 / (d * d);
  const h = d / 2; // half-width of the beam at distance d (1 m wide at 1 m)
  const tiles = d * d;

  // grid lines from the beam's edge, 1 m apart
  const lines: number[] = [];
  for (let g = -h + 1; g < h - 1e-9; g += 1) lines.push(g);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "A small lamp lights a page at 100 lux from 1 m away. Move the page to 2 m. How bright is it now?",
        options: ["50 lux", "25 lux", "12.5 lux"],
        answer: 1,
      }}
      exploreHint="Move the page to 2 m and count the squares. Then try 3 m."
      reveal={() => (
        <>
          <p>
            At 2 m the page got <strong>25 lux</strong>, a quarter. The beam is twice as wide and twice as tall there,
            so the same light covers 4 squares, and the page is still only one of them. At 3 m: 9 squares, about 11
            lux.
          </p>
          <p>
            Light spreads over an area that grows with the square of the distance. So brightness falls as one over
            distance squared: double the distance, a quarter of the light.
          </p>
          <p className="muted">This is the inverse-square law, for a small source with nothing reflecting.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const caption = locked
          ? "Make a prediction to start."
          : d === 1
            ? "The beam exactly covers the page at 1 m."
            : "Same light, spread over more squares. The page is one.";
        const corners = [
          [-h, -h],
          [h, -h],
          [h, h],
          [-h, h],
        ];
        return (
          <div className={s.wrap}>
            <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Page at ${d} metres receives ${lux.toFixed(1)} lux`}>
              {/* axis ticks */}
              {[1, 2, 3].map((m) => (
                <text key={m} x={SX + m * KZ} y={H - 4} textAnchor="middle" className={s.tick}>
                  {m} m
                </text>
              ))}
              {/* ghost frame at 1 m */}
              {d !== 1 && <path d={quad(1, -0.5, 0.5, -0.5, 0.5)} className={s.ghost} />}
              {/* beam edges */}
              {corners.map(([u, v], i) => {
                const p = P(d, u, v);
                return <line key={i} x1={SX} y1={SY} x2={p.x} y2={p.y} className={s.ray} />;
              })}
              {/* the patch of light at the page's distance */}
              <path d={quad(d, -h, h, -h, h)} className={s.patch} style={{ fillOpacity: 0.12 + 0.6 * (lux / E1) }} />
              {lines.map((g) => (
                <g key={g}>
                  <path d={`M ${P(d, g, -h).x} ${P(d, g, -h).y} L ${P(d, g, h).x} ${P(d, g, h).y}`} className={s.grid} />
                  <path d={`M ${P(d, -h, g).x} ${P(d, -h, g).y} L ${P(d, h, g).x} ${P(d, h, g).y}`} className={s.grid} />
                </g>
              ))}
              {/* the page: one tile, in the top-left corner of the patch */}
              <path d={quad(d, -h, -h + 1, h - 1, h)} className={s.page} style={{ fillOpacity: 0.1 + 0.8 * (lux / E1) }} />
              <text x={P(d, -h + 0.5, h).x} y={P(d, -h + 0.5, h).y - 5} textAnchor="middle" className={s.pageText}>
                page
              </text>
              {/* lamp */}
              <circle cx={SX} cy={SY} r={7} className={s.lamp} />
            </svg>

            <p className={s.caption} aria-live="polite">
              {caption}
            </p>

            <Slider
              label="Page distance"
              value={d}
              min={1}
              max={3}
              step={0.5}
              disabled={locked}
              format={(v) => `${v} m`}
              onChange={(v) => {
                setD(v);
                if (seen2 || v === 2) {
                  setSeen2(true);
                  interact();
                }
              }}
            />
            <Row>
              <Readout label="Light spread over" value={`${tiles % 1 === 0 ? tiles : tiles.toFixed(2)} ${tiles === 1 ? "square" : "squares"}`} />
              <Readout label="Page brightness" value={`${lux % 1 === 0 ? lux : lux.toFixed(1)} lux`} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
