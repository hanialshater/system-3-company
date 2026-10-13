"use client";

// Standard genetic code, written as DNA codons (coding strand). A "change" swaps one letter of a
// codon for one of the other three letters. The 61 amino-acid codons have 61 x 9 = 549 changes; 134
// keep the amino acid, 392 give another one, 23 give a stop (script: artifacts/scratch/w5life/codons.mjs).
// Everything on the stage is computed from the table below.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const B = "TCAG";
const AA_STR = "FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG";
const NAME: Record<string, string> = {
  F: "Phe", L: "Leu", S: "Ser", Y: "Tyr", C: "Cys", W: "Trp", P: "Pro", H: "His", Q: "Gln", R: "Arg",
  I: "Ile", M: "Met", T: "Thr", N: "Asn", K: "Lys", V: "Val", A: "Ala", D: "Asp", E: "Glu", G: "Gly", "*": "stop",
};
const CODE: Record<string, string> = {};
{
  let i = 0;
  for (const a of B) for (const b of B) for (const c of B) CODE[a + b + c] = AA_STR[i++];
}
type Kind = "same" | "new" | "stop";
interface Change { pos: number; letter: string; to: string; aa: string; kind: Kind }
function changes(codon: string): Change[] {
  const out: Change[] = [];
  for (let p = 0; p < 3; p++)
    for (const x of B) {
      if (x === codon[p]) continue;
      const to = codon.slice(0, p) + x + codon.slice(p + 1);
      const aa = CODE[to];
      out.push({ pos: p, letter: x, to, aa, kind: aa === "*" ? "stop" : aa === CODE[codon] ? "same" : "new" });
    }
  return out;
}
const ALL = Object.keys(CODE).filter((c) => CODE[c] !== "*").flatMap((c) => changes(c));
const TOT = ALL.length;
const SAME = ALL.filter((c) => c.kind === "same").length;
const NEW = ALL.filter((c) => c.kind === "new").length;
const STOP = ALL.filter((c) => c.kind === "stop").length;
const BYPOS = [0, 1, 2].map((p) => ALL.filter((c) => c.pos === p && c.kind === "same").length);
const PER = TOT / 3;
const PCT = Math.round((100 * SAME) / TOT);
const CODONS = ["CTT", "TAT", "GGA"];
const ORD = ["1st", "2nd", "3rd"];

function Stage({
  locked, ci, tapped, last, global, onTap, onAll, onNext,
}: {
  locked: boolean; ci: number; tapped: boolean[]; last: number; global: boolean;
  onTap: (k: number) => void; onAll: () => void; onNext: () => void;
}) {
  const codon = CODONS[ci];
  const list = changes(codon);
  const msg = locked
    ? "Toy: standard genetic code. Tap a letter change to see which amino acid you get."
    : global
      ? `All ${TOT} changes: ${SAME} same (${PCT}%), ${NEW} new, ${STOP} stop. Same, by letter: 1st ${BYPOS[0]}, 2nd ${BYPOS[1]}, 3rd ${BYPOS[2]} of ${PER}.`
      : last < 0
        ? `${codon} makes ${NAME[CODE[codon]]}. Tap a change.`
        : `${codon} → ${list[last].to}: ${list[last].kind === "stop" ? "stop" : NAME[list[last].aa]}${list[last].kind === "same" ? ", the same" : ""}.`;
  return (
    <div className={s.wrap}>
      <div className={s.codon} aria-hidden>
        {codon.split("").map((l, i) => <span key={i}>{l}</span>)}
        <em>{NAME[CODE[codon]]}</em>
      </div>
      <div className={s.grid}>
        {list.map((c, k) => (
          <Control
            key={k}
            className={`${s.tile} ${tapped[k] ? s[c.kind] : ""}`}
            disabled={locked || tapped[k]}
            onClick={() => onTap(k)}
          >
            {tapped[k] ? `${c.to} ${c.kind === "stop" ? "stop" : NAME[c.aa]}` : `${ORD[c.pos]} → ${c.letter}`}
          </Control>
        ))}
      </div>
      <p className={s.msg} aria-live="polite">{msg}</p>
      <Row>
        <Control disabled={locked || global} onClick={onAll}>Try all {TOT} changes</Control>
        <Control disabled={locked} onClick={onNext}>Next codon</Control>
      </Row>
      <div className={s.legend} aria-hidden>
        <span><i className={s.lsame} />same amino acid</span>
        <span><i className={s.lnew} />different</span>
        <span><i className={s.lstop} />stop</span>
      </div>
    </div>
  );
}

export default function SilentLetterSwaps({ slug }: { slug: string }) {
  const [ci, setCi] = useState(0);
  const [tappedBy, setTappedBy] = useState<boolean[][]>(CODONS.map(() => Array(9).fill(false)));
  const [global, setGlobal] = useState(false);
  const [last, setLast] = useState(-1);
  const done = CODONS.findIndex((_, i) => tappedBy[i].every(Boolean));
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A codon is a three-letter DNA word that names an amino acid, a building block of protein. Take every single-letter change to every codon that names one (${TOT} changes). About how many leave the amino acid unchanged?`,
        options: ["About 2%", "About 25%", "About 75%"],
        answer: 1,
      }}
      exploreHint="Tap all nine changes of the codon, then try all of them."
      minInteractions={2}
      reveal={() => {
        const d = done < 0 ? 0 : done;
        const c = CODONS[d];
        const list = changes(c);
        const k = list.filter((x) => x.kind === "same").length;
        return (
          <>
            <p>
              In {c} ({NAME[CODE[c]]}), {k} of 9 changes kept the amino acid. Across all codons: <strong>{SAME} of {TOT}, {PCT}%</strong>, mostly in the 3rd letter ({BYPOS[2]} of {PER}).
            </p>
            <p>
              The code has slack: several codons name the same amino acid, and they usually differ only in the last letter. So many changes are silent, but most ({NEW} of {TOT}) change the protein. This is the standard code, not any one gene.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["nine-tapped", "all-changes"]}>
          {(reach) => (
            <Stage
              locked={locked}
              ci={ci}
              tapped={tappedBy[ci]}
              last={last}
              global={global}
              onTap={(k) => {
                const next = tappedBy.map((t, i) => (i === ci ? t.map((v, j) => v || j === k) : t));
                setTappedBy(next);
                setLast(k);
                setGlobal(false);
                if (next[ci].every(Boolean)) reach("nine-tapped");
              }}
              onAll={() => { setGlobal(true); reach("all-changes"); }}
              onNext={() => { setCi((ci + 1) % CODONS.length); setLast(-1); setGlobal(false); }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
