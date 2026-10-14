"use client";

// Acid diluted a thousandfold. Hydrochloric acid at pH 5 (1.0e-5 mol/L, fully dissociated) is diluted
// with pure, CO2-free water at 25 °C. Charge balance [H+] = c + [OH-] with [H+][OH-] = Kw = 1.0e-14 gives
// [H+] = c/2 + sqrt(c^2/4 + Kw). The H+ that water itself supplies equals [OH-] = Kw/[H+] (water splits
// into one H+ and one OH-). Brief: company/domains/briefs/chemistry.solutions-acids.md #4.
//
// One log axis of [H+] (10^-4 top to 10^-10 bottom), three bars on it: H+ from the acid, H+ from water
// itself, and the total. (The brief asked for one stacked bar; segments do not add on a log axis, so the
// two sources stand side by side with the total beside them.) The pH 7 "neutral" line is drawn only
// once the learner has reached x1,000 (no pre-drawn limit before the commit).
//
// Earned reveal: milestones "x1000" (the question's case; its pH and the two sources are recorded) and
// "beyond" (x10,000 reached; its pH recorded). Presets in DOM order x10, x100, x1,000, x10,000 (the
// undiluted x1 state is the opening and locked frame), so the QA path visits x10, x100, x1,000
// (milestone 1) and x10,000 (milestone 2). The recorded x1,000 pH stays on stage as a readout. No Reset: the presets go back.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const KW = 1e-14;
const C0 = 1e-5; // mol/L HCl, pH 5
const DILUTIONS = [10, 100, 1000, 10000] as const;

function solve(d: number) {
  const c = C0 / d;
  const h = c / 2 + Math.sqrt((c * c) / 4 + KW);
  return { acid: c, water: KW / h, total: h, pH: -Math.log10(h) };
}

const SUP: Record<string, string> = { "-": "⁻", "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
const pow = (e: number) => `10${String(e).split("").map((ch) => SUP[ch]).join("")}`;
function sci(x: number) {
  let e = Math.floor(Math.log10(x));
  let m = x / Math.pow(10, e);
  if (Number(m.toFixed(1)) >= 10) {
    e += 1;
    m /= 10;
  }
  return `${m.toFixed(1)}×${pow(e)}`;
}
const times = (d: number) => `×${d.toLocaleString("en-US")}`;
const ph2 = (p: number) => p.toFixed(2);

const W = 320;
const H = 200;
const TOP = 22;
const DEC = 26; // px per decade
const BOT = TOP + 6 * DEC; // 10^-10
const Y = (c: number) => TOP + (-4 - Math.log10(c)) * DEC;
const BARS = { acid: 56, water: 118, total: 180 } as const;
const BW = 48;

type Rec = { pH: number; acid: number; water: number };

export default function AcidDilutedAThousandfold({ slug }: { slug: string }) {
  const [dil, setDil] = useState<number>(1);
  const [at1000, setAt1000] = useState<Rec | null>(null);
  const [beyond, setBeyond] = useState<number | null>(null);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Hydrochloric acid at pH 5 is diluted 1,000 times with pure water at 25 °C. Its pH becomes about…",
        options: ["about 5", "about 6", "about 7", "about 8"],
        answer: 2,
      }}
      exploreHint="Dilute step by step: ×10, ×100, ×1,000, then one step further. Watch the water's own bar."
      minInteractions={2}
      reveal={() => {
        const now = solve(dil);
        const r = Number((now.water / now.acid).toPrecision(2));
        const share =
          r >= 1
            ? `water itself supplies ${r.toLocaleString("en-US")} times more H⁺ than the acid`
            : `the acid still supplies ${Number((1 / r).toPrecision(2)).toLocaleString("en-US")} times more H⁺ than water`;
        return (
          <>
            <p>
              At 1,000-fold dilution your pH stopped at <strong>{at1000 ? ph2(at1000.pH) : "?"}</strong>, not 8, and one
              more tenfold reached only {beyond !== null ? ph2(beyond) : "?"}. On your bars now ({times(dil)}), {share}.
            </p>
            <p>
              Water always splits a little: at 25 °C, [H⁺] × [OH⁻] stays 10⁻¹⁴, so neutral water holds 10⁻⁷ mol/L of
              each. As the acid&apos;s share shrank, water&apos;s grew, so adding water brings an acid toward pH 7, never
              past it.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Stage
          locked={locked}
          interact={interact}
          dil={dil}
          setDil={setDil}
          at1000={at1000}
          setAt1000={setAt1000}
          beyondPH={beyond}
          setBeyond={setBeyond}
        />
      )}
    </Lesson>
  );
}

function Stage({
  locked,
  interact,
  dil,
  setDil,
  at1000,
  setAt1000,
  beyondPH,
  setBeyond,
}: {
  locked: boolean;
  interact: () => void;
  dil: number;
  setDil: (d: number) => void;
  at1000: Rec | null;
  setAt1000: (r: Rec) => void;
  beyondPH: number | null;
  setBeyond: (p: number) => void;
}) {
  const { reach } = useMilestones(interact, ["x1000", "beyond"]);
  const st = solve(dil);

  const go = (d: number) => {
    setDil(d);
    const r = solve(d);
    if (d === 1000) {
      if (!at1000) setAt1000({ pH: r.pH, acid: r.acid, water: r.water });
      reach("x1000");
    }
    if (d > 1000) {
      setBeyond(r.pH);
      reach("beyond");
    }
  };

  const neutral = at1000 !== null;
  const bar = (key: keyof typeof BARS, c: number, cls: string, label: string) => {
    const x = BARS[key];
    const y = Y(c);
    return (
      <g key={key}>
        <rect x={x} y={y} width={BW} height={BOT - y} className={cls} />
        <text x={x + BW / 2} y={y - 4} textAnchor="middle" className={s.val}>
          {sci(c)}
        </text>
        <text x={x + BW / 2} y={BOT + 14} textAnchor="middle" className={s.barLabel}>
          {label}
        </text>
      </g>
    );
  };

  return (
    <div className={s.wrap}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={`stage-svg ${s.fit}`}
        role="img"
        aria-label={`Diluted ${times(dil)}: H+ from the acid ${sci(st.acid)}, from water ${sci(st.water)}, pH ${ph2(st.pH)}`}
      >
        <text x={4} y={11} className={s.title}>
          H⁺ in mol/L
        </text>
        {Array.from({ length: 7 }, (_, i) => {
          const e = -4 - i;
          const y = TOP + i * DEC;
          return (
            <g key={e}>
              <line x1={44} x2={230} y1={y} y2={y} className={s.grid} />
              <text x={40} y={y + 3.5} textAnchor="end" className={s.tick}>
                {pow(e)}
              </text>
              {!(neutral && e === -7) && (
                <text x={236} y={y + 3.5} className={s.tick}>
                  pH {-e}
                </text>
              )}
            </g>
          );
        })}
        <line x1={44} x2={44} y1={TOP} y2={BOT} className={s.axis} />
        <line x1={44} x2={230} y1={BOT} y2={BOT} className={s.axis} />
        {bar("acid", st.acid, s.acid, "from acid")}
        {bar("water", st.water, s.water, "from water")}
        {bar("total", st.total, s.total, "total")}
        {neutral && (
          <g>
            <line x1={44} x2={232} y1={Y(1e-7)} y2={Y(1e-7)} className={s.neutral} />
            <text x={236} y={Y(1e-7) + 3.5} className={s.neutralLabel}>
              pH 7 neutral
            </text>
          </g>
        )}
      </svg>
      <Row>
        {DILUTIONS.map((d) => (
          <Control
            key={d}
            className={dil === d ? "active" : ""}
            aria-pressed={dil === d}
            disabled={locked || dil === d}
            onClick={() => go(d)}
          >
            {times(d)}
          </Control>
        ))}
      </Row>
      <Row>
        <Readout label="pH now" value={ph2(st.pH)} />
        <Readout label="pH at ×1,000" value={at1000 ? ph2(at1000.pH) : "–"} />
        <Readout label="pH at ×10,000" value={beyondPH !== null ? ph2(beyondPH) : "–"} />
      </Row>
    </div>
  );
}
