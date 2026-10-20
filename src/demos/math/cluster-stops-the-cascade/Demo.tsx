"use client";

// A threshold cascade on a fixed 12-person graph (q = 1/2, synchronous rounds). Step it, tap a
// person to read "adopted friends / friends", compare the two fixed start pairs.
// Spec: company/design/specs/cluster-stops-the-cascade.md, with the binding changes in
// company/design/reviews/2026-10-14-design-review-ncm-specs.md §4 and the network-stage rules in
// company/design/reviews/2026-10-14-design-lead-ncm-rulings.md §1-2.

import { useEffect, useState, type ReactNode } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control } from "@/kit/controls";
import s from "./styles.module.css";

const W = 340;
const H = 290;
const R = 16;
const HIT = 44;
const N = 12;
const POS: [number, number][] = [
  [34, 50], [102, 50], [170, 50], [238, 50], [306, 50],
  [306, 118], [238, 118], [170, 118],
  [170, 186], [238, 186], [170, 254], [238, 254],
];
// 7 path links, the 7-8 bridge, 6 links inside the group: 14.
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8],
  [8, 9], [8, 10], [8, 11], [9, 10], [9, 11], [10, 11],
];
const NB: number[][] = Array.from({ length: N }, () => []);
for (const [a, b] of EDGES) { NB[a].push(b); NB[b].push(a); }
// Pill offsets (review §4 change 3; 6 and 7 moved, see build.md).
const PILL: [number, number][] = POS.map((_, i) =>
  i === 5 ? [0, 36] : i === 6 ? [-34, -34] : i === 7 || i === 8 || i === 10 ? [-52, 0] : i === 9 || i === 11 ? [52, 0] : [0, -36],
);
const DOM_ORDER = [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 8];
const OUTLINE = { x: 140, y: 156, w: 128, h: 128 };

type Start = "89" | "01";
const SEEDS: Record<Start, number[]> = { "01": [0, 1], "89": [8, 9] };
const NAME: Record<Start, string> = { "01": "0,1", "89": "8,9" };

/** Round each person adopts (0 = started, -1 = never). Synchronous: every round tests against the previous round's state. */
function simulate(seeds: number[]) {
  const at = Array(N).fill(-1);
  for (const x of seeds) at[x] = 0;
  let last = 0;
  for (let r = 1; ; r++) {
    const add = [];
    for (let i = 0; i < N; i++) {
      if (at[i] >= 0) continue;
      const k = NB[i].filter((j) => at[j] >= 0).length;
      if (2 * k >= NB[i].length) add.push(i);
    }
    if (!add.length) break;
    for (const i of add) at[i] = r;
    last = r;
  }
  return { at, last };
}
const GROUP = [8, 9, 10, 11];
const need = (d: number) => Math.ceil(d / 2);
const RUN = { "01": simulate(SEEDS["01"]), "89": simulate(SEEDS["89"]) };

type Kind = "started" | "adopted" | "notyet";
function Disc({ x, y, kind, digit, isNew }: { x: number; y: number; kind: Kind; digit?: number; isNew?: boolean }) {
  const filled = kind !== "notyet";
  return (
    <g>
      {isNew && <circle className={s.fade} cx={x} cy={y} r={21} fill="none" stroke="var(--accent)" strokeWidth={3} />}
      <circle className={s.disc} cx={x} cy={y} r={R} fill={filled ? "var(--fg)" : "var(--bg)"} stroke="var(--fg)" strokeWidth={2} />
      {kind === "started" && <circle cx={x} cy={y} r={10} fill="none" stroke="var(--bg)" strokeWidth={1.5} />}
      {digit !== undefined && (
        <text x={x} y={y + 4.5} textAnchor="middle" fontSize={13} fontWeight={800} fill={filled ? "var(--bg)" : "var(--fg)"}>
          {digit}
        </text>
      )}
    </g>
  );
}

function Swatch({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="-23 -23 46 46" width={14} height={14} aria-hidden>
      {children}
    </svg>
  );
}

function Gate({ interact, start, t }: { interact: () => void; start: Start; t: number }) {
  const { reach } = useMilestones(interact, ["stopped", "planted"]);
  useEffect(() => {
    if (t < RUN[start].last) return;
    reach(start === "01" ? "stopped" : "planted");
  });
  return null;
}

export default function ClusterStopsTheCascade({ slug }: { slug: string }) {
  const [start, setStart] = useState<Start>("01");
  const [t, setT] = useState(0);
  const [focus, setFocus] = useState<number | null>(null);
  // v5 (W-573): the reveal no longer quotes the focused person ("Person 8 had 1 of 4 ..."); its general
  // "at most 1 of 4 friends adopted (or 0 of 3)" covers every member, and the tapped pill stays on the stage.

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "In a network of 12 friends, people 0 and 1 adopt a new idea first. It spreads friend to friend, then stops at 8 of 12. What would get it to all 12?",
        // v5 (learner r9, W-573): no option names "those four" (the group is the answer's key object, unmarked
        // until the run ends), and the wrong options are the concrete ones.
        options: ["Four people adopting first: 0, 1, 2 and 3", "Nothing: no start reaches all 12", "Two people adopting first, somewhere else"],
        answer: 2,
      }}
      exploreHint="Step round by round, tap a person to see their friends, then try the other start."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Where the seeds are decides it, not how many. From 0 and 1 it stopped at 8 of 12; the four outlined never
            joined. Started at 8 and 9, two seeds reached all 12.
          </p>
          <p>
            The four are a tight group: each has more than half its friends inside. Until one adopts, each has at most
            1 of 4 friends adopted (or 0 of 3), under half, so starters outside, however many, never get in. A cascade
            stops at any such group.
          </p>
        </>
      )}
    >
      {({ locked, phase, interact }) => {
        const pinned = phase === "reveal";
        const vs: Start = pinned ? "01" : start;
        const run = RUN[vs];
        const vt = pinned ? run.last : Math.min(t, run.last);
        const final = vt >= run.last;
        const adopted = (i: number) => run.at[i] >= 0 && run.at[i] <= vt;
        const count = run.at.filter((_, i) => adopted(i)).length;
        const holdouts = final ? run.at.map((_, i) => i).filter((i) => !adopted(i)) : [];
        const friends = (i: number) => NB[i].filter(adopted).length;
        const kind = (i: number): Kind => (run.at[i] === 0 ? "started" : adopted(i) ? "adopted" : "notyet");

        const pick = (c: Start) => {
          if (c === start) setT(0); // the active chip restarts its own run
          else {
            setStart(c);
            setT(final ? RUN[c].last : 0); // after a final run, show the other set's final
          }
        };
        const chip = (c: Start) => {
          const active = c === vs;
          const watchAgain = active && vt > 0;
          return (
            <Control
              key={c}
              className={`${s.tap} ${active ? "active" : ""}`}
              disabled={locked || pinned || (active && vt === 0)}
              aria-pressed={active}
              aria-label={locked ? (c === "01" ? "Start 0,1" : "Another start") : watchAgain ? `Watch start ${NAME[c]} again` : `Start ${NAME[c]}`}
              onClick={() => pick(c)}
            >
              {locked && c === "89" ? "Another start" : `Start ${NAME[c]}`}
            </Control>
          );
        };
        const sealed = vs === "01" && focus !== null && holdouts.includes(focus);
        const focusLine =
          focus === null
            ? null
            : `${focus}: ${friends(focus)} of ${NB[focus].length} friends adopted` +
              (sealed
                ? `; ${NB[focus].filter((j) => GROUP.includes(j)).length} of ${NB[focus].length} in the group, so at most ${NB[focus].filter((j) => !GROUP.includes(j)).length} (needs ${need(NB[focus].length)}).`
                : ".");
        const label =
          `Start ${SEEDS[vs].join(" and ")}, round ${vt}${final ? ", final" : ""}: ${count} of 12 adopted` +
          (holdouts.length ? `; ${holdouts.join(", ")} never adopted` : "");

        return (
          <div className={s.wrap}>
            <Gate interact={interact} start={vs} t={vt} />
            <p className={s.rule}>{focusLine ?? "Anyone joins once at least half their friends have."}</p>
            <div className={s.stage}>
              <svg viewBox={`0 0 ${W} ${H}`} className="stage-svg" role="img" aria-label={label}>
                {holdouts.length > 0 && (
                  <rect x={OUTLINE.x} y={OUTLINE.y} width={OUTLINE.w} height={OUTLINE.h} rx={14} fill="none" stroke="var(--fg)" strokeWidth={2} strokeDasharray="6 5" />
                )}
                {EDGES.map(([a, b]) => (
                  <line
                    key={`${a}-${b}`}
                    x1={POS[a][0]} y1={POS[a][1]} x2={POS[b][0]} y2={POS[b][1]}
                    stroke="var(--fg)"
                    strokeWidth={focus === a || focus === b ? 3.5 : 2}
                  />
                ))}
                {POS.map(([x, y], i) => (
                  <Disc key={`${i}-${vs}-${run.at[i] === vt && vt > 0}`} x={x} y={y} kind={kind(i)} digit={i} isNew={!pinned && vt > 0 && run.at[i] === vt} />
                ))}
                {focus !== null && (() => {
                  const x = POS[focus][0] + PILL[focus][0];
                  const y = POS[focus][1] + PILL[focus][1];
                  return (
                    <g>
                      <rect x={x - 17} y={y - 9} width={34} height={18} rx={9} fill="var(--bg)" stroke="var(--fg)" strokeWidth={1.5} />
                      <text x={x} y={y + 4.5} textAnchor="middle" fontSize={13} fontWeight={700} fill="var(--fg)">
                        {friends(focus)}/{NB[focus].length}
                      </text>
                    </g>
                  );
                })()}
              </svg>
              {DOM_ORDER.map((i) => (
                <button
                  key={i}
                  type="button"
                  data-qa="control"
                  className={s.hit}
                  style={{ left: `calc(${(POS[i][0] / W) * 100}% - ${HIT / 2}px)`, top: `calc(${(POS[i][1] / H) * 100}% - ${HIT / 2}px)`, width: HIT, height: HIT }}
                  disabled={locked}
                  aria-pressed={focus === i}
                  aria-label={`Person ${i}, ${kind(i) === "started" ? "started" : adopted(i) ? "adopted" : "not yet adopted"}, ${friends(i)} of ${NB[i].length} friends adopted`}
                  onClick={() => setFocus(focus === i ? null : i)}
                />
              ))}
            </div>
            <div className={s.legend} aria-hidden>
              <span><Swatch><Disc x={0} y={0} kind="started" /></Swatch>started</span>
              <span><Swatch><Disc x={0} y={0} kind="adopted" /></Swatch>adopted</span>
              <span><Swatch><Disc x={0} y={0} kind="notyet" /></Swatch>not yet</span>
              {!pinned && <span><Swatch><Disc x={0} y={0} kind="adopted" isNew /></Swatch>new</span>}
              <span style={{ visibility: holdouts.length ? "visible" : "hidden" }}>
                <Swatch><rect x={-20} y={-20} width={40} height={40} rx={8} fill="none" stroke="var(--fg)" strokeWidth={4} strokeDasharray="9 6" /></Swatch>holdouts
              </span>
            </div>
            <p className={s.readout} aria-live="polite">
              Adopted <b>{count}</b> of 12 · round <b>{vt}</b>{final ? " · final" : ""}
            </p>
            {/* v5 (learner r9 fit, W-573): at the reveal the stage is pinned to the 0,1 final and every control
                below is disabled, so the two rows step aside (no reveal sentence reads them; the start shows in
                the picture as ringed seeds). */}
            {!pinned && (
              <>
                <div className={s.controls}>
                  <Control className={s.tap} disabled={locked || final} onClick={() => setT(vt + 1)}>Step</Control>
                  <Control className={s.tap} disabled={locked || final} onClick={() => setT(run.last)}>To the end</Control>
                </div>
                <div className={s.controls} role="group" aria-label="Starting pair">
                  {chip("89")}
                  {chip("01")}
                </div>
              </>
            )}
          </div>
        );
      }}
    </Lesson>
  );
}
