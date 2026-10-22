"use client";

// One metre more rope. A rope hugs a circle; each chip adds 1 m to it and lifts it evenly all round.
// Stage: a small icon of the whole circle (top left, labelled with its radius) inside a zoom window on
// the top of the circle: the ground arc, the lifted rope, a 20 cm ruler and the gap readout.
// The zoom is drawn to one scale (5 px per cm) for every circle, so the Earth's curve looks flat honestly.
// Milestones: a small circle lifted (ball or wheel, the first one recorded), and the Earth lifted.
// Each tried chip keeps its gap ("✓ 15.9 cm"), so Reset cannot erase what the reveal quotes.
// Brief: company/domains/briefs/math.geometry.md, Wave J, brief 1 (check G1).

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useRef, useState } from "react";
import s from "./styles.module.css";

type Key = "ball" | "wheel" | "earth";
const CIRCLES: { key: Key; name: string; r: number; rText: string }[] = [
  { key: "ball", name: "Ball", r: 0.11, rText: "11 cm" },
  { key: "wheel", name: "Wheel", r: 0.35, rText: "35 cm" },
  { key: "earth", name: "Earth", r: 6378137, rText: "6,378 km" },
];
const EXTRA = 1; // metres of rope added
const MILESTONES = ["small", "earth"] as const;

/** The gap the extra rope makes, computed from the circle (not assumed): new radius minus old. */
function gapOf(r: number) {
  const c = 2 * Math.PI * r;
  return (c + EXTRA) / (2 * Math.PI) - r; // 0.159155 m for every r
}
const cm1 = (m: number) => (Math.round(m * 1000) / 10).toFixed(1); // metres → "15.9"

const W = 340;
const H = 200;
const PXCM = 5; // zoom scale: 5 px per cm, so the 20 cm ruler is 100 px
const CX = 200; // top of the circle in the zoom
const GROUND = 182; // y of the circle's top in the zoom (rope tops out at y 102, below the icon)
const RULER_X = 186;

type State = { key: Key; lifted: boolean };
type Seen = { small: Key | null; tried: Partial<Record<Key, number>> };

export default function OneMetreMoreRope({ slug }: { slug: string }) {
  const [state, setState] = useState<State>({ key: "ball", lifted: false });
  const seen = useRef<Seen>({ small: null, tried: {} });

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "You tie a rope tight round a small ball, and another round the Earth. You add 1 m to each rope and lift it evenly all round. Round the Earth, compared with the ball, the gap is…",
        options: ["Far smaller", "The same", "Far bigger"],
        answer: 1,
      }}
      exploreHint="Add the metre to each circle and read the gap against the ruler."
      minInteractions={MILESTONES.length}
      reveal={() => {
        const small = seen.current.small === "wheel" ? "wheel" : "ball";
        const g = cm1(gapOf(CIRCLES.find((c) => c.key === small)!.r));
        return (
          <>
            <p>
              For your {small} and for the Earth, the extra metre lifted the rope by the same {g} cm.
            </p>
            <p>
              The rope&rsquo;s length is 2π times the radius, so each extra metre adds 1 ÷ 2π, about 0.159 m, to the
              radius, whatever the size. The Earth&rsquo;s huge radius never enters the sum: the metre is shared out
              the same way round any circle.
            </p>
          </>
        );
      }}
    >
      {(ctx) => <Stage {...ctx} state={state} setState={setState} seen={seen.current} />}
    </Lesson>
  );
}

function Stage({
  locked,
  interact,
  state,
  setState,
  seen,
}: StageContext & { state: State; setState: (v: State) => void; seen: Seen }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const circle = CIRCLES.find((c) => c.key === state.key)!;
  const gapM = state.lifted ? gapOf(circle.r) : 0;
  const gapPx = gapM * 100 * PXCM;
  const rPx = circle.r * 100 * PXCM; // ground radius in zoom pixels
  const flat = rPx > 1e5; // the Earth: its true curve sags far less than a pixel across the window
  const ropeY = GROUND - gapPx;

  const lift = (k: Key) => {
    const c = CIRCLES.find((x) => x.key === k)!;
    setState({ key: k, lifted: true });
    if (seen.tried[k] === undefined) seen.tried[k] = gapOf(c.r);
    if (k === "earth") reach("earth");
    else {
      if (seen.small === null) seen.small = k;
      reach("small");
    }
  };

  const readout = `gap ${cm1(gapM)} cm`;
  const ticks = [0, 5, 10, 15, 20];

  return (
    <div className={s.wrap}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={`stage-svg ${s.fit}`}
        role="img"
        aria-label={`${circle.name}, radius ${circle.rText}, zoomed in on its top: ${readout}`}
      >
        <defs>
          <clipPath id="omr-zoom">
            <rect x={0} y={0} width={W} height={H} rx={8} />
          </clipPath>
        </defs>
        <rect x={0.75} y={0.75} width={W - 1.5} height={H - 1.5} rx={8} className={s.window} />
        <g clipPath="url(#omr-zoom)">
          {/* the ground: the top of the circle, true to the 5 px per cm scale */}
          {flat ? (
            <rect x={0} y={GROUND} width={W} height={H - GROUND} className={s.body} />
          ) : (
            <circle cx={CX} cy={GROUND + rPx} r={rPx} className={s.body} />
          )}
          {/* the rope: the same circle with the new, bigger radius */}
          {flat ? (
            <line x1={0} y1={ropeY} x2={W} y2={ropeY} className={state.lifted ? s.rope : s.ropeTight} />
          ) : (
            <circle cx={CX} cy={GROUND + rPx} r={rPx + gapPx} className={state.lifted ? s.rope : s.ropeTight} />
          )}
          {/* the gap marker at the top */}
          {state.lifted && (
            <>
              <line x1={CX} y1={ropeY + 6} x2={CX} y2={GROUND - 6} className={s.gapLine} />
              <polygon points={`${CX},${ropeY + 2} ${CX - 4},${ropeY + 9} ${CX + 4},${ropeY + 9}`} className={s.gapHead} />
              <polygon points={`${CX},${GROUND - 2} ${CX - 4},${GROUND - 9} ${CX + 4},${GROUND - 9}`} className={s.gapHead} />
            </>
          )}
        </g>

        {/* the 20 cm ruler, standing on the top of the circle: it is the zoom's scale */}
        <rect x={RULER_X - 7} y={GROUND - 20 * PXCM} width={7} height={20 * PXCM} className={s.ruler} />
        {ticks.map((t) => (
          <line
            key={t}
            x1={RULER_X - 7}
            x2={RULER_X - (t % 10 === 0 ? 0 : 3)}
            y1={GROUND - t * PXCM}
            y2={GROUND - t * PXCM}
            className={s.tick}
          />
        ))}
        <text x={RULER_X - 11} y={GROUND - 20 * PXCM + 4} textAnchor="end" className={s.label}>
          20 cm
        </text>

        <text x={CX + 10} y={GROUND - 14} className={s.readout}>
          {readout}
        </text>
        <text x={W - 10} y={18} textAnchor="end" className={s.label}>
          zoomed in
        </text>

        {/* the icon: the whole circle, with a box on the part the zoom shows */}
        <rect x={6} y={6} width={90} height={80} rx={6} className={s.icon} />
        <circle cx={51} cy={38} r={20} className={s.iconBody} />
        {state.lifted && <circle cx={51} cy={38} r={23} className={s.iconRope} />}
        <rect x={43} y={12} width={16} height={9} className={s.iconBox} />
        <text x={51} y={78} textAnchor="middle" className={s.iconLabel}>
          r = {circle.rText}
        </text>
      </svg>

      <Row>
        {CIRCLES.map((c) => {
          const on = state.lifted && state.key === c.key;
          const t = seen.tried[c.key];
          return (
            <Control
              key={c.key}
              disabled={locked || on}
              className={`${s.tap} ${on ? "active" : ""}`}
              aria-pressed={on}
              onClick={() => lift(c.key)}
            >
              <span>
                {c.name} (r = {c.rText})
              </span>
              {t !== undefined && <span className={s.trace}>✓ {cm1(t)} cm</span>}
            </Control>
          );
        })}
        <Control disabled={locked || !state.lifted} className={s.tap} onClick={() => setState({ key: "ball", lifted: false })}>
          Reset
        </Control>
      </Row>
    </div>
  );
}
