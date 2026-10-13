"use client";

// Confounding. 365 simulated days: warm weather drives both ice-cream sales and sunburns,
// and neither affects the other. Across all days the cloud is a tight rising streak.
// The payoff: hold temperature still (one 3-degree band) and the streak becomes a blob.
// Key state: the learner has held temperature still in at least three different bands.
// The reveal quotes the learner's own bands and the 28-band summary, both computed from the model.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { BAND, BAND_STARTS, SEED, correlation, fit, inBand, town } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["banded", "three-bands"] as const;
const DAYS = town(SEED);
const ALL_R = correlation(DAYS);
const bandR = (start: number) => correlation(DAYS.filter((d) => inBand(d, start)));
const BAND_RS = BAND_STARTS.map(bandR);
const MEAN_R = BAND_RS.reduce((a, b) => a + b, 0) / BAND_RS.length;
const LO = -4;
const HI = 46;
const W = 320;
const H = 250;
const PAD = 26;
const sx = (v: number) => PAD + ((v - LO) / (HI - LO)) * (W - PAD - 8);
const sy = (v: number) => H - PAD - ((v - LO) / (HI - LO)) * (H - PAD - 8);
const word = (r: number) => (Math.abs(r) >= 0.6 ? "strong" : Math.abs(r) >= 0.3 ? "weak" : "almost none");
const sgn = (r: number) => r.toFixed(2).replace("-", "−");

function Stage({
  locked,
  reach,
  start,
  setStart,
  banded,
  setBanded,
  visit,
}: {
  locked: boolean;
  reach: (n: string) => void;
  start: number;
  setStart: (v: number) => void;
  banded: boolean;
  setBanded: (b: boolean) => void;
  visit: (v: number) => number;
}) {
  const shown = useMemo(() => (banded ? DAYS.filter((d) => inBand(d, start)) : DAYS), [banded, start]);
  const r = correlation(shown);
  const line = useMemo(() => {
    const { a, b } = fit(shown);
    const xs = shown.map((d) => d.sales);
    const x1 = Math.min(...xs);
    const x2 = Math.max(...xs);
    return { x1, y1: a + b * x1, x2, y2: a + b * x2 };
  }, [shown]);

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.svg}`} role="img" aria-label={`Ice-cream sales against sunburns for ${shown.length} days`}>
        <line x1={PAD} y1={H - PAD} x2={W - 6} y2={H - PAD} className={s.axis} />
        <line x1={PAD} y1={H - PAD} x2={PAD} y2={6} className={s.axis} />
        <text x={W - 8} y={H - 8} textAnchor="end" className={s.axisLabel}>
          Ice creams sold →
        </text>
        <text x={12} y={H - PAD - 4} transform={`rotate(-90 12 ${H - PAD - 4})`} className={s.axisLabel}>
          Sunburn cases →
        </text>
        {DAYS.map((d, i) => {
          const on = !banded || inBand(d, start);
          const heat = Math.round(((d.temp - 5) / 30) * 100);
          return (
            <circle
              key={i}
              cx={sx(d.sales)}
              cy={sy(d.sunburn)}
              r={on && banded ? 3.6 : 2.6}
              className={on ? s.dot : s.off}
              style={{ fill: `color-mix(in srgb, var(--bad) ${heat}%, var(--muted))` }}
            />
          );
        })}
        {!locked && <line x1={sx(line.x1)} y1={sy(line.y1)} x2={sx(line.x2)} y2={sy(line.y2)} className={s.fit} />}
      </svg>
      <p className={s.key}>
        Each dot is a day; red is hot. Correlation: +1 rise together, 0 no link.{" "}
        {banded ? `Only ${start}–${start + BAND}°C days.` : "All days."}
      </p>
      <Row>
        <Control
          className={banded ? "active" : ""}
          disabled={locked}
          onClick={() => {
            const b = !banded;
            setBanded(b);
            if (b) {
              reach("banded");
              if (visit(start) >= 3) reach("three-bands");
            }
          }}
        >
          {banded ? "Show all days" : "Same temperature only"}
        </Control>
        <Readout label="Link (correlation)" value={locked ? "?" : `${sgn(r)}: ${word(r)}`} />
      </Row>
      <Row>
        <Slider
          label="Temperature band"
          value={start}
          min={BAND_STARTS[0]}
          max={BAND_STARTS[BAND_STARTS.length - 1]}
          disabled={locked || !banded}
          format={(v) => `${v}–${v + BAND}°C`}
          onChange={(v) => {
            setStart(v);
            if (visit(v) >= 3) reach("three-bands");
          }}
        />
      </Row>
    </div>
  );
}

export default function HiddenThirdCause({ slug }: { slug: string }) {
  const [banded, setBanded] = useState(false);
  const [start, setStart] = useState(26);
  const [seen, setSeen] = useState<number[]>([]);
  // Bands the learner actually held still in (only counted while banded).
  const visit = (v: number) => {
    const next = seen.includes(v) ? seen : [...seen, v];
    if (next !== seen) setSeen(next);
    return next.length;
  };
  const mine = seen.length ? seen : [start];

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "In a simulated town, ice-cream sales and sunburns rise together. Warm weather drives both; neither affects the other. Compare only days with the same temperature. What happens to the link?",
        options: ["Stays strong", "Mostly disappears", "Reverses"],
        answer: 1,
      }}
      exploreHint="Switch to days of the same temperature, then slide the band to two other temperatures."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Across all 365 days the link is strong (correlation {ALL_R.toFixed(2)}). In the bands you held still in (
            {mine.slice(0, 4).map((b) => `${b}–${b + BAND}°C: ${sgn(bandR(b))}`).join("; ")}) it{" "}
            <strong>mostly disappears</strong>. Across all {BAND_STARTS.length} bands it averages {sgn(MEAN_R)} and ranges
            from {sgn(Math.min(...BAND_RS))} to {sgn(Math.max(...BAND_RS))} by chance, with roughly 35 days each.
          </p>
          <p>
            Hot days sell more ice cream <em>and</em> burn more skin. Line up all days and the two rise together; hold
            the hidden cause still and nothing is left to connect them.
          </p>
          <p className="muted">
            This town is built so temperature is the only link. Real data rarely announces its hidden causes; you
            have to think of them.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              reach={reach}
              start={start}
              setStart={setStart}
              banded={banded}
              setBanded={setBanded}
              visit={visit}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
