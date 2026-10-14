"use client";

// One ladder, two columns: ordinary binary and Gray code (g = n XOR (n >> 1)) for n = 0..7, one row per number.
// Lamps that changed from the row above are ringed and counted. Binary flips 1 2 1 3 1 2 1 (11); Gray flips 1 each (7).
// Milestones: three-to-four (row 4 reached), at-seven (spec company/design/specs/gray-code-one-flip.md).

import { useEffect, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const BITS = 3;
const LAST = (1 << BITS) - 1; // 7
const gray = (n: number) => n ^ (n >> 1);
const bits = (x: number) => Array.from({ length: BITS }, (_, i) => (x >> (BITS - 1 - i)) & 1);
const str = (x: number) => bits(x).join("");
const pop = (x: number) => bits(x).reduce((a, b) => a + b, 0);
const flips = (f: (n: number) => number, n: number) => (n === 0 ? 0 : pop(f(n) ^ f(n - 1)));
const id = (n: number) => n;
const total = (f: (n: number) => number, k: number) => Array.from({ length: k + 1 }, (_, n) => flips(f, n)).reduce((a, b) => a + b, 0);

const BIN_TOTAL = total(id, LAST); // 11
const GRAY_TOTAL = total(gray, LAST); // 7

const reduced = () => typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const ROW = 28;
const TOP = 22;
const LAMP = 16;

function Lamps({ x, y, v, prev }: { x: number; y: number; v: number; prev: number | null }) {
  const b = bits(v);
  const p = prev === null ? null : bits(prev);
  return (
    <g>
      {b.map((on, i) => {
        const cx = x + i * 22 + LAMP / 2;
        const changed = p !== null && p[i] !== on;
        return (
          <g key={i}>
            {changed && <circle cx={cx} cy={y} r={LAMP / 2 + 3} fill="none" stroke="var(--fg)" strokeWidth={2} />}
            <circle
              cx={cx}
              cy={y}
              r={LAMP / 2}
              fill={on ? "var(--domain)" : "none"}
              stroke={on ? "var(--domain)" : "var(--muted)"}
              strokeWidth={1.5}
            />
          </g>
        );
      })}
      <text x={x + 3 * 22 + 4} y={y + 4} className={s.digits}>
        {str(v)}
      </text>
    </g>
  );
}

function Stage({ locked, interact, k, next, runTo, busy }: {
  locked: boolean;
  interact: () => void;
  k: number;
  next: () => void;
  runTo: () => void;
  busy: boolean;
}) {
  const { reach } = useMilestones(interact, ["three-to-four", "at-seven"]);
  useEffect(() => {
    if (k >= 4) reach("three-to-four");
    if (k >= LAST) reach("at-seven");
  }, [k]); // eslint-disable-line react-hooks/exhaustive-deps
  const rows = Array.from({ length: k + 1 }, (_, n) => n);
  const h = TOP + (LAST + 1) * ROW + 26;
  return (
    <div className={s.wrap}>
      <p className={s.rule}>Gray code: g = n XOR (n shifted right one place).</p>
      <svg
        viewBox={`0 0 340 ${h}`}
        className="stage-svg"
        role="img"
        aria-label={`Counted to ${k}: binary ${total(id, k)} flips, Gray ${total(gray, k)} flips`}
      >
        <text x={16} y={14} textAnchor="middle" className={s.head}>
          n
        </text>
        <text x={40} y={14} className={s.head}>
          Binary
        </text>
        <text x={160} y={14} textAnchor="middle" className={s.head}>
          flips
        </text>
        <text x={190} y={14} className={s.head}>
          Gray
        </text>
        <text x={312} y={14} textAnchor="middle" className={s.head}>
          flips
        </text>
        {rows.map((n) => {
          const y = TOP + n * ROW + ROW / 2;
          const newest = n === k && k > 0;
          return (
            <g key={n}>
              {newest && (
                <rect x={2} y={y - ROW / 2 + 1} width={336} height={ROW - 2} rx={5} fill="none" stroke="var(--domain)" strokeWidth={1.5} />
              )}
              <text x={16} y={y + 4} textAnchor="middle" className={s.num}>
                {n}
              </text>
              <Lamps x={40} y={y} v={n} prev={n ? n - 1 : null} />
              <text x={160} y={y + 4} textAnchor="middle" className={s.num}>
                {n ? flips(id, n) : ""}
              </text>
              <Lamps x={190} y={y} v={gray(n)} prev={n ? gray(n - 1) : null} />
              <text x={312} y={y + 4} textAnchor="middle" className={s.num}>
                {n ? flips(gray, n) : ""}
              </text>
            </g>
          );
        })}
        <line x1={2} x2={338} y1={h - 22} y2={h - 22} stroke="var(--line)" />
        <text x={40} y={h - 6} className={s.total}>
          Total flips: {total(id, k)}
        </text>
        <text x={190} y={h - 6} className={s.total}>
          Total flips: {total(gray, k)}
        </text>
      </svg>
      <Row>
        <Control className={s.tap} disabled={locked || k >= LAST || busy} onClick={next}>
          Next number
        </Control>
        <Control className={s.tap} disabled={locked || k >= LAST || busy} onClick={runTo}>
          Count to 7
        </Control>
      </Row>
    </div>
  );
}

export default function GrayCodeOneFlip({ slug }: { slug: string }) {
  const [k, setK] = useState(0);
  const [target, setTarget] = useState(0);
  useEffect(() => {
    if (k >= target) return;
    const t = setTimeout(() => setK((x) => x + 1), 50);
    return () => clearTimeout(t);
  }, [k, target]);
  const next = () => {
    setTarget(k + 1);
    setK(k + 1);
  };
  const runTo = () => {
    setTarget(LAST);
    setK(reduced() ? LAST : k + 1);
  };
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Counting 0 to 7 in ordinary binary, going from 3 (011) to 4 (100) flips 3 bits. Gray code is g = n XOR (n >> 1). How many bits flip between 3 and 4 in Gray code, and in total from 0 to 7?",
        options: ["3 and 11, as binary", "1 and 7", "1 and 11"],
        answer: 1,
      }}
      exploreHint="Count up and watch how many lamps change each time."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Going from 3 to 4, binary flipped all three lamps ({str(3)} to {str(4)}); Gray flipped one ({str(gray(3))} to{" "}
            {str(gray(4))}). Counting 0 to 7, binary made <strong>{BIN_TOTAL}</strong> flips, Gray made{" "}
            <strong>{GRAY_TOTAL}</strong>: exactly one per step.
          </p>
          <p>
            That matters for a sensor reading a dial. If it reads halfway between two marks, a Gray reading can be off by
            one position, never a jumble of bits. Rotary encoders use Gray code for this reason.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Stage locked={locked} interact={interact} k={k} next={next} runTo={runTo} busy={k < target} />
      )}
    </Lesson>
  );
}
