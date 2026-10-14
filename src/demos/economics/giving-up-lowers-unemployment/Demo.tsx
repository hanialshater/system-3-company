"use client";

// Giving up lowers unemployment. A toy town: 100 people want work, 90 working, 10 looking (10%).
// Rate = looking ÷ (working + looking); people not looking are outside the count.
// 4 stop looking: 6 / 96 = 6.25%, jobs still 90. 4 find jobs instead: 6 / 100 = 6%, jobs 94.
// Picture: a 10 × 10 grid of people inside a "counted" boundary (filled = working, ring = looking);
// people who stop looking move to a grey "not looking" box outside it. Rate and jobs sit beside the grid.
// Controls (DOM order): [4 stop looking] [4 find jobs] presets (each from the base 90 / 10), then a slider
// "Stop looking" (0 to 10, from the base). Milestones: "gave-up" (4 stop looking: 6.25%, jobs 90 recorded)
// and "found" (4 find jobs: 6%, jobs 94 recorded). The record row keeps both.
// Model: a made-up town of 100, not any country's statistics.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const WORKING = 90;
const LOOKING = 10;
const Q = 4;
const MILESTONES = ["gave-up", "found"] as const;

/** g people stop looking, f people find jobs, both from the base 90 / 10. */
function town(g: number, f: number) {
  const working = WORKING + f;
  const looking = LOOKING - f - g;
  return { working, looking, out: g, rate: (100 * looking) / (working + looking) };
}
const pct = (v: number) => `${Number.isInteger(Math.round(v * 100) / 100) ? Math.round(v) : (Math.round(v * 100) / 100).toString()}%`;
const BASE = town(0, 0);

// Geometry (viewBox 320 × 196).
const GX = 14;
const GY = 26;
const P = 16;
const R = 6;
const OX = 208;
const OY = 150;
const OP = 22;

type Rec = { rate: number; jobs: number };

export default function GivingUpLowersUnemployment({ slug }: { slug: string }) {
  const [g, setG] = useState(0);
  const [f, setF] = useState(0);
  const [gr, setGr] = useState<Rec | null>(null);
  const [fr, setFr] = useState<Rec | null>(null);
  const t = town(g, f);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "100 people want work: 90 have jobs, 10 are looking. 4 of the 10 stop looking. No new jobs. The unemployment rate…",
        options: ["rises", "stays at 10%", "falls"],
        answer: 2,
      }}
      exploreHint="Press both presets and compare the rate and the jobs."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            When 4 people gave up, the rate fell from {pct(BASE.rate)} to <strong>{pct(gr?.rate ?? 6.25)}</strong> and jobs stayed at{" "}
            {gr?.jobs ?? 90}: the 4 left the count, so the top and the bottom both shrank. When 4 found jobs, the rate fell to{" "}
            {pct(fr?.rate ?? 6)} and jobs rose to <strong>{fr?.jobs ?? 94}</strong>.
          </p>
          <p>
            Two almost equal rates, two different stories. A falling rate alone cannot tell you which happened; the number of jobs can. A
            toy town of 100.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const set = (ng: number, nf: number) => {
              setG(ng);
              setF(nf);
              const r = town(ng, nf);
              if (ng === Q && nf === 0) {
                setGr((x) => x ?? { rate: r.rate, jobs: r.working });
                reach("gave-up");
              }
              if (nf === Q && ng === 0) {
                setFr((x) => x ?? { rate: r.rate, jobs: r.working });
                reach("found");
              }
            };
            // People 0..89 work; 90..99 look. Finders are 90.., quitters are 99 downward.
            const people = Array.from({ length: 100 }, (_, i) => {
              const quitIdx = 99 - i; // 0 for person 99
              const isOut = !locked && i >= WORKING && quitIdx < g;
              const isWorking = i < WORKING || (!locked && i < WORKING + f);
              const x = isOut ? OX + (quitIdx % 5) * OP : GX + P / 2 + (i % 10) * P;
              const y = isOut ? OY + Math.floor(quitIdx / 5) * OP : GY + P / 2 + Math.floor(i / 10) * P;
              const cls = isOut ? s.out : isWorking ? s.working : s.looking;
              return <circle key={i} cx={0} cy={0} r={R} className={`${s.person} ${cls}`} style={{ transform: `translate(${x}px, ${y}px)` }} />;
            });
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Rate = looking ÷ (working + looking). People not looking are not counted.</p>
                <svg
                  viewBox="0 0 320 196"
                  className="stage-svg"
                  role="img"
                  aria-label={locked ? "100 people: 90 working, 10 looking" : `${t.working} working, ${t.looking} looking, ${t.out} not looking: rate ${pct(t.rate)}`}
                >
                  <text x={GX} y={GY - 6} className={s.label}>
                    counted
                  </text>
                  <rect x={GX - 2} y={GY - 2} width={10 * P + 4} height={10 * P + 4} rx={6} className={s.box} />
                  <text x={196} y={GY + 8} className={s.label}>
                    rate
                  </text>
                  <text x={196} y={GY + 32} className={s.big}>
                    {locked ? "?" : pct(t.rate)}
                  </text>
                  <text x={196} y={GY + 48} className={s.axis}>
                    start {pct(BASE.rate)}
                  </text>
                  <text x={196} y={GY + 72} className={s.label}>
                    jobs
                  </text>
                  <text x={196} y={GY + 96} className={s.big}>
                    {locked ? "?" : t.working}
                  </text>
                  <text x={196} y={OY - 18} className={s.label}>
                    not looking
                  </text>
                  <rect x={OX - 12} y={OY - 12} width={5 * OP + 2} height={2 * OP + 2} rx={6} className={s.outBox} />
                  {people}
                </svg>
                <p className={s.rec} aria-live="polite">
                  {locked ? "" : !gr && !fr ? "Try a preset." : null}
                  {!locked && gr && (
                    <span style={{ display: "block" }}>
                      4 gave up: {pct(gr.rate)}, jobs {gr.jobs}
                    </span>
                  )}
                  {!locked && fr && (
                    <span style={{ display: "block" }}>
                      4 found jobs: {pct(fr.rate)}, jobs {fr.jobs}
                    </span>
                  )}
                </p>
                <Row>
                  <Control className={g === Q && f === 0 ? "active" : ""} disabled={locked || (g === Q && f === 0)} onClick={() => set(Q, 0)}>
                    4 stop looking
                  </Control>
                  <Control className={f === Q ? "active" : ""} disabled={locked || f === Q} onClick={() => set(0, Q)}>
                    4 find jobs
                  </Control>
                </Row>
                <Slider label="Stop looking" value={g} min={0} max={10} step={1} disabled={locked} onChange={(v) => set(v, 0)} />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
