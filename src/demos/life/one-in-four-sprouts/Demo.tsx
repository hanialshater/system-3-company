"use client";

// Two carrier plants (Pw x Pw). White flowers are recessive (ww). Every seed
// draws one copy from each parent at random, so each seed is white with
// chance 1/4, independently. The learner grows families of 4 seeds into a
// 10 x 10 field of families. Seeded draws; One fixed field (seed 1), no reroll.

import { useMemo, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import s from "./styles.module.css";

const FAMILIES = 100;
const TILE = 30;

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** families[f][seed] = [allele from mother, allele from father]; true = w. */
function batch(seed: number) {
  const r = rng(seed * 104729 + 7);
  return Array.from({ length: FAMILIES }, () =>
    Array.from({ length: 4 }, () => [r() < 0.5, r() < 0.5] as [boolean, boolean]),
  );
}

const label = (g: [boolean, boolean]) => `${g[0] ? "w" : "P"}${g[1] ? "w" : "P"}`;
const isWhite = (g: [boolean, boolean]) => g[0] && g[1];

export default function OneInFourSprouts({ slug }: { slug: string }) {
  const seed = 1;
  const [grown, setGrown] = useState(0);
  const hit = useRef(new Set<string>());
  // The 100-family result the learner actually saw (kept after "New field").
  const [full, setFull] = useState<{ atLeast: number; exactly: number; none: number } | null>(null);
  const fams = useMemo(() => batch(seed), [seed]);

  const whites = fams.slice(0, grown).map((f) => f.filter(isWhite).length);
  const atLeast = whites.filter((w) => w >= 1).length;
  const exactly = whites.filter((w) => w === 1).length;
  const none = grown - atLeast;
  const last = grown > 0 ? fams[grown - 1] : null;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "You plant 4 seeds from two purple plants that each carry a hidden white-flower copy, so each seed has a 1 in 4 chance of white. What is the chance at least one blooms white?",
        options: ["About 25%", "About 68%", "100%"],
        answer: 1,
      }}
      exploreHint="Grow one family and read its seeds (ww is white). Then grow all 100 families."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {full &&
              `In your 100 families, ${full.atLeast} had at least one white flower, ${full.exactly} exactly one and ${full.none} none; another field would differ. `}
            Each seed is its own 1-in-4 draw, so all four are purple with chance (3/4)<sup>4</sup> &asymp; 32%, and at least
            one is white with 1 &minus; 0.32 &asymp; <strong>68%</strong>.
          </p>
          <p>
            &ldquo;1 in 4&rdquo; is a chance per seed, not a quota per family.{" "}
            {full ? `Exactly one white happened in ${full.exactly} of your 100 families, ${full.none} had none. ` : ""}Your field is one draw: another field
            would give different counts. Averaged over many fields, exactly one white is about 42% of families, about a
            third get none, and about a quarter get two or more.
          </p>
          <p className="muted">Made-up flower: one purple copy (P) gives purple; seeds are independent.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const grow = (to: number) => {
          const n = Math.min(FAMILIES, to);
          setGrown(n);
          const mark = (k: string) => {
            if (!hit.current.has(k)) {
              hit.current.add(k);
              interact();
            }
          };
          if (n >= 1) mark("one");
          if (n === FAMILIES) {
            const w = fams.map((f) => f.filter(isWhite).length);
            setFull({ atLeast: w.filter((x) => x >= 1).length, exactly: w.filter((x) => x === 1).length, none: w.filter((x) => x === 0).length });
            mark("all");
          }
        };
        const lastWhite = last ? last.filter(isWhite).length : 0;
        const msg = locked
          ? "Make a prediction to start. Each square will hold one family of 4 seeds."
          : !last
            ? "Each seed gets one copy from each parent, P or w."
          : grown === FAMILIES
            ? `${FAMILIES} families: ${atLeast} with a white flower, ${none} with none. Expected none: 3/4 × 3/4 × 3/4 × 3/4 = 32%.`
            : `Family ${grown}: seeds ${last.map(label).join(", ")}. ${lastWhite} white (only ww is white).`;
        return (
          <div className={s.wrap}>
            <svg viewBox={`0 0 ${TILE * 10} ${TILE * 10}`} className={`stage-svg ${s.svg}`} role="img" aria-label={`${grown} families grown; ${atLeast} have a white flower`}>
              {fams.map((f, i) => {
                const x = (i % 10) * TILE;
                const y = Math.floor(i / 10) * TILE;
                const isGrown = i < grown;
                const any = isGrown && f.some(isWhite);
                return (
                  <g key={i} transform={`translate(${x} ${y})`}>
                    <rect x={1.5} y={1.5} width={TILE - 3} height={TILE - 3} rx={4} className={any ? s.tileHit : s.tile} />
                    {isGrown
                      ? f.map((g, k) => (
                          <g key={k} transform={`translate(${k % 2 ? 21.5 : 8.5} ${k < 2 ? 8.5 : 21.5})`}>
                            <circle r={5.4} className={isWhite(g) ? s.white : s.purple} />
                            <circle r={1.6} className={s.centre} />
                          </g>
                        ))
                      : <circle cx={TILE / 2} cy={TILE / 2} r={1.6} className={s.soil} />}
                  </g>
                );
              })}
            </svg>

            <p className={s.msg} aria-live="polite">{msg}</p>
            <p className={s.msg}>A seed has 2 copies, one per parent. ww is white; PP, Pw, wP are purple.</p>

            <Row>
              <Control disabled={locked || grown >= FAMILIES} onClick={() => grow(grown + 1)}>
                Grow 1 family
              </Control>
              <Control disabled={locked || grown >= FAMILIES} onClick={() => grow(grown + 10)}>
                Grow 10
              </Control>
              <Control disabled={locked || grown >= FAMILIES} onClick={() => grow(FAMILIES)}>
                Grow all 100
              </Control>
            </Row>
            <Row>
              <Readout label="Families" value={grown} />
              <Readout label="1+ white" value={grown ? `${atLeast} (${Math.round((100 * atLeast) / grown)}%)` : "–"} />
              <Readout label="Exactly 1 white" value={grown ? exactly : "–"} />
              <Readout label="None white" value={grown ? none : "–"} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
