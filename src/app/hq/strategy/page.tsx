import { notFound } from "next/navigation";
import { hqEnabled } from "@/lib/hq";
import { loadStrategy } from "@/lib/hq-strategy-server";
import Strategy from "./Strategy";

export const dynamic = "force-dynamic";
export const metadata = { title: "Strategy — System 3 HQ" };

export default function StrategyPage() {
  if (!hqEnabled()) notFound();
  const { doc, asOf } = loadStrategy();
  return <Strategy doc={doc ? { body: doc.body, links: doc.links, path: doc.path } : null} asOf={asOf} nowIso={new Date().toISOString()} />;
}
