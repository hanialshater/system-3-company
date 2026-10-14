"use client";

// Deep time on one clock (Big Ideas brief #2, deep-time). Earth's 4.54 billion years squeezed into one day that
// starts at midnight. A clock dial with a hand; the time slider scrubs the hand inside the current view; the zoom
// buttons change what the full dial stands for (whole day / last hour / last minute). Events light up once the hand
// has passed them, and each lit event is written in the "found" list with its clock time.
// Zooming in moves the hand to the start of the new view if it was earlier (it never moves the hand back).
// "Next event" steps the hand to the next event, zooming in if the event is too close to midnight to see.
// Controls (DOM order = QA order): slider, Whole day (active at start, disabled), Last hour, Last minute, Next event.
// QA path: slider → 00:10; Last hour → 23:00; Last minute → 23:59:00 (dinosaurs' end passed: milestone);
// Next event → 23:59:54 in the minute view (Homo sapiens: milestone).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const DAY = 86400;
const AGE = 4.54e9; // years
const at = (yearsAgo: number) => DAY - (yearsAgo / AGE) * DAY; // clock second of the day

type Ev = { id: string; name: string; t: number };
const EVENTS: Ev[] = [
  { id: "life", name: "Earliest life (debated)", t: at(3.7e9) },
  { id: "dinos", name: "Non-bird dinosaurs end", t: at(66e6) },
  { id: "humans", name: "Homo sapiens", t: at(300e3) },
  { id: "writing", name: "Writing", t: at(5200) },
];

type Zoom = "day" | "hour" | "minute";
const VIEW: Record<Zoom, { start: number; step: number; label: string; scale: string }> = {
  day: { start: 0, step: 300, label: "Whole day", scale: "1 hour ≈ 189 million years" },
  hour: { start: DAY - 3600, step: 15, label: "Last hour", scale: "1 minute ≈ 3 million years" },
  minute: { start: DAY - 60, step: 0.1, label: "Last minute", scale: "1 second ≈ 52,500 years" },
};
const ORDER: Zoom[] = ["day", "hour", "minute"];

const pad = (n: number) => String(n).padStart(2, "0");
function clock(t: number, tenths = false) {
  const x = Math.min(t, DAY - 1e-6);
  const h = Math.floor(x / 3600);
  const m = Math.floor((x % 3600) / 60);
  const sec = x % 60;
  if (t >= DAY) return "24:00:00";
  return `${pad(h)}:${pad(m)}:${tenths ? sec.toFixed(1).padStart(4, "0") : pad(Math.floor(sec))}`;
}
const yearsAgo = (t: number) => ((DAY - t) / DAY) * AGE;
function yearsText(y: number) {
  if (y >= 1e9) return `${(y / 1e9).toFixed(2)} billion years ago`;
  if (y >= 1e6) return `${Math.round(y / 1e6).toLocaleString("en-US")} million years ago`;
  if (y >= 50) return `${(Math.round(y / 100) * 100).toLocaleString("en-US")} years ago`;
  return "now";
}
// smallest view in which an event sits at least 1.5% of the dial away from midnight
const viewFor = (t: number): Zoom => ORDER.find((z) => (DAY - t) / (DAY - VIEW[z].start) >= 0.015) ?? "minute";

const CX = 120;
const CY = 108;
const R = 82;
const pt = (frac: number, r = R): [number, number] => {
  const a = frac * 2 * Math.PI - Math.PI / 2;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
};

export default function EarthHistoryInADay({ slug }: { slug: string }) {
  const [t, setT] = useState(0);
  const [zoom, setZoom] = useState<Zoom>("day");
  const [humansSeen, setHumansSeen] = useState<number | null>(null);

  const ws = VIEW[zoom].start;
  const frac = (x: number) => (x - ws) / (DAY - ws);
  const humansAt = clock(humansSeen ?? EVENTS[2].t);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Squeeze Earth’s 4.5 billion years into one day, starting at midnight. When does our species, Homo sapiens, appear?",
        options: ["About 6:00:00 pm", "About 11:30:00 pm", "About 11:59:54 pm"],
        answer: 2,
      }}
      exploreHint="Scrub through the day, then zoom in to the last hour and the last minute."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Our species appeared at {humansAt}, about six seconds before midnight. Writing came about a tenth of a second before
            the end.
          </p>
          <p>
            From James Hutton in the 1780s, geologists argued that slow processes, given this much time, carve valleys and raise
            mountains.
          </p>
          <p>
            Where it stops: the clock shows scale, not speed. Some changes were sudden, like the asteroid impact that ended the
            non-bird dinosaurs.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["dinos", "humans"]}>
          {(reach) => {
            const check = (nt: number, nz: Zoom) => {
              if (nt >= EVENTS[1].t) reach("dinos");
              if (nt >= EVENTS[2].t && nz === "minute") {
                if (humansSeen === null) setHumansSeen(EVENTS[2].t);
                reach("humans");
              }
            };
            const move = (nt: number, nz = zoom) => {
              if (locked) return;
              const c = Math.min(DAY, Math.max(VIEW[nz].start, nt));
              setT(c);
              setZoom(nz);
              check(c, nz);
            };
            const next = EVENTS.find((e) => e.t > t + 1e-6);
            const lit = locked ? [] : EVENTS.filter((e) => t >= e.t);
            const handFrac = Math.max(0, frac(t));
            const [hx, hy] = pt(handFrac, R - 8);
            const ticks = zoom === "day" ? 24 : 12;
            const tickLabels: [number, string][] =
              zoom === "day"
                ? [
                    [0.25, "06:00"],
                    [0.5, "noon"],
                    [0.75, "18:00"],
                  ]
                : zoom === "hour"
                  ? [
                      [0.25, "23:15"],
                      [0.5, "23:30"],
                      [0.75, "23:45"],
                    ]
                  : [
                      [0.25, ":15 s"],
                      [0.5, ":30 s"],
                      [0.75, ":45 s"],
                    ];
            return (
              <div className={s.wrap}>
                <p className={s.msg}>
                  {VIEW[zoom].label}: {VIEW[zoom].scale}
                </p>
                <div className={s.top}>
                  <svg viewBox="0 0 240 212" className={`stage-svg ${s.dial}`} role="img" aria-label={`Clock at ${clock(t)}`}>
                    <circle cx={CX} cy={CY} r={R} fill="var(--bg-2)" stroke="var(--line)" strokeWidth={2} />
                    {!locked && handFrac > 0 ? (
                      <path
                        d={`M ${CX} ${CY - R} A ${R} ${R} 0 ${handFrac > 0.5 ? 1 : 0} 1 ${pt(Math.min(handFrac, 0.9999))[0]} ${pt(Math.min(handFrac, 0.9999))[1]}`}
                        fill="none"
                        stroke="var(--domain)"
                        strokeWidth={6}
                        opacity={0.5}
                      />
                    ) : null}
                    {Array.from({ length: ticks }, (_, i) => {
                      const [x1, y1] = pt(i / ticks, R);
                      const [x2, y2] = pt(i / ticks, R - 7);
                      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--muted)" strokeWidth={1.5} />;
                    })}
                    <text x={CX} y={CY - R - 8} textAnchor="middle" className={s.tick}>
                      {zoom === "day" ? "midnight" : zoom === "hour" ? "23:00 | midnight" : "23:59:00 | midnight"}
                    </text>
                    {tickLabels.map(([f, l]) => {
                      const [x, y] = pt(f, R - 20);
                      return (
                        <text key={l} x={x} y={y + 4} textAnchor="middle" className={s.tick}>
                          {l}
                        </text>
                      );
                    })}
                    {EVENTS.filter((e) => e.t >= ws).map((e) => {
                      const on = lit.includes(e);
                      const [x, y] = pt(frac(e.t), R);
                      return (
                        <circle
                          key={e.id}
                          cx={x}
                          cy={y}
                          r={on ? 6 : 4}
                          fill={on ? (e.id === "humans" ? "var(--bad)" : "var(--domain)") : "var(--bg)"}
                          stroke="var(--fg)"
                          strokeWidth={1.2}
                        />
                      );
                    })}
                    <line x1={CX} y1={CY} x2={locked ? CX : hx} y2={locked ? CY - R + 8 : hy} stroke="var(--fg)" strokeWidth={3} strokeLinecap="round" />
                    <circle cx={CX} cy={CY} r={4} fill="var(--fg)" />
                  </svg>
                  <div className={s.side}>
                    <p className={s.now}>{locked ? "--:--:--" : clock(t, zoom === "minute")}</p>
                    <p className={s.ago}>{locked ? " " : yearsText(yearsAgo(t))}</p>
                    <ul className={s.found} aria-label="Found so far">
                      <li>
                        <span className={s.time}>00:00:00</span> Earth forms
                      </li>
                      {lit.map((e) => (
                        <li key={e.id} className={e.id === "humans" ? s.hum : ""}>
                          <span className={s.time}>{e.id === "writing" ? "23:59:59.9" : clock(e.t)}</span> {e.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <Slider
                  label="Clock"
                  value={Math.max(t, ws)}
                  min={ws}
                  max={DAY}
                  step={VIEW[zoom].step}
                  disabled={locked}
                  format={(v) => (locked ? "--" : clock(v, zoom === "minute"))}
                  onChange={(v) => move(v)}
                />
                <div className={s.controls}>
                  {ORDER.map((z) => (
                    <Control key={z} className={zoom === z ? "active" : ""} aria-pressed={zoom === z} disabled={locked || zoom === z} onClick={() => move(t, z)}>
                      {VIEW[z].label}
                    </Control>
                  ))}
                  <Control disabled={locked || !next} onClick={() => next && move(next.t, ORDER.indexOf(viewFor(next.t)) > ORDER.indexOf(zoom) ? viewFor(next.t) : zoom)}>
                    Next event ▸
                  </Control>
                </div>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
