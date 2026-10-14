"use client";

// Newton's square root of 2 as a ladder. Each rung is one update g -> (g + 2/g) / 2 in double precision,
// starting from g = 1. Correct significant digits are counted by comparing the 17-significant-digit string of g
// with the true decimal string of sqrt(2) (not Math.SQRT2, which is itself a rounded double): 1, 1, 3, 6, 12, 15,
// then no change. The magnifier draws g, 2/g, sqrt(2) and the next g on a number line rescaled so g and 2/g sit
// 240 px apart; positions use exact decimal expansions of the doubles (BigInt), so the last rungs are drawn
// correctly. One representation: the ladder; the magnifier zooms into one rung of it.

import { useEffect, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

// sqrt(2) to 45 significant digits (OEIS A002193).
const SQRT2 = "1.41421356237309504880168872420969807856967187";
const SIG = 45;

const G: number[] = [1];
while (G.length < 12) {
  const g = G[G.length - 1];
  const next = (g + 2 / g) / 2;
  G.push(next);
  if (next === g) break;
}
// G = [1, 1.5, 1.41666..., 1.41421568..., 1.41421356237469, 1.4142135623730949, same]
const RUNGS = G.length; // 7: rung 6 is the "no change" row
const LAST_CHANGE = RUNGS - 2; // 5

function correctDigits(g: number) {
  const str = g.toPrecision(17);
  let c = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== SQRT2[i]) break;
    if (str[i] !== ".") c++;
  }
  return c;
}
const DIGITS = G.map(correctDigits);

// Exact value of a double near 1.4, as an integer in units of 10^-(SIG-1).
const big = (x: number) => BigInt(x.toPrecision(SIG).replace(".", ""));
const ROOT = BigInt(SQRT2.replace(".", ""));
const UNIT = 10 ** (SIG - 1);

function zoomLabel(z: number) {
  if (z < 1.5) return "×1";
  const r = Number(z.toPrecision(2));
  if (r < 1e6) return `×${r.toLocaleString("en-US")}`;
  const e = Math.floor(Math.log10(r));
  const m = Number((r / 10 ** e).toPrecision(2));
  const sup = String(e)
    .split("")
    .map((d) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(d)])
    .join("");
  return `×${m} × 10${sup}`;
}

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export default function NewtonDoublesTheDigits({ slug }: { slug: string }) {
  const [count, setCount] = useState(1); // rungs shown
  const [sel, setSel] = useState(0);
  const [busy, setBusy] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const done = count >= RUNGS;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Estimate √2 by repeating g = (g + 2/g) / 2, starting from g = 1. How many updates until g is right to 12 significant digits?",
        options: ["4", "8", "12"],
        answer: 0,
      }}
      exploreHint="Update a few times and watch the bold digits."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            Your guesses had {DIGITS.slice(1, 4).join(", ")}, then {DIGITS[4]} correct digits: {DIGITS[4]}{" "}
            after four updates, not twelve.
          </p>
          <p>
            When g is too big, 2 ÷ g is too small by about the same amount, so their average lands much nearer √2. The
            new error is about the old error squared (divided by 2.8), so the correct digits roughly double each update.
          </p>
          <p>
            {count >= RUNGS
              ? `The fifth update reached ${DIGITS[LAST_CHANGE]} digits, the limit of the computer's numbers, and the sixth changed nothing. `
              : ""}
            This is Newton&apos;s method for g² = 2, the rule known as the Babylonian (or Heron&apos;s) method.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["four-updates"]}>
          {(reach) => {
            const show = (c: number) => {
              setCount(c);
              setSel(c - 1);
              if (c >= 5) reach("four-updates");
            };
            const updateOnce = () => {
              if (locked || busy || done) return;
              show(count + 1);
            };
            const updateAll = () => {
              if (locked || busy || done) return;
              if (reducedMotion()) {
                show(RUNGS);
                return;
              }
              setBusy(true);
              for (let c = count + 1; c <= RUNGS; c++) {
                const last = c === RUNGS;
                timers.current.push(
                  setTimeout(() => {
                    show(c);
                    if (last) setBusy(false);
                  }, 60 * (c - count)),
                );
              }
            };

            // Magnifier for the selected rung (rung 6 shows rung 5's picture: nothing changed).
            const r = Math.min(sel, LAST_CHANGE);
            const g = G[r];
            const q = 2 / g;
            const next = G[r + 1];
            const bg = big(g);
            const bq = big(q);
            const lo = bg < bq ? bg : bq;
            const hi = bg < bq ? bq : bg;
            const mid = (lo + hi) / BigInt(2);
            const gap = Number(hi - lo);
            const X = (v: bigint) => 170 + (Number(v - mid) * 240) / gap;
            const zoom = UNIT / gap;
            const xg = X(bg);
            const xq = X(bq);
            const xr = X(ROOT);
            const xn = X(big(next));
            const selLabel = `Update ${sel}: ${DIGITS[sel]} correct digits`;

            return (
              <div className={s.wrap}>
                <p className={s.rule}>Update: g becomes the average of g and 2 ÷ g.</p>
                <div className={s.ladder} role="list" aria-label={selLabel}>
                  {G.slice(0, count).map((v, i) => {
                    if (i === RUNGS - 1) {
                      return (
                        <div key={i} role="listitem" className={`${s.rung} ${s.same} ${sel === i ? s.sel : ""}`}>
                          <span className={s.idx}>#{i}</span>
                          <span className={s.g}>no change</span>
                        </div>
                      );
                    }
                    const str = v.toPrecision(17);
                    const d = DIGITS[i];
                    const cut = d >= 2 ? d + 1 : d;
                    return (
                      <div key={i} role="listitem" className={`${s.rung} ${sel === i ? s.sel : ""}`}>
                        <span className={s.idx}>#{i}</span>
                        <span className={s.g}>
                          <b className={s.ok}>{str.slice(0, cut)}</b>
                          <span className={s.rest}>{str.slice(cut)}</span>
                        </span>
                        <span className={s.barCell}>
                          <span className={s.bar} style={{ width: d * 8 }} />
                          <span className={s.cnt}>{d}</span>
                        </span>
                      </div>
                    );
                  })}
                </div>
                <svg
                  viewBox="0 0 340 112"
                  className={`stage-svg ${s.mag}`}
                  role="img"
                  aria-label={`Update ${sel}: g ${g.toPrecision(17)}, 2 ÷ g ${q.toPrecision(17)}, zoom ${zoomLabel(zoom)}`}
                >
                  <text x={4} y={14} className={s.zoom}>
                    #{sel}
                    {sel > LAST_CHANGE ? ": same as #5" : ""} · zoom {zoomLabel(zoom)}
                  </text>
                  <line x1={10} x2={330} y1={64} y2={64} stroke="var(--line)" strokeWidth={2} />
                  <line x1={xg} x2={xg} y1={50} y2={70} stroke="var(--fg)" strokeWidth={2.5} />
                  <text x={xg} y={44} textAnchor="middle" className={s.mk}>
                    g
                  </text>
                  <line x1={xq} x2={xq} y1={50} y2={70} stroke="var(--fg)" strokeWidth={2.5} />
                  <text x={xq} y={44} textAnchor="middle" className={s.mk}>
                    2 ÷ g
                  </text>
                  <circle cx={xr} cy={84} r={6} fill="none" stroke="var(--fg)" strokeWidth={2} />
                  <text x={xr} y={106} textAnchor="middle" className={s.mk}>
                    √2
                  </text>
                  <circle cx={xn} cy={64} r={5.5} fill="var(--domain)" stroke="var(--fg)" strokeWidth={1} />
                  <text x={xn} y={30} textAnchor="middle" className={s.avg}>
                    average
                  </text>
                </svg>
                <Row>
                  <Control className="tap" disabled={locked || busy || done} onClick={updateOnce}>
                    Update g
                  </Control>
                  <Control className="tap" disabled={locked || busy || done} onClick={updateAll}>
                    Update until it stops changing
                  </Control>
                </Row>
                <Slider
                  label="Look at update"
                  min={0}
                  max={Math.max(1, count - 1)}
                  value={sel}
                  onChange={(v) => setSel(Math.min(v, count - 1))}
                  disabled={locked || busy || count < 2}
                />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
