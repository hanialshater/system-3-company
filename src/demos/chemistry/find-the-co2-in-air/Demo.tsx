"use client";

// Find the CO2 in air. 10,000 molecules of dry air drawn as a 100 x 100 grid of dots (untapped
// texture). Dry air by volume (molecule count): N2 78.084%, O2 20.946%, Ar 0.934%, CO2 about 425 ppm
// (NOAA GML global marine-surface annual mean 2025: 425.62 ppm). Per 10,000: 7,808 + 2,095 + 93 + 4 = 10,000; the
// other gases (Ne, He, CH4, Kr, H2 ...) total about 27 ppm, 0.27 per 10,000, and round to no dot.
// One breath of 0.5 L at 25 °C and 1 atm: n = PV/RT = 0.0204 mol, x NA x 425e-6 = 5.2e18 CO2 molecules.
// Brief: company/domains/briefs/chemistry.solutions-acids.md #3.
//
// Layout: a seeded shuffle (mulberry32, seed 42) of the 10,000 cells. Seed 42 was picked because its
// four CO2 dots sit apart and away from the edge, so their rings do not overlap; the counts do not
// depend on the seed (claim c5).
//
// Earned reveal: milestones "all-gases" (all four chips tapped, each count shown in the legend),
// "magnified" (one CO2 magnified in the inset) and "breath" (the one-breath count shown). DOM order:
// N2, O2, Ar, CO2, Magnify, One breath: one press each reaches all three. Chips and the breath button
// are one-shot (disabled once done), so every record stays on stage when the reveal opens.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

type Gas = "n2" | "o2" | "ar" | "co2";
const GASES: { id: Gas; name: string; label: string; count: number }[] = [
  { id: "n2", name: "nitrogen", label: "N₂", count: 7808 },
  { id: "o2", name: "oxygen", label: "O₂", count: 2095 },
  { id: "ar", name: "argon", label: "Ar", count: 93 },
  { id: "co2", name: "carbon dioxide", label: "CO₂", count: 4 },
];
const SIDE = 100;
const CELL = 2.2;
const DOT = 1.7;
const SEED = 42;

// Breath: ideal gas at 25 °C, 1 atm, 0.5 L; 425 ppm of the molecules are CO2 (NOAA GML global mean 2025, 425.62).
const BREATH_CO2 = ((101325 * 0.0005) / (8.314 * 298.15)) * 6.02214076e23 * 425e-6; // 5.2e18

const W = 320;
const H = 252;
const IX = 229; // inset left
const IY = 124; // inset top
const IC = 10; // inset cell px
const IN = 9; // inset cells per side

function layout() {
  const rng = mulberry32(SEED);
  const idx = Array.from({ length: SIDE * SIDE }, (_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  // Rarest first: the first 4 shuffled cells are CO2, the next 93 argon, the next 2,095 oxygen, the rest N2.
  const gasOf: Gas[] = new Array(SIDE * SIDE).fill("n2");
  const cells: Record<Gas, number[]> = { n2: [], o2: [], ar: [], co2: [] };
  let k = 0;
  for (const g of ["co2", "ar", "o2"] as Gas[]) {
    const n = GASES.find((x) => x.id === g)!.count;
    for (let i = 0; i < n; i++, k++) {
      gasOf[idx[k]] = g;
      cells[g].push(idx[k]);
    }
  }
  const path = (list: number[]) =>
    list.map((c) => `M${((c % SIDE) * CELL).toFixed(1)} ${(Math.floor(c / SIDE) * CELL).toFixed(1)}h${DOT}v${DOT}h-${DOT}z`).join("");
  // The CO2 nearest the inset (bottom right) is the one magnified.
  const target = [...cells.co2].sort((a, b) => (b % SIDE) + Math.floor(b / SIDE) - ((a % SIDE) + Math.floor(a / SIDE)))[0];
  return { gasOf, cells, paths: { o2: path(cells.o2), ar: path(cells.ar), co2: path(cells.co2) }, target };
}

const centre = (c: number) => ({ x: (c % SIDE) * CELL + DOT / 2, y: Math.floor(c / SIDE) * CELL + DOT / 2 });
const fmt = (n: number) => n.toLocaleString("en-US");

export default function FindTheCo2InAir({ slug }: { slug: string }) {
  const [shown, setShown] = useState<Record<Gas, boolean>>({ n2: false, o2: false, ar: false, co2: false });
  const [magnified, setMagnified] = useState(false);
  const [breath, setBreath] = useState(false);

  const count = (g: Gas) => GASES.find((x) => x.id === g)!.count;
  const c = (g: Gas) => (shown[g] ? fmt(count(g)) : "?");

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Picture 10,000 molecules of dry outdoor air. About how many of them are carbon dioxide?",
        options: ["about 4", "about 40", "about 400", "about 2,000"],
        answer: 0,
      }}
      exploreHint="Tap each gas to colour its molecules. Then find one CO₂ up close, and count one breath."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            Of your 10,000 dots, {c("n2")} were nitrogen, {c("o2")} oxygen, {c("ar")} argon and only{" "}
            <strong>{c("co2")} carbon dioxide</strong>: about 425 parts per million in 2025, or 0.043%.
          </p>
          <p>
            A part per million is a share, not an amount. One breath of about half a litre still holds about 5 × 10¹⁸
            CO₂ molecules. A tiny share of a huge crowd is still a huge number, which is why trace gases are counted in
            ppm.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Stage
          locked={locked}
          interact={interact}
          shown={shown}
          setShown={setShown}
          magnified={magnified}
          setMagnified={setMagnified}
          breath={breath}
          setBreath={setBreath}
        />
      )}
    </Lesson>
  );
}

function Stage({
  locked,
  interact,
  shown,
  setShown,
  magnified,
  setMagnified,
  breath,
  setBreath,
}: {
  locked: boolean;
  interact: () => void;
  shown: Record<Gas, boolean>;
  setShown: (s: Record<Gas, boolean>) => void;
  magnified: boolean;
  setMagnified: (b: boolean) => void;
  breath: boolean;
  setBreath: (b: boolean) => void;
}) {
  const { reach } = useMilestones(interact, ["all-gases", "magnified", "breath"]);
  const L = useMemo(layout, []);

  const tap = (g: Gas) => {
    const next = { ...shown, [g]: true };
    setShown(next);
    if (GASES.every((x) => next[x.id])) reach("all-gases");
  };
  const fill = (g: Gas) => (shown[g] ? s[g] : s.grey);

  const t = centre(L.target);
  const tx = Math.min(SIDE - IN, Math.max(0, (L.target % SIDE) - 4));
  const ty = Math.min(SIDE - IN, Math.max(0, Math.floor(L.target / SIDE) - 4));
  const legend = GASES.filter((g) => shown[g.id]);

  return (
    <div className={s.wrap}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={`stage-svg ${s.fit}`}
        role="img"
        aria-label={`10,000 molecules of dry air.${legend.map((g) => ` ${g.name} ${fmt(g.count)}`).join(",")}`}
      >
        <defs>
          <pattern id="find-co2-dots-grey" width={CELL} height={CELL} patternUnits="userSpaceOnUse">
            <rect width={DOT} height={DOT} className={s.grey} />
          </pattern>
          <pattern id="find-co2-dots-n2" width={CELL} height={CELL} patternUnits="userSpaceOnUse">
            <rect width={DOT} height={DOT} className={s.n2} />
          </pattern>
        </defs>
        {/* every cell as N2 (or grey), then the rarer gases drawn over their own cells */}
        <rect
          x={0}
          y={0}
          width={SIDE * CELL}
          height={SIDE * CELL}
          fill={shown.n2 ? "url(#find-co2-dots-n2)" : "url(#find-co2-dots-grey)"}
        />
        {(["o2", "ar", "co2"] as Gas[]).map((g) => (
          <path key={g} d={L.paths[g as "o2" | "ar" | "co2"]} className={shown[g] ? s[g] : fill("n2")} />
        ))}
        {shown.co2 &&
          L.cells.co2.map((cell) => {
            const p = centre(cell);
            return <circle key={cell} cx={p.x} cy={p.y} r={cell === L.target && magnified ? 6 : 5} className={cell === L.target && magnified ? s.ringBig : s.ring} />;
          })}

        {/* legend: one line per tapped gas, its count */}
        {legend.map((g, i) => (
          <g key={g.id}>
            <rect x={230} y={6 + i * 18} width={10} height={10} className={s[g.id]} />
            <text x={245} y={15 + i * 18} className={s.legend}>
              {g.label} {fmt(g.count)}
            </text>
          </g>
        ))}

        {/* magnifier inset around one CO2 */}
        {magnified && (
          <g>
            <line x1={t.x + 5} y1={t.y - 3} x2={IX} y2={IY} className={s.lead} />
            <line x1={t.x + 5} y1={t.y + 3} x2={IX} y2={IY + IN * IC} className={s.lead} />
            <rect x={IX} y={IY} width={IN * IC} height={IN * IC} className={s.inset} />
            {Array.from({ length: IN * IN }, (_, i) => {
              const cx = tx + (i % IN);
              const cy = ty + Math.floor(i / IN);
              const cell = cy * SIDE + cx;
              const g = L.gasOf[cell];
              const isT = cell === L.target;
              return (
                <circle
                  key={i}
                  cx={IX + (i % IN) * IC + IC / 2}
                  cy={IY + Math.floor(i / IN) * IC + IC / 2}
                  r={isT ? 4.4 : 3.4}
                  className={g === "co2" ? s.co2 : fill(g)}
                />
              );
            })}
            <circle
              cx={IX + (L.target % SIDE - tx) * IC + IC / 2}
              cy={IY + (Math.floor(L.target / SIDE) - ty) * IC + IC / 2}
              r={7}
              className={s.ringBig}
            />
            <text x={IX} y={IY - 5} className={s.caption}>
              CO₂, magnified
            </text>
          </g>
        )}

        <text x={0} y={234} className={s.caption}>
          10,000 molecules of dry air
        </text>
        {breath && (
          <text x={0} y={249} className={s.breath}>
            One breath, about 0.5 L: about {(BREATH_CO2 / 1e18).toFixed(0)} × 10¹⁸ CO₂ molecules
          </text>
        )}
      </svg>
      <Row>
        {GASES.map((g) => (
          <Control
            key={g.id}
            className={shown[g.id] ? "active" : ""}
            disabled={locked || shown[g.id]}
            onClick={() => tap(g.id)}
          >
            {g.label}
          </Control>
        ))}
      </Row>
      <Row>
        <Control
          className={magnified ? "active" : ""}
          aria-pressed={magnified}
          disabled={locked}
          onClick={() => {
            setMagnified(!magnified);
            reach("magnified");
          }}
        >
          {magnified ? "Hide magnifier" : "Magnify one CO₂"}
        </Control>
        <Control
          className={breath ? "active" : ""}
          disabled={locked || breath}
          onClick={() => {
            setBreath(true);
            reach("breath");
          }}
        >
          One breath
        </Control>
      </Row>
    </div>
  );
}
