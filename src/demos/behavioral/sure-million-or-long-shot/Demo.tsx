"use client";

// Allais / certainty effect (brief 1, company/domains/briefs/behavioral.md; design note
// company/reviews/sure-million-or-long-shot/design.md). Four gamble cards, each a 100-cell grid.
// Pair 1: 1A $1M for sure / 1B 10% $5M, 89% $1M, 1% $0. Pair 2: 2A 11% $1M, 89% $0 / 2B 10% $5M, 90% $0.
// The learner picks one card in each pair (milestones pair1, pair2), then turns on "Take away the shared 89%"
// (milestone shared): the 89 cells both cards in a pair share grey out, and what is left is the same in both
// pairs, 11% of $1M against 10% of $5M and 1% of $0. Under expected utility (any increasing u) the two
// differences in EU are the same expression, so 1A goes with 2A and 1B with 2B
// (node company/domains/briefs/checks/behavioral-allais-certainty-effect.mjs).
// Cell order is the same in every card: the 89 shared cells first, then the 11 that differ, so the greyed
// block sits in the same place in all four. 1A's bar has no internal divider before the toggle.
// At the reveal the choices freeze and the toggle is forced on, so the picture the reveal quotes is on screen.
// No randomness. No EV, utility or sum is drawn (P1, E1).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type Pick = "A" | "B";
type Amount = "5M" | "1M" | "0";

// The one held type (d) sentence (claim c6, mixed branches only). It is unverified: if the fact-checker
// cannot open the source, set this to false (the brief's fallback: the sentence is cut, the rest stands).
const HELD_LINE = false; // W-1244, rule 6: cut until the fact-checker opens an item-level source

const MILESTONES = ["pair1", "pair2", "shared"] as const;

interface Seg {
  pct: number;
  amount: Amount;
  shared?: boolean;
}

// Segments in cell order: shared block first.
const CARDS: Record<"1A" | "1B" | "2A" | "2B", Seg[]> = {
  "1A": [
    { pct: 89, amount: "1M", shared: true },
    { pct: 11, amount: "1M" },
  ],
  "1B": [
    { pct: 89, amount: "1M", shared: true },
    { pct: 1, amount: "0" },
    { pct: 10, amount: "5M" },
  ],
  "2A": [
    { pct: 89, amount: "0", shared: true },
    { pct: 11, amount: "1M" },
  ],
  "2B": [
    { pct: 89, amount: "0", shared: true },
    { pct: 1, amount: "0" },
    { pct: 10, amount: "5M" },
  ],
};

const LABEL: Record<Amount, string> = { "5M": "$5M", "1M": "$1M", "0": "$0" };
const ORDER: Amount[] = ["5M", "1M", "0"];

/** Legend lines. Toggle off: one line per amount (1A reads "100% $1M"). Toggle on: the shared block struck. */
function legend(segs: Seg[], sharedOff: boolean) {
  if (!sharedOff) {
    const tot = new Map<Amount, number>();
    segs.forEach((g) => tot.set(g.amount, (tot.get(g.amount) ?? 0) + g.pct));
    return ORDER.filter((a) => tot.has(a)).map((a) => ({ pct: tot.get(a)!, amount: a, shared: false }));
  }
  const rest = ORDER.flatMap((a) => segs.filter((g) => !g.shared && g.amount === a));
  const sh = segs.filter((g) => g.shared);
  return [...rest.map((g) => ({ ...g, shared: false })), ...sh.map((g) => ({ ...g, shared: true }))];
}

function cells(segs: Seg[]) {
  const out: { amount: Amount; shared: boolean }[] = [];
  segs.forEach((g) => {
    for (let i = 0; i < g.pct; i++) out.push({ amount: g.amount, shared: !!g.shared });
  });
  return out;
}

// Drawn at its natural pixel size (56.8 px, no viewBox): four small cards share the stage, and none is a
// squeezed picture. Cells 4.6 px with 1.2 px gaps.
const CELL = 4.6;
const GAP = 1.2;
const SIDE = 10 * CELL + 9 * GAP;

function Grid({ segs, sharedOff }: { segs: Seg[]; sharedOff: boolean }) {
  return (
    <svg width={SIDE} height={SIDE} className={s.grid} aria-hidden="true">
      {cells(segs).map((c, i) => {
        const x = (i % 10) * (CELL + GAP);
        const y = Math.floor(i / 10) * (CELL + GAP);
        const cls = c.shared && sharedOff ? s.cellShared : c.amount === "5M" ? s.cell5 : c.amount === "1M" ? s.cell1 : s.cell0;
        return <rect key={i} x={x} y={y} width={CELL} height={CELL} rx={1} className={cls} />;
      })}
    </svg>
  );
}

function describe(id: string, segs: Seg[], sharedOff: boolean) {
  const parts = legend(segs, sharedOff).map((l) => `${l.pct}% ${LABEL[l.amount]}${l.shared ? " (shared, taken away)" : ""}`);
  return `Card ${id}: ${parts.join(", ")}`;
}

// Reveal branches, copied from the check script (all four print there in full).
const CHOSE: Record<string, string> = {
  AA: "You took the sure $1M, then the 11% chance of $1M.",
  AB: "You took the sure $1M, then the 10% chance of $5M.",
  BA: "You took the 10% chance of $5M, then the 11% chance of $1M.",
  BB: "You took the 10% chance of $5M both times.",
};
const SHARED = "Take away the 89% each pair shares, and both pairs become 11% of $1M against 10% of $5M.";
const STOPS = "Where it stops: you chose knowing the pairs were linked.";

function revealParas(key: string): [string, string] {
  const mixed = key === "AB" || key === "BA";
  let verdict: string;
  if (mixed) {
    verdict =
      "Expected utility must answer it the same way both times, so no utility function fits your two choices: a departure from the model, not a slip.";
    if (key === "AB") {
      verdict += " This lean to the sure thing is the certainty effect.";
      if (HELD_LINE) verdict += " Re-run with 4,098 people in 19 countries, it held up, weaker than first reported.";
    } else {
      verdict += HELD_LINE
        ? " That is the reverse of the certainty effect, which held up with 4,098 people in 19 countries, weaker than first reported."
        : " Leaning away from the sure thing is the reverse of the certainty effect.";
    }
  } else {
    const fit =
      key === "AA"
        ? "a cautious one, for which $1M is worth more than 10/11 of $5M."
        : "a bolder one, for which $5M is worth more than 1.1 times $1M.";
    verdict = `You answered it the same way both times, so one utility function fits both: ${fit} The sure $1M, then the 10% chance, would fit none: the certainty effect.`;
  }
  return [`${CHOSE[key]} ${SHARED}`, verdict];
}

export default function SureMillionOrLongShot({ slug }: { slug: string }) {
  const [p1, setP1] = useState<Pick | null>(null);
  const [p2, setP2] = useState<Pick | null>(null);
  const [sharedOff, setSharedOff] = useState(false);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Someone takes the sure $1M in pair 1. Under expected utility, which may they choose in pair 2?",
        options: ["Only the 11% chance of $1M", "Only the 10% chance of $5M", "Either one, depending on how cautious they are"],
        answer: 0,
      }}
      exploreHint="Pick one card in each pair, then take away the shared 89%."
      minInteractions={MILESTONES.length}
      reveal={() => {
        const [a, b] = revealParas(`${p1 ?? "A"}${p2 ?? "A"}`);
        return (
          <>
            <p>{a}</p>
            <p>{b}</p>
            <p className="muted">{STOPS}</p>
          </>
        );
      }}
    >
      {({ locked, phase, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const frozen = locked || phase === "reveal";
            const off = sharedOff || phase === "reveal";
            const pick = (pair: 1 | 2, v: Pick) => {
              if (pair === 1) {
                setP1(v);
                reach("pair1");
              } else {
                setP2(v);
                reach("pair2");
              }
            };
            const card = (pair: 1 | 2, v: Pick) => {
              const id = `${pair}${v}` as keyof typeof CARDS;
              const chosen = (pair === 1 ? p1 : p2) === v;
              const segs = CARDS[id];
              return (
                <Control
                  key={id}
                  className={`${s.card} ${chosen ? `active ${s.chosen}` : ""}`}
                  disabled={frozen}
                  aria-pressed={chosen}
                  aria-label={describe(id, segs, off)}
                  onClick={() => pick(pair, v)}
                >
                  <span className={s.cardHead}>
                    <span className={s.cardId}>{id}</span>
                    <span className={s.tick} aria-hidden="true">
                      {chosen ? "✓" : ""}
                    </span>
                  </span>
                  <span className={s.cardBody}>
                    <Grid segs={segs} sharedOff={off} />
                    <span className={s.legend}>
                      {legend(segs, off).map((l, i) => (
                        <span key={i} className={`${s.leg} ${l.shared ? s.legShared : ""}`}>
                          <span
                            className={`${s.swatch} ${l.shared ? s.swShared : l.amount === "5M" ? s.sw5 : l.amount === "1M" ? s.sw1 : s.sw0}`}
                            aria-hidden="true"
                          />
                          {l.pct}% {LABEL[l.amount]}
                        </span>
                      ))}
                    </span>
                  </span>
                </Control>
              );
            };
            return (
              <div className={s.wrap}>
                <p className={s.gloss}>Expected utility: any felt value, more is better, weighted by chance.</p>
                <div className={s.pair} role="group" aria-label="Pair 1">
                  {card(1, "A")}
                  {card(1, "B")}
                </div>
                <div className={s.pair} role="group" aria-label="Pair 2">
                  {card(2, "A")}
                  {card(2, "B")}
                </div>
                <Control
                  className={`${s.toggle} ${off ? "active" : ""}`}
                  disabled={frozen}
                  aria-pressed={off}
                  onClick={() => {
                    const next = !sharedOff;
                    setSharedOff(next);
                    if (next) reach("shared");
                  }}
                >
                  {off ? "✓ " : ""}Take away the shared 89%
                </Control>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
