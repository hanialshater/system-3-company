// The HQ top bar for the inspector pages (/hq/design, /hq/curriculum, /hq/evaluation). /hq itself draws its own bar
// because Office and People are client-side views there; keep the tab list in the same order.
import Link from "next/link";
import type { ReactNode } from "react";
import s from "./hq.module.css";

export type HqTab = "office" | "people" | "design" | "curriculum" | "evaluation";
const TABS: { id: HqTab; label: string; href: string }[] = [
  { id: "office", label: "Office", href: "/hq" },
  { id: "people", label: "People", href: "/hq?view=people" },
  { id: "design", label: "Design", href: "/hq/design" },
  { id: "curriculum", label: "Curriculum", href: "/hq/curriculum" },
  { id: "evaluation", label: "Evaluation", href: "/hq/evaluation" },
];

export function HqTop({ on, subtitle }: { on: HqTab; subtitle: ReactNode }) {
  return (
    <nav className={s.top}>
      <Link className="brand" href="/">
        S3
      </Link>
      <div className={s.title}>
        <strong>System 3 HQ</strong>
        <span className={s.muted}>{subtitle}</span>
      </div>
      <span className={s.spacer} />
      <div className={s.tabs} role="tablist">
        {TABS.map((t) =>
          t.id === on ? (
            <span key={t.id} role="tab" aria-selected className={s.tabOn}>
              {t.label}
            </span>
          ) : (
            <Link key={t.id} role="tab" aria-selected={false} className={s.tab} href={t.href}>
              {t.label}
            </Link>
          ),
        )}
      </div>
      <Link className="brand-link" href="/catalog">
        Map
      </Link>
    </nav>
  );
}
