"use client";

// Proxy discrimination toy. 50 applicants in group A (circles), 50 in group B (squares). Past lenders
// approved 80% of A and 40% of B in every neighbourhood. A share `seg` of each group lives in its own
// neighbourhood (A in N1, B in N2). The model never sees the group: it approves a whole neighbourhood
// if more than half of its past applicants there were approved.
// seg 80%: N1 (40 A + 10 B) past (32 + 4) / 50 = 72% -> approve; N2 (10 A + 40 B) (8 + 16) / 50 = 48% -> reject.
//   model approves A 40/50 = 80%, B 10/50 = 20%.
// seg 50%: both 60% -> both approved, A 100%, B 100%.  seg 90%: N1 76%, N2 44%; A 90%, B 10%.
// Learner r10 (W-839): the model's rule is in the question; at the reveal, if Reset left the grids empty, the
// question's case (80% together) comes back so the filled grids the reveal quotes are on screen.
// Dot positions inside a box are shuffled by mulberry32 seed 1 (first seed, untuned; positions do not change any number).

import { useEffect, useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

// MODEL START
const PER_GROUP = 50;
const PAST = { A: 0.8, B: 0.4 };
type Hood = { a: number; b: number; past: number; approve: boolean };
function world(seg: number) {
  const a1 = Math.round(seg * PER_GROUP);
  const b1 = PER_GROUP - a1;
  const mk = (a: number, b: number): Hood => {
    const past = (a * PAST.A + b * PAST.B) / (a + b);
    return { a, b, past, approve: past > 0.5 };
  };
  const n1 = mk(a1, b1);
  const n2 = mk(PER_GROUP - a1, PER_GROUP - b1);
  const aOk = (n1.approve ? n1.a : 0) + (n2.approve ? n2.a : 0);
  const bOk = (n1.approve ? n1.b : 0) + (n2.approve ? n2.b : 0);
  return { hoods: [n1, n2], a: aOk / PER_GROUP, b: bOk / PER_GROUP };
}
// MODEL END

type Preset = { id: "q" | "mixed" | "extreme"; seg: number; label: string; name: string };
const PRESETS: Preset[] = [
  { id: "q", seg: 0.8, label: "Train without group", name: "80% together" },
  { id: "mixed", seg: 0.5, label: "Mixed neighbourhoods", name: "mixed" },
  { id: "extreme", seg: 0.9, label: "90% together", name: "90% together" },
];
const MILESTONES = ["question-case", "mixed-seen"] as const;
const pct = (f: number) => `${Math.round(f * 100)}%`;

const COLS = 10;
const PITCH = 15.4;
const BOX_W = COLS * PITCH + 8;
const BOX_X = [4, 340 - 4 - BOX_W];
const DOT_Y0 = 46;

function layout(a: number, b: number) {
  const kinds: ("A" | "B")[] = [...Array(a).fill("A"), ...Array(b).fill("B")];
  const rng = mulberry32(1);
  for (let i = kinds.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [kinds[i], kinds[j]] = [kinds[j], kinds[i]];
  }
  return kinds;
}

/** Runs once when the reveal opens (restores the question's case after a Reset). */
function OnReveal({ reveal, run }: { reveal: boolean; run: () => void }) {
  useEffect(() => {
    if (reveal) run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reveal]);
  return null;
}

type Rec = Partial<Record<Preset["id"], { a: number; b: number }>>;

export default function DeletedColumnStillThere({ slug }: { slug: string }) {
  const [preset, setPreset] = useState<Preset | null>(null);
  const [rec, setRec] = useState<Rec>({});
  const seg = preset?.seg ?? 0.8;
  const w = useMemo(() => world(seg), [seg]);
  const dots = useMemo(() => w.hoods.map((h) => layout(h.a, h.b)), [w]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Lenders approved 80% of group A, 40% of B. A model sees only neighbourhood, and approves a whole one if most past applicants there were approved. 4 in 5 of each group live together. Its approvals:",
        options: ["Equal for A and B", "Unequal, but less than before", "As unequal as before, or more"],
        answer: 2,
      }}
      exploreHint="Try each layout and compare A with B."
      minInteractions={MILESTONES.length}
      reveal={() => {
        const q = rec.q ?? world(0.8);
        return (
          <>
            <p>
              The model never saw anyone&apos;s group, yet it approved <strong>{pct(q.a)}</strong> of A and{" "}
              <strong>{pct(q.b)}</strong> of B, a wider gap than the lenders&apos; 80% and 40%. It learned from their biased
              decisions, and neighbourhood told it the group: most A lived in N1, most B in N2.
            </p>
            <p>
              When you mixed the neighbourhoods, neighbourhood no longer tracked group, so the model could not tell them apart: it approved everyone. Deleting the column deletes the label,
              not the pattern. Fairness has to be checked on outcomes by group, not on inputs.
            </p>
          </>
        );
      }}
    >
      {({ locked, phase, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const pick = (p: Preset | null) => {
              setPreset(p);
              if (!p) return;
              const r = world(p.seg);
              setRec((old) => ({ ...old, [p.id]: { a: r.a, b: r.b } }));
              if (p.id === "q") reach("question-case");
              if (p.id === "mixed") reach("mixed-seen");
            };
            const applied = !locked && !!preset;
            return (
              <div className={s.wrap}>
                <OnReveal reveal={phase === "reveal"} run={() => !preset && rec.q && setPreset(PRESETS[0])} />
                <svg
                  viewBox="0 0 340 134"
                  className={`stage-svg ${s.svg}`}
                  role="img"
                  aria-label={applied ? `Model approves A ${pct(w.a)}, B ${pct(w.b)}` : "100 applicants in two neighbourhoods"}
                >
                  <text x={4} y={12} className={s.small} fill="var(--muted)">
                    Past lenders approved ○ A 80%, ▢ B 40%
                  </text>
                  <text x={336} y={12} textAnchor="end" className={s.small} fill="var(--fg)">
                    {pct(seg)} together
                  </text>
                  {w.hoods.map((h, k) => (
                    <g key={k}>
                      <rect
                        x={BOX_X[k]}
                        y={20}
                        width={BOX_W}
                        height={110}
                        rx={6}
                        className={applied && h.approve ? s.hoodYes : s.hood}
                      />
                      <text x={BOX_X[k] + 6} y={35} className={s.label} fill="var(--fg)">
                        {`N${k + 1}`}
                        {applied ? ` past ${pct(h.past)} → ${h.approve ? "approve" : "reject"}` : ""}
                      </text>
                      {dots[k].map((kind, i) => {
                        const x = BOX_X[k] + 4 + (i % COLS) * PITCH + PITCH / 2;
                        const yy = DOT_Y0 + Math.floor(i / COLS) * 17 + 6;
                        const ok = applied && h.approve;
                        const fill = ok ? "var(--domain)" : "none";
                        return kind === "A" ? (
                          <circle key={i} cx={x} cy={yy} r={5.8} fill={fill} stroke="var(--fg)" strokeWidth={1.2} />
                        ) : (
                          <rect key={i} x={x - 5.5} y={yy - 5.5} width={11} height={11} fill={fill} stroke="var(--fg)" strokeWidth={1.2} />
                        );
                      })}
                    </g>
                  ))}
                </svg>
                <p className={s.msg} data-testid="summary">
                  {applied ? `Model approves A ${pct(w.a)} · B ${pct(w.b)} (filled)` : "Model approves: –"}
                </p>
                {!locked && (rec.q || rec.mixed || rec.extreme) && (
                  <p className={s.seen} data-testid="seen">
                    Seen:{" "}
                    {PRESETS.filter((p) => rec[p.id])
                      .map((p) => `${p.name} A ${pct(rec[p.id]!.a)} · B ${pct(rec[p.id]!.b)}`)
                      .join("; ")}
                  </p>
                )}
                <Row foldAtReveal>
                  {PRESETS.map((p) => (
                    <Control
                      key={p.id}
                      className={preset?.id === p.id ? "active" : ""}
                      aria-pressed={preset?.id === p.id}
                      disabled={locked || preset?.id === p.id}
                      onClick={() => pick(p)}
                    >
                      {p.label}
                    </Control>
                  ))}
                  <Control disabled={locked || !preset} onClick={() => pick(null)}>
                    Reset
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
