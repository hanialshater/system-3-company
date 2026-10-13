"use client";

// HQ: the company as a floor plan (Sococo-style). Agents sit in the room of the work they are doing;
// the replay slider rebuilds the office at any past moment from the event log.

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { HqEvent, Room } from "@/lib/hq";
import type { Due } from "../../../tools/lib/rituals.mjs";
import { teamColor } from "@/lib/hq-colors";
import s from "./hq.module.css";

const TYPE_COLOR: Record<string, string> = {
  dispatch: "#7c9cff",
  report: "#4fd1a5",
  stopped: "#ff7a7a",
  merge: "#80cbc4",
  publish: "#ffd54f",
  unpublish: "#ff7a7a",
  verify: "#f6c453",
  review: "#a5d66f",
  ritual: "#c792ea",
  decision: "#c792ea",
  incident: "#ff7a7a",
  founder: "#ffd54f",
  note: "#9aa3b5",
  commit: "#5d6578",
};
const HOUR = 3_600_000;
const fmt = (ms: number) => new Date(ms).toISOString().slice(5, 16).replace("T", " ") + " UTC";
// "Wave 3 builder: cs" → "cs w3"; "Learner reviews: chemistry" → "chemistry rev"; "Fix 4 disputed claims" → "Fix 4 disp…"
function short(label?: string) {
  const l = (label ?? "").split(" ·")[0];
  const w = l.match(/^Wave (\d+)\w* builder: (\w+)/i);
  if (w) return `${w[2]} w${w[1]}`;
  const r = l.match(/^(Revis\w*|Learner reviews|Fact-check[^:]*|Revision builder):?\s*(?:\d+\s)?(\w+)/i);
  if (r) return `${r[2]} ${/learner/i.test(r[1]) ? "rev" : /fact/i.test(r[1]) ? "fc" : "fix"}`;
  return l.length > 12 ? l.slice(0, 11) + "…" : l;
}

interface Presence {
  agent: string;
  role: string;
  room: string;
  state: string;
  since: number;
  summary: string;
}

export default function HQ({ events, rooms, founderQueue, due }: { events: HqEvent[]; rooms: Room[]; founderQueue: { id: string; title: string }[]; due: Due[] }) {
  const router = useRouter();
  const times = useMemo(() => events.map((e) => Date.parse(e.ts)), [events]);
  const t0 = times[0] ?? Date.now();
  const t1 = Math.max(times.at(-1) ?? Date.now(), Date.now());
  const [t, setT] = useState(t1);
  const [live, setLive] = useState(false); // decided on mount: live unless the URL names a moment
  const [playing, setPlaying] = useState(false);
  const [room, setRoom] = useState<string>("lobby");
  const [open, setOpen] = useState<Record<string, string | null>>({});
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);

  // A moment can be linked: /hq?t=2026-10-13T06:20Z&room=build-floor
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const at = q.get("t") ? Date.parse(q.get("t")!) : NaN;
    if (Number.isFinite(at)) setT(Math.min(Math.max(at, t0), t1));
    else setLive(true);
    if (q.get("room")) setRoom(q.get("room")!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Live: follow the newest event and refresh the log every 20 s.
  useEffect(() => {
    if (!live) return;
    setT(t1);
    const id = setInterval(() => router.refresh(), 20_000);
    return () => clearInterval(id);
  }, [live, t1, router]);

  // Replay: 30 minutes of company time per second.
  useEffect(() => {
    if (!playing) return;
    tick.current = setInterval(() => setT((x) => (x + HOUR / 2 / 10 > t1 ? (setPlaying(false), t1) : x + HOUR / 2 / 10)), 100);
    return () => {
      if (tick.current) clearInterval(tick.current);
    };
  }, [playing, t1]);

  const upto = useMemo(() => {
    let i = times.length;
    while (i > 0 && times[i - 1] > t) i--;
    return events.slice(0, i);
  }, [events, times, t]);

  const presence = useMemo(() => {
    const last = new Map<string, Presence>();
    for (const e of upto) {
      if (!e.agent) continue;
      last.set(e.agent, { agent: e.agent, role: e.actor === "chief-of-staff" ? (e.subjects?.[0] ?? e.actor) : e.actor, room: e.room, state: e.state ?? "working", since: Date.parse(e.ts), summary: e.summary });
    }
    // Working and stopped agents stay in their room (stopped work is unfinished work); finished ones linger 20 minutes.
    return [...last.values()].filter((p) => p.state !== "done" || t - p.since < 20 * 60_000);
  }, [upto, t]);

  const activity = useMemo(() => {
    const m: Record<string, number> = {};
    for (let i = upto.length - 1; i >= 0 && t - Date.parse(upto[i].ts) < HOUR; i--) m[upto[i].room] = (m[upto[i].room] ?? 0) + 1;
    return m;
  }, [upto, t]);

  const founderHere = upto.some((e) => e.actor === "founder" && t - Date.parse(e.ts) < HOUR);
  const roomEvents = useMemo(() => upto.filter((e) => e.room === room).slice(-80).reverse(), [upto, room]);
  const feed = useMemo(() => upto.slice(-25).reverse(), [upto]);
  const sel = rooms.find((r) => r.id === room);
  const working = presence.filter((p) => p.state === "working").length;
  const stopped = presence.filter((p) => p.state === "stopped").length;

  async function toggle(id: string) {
    if (open[id] !== undefined) return setOpen(({ [id]: _, ...rest }) => rest);
    setOpen((o) => ({ ...o, [id]: null }));
    const r = await fetch(`/api/hq/event/${encodeURIComponent(id)}`);
    const e = r.ok ? await r.json() : null;
    setOpen((o) => ({ ...o, [id]: e?.body ?? "(no text recorded)" }));
  }

  const scrub = (v: number) => {
    setLive(false);
    setPlaying(false);
    setT(v);
  };

  return (
    <main className={s.hq}>
      <nav className={s.top}>
        <Link className="brand" href="/">
          S3
        </Link>
        <strong>HQ</strong>
        <span className={s.muted}>
          {fmt(t)} · {working} working{stopped ? ` · ${stopped} stopped` : ""} · {upto.length} events
        </span>
        <span className={s.spacer} />
        <Link className="brand-link" href="/catalog">
          Map
        </Link>
      </nav>

      <section className={s.controls} aria-label="Replay">
        <button className={s.btn} onClick={() => (playing ? setPlaying(false) : (setLive(false), t >= t1 && setT(t0), setPlaying(true)))}>
          {playing ? "Pause" : "Replay"}
        </button>
        <input className={s.slider} type="range" min={t0} max={t1} step={60_000} value={t} onChange={(e) => scrub(Number(e.target.value))} aria-label="Time" />
        <button className={`${s.btn} ${live ? s.on : ""}`} onClick={() => (setPlaying(false), setLive(true))}>
          Live
        </button>
      </section>

      <svg className={s.strip} viewBox="0 0 1000 28" preserveAspectRatio="none" onClick={(e) => {
        const r = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
        scrub(t0 + ((e.clientX - r.left) / r.width) * (t1 - t0));
      }}>
        {events.map((e, i) => (
          <rect key={e.id} x={((times[i] - t0) / (t1 - t0 || 1)) * 1000} y={e.type === "commit" ? 16 : 4} width={1.5} height={e.type === "commit" ? 8 : 20} fill={TYPE_COLOR[e.type] ?? "#9aa3b5"} />
        ))}
        <rect x={((t - t0) / (t1 - t0 || 1)) * 1000 - 1} y={0} width={2} height={28} fill="var(--fg)" />
      </svg>

      <div className={s.layout}>
        <div className={s.planWrap}>
        <svg className={s.plan} viewBox="0 0 1000 660" role="img" aria-label="Company floor plan">
          <rect x={8} y={8} width={984} height={644} rx={18} className={s.building} />
          {rooms.map((r) => {
            const here = presence.filter((p) => p.room === r.id);
            const heat = Math.min(1, (activity[r.id] ?? 0) / 12);
            const cols = Math.max(1, Math.floor((r.w - 16) / 46));
            return (
              <g key={r.id} className={s.room} onClick={() => setRoom(r.id)} role="button" aria-label={r.name}>
                <rect x={r.x} y={r.y} width={r.w} height={r.h} rx={8} className={`${s.roomRect} ${s[r.kind]} ${room === r.id ? s.selected : ""}`} />
                {heat > 0 && <rect x={r.x} y={r.y} width={r.w} height={r.h} rx={8} fill="#7c9cff" opacity={0.08 + heat * 0.25} pointerEvents="none" />}
                {r.color && <rect x={r.x} y={r.y} width={r.w} height={4} rx={2} fill={r.color} />}
                <text x={r.x + 8} y={r.y + 18} className={s.roomName}>
                  {r.name}
                </text>
                {(activity[r.id] ?? 0) > 0 && (
                  <text x={r.x + r.w - 8} y={r.y + 18} textAnchor="end" className={s.count}>
                    {activity[r.id]}/h
                  </text>
                )}
                {here.slice(0, cols * Math.max(1, Math.floor((r.h - 30) / 30))).map((p, i) => {
                  const cx = r.x + 26 + (i % cols) * 46;
                  const cy = r.y + 40 + Math.floor(i / cols) * 30;
                  return (
                    <g key={p.agent}>
                      <title>{`${p.agent} — ${p.state}\n${p.summary}`}</title>
                      <circle cx={cx} cy={cy} r={9} fill={teamColor(p.role)} opacity={p.state === "working" ? 1 : 0.35} stroke={p.state === "stopped" ? "#ff7a7a" : "none"} strokeWidth={2} />
                      <text x={cx} y={cy + 20} textAnchor="middle" className={s.dotLabel}>
                        {short(p.agent)}
                      </text>
                    </g>
                  );
                })}
                {r.id === "chief-of-staff" && <Person x={r.x + r.w - 26} y={r.y + 44} color="#eef1f7" label="CoS" />}
                {r.id === "lobby" && founderHere && <Person x={r.x + r.w / 2} y={r.y + 44} color="#ffd54f" label="Founder" />}
              </g>
            );
          })}
        </svg>
        </div>

        <aside className={s.panel}>
          <h2>{sel?.name ?? room}</h2>
          {room === "lobby" && (
            <div className={s.queue}>
              <h3>Rituals due now</h3>
              {due.length ? (
                <ul>
                  {due.map((d) => (
                    <li key={d.ritual}>
                      <button className={s.roomLink} onClick={() => setRoom(d.room)}>
                        {d.ritual}
                      </button>{" "}
                      <span className={s.muted}>{d.reasons.join("; ")}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={s.muted}>None.</p>
              )}
              <h3>Waiting on you</h3>
              {founderQueue.length ? (
                <ul>
                  {founderQueue.map((q) => (
                    <li key={q.id}>
                      <code>{q.id}</code> {q.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={s.muted}>Nothing on the board is owned by the founder.</p>
              )}
            </div>
          )}
          <p className={s.muted}>
            {presence.filter((p) => p.room === room).map((p) => short(p.agent)).join(", ") || "Nobody working here"} · {roomEvents.length} events up to {fmt(t)}
          </p>
          <ol className={s.thread}>
            {roomEvents.map((e) => (
              <EventRow key={e.id} e={e} body={open[e.id]} onToggle={() => toggle(e.id)} />
            ))}
          </ol>
        </aside>
      </div>

      <section className={s.feedWrap}>
        <h2>Timeline</h2>
        <ol className={s.thread}>
          {feed.map((e) => (
            <EventRow key={e.id} e={e} body={open[e.id]} onToggle={() => toggle(e.id)} showRoom onRoom={() => setRoom(e.room)} />
          ))}
        </ol>
      </section>
    </main>
  );
}

function Person({ x, y, color, label }: { x: number; y: number; color: string; label: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={10} fill={color} stroke="var(--bg)" strokeWidth={2} />
      <text x={x} y={y + 22} textAnchor="middle" className={s.dotLabel}>
        {label}
      </text>
    </g>
  );
}

function EventRow({ e, body, onToggle, showRoom, onRoom }: { e: HqEvent; body: string | null | undefined; onToggle: () => void; showRoom?: boolean; onRoom?: () => void }) {
  return (
    <li className={s.event}>
      <div className={s.eventHead}>
        <span className={s.type} style={{ background: TYPE_COLOR[e.type] ?? "#9aa3b5" }}>
          {e.type}
        </span>
        <time className={s.muted}>{e.ts.slice(5, 16).replace("T", " ")}</time>
        {showRoom && (
          <button className={s.roomLink} onClick={onRoom}>
            {e.room}
          </button>
        )}
      </div>
      <button className={s.summary} onClick={e.hasBody ? onToggle : undefined} disabled={!e.hasBody} aria-expanded={body !== undefined}>
        {e.summary}
        {e.hasBody && <span className={s.more}>{body === undefined ? " ▸" : " ▾"}</span>}
      </button>
      {body !== undefined && <pre className={s.body}>{body ?? "Loading…"}</pre>}
      {e.refs?.length ? <div className={s.refs}>{e.refs.slice(0, 4).join(" · ")}</div> : null}
    </li>
  );
}
