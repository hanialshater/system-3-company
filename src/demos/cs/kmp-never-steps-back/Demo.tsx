"use client";

// Two searches for AAAB in AAAAAAAAB run side by side, one letter comparison per press. "Restart one on" slides the
// pattern one place after each miss and starts reading again from there (24 comparisons). "Reuse the match" (KMP) keeps
// what matched: the fallback table under the pattern says how much to keep, and the text arrow only moves right
// (14 comparisons). The reveal unlocks at the first miss (comparison 4) and quotes only the comparisons reached.

import { useState } from "react";
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
const FIRST_MISS = NAIVE.findIndex((x) => !x.ok) + 1; // 4 for both searches

const CW = 34;
const X0 = 17;

function Panel({ y, title, steps, k, table }: { y: number; title: string; steps: Step[]; k: number; table: boolean }) {
  const n = Math.min(k, steps.length);
  const cur = n > 0 ? steps[n - 1] : null;
  const off = cur ? cur.off : 0;
  const ti = cur ? cur.ti : 0;
  const found = !!cur && cur.ok && cur.pj === M - 1;
  const miss = !!cur && !cur.ok;
  return (
    <g>
      <text x={X0} y={y + 12} className={s.axis}>
        {title}
        {found ? ` · found at ${n}` : ""}
      </text>
      {T.split("").map((ch, c) => {
        const mark = cur && c >= off && c <= ti ? (c === ti && !cur.ok ? "✗" : "✓") : null;
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
              <text x={X0 + c * CW + CW / 2} y={y + 30} textAnchor="middle" className={mark === "✓" ? s.ok : s.bad}>
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
      <text x={X0} y={y + (table ? 135 : 121)} className={s.axis}>
        Comparisons {n} · arrow moved back {backs(steps, n)}
      </text>
    </g>
  );
}

export default function KmpNeverStepsBack({ slug }: { slug: string }) {
  const [k, setK] = useState(0);
  const total = NAIVE.length; // 24
  const nb = backs(NAIVE, Math.min(k, NAIVE.length));
  const kb = backs(KMP, Math.min(k, KMP.length));
  const kmpDone = k >= KMP.length;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Search for AAAB in AAAAAAAAB, letter by letter. Restarting one letter on after each mismatch takes 24 comparisons. Never moving backwards in the text, reusing what matched, takes about:",
        options: ["24", "14", "4"],
        answer: 1,
      }}
      exploreHint="Compare until the first miss, then watch the two arrows."
      minInteractions={1}
      reveal={() => (
        <>
          {k <= FIRST_MISS ? (
            <p>
              Both searches missed on comparison {FIRST_MISS}: the B in the pattern met an A. Press Compare again to see
              where each one goes next.
            </p>
          ) : (
            <p>
              Both missed on comparison {FIRST_MISS}. After {k} comparisons, restarting one on has moved its arrow back{" "}
              <strong>{nb}</strong> {nb === 1 ? "time" : "times"}, re-reading letters it had already matched. Reusing the
              match has moved its arrow back <strong>{kb}</strong> times.
            </p>
          )}
          {kmpDone && (
            <p>
              Reusing the match found AAAB at comparison <strong>{KMP.length}</strong>
              {k >= total ? `; restarting one on needed ${total}` : `, when restarting one on was still searching`}.
            </p>
          )}
          <p className="muted">
            What matched is known text. The table under AAAB (0 1 2 0) says how much of it still matches after a miss, so
            the pattern slides on and the text arrow only moves right.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["first-miss"]}>
          {(reach) => {
            const step = (by: number) => {
              const next = Math.min(total, k + by);
              if (next === k) return;
              setK(next);
              if (next >= FIRST_MISS) reach("first-miss");
            };
            const over = k >= total;
            return (
              <div className={s.wrap}>
                <p className={s.rule}>Find AAAB. Both count every letter comparison.</p>
                <svg viewBox="0 0 340 300" className="stage-svg" role="img" aria-label={`After ${k} comparisons`}>
                  <Panel y={0} title="Restart one on" steps={NAIVE} k={k} table={false} />
                  <Panel y={146} title="Reuse the match" steps={KMP} k={k} table />
                </svg>
                <Row>
                  <Control className={s.tap} disabled={locked || over} onClick={() => step(1)}>
                    Compare
                  </Control>
                  <Control className={s.tap} disabled={locked || over} onClick={() => step(4)}>
                    Compare ×4
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
