"use client";

// Lightness perception (Big Ideas brief #8, perception-inference-shadow, with the W-537 re-check lines that
// override the draft). An original checkerboard with a green cylinder whose shadow falls on the lower right.
// Square A is a dark square in the light; square B is a light square in the shadow. Both are painted from ONE
// constant, SAME (#787878 = brightness 120 of 255), which is not a theme variable, so it is identical in light
// and dark mode. Shading model: light squares 210, dark squares 120 in the light. The shadow is a black layer at
// opacity 3/7 with a blurred edge, so in its core light squares become 120 and dark ones about 69. B is drawn again
// on top of the shadow from SAME, so its pixel value is exactly 120 by construction, not by compositing.
// Presets (DOM order = QA order): Sample A / Sample B (milestone sampled after both; the readout prints the value
// as text, the non-visual path) / Connect them (a strip of SAME between A and B) / Remove the shadow (cylinder and
// shadow gone, A and B keep their paint; milestone noshadow) / Reset. Samples are records and survive Reset.
// Copyright: our own drawing, after a well-known checker-shadow illusion (caption; claim c2). Not traced.

import { useId, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const SAME = "#787878"; // brightness 120: square A, square B and the strip all use this one constant
const SAME_VALUE = parseInt(SAME.slice(1, 3), 16); // 120
const LIGHT_LIT = "#d2d2d2"; // 210
const SHADOW_OPACITY = 3 / 7; // 210 x 4/7 = 120
const N = 5;
const CELL = 36;
const BX = 22;
const BY = 30;
const A: [number, number] = [1, 0]; // row, col: a dark square in the light
const B: [number, number] = [3, 3]; // a light square in the shadow

const isLight = (r: number, c: number) => (r + c) % 2 === 0;
const same = (p: [number, number], r: number, c: number) => p[0] === r && p[1] === c;
function fill(r: number, c: number) {
  if (same(A, r, c) || same(B, r, c)) return SAME;
  return isLight(r, c) ? LIGHT_LIT : SAME;
}
const centre = (p: [number, number]): [number, number] => [BX + p[1] * CELL + CELL / 2, BY + p[0] * CELL + CELL / 2];

export default function SameGreyInShadow({ slug }: { slug: string }) {
  const [sampledA, setSampledA] = useState<number | null>(null);
  const [sampledB, setSampledB] = useState<number | null>(null);
  const [strip, setStrip] = useState(false);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [shadow, setShadow] = useState(true);

  const v = sampledB ?? sampledA ?? SAME_VALUE;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Square A, in the light, looks dark. Square B, in the shadow, looks light. On the screen, which square is darker?",
        options: ["A is darker", "B is darker", "Neither is darker"],
        answer: 2,
      }}
      exploreHint="Sample both squares, then remove the shadow."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Your sampler read {v} on both squares: the same grey. Your eyes judged B lighter than the light it sends: the
            difference came from you, not the screen.
          </p>
          <p>
            That is a guess about the world. Hermann von Helmholtz called perception “unconscious inference”.
          </p>
          <p>
            Where it stops: the light you see is lighting times how much the surface reflects. A shadowed square sending the
            same light really is lighter, so in a real scene the guess is usually right.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["sampled", "noshadow"]}>
          {(reach) => {
            const sample = (which: "A" | "B") => {
              if (locked) return;
              const a = which === "A" ? SAME_VALUE : sampledA;
              const b = which === "B" ? SAME_VALUE : sampledB;
              if (which === "A") setSampledA(SAME_VALUE);
              else setSampledB(SAME_VALUE);
              if (a !== null && b !== null) reach("sampled");
            };
            const toggleShadow = () => {
              if (locked) return;
              const next = !shadow;
              setShadow(next);
              if (!next) reach("noshadow");
            };
            const reset = () => {
              if (locked) return;
              setShadow(true);
              setStrip(false);
            };
            const [ax, ay] = centre(A);
            const [bx, by] = centre(B);
            const label = (p: [number, number], t: string) => {
              const [x, y] = centre(p);
              return (
                <text x={x} y={y + 6} textAnchor="middle" className={s.sq}>
                  {t}
                </text>
              );
            };
            const ring = (p: [number, number]) => {
              const [x, y] = centre(p);
              return (
                <rect
                  x={x - CELL / 2 + 1.5}
                  y={y - CELL / 2 + 1.5}
                  width={CELL - 3}
                  height={CELL - 3}
                  fill="none"
                  stroke="#ff3b8d"
                  strokeWidth={2}
                />
              );
            };
            const read = (x: number | null) => (x === null ? "?" : String(x));
            return (
              <div className={s.wrap}>
                <svg
                  viewBox="0 0 224 216"
                  className={`stage-svg ${s.board}`}
                  role="img"
                  aria-label={`Checkerboard${shadow ? " with a cylinder casting a shadow" : ", no shadow"}. Square A reads ${read(sampledA)}, square B reads ${read(sampledB)}.`}
                >
                  {Array.from({ length: N * N }, (_, i) => {
                    const r = Math.floor(i / N);
                    const c = i % N;
                    return (
                      <rect
                        key={i}
                        x={BX + c * CELL}
                        y={BY + r * CELL}
                        width={CELL}
                        height={CELL}
                        fill={fill(r, c)}
                        data-cell={`${r},${c}`}
                        data-fill={fill(r, c)}
                      />
                    );
                  })}
                  <defs>
                    <filter id={`soft${uid}`} x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation={5} />
                    </filter>
                    <clipPath id={`board${uid}`}>
                      <rect x={BX} y={BY} width={N * CELL} height={N * CELL} />
                    </clipPath>
                  </defs>
                  {shadow ? (
                    <g clipPath={`url(#board${uid})`} aria-hidden="true" data-shadow="on">
                      <ellipse
                        cx={156}
                        cy={148}
                        rx={78}
                        ry={46}
                        transform="rotate(-44 156 148)"
                        fill="#000000"
                        opacity={SHADOW_OPACITY}
                        filter={`url(#soft${uid})`}
                      />
                    </g>
                  ) : null}
                  <rect
                    x={BX + B[1] * CELL}
                    y={BY + B[0] * CELL}
                    width={CELL}
                    height={CELL}
                    fill={SAME}
                    data-cell="B"
                    data-fill={SAME}
                  />
                  {strip ? (
                    <line x1={ax} y1={ay} x2={bx} y2={by} stroke={SAME} strokeWidth={12} data-strip={SAME} />
                  ) : null}
                  {shadow ? (
                    <g aria-hidden="true" data-cylinder="on">
                      <rect x={176} y={22} width={30} height={92} fill="#3c8a4c" />
                      <rect x={176} y={22} width={10} height={92} fill="#5aa86a" />
                      <ellipse cx={191} cy={114} rx={15} ry={5} fill="#3c8a4c" />
                      <ellipse cx={191} cy={22} rx={15} ry={5} fill="#7cc88c" />
                    </g>
                  ) : null}
                  {sampledA !== null ? ring(A) : null}
                  {sampledB !== null ? ring(B) : null}
                  {label(A, "A")}
                  {label(B, "B")}
                </svg>
                <p className={s.cap}>After a well-known checker-shadow illusion. Our own drawing.</p>
                <p className={s.readout} aria-live="polite">
                  A reads {read(sampledA)} · B reads {read(sampledB)} <span className={s.unit}>(screen brightness, 0 to 255)</span>
                </p>
                <div className={s.controls}>
                  <Control disabled={locked || sampledA !== null} onClick={() => sample("A")}>
                    Sample A
                  </Control>
                  <Control disabled={locked || sampledB !== null} onClick={() => sample("B")}>
                    Sample B
                  </Control>
                  <Control className={strip ? "active" : ""} aria-pressed={strip} disabled={locked} onClick={() => !locked && setStrip(!strip)}>
                    Connect them
                  </Control>
                </div>
                <div className={s.controls}>
                  <Control className={!shadow ? "active" : ""} aria-pressed={!shadow} disabled={locked} onClick={toggleShadow}>
                    {shadow ? "Remove the shadow" : "Bring the shadow back"}
                  </Control>
                  <Control disabled={locked || (shadow && !strip)} onClick={reset}>
                    Reset
                  </Control>
                </div>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
