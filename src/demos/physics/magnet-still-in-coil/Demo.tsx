"use client";

// Induction needs change. A bar magnet on the axis of a 100-turn coil (radius 2 cm) wired
// to a centre-zero meter. Flux through the coil (illustrative, on-axis dipole through a
// short coil): Phi(z) = 0.1 mWb / (1 + (z / 2 cm)^2)^1.5. Faraday: emf = -N dPhi/dt. Push in
// and pull out each take 0.3 s (smoothstep from z = -8 cm to 0 and back), peaking at about
// 123 mV, opposite signs; holding still inside gives dPhi/dt = 0, so exactly 0 mV however
// strong the magnet. The meter's needle plus a chart of its reading (10 ms samples, last 3 s).
//
// Earned reveal: milestones "pushed", "held-inside", "pulled". QA path: Push in (0.3 s
// animation, done inside the 450 ms wait), Hold still 1 s, Pull out.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useEffect, useRef, useState } from "react";
import s from "./styles.module.css";

const N = 100;
const PHI0 = 1e-4; // Wb, illustrative
const A = 0.02; // m
const Z_OUT = -0.08; // m
const T_MOVE = 0.3; // s
const DT = 0.01; // s per sample
const WINDOW = 300; // samples shown (3 s)

const phi = (z: number) => PHI0 / Math.pow(1 + (z / A) ** 2, 1.5);
const dphiDz = (z: number) => PHI0 * -1.5 * Math.pow(1 + (z / A) ** 2, -2.5) * ((2 * z) / (A * A));
/** emf (V) at time t into a move from z0 to z1 */
const emfAt = (z0: number, z1: number, t: number) => {
  const u = Math.min(1, Math.max(0, t / T_MOVE));
  const z = z0 + (z1 - z0) * (3 * u * u - 2 * u * u * u);
  const dzdt = ((z1 - z0) * 6 * u * (1 - u)) / T_MOVE;
  return -N * dphiDz(z) * dzdt;
};
const zAt = (z0: number, z1: number, t: number) => {
  const u = Math.min(1, Math.max(0, t / T_MOVE));
  return z0 + (z1 - z0) * (3 * u * u - 2 * u * u * u);
};
const mv = (v: number) => `${v > 0.0005 ? "+" : ""}${Math.round(v * 1000)} mV`;

const W = 320;
const H = 196;
const CX = 150; // coil centre x
const CY = 50;
const KZ = 1000; // px per m
const MX = 282; // meter centre
const MY = 66;
const MR = 30;
const MMAX = 0.15; // V full scale
const TR_TOP = 112;
const TR_MID = 146;
const TR_K = 200; // px per V

type Move = { z0: number; z1: number; start: number; kind: "in" | "out" };

export default function MagnetStillInCoil({ slug }: { slug: string }) {
  const [z, setZ] = useState(Z_OUT);
  const [emf, setEmf] = useState(0);
  const [trace, setTrace] = useState<number[]>([]);
  const [move, setMove] = useState<Move | null>(null);
  const [peaks, setPeaks] = useState<{ in?: number; out?: number; held?: number }>({});
  const [heldTotal, setHeldTotal] = useState(0);
  const reachRef = useRef<(n: string) => void>(() => {});

  useEffect(() => {
    if (!move) return;
    let raf = 0;
    let done = 0;
    let peak = 0;
    const tick = (now: number) => {
      const e = (now - move.start) / 1000;
      const want = Math.min(Math.round(T_MOVE / DT), Math.floor(e / DT));
      if (want > done) {
        const add: number[] = [];
        for (let i = done; i < want; i++) {
          const v = emfAt(move.z0, move.z1, (i + 0.5) * DT);
          add.push(v);
          if (Math.abs(v) > Math.abs(peak)) peak = v;
        }
        done = want;
        setTrace((tr) => [...tr, ...add].slice(-WINDOW));
      }
      if (e >= T_MOVE) {
        setZ(move.z1);
        setEmf(0);
        setPeaks((p) => ({ ...p, [move.kind]: peak }));
        reachRef.current(move.kind === "in" ? "pushed" : "pulled");
        setMove(null);
        return;
      }
      setZ(zAt(move.z0, move.z1, e));
      setEmf(emfAt(move.z0, move.z1, e));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [move]);

  const inside = Math.abs(z) < 1e-9;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "A strong magnet is held still inside a coil wired to a sensitive meter. The meter reads…",
        options: ["A steady current", "Zero", "A current the opposite way to when it moved"],
        answer: 1,
      }}
      exploreHint="Push the magnet in, hold it still, then pull it out."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            Pushing in, the needle kicked to <strong>{mv(peaks.in ?? 0)}</strong>. Held still inside for {peaks.held ?? 1} s,
            it read 0 mV, magnet and all. Pulling out, it kicked the other way, to {mv(peaks.out ?? 0)}.
          </p>
          <p>
            A coil responds to a change in the magnetism through it, not to the magnetism itself (Faraday&apos;s law: voltage
            = turns × rate of change of flux). A still magnet gives a steady flux, so no voltage and no current.
          </p>
          <p className="muted">The coil, magnet and meter values are illustrative; the zero while still is not.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["pushed", "held-inside", "pulled"]}>
          {(reach) => {
            reachRef.current = reach;
            const start = (z1: number, kind: "in" | "out") => setMove({ z0: z, z1, start: performance.now(), kind });
            const hold = () => {
              setTrace((tr) => [...tr, ...new Array(Math.round(1 / DT)).fill(0)].slice(-WINDOW));
              setHeldTotal((h) => h + 1);
              if (inside) {
                setPeaks((p) => ({ ...p, held: (p.held ?? 0) + 1 }));
                reach("held-inside");
              }
            };
            const mx = CX + z * KZ;
            const ang = (-Math.max(-1, Math.min(1, (locked ? 0 : emf) / MMAX)) * Math.PI) / 2.4;
            const pts = trace.map((v, i) => `${10 + (i + (WINDOW - trace.length))},${TR_MID - Math.max(-0.16, Math.min(0.16, v)) * TR_K}`).join(" ");
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Magnet ${inside ? "inside" : "outside"} the coil; meter ${mv(emf)}`}>
                  {/* coil turns */}
                  {[-24, -16, -8, 0, 8, 16, 24].map((dx) => (
                    <ellipse key={dx} cx={CX + dx} cy={CY} rx={4} ry={A * KZ} className={s.turn} />
                  ))}
                  {/* magnet */}
                  <rect x={mx - 30} y={CY - 7} width={30} height={14} className={s.north} />
                  <rect x={mx} y={CY - 7} width={30} height={14} className={s.south} />
                  <text x={mx - 15} y={CY + 3.5} textAnchor="middle" className={s.pole}>
                    N
                  </text>
                  <text x={mx + 15} y={CY + 3.5} textAnchor="middle" className={s.pole}>
                    S
                  </text>
                  {/* wires to meter */}
                  <path d={`M${CX + 24},${CY + A * KZ} L${CX + 24},${CY + 34} L${MX},${CY + 34} L${MX},${MY + 6}`} className={s.wireLine} />
                  {/* centre-zero meter */}
                  <path d={`M${MX - MR},${MY} A${MR},${MR} 0 0 1 ${MX + MR},${MY}`} className={s.meter} />
                  <line x1={MX} y1={MY - MR} x2={MX} y2={MY - MR + 5} className={s.tick} />
                  <line x1={MX} y1={MY} x2={MX + (MR - 4) * Math.sin(ang)} y2={MY - (MR - 4) * Math.cos(ang)} className={s.needle} />
                  <circle cx={MX} cy={MY} r={2.5} className={s.hub} />
                  <text x={MX} y={MY - MR - 4} textAnchor="middle" className={s.chip}>
                    meter
                  </text>
                  {/* chart of the meter's reading */}
                  <line x1={10} y1={TR_MID} x2={10 + WINDOW} y2={TR_MID} className={s.zero} />
                  <text x={12} y={TR_TOP - 2} className={s.chip}>
                    Meter reading, last 3 s (0 on the line)
                  </text>
                  {!locked && trace.length > 1 && <polyline points={pts} className={s.trace} />}
                  <text x={4} y={H - 4} className={s.chip}>
                    Illustrative coil: 100 turns.
                  </text>
                </svg>

                <Row>
                  <Control disabled={locked || move !== null || inside} onClick={() => start(0, "in")}>
                    Push in
                  </Control>
                  <Control disabled={locked || move !== null} onClick={hold}>
                    Hold still 1 s
                  </Control>
                  <Control disabled={locked || move !== null || !inside} onClick={() => start(Z_OUT, "out")}>
                    Pull out
                  </Control>
                </Row>
                <Row>
                  <Readout label="Meter now" value={locked ? "?" : mv(emf)} />
                  <Readout label="Magnet" value={move ? "moving" : inside ? "still, inside" : "still, outside"} />
                  <Readout label="Held still" value={`${heldTotal} s`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
