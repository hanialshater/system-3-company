"use client";

// Live specimens for the HQ Design inspector: one small rendering per UI concept, with dummy data,
// built from the kit controls (src/kit/controls.tsx) and the global lesson classes so they look like
// a stage. They never render <Lesson> (that would track events) and never touch lesson code.
// A concept without an entry here shows a placeholder. Owner: design-engineer.

import { useEffect, useMemo, useState, type PointerEvent, type ReactNode } from "react";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { mulberry32 } from "@/kit/random";
import d from "./design.module.css";

const W = 300;
const H = 140;

function Svg({ children, h = H, label }: { children: ReactNode; h?: number; label: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${h}`} className={`stage-svg ${d.specSvg}`} role="img" aria-label={label}>
      {children}
    </svg>
  );
}
const Axis = ({ x = "x", y = "y" }: { x?: string; y?: string }) => (
  <g className={d.axis}>
    <line x1={30} y1={H - 22} x2={W - 8} y2={H - 22} />
    <line x1={30} y1={10} x2={30} y2={H - 22} />
    <text x={W - 8} y={H - 8} textAnchor="end">
      {x}
    </text>
    <text x={6} y={16}>
      {y}
    </text>
  </g>
);
const Tag = ({ x, y, children }: { x: number; y: number; children: ReactNode }) => (
  <text x={x} y={y} className={d.specTag}>
    {children}
  </text>
);
const Caption = ({ children }: { children: ReactNode }) => <p className={d.specCaption}>{children}</p>;

// A wireframe box with a label (for formats the kit cannot build yet).
const Box = ({ x, y, w, h, label, on }: { x: number; y: number; w: number; h: number; label?: string; on?: boolean }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={6} className={on ? d.wireOn : d.wire} />
    {label && (
      <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" className={d.wireText}>
        {label}
      </text>
    )}
  </g>
);

// ---------------------------------------------------------------- formats

function SingleCard() {
  const [k, setK] = useState(4);
  return (
    <>
      <Caption>Hook · one stage · ≤ 6 controls · readouts</Caption>
      <Svg label={`A bar of height ${k}`}>
        <Axis x="k" y="height" />
        <rect x={140} y={H - 22 - k * 9} width={40} height={k * 9} className={d.markDomain} />
      </Svg>
      <Row>
        <Slider label="k" value={k} min={1} max={10} onChange={setK} />
      </Row>
      <Row>
        <Readout label="height" value={k * 9} />
      </Row>
    </>
  );
}

function SimulationRun() {
  const [n, setN] = useState(0);
  const flips = useMemo(() => {
    const r = mulberry32(7);
    return Array.from({ length: 200 }, () => (r() < 0.5 ? 1 : 0));
  }, []);
  const heads = flips.slice(0, n).reduce<number>((a, b) => a + b, 0);
  return (
    <>
      <Caption>Seeded run (mulberry32, seed 7) · step and run · live tallies</Caption>
      <Svg label={`${heads} heads in ${n} flips`}>
        <Axis x="flips" y="share of heads" />
        <line x1={30} x2={W - 8} y1={H - 22 - 0.5 * 100} y2={H - 22 - 0.5 * 100} className={d.ghost} />
        <polyline
          className={d.lineDomain}
          points={flips
            .slice(0, n)
            .map((_, i) => {
              const h = flips.slice(0, i + 1).reduce<number>((a, b) => a + b, 0) / (i + 1);
              return `${30 + ((i + 1) / 200) * (W - 40)},${H - 22 - h * 100}`;
            })
            .join(" ")}
        />
      </Svg>
      <Row>
        <Control onClick={() => setN((x) => Math.min(200, x + 1))}>Step</Control>
        <Control onClick={() => setN(200)}>Run 200</Control>
        <Control onClick={() => setN(0)}>Restart</Control>
      </Row>
      <Row>
        <Readout label="flips" value={n} />
        <Readout label="heads" value={heads} />
        <Readout label="share" value={n ? `${Math.round((heads / n) * 100)}%` : "–"} />
      </Row>
    </>
  );
}

// Equirectangular wireframe with a "country" that moves north; Mercator stretch shown by height.
const mercY = (lat: number) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));
function MapExplorer() {
  const [lat, setLat] = useState(10);
  const y = (l: number) => H / 2 - (mercY(l) / mercY(80)) * (H / 2 - 8);
  return (
    <>
      <Caption>Named projection · move-the-thing control · real units (wireframe, not WorldMap)</Caption>
      <Svg label={`A square at latitude ${lat}`}>
        {[-60, -30, 0, 30, 60].map((l) => (
          <line key={l} x1={0} x2={W} y1={y(l)} y2={y(l)} className={d.grid} />
        ))}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line key={i} x1={(i * W) / 6} x2={(i * W) / 6} y1={0} y2={H} className={d.grid} />
        ))}
        <rect x={130} y={y(lat + 10)} width={40} height={Math.max(2, y(lat) - y(lat + 10))} className={d.markDomain} />
        <Tag x={6} y={H - 6}>
          Mercator
        </Tag>
      </Svg>
      <Row>
        <Slider label="Latitude" value={lat} min={-60} max={60} step={5} onChange={setLat} format={(v) => `${v}°`} />
      </Row>
      <Row>
        <Readout label="drawn height" value={`${((y(lat) - y(lat + 10)) / ((y(10) - y(20)) || 1)).toFixed(1)}×`} />
      </Row>
    </>
  );
}

function SideBySide() {
  const [n, setN] = useState(4);
  return (
    <>
      <Caption>Two panels, one shared control, the difference labelled</Caption>
      <Svg label={`Linear ${n * 2} against quadratic ${n * n}`}>
        <Box x={4} y={4} w={140} h={H - 8} />
        <Box x={156} y={4} w={140} h={H - 8} />
        <Tag x={12} y={20}>
          A · linear
        </Tag>
        <Tag x={164} y={20}>
          B · quadratic
        </Tag>
        <rect x={54} y={H - 10 - n * 2 * 1.5} width={40} height={n * 2 * 1.5} className={d.markDomain} />
        <rect x={206} y={H - 10 - n * n * 1.0} width={40} height={n * n * 1.0} className={d.markWarn} />
      </Svg>
      <Row>
        <Slider label="n (both panels)" value={n} min={1} max={10} onChange={setN} />
      </Row>
      <Row>
        <Readout label="A vs B" value={`${n * 2} vs ${n * n}`} />
      </Row>
    </>
  );
}

function BeforeAfter() {
  const [after, setAfter] = useState(false);
  return (
    <>
      <Caption>One stage, one toggle, the after state persists into the reveal</Caption>
      <Svg label={after ? "After: the ball floats" : "Before: the ball sinks"}>
        <rect x={20} y={50} width={W - 40} height={H - 60} className={d.water} />
        <circle cx={W / 2} cy={after ? 50 : H - 26} r={after ? 26 : 14} className={d.markDomain} />
        <Tag x={24} y={H - 8}>
          {after ? "after: bigger, same mass" : "before"}
        </Tag>
      </Svg>
      <Row>
        <Control aria-pressed={!after} className={!after ? "active" : ""} onClick={() => setAfter(false)}>
          Before
        </Control>
        <Control aria-pressed={after} className={after ? "active" : ""} onClick={() => setAfter(true)}>
          After
        </Control>
      </Row>
    </>
  );
}

function MultiCard() {
  const [i, setI] = useState(0);
  const cards = ["1 · set up", "2 · change", "3 · result"];
  return (
    <>
      <Caption>Wireframe: 2 to 4 sub-cards inside explore (needs a kit stepper)</Caption>
      <Svg label={`Sub-card ${i + 1} of 3`}>
        {cards.map((c, k) => (
          <Box key={c} x={10 + (k - i) * 290 + 0} y={8} w={280} h={H - 34} label={c} on={k === i} />
        ))}
        {cards.map((c, k) => (
          <circle key={c} cx={W / 2 - 14 + k * 14} cy={H - 12} r={4} className={k === i ? d.markDomain : d.dotOff} />
        ))}
      </Svg>
      <Row>
        <Control disabled={i === 0} onClick={() => setI(i - 1)}>
          Back
        </Control>
        <Control disabled={i === 2} onClick={() => setI(i + 1)}>
          Next card
        </Control>
      </Row>
    </>
  );
}

function Storyboard() {
  const [t, setT] = useState(0);
  const [seen, setSeen] = useState<number[]>([0]);
  const keys = [0, 4, 8];
  const x = (v: number) => 20 + (v / 10) * (W - 40);
  return (
    <>
      <Caption>Timeline scrubber with key frames; the reveal names the frames visited</Caption>
      <Svg label={`Time ${t}, key frames visited: ${seen.join(", ")}`}>
        <path d={`M 20 ${H - 30} Q ${W / 2} -40 ${W - 20} ${H - 30}`} className={d.ghost} />
        <circle cx={x(t)} cy={H - 30 - Math.sin((t / 10) * Math.PI) * 78} r={8} className={d.markDomain} />
        {keys.map((k) => (
          <g key={k}>
            <line x1={x(k)} x2={x(k)} y1={H - 18} y2={H - 8} className={seen.includes(k) ? d.lineDomain : d.grid} />
            <Tag x={x(k) + 3} y={H - 9}>
              {`t${k}`}
            </Tag>
          </g>
        ))}
      </Svg>
      <Row>
        <Slider
          label="Time"
          value={t}
          min={0}
          max={10}
          onChange={(v) => {
            setT(v);
            if (keys.includes(v) && !seen.includes(v)) setSeen([...seen, v].sort((a, b) => a - b));
          }}
          format={(v) => `${v} s`}
        />
      </Row>
      <Row>
        <Readout label="key frames seen" value={`${seen.length} / ${keys.length}`} />
      </Row>
    </>
  );
}

function Debunk() {
  const [step, setStep] = useState(0);
  const parts = ["Claim", "Test", "Result", "Why"];
  return (
    <>
      <Caption>Wireframe: claim → test → result → mechanism, with the safety class shown</Caption>
      <Svg label={`Step ${step + 1}: ${parts[step]}`}>
        {parts.map((p, k) => (
          <Box key={p} x={6 + k * 73} y={30} w={66} h={60} label={p} on={k <= step} />
        ))}
        <Tag x={6} y={18}>
          “Rice dries a wet phone.”
        </Tag>
        <rect x={6} y={H - 30} width={92} height={20} rx={10} className={d.safety} />
        <Tag x={14} y={H - 16}>
          safety: class A
        </Tag>
      </Svg>
      <Row>
        <Control disabled={step >= 3} onClick={() => setStep(step + 1)}>
          {step === 0 ? "Test it" : step === 1 ? "See result" : "Why?"}
        </Control>
        <Control onClick={() => setStep(0)}>Restart</Control>
      </Row>
    </>
  );
}

// ---------------------------------------------------------------- interactions

function SliderChart() {
  const [a, setA] = useState(1);
  const pts = Array.from({ length: 41 }, (_, i) => {
    const x = i / 40;
    return `${30 + x * (W - 40)},${H - 22 - Math.min(1, a * x * x) * (H - 34)}`;
  }).join(" ");
  return (
    <>
      <Svg label={`Curve y = ${a} x squared`}>
        <Axis x="x" y="y" />
        <polyline points={pts} className={d.lineDomain} />
        <Tag x={W - 70} y={20}>
          Toy model
        </Tag>
      </Svg>
      <Row>
        <Slider label="a" value={a} min={0.2} max={4} step={0.2} onChange={setA} format={(v) => v.toFixed(1)} />
      </Row>
      <Row>
        <Readout label="y at x = 0.5" value={Math.min(1, a * 0.25).toFixed(2)} />
      </Row>
    </>
  );
}

function StepRun() {
  const N = 8;
  const [i, setI] = useState(0);
  return (
    <>
      <Svg label={`Step ${i} of ${N}`} h={70}>
        {Array.from({ length: N }, (_, k) => (
          <rect key={k} x={10 + k * 35} y={14} width={30} height={30} rx={5} className={k < i ? d.markDomain : d.wire} />
        ))}
        <Tag x={10} y={62}>
          {`step ${i} / ${N}`}
        </Tag>
      </Svg>
      <Row>
        <Control className="active" disabled={i >= N} onClick={() => setI(i + 1)}>
          Step
        </Control>
        <Control disabled={i >= N} onClick={() => setI(N)}>
          Run to end
        </Control>
        <Control disabled={i === 0} onClick={() => setI(0)}>
          Restart
        </Control>
      </Row>
    </>
  );
}

function DragToPlace() {
  const [x, setX] = useState(150);
  const [drag, setDrag] = useState(false);
  const toX = (e: PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return Math.max(30, Math.min(W - 10, ((e.clientX - r.left) / r.width) * W));
  };
  return (
    <>
      <svg
        viewBox={`0 0 ${W} 90`}
        className={`stage-svg ${d.specSvg}`}
        role="img"
        aria-label={`Handle at ${Math.round(x)}`}
        onPointerDown={(e) => (setDrag(true), setX(toX(e)), e.currentTarget.setPointerCapture(e.pointerId))}
        onPointerMove={(e) => drag && setX(toX(e))}
        onPointerUp={() => setDrag(false)}
        style={{ touchAction: "none", cursor: "grab" }}
      >
        <line x1={30} x2={W - 10} y1={50} y2={50} className={d.grid} />
        <circle cx={x} cy={50} r={22} className={d.hit} />
        <circle cx={x} cy={50} r={10} className={d.markDomain} />
        <Tag x={30} y={84}>
          drag the dot (44 px target) · or use the buttons
        </Tag>
      </svg>
      <Row>
        <Control onClick={() => setX((v) => Math.max(30, v - 20))}>◀ Left</Control>
        <Control onClick={() => setX((v) => Math.min(W - 10, v + 20))}>Right ▶</Control>
        <Readout label="position" value={Math.round(x - 30)} />
      </Row>
    </>
  );
}

function ChoiceBeforeReveal() {
  const [pick, setPick] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const opts = ["Equally likely", "3 times", "6 times"];
  return (
    <>
      <p className="panel-q">A total of 7 is how many times as likely as a total of 3?</p>
      <div className="options">
        {opts.map((o, i) => (
          <button key={o} type="button" className={`option ${pick === i ? "selected" : ""} ${done ? (i === 1 ? "right" : pick === i ? "wrong" : "") : ""}`} disabled={done} onClick={() => setPick(i)}>
            {o}
          </button>
        ))}
      </div>
      <button type="button" className="primary" disabled={pick === null || done} onClick={() => setDone(true)}>
        Commit
      </button>
      <Row>
        <Readout label="ways: 7 vs 3" value={done ? "6 vs 2" : "?"} />
        <Control onClick={() => (setPick(null), setDone(false))}>Reset specimen</Control>
      </Row>
    </>
  );
}

function ToggleBA() {
  const [on, setOn] = useState(false);
  return (
    <>
      <Svg label={on ? "Rule B" : "Rule A"} h={70}>
        <rect x={20} y={12} width={on ? 240 : 120} height={30} rx={6} className={d.markDomain} />
        <Tag x={20} y={62}>
          {on ? "B: doubled" : "A: as is"}
        </Tag>
      </Svg>
      <Row>
        <Control aria-pressed={on} className={on ? "active" : ""} onClick={() => setOn(!on)}>
          {on ? "Showing B · tap for A" : "Showing A · tap for B"}
        </Control>
      </Row>
      <Row>
        <Control aria-pressed={!on} className={!on ? "active" : ""} onClick={() => setOn(false)}>
          A
        </Control>
        <Control aria-pressed={on} className={on ? "active" : ""} onClick={() => setOn(true)}>
          B
        </Control>
        <span className={d.specNote}>single toggle, or segmented pair</span>
      </Row>
    </>
  );
}

function Scrubber() {
  const [t, setT] = useState(0);
  const [play, setPlay] = useState(false);
  useEffect(() => {
    if (!play) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setT(20);
      setPlay(false);
      return;
    }
    const id = setInterval(() => setT((x) => (x >= 20 ? (setPlay(false), 20) : x + 1)), 120);
    return () => clearInterval(id);
  }, [play]);
  const sick = (k: number) => Math.round(100 / (1 + Math.exp(-(k - 10) / 2)));
  return (
    <>
      <Svg label={`Day ${t}: ${sick(t)} sick`}>
        <Axis x="day" y="sick" />
        <polyline className={d.ghost} points={Array.from({ length: 21 }, (_, k) => `${30 + (k / 20) * (W - 40)},${H - 22 - sick(k)}`).join(" ")} />
        <polyline className={d.lineDomain} points={Array.from({ length: t + 1 }, (_, k) => `${30 + (k / 20) * (W - 40)},${H - 22 - sick(k)}`).join(" ")} />
        {[5, 10, 15].map((k) => (
          <line key={k} x1={30 + (k / 20) * (W - 40)} x2={30 + (k / 20) * (W - 40)} y1={H - 22} y2={H - 16} className={d.axisTick} />
        ))}
      </Svg>
      <Row>
        <Slider label="Day" value={t} min={0} max={20} onChange={(v) => (setPlay(false), setT(v))} />
      </Row>
      <Row>
        <Control onClick={() => (setT(t >= 20 ? 0 : t), setPlay(!play))}>{play ? "Pause" : "Play"}</Control>
        <Control disabled={t >= 20} onClick={() => setT(t + 1)}>
          Step
        </Control>
        <Readout label="sick" value={sick(t)} />
      </Row>
    </>
  );
}

function TwoPanel() {
  const [p, setP] = useState(50);
  return (
    <>
      <Svg label={`Price ${p}: A sells ${100 - p}, B sells ${Math.round(100 - p * 0.4)}`}>
        <Tag x={8} y={16}>
          A · elastic
        </Tag>
        <Tag x={158} y={16}>
          B · inelastic
        </Tag>
        <rect x={40} y={H - 10 - (100 - p)} width={60} height={100 - p} className={d.markDomain} />
        <rect x={190} y={H - 10 - (100 - p * 0.4)} width={60} height={100 - p * 0.4} className={d.markDomain} />
        <line x1={150} x2={150} y1={4} y2={H - 4} className={d.grid} />
      </Svg>
      <Row>
        <Slider label="Price (drives both)" value={p} min={0} max={100} step={5} onChange={setP} />
      </Row>
      <Row>
        <Readout label="A vs B" value={`${100 - p} vs ${Math.round(100 - p * 0.4)}`} />
      </Row>
    </>
  );
}

function Tally() {
  const [rolls, setRolls] = useState<number[]>([]);
  const rng = useMemo(() => mulberry32(3), []);
  const counts = [1, 2, 3, 4, 5, 6].map((f) => rolls.filter((r) => r === f).length);
  const max = Math.max(1, ...counts);
  return (
    <>
      <Svg label={`${rolls.length} rolls`} h={90}>
        {counts.map((c, i) => (
          <g key={i}>
            <rect x={20 + i * 46} y={70 - (c / max) * 56} width={34} height={(c / max) * 56} className={d.markDomain} />
            <Tag x={33 + i * 46} y={86}>
              {i + 1}
            </Tag>
          </g>
        ))}
      </Svg>
      <Row>
        <Control onClick={() => setRolls((r) => [...r, 1 + Math.floor(rng() * 6)])}>Roll once</Control>
        <Control onClick={() => setRolls((r) => [...r, ...Array.from({ length: 60 }, () => 1 + Math.floor(rng() * 6))])}>Roll 60</Control>
      </Row>
      <Row>
        <Readout label="rolls" value={rolls.length} />
        <Readout label="sixes" value={counts[5]} />
        <Readout label="share of sixes" value={rolls.length ? `${Math.round((counts[5] / rolls.length) * 100)}%` : "–"} />
      </Row>
    </>
  );
}

function ProjectionSwitch() {
  const [merc, setMerc] = useState(true);
  const y = (l: number) => (merc ? H / 2 - (mercY(l) / mercY(80)) * (H / 2 - 6) : H / 2 - (l / 80) * (H / 2 - 6));
  return (
    <>
      <Svg label={`Equal squares at 0, 30 and 60 degrees in the ${merc ? "Mercator" : "equirectangular"} projection`}>
        {[-60, -30, 0, 30, 60].map((l) => (
          <line key={l} x1={0} x2={W} y1={y(l)} y2={y(l)} className={d.grid} />
        ))}
        {[0, 30, 60].map((l, i) => (
          <rect key={l} x={40 + i * 90} y={y(l + 10)} width={40} height={y(l) - y(l + 10)} className={d.markDomain} />
        ))}
        <Tag x={6} y={H - 6}>
          {merc ? "Mercator" : "Equirectangular"}
        </Tag>
      </Svg>
      <Row>
        <Control aria-pressed={merc} className={merc ? "active" : ""} onClick={() => setMerc(true)}>
          Mercator
        </Control>
        <Control aria-pressed={!merc} className={!merc ? "active" : ""} onClick={() => setMerc(false)}>
          Equirectangular
        </Control>
      </Row>
    </>
  );
}

function Presets() {
  const [n, setN] = useState(10);
  const p = 1 - Math.pow(364 / 365, n);
  return (
    <>
      <Svg label={`${n} people: ${Math.round(p * 100)}%`} h={60}>
        <rect x={10} y={16} width={W - 20} height={20} rx={4} className={d.wire} />
        <rect x={10} y={16} width={(W - 20) * p} height={20} rx={4} className={d.markDomain} />
        <line x1={W / 2} x2={W / 2} y1={10} y2={42} className={d.axisTick} />
        <Tag x={W / 2 + 4} y={54}>
          50%
        </Tag>
      </Svg>
      <Row>
        {[23, 183, 253].map((v) => (
          <Control key={v} className={n === v ? "active" : ""} onClick={() => setN(v)}>
            {v} people
          </Control>
        ))}
      </Row>
      <Row>
        <Slider label="People" value={n} min={1} max={300} onChange={setN} />
        <Readout label="someone shares my birthday" value={`${(p * 100).toFixed(1)}%`} />
      </Row>
    </>
  );
}

function MilestoneGate() {
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  return (
    <>
      <Caption>The reveal unlocks on the named key states, not on any click</Caption>
      <Row>
        <Control className={a ? "active" : ""} onClick={() => setA(true)}>
          Reach state A
        </Control>
        <Control className={b ? "active" : ""} onClick={() => setB(true)}>
          Reach state B
        </Control>
        <Control onClick={() => (setA(false), setB(false))}>Reset specimen</Control>
      </Row>
      <ul className={d.checklist}>
        <li className={a ? d.done : ""}>{a ? "✓" : "○"} all-36</li>
        <li className={b ? d.done : ""}>{b ? "✓" : "○"} rolled</li>
      </ul>
      <button type="button" className="primary" disabled={!(a && b)}>
        {a && b ? "See why" : `Reach ${2 - Number(a) - Number(b)} more`}
      </button>
    </>
  );
}

function LockedReadouts() {
  const [locked, setLocked] = useState(true);
  return (
    <>
      <Row>
        <Readout label="slider value" value="12" />
        <Readout label="answer readout" value={locked ? "?" : "0.507"} />
      </Row>
      <Row>
        <Control aria-pressed={!locked} className={!locked ? "active" : ""} onClick={() => setLocked(!locked)}>
          {locked ? "Predict (unlock)" : "Lock again"}
        </Control>
        <span className={d.specNote}>answer readouts show “?” until the prediction</span>
      </Row>
    </>
  );
}

// ---------------------------------------------------------------- visual

function ChartStyle() {
  return (
    <>
      <Svg label="A labelled chart with a model name and a locked readout">
        <Axis x="time (s)" y="speed (m/s)" />
        <polyline className={d.lineDomain} points={`30,${H - 22} 90,${H - 60} 150,${H - 84} 210,${H - 96} 290,${H - 102}`} />
        <polyline className={d.ghost} points={`30,${H - 22} 290,${H - 80}`} />
        <Tag x={W - 70} y={20}>
          Toy model
        </Tag>
        <Tag x={200} y={H - 70}>
          ghost: before
        </Tag>
      </Svg>
      <Row>
        <Readout label="top speed" value="?" />
        <span className={d.specNote}>axes labelled on the stage · model named · answer “?” while locked</span>
      </Row>
    </>
  );
}

const ROLES = ["--bg", "--bg-2", "--bg-3", "--fg", "--muted", "--line", "--accent", "--good", "--bad", "--warn"];
function ColourRoles({ domains }: { domains: { id: string; name: string; color: string }[] }) {
  return (
    <>
      <div className={d.swatches}>
        {ROLES.map((r) => (
          <span key={r} className={d.swatch}>
            <i style={{ background: `var(${r})` }} />
            <code>{r}</code>
          </span>
        ))}
      </div>
      <div className={d.swatches}>
        {domains.map((x) => (
          <span key={x.id} className={d.swatch} title={x.name}>
            <i style={{ background: x.color }} />
            <code>{x.id}</code>
          </span>
        ))}
      </div>
      <Caption>Light and dark follow prefers-color-scheme: switch your OS theme to check both.</Caption>
    </>
  );
}

function Typography() {
  const stage = "Drop each first die's six pairs.";
  const reveal = "Of the 36 equally likely pairs, 6 make 7 and only 2 make 3. So 7 is three times as likely.";
  const words = (t: string) => t.trim().split(/\s+/).length;
  return (
    <>
      <p className={d.tHook}>Why does 7 win?</p>
      <p className={d.tStage}>
        {stage} <span className={d.specNote}>stage text · {words(stage)} / 25 words</span>
      </p>
      <Row>
        <Readout label="readout label" value="6 vs 2" />
      </Row>
      <p className="why">
        {reveal} <span className={d.specNote}>reveal · {words(reveal)} / 90 words</span>
      </p>
      <Caption>System UI sans · readout values in tabular figures</Caption>
    </>
  );
}

function Motion() {
  const [right, setRight] = useState(false);
  return (
    <>
      <Svg label={right ? "Dot on the right" : "Dot on the left"} h={60}>
        <line x1={20} x2={W - 20} y1={30} y2={30} className={d.grid} />
        <circle cx={0} cy={30} r={12} className={`${d.markDomain} ${d.mover}`} style={{ transform: `translateX(${right ? W - 30 : 30}px)` }} />
      </Svg>
      <Row>
        <Control onClick={() => setRight(!right)}>Move (settles in 450 ms)</Control>
        <span className={d.specNote}>reduced motion: jumps without the transition</span>
      </Row>
    </>
  );
}

function IllustrationHero() {
  return (
    <>
      <figure className={d.paper}>
        <svg viewBox="0 0 100 100" className={d.paperArt} role="img" aria-label="A watercolour placeholder: a cup on a table">
          <ellipse cx={50} cy={58} rx={30} ry={22} className={d.wash} />
          <rect x={38} y={40} width={24} height={26} rx={4} className={d.washDark} />
        </svg>
        <figcaption>AI-generated illustration</figcaption>
      </figure>
      <Caption>Paper frame (#faf6ee) in both themes · 1:1 hero · no text in the image · alt text required</Caption>
    </>
  );
}

function Controls() {
  const [v, setV] = useState(40);
  return (
    <>
      <Row>
        <Control>Control</Control>
        <Control className="active">Active</Control>
        <Control disabled>Disabled</Control>
      </Row>
      <Row>
        <Slider label="Slider (28 px)" value={v} min={0} max={100} onChange={setV} />
        <Readout label="Readout" value={v} />
      </Row>
      <div className={d.tapRow}>
        <span className={d.tap44}>44 px</span>
        <span className={d.specNote}>minimum tap target</span>
      </div>
    </>
  );
}

const SPECIMENS: Record<string, (p: { domains: { id: string; name: string; color: string }[] }) => ReactNode> = {
  "single-card": SingleCard,
  "simulation-run": SimulationRun,
  "map-explorer": MapExplorer,
  "side-by-side": SideBySide,
  "before-after": BeforeAfter,
  "multi-card-sequence": MultiCard,
  "storyboard-scrub": Storyboard,
  debunk: Debunk,
  "slider-drives-live-chart": SliderChart,
  "step-run-button": StepRun,
  "drag-to-place": DragToPlace,
  "choice-before-reveal": ChoiceBeforeReveal,
  "toggle-before-after": ToggleBA,
  "scrubber-timeline": Scrubber,
  "two-panel-shared-control": TwoPanel,
  "tally-counters": Tally,
  "map-projection-switch": ProjectionSwitch,
  "preset-buttons": Presets,
  "milestone-gate": MilestoneGate,
  "locked-readouts": LockedReadouts,
  "chart-style": ChartStyle,
  "colour-roles": ColourRoles,
  "typography-scale": Typography,
  motion: Motion,
  "illustration-hero": IllustrationHero,
  controls: Controls,
};

export const hasSpecimen = (id: string) => id in SPECIMENS;

export function Specimen({ id, domains, color }: { id: string; domains: { id: string; name: string; color: string }[]; color: string }) {
  const S = SPECIMENS[id];
  return (
    <div className={d.specimen} style={{ ["--domain" as string]: color }}>
      {S ? (
        <S domains={domains} />
      ) : (
        <p className={d.specCaption}>
          No specimen yet. The design engineer adds one in <code>src/app/hq/design/specimens.tsx</code>; until then, see the mockup in <code>company/design/specs/</code>.
        </p>
      )}
    </div>
  );
}
