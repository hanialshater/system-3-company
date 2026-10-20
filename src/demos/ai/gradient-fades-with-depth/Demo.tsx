"use client";

// Vanishing gradients toy. Backprop multiplies the error signal by each layer's activation slope.
// Toy: weights 1, every unit at input 0, where the sigmoid's slope s(1 - s) is its maximum, 0.25.
// The layer k steps from the output (k = 1 for the last layer) receives slope^k of the signal:
// 10 sigmoid layers -> layer 1 gets 0.25^10 = 9.54e-7 (0.0000954%, "about 0.0001%");
// 3 sigmoid layers -> 0.25^3 = 1.5625% ("1.6%"); ReLU on its active side has slope 1 -> 100%.
// Deterministic; no randomness.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
type Net = { id: "sig10" | "relu10" | "sig3"; layers: number; slope: number; name: string };
const NETS: Net[] = [
  { id: "sig10", layers: 10, slope: 0.25, name: "10 sigmoid" },
  { id: "relu10", layers: 10, slope: 1, name: "10 ReLU" },
  { id: "sig3", layers: 3, slope: 0.25, name: "3 sigmoid" },
];
/** Share of the output's error signal that reaches layer `layer` (1 = first) of a net. */
const share = (net: Net, layer: number) => net.slope ** (net.layers - layer + 1);
// MODEL END

/** Stage rounding: one decimal at 1% and above, one significant figure below. */
const pct = (f: number) => {
  const p = f * 100;
  if (p >= 1) return `${Number(p.toFixed(1))}%`;
  return `${Number(p.toPrecision(1))}%`;
};

const MILESTONES = ["question-case", "relu-seen"] as const;
const COLS = 10;
const X0 = 57;
const CW = 24;
const GAP = 3;
const TOP = 58;
const DEC = 17; // px per decade
const BOTTOM = TOP + 7 * DEC; // 1e-7 of the signal
const y = (f: number) => TOP + -Math.log10(f) * DEC;
const colX = (c: number) => X0 + c * (CW + GAP); // c = 0..9, column 9 is next to the output

type Seen = Partial<Record<Net["id"], number>>;

export default function GradientFadesWithDepth({ slug }: { slug: string }) {
  const [net, setNet] = useState<Net | null>(null);
  const [seen, setSeen] = useState<Seen>({});

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A gradient passes back through 10 layers. Each multiplies it by the sigmoid's slope, 0.25. Layer 1 receives what share of the original?",
        options: ["About 25%", "About 2.5%", "About 0.0001%"],
        answer: 2,
      }}
      exploreHint="Send the signal back through each stack and read what layer 1 gets."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Each sigmoid layer passed back at most a quarter of what it received. After ten layers, a quarter of a quarter, ten
            times over, left layer 1 about <strong>{pct(seen.sig10 ?? share(NETS[0], 1))}</strong> of the signal, so its weights
            barely move.{seen.sig3 !== undefined ? ` With three layers it still got ${pct(seen.sig3)}.` : ""} That is why deep
            sigmoid networks were hard to train.
          </p>
          <p>
            ReLU&apos;s slope is 1 wherever it is active, so all ten layers got the full signal,{" "}
            <strong>{pct(seen.relu10 ?? 1)}</strong>.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const pick = (n: Net | null) => {
              setNet(n);
              if (!n) return;
              setSeen((old) => ({ ...old, [n.id]: share(n, 1) }));
              if (n.id === "sig10") reach("question-case");
              if (n.id === "relu10") reach("relu-seen");
            };
            const first = net ? COLS - net.layers : 0; // leftmost column used by this net
            const showTicks = seen.sig10 !== undefined && net?.id !== "sig10";
            return (
              <div className={s.wrap}>
                <span className={`tag ${s.model}`}>Toy: weights 1, every unit at its steepest</span>
                <svg
                  viewBox="0 0 340 204"
                  className={`stage-svg ${s.svg}`}
                  role="img"
                  aria-label={net ? `${net.name} layers: layer 1 gets ${pct(share(net, 1))}` : "Ten empty layers"}
                >
                  <text x={330} y={12} textAnchor="end" className={s.small} fill="var(--muted)">
                    ◀ signal flows back from the output
                  </text>
                  {Array.from({ length: COLS }, (_, c) => {
                    const used = net && c >= first;
                    const layer = net ? c - first + 1 : c + 1;
                    return (
                      <g key={c}>
                        <rect
                          x={colX(c)}
                          y={20}
                          width={CW}
                          height={24}
                          rx={4}
                          className={!locked && used ? s.boxOn : s.box}
                          opacity={net && !used ? 0.25 : 1}
                        />
                        {(!net || used) && (
                          <text x={colX(c) + CW / 2} y={36} textAnchor="middle" className={s.label} fill="var(--fg)">
                            {layer}
                          </text>
                        )}
                      </g>
                    );
                  })}
                  {[0, 2, 4, 6].map((d) => (
                    <g key={d}>
                      <line x1={X0 - 4} x2={colX(COLS - 1) + CW} y1={y(10 ** -d)} y2={y(10 ** -d)} className={s.grid} />
                      <text x={X0 - 6} y={y(10 ** -d) + 4} textAnchor="end" className={s.small} fill="var(--muted)">
                        {pct(10 ** -d)}
                      </text>
                    </g>
                  ))}
                  <line x1={X0 - 4} x2={colX(COLS - 1) + CW} y1={BOTTOM} y2={BOTTOM} stroke="var(--fg)" strokeWidth={1} />
                  {!locked &&
                    net &&
                    Array.from({ length: net.layers }, (_, i) => {
                      const c = first + i;
                      const f = share(net, i + 1);
                      return <rect key={c} x={colX(c) + 3} y={y(f)} width={CW - 6} height={BOTTOM - y(f)} className={s.bar} />;
                    })}
                  {!locked &&
                    showTicks &&
                    Array.from({ length: COLS }, (_, c) => {
                      const f = share(NETS[0], c + 1);
                      return <line key={c} x1={colX(c)} x2={colX(c) + CW} y1={y(f)} y2={y(f)} className={s.tick} />;
                    })}
                  <text x={X0} y={BOTTOM + 15} className={s.small} fill="var(--muted)">
                    {showTicks && !locked ? "dashes: 10 sigmoid layers" : "bar: share of the signal each layer gets"}
                  </text>
                </svg>
                <p className={s.msg} data-testid="seen">
                  Layer 1 gets:{" "}
                  {locked
                    ? "–"
                    : NETS.map((n, i) => (
                        <span key={n.id} className={net?.id === n.id ? s.now : undefined}>
                          {i ? " · " : ""}
                          {n.name} {seen[n.id] !== undefined ? pct(seen[n.id]!) : "–"}
                        </span>
                      ))}
                </p>
                <Row foldAtReveal>
                  {NETS.map((n) => (
                    <Control
                      key={n.id}
                      className={net?.id === n.id ? "active" : ""}
                      aria-pressed={net?.id === n.id}
                      disabled={locked || net?.id === n.id}
                      onClick={() => pick(n)}
                    >
                      {n.name} layers
                    </Control>
                  ))}
                  <Control disabled={locked || !net} onClick={() => pick(null)}>
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
