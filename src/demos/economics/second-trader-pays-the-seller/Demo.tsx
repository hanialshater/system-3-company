"use client";

// Trader competition. A seller values her item at $0. Trader T1 links her to buyer B1 ($1).
// Alone, T1 bids $0 and asks $1: T1 keeps the whole $1. Add T2, who also reaches the seller and has
// her own buyer B2 ($1); the two buyers stay separate. Each trader can resell for $1, so each would
// rather outbid the other by a cent than lose the item; the bid climbs one cent per step to $1.00,
// where outbidding would lose money. Seller gets $1, traders $0.
// Key states: T2 added; the bid reaches $1.00.
// Model: traders ask their buyer's full $1; bids move in 1-cent steps; T1 bids first
// (after Blume, Easley, Kleinberg and Tardos 2009).
// v2 (r6): the title no longer states the outcome. The bid meter is labelled, and a tick keeps the highest
// bid reached with T2 (it survives "Remove T2"), so the $1.00 the reveal quotes is still on stage.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const TOP = 100; // cents: each buyer's value
const MILESTONES = ["second", "top"] as const;
const c$ = (cents: number) => `$${(cents / 100).toFixed(2)}`;

const P = {
  S: { x: 40, y: 80 },
  T1: { x: 160, y: 34 },
  T2: { x: 160, y: 126 },
  B1: { x: 280, y: 34 },
  B2: { x: 280, y: 126 },
} as const;

function Spot({ id, label, sub, on, dim }: { id: keyof typeof P; label: string; sub: string; on: boolean; dim?: boolean }) {
  const p = P[id];
  return (
    <g opacity={dim ? 0.3 : 1}>
      <circle cx={p.x} cy={p.y} r={19} className={on ? s.nodeOn : s.node} strokeDasharray={dim ? "4 3" : undefined} />
      <text x={p.x} y={p.y} className={s.nodeText}>
        {label}
      </text>
      <text x={p.x} y={p.y + 31} className={s.small} textAnchor="middle">
        {sub}
      </text>
    </g>
  );
}

export default function SecondTrader({ slug }: { slug: string }) {
  const [two, setTwo] = useState(false);
  const [bid, setBid] = useState(0); // cents, the leading bid to the seller
  const [peak, setPeak] = useState(-1); // highest bid reached with T2 (kept through "Remove T2")

  // T1 bids first; with two traders the lead alternates with each 1-cent outbid.
  const leader = !two || bid % 2 === 0 ? "T1" : "T2";
  const seller = bid;
  const profit = { T1: leader === "T1" ? TOP - bid : 0, T2: leader === "T2" ? TOP - bid : 0 };

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "A trader links a seller (item worth $0 to them) to a buyer (worth $1), keeping the $1. A second trader, with her own $1 buyer, can also reach the seller. Who ends up with the dollar?",
        options: ["The two traders split it", "The seller", "The buyer"],
        answer: 1,
      }}
      exploreHint="Add the second trader, then let them outbid each other."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Alone, T1 bid $0 and sold for $1, keeping it all. Once T2 could reach the seller with her own $1 buyer, each trader could
            still resell for $1, so each would rather outbid by a cent than lose the item.
          </p>
          <p>
            You watched the bid climb to <strong>{c$(Math.max(peak, 0))}</strong>; the meter still marks it. There it stops: bidding more would lose money. The seller takes the whole
            $1 and the traders keep $0. A second trader doesn&apos;t halve the profit; competition hands it to the seller.
          </p>
          <p className="muted">
            A simplified model after Blume, Easley, Kleinberg and Tardos: traders charge their buyer the full $1, bids move a cent at a time.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const go = (cents: number) => {
              const v = Math.min(TOP, cents);
              setBid(v);
              setPeak((p) => Math.max(p, v));
              if (v === TOP) reach("top");
            };
            const edge = (a: keyof typeof P, b: keyof typeof P, on: boolean, dim = false) => (
              <line x1={P[a].x} y1={P[a].y} x2={P[b].x} y2={P[b].y} className={on ? s.edgeOn : s.edge} opacity={dim ? 0.3 : 1} />
            );
            const L = P[leader];
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: each trader resells to her own $1 buyer</p>
                <svg
                  viewBox="0 0 320 206"
                  className="stage-svg"
                  role="img"
                  aria-label={locked ? "Seller, traders and buyers" : `${leader} leads with ${c$(bid)}; seller gets ${c$(seller)}`}
                >
                  {edge("S", "T1", !locked && leader === "T1")}
                  {edge("T1", "B1", !locked && leader === "T1")}
                  {edge("S", "T2", !locked && two && leader === "T2", !two)}
                  {edge("T2", "B2", !locked && two && leader === "T2", !two)}
                  {!locked && (
                    <g>
                      <rect x={(P.S.x + L.x) / 2 - 30} y={(P.S.y + L.y) / 2 - 11} width={60} height={20} rx={10} className={s.track} />
                      <text x={(P.S.x + L.x) / 2} y={(P.S.y + L.y) / 2 + 4} className={s.small} textAnchor="middle">
                        bid {c$(bid)}
                      </text>
                    </g>
                  )}
                  <Spot id="S" label="S" sub="values $0" on={!locked} />
                  <Spot id="T1" label="T1" sub={locked ? "" : `keeps ${c$(profit.T1)}`} on={!locked && leader === "T1"} />
                  <Spot id="T2" label="T2" sub={!two || locked ? "" : `keeps ${c$(profit.T2)}`} on={!locked && two && leader === "T2"} dim={!two} />
                  <Spot id="B1" label="B1" sub="values $1" on={!locked && leader === "T1"} />
                  <Spot id="B2" label="B2" sub="values $1" on={!locked && two && leader === "T2"} dim={!two} />
                  {/* bid meter */}
                  <rect x={20} y={172} width={280} height={10} rx={5} className={s.track} />
                  {!locked && <rect x={20} y={172} width={(280 * bid) / TOP} height={10} rx={5} className={s.soft} />}
                  <text x={20} y={198} className={s.small}>
                    bid to the seller: {locked ? "?" : c$(bid)}
                  </text>
                  {peak >= 0 && (
                    <g>
                      <line x1={20 + (280 * peak) / TOP} x2={20 + (280 * peak) / TOP} y1={166} y2={186} stroke="var(--fg)" strokeWidth={2} />
                      <text x={300} y={198} className={s.small} textAnchor="end">
                        highest with T2: {c$(peak)}
                      </text>
                    </g>
                  )}
                </svg>
                <Row>
                  <Readout label="Seller gets" value={locked ? "?" : c$(seller)} />
                  <Readout label="T1 keeps" value={locked ? "?" : c$(profit.T1)} />
                  <Readout label="T2 keeps" value={locked ? "?" : two ? c$(profit.T2) : "–"} />
                </Row>
                <p className={s.msg}>
                  {locked
                    ? ""
                    : !two
                      ? "Alone, T1 bids $0 and sells for $1."
                      : bid === TOP
                        ? "At $1.00, outbidding would lose money."
                        : bid === 0
                          ? "Both can resell for $1. Who outbids?"
                          : `${leader} outbids to ${c$(bid)}: still worth it.`}
                </p>
                <Row>
                  <Control
                    className={two ? "active" : ""}
                    disabled={locked || two}
                    onClick={() => {
                      setTwo(true);
                      setBid(0);
                      setPeak((p) => Math.max(p, 0));
                      reach("second");
                    }}
                  >
                    Add T2
                  </Control>
                  <Control disabled={locked || !two || bid >= TOP} onClick={() => go(bid + 1)}>
                    Outbid 1¢
                  </Control>
                  <Control disabled={locked || !two || bid >= TOP} onClick={() => go(bid + 10)}>
                    10 outbids
                  </Control>
                  <Control disabled={locked || !two || bid >= TOP} onClick={() => go(TOP)}>
                    To the end
                  </Control>
                  <Control
                    disabled={locked || !two}
                    onClick={() => {
                      setTwo(false);
                      setBid(0);
                    }}
                  >
                    Remove T2
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
