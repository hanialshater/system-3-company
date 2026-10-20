"use client";

// Virulence trade-off toy. Harm v removes carriers at v per day on top of recovery at 1 per day, so
// an infection lasts 1 / (1 + v) days on average. Spread rate is 4 * sqrt(v) new cases per carrier per
// day (the square-root link is chosen for the toy). R0 = rate x duration = 4 sqrt(v) / (1 + v), the
// number of new cases per carrier. Peak at v = 1 (R0 = 2): grid-searched in node (artifacts/scratch/w5life/virulence.mjs).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const VALUES = [0.1, 0.25, 0.5, 1, 2, 4, 8];
const PRESETS = [0.25, 1, 4];
const rate = (v: number) => 4 * Math.sqrt(v);
const days = (v: number) => 1 / (1 + v);
const r0 = (v: number) => rate(v) * days(v);
const f1 = (x: number) => x.toFixed(1);
const fv = (v: number) => String(v);

const W = 320, H = 150, L = 30, R = 12, T = 12, B = 26;
const LX0 = Math.log10(0.1), LX1 = Math.log10(8), YMAX = 2.4;
const px = (v: number) => L + ((W - L - R) * (Math.log10(v) - LX0)) / (LX1 - LX0);
const py = (y: number) => T + (H - T - B) * (1 - y / YMAX);

function Stage({ locked, v, tried, pick }: { locked: boolean; v: number | null; tried: number[]; pick: (v: number) => void }) {
  const pts = [...tried].sort((a, b) => a - b);
  const msg =
    locked
      ? "Toy germ. Harm v adds to daily removal of carriers. R0 = new cases per carrier."
      : v === null
        ? "Pick a harm level to plot its R0."
        : `Harm ${fv(v)}: spreads ${f1(rate(v))} cases a day for ${f1(days(v))} days. R0 = ${f1(r0(v))}.`;
  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.svg}`} role="img" aria-label={msg}>
        {[0, 1, 2].map((y) => (
          <g key={y}>
            <line x1={L} x2={W - R} y1={py(y)} y2={py(y)} className={s.grid} />
            <text x={L - 4} y={py(y) + 3} textAnchor="end" className={s.axis}>{y}</text>
          </g>
        ))}
        {[0.1, 1, 8].map((x) => (
          <text key={x} x={px(x)} y={H - 10} textAnchor="middle" className={s.axis}>{x}</text>
        ))}
        <text x={W - R} y={H - 1} textAnchor="end" className={s.axis}>harm v (log scale) →</text>
        <text x={L + 2} y={T - 2} className={s.axis}>R0</text>
        {!locked && PRESETS.every((p) => tried.includes(p)) && (
          <polyline
            points={Array.from({ length: 41 }, (_, i) => {
              const x = Math.pow(10, LX0 + ((LX1 - LX0) * i) / 40);
              return `${px(x).toFixed(1)},${py(r0(x)).toFixed(1)}`;
            }).join(" ")}
            className={s.line}
            style={{ strokeDasharray: "3 3", opacity: 0.6 }}
          />
        )}
        {!locked && pts.length > 1 && (
          <polyline points={pts.map((p) => `${px(p).toFixed(1)},${py(r0(p)).toFixed(1)}`).join(" ")} className={s.line} />
        )}
        {!locked && pts.map((p) => (
          <circle key={p} cx={px(p)} cy={py(r0(p))} r={p === v ? 6 : 4} className={p === v ? s.cur : s.pt} />
        ))}
      </svg>
      <p className={s.msg} aria-live="polite">{msg}</p>
      <Row>
        {PRESETS.map((p) => (
          <Control key={p} className={v === p ? "active" : ""} disabled={locked || v === p} onClick={() => pick(p)}>
            Harm {fv(p)}
          </Control>
        ))}
      </Row>
      <Slider
        label="Harm v"
        value={v === null ? 0 : VALUES.indexOf(v)}
        min={0}
        max={VALUES.length - 1}
        step={1}
        disabled={locked}
        onChange={(i) => pick(VALUES[i])}
        format={(i) => fv(VALUES[i])}
      />
    </div>
  );
}

export default function VirulenceSweetSpot({ slug }: { slug: string }) {
  const [v, setV] = useState<number | null>(null);
  const [tried, setTried] = useState<number[]>([]);
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "You are tracking a made-up germ. A more harmful strain infects faster, but its carriers stay sick for fewer days. Example, harm 0.25: 2.0 new cases a day for 0.8 days, so R0 = 1.6 new cases per carrier in all. Which harm level gives the highest R0?",
        options: ["v = 0.25", "v = 1", "v = 4"],
        answer: 1,
      }}
      exploreHint="Try harm 0.25, 1 and 4, and watch R0 on the plot."
      minInteractions={3}
      reveal={() => {
        const pts = [...tried].sort((a, b) => a - b);
        return (
          <>
            <p>
              You plotted {pts.map((p) => `harm ${fv(p)}: R0 ${f1(r0(p))}`).join("; ")}. R0 rose, then fell, peaking at harm 1.
            </p>
            <p>
              More harm means faster spread (4 × √v) but a shorter infection (1 ÷ (1 + v) days). R0 is their product, so R0 peaks in the middle. In this toy the square-root link is chosen; real germs vary and the theory is debated.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["harm-0.25", "harm-1", "harm-4"]}>
          {(reach) => (
            <Stage
              locked={locked}
              v={v}
              tried={tried}
              pick={(x) => {
                setV(x);
                setTried((t) => (t.includes(x) ? t : [...t, x]));
                if (x === 0.25) reach("harm-0.25");
                if (x === 1) reach("harm-1");
                if (x === 4) reach("harm-4");
              }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
