"use client";

// One gram, two fires. Burning carbon to CO2 releases 393.51 kJ/mol (CODATA / CRC), 32.8 kJ per gram.
// Fissioning every atom in 1 g of U-235 at about 200 MeV each releases
// (1 / 235.04) mol x 6.02214076e23 x 200e6 eV x 1.602176634e-19 J/eV = 8.21e10 J, 2.5 million times more.
// Per event: one CO2 formed frees 393.51e3 / 96,485 = 4.08 eV; one fission about 200 MeV.
// Brief: company/domains/briefs/chemistry.matter-reactions.md #2. Every value is computed from these
// constants; there is no simulation.
//
// One log axis (9 decades: 1 kJ to 1 TJ per gram, or 1 eV to 1 GeV per event), two bars on it. The
// uranium bar is an empty dashed slot until the learner splits the gram (no value before the commit).
//
// Earned reveal: milestones "split" (uranium bar shown), "match" (the carbon bar reaches the uranium
// bar; the number of tenfold steps and the matching mass are recorded) and "per-event" (the per-event
// view seen). DOM order: Split, Carbon x10, x10 until it passes, Per event: one press each reaches all
// three. The readouts keep the per-gram records visible in the per-event view.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const NA = 6.02214076e23;
const EV = 1.602176634e-19; // J
const C_PER_G = 393.51e3 / 12.011; // J per g of carbon burned
const U_PER_G = (1 / 235.04) * NA * 200e6 * EV; // J per g of U-235 fully fissioned
const EV_CO2 = 393.51e3 / 96485.33212; // eV per CO2 formed (4.08)
const EV_FISSION = 200e6; // eV per fission
const MAX_STEPS = 7; // 1 g -> 10 t
const MATCH_G = U_PER_G / C_PER_G; // 2.5e6 g

const W = 320;
const H = 150;
const L = 12;
const RR = 308;
const DECADES = 9;
const X = (v: number, lo: number) => L + Math.max(0, Math.min(DECADES, Math.log10(v) - lo)) * ((RR - L) / DECADES);
const ROW = { carbon: 30, uranium: 80 } as const;
const BH = 22;
const AXIS_Y = 122;

const sig2 = (x: number) => {
  const r = Number(x.toPrecision(2));
  return r >= 100 ? String(Math.round(r)) : String(r);
};
function joules(j: number) {
  const units: [number, string][] = [[1e12, "TJ"], [1e9, "GJ"], [1e6, "MJ"], [1e3, "kJ"]];
  for (const [f, u] of units) if (j >= f) return `${sig2(j / f)} ${u}`;
  return `${sig2(j)} J`;
}
function grams(g: number) {
  if (g >= 1e6) return `${sig2(g / 1e6)} t`;
  if (g >= 1e3) return `${sig2(g / 1e3)} kg`;
  return `${sig2(g)} g`;
}

export default function OneGramTwoFires({ slug }: { slug: string }) {
  const [steps, setSteps] = useState(0);
  const [split, setSplit] = useState(false);
  const [perEvent, setPerEvent] = useState(false);
  const [matchSteps, setMatchSteps] = useState<number | null>(null);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Burn 1 g of carbon completely. Split all the atoms in 1 g of uranium-235. To the nearest power of ten, the uranium releases…",
        options: ["about 100 times more", "about 10,000 times more", "about 1 million times more", "about 1 billion times more"],
        answer: 2,
      }}
      exploreHint="Split the uranium, then burn ten times more carbon per step until it catches up. Then look per event."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            Burning 1 g of carbon gave about {joules(C_PER_G)}; splitting 1 g of uranium-235 gave about{" "}
            {joules(U_PER_G)}, about <strong>{sig2(U_PER_G / C_PER_G / 1e6)} million times more</strong>. Carbon passed it on
            tenfold step {matchSteps ?? "?"}: about {grams(MATCH_G)} of carbon matches one gram.
          </p>
          <p>
            Per event the gap is bigger: forming one CO₂ frees about {EV_CO2.toFixed(0)} eV, one fission about 200 MeV.
            Burning only moves electrons between atoms; fission rearranges the nucleus itself.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Stage
          locked={locked}
          interact={interact}
          steps={steps}
          setSteps={setSteps}
          split={split}
          setSplit={setSplit}
          perEvent={perEvent}
          setPerEvent={setPerEvent}
          matchSteps={matchSteps}
          setMatchSteps={setMatchSteps}
        />
      )}
    </Lesson>
  );
}

function Stage({
  locked,
  interact,
  steps,
  setSteps,
  split,
  setSplit,
  perEvent,
  setPerEvent,
  matchSteps,
  setMatchSteps,
}: {
  locked: boolean;
  interact: () => void;
  steps: number;
  setSteps: (n: number) => void;
  split: boolean;
  setSplit: (b: boolean) => void;
  perEvent: boolean;
  setPerEvent: (b: boolean) => void;
  matchSteps: number | null;
  setMatchSteps: (n: number) => void;
}) {
  const { reach } = useMilestones(interact, ["split", "match", "per-event"]);
  const mass = Math.pow(10, steps);
  const cJ = mass * C_PER_G;

  const step = (to: number) => {
    setSteps(to);
    if (Math.pow(10, to) * C_PER_G >= U_PER_G) {
      if (matchSteps === null) setMatchSteps(to);
      reach("match");
    }
  };
  const untilPasses = () => {
    let n = steps;
    while (n < MAX_STEPS && Math.pow(10, n) * C_PER_G < U_PER_G) n++;
    step(n);
  };

  const lo = perEvent ? 0 : 3; // log10 of the axis start: 1 eV or 1 kJ
  const cVal = perEvent ? EV_CO2 : cJ;
  const uVal = perEvent ? EV_FISSION : U_PER_G;
  const tickNames = perEvent ? ["1 eV", "1 keV", "1 MeV", "1 GeV"] : ["1 kJ", "1 MJ", "1 GJ", "1 TJ"];
  const cLabel = perEvent ? `one CO₂ formed: ${EV_CO2.toFixed(1)} eV` : `${grams(mass)} carbon burned: ${joules(cJ)}`;
  const uLabel = perEvent ? "one U-235 fission: 200 MeV" : split ? `1 g U-235 split: ${joules(U_PER_G)}` : "1 g U-235 split";

  return (
    <div className={s.wrap}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={`stage-svg ${s.fit}`}
        role="img"
        aria-label={`${cLabel}. ${uLabel}.`}
      >
        {Array.from({ length: DECADES + 1 }, (_, i) => {
          const x = L + i * ((RR - L) / DECADES);
          return (
            <g key={i}>
              <line x1={x} x2={x} y1={ROW.carbon - 18} y2={AXIS_Y} className={s.grid} />
              {i % 3 === 0 && (
                <text x={x} y={AXIS_Y + 14} textAnchor={i === 0 ? "start" : i === DECADES ? "end" : "middle"} className={s.tick}>
                  {tickNames[i / 3]}
                </text>
              )}
            </g>
          );
        })}
        <line x1={L} x2={RR} y1={AXIS_Y} y2={AXIS_Y} className={s.axis} />

        <text x={L} y={ROW.carbon - 5} className={s.label}>
          {cLabel}
        </text>
        <rect x={L} y={ROW.carbon} width={X(cVal, lo) - L} height={BH} className={s.carbon} />

        <text x={L} y={ROW.uranium - 5} className={s.label}>
          {uLabel}
        </text>
        {split || perEvent ? (
          <rect x={L} y={ROW.uranium} width={X(uVal, lo) - L} height={BH} className={s.uranium} />
        ) : (
          <rect x={L} y={ROW.uranium} width={RR - L} height={BH} className={s.slot} />
        )}
        {split && !perEvent && (
          <line x1={X(U_PER_G, lo)} x2={X(U_PER_G, lo)} y1={ROW.carbon - 2} y2={ROW.uranium + BH + 2} className={s.match} />
        )}
      </svg>
      <Row>
        <Control
          className={split ? "active" : ""}
          disabled={locked || split}
          onClick={() => {
            setSplit(true);
            reach("split");
          }}
        >
          Split 1 g U-235
        </Control>
        <Control disabled={locked || perEvent || steps >= MAX_STEPS} onClick={() => step(steps + 1)}>
          Carbon ×10
        </Control>
      </Row>
      <Row>
        <Control disabled={locked || perEvent || steps >= MAX_STEPS} onClick={untilPasses}>
          ×10 until it passes
        </Control>
        <Control
          className={perEvent ? "active" : ""}
          aria-pressed={perEvent}
          disabled={locked}
          onClick={() => {
            setPerEvent(!perEvent);
            reach("per-event");
          }}
        >
          {perEvent ? "Per gram" : "Per event"}
        </Control>
      </Row>
      <Row>
        <Readout label="Per gram: carbon · U-235" value={`${joules(C_PER_G)} · ${split ? joules(U_PER_G) : "?"}`} />
        <Readout label="Carbon to match" value={matchSteps !== null ? `${grams(MATCH_G)} (${matchSteps} steps)` : "–"} />
      </Row>
    </div>
  );
}
