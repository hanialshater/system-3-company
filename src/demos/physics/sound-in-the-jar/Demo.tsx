"use client";

// Sound in the jar. A bell rings in a sealed jar while a pump removes air. 120 dots are the air
// molecules (seeded positions, removed in a fixed shuffled order); the clapper keeps swinging at
// every pressure (CSS animation). The "sound reaching you" bar and the arcs outside the jar are
// schematic and proportional to the air left (radiated sound power follows the air's density).
// Key states: some air pumped out ("pumped") and the jar at 1% air ("near-vacuum").
// Controls: pump slider over LEVELS (starts at 100%; two presses reach 25%), "Pump to 1%", "Let air
// back in". QA path: slider, Pump to 1%, Let air back in. Every number comes from LEVELS and DOTS.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import { useMemo, useState } from "react";
import s from "./styles.module.css";

const LEVELS = [100, 50, 25, 10, 5, 2, 1]; // percent of the original air
const WORDS = ["Full", "Quieter", "Quieter", "Faint", "Faint", "Very faint", "Near silence"];
const LAST = LEVELS.length - 1;
const DOTS = 120;
const SEED = 3;
const MILESTONES = ["pumped", "near-vacuum"] as const;
const JX = 96;
const JY = 70;
const JW = 128;
const JH = 120;

export default function SoundInTheJar({ slug }: { slug: string }) {
  const [lv, setLv] = useState(0);
  const [lowest, setLowest] = useState(0);
  const dots = useMemo(() => {
    const r = mulberry32(SEED);
    return Array.from({ length: DOTS }, () => ({ x: JX + 6 + r() * (JW - 12), y: JY + 8 + r() * (JH - 16) }));
  }, []);
  const pct = LEVELS[lv];
  const shown = Math.round((pct / 100) * DOTS);
  const loud = pct / 100;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A ringing bell sits in a sealed jar. A pump removes the air. You watch the clapper still swinging and listen. The sound...",
        options: ["Stays equally loud", "Gets louder", "Fades to near silence"],
        answer: 2,
      }}
      exploreHint="Pump the air down in steps and watch the clapper and the bar."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            You pumped down to <strong>{LEVELS[lowest]}%</strong> air. The clapper swung just as before, but the sound bar
            shrank to a sliver.
          </p>
          <p>
            Sound is a push passed from molecule to molecule. With {LEVELS[lowest]}% of the air there are{" "}
            {Math.round(100 / LEVELS[lowest])} times fewer molecules to pass it on, so almost none reaches you. It needs a
            material to travel through. A faint sound can remain.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const go = (i: number) => {
              setLv(i);
              setLowest((l) => Math.max(l, i));
              if (i > 0) reach("pumped");
              if (i === LAST) reach("near-vacuum");
            };
            const caption = locked
              ? "Make a prediction to start."
              : "Dots are air. The clapper swings the same at every pressure. The sound bar is schematic.";
            return (
              <div className={s.wrap}>
                <svg viewBox="0 0 320 232" className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
                  <rect x={JX} y={JY} width={JW} height={JH} rx={14} className={s.jar} />
                  <rect x={JX + 10} y={JY - 8} width={JW - 20} height={10} rx={3} className={s.lid} />
                  {dots.slice(0, shown).map((d, i) => (
                    <circle key={i} cx={d.x} cy={d.y} r={2} className={s.dot} />
                  ))}
                  <line x1={160} y1={JY + 2} x2={160} y2={JY + 22} className={s.hang} />
                  <path d="M143 120 Q143 94 160 92 Q177 94 177 120 Z" className={s.bell} />
                  <g className={s.clapper}>
                    <line x1={160} y1={104} x2={160} y2={126} className={s.stick} />
                    <circle cx={160} cy={128} r={4} className={s.knob} />
                  </g>
                  {[0, 1, 2].map((i) => (
                    <path
                      key={i}
                      d={`M${240 + i * 14} ${130 - 14 - i * 6} Q${250 + i * 14} 130 ${240 + i * 14} ${130 + 14 + i * 6}`}
                      className={s.wave}
                      style={{ opacity: locked ? 0 : 0.06 + 0.94 * loud }}
                    />
                  ))}
                  <text x={160} y={JY + JH + 18} className={s.cap}>
                    Sound reaching you (schematic)
                  </text>
                  <rect x={60} y={JY + JH + 26} width={200} height={12} rx={3} className={s.track} />
                  <rect x={60} y={JY + JH + 26} width={locked ? 0 : Math.max(2, 200 * loud)} height={12} rx={3} className={s.fill} />
                </svg>

                <p className={s.caption} aria-live="polite">
                  {caption}
                </p>

                <Slider
                  label="Air in the jar"
                  value={lv}
                  min={0}
                  max={LAST}
                  disabled={locked}
                  format={(i) => `${LEVELS[i]}%`}
                  onChange={go}
                />
                <Row>
                  <Control disabled={locked || lv === LAST} onClick={() => go(LAST)}>
                    Pump to {LEVELS[LAST]}%
                  </Control>
                  <Control disabled={locked || lv === 0} onClick={() => go(0)}>
                    Let air back in
                  </Control>
                </Row>
                <Row>
                  <Readout label="Air left" value={locked ? "?" : `${pct}%`} />
                  <Readout label="Sound" value={locked ? "?" : WORDS[lv]} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
