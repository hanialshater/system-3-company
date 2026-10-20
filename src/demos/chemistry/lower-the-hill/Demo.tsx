"use client";

// One energy hill between reactants and products. Drag its top (or use the buttons) to change
// the barrier; the counter is the crossings per second, scaled so the uncatalysed 75 kJ/mol hill
// gives 1 per second at 298 K. Arrhenius: rate ∝ e^(−Ea/RT), same pre-factor assumed.

import { useRef, useState, type PointerEvent } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const R_GAS = 8.314; // J/(mol K)
const T = 298;
const EA0 = 75; // kJ/mol, no catalyst
const EA1 = 50; // kJ/mol, with the catalyst
const LO = 30;
const HI = 90;
const STEP = 5;
const PRODUCTS = -20; // kJ/mol, illustrative
const rate = (ea: number) => Math.exp(((EA0 - ea) * 1000) / (R_GAS * T)); // per second
const GAIN = rate(EA1);

function big(x: number) {
  if (x < 10) return x.toFixed(x < 1 ? 3 : 1);
  if (x < 1e6) return Math.round(x).toLocaleString("en-US");
  if (x < 1e9) return `${(x / 1e6).toFixed(1)} million`;
  return `${(x / 1e9).toFixed(1)} billion`;
}
const round2 = (x: number) => {
  const p = 10 ** Math.floor(Math.log10(x) - 1);
  return Math.round(x / p) * p;
};

const W = 320;
const H = 190;
const ZERO = 140; // y of the reactants' level
const PX = 1.4; // px per kJ/mol
const Y = (e: number) => ZERO - e * PX;
const PEAK_X = 160;

export default function LowerTheHill({ slug }: { slug: string }) {
  const [ea, setEa] = useState(EA0);
  const [sawLow, setSawLow] = useState(false);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const dragging = useRef(false);
  const ix = useRef(() => {});
  const { reach } = useMilestones(() => ix.current(), ["at-50"]);
  const lockedRef = useRef(true);

  const set = (e: number) => {
    const v = Math.max(LO, Math.min(HI, Math.round(e / STEP) * STEP));
    setEa(v);
    if (v === EA1) {
      setSawLow(true);
      reach("at-50");
    }
  };

  const fromPointer = (ev: PointerEvent<SVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const box = svg.getBoundingClientRect();
    const y = ((ev.clientY - box.top) / box.height) * H;
    set((ZERO - y) / PX);
  };

  const hill = `M 10 ${Y(0)} L 70 ${Y(0)} C 120 ${Y(0)}, 130 ${Y(ea)}, ${PEAK_X} ${Y(ea)} C 190 ${Y(ea)}, 200 ${Y(PRODUCTS)}, 250 ${Y(PRODUCTS)} L 310 ${Y(PRODUCTS)}`;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `You add a catalyst that lowers a reaction's barrier from ${EA0} kJ/mol to ${EA1} kJ/mol at ${T} K. By about how much does the rate rise?`,
        options: ["1.5 times", `${round2(GAIN).toLocaleString("en-US")} times`, "3 times"],
        answer: 1,
      }}
      exploreHint={`Bring the hill down to ${EA1} kJ/mol and watch the counter.`}
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            {sawLow ? "You saw" : "Lower it and you see"} the counter go from <strong>1</strong> crossing per second at{" "}
            {EA0} kJ/mol to about <strong>{round2(GAIN).toLocaleString("en-US")}</strong> at {EA1} kJ/mol. A barrier one
            third lower made the reaction about {round2(GAIN).toLocaleString("en-US")} times faster.
          </p>
          <p>
            Only collisions with at least the barrier&apos;s energy react, and that share falls off exponentially with the
            barrier: e<sup>−Ea/RT</sup>. At {T} K, 25 kJ/mol is about 10 times RT, and e<sup>10</sup> is about 22,000;
            precisely, e<sup>10.1</sup> ≈ {round2(GAIN).toLocaleString("en-US")}.
          </p>
          <p className="muted">
            The catalyst is not used up, and the products end at the same level: it speeds the trip, not where it ends.
            Same pre-factor assumed.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        ix.current = interact;
        lockedRef.current = locked;
        return (
          <div className={s.wrap}>
            <svg
              ref={svgRef}
              viewBox={`0 0 ${W} ${H}`}
              className={`stage-svg ${s.fit}`}
              role="img"
              aria-label={`Barrier ${ea} kJ/mol, ${big(rate(ea))} crossings per second`}
              onPointerMove={(ev) => dragging.current && fromPointer(ev)}
              onPointerUp={() => (dragging.current = false)}
              onPointerLeave={() => (dragging.current = false)}
            >
              <line x1={PEAK_X} x2={PEAK_X} y1={Y(0)} y2={Y(ea)} className={s.height} />
              <text x={10} y={14} className={s.label}>
                barrier {ea} kJ/mol
              </text>
              {ea !== EA0 && <line x1={PEAK_X - 30} x2={PEAK_X + 30} y1={Y(EA0)} y2={Y(EA0)} className={s.ghost} />}
              <path d={hill} className={s.hill} />
              <text x={14} y={Y(0) - 6} className={s.small}>
                reactants
              </text>
              <text x={306} y={Y(PRODUCTS) - 6} textAnchor="end" className={s.small}>
                products
              </text>
              <g
                className={locked ? s.handleOff : s.handle}
                onPointerDown={(ev) => {
                  if (lockedRef.current) return;
                  dragging.current = true;
                  (ev.target as Element).setPointerCapture?.(ev.pointerId);
                }}
                onPointerMove={(ev) => dragging.current && fromPointer(ev)}
                onPointerUp={() => (dragging.current = false)}
              >
                <circle cx={PEAK_X} cy={Y(ea)} r={16} className={s.hit} />
                <circle cx={PEAK_X} cy={Y(ea)} r={7} className={s.knob} />
              </g>
              <text x={W / 2} y={H - 6} textAnchor="middle" className={s.small}>
                drag the top · {T} K
              </text>
            </svg>
            <div className={s.counter} aria-live="polite">
              <span className={s.count}>{big(rate(ea))}</span>
              <span className={s.unit}>crossings per second (1 at {EA0} kJ/mol)</span>
            </div>
            <Row>
              <Control className={ea === EA1 ? "active" : ""} onClick={() => set(EA1)} disabled={locked || ea === EA1}>
                Catalyst: {EA1}
              </Control>
              <Control className={ea === EA0 ? "active" : ""} onClick={() => set(EA0)} disabled={locked || ea === EA0}>
                None: {EA0}
              </Control>
              <Control onClick={() => set(ea - STEP)} disabled={locked || ea <= LO} aria-label="Lower the barrier 5 kJ/mol">
                −5
              </Control>
              <Control onClick={() => set(ea + STEP)} disabled={locked || ea >= HI} aria-label="Raise the barrier 5 kJ/mol">
                +5
              </Control>
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
