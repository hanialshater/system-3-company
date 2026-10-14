"use client";

// A bond ledger for CH4 + 2 O2 -> CO2 + 2 H2O (gas), average bond energies in kJ per mole of bonds.
// Breaking old bonds is paid (red bar); forming new bonds returns energy (green bar). One scale.
// Key state (milestone `ledger`): all four groups done: paid 2,648 kJ, returned 3,450 kJ, net -802 kJ.
// Each group button is disabled once pressed; order is free, the total is the same.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type Group = { id: string; label: string; count: number; each: number; kind: "break" | "form" };
const GROUPS: Group[] = [
  { id: "ch", label: "C–H", count: 4, each: 413, kind: "break" },
  { id: "oo", label: "O=O", count: 2, each: 498, kind: "break" },
  { id: "co", label: "C=O", count: 2, each: 799, kind: "form" },
  { id: "oh", label: "O–H", count: 4, each: 463, kind: "form" },
];
const total = (kind: "break" | "form", done: string[]) =>
  GROUPS.filter((g) => g.kind === kind && done.includes(g.id)).reduce((a, g) => a + g.count * g.each, 0);
const FULL = GROUPS.map((g) => g.id);
const PAID = total("break", FULL);
const BACK = total("form", FULL);
const NET = BACK - PAID;
const fmt = (v: number) => v.toLocaleString("en-US");
const NAMES = ["ledger"] as const;

const W = 320;
const X0 = 20;
const SPAN = 280;
const SCALE = 3600;
const wOf = (v: number) => (v / SCALE) * SPAN;

export default function BondLedger({ slug }: { slug: string }) {
  const [done, setDone] = useState<string[]>([]);
  const paid = total("break", done);
  const back = total("form", done);
  const net = back - paid;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Burning methane (CH₄ + 2 O₂ → CO₂ + 2 H₂O) gives out heat. Atoms are held together by bonds. Where does the heat come from?",
        options: ["Breaking the old bonds releases it", "The new bonds return more energy than breaking the old ones cost", "Forming new bonds releases it, and breaking the old ones costs nothing"],
        answer: 1,
      }}
      exploreHint="Break the old bonds, then form the new ones. Do all four steps."
      minInteractions={NAMES.length}
      reveal={() => (
        <>
          <p>
            You paid <strong>{fmt(PAID)} kJ</strong> to break the old bonds and got back <strong>{fmt(BACK)} kJ</strong> from the new ones.
          </p>
          <p>
            The new bonds (2 × 799 + 4 × 463) are stronger in total than the old ones (4 × 413 + 2 × 498), so {fmt(NET)} kJ is left over as heat: about{" "}
            {fmt(NET)} kJ released per mole of methane. Heat comes from the difference, not from breaking bonds.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={NAMES}>
          {(reach) => {
            const press = (id: string) => {
              const next = done.includes(id) ? done : [...done, id];
              setDone(next);
              if (FULL.every((x) => next.includes(x))) reach("ledger");
            };
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} 150`} className="stage-svg" role="img" aria-label={`paid ${paid} kJ, returned ${back} kJ`}>
                  <text x={X0} y={16} className={s.small}>
                    kJ per mole of bonds (1 mole = 6.0 × 10²³ bonds), averages
                  </text>
                  <text x={X0} y={40} className={s.lab}>
                    paid to break: {fmt(paid)} kJ
                  </text>
                  <rect x={X0} y={46} width={wOf(paid)} height={22} className={s.paid} />
                  <text x={X0} y={92} className={s.lab}>
                    returned by new bonds: {fmt(back)} kJ
                  </text>
                  <rect x={X0} y={98} width={wOf(back)} height={22} className={s.back} />
                  <text x={X0} y={142} className={s.net}>
                    net so far: {net >= 0 ? "releases" : "costs"} {fmt(Math.abs(net))} kJ
                  </text>
                </svg>
                <Row>
                  {GROUPS.map((g) => (
                    <Control key={g.id} onClick={() => press(g.id)} disabled={locked || done.includes(g.id)}>
                      {g.kind === "break" ? "Break" : "Form"} {g.count} {g.label} ({g.count} × {g.each})
                    </Control>
                  ))}
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
