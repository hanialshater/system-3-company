"use client";

// Hydrogen ions in a fixed sample of seawater, as dots on a plain (not log) count: 100 dots at
// pH 8.2. Sliding pH down in steps of 0.1 multiplies the count by 10^0.1 ≈ 1.26 each step:
// 126 at 8.1, about 200 at 7.9, about 250 at 7.8. A box marks the 100 at pH 8.2 for comparison.

import { useState } from "react";
import { Readout, Row, Slider } from "@/kit/controls";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const REF_PH = 8.2;
const NOW_PH = 8.1;
const REF_DOTS = 100;
const MIN_PH = 7.8;
const ratio = (p: number) => Math.pow(10, REF_PH - p); // [H+] relative to pH 8.2
const pct = (p: number) => Math.round((ratio(p) - 1) * 100);
const RISE = pct(NOW_PH); // 26
const NAMES = ["down-0.1"] as const;

const W = 320;
const COLS = 20;
const GAP = 14.5;
const X0 = 22;
const Y0 = 14;
const ROWS = Math.ceil((REF_DOTS * ratio(MIN_PH)) / COLS); // 13
const H = Y0 + ROWS * GAP + 20;
const ph1 = (v: number) => v.toFixed(1);

export default function PointOneIs26Percent({ slug }: { slug: string }) {
  const [p, setP] = useState(REF_PH);
  const [lowest, setLowest] = useState(REF_PH);
  const n = Math.round(REF_DOTS * ratio(p));

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Surface seawater pH fell from about ${ph1(REF_PH)} to about ${ph1(NOW_PH)} since pre-industrial times. Its hydrogen ion concentration rose by about…`,
        options: ["1%", `${RISE}%`, "100%"],
        answer: 1,
      }}
      exploreHint={`Slide the pH down to ${ph1(NOW_PH)} and count the dots.`}
      minInteractions={NAMES.length}
      reveal={() => (
        <>
          <p>
            {lowest <= NOW_PH + 1e-9 ? "You saw" : "Slide it and you see"} the {REF_DOTS} hydrogen ions at pH{" "}
            {ph1(REF_PH)} become <strong>{Math.round(REF_DOTS * ratio(NOW_PH))}</strong> at pH {ph1(NOW_PH)}: a rise of
            about {RISE}%.
            {lowest <= REF_PH - 0.3 + 1e-9 ? ` At ${ph1(REF_PH - 0.3)} you saw about ${Math.round(REF_DOTS * ratio(REF_PH - 0.3))}: double.` : ""}
          </p>
          <p>
            pH counts powers of ten of hydrogen ion concentration, so each 0.1 step down multiplies it by 10
            <sup>0.1</sup>, about 1.26. A fall of 0.3 is about a doubling. What looks like a change in the second
            digit is about a quarter more hydrogen ions in the ocean&apos;s surface water.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={NAMES}>
          {(reach) => (
            <div className={s.wrap}>
              <svg
                viewBox={`0 0 ${W} ${H}`}
                className={`stage-svg ${s.fit}`}
                role="img"
                aria-label={`At pH ${ph1(p)}, ${n} hydrogen ion dots against ${REF_DOTS} at pH ${ph1(REF_PH)}`}
              >
                <rect
                  x={X0 - 8}
                  y={Y0 - 8}
                  width={COLS * GAP + 1}
                  height={(REF_DOTS / COLS) * GAP + 1}
                  rx={6}
                  className={s.ref}
                />
                {Array.from({ length: n }, (_, i) => (
                  <circle
                    key={i}
                    cx={X0 + (i % COLS) * GAP}
                    cy={Y0 + Math.floor(i / COLS) * GAP}
                    r={4.2}
                    className={i < REF_DOTS ? s.h : s.extra}
                  />
                ))}
                <text x={W / 2} y={H - 4} textAnchor="middle" className={s.small}>
                  one dot = same tiny amount of H⁺ · box = pH {ph1(REF_PH)}
                </text>
              </svg>
              <Slider
                label="Seawater pH"
                value={p}
                min={MIN_PH}
                max={REF_PH}
                step={0.1}
                disabled={locked}
                format={ph1}
                onChange={(v) => {
                  const r = Math.round(v * 10) / 10;
                  setP(r);
                  setLowest((x) => Math.min(x, r));
                  if (r <= NOW_PH + 1e-9) reach("down-0.1");
                }}
              />
              <Row>
                <Readout label="H⁺ dots" value={n} />
                <Readout label={`vs pH ${ph1(REF_PH)}`} value={`+${pct(p)}%`} />
              </Row>
            </div>
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
