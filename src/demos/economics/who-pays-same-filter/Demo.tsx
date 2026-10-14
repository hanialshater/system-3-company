"use client";

// Coase theorem, two rights assignments stacked (spec: company/design/specs/who-pays-same-filter.md).
// Smoke costs a laundry D = $300 a year; a chimney filter costs F = $100 a year.
// Panel 1, "Right to pollute": the learner is the laundry and offers the factory money to fit the filter.
//   A deal needs both sides to gain strictly: factory gain (offer - F) > 0 and laundry net (-offer) > -D.
//   $50 is refused (factory -$50), $200 is a deal (factory +$100, laundry -$200, total -$100),
//   $350 is refused by the laundry (-$350 is worse than -$300 of smoke).
// Panel 2, "Right to clean air": the factory is liable and chooses: pay $300 damages or fit the $100 filter.
// Rule: a side keeps the best outcome it has seen, so no press order undoes a fitted filter.
// Key states (milestones): the deal struck in panel 1, the filter fitted by the liable factory in panel 2.
// Model (lesson rule): two sides, free bargaining, costs known.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const D = 300; // smoke damage to the laundry, $ a year
const F = 100; // filter cost, $ a year
const OFFERS = [50, 200, 350] as const;
const MILESTONES = ["deal-struck", "liable-fits"] as const;

/** The factory accepts only if it gains; the laundry pays only if it ends up better than living with the smoke. */
const factoryAccepts = (offer: number) => offer - F > 0;
const laundryGains = (offer: number) => -offer > -D;

// Ruler: $0 to $375 at 0.8 px per $, one x-origin for both panels.
const X0 = 20;
const PX = 0.8;
const rx = (v: number) => X0 + PX * v;
// Total bars: 0.4 px per $, one x-origin for both panels.
const BAR0 = 64;
const BAR = 0.4;

const money = (v: number) => (v > 0 ? `+$${v}` : v < 0 ? `−$${-v}` : "$0");

type Mark = { at: number; ok: boolean };
type Flash = { n: number; who: "factory" | "laundry"; text: string } | null;
type Arrow = { amount: number; kind: "to-factory" | "to-laundry" | "to-filter" } | null;

function Panel({
  id,
  title,
  filtered,
  marks,
  band,
  arrow,
  factoryNet,
  laundryNet,
  flash,
}: {
  id: string;
  title: string;
  filtered: boolean;
  marks: Mark[];
  band: boolean;
  arrow: Arrow;
  factoryNet: number | null;
  laundryNet: number | null;
  flash: Flash;
}) {
  const total = factoryNet === null || laundryNet === null ? null : factoryNet + laundryNet;
  return (
    <svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={title}>
      <defs>
        <pattern id={`${id}-mesh`} width="4" height="4" patternUnits="userSpaceOnUse">
          <path d="M0 0L4 4M4 0L0 4" className={s.meshLine} />
        </pattern>
        <marker id={`${id}-head`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" className={s.headFill} />
        </marker>
      </defs>

      <text x={X0} y={13} className={s.title}>
        {title}
      </text>

      {/* Factory, chimney and filter slot */}
      <rect x={20} y={52} width={62} height={28} rx={3} className={s.block} />
      <rect x={56} y={38} width={14} height={14} className={s.block} />
      <rect
        x={53}
        y={30}
        width={20}
        height={8}
        rx={1.5}
        className={filtered ? s.filterOn : s.filterSlot}
        fill={filtered ? `url(#${id}-mesh)` : "none"}
      />
      <text x={78} y={27} className={s.tag}>
        filter $100 a year
      </text>

      {/* Smoke ribbon: drifts onto the laundry unless the filter is fitted */}
      {filtered ? (
        <path d="M63 29 q-3 -4 0 -7" className={s.smokeStub} />
      ) : (
        <path d="M63 30 Q 90 50 125 48 T 185 54 T 246 64" className={s.smoke} />
      )}

      {/* Laundry with a washing line */}
      <rect x={250} y={62} width={70} height={18} rx={3} className={s.block} />
      <line x1={256} y1={62} x2={256} y2={50} className={s.pole} />
      <line x1={314} y1={62} x2={314} y2={50} className={s.pole} />
      <line x1={256} y1={51} x2={314} y2={51} className={s.pole} />
      {[266, 282, 298].map((x) => (
        <path key={x} d={`M${x - 5} 51 h10 v8 h-10 z`} className={s.shirt} />
      ))}
      <text x={320} y={44} className={s.tag} textAnchor="end">
        smoke $300 a year
      </text>

      {/* Money arrow */}
      {arrow?.kind === "to-factory" && (
        <g>
          <line x1={246} y1={74} x2={86} y2={74} className={s.arrow} markerEnd={`url(#${id}-head)`} />
          <text x={166} y={70} className={s.arrowText} textAnchor="middle">
            ${arrow.amount}
          </text>
        </g>
      )}
      {arrow?.kind === "to-laundry" && (
        <g>
          <line x1={86} y1={74} x2={246} y2={74} className={s.arrow} markerEnd={`url(#${id}-head)`} />
          <text x={166} y={70} className={s.arrowText} textAnchor="middle">
            ${arrow.amount}
          </text>
        </g>
      )}
      {arrow?.kind === "to-filter" && (
        <g>
          <path d="M30 51 Q 32 34 50 34" className={s.arrow} markerEnd={`url(#${id}-head)`} />
          <text x={22} y={42} className={s.arrowText} textAnchor="end">
            ${arrow.amount}
          </text>
        </g>
      )}

      {/* Names and nets */}
      <text x={51} y={94} className={s.name} textAnchor="middle">
        Factory
      </text>
      <text x={285} y={94} className={s.name} textAnchor="middle">
        Laundry
      </text>
      <text x={51} y={108} className={s.value} textAnchor="middle">
        {factoryNet === null ? "?" : money(factoryNet)}
      </text>
      <text x={285} y={108} className={s.value} textAnchor="middle">
        {laundryNet === null ? "?" : money(laundryNet)}
      </text>
      {flash && (
        <text
          key={flash.n}
          x={flash.who === "factory" ? 92 : 240}
          y={108}
          className={s.flash}
          textAnchor={flash.who === "factory" ? "start" : "end"}
        >
          {flash.text}
        </text>
      )}

      {/* Ruler, $ a year */}
      {band && (
        <g>
          <rect x={rx(F)} y={114} width={rx(D) - rx(F)} height={28} className={s.band} />
          <text x={rx(F) + 4} y={139} className={s.bandText}>
            both gain
          </text>
        </g>
      )}
      <line x1={rx(0)} y1={142} x2={rx(375)} y2={142} className={s.rule} />
      {[0, 100, 200, 300].map((v) => (
        <g key={v}>
          <line x1={rx(v)} y1={139} x2={rx(v)} y2={145} className={s.rule} />
          <text x={rx(v)} y={155} className={s.tick} textAnchor="middle">
            ${v}
          </text>
        </g>
      ))}
      {/* Filter glyph at $100, smoke glyph at $300 */}
      <rect x={rx(F) - 6} y={158} width={12} height={5} fill={`url(#${id}-mesh)`} className={s.glyphFilter} />
      <path d={`M${rx(D) - 7} 161 q3.5 -4 7 0 t7 0`} className={s.glyphSmoke} />

      {marks.map((m) => (
        <g key={m.at}>
          <text x={rx(m.at)} y={124} className={m.ok ? s.markTextGood : s.markTextBad} textAnchor="middle">
            ${m.at}
          </text>
          {m.ok ? (
            <circle cx={rx(m.at)} cy={133} r={5} className={s.markGood} />
          ) : (
            <g className={s.markBad}>
              <circle cx={rx(m.at)} cy={133} r={5} />
              <path d={`M${rx(m.at) - 3} 130 l6 6 M${rx(m.at) + 3} 130 l-6 6`} />
            </g>
          )}
        </g>
      ))}

      {/* Total */}
      <text x={X0} y={182} className={s.name}>
        Total
      </text>
      {total !== null && <rect x={BAR0} y={172} width={BAR * Math.abs(total)} height={12} rx={2} className={s.totalBar} />}
      <text x={total === null ? BAR0 : BAR0 + BAR * Math.abs(total) + 6} y={182} className={s.value}>
        {total === null ? "?" : money(total)}
      </text>
    </svg>
  );
}

function Stage({ locked, reach }: { locked: boolean; reach: (name: string) => void }) {
  // Panel 1: offers tried, and the deal (the offer both sides accepted), if any.
  const [offers, setOffers] = useState<number[]>([]);
  const [deal, setDeal] = useState<number | null>(null);
  // Panel 2: what the liable factory tried; it keeps the cheaper of what it has seen.
  const [paid, setPaid] = useState(false);
  const [fitted, setFitted] = useState(false);
  const [flash, setFlash] = useState<{ panel: 1 | 2; f: Flash }>({ panel: 1, f: null });
  const [n, setN] = useState(0);

  const offer = (o: number) => {
    setOffers((xs) => [...xs, o]);
    setN((k) => k + 1);
    if (factoryAccepts(o) && laundryGains(o)) {
      if (deal === null) {
        setDeal(o);
        reach("deal-struck");
      }
      setFlash({ panel: 1, f: null });
    } else if (!factoryAccepts(o)) {
      setFlash({ panel: 1, f: { n, who: "factory", text: `${money(o - F)} for me` } });
    } else {
      setFlash({ panel: 1, f: { n, who: "laundry", text: `${money(-o)}: worse than smoke` } });
    }
  };

  // Panel 1 ledger
  const p1Factory = deal === null ? 0 : deal - F;
  const p1Laundry = deal === null ? -D : -deal;
  const p1Marks: Mark[] = offers.map((o) => ({ at: o, ok: o === deal }));

  // Panel 2 ledger
  const p2Factory = fitted ? -F : paid ? -D : null;
  const p2Laundry = fitted || paid ? 0 : null; // damages compensate the laundry; a filter stops the smoke
  const p2Marks: Mark[] = [...(paid ? [{ at: D, ok: false }] : []), ...(fitted ? [{ at: F, ok: true }] : [])];
  const p2Arrow: Arrow = fitted ? { amount: F, kind: "to-filter" } : paid ? { amount: D, kind: "to-laundry" } : null;

  const done = deal !== null && fitted;

  return (
    <div className={s.wrap}>
      <p className={s.model}>Simplified: two sides, free bargaining, costs known.</p>
      <div
        className={s.panels}
        role="group"
        aria-label={
          done
            ? `Right to pollute: laundry paid $${deal}, filter fitted, total cost $${F}. Right to clean air: factory fitted the $${F} filter, total cost $${F}.`
            : "Two cases: right to pollute, and right to clean air"
        }
      >
        <Panel
          id="p1"
          title="Right to pollute"
          filtered={deal !== null}
          marks={p1Marks}
          band={deal !== null}
          arrow={deal !== null ? { amount: deal, kind: "to-factory" } : null}
          factoryNet={p1Factory}
          laundryNet={p1Laundry}
          flash={flash.panel === 1 ? flash.f : null}
        />
        <p className={s.live} aria-live="polite">
          {`Right to pollute: factory ${money(p1Factory)}, laundry ${money(p1Laundry)}, total ${money(p1Factory + p1Laundry)}.`}
        </p>
        <Row>
          {OFFERS.map((o) => (
            <Control
              key={o}
              className={`${s.chip} ${offers.includes(o) ? "active" : ""}`}
              disabled={locked || offers.includes(o)}
              aria-label={locked ? "Locked until you predict" : `Offer $${o}`}
              onClick={() => offer(o)}
            >
              {locked ? "?" : `Offer $${o}`}
            </Control>
          ))}
        </Row>

        <Panel
          id="p2"
          title="Right to clean air"
          filtered={fitted}
          marks={p2Marks}
          band={false}
          arrow={p2Arrow}
          factoryNet={p2Factory}
          laundryNet={p2Laundry}
          flash={null}
        />
        <p className={s.live} aria-live="polite">
          {p2Factory === null || p2Laundry === null
            ? "Right to clean air: the factory has not chosen."
            : `Right to clean air: factory ${money(p2Factory)}, laundry ${money(p2Laundry)}, total ${money(p2Factory + p2Laundry)}.`}
        </p>
        <Row>
          <Control
            className={`${s.half} ${paid ? "active" : ""}`}
            disabled={locked || paid}
            onClick={() => setPaid(true)}
          >
            Pay $300 damages
          </Control>
          <Control
            className={`${s.half} ${fitted ? "active" : ""}`}
            disabled={locked || fitted}
            onClick={() => {
              setFitted(true);
              reach("liable-fits");
            }}
          >
            Fit $100 filter
          </Control>
        </Row>
      </div>
    </div>
  );
}

export default function WhoPaysSameFilter({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Smoke costs a laundry $300 a year; a filter, $100 a year. The factory may legally pollute. If they bargain freely, is the filter fitted?",
        options: ["No, the factory has the right", "Yes, the laundry pays for it", "Only if a court orders it"],
        answer: 1,
      }}
      exploreHint="Make offers as the laundry, then choose for a liable factory."
      minInteractions={MILESTONES.length}
      reveal={() => <Reveal />}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => <Stage locked={locked} reach={reach} />}
        </Milestones>
      )}
    </Lesson>
  );
}

function Reveal() {
  return (
    <>
      <p>
        With the right to pollute, your $200 offer got the filter fitted: it sits in the shaded band, above the $100 filter, so the
        factory gains, and below the $300 the smoke costs the laundry, so the laundry gains. With the factory liable, it fitted the
        filter itself: $100 beats $300 of damages.
      </p>
      <p>
        Look at the two Totals: <strong>{"−"}$100 both times</strong>. The right decided only who pays, the laundry or the
        factory. Economists call this idea the Coase theorem.
      </p>
      <p>Here bargaining is free; with costly bargaining or many people, it can fail.</p>
    </>
  );
}
