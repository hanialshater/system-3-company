"use client";

// The square-cube law (Big Ideas brief #3, square-cube-giants). Scale a person by k in every direction:
// weight ×k³, leg-bone cross-section ×k² (same shape), so load per square centimetre of bone ×k.
// "Thicker legs" is the lesson's illustrative alternative: bone diameter ×k^1.5, so cross-section ×k³ and load ×1.
// Picture: an ordinary person (1×) beside the scaled one on one ground line, drawn to scale (the giant's height is
// k × the person's), and a load bar against an illustrative limit line at 4× today's load.
// Controls (DOM order = QA order): scale slider (1-10), "Make it 10×", "Legs: same shape / thicker" toggle.
// Milestones: ten (same shape at 10×; weight, area and load recorded), thick (thicker legs on at a scale above 1).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const LIMIT = 4; // illustrative limit, × today's load (claim c4)
const BAR_MAX = 12;
const fmt = (x: number) => (Number.isInteger(x) ? x.toLocaleString("en-US") : x.toFixed(1));

function scaleOf(k: number, thick: boolean) {
  const weight = k ** 3;
  const area = thick ? k ** 3 : k ** 2;
  return { weight, area, load: weight / area };
}

// a simple person, feet at (x, ground), height h, legs width scaled by legW (1 = normal)
function Person({ x, ground, h, legW, legColor }: { x: number; ground: number; h: number; legW: number; legColor: string }) {
  const head = h * 0.13;
  const bodyTop = ground - h + head * 2;
  const hip = ground - h * 0.47;
  const w = h * 0.26;
  const lw = Math.min(w / 2, h * 0.07 * legW);
  return (
    <g>
      <circle cx={x} cy={ground - h + head} r={head} fill="var(--bg-2)" stroke="var(--fg)" strokeWidth={1.5} />
      <rect x={x - w / 2} y={bodyTop} width={w} height={hip - bodyTop} rx={w * 0.2} fill="var(--bg-2)" stroke="var(--fg)" strokeWidth={1.5} />
      <rect x={x - w / 2} y={hip} width={lw} height={ground - hip} fill={legColor} stroke="var(--fg)" strokeWidth={1.2} />
      <rect x={x + w / 2 - lw} y={hip} width={lw} height={ground - hip} fill={legColor} stroke="var(--fg)" strokeWidth={1.2} />
    </g>
  );
}

export default function TenTimesTallerGiant({ slug }: { slug: string }) {
  const [k, setK] = useState(1);
  const [thick, setThick] = useState(false);
  const [tenSeen, setTenSeen] = useState<{ weight: number; area: number; load: number } | null>(null);

  const ten = tenSeen ?? scaleOf(10, false);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Scale a person up 10 times in every direction: same shape, same bone. How much more load does each square centimetre of leg bone carry?",
        options: ["The same", "10 times", "100 times", "1,000 times"],
        answer: 1,
      }}
      exploreHint="Grow the person to 10×, then try thicker legs."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            At 10× the giant weighed {fmt(ten.weight)}× as much, but its leg bones were only {fmt(ten.area)}× as big in
            cross-section, so each square centimetre carried {fmt(ten.load)}× the load, well past the illustrative limit.
          </p>
          <p>Thicker legs kept the load level. Galileo argued in 1638 that giants need disproportionately thick bones.</p>
          <p>
            Where it stops: big mammals mostly stand more upright instead of growing far thicker bones, which keeps bone stress
            roughly level.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["ten", "thick"]}>
          {(reach) => {
            const set = (nk: number, nThick: boolean) => {
              if (locked) return;
              setK(nk);
              setThick(nThick);
              if (nk === 10 && !nThick) {
                if (!tenSeen) setTenSeen(scaleOf(10, false));
                reach("ten");
              }
              if (nThick && nk > 1) reach("thick");
            };
            const cur = scaleOf(k, thick);
            const over = cur.load > LIMIT;
            const ground = 136;
            const unit = 12.4; // px height of the 1× person
            const barX = 300;
            const barTop = 20;
            const barH = ground - barTop;
            const yOf = (v: number) => ground - (Math.min(v, BAR_MAX) / BAR_MAX) * barH;
            const legColor = over ? "var(--bad)" : "var(--domain)";
            return (
              <div className={s.wrap}>
                <p className={s.msg} aria-live="polite">
                  {locked
                    ? "Make a prediction to start."
                    : tenSeen
                      ? `10×, same shape: weight ×${fmt(tenSeen.weight)}, bone ×${fmt(tenSeen.area)}, load ×${fmt(tenSeen.load)}`
                      : `Scale ${k}×, ${thick ? "thicker legs" : "same shape"}`}
                </p>
                <svg viewBox="0 0 360 150" className="stage-svg" role="img" aria-label={`Person scaled ${k} times, load ${fmt(cur.load)} times`}>
                  <line x1={10} y1={ground} x2={270} y2={ground} stroke="var(--line)" strokeWidth={2} />
                  <Person x={34} ground={ground} h={unit} legW={1} legColor="var(--domain)" />
                  <text x={34} y={ground + 12} textAnchor="middle" className={s.lab}>
                    1×
                  </text>
                  <Person x={150} ground={ground} h={unit * k} legW={thick ? Math.sqrt(k) : 1} legColor={legColor} />
                  <text x={150} y={ground + 12} textAnchor="middle" className={s.lab}>
                    {locked ? "?" : `${k}× ${thick ? "thicker legs" : "same shape"}`}
                  </text>
                  <text x={barX + 16} y={12} textAnchor="middle" className={s.lab}>
                    load per cm²
                  </text>
                  <rect x={barX} y={barTop} width={32} height={barH} fill="var(--bg-2)" stroke="var(--line)" />
                  {!locked ? (
                    <rect x={barX} y={yOf(cur.load)} width={32} height={ground - yOf(cur.load)} fill={over ? "var(--bad)" : "var(--good)"} />
                  ) : null}
                  <line x1={barX - 6} y1={yOf(LIMIT)} x2={barX + 38} y2={yOf(LIMIT)} stroke="var(--fg)" strokeWidth={2} strokeDasharray="5 3" />
                  <text x={barX - 8} y={yOf(LIMIT) - 4} textAnchor="end" className={s.lab}>
                    limit (illustrative)
                  </text>
                  <text x={barX + 16} y={Math.min(yOf(cur.load), ground) - 4} textAnchor="middle" className={over ? s.badText : s.big}>
                    {locked ? "" : `${fmt(cur.load)}×`}
                  </text>
                </svg>
                <div className={s.readouts}>
                  <Readout label="Weight" value={locked ? "?" : `×${fmt(cur.weight)}`} />
                  <Readout label="Bone area" value={locked ? "?" : `×${fmt(cur.area)}`} />
                  <Readout label="Load/cm²" value={locked ? "?" : `×${fmt(cur.load)}`} />
                </div>
                <Slider label="Scale" value={k} min={1} max={10} step={1} disabled={locked} format={(v) => `${v}×`} onChange={(v) => set(v, thick)} />
                <div className={s.controls}>
                  <Control disabled={locked || k === 10} onClick={() => set(10, thick)}>
                    Make it 10×
                  </Control>
                  <Control className={thick ? "active" : ""} aria-pressed={thick} disabled={locked} onClick={() => set(k, !thick)}>
                    Legs: {thick ? "thicker" : "same shape"}
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
