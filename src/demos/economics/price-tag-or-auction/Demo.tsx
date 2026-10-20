"use client";

// Price tag or auction (E&K ch. 9, section 9.2 unconfirmed). One chart: average revenue against the number
// of bidders, two series (best price tag, second-price auction). It starts at 1 bidder; each bidder chip
// adds its pair of points, so the crossing between 2 and 3 appears only after the learner visits both.
// "Simulate 1,000 sales" runs seeded sales (mulberry32(7), not chosen for its result) at the current count.
// Milestones: 2 bidders, 3 bidders (the question's case: the first count where the auction wins).

import { useState } from "react";
import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { BIDDERS, SALES, auctionRevenue, money, simulate, tagPrice, tagRevenue } from "./model";
import s from "./styles.module.css";

// Chart geometry (viewBox 320 x 196).
const X0 = 70;
const DX = 70;
const YB = 150; // $0
const YT = 30; // $70
const xOf = (n: number) => X0 + (n - 1) * DX;
const yOf = (v: number) => YB - (v / 70) * (YB - YT);

type Sim = { n: number; tag: number; auction: number };

function Stage({ ctx, visited, visit }: { ctx: StageContext; visited: number[]; visit: (n: number) => void }) {
  const { locked } = ctx;
  const { reach } = useMilestones(ctx.interact, ["two", "three"]);
  const [n, setN] = useState(1);
  const [sim, setSim] = useState<Sim | null>(null);

  const choose = (k: number) => {
    if (locked) return;
    setN(k);
    visit(k);
    if (k === 2) reach("two");
    if (k === 3) reach("three");
  };
  const run = () => {
    if (locked) return;
    setSim({ n, ...simulate(n) });
  };

  const shown = BIDDERS.filter((k) => visited.includes(k));
  const tagPts = shown.map((k) => `${xOf(k)},${yOf(tagRevenue(k))}`).join(" ");
  const aucPts = shown.map((k) => `${xOf(k)},${yOf(auctionRevenue(k))}`).join(" ");
  const simHere = sim && sim.n === n ? sim : null;

  return (
    <div className={s.wrap}>
      <svg viewBox="0 0 320 196" className="stage-svg" role="img" aria-label={`Average revenue with ${n} bidders`}>
        {/* legend */}
        <circle cx={132} cy={11} r={5} className={s.tagDot} />
        <text x={142} y={15} className={s.lab}>
          best price tag
        </text>
        <rect x={238} y={6} width={10} height={10} className={s.aucDot} />
        <text x={253} y={15} className={s.lab}>
          auction
        </text>
        {/* axes */}
        {[0, 20, 40, 60].map((v) => (
          <g key={v}>
            <line x1={X0 - 24} x2={xOf(4) + 24} y1={yOf(v)} y2={yOf(v)} className={s.grid} />
            <text x={X0 - 28} y={yOf(v) + 3.5} textAnchor="end" className={s.tick}>
              ${v}
            </text>
          </g>
        ))}
        <text x={4} y={YT - 6} className={s.tick}>
          average revenue
        </text>
        {BIDDERS.map((k) => (
          <g key={k}>
            <text x={xOf(k)} y={YB + 15} textAnchor="middle" className={k === n ? s.tickOn : s.tick}>
              {k}
            </text>
            {visited.includes(k) && (
              <text x={xOf(k)} y={YB + 30} textAnchor="middle" className={s.price}>
                {money(tagPrice(k))}
              </text>
            )}
          </g>
        ))}
        <text x={4} y={YB + 15} className={s.tick}>
          bidders
        </text>
        <text x={4} y={YB + 30} className={s.price}>
          tag price:
        </text>
        {/* series */}
        {shown.length > 1 && <polyline points={tagPts} className={s.tagLine} />}
        {shown.length > 1 && <polyline points={aucPts} className={s.aucLine} />}
        {shown.map((k) => {
          const t = tagRevenue(k);
          const a = auctionRevenue(k);
          const tagAbove = t >= a;
          // Where the two points nearly meet (3 bidders: $47.25 and $50.00), pull the labels apart sideways:
          // the auction's up and to the left, the tag's down and to the right.
          const close = Math.abs(t - a) < 5;
          return (
            <g key={k}>
              <circle cx={xOf(k)} cy={yOf(t)} r={k === n ? 6 : 4.5} className={s.tagDot} />
              <rect x={xOf(k) - 5} y={yOf(a) - 5} width={10} height={10} className={s.aucDot} />
              {close ? (
                <text x={xOf(k) + 9} y={yOf(t) + 14} textAnchor="start" className={s.valTag}>
                  {money(t)}
                </text>
              ) : (
                <text x={xOf(k)} y={yOf(t) + (tagAbove ? -9 : 17)} textAnchor="middle" className={s.valTag}>
                  {money(t)}
                </text>
              )}
              {close ? (
                <text x={xOf(k) - 9} y={yOf(a) - 6} textAnchor="end" className={s.valAuc}>
                  {money(a)}
                </text>
              ) : a < 6 ? (
                <text x={xOf(k) + 9} y={yOf(a) - 4} className={s.valAuc}>
                  {money(a)}
                </text>
              ) : (
                <text x={xOf(k) + (tagAbove ? 8 : 0)} y={yOf(a) + (tagAbove ? 18 : -9)} textAnchor={tagAbove ? "start" : "middle"} className={s.valAuc}>
                  {money(a)}
                </text>
              )}
            </g>
          );
        })}
        {simHere && (
          <g>
            <circle cx={xOf(n) + 14} cy={yOf(simHere.tag)} r={4} className={s.simTag} />
            <rect x={xOf(n) + 10} y={yOf(simHere.auction) - 4} width={8} height={8} className={s.simAuc} />
          </g>
        )}
      </svg>
      <p className={s.status} aria-live="polite">
        {n} {n === 1 ? "bidder" : "bidders"}: tag earns {money(tagRevenue(n))} · auction {money(auctionRevenue(n))}
      </p>
      <p className={s.sim}>
        {simHere ? `${SALES.toLocaleString("en-US")} sales: tag ${money(simHere.tag)} · auction ${money(simHere.auction)}` : ""}
      </p>
      <Row>
        {[2, 3, 4].map((k) => (
          <Control key={k} className={n === k ? "active" : ""} disabled={locked || n === k} onClick={() => choose(k)}>
            {k} bidders
          </Control>
        ))}
        <Control disabled={locked || simHere !== null} onClick={run}>
          Simulate {SALES.toLocaleString("en-US")} sales
        </Control>
      </Row>
    </div>
  );
}

export default function PriceTagOrAuction({ slug }: { slug: string }) {
  const [visited, setVisited] = useState<number[]>([1]);
  const visit = (k: number) => setVisited((v) => (v.includes(k) ? v : [...v, k]));
  const saw2 = visited.includes(2);
  const saw3 = visited.includes(3);
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "You are selling one item, and each bidder values it at random between $0 and $100. What is the fewest bidders for which a second-price auction beats your best price tag on average?",
        options: ["2", "3", "5"],
        answer: 1,
      }}
      exploreHint="Add bidders one count at a time and watch which way earns more."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {saw2 && (
              <>
                With 2 bidders the best tag ({money(tagPrice(2))}) earned {money(tagRevenue(2))} against the auction&apos;s {money(auctionRevenue(2))}.{" "}
              </>
            )}
            {saw3 && (
              <>
                With 3 the auction won, {money(auctionRevenue(3))} to {money(tagRevenue(3))}.
              </>
            )}
          </p>
          <p>
            A tag set knowing only the $0–$100 range is a guess: too high and nobody buys, too low and money is left on the table. An auction
            with no reserve lets the second-highest bidder set the price, and that gets better with every rival.
          </p>
        </>
      )}
    >
      {(ctx) => <Stage ctx={ctx} visited={visited} visit={visit} />}
    </Lesson>
  );
}
