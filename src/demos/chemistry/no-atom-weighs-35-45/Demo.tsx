"use client";

// A bag of 1,000 chlorine atoms in nature's proportions (758 chlorine-35, 242 chlorine-37),
// shuffled with mulberry32(SEED). The learner draws atoms onto a mass axis: each one lands in its
// own column (34.97 u or 36.97 u) and the running average moves along the same axis.
// Key state: at least 100 atoms drawn; the average sits at the table's 35.45 u while the
// column at 35.45 u stays empty. SEED 5 was chosen so the first 100 hold exactly 24 chlorine-37
// (nature's share); disclosed in claim c4.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const MASS = { 35: 34.96885, 37: 36.9659 } as const; // u, NIST
const TABLE = 35.45; // u, IUPAC conventional standard atomic weight
const BAG_N = 1000;
const N35 = 758;
const SEED = 5;
const KEY = 100;
const CAP = 200;
const NAMES = ["hundred"] as const;

function makeBag(): (35 | 37)[] {
  const b: (35 | 37)[] = Array.from({ length: BAG_N }, (_, i) => (i < N35 ? 35 : 37));
  const r = mulberry32(SEED);
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

const W = 320;
const H = 170;
const AX = 140; // axis y
const x0 = 20;
const x1 = 300;
const mLo = 34.5;
const mHi = 37.5;
const xOf = (m: number) => x0 + ((m - mLo) / (mHi - mLo)) * (x1 - x0);
const PER_ROW = 10;
const PITCH = 6;

export default function NoAtomWeighs({ slug }: { slug: string }) {
  const bag = useMemo(makeBag, []);
  const [drawn, setDrawn] = useState(0);

  const tray = bag.slice(0, drawn);
  const n37 = tray.filter((a) => a === 37).length;
  const n35 = drawn - n37;
  const avg = drawn ? tray.reduce((a, k) => a + MASS[k], 0) / drawn : null;
  const at100 = bag.slice(0, KEY);
  const avg100 = at100.reduce((a, k) => a + MASS[k], 0) / KEY;
  const n37at100 = at100.filter((a) => a === 37).length;

  const column = (count: number, m: number) =>
    Array.from({ length: count }, (_, i) => ({
      x: xOf(m) - ((PER_ROW - 1) * PITCH) / 2 + (i % PER_ROW) * PITCH,
      y: AX - 6 - Math.floor(i / PER_ROW) * PITCH,
    }));

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `The periodic table gives chlorine's mass as ${TABLE.toFixed(2)} u (u is about one proton's mass). Is there a chlorine atom with that mass?`,
        options: ["Yes, every chlorine atom", "No, none does", "Yes, but only a few atoms"],
        answer: 1,
      }}
      exploreHint={`Draw ${KEY} atoms and look for one at ${TABLE.toFixed(2)} u.`}
      minInteractions={NAMES.length}
      reveal={() => (
        <>
          <p>
            Your first {KEY} atoms: {KEY - n37at100} weighed about {MASS[35].toFixed(2)} u (chlorine-35) and {n37at100} about{" "}
            {MASS[37].toFixed(2)} u (chlorine-37). None weighed {TABLE.toFixed(2)} u, yet their average was{" "}
            <strong>{avg100.toFixed(2)} u</strong>.
          </p>
          <p>
            Every chlorine atom has 17 protons; some carry 18 neutrons, some 20. These two kinds are called isotopes: the same element with different numbers of neutrons. The table&apos;s {TABLE.toFixed(2)} u is the
            average over nature&apos;s mix, about 76% chlorine-35 and 24% chlorine-37.
          </p>
          <p className="muted">Toy bag of {BAG_N.toLocaleString("en-US")} atoms, shuffled with a fixed seed.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={NAMES}>
          {(reach) => {
            const draw = (k: number) => {
              const next = Math.min(CAP, drawn + k);
              setDrawn(next);
              if (next >= KEY) reach("hundred");
            };
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className="stage-svg" role="img" aria-label={`${n35} chlorine-35, ${n37} chlorine-37 drawn`}>
                  <line x1={x0} x2={x1} y1={AX} y2={AX} className={s.axis} />
                  {[35, 36, 37].map((m) => (
                    <g key={m}>
                      <line x1={xOf(m)} x2={xOf(m)} y1={AX} y2={AX + 4} className={s.axis} />
                      <text x={xOf(m)} y={AX + 14} textAnchor="middle" className={s.small}>
                        {m} u
                      </text>
                    </g>
                  ))}
                  <line x1={xOf(TABLE)} x2={xOf(TABLE)} y1={18} y2={AX} className={s.table} />
                  <text x={xOf(TABLE)} y={13} textAnchor="middle" className={s.small}>
                    table {TABLE.toFixed(2)}
                  </text>
                  {n35 > 0 && (
                    <text x={xOf(MASS[35])} y={28} textAnchor="middle" className={s.small}>
                      chlorine-35: {n35}
                    </text>
                  )}
                  {n37 > 0 && (
                    <text x={xOf(MASS[37])} y={28} textAnchor="middle" className={s.small}>
                      chlorine-37: {n37}
                    </text>
                  )}
                  {column(n35, MASS[35]).map((d, i) => (
                    <circle key={`a${i}`} cx={d.x} cy={d.y} r={2.4} className={s.cl35} />
                  ))}
                  {column(n37, MASS[37]).map((d, i) => (
                    <circle key={`b${i}`} cx={d.x} cy={d.y} r={2.4} className={s.cl37} />
                  ))}
                  {avg !== null && (
                    <g>
                      <path d={`M ${xOf(avg)} ${AX + 18} l -6 10 h 12 z`} className={s.avg} />
                      <text x={xOf(avg) + 9} y={AX + 28} className={s.avgText}>
                        your average {avg.toFixed(2)}
                      </text>
                    </g>
                  )}
                </svg>
                <Row>
                  <Control onClick={() => draw(KEY)} disabled={locked || drawn + KEY > CAP}>
                    Draw {KEY}
                  </Control>
                  <Control onClick={() => draw(10)} disabled={locked || drawn + 10 > CAP}>
                    Draw 10
                  </Control>
                </Row>
                <Row>
                  <Readout label="Drawn" value={drawn} />
                  <Readout label={`At ${TABLE.toFixed(2)} u`} value={drawn ? 0 : "–"} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
