"use client";

// Market-clearing prices on a 3 x 3 buyer-house grid (bipartite graph drawn as a matrix, design review
// 2026-10-14 §2). Raise runs one round of the stated rule; Run goes to the end; Compare shows all six totals.
// The rule below is the one on the card, in meta.json claim c2 and in the build note's node check.

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const V = [[12, 4, 2], [8, 7, 6], [7, 5, 2]]; // buyers x, y, z; houses a, b, c
const HN = ["a", "b", "c"], BN = ["x", "y", "z"];
const HX = [130, 210, 290], BY = [120, 190, 260];
const CW = 68, CH = 58;
const PERMS = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];

// A buyer wants every house with the largest value minus price (ties all count).
const wants = (p: number[]) =>
  V.map((r) => {
    const sur = r.map((v, j) => v - p[j]);
    const m = Math.max(...sur);
    return [0, 1, 2].filter((j) => sur[j] === m);
  });
// Smallest group of houses whose only-wanters outnumber its houses (null when none).
function tooMany(p: number[]): number[] | null {
  const w = wants(p);
  let best: number[] | null = null;
  for (let m = 1; m < 8; m++) {
    const g = [0, 1, 2].filter((j) => (m >> j) & 1);
    const n = w.filter((ws) => ws.every((j) => g.includes(j))).length;
    if (n > g.length && (!best || g.length < best.length)) best = g;
  }
  return best;
}
const raise = (p: number[]) => {
  const g = tooMany(p);
  return g ? { p: p.map((x, j) => (g.includes(j) ? x + 1 : x)), changed: g } : null;
};
const total = (pm: number[]) => pm.reduce((t, h, i) => t + V[i][h], 0);
const matchOf = (p: number[]) => {
  const w = wants(p);
  return PERMS.find((pm) => pm.every((h, i) => w[i].includes(h)))!;
};

type St = { p: number[]; changed: number[]; round: number };
const START: St = { p: [0, 0, 0], changed: [], round: 0 };
const rest = (st: St) => {
  const out: St[] = [];
  for (let cur = st, r = raise(cur.p); r; r = raise(cur.p)) out.push((cur = { ...r, round: cur.round + 1 }));
  return out;
};
const FINAL: St = { ...rest(START).at(-1)!, changed: [] };

// Shared drawing: the stage and the legend swatches use the same functions.
type Cell = "plain" | "wants" | "gets";
const cellRect = (k: Cell, x: number, y: number, w: number, h: number) => (
  <rect x={x} y={y} width={w} height={h} rx={4} className={s.cell}
    fill={k === "gets" ? "var(--fg)" : "none"}
    stroke={k === "plain" ? "var(--line)" : "var(--fg)"}
    strokeWidth={k === "plain" ? 1 : k === "wants" ? 2 : 3} />
);
const wantDot = (cx: number, cy: number, r: number, k: Cell) => (
  <circle cx={cx} cy={cy} r={r} fill={k === "gets" ? "var(--bg)" : "var(--fg)"} />
);
const groupRect = (x: number, y: number, w: number, h: number, rx = 6) => (
  <rect x={x} y={y} width={w} height={h} rx={rx} fill="var(--fg)" fillOpacity={0.08}
    stroke="var(--fg)" strokeWidth={1.5} strokeDasharray="5 3" />
);
const Sw = ({ children }: { children: ReactNode }) => (
  <svg className={s.sw} viewBox="0 0 14 14" width={14} height={14} aria-hidden="true">{children}</svg>
);

function Grid({ st }: { st: St }) {
  const w = wants(st.p);
  const g = tooMany(st.p);
  const m = g ? null : matchOf(st.p);
  const label = m
    ? `Round ${st.round}: prices a ${st.p[0]}, b ${st.p[1]}, c ${st.p[2]}; ${m.map((h, i) => `${BN[i]} gets ${HN[h]}`).join(", ")}; total ${total(m)}`
    : `Round ${st.round}: prices a ${st.p[0]}, b ${st.p[1]}, c ${st.p[2]}; too many want ${g!.map((j) => HN[j]).join(" and ")}`;
  return (
    <>
      <svg viewBox="0 0 340 300" className="stage-svg" role="img" aria-label={label}>
        {g && groupRect(HX[g[0]] - CW / 2 - 4, 87, HX[g.at(-1)!] - HX[g[0]] + CW + 8, 206)}
        {HN.map((h, j) => (
          <g key={h}>
            <circle cx={HX[j]} cy={28} r={14} fill="none" stroke="var(--fg)" strokeWidth={2} />
            <text x={HX[j]} y={33} textAnchor="middle" fontSize={14} fontWeight={800} fill="var(--fg)">{h}</text>
            <rect x={HX[j] - 18} y={52} width={36} height={20} rx={10} fill="var(--bg-2)" className={s.cell}
              stroke={st.changed.includes(j) ? "var(--accent)" : "var(--line)"} strokeWidth={st.changed.includes(j) ? 3 : 1} />
            <text x={HX[j]} y={66} textAnchor="middle" fontSize={12} fontWeight={700} fill="var(--fg)">${st.p[j]}</text>
          </g>
        ))}
        {BN.map((b, i) => (
          <g key={b}>
            <circle cx={44} cy={BY[i]} r={14} fill="none" stroke="var(--fg)" strokeWidth={2} />
            <text x={44} y={BY[i] + 5} textAnchor="middle" fontSize={14} fontWeight={800} fill="var(--fg)">{b}</text>
            {HN.map((h, j) => {
              const k: Cell = m?.[i] === j ? "gets" : w[i].includes(j) ? "wants" : "plain";
              const x = HX[j] - CW / 2, y = BY[i] - CH / 2;
              const ink = k === "gets" ? "var(--bg)" : "var(--fg)";
              return (
                <g key={h}>
                  {cellRect(k, x, y, CW, CH)}
                  {k !== "plain" && wantDot(x + CW - 9, y + 9, 4, k)}
                  <text x={x + CW / 2} y={y + 19} textAnchor="middle" fontSize={12} fill={k === "gets" ? ink : "var(--muted)"}>
                    {V[i][j]} − {st.p[j]}
                  </text>
                  <text x={x + CW / 2} y={y + 45} textAnchor="middle" fontSize={20} fontWeight={800} fill={ink}>
                    {V[i][j] - st.p[j]}
                  </text>
                </g>
              );
            })}
          </g>
        ))}
      </svg>
      <table className={s.sr}>
        <caption>Value minus price for each buyer and house</caption>
        <tbody>
          {BN.map((b, i) => HN.map((h, j) => (
            <tr key={b + h}>
              <td>{`Buyer ${b}, house ${h}: value ${V[i][j]}, price ${st.p[j]}, ${w[i].includes(j) ? "wants" : "does not want"}`}</td>
            </tr>
          )))}
        </tbody>
      </table>
    </>
  );
}

export default function PricesSortTheBuyers({ slug }: { slug: string }) {
  const [st, setSt] = useState<St>(START);
  const [open, setOpen] = useState(false);
  const [running, setRunning] = useState(false);
  const [byRaise, setByRaise] = useState<number[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const stop = () => { timers.current.forEach(clearTimeout); timers.current = []; setRunning(false); };
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Values are in the grid; prices start at $0. A buyer wants the houses with the largest value minus price (ties count). Each round, raise by $1 every house in the smallest group that more buyers want only from than it has houses. Where does a's price stop?",
        options: ["$0", "$3", "$12"],
        answer: 1,
      }}
      exploreHint="Press Raise and watch the dashed group. Then compare all six matches."
      minInteractions={2}
      reveal={() => {
        const all = [1, 2, 3].every((r) => byRaise.includes(r));
        const path = all
          ? "You raised three times: a went $1, $2, $3, and on the last raise b went to $1 too, because a and b together were wanted by too many."
          : "Prices started at $0 and stopped at a $3, b $1, c $0 after three rounds.";
        return (
          <>
            <p>
              {path} Then each buyer could take a different house it wanted: x–a, y–c, z–b, total 23, the highest of the six totals you compared.
            </p>
            <p>
              Prices rose only where too many buyers wanted the same houses, and stopped at the lowest prices that clear this market.
              Nobody assigned the houses: z ends on b although it values a at 7.
            </p>
            <p className="muted">For any values, such prices exist and their match has the highest total. These values are made up.</p>
          </>
        );
      }}
    >
      {({ phase, locked, interact }) => (
        <Milestones interact={interact} names={["cleared", "compared"]}>
          {(reach) => {
            const pinned = phase === "reveal";
            const view = pinned ? FINAL : st;
            const showCmp = pinned || open;
            const cleared = !tooMany(view.p);
            const m = cleared ? matchOf(view.p) : null;
            const doRaise = () => {
              const r = raise(st.p);
              if (!r) return;
              const next = { ...r, round: st.round + 1 };
              setSt(next);
              setByRaise((b) => [...b, next.round]);
              if (!raise(next.p)) reach("cleared");
            };
            const doRun = () => {
              const seq = rest(st);
              if (!seq.length) return;
              reach("cleared");
              const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
              if (reduce) { setSt(seq.at(-1)!); return; }
              setSt(seq[0]);
              if (seq.length > 1) setRunning(true);
              seq.slice(1).forEach((x, i) => {
                timers.current.push(setTimeout(() => { setSt(x); if (i === seq.length - 2) setRunning(false); }, 100 * (i + 1)));
              });
            };
            return (
              <div className={s.wrap}>
                <p className={s.rule}>
                  Buyers want the best value minus price. Raise $1 on the smallest group{" "}
                  <Sw>{groupRect(1, 1, 12, 12, 1)}</Sw> too many want.
                </p>
                <Grid st={view} />
                {showCmp ? (
                  <div className={s.cmp}>
                    {PERMS.map((pm) => {
                      const mine = m && pm.every((h, i) => m[i] === h);
                      return (
                        <span key={pm.join("")} className={`${s.pill} ${mine ? s.mine : ""}`}>
                          {pm.map((h, i) => BN[i] + HN[h]).join(" ")} {total(pm)}
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  <p className={s.legend}>
                    <Sw>{cellRect("wants", 1, 1, 12, 12)}{wantDot(7, 7, 3, "wants")}</Sw> wants ·{" "}
                    <Sw>{cellRect("gets", 1.5, 1.5, 11, 11)}</Sw> gets
                  </p>
                )}
                <p className={s.readout} aria-live="polite">
                  Round {view.round}{m && <> · Total <b>{total(m)}</b></>}
                </p>
                <Row>
                  <Control disabled={locked || pinned || st.round === 0} onClick={() => { stop(); setSt(START); setOpen(false); }}>
                    Restart
                  </Control>
                  <Control disabled={locked || cleared || running} onClick={doRaise}>Raise</Control>
                  <Control disabled={locked || cleared || running} onClick={doRun}>Run</Control>
                  <Control disabled={locked || !cleared || showCmp} onClick={() => { setOpen(true); reach("compared"); }}>
                    Compare
                  </Control>
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
