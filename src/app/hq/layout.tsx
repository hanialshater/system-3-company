// Every /hq page sits beside one sidebar (Linear-style): sections down the left instead of a tab row on
// each page. The founder's queue count is on the sidebar so the one blocked thing stays in view everywhere.
import { Suspense, type ReactNode } from "react";
import { founderQueue, hqEnabled } from "@/lib/hq";
import { HqSidebar } from "./HqSidebar";
import s from "./hq.module.css";

export default function HqLayout({ children }: { children: ReactNode }) {
  if (!hqEnabled()) return children;
  const queue = founderQueue();
  const urgent = queue.filter((q) => (q.priority ?? 9) <= 1).length;
  return (
    <div className={s.shell}>
      <Suspense fallback={<nav className={s.side} aria-label="HQ" />}>
        <HqSidebar waiting={queue.length} urgent={urgent} />
      </Suspense>
      <div className={s.shellMain}>{children}</div>
    </div>
  );
}
