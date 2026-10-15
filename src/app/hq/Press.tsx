// System 3 Press on floor 8: the founder's sibling company. Banner, org view and room roster.
// Roster only: there is no press event log, so nothing here shows who is working or where.
import { Avatar } from "./Avatar";
import { PRESS_ACCENT, PRESS_LABEL, pressOrg, pressSeed, type OrgNode, type PressRole, type PressSnapshot } from "@/lib/hq-press";
import s from "./hq.module.css";

const accent = { "--press": PRESS_ACCENT } as React.CSSProperties;

export function PressBanner({ press }: { press: PressSnapshot }) {
  return (
    <div className={s.pressBanner} style={accent} role="note">
      <b className={s.pressLabel}>{PRESS_LABEL}</b>
      <span className={s.pressSibling}>sibling company</span>
      <span>
        Not part of System 3 Company. {press.roles.length} people on the roster; reports to the founder as author.
      </span>
      <span className={s.pressNote}>Roster only: there is no press event log, so no live presence is shown here, and the replay slider does not apply.</span>
    </div>
  );
}

function Node({ n, depth }: { n: OrgNode; depth: number }) {
  const r = n.role;
  return (
    <li>
      <div className={s.pressPerson}>
        <Avatar seed={pressSeed(r.id)} color={PRESS_ACCENT} size={22} ring={r.human ? "#ffd54f" : undefined} />
        <span>
          <b>{r.name}</b> <span className={s.muted}>{r.title}</span>
          {r.human && <span className={s.pressChip}>author · human</span>}
          {r.consultant && <span className={s.pressChip}>consultant</span>}
        </span>
      </div>
      {n.reports.length > 0 && (
        <ul className={depth > 4 ? undefined : s.pressTree}>
          {r.id === "vp-books" ? <Reports nodes={n.reports} depth={depth + 1} /> : n.reports.map((c) => <Node key={c.role.id} n={c} depth={depth + 1} />)}
        </ul>
      )}
    </li>
  );
}

// Under the VP, consultants are shown together as one panel so the panel reads as a panel.
function Reports({ nodes, depth }: { nodes: OrgNode[]; depth: number }) {
  const staff = nodes.filter((n) => !n.role.consultant);
  const panel = nodes.filter((n) => n.role.consultant);
  return (
    <>
      {staff.map((c) => (
        <Node key={c.role.id} n={c} depth={depth} />
      ))}
      {panel.length > 0 && (
        <li>
          <div className={s.pressPanelHead}>Review panel · {panel.length} consultants, each reporting to the VP of Books</div>
          <ul className={s.pressTree}>
            {panel.map((c) => (
              <Node key={c.role.id} n={c} depth={depth + 1} />
            ))}
          </ul>
        </li>
      )}
    </>
  );
}

export function PressOrg({ press }: { press: PressSnapshot }) {
  const roots = pressOrg(press.roles);
  return (
    <section className={s.pressOrg} style={accent} aria-label="System 3 Press org">
      <h3>Who reports to whom · {PRESS_LABEL} (sibling company)</h3>
      <ul className={s.pressRoot}>
        {roots.map((n) => (
          <Node key={n.role.id} n={n} depth={0} />
        ))}
      </ul>
    </section>
  );
}

export function PressResidents({ roles }: { roles: PressRole[] }) {
  return (
    <ul className={s.pressResidents}>
      {roles.map((r) => (
        <li key={r.id}>
          <Avatar seed={pressSeed(r.id)} color={PRESS_ACCENT} size={22} ring={r.human ? "#ffd54f" : undefined} />
          <span>
            <b>{r.name}</b>
            {r.human && <span className={s.pressChip}>author · human</span>}
            {r.consultant && <span className={s.pressChip}>consultant</span>}
            <br />
            <span className={s.muted}>{r.title}</span>
            <br />
            <span className={s.muted}>Reports to {r.reportsTo}</span>
            <br />
            <span className={s.pressMission}>{r.mission}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
