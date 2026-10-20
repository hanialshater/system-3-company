"use client";

// Where a bulb's power goes. Power in = visible light + heat (energy conservation).
// Typical figures (claims c3, c4, labelled on stage): a 60 W filament bulb gives about 5%
// as visible light (3 W) and 57 W of heat; a 9 W LED gives the same 3 W of light and 6 W of
// heat. One stacked bar, 0-60 W, with the 60 W input outlined for comparison.
//
// v2: nothing is measured at first: each bulb's split appears only when the learner switches it on,
// and the reveal needs both (filament first, then LED). Earned reveal: milestones "filament", "led".

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const LIGHT = 3; // W of visible light, both bulbs
const BULBS = [
  { name: "Filament 60 W", input: 60 },
  { name: "LED 9 W", input: 9 },
];
const heat = (input: number) => input - LIGHT;
const share = (input: number) => Math.round((100 * LIGHT) / input);

const W = 320;
const H = 150;
const BX = 20;
const BW = 280; // px for 60 W
const BY = 92;
const BH = 24;
const k = BW / 60;

export default function FilamentVsLedHeat({ slug }: { slug: string }) {
  const [bulb, setBulb] = useState<number | null>(null); // nothing measured yet
  const b = BULBS[bulb ?? 0];
  const fil = BULBS[0];
  const led = BULBS[1];

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Your reading lamp has an old 60 W filament bulb, switched on. About how much of its 60 W comes out as visible light?",
        options: ["About 3 W", "About 30 W", "About 57 W"],
        answer: 0,
      }}
      exploreHint="Switch on the filament bulb, then the LED. Compare the light and heat parts of each bar."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            The filament bulb turned {fil.input} W into <strong>{LIGHT} W of light</strong> and{" "}
            <strong>{heat(fil.input)} W of heat</strong>: only {share(fil.input)}% became light. The LED gave the same {LIGHT}{" "}
            W of light from {led.input} W, shedding only {heat(led.input)} W as heat.
          </p>
          <p>
            Energy is not used up, only changed: every watt in comes out as light or heat. A filament makes light by being
            white hot, so most of its power leaves as warmth. The LED makes the same light directly, for less than a sixth of
            the power.
          </p>
          <p className="muted">Typical figures; real bulbs vary by a few watts.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["filament", "led"]}>
          {(reach) => {
            const go = (i: number) => {
              if (locked || i === bulb) return;
              setBulb(i);
              reach(i === 0 ? "filament" : "led");
            };
            const shown = !locked && bulb !== null;
            const hw = heat(b.input) * k;
            const lw = LIGHT * k;
            const waves = Math.max(1, Math.round(heat(b.input) / 10));
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`${b.name}`}>
                  <text x={4} y={12} className={s.chip}>
                    W (watt): energy per second. Typical figures.
                  </text>
                  {/* bulb */}
                  <g transform={`translate(${W / 2} 46)`}>
                    {shown &&
                      Array.from({ length: waves }, (_, i) => (
                        <path key={i} d={`M ${-30 + (60 * (i + 0.5)) / waves} -6 q 4 -6 0 -12 q -4 -6 0 -12`} className={s.wave} />
                      ))}
                    <circle cx={0} cy={18} r={14} className={bulb !== 1 ? s.glass : s.ledGlass} />
                    <rect x={-7} y={31} width={14} height={9} className={s.cap} />
                    <text x={22} y={22} className={s.label}>
                      {b.name}
                    </text>
                  </g>
                  {/* input outline and split */}
                  <rect x={BX} y={BY} width={BW} height={BH} rx={3} className={s.outline} />
                  <text x={BX + BW} y={BY - 4} textAnchor="end" className={s.chip}>
                    60 W
                  </text>
                  {!shown ? (
                    <>
                      <rect x={BX} y={BY} width={b.input * k} height={BH} rx={3} className={s.unknown} />
                      <text x={BX + (b.input * k) / 2} y={BY + 16} textAnchor="middle" className={s.label}>
                        {locked ? `${b.input} W in: light + heat = ?` : "Switch on a bulb below"}
                      </text>
                    </>
                  ) : (
                    <>
                      <rect x={BX} y={BY} width={lw} height={BH} className={s.light} />
                      <rect x={BX + lw} y={BY} width={hw} height={BH} className={s.heat} />
                      <text x={BX} y={BY + BH + 13} className={s.lightText}>
                        light {LIGHT} W
                      </text>
                      <text x={BX + lw} y={BY - 4} className={s.heatText}>
                        heat {heat(b.input)} W
                      </text>
                    </>
                  )}
                </svg>

                <Row>
                  {BULBS.map((q, i) => (
                    <Control key={q.name} className={i === bulb ? "active" : ""} disabled={locked || i === bulb} aria-pressed={i === bulb} onClick={() => go(i)}>
                      {q.name}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Readout label="Light" value={!shown ? "?" : `${LIGHT} W (${share(b.input)}%)`} />
                  <Readout label="Heat" value={!shown ? "?" : `${heat(b.input)} W`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
