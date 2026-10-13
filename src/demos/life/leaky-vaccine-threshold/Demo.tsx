"use client";

// Toy model: a made-up disease with R0 = 4 in a well-mixed town of 400. A vaccine cuts each
// vaccinated person's chance of infection by the efficacy e. At the start of an outbreak
// R = R0 x (1 - coverage x e), so the coverage needed for R <= 1 is (1 - 1/R0) / e, which is
// impossible above 100%. Vaccinated people fill the town row by row; the inner dot's area is
// the efficacy. The dashed outline marks the coverage needed. Deterministic.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const R0 = 4;
const BASE = 1 - 1 / R0; // 0.75
const E_Q = 80, E_LOW = 70;
const TOWN = 400, COLS = 20, GAP = 14, RAD = 5.2;
const MILESTONES = ["efficacy-80", "over-100"] as const;

const needed = (e: number) => BASE / (e / 100);
const rEff = (c: number, e: number) => R0 * (1 - (c / 100) * (e / 100));
const pct = (x: number) => `${Math.round(100 * x)}%`;

function outline(n: number) {
  const full = Math.floor(n / COLS), part = n % COLS, W = COLS * GAP;
  const y1 = full * GAP, y2 = (full + 1) * GAP;
  return part === 0 ? `M0,0 H${W} V${y1} H0 Z` : `M0,0 H${W} V${y1} H${part * GAP} V${y2} H0 Z`;
}

function Stage({
  locked,
  c,
  e,
  setC,
  setE,
}: {
  locked: boolean;
  c: number;
  e: number;
  setC: (v: number) => void;
  setE: (v: number) => void;
}) {
  const nVax = Math.round((TOWN * c) / 100);
  const need = needed(e);
  const r = rEff(c, e);
  const inner = RAD * Math.sqrt(e / 100);
  const msg = locked
    ? `Make a prediction to start. Toy town, R0 ${R0}: perfect vaccine needs ${pct(BASE)} covered.`
    : need > 1
      ? `Efficacy ${e}%: even 100% coverage leaves R = ${rEff(100, e).toFixed(2)}. Coverage alone is not enough.`
      : `Efficacy ${e}%: need ${(100 * need).toFixed(1).replace(".0", "")}% covered (dashed). At ${c}%, R = ${r.toFixed(2)}.`;

  return (
    <div className={s.wrap}>
      <svg viewBox={`-4 -4 ${COLS * GAP + 8} ${(TOWN / COLS) * GAP + 8}`} className={`stage-svg ${s.svg}`} role="img" aria-label={msg}>
        {Array.from({ length: TOWN }, (_, i) => {
          const cx = (i % COLS) * GAP + GAP / 2, cy = Math.floor(i / COLS) * GAP + GAP / 2;
          const vax = !locked && i < nVax;
          return (
            <g key={i}>
              <circle cx={cx} cy={cy} r={RAD} className={vax ? s.vaxRing : s.sus} />
              {vax && <circle cx={cx} cy={cy} r={inner} className={s.shield} />}
            </g>
          );
        })}
        {!locked && need <= 1 && <path d={outline(Math.round(TOWN * need))} className={s.need} />}
      </svg>

      <div className={s.legend} aria-hidden>
        <span><i className={s.keyVax} />vaccinated (fill = protection)</span>
        <span><i className={s.keySus} />not</span>
        <span><i className={s.keyDash} />needed</span>
      </div>
      <p className={s.msg} aria-live="polite">{msg}</p>
      {!locked && need > 1 && <p className={s.flag}>Not enough alone</p>}

      <Row>
        {[E_Q, E_LOW].map((v) => (
          <Control key={v} className={e === v ? "active" : ""} aria-pressed={e === v} disabled={locked || e === v} onClick={() => setE(v)}>
            Efficacy {v}%
          </Control>
        ))}
      </Row>
      <Slider label="Efficacy" value={e} min={50} max={100} step={5} disabled={locked} format={(v) => `${v}%`} onChange={setE} />
      <Slider label="Coverage" value={c} min={0} max={100} step={5} disabled={locked} format={(v) => `${v}%`} onChange={setC} />
    </div>
  );
}

export default function LeakyVaccineThreshold({ slug }: { slug: string }) {
  const [c, setC] = useState(75);
  const [e, setEState] = useState(100);
  const [lowest, setLowest] = useState(100);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Made-up disease, R0 = ${R0}: a perfect vaccine would need ${pct(BASE)} coverage. This vaccine cuts each vaccinated person's infection chance by ${E_Q}%. Coverage needed?`,
        options: [pct(BASE), `About ${pct(needed(E_Q))}`, "Impossible: over 100%"],
        answer: 1,
      }}
      exploreHint={`Set efficacy to ${E_Q}%, then lower it until coverage alone cannot do it.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Each vaccinated person now counts as {E_Q / 100} of a protected person, so the {pct(BASE)} has to be covered by a weaker
            shield: {BASE} / {E_Q / 100} = {needed(E_Q).toFixed(4)}, about <strong>{pct(needed(E_Q))}</strong> of the town.
          </p>
          <p>
            You took efficacy down to {lowest}%. Below {pct(BASE)} efficacy the needed coverage passes 100%: at {E_LOW}% it would be{" "}
            {pct(needed(E_LOW))}, and even vaccinating everyone leaves R at {rEff(100, E_LOW).toFixed(1)}. The coverage needed depends on R0
            and on how well the vaccine works.
          </p>
          <p className="muted">Toy model: random mixing, a made-up disease, R at the start of an outbreak. Not a statement about any real vaccine.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              c={c}
              e={e}
              setC={setC}
              setE={(v) => {
                setEState(v);
                setLowest((x) => Math.min(x, v));
                if (v === E_Q) reach("efficacy-80");
                if (needed(v) > 1) reach("over-100");
              }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
