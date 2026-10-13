"use client";

// Equilibrium as traffic, not stillness. 100 molecules, 50 A (filled circles) and 50 B
// (hollow squares). Each tick, 12 A turn into B and 12 B turn into A, so the two count
// bars never move while a quarter of the grid flickers. Tap any molecule to tag it: its
// own history appears as a strip underneath (one is tagged to start). No words on the stage, by design.

import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import s from "./styles.module.css";

const COLS = 10;
const N = 100;
const FLIPS = 12; // each way, per tick
const CELL = 32;
const GRID_TOP = 34;
const MAX_TAGS = 3;
const TAG_CLASSES = ["tag0", "tag1", "tag2"] as const;
const HIST = 14;

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled<T>(xs: T[], rnd: () => number) {
  const a = xs.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Seeded starting mix: exactly 50 of each.
const START: boolean[] = (() => {
  const isA = Array.from({ length: N }, (_, i) => i < N / 2);
  return shuffled(isA, mulberry32(77));
})();

/** One tick: FLIPS random A become B and FLIPS random B become A. */
function step(isA: boolean[], rnd: () => number) {
  const as = isA.map((a, i) => (a ? i : -1)).filter((i) => i >= 0);
  const bs = isA.map((a, i) => (a ? -1 : i)).filter((i) => i >= 0);
  const flipped = [...shuffled(as, rnd).slice(0, FLIPS), ...shuffled(bs, rnd).slice(0, FLIPS)];
  const next = isA.slice();
  for (const i of flipped) next[i] = !next[i];
  return { next, flipped: new Set(flipped) };
}

function Glyph({ a, x, y, size, className }: { a: boolean; x: number; y: number; size: number; className?: string }) {
  return a ? (
    <circle cx={x} cy={y} r={size / 2} className={`${s.a} ${className ?? ""}`} />
  ) : (
    <rect x={x - size / 2} y={y - size / 2} width={size} height={size} rx={1.5} className={`${s.b} ${className ?? ""}`} />
  );
}

export default function TheTaggedMolecule({ slug }: { slug: string }) {
  const rnd = useRef(mulberry32(31337));
  const [isA, setIsA] = useState<boolean[]>(START);
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const [ticks, setTicks] = useState(0);
  const [tags, setTags] = useState<{ i: number; hist: boolean[] }[]>([{ i: 44, hist: [START[44]] }]);

  const countA = isA.filter(Boolean).length;
  const countB = N - countA;
  const flipsOf = (h: boolean[]) => h.slice(1).filter((v, k) => v !== h[k]).length;
  const tagFlips = tags.reduce((n, t) => n + flipsOf(t.hist), 0);
  // Ticks each tagged molecule was actually followed (a tag added later has a shorter history).
  const followed = tags.reduce((n, t) => n + t.hist.length - 1, 0);
  const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? "" : "s"}`;

  const advance = (k: number) => {
    let cur = isA;
    let last = new Set<number>();
    const hist = tags.map((t) => t.hist.slice());
    for (let j = 0; j < k; j++) {
      const r = step(cur, rnd.current);
      cur = r.next;
      last = r.flipped;
      tags.forEach((t, ti) => hist[ti].push(cur[t.i]));
    }
    setIsA(cur);
    setFlipped(last);
    setTicks((t) => t + k);
    setTags(tags.map((t, ti) => ({ ...t, hist: hist[ti] })));
  };

  const toggleTag = (i: number) => {
    setTags((ts) =>
      ts.some((t) => t.i === i)
        ? ts.filter((t) => t.i !== i)
        : [...ts, { i, hist: [isA[i]] }].slice(-MAX_TAGS),
    );
  };

  const gridH = (N / COLS) * CELL;
  const stripTop = GRID_TOP + gridH + 10;
  const H = stripTop + Math.max(1, tags.length) * 22 + 4;
  const W = COLS * CELL;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A mix of A and B has settled: it stays at 50 A and 50 B. At that moment, how many molecules change type each tick?",
        options: ["None", "Some, with A→B and B→A equal in number", "Only A turns into B"],
        answer: 1,
      }}
      exploreHint="One molecule is tagged with a ring. Step time and follow it; tap others to tag them."
      minInteractions={4}
      reveal={() => (
        <>
          <p>
            {tags.length > 0 && followed > 0
              ? tags.length === 1
                ? `Your tagged molecule changed type ${plural(tagFlips, "time")} in the ${plural(followed, "tick")} you followed it, `
                : `Your ${tags.length} tagged molecules changed type ${plural(tagFlips, "time")} in total while you followed them, `
              : `In ${ticks} ticks, `}
            while the two bars never moved. Every tick, 12 A became B and 12 B became A: about a quarter of the mix
            changed, and the counts held at 50 and 50.
          </p>
          <p>
            That is <strong>equilibrium</strong>: not a reaction that has stopped, but two reactions running at the same
            rate in opposite directions. The totals are steady because the traffic balances, not because it ends.
          </p>
          <p className="muted">
            A model: real mixtures balance on average, so their counts jitter slightly from moment to moment.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <div className={s.wrap}>
          <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="group" aria-label={`${countA} A and ${countB} B after ${ticks} ticks`}>
            {/* the two counts */}
            <Glyph a x={8} y={9} size={10} />
            <rect x={20} y={4} width={(countA / N) * (W - 24) * 2 * 0.98} height={10} rx={3} className={s.barA} />
            <Glyph a={false} x={8} y={25} size={10} />
            <rect x={20} y={20} width={(countB / N) * (W - 24) * 2 * 0.98} height={10} rx={3} className={s.barB} />

            {/* the mix */}
            {isA.map((a, i) => {
              const cx = (i % COLS) * CELL + CELL / 2;
              const cy = GRID_TOP + Math.floor(i / COLS) * CELL + CELL / 2;
              const ti = tags.findIndex((t) => t.i === i);
              return (
                <g
                  key={i}
                  role="button"
                  aria-label={`molecule ${i + 1}, ${a ? "A" : "B"}${ti >= 0 ? ", tagged" : ""}`}
                  className={locked ? s.cellLocked : s.cell}
                  onClick={() => {
                    if (locked) return;
                    toggleTag(i);
                  }}
                >
                  <rect x={cx - CELL / 2 + 1} y={cy - CELL / 2 + 1} width={CELL - 2} height={CELL - 2} rx={5} className={flipped.has(i) ? s.flash : s.hit} />
                  <Glyph a={a} x={cx} y={cy} size={14} />
                  {ti >= 0 && <circle cx={cx} cy={cy} r={13} className={`${s.ring} ${s[TAG_CLASSES[ti]]}`} />}
                </g>
              );
            })}

            {/* each tagged molecule's own history */}
            {tags.map((t, ti) => {
              const y = stripTop + ti * 22 + 10;
              const h = t.hist.slice(-HIST);
              return (
                <g key={t.i}>
                  <circle cx={10} cy={y} r={8} className={`${s.ring} ${s[TAG_CLASSES[ti]]}`} />
                  {h.map((v, k) => (
                    <Glyph key={k} a={v} x={30 + k * 20} y={y} size={11} />
                  ))}
                </g>
              );
            })}
          </svg>
          <Row>
            <Control
              aria-label="Next tick"
              disabled={locked}
              onClick={() => {
                advance(1);
                interact();
              }}
            >
              ▶
            </Control>
            <Control
              aria-label="Five ticks"
              disabled={locked}
              onClick={() => {
                advance(5);
                for (let k = 0; k < 5; k++) interact();
              }}
            >
              ▶▶ ×5
            </Control>
          </Row>
        </div>
      )}
    </Lesson>
  );
}
