"use client";

// A central oxygen with two bond slots, bent like water. The learner snaps partner atoms on.
// Each bond's shared pair (two dots in a small cloud) sits along the bond according to the
// Pauling electronegativity difference, and each atom is tinted by the partial charge that
// leaves it. Two hydrogens make water: oxygen end negative, hydrogen ends positive.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type El = "H" | "Cl" | "C" | "O";
const EN: Record<El, number> = { H: 2.2, C: 2.55, Cl: 3.16, O: 3.44 }; // Pauling
const R_ATOM: Record<El, number> = { H: 13, C: 17, Cl: 20, O: 18 };
const PARTNERS: El[] = ["H", "Cl", "C", "O"];
const NAMES = ["o-h", "other"] as const;
const D_OH = EN.O - EN.H; // 1.24, the largest difference here

const W = 320;
const H = 190;
const CX = 160;
const CY = 64;
const BOND = 84;
const HALF = (104.5 / 2) * (Math.PI / 180); // water's bond angle
// Distance from O's centre where the pair is drawn: the middle of the gap between the two atoms,
// shifted toward O by up to 90% of the half-gap in proportion to the electronegativity difference.
const pairAt = (el: El) => {
  const a = R_ATOM.O + 4;
  const b = BOND - R_ATOM[el] - 4;
  const mid = (a + b) / 2;
  return mid - (mid - a) * 0.9 * ((EN.O - EN[el]) / D_OH);
};
const DIRS = [
  { x: -Math.sin(HALF), y: Math.cos(HALF) },
  { x: Math.sin(HALF), y: Math.cos(HALF) },
];

function Atom({ x, y, el, q }: { x: number; y: number; el: El; q: number }) {
  const a = Math.min(1, Math.abs(q) / D_OH);
  const cls = q < -0.05 ? s.neg : q > 0.05 ? s.pos : s.even;
  return (
    <g transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
      <circle r={R_ATOM[el]} className={s.atomBase} />
      <circle r={R_ATOM[el]} className={cls} style={{ opacity: 0.15 + 0.75 * a }} />
      <text y={4} textAnchor="middle" className={s.sym}>
        {el}
      </text>
      {Math.abs(q) > 0.05 && (
        <text x={R_ATOM[el] + 3} y={-R_ATOM[el] + 6} className={s.delta}>
          {q < 0 ? "δ−" : "δ+"}
        </text>
      )}
    </g>
  );
}

export default function WhoGrabsTheElectrons({ slug }: { slug: string }) {
  const [slots, setSlots] = useState<El[]>([]);
  const [tried, setTried] = useState<El[]>([]);

  const qO = -slots.reduce((sum, el) => sum + (EN.O - EN[el]), 0);
  const water = slots.length === 2 && slots.every((e) => e === "H");

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "In a water molecule (H₂O), the electrons that oxygen and each hydrogen share spend more time near…",
        options: ["the oxygen", "the hydrogens", "exactly in the middle"],
        answer: 0,
      }}
      exploreHint="Snap a hydrogen onto the oxygen, then try another partner."
      minInteractions={NAMES.length}
      reveal={() => {
        const others = tried.filter((e) => e !== "H");
        return (
          <>
            <p>
              On your O–H bond the shared pair sat <strong>close to the oxygen</strong>, and the oxygen turned
              δ− (slightly negative) while the hydrogen turned δ+.
              {others.length > 0 &&
                ` With ${others.join(", ")} the pair sat nearer the middle${others.includes("O") ? ", and with O on both ends exactly in the middle" : ""}.`}
            </p>
            <p>
              Oxygen attracts shared electrons harder than hydrogen does: its electronegativity is about 3.44 against
              2.20. Sharing is lopsided whenever two different atoms bond, and the bigger the difference, the more
              lopsided. In water this leaves the oxygen end slightly negative and the hydrogen ends slightly
              positive, so neighbouring water molecules attract each other.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={NAMES}>
          {(reach) => {
            const snap = (el: El) => {
              const next = slots.length < 2 ? [...slots, el] : [slots[1], el];
              setSlots(next);
              const t = tried.includes(el) ? tried : [...tried, el];
              setTried(t);
              if (next.includes("H")) reach("o-h");
              if (t.includes("H") && t.some((e) => e !== "H")) reach("other");
            };
            return (
              <div className={s.wrap}>
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className={`stage-svg ${s.fit}`}
                  role="img"
                  aria-label={slots.length ? `Oxygen bonded to ${slots.join(" and ")}${water ? ": water" : ""}` : "A lone oxygen atom"}
                >
                  {slots.map((el, i) => {
                    const d = DIRS[i];
                    const px = CX + d.x * BOND;
                    const py = CY + d.y * BOND;
                    const r = pairAt(el);
                    const ex = CX + d.x * r;
                    const ey = CY + d.y * r;
                    const nx = -d.y * 4;
                    const ny = d.x * 4;
                    return (
                      <g key={`${i}-${el}`}>
                        <line x1={CX} y1={CY} x2={px} y2={py} className={s.bond} />
                        <ellipse cx={ex} cy={ey} rx={13} ry={9} transform={`rotate(${(Math.atan2(d.y, d.x) * 180) / Math.PI} ${ex} ${ey})`} className={s.cloud} />
                        <circle cx={ex + nx} cy={ey + ny} r={2.6} className={s.e} />
                        <circle cx={ex - nx} cy={ey - ny} r={2.6} className={s.e} />
                      </g>
                    );
                  })}
                  <Atom x={CX} y={CY} el="O" q={qO} />
                  {slots.map((el, i) => (
                    <Atom key={`a${i}-${el}`} x={CX + DIRS[i].x * BOND} y={CY + DIRS[i].y * BOND} el={el} q={el === "O" ? 0 : EN.O - EN[el]} />
                  ))}
                  <text x={W / 2} y={H - 4} textAnchor="middle" className={s.small}>
                    Drawing: shift scaled to electronegativity difference
                  </text>
                </svg>
                <Row>
                  {PARTNERS.map((el) => (
                    <Control key={el} aria-label={`Snap on ${el}`} onClick={() => snap(el)} disabled={locked || (slots.length === 2 && slots[0] === el && slots[1] === el)}>
                      + {el}
                    </Control>
                  ))}
                  <Control onClick={() => setSlots([])} disabled={locked || slots.length === 0}>
                    Clear
                  </Control>
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
