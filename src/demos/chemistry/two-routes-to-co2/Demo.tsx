"use client";

// Two routes to CO2 (Hess's law). Brief: company/domains/briefs/chemistry.energy-rates.md #12.
// ΔfH CO2(g) −393.51, CO(g) −110.53 kJ/mol (CODATA; CRC); C(graphite) → C(diamond) +1.90 kJ/mol (CRC).
//   Direct: C + O2 → CO2, −393.51.
//   Via CO: −110.53 then CO + ½O2 → CO2, −282.98 (= −393.51 − (−110.53)); sum −393.51.
//   Via diamond: +1.90 then C(diamond) + O2 → CO2, −395.41; sum −393.51.
// The step values are computed from the two formation enthalpies and the graphite-diamond gap, and
// every sum is added up on the stage from its own steps.
//
// One energy ladder (kJ/mol, 0 at "C + O2", gridlines every 100). Locked: the start level only; the
// end level is hidden. Each route button draws its route in its own column and leaves it drawn; the
// end level appears with the first route. The +1.90 step is drawn at least 3 px tall so it can be seen
// (on this scale 1.9 kJ is under 1 px; disclosed in claim c3). Milestones: "direct", "via-co" (the
// question's case, its sum shown under its column), "diamond". QA path: the three buttons once each.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const F_CO2 = -393.51;
const F_CO = -110.53;
const F_DIA = 1.9;

type RouteId = "direct" | "co" | "diamond";
type Step = { from: number; to: number };
const steps = (r: RouteId): Step[] => {
  if (r === "direct") return [{ from: 0, to: F_CO2 }];
  if (r === "co") return [{ from: 0, to: F_CO }, { from: F_CO, to: F_CO2 }];
  return [{ from: 0, to: F_DIA }, { from: F_DIA, to: F_CO2 }];
};
const delta = (st: Step) => Math.round((st.to - st.from) * 100) / 100;
const sumOf = (r: RouteId) => Math.round(steps(r).reduce((a, st) => a + delta(st), 0) * 100) / 100;
const kj = (v: number) => `${v > 0 ? "+" : v < 0 ? "−" : ""}${Math.abs(v).toFixed(2)}`;

const ROUTES: { id: RouteId; button: string; name: string; x: number }[] = [
  { id: "direct", button: "Direct", name: "direct", x: 96 },
  { id: "co", button: "Via CO", name: "via CO", x: 176 },
  { id: "diamond", button: "Via diamond", name: "via diamond", x: 256 },
];

const W = 320;
const H = 216;
const L = 40;
const RR = 312;
const TOP = 12;
const BOT = 190;
const VHI = 20;
const VLO = -420;
const Y = (v: number) => TOP + ((VHI - v) / (VHI - VLO)) * (BOT - TOP);
const Y0 = Y(0);
const YDIA = Math.min(Y(F_DIA), Y0 - 3);
const yOf = (v: number) => (v === F_DIA ? YDIA : Y(v));

function Arrow({ x, from, to, up }: { x: number; from: number; to: number; up?: boolean }) {
  const y1 = yOf(from);
  const y2 = yOf(to);
  const dir = y2 > y1 ? 1 : -1;
  const len = Math.abs(y2 - y1);
  const hl = Math.min(6, len * 0.6);
  return (
    <g>
      <line x1={x} x2={x} y1={y1} y2={y2 - dir * hl} className={up ? s.up : s.arrow} />
      <path d={`M ${x - 4} ${y2 - dir * hl} L ${x + 4} ${y2 - dir * hl} L ${x} ${y2} Z`} className={up ? s.headUp : s.head} />
    </g>
  );
}

export default function TwoRoutesToCo2({ slug }: { slug: string }) {
  const [drawn, setDrawn] = useState<RouteId[]>([]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Burn carbon straight to CO₂, or first to carbon monoxide, then that to CO₂. Which route releases more heat in total?",
        options: ["the direct route", "the two-step route", "both the same"],
        answer: 2,
      }}
      exploreHint="Draw each route down the energy ladder and compare where they end."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            Every route ended on the same level: <strong>{kj(sumOf("co"))} kJ</strong> per mole of CO₂, whether you went
            straight down, stopped at carbon monoxide ({kj(F_CO)} then {kj(delta(steps("co")[1]))}), or even climbed{" "}
            {kj(F_DIA)} to diamond first.
          </p>
          <p>
            Heat released depends only on where you start and where you finish, like height lost walking downhill by any
            path. So chemists add measured steps to find the heat of reactions they cannot measure directly.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} drawn={drawn} setDrawn={setDrawn} />}
    </Lesson>
  );
}

function Stage({
  locked,
  interact,
  drawn,
  setDrawn,
}: {
  locked: boolean;
  interact: () => void;
  drawn: RouteId[];
  setDrawn: (d: RouteId[]) => void;
}) {
  const { reach } = useMilestones(interact, ["direct", "via-co", "diamond"]);
  const draw = (r: RouteId) => {
    if (!drawn.includes(r)) setDrawn([...drawn, r]);
    reach(r === "co" ? "via-co" : r);
  };
  const any = drawn.length > 0;
  const grid = [0, -100, -200, -300, -400];

  return (
    <div className={s.wrap}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={`stage-svg ${s.fit}`}
        role="img"
        aria-label={`Energy ladder, kJ/mol. ${ROUTES.filter((r) => drawn.includes(r.id))
          .map((r) => `${r.name}: ${steps(r.id).map((st) => kj(delta(st))).join(" then ")}, total ${kj(sumOf(r.id))}`)
          .join(". ")}`}
      >
        {grid.map((v) => (
          <g key={v}>
            <line x1={L} x2={RR} y1={Y(v)} y2={Y(v)} className={s.grid} />
            <text x={L - 4} y={Y(v) + 3.5} textAnchor="end" className={s.tick}>
              {v === 0 ? "0" : `−${-v}`}
            </text>
          </g>
        ))}
        <line x1={L} x2={L} y1={TOP} y2={BOT} className={s.axis} />
        <text x={2} y={TOP - 2} className={s.tick}>
          kJ/mol
        </text>

        <line x1={L} x2={RR} y1={Y0} y2={Y0} className={s.level} />
        <text x={L + 4} y={Y0 + 12} className={s.levelName}>
          C + O₂
        </text>

        {any && (
          <>
            <line x1={L} x2={RR} y1={Y(F_CO2)} y2={Y(F_CO2)} className={s.endLevel} />
            <text x={L + 4} y={Y(F_CO2) - 4} className={s.levelName}>
              CO₂
            </text>
          </>
        )}

        {ROUTES.filter((r) => drawn.includes(r.id)).map((r) => {
          const st = steps(r.id);
          const sum = (
            <>
              <text x={r.x} y={BOT + 9} textAnchor="middle" className={s.name}>
                {r.name}
              </text>
              <text x={r.x} y={BOT + 22} textAnchor="middle" className={s.sum}>
                Σ {kj(sumOf(r.id))}
              </text>
            </>
          );
          if (r.id === "direct") {
            return (
              <g key={r.id}>
                <Arrow x={r.x - 10} from={0} to={F_CO2} />
                <text x={r.x - 5} y={Y(F_CO2 / 2)} className={s.step}>
                  {kj(delta(st[0]))}
                </text>
                {sum}
              </g>
            );
          }
          if (r.id === "co") {
            return (
              <g key={r.id}>
                <Arrow x={r.x - 22} from={0} to={F_CO} />
                <line x1={r.x - 32} x2={r.x + 2} y1={Y(F_CO)} y2={Y(F_CO)} className={s.mid} />
                <text x={r.x - 18} y={Y(F_CO / 2) + 3} className={s.step}>
                  {kj(delta(st[0]))}
                </text>
                <text x={r.x + 4} y={Y(F_CO) + 4} className={s.levelName}>
                  CO
                </text>
                <Arrow x={r.x - 4} from={F_CO} to={F_CO2} />
                <text x={r.x} y={Y((F_CO + F_CO2) / 2)} className={s.step}>
                  {kj(delta(st[1]))}
                </text>
                {sum}
              </g>
            );
          }
          return (
            <g key={r.id}>
              <line x1={r.x - 26} x2={r.x + 4} y1={YDIA} y2={YDIA} className={s.mid} />
              <Arrow x={r.x - 22} from={0} to={F_DIA} up />
              <text x={r.x - 30} y={YDIA - 4} className={s.step}>
                {kj(delta(st[0]))} diamond
              </text>
              <Arrow x={r.x - 4} from={F_DIA} to={F_CO2} />
              <text x={r.x} y={Y(F_CO2 / 2)} className={s.step}>
                {kj(delta(st[1]))}
              </text>
              {sum}
            </g>
          );
        })}
      </svg>
      <Row>
        {ROUTES.map((r) => (
          <Control
            key={r.id}
            className={drawn.includes(r.id) ? "active" : ""}
            disabled={locked || drawn.includes(r.id)}
            onClick={() => draw(r.id)}
          >
            {r.button}
          </Control>
        ))}
      </Row>
    </div>
  );
}
