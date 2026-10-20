"use client";

// Colour is what an object sends back. A dark room, one lamp, three objects (apple,
// banana, leaf) lit together. Toy three-band model: each lamp gives equal parts of red,
// green and blue (white = all three); each object sends back a fixed fraction of each band
// (REFL, illustrative values, labelled on stage). The colour drawn for an object is the light
// it returns; three small bars under it show which colours come back.
//
// Earned reveal: milestones "red" and "green" (the apple seen under both lamps). QA path:
// White is the starting lamp (disabled), then Red, Blue, Green in DOM order, so the last
// screen is the green lamp, the question's state.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

type RGB = [number, number, number];

const LAMPS: { name: string; c: RGB }[] = [
  { name: "White", c: [1, 1, 1] },
  { name: "Red", c: [1, 0, 0] },
  { name: "Blue", c: [0, 0, 1] },
  { name: "Green", c: [0, 1, 0] },
];
const GREEN = 3;
const RED = 1;

const OBJECTS: { name: string; refl: RGB; x: number }[] = [
  { name: "Apple", refl: [0.8, 0.05, 0.05], x: 62 },
  { name: "Banana", refl: [0.8, 0.7, 0.1], x: 160 },
  { name: "Leaf", refl: [0.08, 0.45, 0.06], x: 258 },
];

/** Fraction of the lamp's light the object sends back. */
const back = (refl: RGB, lamp: RGB) => {
  const lit = lamp.reduce((a, b) => a + b, 0);
  return refl.reduce((a, r, i) => a + r * lamp[i], 0) / lit;
};
const pct = (x: number) => `${Math.round(100 * x)}%`;
const rgb = (c: RGB) => `rgb(${c.map((v) => Math.round(255 * v)).join(",")})`;
const BAND = ["#ff3b30", "#34c759", "#3b82ff"];

const W = 320;
const H = 196;
const OY = 108; // object centre
const BY = 168; // bar baseline
const BH = 28; // bar height for 100%

function Shape({ name, x, fill }: { name: string; x: number; fill: string }) {
  if (name === "Apple")
    return (
      <g>
        <path d={`M ${x} ${OY - 20} C ${x - 30} ${OY - 34} ${x - 30} ${OY + 22} ${x} ${OY + 24} C ${x + 30} ${OY + 22} ${x + 30} ${OY - 34} ${x} ${OY - 20} Z`} fill={fill} className={s.outline} />
        <path d={`M ${x} ${OY - 20} L ${x + 3} ${OY - 32}`} className={s.stem} />
      </g>
    );
  if (name === "Banana")
    return (
      <path
        d={`M ${x - 34} ${OY - 12} Q ${x} ${OY + 34} ${x + 34} ${OY - 12} Q ${x} ${OY + 14} ${x - 34} ${OY - 12} Z`}
        fill={fill}
        className={s.outline}
      />
    );
  return (
    <g>
      <path d={`M ${x - 30} ${OY + 8} Q ${x - 6} ${OY - 34} ${x + 30} ${OY - 12} Q ${x + 4} ${OY + 30} ${x - 30} ${OY + 8} Z`} fill={fill} className={s.outline} />
      <path d={`M ${x - 30} ${OY + 8} L ${x + 22} ${OY - 10}`} className={s.stem} />
    </g>
  );
}

export default function RedAppleGreenLight({ slug }: { slug: string }) {
  const [lamp, setLamp] = useState(0);
  const [seen, setSeen] = useState<number[]>([0]);
  const L = LAMPS[lamp];
  const apple = OBJECTS[0];
  const appleGreen = back(apple.refl, LAMPS[GREEN].c);
  const appleRed = back(apple.refl, LAMPS[RED].c);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "In a dark kitchen, you light a ripe red apple with nothing but a pure green lamp. What colour does the apple look?",
        options: ["Bright red", "Almost black", "Green"],
        answer: 1,
      }}
      exploreHint="Switch the lamp and watch what each object sends back."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Under the green lamp the apple sent back only <strong>{pct(appleGreen)}</strong> of the light, a dim green: almost
            black. Under the red lamp it sent back <strong>{pct(appleRed)}</strong>.
          </p>
          <p>
            An apple has no light of its own. Its colour is the part of the arriving light it sends back; it absorbs the rest.
            A red apple returns red, and a green lamp brings no red to return.
          </p>
          <p className="muted">Made-up values for three colour bands; real light and real apples have smooth spectra.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["red", "green"]}>
          {(reach) => {
            const pick = (i: number) => {
              if (locked || i === lamp) return;
              setLamp(i);
              setSeen((xs) => (xs.includes(i) ? xs : [...xs, i]));
              if (i === RED) reach("red");
              if (i === GREEN) reach("green");
            };
            const a = back(apple.refl, L.c);
            const caption = locked
              ? "Dark room, one lamp. Predict first."
              : `${L.name} lamp: the apple sends back ${pct(a)} of its light.`;
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`${L.name} lamp lighting an apple, a banana and a leaf`}>
                  <rect x={0} y={0} width={W} height={H} rx={10} className={s.room} />
                  <polygon points={`${W / 2 - 10},26 ${W / 2 + 10},26 ${W - 8},${H - 40} 8,${H - 40}`} fill={rgb(L.c)} opacity={0.1} />
                  <path d={`M ${W / 2 - 16} 26 L ${W / 2 - 8} 10 L ${W / 2 + 8} 10 L ${W / 2 + 16} 26 Z`} fill={rgb(L.c)} className={s.lamp} />
                  <text x={W / 2 + 22} y={22} className={s.lampText}>
                    {L.name} lamp
                  </text>
                  <text x={8} y={16} className={s.chip}>
                    Toy values
                  </text>
                  {/* which colours the lamp gives */}
                  {L.c.map((v, i) => (
                    <rect key={i} x={W / 2 - 15 + i * 11} y={30} width={8} height={4} fill={BAND[i]} opacity={v ? 1 : 0.12} />
                  ))}

                  {OBJECTS.map((o) => {
                    const ret = o.refl.map((r, i) => r * L.c[i]) as RGB;
                    return (
                      <g key={o.name}>
                        <Shape name={o.name} x={o.x} fill={rgb(ret)} />
                        {ret.map((v, i) => (
                          <rect key={i} x={o.x - 16 + i * 11} y={BY - Math.max(1, v * BH)} width={9} height={Math.max(1, v * BH)} fill={BAND[i]} />
                        ))}
                        <line x1={o.x - 20} y1={BY} x2={o.x + 20} y2={BY} className={s.base} />
                        <text x={o.x} y={BY + 12} textAnchor="middle" className={s.label}>
                          {o.name} {locked ? "" : pct(back(o.refl, L.c))}
                        </text>
                      </g>
                    );
                  })}
                  <text x={8} y={BY - BH + 2} className={s.chip}>
                    sent back:
                  </text>
                </svg>

                <p className={s.caption} aria-live="polite">
                  {caption}
                </p>

                <Row>
                  {LAMPS.map((l, i) => (
                    <Control key={l.name} className={i === lamp ? "active" : ""} disabled={locked || i === lamp} aria-pressed={i === lamp} onClick={() => pick(i)}>
                      {l.name}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Readout label="Apple sends back" value={locked ? "?" : pct(a)} />
                  <Readout label="Lamps tried" value={locked ? "-" : seen.length} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
