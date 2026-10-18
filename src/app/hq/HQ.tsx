"use client";

// HQ: the company as an office (Sococo-style) and as an org tree. Everyone sits in the room of the
// work they are doing; the replay slider rebuilds the building at any past moment from the event log.

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FounderItem, HqEvent, OrgRole, Room } from "@/lib/hq";
import { teamColor } from "@/lib/hq-colors";
import { FLOORS, FLOOR_NAMES, stairsTo, type Floor } from "@/lib/hq-floors";
import { kudosRole } from "@/lib/hq-kudos";
import type { Due } from "../../../tools/lib/rituals.mjs";
import { Avatar } from "./Avatar";
import Office from "./Office";
import People from "./People";
import { PressBanner, PressOrg, PressResidents } from "./Press";
import type { PressSnapshot } from "@/lib/hq-press";
import { peopleAt, personName, personSeed, type Person } from "./people";
import s from "./hq.module.css";

const TYPE_COLOR: Record<string, string> = {
  dispatch: "#7c9cff",
  report: "#3ddc97",
  stopped: "#ff6b6b",
  merge: "#80cbc4",
  publish: "#ffd54f",
  unpublish: "#ff6b6b",
  verify: "#f6c453",
  review: "#a5d66f",
  ritual: "#c792ea",
  decision: "#c792ea",
  incident: "#ff6b6b",
  founder: "#ffd54f",
  note: "#9aa3b5",
  kudos: "#ff7eb6",
  commit: "#5d6578",
};
const HOUR = 3_600_000;
const fmt = (ms: number) => new Date(ms).toISOString().slice(5, 16).replace("T", " ") + " UTC";
const roleOf = (e: HqEvent) => (e.actor === "chief-of-staff" && e.agent ? "chief-of-staff" : e.actor);

export default function HQ({ events, rooms, founderQueue, due, org, now, press }: { events: HqEvent[]; rooms: Room[]; founderQueue: FounderItem[]; due: Due[]; org: OrgRole[]; now: number; press?: PressSnapshot | null }) {
  const router = useRouter();
  const times = useMemo(() => events.map((e) => Date.parse(e.ts)), [events]);
  const t0 = times[0] ?? Date.now();
  // "now" comes from the server so the first render matches on both sides (no hydration mismatch).
  const t1 = Math.max(times.at(-1) ?? now, now);
  const [t, setT] = useState(t1);
  const [live, setLive] = useState(false); // decided on mount: live unless the URL names a moment
  const [playing, setPlaying] = useState(false);
  const [view, setView] = useState<"office" | "people">("office");
  const [floor, setFloor] = useState<Floor>(1);
  const [room, setRoom] = useState<string>("lobby");
  const [open, setOpen] = useState<Record<string, string | null>>({});
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);

  // A moment can be linked: /hq?t=2026-10-13T06:20Z&room=build-floor&view=people
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const at = q.get("t") ? Date.parse(q.get("t")!) : NaN;
    if (Number.isFinite(at)) setT(Math.min(Math.max(at, t0), t1));
    else setLive(true);
    if (q.get("room")) (setRoom(q.get("room")!), setFloor(rooms.find((r) => r.id === q.get("room"))?.floor ?? 1));
    if ((FLOORS as readonly number[]).includes(Number(q.get("floor")))) setFloor(Number(q.get("floor")) as Floor);
    if (q.get("view") === "people") setView("people");
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
    const step = HOUR / 2 / 10;
    tick.current = setInterval(() => setT((x) => (x + step > t1 ? (setPlaying(false), t1) : x + step)), 100);
    return () => {
      if (tick.current) clearInterval(tick.current);
    };
  }, [playing, t1]);

  const upto = useMemo(() => {
    let i = times.length;
    while (i > 0 && times[i - 1] > t) i--;
    return events.slice(0, i);
  }, [events, times, t]);

  const people = useMemo(() => {
    const ps = peopleAt(upto, t);
    // The founder is in the Lobby within an hour of speaking.
    const last = [...upto].reverse().find((e) => e.actor === "founder");
    if (last && t - Date.parse(last.ts) < HOUR) ps.push({ key: "founder", role: "founder", name: "You", seed: personSeed("founder"), room: "lobby", state: "working", since: Date.parse(last.ts), summary: last.summary });
    return ps;
  }, [upto, t]);

  const activity = useMemo(() => {
    const m: Record<string, number> = {};
    for (let i = upto.length - 1; i >= 0 && t - Date.parse(upto[i].ts) < HOUR; i--) m[upto[i].room] = (m[upto[i].room] ?? 0) + 1;
    return m;
  }, [upto, t]);

  // Kudos received (week up to t) and the last hour, by role: a tiny 🎉 on the avatar, a count on hover.
  const kudosBy = useMemo(() => {
    const m: Record<string, { week: number; recent: boolean }> = {};
    for (const e of upto) {
      if (e.type !== "kudos" || !e.subjects?.[0] || t - Date.parse(e.ts) >= 7 * 24 * HOUR) continue;
      const r = kudosRole(e.subjects[0]);
      m[r] = { week: (m[r]?.week ?? 0) + 1, recent: (m[r]?.recent ?? false) || t - Date.parse(e.ts) < HOUR };
    }
    return m;
  }, [upto, t]);
  const kudosToday = useMemo(() => upto.filter((e) => e.type === "kudos" && e.ts.slice(0, 10) === new Date(t).toISOString().slice(0, 10)).length, [upto, t]);

  const roomEvents = useMemo(() => upto.filter((e) => e.room === room && e.type !== "usage").slice(-80).reverse(), [upto, room]);
  const feed = useMemo(() => upto.filter((e) => e.type !== "usage").slice(-25).reverse(), [upto]);
  const sel = rooms.find((r) => r.id === room);
  const working = people.filter((p) => p.state === "working" && p.role !== "founder").length;
  const stopped = people.filter((p) => p.state === "stopped").length;
  const inRoom = people.filter((p) => p.room === room);

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
  const floorOf = (id: string) => rooms.find((r) => r.id === id)?.floor ?? 1;
  const pickRoom = (id: string) => {
    setRoom(id);
    setFloor(floorOf(id));
    setView("office");
  };
  const pickPerson = (p: Person) => setRoom(p.room);

  return (
    <main className={s.hq}>
      <nav className={s.top}>
        <Link className="brand" href="/">
          S3
        </Link>
        <div className={s.title}>
          <strong>System 3 HQ</strong>
          <span className={s.muted}>
            {fmt(t)} · <b className={s.okText}>{working} working</b>
            {stopped ? (
              <>
                {" "}
                · <b className={s.badText}>{stopped} stopped</b>
              </>
            ) : null}{" "}
            · {upto.length} events
          </span>
        </div>
        <span className={s.spacer} />
        <div className={s.tabs} role="tablist">
          <button role="tab" aria-selected={view === "office"} className={view === "office" ? s.tabOn : s.tab} onClick={() => setView("office")}>
            Office
          </button>
          <button role="tab" aria-selected={view === "people"} className={view === "people" ? s.tabOn : s.tab} onClick={() => setView("people")}>
            People
          </button>
          <Link role="tab" aria-selected={false} className={s.tab} href="/hq/kudos">
            🎉 Kudos
          </Link>
          <Link role="tab" aria-selected={false} className={s.tab} href="/hq/design">
            Design
          </Link>
          <Link role="tab" aria-selected={false} className={s.tab} href="/hq/curriculum">
            Curriculum
          </Link>
          <Link role="tab" aria-selected={false} className={s.tab} href="/hq/library">
            Library
          </Link>
          <Link role="tab" aria-selected={false} className={s.tab} href="/hq/releases">
            Releases
          </Link>
          <Link role="tab" aria-selected={false} className={s.tab} href="/hq/first-light">
            First Light
          </Link>
          <Link role="tab" aria-selected={false} className={s.tab} href="/hq/strategy">
            Strategy
          </Link>
        </div>
        <Link className="brand-link" href="/catalog">
          Map
        </Link>
      </nav>

      {founderQueue.length > 0 && (
        <button className={s.banner} onClick={() => pickRoom("lobby")}>
          <b>{founderQueue.length} waiting for you</b>
          <span>
            {founderQueue.filter((q) => (q.priority ?? 9) <= 1).length} urgent · {founderQueue[0].title}
          </span>
          <span className={s.moreLink}>Open the Lobby ▸</span>
        </button>
      )}

      <section className={s.controls} aria-label="Replay">
        <button className={s.btn} onClick={() => (playing ? setPlaying(false) : (setLive(false), t >= t1 && setT(t0), setPlaying(true)))}>
          {playing ? "❚❚ Pause" : "▶ Replay"}
        </button>
        <input className={s.slider} type="range" min={t0} max={t1} step={60_000} value={t} onChange={(e) => scrub(Number(e.target.value))} aria-label="Time" />
        <button className={`${s.btn} ${live ? s.on : ""}`} onClick={() => (setPlaying(false), setLive(true))}>
          ● Live
        </button>
      </section>

      <svg
        className={s.strip}
        viewBox="0 0 1000 28"
        preserveAspectRatio="none"
        onClick={(e) => {
          const r = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
          scrub(t0 + ((e.clientX - r.left) / r.width) * (t1 - t0));
        }}
      >
        {events.map((e, i) => (
          <rect key={e.id} x={((times[i] - t0) / (t1 - t0 || 1)) * 1000} y={e.type === "commit" ? 16 : 4} width={1.5} height={e.type === "commit" ? 8 : 20} fill={TYPE_COLOR[e.type] ?? "#9aa3b5"} />
        ))}
        <rect x={((t - t0) / (t1 - t0 || 1)) * 1000 - 1} y={0} width={2} height={28} fill="var(--fg)" />
      </svg>

      <div className={s.layout}>
        <div className={s.stage}>
          {view === "office" ? (
            <div className={s.planWrap}>
              <form className={s.libSearch} action="/hq/library" method="get" role="search">
                <input name="q" type="search" placeholder="Search reports, decisions, PRDs, designs in the Library…" aria-label="Search the Library" />
                <button type="submit" className={s.btn}>
                  Search
                </button>
              </form>
              <div className={s.floors} role="tablist" aria-label="Floor">
                {FLOORS.map((f) => {
                  const here = people.filter((p) => floorOf(p.room) === f && p.state !== "idle").length;
                  const isPress = f === 8;
                  return (
                    <button key={f} role="tab" aria-selected={floor === f} className={isPress ? `${floor === f ? s.tabOn : s.tab} ${floor === f ? s.floorPressOn : s.floorPress}` : floor === f ? s.tabOn : s.tab} onClick={() => setFloor(f)}>
                      {FLOOR_NAMES[f]}
                      {here && !isPress ? ` · ${here}` : ""}
                    </button>
                  );
                })}
              </div>
              {floor === 8 && press && <PressBanner press={press} />}
              <Office press={press?.roles} rooms={rooms.filter((r) => (r.floor ?? 1) === floor)} people={people} activity={activity} selected={room} onRoom={(id) => (stairsTo(id) ? setFloor(stairsTo(id)!) : setRoom(id))} onPerson={pickPerson} kudos={kudosBy} />
              {floor === 8 && press && <PressOrg press={press} />}
            </div>
          ) : (
            <People org={org} people={people} rooms={rooms} onRoom={pickRoom} />
          )}
        </div>

        <aside className={s.panel}>
          <h2>{sel?.name ?? room}</h2>
          {room === "first-light" && (
            <p>
              <Link className={s.roomLink} href="/hq/first-light">
                Open the First Light war room: status, workstreams, risks
              </Link>
            </p>
          )}
          {room.startsWith("press-") && press && (
            <>
              <p className={s.muted}>System 3 Press, sibling company. Roster only: no press event log, so no live presence.</p>
              <PressResidents roles={press.roles.filter((r) => r.room === room)} />
            </>
          )}
          {inRoom.length > 0 && (
            <div className={s.roster}>
              {inRoom.map((p) => (
                <span key={p.key} className={s.rosterItem} title={p.summary}>
                  <Avatar seed={p.seed} color={teamColor(p.role)} size={22} dim={p.state === "idle"} ring={p.state === "stopped" ? "#ff6b6b" : undefined} />
                  {p.name}
                  {kudosBy[p.role] ? <span className={s.kudosCount} title="Kudos in the last 7 days">🎉 {kudosBy[p.role].week}</span> : null}
                </span>
              ))}
            </div>
          )}
          {room === "lobby" && (
            <div className={s.queue}>
              <Link className={s.kudosTicker} href="/hq/kudos">
                🎉 {kudosToday} kudos today, see the board
              </Link>
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
              <h3>Waiting on you ({founderQueue.length})</h3>
              {founderQueue.length ? (
                <ol className={s.inbox}>
                  {founderQueue.map((q) => (
                    <li key={q.id} className={s.inboxItem}>
                      <details>
                        <summary>
                          <span className={`${s.prio} ${(q.priority ?? 9) <= 1 ? s.prio1 : (q.priority ?? 9) <= 2 ? s.prio2 : ""}`}>P{q.priority ?? "–"}</span>
                          <span className={s.inboxCat}>{q.category}</span> {q.title}
                          {q.status && q.status !== "open" && <span className={s.muted}> · {q.status}</span>}
                        </summary>
                        {q.blocks && (
                          <p>
                            <b>Blocks:</b> {q.blocks}
                          </p>
                        )}
                        {q.options && (
                          <p>
                            <b>Options:</b> {q.options}
                          </p>
                        )}
                        {q.recommendation && (
                          <p>
                            <b>Recommendation:</b> {q.recommendation}
                          </p>
                        )}
                        {q.links?.length ? (
                          <p className={s.refs}>{q.links.join(" · ")}</p>
                        ) : null}
                        <p className={s.muted}>
                          {q.id}
                          {q.board ? ` · board ${q.board}` : ""} · answer in chat; the chief of staff records it
                        </p>
                      </details>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className={s.muted}>Nothing is waiting on you.</p>
              )}
            </div>
          )}
          <p className={s.muted}>
            {roomEvents.length} events up to {fmt(t)}
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
            <EventRow key={e.id} e={e} body={open[e.id]} onToggle={() => toggle(e.id)} showRoom onRoom={() => pickRoom(e.room)} />
          ))}
        </ol>
      </section>
    </main>
  );
}

function EventRow({ e, body, onToggle, showRoom, onRoom }: { e: HqEvent; body: string | null | undefined; onToggle: () => void; showRoom?: boolean; onRoom?: () => void }) {
  const role = roleOf(e);
  const label = role === "chief-of-staff" ? undefined : e.agent;
  return (
    <li className={s.event}>
      <Avatar seed={personSeed(role, label)} color={teamColor(role)} size={28} />
      <div className={s.eventMain}>
        <div className={s.eventHead}>
          <b>{personName(role, label)}</b>
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
          {e.hasBody && <span className={s.moreLink}>{body === undefined ? " ▸" : " ▾"}</span>}
        </button>
        {body !== undefined && <pre className={s.body}>{body ?? "Loading…"}</pre>}
        {e.refs?.length ? <div className={s.refs}>{e.refs.slice(0, 4).join(" · ")}</div> : null}
      </div>
    </li>
  );
}
