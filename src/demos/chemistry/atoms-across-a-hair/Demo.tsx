"use client";

// Powers of ten from a hair to its atoms. One square window; each zoom step makes the
// window ten times narrower. The dashed box always shows where the next step lands.
// A row of atoms (about 0.2 nm each) runs across the window and becomes visible only
// at the last two steps. The count of atoms across the window is the thing to feel.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const V = 300; // window size in SVG units
const HAIR_UM = 70;
const ATOM_NM = 0.2;
const MAX_Z = 5;

const viewNm = (z: number) => 100_000 / Math.pow(10, z); // 100 µm at z = 0
const fmtLen = (nm: number) => (nm >= 1000 ? `${nm / 1000} µm` : `${nm} nm`);
const across = (z: number) => Math.round(viewNm(z) / ATOM_NM);

export default function AtomsAcrossAHair({ slug }: { slug: string }) {
  const [z, setZ] = useState(0);
  const [deepest, setDeepest] = useState(0);

  const atomD = (V * ATOM_NM) / viewNm(z); // atom diameter in window units
  const hairW = (HAIR_UM * 1000 * V) / viewNm(z);
  const atomRowY = V * 0.5;
  const nAtoms = Math.ceil(V / atomD);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A human hair is about 70 micrometres wide; an atom is about 0.2 nanometres across. About how many atoms side by side span the hair?",
        options: ["About 3,500", "About 350,000", "About 350 million"],
        answer: 1,
      }}
      exploreHint="Zoom in one step at a time until single atoms appear."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {deepest >= MAX_Z ? "You zoomed" : "Zoom all the way and it takes"} five steps of ×10 to go from a hair to
            a window five atoms wide. Each step cut the count by ten: 500,000, 50,000, 5,000, 500, 50, 5.
          </p>
          <p>
            The hair filled 70% of the first window, so it spans about 0.7 × 500,000 ={" "}
            <strong>350,000 atoms</strong>. Check: 70 µm ÷ 0.2 nm = 70,000 nm ÷ 0.2 nm = 350,000, a gap of about five and
            a half powers of ten.
          </p>
          <p className="muted">Atoms are not &ldquo;a bit&rdquo; smaller than a hair. They are 100,000s of times smaller.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <div className={s.wrap}>
          <svg
            viewBox={`0 0 ${V} ${V + 26}`}
            className={`stage-svg ${s.fit}`}
            role="img"
            aria-label={`Window ${fmtLen(viewNm(z))} wide${locked ? "" : `, about ${across(z).toLocaleString("en-US")} atoms across`}`}
          >
            <defs>
              <clipPath id="ah-win">
                <rect x={0} y={0} width={V} height={V} />
              </clipPath>
            </defs>
            <g clipPath="url(#ah-win)">
              <rect x={0} y={0} width={V} height={V} className={s.bg} />
              {/* the hair: centred in the first window, wider than every later window */}
              <rect x={V / 2 - hairW / 2} y={-10} width={hairW} height={V + 20} className={s.hair} />
              {/* one row of atoms across the middle */}
              {atomD >= 4 ? (
                Array.from({ length: nAtoms }, (_, i) => (
                  <circle
                    key={i}
                    cx={atomD / 2 + i * atomD}
                    cy={atomRowY}
                    r={atomD * 0.46}
                    className={s.atom}
                  />
                ))
              ) : (
                <line x1={Math.max(0, V / 2 - hairW / 2)} x2={Math.min(V, V / 2 + hairW / 2)} y1={atomRowY} y2={atomRowY} className={s.atomLine} strokeWidth={Math.max(atomD, 2)} />
              )}
              {/* where the next zoom lands */}
              {z < MAX_Z && (
                <rect x={V * 0.45} y={V * 0.45} width={V / 10} height={V / 10} className={s.nextBox} />
              )}
            </g>
            <rect x={0.5} y={0.5} width={V - 1} height={V - 1} className={s.frame} />
            {z === 0 && (
              <text x={V / 2} y={22} textAnchor="middle" className={s.label}>
                hair, about 70 µm
              </text>
            )}
            {z > 0 && z < 4 && (
              <text x={V / 2} y={22} textAnchor="middle" className={s.label}>
                still inside the hair
              </text>
            )}
            {z > 0 && z < 4 && (
              <text x={V / 2} y={V * 0.64} textAnchor="middle" className={s.label}>
                a row of atoms, too small to see
              </text>
            )}
            {z === MAX_Z && (
              <text x={V / 2} y={atomRowY - atomD / 2 - 10} textAnchor="middle" className={s.label}>
                atoms, about 0.2 nm each
              </text>
            )}
            {/* scale bar: the full window width */}
            <line x1={0} x2={V} y1={V + 12} y2={V + 12} className={s.scale} />
            <text x={V / 2} y={V + 24} textAnchor="middle" className={s.scaleLabel}>
              window: {fmtLen(viewNm(z))}
            </text>
          </svg>

          <Slider
            label="Zoom"
            value={z}
            min={0}
            max={MAX_Z}
            disabled={locked}
            format={(v) => `×${Math.pow(10, v).toLocaleString("en-US")}`}
            onChange={(v) => {
              setZ(v);
              setDeepest((d) => Math.max(d, v));
              interact();
            }}
          />
          <Row>
            <Readout label="Atom widths across window" value={locked ? "?" : across(z).toLocaleString("en-US")} />
          </Row>
        </div>
      )}
    </Lesson>
  );
}
