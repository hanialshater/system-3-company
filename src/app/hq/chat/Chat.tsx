"use client";

// HQ Chat: the event log read as a chat app. Rooms are channels and roles are direct threads; messages
// group by sender and day, and a message's body (a brief, a report) unfolds in place. Read-only: events
// are written by tools/events.mjs, never from here. A thread can be linked: /hq/chat?c=room:lobby
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { HqEvent } from "@/lib/hq";
import { teamColor } from "@/lib/hq-colors";
import { Avatar } from "../Avatar";
import { personName, personSeed } from "../people";
import s from "../hq.module.css";

const PAGE = 150;
const GROUP_MS = 10 * 60_000;
const roleOf = (e: HqEvent) => (e.actor === "chief-of-staff" && e.agent ? "chief-of-staff" : e.actor);
const labelOf = (e: HqEvent) => (roleOf(e) === "chief-of-staff" ? undefined : e.agent);
const day = (ts: string) => new Date(ts).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const clock = (ts: string) => ts.slice(11, 16);

type Channel = { key: string; kind: "all" | "room" | "role"; id: string; name: string; count: number; last: string };

export default function Chat({ events, rooms }: { events: HqEvent[]; rooms: { id: string; name: string }[] }) {
  const channels = useMemo(() => {
    const roomName = new Map(rooms.map((r) => [r.id, r.name]));
    const by = new Map<string, Channel>();
    const add = (key: string, kind: Channel["kind"], id: string, name: string, ts: string) => {
      const c = by.get(key) ?? { key, kind, id, name, count: 0, last: ts };
      c.count++;
      if (ts > c.last) c.last = ts;
      by.set(key, c);
    };
    for (const e of events) {
      add("all", "all", "all", "All activity", e.ts);
      add(`room:${e.room}`, "room", e.room, roomName.get(e.room) ?? e.room, e.ts);
      add(`role:${roleOf(e)}`, "role", roleOf(e), personName(roleOf(e)), e.ts);
    }
    const recent = (a: Channel, b: Channel) => b.last.localeCompare(a.last);
    const list = [...by.values()];
    return { all: by.get("all"), rooms: list.filter((c) => c.kind === "room").sort(recent), roles: list.filter((c) => c.kind === "role").sort(recent) };
  }, [events, rooms]);

  const [key, setKey] = useState("all");
  const [filter, setFilter] = useState("");
  const [shown, setShown] = useState(PAGE);
  const [open, setOpen] = useState<Record<string, string | null>>({});

  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("c");
    if (c) setKey(c);
  }, []);
  const pick = (k: string) => {
    setKey(k);
    setShown(PAGE);
    window.history.replaceState(null, "", k === "all" ? "/hq/chat" : `/hq/chat?c=${encodeURIComponent(k)}`);
  };

  const thread = useMemo(() => {
    if (key === "all") return events;
    const [kind, id] = [key.slice(0, key.indexOf(":")), key.slice(key.indexOf(":") + 1)];
    return events.filter((e) => (kind === "room" ? e.room === id : roleOf(e) === id));
  }, [events, key]);
  const visible = thread.slice(-shown);
  // Like a chat app: open a thread at its newest message.
  const list = useRef<HTMLOListElement>(null);
  useEffect(() => {
    if (list.current) list.current.scrollTop = list.current.scrollHeight;
  }, [key]);
  const current = key === "all" ? channels.all : [...channels.rooms, ...channels.roles].find((c) => c.key === key);

  async function toggle(id: string) {
    if (open[id] !== undefined) return setOpen(({ [id]: _, ...rest }) => rest);
    setOpen((o) => ({ ...o, [id]: null }));
    const r = await fetch(`/api/hq/event/${encodeURIComponent(id)}`);
    const e = r.ok ? await r.json() : null;
    setOpen((o) => ({ ...o, [id]: e?.body ?? "(no text recorded)" }));
  }

  const f = filter.trim().toLowerCase();
  const match = (c: Channel) => !f || `${c.name} ${c.id}`.toLowerCase().includes(f);

  return (
    <main className={s.chat}>
      <aside className={s.chatList} aria-label="Channels">
        <input className={s.orgSearch} type="search" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Jump to…" aria-label="Filter channels" />
        {channels.all && <ChannelRow c={channels.all} on={key === "all"} onPick={pick} />}
        <div className={s.sideTitle}>Rooms</div>
        {channels.rooms.filter(match).map((c) => (
          <ChannelRow key={c.key} c={c} on={key === c.key} onPick={pick} />
        ))}
        <div className={s.sideTitle}>People</div>
        {channels.roles.filter(match).map((c) => (
          <ChannelRow key={c.key} c={c} on={key === c.key} onPick={pick} />
        ))}
      </aside>

      <section className={s.chatPane} aria-label="Messages">
        <header className={s.chatHead}>
          <strong>
            {current?.kind === "room" ? "# " : ""}
            {current?.name ?? key}
          </strong>
          <span className={s.muted}>
            {thread.length} messages
            {current?.kind === "room" && (
              <>
                {" "}
                · <Link href={`/hq?room=${encodeURIComponent(current.id)}`}>open the room in the Office</Link>
              </>
            )}
          </span>
        </header>
        <ol className={s.chatMsgs} ref={list}>
          {thread.length > shown && (
            <li className={s.chatMore}>
              <button className={s.btn} onClick={() => setShown((n) => n + PAGE)}>
                Show {Math.min(PAGE, thread.length - shown)} earlier
              </button>
            </li>
          )}
          {visible.map((e, i) => {
            const prev = visible[i - 1];
            const newDay = !prev || day(prev.ts) !== day(e.ts);
            const grouped = !newDay && prev && roleOf(prev) === roleOf(e) && labelOf(prev) === labelOf(e) && Date.parse(e.ts) - Date.parse(prev.ts) < GROUP_MS;
            const body = open[e.id];
            return (
              <li key={e.id}>
                {newDay && (
                  <div className={s.chatDay}>
                    <span>{day(e.ts)}</span>
                  </div>
                )}
                <div className={grouped ? s.chatMsgCont : s.chatMsg}>
                  <div className={s.chatAvatar}>{grouped ? <time className={s.chatClock}>{clock(e.ts)}</time> : <Avatar seed={personSeed(roleOf(e), labelOf(e))} color={teamColor(roleOf(e))} size={32} />}</div>
                  <div className={s.eventMain}>
                    {!grouped && (
                      <div className={s.eventHead}>
                        <b>{personName(roleOf(e), labelOf(e))}</b>
                        <time className={s.muted}>{clock(e.ts)} UTC</time>
                        {key !== `room:${e.room}` && (
                          <button className={s.roomLink} onClick={() => pick(`room:${e.room}`)}>
                            #{e.room}
                          </button>
                        )}
                      </div>
                    )}
                    <div className={s.chatText}>
                      <span className={s.chatType}>{e.type}</span>
                      {e.hasBody ? (
                        <button className={s.chatSummary} onClick={() => toggle(e.id)} aria-expanded={body !== undefined}>
                          {e.summary}
                          <span className={s.moreLink}>{body === undefined ? " ▸" : " ▾"}</span>
                        </button>
                      ) : (
                        <span>{e.summary}</span>
                      )}
                    </div>
                    {body !== undefined && <pre className={s.body}>{body ?? "Loading…"}</pre>}
                    {e.refs?.length ? <div className={s.refs}>{e.refs.slice(0, 4).join(" · ")}</div> : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <footer className={s.chatCompose} aria-label="Read-only">
          Read-only. Agents write to this log through <code>tools/events.mjs</code>; to answer the founder queue, reply in your session and the chief of staff records it.
        </footer>
      </section>
    </main>
  );
}

function ChannelRow({ c, on, onPick }: { c: Channel; on: boolean; onPick: (k: string) => void }) {
  return (
    <button className={on ? s.chanOn : s.chan} onClick={() => onPick(c.key)} aria-current={on ? "true" : undefined}>
      {c.kind === "role" ? <Avatar seed={personSeed(c.id)} color={teamColor(c.id)} size={18} /> : <span className={s.chanHash}>{c.kind === "all" ? "◆" : "#"}</span>}
      <span className={s.chanName}>{c.name}</span>
      <span className={s.chanCount}>{c.count}</span>
    </button>
  );
}
