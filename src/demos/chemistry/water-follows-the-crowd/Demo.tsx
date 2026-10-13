"use client";

// Two tanks joined by a membrane that passes water but not sugar. Each dot is 0.01 mol of sugar.
// Open the membrane and water moves toward the sugarier side until both are equally
// concentrated (schematic: the small back-pressure of the raised level is ignored). Moving
// sugar by hand sends the water after it.

import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const MOL_PER_DOT = 0.01;
const L0 = 10; // dots on the left: 0.1 mol in 1 L
const R0 = 30; // dots on the right: 0.3 mol in 1 L
const TOTAL_L = 2; // litres of water in all
const MOVE = 10;
const conc = (dots: number, litres: number) => (dots * MOL_PER_DOT) / litres;
const C_L0 = conc(L0, 1);
const C_R0 = conc(R0, 1);
const settled = (left: number, right: number) => (TOTAL_L * left) / (left + right); // litres on the left
const L_END = settled(L0, R0); // 0.5 L
const C_END = conc(L0, L_END); // 0.2 mol/L

const W = 320;
const H = 210;
const TW = 120; // tank width
const LX = 30;
const RX = LX + TW;
const BOT = 186;
const PX_PER_L = 75;
const SEED = 9; // untuned: only places the dots

const spots = (() => {
  const rng = mulberry32(SEED);
  return Array.from({ length: 40 }, () => ({ u: rng(), v: rng() }));
})();

const mol = (x: number) => `${x.toFixed(2)} mol/L`;
const litres = (x: number) => `${x.toFixed(2)} L`;

export default function WaterFollowsTheCrowd({ slug }: { slug: string }) {
  const [open, setOpen] = useState(false);
  const [left, setLeft] = useState(L0);
  const [vLeft, setVLeft] = useState(1);
  const [lastFlow, setLastFlow] = useState(0); // + means water moved left → right
  const ix = useRef(() => {});
  const { reach } = useMilestones(() => ix.current(), ["flowed", "moved-sugar"]);

  const right = L0 + R0 - left;
  const vRight = TOTAL_L - vLeft;

  const apply = (nl: number) => {
    const v = settled(nl, L0 + R0 - nl);
    setLastFlow(vLeft - v);
    setVLeft(v);
  };

  const tank = (x: number, v: number, dots: number, offset: number) => {
    const h = v * PX_PER_L;
    return (
      <g>
        <rect x={x} y={BOT - h} width={TW} height={h} className={s.water} />
        {spots.slice(offset, offset + dots).map((p, i) => (
          <circle key={i} cx={x + 6 + p.u * (TW - 12)} cy={BOT - 5 - p.v * (h - 10)} r={3.2} className={s.sugar} />
        ))}
      </g>
    );
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A membrane lets water through but not sugar. Left: ${C_L0.toFixed(1)} mol/L sugar; right: ${C_R0.toFixed(1)} mol/L sugar, 1 L each. Net water flow goes…`,
        options: ["Left to right", "Right to left", "Nowhere"],
        answer: 0,
      }}
      exploreHint="Open the membrane. Then move some sugar and watch the water."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {open ? "You saw" : "Open it and you see"} water flow <strong>left to right</strong>, toward the sugarier
            side, until about {litres(L_END)} was left and both sides were about {mol(C_END)}. When you moved sugar, the
            water followed it.
          </p>
          <p>
            Sugar cannot cross, so water does. It moves from where water is more concentrated (less sugar) to where it
            is less concentrated (more sugar), until the two sides even out. That net flow of water through a membrane
            is osmosis.
          </p>
          <p className="muted">In a real tube the raised level pushes back a little; here that is ignored.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        ix.current = interact;
        return (
          <div className={s.wrap}>
            <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Left ${litres(vLeft)} with ${left} sugar dots, right ${litres(vRight)} with ${right}`}>
              {tank(LX, vLeft, left, 0)}
              {tank(RX, vRight, right, left)}
              <line x1={RX} x2={RX} y1={BOT - 2.2 * PX_PER_L} y2={BOT} className={open ? s.membrane : s.shut} />
              <path d={`M ${LX} ${BOT - 2.2 * PX_PER_L} L ${LX} ${BOT} L ${RX + TW} ${BOT} L ${RX + TW} ${BOT - 2.2 * PX_PER_L}`} className={s.glass} />
              {open && Math.abs(lastFlow) > 1e-6 && (
                <g>
                  <text x={RX} y={14} textAnchor="middle" className={s.flow}>
                    {lastFlow > 0 ? "water →" : "← water"}
                  </text>
                </g>
              )}
              <text x={LX} y={BOT + 16} className={s.small}>
                ● 0.01 mol sugar · {open ? "water passes" : "membrane shut"}
              </text>
            </svg>
            <Row>
              <Control
                onClick={() => {
                  setOpen(true);
                  apply(left);
                  reach("flowed");
                }}
                disabled={locked || open}
              >
                Open the membrane
              </Control>
              <Control
                onClick={() => {
                  const nl = left + MOVE;
                  setLeft(nl);
                  apply(nl);
                  reach("moved-sugar");
                }}
                disabled={locked || !open || right - MOVE < MOVE}
              >
                ← {MOVE} sugar
              </Control>
              <Control
                onClick={() => {
                  const nl = left - MOVE;
                  setLeft(nl);
                  apply(nl);
                  reach("moved-sugar");
                }}
                disabled={locked || !open || left - MOVE < MOVE}
              >
                {MOVE} sugar →
              </Control>
            </Row>
            <Row>
              <Readout label="Left" value={`${litres(vLeft)} · ${mol(conc(left, vLeft))}`} />
              <Readout label="Right" value={`${litres(vRight)} · ${mol(conc(right, vRight))}`} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
