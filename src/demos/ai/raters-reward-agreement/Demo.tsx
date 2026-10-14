"use client";

// Sycophancy toy. 100 comparisons between two models' answers. In 50 the user is right: both models give
// the same answer, so each wins half (25 each). In 50 the user is wrong: raters pick the answer agreeing
// with them a share `agree` of the time (invented: 70%). Agreeable wins 25 + 35 = 60, Correct 25 + 15 = 40.
// Accuracy: Correct 100%, Agreeable 50% (it is right only when the user is). At 50%: 50/50. At 30%: 40/60.
// Votes are exact expected counts, no sampling, so every run is the same.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
const N = 100;
const USER_WRONG = 0.5;
function votes(agree: number) {
  const wrong = Math.round(N * USER_WRONG);
  const right = N - wrong;
  const agreeableWrong = Math.round(wrong * agree);
  const correctWrong = wrong - agreeableWrong;
  const half = right / 2;
  return {
    agreeable: { fromRight: half, fromWrong: agreeableWrong, total: half + agreeableWrong },
    correct: { fromRight: half, fromWrong: correctWrong, total: half + correctWrong },
  };
}
const ACCURACY = { agreeable: 1 - USER_WRONG, correct: 1 };
// MODEL END

type Preset = { id: "q" | "tie" | "honest"; agree: number; label: string };
const PRESETS: Preset[] = [
  { id: "q", agree: 0.7, label: "Collect 100 votes" },
  { id: "tie", agree: 0.5, label: "Raters favour agreement 50%" },
  { id: "honest", agree: 0.3, label: "Raters favour agreement 30%" },
];
const MILESTONES = ["question-case", "tie-seen"] as const;
const pct = (f: number) => `${Math.round(f * 100)}%`;
const CHIP = 12;
const PITCH = 15;
const CARD_W = 164;
const CARD_X = [4, 172];
const GRID_Y = 52;

type Tally = ReturnType<typeof votes>;
type Rec = Partial<Record<Preset["id"], Tally>>;

export default function RatersRewardAgreement({ slug }: { slug: string }) {
  const [preset, setPreset] = useState<Preset | null>(null);
  const [rec, setRec] = useState<Rec>({});
  const v = preset ? votes(preset.agree) : null;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Users are wrong half the time. When wrong, they pick the answer agreeing with them 7 in 10 times. Their votes favour:",
        options: ["The always-correct model", "The always-agreeing model", "Neither; they tie"],
        answer: 1,
      }}
      exploreHint="Collect the votes, then change how often raters favour agreement."
      minInteractions={MILESTONES.length}
      reveal={() => {
        const q = rec.q ?? votes(0.7);
        return (
          <>
            <p>
              The Agreeable model was right only half the time, yet it won <strong>{q.agreeable.total}</strong> votes to{" "}
              <strong>{q.correct.total}</strong>. When users were right, both models said the same thing and split the votes.
              Every difference came from users who were wrong, and 7 in 10 of them preferred being agreed with.
            </p>
            <p>
              A reward model fitted to these votes learns to agree. At 50% the models tied; only below that did honesty win.
              Preferences teach what people like, not what is true.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const pick = (p: Preset | null) => {
              setPreset(p);
              if (!p) return;
              setRec((old) => ({ ...old, [p.id]: votes(p.agree) }));
              if (p.id === "q") reach("question-case");
              if (p.id === "tie") reach("tie-seen");
            };
            const shown = !locked && v;
            const cards = [
              { key: "agreeable" as const, name: "Agreeable" },
              { key: "correct" as const, name: "Correct" },
            ];
            return (
              <div className={s.wrap}>
                <p className={s.caption}>When the user is right, both models give the same answer. Rates are invented.</p>
                <svg
                  viewBox="0 0 340 152"
                  className={`stage-svg ${s.svg}`}
                  role="img"
                  aria-label={shown ? `Agreeable ${v.agreeable.total} votes, Correct ${v.correct.total}` : "Two models, no votes yet"}
                >
                  {cards.map((c, k) => {
                    const t = shown ? v[c.key] : null;
                    const other = shown ? v[cards[1 - k].key] : null;
                    const win = t && other && t.total > other.total;
                    return (
                      <g key={c.key}>
                        <rect x={CARD_X[k]} y={2} width={CARD_W} height={148} rx={8} className={win ? s.cardWin : s.card} />
                        <text x={CARD_X[k] + 8} y={19} className={s.label} fill="var(--fg)">
                          {c.name}
                        </text>
                        <text x={CARD_X[k] + CARD_W - 8} y={19} textAnchor="end" className={s.label} fill="var(--fg)">
                          {t ? `${t.total} votes` : "– votes"}
                        </text>
                        <text x={CARD_X[k] + 8} y={36} className={s.small} fill="var(--muted)">
                          right {pct(ACCURACY[c.key])} of the time
                        </text>
                        {Array.from({ length: 60 }, (_, i) => {
                          const x = CARD_X[k] + 8 + (i % 10) * PITCH;
                          const y = GRID_Y + Math.floor(i / 10) * PITCH;
                          if (!t || i >= t.total) return <rect key={i} x={x} y={y} width={CHIP} height={CHIP} rx={2} className={s.slot} />;
                          const fromRight = i < t.fromRight;
                          return (
                            <rect
                              key={i}
                              x={x + (fromRight ? 0 : 0.7)}
                              y={y + (fromRight ? 0 : 0.7)}
                              width={fromRight ? CHIP : CHIP - 1.4}
                              height={fromRight ? CHIP : CHIP - 1.4}
                              rx={2}
                              className={fromRight ? s.chipRight : s.chipWrong}
                            />
                          );
                        })}
                      </g>
                    );
                  })}
                </svg>
                <p className={s.caption}>Votes won: ■ user was right · □ user was wrong</p>
                <p className={s.msg} data-testid="readout">
                  {shown
                    ? `Agreeable wins ${v.agreeable.total} · Correct ${v.correct.total} · accuracy ${pct(ACCURACY.agreeable)} vs ${pct(ACCURACY.correct)}`
                    : "Agreeable wins – · Correct –"}
                </p>
                {!locked && (rec.q || rec.tie || rec.honest) && (
                  <p className={s.seen} data-testid="seen">
                    Seen (Agreeable · Correct):
                    {PRESETS.filter((p) => rec[p.id])
                      .map((p) => ` at ${pct(p.agree)} ${rec[p.id]!.agreeable.total} · ${rec[p.id]!.correct.total}`)
                      .join(";")}
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
