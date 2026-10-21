// The HQ title bar for the inspector pages (every /hq/* page except /hq itself). Navigation lives in the
// sidebar (HqSidebar, from layout.tsx); `on` is kept so pages still say which section they belong to.
import type { ReactNode } from "react";
import s from "./hq.module.css";

export type HqTab = "office" | "people" | "design" | "curriculum" | "library" | "releases" | "first-light" | "personalization" | "rnd" | "evaluation" | "strategy";

export function HqTop({ on, subtitle }: { on: HqTab; subtitle: ReactNode }) {
  return (
    <nav className={s.top} data-section={on}>
      <div className={s.title}>
        <strong>System 3 HQ</strong>
        <span className={s.muted}>{subtitle}</span>
      </div>
    </nav>
  );
}
