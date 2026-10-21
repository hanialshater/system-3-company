"use client";

// The org tree: every role from tools/org/roles.mjs under the role it reports to, with its people.
// A resident role shows one person; a pool role (builders, checkers, reviewers) shows who is running now.
// Navigable like an HR org chart: branches fold and unfold, "Focus" opens one manager's team with the
// chain above it as a breadcrumb, and search unfolds the path to every match. A folded branch still says
// how many of its people are working, so folding never hides activity.
import { useMemo, useState } from "react";
import type { OrgRole, Room } from "@/lib/hq";
import { teamColor } from "@/lib/hq-colors";
import { Avatar } from "./Avatar";
import { isMany, personName, personSeed, type Person } from "./people";
import s from "./hq.module.css";

const OPEN_DEPTH = 1; // levels unfolded below the focused role on first view

export default function People({ org, people, rooms, onRoom }: { org: OrgRole[]; people: Person[]; rooms: Room[]; onRoom: (id: string) => void }) {
  const byId = useMemo(() => new Map(org.map((r) => [r.id, r])), [org]);
  const kids = useMemo(() => {
    const m = new Map<string, OrgRole[]>();
    for (const r of org) m.set(r.reportsTo, [...(m.get(r.reportsTo) ?? []), r]);
    return m;
  }, [org]);
  const roots = useMemo(() => org.filter((r) => !byId.has(r.reportsTo)), [org, byId]);
  const below = useMemo(() => {
    const m = new Map<string, string[]>();
    const walk = (id: string): string[] => {
      if (m.has(id)) return m.get(id)!;
      const out = (kids.get(id) ?? []).flatMap((c) => [c.id, ...walk(c.id)]);
      m.set(id, out);
      return out;
    };
    org.forEach((r) => walk(r.id));
    return m;
  }, [org, kids]);
  const busy = useMemo(() => new Set(people.filter((p) => p.state !== "idle").map((p) => p.role)), [people]);

  const [focus, setFocus] = useState<string | null>(null);
  const [open, setOpen] = useState<Set<string> | null>(null); // null: the default unfold
  const [q, setQ] = useState("");

  // Search looks across the whole company, whatever the focus.
  const needle = q.trim().toLowerCase();
  const scoped = focus && byId.has(focus) && !needle ? focus : null;
  const top = useMemo(() => (scoped ? [byId.get(scoped)!] : roots), [scoped, byId, roots]);
  const chain: OrgRole[] = [];
  for (let r = scoped ? byId.get(scoped) : undefined; r; r = byId.get(r.reportsTo)) chain.unshift(r);

  // Search: roles whose name or title match, and every manager above them (unfolded to show the path).
  const { hits, path } = useMemo(() => {
    const hits = new Set<string>();
    const path = new Set<string>();
    if (!needle) return { hits, path };
    for (const r of org) {
      if (!`${r.title} ${r.id} ${personName(r.id)}`.toLowerCase().includes(needle)) continue;
      hits.add(r.id);
      for (let up = byId.get(r.reportsTo); up; up = byId.get(up.reportsTo)) path.add(up.id);
    }
    return { hits, path };
  }, [needle, org, byId]);

  // Unfolded roles: the first OPEN_DEPTH levels below the top by default, then whatever the reader chose.
  const defaults = useMemo(() => {
    const set = new Set<string>();
    const walk = (r: OrgRole, d: number) => {
      if (d >= OPEN_DEPTH) return;
      set.add(r.id);
      (kids.get(r.id) ?? []).forEach((c) => walk(c, d + 1));
    };
    top.forEach((r) => walk(r, 0));
    return set;
  }, [top, kids]);
  const unfolded = needle ? path : (open ?? defaults);
  const isOpen = (id: string) => unfolded.has(id);
  const toggle = (id: string) => {
    const next = new Set(unfolded);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setOpen(next);
    setQ("");
  };

  const goTo = (id: string | null) => {
    setFocus(id);
    setOpen(null);
    setQ("");
  };

  return (
    <div className={s.orgWrap}>
      <div className={s.orgBar}>
        <input className={s.orgSearch} type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Find a role or a person…" aria-label="Find a role or a person" />
        <button className={s.btn} onClick={() => (setQ(""), setOpen(new Set(org.map((r) => r.id))))}>
          Expand all
        </button>
        <button className={s.btn} onClick={() => (setQ(""), setOpen(new Set()))}>
          Collapse all
        </button>
        {needle && <span className={s.muted}>{hits.size} match{hits.size === 1 ? "" : "es"}</span>}
      </div>
      <ol className={s.crumbs} aria-label="Reporting line">
        <li>
          <button className={scoped ? s.crumb : s.crumbOn} onClick={() => goTo(null)}>
            Whole company
          </button>
        </li>
        {chain.map((r) => (
          <li key={r.id}>
            <button className={r.id === scoped ? s.crumbOn : s.crumb} onClick={() => goTo(r.id)} aria-current={r.id === scoped ? "page" : undefined}>
              {personName(r.id)} <span className={s.muted}>· {r.title}</span>
            </button>
          </li>
        ))}
      </ol>
      <ul className={`${s.orgList} ${s.orgRoot}`} role="tree" aria-label="Organisation">
        {top.map((r) => (
          <Node key={r.id} r={r} depth={0} ctx={{ kids, below, busy, people, rooms, onRoom, isOpen, toggle, goTo, hits, focus: scoped }} />
        ))}
      </ul>
    </div>
  );
}

type Ctx = {
  kids: Map<string, OrgRole[]>;
  below: Map<string, string[]>;
  busy: Set<string>;
  people: Person[];
  rooms: Room[];
  onRoom: (id: string) => void;
  isOpen: (id: string) => boolean;
  toggle: (id: string) => void;
  goTo: (id: string | null) => void;
  hits: Set<string>;
  focus: string | null;
};

function Node({ r, depth, ctx }: { r: OrgRole; depth: number; ctx: Ctx }) {
  const { kids, below, busy, people, rooms, onRoom, isOpen, toggle, goTo, hits, focus } = ctx;
  const roomName = (id: string) => rooms.find((x) => x.id === id)?.name ?? id;
  const mine = people.filter((p) => p.role === r.id && p.state !== "idle");
  const pool = isMany(r.id);
  const resident = people.find((p) => p.role === r.id);
  const status = mine[0] ?? resident;
  const children = kids.get(r.id) ?? [];
  const team = below.get(r.id) ?? [];
  const working = team.filter((id) => busy.has(id)).length;
  const unfolded = children.length > 0 && isOpen(r.id);
  return (
    <li className={s.orgItem} role="treeitem" aria-expanded={children.length ? unfolded : undefined} aria-selected={hits.has(r.id)}>
      <div className={`${s.orgCard} ${hits.has(r.id) ? s.orgHit : ""}`} style={{ ["--team" as string]: teamColor(r.id) }}>
        {children.length > 0 ? (
          <button className={s.orgFold} onClick={() => toggle(r.id)} aria-label={`${unfolded ? "Fold" : "Unfold"} ${r.title}'s team`}>
            {unfolded ? "▾" : "▸"}
          </button>
        ) : (
          <span className={s.orgFoldSpace} />
        )}
        {pool ? (
          <div className={s.orgStack}>
            {(mine.length ? mine : [null]).slice(0, 6).map((p, i) =>
              p ? <Avatar key={p.key} seed={p.seed} color={teamColor(r.id)} size={30} ring={p.state === "stopped" ? "#ff6b6b" : undefined} /> : <Avatar key={i} seed={personSeed(r.id)} color={teamColor(r.id)} size={30} dim />,
            )}
          </div>
        ) : (
          <Avatar seed={personSeed(r.id)} color={teamColor(r.id)} size={36} dim={status?.state === "idle"} ring={status?.state === "stopped" ? "#ff6b6b" : undefined} />
        )}
        <div className={s.orgText}>
          <div className={s.orgName}>
            {pool ? (mine.length ? mine.slice(0, 3).map((p) => p.name).join(", ") + (mine.length > 3 ? ` +${mine.length - 3} more` : "") : "Nobody running") : personName(r.id)}
            {status && status.state !== "idle" && <span className={`${s.badge} ${s[status.state]}`}>{status.state}</span>}
          </div>
          <div className={s.orgTitle}>{r.title}</div>
          {status && status.state !== "idle" ? (
            <button className={s.orgWhere} onClick={() => onRoom(status.room)}>
              {roomName(status.room)} · {status.summary.slice(0, 90)}
            </button>
          ) : (
            !pool && resident && <div className={s.orgWhereIdle}>{roomName(resident.room)}</div>
          )}
          {children.length > 0 && (
            <div className={s.orgMeta}>
              {children.length} direct · {team.length} in team
              {working > 0 && <b className={s.okText}> · {working} working</b>}
              {r.id !== focus && (
                <button className={s.orgFocus} onClick={() => goTo(r.id)}>
                  Focus ›
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {unfolded && (
        <ul className={s.orgList} role="group">
          {children.map((c) => (
            <Node key={c.id} r={c} depth={depth + 1} ctx={ctx} />
          ))}
        </ul>
      )}
    </li>
  );
}
