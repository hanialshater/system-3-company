"use client";

// A 50 kg bag, three items. The learner packs by hand (tap an item to put it in or take it out), beats
// "best value per kilo first" with whole items, then flips "items can be cut" and sees ratio-first win.
// Two bags, one per mode; each keeps what the learner left in it. Nothing here is random.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const CAP = 50;
type Item = { id: "a" | "b" | "c"; kg: number; usd: number; pat: string };
// DOM order 10 - 30 - 20: taking out the 10 and putting in the 30 is two presses.
const ITEMS: Item[] = [
  { id: "a", kg: 10, usd: 60, pat: "none" },
  { id: "b", kg: 30, usd: 120, pat: "diag" },
  { id: "c", kg: 20, usd: 100, pat: "dots" },
];
const ITEM = Object.fromEntries(ITEMS.map((i) => [i.id, i])) as Record<Item["id"], Item>;

// A bag: the order items went in (bottom first) and how many kg of each.
type Bag = { order: Item["id"][]; kg: Partial<Record<Item["id"], number>> };
const WHOLE_START: Bag = { order: ["a", "c"], kg: { a: 10, c: 20 } }; // ratio first, whole items: $160
const CUT_START: Bag = { order: ["a", "c", "b"], kg: { a: 10, c: 20, b: 20 } }; // ratio first, cutting: $240

const weight = (b: Bag) => b.order.reduce((t, id) => t + (b.kg[id] ?? 0), 0);
const money = (b: Bag) => b.order.reduce((t, id) => t + (ITEM[id].usd * (b.kg[id] ?? 0)) / ITEM[id].kg, 0);

// Y scale: 4 px per kg.
const PX = 4;
const BAG_X = 10;
const BAG_W = 130;
const TOP = 30;
const BAG_H = CAP * PX;
const SHELF_X = 178;
const SHELF_W = 132;

function recordText(r: { usd: number; ids: Item["id"][] | null }) {
  if (!r.ids) return `$${r.usd} (ratio first)`;
  return `$${r.usd} (${r.ids
    .map((i) => ITEM[i].kg)
    .sort((x, y) => x - y)
    .join(" + ")} kg)`;
}

export default function KnapsackRatioTrap({ slug }: { slug: string }) {
  const [cut, setCut] = useState(false);
  const [whole, setWhole] = useState<Bag>(WHOLE_START);
  const [cutBag, setCutBag] = useState<Bag>(CUT_START);
  const [record, setRecord] = useState<{ usd: number; ids: Item["id"][] | null }>({ usd: 160, ids: null });
  const [tried, setTried] = useState<Item["id"] | null>(null);

  const bag = cut ? cutBag : whole;
  const kg = weight(bag);
  const usd = Math.round(money(bag));
  const free = CAP - kg;
  const tryItem = tried ? ITEM[tried] : null;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A bag holds 50 kg. Items: 10 kg worth $60, 20 kg worth $100, 30 kg worth $120. Whole items only. Best value per kilo first gives $160. What is the best possible?",
        options: ["$160", "$220", "$240"],
        answer: 1,
      }}
      exploreHint="Tap items in and out of the bag. Then try turning on “Items can be cut”."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Ratio first packed 10 + 20 kg for <strong>$160</strong> and left 20 kg empty, because the 30 kg item would not
            go in. Your best whole-item bag, {record.ids ? record.ids.map((i) => ITEM[i].kg).sort((x, y) => x - y).join(" + ") : "20 + 30"} kg,
            filled it: <strong>${record.usd}</strong>.
          </p>
          <p>
            When items could be cut, ratio first poured in two thirds of the 30 kg item and got <strong>$240</strong>, and
            nothing beats that.
          </p>
          <p className="muted">
            Whole items leave gaps, so the best bag has to be found by trying combinations. Dynamic programming does that
            without trying all of them.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["whole-220", "cut-seen"]}>
          {(reach) => {
            const press = (it: Item) => {
              if (locked) return;
              const cur = bag.kg[it.id] ?? 0;
              if (cur > 0) {
                const next: Bag = { order: bag.order.filter((x) => x !== it.id), kg: { ...bag.kg, [it.id]: 0 } };
                setTried(null);
                (cut ? setCutBag : setWhole)(next);
                return;
              }
              const room = CAP - weight(bag);
              const put = cut ? Math.min(it.kg, room) : it.kg <= room ? it.kg : 0;
              if (put <= 0) {
                setTried(it.id); // it hovers over the bag; the bag does not change
                return;
              }
              const next: Bag = { order: [...bag.order, it.id], kg: { ...bag.kg, [it.id]: put } };
              setTried(null);
              if (cut) {
                setCutBag(next);
                return;
              }
              setWhole(next);
              const v = Math.round(money(next));
              if (v > record.usd) setRecord({ usd: v, ids: next.order });
              if (v === 220 && weight(next) === CAP) reach("whole-220");
            };
            const flip = () => {
              if (locked) return;
              setTried(null);
              setCut(!cut);
              if (!cut) reach("cut-seen");
            };

            // Stack from the bottom.
            let yBottom = TOP + BAG_H;
            const blocks = bag.order
              .filter((id) => (bag.kg[id] ?? 0) > 0)
              .map((id) => {
                const it = ITEM[id];
                const k = bag.kg[id] ?? 0;
                const h = k * PX;
                yBottom -= h;
                return { it, k, h, y: yBottom };
              });
            const gapH = free * PX;

            // Shelf slots are fixed per item, so the shelf never reflows.
            let sy = TOP;
            const slots = ITEMS.map((it) => {
              const y = sy;
              sy += it.kg * PX + 6;
              return { it, y };
            });

            return (
              <div className={s.wrap}>
                <p className={s.model}>Bag holds 50 kg. Tap an item to pack it.</p>
                <p className={s.packed} aria-live="polite">
                  Packed {kg}/{CAP} kg · ${usd}
                </p>
                <svg
                  viewBox={`0 0 320 ${sy - 6 + 8}`}
                  className="stage-svg"
                  role="img"
                  aria-label={`Bag packed ${kg} of 50 kg, worth ${usd} dollars`}
                >
                  <defs>
                    {ITEMS.map((it) => (
                      <pattern key={it.id} id={`${slug}-p-${it.id}`} width="8" height="8" patternUnits="userSpaceOnUse">
                        <rect width="8" height="8" fill="color-mix(in srgb, var(--domain) 30%, var(--bg-2))" />
                        {it.pat === "diag" && <path d="M-2 2 L2 -2 M0 8 L8 0 M6 10 L10 6" stroke="var(--domain)" strokeWidth="1.5" />}
                        {it.pat === "dots" && <circle cx="4" cy="4" r="1.5" fill="var(--domain)" />}
                      </pattern>
                    ))}
                    <pattern id={`${slug}-gap`} width="8" height="8" patternUnits="userSpaceOnUse">
                      <path d="M-2 2 L2 -2 M0 8 L8 0 M6 10 L10 6" stroke="var(--line)" strokeWidth="1" />
                    </pattern>
                  </defs>

                  {/* the bag, drawn to scale: 4 px per kg, ticks every 10 kg */}
                  <text x={BAG_X + BAG_W / 2} y={TOP - 8} textAnchor="middle" className={s.cap}>
                    50 kg
                  </text>
                  <rect x={BAG_X} y={TOP} width={BAG_W} height={BAG_H} fill="none" stroke="var(--fg)" strokeWidth="2" />
                  {[10, 20, 30, 40].map((t) => (
                    <line key={t} x1={BAG_X + BAG_W} x2={BAG_X + BAG_W + 5} y1={TOP + BAG_H - t * PX} y2={TOP + BAG_H - t * PX} stroke="var(--muted)" />
                  ))}
                  {gapH > 0 && (
                    <g>
                      <rect x={BAG_X + 1} y={TOP + 1} width={BAG_W - 2} height={Math.max(0, gapH - 1)} fill={`url(#${slug}-gap)`} />
                      <text x={BAG_X + BAG_W / 2} y={TOP + gapH / 2 + 4} textAnchor="middle" className={s.gap}>
                        {free} kg empty
                      </text>
                    </g>
                  )}
                  {blocks.map(({ it, k, h, y }) => (
                    <g key={it.id}>
                      <rect x={BAG_X + 1} y={y} width={BAG_W - 2} height={h} fill={`url(#${slug}-p-${it.id})`} stroke="var(--fg)" />
                      <rect x={BAG_X + 8} y={y + h / 2 - 8} width={BAG_W - 16} height={16} rx={3} fill="var(--bg-2)" opacity={0.92} />
                      <text x={BAG_X + BAG_W / 2} y={y + h / 2 + 4} textAnchor="middle" className={s.blk}>
                        {k < it.kg ? `${k} of ${it.kg} kg · $${Math.round((it.usd * k) / it.kg)}` : `${it.kg} kg · $${it.usd}`}
                      </text>
                      {k < it.kg && (
                        <line x1={BAG_X + 1} x2={BAG_X + BAG_W - 1} y1={y} y2={y} stroke="var(--fg)" strokeWidth="2" strokeDasharray="5 3" />
                      )}
                    </g>
                  ))}

                  {/* the shelf: a fixed slot per item; a dashed outline marks one that is in the bag */}
                  {slots.map(({ it, y }) => {
                    const inBag = (bag.kg[it.id] ?? 0) > 0;
                    const h = it.kg * PX;
                    const hover = tried === it.id;
                    return (
                      <g key={it.id}>
                        {inBag ? (
                          <>
                            <rect x={SHELF_X} y={y} width={SHELF_W} height={h} fill="none" stroke="var(--line)" strokeDasharray="4 3" />
                            <text x={SHELF_X + SHELF_W / 2} y={y + h / 2 + 4} textAnchor="middle" className={s.ghost}>
                              in the bag
                            </text>
                          </>
                        ) : (
                          <>
                            <rect
                              x={SHELF_X - (hover ? 24 : 0)}
                              y={y}
                              width={SHELF_W}
                              height={h}
                              fill={`url(#${slug}-p-${it.id})`}
                              stroke={hover ? "var(--bad)" : "var(--fg)"}
                              strokeWidth={hover ? 2.5 : 1}
                              strokeDasharray={hover ? "5 3" : undefined}
                            />
                            <rect x={SHELF_X + 6 - (hover ? 24 : 0)} y={y + h / 2 - 15} width={SHELF_W - 12} height={30} rx={3} fill="var(--bg-2)" opacity={0.92} />
                            <text x={SHELF_X + SHELF_W / 2 - (hover ? 24 : 0)} y={y + h / 2 - 2} textAnchor="middle" className={s.blk}>
                              {it.kg} kg · ${it.usd}
                            </text>
                            <text x={SHELF_X + SHELF_W / 2 - (hover ? 24 : 0)} y={y + h / 2 + 10} textAnchor="middle" className={s.ratio}>
                              ${it.usd / it.kg}/kg
                            </text>
                          </>
                        )}
                      </g>
                    );
                  })}
                </svg>
                <p className={s.need} aria-live="polite">
                  {tryItem ? `Needs ${tryItem.kg} kg, ${free} kg empty.` : " "}
                </p>
                <p className={s.record}>
                  Best whole-item bag so far: <strong>{recordText(record)}</strong>
                </p>
                <Row>
                  {ITEMS.map((it) => (
                    <Control
                      key={it.id}
                      className={s.tap}
                      aria-pressed={(bag.kg[it.id] ?? 0) > 0}
                      disabled={locked}
                      onClick={() => press(it)}
                    >
                      {it.kg} kg · ${it.usd}
                    </Control>
                  ))}
                  <Control className={`${s.tap} ${s.toggle} ${cut ? "active" : ""}`} aria-pressed={cut} disabled={locked} onClick={flip}>
                    Items can be cut: {cut ? "on" : "off"}
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
