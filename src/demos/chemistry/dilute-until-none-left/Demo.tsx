"use client";

// Serial dilution against the Avogadro constant. Step 0: 10 mL of 1.0 mol/L dye = 6.0e21 molecules.
// Each step is 1:10 (1 mL into 9 mL water), so the 10 mL tube at step k holds on average 6.022e21 x 10^-k molecules.
// A single real tube holds a random whole number (Poisson). From step 19 the stage draws one seeded sample tube.
// Seed base 3000 was chosen from six tried: it shows 5 at step 21 (average 6.0) and 0 at step 22 (average 0.60),
// which is a typical outcome, not a guarantee (at an average of 0.60 about 55% of tubes hold none).
// Key states (milestones): step 21 (average about 6) and step 22 (average below 1).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const NA = 6.02214076e23;
const TUBE_L = 0.01;
const stock = (NA * TUBE_L) / 1; // molecules in 10 mL of 1.0 mol/L
const average = (k: number) => stock * 10 ** -k;
const FEW = 21;
const NONE = 22;
const MAX_STEP = 30;
const MILESTONES = ["few", "none"] as const;

const sample = (k: number) => {
  const mean = average(k);
  const rng = mulberry32(3000 + k);
  const lim = Math.exp(-mean);
  let c = 0;
  let p = 1;
  do {
    c++;
    p *= rng();
  } while (p > lim);
  return c - 1;
};
const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
const fmtAvg = (v: number) => {
  if (v < 1000) return v >= 10 ? v.toFixed(1) : v >= 1 ? v.toFixed(2) : v.toFixed(2);
  const e = Math.floor(Math.log10(v));
  return `${(v / 10 ** e).toFixed(1)} × 10${String(e)
    .split("")
    .map((c) => SUP[Number(c)])
    .join("")}`;
};

const TX = 24;
const TY = 14;
const TW = 74;
const TH = 112;

export default function Dilution({ slug }: { slug: string }) {
  const [k, setK] = useState(0);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `1.0 mL of 1.0 mol/L dye goes into 9 mL of water (a 1:10 step), then 1 mL of that into the next 9 mL, and so on. After how many steps does a 10 mL tube hold, on average, fewer than 1 molecule?`,
        options: ["10 steps", `${NONE} steps`, "60 steps"],
        answer: 1,
      }}
      exploreHint="Repeat the 1:10 step to 21, then 22, and watch the dots in the tube."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            At step {FEW} the average tube held about <strong>{fmtAvg(average(FEW))}</strong> molecules. At step {NONE} it was about <strong>{fmtAvg(average(NONE))}</strong>: less than one.
          </p>
          <p>
            The start tube held about {fmtAvg(stock)} molecules and each step divides the count by 10, so it runs out after about {NONE} steps. Past that, a typical tube holds only
            water, though by chance a few still catch one.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const set = (v: number) => {
              setK(v);
              if (v === FEW) reach("few");
              if (v === NONE) reach("none");
            };
            const mean = average(k);
            const show = k >= 19;
            const c = show ? sample(k) : 0;
            const fade = Math.max(0.08, Math.min(1, Math.log10(Math.max(mean, 1)) / 21.8));
            const logw = Math.max(0, ((Math.log10(mean) + 2) / 24) * 280);
            const dots: [number, number][] = [];
            if (show) {
              const rng = mulberry32(555 + k);
              for (let i = 0; i < c; i++) dots.push([TX + 8 + rng() * (TW - 16), TY + 12 + rng() * (TH - 24)]);
            }
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Each step: 1 mL into 9 mL water. Tube = 10 mL.</p>
                <svg viewBox="0 0 320 186" className="stage-svg" role="img" aria-label={locked ? "Dilution tube" : `Step ${k}: average ${fmtAvg(mean)} molecules`}>
                  <rect x={TX} y={TY} width={TW} height={TH} rx={8} fill={`color-mix(in srgb, var(--domain) ${Math.round(fade * (locked ? 0 : 60))}%, transparent)`} stroke="var(--fg)" strokeWidth={2} />
                  {dots.map((d, i) => (
                    <circle key={i} cx={d[0]} cy={d[1]} r={4} className={s.dot} />
                  ))}
                  <text x={TX + TW + 16} y={TY + 16} className={s.axis}>
                    {locked ? "" : `step ${k}`}
                  </text>
                  <text x={TX + TW + 16} y={TY + 40} className={s.small}>
                    {locked ? "" : show ? `this tube: ${c} molecule${c === 1 ? "" : "s"}` : "too many dots to draw"}
                  </text>
                  <text x={TX + TW + 16} y={TY + 62} className={s.small}>
                    {locked ? "" : `average: ${fmtAvg(mean)}`}
                  </text>
                  <text x={20} y={150} className={s.axis}>
                    molecules (log scale)
                  </text>
                  <rect x={20} y={156} width={280} height={8} className={s.ghostFill} />
                  {!locked && <rect x={20} y={156} width={logw} height={8} className={s.main} />}
                  <line x1={20 + (2 / 24) * 280} x2={20 + (2 / 24) * 280} y1={152} y2={168} stroke="var(--bad)" strokeWidth={2} />
                  <text x={20 + (2 / 24) * 280} y={182} textAnchor="middle" className={s.small} style={{ fill: "var(--bad)" }}>
                    1 molecule
                  </text>
                </svg>
                <Row>
                  <Readout label="Step" value={locked ? "?" : k} />
                  <Readout label="Average per tube" value={locked ? "?" : fmtAvg(mean)} />
                </Row>
                <Row>
                  <Control disabled={locked || k >= MAX_STEP} onClick={() => set(k + 1)}>
                    Dilute 1:10 once
                  </Control>
                  {[10, FEW, NONE].map((t) => (
                    <Control key={t} className={k === t ? "active" : ""} disabled={locked || k === t} onClick={() => set(t)}>
                      Repeat to step {t}
                    </Control>
                  ))}
                </Row>
                <Slider label="Step" value={k} min={0} max={MAX_STEP} step={1} disabled={locked} onChange={set} />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
