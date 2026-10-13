"use client";

// Pinhole camera, side view. A 6 cm candle stands in front of a card with a tiny hole;
// a screen sits behind it. Light travels in straight lines, so the ray from the flame tip
// crosses the axis at the hole and lands below it: the image is upside down.
//
// Geometry (cm, hole at x = 0, axis at y = 0): a point at height y, a distance d_o in front
// of the hole, lands at -y * d_s / d_o on a screen d_s behind it. Magnification d_s / d_o.
// A hole of width a spreads each point into a patch a * (d_o + d_s) / d_o wide (blur).
// Diffraction is ignored (geometric optics). Both axes share one scale, so the triangles
// on the stage are the true similar triangles.
//
// Earned reveal: milestones "traced-tip" (the learner follows the tip ray to the screen)
// and "moved" (a distance changes and the image resizes but stays inverted).

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const H_OBJ = 10; // candle height, cm (axis through its middle)
const SH = H_OBJ / 6; // the outline below is drawn for 6 cm
const W = 320;
const H = 176;
const K = 4.2; // px per cm, both axes
const HX = 178; // hole x, px
const AY = 88; // axis y, px
const px = (x: number) => HX + x * K;
const py = (y: number) => AY - y * K;

const imageHeight = (dO: number, dS: number) => (H_OBJ * dS) / dO;
const blurCm = (aMm: number, dO: number, dS: number) => ((aMm / 10) * (dO + dS)) / dO;

// candle outline as points (cm, relative to axis): wax body then flame
const WAX = { x0: -0.9, x1: 0.9, y0: -3, y1: 1.2 };
const FLAME: [number, number][] = [
  [0, 3],
  [0.7, 1.9],
  [0.45, 1.3],
  [-0.45, 1.3],
  [-0.7, 1.9],
];

function Candle({ cx, scale, blur, cls }: { cx: number; scale: number; blur: number; cls: string }) {
  // scale < 0 draws the inverted image; the whole shape scales by |scale|
  const bx = (x: number) => cx + x * SH * K * Math.abs(scale);
  const by = (y: number) => py(y * SH * scale);
  const flame = FLAME.map(([x, y]) => `${bx(x)},${by(y)}`).join(" ");
  const sw = 1 + blur * K;
  return (
    <g className={cls} style={{ opacity: Math.max(0.35, 1 - blur * 0.5) }}>
      <rect
        x={Math.min(bx(WAX.x0), bx(WAX.x1))}
        y={Math.min(by(WAX.y0), by(WAX.y1))}
        width={Math.abs(bx(WAX.x1) - bx(WAX.x0))}
        height={Math.abs(by(WAX.y1) - by(WAX.y0))}
        className={s.wax}
        strokeWidth={sw}
      />
      <polygon points={flame} className={s.flame} strokeWidth={sw} />
    </g>
  );
}

export default function PinholeFlips({ slug }: { slug: string }) {
  const [dO, setDO] = useState(30);
  const [dS, setDS] = useState(15);
  const [hole, setHole] = useState(1);
  const [traced, setTraced] = useState(false);
  const hi = imageHeight(dO, dS);
  const blur = blurCm(hole, dO, dS);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "A candle burns in front of a card with a tiny hole, no lens. On a screen behind the hole the flame appears…",
        options: ["Upright", "Upside-down", "Blurred but upright"],
        answer: 1,
      }}
      exploreHint="Follow the ray from the flame tip. Then move the candle or the screen."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Your {H_OBJ} cm candle, {dO} cm from the hole, made a <strong>{hi.toFixed(1)} cm</strong> image {dS} cm behind it,{" "}
            <strong>upside down</strong>. The ray from the tip ran straight through the hole and landed low on the screen;
            the ray from its base landed high.
          </p>
          <p>
            Straight rays cross at the hole, so top and bottom swap at every distance. The size is set by similar
            triangles: image ÷ object = screen distance ÷ candle distance. A wider hole lets each point spread into a patch,
            so the picture blurs.
          </p>
          <p className="muted">Geometric optics: diffraction through a very small hole is ignored.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["traced-tip", "moved"]}>
          {(reach) => {
            const cX = px(-dO);
            const sX = px(dS);
            const tipY = py(H_OBJ / 2);
            const tipImgY = py(-(H_OBJ / 2) * (dS / dO));
            const baseY = py(-H_OBJ / 2);
            const baseImgY = py((H_OBJ / 2) * (dS / dO));
            const halfHole = Math.max(1, (hole / 10) * K * 0.5);
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={locked ? "Candle, card with a hole, and a blank screen" : `Image ${hi.toFixed(1)} cm tall, upside down`}>
                  <line x1={4} y1={AY} x2={W - 4} y2={AY} className={s.axis} />
                  {/* card with hole */}
                  <rect x={HX - 2} y={8} width={4} height={AY - halfHole - 8} className={s.card} />
                  <rect x={HX - 2} y={AY + halfHole} width={4} height={H - 8 - AY - halfHole} className={s.card} />
                  {/* screen */}
                  <rect x={sX} y={8} width={5} height={H - 16} className={s.screen} />
                  <text x={8} y={H - 6} className={s.chip}>
                    No lens. Straight rays.
                  </text>

                  {!locked && (
                    <>
                      <line x1={cX} y1={baseY} x2={sX} y2={baseImgY} className={s.ray} />
                      <line x1={cX} y1={AY} x2={sX} y2={AY} className={s.ray} />
                      <line x1={cX} y1={tipY} x2={sX} y2={tipImgY} className={traced ? s.rayTip : s.ray} />
                      <Candle cx={sX - 1 - 0.9 * SH * K * (dS / dO)} scale={-dS / dO} blur={blur} cls={s.image} />
                      {traced && (
                        <>
                          <circle cx={cX} cy={tipY} r={3.5} className={s.tipDot} />
                          <circle cx={sX} cy={tipImgY} r={3.5} className={s.tipDot} />
                        </>
                      )}
                    </>
                  )}
                  <Candle cx={cX} scale={1} blur={0} cls={s.object} />
                </svg>

                <Control
                  className={traced ? "active" : ""}
                  disabled={locked}
                  onClick={() => {
                    setTraced(!traced);
                    if (!traced) reach("traced-tip");
                  }}
                >
                  {traced ? "Hide tip ray" : "Trace the tip"}
                </Control>
                <Slider
                  label="Candle to hole"
                  value={dO}
                  min={10}
                  max={40}
                  step={5}
                  disabled={locked}
                  format={(v) => `${v} cm`}
                  onChange={(v) => {
                    setDO(v);
                    reach("moved");
                  }}
                />
                <Slider
                  label="Screen to hole"
                  value={dS}
                  min={5}
                  max={30}
                  step={5}
                  disabled={locked}
                  format={(v) => `${v} cm`}
                  onChange={(v) => {
                    setDS(v);
                    reach("moved");
                  }}
                />
                <Slider label="Hole" value={hole} min={1} max={5} step={1} disabled={locked} format={(v) => `${v} mm`} onChange={setHole} />
                <Readout label="Image" value={locked ? "?" : `${hi.toFixed(1)} cm, upside down`} />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
