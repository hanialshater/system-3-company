"use client";

// A kitchen scale that also counts. The learner picks a substance and sets the grams;
// the pan shows the crowd of particles, one dot per fortieth of a mole, with the first
// two rows outlined as "one mole". 12 g of carbon and 18 g of water both fill exactly
// that outline: a mole is a count, and molar mass is what one such crowd weighs.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const NA = 6.02214076e23;
const SUBSTANCES = [
  { id: "C", name: "Carbon", molar: 12.011 },
  { id: "H2O", name: "Water", molar: 18.015 },
  { id: "Al", name: "Aluminium", molar: 26.982 },
  { id: "Fe", name: "Iron", molar: 55.845 },
] as const;

const PER_MOL = 40; // dots per mole
const COLS = 20;
const D = 15; // dot pitch
const W = COLS * D + 20;
const PAN_Y = 186;
const H = 226;

function sci(n: number) {
  if (n <= 0) return "0";
  const e = Math.floor(Math.log10(n));
  const m = n / Math.pow(10, e);
  return `${m.toFixed(2)} × 10${String(e)
    .split("")
    .map((ch) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(ch)])
    .join("")}`;
}

export default function SameCountDifferentWeight({ slug }: { slug: string }) {
  const [sub, setSub] = useState(0);
  const [grams, setGrams] = useState(6);
  const [fullAt, setFullAt] = useState<Record<string, boolean>>({});

  const m = SUBSTANCES[sub];
  const mol = grams / m.molar;
  const dots = Math.round(mol * PER_MOL);
  const shown = Math.min(dots, COLS * 10);
  const isOneMol = Math.abs(mol - 1) < 0.02;

  const note = (i: number, g: number) => {
    const mm = g / SUBSTANCES[i].molar;
    if (Math.abs(mm - 1) < 0.02) setFullAt((f) => ({ ...f, [SUBSTANCES[i].id]: true }));
  };
  const sawBoth = fullAt.C && fullAt.H2O;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "You weigh out 12 g of carbon atoms and 18 g of water molecules. Which pile has more particles?",
        options: ["The water", "The carbon", "About the same"],
        answer: 2,
      }}
      exploreHint="Weigh 12 g of carbon, then switch to water and find what fills the same outline."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {sawBoth
              ? "You filled the same outline with 12 g of carbon and with 18 g of water."
              : "12 g of carbon and 18 g of water both fill the same outline."}{" "}
            Same crowd: about <strong>6.02 × 10²³</strong> particles each, one mole. The water weighs more because each
            molecule is heavier (about 18 mass units against 12), not because there are more of them.
          </p>
          <p>
            A mole is a count, like a dozen but much bigger. A substance&rsquo;s molar mass is just what one mole of its
            particles weighs: 12 g for carbon, 18 g for water, about 56 g for iron.
          </p>
          <p className="muted">That is why chemists weigh things to count them.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <div className={s.wrap}>
          <Row>
            {SUBSTANCES.map((x, i) => (
              <Control
                key={x.id}
                className={`${s.pick} ${i === sub ? `active ${s.current}` : ""}`}
                aria-pressed={i === sub}
                disabled={locked || i === sub}
                onClick={() => {
                  setSub(i);
                  note(i, grams);
                  interact();
                }}
              >
                {x.name}
              </Control>
            ))}
          </Row>
          <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`${grams} g of ${m.name.toLowerCase()}: ${mol.toFixed(2)} mol`}>
            {/* the one-mole outline: the bottom two rows */}
            <rect x={8} y={PAN_Y - 2 * D - 4} width={COLS * D + 4} height={2 * D + 2} rx={4} className={isOneMol ? s.moleFull : s.mole} />
            <text x={W - 10} y={PAN_Y - 2 * D - 8} textAnchor="end" className={s.moleLabel}>
              1 mole
            </text>
            {Array.from({ length: shown }, (_, k) => {
              const col = k % COLS;
              const row = Math.floor(k / COLS);
              return <circle key={k} cx={10 + col * D + D / 2} cy={PAN_Y - 3 - row * D - D / 2} r={5} className={s.dot} />;
            })}
            {dots > shown && (
              <text x={W / 2} y={12} textAnchor="middle" className={s.moleLabel}>
                + more
              </text>
            )}
            {/* the scale */}
            <rect x={4} y={PAN_Y} width={W - 8} height={6} rx={3} className={s.pan} />
            <rect x={W / 2 - 46} y={PAN_Y + 12} width={92} height={26} rx={5} className={s.display} />
            <text x={W / 2} y={PAN_Y + 31} textAnchor="middle" className={s.displayText}>
              {grams} g
            </text>
          </svg>
          <Slider
            label={`Mass of ${m.name.toLowerCase()}`}
            value={grams}
            min={0}
            max={60}
            disabled={locked}
            format={(g) => `${g} g`}
            onChange={(g) => {
              setGrams(g);
              note(sub, g);
              interact();
            }}
          />
          <Row>
            <Readout label="Particles" value={sci(mol * NA)} />
            <Readout label="Moles" value={mol.toFixed(2)} />
          </Row>
        </div>
      )}
    </Lesson>
  );
}
