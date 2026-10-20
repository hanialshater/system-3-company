"use client";

// One bacterium that splits every 20 minutes. The learner scrubs time over
// 10 hours (30 doublings) and switches between food that is kept topped up
// and a single batch of food. The colony is drawn with its area proportional
// to the number of cells, scaled so that 2^30 cells exactly fill the dish.
// One-batch model (made up): logistic growth with food for 100 million cells.

import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const STEPS = 30; // 20-minute steps in 10 hours
const FULL = 2 ** 30; // cells that fill the drawn dish
const K = 1e8; // one batch of food feeds about this many cells
const R = 136; // dish radius in svg units
type Food = "topped" | "batch";

function cells(k: number, food: Food) {
  if (food === "topped") return 2 ** k;
  const r = Math.log(2); // per 20-minute step
  return K / (1 + (K - 1) * Math.exp(-r * k));
}

function fmt(n: number) {
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)} billion`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(n >= 1e8 ? 0 : 1)} million`;
  return Math.round(n).toLocaleString("en-US");
}

const pctText = (n: number) => {
  const p = (100 * n) / FULL;
  if (p < 0.1) return "under 0.1%";
  return `${p < 1 ? p.toFixed(1) : Math.round(p)}%`;
};

function clock(k: number) {
  const min = k * 20;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}

export default function DishRunsOut({ slug }: { slug: string }) {
  const [k, setK] = useState(0);
  const [food, setFood] = useState<Food>("topped");
  const hit = useRef(new Set<string>());

  const n = cells(k, food);
  const radius = R * Math.sqrt(n / FULL);
  const foodLeft = food === "topped" ? 1 : Math.max(0, 1 - n / K);
  const speck = radius < 6;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "You put one bacterium in a dish with plenty of food. It splits in two every 20 minutes. When you check 10 hours later, about how many bacteria are there?",
        options: ["About 30,000", "About a million", "About a billion"],
        answer: 2,
      }}
      exploreHint="With food topped up, jump to 7 h, 9 h 40, then 10 h. Then switch to one batch of food."
      minInteractions={4}
      reveal={() => (
        <>
          <p>
            10 hours is 30 lots of 20 minutes, so one cell doubles 30 times: 2<sup>30</sup>, about <strong>{fmt(FULL)}</strong>. At 7 h you saw{" "}
            {fmt(cells(21, "topped"))}, under 1% of that. At 9 h 40 you saw {fmt(cells(29, "topped"))}: half of all the
            cells arrived in the last 20 minutes.
          </p>
          <p>
            With one batch of food the curve bent and levelled off near 100 million ({fmt(cells(STEPS, "batch"))} at 10 h).
            Doubling feels slow, then suddenly everywhere, and something finite ends it.
          </p>
          <p className="muted">
            E. coli can double about every 20 minutes in rich lab broth; many bacteria are far slower. The food batch
            here is made up.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const go = (nk: number, nf: Food) => {
          const kk = Math.max(0, Math.min(STEPS, nk));
          setK(kk);
          setFood(nf);
          const mark = (key: string) => {
            if (!hit.current.has(key)) {
              hit.current.add(key);
              interact();
            }
          };
          if (nf === "topped" && kk === 21) mark("seven-hours");
          if (nf === "topped" && kk === 29) mark("half-way-in-last-20");
          if (nf === "topped" && kk === STEPS) mark("full");
          if (nf === "batch" && kk === STEPS) mark("batch");
        };
        const msg = locked
          ? "Make a prediction to start."
          : k === 0
            ? "Time 0: one cell. Each cell splits every 20 minutes."
            : food === "batch"
              ? `${clock(k)}: ${k} doublings, ${fmt(n)} cells. The food batch feeds about 100 million${foodLeft < 0.15 ? ", so growth stalls" : ""}.`
              : k === STEPS
                ? `${clock(k)}: ${k} doublings, ${fmt(n)} cells. The dish is full (100%).`
                : `${clock(k)}: ${k} doublings, ${fmt(n)} cells (${pctText(n)} of the 10 h count).`;
        return (
          <div className={s.wrap}>
            <svg viewBox="0 0 300 300" className={`stage-svg ${s.svg}`} role="img" aria-label={`Dish at ${clock(k)}: ${fmt(n)} cells`}>
              <circle cx={150} cy={150} r={R + 8} className={s.rim} />
              <circle cx={150} cy={150} r={R} className={s.agar} style={{ fillOpacity: 0.15 + 0.6 * foodLeft }} />
              <circle cx={150} cy={150} r={Math.max(1.5, radius)} className={s.colony} />
              {speck && !locked && <circle cx={150} cy={150} r={14} className={s.marker} />}
            </svg>

            <p className={s.msg} aria-live="polite">{msg}</p>

            <Slider
              label="Time"
              value={k}
              min={0}
              max={STEPS}
              disabled={locked}
              format={clock}
              onChange={(v) => go(v, food)}
            />
            <Row>
              <Control disabled={locked || k >= STEPS} onClick={() => go(k + 1, food)}>
                +20 min
              </Control>
              <Control disabled={locked || k >= 21} onClick={() => go(21, food)}>
                To 7 h
              </Control>
              <Control disabled={locked || k >= 29} onClick={() => go(29, food)}>
                To 9 h 40
              </Control>
              <Control disabled={locked || k >= STEPS} onClick={() => go(STEPS, food)}>
                To 10 h
              </Control>
              <Readout label="Cells" value={locked ? "1" : fmt(n)} />
            </Row>
            <Row>
              <Control
                className={`${s.chip} ${food === "topped" ? "active" : ""}`}
                aria-pressed={food === "topped"}
                disabled={locked || food === "topped"}
                onClick={() => go(k, "topped")}
              >
                Food topped up
              </Control>
              <Control
                className={`${s.chip} ${food === "batch" ? "active" : ""}`}
                aria-pressed={food === "batch"}
                disabled={locked || food === "batch"}
                onClick={() => go(k, "batch")}
              >
                One batch (feeds 100 million)
              </Control>
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
