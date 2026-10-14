import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { hqEnabled } from "@/lib/hq";
import Evaluation from "./Evaluation";
import type { Leaderboard } from "./types";

export const dynamic = "force-dynamic";
export const metadata = { title: "Evaluation — System 3 HQ" };

// The file is produced by `npm run eval` and checked in. Missing, unreadable or empty all mean "no data yet".
function load(): Leaderboard | null {
  try {
    const raw = JSON.parse(fs.readFileSync(path.join(process.cwd(), "src/app/hq/evaluation/leaderboard.generated.json"), "utf8"));
    if (!raw || !Array.isArray(raw.rows) || !Array.isArray(raw.criteria)) return null;
    return raw as Leaderboard;
  } catch {
    return null;
  }
}

export default function EvaluationPage() {
  if (!hqEnabled()) notFound();
  return <Evaluation data={load()} />;
}
