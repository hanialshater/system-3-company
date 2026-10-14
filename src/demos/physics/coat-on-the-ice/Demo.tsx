"use client";

// Coat on the ice. Steady heat flow through layers: Q = dT / sum(R), with R = 1/(hA) at a surface and
// L/(kA) for a layer. A 10 cm ice cube (0.917 kg, 6 faces = 0.06 m^2) at 0 C in a 25 C room, surface
// h = 10 W/m^2K (natural convection plus radiation, illustrative): R = 1.667 K/W, so 15.0 W flows in and
// it melts (334 kJ/kg) in 5.7 h. 1 cm of wool (k = 0.04 W/mK) adds 4.167 K/W: 4.3 W, 19.9 h. A person
// (skin 34 C, room 5 C, 1.8 m^2, same layers) loses 522 W bare and 149 W in the coat. The coat has no
// energy source: it only slows the flow, either way. Brief: company/domains/briefs/physics.md round 4,
// #60; numbers from artifacts/scratch/cm-physics-r4/check.mjs (recomputed here from the same constants).
//
// One picture: the block (or the person) on a table with heat-flow arrows whose thickness is set by the
// watts (the cause) and a melt clock. Arrow thickness: 0.5 px per W for the block, 0.015 px per W for
// the person (each scene to its own scale; claimed). Earned reveal: milestones "bare", "coat" (the
// question's case), "person"; values recorded in the Seen row when each fires.
// QA path (DOM order): Bare block, Wrap it in the coat, Person in the coat.

import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const H_SURF = 10; // W/m^2K
const K_WOOL = 0.04; // W/mK
const L_WOOL = 0.01; // m
const LF = 334e3; // J/kg
const SIDE = 0.1; // m
const A_ICE = 6 * SIDE * SIDE;
const M_ICE = 917 * SIDE ** 3;
const ROOM = 25;
const flow = (dT: number, area: number, coat: boolean) => dT / (1 / (H_SURF * area) + (coat ? L_WOOL / (K_WOOL * area) : 0));
const ICE_BARE = flow(ROOM, A_ICE, false); // 15.0 W
const ICE_COAT = flow(ROOM, A_ICE, true); // 4.3 W
const meltH = (w: number) => (M_ICE * LF) / w / 3600;
const SKIN = 34;
const COLD_ROOM = 5;
const A_BODY = 1.8;
const BODY_BARE = flow(SKIN - COLD_ROOM, A_BODY, false); // 522 W
const BODY_COAT = flow(SKIN - COLD_ROOM, A_BODY, true); // 149 W

type Mode = "none" | "bare" | "coat" | "person";
const MILESTONES = ["bare", "coat", "person"] as const;
const f1 = (x: number) => x.toFixed(1);
const f0 = (x: number) => x.toFixed(0);

const W = 320;
const H = 150;
const TABLE = 124;
const BX = 160; // block centre
const BS = 46; // block size
const BY = TABLE - BS / 2;

export default function CoatOnTheIce({ slug }: { slug: string }) {
  const [mode, setMode] = useState<Mode>("none");
  const [seen, setSeen] = useState<{ bare?: number; coat?: number; person?: number }>({});

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Two identical ice blocks sit in a 25 °C room. One is wrapped in a wool coat. Which melts first?",
        options: ["The wrapped block", "The bare block", "Both at the same time"],
        answer: 1,
      }}
      exploreHint="Try the bare block, then wrap it, then put the coat on a person."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Your bare block took in heat at {seen.bare !== undefined ? f1(seen.bare) : "?"} W and melted in about{" "}
            {seen.bare !== undefined ? f1(meltH(seen.bare)) : "?"} hours. Wrapped in the coat, it took in only{" "}
            {seen.coat !== undefined ? f1(seen.coat) : "?"} W and lasted{" "}
            <strong>about {seen.coat !== undefined ? f0(meltH(seen.coat)) : "?"} hours</strong>.
          </p>
          <p>
            The coat makes no heat. It is a layer of trapped air that slows heat crossing it in either direction: on the
            person it cut the heat flowing out from {f0(BODY_BARE)} W to {seen.person !== undefined ? f0(seen.person) : "?"}{" "}
            W. Heat flows from warm to cold, and insulation only slows it. Your body is the heater.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const go = (m: Mode) => {
              setMode(m);
              if (m === "bare") {
                setSeen((x) => ({ ...x, bare: ICE_BARE }));
                reach("bare");
              }
              if (m === "coat") {
                setSeen((x) => ({ ...x, coat: ICE_COAT }));
                reach("coat");
              }
              if (m === "person") {
                setSeen((x) => ({ ...x, person: BODY_COAT }));
                reach("person");
              }
            };
            const person = mode === "person" && !locked;
            const wrapped = (mode === "coat" || mode === "person") && !locked;
            const watts = locked || mode === "none" ? 0 : mode === "bare" ? ICE_BARE : mode === "coat" ? ICE_COAT : BODY_COAT;
            const thick = person ? watts * 0.015 : watts * 0.5;
            const caption = locked
              ? "Make a prediction to start."
              : mode === "none"
                ? "Ice at 0 °C in a 25 °C room. Pick a setup."
                : person
                  ? "Skin 34 °C, room 5 °C. Arrow width = heat flow."
                  : "Arrow width = heat flow into the ice.";
            const seenText = [
              `bare: ${seen.bare !== undefined ? `${f1(seen.bare)} W, ${f1(meltH(seen.bare))} h` : "–"}`,
              `coat: ${seen.coat !== undefined ? `${f1(seen.coat)} W, ${f1(meltH(seen.coat))} h` : "–"}`,
              `person: ${seen.person !== undefined ? `${f0(seen.person)} W out` : "–"}`,
            ].join(" · ");
            // arrows: pointing in for the ice, out for the person
            const arrows: [number, number, number, number][] = person
              ? [
                  [BX - 30, 60, BX - 78, 60],
                  [BX + 30, 60, BX + 78, 60],
                  [BX - 30, 90, BX - 78, 90],
                  [BX + 30, 90, BX + 78, 90],
                ]
              : [
                  [BX - 86, BY, BX - BS / 2 - 14, BY],
                  [BX + 86, BY, BX + BS / 2 + 14, BY],
                  [BX, 20, BX, BY - BS / 2 - 14],
                  [BX - 70, 40, BX - BS / 2 - 10, BY - BS / 2 - 8],
                  [BX + 70, 40, BX + BS / 2 + 10, BY - BS / 2 - 8],
                ];
            const label = locked
              ? ""
              : mode === "bare" || mode === "coat"
                ? `${f1(watts)} W in · melts in ${f1(meltH(watts))} h`
                : person
                  ? `${f0(BODY_COAT)} W out (bare: ${f0(BODY_BARE)} W)`
                  : "";
            return (
              <div className={s.wrap}>
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className={`stage-svg ${s.fit}`}
                  role="img"
                  aria-label={locked ? "An ice block on a table in a warm room" : `${caption} ${label}`}
                >
                  <defs>
                    <marker id="ci-h" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="2.4" markerHeight="2.4" orient="auto">
                      <path d="M0,0 L10,5 L0,10 z" className={s.headH} />
                    </marker>
                  </defs>
                  {person ? (
                    <line x1={20} y1={TABLE} x2={W - 20} y2={TABLE} className={s.floor} />
                  ) : (
                    <>
                      <line x1={20} y1={TABLE} x2={W - 20} y2={TABLE} className={s.table} />
                      <line x1={40} y1={TABLE} x2={40} y2={H - 4} className={s.table} />
                      <line x1={W - 40} y1={TABLE} x2={W - 40} y2={H - 4} className={s.table} />
                    </>
                  )}

                  {person ? (
                    <g>
                      {/* a person in a coat, standing on the floor */}
                      <circle cx={BX} cy={30} r={11} className={s.skin} />
                      <rect x={BX - 22} y={42} width={44} height={60} rx={12} className={s.coat} />
                      <line x1={BX - 9} y1={102} x2={BX - 9} y2={TABLE} className={s.leg} />
                      <line x1={BX + 9} y1={102} x2={BX + 9} y2={TABLE} className={s.leg} />
                      <text x={BX} y={76} textAnchor="middle" className={s.small}>
                        coat
                      </text>
                    </g>
                  ) : (
                    <g>
                      {wrapped && <rect x={BX - BS / 2 - 8} y={BY - BS / 2 - 8} width={BS + 16} height={BS + 8} rx={8} className={s.coat} />}
                      <rect x={BX - BS / 2} y={BY - BS / 2} width={BS} height={BS} rx={3} className={s.ice} />
                      <text x={BX} y={BY + 4} textAnchor="middle" className={s.small}>
                        {wrapped ? "ice in coat" : "ice 0 °C"}
                      </text>
                    </g>
                  )}

                  {watts > 0 &&
                    arrows.map(([x1, y1, x2, y2], i) => (
                      <line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        className={s.heat}
                        style={{ strokeWidth: Math.max(1.2, thick) }}
                        markerEnd="url(#ci-h)"
                      />
                    ))}

                  <text x={6} y={14} className={s.small}>
                    {person ? "room 5 °C" : "room 25 °C"}
                  </text>
                  {label && (
                    <text x={W - 6} y={14} textAnchor="end" className={s.labD}>
                      {label}
                    </text>
                  )}
                </svg>

                <p className={s.caption} aria-live="polite">
                  {caption}
                </p>
                <p className={s.seen}>Seen: {seenText}</p>

                <Row>
                  <Control className={mode === "bare" ? "active" : ""} disabled={locked || mode === "bare"} onClick={() => go("bare")}>
                    Bare block
                  </Control>
                  <Control className={mode === "coat" ? "active" : ""} disabled={locked || mode === "coat"} onClick={() => go("coat")}>
                    Wrap it in the coat
                  </Control>
                  <Control className={mode === "person" ? "active" : ""} disabled={locked || mode === "person"} onClick={() => go("person")}>
                    Person in the coat
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
