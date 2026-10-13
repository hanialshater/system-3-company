"use client";

// A beaker of 100 g of water at 20 °C. Salt goes in as crystals on the bottom; stirring
// dissolves it, one dot per half gram of salt in solution. Past about 36 g the dissolved count
// stops rising, and more stirring leaves the pile the same: at the ceiling, ions leave the
// crystals as fast as others land on them (the two-way arrows by the pile).

import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const SOL = 36; // g NaCl per 100 g water at 20 °C (about 35.9)
const ASK = 50; // g stirred in, in the question
const LEFT = ASK - SOL; // 14 g of crystals
const MAX = 60;
const SEED = 11; // untuned: only positions dots

const W = 320;
const H = 210;
const BX0 = 70;
const BX1 = 250;
const WTOP = 50;
const BOT = 190;

// Fixed positions for up to 2 dots per gram dissolved, reshuffled by each stir.
function dots(n: number, stir: number) {
  const rng = mulberry32(SEED + stir * 7919);
  return Array.from({ length: n }, () => ({
    x: BX0 + 8 + rng() * (BX1 - BX0 - 16),
    y: WTOP + 8 + rng() * (BOT - WTOP - 40),
  }));
}

// Crystal pile: one small cube per gram, stacked from the centre of the bottom.
function pile(g: number) {
  const out: { x: number; y: number }[] = [];
  const perRow = 14;
  for (let i = 0; i < Math.round(g); i++) {
    const row = Math.floor(i / perRow);
    const col = i % perRow;
    const width = Math.min(perRow, Math.round(g) - row * perRow);
    out.push({ x: (BX0 + BX1) / 2 - (width * 8) / 2 + col * 8 + (row % 2) * 2, y: BOT - 9 - row * 8 });
  }
  return out;
}

export default function WhenTheWaterIsFull({ slug }: { slug: string }) {
  const [added, setAdded] = useState(0); // g of salt put in
  const [dissolved, setDissolved] = useState(0); // g in solution
  const [stirs, setStirs] = useState(0);

  const ix = useRef(() => {});
  const { reach, reached } = useMilestones(() => ix.current(), ["saturated", "fifty-stirred"]);
  const [maxStirs, setMaxStirs] = useState(0); // stirs at 50 g or more, kept through "Empty"

  const crystals = added - dissolved;
  const full = dissolved >= SOL && crystals > 0;
  const ions = dots(Math.round(dissolved * 2), stirs);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Salt dissolves to about ${SOL} g per 100 g of water at 20 °C. You stir ${ASK} g into 100 g of water. About how much stays as crystals?`,
        options: ["None", `About ${LEFT} g`, `About ${ASK} g`],
        answer: 1,
      }}
      exploreHint={`Put in ${ASK} g and stir. Then stir again.`}
      minInteractions={2}
      reveal={() => <WhyFull saw={reached("fifty-stirred")} stirs={maxStirs} />}
    >
      {({ locked, interact }) => {
        ix.current = interact;
        const add = (g: number) => setAdded((a) => Math.min(MAX, a + g));
        const stir = () => {
          const d = Math.min(added, SOL);
          setDissolved(d);
          setStirs((n) => n + 1);
          if (added > SOL) reach("saturated");
          if (added >= ASK) {
            reach("fifty-stirred");
            setMaxStirs((n) => n + 1);
          }
        };
        return (
          <div className={s.wrap}>
            <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`${dissolved} g dissolved, ${crystals} g of crystals on the bottom`}>
              <rect x={BX0} y={WTOP} width={BX1 - BX0} height={BOT - WTOP} className={s.water} />
              <path d={`M ${BX0} 26 L ${BX0} ${BOT} L ${BX1} ${BOT} L ${BX1} 26`} className={s.glass} />
              <text x={W / 2} y={WTOP - 8} textAnchor="middle" className={s.small}>
                100 g water · 20 °C
              </text>
              {ions.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r={2.4} className={i % 2 ? s.na : s.cl} />
              ))}
              {pile(crystals).map((p, i) => (
                <rect key={i} x={p.x} y={p.y} width={7} height={7} className={s.crystal} />
              ))}
              {full && (
                <g className={s.swap}>
                  <path d={`M ${BX0 + 30} ${BOT - 14} l 0 -22 l -4 6 m 4 -6 l 4 6`} className={s.arrow} />
                  <path d={`M ${BX1 - 30} ${BOT - 36} l 0 22 l -4 -6 m 4 6 l 4 -6`} className={s.arrow} />
                  <text x={BX1 + 6} y={BOT - 22} className={s.small}>
                    as many
                  </text>
                  <text x={BX1 + 6} y={BOT - 10} className={s.small}>
                    each way
                  </text>
                </g>
              )}
            </svg>
            <Row>
              <Control onClick={() => add(5)} disabled={locked || added + 5 > MAX}>
                +5 g
              </Control>
              <Control onClick={() => add(20)} disabled={locked || added + 20 > MAX}>
                +20 g
              </Control>
              <Control
                onClick={() => {
                  setAdded(ASK);
                }}
                disabled={locked || added >= ASK}
              >
                Fill to {ASK} g
              </Control>
              <Control onClick={stir} disabled={locked || added === 0}>
                Stir
              </Control>
              <Control
                onClick={() => {
                  setAdded(0);
                  setDissolved(0);
                  setStirs(0);
                }}
                disabled={locked || added === 0}
              >
                Empty
              </Control>
            </Row>
            <Row>
              <Readout label="Salt in" value={`${added} g`} />
              <Readout label="Dissolved" value={`${dissolved} g`} />
              <Readout label="Crystals" value={`${crystals} g`} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}

function WhyFull({ saw, stirs }: { saw: boolean; stirs: number }) {
  const sawIt = saw;
  return (
    <>
      <p>
        {sawIt ? "You saw it" : "Stir it and you see it"}: the dissolved salt stops at about <strong>{SOL} g</strong>, so at{" "}
        {ASK} g about <strong>{LEFT} g</strong> stays on the bottom{sawIt && stirs > 1 ? `, even after ${stirs} rounds of stirring` : ""}. More
        stirring does not shrink it: the water is full.
      </p>
      <p>
        At that ceiling dissolving has not stopped. Ions still break off the crystals, but just as many land back on them,
        so the pile stays the same size. A solution in this state is called saturated.
      </p>
      <p className="muted">Warmer water holds a little more salt; about {SOL} g is the figure at 20 °C.</p>
    </>
  );
}
