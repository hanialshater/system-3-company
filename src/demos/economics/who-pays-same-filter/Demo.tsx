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
// v4 (phone fit, build 6 measured crop 229 px, 102 words): each panel is 340 x 125 instead of 190: the Total sits on
// the title row, the nets read inside the blocks ("Factory +$100"), offer marks sit above the band, the ruler glyphs
// are gone, labels are 13 units so the card can fit both panels at the 10 px floor; screen-reader ledgers moved out
// of the panels (an absolute sibling blocks the fit). Reveal 89 words (two paragraphs). Measured crop 0 at 390x844.
// v5 (W-449, design review 2026-10-14): panel 2's "$100" filter-arrow label sits above the arrow, left of the chimney
// (x 10, was right-aligned at x 26 and ran 7 to 9 px past the svg's left edge); the Total bar is filled --bad-fill (a
// total is always a cost here), so it no longer reads as an empty input box. The ruler's tick labels sit 1.4 units
// higher (tick marks 1 unit shorter), so their text boxes end inside the svg too (a taller viewBox cost 3 px of crop).
// Text and viewBox unchanged.

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
// Total bars (on each panel's title row): 0.28 px per $, one x-origin for both panels.
const BAR0 = 206;
const BAR = 0.28;

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
    <svg viewBox="0 0 340 125" className="stage-svg" role="img" aria-label={title}>
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

      {/* Total, on the title row: one x-origin for both panels so the two bars line up */}
      <text x={BAR0 - 6} y={13} className={s.name} textAnchor="end">
        Total
      </text>
      {total !== null && <rect x={BAR0} y={3} width={BAR * Math.abs(total)} height={12} rx={2} className={s.totalBar} />}
      <text x={total === null ? BAR0 : BAR0 + BAR * Math.abs(total) + 5} y={13} className={s.value}>
        {total === null ? "?" : money(total)}
      </text>

      {/* Factory, chimney and filter slot */}
      <rect x={16} y={50} width={100} height={24} rx={3} className={s.block} />
      <text x={66} y={67} textAnchor="middle">
        <tspan className={s.name}>Factory </tspan>
        <tspan className={s.value}>{factoryNet === null ? "?" : money(factoryNet)}</tspan>
      </text>
      <rect x={56} y={38} width={14} height={12} className={s.block} />
      <rect
        x={53}
        y={31}
        width={20}
        height={7}
        rx={1.5}
        className={filtered ? s.filterOn : s.filterSlot}
        fill={filtered ? `url(#${id}-mesh)` : "none"}
      />
      <text x={78} y={30} className={s.tag}>
        filter $100 a year
      </text>

      {/* Smoke ribbon: drifts onto the laundry unless the filter is fitted */}
      {filtered ? (
        <path d="M63 30 q-3 -4 0 -7" className={s.smokeStub} />
      ) : (
        <path d="M63 31 Q 90 46 125 44 T 180 48 T 212 54" className={s.smoke} />
      )}

      {/* Laundry with a washing line */}
      <rect x={214} y={52} width={108} height={22} rx={3} className={s.block} />
      <text x={268} y={67} textAnchor="middle">
        <tspan className={s.name}>Laundry </tspan>
        <tspan className={s.value}>{laundryNet === null ? "?" : money(laundryNet)}</tspan>
      </text>
      <line x1={238} y1={52} x2={238} y2={43} className={s.pole} />
      <line x1={298} y1={52} x2={298} y2={43} className={s.pole} />
      <line x1={238} y1={44} x2={298} y2={44} className={s.pole} />
      {[252, 268, 284].map((x) => (
        <path key={x} d={`M${x - 5} 44 h10 v6 h-10 z`} className={s.shirt} />
      ))}
      <text x={320} y={38} className={s.tag} textAnchor="end">
        smoke $300 a year
      </text>

      {/* Money arrow */}
      {arrow?.kind === "to-factory" && (
        <g>
          <line x1={210} y1={64} x2={120} y2={64} className={s.arrow} markerEnd={`url(#${id}-head)`} />
          <text x={165} y={59} className={s.arrowText} textAnchor="middle">
            ${arrow.amount}
          </text>
        </g>
      )}
      {arrow?.kind === "to-laundry" && (
        <g>
          <line x1={120} y1={64} x2={210} y2={64} className={s.arrow} markerEnd={`url(#${id}-head)`} />
          <text x={165} y={59} className={s.arrowText} textAnchor="middle">
            ${arrow.amount}
          </text>
        </g>
      )}
      {arrow?.kind === "to-filter" && (
        <g>
          <path d="M30 49 Q 32 34 50 34" className={s.arrow} markerEnd={`url(#${id}-head)`} />
          <text x={10} y={30} className={s.arrowText}>
            ${arrow.amount}
          </text>
        </g>
      )}

      {/* Refusals flash under the blocks (decoration: the mark stays on the ruler) */}
      {flash && (
        <g aria-hidden="true">
          <text
            key={flash.n}
            x={flash.who === "factory" ? 120 : 212}
            y={86}
            className={s.flash}
            textAnchor={flash.who === "factory" ? "start" : "end"}
          >
            {flash.text}
          </text>
        </g>
      )}

      {/* Ruler, $ a year */}
      {band && (
        <g>
          <rect x={rx(F)} y={89} width={rx(D) - rx(F)} height={20} className={s.band} />
          <text x={rx(D) - 4} y={105} className={s.bandText} textAnchor="end">
            both gain
          </text>
        </g>
      )}
      <line x1={rx(0)} y1={109} x2={rx(375)} y2={109} className={s.rule} />
      {[0, 100, 200, 300].map((v) => (
        <g key={v}>
          <line x1={rx(v)} y1={106} x2={rx(v)} y2={111} className={s.rule} />
          <text x={rx(v)} y={121.6} className={s.tick} textAnchor="middle">
            ${v}
          </text>
        </g>
      ))}

      {marks.map((m) => (
        <g key={m.at}>
          <text x={rx(m.at)} y={86} className={m.ok ? s.markTextGood : s.markTextBad} textAnchor="middle">
            ${m.at}
          </text>
          {m.ok ? (
            <circle cx={rx(m.at)} cy={99} r={4.5} className={s.markGood} />
          ) : (
            <g className={s.markBad}>
              <circle cx={rx(m.at)} cy={99} r={4.5} />
              <path d={`M${rx(m.at) - 3} 96 l6 6 M${rx(m.at) + 3} 96 l-6 6`} />
            </g>
          )}
        </g>
      ))}
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
      {/* Screen-reader ledgers sit outside the panels: an absolutely positioned sibling would stop the card's
          phone fit from shrinking the panel pictures (W-287 canShrink). */}
      <p className={s.live} aria-live="polite">
        {`Right to pollute: factory ${money(p1Factory)}, laundry ${money(p1Laundry)}, total ${money(p1Factory + p1Laundry)}.`}
      </p>
      <p className={s.live} aria-live="polite">
        {p2Factory === null || p2Laundry === null
          ? "Right to clean air: the factory has not chosen."
          : `Right to clean air: factory ${money(p2Factory)}, laundry ${money(p2Laundry)}, total ${money(p2Factory + p2Laundry)}.`}
      </p>
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
        factory gains, and below the $300 of smoke, so the laundry gains. With the factory liable, it fitted the filter itself:
        $100 beats $300 of damages.
      </p>
      <p>
        Look at the two Totals: <strong>{"−"}$100 both times</strong>. The right decided only who pays. Economists call this
        the Coase theorem; with costly bargaining or many people, it can fail.
      </p>
    </>
  );
}
