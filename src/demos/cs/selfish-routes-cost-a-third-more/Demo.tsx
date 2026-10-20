"use client";

// Price of anarchy (Pigou's example). Road A always takes 60 min; road B takes 60 min × its share of
// drivers. Selfish drivers all take B (it is never slower), so everyone takes 60 min. Average trip
// for a split x on B: (1 − x)·60 + x·60x, lowest at x = 0.5 (45 min). 60 / 45 = 4/3.
//
// v3 (wave E r6): the locked stage no longer draws the average-trip curve or a 45 tick. The chart
// plots only the splits the learner has visited, as a trace. The hidden cost is on stage: for the
// split last visited (0-95% on B) a line shows what the next 5 of 100 drivers gain by joining B and
// what the drivers already on B lose. The reveal quotes that recorded split, so it survives moving on.
// v4 (r7): the "Half on each" preset named the planner's split before the commit and handed over the
// optimum. It is gone. "Try every split" sweeps 100% -> 0% in 5% steps (~340 ms) and leaves the whole
// trace, so the stage shows the bottom and the rise on both sides; the gate needs 50% and a split
// below it. A "Lowest seen" readout records the best visited split, and the hidden-cost line is now
// for that split (it no longer changes with the last move), so the reveal quotes two persistent rows.

import { useEffect, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const A_MIN = 60;
const STEP = 5; // drivers out of 100 per slider step
const timeB = (pct: number) => (A_MIN * pct) / 100;
const avg = (pct: number) => ((100 - pct) / 100) * A_MIN + (pct / 100) * timeB(pct);
const BEST = 50; // grid search over 0..100: avg(50) = 45 is the minimum
const fmt = (m: number) => (Number.isInteger(m) ? String(m) : m.toFixed(1));
const reducedMotion = () =>
  typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Out of 100 drivers, with pct on B: what the next STEP drivers moving A -> B gain, and what the pct already on B lose. */
const joinCost = (pct: number) => {
  const after = timeB(pct + STEP);
  const savedEach = A_MIN - after;
  const lostEach = timeB(STEP); // B gets slower by this for everyone on it
  return { pct, after, savedEach, saved: STEP * savedEach, lostEach, lost: pct * lostEach };
};
type Join = ReturnType<typeof joinCost>;

// chart geometry
const X0 = 44;
const X1 = 320;
const Y0_FULL = 176; // 30 min
const Y0_REVEAL = 150; // v5: the chart is 26 units shorter at the reveal (labels keep their size)
const Y1 = 24; // 65 min
const px = (pct: number) => X0 + ((X1 - X0) * pct) / 100;
const pyAt = (y0: number) => (min: number) => y0 - ((y0 - Y1) * (min - 30)) / 35;

export default function SelfishRoutesCostAThirdMore({ slug }: { slug: string }) {
  const [onB, setOnB] = useState(100);
  const [seen, setSeen] = useState<number[]>([100]); // splits visited, for the trace
  const [busy, setBusy] = useState(false);
  const seenRef = useRef<number[]>([100]);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
    },
    [],
  );
  const b = timeB(onB);
  const a = avg(onB);
  const best = seen.reduce((m, p) => (avg(p) < avg(m) ? p : m), seen[0]);
  // the hidden-cost line, for the lowest-average split visited (0 < best < 100)
  const join: Join | null = best > 0 && best < 100 ? joinCost(best) : null;
  const roseBelow = seen.some((p) => p < best);
  const trace = [...seen].sort((p, q) => p - q);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Your commute has two roads. Road A always takes 60 min. Road B takes 60 min × its share of drivers. Selfish drivers average 60. Can a planner beat that?",
        options: ["No, 60 is best", "Yes, to 45", "Yes, to 30"],
        answer: 1,
      }}
      exploreHint="Slide drivers off road B onto A, or try every split. Find the lowest average."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Selfish drivers all take B: {fmt(A_MIN)} min. Your Lowest seen reads {fmt(avg(best))} min at {best}%
            {roseBelow ? ", and the trace rises on both sides" : ""}. 30 is out of reach: A takes 60.
          </p>
          {join && (
            <p>
              The line under the chart is why: {STEP} more drivers on B save {fmt(join.saved)} min; the{" "}
              {join.pct} already there lose {fmt(join.lost)}, which nobody choosing feels.
            </p>
          )}
          <p>
            {/* v6 (learner r9, W-564): the bound is back, so this network's 4/3 reads as the ceiling, not a law. */}
            Selfish routing costs {fmt(A_MIN)} / {fmt(avg(BEST))} = 4/3 of the best, a third more: the worst case for roads
            with a fixed time plus a part proportional to traffic.
          </p>
        </>
      )}
    >
      {({ locked, interact, phase }) => (
        <Milestones interact={interact} names={["tried-a-split", "found-bottom"]}>
          {(hit) => {
            // visit a split; reads the ref, not render state, so the sweep's interval can call it
            const visit = (v: number) => {
              setOnB(v);
              if (!seenRef.current.includes(v)) seenRef.current = [...seenRef.current, v];
              setSeen(seenRef.current);
              if (v < 100) hit("tried-a-split");
              // the bottom is found once 50% and a split below it have both been seen
              if (seenRef.current.includes(BEST) && seenRef.current.some((p) => p < BEST)) hit("found-bottom");
            };
            const set = (v: number) => {
              if (locked || busy || v === onB) return;
              visit(v);
            };
            const sweep = () => {
              if (locked || busy) return;
              if (timer.current) clearInterval(timer.current);
              const all = Array.from({ length: 100 / STEP + 1 }, (_, i) => 100 - i * STEP);
              // v5 (learner r8 minor): when the sweep ends, the marker parks on the lowest split it found, so the
              // live readouts agree with Lowest seen instead of describing 0%.
              const park = () => {
                const low = seenRef.current.reduce((m, p) => (avg(p) < avg(m) ? p : m), seenRef.current[0]);
                setOnB(low);
              };
              if (reducedMotion()) {
                all.forEach(visit);
                park();
                return;
              }
              setBusy(true);
              let i = 0;
              timer.current = setInterval(() => {
                visit(all[i]);
                i++;
                if (i >= all.length) {
                  if (timer.current) clearInterval(timer.current);
                  park();
                  setBusy(false);
                }
              }, 16);
            };
            const note =
              onB === 100
                ? "Everyone on B: both roads take 60 min. No driver gains by switching."
                : onB === 0
                  ? "Everyone on A: B would take 0 min, so drivers want to switch."
                  : `B takes ${fmt(b)} min, A takes 60, so drivers on A want to switch.`;
            const Y0 = phase === "reveal" ? Y0_REVEAL : Y0_FULL;
            const py = pyAt(Y0);
            return (
              <div className={s.wrap}>
                {/* v5 (learner r8): the live note describes the current split, which the reveal does not discuss; it
                    steps aside at the reveal. The Lowest seen readout and the cost line carry the quoted values. */}
                {phase !== "reveal" && <p className={s.note}>{note}</p>}
                <svg viewBox={`0 0 340 ${Y0 + 44}`} className="stage-svg" role="img" aria-label={`${onB}% on road B, average trip ${fmt(a)} minutes`}>
                  {[30, 40, 50, 60].map((m) => (
                    <g key={m}>
                      <line x1={X0} x2={X1} y1={py(m)} y2={py(m)} stroke="var(--line)" />
                      <text x={X0 - 6} y={py(m) + 4} textAnchor="end" className={s.tick}>
                        {m}
                      </text>
                    </g>
                  ))}
                  {[0, 50, 100].map((p) => (
                    <text key={p} x={px(p)} y={Y0 + 16} textAnchor="middle" className={s.tick}>
                      {p}%
                    </text>
                  ))}
                  <text x={(X0 + X1) / 2} y={Y0 + 34} textAnchor="middle" className={s.axis}>
                    share of drivers on road B
                  </text>
                  <text x={12} y={py(47.5)} className={s.axis} transform={`rotate(-90 12 ${py(47.5)})`} textAnchor="middle">
                    average trip (min)
                  </text>
                  {trace.length > 1 && (
                    <path
                      d={trace.map((p, i) => `${i ? "L" : "M"}${px(p).toFixed(1)},${py(avg(p)).toFixed(1)}`).join(" ")}
                      fill="none"
                      stroke="var(--domain)"
                      strokeWidth={2}
                      opacity={0.6}
                    />
                  )}
                  {trace.map((p) => (
                    <circle key={p} cx={px(p)} cy={py(avg(p))} r={3.5} fill="var(--domain)" />
                  ))}
                  <line x1={px(onB)} x2={px(onB)} y1={Y1} y2={Y0} stroke="var(--muted)" strokeDasharray="3 3" />
                  <circle cx={px(onB)} cy={py(a)} r={8} fill="var(--domain)" stroke="var(--fg)" strokeWidth={2} />
                  <text x={Math.min(Math.max(px(onB), X0 + 30), X1 - 30)} y={py(a) - 14} textAnchor="middle" className={s.value}>
                    {fmt(a)} min
                  </text>
                </svg>
                {/* Fold opt-in (W-330): neither row holds a Readout, no reveal sentence reads the slider or these
                    buttons, and the split they set stays drawn (marker, dashed line, trace). */}
                <Row foldAtReveal>
                <Slider
                  label="Drivers on road B"
                  value={onB}
                  min={0}
                  max={100}
                  step={STEP}
                  onChange={set}
                  disabled={locked || busy}
                  format={(v) => `${v}%`}
                />
                </Row>
                <Row foldAtReveal>
                  <Control disabled={locked || busy || onB === 100} onClick={() => set(100)}>
                    All on B (selfish)
                  </Control>
                  <Control disabled={locked || busy || seen.length > 100 / STEP} onClick={sweep}>
                    Try every split
                  </Control>
                </Row>
                <Row>
                  <Readout label="Road B" value={`${fmt(b)} min`} />
                  <Readout label="Average" value={`${fmt(a)} min`} />
                  <Readout label="Lowest seen" value={locked || seen.length < 2 ? "—" : `${fmt(avg(best))} min at ${best}%`} />
                </Row>
                <p className={s.note}>
                  {join
                    ? `Lowest seen split, ${join.pct} of 100 on B: ${STEP} more join, saving ${fmt(join.saved)} min; the ${join.pct} on B lose ${fmt(join.lost)}.`
                    : ""}
                </p>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
