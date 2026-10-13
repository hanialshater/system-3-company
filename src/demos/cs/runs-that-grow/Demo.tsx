"use client";

// Run-length coding writes each run of same-coloured pixels as count-then-letter: WWWW is 4W.
// The learner paints a strip of 8 (or 16) pixels and the code builds live underneath, with
// its length next to the pixel count. Long runs shrink; the alternating row from the question
// doubles. One representation: the strip and its code, chunk by chunk.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type Px = "W" | "B";
const QUESTION_ROW = "BWBWBWBW";

/** Runs of the strip, as [count, letter]. */
function runs(px: string): [number, Px][] {
  const out: [number, Px][] = [];
  for (const c of px) {
    const last = out[out.length - 1];
    if (last && last[1] === c) last[0]++;
    else out.push([1, c as Px]);
  }
  return out;
}
const encode = (px: string) => runs(px).map(([n, c]) => `${n}${c}`).join("");

export default function RunsThatGrow({ slug }: { slug: string }) {
  const [px, setPx] = useState("W".repeat(8));
  const [best, setBest] = useState<{ row: string; code: string } | null>(null); // most shrunk
  const [worst, setWorst] = useState<{ row: string; code: string } | null>(null); // most grown

  const code = encode(px);
  const qCode = encode(QUESTION_ROW);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Write a row as count-then-letter: WWWW becomes 4W. For the row ${QUESTION_ROW} (${QUESTION_ROW.length} pixels), is the coded version shorter, the same, or longer?`,
        options: ["Shorter", "The same", "Longer"],
        answer: 2,
      }}
      exploreHint="Paint pixels. Find a row that shrinks and one that grows."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {best ? `Your best row coded ${best.row.length} pixels in ${best.code.length} characters. ` : ""}
            {worst ? `Your worst took ${worst.code.length} for ${worst.row.length}. ` : ""}
            {QUESTION_ROW} has no runs at all, so every pixel costs a count and a letter: {qCode}, {qCode.length} characters
            for {QUESTION_ROW.length} pixels. <strong>Longer</strong>, twice as long.
          </p>
          <p>
            Run-length coding wins only when there are long runs: 16 white pixels code as {encode("W".repeat(16))}, 3
            characters. No lossless scheme can shrink every input: there are fewer short codes than inputs, so if some rows
            get shorter, others must get longer.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["shrunk", "expanded"]}>
          {(reach) => {
            const set = (next: string) => {
              setPx(next);
              const c = encode(next);
              if (c.length < next.length) {
                if (!best || c.length / next.length < best.code.length / best.row.length) setBest({ row: next, code: c });
                reach("shrunk");
              }
              if (c.length > next.length) {
                if (!worst || c.length / next.length > worst.code.length / worst.row.length) setWorst({ row: next, code: c });
                reach("expanded");
              }
            };
            const paint = (i: number) => {
              if (locked) return;
              set(px.slice(0, i) + (px[i] === "W" ? "B" : "W") + px.slice(i + 1));
            };
            const question = () => {
              if (locked) return;
              set(QUESTION_ROW);
            };
            const resize = () => {
              if (locked) return;
              set(px.length === 8 ? px + "W".repeat(8) : px.slice(0, 8));
            };
            const clear = () => {
              if (locked) return;
              set("W".repeat(px.length));
            };

            const diff = code.length - px.length;

            return (
              <div className={s.wrap}>
                <div className={s.strip} aria-label={`Row: ${px}`}>
                  {[...px].map((c, i) => (
                    <Control
                      key={i}
                      className={`${s.px} ${c === "B" ? s.black : s.white}`}
                      disabled={locked}
                      onClick={() => paint(i)}
                      aria-label={`Pixel ${i + 1}: ${c === "B" ? "black" : "white"}`}
                    >
                      {c}
                    </Control>
                  ))}
                </div>

                <div className={s.code} aria-label={`Code: ${locked ? "hidden" : code}`}>
                  {locked
                    ? "…"
                    : runs(px).map(([n, c], i) => (
                        <span key={i} className={`${s.chunk} ${c === "B" ? s.cb : s.cw}`}>
                          {n}
                          {c}
                        </span>
                      ))}
                </div>

                <Row>
                  <Readout label="Pixels" value={px.length} />
                  <Readout label="Code chars" value={locked ? "–" : code.length} />
                  <Readout label="Change" value={locked ? "–" : diff === 0 ? "same" : diff > 0 ? `+${diff}` : diff} />
                </Row>
                <Row>
                  <Control className="active" disabled={locked || px === QUESTION_ROW} onClick={question}>
                    Question&apos;s row
                  </Control>
                  <Control disabled={locked} onClick={resize}>
                    {px.length === 8 ? "16 pixels" : "8 pixels"}
                  </Control>
                  <Control disabled={locked || !px.includes("B")} onClick={clear}>
                    All white
                  </Control>
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
