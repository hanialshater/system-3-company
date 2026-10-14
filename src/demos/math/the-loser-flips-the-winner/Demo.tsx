"use client";

// The loser flips the winner. Five Borda ballots: 3 x A > B > C, 2 x B > C > A.
// With C on the ballot (2/1/0 points): A 6, B 7, C 2, so B wins. Take C off and recount (1/0): A 3, B 2.
// Nobody's A-versus-B order changes. What changes is the size of each ballot's A-B gap: on ballots
// 4-5, C sits between B and A, so B's lead there is 2 points; without C it is 1. The gap chips put
// that cause on the stage. Scores are computed from the ballots, never hard-coded.
// Milestones: counted with C, counted without C, gap chips shown.
// v2 (wave G r7): neutral title/hook (meta.json); the toggle names its action ("Remove C" / "Put C back");
// once the gap chips are on, a "Lead sums" row adds the chips for both ballots (with C: B 2 + 2 = 4,
// A 1 + 1 + 1 = 3; without C: A 3, B 1 + 1 = 2), so the reveal's "4 beats 3" is a reading, not a sum.
// v3 (phone fit, build 6): score bars pitch 24 -> 21 and the viewBox 232 -> 219 tall, stage gaps 6 -> 3 px and
// tighter button padding, so the rule line stays on screen at the reveal on a 390x844 phone. Text unchanged.

import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

type Cand = "A" | "B" | "C";
const CANDS: Cand[] = ["A", "B", "C"];
const BALLOTS: Cand[][] = [
  ["A", "B", "C"],
  ["A", "B", "C"],
  ["A", "B", "C"],
  ["B", "C", "A"],
  ["B", "C", "A"],
];
const MILESTONES = ["count-with-c", "count-without-c", "gaps"] as const;

/** Borda points on one ballot: n-1 for 1st down to 0 for last, counting only candidates still running. */
export function ballotPoints(ballot: Cand[], cOn: boolean): Partial<Record<Cand, number>> {
  const running = ballot.filter((c) => cOn || c !== "C");
  const out: Partial<Record<Cand, number>> = {};
  running.forEach((c, i) => (out[c] = running.length - 1 - i));
  return out;
}
export function totals(cOn: boolean): Record<Cand, number> {
  const t: Record<Cand, number> = { A: 0, B: 0, C: 0 };
  for (const b of BALLOTS) {
    const p = ballotPoints(b, cOn);
    for (const c of CANDS) t[c] += p[c] ?? 0;
  }
  return t;
}
/** Winner among running candidates (null on a tie). */
function winner(cOn: boolean): Cand | null {
  const t = totals(cOn);
  const running = CANDS.filter((c) => cOn || c !== "C");
  const best = Math.max(...running.map((c) => t[c]));
  const top = running.filter((c) => t[c] === best);
  return top.length === 1 ? top[0] : null;
}
/** A's points minus B's points on one ballot. */
const gapAB = (b: Cand[], cOn: boolean) => {
  const p = ballotPoints(b, cOn);
  return (p.A ?? 0) - (p.B ?? 0);
};
const cBetween = (b: Cand[]) => {
  const [ia, ib, ic] = [b.indexOf("A"), b.indexOf("B"), b.indexOf("C")];
  return ic > Math.min(ia, ib) && ic < Math.max(ia, ib);
};
const gapText = (g: number) => (g >= 0 ? `+${g} A` : `+${-g} B`);

/** Sum of each side's per-ballot leads, written as the chips add up. */
function leadSums(cOn: boolean) {
  const g = BALLOTS.map((b) => gapAB(b, cOn));
  const a = g.filter((x) => x > 0);
  const b = g.filter((x) => x < 0).map((x) => -x);
  const sum = (xs: number[]) => xs.reduce((u, v) => u + v, 0);
  return { a: sum(a), b: sum(b), aText: `${a.join(" + ")} = ${sum(a)}`, bText: `${b.join(" + ")} = ${sum(b)}` };
}

export const WITH_C = totals(true);
export const WITHOUT_C = totals(false);

function logLine(cOn: boolean) {
  const t = totals(cOn);
  const w = winner(cOn);
  if (cOn) {
    const loser = w === "B" ? "A" : "B";
    return `With C: ${w ?? "tie"} wins ${t[w ?? "A"]}–${t[loser]} (C ${t.C}).`;
  }
  const loser = w === "A" ? "B" : "A";
  return `Without C: ${w ?? "tie"} wins ${t[w ?? "A"]}–${t[loser]}.`;
}

export default function TheLoserFlipsTheWinner({ slug }: { slug: string }) {
  const leadWith = -gapAB(BALLOTS[3], true);
  const leadWithout = -gapAB(BALLOTS[3], false);
  const gapsWith = BALLOTS.map((b) => gapAB(b, true));
  const aLeads = gapsWith.filter((g) => g > 0).reduce((a, g) => a + g, 0);
  const bLeads = -gapsWith.filter((g) => g < 0).reduce((a, g) => a + g, 0);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Borda vote: 2 points for 1st, 1 for 2nd, 0 for 3rd. B wins; C is last. Remove C and recount. Who wins?",
        options: ["B again", "A", "A tie"],
        answer: 1,
      }}
      exploreHint="Count, then remove C and watch the A–B gap on each ballot."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Nobody changed their mind about A versus B: voters 1–3 put A above B, voters 4–5 put B above A, before and
            after.
          </p>
          <p>
            With C on the ballot, C sat between B and A on ballots 4 and 5, so each gave B a {leadWith}-point lead; A&apos;s
            voters gave A 1 each. {bLeads} beats {aLeads}: B won {WITH_C.B}–{WITH_C.A}. Without C every lead is{" "}
            {leadWithout}: A wins {WITHOUT_C.A}–{WITHOUT_C.B}.
          </p>
          <p>Points voting like this can let a last-placed option pick the winner.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => <Stage locked={locked} reach={reach} />}
        </Milestones>
      )}
    </Lesson>
  );
}

const CARD_W = 60;
const CARD_GAP = 8;
const CARD_X0 = 4;
const TILE_Y0 = 26;
const TILE_PITCH = 26;
const BAR_Y0 = 158;
const BAR_PITCH = 21;
const PX_PER_POINT = 36;

function Stage({ locked, reach }: { locked: boolean; reach: (name: string) => void }) {
  const [cOn, setCOn] = useState(true);
  const [counted, setCounted] = useState(false);
  const [gaps, setGaps] = useState(false);
  const [log, setLog] = useState<{ with?: string; without?: string }>({});

  const record = (on: boolean) => {
    setLog((l) => (on ? { ...l, with: l.with ?? logLine(true) } : { ...l, without: l.without ?? logLine(false) }));
    reach(on ? "count-with-c" : "count-without-c");
  };
  const count = () => {
    setCounted(true);
    record(cOn);
  };
  const toggle = () => {
    const next = !cOn;
    setCOn(next);
    if (counted) record(next);
  };
  const showGaps = () => {
    setGaps(true);
    reach("gaps");
  };

  const t = totals(cOn);
  const w = counted ? winner(cOn) : null;
  const rule = cOn ? "Borda: 2 points for 1st, 1 for 2nd, 0 for 3rd." : "C removed: 1 point for 1st, 0 for 2nd.";
  const aria = locked
    ? "Five ballots: three rank A, B, C; two rank B, C, A. Not counted yet."
    : counted
      ? `${cOn ? "C on the ballot" : "C removed"}: A ${t.A}, B ${t.B}${cOn ? `, C ${t.C}` : ""}.` +
        (gaps ? ` Ballots 4 and 5: B's lead over A is ${-gapAB(BALLOTS[3], cOn)}${cOn ? "" : ", down from 2"}.` : "")
      : `${cOn ? "C on the ballot" : "C removed"}. Not counted yet.`;

  return (
    <div className={s.wrap}>
      <p className={s.rule}>
        <span>{rule}</span>
        <span className={s.voters}>voters 1–5</span>
      </p>
      <svg viewBox="0 0 340 219" className={`stage-svg ${s.fit}`} role="img" aria-label={aria}>
        {BALLOTS.map((b, i) => {
          const x = CARD_X0 + i * (CARD_W + CARD_GAP);
          const pts = ballotPoints(b, cOn);
          const g = gapAB(b, cOn);
          const was = gapAB(b, true);
          const changed = !cOn && was !== g;
          return (
            <g key={i}>
              <rect x={x} y={4} width={CARD_W} height={102} rx={8} className={s.card} />
              <text x={x + CARD_W / 2} y={19} className={s.cardNum}>
                {i + 1}
              </text>
              {b.map((c, r) => {
                const ghost = c === "C" && !cOn;
                const y = TILE_Y0 + r * TILE_PITCH;
                return (
                  <g key={c}>
                    <rect x={x + 6} y={y} width={26} height={22} rx={4} className={ghost ? s.ghost : s.tile} />
                    <text x={x + 19} y={y + 15.5} className={ghost ? s.ghostLetter : s.letter}>
                      {c}
                    </text>
                    {counted && !ghost && (
                      <text x={x + 46} y={y + 15.5} className={s.pts}>
                        {pts[c]}
                      </text>
                    )}
                  </g>
                );
              })}
              {gaps && (
                <g>
                  <rect
                    x={x + 4}
                    y={112}
                    width={CARD_W - 8}
                    height={28}
                    rx={14}
                    className={g >= 0 ? s.chipA : s.chipB}
                  />
                  <text x={x + CARD_W / 2} y={131} className={s.chipText}>
                    {gapText(g)}
                  </text>
                  {cOn && cBetween(b) && (
                    <text x={x + CARD_W / 2} y={152} className={s.note}>
                      C between
                    </text>
                  )}
                  {changed && (
                    <text x={x + CARD_W / 2} y={152} className={s.note}>
                      was {gapText(was).split(" ")[0]}
                    </text>
                  )}
                </g>
              )}
            </g>
          );
        })}

        {CANDS.map((c, r) => {
          const y = BAR_Y0 + r * BAR_PITCH;
          const removed = c === "C" && !cOn;
          return (
            <g key={c}>
              <text x={8} y={y + 14} className={s.barName}>
                {c}
              </text>
              {removed ? (
                <text x={26} y={y + 14} className={s.removed}>
                  removed
                </text>
              ) : counted ? (
                <>
                  <rect x={26} y={y} width={Math.max(2, t[c] * PX_PER_POINT)} height={17} rx={4} className={s.bar} />
                  <text x={32 + t[c] * PX_PER_POINT} y={y + 14} className={s.total}>
                    {t[c]}
                  </text>
                  {w === c && (
                    <text x={50 + t[c] * PX_PER_POINT} y={y + 14} className={s.wins}>
                      wins
                    </text>
                  )}
                </>
              ) : (
                <>
                  <rect x={26} y={y} width={90} height={17} rx={4} className={s.barUnknown} />
                  <text x={124} y={y + 14} className={s.total}>
                    ?
                  </text>
                </>
              )}
            </g>
          );
        })}
      </svg>

      <div className={s.log} aria-live="polite">
        {log.with && <p>{log.with}</p>}
        {log.without && <p>{log.without}</p>}
        {gaps && (
          <p data-testid="lead-sums">
            Lead sums with C: B {leadSums(true).bText}, A {leadSums(true).aText}. Without C: A {leadSums(false).aText}, B{" "}
            {leadSums(false).bText}.
          </p>
        )}
      </div>

      <div className={s.controls}>
        <Control className={s.tap} disabled={locked || counted} onClick={count}>
          Count points
        </Control>
        <Control
          className={`${s.tap} ${!cOn ? "active" : ""}`}
          aria-pressed={!cOn}
          disabled={locked}
          onClick={toggle}
        >
          {cOn ? "Remove C" : "Put C back"}
        </Control>
        <Control className={s.tap} disabled={locked || gaps} onClick={showGaps}>
          A vs B gaps
        </Control>
      </div>
    </div>
  );
}
