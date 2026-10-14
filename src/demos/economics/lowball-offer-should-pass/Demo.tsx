"use client";

// Ultimatum game, $10 in whole dollars, a responder who cares only about money.
// One picture: ten coins split between you and the proposer, and the two outcomes side by side
// (Accept: you get the offer; Reject: both get $0), the better one ringed.
// Key states: an offer of $1 (accept still beats reject) and $0 (a tie, nothing to gain).
// Model: money only. Real-world rejection rates need a human source check and stay off the card.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const POT = 10;
const PRESETS = [5, 3, 1, 0];
const START = 4;
const MILESTONES = ["offer-one", "offer-zero"] as const;

/** Money-only responder: accept when the offer beats $0 from rejecting. */
const accepts = (offer: number) => offer > 0;
/** Smallest whole-dollar offer that beats rejecting. */
const SMALLEST = Array.from({ length: POT + 1 }, (_, i) => i).find(accepts) ?? POT; // 1

// Geometry (viewBox 320 × 190).
const COIN_R = 12;
const COIN_X = (i: number) => 25 + i * 30;
const COIN_Y = 38;

export default function LowballOfferShouldPass({ slug }: { slug: string }) {
  const [offer, setOffer] = useState(START);
  const keep = POT - offer;
  const acc = accepts(offer);
  const tie = offer === 0;

  const outcome = (label: string, you: number, them: number, x: number, ring: "best" | "tie" | null) => (
    <g>
      <rect x={x} y={92} width={140} height={64} rx={8} className={s.cell} />
      {ring && (
        <rect x={x} y={92} width={140} height={64} rx={8} fill="none" stroke={ring === "best" ? "var(--good)" : "var(--muted)"} strokeWidth={3.5} strokeDasharray={ring === "tie" ? "6 4" : undefined} />
      )}
      <text x={x + 70} y={110} textAnchor="middle" className={s.axis}>
        {label}
      </text>
      <text x={x + 70} y={133} textAnchor="middle" className={s.big}>
        you ${you}
      </text>
      <text x={x + 70} y={149} textAnchor="middle" className={s.small}>
        proposer ${them}
      </text>
    </g>
  );

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "You're offered part of $10, in whole dollars. Reject, and both get $0. If you care only about money, what's the smallest offer worth accepting?",
        options: ["$1", "$3", "$5"],
        answer: [1, 3, 5].indexOf(SMALLEST),
      }}
      exploreHint="Lower the offer. Find where accepting stops beating rejecting."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            At $1, accepting left you <strong>$1</strong> and rejecting left you $0. At $0 the two came out the same, so there was nothing to
            gain. The smallest offer worth accepting is <strong>${SMALLEST}</strong>.
          </p>
          <p>
            Rejecting a lowball offer does hurt the proposer, who loses ${POT - SMALLEST}, but it costs you the ${SMALLEST} too. To a responder who
            counts only money, that is a pure loss. A proposer who knows this offers ${SMALLEST} and keeps ${POT - SMALLEST}.
          </p>
          <p className="muted">
            A model that counts only money. If a responder also cares about fairness, saying no can make sense; that is a different model.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const set = (v: number) => {
              setOffer(v);
              if (v === 1) reach("offer-one");
              if (v === 0) reach("offer-zero");
            };
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: you care only about money · whole dollars</p>
                <svg viewBox="0 0 320 190" className="stage-svg" role="img" aria-label="Ten coins split between you and the proposer, and the accept and reject outcomes">
                  {Array.from({ length: POT }, (_, i) => (
                    <circle key={i} cx={COIN_X(i)} cy={COIN_Y} r={COIN_R} className={!locked && i < offer ? s.main : s.cell} />
                  ))}
                  <text x={20} y={COIN_Y + 32} className={s.value}>
                    {locked ? "you ?" : `you $${offer}`}
                  </text>
                  <text x={300} y={COIN_Y + 32} textAnchor="end" className={s.value}>
                    {locked ? "proposer ?" : `proposer $${keep}`}
                  </text>
                  {!locked && outcome("Accept", offer, keep, 12, acc ? "best" : "tie")}
                  {!locked && outcome("Reject", 0, 0, 168, acc ? null : "tie")}
                  <text x={160} y={178} textAnchor="middle" className={s.value} fill={tie ? "var(--muted)" : "var(--good)"}>
                    {locked ? "" : tie ? "$0 either way: nothing to gain" : `Accept: $${offer} beats $0`}
                  </text>
                </svg>

                <Row>
                  {PRESETS.map((p) => (
                    <Control
                      key={p}
                      className={`${s.tile} ${offer === p ? "active" : ""}`}
                      disabled={locked || offer === p}
                      aria-pressed={offer === p}
                      onClick={() => set(p)}
                    >
                      ${p}
                    </Control>
                  ))}
                </Row>
                <Slider label="Offer to you" value={offer} min={0} max={POT} onChange={set} disabled={locked} format={(v) => `$${v}`} />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
