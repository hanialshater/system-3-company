"use client";

// Same four contacts, different order. A dated contact timeline (rows A-E, days 0-4): infection runs
// right along a person's row and crosses a contact only on its day, if one side was infected on an
// earlier day. Spec: company/design/specs/contact-order-matters.md, with the binding changes in
// company/design/reviews/2026-10-14-design-review-ncm-specs.md §5 (pair offsets, hollow future dots,
// bullseye first case, 44 px native person buttons).

import { useEffect, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const W = 340;
const H = 244;
const P = ["A", "B", "C", "D", "E"];
const ROW_Y = [28, 72, 116, 160, 204];
const COL_X = [76, 132, 188, 244, 300]; // days 0-4
const UNDATED_X = 188;
const PAIRS: [number, number][] = [[0, 1], [1, 2], [2, 3], [3, 4]];
const OFFSET = [-6, 6, -6, 6]; // A-B and C-D left, B-C and D-E right: rungs never join into one line
const HIT = 44;

type Order = "AE" | "EA" | "OV";
const ORDERS: { id: Order; label: string; aria: string; days: number[][] }[] = [
  { id: "AE", label: "A to E", aria: "Order A to E", days: [[1], [2], [3], [4]] },
  { id: "EA", label: "E to A", aria: "Order E to A", days: [[4], [3], [2], [1]] },
  { id: "OV", label: "Overlap", aria: "Overlap: every pair meets each day", days: [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]] },
];
const daysOf = (o: Order) => ORDERS.find((x) => x.id === o)!.days;

// The rule: first case infected on day 0. On day d a contact infects the other person if one of the
// pair was infected on an earlier day (no relay on the same day). Returns each person's infection day (9 = never).
function spread(days: number[][], first: number): number[] {
  const inf = [9, 9, 9, 9, 9];
  inf[first] = 0;
  for (let d = 1; d <= 4; d++) {
    const prev = inf.slice();
    PAIRS.forEach(([a, b], i) => {
      if (!days[i].includes(d)) return;
      if (prev[a] < d && inf[b] > d) inf[b] = d;
      if (prev[b] < d && inf[a] > d) inf[a] = d;
    });
  }
  return inf;
}

type DiscState = "first" | "infected" | "healthy";
// One drawing for each state, used on the stage and in the legend swatches.
function Disc({ x, y, r, state }: { x: number; y: number; r: number; state: DiscState }) {
  const filled = state !== "healthy";
  return (
    <>
      <circle cx={x} cy={y} r={r} fill={filled ? "var(--fg)" : "var(--bg-2)"} stroke="var(--fg)" strokeWidth={r > 10 ? 2 : 1.5} />
      {state === "first" && <circle cx={x} cy={y} r={r * 0.625} fill="none" stroke="var(--bg)" strokeWidth={r > 10 ? 1.5 : 1} />}
    </>
  );
}

function Rung({ hollow }: { hollow?: boolean }) {
  const f = hollow ? "var(--bg)" : "var(--fg)";
  const c = hollow ? "var(--muted)" : "var(--fg)";
  return (
    <svg width={10} height={16} viewBox="0 0 10 16" aria-hidden="true">
      <line x1={5} y1={3} x2={5} y2={13} stroke={c} strokeWidth={2} />
      <circle cx={5} cy={3} r={2.5} fill={f} stroke={c} strokeWidth={1.2} />
      <circle cx={5} cy={13} r={2.5} fill={f} stroke={c} strokeWidth={1.2} />
    </svg>
  );
}

function Swatch({ state }: { state: DiscState }) {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" aria-hidden="true">
      <Disc x={7} y={7} r={6} state={state} />
    </svg>
  );
}

type View = { order: Order; first: number; day: number };

function Stage({ locked, revealed, interact, onOnlyD }: { locked: boolean; revealed: boolean; interact: () => void; onOnlyD: () => void }) {
  const [v, setV] = useState<View>({ order: "EA", first: 0, day: 0 });
  const { reach } = useMilestones(interact, ["one-way", "forward", "two-way"]);
  // The reveal opens on the state its first paragraph describes: A first, meetings run E to A, day 4.
  useEffect(() => {
    if (revealed) setV({ order: "EA", first: 0, day: 4 });
  }, [revealed]);
  const go = (patch: Partial<View>) => {
    if (locked) return;
    const n = { ...v, ...patch };
    setV(n);
    if (n.day !== 4) return;
    if (n.first === 0 && n.order === "EA") reach("one-way");
    if (n.first === 0 && n.order === "AE") reach("forward");
    if (n.first === 4 && n.order === "OV") reach("two-way");
    if (n.first === 4 && n.order === "AE") onOnlyD();
  };

  const days = daysOf(v.order);
  const inf = spread(days, v.first);
  const who = P.filter((_, j) => j !== v.first && inf[j] <= v.day);
  const cx = COL_X[v.day];
  const orderAria = ORDERS.find((o) => o.id === v.order)!.aria;
  const svgLabel = locked
    ? "Contacts A–B, B–C, C–D and D–E, undated. A is the first case."
    : `${orderAria}, first case ${P[v.first]}, day ${v.day}: reached ${who.length} of 4${who.length ? ", " + who.join(", ") : ""}`;

  return (
    <div className={s.wrap}>
      <p className={s.rule}>Infection crosses a contact whenever one side was infected on an earlier day.</p>
      <div className={s.scrub}>
        <Slider label="Day" value={v.day} min={0} max={4} onChange={(d) => go({ day: d })} disabled={locked} />
        <Control className={s.tap} disabled={locked || v.day === 4} onClick={() => go({ day: 4 })}>
          Day 4
        </Control>
      </div>
      <div className={s.chips} role="group" aria-label="Order of contacts">
        <span className={s.chipsLabel}>Meetings run</span>
        {ORDERS.map((o) => (
          <Control
            key={o.id}
            className={`${s.tap} ${s.chip} ${v.order === o.id ? "active" : ""}`}
            disabled={locked || v.order === o.id}
            aria-pressed={v.order === o.id}
            aria-label={o.aria}
            onClick={() => go({ order: o.id })}
          >
            {o.label}
          </Control>
        ))}
      </div>
      <div className={s.stage}>
        <svg viewBox={`0 0 ${W} ${H}`} className="stage-svg" role="img" aria-label={svgLabel}>
          {ROW_Y.map((y, j) => (
            <line key={"t" + j} x1={44} y1={y} x2={326} y2={y} stroke="var(--line)" strokeWidth={1.5} strokeDasharray="4 4" />
          ))}
          {!locked &&
            P.map((_, j) =>
              inf[j] <= v.day ? (
                <line key={"r" + j} x1={j === v.first ? 44 : COL_X[inf[j]]} y1={ROW_Y[j]} x2={cx} y2={ROW_Y[j]} stroke="var(--fg)" strokeWidth={5} strokeLinecap="round" />
              ) : null,
            )}
          {PAIRS.map(([a, b], i) =>
            [0, 1, 2, 3].map((k) => {
              const d = days[i][k] ?? days[i][0];
              const past = !locked && d <= v.day;
              const col = past || locked ? "var(--fg)" : "var(--muted)";
              const x = (locked ? UNDATED_X : COL_X[d]) + OFFSET[i];
              return (
                <g key={`l${i}${k}`} className={s.slide} style={{ transform: `translateX(${x}px)` }}>
                  <line x1={0} y1={ROW_Y[a]} x2={0} y2={ROW_Y[b]} stroke={col} strokeWidth={2.5} />
                  {[ROW_Y[a], ROW_Y[b]].map((y) => (
                    <circle key={y} cx={0} cy={y} r={4} fill={past || locked ? col : "var(--bg)"} stroke={col} strokeWidth={1.5} />
                  ))}
                </g>
              );
            }),
          )}
          {!locked && (
            <g className={s.slide} style={{ transform: `translateX(${cx}px)` }}>
              <line x1={0} y1={8} x2={0} y2={222} stroke="var(--accent)" strokeWidth={2} />
            </g>
          )}
          {P.map((name, j) => {
            const st: DiscState = j === v.first ? "first" : !locked && inf[j] <= v.day ? "infected" : "healthy";
            return (
              <g key={name}>
                {(j === 0 || j === 4) && <circle cx={24} cy={ROW_Y[j]} r={22} fill="none" stroke="var(--muted)" strokeWidth={1} strokeDasharray="3 3" />}
                <Disc x={24} y={ROW_Y[j]} r={16} state={st} />
                <text x={24} y={ROW_Y[j] + 5} textAnchor="middle" fontSize={14} fontWeight={800} fill={st === "healthy" ? "var(--fg)" : "var(--bg)"}>
                  {name}
                </text>
              </g>
            );
          })}
          {locked ? (
            <text x={UNDATED_X} y={238} textAnchor="middle" fontSize={13} fontWeight={700} fill="var(--muted)">?</text>
          ) : (
            COL_X.map((x, d) => (
              <text key={"d" + d} x={x} y={238} textAnchor="middle" fontSize={12} fill={d === v.day ? "var(--fg)" : "var(--muted)"} fontWeight={d === v.day ? 800 : 400}>
                {d}
              </text>
            ))
          )}
        </svg>
        {!locked && v.first !== 4 && (
          <span className={s.tapcue} aria-hidden="true" style={{ left: `${(24 / W) * 100}%`, top: `${(231 / H) * 100}%` }}>tap E</span>
        )}
        {[0, 4].map((j) => (
          <button
            key={j}
            type="button"
            data-qa="control"
            className={s.hit}
            style={{ left: `calc(${(24 / W) * 100}% - ${HIT / 2}px)`, top: `calc(${(ROW_Y[j] / H) * 100}% - ${HIT / 2}px)`, width: HIT, height: HIT }}
            disabled={locked || v.first === j}
            aria-pressed={v.first === j}
            aria-label={`Make ${P[j]} the first case`}
            onClick={() => go({ first: j })}
          />
        ))}
      </div>
      <p className={s.legend}>
        <span><Swatch state="first" /> first case</span>
        <span><Swatch state="infected" /> infected</span>
        <span><Swatch state="healthy" /> healthy</span>
        <span><Rung /> meeting done</span>
        <span><Rung hollow /> meeting to come</span>
        <span><svg width={16} height={6} viewBox="0 0 16 6" aria-hidden="true"><line x1={2} y1={3} x2={14} y2={3} stroke="var(--fg)" strokeWidth={5} strokeLinecap="round" /></svg> infected stretch</span>
      </p>
      <p className={s.readout} aria-live="polite">
        Reached <b>{locked ? "?" : `${who.length} of 4`}</b>
      </p>
    </div>
  );
}

export default function ContactOrderMatters({ slug }: { slug: string }) {
  const [onlyD, setOnlyD] = useState(false);
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A is infected. Four contacts happen one at a time: A-B, B-C, C-D, D-E. If they happen in the order D-E, C-D, B-C, A-B (meetings run E to A), how many people other than A can get infected?",
        options: ["1", "0", "4"],
        answer: 0,
      }}
      exploreHint="Take each order to day 4, then tap the E circle to start from E."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            When meetings run E to A, A met B only on day 4, after the other contacts were over, so only B was reached. When they run A to E, all four were.
            {onlyD && " Starting from E with meetings running A to E reached only D."}
          </p>
          <p>
            Infection only moves forward in time, so the same contacts can expose or protect someone depending on their order. A
            diagram of who met whom can overstate who can be reached.
          </p>
          <p>
            Overlap is a different change, not another order: here every pair meets on each of days 1 to 4, so infection can run both ways, and from E all four were reached.
          </p>
          <p className="muted">
            In real populations, partnerships that overlap in time (concurrency) can spread infection further than the same ones in sequence (Morris and
            Kretzschmar, 1997). Real contacts are not certain to pass it on.
          </p>
        </>
      )}
    >
      {({ locked, phase, interact }) => <Stage locked={locked} revealed={phase === "reveal"} interact={interact} onOnlyD={() => setOnlyD(true)} />}
    </Lesson>
  );
}
