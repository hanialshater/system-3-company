"use client";

// Aim by value, not by middle. 100 sorted values; each Guess draws a straight line between the ends of the
// current range and opens the position where that line meets the target. On evenly spread values the line lies
// on the dots (1 look); on cubes it does not, and the ticks crawl. Positions are shown 1-100 (1-based).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Row } from "@/kit/controls";
import s from "./styles.module.css";

const N = 100;
const EVEN = Array.from({ length: N }, (_, i) => 10 * (i + 1));
const CUBES = Array.from({ length: N }, (_, i) => (i + 1) ** 3);
const EVEN_TARGET = 730;
const CUBE_TARGETS = [729000, 1000, 9261];

type Kind = "even" | "cubes";
type Search = { kind: Kind; target: number; looks: number[] }; // looks = 0-based positions opened
type Tally = { kind: Kind; target: number; looks: number; halving: number };

const list = (k: Kind) => (k === "even" ? EVEN : CUBES);
const fmt = (n: number) => n.toLocaleString("en-US");
const plural = (n: number) => `${n} ${n === 1 ? "look" : "looks"}`;

// Aim by value: position = lo + floor((x - a[lo]) * (hi - lo) / (a[hi] - a[lo])).
function probe(a: number[], x: number, lo: number, hi: number) {
  return lo + Math.floor(((x - a[lo]) * (hi - lo)) / (a[hi] - a[lo]));
}
// The range left after the looks so far, and each look's range before it.
function ranges(a: number[], x: number, looks: number[]) {
  let lo = 0;
  let hi = N - 1;
  const before: [number, number][] = [];
  for (const p of looks) {
    before.push([lo, hi]);
    if (a[p] < x) lo = p + 1;
    else if (a[p] > x) hi = p - 1;
  }
  return { lo, hi, before };
}
// Halving: mid = floor((lo + hi) / 2).
function halvingLooks(a: number[], x: number) {
  let lo = 0;
  let hi = N - 1;
  let n = 0;
  while (lo <= hi) {
    const m = Math.floor((lo + hi) / 2);
    n++;
    if (a[m] === x) return n;
    if (a[m] < x) lo = m + 1;
    else hi = m - 1;
  }
  return n;
}
const allLooks = (a: number[], x: number) => {
  const out: number[] = [];
  let lo = 0;
  let hi = N - 1;
  for (;;) {
    const p = probe(a, x, lo, hi);
    out.push(p);
    if (a[p] === x) return out;
    if (a[p] < x) lo = p + 1;
    else hi = p - 1;
  }
};

const PX0 = 40;
const PX1 = 330;
const PY0 = 8; // top of plot
const PY1 = 188; // baseline
const xOf = (p: number) => PX0 + (p * (PX1 - PX0)) / (N - 1);

export default function InterpolationGuessesThePage({ slug }: { slug: string }) {
  const [search, setSearch] = useState<Search>({ kind: "even", target: EVEN_TARGET, looks: [] });
  const [tally, setTally] = useState<Tally[]>([]);

  const record = (se: Search) => {
    const a = list(se.kind);
    const t: Tally = { kind: se.kind, target: se.target, looks: se.looks.length, halving: halvingLooks(a, se.target) };
    setTally((prev) => [...prev.filter((p) => !(p.kind === t.kind && p.target === t.target)), t]);
  };

  const even = tally.find((t) => t.kind === "even");
  const cubes = [...tally].reverse().find((t) => t.kind === "cubes");

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "You need 730 from 100 sorted values: 10, 20, 30 … 1000. Instead of opening the middle, you guess its position from its value. How many looks does it take?",
        options: ["1", "7", "10"],
        answer: 0,
      }}
      exploreHint="Guess once on the even list. Then switch to cubes and find 1,000 and 9,261."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {even ? (
              <>
                You found {fmt(even.target)} in <strong>{plural(even.looks)}</strong> on the even list (halving takes {even.halving}):
                the aim line lay right on the dots.
              </>
            ) : null}
            {cubes ? (
              <>
                {" "}
                On the cubes, {fmt(cubes.target)} took <strong>{plural(cubes.looks)}</strong>; halving takes {cubes.halving}.{" "}
                {cubes.looks > cubes.halving
                  ? "The dots bend upward, so the straight aim line runs above them and reaches your value too early: each aim fell short."
                  : "Here the line happened to fit well, so aiming won. Try 9,261 to see it fail."}
              </>
            ) : null}
          </p>
          <p>
            Aiming by value is like opening a dictionary near the back for “W”. It is brilliant when values are spread evenly and
            can be worse than halving when they are not.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["even-found", "cubes-found"]}>
          {(reach) => {
            const a = list(search.kind);
            const x = search.target;
            const { lo, hi, before } = ranges(a, x, search.looks);
            const last = search.looks.length ? search.looks[search.looks.length - 1] : -1;
            const found = last >= 0 && a[last] === x;
            const top = a[N - 1];
            const yOf = (v: number) => PY1 - (v / top) * (PY1 - PY0);
            const halving = halvingLooks(a, x);

            const finish = (se: Search) => {
              record(se);
              reach(se.kind === "even" ? "even-found" : "cubes-found");
            };
            const guess = () => {
              if (locked || found) return;
              const p = probe(a, x, lo, hi);
              const next = { ...search, looks: [...search.looks, p] };
              setSearch(next);
              if (a[p] === x) finish(next);
            };
            const toggle = () => {
              if (locked) return;
              if (search.kind === "even") setSearch({ kind: "cubes", target: CUBE_TARGETS[0], looks: [] });
              else setSearch({ kind: "even", target: EVEN_TARGET, looks: [] });
            };
            const pick = (t: number) => {
              if (locked || search.kind !== "cubes" || t === search.target) return;
              setSearch({ kind: "cubes", target: t, looks: [] });
            };
            const guessAll = () => {
              if (locked || search.kind !== "cubes" || found) return;
              const next = { ...search, looks: allLooks(CUBES, x) };
              setSearch(next);
              finish(next);
            };

            const aim = search.looks.length ? before[search.looks.length - 1] : null;
            const tickX = last >= 0 ? xOf(last) : 0;
            const readout = locked
              ? "Looks: ? · Halving: ? · Range 1–100"
              : `Looks: ${search.looks.length || "?"} · Halving: ${found ? halving : "?"} · ${
                  found ? `found at position ${last + 1}` : `Range ${lo + 1}–${hi + 1}`
                }`;

            return (
              <div className={s.wrap}>
                <p className={s.model}>Each guess aims by value along the line between the range ends.</p>
                <p className={`${s.read} ${found ? s.good : ""}`} aria-live="polite">
                  {readout}
                </p>
                <svg
                  viewBox="0 0 340 230"
                  className="stage-svg"
                  role="img"
                  aria-label={`${search.kind === "even" ? "Even values" : "Cubes"}, find ${fmt(x)}: ${
                    found ? `found at position ${last + 1} after ${plural(search.looks.length)}` : `${plural(search.looks.length)} so far`
                  }`}
                >
                  <rect x={PX0} y={PY0} width={PX1 - PX0} height={PY1 - PY0} fill="none" stroke="var(--line)" />
                  {!locked && search.looks.length > 0 && (
                    <rect x={xOf(lo)} y={PY0} width={Math.max(xOf(hi) - xOf(lo), 2)} height={PY1 - PY0} fill="var(--bg-3)" />
                  )}
                  {a.map((v, i) => (
                    <circle
                      key={i}
                      cx={xOf(i)}
                      cy={yOf(v)}
                      r={1.8}
                      fill="var(--fg)"
                      opacity={locked || search.looks.length === 0 || (i >= lo && i <= hi) || found ? 1 : 0.3}
                    />
                  ))}
                  <line x1={PX0} x2={PX1} y1={yOf(x)} y2={yOf(x)} stroke="var(--warn)" strokeWidth={1.2} strokeDasharray="5 3" />
                  <text x={PX0 + 4} y={Math.max(yOf(x) - 5, 20)} className={s.tgt}>
                    find {fmt(x)}
                  </text>
                  {!locked && aim && (
                    <line
                      x1={xOf(aim[0])}
                      y1={yOf(a[aim[0]])}
                      x2={xOf(aim[1])}
                      y2={yOf(a[aim[1]])}
                      stroke="var(--domain)"
                      strokeWidth={2}
                      strokeDasharray="6 3"
                    />
                  )}
                  {!locked &&
                    search.looks.map((p, k) => (
                      <line key={k} x1={xOf(p)} x2={xOf(p)} y1={yOf(x)} y2={PY1} stroke="var(--fg)" strokeWidth={1.2} />
                    ))}
                  {!locked && last >= 0 && (
                    <text x={Math.min(Math.max(tickX, 60), 310)} y={PY1 + 12} textAnchor="middle" className={s.lab}>
                      look {search.looks.length}
                    </text>
                  )}
                  <text x={PX0 - 4} y={PY0 + 8} textAnchor="end" className={s.axis}>
                    {fmt(top)}
                  </text>
                  <text x={PX0 - 4} y={PY1} textAnchor="end" className={s.axis}>
                    0
                  </text>
                  <text x={(PX0 + PX1) / 2} y={PY1 + 38} textAnchor="middle" className={s.axis}>
                    Position 1–100 · height = value
                  </text>
                </svg>
                <Row>
                  <Control className={s.btn} disabled={locked || found} onClick={guess}>
                    Guess
                  </Control>
                  <Control className={s.btn} disabled={locked} onClick={toggle} aria-pressed={search.kind === "cubes"}>
                    Values: {search.kind === "even" ? "even" : "cubes"}
                  </Control>
                </Row>
                <Row>
                  <span className={s.find}>Find</span>
                  {CUBE_TARGETS.map((t) => (
                    <Control
                      key={t}
                      className={`${s.btn} ${search.kind === "cubes" && t === x ? "active" : ""}`}
                      disabled={locked || search.kind !== "cubes" || t === x}
                      onClick={() => pick(t)}
                    >
                      {fmt(t)}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Control className={s.btn} disabled={locked || search.kind !== "cubes" || found} onClick={guessAll}>
                    Guess until found
                  </Control>
                </Row>
                <p className={s.tally}>
                  {tally.map((t) => (
                    <span key={`${t.kind}${t.target}`}>
                      {t.kind === "even" ? "Even" : "Cubes"} · {fmt(t.target)}: {plural(t.looks)} (halving {t.halving})
                    </span>
                  ))}
                </p>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
