"use client";

// VCG for two ad slots. Slots get 10 and 5 clicks; X, Y and Z value a click at $7, $6 and $1.
// Y and Z bid their values; the learner sets X's bid per click. Top picture: Y and Z's total value
// without X (always $65) against their value with X; the gap is what X pays (the harm X causes).
// Bottom picture: X's profit (value of X's clicks minus payment) for every bid from $0 to $10.
// Key states: the honest bid $7 (top slot, pays $35, keeps $35) and a shaded bid ($1 to $5: slot 2,
// pays $5, keeps $30). Model: fixed clicks per slot, the others bid honestly, a bid of $0 means X is
// out, and ties between bids go to X.
// v2 (wave E r6): the stage now writes the sums the bracket rests on ("Without X: Y $60 + Z $5 =
// $65 · With X: Y $30 + Z $0 = $30"), so the harm is a subtraction the learner can do; the bracket
// caption is kept inside the frame; the chip says Y and Z bid their values.
// v4 (learner r8, phone fit): reveal cut to <= 90 words (the Y/Z payments sentence and the VCG name are gone; the
// model caveat is on the chip); the three readouts are gone: X's slot and profit are one line in the picture above the
// keep chart, X's payment is the bracket; the keep chart is 22 units shorter.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const CLICKS = [10, 5] as const;
const VAL = { X: 7, Y: 6, Z: 1 } as const;
type Who = keyof typeof VAL;
const HONEST = VAL.X;
const BIDS = Array.from({ length: 11 }, (_, i) => i);
const MILESTONES = ["honest", "shaded"] as const;

/** Slot order for given bids per click: highest first, ties to X, a bid of 0 takes no slot. */
function order(bids: Partial<Record<Who, number>>): Who[] {
  const ks = (Object.keys(bids) as Who[]).filter((k) => (bids[k] ?? 0) > 0);
  ks.sort((a, b) => (bids[b] ?? 0) - (bids[a] ?? 0) || (a === "X" ? -1 : b === "X" ? 1 : 0));
  return ks.slice(0, CLICKS.length);
}
/** Total value to everyone except `skip`, given a slot order. */
function value(o: Who[], skip?: Who) {
  return o.reduce((t, k, i) => (k === skip ? t : t + VAL[k] * CLICKS[i]), 0);
}
function outcome(bidX: number) {
  const withX = order({ X: bidX, Y: VAL.Y, Z: VAL.Z });
  const withoutX = order({ Y: VAL.Y, Z: VAL.Z });
  const othersWithout = value(withoutX); // 65
  const othersWith = value(withX, "X");
  const slot = withX.indexOf("X"); // -1, 0 or 1
  const pay = othersWithout - othersWith;
  const gets = slot < 0 ? 0 : VAL.X * CLICKS[slot];
  return { withX, othersWithout, othersWith, slot, pay, keep: gets - pay };
}
const usd = (v: number) => `$${v}`;
/** The two bar totals in words, from the same slot orders the bars draw. */
function sums(o: ReturnType<typeof outcome>) {
  const without = order({ Y: VAL.Y, Z: VAL.Z });
  const part = (ord: Who[], k: Who) => {
    const i = ord.indexOf(k);
    return i < 0 ? 0 : VAL[k] * CLICKS[i];
  };
  return (
    `Without X: Y ${usd(part(without, "Y"))} + Z ${usd(part(without, "Z"))} = ${usd(o.othersWithout)} · ` +
    `With X: Y ${usd(part(o.withX, "Y"))} + Z ${usd(part(o.withX, "Z"))} = ${usd(o.othersWith)}`
  );
}
const slotName = (i: number) => (i < 0 ? "none" : i === 0 ? "top" : "second");

const L = 96;
const R = 304;
const MAXV = 70;
const px = (v: number) => (v / MAXV) * (R - L);

function OthersBar({ y, o, label, locked }: { y: number; o: Who[]; label: string; locked: boolean }) {
  let x = L;
  return (
    <g>
      <text x={8} y={y + 13} className={s.axis}>
        {label}
      </text>
      <rect x={L} y={y} width={R - L} height={20} rx={4} className={s.track} />
      {!locked &&
        o.map((k, i) => {
          if (k === "X") return null;
          const w = px(VAL[k] * CLICKS[i]);
          const r = (
            <g key={k}>
              <rect x={x} y={y} width={w} height={20} className={k === "Y" ? s.soft : s.mutedFill} />
              {w > 22 && (
                <text x={x + w / 2} y={y + 14} className={s.small} textAnchor="middle">
                  {k} {usd(VAL[k] * CLICKS[i])}
                </text>
              )}
            </g>
          );
          x += w;
          return r;
        })}
    </g>
  );
}

export default function PayForTheHarm({ slug }: { slug: string }) {
  const [bid, setBid] = useState(0);
  const o = outcome(bid);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Slots get ${CLICKS[0]} and ${CLICKS[1]} clicks; values per click X $${VAL.X}, Y $${VAL.Y}, Z $${VAL.Z}. X wins top slot, paying the harm caused. How much?`,
        options: ["$70", "$35", "$60"],
        answer: 1,
      }}
      exploreHint="Bid X's honest $7, then try a lower bid. Watch the gap and X's profit."
      minInteractions={MILESTONES.length}
      reveal={() => {
        const h = outcome(HONEST);
        return (
          <>
            <p>
              At the honest {usd(HONEST)}, the line under the bars read: without X, Y and Z get {usd(h.othersWithout)}; with X on
              top, Y drops a slot and they get {usd(h.othersWith)}. That gap, <strong>{usd(h.pay)}</strong>, is X&apos;s
              price, not the $70 X&apos;s own bid would charge.
            </p>
            <p>
              No bid beat the honest $7: $6 to $10 tied at {usd(h.keep)}, while $1 to $5 dropped X to the second slot and{" "}
              {usd(outcome(3).keep)}. X&apos;s bid only picks the slot; the others set the price. Honest bidding is a dominant
              strategy.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const set = (v: number) => {
              setBid(v);
              if (v === HONEST) reach("honest");
              if (v >= 1 && v <= 5) reach("shaded");
            };
            const top = 44;
            const gapX = L + px(o.othersWith);
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: fixed clicks; Y, Z bid their values; ties to X</p>
                <svg
                  viewBox="0 0 320 196"
                  className="stage-svg"
                  role="img"
                  aria-label={locked ? "Y and Z's value with and without X" : `X bids ${usd(bid)}, pays ${usd(o.pay)}, keeps ${usd(o.keep)}`}
                >
                  <text x={8} y={12} className={s.axis}>
                    Y and Z&apos;s value
                  </text>
                  <OthersBar y={18} o={order({ Y: VAL.Y, Z: VAL.Z })} label="without X" locked={locked} />
                  <OthersBar y={top} o={o.withX} label="with X" locked={locked} />
                  {!locked && o.pay > 0 && (
                    <g>
                      <rect x={gapX} y={top} width={px(o.pay)} height={20} className={s.ghost} />
                      <path d={`M${gapX} ${top + 26} v4 H${L + px(o.othersWithout)} v-4`} className={s.bracket} />
                      <text
                        x={Math.min((gapX + L + px(o.othersWithout)) / 2, 262)}
                        y={top + 42}
                        className={s.bracketText}
                        textAnchor="middle"
                      >
                        harm = X pays {usd(o.pay)}
                      </text>
                    </g>
                  )}
                  <text x={8} y={102} className={s.axis}>
                    X keeps, for each bid
                  </text>
                  {!locked && (
                    <text x={312} y={102} className={s.value} textAnchor="end">
                      X now: {o.slot < 0 ? "no slot" : `${slotName(o.slot)} slot`}, keeps {usd(o.keep)}
                    </text>
                  )}
                  {BIDS.map((b) => {
                    const k = outcome(b).keep;
                    const x = 22 + b * 26;
                    const h = (k / 40) * 48;
                    const on = !locked && b === bid;
                    return (
                      <g key={b}>
                        <rect x={x} y={118} width={20} height={48} className={s.track} />
                        {!locked && <rect x={x} y={166 - h} width={20} height={h} className={on ? s.main : s.mutedFill} />}
                        {on && (
                          <text x={x + 10} y={162 - h} className={s.small} textAnchor="middle">
                            {usd(k)}
                          </text>
                        )}
                        <text x={x + 10} y={180} className={b === HONEST ? s.value : s.small} textAnchor="middle">
                          {b === HONEST ? "$7" : b}
                        </text>
                      </g>
                    );
                  })}
                  <text x={22 + HONEST * 26 + 10} y={191} className={s.small} textAnchor="middle">
                    honest
                  </text>
                </svg>
                <p className={s.sums}>{locked ? "" : sums(o)}</p>
                <Row>
                  {[HONEST, 3, 10].map((v) => (
                    <Control key={v} className={bid === v ? "active" : ""} disabled={locked || bid === v} onClick={() => set(v)}>
                      Bid ${v}
                      {v === HONEST ? " (honest)" : ""}
                    </Control>
                  ))}
                </Row>
                <Slider label="X's bid per click" value={bid} min={0} max={10} format={usd} disabled={locked} onChange={set} />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
