"use client";

// The org tree: every role from tools/org/roles.mjs under the role it reports to, with its people.
// A resident role shows one person; a pool role (builders, checkers, reviewers) shows who is running now.
import type { OrgRole, Room } from "@/lib/hq";
import { teamColor } from "@/lib/hq-colors";
import { Avatar } from "./Avatar";
import { isMany, personName, personSeed, type Person } from "./people";
import s from "./hq.module.css";

export default function People({ org, people, rooms, onRoom }: { org: OrgRole[]; people: Person[]; rooms: Room[]; onRoom: (id: string) => void }) {
  const kids = (id: string) => org.filter((r) => r.reportsTo === id);
  const roomName = (id: string) => rooms.find((r) => r.id === id)?.name ?? id;

  function Node({ r, depth }: { r: OrgRole; depth: number }) {
    const mine = people.filter((p) => p.role === r.id && p.state !== "idle");
    const pool = isMany(r.id);
    const resident = people.find((p) => p.role === r.id);
    const status = mine[0] ?? resident;
    const children = kids(r.id);
    return (
      <li className={s.orgItem}>
        <div className={s.orgCard} style={{ ["--team" as string]: teamColor(r.id) }}>
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
              {pool ? (mine.length ? mine.map((p) => p.name).join(", ") : "Nobody running") : personName(r.id)}
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
          </div>
        </div>
        {children.length > 0 && depth < 6 && (
          <ul className={s.orgList}>
            {children.map((c) => (
              <Node key={c.id} r={c} depth={depth + 1} />
            ))}
          </ul>
        )}
      </li>
    );
  }

  const roots = org.filter((r) => !org.some((o) => o.id === r.reportsTo));
  return (
    <ul className={`${s.orgList} ${s.orgRoot}`}>
      {roots.map((r) => (
        <Node key={r.id} r={r} depth={0} />
      ))}
    </ul>
  );
}
