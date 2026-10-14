"use client";

// The Kudos board: thanks between roles, as sticky notes, newest first. For fun, not a metric:
// nobody is ranked lowest and nobody with zero is shown.

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { OrgRole } from "@/lib/hq";
import { teamColor } from "@/lib/hq-colors";
import { KUDOS_EMOJI, KUDOS_MAX, kudosRole, type Kudos as K } from "@/lib/hq-kudos";
import { Avatar } from "../Avatar";
import { personName, personSeed } from "../people";
import s from "./kudos.module.css";

const WEEK = 7 * 24 * 3_600_000;
const NOTE_TILT = [-1.4, 0.8, -0.5, 1.3, -0.9, 0.4];
const NOTE_PAPER = ["--paper-a", "--paper-b", "--paper-c", "--paper-d"];
const ago = (ms: number) => (ms < 90_000 ? "just now" : ms < 3_600_000 ? `${Math.round(ms / 60_000)} min ago` : ms < 86_400_000 ? `${Math.round(ms / 3_600_000)} h ago` : `${Math.round(ms / 86_400_000)} d ago`);
const who = (role: string) => (role === "founder" ? "the founder" : personName(role));

export default function Kudos({ kudos, org, now, canGive }: { kudos: K[]; org: OrgRole[]; now: number; canGive: boolean }) {
  const router = useRouter();
  const [team, setTeam] = useState("all");
  const [role, setRole] = useState("all");
  const [week, setWeek] = useState(false);
  const [burst, setBurst] = useState(0);
  const seen = useRef<Set<string> | null>(null);
  const teamOf = (r: string) => org.find((o) => o.id === r)?.team ?? "other";

  // Keep fresh, and throw a little confetti when something new lands (never on first paint).
  useEffect(() => {
    const id = setInterval(() => router.refresh(), 20_000);
    return () => clearInterval(id);
  }, [router]);
  useEffect(() => {
    if (seen.current && kudos.some((k) => !seen.current!.has(k.id))) setBurst((b) => b + 1);
    seen.current = new Set(kudos.map((k) => k.id));
  }, [kudos]);

  const teams = useMemo(() => [...new Set(kudos.map((k) => teamOf(k.toRole)))].sort(), [kudos, org]); // eslint-disable-line react-hooks/exhaustive-deps
  const roles = useMemo(() => [...new Set(kudos.filter((k) => team === "all" || teamOf(k.toRole) === team).map((k) => k.toRole))].sort((a, b) => personName(a).localeCompare(personName(b))), [kudos, team, org]); // eslint-disable-line react-hooks/exhaustive-deps
  const shown = useMemo(
    () =>
      kudos
        .filter((k) => (team === "all" || teamOf(k.toRole) === team) && (role === "all" || k.toRole === role) && (!week || now - Date.parse(k.ts) < WEEK))
        .sort((a, b) => b.ts.localeCompare(a.ts)),
    [kudos, team, role, week, now, org], // eslint-disable-line react-hooks/exhaustive-deps
  );
  const shelf = useMemo(() => {
    const m = new Map<string, number>();
    for (const k of kudos) if (now - Date.parse(k.ts) < WEEK) m.set(k.toRole, (m.get(k.toRole) ?? 0) + 1);
    return [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 5);
  }, [kudos, now]);

  return (
    <main className={s.page}>
      <nav className={s.top}>
        <Link className="brand" href="/">
          S3
        </Link>
        <div className={s.title}>
          <strong>Kudos board</strong>
          <span className={s.muted}>
            {kudos.length} thank-yous · for fun, not a metric
          </span>
        </div>
        <span className={s.spacer} />
        <Link className="brand-link" href="/hq">
          ← HQ
        </Link>
      </nav>

      {burst > 0 && <Confetti key={burst} />}

      <section className={s.shelf} aria-label="Most thanked this week">
        <h2>Most thanked this week</h2>
        {shelf.length ? (
          <ol className={s.shelfList}>
            {shelf.map(([r, n], i) => (
              <li key={r} className={s.shelfItem}>
                <span className={s.medal} aria-hidden="true">
                  {["🥇", "🥈", "🥉", "⭐", "⭐"][i]}
                </span>
                <Avatar seed={personSeed(r)} color={teamColor(r)} size={34} />
                <span>
                  <b>{personName(r)}</b>
                  <br />
                  <span className={s.muted}>
                    {n} {n === 1 ? "kudos" : "kudos"}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        ) : (
          <p className={s.muted}>A quiet week so far. Be the first to say thanks.</p>
        )}
      </section>

      <section className={s.filters} aria-label="Filters">
        <label>
          Team{" "}
          <select
            value={team}
            onChange={(e) => {
              setTeam(e.target.value);
              setRole("all");
            }}
          >
            <option value="all">All teams</option>
            {teams.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label>
          Role{" "}
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="all">All roles</option>
            {roles.map((r) => (
              <option key={r} value={r}>
                {personName(r)} · {r}
              </option>
            ))}
          </select>
        </label>
        <button className={`${s.pill} ${week ? s.pillOn : ""}`} aria-pressed={week} onClick={() => setWeek(!week)}>
          This week
        </button>
        <span className={s.muted}>{shown.length} shown</span>
      </section>

      {canGive && <GiveForm org={org} onGiven={() => (setBurst((b) => b + 1), router.refresh())} />}

      {shown.length ? (
        <ul className={s.wall}>
          {shown.map((k, i) => (
            <li key={k.id} className={s.note} style={{ ["--tilt" as string]: `${NOTE_TILT[i % NOTE_TILT.length]}deg`, ["--paper" as string]: `var(${NOTE_PAPER[i % NOTE_PAPER.length]})` }}>
              <div className={s.noteHead}>
                <Avatar seed={personSeed(k.toRole)} color={teamColor(k.toRole)} size={40} />
                <div>
                  <b>{personName(k.toRole)}</b>
                  <div className={s.noteRole}>{k.to}</div>
                </div>
                <span className={s.emoji} aria-hidden="true">
                  {k.emoji}
                </span>
              </div>
              <p className={s.why}>{k.why}</p>
              <div className={s.noteFoot}>
                <span className={s.giver}>
                  <Avatar seed={personSeed(k.from)} color={teamColor(k.from)} size={18} />
                  from {who(k.from)}
                </span>
                <time title={k.ts} dateTime={k.ts}>
                  {ago(now - Date.parse(k.ts))}
                </time>
              </div>
              {k.ref && (
                <a className={s.ref} href={`https://github.com/hanialshater/system-3-company/blob/main/${k.ref}`} target="_blank" rel="noreferrer">
                  {k.ref}
                </a>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className={s.empty}>No kudos match these filters. Try widening them.</p>
      )}
    </main>
  );
}

function GiveForm({ org, onGiven }: { org: OrgRole[]; onGiven: () => void }) {
  const [to, setTo] = useState("");
  const [why, setWhy] = useState("");
  const [emoji, setEmoji] = useState<string>(KUDOS_EMOJI[0]);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const people = [...org].sort((a, b) => personName(a.id).localeCompare(personName(b.id)));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const r = await fetch("/api/hq/kudos", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ to, for: why, emoji }) });
    const j = await r.json().catch(() => ({}));
    setBusy(false);
    if (r.ok) {
      setMsg({ ok: true, text: j.added ? "Sent. They will feel the warm glow." : "Already given, nothing changed." });
      setWhy("");
      onGiven();
    } else setMsg({ ok: false, text: j.error ?? "Could not send." });
  }

  return (
    <form className={s.give} onSubmit={submit}>
      <h2>Say thanks</h2>
      <div className={s.giveRow}>
        <label>
          From <input value="founder" readOnly aria-readonly="true" className={s.fixed} />
        </label>
        <label>
          To{" "}
          <select value={to} onChange={(e) => setTo(e.target.value)} required>
            <option value="">Pick a person…</option>
            {people.map((o) => (
              <option key={o.id} value={o.id}>
                {personName(o.id)} · {o.title}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className={s.grow}>
        For (be specific)
        <input value={why} onChange={(e) => setWhy(e.target.value)} maxLength={KUDOS_MAX} placeholder="Caught the float leak before it reached a learner" required />
      </label>
      <div className={s.giveRow}>
        <div className={s.emojiPick} role="radiogroup" aria-label="Emoji">
          {KUDOS_EMOJI.map((em) => (
            <button type="button" key={em} role="radio" aria-checked={emoji === em} className={emoji === em ? s.emojiOn : s.emojiBtn} onClick={() => setEmoji(em)}>
              {em}
            </button>
          ))}
        </div>
        <button className={s.send} disabled={busy || !to || !why.trim() || kudosRole(to) === "founder"}>
          Send kudos
        </button>
        <span className={s.muted}>
          {why.length}/{KUDOS_MAX}
        </span>
      </div>
      {msg && (
        <p role="status" className={msg.ok ? s.okMsg : s.errMsg}>
          {msg.text}
        </p>
      )}
    </form>
  );
}

const CONFETTI = ["#ffd54f", "#7c9cff", "#3ddc97", "#f48fb1", "#ff8a65", "#c792ea"];
function Confetti() {
  const [off, setOff] = useState(true);
  useEffect(() => {
    setOff(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  if (off) return null;
  return (
    <div className={s.confetti} aria-hidden="true">
      {Array.from({ length: 28 }).map((_, i) => (
        <i key={i} style={{ left: `${(i * 37) % 100}%`, background: CONFETTI[i % CONFETTI.length], animationDelay: `${(i % 7) * 60}ms`, ["--dx" as string]: `${((i * 53) % 90) - 45}px` }} />
      ))}
    </div>
  );
}
