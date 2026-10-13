"use client";

// Allotropes of carbon. The same 8 carbon atoms snapped into a 4-way net (diamond) or flat sheets (graphite).
// The box outline is the volume the 8 atoms fill: volume ∝ 1 / density, so graphite's box has 3.51 / 2.26 = 1.55 times the volume.
// Atoms per cm3 = density / molar mass x Avogadro constant.
// Key states (milestones): diamond built, graphite built. Schematic, not to scale: real carbon is 3D.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const D_DIAMOND = 3.51; // g/cm3
const D_GRAPHITE = 2.26; // g/cm3
const M_C = 12.011; // g/mol
const NA = 6.02214076e23;
const perCm3 = (rho: number) => (rho / M_C) * NA;
const VOL_RATIO = D_DIAMOND / D_GRAPHITE; // graphite volume / diamond volume for the same atoms
const MILESTONES = ["diamond", "graphite"] as const;
type Mode = "loose" | "diamond" | "graphite";

const sci = (v: number) => {
  const e = Math.floor(Math.log10(v));
  const m = v / 10 ** e;
  const sup = String(e)
    .split("")
    .map((c) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(c)])
    .join("");
  return `${m.toFixed(2)} × 10${sup}`;
};

// Box area scales with volume; both dimensions grow by sqrt of the ratio. Diamond box 110 x 64.
const DB = { w: 110, h: 64 };
const k = Math.sqrt(VOL_RATIO);
const GB = { w: DB.w * k, h: DB.h * k };
const CX = 160;
const CY = 80;

const LOOSE = [
  [90, 40], [150, 30], [210, 50], [250, 80], [220, 120], [160, 130], [100, 115], [60, 80],
] as const;

export default function Allotropes({ slug }: { slug: string }) {
  const [mode, setMode] = useState<Mode>("loose");
  const [built, setBuilt] = useState<{ diamond: boolean; graphite: boolean }>({ diamond: false, graphite: false });

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Diamond (${D_DIAMOND} g/cm³) and graphite (${D_GRAPHITE} g/cm³) are both pure carbon. Which holds more carbon atoms in 1 cm³?`,
        options: ["Diamond", "Graphite", "The same"],
        answer: 0,
      }}
      exploreHint="Snap the same eight atoms into a net, then into sheets, and compare the boxes."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            The same eight atoms filled a box about <strong>{VOL_RATIO.toFixed(2)} times larger</strong> as sheets than as a net. Per cm³, diamond holds about{" "}
            <strong>{sci(perCm3(D_DIAMOND))}</strong> atoms and graphite about <strong>{sci(perCm3(D_GRAPHITE))}</strong>.
          </p>
          <p>The atoms are identical; only the packing differs. Sheets leave gaps between layers, which is why graphite is less dense and slides, while the net is rigid. A flat schematic, not to scale.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const build = (m: Mode) => {
              setMode(m);
              if (m === "diamond") reach("diamond");
              if (m === "graphite") reach("graphite");
              if (m !== "loose") setBuilt((b) => ({ ...b, [m]: true }));
            };
            const box = mode === "graphite" ? GB : DB;
            const bx = CX - box.w / 2;
            const by = CY - box.h / 2;
            const atoms: [number, number][] = [];
            const bonds: [number, number, number, number][] = [];
            if (mode === "diamond") {
              for (let r = 0; r < 2; r++)
                for (let c = 0; c < 4; c++) atoms.push([bx + 17 + c * 25, by + 16 + r * 32]);
              for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) bonds.push([bx + 17 + c * 25, by + 16 + r * 32, bx + 42 + c * 25, by + 16 + r * 32]);
              for (let c = 0; c < 4; c++) bonds.push([bx + 17 + c * 25, by + 16, bx + 17 + c * 25, by + 48]);
            } else if (mode === "graphite") {
              const rowGap = box.h - 24;
              for (let r = 0; r < 2; r++)
                for (let c = 0; c < 4; c++) atoms.push([bx + 22 + c * 31, by + 12 + r * rowGap]);
              for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) bonds.push([bx + 22 + c * 31, by + 12 + r * rowGap, bx + 53 + c * 31, by + 12 + r * rowGap]);
            } else {
              for (const p of LOOSE) atoms.push([p[0], p[1]]);
            }
            return (
              <div className={s.wrap}>
                <p className={s.chip}>8 carbon atoms, flat schematic, not to scale</p>
                <svg viewBox="0 0 320 160" className="stage-svg" role="img" aria-label={locked ? "Eight carbon atoms" : `Eight carbon atoms as ${mode}`}>
                  {mode === "graphite" && built.diamond && (
                    <rect x={CX - DB.w / 2} y={CY - DB.h / 2} width={DB.w} height={DB.h} className={s.ghost} />
                  )}
                  {mode === "diamond" && built.graphite && (
                    <rect x={CX - GB.w / 2} y={CY - GB.h / 2} width={GB.w} height={GB.h} className={s.ghost} />
                  )}
                  {mode !== "loose" && <rect x={bx} y={by} width={box.w} height={box.h} fill="none" stroke="var(--fg)" strokeWidth={2} />}
                  {bonds.map((b, i) => (
                    <line key={i} x1={b[0]} y1={b[1]} x2={b[2]} y2={b[3]} stroke="var(--muted)" strokeWidth={2} />
                  ))}
                  {atoms.map((a, i) => (
                    <circle key={i} cx={a[0]} cy={a[1]} r={7} className={s.main} />
                  ))}
                  {mode !== "loose" && (
                    <text x={CX} y={CY + box.h / 2 + 18} textAnchor="middle" className={s.small}>
                      {mode === "diamond" ? "4-way net: box volume 1.00" : `flat sheets: box volume ${VOL_RATIO.toFixed(2)}`}
                    </text>
                  )}
                </svg>
                <Row>
                  <Readout label="Atoms in 1 cm³" value={locked || mode === "loose" ? "?" : sci(perCm3(mode === "diamond" ? D_DIAMOND : D_GRAPHITE))} />
                </Row>
                <Row>
                  <Control className={mode === "diamond" ? "active" : ""} disabled={locked || mode === "diamond"} onClick={() => build("diamond")}>
                    Snap into a 4-way net
                  </Control>
                  <Control className={mode === "graphite" ? "active" : ""} disabled={locked || mode === "graphite"} onClick={() => build("graphite")}>
                    Snap into flat sheets
                  </Control>
                  <Control disabled={locked || mode === "loose"} onClick={() => build("loose")}>
                    Scatter
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
