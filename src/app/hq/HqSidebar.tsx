"use client";

// The HQ sidebar: grouped sections, the current one highlighted, the founder's queue as an inbox count.
// Below 760px it becomes a scrolling strip above the page.
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import s from "./hq.module.css";

type Item = { label: string; href: string; icon: string; on: (path: string, view: string | null) => boolean };
const at = (p: string) => (path: string) => path === p || path.startsWith(p + "/");

const GROUPS: { title: string; items: Item[] }[] = [
  {
    title: "Company",
    items: [
      { label: "Office", href: "/hq", icon: "▦", on: (p, v) => p === "/hq" && v !== "people" },
      { label: "People", href: "/hq?view=people", icon: "☰", on: (p, v) => p === "/hq" && v === "people" },
      { label: "Chat", href: "/hq/chat", icon: "✉", on: at("/hq/chat") },
      { label: "Library", href: "/hq/library", icon: "❐", on: at("/hq/library") },
      { label: "Kudos", href: "/hq/kudos", icon: "✦", on: at("/hq/kudos") },
    ],
  },
  {
    title: "Work",
    items: [
      { label: "Releases", href: "/hq/releases", icon: "⇪", on: at("/hq/releases") },
      { label: "First Light", href: "/hq/first-light", icon: "◎", on: at("/hq/first-light") },
      { label: "Strategy", href: "/hq/strategy", icon: "◇", on: at("/hq/strategy") },
      { label: "Whiteboards", href: "/hq/whiteboard", icon: "▭", on: at("/hq/whiteboard") },
    ],
  },
  {
    title: "Product & science",
    items: [
      { label: "Design", href: "/hq/design", icon: "◐", on: at("/hq/design") },
      { label: "Curriculum", href: "/hq/curriculum", icon: "⋮", on: at("/hq/curriculum") },
      { label: "Personalization", href: "/hq/personalization", icon: "◔", on: at("/hq/personalization") },
      { label: "R&D", href: "/hq/rnd", icon: "⚗", on: at("/hq/rnd") },
      { label: "Evaluation", href: "/hq/evaluation", icon: "⚖", on: at("/hq/evaluation") },
    ],
  },
];

export function HqSidebar({ waiting, urgent }: { waiting: number; urgent: number }) {
  const path = usePathname() ?? "/hq";
  const view = useSearchParams()?.get("view") ?? null;
  return (
    <nav className={s.side} aria-label="HQ">
      <div className={s.sideHead}>
        <Link className="brand" href="/">
          S3
        </Link>
        <strong>HQ</strong>
      </div>
      <Link className={`${s.sideInbox} ${urgent ? s.sideInboxUrgent : ""}`} href="/hq?room=lobby" title="Everything waiting on the founder">
        <span aria-hidden>⚑</span>
        <span className={s.sideLabel}>Waiting on you</span>
        <span className={s.sideCount}>{waiting}</span>
      </Link>
      {GROUPS.map((g) => (
        <div key={g.title} className={s.sideGroup}>
          <div className={s.sideTitle}>{g.title}</div>
          <ul>
            {g.items.map((it) => {
              const on = it.on(path, view);
              return (
                <li key={it.href}>
                  <Link className={on ? s.sideItemOn : s.sideItem} href={it.href} aria-current={on ? "page" : undefined}>
                    <span className={s.sideIcon} aria-hidden>
                      {it.icon}
                    </span>
                    <span className={s.sideLabel}>{it.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <div className={s.sideGroup}>
        <ul>
          <li>
            <Link className={s.sideItem} href="/catalog">
              <span className={s.sideIcon} aria-hidden>
                ⌖
              </span>
              <span className={s.sideLabel}>Lesson map</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
