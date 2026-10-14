"use client";

// The same six items stored two ways, shown one at a time (a toggle, one picture at a time):
// a row of numbered slots (an array) and a chain of boxes joined by arrows (a linked list).
// Inserting at the front of the row slides all 6 items one slot right; in the chain it moves
// nothing (two arrows are set). Reaching item 4 is one jump in the row and 3 hops in the chain.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const ITEMS = ["A", "B", "C", "D", "E", "F"];
const NEW = "N";
const TARGET = 4; // "go to item 4"
const ROW_MOVES = ITEMS.length; // every existing item slides one slot right
const CHAIN_MOVES = 0; // nothing moves; the new box's arrow and the start arrow are set
const CHAIN_ARROWS = 2;
const HOPS = TARGET - 1; // from item 1, follow TARGET - 1 arrows
type View = "row" | "chain";
type Seen = { rowInsert: boolean; chainInsert: boolean; rowGo: boolean; chainGo: boolean };

// geometry (viewBox 340 wide)
const W = 38;
const GAP = 8;
const slotX = (i: number) => 6 + i * (W + GAP);
const CW = 32;
const CGAP = 15;
const nodeX = (i: number) => 22 + i * (CW + CGAP);

export default function InsertAtFrontCost({ slug }: { slug: string }) {
  const [view, setView] = useState<View>("row");
  // One list, shown two ways: inserting and going to item 4 apply to the row and the chain alike.
  const [r, setR] = useState({ inserted: false, went: false });
  const [seen, setSeen] = useState<Seen>({ rowInsert: false, chainInsert: false, rowGo: false, chainGo: false });
  const items = r.inserted ? [NEW, ...ITEMS] : ITEMS;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A row of ${ITEMS.length} items sits in numbered slots, side by side. A new item must go at the front. How many existing items must move?`,
        options: ["1", String(ROW_MOVES), String(ROW_MOVES + 1)],
        answer: 1,
      }}
      exploreHint="Insert at the front, switch views, go to item 4. Check both."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            In the row, putting {NEW} first moved all <strong>{ROW_MOVES}</strong> items one slot right: slot 1 was
            taken, so everything behind it had to shift.
            {seen.chainGo ? ` In the chain, reaching item ${TARGET} took ${HOPS} hops along the arrows.` : ""}
            {seen.chainInsert ? ` Inserting at the chain's front moved nothing; ${CHAIN_ARROWS} arrows changed.` : ""}
            {seen.rowGo ? ` In the row, slot ${TARGET} was a single jump.` : ""}
          </p>
          <p>
            A row (an array) makes reaching any slot instant but inserting at the front costly. A chain (a linked list)
            does the opposite: inserting is cheap, reaching item k takes k − 1 hops.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["row-insert", "chain-insert", "chain-walk"]}>
          {(reach) => {
            // Record what the learner has now looked at in the view they are on.
            const look = (v: View, inserted: boolean, went: boolean) => {
              const n = { ...seen };
              if (inserted) {
                if (v === "row") n.rowInsert = true;
                else n.chainInsert = true;
              }
              if (went) {
                if (v === "row") n.rowGo = true;
                else n.chainGo = true;
              }
              setSeen(n);
              if (inserted && v === "row") reach("row-insert");
              if (inserted && v === "chain") reach("chain-insert");
              if (went && v === "chain") reach("chain-walk");
            };
            const insert = () => {
              if (locked || r.inserted) return;
              setR({ inserted: true, went: false });
              look(view, true, false);
            };
            const go = () => {
              if (locked || r.went) return;
              setR({ ...r, went: true });
              look(view, r.inserted, true);
            };
            const flip = () => {
              if (locked) return;
              const nv = view === "row" ? "chain" : "row";
              setView(nv);
              look(nv, r.inserted, r.went);
            };
            const moved = r.inserted ? (view === "row" ? ROW_MOVES : CHAIN_MOVES) : 0;
            const steps = r.went ? (view === "row" ? 1 : HOPS) : 0;
            const msg = locked
              ? "Make a prediction to start."
              : view === "row"
                ? r.went
                  ? `Slot ${TARGET}: one jump, straight there.`
                  : r.inserted
                    ? `All ${ROW_MOVES} slid right to free slot 1.`
                    : "Row: items sit in numbered slots, side by side."
                : r.went
                  ? `Item ${TARGET}: ${HOPS} hops along the arrows.`
                  : r.inserted
                    ? `Nothing moved. ${CHAIN_ARROWS} arrows changed.`
                    : "Chain: each box points to the next.";
            return (
              <div className={s.wrap}>
                <p className={s.msg} aria-live="polite">{msg}</p>
                <svg viewBox="0 0 340 120" className="stage-svg" role="img"
                  aria-label={`${view === "row" ? "Row of slots" : "Chain of boxes"}: ${items.join(", ")}`}>
                  <defs>
                    <marker id="ifc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="9" markerHeight="9" orient="auto">
                      <path d="M0,0 L10,5 L0,10 z" fill="var(--muted)" />
                    </marker>
                  </defs>
                  {view === "row" ? (
                    <>
                      {Array.from({ length: ITEMS.length + 1 }, (_, i) => (
                        <g key={`s${i}`}>
                          <rect x={slotX(i)} y={40} width={W} height={W} rx={6} className={`${s.slot} ${r.went && i === TARGET - 1 ? s.target : ""}`} />
                          <text x={slotX(i) + W / 2} y={96} className={s.idx}>{i + 1}</text>
                        </g>
                      ))}
                      {ITEMS.map((it, i) => {
                        const at = r.inserted ? i + 1 : i;
                        return (
                          <g key={it} className={s.mover} style={{ transform: `translateX(${slotX(at) - slotX(i)}px)` }}>
                            <rect x={slotX(i) + 3} y={43} width={W - 6} height={W - 6} rx={5} className={`${s.item} ${r.inserted ? s.movedItem : ""}`} />
                            <text x={slotX(i) + W / 2} y={65} className={s.label}>{it}</text>
                          </g>
                        );
                      })}
                      {r.inserted && (
                        <g>
                          <rect x={slotX(0) + 3} y={43} width={W - 6} height={W - 6} rx={5} className={s.newItem} />
                          <text x={slotX(0) + W / 2} y={65} className={s.label}>{NEW}</text>
                        </g>
                      )}
                      {r.inserted && <text x={170} y={24} className={s.noteMid}>each moved one slot →</text>}
                    </>
                  ) : (
                    <>
                      <text x={4} y={30} className={s.note}>start</text>
                      <path d={`M 16 34 L ${nodeX(0) + CW / 2} 46`} className={`${s.arrow} ${r.inserted ? s.changed : ""}`} markerEnd="url(#ifc-arrow)" />
                      {items.map((it, i) => (
                        <g key={it}>
                          <rect x={nodeX(i)} y={50} width={CW} height={CW} rx={6}
                            className={`${it === NEW ? s.newItem : s.item} ${r.went && i === TARGET - 1 ? s.target : ""}`} />
                          <text x={nodeX(i) + CW / 2} y={71} className={s.label}>{it}</text>
                          {i < items.length - 1 && (
                            <line x1={nodeX(i) + CW} y1={66} x2={nodeX(i + 1) - 1} y2={66}
                              className={`${s.arrow} ${it === NEW ? s.changed : ""} ${r.went && i < HOPS ? s.hop : ""}`} markerEnd="url(#ifc-arrow)" />
                          )}
                          {r.went && i < HOPS && (
                            <text x={nodeX(i) + CW + CGAP / 2} y={100} className={s.hopNum}>{i + 1}</text>
                          )}
                        </g>
                      ))}
                    </>
                  )}
                </svg>
                <Row>
                  <Readout label="Items moved" value={locked ? "–" : moved} />
                  <Readout label={`Steps to item ${TARGET}`} value={locked || !r.went ? "–" : steps} />
                </Row>
                <Row>
                  <Control disabled={locked || r.inserted} onClick={insert}>Insert {NEW} at front</Control>
                  <Control disabled={locked} onClick={flip}>{view === "row" ? "Switch to chain" : "Switch to row"}</Control>
                  <Control disabled={locked || r.went} onClick={go}>Go to item {TARGET}</Control>
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
