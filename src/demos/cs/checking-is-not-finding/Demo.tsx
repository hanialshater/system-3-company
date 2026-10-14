"use client";

// Checking versus finding (subset sum). Six number chips; a grid with one square per group (64, or 128 with
// a 7th number). Presets in DOM order: Check 4 + 5 (one addition, no squares), Search for 9 (fills squares in
// binary counting order up to the 21st, the hit), Search for 13 (fills all 64, none found), Add a 7th number
// (grid doubles to 128), Reset. Each of the first four is a milestone. The trace line keeps
// "check 1 · find 9: 21 · no 13: 64 · 7 numbers: 128" and survives Reset, so the reveal's numbers stay on the stage.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { NUMBERS, SEVENTH, members, search } from "./model";
import s from "./styles.module.css";

type Mode = "idle" | "check" | "find9" | "none13" | "seven";
const FIND9 = search(9);
const NONE13 = search(13);
const CHECK_PAIR = [2, 4]; // indices of 4 and 5

const CHIP_W = 40, CHIP_PITCH = 46, CHIP_X0 = 9;
const CELL = 12, PITCH = 14, GRID_Y0 = 54;

function Stage({ locked, interact, mode, setMode, seen }: {
  locked: boolean; interact: () => void; mode: Mode; setMode: (m: Mode) => void; seen: Set<Mode>;
}) {
  const { reach } = useMilestones(interact, ["check", "find9", "none13", "seven"]);
  const go = (m: Mode) => { setMode(m); reach(m); };
  const nums: number[] = mode === "seven" ? [...NUMBERS, SEVENTH] : [...NUMBERS];
  const groups = 2 ** nums.length;
  const gridX0 = (340 - (groups / 8) * PITCH + (PITCH - CELL)) / 2;
  const tried = mode === "find9" ? FIND9.tried : mode === "none13" ? NONE13.tried : 0;
  const lit = mode === "check" ? CHECK_PAIR : mode === "find9" ? members(FIND9.hit, NUMBERS.length) : [];
  const status = mode === "check" ? "4 + 5 = 9 · 1 addition"
    : mode === "find9" ? `4 + 5 = 9 · found at group ${FIND9.tried}`
    : mode === "none13" ? `Nothing makes 13 · all ${NONE13.tried} tried`
    : mode === "seven" ? `7 numbers · groups: ${groups}`
    : " ";
  const trace = [
    seen.has("check") ? "check: 1" : null,
    seen.has("find9") ? `find 9: ${FIND9.tried}` : null,
    seen.has("none13") ? `prove no 13: ${NONE13.tried}` : null,
    seen.has("seven") ? "7 numbers: 128" : null,
  ].filter(Boolean).join(" · ");

  return (
    <div className={s.wrap}>
      <svg viewBox="0 0 340 170" className={`stage-svg ${s.svg}`} role="img"
        aria-label={`Numbers ${nums.join(", ")}. ${groups} groups, one square each; ${tried} tried. ${status}`}>
        {nums.map((v, i) => (
          <g key={i}>
            <rect x={CHIP_X0 + i * CHIP_PITCH} y={6} width={CHIP_W} height={34} rx={8}
              className={lit.includes(i) ? s.chipLit : i === 6 ? s.chipNew : s.chip} />
            <text x={CHIP_X0 + i * CHIP_PITCH + CHIP_W / 2} y={29} textAnchor="middle" className={lit.includes(i) ? s.chipTextLit : s.chipText}>{v}</text>
          </g>
        ))}
        {Array.from({ length: groups }, (_, i) => {
          const col = Math.floor(i / 8), row = i % 8;
          const cls = mode === "find9" && i === FIND9.hit ? s.hit : i < tried ? s.tried : s.cell;
          return <rect key={i} x={gridX0 + col * PITCH} y={GRID_Y0 + row * PITCH} width={CELL} height={CELL} rx={2} className={cls} />;
        })}
      </svg>
      <p className={s.status}>{status}</p>
      <Row>
        <Control disabled={locked || mode === "check"} onClick={() => go("check")}>Check 4 + 5</Control>
        <Control disabled={locked || mode === "find9"} onClick={() => go("find9")}>Search for 9</Control>
        <Control disabled={locked || mode === "none13"} onClick={() => go("none13")}>Search for 13</Control>
        <Control disabled={locked || mode === "seven"} onClick={() => go("seven")}>Add a 7th number</Control>
        <Control disabled={locked || mode === "idle"} onClick={() => setMode("idle")}>Reset</Control>
      </Row>
      <Row>
        <Readout label="Groups tried" value={tried} />
        <Readout label="Groups" value={groups} />
      </Row>
      <p className={s.trace}>{trace || " "}</p>
    </div>
  );
}

export default function CheckingIsNotFinding({ slug }: { slug: string }) {
  const [mode, setModeState] = useState<Mode>("idle");
  const [seen, setSeen] = useState<Set<Mode>>(new Set());
  const setMode = (m: Mode) => {
    setModeState(m);
    if (m !== "idle") setSeen((p) => (p.has(m) ? p : new Set([...p, m])));
  };
  const order: Mode[] = ["check", "find9", "none13", "seven"];
  const next = order.find((m) => !seen.has(m));
  const hint = next === "check" ? "Start by checking 4 + 5."
    : next === "find9" ? "Now search for a group that makes 9."
    : next === "none13" ? "Now search for 13."
    : next === "seven" ? "Now add a 7th number."
    : "Compare the counts in the trace.";

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "3, 34, 4, 12, 5, 2. Checking 4 + 5 = 9: one addition. Proving no group sums to 13: how many groups to try?",
        options: ["6", "12", "64"],
        answer: 2,
      }}
      exploreHint={hint}
      minInteractions={4}
      reveal={() => (
        <>
          <p>
            Checking 4 + 5 took one addition. Finding a group meant trying them: the <strong>{FIND9.tried}st</strong> group made 9, and proving that nothing makes 13 took all <strong>{NONE13.tried}</strong>. One more number doubled the squares to 128.
          </p>
          <p>
            For problems like this, called NP problems, a proposed answer is quick to check, yet nobody knows a method that always finds one without a search that grows this fast. Whether such a method exists is the P versus NP question.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} mode={mode} setMode={setMode} seen={seen} />}
    </Lesson>
  );
}
