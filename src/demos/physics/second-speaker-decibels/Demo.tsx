"use client";

// Second speaker, decibels. Sound level L = 10 log10(I / I0), I0 = 1e-12 W/m². One speaker gives
// 1 µW/m² at the listener: 60 dB. Uncorrelated identical speakers at the same distance add their
// powers, so 2, 4 and 10 speakers give 2, 4 and 10 µW/m²: 63.0, 66.0 and 70.0 dB. 120 dB would be
// 10⁶ times one speaker's power. Brief: company/domains/briefs/physics.md round 4, #62; numbers from
// artifacts/scratch/cm-physics-r4/check.mjs (main checkout), block 62.
//
// One picture: ten speaker slots, the listener with a dB meter, and a sound-power bar (the cause; it
// grows in proportion to the number of speakers, while the meter barely moves). The stage starts with
// one speaker, a state no preset produces. Earned reveal: milestones "two" (the question's case),
// "four", "ten". Values are recorded in the Seen row when each fires and never cleared. The bar
// animates for 380 ms; milestones fire on the press.
// QA path (DOM order): 2 speakers, 4 speakers, 10 speakers.

import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useEffect, useRef, useState } from "react";
import s from "./styles.module.css";

const I0 = 1e-12; // W/m², threshold reference
const I1 = 1e-6; // W/m² from one speaker (60 dB)
const levelDb = (n: number) => 10 * Math.log10((n * I1) / I0);
const MILESTONES = ["two", "four", "ten"] as const;
const PRESETS = [
  { n: 2, m: "two" },
  { n: 4, m: "four" },
  { n: 10, m: "ten" },
] as const;

// ---- geometry (viewBox 320 × 172) ----
const W = 320;
const H = 172;
const BX0 = 14; // bar left (0 µW/m²)
const BX1 = 306; // bar right (10 µW/m²)
const BPX = (BX1 - BX0) / 10; // px per µW/m²
const BY = 124;

function useTween(target: number) {
  const [v, setV] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    let raf = 0;
    const start = from.current;
    const t0 = performance.now();
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / 380);
      const x = start + (target - start) * (1 - (1 - k) * (1 - k));
      from.current = x;
      setV(x);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return v;
}

function Speaker({ x, y, on }: { x: number; y: number; on: boolean }) {
  return (
    <g className={on ? s.spkOn : s.spkOff}>
      <rect x={x} y={y} width={20} height={30} rx={3} />
      {on && (
        <>
          <circle cx={x + 10} cy={y + 19} r={6} className={s.cone} />
          <circle cx={x + 10} cy={y + 7} r={2.5} className={s.cone} />
        </>
      )}
    </g>
  );
}

export default function SecondSpeakerDecibels({ slug }: { slug: string }) {
  const [n, setN] = useState(1);
  const [seen, setSeen] = useState<{ two?: number; four?: number; ten?: number }>({});
  const shown = useTween(n);
  const db = (v?: number) => (v === undefined ? "?" : `${Math.round(v)} dB`);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "One speaker plays at 60 dB where you sit. An identical second speaker, same distance, joins in. The level becomes...",
        options: ["63 dB", "90 dB", "120 dB"],
        answer: 0,
      }}
      exploreHint="Add speakers and watch the sound power and the meter."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Your second speaker doubled the sound power reaching you, and the meter went from 60 to only{" "}
            <strong>{db(seen.two)}</strong>. Four speakers read {db(seen.four)} and ten read {db(seen.ten)}: ten times the power
            adds just 10 dB.
          </p>
          <p>
            Decibels count multiplications, not amounts: every doubling adds 3 dB and every tenfold adds 10. So 120 dB is not two
            60 dB speakers; it is a million times one speaker's power.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const pick = (k: number, m: (typeof MILESTONES)[number]) => {
              setN(k);
              setSeen((x) => ({ ...x, [m]: x[m] ?? levelDb(k) }));
              reach(m);
            };
            const seenText = [
              `power ×2: ${seen.two !== undefined ? db(seen.two) : "–"}`,
              `×4: ${seen.four !== undefined ? db(seen.four) : "–"}`,
              `×10: ${seen.ten !== undefined ? db(seen.ten) : "–"}`,
            ].join(" · ");
            const level = levelDb(shown);
            const barW = shown * BPX;
            const pLabel = `${Math.round(shown * 10) / 10} µW/m²`;
            return (
              <div className={s.wrap}>
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className={`stage-svg ${s.fit}`}
                  role="img"
                  aria-label={`${n} speaker${n === 1 ? "" : "s"} playing. Sound power ${n} µW/m², meter ${Math.round(levelDb(n))} dB.`}
                >
                  {/* ten speaker slots */}
                  {Array.from({ length: 10 }, (_, i) => (
                    <Speaker key={i} x={12 + (i % 5) * 28} y={i < 5 ? 14 : 54} on={i < n} />
                  ))}
                  {/* sound reaching the listener */}
                  {[0, 1, 2].map((k) => (
                    <path
                      key={k}
                      d={`M${168 + k * 12},${36} q8,16 0,32`}
                      className={s.wave}
                      style={{ opacity: Math.min(1, 0.25 + shown / 10) }}
                    />
                  ))}
                  {/* listener */}
                  <circle cx={226} cy={56} r={13} className={s.head} />
                  <path d={`M${213},${52} q-5,4 0,9`} className={s.ear} />
                  <text x={226} y={86} textAnchor="middle" className={s.lab}>
                    you
                  </text>
                  {/* dB meter */}
                  <rect x={250} y={30} width={62} height={40} rx={6} className={s.meter} />
                  <text x={281} y={57} textAnchor="middle" className={s.meterText}>
                    {Math.round(level)} dB
                  </text>
                  <text x={281} y={84} textAnchor="middle" className={s.lab}>
                    meter
                  </text>

                  {/* sound power bar */}
                  <text x={BX0} y={BY - 10} className={s.lab}>
                    sound power reaching you, µW/m²
                  </text>
                  <rect x={BX0} y={BY} width={BX1 - BX0} height={14} rx={3} className={s.track} />
                  <rect x={BX0} y={BY} width={barW} height={14} rx={3} className={s.bar} />
                  {barW < 200 ? (
                    <text x={BX0 + barW + 4} y={BY + 11} className={s.labD}>
                      {pLabel}
                    </text>
                  ) : (
                    <text x={BX0 + barW - 4} y={BY + 11} textAnchor="end" className={s.labIn}>
                      {pLabel}
                    </text>
                  )}
                  {[0, 2, 4, 6, 8, 10].map((v) => (
                    <g key={v}>
                      <line x1={BX0 + v * BPX} y1={BY + 16} x2={BX0 + v * BPX} y2={BY + 21} className={s.tick} />
                      <text
                        x={BX0 + v * BPX}
                        y={BY + 33}
                        textAnchor={v === 0 ? "start" : v === 10 ? "end" : "middle"}
                        className={s.lab}
                      >
                        {v === 0 || v === 10 ? v : ""}
                      </text>
                    </g>
                  ))}
                </svg>

                <p className={s.caption}>Identical speakers, same distance, no echoes.</p>
                <p className={s.seen}>Seen: {seenText}</p>

                <Row>
                  {PRESETS.map((p) => (
                    <Control
                      key={p.n}
                      className={n === p.n ? "active" : ""}
                      disabled={locked || n === p.n}
                      onClick={() => pick(p.n, p.m)}
                    >
                      {p.n} speakers
                    </Control>
                  ))}
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
