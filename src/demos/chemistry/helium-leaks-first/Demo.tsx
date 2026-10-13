"use client";

// Effusion (Graham's law). A simulated 2-D box of non-colliding gas particles at one temperature.
// Equal temperature = equal mean kinetic energy, so speed spread sigma is proportional to 1/sqrt(molar mass).
// Count of particles reaching a pinhole in a fixed time window (20,000 particles, window 0.5, same for every gas).
// Seeds are fixed (100 + gas index): the helium:nitrogen ratio comes out at about 2.64; the exact value for the
// theory is sqrt(28.014 / 4.003) = 2.645. Other seeds scatter around it by a few percent.
// Key states (milestones): He run and N2 run.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const GASES = [
  { id: "He", mass: 4.003 },
  { id: "N2", mass: 28.014 },
  { id: "Ne", mass: 20.18 },
  { id: "Ar", mass: 39.948 },
] as const;
type Gas = (typeof GASES)[number]["id"];
const SEED_INDEX: Record<Gas, number> = { He: 0, Ne: 1, N2: 2, Ar: 3 };
const M_HE = 4.003;
const N_PARTICLES = 20000;
const WINDOW = 0.5;
const DT = 0.01;
const HOLE_LO = 0.35;
const HOLE_HI = 0.65;
const N_SHOWN = 36;
const MILESTONES = ["he", "n2"] as const;

type Result = { hits: number; sample: { x: number; y: number; vx: number; vy: number }[] };
const cache = new Map<Gas, Result>();
function run(id: Gas): Result {
  const hit = cache.get(id);
  if (hit) return hit;
  const mass = GASES.find((g) => g.id === id)!.mass;
  const rng = mulberry32(100 + SEED_INDEX[id]);
  const gauss = () => Math.sqrt(-2 * Math.log(rng() || 1e-9)) * Math.cos(2 * Math.PI * rng());
  const sig = Math.sqrt(M_HE / mass);
  const steps = Math.round(WINDOW / DT);
  let hits = 0;
  const sample: Result["sample"] = [];
  for (let i = 0; i < N_PARTICLES; i++) {
    let x = rng();
    let y = rng();
    let vx = gauss() * sig;
    let vy = gauss() * sig;
    if (i < N_SHOWN) sample.push({ x, y, vx, vy });
    for (let k = 0; k < steps; k++) {
      x += vx * DT;
      y += vy * DT;
      if (y < 0) { y = -y; vy = -vy; }
      if (y > 1) { y = 2 - y; vy = -vy; }
      if (x < 0) { x = -x; vx = -vx; }
      if (x > 1) {
        if (y > HOLE_LO && y < HOLE_HI) hits++;
        x = 2 - x;
        vx = -vx;
      }
    }
  }
  const r = { hits, sample };
  cache.set(id, r);
  return r;
}
const n = (v: number) => v.toLocaleString("en-US");
const ratio = () => run("He").hits / run("N2").hits;

const BX = 10;
const BY = 10;
const BW = 190;
const BH = 130;
const ARROW = 34; // px of arrow per unit speed (He sigma = 1)
const MAXBAR = 1400;

export default function Effusion({ slug }: { slug: string }) {
  const [gas, setGas] = useState<Gas | null>(null);
  const [tried, setTried] = useState<Gas[]>([]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Helium (4.0 g/mol) and nitrogen (28.0 g/mol) at the same temperature leak through a pinhole. Helium escapes about…",
        options: ["2.6 times faster", "7 times faster", "at the same rate"],
        answer: 0,
      }}
      exploreHint="Run helium, then nitrogen, and compare the counts at the pinhole."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            In the same time window, <strong>{n(run("He").hits)}</strong> helium particles reached the pinhole against <strong>{n(run("N2").hits)}</strong> nitrogen: about{" "}
            <strong>{ratio().toFixed(1)} times</strong> as many.
          </p>
          <p>
            At one temperature all molecules share the same average energy, so the lighter ones move faster. Speed scales as one over the square root of mass: √(28.0 ÷ 4.0) is about 2.6.
            A simplified 2-D box with no collisions.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const pick = (id: Gas) => {
              setGas(id);
              setTried((t) => (t.includes(id) ? t : [...t, id]));
              if (id === "He") reach("he");
              if (id === "N2") reach("n2");
            };
            const r = gas ? run(gas) : null;
            const hy = BY + HOLE_LO * BH;
            const hh = (HOLE_HI - HOLE_LO) * BH;
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Simulated 2-D box, same temperature, no collisions. Arrow = speed.</p>
                <svg viewBox="0 0 320 150" className="stage-svg" role="img" aria-label={gas && !locked ? `${gas}: ${r!.hits} particles at the pinhole` : "Gas box with a pinhole"}>
                  <rect x={BX} y={BY} width={BW} height={BH} fill="none" stroke="var(--fg)" strokeWidth={2} />
                  <rect x={BX + BW - 2} y={hy} width={5} height={hh} fill="var(--bg-2)" />
                  <text x={BX + BW - 4} y={hy - 4} textAnchor="end" className={s.small}>
                    pinhole
                  </text>
                  {r &&
                    !locked &&
                    r.sample.map((p, i) => (
                      <g key={i}>
                        <line
                          x1={BX + p.x * BW}
                          y1={BY + p.y * BH}
                          x2={BX + p.x * BW + p.vx * ARROW}
                          y2={BY + p.y * BH + p.vy * ARROW}
                          stroke="var(--domain)"
                          strokeWidth={1.5}
                        />
                        <circle cx={BX + p.x * BW} cy={BY + p.y * BH} r={2.5} className={s.dot} />
                      </g>
                    ))}
                  {GASES.map((g, i) => {
                    const done = tried.includes(g.id) && !locked;
                    const y = 20 + i * 30;
                    return (
                      <g key={g.id}>
                        <text x={212} y={y + 4} className={s.small}>
                          {g.id}
                        </text>
                        <rect x={230} y={y - 8} width={80} height={14} className={s.ghostFill} />
                        {done && <rect x={230} y={y - 8} width={(run(g.id).hits / MAXBAR) * 80} height={14} className={g.id === gas ? s.main : s.soft} />}
                        {done && (
                          <text x={230} y={y + 18} className={s.small}>
                            {n(run(g.id).hits)}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
                <Row>
                  <Readout label={gas ? `${gas} at pinhole` : "At the pinhole"} value={locked || !r ? "?" : n(r.hits)} />
                </Row>
                <Row>
                  {GASES.map((g) => (
                    <Control key={g.id} className={gas === g.id ? "active" : ""} disabled={locked || gas === g.id} onClick={() => pick(g.id)}>
                      {g.id} · {g.mass.toFixed(1)} g/mol
                    </Control>
                  ))}
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
