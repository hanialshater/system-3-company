"use client";

// Leakage toy: a test of 20 yes/no items. Some share are exact copies of training items, which the
// model answers from memory (always right). On a fresh item it always says "yes"; half the fresh
// items' true answers are "yes" (alternating), so it gets exactly half the fresh items right.
// 20% copies: 4 copies right + 8 of 16 fresh = 12/20 = 60%. Fresh only: 8/16 = 50% at any share.
// Which cells are copies: a mulberry32(1) shuffle of the 20 positions (untuned; layout only).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

// MODEL START
const N = 20;
const Q_SHARE = 20; // percent
const ORDER = (() => {
  const r = mulberry32(1);
  const a = Array.from({ length: N }, (_, i) => i);
  for (let i = N - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
})();
type Item = { copy: boolean; truthYes: boolean; right: boolean };
/** The 20 test items at a given copied share (percent, multiple of 5). */
function items(sharePct: number): Item[] {
  const copies = Math.round((N * sharePct) / 100);
  const isCopy = new Set(ORDER.slice(0, copies));
  let fresh = 0;
  return Array.from({ length: N }, (_, i) => {
    if (isCopy.has(i)) return { copy: true, truthYes: i % 2 === 0, right: true };
    const truthYes = fresh++ % 2 === 0; // fresh items alternate yes / no
    return { copy: false, truthYes, right: truthYes }; // the model says "yes" to anything new
  });
}
function scores(sharePct: number) {
  const it = items(sharePct);
  const fresh = it.filter((x) => !x.copy);
  return {
    all: it.filter((x) => x.right).length / it.length,
    fresh: fresh.filter((x) => x.right).length / fresh.length,
    copies: it.length - fresh.length,
    freshN: fresh.length,
  };
}
const Q = scores(Q_SHARE); // all 0.6, fresh 0.5
// MODEL END

const pct = (v: number) => `${Math.round(v * 100)}%`;

export default function DuplicatesInTheTest({ slug }: { slug: string }) {
  const [share, setShare] = useState(Q_SHARE);
  const [freshOnly, setFreshOnly] = useState(false);
  const [seen, setSeen] = useState<{ share: number; all: number }[]>([]);
  const [sawFresh, setSawFresh] = useState(false);

  const it = items(share);
  const sc = scores(share);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Your model memorises its training answers. On anything new it says "yes", and half the true answers are "yes". ${Q_SHARE}% of the test items turn out to be copies of training items. What test score does it get?`,
        options: [pct(Q.fresh), pct(Q.all), "80%"],
        answer: 1,
      }}
      exploreHint="Score only the fresh items. Then change how many copies leaked in."
      minInteractions={2}
      reveal={() => {
        const other = [...seen].reverse().find((x) => x.share !== Q_SHARE);
        return (
          <>
            <p>
              At {Q_SHARE}% copies the test said {pct(Q.all)}: {Q.copies} copies right from memory, plus{" "}
              {Math.round(Q.fresh * Q.freshN)} of {Q.freshN} fresh items. {sawFresh ? `Scoring only the fresh items dropped it to ${pct(Q.fresh)}.` : ""}
            </p>
            <p>
              {other
                ? `At ${other.share}% copies the full test read ${pct(other.all)}, but on fresh items the model ${sawFresh ? "still scored" : "scores"} ${pct(Q.fresh)}. `
                : ""}
              The copies reward memorized answers rather than performance on new items. Every leaked item adds a free right answer, so the score climbs while the
              model gets no better at anything new.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["fresh-only", "share-moved"]}>
          {(reach) => {
            const toggle = () => {
              const next = !freshOnly;
              setFreshOnly(next);
              if (next) {
                setSawFresh(true);
                reach("fresh-only");
              }
            };
            const move = (v: number) => {
              setShare(v);
              setSeen((xs) => [...xs, { share: v, all: scores(v).all }]);
              if (v !== Q_SHARE) reach("share-moved");
            };
            const cols = 5;
            const cw = 56;
            const ch = 40;
            return (
              <div className={s.wrap}>
                <span className={`tag ${s.model}`}>Toy test · 20 yes/no items</span>
                <svg viewBox="0 0 320 190" className="stage-svg" role="img" aria-label={`${sc.copies} copied items; full score ${pct(sc.all)}`}>
                  {it.map((x, i) => {
                    const cx = 22 + (i % cols) * (cw + 4);
                    const cy = 6 + Math.floor(i / cols) * (ch + 4);
                    const dim = !locked && freshOnly && x.copy;
                    return (
                      <g key={i}>
                        <rect
                          x={cx}
                          y={cy}
                          width={cw}
                          height={ch}
                          rx={5}
                          opacity={dim ? 0.25 : 1}
                          fill={x.copy ? "color-mix(in srgb, var(--domain) 25%, transparent)" : "var(--bg-2)"}
                          stroke={x.copy ? "var(--domain)" : "var(--line)"}
                          strokeWidth={x.copy ? 2 : 1}
                        />
                        {x.copy && (
                          <text x={cx + 4} y={cy + 11} className={`${s.tiny} ${s.copyTag}`}>
                            copy
                          </text>
                        )}
                        {!locked && (
                          <text x={cx + cw / 2} y={cy + 31} textAnchor="middle" className={s.big} fill={x.right ? "var(--good)" : "var(--bad)"}>
                            {x.right ? "✓" : "✗"}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
                <Row>
                  <Control className={freshOnly ? "active" : ""} aria-pressed={freshOnly} disabled={locked} onClick={toggle}>
                    {freshOnly ? "Show all items" : "Score fresh items only"}
                  </Control>
                  <Readout label="Full test" value={locked ? "–" : pct(sc.all)} />
                  <Readout label="Fresh items" value={locked || !sawFresh ? "–" : pct(sc.fresh)} />
                </Row>
                <Slider
                  label="Copies of training items"
                  value={share}
                  min={0}
                  max={50}
                  step={10}
                  disabled={locked}
                  format={(v) => `${v}% (${Math.round((N * v) / 100)})`}
                  onChange={move}
                />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
