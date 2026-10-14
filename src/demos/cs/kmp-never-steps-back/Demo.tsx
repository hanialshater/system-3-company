"use client";

// Two searches for AAAB in AAAAAAAAB run side by side, one letter comparison per press. "Restart one on" slides the
// pattern one place after each miss and starts reading again from there (24 comparisons). "Reuse the match" (KMP) keeps
// what matched: the fallback table under the pattern says how much to keep, and the text arrow only moves right
// (14 comparisons). v3: the reveal unlocks only after the learner passes the first miss and both searches reach
// the end (24 and 14 on the stage, "Run to end" animates it); the table is labelled; the moved-back tally is coloured.
// v5 (r6): each miss in the reuse lane is marked ✗ and the table cell it uses is boxed; the step after it shows the
// kept A's in a different colour and a caption ties them to the 2. "To next miss" stops on a miss (milestone
// saw-miss, which a run alone cannot reach), and "Run to end" takes about 300 ms so the QA wait covers it.

import { useEffect, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const T = "AAAAAAAAB";
const P = "AAAB";
const M = P.length;
const FAIL = (() => {
  const f = [0];
  for (let i = 1, k = 0; i < M; ) {
    if (P[i] === P[k]) f[i++] = ++k;
    else if (k) k = f[k - 1];
    else f[i++] = 0;
  }
  return f;
})();

type Step = { off: number; ti: number; pj: number; ok: boolean };

// Restart one on: every alignment from the left, reading the pattern until a miss.
const NAIVE: Step[] = (() => {
  const out: Step[] = [];
  for (let off = 0; off + M <= T.length; off++) {
    for (let j = 0; j < M; j++) {
      const ok = T[off + j] === P[j];
      out.push({ off, ti: off + j, pj: j, ok });
      if (!ok) break;
      if (j === M - 1) return out;
    }
  }
  return out;
})();

// Reuse the match: the text index only goes up; on a miss the pattern index falls back by the table.
const KMP: Step[] = (() => {
  const out: Step[] = [];
  let i = 0;
  let j = 0;
  while (i < T.length) {
    const ok = T[i] === P[j];
    out.push({ off: i - j, ti: i, pj: j, ok });
    if (ok) {
      i++;
      j++;
      if (j === M) break;
    } else if (j) j = FAIL[j - 1];
    else i++;
  }
  return out;
})();

const backs = (steps: Step[], n: number) => steps.slice(0, n).filter((x, i) => i > 0 && x.ti < steps[i - 1].ti).length;
const KMP_MISSES = KMP.map((x, i) => (x.ok ? -1 : i + 1)).filter((i) => i > 0); // k values that show a miss: 4, 6, 8, 10, 12
// What the reuse lane says at k comparisons.
function caption(k: number): string {
  const n = Math.min(k, KMP.length);
  if (n === 0) return "";
  const cur = KMP[n - 1];
  if (!cur.ok && cur.pj > 0) {
    const keep = FAIL[cur.pj - 1];
    return `Reuse: ✗ ${P[cur.pj]} ≠ ${T[cur.ti]}. The ${keep} under the last match says keep ${keep} A's: slide ${cur.pj - keep}.`;
  }
  if (n >= 2 && !KMP[n - 2].ok) return `Reuse: the kept A's are not read again; the same text letter is next.`;
  if (k >= KMP.length) return `Reuse: ${KMP_MISSES.length} misses, each kept 2 A's. Arrow moved back 0.`;
  return "Reuse: the arrow only moves right.";
}

const CW = 34;
const X0 = 17;

function Panel({ y, title, steps, k, table }: { y: number; title: string; steps: Step[]; k: number; table: boolean }) {
  const n = Math.min(k, steps.length);
  const cur = n > 0 ? steps[n - 1] : null;
  const off = cur ? cur.off : 0;
  const ti = cur ? cur.ti : 0;
  const found = !!cur && cur.ok && cur.pj === M - 1;
  const miss = !!cur && !cur.ok;
  // Right after a miss in the reuse lane: the cells kept from the last match.
  const afterMiss = table && !!cur && n >= 2 && !steps[n - 2].ok && steps[n - 2].pj > 0;
  return (
    <g>
      <text x={X0} y={y + 12} className={s.axis}>
        {title}
        {table ? " · number under each letter: A's kept" : ""}
      </text>
      {T.split("").map((ch, c) => {
        const mark = cur && c >= off && c <= ti ? (c === ti && !cur.ok ? "✗" : "✓") : null;
        const kept = afterMiss && c >= off && c < ti;
        return (
          <g key={c}>
            <rect
              x={X0 + c * CW + 2}
              y={y + 36}
              width={CW - 4}
              height={24}
              rx={4}
              fill="var(--bg-2)"
              stroke={cur && c === ti ? "var(--domain)" : "var(--line)"}
              strokeWidth={cur && c === ti ? 2 : 1}
            />
            <text x={X0 + c * CW + CW / 2} y={y + 53} textAnchor="middle" className={s.card}>
              {ch}
            </text>
            {mark && (
              <text x={X0 + c * CW + CW / 2} y={y + 30} textAnchor="middle" className={kept ? s.kept : mark === "✓" ? s.ok : s.bad}>
                {mark}
              </text>
            )}
          </g>
        );
      })}
      {P.split("").map((ch, j) => {
        const here = cur && j === cur.pj;
        const colour = here && cur ? (cur.ok ? "var(--good)" : "var(--bad)") : "var(--line)";
        return (
          <g key={j}>
            <rect
              x={X0 + (off + j) * CW + 2}
              y={y + 66}
              width={CW - 4}
              height={24}
              rx={4}
              fill="var(--bg-2)"
              stroke={colour}
              strokeWidth={here ? 2 : 1}
            />
            <text x={X0 + (off + j) * CW + CW / 2} y={y + 83} textAnchor="middle" className={s.card}>
              {ch}
            </text>
            {table && miss && !!cur && cur.pj > 0 && j === cur.pj - 1 && (
              <rect x={X0 + (off + j) * CW + 7} y={y + 93} width={CW - 14} height={16} rx={3} fill="none" stroke="var(--domain)" strokeWidth={2} />
            )}
            {table && (
              <text
                x={X0 + (off + j) * CW + CW / 2}
                y={y + 105}
                textAnchor="middle"
                className={miss && !!cur && cur.pj > 0 && j === cur.pj - 1 ? s.hi : s.axis}
              >
                {FAIL[j]}
              </text>
            )}
          </g>
        );
      })}
      <text x={X0 + ti * CW + CW / 2} y={y + (table ? 120 : 106)} textAnchor="middle" className={s.hi}>
        ▲
      </text>
      <text x={X0} y={y + (table ? 136 : 122)} className={s.tally}>
        {found ? `Found at comparison ${n}` : `Comparisons ${n}`} · arrow moved back{" "}
        <tspan className={backs(steps, n) ? s.back : s.zero}>{backs(steps, n)}</tspan>
      </text>
    </g>
  );
}

// Reaches the milestones from an effect (never during render): stopped on a miss, and both searches finished.
function Watch({ k, total, stopped, reach }: { k: number; total: number; stopped: boolean; reach: (name: string) => void }) {
  useEffect(() => {
    if (stopped && KMP_MISSES.includes(k)) reach("saw-miss");
    if (k >= total) reach("both-done");
  }, [k, total, stopped, reach]);
  return null;
}

export default function KmpNeverStepsBack({ slug }: { slug: string }) {
  const [k, setK] = useState(0);
  const [running, setRunning] = useState(false);
  const total = NAIVE.length; // 24
  const nb = backs(NAIVE, total);
  const kb = backs(KMP, KMP.length);
  // "Run to end": one comparison every 14 ms until both searches have finished (about 300 ms).
  useEffect(() => {
    if (!running) return;
    if (k >= total) {
      setRunning(false);
      return;
    }
    const id = setTimeout(() => setK((x) => Math.min(total, x + 1)), 14);
    return () => clearTimeout(id);
  }, [running, k, total]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Search for AAAB in AAAAAAAAB, letter by letter. Restarting one letter on after each mismatch takes 24 comparisons. Never moving backwards in the text, reusing what matched, takes about:",
        options: ["24", "14", "4"],
        answer: 1,
      }}
      exploreHint="Stop on a miss and watch what the reuse lane keeps. Then run both to the end."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Restarting one on needed <strong>{total}</strong> comparisons and moved its arrow back <strong>{nb}</strong>{" "}
            times, re-reading A's it had already matched. Reusing the match found AAAB at comparison{" "}
            <strong>{KMP.length}</strong> and moved back {kb} times.
          </p>
          <p>
            Why {KMP.length}: every miss (✗) came after AAA had matched, and those A's are known text. The boxed 2
            under the third A said keep two of them, so the pattern slid one place and the next comparison was the same
            text letter, never one to its left: 3 + 2 × {KMP_MISSES.length} + 1 = {KMP.length}.
          </p>
          <p className="muted">That table (0 1 2 0) is the fallback table of the KMP search.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["saw-miss", "both-done"]}>
          {(reach) => {
            const step = (by: number) => {
              const next = Math.min(total, k + by);
              if (next === k) return;
              setK(next);
            };
            const nextMiss = KMP_MISSES.find((m) => m > k);
            const over = k >= total;
            return (
              <div className={s.wrap}>
                <p className={s.rule}>Find AAAB. Both count every letter comparison.</p>
                <Watch k={k} total={total} stopped={!running} reach={reach} />
                <svg viewBox="0 0 340 300" className="stage-svg" role="img" aria-label={`After ${k} comparisons`}>
                  <Panel y={0} title="Restart one on" steps={NAIVE} k={k} table={false} />
                  <Panel y={146} title="Reuse the match" steps={KMP} k={k} table />
                </svg>
                <p className={s.caption} aria-live="polite">{locked ? "" : caption(k)}</p>
                <Row>
                  <Control className={s.tap} disabled={locked || over || running} onClick={() => step(1)}>
                    Compare
                  </Control>
                  <Control className={s.tap} disabled={locked || over || running || !nextMiss} onClick={() => nextMiss && step(nextMiss - k)}>
                    To next miss
                  </Control>
                  <Control className={s.tap} disabled={locked || over || running} onClick={() => setRunning(true)}>
                    Run to end
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
