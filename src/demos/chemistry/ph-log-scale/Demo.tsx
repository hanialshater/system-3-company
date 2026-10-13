"use client";

// pH as base-ten blocks. One small square = the hydrogen ions in a cup of black coffee
// (about pH 5). Each step down in pH is ten times as many: a strip, a block, ten blocks.
// Each step up is a tenth; a zoomed view of coffee's square shows the tenth and hundredth.
//
// v2 (revision): the reveal is gated on reaching pH 2. The first control is "pH down 1", and the
// slider runs toward acid (right = lower pH), so pressing each control once walks 5 -> 4 -> 3 -> 2,
// one step at a time (the QA contract presses each control once; sliders twice). The question and
// reveal frame "1,000" as following from the round values pH 5 and pH 2.

import { useEffect, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const REF_PH = 5;
const TARGET_PH = 2;
const MIN_PH = 2;
const MAX_PH = 7;
const CELL = 6; // pitch of one small square
const FLAT = CELL * 10;
const GAP = 5;
const TOP = 6;
const MILESTONES = ["reached-ph-2"] as const;
const TARGET_TIMES = Math.pow(10, REF_PH - TARGET_PH); // 1,000

// Approximate everyday values (see meta.json claims c3-c5). Only label what we can cite.
const LABELS: Record<number, string> = {
  2: "about lemon juice",
  5: "about black coffee",
  7: "pure water (25 °C)",
};

function flatOrigin(f: number) {
  return { x: (f % 5) * (FLAT + GAP), y: TOP + Math.floor(f / 5) * (FLAT + GAP) };
}

function cellXY(k: number) {
  // Fill a block column by column (so 10 squares make one strip), then the next block.
  const f = Math.floor(k / 100);
  const within = k % 100;
  const o = flatOrigin(f);
  return { x: o.x + Math.floor(within / 10) * CELL, y: o.y + (within % 10) * CELL };
}

function times(ph: number) {
  const r = Math.pow(10, REF_PH - ph);
  if (r >= 1) return `${Math.round(r).toLocaleString("en-US")}×`;
  return `1/${Math.round(1 / r).toLocaleString("en-US")}`;
}

function Gate({ interact, ph }: { interact: () => void; ph: number }) {
  const { reach } = useMilestones(interact, MILESTONES);
  useEffect(() => {
    if (ph <= TARGET_PH) reach("reached-ph-2");
  });
  return null;
}

// The zoomed view of coffee's one square, for pH above 5.
const ZOOM = 2 * FLAT + GAP; // 125 units across
const ZX = FLAT + GAP + 20;
const ZC = ZOOM / 10;

/** Lifts the kit's phase so the reveal can show the state it describes (pH 2, 1,000x). */
function PhaseSync({ phase, onPhase }: { phase: string; onPhase: (p: string) => void }) {
  useEffect(() => onPhase(phase), [phase, onPhase]);
  return null;
}

export default function PhLogScale({ slug }: { slug: string }) {
  const [phSet, setPh] = useState(REF_PH);
  const [phaseNow, setPhaseNow] = useState("predict");
  const ph = phaseNow === "reveal" ? TARGET_PH : phSet;
  const ratio = Math.pow(10, REF_PH - ph);
  const whole = ratio >= 1 ? Math.round(ratio) : 0;
  const zoomCells = ratio < 1 ? Math.round(ratio * 100) : 0; // 10 at pH 6, 1 at pH 7
  const steps = ph - REF_PH;
  const setTo = (v: number) => setPh(Math.max(MIN_PH, Math.min(MAX_PH, v)));

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Say black coffee is pH 5 and lemon juice pH 2 (round values). Same-sized cups: how many times more hydrogen ions does the lemon juice have?",
        options: ["About 2.5 times", "3 times", "About 30 times", "About 1,000 times"],
        answer: 3,
      }}
      exploreHint="Step down from coffee at pH 5 to lemon juice at pH 2, one step at a time."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            You stepped from pH 5 to pH 2: one small square became a strip of 10, a block of 100, then ten blocks:{" "}
            <strong>{TARGET_TIMES.toLocaleString("en-US")}</strong>. Each pH step down multiplies the hydrogen ions by
            10, and 5 to 2 is three steps: 10 &times; 10 &times; 10.
          </p>
          <p>
            pH numbers count tens, not amounts, so 3 steps apart is not 3 times. For the round values pH 5 and pH 2 it
            is exactly 1,000; real coffees and lemon juices vary, from roughly 200 to 1,300 times.
          </p>
          <p className="muted">Going up divides by 10: pure water at pH 7 has 1/100 of coffee&rsquo;s.</p>
        </>
      )}
    >
      {({ phase, locked: lockedPhase, interact }) => {
        const locked = lockedPhase || phase === "reveal";
        return (
        <div className={s.wrap}>
          <PhaseSync phase={phase} onPhase={setPhaseNow} />
          <Gate interact={interact} ph={ph} />
          <div className={s.head}>
            <span className={s.big}>{times(ph)}</span>
            <span className="muted small">{ratio >= 1 ? "coffee’s hydrogen ions" : "of coffee’s hydrogen ions"}</span>
          </div>

          <svg
            viewBox={`0 0 ${5 * FLAT + 4 * GAP} ${TOP + 2 * FLAT + GAP + 22}`}
            className="stage-svg"
            role="img"
            aria-label={`At pH ${ph}, ${times(ph)} the hydrogen ions of black coffee. One small square is coffee's amount.`}
          >
            {ratio >= 1 &&
              Array.from({ length: 10 }, (_, f) => {
                const o = flatOrigin(f);
                return (
                  <rect
                    key={`f${f}`}
                    x={o.x + 0.5}
                    y={o.y + 0.5}
                    width={FLAT - 1}
                    height={FLAT - 1}
                    rx={2}
                    fill="var(--bg-2)"
                    stroke="var(--line)"
                  />
                );
              })}
            {Array.from({ length: whole }, (_, k) => {
              const { x, y } = cellXY(k);
              return <rect key={k} x={x + 0.5} y={y + 0.5} width={CELL - 1} height={CELL - 1} fill="var(--domain)" />;
            })}
            {ratio < 1 && (
              <g>
                <line x1={CELL} y1={TOP} x2={ZX} y2={TOP} stroke="var(--muted)" strokeDasharray="2 2" />
                <line x1={CELL} y1={TOP + CELL} x2={ZX} y2={TOP + ZOOM} stroke="var(--muted)" strokeDasharray="2 2" />
                <rect x={ZX} y={TOP} width={ZOOM} height={ZOOM} fill="var(--bg-2)" stroke="var(--fg)" strokeWidth={1} />
                {Array.from({ length: zoomCells }, (_, k) => (
                  <rect
                    key={`z${k}`}
                    x={ZX + Math.floor(k / 10) * ZC + 0.5}
                    y={TOP + (k % 10) * ZC + 0.5}
                    width={ZC - 1}
                    height={ZC - 1}
                    fill="var(--domain)"
                  />
                ))}
                <text x={ZX + ZOOM + 8} y={TOP + 14} className={s.note}>
                  coffee&rsquo;s square,
                </text>
                <text x={ZX + ZOOM + 8} y={TOP + 27} className={s.note}>
                  zoomed in
                </text>
              </g>
            )}
            {/* coffee's amount: one square, always outlined */}
            <rect x={0.5} y={TOP + 0.5} width={CELL - 1} height={CELL - 1} fill="none" stroke="var(--fg)" strokeWidth={0.8} />
            <text x={0} y={TOP + 2 * FLAT + GAP + 16} className={s.note}>
              {ratio < 1
                ? `Now ${zoomCells === 10 ? "a tenth" : "a hundredth"} of coffee’s square`
                : "▪ = hydrogen ions in a cup of black coffee. Lower pH, more ions."}
            </text>
          </svg>

          <Row>
            <Control disabled={locked || ph <= MIN_PH} onClick={() => setTo(ph - 1)}>
              pH down 1 (×10)
            </Control>
          </Row>
          <Slider
            label="pH (slide right for more acid)"
            value={MAX_PH + MIN_PH - ph}
            min={MIN_PH}
            max={MAX_PH}
            disabled={locked}
            format={() => String(ph)}
            onChange={(v) => setTo(MAX_PH + MIN_PH - v)}
          />
          <div className={s.ends} aria-hidden>
            <span>pH 7 water</span>
            <span>pH 2 lemon</span>
          </div>
          <Row>
            <Control disabled={locked || ph >= MAX_PH} onClick={() => setTo(ph + 1)}>
              pH up 1 (÷10)
            </Control>
            <Readout label="Liquid" value={LABELS[ph] ?? "—"} />
            <Readout
              label="Steps from coffee"
              value={steps === 0 ? "0" : steps < 0 ? `${-steps} down (${times(ph)})` : `${steps} up (${times(ph)})`}
            />
          </Row>
        </div>
        );
      }}
    </Lesson>
  );
}
