"use client";

// A speed histogram of 60 water molecules (one dot each), drawn from the Maxwell–Boltzmann spread
// at 25 °C with a seeded generator. Each column is a button: tap it and its fastest molecule
// escapes (only columns above the threshold are buttons; slower ones are too slow). The dashed line is the average speed; the thermometer shows the average kinetic
// energy (temperature) as a share of the start. Lifting out the fast tail drags both down.

import { useMemo, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const N = 60;
const SEED = 1; // untuned: the first seed tried
const BIN = 150; // m/s per column
const NB = 10;
const KB = 1.380649e-23;
const M = 18.015 * 1.66054e-27; // kg per water molecule
const SIG = Math.sqrt((KB * 298) / M); // m/s per axis

const START: number[][] = (() => {
  const r = mulberry32(SEED);
  const g = () => Math.sqrt(-2 * Math.log(1 - r())) * Math.cos(2 * Math.PI * r());
  const v = Array.from({ length: N }, () => Math.hypot(g() * SIG, g() * SIG, g() * SIG));
  const bins: number[][] = Array.from({ length: NB }, () => []);
  for (const x of v) bins[Math.min(NB - 1, Math.floor(x / BIN))].push(x);
  for (const b of bins) b.sort((a, c) => a - c);
  return bins;
})();
const all = (b: number[][]) => b.flat();
const mean = (v: number[]) => v.reduce((a, x) => a + x, 0) / v.length;
const meanSq = (v: number[]) => v.reduce((a, x) => a + x * x, 0) / v.length;
const MEAN0 = mean(all(START));
const MS0 = meanSq(all(START));
// Escape threshold: the first column wholly faster than the starting rms speed (630 m/s -> 750 m/s).
// Every molecule there is above both the average speed and the rms speed, and both only fall as
// the fast ones leave, so each escape lowers the average speed AND the average energy.
const FAST_BIN = Math.ceil(Math.sqrt(MS0) / BIN);
const MAXV = NB * BIN;

export default function TheFastOnesLeave({ slug }: { slug: string }) {
  const [bins, setBins] = useState(START);
  const [fastGone, setFastGone] = useState(0);
  // The coolest state the learner reached (kept through "put them back", so the reveal describes it).
  const [low, setLow] = useState({ avg: MEAN0, energy: 1, gone: 0 });
  const ix = useRef(() => {});
  const { reach } = useMilestones(() => ix.current(), ["fast-gone"]);

  const v = useMemo(() => all(bins), [bins]);
  const avg = mean(v);
  const energy = meanSq(v) / MS0; // temperature as a share of the start

  const take = (i: number) => {
    const nb = bins.map((col, j) => (j === i ? col.slice(0, -1) : col));
    setBins(nb);
    const nv = all(nb);
    const a = mean(nv);
    if (a < low.avg) setLow({ avg: a, energy: meanSq(nv) / MS0, gone: N - nv.length });
    const n = fastGone + 1; // only fast columns are buttons
    setFastGone(n);
    if (n >= 3) reach("fast-gone");
  };

  const gone = N - v.length;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "You step out of a pool, and the fastest water molecules escape from the surface of the water on your arm. The molecules left behind have an average speed that is…",
        options: ["Higher", "Lower", "Unchanged"],
        answer: 1,
      }}
      exploreHint="Each dot is a molecule. Only the pink ones on the right are fast enough to escape. Tap a pink column: one escapes."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            {low.gone > 0 ? (
              <>
                When you had let {low.gone} fast molecules escape, the average speed of the rest had gone from about{" "}
                <strong>{Math.round(MEAN0)} m/s</strong> to <strong>{Math.round(low.avg)} m/s</strong>, and the
                thermometer had fallen to {Math.round(low.energy * 100)}% of its start
                {low.gone !== gone ? " (before you put them back)" : ""}. Each tap lowered both.
              </>
            ) : (
              <>
                Let the fastest molecules escape and the average speed of the rest falls below the starting{" "}
                <strong>{Math.round(MEAN0)} m/s</strong>, and the thermometer falls with it.
              </>
            )}
          </p>
          <p>
            Temperature is the average energy of the molecules&apos; motion. Only molecules with enough energy break free
            of the surface, so evaporation takes away the high-energy tail and the average of what remains drops. That is
            how sweat cools you.
          </p>
          <p className="muted">
            With only 60 molecules, each escape moves the average a lot. Real water loses a far smaller share: losing 1%
            of its mass as vapour cools the rest by about 6 °C.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        ix.current = interact;
        return (
          <div className={s.wrap}>
            <div className={s.chart}>
              <div className={s.hist} role="group" aria-label="Molecule speeds, slow to fast">
                {bins.map((col, i) =>
                  i < FAST_BIN ? (
                    <div key={i} className={`${s.col} ${s.inert}`} aria-label={`${i * BIN}–${(i + 1) * BIN} m/s: too slow to escape`}>
                      {col.map((_, k) => (
                        <span key={k} className={s.dot} />
                      ))}
                    </div>
                  ) : (
                  <Control
                    key={i}
                    className={s.col}
                    onClick={() => take(i)}
                    disabled={locked || col.length === 0}
                    aria-label={`Let one molecule at ${i * BIN}–${(i + 1) * BIN} m/s escape`}
                  >
                    {col.map((_, k) => (
                      <span key={k} className={`${s.dot} ${s.fast}`} />
                    ))}
                  </Control>
                  ),
                )}
                <span className={s.avg0} style={{ left: `${(MEAN0 / MAXV) * 100}%` }} />
                <span className={s.avg} style={{ left: `${(avg / MAXV) * 100}%` }}>
                  <span className={s.avgLabel}>{Math.round(avg)} m/s</span>
                </span>
              </div>
              <div className={s.thermoBox}>
              <svg viewBox="0 0 30 180" className={s.thermo} role="img" aria-label={`Temperature at ${Math.round(energy * 100)}% of the start`}>
                <rect x={10} y={8} width={10} height={150} rx={5} className={s.tube} />
                <rect x={12} y={152 - 140 * Math.min(1, energy)} width={6} height={140 * Math.min(1, energy) + 6} className={s.mercury} />
                <circle cx={15} cy={165} r={9} className={s.bulb} />
                <line x1={6} x2={24} y1={12} y2={12} className={s.mark} />
              </svg>
              <span className={s.tlabel}>{locked ? 100 : Math.round(energy * 100)}%</span>
              </div>
            </div>
            <div className={s.axis}>
              <span>grey: too slow to escape</span>
              <span>speed →</span>
              <span>pink: can escape</span>
            </div>
            <div className={s.reset}>
              <Control
                onClick={() => {
                  setBins(START);
                  setFastGone(0);
                }}
                disabled={locked || gone === 0}
                aria-label="Put them all back"
              >
                ↺
              </Control>
            </div>
          </div>
        );
      }}
    </Lesson>
  );
}
