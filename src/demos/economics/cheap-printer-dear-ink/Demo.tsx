"use client";

// Total cost of ownership. Two stacked bars (purchase price plus running cost) for two printers at a
// chosen number of pages.
// Key states: 1,000 pages (the cheap-to-buy printer is cheaper) and 2,000 pages (the question's number).
// Model: invented prices, a constant cost per page, nothing else (no repairs, no resale).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const P = [
  { name: "A", price: 60, per: 0.1 },
  { name: "B", price: 150, per: 0.03 },
] as const;
const Q_PAGES = 2000;
const LIGHT = 1000;
const MILESTONES = ["light", "question"] as const;

const total = (i: number, pages: number) => P[i].price + P[i].per * pages;
const TIE = (P[1].price - P[0].price) / (P[0].per - P[1].per); // 1,285.7
const usd = (v: number) => `$${Math.round(v).toLocaleString("en-US")}`;
const n = (v: number) => v.toLocaleString("en-US");

const L = 30;
const W = 278;
const MAX = 480;

export default function CheapPrinterDearInk({ slug }: { slug: string }) {
  const [pages, setPages] = useState(0);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `You are picking a printer and expect to print ${n(Q_PAGES)} pages. Printer A costs $${P[0].price} plus $${P[0].per.toFixed(2)} a page; Printer B costs $${P[1].price} plus $${P[1].per.toFixed(2)} a page. Which costs you less in total?`,
        options: ["Printer A", "Printer B", "The same"],
        answer: 1,
      }}
      exploreHint="Try 1,000 pages, then 2,000, and compare the two bars."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            At {n(LIGHT)} pages the $60 printer cost {usd(total(0, LIGHT))} against {usd(total(1, LIGHT))}. At {n(Q_PAGES)} pages it
            flipped: A cost <strong>{usd(total(0, Q_PAGES))}</strong>, B only <strong>{usd(total(1, Q_PAGES))}</strong>.
          </p>
          <p>
            The two bars tie at about {n(Math.round(TIE))} pages (the extra ${P[1].price - P[0].price} up front, saved at {Math.round((P[0].per - P[1].per) * 100)} cents a
            page). Cost is the price plus the cost of using it, so which wins depends on how much you use it.
          </p>
          <p className="muted">A model: invented prices, a constant cost per page, no repairs or resale.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const set = (v: number) => {
              setPages(v);
              if (v === LIGHT) reach("light");
              if (v === Q_PAGES) reach("question");
            };
            const t = [total(0, pages), total(1, pages)];
            const cheaper = t[0] < t[1] ? 0 : 1;
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: price + cost per page, nothing else</p>
                <svg viewBox="0 0 320 130" className="stage-svg" role="img" aria-label={locked ? "Two cost bars" : `A ${usd(t[0])}, B ${usd(t[1])}`}>
                  {P.map((p, i) => {
                    const y = 22 + i * 52;
                    const pw = (p.price / MAX) * W;
                    const rw = ((p.per * pages) / MAX) * W;
                    return (
                      <g key={p.name}>
                        <text x={4} y={y + 18} className={s.value}>
                          {p.name}
                        </text>
                        <rect x={L} y={y} width={W} height={26} rx={3} className={s.ghostFill} />
                        <rect x={L} y={y} width={pw} height={26} className={s.main} />
                        {rw > 0 && <rect x={L + pw} y={y} width={rw} height={26} className={s.badFill} />}
                        {!locked && (
                          <text x={L + 4} y={y + 40} className={s.small}>
                            price ${p.price} + running {usd(p.per * pages)} = {usd(t[i])}
                          </text>
                        )}
                      </g>
                    );
                  })}
                  <text x={L} y={12} className={s.axis}>
                    dark: price, red: cost of the pages
                  </text>
                </svg>
                <Row>
                  <Readout label="Pages" value={n(pages)} />
                  <Readout label="Cheaper" value={locked || pages === 0 ? "?" : t[0] === t[1] ? "tie" : `${P[cheaper].name} by ${usd(Math.abs(t[0] - t[1]))}`} />
                </Row>
                <Row>
                  {[LIGHT, Q_PAGES, 4000].map((v) => (
                    <Control key={v} className={pages === v ? "active" : ""} disabled={locked || pages === v} onClick={() => set(v)}>
                      {n(v)} pages
                    </Control>
                  ))}
                </Row>
                <Slider label="Pages printed" value={pages} min={0} max={4000} step={100} format={n} disabled={locked} onChange={set} />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
