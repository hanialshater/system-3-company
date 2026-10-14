"use client";

// One button, one character comparison per press in each lane. Top: plain left-to-right search, sliding 1 on a miss
// (27 comparisons, 18 placements, reads all 24 letters). Bottom: Horspool, comparing from the pattern's end and sliding
// by the table entry of the text letter under the pattern's last position (15 comparisons, 5 placements, 11 letters
// never read). Read letters keep a dot. A slide log under the lanes keeps every Horspool slide and its reason, so
// the partial-match slide (E L P M matched, miss on I, slide 6 by the E) stays visible after a run.
// Milestones (v2): first-skip (the first 7-letter jump, reached only by a single Compare press the learner watched;
// "Compare to the match" unlocks after the first Compare), both-matched
// (spec company/design/specs/boyer-moore-skips-ahead.md).

import { useEffect, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const T = "HERE IS A SIMPLE EXAMPLE";
const P = "EXAMPLE";
const M = P.length;

// Horspool slide table: distance from the last occurrence (excluding the final position) to the end.
const SHIFT: Record<string, number> = {};
for (let i = 0; i < M - 1; i++) SHIFT[P[i]] = M - 1 - i;
const TABLE = Object.entries(SHIFT).sort((a, b) => b[1] - a[1]); // E6 X5 A4 M3 P2 L1

type Step = { at: number; ti: number; pj: number; ok: boolean; next?: number; key?: string };

const PLAIN: Step[] = (() => {
  const out: Step[] = [];
  for (let at = 0; at + M <= T.length; at++) {
    for (let j = 0; j < M; j++) {
      const ok = T[at + j] === P[j];
      out.push({ at, ti: at + j, pj: j, ok, next: ok ? undefined : at + 1 });
      if (!ok) break;
      if (j === M - 1) return out;
    }
  }
  return out;
})();

const HORS: Step[] = (() => {
  const out: Step[] = [];
  let at = 0;
  while (at + M <= T.length) {
    let j = M - 1;
    for (; j >= 0; j--) {
      const ok = T[at + j] === P[j];
      if (!ok) {
        const key = T[at + M - 1];
        const sh = SHIFT[key] ?? M;
        out.push({ at, ti: at + j, pj: j, ok, next: at + sh, key });
        break;
      }
      out.push({ at, ti: at + j, pj: j, ok });
    }
    if (j < 0) return out;
    at = out[out.length - 1].next!;
  }
  return out;
})();

// The partial-match slide: four letters matched, then a miss on a letter that is not the one under the pattern's end.
const EPARTIAL = HORS.find((x) => !x.ok && T[x.ti] !== x.key)!; // placement 9: miss on I, slide 6 by E

const MAXK = Math.max(PLAIN.length, HORS.length); // 27

function laneState(steps: Step[], k: number) {
  const n = Math.min(k, steps.length);
  const cur = n > 0 ? steps[n - 1] : null;
  const at = cur ? (cur.ok ? cur.at : cur.next!) : 0;
  const matched = !!cur && cur.ok && steps.slice(0, n).filter((x) => x.at === cur.at && x.ok).length === M;
  const read = new Set(steps.slice(0, n).map((x) => x.ti));
  const placements = new Set([0, ...steps.slice(0, n).map((x) => (x.ok ? x.at : x.next!))]).size;
  const marks = cur ? steps.slice(0, n).filter((x) => x.at === cur.at) : [];
  return { n, cur, at, matched, read, placements, marks };
}

const reduced = () => typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const CW = 14;
const X0 = 2;
const cx = (i: number) => X0 + i * CW + CW / 2;

function Lane({
  y,
  title,
  steps,
  k,
  locked,
  justPressed,
  horspool,
}: {
  y: number;
  title: string;
  steps: Step[];
  k: number;
  locked: boolean;
  justPressed: boolean;
  horspool: boolean;
}) {
  const st = laneState(steps, k);
  const { cur } = st;
  const ghost = horspool && justPressed && cur && !cur.ok ? cur.at : null;
  return (
    <g>
      <text x={X0} y={y + 10} className={s.title}>
        {title}
      </text>
      <text x={338} y={y + 10} textAnchor="end" className={s.read}>
        Comparisons: {st.n} · Placements: {st.placements}
        {horspool ? ` · Never read: ${st.matched ? T.length - st.read.size : "–"}` : ""}
      </text>
      {T.split("").map((ch, i) => {
        const mark = st.marks.find((x) => x.ti === i);
        return (
          <g key={i}>
            <rect x={X0 + i * CW + 0.5} y={y + 26} width={CW - 1} height={16} rx={2} fill="var(--bg-2)" stroke="var(--line)" />
            <text x={cx(i)} y={y + 38} textAnchor="middle" className={ch === " " ? s.space : s.letter}>
              {ch === " " ? "·" : ch}
            </text>
            {mark && (
              <text x={cx(i)} y={y + 22} textAnchor="middle" className={mark.ok ? s.ok : s.bad}>
                {mark.ok ? "✓" : "✗"}
              </text>
            )}
            {st.read.has(i) && <circle cx={cx(i)} cy={y + 47} r={2} fill="var(--fg)" />}
          </g>
        );
      })}
      <g className={s.slide} style={{ transform: `translateX(${st.at * CW}px)` }}>
        {P.split("").map((ch, j) => {
          const here = !locked && cur && cur.ok && cur.at === st.at && j === cur.pj;
          return (
            <g key={j}>
              <rect
                x={X0 + j * CW + 0.5}
                y={y + 52}
                width={CW - 1}
                height={16}
                rx={2}
                fill="var(--bg-2)"
                stroke={here ? "var(--good)" : "var(--muted)"}
                strokeWidth={here ? 2 : 1}
              />
              <text x={cx(j)} y={y + 64} textAnchor="middle" className={s.letter}>
                {ch}
              </text>
            </g>
          );
        })}
      </g>
      {ghost !== null && (
        <g>
          {P.split("").map((ch, j) => (
            <g key={j}>
              <rect
                x={X0 + (ghost + j) * CW + 0.5}
                y={y + 72}
                width={CW - 1}
                height={14}
                rx={2}
                fill="none"
                stroke={cur && j === cur.pj ? "var(--bad)" : "var(--muted)"}
                strokeDasharray="2 2"
              />
              <text x={cx(ghost + j)} y={y + 83} textAnchor="middle" className={s.ghost}>
                {ch}
              </text>
            </g>
          ))}
        </g>
      )}
    </g>
  );
}

function slideLabel(x: Step) {
  const sh = SHIFT[x.key!] ?? M;
  const missed = T[x.ti] !== x.key ? ` (miss on ${T[x.ti] === " " ? "space" : T[x.ti]})` : "";
  return `${x.key === " " ? "space" : x.key} ${sh}${missed}`;
}

function Stage({ locked, interact, k, step, runTo, busy, last, stepped }: {
  locked: boolean;
  interact: () => void;
  k: number;
  step: () => void;
  runTo: () => void;
  busy: boolean;
  last: number;
  stepped: boolean;
}) {
  const { reach } = useMilestones(interact, ["first-skip", "both-matched"]);
  const h = laneState(HORS, k);
  const p = laneState(PLAIN, k);
  const both = h.matched && p.matched;
  // The Horspool slide made by the latest press, if any.
  const justSlid = h.cur && !h.cur.ok && h.n > Math.min(last, HORS.length) ? h.cur : null;
  const watchedSkip = stepped && !!justSlid && SHIFT[justSlid.key!] === undefined;
  useEffect(() => {
    if (watchedSkip) reach("first-skip");
  }, [watchedSkip]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (both) reach("both-matched");
  }, [both]); // eslint-disable-line react-hooks/exhaustive-deps
  const log = HORS.slice(0, h.n).filter((x) => !x.ok);
  const note = justSlid
    ? SHIFT[justSlid.key!] === undefined
      ? `${justSlid.key} is not in EXAMPLE: slide ${M}`
      : `${justSlid.key}: slide ${SHIFT[justSlid.key!]}`
    : null;
  const lastMiss = HORS.slice(0, h.n).filter((x) => !x.ok).pop();
  const usedKey = lastMiss ? (SHIFT[lastMiss.key!] === undefined ? "other" : lastMiss.key!) : null;

  return (
    <div className={s.wrap}>
      <p className={note ? s.note : s.rule}>
        {note ?? "Horspool compares from the pattern's end. On a miss, slide by the table below."}
      </p>
      <svg
        viewBox="0 0 340 196"
        className="stage-svg"
        role="img"
        aria-label={`Plain: ${p.n} comparisons, ${p.placements} placements. Horspool: ${h.n} comparisons, ${h.placements} placements${h.matched ? `, ${T.length - h.read.size} letters never read` : ""}`}
      >
        <Lane y={0} title="Plain: left to right" steps={PLAIN} k={k} locked={locked} justPressed={false} horspool={false} />
        <Lane y={86} title="Horspool: from the end" steps={HORS} k={k} locked={locked} justPressed={!!justSlid} horspool />
        {[...TABLE, ["other", M] as [string, number]].map(([key, v], i) => {
          const w = key === "other" ? 54 : 36;
          const x = X0 + 30 + i * 40;
          return (
            <g key={key}>
              <rect
                x={x}
                y={178}
                width={w}
                height={16}
                rx={3}
                fill="var(--bg-2)"
                stroke={usedKey === key ? "var(--domain)" : "var(--line)"}
                strokeWidth={usedKey === key ? 2 : 1}
              />
              <text x={x + w / 2} y={190} textAnchor="middle" className={s.cell}>
                {key} {v}
              </text>
            </g>
          );
        })}
        <text x={X0} y={190} className={s.axis}>
          Slide
        </text>
      </svg>
      <p className={s.log} data-testid="slide-log">
        {log.length === 0
          ? "Horspool slides: none yet"
          : `Horspool slides: ${log.map(slideLabel).join(" · ")}${h.matched ? " · found" : ""}`}
      </p>
      <Row>
        <Control className={s.tap} disabled={locked || k >= MAXK || busy} onClick={step}>
          Compare
        </Control>
        <Control className={s.tap} disabled={locked || k >= MAXK || busy || k === 0} onClick={runTo}>
          Compare to the match
        </Control>
      </Row>
    </div>
  );
}

export default function BoyerMooreSkipsAhead({ slug }: { slug: string }) {
  const [k, setK] = useState(0);
  const [target, setTarget] = useState(0);
  const [last, setLast] = useState(0); // k before the latest press or replay frame
  const [stepped, setStepped] = useState(false); // true when the latest change came from a single Compare press
  useEffect(() => {
    if (k >= target) return;
    const t = setTimeout(() => {
      setLast(k);
      setK(k + 1);
    }, 14);
    return () => clearTimeout(t);
  }, [k, target]);
  const step = () => {
    setStepped(true);
    setLast(k);
    setTarget(k + 1);
    setK(k + 1);
  };
  const runTo = () => {
    setStepped(false);
    setTarget(MAXK);
    if (reduced()) {
      setLast(MAXK - 1);
      setK(MAXK);
    } else {
      setLast(k);
      setK(k + 1);
    }
  };
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          'Find EXAMPLE in "HERE IS A SIMPLE EXAMPLE" (24 characters). Compare from the pattern\'s end; on a miss, slide by the table entry for the text letter under the pattern\'s end. How many comparisons?',
        options: ["27, like the plain method", "24, one per text letter", "15, fewer than the text has"],
        answer: 2,
      }}
      exploreHint="Compare one letter at a time and watch the bottom lane jump."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Reading from the pattern&apos;s end, the first check met {HORS[0].key}. {HORS[0].key} is not in EXAMPLE, so no
            placement covering it could match, and the pattern jumped {HORS[0].next! - HORS[0].at}.
          </p>
          <p>
            Look at the slide log: &ldquo;{slideLabel(EPARTIAL)}&rdquo;. After matching {M - 1 - EPARTIAL.pj} letters it missed on{" "}
            {T[EPARTIAL.ti]}, but the slide used the {EPARTIAL.key} under the pattern&apos;s end, so it moved{" "}
            {SHIFT[EPARTIAL.key!]}, not {M}.
          </p>
          <p>
            Your search made <strong>{HORS.length}</strong> comparisons in {laneState(HORS, MAXK).placements} placements
            and never read <strong>{T.length - laneState(HORS, MAXK).read.size}</strong> of the {T.length} letters. The
            plain method read every letter: {PLAIN.length} comparisons, {laneState(PLAIN, MAXK).placements} placements.
          </p>
          <p className="muted">
            A search can skip text, as long as each skip is justified by a letter it did read.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Stage locked={locked} interact={interact} k={k} step={step} runTo={runTo} busy={k < target} last={last} stepped={stepped} />
      )}
    </Lesson>
  );
}
