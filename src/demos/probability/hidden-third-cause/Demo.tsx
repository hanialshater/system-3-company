"use client";

// Confounding. 365 simulated days: warm weather drives both ice-cream sales and sunburns,
// and neither affects the other. Across all days the cloud is a tight rising streak.
// The payoff: hold temperature still (one 3-degree band) and the streak becomes a blob.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { BAND, BAND_STARTS, SEED, correlation, fit, inBand, town } from "./model";
import s from "./styles.module.css";

const DAYS = town(SEED);
const ALL_R = correlation(DAYS);
const LO = -4;
const HI = 46;
const W = 320;
const H = 250;
const PAD = 26;
const sx = (v: number) => PAD + ((v - LO) / (HI - LO)) * (W - PAD - 8);
const sy = (v: number) => H - PAD - ((v - LO) / (HI - LO)) * (H - PAD - 8);
const word = (r: number) => (Math.abs(r) >= 0.6 ? "strong" : Math.abs(r) >= 0.3 ? "weak" : "almost none");

export default function HiddenThirdCause({ slug }: { slug: string }) {
  const [banded, setBanded] = useState(false);
  const [start, setStart] = useState(26);

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
    <Lesson
      slug={slug}
      predict={{
        question:
          "In a simulated town, ice-cream sales and sunburns rise together. Warm weather drives both; neither affects the other. Compare only days with the same temperature. What happens to the link?",
        options: ["Stays strong", "Mostly disappears", "Reverses"],
        answer: 1,
      }}
      exploreHint="Switch to days of the same temperature, then slide the band from cool to hot."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Across all 365 days the link is strong (correlation {ALL_R.toFixed(2)}). Inside a 3-degree band it{" "}
            <strong>mostly disappears</strong>: the 28 bands average about 0.05, and range from about &minus;0.2 to
            0.3 only by chance, with roughly 35 days each.
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
            {!locked && (
              <line x1={sx(line.x1)} y1={sy(line.y1)} x2={sx(line.x2)} y2={sy(line.y2)} className={s.fit} />
            )}
          </svg>
          <p className={s.key}>
            Grey: cool days. Red: hot days.{" "}
            {banded ? `Showing ${start}–${start + BAND}°C only.` : "Showing all days."}
          </p>
          <Row>
            <Control
              className={banded ? "active" : ""}
              disabled={locked}
              onClick={() => {
                setBanded((b) => !b);
                interact();
              }}
            >
              {banded ? "Show all days" : "Same temperature only"}
            </Control>
            <Readout label="Link (correlation)" value={locked ? "?" : `${r.toFixed(2)}: ${word(r)}`} />
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
                interact();
              }}
            />
          </Row>
        </div>
      )}
    </Lesson>
  );
}
