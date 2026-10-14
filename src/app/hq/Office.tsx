"use client";

// The floor plan: rooms with furniture, and everyone in the building drawn where they are.
import type { Room } from "@/lib/hq";
import { teamColor } from "@/lib/hq-colors";
import { Face } from "./Avatar";
import type { Person } from "./people";
import s from "./hq.module.css";

const STATE_DOT: Record<Person["state"], string> = { working: "#3ddc97", stopped: "#ff6b6b", done: "#9aa3b5", idle: "transparent" };

function Furniture({ r }: { r: Room }) {
  const { x, y, w, h } = r;
  const desk = (dx: number, dy: number, dw = 30, dh = 14, k = 0) => (
    <g key={`${dx}-${dy}-${k}`}>
      <rect x={dx} y={dy} width={dw} height={dh} rx={3} className={s.desk} />
      <rect x={dx + dw / 2 - 6} y={dy + 2} width={12} height={4} rx={1} className={s.monitor} />
    </g>
  );
  if (r.id === "build-floor") {
    const out = [];
    for (let row = 0; row < 3; row++) for (let c = 0; c < 6; c++) out.push(desk(x + 22 + c * 62, y + 64 + row * 58, 40, 14, row * 6 + c));
    return <>{out}</>;
  }
  if (r.kind === "meeting") {
    const tw = Math.min(w - 50, 110);
    const th = Math.min(h - 46, 34);
    return (
      <g>
        <rect x={x + (w - tw) / 2} y={y + 30 + (h - 30 - th) / 2} width={tw} height={th} rx={th / 2} className={s.table} />
        {Array.from({ length: 4 }).map((_, i) => (
          <g key={i}>
            <circle cx={x + (w - tw) / 2 + 12 + (i * (tw - 24)) / 3} cy={y + 30 + (h - 30 - th) / 2 - 6} r={4} className={s.chair} />
            <circle cx={x + (w - tw) / 2 + 12 + (i * (tw - 24)) / 3} cy={y + 30 + (h - 30 - th) / 2 + th + 6} r={4} className={s.chair} />
          </g>
        ))}
      </g>
    );
  }
  if (r.kind === "lobby") {
    return (
      <g>
        <rect x={x + 18} y={y + 40} width={70} height={18} rx={8} className={s.sofa} />
        <rect x={x + w - 88} y={y + 40} width={70} height={18} rx={8} className={s.sofa} />
        <rect x={x + w / 2 - 50} y={y + 28} width={100} height={12} rx={6} className={s.desk} />
        <Plant x={x + 104} y={y + 50} />
        <Plant x={x + w - 104} y={y + 50} />
      </g>
    );
  }
  if (r.kind === "floor") {
    const n = Math.max(1, Math.floor((w - 20) / 64));
    return <>{Array.from({ length: n }).map((_, i) => desk(x + 16 + i * 64, y + h - 26, 44, 12, i))}</>;
  }
  // office
  return (
    <g>
      {desk(x + w - 44, y + h - 24, 34, 13)}
      {h > 90 && <Plant x={x + 12} y={y + h - 12} />}
    </g>
  );
}

function Plant({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={6} className={s.plant} />
      <circle cx={x + 4} cy={y - 3} r={4} className={s.plantLight} />
      <circle cx={x - 3} cy={y - 4} r={3.5} className={s.plantLight} />
    </g>
  );
}

export default function Office({ rooms, people, activity, selected, onRoom, onPerson, kudos }: { rooms: Room[]; people: Person[]; activity: Record<string, number>; selected: string; onRoom: (id: string) => void; onPerson: (p: Person) => void; kudos?: Record<string, { week: number; recent: boolean }> }) {
  return (
    <svg className={s.plan} viewBox="0 0 1000 660" role="img" aria-label="Company floor plan">
      <defs>
        <pattern id="tile" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" className={s.tileBg} />
          <path d="M20 0H0V20" className={s.tileLine} />
        </pattern>
        <pattern id="wood" width="60" height="10" patternUnits="userSpaceOnUse">
          <rect width="60" height="10" className={s.woodBg} />
          <path d="M0 9.5H60M22 0V10" className={s.woodLine} />
        </pattern>
        <pattern id="carpet" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" className={s.carpetBg} />
          <circle cx="4" cy="4" r="0.8" className={s.carpetDot} />
        </pattern>
        <pattern id="lobbyCarpet" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" className={s.lobbyBg} />
          <circle cx="4" cy="4" r="0.8" className={s.carpetDot} />
        </pattern>
        <filter id="lift" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodOpacity="0.18" />
        </filter>
      </defs>
      <rect x={6} y={6} width={988} height={648} rx={22} fill="url(#tile)" className={s.building} />
      {rooms.map((r) => {
        const heat = Math.min(1, (activity[r.id] ?? 0) / 12);
        const fill = r.kind === "office" ? "url(#wood)" : r.kind === "meeting" ? "url(#carpet)" : r.kind === "lobby" ? "url(#lobbyCarpet)" : "var(--hq-floor)";
        return (
          <g key={r.id} className={s.room} onClick={() => onRoom(r.id)} role="button" aria-label={r.name}>
            <rect x={r.x} y={r.y} width={r.w} height={r.h} rx={10} fill={fill} filter="url(#lift)" className={`${s.roomRect} ${selected === r.id ? s.selected : ""}`} />
            {heat > 0 && <rect x={r.x} y={r.y} width={r.w} height={r.h} rx={10} className={s.heat} opacity={0.06 + heat * 0.22} pointerEvents="none" />}
            <rect x={r.x + r.w / 2 - 14} y={r.y + r.h - 2} width={28} height={4} rx={2} className={s.door} />
            <Furniture r={r} />
            <rect x={r.x} y={r.y} width={r.w} height={24} rx={10} className={s.roomHead} style={r.color ? { fill: r.color } : undefined} />
            <rect x={r.x} y={r.y + 14} width={r.w} height={10} className={s.roomHead} style={r.color ? { fill: r.color } : undefined} />
            <text x={r.x + 9} y={r.y + 16} className={`${s.roomName} ${r.color ? s.onColor : ""}`}>
              {r.name}
            </text>
            {(activity[r.id] ?? 0) > 0 && (
              <g>
                <rect x={r.x + r.w - 38} y={r.y + 5} width={32} height={14} rx={7} className={s.chip} />
                <text x={r.x + r.w - 22} y={r.y + 15.5} textAnchor="middle" className={s.chipText}>
                  {activity[r.id]}/h
                </text>
              </g>
            )}
          </g>
        );
      })}
      {rooms.map((r) => {
        const here = people.filter((p) => p.room === r.id);
        // On the build floor people sit at the desks; elsewhere they stand in a grid.
        const atDesks = r.id === "build-floor";
        const gx = atDesks ? 62 : 52;
        const gy = atDesks ? 58 : 46;
        const cols = atDesks ? 6 : Math.max(1, Math.floor((r.w - 10) / gx));
        const rows = Math.max(1, Math.floor((r.h - 28) / gy));
        const shown = here.slice(0, cols * rows);
        const extra = here.length - shown.length;
        return (
          <g key={`p-${r.id}`}>
            {shown.map((p, i) => {
              const cx = atDesks ? r.x + 42 + (i % cols) * gx : r.x + 30 + (i % cols) * gx;
              const cy = atDesks ? r.y + 46 + Math.floor(i / cols) * gy : r.y + 44 + Math.floor(i / cols) * gy;
              const color = teamColor(p.role);
              return (
                <g key={p.key} className={s.person} onClick={(e) => (e.stopPropagation(), onPerson(p))}>
                  <title>{`${p.name} — ${p.label ?? p.role} (${p.state})${kudos?.[p.role] ? `\n🎉 ${kudos[p.role].week} kudos this week` : ""}\n${p.summary}`}</title>
                  <Face cx={cx} cy={cy} r={13.5} seed={p.seed} color={color} dim={p.state === "idle" || p.state === "done"} ring={p.state === "stopped" ? "#ff6b6b" : undefined} />
                  {p.state !== "idle" && <circle cx={cx + 10} cy={cy - 10} r={3.8} fill={STATE_DOT[p.state]} stroke="var(--bg)" strokeWidth={1.4} />}
                  {kudos?.[p.role]?.recent && (
                    <text x={cx - 11} y={cy - 8} fontSize={10} textAnchor="middle" pointerEvents="none">
                      🎉
                    </text>
                  )}
                  <rect x={cx - 23} y={cy + 15} width={46} height={13} rx={6.5} className={p.state === "idle" ? s.pillIdle : s.pill} />
                  <text x={cx} y={cy + 24.5} textAnchor="middle" className={s.pillText}>
                    {p.name}
                  </text>
                </g>
              );
            })}
            {extra > 0 && (
              <text x={r.x + r.w - 10} y={r.y + r.h - 8} textAnchor="end" className={s.more}>
                +{extra} more
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
