"use client";

// Clay boat. The same 1 kg of clay (density 1800 kg/m^3, so 0.556 L of clay) is
// shaped as a ball or as open cylindrical cups of growing outer volume. A shape
// floats only if it can push aside 1.00 L of fresh water (1 kg, its own weight)
// before water spills over its rim.
//
// Geometry (computed below, drawn to scale): each cup is an open cylinder of outer
// diameter D and height H with walls and floor of thickness t, chosen so the clay
// volume stays 0.556 L. Floating draft d = 1000 cm^3 / (pi D^2 / 4).
// A cup whose outer volume is under 1 L fills and sinks; then it displaces only its
// clay, 0.556 L. Fresh water 1000 kg/m^3; stability and surface tension ignored.
// The reveal unlocks once a shape has floated.

import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useRef, useState } from "react";
import s from "./styles.module.css";

const CLAY_KG = 1;
const CLAY_RHO = 1800; // kg/m^3, typical
const CLAY_CM3 = (CLAY_KG / CLAY_RHO) * 1e6; // 555.6 cm^3
const NEED_CM3 = (CLAY_KG / 1000) * 1e6; // 1000 cm^3 of water weighs 1 kg

type Shape = { name: string; hull: number; D: number; H: number; t: number; ball?: boolean };

function cup(name: string, hull: number, aspect: number): Shape {
  const D = Math.cbrt((4 * hull) / (Math.PI * aspect));
  const H = aspect * D;
  let lo = 0;
  let hi = D / 2;
  for (let i = 0; i < 60; i++) {
    const t = (lo + hi) / 2;
    const clay = hull - Math.PI * (D / 2 - t) ** 2 * (H - t);
    if (clay > CLAY_CM3) hi = t;
    else lo = t;
  }
  return { name, hull, D, H, t: lo };
}

const R_BALL = Math.cbrt((3 * CLAY_CM3) / (4 * Math.PI)); // 5.10 cm
const SHAPES: Shape[] = [
  { name: "ball", hull: CLAY_CM3, D: 2 * R_BALL, H: 2 * R_BALL, t: 0, ball: true },
  cup("deep cup", 800, 0.6),
  cup("cup", 1250, 0.5),
  cup("bowl", 1800, 0.4),
  cup("wide bowl", 2500, 0.33),
];

const floats = (sh: Shape) => !sh.ball && sh.hull > NEED_CM3;
const draft = (sh: Shape) => NEED_CM3 / ((Math.PI * sh.D * sh.D) / 4); // cm
const pushed = (sh: Shape) => (floats(sh) ? NEED_CM3 : CLAY_CM3); // cm^3 of water displaced at rest
const L = (cm3: number) => (cm3 / 1000).toFixed(2);

const W = 320;
const Hh = 196;
const K = 7; // px per cm
const SURF = 46;
const BOTTOM = 186;
const CX = W / 2;

export default function ClayBoat({ slug }: { slug: string }) {
  const [k, setK] = useState(0);
  const [firstFloat, setFirstFloat] = useState<Shape | null>(null);
  const interactRef = useRef<() => void>(() => {});
  const { reach } = useMilestones(() => interactRef.current(), ["floated"]);
  const sh = SHAPES[k];
  const fl = floats(sh);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A 1 kg lump of clay (about 1800 kg/m³) sinks in water. Reshaped into a bowl, how much water must it push aside to float?",
        options: ["0.56 L", "1 L", "1.8 L"],
        answer: 1,
      }}
      exploreHint="Reshape the clay until it floats. Watch how much water it pushes aside."
      minInteractions={1}
      reveal={() => {
        const f = firstFloat ?? SHAPES[2];
        return (
          <>
            <p>
              The ball sank pushing aside only <strong>{L(CLAY_CM3)} L</strong>, its own volume. Your {f.name} floated
              pushing aside <strong>{L(NEED_CM3)} L</strong>: exactly 1 kg of water, the clay&apos;s own weight. The deep
              cup could hold back only {L(SHAPES[1].hull)} L before water poured in, so it sank.
            </p>
            <p>
              Water pushes up with a force equal to the weight of the water a thing shoves aside. Clay is heavier than
              water litre for litre, so a solid lump never shoves aside enough. A hollow shape encloses air and can.
            </p>
            <p className="muted">Same clay, same weight. Only the water it moves changed.</p>
          </>
        );
      }}
    >
      {({ locked, interact }) => {
        interactRef.current = interact;
        const caption = locked
          ? "Make a prediction to start."
          : sh.ball
            ? "1 kg of clay as a ball. Fresh water."
            : fl
              ? `Floats: it pushes aside ${L(NEED_CM3)} L of water, weighing ${L(NEED_CM3)} kg.`
              : `Sank: even full to the rim it holds back only ${L(sh.hull)} L.`;

        const w = sh.D * K;
        const hgt = sh.H * K;
        const yBottom = fl ? SURF + draft(sh) * K : BOTTOM;
        const yTop = yBottom - hgt;
        const x0 = CX - w / 2;
        const tp = sh.t * K;
        const outer = `M ${x0} ${yTop} L ${x0} ${yBottom} L ${x0 + w} ${yBottom} L ${x0 + w} ${yTop}`;
        const hull = `${outer} L ${x0 + w - tp} ${yTop} L ${x0 + w - tp} ${yBottom - tp} L ${x0 + tp} ${yBottom - tp} L ${x0 + tp} ${yTop} Z`;

        return (
          <div className={s.wrap}>
            <svg
              viewBox={`0 0 ${W} ${Hh}`}
              className={`stage-svg ${s.fit}`}
              role="img"
              aria-label={`1 kg of clay shaped as a ${sh.name}, which ${fl ? "floats" : "sinks"}`}
            >
              <rect x={6} y={SURF} width={W - 12} height={BOTTOM - SURF} className={s.water} />
              <line x1={6} y1={SURF} x2={W - 6} y2={SURF} className={s.surface} />
              <path d={`M 6 ${SURF - 22} L 6 ${BOTTOM} L ${W - 6} ${BOTTOM} L ${W - 6} ${SURF - 22}`} className={s.tank} />
              {sh.ball ? (
                <circle cx={CX} cy={BOTTOM - R_BALL * K} r={R_BALL * K} className={s.clay} />
              ) : (
                <g>
                  {!fl && (
                    <rect x={x0 + tp} y={yTop} width={w - 2 * tp} height={hgt - tp} className={s.flood} />
                  )}
                  {fl && (
                    <rect x={x0 + tp} y={yTop} width={w - 2 * tp} height={hgt - tp} className={s.air} />
                  )}
                  <path d={hull} className={s.clay} />
                </g>
              )}
              {fl && (
                <g>
                  <line x1={x0 - 14} y1={yBottom} x2={x0 - 4} y2={yBottom} className={s.dim} />
                  <line x1={x0 - 9} y1={SURF} x2={x0 - 9} y2={yBottom} className={s.dim} />
                  <text x={x0 - 12} y={yBottom + 11} textAnchor="end" className={s.small}>
                    {draft(sh).toFixed(1)} cm under
                  </text>
                </g>
              )}
              <text x={12} y={SURF - 8} className={s.small}>
                water
              </text>
              <line x1={W - 40} y1={BOTTOM - 8} x2={W - 40 + 10 * K * 0.25} y2={BOTTOM - 8} className={s.dim} />
              <text x={W - 40} y={BOTTOM - 12} className={s.small}>
                2.5 cm
              </text>
            </svg>

            <p className={s.caption} aria-live="polite">
              {caption}
            </p>

            <Slider
              label="Shape"
              value={k}
              min={0}
              max={SHAPES.length - 1}
              step={1}
              disabled={locked}
              format={(v) => SHAPES[v].name}
              onChange={(v) => {
                setK(v);
                if (floats(SHAPES[v])) {
                  if (!firstFloat) setFirstFloat(SHAPES[v]);
                  reach("floated");
                }
              }}
            />
            <Row>
              <Readout label="Clay" value={`${CLAY_KG.toFixed(2)} kg`} />
              <Readout label="Water pushed aside" value={locked ? "?" : `${L(pushed(sh))} L`} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
