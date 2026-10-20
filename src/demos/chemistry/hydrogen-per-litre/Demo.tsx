"use client";

// Hydrogen per litre. Brief: company/domains/briefs/chemistry.energy-rates.md #8.
// Every value is computed from cited constants; there is no simulation.
//   Octane (stands in for petrol): ΔcH = 8(−393.51) + 9(−285.83) − (−250.1) = −5,470 kJ/mol;
//     / 114.23 g/mol = 47.9 MJ/kg; x 0.703 kg/L = 33.7 MJ/L.
//   Hydrogen: 285.83 kJ/mol / 2.016 g/mol = 141.8 MJ/kg (ratio 2.96).
//     Gas at 25 °C, 1 atm: ρ = PM/RT = 0.0824 g/L, so 11.7 kJ/L (petrol x2,880 per litre).
//     Liquid at −253 °C: 70.8 g/L, so 10.0 MJ/L (petrol x3.4).
// Both heats are higher heating values (water formed as liquid).
//
// One linear axis (0-150 MJ per kg, 0-35 MJ per litre) and three bar rows. Locked: empty slots for
// petrol and hydrogen, no values. Milestones: "per-kg" (both bars per kilogram), "per-litre" (both
// per litre of gas: the question's case), "liquid" (ghost bar for liquid hydrogen). DOM order of the
// controls reaches all three, one press each; the per-litre bars stay drawn under the ghost bar and the
// per-kg values stay on the readout row.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const R_GAS = 8.314; // J/(mol K)
const DH_CO2 = 393.51; // kJ/mol released per CO2 (CODATA)
const DH_H2O = 285.83; // kJ/mol released per H2O(l) (CODATA)
const DH_OCTANE_F = -250.1; // kJ/mol, ΔfH n-octane(l) (CRC)
const M_OCTANE = 8 * 12.011 + 18 * 1.008; // g/mol
const M_H2 = 2.016; // g/mol
const OCT_KJ_MOL = 8 * DH_CO2 + 9 * DH_H2O + DH_OCTANE_F; // 5,470 kJ/mol
const OCT_J_KG = (OCT_KJ_MOL * 1e3) / (M_OCTANE / 1000); // 47.9 MJ/kg
const H2_J_KG = (DH_H2O * 1e3) / (M_H2 / 1000); // 141.8 MJ/kg
const RHO_OCT = 0.703; // kg/L (CRC)
const RHO_H2_GAS = (101325 * (M_H2 / 1000)) / (R_GAS * 298.15) / 1000; // kg/L, 8.24e-5
const RHO_H2_LIQ = 0.0708; // kg/L at −253 °C (CRC)
const OCT_J_L = OCT_J_KG * RHO_OCT; // 33.7 MJ/L
const H2_GAS_J_L = H2_J_KG * RHO_H2_GAS; // 11.7 kJ/L
const H2_LIQ_J_L = H2_J_KG * RHO_H2_LIQ; // 10.0 MJ/L

const sig2 = (x: number) => {
  const r = Number(x.toPrecision(2));
  return r >= 1000 ? r.toLocaleString("en-US") : r >= 100 ? String(Math.round(r)) : String(r);
};
const ratio = (a: number, b: number) => `×${a / b < 10 ? (a / b).toFixed(1) : sig2(a / b)}`;
function joules(j: number) {
  const units: [number, string][] = [[1e9, "GJ"], [1e6, "MJ"], [1e3, "kJ"]];
  for (const [f, u] of units) if (j >= f) return `${Math.round(j / f) >= 100 ? Math.round(j / f) : sig2(j / f)} ${u}`;
  return `${sig2(j)} J`;
}

const W = 320;
const H = 162; // the footnote line "octane for petrol · water formed as liquid" moved to claim c2 (learner r10)
const L = 10;
const RR = 310;
// Linear axis (learner r10, W-840: the old log axis drew petrol's 2,900-fold lead as about 4 times). Per kg the
// axis runs 0-150 MJ, per litre 0-35 MJ, so hydrogen gas per litre is a hairline (drawn 1.5 px wide, labelled).
const MAX = { kg: 150e6, L: 35e6 } as const;
const TICK_MJ = { kg: [0, 50, 100, 150], L: [0, 10, 20, 30] } as const;
const ROWS = { petrol: 30, gas: 72, liquid: 114 } as const;
const BH = 20;
const AXIS_Y = 144;

type Unit = "none" | "kg" | "L";

export default function HydrogenPerLitre({ slug }: { slug: string }) {
  const [unit, setUnit] = useState<Unit>("none");
  const [liquid, setLiquid] = useState(false);
  const [seenKg, setSeenKg] = useState(false);
  const [seenL, setSeenL] = useState(false);
  const [seenLiq, setSeenLiq] = useState(false);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Per kilogram, burning hydrogen gives about 3 times the energy of petrol. Per litre, as gas at room pressure, how does hydrogen compare?",
        options: ["about 3 times more", "about the same", "about 30 times less", "about 3,000 times less"],
        answer: 3,
      }}
      exploreHint="Compare per kilogram, then per litre, then liquefy the hydrogen."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            Per kilogram hydrogen won, about {joules(H2_J_KG)} against {joules(OCT_J_KG)} for petrol. Per litre it lost by
            about <strong>{sig2(OCT_J_L / H2_GAS_J_L)} times</strong>: a litre of hydrogen gas at room pressure weighs only
            0.08 g, so it carries about {joules(H2_GAS_J_L)} ({(H2_GAS_J_L / 1e6).toFixed(3)} MJ, the hairline), while a litre of petrol carries about {joules(OCT_J_L)}.
          </p>
          <p>
            Even liquefied at −253 °C, hydrogen holds about {sig2(OCT_J_L / H2_LIQ_J_L)} times less per litre. Which fuel is
            “best” depends on whether you are short of mass or short of space.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Stage
          locked={locked}
          interact={interact}
          unit={unit}
          setUnit={setUnit}
          liquid={liquid}
          setLiquid={setLiquid}
          seenKg={seenKg}
          setSeenKg={setSeenKg}
          seenL={seenL}
          setSeenL={setSeenL}
          seenLiq={seenLiq}
          setSeenLiq={setSeenLiq}
        />
      )}
    </Lesson>
  );
}

function Stage({
  locked,
  interact,
  unit,
  setUnit,
  liquid,
  setLiquid,
  seenKg,
  setSeenKg,
  seenL,
  setSeenL,
  seenLiq,
  setSeenLiq,
}: {
  locked: boolean;
  interact: () => void;
  unit: Unit;
  setUnit: (u: Unit) => void;
  liquid: boolean;
  setLiquid: (b: boolean) => void;
  seenKg: boolean;
  setSeenKg: (b: boolean) => void;
  seenL: boolean;
  setSeenL: (b: boolean) => void;
  seenLiq: boolean;
  setSeenLiq: (b: boolean) => void;
}) {
  const { reach } = useMilestones(interact, ["per-kg", "per-litre", "liquid"]);

  const perKg = () => {
    setUnit("kg");
    setSeenKg(true);
    reach("per-kg");
  };
  const perL = () => {
    setUnit("L");
    setSeenL(true);
    reach("per-litre");
  };
  const toggleLiquid = () => {
    if (liquid && unit === "L") {
      setLiquid(false);
      return;
    }
    setUnit("L");
    setSeenL(true);
    setLiquid(true);
    setSeenLiq(true);
    reach("per-litre");
    reach("liquid");
  };

  const pVal = unit === "kg" ? OCT_J_KG : OCT_J_L;
  const hVal = unit === "kg" ? H2_J_KG : H2_GAS_J_L;
  const per = unit === "kg" ? "kg" : "L";
  const showLiquid = liquid && unit === "L";
  const scale = unit === "kg" ? MAX.kg : MAX.L;
  const X = (v: number) => L + Math.min(1, v / scale) * (RR - L);
  const bar = (v: number) => Math.max(1.5, X(v) - L);
  const pLabel = unit === "none" ? "petrol (octane)" : `petrol (octane): ${joules(pVal)}/${per}`;
  const hLabel =
    unit === "none"
      ? "hydrogen"
      : unit === "L"
        ? `hydrogen gas: ${(hVal / 1e6).toFixed(3)} MJ/L (${joules(hVal)}), a hairline`
        : `hydrogen: ${joules(hVal)}/${per}`;
  const lLabel = `liquid hydrogen: ${joules(H2_LIQ_J_L)}/L`;

  return (
    <div className={s.wrap}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={`stage-svg ${s.fit}`}
        role="img"
        aria-label={`Energy from burning. ${pLabel}. ${hLabel}.${showLiquid ? ` ${lLabel}.` : ""}`}
      >
        {unit !== "none" &&
          TICK_MJ[unit].map((mj, i, all) => {
            const x = X(mj * 1e6);
            return (
              <g key={`${unit}-${mj}`}>
                <line x1={x} x2={x} y1={ROWS.petrol - 16} y2={AXIS_Y} className={s.grid} />
                <text x={x} y={AXIS_Y + 14} textAnchor={i === 0 ? "start" : i === all.length - 1 ? "end" : "middle"} className={s.tick}>
                  {mj === 0 ? "0" : `${mj} MJ`}
                </text>
              </g>
            );
          })}
        <line x1={L} x2={RR} y1={AXIS_Y} y2={AXIS_Y} className={s.axis} />

        <text x={L} y={ROWS.petrol - 5} className={s.label}>
          {pLabel}
        </text>
        {unit === "none" ? (
          <rect x={L} y={ROWS.petrol} width={RR - L} height={BH} className={s.slot} />
        ) : (
          <rect x={L} y={ROWS.petrol} width={bar(pVal)} height={BH} className={s.petrol} />
        )}

        <text x={L} y={ROWS.gas - 5} className={s.label}>
          {hLabel}
        </text>
        {unit === "none" ? (
          <rect x={L} y={ROWS.gas} width={RR - L} height={BH} className={s.slot} />
        ) : (
          <rect x={L} y={ROWS.gas} width={bar(hVal)} height={BH} className={s.hydrogen} />
        )}

        {showLiquid && (
          <>
            <text x={L} y={ROWS.liquid - 5} className={s.label}>
              {lLabel}
            </text>
            <rect x={L} y={ROWS.liquid} width={bar(H2_LIQ_J_L)} height={BH} className={s.ghost} />
          </>
        )}
      </svg>
      <Row>
        <Control className={unit === "kg" ? "active" : ""} disabled={locked || unit === "kg"} onClick={perKg}>
          Per kilogram
        </Control>
        <Control className={unit === "L" && !liquid ? "active" : ""} disabled={locked || (unit === "L" && !liquid)} onClick={() => { setLiquid(false); perL(); }}>
          Per litre (gas, 1 atm)
        </Control>
      </Row>
      <Row>
        <Control className={showLiquid ? "active" : ""} aria-pressed={showLiquid} disabled={locked} onClick={toggleLiquid}>
          {showLiquid ? "Back to gas only" : "Liquefy hydrogen (−253 °C)"}
        </Control>
      </Row>
      <Row>
        <Readout label="Per kg: H₂ · petrol" value={seenKg ? `${joules(H2_J_KG)} · ${joules(OCT_J_KG)}` : "–"} />
        <Readout
          label="Per litre: petrol ahead"
          value={seenL ? `gas ${ratio(OCT_J_L, H2_GAS_J_L)}${seenLiq ? ` · liquid ${ratio(OCT_J_L, H2_LIQ_J_L)}` : ""}` : "–"}
        />
      </Row>
    </div>
  );
}
