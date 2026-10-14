"use client";

// Divide six by zero. A jug marked 0 to 6 and a scoop drawn at its size. A size chip pours scoops
// until the jug is full and logs "6 ÷ size = count"; the zero scoop pours 1,000 times and fills
// nothing; Check shows that any number times 0 is 0. The log and check lines stay through Reset.
// Milestones: two non-zero sizes seen; the zero scoop poured; the check shown.
// Brief: company/domains/briefs/math.algebra.md, Wave J, brief 3 (check A3).

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useRef, useState } from "react";
import s from "./styles.module.css";

const TOTAL = 6;
const SIZES = [3, 1, 0.1, 0]; // DOM order from the brief
const ZERO_TRIES = 1000;
const MILESTONES = ["two-sizes", "zero-poured", "checked"] as const;
const CHECKS = [6, 1000, 1000000];

const count = (size: number) => Math.round(TOTAL / size);
const fmt = (n: number) => n.toLocaleString("en-US");

const VW = 320;
const VH = 200;
const JX = 34;
const JW = 76;
const JTOP = 14;
const UNIT = 29; // px per unit of jug, 6 units = 174 px
const JBOT = JTOP + TOTAL * UNIT;

type Seen = { sizes: number[]; zero: boolean; checked: boolean };

function list(xs: string[]) {
  return xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`;
}

export default function DivideSixByZero({ slug }: { slug: string }) {
  const [size, setSize] = useState<number | null>(null);
  const [, setTick] = useState(0);
  const seen = useRef<Seen>({ sizes: [], zero: false, checked: false });

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Division asks how many scoops fill the jug. What is 6 ÷ 0?",
        options: ["It is 0", "It is infinity", "No number works"],
        answer: 2,
      }}
      exploreHint="Pour with smaller and smaller scoops, then try 0."
      minInteractions={MILESTONES.length}
      reveal={() => {
        const sz = [...seen.current.sizes].sort((a, b) => b - a);
        return (
          <>
            <p>
              6 ÷ a scoop size asks how many scoops fill the jug. Your scoops of {list(sz.map(String))} took{" "}
              {list(sz.map((v) => String(count(v))))}, climbing with no ceiling. The climb never lands on a count, and
              infinity scoops of nothing would still hold nothing.
            </p>
            <p>
              A scoop of 0 filled nothing after {fmt(ZERO_TRIES)} tries, and the check showed why: any number times 0 is 0,
              never 6. No number passes the check, so 6 ÷ 0 has no answer: it is left undefined.
            </p>
          </>
        );
      }}
    >
      {(ctx) => <Stage {...ctx} size={size} setSize={setSize} seen={seen.current} bump={() => setTick((t) => t + 1)} />}
    </Lesson>
  );
}

function Stage({
  locked,
  interact,
  size,
  setSize,
  seen,
  bump,
}: StageContext & { size: number | null; setSize: (v: number | null) => void; seen: Seen; bump: () => void }) {
  const { reach } = useMilestones(interact, MILESTONES);

  const pour = (v: number) => {
    setSize(v);
    if (v === 0) {
      seen.zero = true;
      reach("zero-poured");
    } else {
      if (!seen.sizes.includes(v)) seen.sizes.push(v);
      if (seen.sizes.length >= 2) reach("two-sizes");
    }
  };
  const check = () => {
    seen.checked = true;
    bump();
    reach("checked");
  };

  const n = size && size > 0 ? count(size) : 0;
  const band = size ? size * UNIT : 0;
  const logged = SIZES.filter((v) => (v === 0 ? seen.zero : seen.sizes.includes(v)));
  const PX = 174;

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${VW} ${VH}`} className={`stage-svg ${s.fit}`} role="img" aria-label="Jug of 6 and a scoop">
        {/* jug fill */}
        {Array.from({ length: n }, (_, i) => (
          <rect key={i} x={JX} y={JBOT - (i + 1) * band} width={JW} height={band} className={i % 2 ? s.fillA : s.fillB} />
        ))}
        <path d={`M${JX} ${JTOP - 4} V${JBOT} H${JX + JW} V${JTOP - 4}`} className={s.jug} />
        {Array.from({ length: TOTAL + 1 }, (_, k) => (
          <g key={k}>
            <line x1={JX - 6} y1={JBOT - k * UNIT} x2={JX} y2={JBOT - k * UNIT} className={s.tick} />
            <text x={JX - 9} y={JBOT - k * UNIT + 4} textAnchor="end" className={s.mark}>{k}</text>
          </g>
        ))}

        {/* the scoop, drawn at its size */}
        {size !== null && (
          <g>
            <text x={140} y={JTOP + 6} textAnchor="middle" className={s.label}>scoop {size}</text>
            {size > 0 ? (
              <rect x={122} y={JTOP + 14} width={36} height={Math.max(band, 1.5)} className={s.scoop} />
            ) : (
              <line x1={122} y1={JTOP + 15} x2={158} y2={JTOP + 15} className={s.zeroScoop} />
            )}
          </g>
        )}
        {size === 0 && (
          <text x={JX + JW / 2} y={JBOT - 12} textAnchor="middle" className={s.empty}>0 of 6</text>
        )}

        {/* counter panel: a log of every pour, then the check */}
        <text x={PX} y={20} className={s.head}>6 ÷ scoop = scoops</text>
        {logged.map((v, i) => (
          <text key={v} x={PX} y={42 + i * 18} className={v === size ? s.rowNow : s.row}>
            {v === 0 ? `0: 0 of 6 after ${fmt(ZERO_TRIES)}` : `6 ÷ ${v} = ${count(v)}`}
          </text>
        ))}
        {seen.checked &&
          CHECKS.map((q, i) => (
            <text key={q} x={PX} y={132 + i * 18} className={s.check}>
              {fmt(q)} × 0 = 0
            </text>
          ))}
      </svg>

      <Row>
        {SIZES.map((v) => (
          <Control
            key={v}
            disabled={locked || size === v}
            className={`${s.tap} ${size === v ? "active" : ""}`}
            aria-pressed={size === v}
            onClick={() => pour(v)}
          >
            Scoop {v}
          </Control>
        ))}
        <Control disabled={locked || seen.checked} className={`${s.tap} ${seen.checked ? "active" : ""}`} onClick={check}>
          Check: ? × 0
        </Control>
        <Control disabled={locked || size === null} className={s.tap} onClick={() => setSize(null)}>
          Reset
        </Control>
      </Row>
    </div>
  );
}
