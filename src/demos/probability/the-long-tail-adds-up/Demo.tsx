"use client";

// Zipf sales: 100,000 items, item of rank r sells in proportion to 1/r. Share of the top n =
// H(n) / H(100,000), H = harmonic sum. Builder's Node run (2026-10-14): top 1 8.27%, top 10 24.23%,
// top 100 42.91%, top 1,000 61.91%, top 10,000 80.96%. Decades 1–10, 11–100, 101–1,000,
// 1,001–10,000, 10,001–100,000: 24.23, 18.68, 19.01, 19.04, 19.04 (%).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const ITEMS = 100000;
const CUM = (() => {
  const c = new Float64Array(ITEMS + 1);
  for (let r = 1; r <= ITEMS; r++) c[r] = c[r - 1] + 1 / r;
  return c;
})();
const TOTAL = CUM[ITEMS];
const share = (a: number, b: number) => (CUM[b] - CUM[a - 1]) / TOTAL; // ranks a..b inclusive

const CUTS = [1, 10, 100, 1000, 10000];
const DECADES = [
  { a: 1, b: 10, label: "1–10" },
  { a: 11, b: 100, label: "11–100" },
  { a: 101, b: 1000, label: "101–1k" },
  { a: 1001, b: 10000, label: "1k–10k" },
  { a: 10001, b: 100000, label: "10k–100k" },
];
const pct = (x: number) => `${(100 * x).toFixed(1)}%`;
const n = (x: number) => x.toLocaleString("en-US");

// chart
const W = 320;
const H = 200;
const L = 14;
const B = 164;
const TOP = 22;
const YMAX = 0.3;
const bw = (W - 2 * L) / DECADES.length;
const hOf = (v: number) => ((B - TOP) * v) / YMAX;

export default function TheLongTailAddsUp({ slug }: { slug: string }) {
  const [cut, setCut] = useState(1); // index into CUTS: top 10
  const top = CUTS[cut];
  const head = share(1, top);
  const top1000 = share(1, 1000);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "You run an online store with 100,000 items. Your #2 item sells half as much as #1, #3 a third, and so on. What share of sales do your top 1,000 take?",
        options: ["About 99%", "About 62%", "About 10%"],
        answer: 1,
      }}
      exploreHint="Slide the cutoff and watch how much of each bar the hits take."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            The top 1,000 took {pct(top1000)}. The other 99,000 items, each selling under 1/1,000 as much as the best
            seller, still took {pct(1 - top1000)}.
          </p>
          <p>
            Look at the bars: items 1,001–10,000 sell about as much in total as items 11–100 ({pct(share(1001, 10000))} vs{" "}
            {pct(share(11, 100))}), and so do items 10,001–100,000. Each tenfold stretch of ranks adds about the same.
            A store that can stock them all gains over a third of its sales from items a small shelf would drop.
          </p>
          <p>The name &ldquo;long tail&rdquo; was popularised by Chris Anderson. The 1/rank curve is a model, not any store&apos;s data.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["moved", "top-1000"]}>
          {(reach) => (
            <div className={s.wrap}>
              <p className={s.note}>
                {locked ? "Share of all sales by rank range." : `Top ${n(top)} (coloured) vs the other ${n(ITEMS - top)} items.`}
              </p>
              <svg viewBox={`0 0 ${W} ${H}`} className="stage-svg" role="img" aria-label="Share of sales per rank range">
                <line x1={L} y1={B} x2={W - L} y2={B} stroke="var(--line)" strokeWidth={1.5} />
                {DECADES.map((d, i) => {
                  const x = L + i * bw + 5;
                  const w = bw - 10;
                  const all = share(d.a, d.b);
                  const inHead = top >= d.a ? share(d.a, Math.min(d.b, top)) : 0;
                  return (
                    <g key={d.a}>
                      {!locked ? (
                        <>
                          <rect x={x} y={B - hOf(all)} width={w} height={hOf(all)} rx={2} fill="var(--good)" opacity={0.45} />
                          {inHead > 0 && (
                            <rect x={x} y={B - hOf(inHead)} width={w} height={hOf(inHead)} rx={2} fill="var(--domain)" />
                          )}
                          <text x={x + w / 2} y={B - hOf(all) - 5} textAnchor="middle" className={s.val}>
                            {pct(all)}
                          </text>
                        </>
                      ) : (
                        <text x={x + w / 2} y={B - 8} textAnchor="middle" className={s.val}>
                          ?
                        </text>
                      )}
                      <text x={x + w / 2} y={B + 14} textAnchor="middle" className={s.tick}>
                        {d.label}
                      </text>
                    </g>
                  );
                })}
                <text x={L} y={12} className={s.tick}>
                  % of all sales
                </text>
                <text x={W - L} y={H - 6} textAnchor="end" className={s.tick}>
                  items, by sales rank
                </text>
              </svg>
              <Slider
                label="Hits: the top"
                value={cut}
                min={0}
                max={CUTS.length - 1}
                disabled={locked}
                format={(v) => `${n(CUTS[v])} item${CUTS[v] === 1 ? "" : "s"}`}
                onChange={(v) => {
                  if (locked) return;
                  setCut(v);
                  reach("moved");
                  if (CUTS[v] === 1000) reach("top-1000");
                }}
              />
              <Row>
                <Readout label={`Top ${n(top)}`} value={locked ? "?" : pct(head)} />
                <Readout label={`Other ${n(ITEMS - top)}`} value={locked ? "?" : pct(1 - head)} />
                <Readout label={`Item #${n(top + 1)} sells`} value={`1/${n(top + 1)} of #1`} />
              </Row>
            </div>
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
