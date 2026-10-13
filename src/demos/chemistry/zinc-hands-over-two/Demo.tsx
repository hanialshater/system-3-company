"use client";

// A zinc strip (4 zinc atoms, as buttons) in copper(II) solution (5 Cu²⁺ ions, drawn).
// Electrons move one at a time: each comes off the first zinc atom that still has one to give
// (a zinc atom has 2 to give: Zn → Zn²⁺) and goes to the first copper ion still short
// (Cu²⁺ → Cu⁺ → Cu, a copper atom). "Pass 1 electron" moves one; tapping a zinc atom moves
// whatever it still has to give (only the next zinc atom in line can be tapped). Tallies count zinc dissolved, electrons moved, copper formed.
// Key state: 3 zinc atoms dissolved and 3 copper atoms formed (6 electrons): the 1:1 tally has
// held three times. Milestone `three`; passing a single electron cannot unlock it.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const NZN = 4;
const NCU = 5;
const PER = 2; // electrons per atom/ion
const KEY = 3;
const NAMES = ["three"] as const;

const W = 320;
const H = 110;
const sup = (n: number) => (n === 2 ? "²⁺" : n === 1 ? "⁺" : "");

export default function ZincHandsOverTwo({ slug }: { slug: string }) {
  const [moved, setMoved] = useState(0); // electrons moved in total

  const given = (i: number) => Math.max(0, Math.min(PER, moved - i * PER)); // by zinc i
  const got = (k: number) => Math.max(0, Math.min(PER, moved - k * PER)); // by copper ion k
  const zincGone = Array.from({ length: NZN }, (_, i) => given(i) === PER).filter(Boolean).length;
  const copper = Array.from({ length: NCU }, (_, k) => got(k) === PER).filter(Boolean).length;
  const maxMoves = Math.min(NZN, NCU) * PER;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A zinc atom that dissolves gives away 2 electrons (Zn → Zn²⁺). In blue copper solution each copper ion, Cu²⁺, is 2 electrons short of a copper atom. For each zinc atom that dissolves, how many copper atoms form?",
        options: ["1", "2", "½"],
        answer: 0,
      }}
      exploreHint={`Move electrons until ${KEY} zinc atoms have dissolved. Watch the tally.`}
      minInteractions={NAMES.length}
      reveal={() => (
        <>
          <p>
            Your tally held at every whole zinc atom: {KEY} zinc dissolved, {KEY * PER} electrons moved,{" "}
            <strong>{KEY} copper atoms</strong> formed. One copper for one zinc.
          </p>
          <p>
            Electrons are never made or lost; they only move. Zinc loses 2 (it is oxidised); each copper ion gains 2 (it is
            reduced). Because the numbers match, one zinc atom dissolving turns exactly one copper ion into copper metal.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={NAMES}>
          {(reach) => {
            const move = (to: number) => {
              const next = Math.min(maxMoves, to);
              setMoved(next);
              if (Math.floor(next / PER) >= KEY) reach("three");
            };
            const nextZinc = Math.floor(moved / PER); // zinc atom now giving
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className="stage-svg" role="img" aria-label={`${copper} copper atoms formed`}>
                  <text x={8} y={14} className={s.small}>
                    copper solution
                  </text>
                  {Array.from({ length: NCU }, (_, k) => {
                    const left = PER - got(k);
                    const cx = 34 + k * 63;
                    return (
                      <g key={k}>
                        <circle cx={cx} cy={52} r={22} className={left === 0 ? s.cu : s.cuIon} />
                        <text x={cx} y={57} textAnchor="middle" className={s.label}>
                          Cu{sup(left)}
                        </text>
                        {Array.from({ length: got(k) }, (_, e) => (
                          <circle key={e} cx={cx - 6 + e * 12} cy={82} r={4} className={s.electron} />
                        ))}
                      </g>
                    );
                  })}
                  <text x={8} y={104} className={s.small}>
                    dots: electrons received
                  </text>
                </svg>
                <div className={s.strip} aria-label="Zinc strip">
                  {Array.from({ length: NZN }, (_, i) => {
                    const g = given(i);
                    return (
                      <Control
                        key={i}
                        className={`${s.zn} ${g === PER ? "active" : ""}`}
                        disabled={locked || i !== nextZinc || moved >= maxMoves}
                        aria-label={`Zinc atom ${i + 1}: give its electrons`}
                        onClick={() => move((i + 1) * PER)}
                      >
                        Zn{sup(g)}
                        <span className={s.left}>
                          {Array.from({ length: PER - g }, (_, e) => (
                            <span key={e} className={s.eDot} />
                          ))}
                        </span>
                      </Control>
                    );
                  })}
                </div>
                <Row>
                  <Control onClick={() => move(moved + 1)} disabled={locked || moved >= maxMoves}>
                    Pass 1 electron
                  </Control>
                  <Readout label="Zinc gone" value={zincGone} />
                  <Readout label="Electrons" value={moved} />
                  <Readout label="Copper made" value={copper} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
