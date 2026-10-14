"use client";

// Limestone crossover. Brief: company/domains/briefs/chemistry.energy-rates.md #18.
// CaCO3 → CaO + CO2. 25 °C data (CRC; CODATA for CaO and CO2):
//   ΔH° = −634.9 − 393.51 − (−1,207.6) = +179.2 kJ/mol; ΔS° = 38.1 + 213.79 − 91.7 = +160.2 J/(mol K).
//   ΔG° = ΔH° − TΔS°: 25 °C +131 · 500 °C +55 · 900 °C −9 kJ/mol. ΔG° = 0 at 1,118.6 K = 845 °C,
//   holding ΔH° and ΔS° at their 25 °C values (an estimate; the stage says so).
//
// Two bars on one kJ/mol scale: ΔH (heat taken in, fixed) and TΔS (empty until a temperature chip is
// pressed). No crossover line before "Find the switch" (a pre-drawn line would point at the answer).
// Milestones: "t25", "t900" (ΔG recorded on its readout), "switch". QA path: chips 25, 500, 900, then
// "Find the switch" (enabled once 900 °C was reached), once each in DOM order.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const DH = -634.9 - 393.51 - -1207.6; // kJ/mol
const DS = (38.1 + 213.79 - 91.7) / 1000; // kJ/(mol K)
const tds = (c: number) => (c + 273.15) * DS;
const dG = (c: number) => DH - tds(c);
const T_SWITCH = DH / DS - 273.15; // °C
const kj = (v: number) => `${v > 0 ? "+" : v < 0 ? "−" : ""}${Math.abs(Math.round(v))}`;

const TEMPS = [25, 500, 900] as const;
type Temp = (typeof TEMPS)[number];

const W = 320;
const H = 132;
const L = 10;
const RR = 310;
const VMAX = 220;
const X = (v: number) => L + (v / VMAX) * (RR - L);
const ROW_H = 26;
const ROW_S = 74;
const BH = 20;
const AXIS_Y = 108;

export default function LimestoneCrossover({ slug }: { slug: string }) {
  const [now, setNow] = useState<Temp | null>(null);
  const [seen, setSeen] = useState<Temp[]>([]);
  const [found, setFound] = useState(false);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Limestone (CaCO₃) breaks into lime and CO₂ gas, absorbing heat. Above about what temperature does it go by itself (1 bar CO₂)?",
        options: ["about 100 °C", "about 400 °C", "about 850 °C", "about 2,000 °C"],
        answer: 2,
      }}
      exploreHint="Try each temperature, then find where the two bars match."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            At 25 °C the TΔS bar was far shorter than the {Math.round(DH)} kJ of heat needed, so ΔG was {kj(dG(25))} kJ and
            nothing happened. At 900 °C it passed the heat bar: ΔG was <strong>{kj(dG(900))} kJ</strong> and limestone breaks
            up by itself. The switch sits near {Math.round(T_SWITCH)} °C, where TΔS equals ΔH.
          </p>
          <p>
            Making a gas raises entropy, and temperature multiplies that gain. Absorbing heat does not forbid a change; it sets
            the temperature where it starts.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Stage
          locked={locked}
          interact={interact}
          now={now}
          setNow={setNow}
          seen={seen}
          setSeen={setSeen}
          found={found}
          setFound={setFound}
        />
      )}
    </Lesson>
  );
}

function Stage({
  locked,
  interact,
  now,
  setNow,
  seen,
  setSeen,
  found,
  setFound,
}: {
  locked: boolean;
  interact: () => void;
  now: Temp | null;
  setNow: (t: Temp) => void;
  seen: Temp[];
  setSeen: (t: Temp[]) => void;
  found: boolean;
  setFound: (b: boolean) => void;
}) {
  const { reach } = useMilestones(interact, ["t25", "t900", "switch"]);
  const pick = (t: Temp) => {
    setNow(t);
    if (!seen.includes(t)) setSeen([...seen, t]);
    if (t === 25) reach("t25");
    if (t === 900) reach("t900");
  };

  const v = now === null ? null : tds(now);
  const goes = now !== null && dG(now) < 0;
  const xs = X(DH);

  return (
    <div className={s.wrap}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={`stage-svg ${s.fit}`}
        role="img"
        aria-label={`ΔH, heat taken in: ${Math.round(DH)} kJ. ${now === null ? "TΔS not set" : `TΔS at ${now} °C: ${Math.round(v ?? 0)} kJ, ${goes ? "goes by itself" : "does not go"}`}${found ? `. Switch near ${Math.round(T_SWITCH)} °C` : ""}`}
      >
        {[0, 50, 100, 150, 200].map((g) => (
          <g key={g}>
            <line x1={X(g)} x2={X(g)} y1={ROW_H - 4} y2={AXIS_Y} className={s.grid} />
            {g % 100 === 0 && (
              <text x={X(g)} y={AXIS_Y + 13} textAnchor={g === 0 ? "start" : "middle"} className={s.tick}>
                {g === 200 ? "200 kJ" : g}
              </text>
            )}
          </g>
        ))}
        <line x1={L} x2={RR} y1={AXIS_Y} y2={AXIS_Y} className={s.axis} />

        <text x={L} y={ROW_H - 6} className={s.label}>
          ΔH (heat in): {Math.round(DH)} kJ
        </text>
        <rect x={L} y={ROW_H} width={X(DH) - L} height={BH} className={s.heat} />

        <text x={L} y={ROW_S - 6} className={s.label}>
          {now === null ? (
            "TΔS"
          ) : (
            <>
              TΔS at {now} °C: {Math.round(v ?? 0)} kJ ·{" "}
              <tspan className={goes ? s.go : s.nogo}>{goes ? "goes by itself" : "does not go"}</tspan>
            </>
          )}
        </text>
        {v === null ? (
          <rect x={L} y={ROW_S} width={RR - L} height={BH} className={s.slot} />
        ) : (
          <rect x={L} y={ROW_S} width={X(v) - L} height={BH} className={s.tds} />
        )}

        {found && (
          <>
            <line x1={xs} x2={xs} y1={ROW_H - 2} y2={AXIS_Y} className={s.switchLine} />
            <text x={RR} y={ROW_H - 6} textAnchor="end" className={s.switchText}>
              switch ≈ {Math.round(T_SWITCH)} °C (25 °C data)
            </text>
          </>
        )}
      </svg>
      <Row>
        {TEMPS.map((t) => (
          <Control key={t} className={now === t ? "active" : ""} disabled={locked || now === t} onClick={() => pick(t)}>
            {t} °C
          </Control>
        ))}
      </Row>
      <Row>
        <Control
          className={found ? "active" : ""}
          disabled={locked || found || !seen.includes(900)}
          onClick={() => {
            setFound(true);
            reach("switch");
          }}
        >
          Find the switch
        </Control>
      </Row>
      <Row>
        <Readout label="ΔG at 25 °C" value={seen.includes(25) ? `${kj(dG(25))} kJ` : "–"} />
        <Readout label="ΔG at 900 °C" value={seen.includes(900) ? `${kj(dG(900))} kJ` : "–"} />
      </Row>
    </div>
  );
}
