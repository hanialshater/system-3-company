"use client";

// Two jars: water (molecules with charged ends) and hexane (an oily liquid with no charged ends).
// Each solute button drops a spoonful of that solute into BOTH jars. A solute that dissolves
// spreads through the liquid as dots (iodine also tints it); one that does not stays as grains
// on the bottom. Behaviour comes from the SOLUTES table (sources in meta.json claims).
// Key state: all three solutes in both jars; salt and sugar sit as grains in hexane, iodine
// spreads violet. Milestones: one per solute, so trying only salt cannot unlock the reveal.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

type Id = "salt" | "sugar" | "iodine";
const SOLUTES: Record<Id, { label: string; charge: string; water: "well" | "barely"; hexane: "well" | "no" }> = {
  salt: { label: "Salt", charge: "+ and − ions", water: "well", hexane: "no" },
  sugar: { label: "Sugar", charge: "± ends", water: "well", hexane: "no" },
  iodine: { label: "Iodine", charge: "no charge", water: "barely", hexane: "well" },
};
const ORDER: Id[] = ["salt", "sugar", "iodine"];
const NAMES = ORDER;

const W = 320;
const H = 170;
const JW = 130;
const JX = [20, 170];
const TOP = 34;
const BOT = 150;

export default function WhichDissolvesInOil({ slug }: { slug: string }) {
  const [added, setAdded] = useState<Id[]>([]);
  const dots = useMemo(() => {
    const r = mulberry32(42);
    return Array.from({ length: 30 }, () => ({ x: 8 + r() * (JW - 16), y: TOP + 10 + r() * (BOT - TOP - 40) }));
  }, []);

  const jar = (j: 0 | 1) => {
    const x = JX[j];
    const solvent = j === 0 ? "water" : "hexane";
    let pile = 0;
    const tint =
      added.includes("iodine") && j === 1 ? s.violet : added.includes("iodine") && j === 0 ? s.brown : "";
    return (
      <g key={j}>
        <rect x={x} y={TOP} width={JW} height={BOT - TOP} rx={10} className={`${s.liquid} ${tint}`} />
        <text x={x + JW / 2} y={TOP - 18} textAnchor="middle" className={s.name}>
          {solvent}
        </text>
        <text x={x + JW / 2} y={TOP - 5} textAnchor="middle" className={s.small}>
          {j === 0 ? "± charged ends" : "no charged ends"}
        </text>
        {added.map((id, k) => {
          const how = j === 0 ? SOLUTES[id].water : SOLUTES[id].hexane;
          if (how === "well")
            return dots.slice(k * 10, k * 10 + 10).map((d, i) => (
              <circle key={`${id}${i}`} cx={x + d.x} cy={d.y} r={2.6} className={s[id]} />
            ));
          // Undissolved (or barely dissolved): grains on the bottom.
          const left = x + 8 + pile * 40;
          pile += 1;
          return (
            <g key={id}>
              {Array.from({ length: 9 }, (_, i) => (
                <rect
                  key={i}
                  x={left + (i % 5) * 7 + (Math.floor(i / 5) % 2) * 3}
                  y={BOT - 9 - Math.floor(i / 5) * 6}
                  width={5}
                  height={5}
                  className={s[id]}
                />
              ))}
            </g>
          );
        })}
      </g>
    );
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "You shake salt, sugar and iodine, each in its own jar, with hexane, an oily liquid made from petrol. Which one dissolves well?",
        options: ["salt", "sugar", "iodine"],
        answer: 2,
      }}
      exploreHint="Drop each solid into both jars."
      minInteractions={NAMES.length}
      reveal={() => (
        <>
          <p>
            In your jars, salt and sugar vanished into water but sat as grains in hexane. Only{" "}
            <strong>iodine</strong> spread through hexane, turning it violet, and it barely dissolved in water.
          </p>
          <p>
            A liquid dissolves what pulls on it as strongly as its own molecules do. Water&apos;s charged ends grip
            salt&apos;s ions and sugar&apos;s charged ends. Hexane and iodine have no charged ends, so they mix with each
            other instead: like dissolves like.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={NAMES}>
          {(reach) => (
            <div className={s.wrap}>
              <svg viewBox={`0 0 ${W} ${H}`} className="stage-svg" role="img" aria-label={`Added: ${added.join(", ") || "nothing"}`}>
                {jar(0)}
                {jar(1)}
              </svg>
              <Row>
                {ORDER.map((id) => (
                  <Control
                    key={id}
                    className={`${s.btn} ${added.includes(id) ? "active" : ""}`}
                    disabled={locked || added.includes(id)}
                    onClick={() => {
                      setAdded((a) => [...a, id]);
                      reach(id);
                    }}
                  >
                    <span className={s.btnName}>{SOLUTES[id].label}</span>
                    <span className={s.btnSub}>{SOLUTES[id].charge}</span>
                  </Control>
                ))}
              </Row>
            </div>
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
