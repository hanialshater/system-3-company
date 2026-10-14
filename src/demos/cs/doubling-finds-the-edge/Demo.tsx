"use client";

// Exponential (doubling) search on a sorted list with no known end. Probe positions 1, 2, 4, ...
// until the value there is not smaller than the target, then binary-search the open gap between the
// last two probes. Target at position 1000: 11 doubling probes (1 ... 1024), then 6 halvings in the
// gap 513..1023 (768, 896, 960, 992, 1008, 1000): 17 comparisons. A scan from position 0 needs 1,001.
// Every comparison of the target with a list value counts as one.
// v2 (r6): a dashed outline marks the gap doubling found, labelled with its width and the most
// halvings it can need (511 wide: up to 9), so "nearly as many again" is shown, and this target's 6
// is named as an early hit. The finished run is recorded when "found" fires and stays on stage
// (readout + dashed gap) after Start over; the reveal quotes that record.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const POS = 1000; // where the target sits
const value = (i: number) => 3 * i + 7; // the sorted list (values the learner sees)
const TARGET = value(POS);

type St = {
  probes: number[]; // doubling probes made
  lo: number; // open gap after doubling (inclusive bounds)
  hi: number;
  halves: number[]; // binary-search probes made
  found: boolean;
};
const START: St = { probes: [], lo: 0, hi: -1, halves: [], found: false };
const phaseOf = (st: St) => (st.found ? "found" : st.halves.length || st.hi >= st.lo ? "halve" : "double");

function doubleOnce(st: St): St {
  const p = st.probes.length ? st.probes[st.probes.length - 1] * 2 : 1;
  const probes = [...st.probes, p];
  if (value(p) === TARGET) return { ...st, probes, found: true };
  if (value(p) > TARGET) return { ...st, probes, lo: p / 2 + 1, hi: p - 1 };
  return { ...st, probes };
}
function halveOnce(st: St): St {
  const m = Math.floor((st.lo + st.hi) / 2);
  const halves = [...st.halves, m];
  if (value(m) === TARGET) return { ...st, halves, lo: m, hi: m, found: true };
  return value(m) < TARGET ? { ...st, halves, lo: m + 1 } : { ...st, halves, hi: m - 1 };
}
// the full run, from the same rules the stage uses
const FULL = (() => {
  let st = START;
  while (phaseOf(st) === "double") st = doubleOnce(st);
  while (!st.found) st = halveOnce(st);
  return st;
})();
const DOUBLES = FULL.probes.length; // 11
const HALVES = FULL.halves.length; // 6
const SCAN = POS + 1; // 1,001
// most halvings a gap of w positions can need (3-way compare, midpoint split): floor(log2 w) + 1
const maxHalves = (w: number) => Math.floor(Math.log2(w)) + 1;
// the gap the doubling probes left (inclusive), once a probe has passed the target
const gapOf = (probes: number[]) =>
  probes.length >= 2 ? { lo: probes[probes.length - 2] + 1, hi: probes[probes.length - 1] - 1 } : null;
type Run = { doubles: number; lastProbe: number; lo: number; hi: number; halves: number };
const FULL_GAP = gapOf(FULL.probes)!;

// drawing: positions 0..1100 on a line
const W = 320;
const X0 = 14;
const X1 = 306;
const MAXP = 1100;
const xOf = (p: number) => X0 + ((X1 - X0) * p) / MAXP;

export default function DoublingFindsTheEdge({ slug }: { slug: string }) {
  const [st, setSt] = useState<St>(START);
  const [run, setRun] = useState<Run | null>(null); // the finished run, kept through Start over
  const phase = phaseOf(st);
  const comps = st.probes.length + st.halves.length;

  const last =
    st.halves.length > 0 ? st.halves[st.halves.length - 1] : st.probes.length > 0 ? st.probes[st.probes.length - 1] : null;
  const note =
    last === null
      ? `Find ${TARGET}. Probe position 1, 2, 4, … until you pass it.`
      : st.found
        ? `Position ${last} holds ${TARGET}: found.`
        : phase === "double"
          ? `Position ${last} holds ${value(last)} < ${TARGET}: double.`
          : st.halves.length === 0
            ? `Position ${last} holds ${value(last)} > ${TARGET}: it is in ${st.lo}–${st.hi}.`
            : `Position ${last} holds ${value(last)} ${value(last) < TARGET ? "<" : ">"} ${TARGET}: keep ${st.lo}–${st.hi}.`;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A sorted list has no known length. The target sits at position ${POS}. Probe positions 1, 2, 4, 8, … until you pass the target, then halve the last gap. Roughly how many comparisons? (A scan from the start needs ${SCAN.toLocaleString("en-US")}.)`,
        options: ["About 500", "About 100", "About 20"],
        answer: 2,
      }}
      exploreHint="Double the probe until it passes the target, then halve the gap until you land on it."
      minInteractions={2}
      reveal={() => {
        const r = run ?? { doubles: DOUBLES, lastProbe: FULL.probes[DOUBLES - 1], ...FULL_GAP, halves: HALVES };
        const w = r.hi - r.lo + 1;
        return (
          <>
            <p>
              You probed {r.doubles} times by doubling, from 1 to {r.lastProbe}, and the {r.doubles}th probe passed the
              target. That left the gap {r.lo}–{r.hi}, and {r.halves} halvings found it: {r.doubles + r.halves}{" "}
              comparisons, not {SCAN.toLocaleString("en-US")}.
            </p>
            <p>
              Doubling reaches the target&apos;s gap after about log2(position) probes: the number of doublings it takes,
              here {r.doubles}. That gap is about as wide as the last jump, so halving it can need nearly as many again: its
              label said {w} wide, up to {maxHalves(w)} halvings. This target sat on an early midpoint and took{" "}
              {r.halves}. So the cost grows like twice log2 of the position: for position one million, 34 comparisons.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["passed", "found"]}>
          {(reach) => {
            const apply = (next: St) => {
              setSt(next);
              if (phaseOf(next) !== "double") reach("passed");
              if (next.found) {
                const g = gapOf(next.probes) ?? { lo: next.lo, hi: next.hi };
                setRun({ doubles: next.probes.length, lastProbe: next.probes[next.probes.length - 1], ...g, halves: next.halves.length });
                reach("found");
              }
            };
            const dbl = () => {
              if (locked || phase !== "double") return;
              apply(doubleOnce(st));
            };
            const dblAll = () => {
              if (locked || phase !== "double") return;
              let n = st;
              while (phaseOf(n) === "double") n = doubleOnce(n);
              apply(n);
            };
            const half = () => {
              if (locked || phase !== "halve") return;
              apply(halveOnce(st));
            };
            const halfAll = () => {
              if (locked || phase !== "halve") return;
              let n = st;
              while (!n.found) n = halveOnce(n);
              apply(n);
            };
            const restart = () => {
              if (locked) return;
              setSt(START);
            };

            const gapOn = phase !== "double";
            // the gap doubling found: the live one, or (after Start over) the finished run's
            const live = gapOn ? gapOf(st.probes) : null;
            const shown = live ?? (run ? { lo: run.lo, hi: run.hi } : null);
            const shownW = shown ? shown.hi - shown.lo + 1 : 0;
            return (
              <div className={s.wrap}>
                <p className={s.note}>{note}</p>
                <svg viewBox={`0 0 ${W} 112`} className="stage-svg" role="img" aria-label={`Probes ${st.probes.join(", ")}`}>
                  {gapOn && (
                    <rect
                      x={xOf(st.lo) - 1}
                      y={34}
                      width={Math.max(3, xOf(st.hi) - xOf(st.lo) + 2)}
                      height={30}
                      rx={4}
                      fill="var(--domain)"
                      opacity={0.22}
                    />
                  )}
                  {shown && (
                    <g>
                      <rect
                        x={xOf(shown.lo) - 1}
                        y={34}
                        width={xOf(shown.hi) - xOf(shown.lo) + 2}
                        height={30}
                        rx={4}
                        fill="none"
                        stroke="var(--domain)"
                        strokeDasharray="4 3"
                      />
                      <text x={X1} y={12} textAnchor="end" className={s.gap}>
                        {live ? "gap" : "last gap"} {shown.lo}–{shown.hi}: {shownW} wide, up to {maxHalves(shownW)} halvings
                      </text>
                    </g>
                  )}
                  <line x1={X0} y1={49} x2={X1} y2={49} stroke="var(--fg)" strokeWidth={2} />
                  <line x1={X1} y1={49} x2={X1 + 10} y2={49} stroke="var(--muted)" strokeWidth={2} strokeDasharray="3 3" />
                  {[0, 256, 512, 768, 1024].map((p) => (
                    <g key={`t${p}`}>
                      <line x1={xOf(p)} y1={45} x2={xOf(p)} y2={53} stroke="var(--muted)" />
                      <text x={xOf(p)} y={104} textAnchor="middle" className={s.tick}>
                        {p}
                      </text>
                    </g>
                  ))}
                  <line x1={xOf(POS)} y1={30} x2={xOf(POS)} y2={68} stroke="var(--good)" strokeWidth={2} strokeDasharray="2 2" />
                  <text x={xOf(POS)} y={24} textAnchor="middle" className={s.tgt}>
                    target
                  </text>
                  {st.probes.map((p) => (
                    <circle key={`p${p}`} cx={xOf(p)} cy={49} r={4} fill={value(p) > TARGET ? "var(--bad)" : "var(--fg)"} />
                  ))}
                  {st.halves.map((m, i) => (
                    <circle
                      key={`h${m}`}
                      cx={xOf(m)}
                      cy={78}
                      r={i === st.halves.length - 1 ? 5 : 3.5}
                      fill={value(m) === TARGET ? "var(--good)" : "var(--domain)"}
                    />
                  ))}
                  {last !== null && (
                    <text x={Math.min(Math.max(xOf(last), 24), 290)} y={92} textAnchor="middle" className={s.last}>
                      {last}
                    </text>
                  )}
                </svg>
                <p className={s.log}>
                  {st.probes.length ? `doubled: ${st.probes.join(" ")}` : "doubled: none yet"}
                  {st.halves.length ? ` · halved: ${st.halves.join(" ")}` : ""}
                </p>
                <Row>
                  <Control className={phase === "double" ? "active" : ""} disabled={locked || phase !== "double"} onClick={dbl}>
                    Double the probe
                  </Control>
                  <Control disabled={locked || phase !== "double"} onClick={dblAll}>
                    Double until past
                  </Control>
                  <Control className={phase === "halve" ? "active" : ""} disabled={locked || phase !== "halve"} onClick={half}>
                    Halve the gap
                  </Control>
                  <Control disabled={locked || phase !== "halve"} onClick={halfAll}>
                    Halve until found
                  </Control>
                  <Control disabled={locked || comps === 0} onClick={restart}>
                    Start over
                  </Control>
                </Row>
                <Row>
                  <Readout label="Comparisons" value={comps} />
                  <Readout label="Scan would need" value={SCAN.toLocaleString("en-US")} />
                  <Readout
                    label="Finished run"
                    value={run ? `${run.doubles} doubled + ${run.halves} halved = ${run.doubles + run.halves}` : "—"}
                  />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
