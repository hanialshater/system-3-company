import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { hqEnabled } from "@/lib/hq";
import Evaluation from "./Evaluation";
import type { Leaderboard } from "./types";
import profiles from "@/data/editorial-profiles.account.json";
import admission from "@/data/account-preference-admission.json";
import d from "./evaluation.module.css";

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
  const states = Object.values(profiles.profiles).reduce<Record<string, number>>((counts, profile) => {
    counts[profile.state] = (counts[profile.state] ?? 0) + 1;
    return counts;
  }, {});
  const observed = Object.keys(profiles.profiles).length;
  const exactSource = admission.status === "approved" && admission.profileSetVersion === profiles.profileSetVersion
    && admission.profileContentsSha256 === profiles.profileContentsSha256 && admission.recipeSourceSha256 === profiles.recipeSourceSha256;
  return <Evaluation data={load()} editorial={<section className={d.coverage} aria-labelledby="editorial-heading">
    <h1 id="editorial-heading">Catalogue evaluation</h1>
    <p>Editorial walkthroughs describe each demo’s quality, experience and challenge. The separate pairwise leaderboard below compares judges’ preferences on one criterion at a time. Neither measures learning gains or supplies a universal quality score.</p>
    <dl className={d.coverageStats}>
      {[["Catalogue", profiles.catalogueCount], ["Observed", observed], ["Current", states.current ?? 0], ["Stale", states.stale ?? 0], ["Disputed state", states.disputed ?? 0], ["Unknown", profiles.catalogueCount - observed]].map(([label, count]) => <div key={label}><dt>{label}</dt><dd>{Number(count).toLocaleString()}</dd></div>)}
    </dl>
    <p className={d.provenance}>Snapshot <code>{profiles.profileSetVersion}</code> · {exactSource ? "Manifest lists approval for this snapshot" : "Manifest does not list matching approval for this snapshot"}. Source admission does not confirm live account activation. Publication and claim gates remain independent.</p>
    <p>Current means entry evidence is fresh; stale means the demo changed; disputed means unresolved review disagreement; unknown means no observation. Unknown is not a failing score. Stale, disputed, unknown and weak evidence retain canonical feed slots.</p>
    <p><a href="/hq/personalization/preferences">Inspect rubrics, reasons, confidence and why-cool/caveat evidence</a> · <a href="/hq/personalization">Personalization status and historical simulation</a></p>
    <details><summary>Extend evaluation to new demos: plan and owners</summary>
      <ol>
        <li><strong>Head of evaluation + evaluation-engineer:</strong> freeze a new dated inventory and source pins; prioritize unknown/new and stale entries with coverage across domains.</li>
        <li><strong>Independent reviewers:</strong> queues of up to 100, checkpoint after 15; review the actual prediction → interaction → reveal before builder notes. Save each observation, uncertainty, why-cool and caveat; blocked stays blocked.</li>
        <li><strong>Head of evaluation + Product:</strong> preserve independent overlap, calibrate and retain disagreements. After broad coverage, allocate further review across promising, uncertain, weak and unobserved buckets, with exploration sampling. This is review-budget allocation, not a learned bandit.</li>
        <li><strong>Evaluation-engineer → evaluation-steward, Product, privacy and engineering:</strong> export a candidate, independently review provenance and exact matching guards, then admit only the reviewed recipe/profile/hash pair. Exporting never approves serving.</li>
      </ol>
      <p>The dated readmission finding records 33 underlying unresolved disputes: two became stale, not resolved. The evidence-state counts above remain data-derived. No new rating round starts from this page.</p>
      <p><a href="/hq/library/evaluation/2026-10-20-catalogue-extension-plan.md">Full extension plan, roles and completion criteria</a> · <a href="/hq/library/evaluation/rounds/2026-10-18-round-1/CONTINUE-LATER.md">Parked round blockers</a> · <a href="https://github.com/hanialshater/system-3-company/blob/ccr-4c6c7654-ew9ko1/company/ops/delivery/2026-10-20-account-preference-readmission.json">Readmission receipt</a></p>
    </details>
    <h2>Official pairwise results</h2>
  </section>} />;
}
