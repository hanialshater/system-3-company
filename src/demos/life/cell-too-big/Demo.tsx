"use client";

// A cube-shaped cell of width w (in made-up units). Surface = 6w^2, inside =
// w^3, surface per unit of inside = 6/w. The cube is drawn in isometric view
// with its unit squares visible; its shade is the surface per unit of inside,
// relative to the width-1 cell (full colour = 6). Deterministic.

import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const U = 14.5; // svg units per cell unit
const C30 = Math.cos(Math.PI / 6);

function ratio(w: number) {
  const r = 6 / w;
  return Number.isInteger(r) ? String(r) : r.toFixed(2).replace(/0$/, "");
}

export default function CellTooBig({ slug }: { slug: string }) {
  const [w, setW] = useState(1);
  const hit = useRef(new Set<string>());

  const cy = 300 - w * U;
  const P = (x: number, y: number, z: number) => [150 + (x - y) * C30 * U, cy + (x + y) * 0.5 * U - z * U];
  const poly = (pts: number[][]) => pts.map((p) => p.map((v) => v.toFixed(1)).join(",")).join(" ");
  const top = [P(0, 0, w), P(w, 0, w), P(w, w, w), P(0, w, w)];
  const right = [P(w, 0, 0), P(w, w, 0), P(w, w, w), P(w, 0, w)];
  const left = [P(0, w, 0), P(w, w, 0), P(w, w, w), P(0, w, w)];
  const lines: number[][][] = [];
  for (let i = 1; i < w; i++) {
    lines.push([P(i, 0, w), P(i, w, w)], [P(0, i, w), P(w, i, w)]); // top
    lines.push([P(w, i, 0), P(w, i, w)], [P(w, 0, i), P(w, w, i)]); // right
    lines.push([P(i, w, 0), P(i, w, w)], [P(0, w, i), P(w, w, i)]); // left
  }
  const shade = Math.max(0.06, 1 / w);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A cube-shaped cell grows from 1 unit wide to 10 units wide. Its surface per unit of volume (skin per bit of inside) becomes…",
        options: ["10 times larger", "the same", "10 times smaller"],
        answer: 2,
      }}
      exploreHint="Grow the cell to 10 wide, stopping on the way to read the numbers."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            At width 1: 6 squares of surface for 1 cube of inside, a ratio of 6. At width 10: 600 squares for 1,000
            cubes, a ratio of 0.6. Surface per unit of inside became <strong>10 times smaller</strong>.
          </p>
          <p>
            Surface grows with width squared, the inside with width cubed, so the ratio is 6 &divide; width. Food and
            waste cross a cell&rsquo;s surface, so a big cell&rsquo;s inside goes short. That is one reason cells stay small,
            or fold and flatten their surfaces.
          </p>
          <p className="muted">
            Real cells are not cubes, but any shape scaled up evenly loses surface per volume in proportion to its size.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const go = (v: number) => {
          setW(v);
          const mark = (k: string) => {
            if (!hit.current.has(k)) {
              hit.current.add(k);
              interact();
            }
          };
          if (v === 10) mark("ten");
          if (v > 1 && v < 10) mark("mid");
        };
        return (
          <div className={s.wrap}>
            <svg viewBox="0 0 300 305" className={`stage-svg ${s.svg}`} role="img" aria-label={`Cell ${w} wide: surface per unit of inside ${ratio(w)}`}>
              <polygon points={poly(top)} className={s.face} style={{ fillOpacity: shade }} />
              <polygon points={poly(left)} className={s.face} style={{ fillOpacity: shade * 0.8 }} />
              <polygon points={poly(right)} className={s.face} style={{ fillOpacity: shade * 0.62 }} />
              {lines.map(([a, b], i) => (
                <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} className={s.grid} />
              ))}
              <polygon points={poly(top)} className={s.edge} />
              <polygon points={poly(left)} className={s.edge} />
              <polygon points={poly(right)} className={s.edge} />
            </svg>

            <p className={s.msg} aria-live="polite">
              {locked
                ? "Make a prediction to start. Food enters a cell through its surface."
                : `${w} wide: ${6 * w * w} squares of surface feed ${(w ** 3).toLocaleString("en-US")} cubes inside. Shade = surface per cube.`}
            </p>

            <Slider label="Width" value={w} min={1} max={10} disabled={locked} format={(v) => `${v} unit${v === 1 ? "" : "s"}`} onChange={go} />
            <Row>
              <Control className={s.chip} disabled={locked || w === 1} onClick={() => go(1)}>
                1 wide
              </Control>
              <Control className={s.chip} disabled={locked || w === 10} onClick={() => go(10)}>
                10 wide
              </Control>
              <Readout label="Surface" value={6 * w * w} />
              <Readout label="Inside" value={(w ** 3).toLocaleString("en-US")} />
              <Readout label="Surface ÷ inside" value={locked ? "?" : ratio(w)} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
