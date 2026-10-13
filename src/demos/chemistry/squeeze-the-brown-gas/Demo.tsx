"use client";

// A cylinder of N2O4 (pairs) and NO2 (single brown dots) at 25 °C. Push the plunger to halve the
// volume: the gas goes darker at once (same molecules, half the space), then fades part way
// back as some NO2 pairs up into N2O4. The counts come from the real equilibrium constant.

import { useEffect, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

// N2O4 <-> 2 NO2 at 298 K. Kp = exp(-ΔG°/RT) with ΔG° = 2(51.31) − 97.89 = 4.73 kJ/mol → 0.148 bar.
const KP = Math.exp(-4730 / (8.314 * 298));
const KC = KP / (0.08314 * 298); // mol/L
const C0 = 0.03395; // mol/L of N2O4 before any splits: about 1 bar total at the start
const UNITS = 60; // N2O4 units drawn (each NO2 pair counts as one unit)
// Fraction split: Kc = 4 a² c / (1 − a)
const split = (c: number) => (-KC + Math.sqrt(KC * KC + 16 * c * KC)) / (8 * c);
const countsAt = (vol: number) => {
  const k = Math.round(UNITS * split(C0 / vol));
  return { no2: 2 * k, n2o4: UNITS - k };
};
const FULL = countsAt(1);
const HALF = countsAt(0.5);
const share = (c: { no2: number; n2o4: number }) => c.no2 / (c.no2 + c.n2o4);
const pct = (x: number) => `${Math.round(100 * x)}%`;

const W = 320;
const H = 170;
const X0 = 14;
const LEN = 250; // full cylinder length
const Y0 = 30;
const HT = 110;
const SEED = 4; // untuned: only places the dots

const spots = (() => {
  const rng = mulberry32(SEED);
  return Array.from({ length: 2 * UNITS }, () => ({ u: rng(), v: rng(), a: rng() * Math.PI }));
})();

type Shown = { vol: number; no2: number; n2o4: number; settling: boolean };

export default function SqueezeTheBrownGas({ slug }: { slug: string }) {
  const [shown, setShown] = useState<Shown>({ vol: 1, ...FULL, settling: false });
  const [sawSettle, setSawSettle] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ix = useRef(() => {});
  const { reach } = useMilestones(() => ix.current(), ["squeezed"]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const moveTo = (vol: number) => {
    if (timer.current) clearTimeout(timer.current);
    // At once: same molecules, new space. Then the equilibrium shifts.
    setShown((p) => ({ vol, no2: p.no2, n2o4: p.n2o4, settling: true }));
    timer.current = setTimeout(() => {
      setShown({ vol, ...(vol < 1 ? HALF : FULL), settling: false });
      if (vol < 1) {
        setSawSettle(true);
        reach("squeezed");
      }
    }, 380);
  };

  const len = LEN * shown.vol;
  const conc = shown.no2 / shown.vol; // NO2 per unit volume, sets the brown
  const total = shown.no2 + shown.n2o4;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "N₂O₄ (colourless) and 2 NO₂ (brown) are in equilibrium. You halve the volume and wait. Compared with before, the share of NO₂ molecules is…",
        options: ["Higher", "Lower", "The same"],
        answer: 1,
      }}
      exploreHint="Push the plunger in. Watch the colour, then the count."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            {sawSettle ? "You saw" : "Push the plunger and you see"} the gas darken at once, then fade part way back. The
            share of NO₂ fell from about <strong>{pct(share(FULL))}</strong> to about <strong>{pct(share(HALF))}</strong>
            : some NO₂ paired up into N₂O₄.
          </p>
          <p>
            Two NO₂ make one N₂O₄, so pairing up means fewer molecules pushing on the walls. Squeezed, the mixture shifts
            toward the side with fewer gas molecules and partly undoes the squeeze. Only partly: it ends darker than it
            started, because the space is smaller.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        ix.current = interact;
        return (
          <div className={s.wrap}>
            <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`${shown.no2} NO2 and ${shown.n2o4} N2O4 molecules`}>
              <rect
                x={X0}
                y={Y0}
                width={len}
                height={HT}
                className={`${s.gas} ${shown.settling ? "" : s.fade}`}
                style={{ fillOpacity: Math.min(0.75, conc * 0.012) }}
              />
              {spots.slice(0, total).map((p, i) => {
                const x = X0 + 6 + p.u * (len - 12);
                const y = Y0 + 6 + p.v * (HT - 12);
                return i < shown.no2 ? (
                  <circle key={i} cx={x} cy={y} r={3} className={s.no2} />
                ) : (
                  <g key={i} transform={`translate(${x} ${y}) rotate(${(p.a * 180) / Math.PI})`}>
                    <circle cx={-2.6} r={2.6} className={s.n2o4} />
                    <circle cx={2.6} r={2.6} className={s.n2o4} />
                  </g>
                );
              })}
              <path d={`M ${X0} ${Y0} L ${X0 + LEN + 6} ${Y0} M ${X0} ${Y0 + HT} L ${X0 + LEN + 6} ${Y0 + HT} M ${X0} ${Y0} L ${X0} ${Y0 + HT}`} className={s.wall} />
              <rect x={X0 + len} y={Y0 + 2} width={8} height={HT - 4} className={s.piston} />
              <rect x={X0 + len + 8} y={Y0 + HT / 2 - 4} width={W - X0 - len - 8} height={8} className={s.piston} />
              <text x={X0} y={18} className={s.small}>
                25 °C · brown = NO₂
              </text>
              <circle cx={X0 + 4} cy={H - 14} r={3.5} className={s.no2} />
              <text x={X0 + 12} y={H - 10} className={s.small}>
                NO₂
              </text>
              <circle cx={X0 + 46} cy={H - 14} r={3} className={s.n2o4} />
              <circle cx={X0 + 52} cy={H - 14} r={3} className={s.n2o4} />
              <text x={X0 + 60} y={H - 10} className={s.small}>
                N₂O₄
              </text>
            </svg>
            <Row>
              <Control onClick={() => moveTo(0.5)} disabled={locked || shown.vol < 1}>
                Push in (half volume)
              </Control>
              <Control onClick={() => moveTo(1)} disabled={locked || shown.vol === 1}>
                Pull back
              </Control>
            </Row>
            <Row>
              <Readout label="NO₂ share" value={shown.settling ? "…" : pct(share(shown))} />
              <Readout label="Molecules" value={total} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
