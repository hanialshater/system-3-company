"use client";

// The founder's master plan (company/strategy/master-plan.md), rendered with the Library's markdown renderer.
// Links to other docs open in the Library. The as-of date is shown up top and flagged when older than 14 days.
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HqTop } from "../HqTop";
import hq from "../hq.module.css";
import md from "../library/library.module.css";
import Markdown from "../library/Markdown";
import { STALE_DAYS, asOfAge } from "@/lib/hq-strategy";
import s from "./strategy.module.css";

export default function Strategy({ doc, asOf, nowIso }: { doc: { body: string; links: Record<string, string>; path: string } | null; asOf: string | null; nowIso: string }) {
  const router = useRouter();
  const age = asOf ? asOfAge(asOf, new Date(nowIso)) : null;
  const stale = !age || age.stale;
  return (
    <div className={hq.hq}>
      <HqTop on="strategy" subtitle="Strategy: the master plan" />
      {!doc ? (
        <p role="alert" className={s.error}>company/strategy/master-plan.md was not found.</p>
      ) : (
        <main className={s.wrap}>
          <div className={`${s.asof} ${stale ? s.stale : ""}`} data-stale={stale ? "true" : "false"}>
            <strong>As of {asOf ?? "unknown"}</strong>
            <span>
              {age
                ? age.stale
                  ? `STALE: ${age.days} days old; the page's own rule is to refresh within ${STALE_DAYS} days.`
                  : `${age.days === 0 ? "today" : `${age.days} day${age.days === 1 ? "" : "s"} old`}; refreshed within ${STALE_DAYS} days.`
                : "No as-of date found, so treat this page as stale."}
            </span>
            <Link className={s.src} href={`/hq/library/${doc.path}`}>company/{doc.path}</Link>
          </div>
          <article className={md.md}>
            <Markdown text={doc.body} links={doc.links} onOpen={(p) => router.push(`/hq/library/${p.split("/").map(encodeURIComponent).join("/")}`)} />
          </article>
        </main>
      )}
    </div>
  );
}
