"use client";

// Energy up a food chain. Each level is a square whose AREA is its energy,
// stacked plants-at-the-bottom. The learner extends the chain one link at a
// time and can change the share each link passes on (rule of thumb 10%,
// measured roughly 5-20%). Numbers are made up; no randomness.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const LEVELS = ["Plants", "Grasshoppers", "Frogs", "Snakes", "Hawks"];
const BASE = 10000;
const MAX_SIDE = 140;
const W = 300;
const H = 300;

function units(e: number) {
  if (e >= 100) return Math.round(e).toLocaleString("en-US");
  if (e >= 1) return String(Number(e.toPrecision(2)));
  return e.toFixed(2);
}

export default function TenPercentUp({ slug }: { slug: string }) {
  const [top, setTop] = useState(0);
  const [eff, setEff] = useState(10);

  const energies = LEVELS.map((_, i) => BASE * (eff / 100) ** i);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Plants hold 10,000 units of energy. Each link passes on about 10%. Plant → grasshopper → frog → snake → hawk. How much reaches the hawks?",
        options: ["About 1 unit", "About 100 units", "About 1,000 units"],
        answer: 0,
      }}
      exploreHint="Add the animals one link at a time, up to the hawks."
      reveal={() => (
        <>
          <p>
            Four links: 10,000 &rarr; 1,000 &rarr; 100 &rarr; 10 &rarr; <strong>about 1 unit</strong> for the hawks. Each
            animal passes on only a small share; most of what it eats is burned for living, given off as heat, or never
            eaten at all.
          </p>
          <p>
            That is why food chains are short and top predators are scarce: every extra link costs about 90% of what was
            left. The hawk square was a dot beside the plant square.
          </p>
          <p className="muted">
            10% is a rule of thumb; measured transfers range roughly 5 to 20%. At 20% the hawks would get 16 units; at
            5%, 0.06.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const shown = locked ? 0 : top;
        // Stack squares from the bottom, keeping labels at least 17 units apart.
        let y = H - 6;
        const boxes = energies.slice(0, shown + 1).map((e, i) => {
          const side = MAX_SIDE * Math.sqrt(e / BASE);
          const box = { i, e, side, x: 78 - side / 2, y: y - side };
          y = y - Math.max(side, 17 - 8) - 8;
          return box;
        });
        const msg = locked
          ? "Make a prediction to start. Square area = energy."
          : `Square area = energy. Each link passes on ${eff}%.`;
        return (
          <div className={s.wrap}>
            <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.svg}`} role="img" aria-label={`${LEVELS[shown]} get ${units(energies[shown])} units`}>
              {boxes.map((b) => (
                <g key={b.i}>
                  <rect x={b.x} y={b.y} width={Math.max(b.side, 0.8)} height={Math.max(b.side, 0.8)} className={b.i === 0 ? s.plant : s.animal} />
                  {b.side < 6 && <circle cx={78} cy={b.y + b.side / 2} r={7} className={s.marker} />}
                  <line x1={78 + Math.max(b.side / 2, 8) + 3} x2={158} y1={b.y + b.side / 2} y2={b.y + b.side / 2} className={s.leader} />
                  <text x={162} y={b.y + b.side / 2 + 4} className={s.label}>
                    {LEVELS[b.i]}: {units(b.e)}
                  </text>
                </g>
              ))}
            </svg>

            <p className={s.msg} aria-live="polite">{msg}</p>

            <Row>
              {LEVELS.slice(1).map((name, k) => {
                const level = k + 1;
                return (
                  <Control
                    key={name}
                    className={`${s.chip} ${top === level ? "active" : ""}`}
                    aria-pressed={top === level}
                    disabled={locked || top === level}
                    onClick={() => {
                      setTop(level);
                      if (level === LEVELS.length - 1) interact();
                    }}
                  >
                    {level <= top ? `${name} ✓` : `+ ${name}`}
                  </Control>
                );
              })}
            </Row>
            <Slider
              label="Each link passes on"
              value={eff}
              min={5}
              max={20}
              format={(v) => `${v}%`}
              disabled={locked}
              onChange={setEff}
            />
          </div>
        );
      }}
    </Lesson>
  );
}
