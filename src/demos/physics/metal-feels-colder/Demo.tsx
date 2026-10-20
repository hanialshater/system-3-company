"use client";

// Metal feels colder. A metal block and a pine block have sat in the same 20 °C room all day.
// A thermometer probe reads 20 °C on both. A 33 °C fingertip touching a block settles at the
// contact temperature of two semi-infinite bodies, Tc = (e_s Ts + e_o To) / (e_s + e_o), with
// effusivity e = sqrt(k rho c) (Carslaw and Jaeger; re-run in artifacts/scratch/cm-physics-r3/check.mjs):
// about 21 °C on aluminium or steel, about 30 °C on pine. The heat flow out of the finger at the
// same moment is proportional to e_s e_o / (e_s + e_o) x (Ts - To), so the arrow into aluminium is
// 4.6x as thick as the arrow into pine (steel 4.4x). The cause (heat leaving the skin) is the arrow.
//
// Earned reveal (v1): milestones "probe-both" (thermometer read on both blocks), "touch-metal",
// "touch-wood". Each reading is recorded when it is taken and stays on stage as a label under its
// block ("probe 20 °C", "skin 21 °C"); the last touch's arrow stays as a dashed outline, so the
// reveal's numbers are on screen when it opens. QA path (DOM order, one press each): probe metal,
// probe wood, touch metal, touch wood, swap metal (finger moves to the steel); all three milestones by the
// fourth press. The swap always touches the new metal, so the metal block's label, its "skin" line and
// its arrow describe the same material when the reveal opens.
// No Reset control: there is nothing to undo, and the records must survive.

import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const ROOM = 20; // °C
const SKIN = 33; // °C
const eff = (k: number, rho: number, c: number) => Math.sqrt(k * rho * c);
// Property values (Incropera et al., appendix A; skin and wood illustrative). Units: W s^0.5 m^-2 K^-1.
const E_SKIN = eff(0.37, 1100, 3400); // ~1,176
const MATERIALS = {
  aluminium: { name: "Aluminium", e: eff(237, 2700, 900) }, // ~24,000
  steel: { name: "Steel", e: eff(60.5, 7854, 434) }, // ~14,400 (plain carbon steel)
} as const;
type Metal = keyof typeof MATERIALS;
const E_WOOD = eff(0.12, 500, 1600); // ~310 (pine)

const contact = (e: number) => (E_SKIN * SKIN + e * ROOM) / (E_SKIN + e);
const flux = (e: number) => ((E_SKIN * e) / (E_SKIN + e)) * (SKIN - ROOM); // proportional to heat flow at a given moment
const WOOD_FLUX = flux(E_WOOD);
const deg = (t: number) => `${t.toFixed(0)} °C`;

type Block = "metal" | "wood";
type Tool = { kind: "probe" | "finger"; block: Block } | null;
type Touch = { skin: number; ratio: number }; // ratio = arrow thickness / wood arrow thickness

const W = 320;
const H = 176;
const TABLE = 118;
const BLOCK = { metal: { x: 22, w: 124 }, wood: { x: 174, w: 124 } };
const ARROW_K = 3; // px of arrow width per unit of wood-relative heat flow

export default function MetalFeelsColder({ slug }: { slug: string }) {
  const [metal, setMetal] = useState<Metal>("aluminium");
  const [tool, setTool] = useState<Tool>(null);
  const [probed, setProbed] = useState<{ metal: boolean; wood: boolean }>({ metal: false, wood: false });
  const [touched, setTouched] = useState<{ metal: Touch | null; wood: Touch | null }>({ metal: null, wood: null });

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "You walk into a room kept at 20 °C, where a metal block and a wooden block have sat all day. You touch both. Which one is actually colder?",
        // v2 (learner r9, W-575): three bare options, so the right one no longer carries the only number and reason.
        options: ["The metal", "The wood", "Neither"],
        answer: 2,
      }}
      exploreHint="Probe both blocks with the thermometer, then touch each one."
      minInteractions={3}
      reveal={() => {
        const m = touched.metal;
        const w = touched.wood;
        return (
          <>
            <p>
              Your thermometer read <strong>20 °C on both blocks</strong>. Yet when the finger touched, its skin dropped
              to about {m ? deg(m.skin) : "?"} on the metal and only to about {w ? deg(w.skin) : "?"} on the wood, and
              the metal&apos;s heat-flow arrow read {m ? `${m.ratio.toFixed(1)}×` : "?"}, the wood&apos;s 1×.
            </p>
            <p>
              Metal conducts heat away from your skin fast, so the skin cools; wood barely takes any, so the skin stays
              warm. Your finger senses heat leaving it, not the object&apos;s temperature.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Stage
          locked={locked}
          interact={interact}
          metal={metal}
          setMetal={setMetal}
          tool={tool}
          setTool={setTool}
          probed={probed}
          setProbed={setProbed}
          touched={touched}
          setTouched={setTouched}
        />
      )}
    </Lesson>
  );
}

function Stage({
  locked,
  interact,
  metal,
  setMetal,
  tool,
  setTool,
  probed,
  setProbed,
  touched,
  setTouched,
}: {
  locked: boolean;
  interact: () => void;
  metal: Metal;
  setMetal: (m: Metal) => void;
  tool: Tool;
  setTool: (t: Tool) => void;
  probed: { metal: boolean; wood: boolean };
  setProbed: (p: { metal: boolean; wood: boolean }) => void;
  touched: { metal: Touch | null; wood: Touch | null };
  setTouched: (t: { metal: Touch | null; wood: Touch | null }) => void;
}) {
  const { reach } = useMilestones(interact, ["probe-both", "touch-metal", "touch-wood"]);
  const eOf = (b: Block, mt: Metal = metal) => (b === "metal" ? MATERIALS[mt].e : E_WOOD);
  const touchOf = (b: Block, mt: Metal = metal): Touch => ({
    skin: contact(eOf(b, mt)),
    ratio: flux(eOf(b, mt)) / WOOD_FLUX,
  });

  const probe = (b: Block) => {
    setTool({ kind: "probe", block: b });
    const next = { ...probed, [b]: true };
    setProbed(next);
    if (next.metal && next.wood) reach("probe-both");
  };
  const touch = (b: Block, mt: Metal = metal) => {
    setTool({ kind: "finger", block: b });
    setTouched({ ...touched, [b]: touchOf(b, mt) });
    reach(b === "metal" ? "touch-metal" : "touch-wood");
  };
  const swap = () => {
    const next: Metal = metal === "aluminium" ? "steel" : "aluminium";
    setMetal(next);
    // The swap puts the finger on the new metal, so the metal's record and arrow always match its label.
    touch("metal", next);
  };
  const is = (kind: "probe" | "finger", b: Block) => tool?.kind === kind && tool.block === b;

  const arrow = (b: Block, ratio: number, live: boolean) => {
    const { x, w } = BLOCK[b];
    const cx = x + w / 2;
    const aw = ratio * ARROW_K;
    const top = 66;
    const tip = 104;
    return (
      <g key={`${b}-${live}`}>
        <g className={live ? s.arrow : s.arrowTrace}>
          <rect x={cx - aw / 2} y={top} width={aw} height={tip - top - 8} />
          <path d={`M${cx - aw / 2 - 5},${tip - 8} L${cx + aw / 2 + 5},${tip - 8} L${cx},${tip} z`} />
        </g>
        {/* v2 (learner r9): the arrow's width relative to the wood's, so the reveal's number is on the stage
            and Swap metal visibly changes it (aluminium 4.6×, steel 4.4×). */}
        <text x={cx + aw / 2 + 8} y={90} className={s.read}>
          {b === "wood" ? "1×" : `${ratio.toFixed(1)}×`}
        </text>
      </g>
    );
  };

  const labelX = (b: Block) => BLOCK[b].x + BLOCK[b].w / 2;

  return (
    <div className={s.wrap}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={`stage-svg ${s.fit}`}
        role="img"
        aria-label={
          tool
            ? `${tool.kind === "probe" ? "Thermometer" : "Finger"} on the ${tool.block === "metal" ? MATERIALS[metal].name.toLowerCase() : "wood"} block`
            : "A metal block and a wooden block side by side on a table"
        }
      >
        {/* blocks */}
        <rect x={BLOCK.metal.x} y={64} width={BLOCK.metal.w} height={TABLE - 64} rx={3} className={s.metal} />
        <rect x={BLOCK.wood.x} y={64} width={BLOCK.wood.w} height={TABLE - 64} rx={3} className={s.wood} />
        {[78, 92, 106].map((y) => (
          <line key={y} x1={BLOCK.wood.x + 8} y1={y} x2={BLOCK.wood.x + BLOCK.wood.w - 8} y2={y + 2} className={s.grain} />
        ))}
        <text x={BLOCK.metal.x + 6} y={113} className={s.blockLabel}>
          {MATERIALS[metal].name}
        </text>
        <text x={BLOCK.wood.x + 6} y={113} className={s.blockLabel}>
          Wood
        </text>
        <line x1={6} y1={TABLE} x2={W - 6} y2={TABLE} className={s.table} />

        {/* heat-flow arrows: dashed outline = a recorded touch, solid = the finger touching now */}
        {!locked &&
          (["metal", "wood"] as Block[]).map((b) => {
            const rec = touched[b];
            if (!rec) return null;
            return arrow(b, rec.ratio, is("finger", b));
          })}

        {/* the tool on its block */}
        {tool?.kind === "probe" && (
          <g className={s.probe}>
            <rect x={labelX(tool.block) - 3} y={14} width={6} height={52} rx={3} />
            <circle cx={labelX(tool.block)} cy={64} r={5} />
            <rect x={labelX(tool.block) - 14} y={6} width={28} height={12} rx={3} className={s.probeHead} />
          </g>
        )}
        {tool?.kind === "finger" && (
          <path
            d={`M${labelX(tool.block) - 16},4 L${labelX(tool.block) - 16},50 Q${labelX(tool.block) - 16},64 ${labelX(tool.block)},64 Q${labelX(tool.block) + 16},64 ${labelX(tool.block) + 16},50 L${labelX(tool.block) + 16},4`}
            className={s.finger}
          />
        )}

        {/* the record: one line per reading, kept under its block */}
        {(["metal", "wood"] as Block[]).map((b) => (
          <g key={b}>
            {probed[b] && (
              <text x={labelX(b)} y={TABLE + 17} textAnchor="middle" className={is("probe", b) ? s.readNow : s.read}>
                probe {deg(ROOM)}
              </text>
            )}
            {touched[b] && (
              <text x={labelX(b)} y={TABLE + 33} textAnchor="middle" className={is("finger", b) ? s.readNow : s.read}>
                skin {deg(touched[b]!.skin)}
              </text>
            )}
          </g>
        ))}
        <text x={W / 2} y={H - 4} textAnchor="middle" className={s.chip}>
          {touched.metal || touched.wood ? "Arrow: heat leaving the finger. Perfect contact, first seconds." : "Same room, all day."}
        </text>
      </svg>

      <Row>
        <Control className={is("probe", "metal") ? "active" : ""} disabled={locked || is("probe", "metal")} onClick={() => probe("metal")}>
          Probe metal
        </Control>
        <Control className={is("probe", "wood") ? "active" : ""} disabled={locked || is("probe", "wood")} onClick={() => probe("wood")}>
          Probe wood
        </Control>
      </Row>
      <Row>
        <Control className={is("finger", "metal") ? "active" : ""} disabled={locked || is("finger", "metal")} onClick={() => touch("metal")}>
          Touch metal
        </Control>
        <Control className={is("finger", "wood") ? "active" : ""} disabled={locked || is("finger", "wood")} onClick={() => touch("wood")}>
          Touch wood
        </Control>
        <Control disabled={locked} onClick={swap}>
          Swap metal
        </Control>
      </Row>
    </div>
  );
}
