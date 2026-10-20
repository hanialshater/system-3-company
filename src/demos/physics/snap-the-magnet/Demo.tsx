"use client";

// Snap the magnet. A bar magnet (N at the left) is drawn as a row of tiny aligned atomic magnets
// (arrows point S -> N inside, towards the N end). Snapping it leaves each piece uniformly magnetised,
// so each piece has an N face where the arrows point and an S face at its other end. Compasses sit on
// the axis beside each face: a needle's north end points away from an N face and towards an S face.
// As cut, the halves face S | N and attract; with the right half turned round they face S | S and
// repel (dipole-chain force sum in artifacts/scratch/cm-physics-r4/check.mjs). Snapping again gives
// four pieces, each N + S. Brief: company/domains/briefs/physics.md round 4, #59.
//
// One picture: the pieces in one band, compasses on the axis, N/S letters only on faces a compass
// reads. Earned reveal: milestones "snap" (the question's case), "turned", "quarters". The Seen row
// records each when it fires. QA path (DOM order): Snap in the middle, Turn the right half round,
// Snap each half again.

import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

type Mode = "whole" | "halves" | "turned" | "quarters";
const MILESTONES = ["snap", "turned", "quarters"] as const;

const W = 320;
const H = 120;
const CY = 66;
const BH = 28;
const CR = 8.5; // compass radius
const GAP = 44;

interface Piece {
  x: number;
  w: number;
  nLeft: boolean; // true: N face on the left
}

function layout(mode: Mode): { pieces: Piece[]; push: boolean } {
  if (mode === "whole") return { pieces: [{ x: 60, w: 200, nLeft: true }], push: false };
  if (mode === "halves")
    return {
      pieces: [
        { x: 43, w: 100, nLeft: true },
        { x: 143 + GAP, w: 100, nLeft: true },
      ],
      push: false,
    };
  if (mode === "turned")
    return {
      pieces: [
        { x: 33, w: 100, nLeft: true },
        { x: 133 + GAP + 20, w: 100, nLeft: false },
      ],
      push: true,
    };
  // quarters: the left half's two pieces, then the right half's (still turned round)
  const w = 36;
  const g = 40;
  const x0 = (W - (4 * w + 3 * g)) / 2;
  return {
    pieces: [0, 1, 2, 3].map((i) => ({ x: x0 + i * (w + g), w, nLeft: i < 2 })),
    push: false,
  };
}

function Compass({ x, y, east }: { x: number; y: number; east: boolean }) {
  // needle along the axis; the filled (north) end points east or west
  const d = east ? 1 : -1;
  return (
    <g>
      <circle cx={x} cy={y} r={CR} className={s.compass} />
      <path d={`M${x + d * (CR - 1.5)},${y} L${x},${y - 2.6} L${x},${y + 2.6} Z`} className={s.north} />
      <path d={`M${x - d * (CR - 1.5)},${y} L${x},${y - 2.6} L${x},${y + 2.6} Z`} className={s.south} />
    </g>
  );
}

export default function SnapTheMagnet({ slug }: { slug: string }) {
  const [mode, setMode] = useState<Mode>("whole");
  const [seen, setSeen] = useState<{ half?: string; turned?: string; quarters?: string }>({});

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "You drop a bar magnet off the fridge and it snaps in half. What does the half that held the north end now have?",
        options: ["Only a north pole", "A north and a south pole", "No poles at all"],
        answer: 1,
      }}
      exploreHint="Snap it, then read the compasses at the break."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            When you snapped it, the compass at the break found a new <strong>south pole on the north half</strong> and a new
            north pole on the other. Turned round, the halves {seen.turned ?? "?"}, and after snapping again every quarter
            still had {seen.quarters ? "both poles" : "?"}.
          </p>
          <p>
            A magnet is built from countless tiny atomic magnets lined up head to tail, so any piece has a north end and a
            south end. Nobody has ever found a lone north pole.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const go = (m: Mode) => {
              setMode(m);
              if (m === "halves") {
                setSeen((x) => ({ ...x, half: "N + S" }));
                reach("snap");
              }
              if (m === "turned") {
                setSeen((x) => ({ ...x, turned: "pushed apart" }));
                reach("turned");
              }
              if (m === "quarters") {
                setSeen((x) => ({ ...x, quarters: "N + S each" }));
                reach("quarters");
              }
            };
            const { pieces, push } = layout(mode);
            const caption = locked
              ? "Make a prediction to start."
              : mode === "whole"
                ? "Arrows are the tiny atomic magnets. Compasses read the poles."
                : mode === "halves"
                  ? "Snapped. The halves pull together."
                  : mode === "turned"
                    ? "Right half turned round. The halves push apart."
                    : "Four pieces. Read each compass.";
            const seenText = [
              `north half: ${seen.half ?? "–"}`,
              `turned: ${seen.turned === "pushed apart" ? "push apart" : "–"}`,
              `quarters: ${seen.quarters ?? "–"}`,
            ].join(" · ");
            return (
              <div className={s.wrap}>
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className={`stage-svg ${s.fit}`}
                  role="img"
                  aria-label={locked ? "A bar magnet, N at the left, with compasses" : caption}
                >
                  {pieces.map((p, i) => {
                    const nArrows = Math.max(2, Math.round(p.w / 22));
                    const step = p.w / nArrows;
                    const dir = p.nLeft ? -1 : 1;
                    const nx = p.nLeft ? p.x + 9 : p.x + p.w - 9;
                    const sx = p.nLeft ? p.x + p.w - 9 : p.x + 9;
                    return (
                      <g key={i}>
                        <rect x={p.x} y={CY - BH / 2} width={p.w} height={BH} rx={3} className={s.bar} />
                        {Array.from({ length: nArrows }, (_, j) => {
                          const cx = p.x + step * (j + 0.5);
                          return (
                            <path
                              key={j}
                              d={`M${cx - dir * 6},${CY} L${cx + dir * 4},${CY} M${cx + dir * 1},${CY - 3} L${cx + dir * 5},${CY} L${cx + dir * 1},${CY + 3}`}
                              className={s.atom}
                            />
                          );
                        })}
                        <text x={nx} y={CY - BH / 2 - 5} textAnchor="middle" className={s.pole}>
                          N
                        </text>
                        <text x={sx} y={CY - BH / 2 - 5} textAnchor="middle" className={s.pole}>
                          S
                        </text>
                      </g>
                    );
                  })}

                  {/* compasses on the axis beside each face */}
                  {pieces.flatMap((p, i) => {
                    const leftFaceN = p.nLeft;
                    // beside the left face the north end points away from an N face (west), towards an S face (east);
                    // beside the right face, away from N (east), towards S (west)
                    return [
                      <Compass key={`${i}l`} x={p.x - CR - 2} y={CY} east={!leftFaceN} />,
                      <Compass key={`${i}r`} x={p.x + p.w + CR + 2} y={CY} east={!leftFaceN} />,
                    ];
                  })}
                  {mode === "whole" && (
                    <>
                      {/* beside the middle: field runs from the N end to the S end outside the bar */}
                      <Compass x={160} y={CY - BH / 2 - 18} east={true} />
                      <text x={160} y={CY + BH / 2 + 18} textAnchor="middle" className={s.small}>
                        middle: no pole
                      </text>
                    </>
                  )}
                  {mode === "halves" && !locked && (
                    <text x={160} y={CY + BH / 2 + 18} textAnchor="middle" className={s.labD}>
                      S | N at the break: they pull together
                    </text>
                  )}
                  {push && !locked && (
                    <>
                      <line x1={150} y1={CY + BH / 2 + 10} x2={136} y2={CY + BH / 2 + 10} className={s.push} markerEnd="url(#sm-p)" />
                      <line x1={170} y1={CY + BH / 2 + 10} x2={184} y2={CY + BH / 2 + 10} className={s.push} markerEnd="url(#sm-p)" />
                      <text x={160} y={CY + BH / 2 + 26} textAnchor="middle" className={s.labD}>
                        S | S: they push apart
                      </text>
                    </>
                  )}
                  {mode === "quarters" && !locked && (
                    <text x={160} y={CY + BH / 2 + 18} textAnchor="middle" className={s.labD}>
                      every piece: N + S
                    </text>
                  )}
                  <defs>
                    <marker id="sm-p" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                      <path d="M0,0 L10,5 L0,10 z" className={s.headP} />
                    </marker>
                  </defs>
                  <text x={4} y={14} className={s.small}>
                    Compass: the filled end is its north end.
                  </text>
                </svg>

                <p className={s.caption} aria-live="polite">
                  {caption}
                </p>
                <p className={s.seen}>Seen: {seenText}</p>

                <Row>
                  <Control className={mode === "halves" ? "active" : ""} disabled={locked || mode === "halves"} onClick={() => go("halves")}>
                    Snap in the middle
                  </Control>
                  <Control
                    className={mode === "turned" ? "active" : ""}
                    disabled={locked || mode === "whole" || mode === "quarters"}
                    onClick={() => go(mode === "turned" ? "halves" : "turned")}
                  >
                    {mode === "turned" ? "Turn it back" : "Turn the right half round"}
                  </Control>
                  <Control
                    className={mode === "quarters" ? "active" : ""}
                    disabled={locked || mode === "whole" || mode === "quarters"}
                    onClick={() => go("quarters")}
                  >
                    Snap each half again
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
