"use client";

// One atom, drawn big (not to scale). It starts as carbon-12: 6 protons, 6 neutrons, 6 electrons.
// The learner adds one particle at a time. The name label is computed from the proton count
// alone (ELEMENTS[protons]); the mass number is protons + neutrons; the charge is protons - electrons.
// Key state: a neutron and an electron have each been added (the name stays carbon) and a
// proton has been added (the name becomes nitrogen). All three are milestones.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const ELEMENTS: Record<number, { sym: string; name: string }> = {
  6: { sym: "C", name: "carbon" },
  7: { sym: "N", name: "nitrogen" },
  8: { sym: "O", name: "oxygen" },
};
const START = { p: 6, n: 6, e: 6 };
const MAX = 8;
const NAMES = ["neutron", "electron", "proton"] as const;

const W = 320;
const H = 170;
const CX = 190;
const CY = 85;

function charge(q: number) {
  if (q === 0) return "0";
  return q > 0 ? `+${q}` : `−${-q}`;
}

export default function WhichParticleNamesIt({ slug }: { slug: string }) {
  const [atom, setAtom] = useState(START);
  const [added, setAdded] = useState({ p: false, n: false, e: false });

  const el = ELEMENTS[atom.p];
  const mass = atom.p + atom.n;
  const q = atom.p - atom.e;

  // Nucleus: protons and neutrons interleaved, packed on a sunflower spiral.
  const kinds: ("p" | "n")[] = [];
  for (let i = 0; i < Math.max(atom.p, atom.n); i++) {
    if (i < atom.p) kinds.push("p");
    if (i < atom.n) kinds.push("n");
  }
  const nucleus = kinds.map((k, i) => {
    const r = 5.2 * Math.sqrt(i + 0.5);
    const a = i * 2.39996;
    return { k, x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
  });
  // Electrons: 2 on the inner ring, the rest spread on the outer ring.
  const electrons = Array.from({ length: atom.e }, (_, i) => {
    const inner = i < 2;
    const ring = inner ? 42 : 72;
    const count = inner ? Math.min(atom.e, 2) : atom.e - 2;
    const j = inner ? i : i - 2;
    const a = -Math.PI / 2 + (j / count) * 2 * Math.PI + (inner ? 0 : 0.3);
    return { x: CX + ring * Math.cos(a), y: CY + ring * Math.sin(a) };
  });

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A carbon atom has ${START.p} protons, ${START.n} neutrons and ${START.e} electrons. To turn it into nitrogen, you add one…`,
        options: ["proton", "neutron", "electron"],
        answer: 0,
      }}
      exploreHint="Add one of each particle and watch the name."
      minInteractions={NAMES.length}
      reveal={() => (
        <>
          <p>
            Your extra neutron made {ELEMENTS[START.p].name}-{START.p + START.n + 1}: heavier, still carbon. Your extra
            electron made a charged carbon (an ion): still carbon. Only the extra proton changed the name, to{" "}
            <strong>{ELEMENTS[START.p + 1].name}</strong>.
          </p>
          <p>
            The proton count, called the atomic number, is the element: 6 is carbon, 7 is nitrogen, 8 is oxygen.
            Neutrons change the mass; electrons change the charge.
          </p>
          <p className="muted">Adding a proton is a nuclear change, made in stars and accelerators, not in a test tube.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={NAMES}>
          {(reach) => {
            const add = (k: "p" | "n" | "e") => {
              setAtom((a) => ({ ...a, [k]: a[k] + 1 }));
              setAdded((d) => ({ ...d, [k]: true }));
              reach(k === "p" ? "proton" : k === "n" ? "neutron" : "electron");
            };
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className="stage-svg" role="img" aria-label={`${el.name}-${mass}, charge ${charge(q)}`}>
                  <circle cx={CX} cy={CY} r={42} className={s.ring} />
                  <circle cx={CX} cy={CY} r={72} className={s.ring} />
                  {nucleus.map((d, i) => (
                    <circle key={i} cx={d.x} cy={d.y} r={5} className={d.k === "p" ? s.proton : s.neutron} />
                  ))}
                  {electrons.map((d, i) => (
                    <circle key={i} cx={d.x} cy={d.y} r={4} className={s.electron} />
                  ))}
                  <text x={14} y={58} className={`${s.sym} ${atom.p !== START.p ? s.changed : ""}`}>
                    {el.sym}
                  </text>
                  <text x={14} y={80} className={s.name}>
                    {el.name}-{mass}
                  </text>
                  <text x={14} y={98} className={s.small}>
                    charge {charge(q)}
                  </text>
                  <text x={W - 4} y={H - 4} textAnchor="end" className={s.small}>
                    not to scale
                  </text>
                </svg>
                <Row>
                  <Control onClick={() => add("n")} disabled={locked || atom.n >= MAX} className={added.n ? "active" : ""}>
                    <span className={`${s.sw} ${s.neutron}`} aria-hidden /> +1 neutron
                  </Control>
                  <Control onClick={() => add("e")} disabled={locked || atom.e >= MAX} className={added.e ? "active" : ""}>
                    <span className={`${s.sw} ${s.electron}`} aria-hidden /> +1 electron
                  </Control>
                  <Control onClick={() => add("p")} disabled={locked || atom.p >= MAX} className={added.p ? "active" : ""}>
                    <span className={`${s.sw} ${s.proton}`} aria-hidden /> +1 proton
                  </Control>
                </Row>
                <Row>
                  <Readout label="Protons" value={atom.p} />
                  <Readout label="Neutrons" value={atom.n} />
                  <Readout label="Electrons" value={atom.e} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
