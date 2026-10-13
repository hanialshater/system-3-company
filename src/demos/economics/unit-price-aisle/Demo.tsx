"use client";

// Unit pricing. One picture: three rice packs drawn to size, each with a bar for its price per 100 g
// that appears when the learner "pours" the pack. Money is kept in cents to stay exact.
// Key state: all three bars drawn at the shelf prices (70, 68, 70 cents per 100 g); the 750 g is lowest.
// Then a slider re-prices the 1.2 kg pack. Prices are invented.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const PACKS = [
  { grams: 500, cents: 350, name: "500 g" },
  { grams: 750, cents: 510, name: "750 g" },
  { grams: 1200, cents: 840, name: "1.2 kg" },
];
const BIG = 2;
const BIG_MIN = 720;
const BIG_MAX = 960;
const BIG_STEP = 12; // one cent per 100 g on the 1.2 kg pack
const MILESTONES = ["all-three"] as const;

const per100 = (cents: number, grams: number) => (cents * 100) / grams;
const usd = (cents: number) => `$${(cents / 100).toFixed(2)}`;
const SHELF = PACKS.map((p) => per100(p.cents, p.grams));
const CHEAPEST = SHELF.indexOf(Math.min(...SHELF)); // 1

// Geometry (viewBox 320 × 210).
const CX = [60, 160, 260];
const PACK_BOT = 78;
const BAR_BOT = 222;
const BAR_MAX_CENTS = 80;
const BAR_H = 70;

export default function UnitPriceAisle({ slug }: { slug: string }) {
  const [poured, setPoured] = useState<boolean[]>([false, false, false]);
  const [bigCents, setBigCents] = useState(PACKS[BIG].cents);
  const [moved, setMoved] = useState(false);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Three packs of the same rice: ${PACKS.map((p) => `${p.name} for ${usd(p.cents)}`).join(", ")}. Which is cheapest per 100 g?`,
        options: PACKS.map((p) => p.name),
        answer: CHEAPEST,
      }}
      exploreHint="Pour all three packs into 100 g cups."
      minInteractions={MILESTONES.length}
      reveal={() => {
        const now = per100(bigCents, PACKS[BIG].grams);
        return (
          <>
            <p>
              Poured out, the packs cost {SHELF.map((v) => usd(v)).join(", ")} per 100 g. The{" "}
              <strong>{PACKS[CHEAPEST].name}</strong> pack was cheapest; the biggest pack cost the same rate as the smallest.
              {moved && ` At ${usd(bigCents)} the 1.2 kg pack worked out to ${usd(now)} per 100 g.`}
            </p>
            <p>
              The sticker price tells you what you pay; the size tells you what you get. Only dividing one by the other gives
              the rate, and that rate need not fall as the pack grows.
            </p>
            <p className="muted">Prices are invented. A unit price ignores waste and storage: a lower rate only helps if you use it all.</p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const all = poured.every(Boolean);
            const rates = PACKS.map((p, i) => per100(i === BIG ? bigCents : p.cents, p.grams));
            const low = Math.min(...rates.filter((_, i) => poured[i]));
            const pour = (i: number) => {
              const next = poured.map((v, j) => v || j === i);
              setPoured(next);
              if (next.every(Boolean)) reach("all-three");
            };
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Made-up prices · cost per 100 g</p>
                <svg viewBox="0 0 320 232" className="stage-svg" role="img" aria-label="Three rice packs and their price per 100 g">
                  {PACKS.map((p, i) => {
                    const h = (p.grams / 1200) * 52;
                    const w = 26 + (p.grams / 1200) * 30;
                    const cents = i === BIG ? bigCents : p.cents;
                    const r = rates[i];
                    const bh = (r / BAR_MAX_CENTS) * BAR_H;
                    const best = poured[i] && r === low && all;
                    return (
                      <g key={p.name}>
                        <rect x={CX[i] - w / 2} y={PACK_BOT - h} width={w} height={h} rx={4} className={poured[i] ? s.ghostFill : s.soft} />
                        <text x={CX[i]} y={PACK_BOT + 15} textAnchor="middle" className={s.value}>
                          {p.name}
                        </text>
                        <text x={CX[i]} y={PACK_BOT + 30} textAnchor="middle" className={s.axis}>
                          {usd(cents)}
                        </text>
                        {!locked && poured[i] && (
                          <>
                            <rect x={CX[i] - 22} y={BAR_BOT - bh} width={44} height={bh} className={best ? s.goodFill : s.soft} />
                            <text x={CX[i]} y={BAR_BOT - bh - 6} textAnchor="middle" className={s.big}>
                              {usd(r)}
                            </text>
                          </>
                        )}
                      </g>
                    );
                  })}
                  <line x1={14} y1={BAR_BOT} x2={306} y2={BAR_BOT} stroke="var(--line)" />
                </svg>

                <Row>
                  <span className={s.rowLabel}>Pour:</span>
                  {PACKS.map((p, i) => (
                    <Control
                      key={p.name}
                      className={poured[i] ? "active" : ""}
                      disabled={locked || poured[i]}
                      aria-pressed={poured[i]}
                      aria-label={`Pour the ${p.name} pack`}
                      onClick={() => pour(i)}
                    >
                      {p.name}
                    </Control>
                  ))}
                </Row>
                <Slider
                  label="1.2 kg price"
                  value={bigCents}
                  min={BIG_MIN}
                  max={BIG_MAX}
                  step={BIG_STEP}
                  disabled={locked || !all}
                  format={usd}
                  onChange={(v) => {
                    setBigCents(v);
                    setMoved(true);
                  }}
                />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
