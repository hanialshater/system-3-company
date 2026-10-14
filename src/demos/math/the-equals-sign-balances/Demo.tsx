"use client";

// The equals sign balances. A beam: left pan holds 8 and 4 blocks, right pan holds the box and 5.
// Chips put 12, 17 or 7 blocks in the box; the beam tips toward the heavier side or goes level.
// Milestones: a wrong value tipped the beam (first one recorded), and 7 made it level.
// Every try leaves a trace line, so Reset cannot erase what the reveal quotes.
// Brief: company/domains/briefs/math.algebra.md, Wave J, brief 1 (check A1).

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useRef, useState } from "react";
import s from "./styles.module.css";

const A = 8;
const B = 4;
const C = 5;
const LEFT = A + B; // 12
const CHIPS = [12, 17, 7]; // DOM order from the brief
const RIGHT_BOX = LEFT - C; // 7
const MILESTONES = ["tipped", "level"] as const;

const W = 320;
const H = 196;
const PX = 160; // pivot
const PY = 62;
const ARM = 108;
const PAN_Y = 72; // pan plate below the hang point
const PAN_HALF = 47;
const BLOCK = 8;
const PITCH = 10;
const PER_ROW = 4;

type Seen = { first: number | null; tries: number[] };

function Stack({ n, x, y, cls }: { n: number; x: number; y: number; cls: string }) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const col = i % PER_ROW;
        const row = Math.floor(i / PER_ROW);
        return <rect key={i} x={x + col * PITCH} y={y - (row + 1) * PITCH} width={BLOCK} height={BLOCK} rx={1.5} className={cls} />;
      })}
    </>
  );
}

export default function TheEqualsSignBalances({ slug }: { slug: string }) {
  const [box, setBox] = useState<number | null>(null);
  const seen = useRef<Seen>({ first: null, tries: [] });

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "8 + 4 = □ + 5. What number goes in the box?",
        options: ["7", "12", "17"],
        answer: 0,
      }}
      exploreHint="Put each number in the box and watch the beam."
      minInteractions={MILESTONES.length}
      reveal={() => {
        const w = seen.current.first ?? 12;
        return (
          <>
            <p>
              With {w} in the box the right side came to {w + C}, and the beam tipped: {w + C} is not {LEFT}. With{" "}
              {RIGHT_BOX} it went level, {LEFT} on both sides.
            </p>
            <p>
              The equals sign does not mean &ldquo;the answer comes next&rdquo;. It says both sides are the same amount,
              like a level beam. So 8 + 4 = 7 + 5 is true, and reading left to right is only one way to check it.
            </p>
          </>
        );
      }}
    >
      {(ctx) => <Stage {...ctx} box={box} setBox={setBox} seen={seen.current} />}
    </Lesson>
  );
}

function Stage({ locked, interact, box, setBox, seen }: StageContext & { box: number | null; setBox: (v: number | null) => void; seen: Seen }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const right = box === null ? null : box + C;
  const diff = right === null ? 0 : right - LEFT;
  const angle = Math.sign(diff) * Math.min(10, Math.abs(diff) * 2);

  const put = (v: number) => {
    setBox(v);
    if (!seen.tries.includes(v)) seen.tries.push(v);
    if (v !== RIGHT_BOX) {
      if (seen.first === null) seen.first = v;
      reach("tipped");
    } else reach("level");
  };

  const status =
    right === null ? `left ${LEFT} · right □ + ${C}` : `left ${LEFT} · right ${right}${right === LEFT ? " · level" : ""}`;

  const pan = (hx: number, side: "L" | "R") => (
    <g style={{ transform: `rotate(${-angle}deg)`, transformOrigin: `${hx}px ${PY}px` }} className={s.swing}>
      <line x1={hx} y1={PY} x2={hx - PAN_HALF} y2={PY + PAN_Y} className={s.string} />
      <line x1={hx} y1={PY} x2={hx + PAN_HALF} y2={PY + PAN_Y} className={s.string} />
      <rect x={hx - PAN_HALF - 2} y={PY + PAN_Y} width={PAN_HALF * 2 + 4} height={4} rx={2} className={s.plate} />
      {side === "L" ? (
        <>
          <Stack n={A} x={hx - 43} y={PY + PAN_Y - 1} cls={s.blockA} />
          <Stack n={B} x={hx + 5} y={PY + PAN_Y - 1} cls={s.blockB} />
          <text x={hx - 24} y={PY + PAN_Y + 17} textAnchor="middle" className={s.num}>8</text>
          <text x={hx + 24} y={PY + PAN_Y + 17} textAnchor="middle" className={s.num}>4</text>
        </>
      ) : (
        <>
          <rect x={hx - 46} y={PY + PAN_Y - 55} width={44} height={54} rx={3} className={s.box} />
          {box === null ? (
            <text x={hx - 24} y={PY + PAN_Y - 22} textAnchor="middle" className={s.q}>?</text>
          ) : (
            <Stack n={box} x={hx - 43} y={PY + PAN_Y - 1} cls={s.blockBox} />
          )}
          <Stack n={C} x={hx + 5} y={PY + PAN_Y - 1} cls={s.blockC} />
          <text x={hx - 24} y={PY + PAN_Y + 17} textAnchor="middle" className={s.num}>{box === null ? "□" : `□ = ${box}`}</text>
          <text x={hx + 24} y={PY + PAN_Y + 17} textAnchor="middle" className={s.num}>5</text>
        </>
      )}
    </g>
  );

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Balance: ${status}`}>
        <polygon points={`${PX},${PY} ${PX - 16},${PY + 104} ${PX + 16},${PY + 104}`} className={s.post} />
        <line x1={PX - 40} y1={PY + 104} x2={PX + 40} y2={PY + 104} className={s.ground} />
        {box === null && (
          <>
            <polygon points={`${PX - 30},${PY + 4} ${PX - 14},${PY + 4} ${PX - 14},${PY + 22}`} className={s.stop} />
            <polygon points={`${PX + 30},${PY + 4} ${PX + 14},${PY + 4} ${PX + 14},${PY + 22}`} className={s.stop} />
          </>
        )}
        <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: `${PX}px ${PY}px` }} className={s.swing}>
          <rect x={PX - ARM - 6} y={PY - 3} width={(ARM + 6) * 2} height={6} rx={3} className={s.beam} />
          {pan(PX - ARM, "L")}
          {pan(PX + ARM, "R")}
        </g>
        <circle cx={PX} cy={PY} r={4} className={s.pin} />
        <text x={PX} y={H - 4} textAnchor="middle" className={s.status}>
          {status}
        </text>
      </svg>

      <p className={s.caption} aria-live="polite">
        {locked
          ? "The beam rests on its stops. Predict first."
          : seen.tries.length === 0
            ? "Put a number in the box."
            : "Tried: " + seen.tries.map((t) => `${t} → ${t + C === LEFT ? `${t + C} level` : `right ${t + C}`}`).join(" · ")}
      </p>

      <Row>
        {CHIPS.map((v) => (
          <Control
            key={v}
            disabled={locked || box === v}
            className={`${s.tap} ${box === v ? "active" : ""}`}
            aria-pressed={box === v}
            onClick={() => put(v)}
          >
            Box = {v}
          </Control>
        ))}
        <Control disabled={locked || box === null} className={s.tap} onClick={() => setBox(null)}>
          Reset
        </Control>
      </Row>
    </div>
  );
}
