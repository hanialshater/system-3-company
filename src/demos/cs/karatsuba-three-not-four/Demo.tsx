"use client";

// Two product trees for 11141313 x 13111224, built by real recursive multiplication (split at half the longer length,
// base case when either factor < 10). Schoolbook splits each product into 4 (a·c, a·d, b·c, b·d); Karatsuba into 3
// (a·c, b·d, (a+b)(c+d)). One shared button splits both one level: 4 | 3, 16 | 9, 64 | 27 one-digit products. The
// counts are the trees' real leaves, not constants. No half-sum carries for these numbers, so every leaf is 1-digit.
// The halves differ (a 1114, b 1313, c 1311, d 1224) so the middle check can tell the cross terms from a·c and b·d.
// v5 (wave H r8): phone fit. viewBox 274 -> 190 tall (one-digit dots packed 16 per row; the shared product moved into
// the top box), labels >= 10px, the table is transposed (2 rows of counts), the three buttons fit one row, the check
// lines are 4 short lines, the notation line hides at the reveal, and the reveal points at the check lines, not a box.
// Milestones: one-digit-leaves and middle-checked (the check line prints both sides of the cross-term identity) (spec company/design/specs/karatsuba-three-not-four.md).

import { useEffect, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const X = BigInt("11141313");
const Y = BigInt("13111224");
const TEN = BigInt(10);

type Node = { x: bigint; y: bigint; label: string; kids: Node[]; value: bigint };

const len = (v: bigint) => v.toString().length;

function split(x: bigint, y: bigint) {
  const h = Math.floor(Math.max(len(x), len(y)) / 2);
  const p = TEN ** BigInt(h);
  return { p, a: x / p, b: x % p, c: y / p, d: y % p };
}

function school(x: bigint, y: bigint, label: string): Node {
  if (x < TEN || y < TEN) return { x, y, label, kids: [], value: x * y };
  const { p, a, b, c, d } = split(x, y);
  const kids = [school(a, c, "a·c"), school(a, d, "a·d"), school(b, c, "b·c"), school(b, d, "b·d")];
  const [ac, ad, bc, bd] = kids.map((k) => k.value);
  return { x, y, label, kids, value: ac * p * p + (ad + bc) * p + bd };
}

function kara(x: bigint, y: bigint, label: string): Node {
  if (x < TEN || y < TEN) return { x, y, label, kids: [], value: x * y };
  const { p, a, b, c, d } = split(x, y);
  const kids = [kara(a, c, "a·c"), kara(b, d, "b·d"), kara(a + b, c + d, "(a+b)(c+d)")];
  const [ac, bd, m] = kids.map((k) => k.value);
  return { x, y, label, kids, value: ac * p * p + (m - ac - bd) * p + bd };
}

const S = school(X, Y, "");
const K = kara(X, Y, "");

const level = (n: Node, depth: number): Node[] => (depth === 0 ? [n] : n.kids.flatMap((k) => level(k, depth - 1)));
const depthOf = (n: Node): number => (n.kids.length ? 1 + Math.max(...n.kids.map(depthOf)) : 0);
const DEPTH = Math.max(depthOf(S), depthOf(K)); // 3
const COUNTS = Array.from({ length: DEPTH + 1 }, (_, d) => [level(S, d).length, level(K, d).length]); // 1|1 4|3 16|9 64|27
const DIGITS = COUNTS.map((_, d) => Math.max(...[...level(S, d), ...level(K, d)].map((n) => Math.max(len(n.x), len(n.y)))));

// The middle check, from the top split: a·d + b·c = (a+b)(c+d) − a·c − b·d.
const TOP = split(X, Y);
const CROSS = TOP.a * TOP.d + TOP.b * TOP.c;
const VIA = (TOP.a + TOP.b) * (TOP.c + TOP.d) - TOP.a * TOP.c - TOP.b * TOP.d;
const AC = TOP.a * TOP.c;
const BD = TOP.b * TOP.d;
const SUMS = (TOP.a + TOP.b) * (TOP.c + TOP.d);
const AD = TOP.a * TOP.d;
const BC = TOP.b * TOP.c;

const fmt = (v: bigint) => v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const reduced = () => typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const COLS = [
  { x: 2, w: 166, tree: S, head: "Schoolbook: 4 per split" },
  { x: 172, w: 166, tree: K, head: "Karatsuba: 3 per split" },
];
const VIEW_H = 190;
const L1Y = 40;
const L2Y = 86;
const L2H = 15; // row pitch of the half-size product boxes
const L3Y = 150;

function Column({ col, lvl, middle }: { col: (typeof COLS)[number]; lvl: number; middle: boolean }) {
  const l1 = col.tree.kids;
  const bw = col.w / l1.length;
  const isK = col.tree === K;
  return (
    <g>
      <text x={col.x + col.w / 2} y={33} textAnchor="middle" className={s.head}>
        {col.head}
      </text>
      {lvl >= 1 &&
        l1.map((n, i) => {
          const hi = middle && isK && n.label === "(a+b)(c+d)";
          return (
            <g key={i} className={s.grow}>
              <rect
                x={col.x + i * bw + 1}
                y={L1Y}
                width={bw - 2}
                height={40}
                rx={4}
                fill={isK ? "color-mix(in srgb, var(--domain) 18%, var(--bg-2))" : "var(--bg-2)"}
                stroke={hi ? "var(--domain)" : "var(--line)"}
                strokeWidth={hi ? 2.5 : 1}
              />
              <text x={col.x + i * bw + bw / 2} y={L1Y + 12} textAnchor="middle" className={s.lab}>
                {n.label}
              </text>
              <text x={col.x + i * bw + bw / 2} y={L1Y + 23} textAnchor="middle" className={s.nums}>
                {n.x.toString()}
              </text>
              <text x={col.x + i * bw + bw / 2} y={L1Y + 34} textAnchor="middle" className={s.nums}>
                ×{n.y.toString()}
              </text>
            </g>
          );
        })}
      {lvl >= 2 &&
        l1.map((n, i) =>
          n.kids.map((m, j) => (
            <g key={`${i}-${j}`} className={s.grow}>
              <rect
                x={col.x + i * bw + 2}
                y={L2Y + j * L2H}
                width={bw - 4}
                height={L2H - 2}
                rx={3}
                fill={isK ? "color-mix(in srgb, var(--domain) 18%, var(--bg-2))" : "var(--bg-2)"}
                stroke="var(--line)"
              />
              <text x={col.x + i * bw + bw / 2} y={L2Y + j * L2H + 10} textAnchor="middle" className={s.small}>
                {m.x.toString()}×{m.y.toString()}
              </text>
            </g>
          )),
        )}
      {lvl >= 3 &&
        (isK
          ? l1.map((n, i) =>
              level(n, 2).map((_, q) => (
                <circle
                  key={`${i}-${q}`}
                  className={s.grow}
                  cx={col.x + i * bw + bw / 2 - 10 + (q % 3) * 10}
                  cy={L3Y + 5 + Math.floor(q / 3) * 10}
                  r={3.5}
                  fill="var(--fg)"
                />
              )),
            )
          : level(col.tree, 3).map((_, q) => (
              <circle
                key={q}
                className={s.grow}
                cx={col.x + col.w / 2 - 75 + (q % 16) * 10}
                cy={L3Y + 5 + Math.floor(q / 16) * 10}
                r={3.5}
                fill="var(--fg)"
              />
            )))}
    </g>
  );
}

function Stage({ locked, revealed, interact, lvl, splitOne, splitAll, busy, middle, toggle }: {
  locked: boolean;
  revealed: boolean;
  interact: () => void;
  lvl: number;
  splitOne: () => void;
  splitAll: () => void;
  busy: boolean;
  middle: boolean;
  toggle: () => void;
}) {
  const { reach } = useMilestones(interact, ["one-digit-leaves", "middle-checked"]);
  useEffect(() => {
    if (lvl >= DEPTH) reach("one-digit-leaves");
  }, [lvl]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (middle) reach("middle-checked");
  }, [middle]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className={s.wrap}>
      {!revealed && <p className={s.rule}>Split each number into halves: a b and c d. Multiply the halves.</p>}
      <svg
        viewBox={`0 0 340 ${VIEW_H}`}
        className="stage-svg"
        role="img"
        aria-label={`Schoolbook: ${COUNTS[lvl][0]} products at this level. Karatsuba: ${COUNTS[lvl][1]}${lvl >= DEPTH ? " one-digit products" : ""}`}
      >
        <rect x={lvl >= DEPTH ? 20 : 80} y={2} width={lvl >= DEPTH ? 300 : 180} height={20} rx={5} fill="var(--bg-2)" stroke="var(--line)" />
        <text x={170} y={16} textAnchor="middle" className={s.topbox}>
          {X.toString()} × {Y.toString()}
          {/* Both trees rebuild the same product from their leaves; shown once both reach 1 digit. */}
          {lvl >= DEPTH && S.value === K.value ? ` = ${fmt(S.value)} (both)` : ""}
        </text>
        {COLS.map((c) => (
          <Column key={c.head} col={c} lvl={lvl} middle={middle} />
        ))}
      </svg>
      <table className={s.table}>
        <thead>
          <tr>
            <th>Products</th>
            {COUNTS.slice(1).map((_, i) => (
              <th key={i}>{DIGITS[i + 1]}-digit</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(["Schoolbook", "Karatsuba"] as const).map((name, k) => (
            <tr key={name}>
              <th>{name}</th>
              {COUNTS.slice(1).map((c, i) => (
                <td key={i}>{lvl > i ? c[k] : "?"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={s.checkBox} data-testid="middle-check">
        {middle ? (
          <>
            <p className={s.check}>(a+b)(c+d) = a·c + a·d + b·c + b·d</p>
            <p className={s.check}>
              Schoolbook&rsquo;s a·d + b·c = {fmt(CROSS)}
            </p>
            <p className={s.check}>Karatsuba&rsquo;s (a+b)(c+d) − a·c − b·d:</p>
            <p className={s.check}>
              {fmt(SUMS)} − {fmt(AC)} − {fmt(BD)} = {fmt(VIA)}
            </p>
          </>
        ) : (
          <p className={s.rule}>Where did a·d and b·c go? Check the middle.</p>
        )}
      </div>
      <Row>
        <Control className={s.tap} disabled={locked || lvl >= DEPTH || busy} onClick={splitOne}>
          Split once
        </Control>
        <Control className={s.tap} disabled={locked || lvl >= DEPTH || busy} onClick={splitAll}>
          Split to 1 digit
        </Control>
        <Control
          className={`${s.tap} ${middle ? "active" : ""}`}
          aria-pressed={middle}
          disabled={locked || middle}
          onClick={toggle}
        >
          Check middle
        </Control>
      </Row>
    </div>
  );
}

export default function KaratsubaThreeNotFour({ slug }: { slug: string }) {
  const [lvl, setLvl] = useState(0);
  const [target, setTarget] = useState(0);
  const [middle, setMiddle] = useState(false);
  useEffect(() => {
    if (lvl >= target) return;
    const t = setTimeout(() => setLvl((x) => x + 1), 120);
    return () => clearTimeout(t);
  }, [lvl, target]);
  const splitOne = () => {
    setTarget(lvl + 1);
    setLvl(lvl + 1);
  };
  const splitAll = () => {
    setTarget(DEPTH);
    setLvl(reduced() ? DEPTH : lvl + 1);
  };
  const [sl, kl] = COUNTS[DEPTH];
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Multiply 11141313 × 13111224 by splitting each number in half, again and again, down to 1-digit pieces. Schoolbook makes 4 half-size products per split and ends with 64 one-digit products. Karatsuba makes 3 per split. How many does it end with?",
        options: ["16", "27", "48"],
        answer: 1,
      }}
      exploreHint="Split both ways and count the smallest products."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Schoolbook needed <strong>{sl}</strong> one-digit products; Karatsuba <strong>{kl}</strong>: 4·4·4 against 3·3·3.
          </p>
          <p>
            Your check lines show why: (a+b)(c+d) holds all four products, so {fmt(SUMS)} − {fmt(AC)} − {fmt(BD)} ={" "}
            {fmt(VIA)} leaves schoolbook&rsquo;s a·d + b·c. One product saved per split compounds: about n<sup>1.58</sup>{" "}
            instead of n<sup>2</sup>.
          </p>
        </>
      )}
    >
      {({ locked, interact, phase }) => (
        <Stage
          locked={locked}
          revealed={phase === "reveal"}
          interact={interact}
          lvl={lvl}
          splitOne={splitOne}
          splitAll={splitAll}
          busy={lvl < target}
          middle={middle}
          toggle={() => setMiddle(true)}
        />
      )}
    </Lesson>
  );
}
