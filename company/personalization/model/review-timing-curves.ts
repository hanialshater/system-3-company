/**
 * REVIEW_TIMING_CURVES: the numbers of the review-timing candidate (criterion 2, founder Q3/Q4).
 *
 * owner: applied-scientist-personalization (Juno) · run: as-p1-1016 · board: W-1546 (P1)
 * code that imports this: learner-model-engineer (P2, W-1547), one file under company/personalization/model/sim/
 * interface: criterion 2 §I at commit 45826c6 (company/personalization/eval/2026-10-16-criterion-2.md, §I only)
 * evidence, the only source: company/personalization/evidence/2026-10-16-criterion-2-ranges.md (E1, commit 4e13ef1)
 * change log: company/decisions/2026-10-16-personalization-model-v0.md (line `rtc-v1`)
 *
 * One setting, chosen before any score exists (batch 3 V3, V5). Nothing here was run in, swept against,
 * or tuned to the eval harness or any simulated learner. E1's ranges are also the eval's source for its
 * world; that shared source is a known coupling, written here so a reader can weigh it. E1 says of itself
 * "nothing in it was fitted to our learners" (memo §5).
 *
 * WHAT THE CANDIDATE DOES (shape P2 types against)
 * Per lesson in `history`, from that lesson's own record only:
 *   streak  = number of trailing correct results in `recalls` (results after the last miss; all of them if no miss)
 *   last    = `at` of the latest result, or `completedAt` if there is none (exactly as `revisitDue` in src/kit/progress.ts)
 *   wait    = `postMissWaitDays.value` if the latest result is a miss, else `waitDays.values[streak]`
 *   retired = streak >= `retireAfterStreak.value` (never returned again)
 *   due     = !retired && now - last >= wait * 86_400_000   (same comparison as `revisitDue`, ms per day 86_400_000)
 * Order (`order`): first every slug in `fixedDue`, in `fixedDue`'s order; then every other due lesson by
 * `(now - last) / (wait * day)` descending, ties by older `last`, then by slug. Truncate to `slots`.
 * No other cap: revisits may take every slot, as in the baseline (§I.5).
 *
 * Inputs read: `now`, `history[].completedAt`, `history[].recalls`, `slots`, `fixedDue`. That is completions and
 * recalls (model.ts `INPUT_PRIVACY`: both "standing-conditions"; recalls only inside the F1 30-day window the
 * harness already applies). NOT read: `predictedCorrectly` (so P1's recall-only fallback is the candidate
 * itself), `dims` (no E1 number links any dim to forgetting), any learner-level gap, session count, or
 * anything in `FORBIDDEN_INPUTS`. Elapsed time is per lesson only (`now - last`), as §I.3 permits.
 *
 * Where it departs from the fixed schedule (§I.5), and only there:
 *   1. After a miss it comes back after 1 day; the fixed schedule repeats the same wait (up to 21 days).
 *   2. A lesson that was ever missed retires after 4 correct results in a row since its last miss; the fixed
 *      schedule retires after 4 correct results in total.
 * Both are E1 memo §4's "come back sooner after a miss" (and E1 Disagreement 4). The memo's other lever,
 * "later after an easy success", is NOT used: we have no ease signal (no response time, memo §4), a learner who
 * does not know a lesson still answers its 3-option card correctly 8-35% of the time (E1 `guessRecall`),
 * and it would break V4.
 *
 * V4 (batch 3; AMD-008 F2): NO VALUE EVER BRINGS A LESSON BACK LATER THAN THE FIXED SCHEDULE WOULD, for the
 * same history. Reasons, value by value: `waitDays` equals `REVISIT_SCHEDULE_DAYS` step for step;
 * `postMissWaitDays` (1) is <= every fixed wait; `streak` <= the fixed schedule's success count, so from the
 * same `last` the candidate's wait is never longer; `retireAfterStreak` 4 implies at least 4 successes, so
 * the fixed schedule has already retired every lesson the candidate retires; and `order` serves `fixedDue`
 * first and whole, so within `slots` every lesson the baseline serves this session the candidate serves too.
 * Extra (earlier) revisits take slots from NEW cards only. The V4 guarantee therefore depends on P2 keeping
 * `order` exactly as written. No AMD-008 F2 amendment is needed for these values; it would be for any later one.
 *
 * Note for P2 and the eval (from §I.1 and progress.ts only): sessions start at the same clock time daily and
 * a result is recorded after its session starts, so `now - last` at the next session is slightly under 1 day
 * and a 1-day wait first comes due at the second session after. This holds for the baseline and the
 * candidate alike; I did not shorten any wait to compensate.
 *
 * SENSITIVITY (derived from E1 numbers only, my arithmetic; not a run of anything)
 * Predicted kept increment at each fixed wait, `kept = e^(-k·t)`, k × `revisitStrengthen` per success, effective
 * rate after day 7 × the shape ratio. Waits 1 / 3 / 7 / 21 days:
 *   E1 base (k .08, strengthen .50, ratio .27) ......... .92 .89 .87 .90  (inside Eglington & Pavlik's .86-.94)
 *   single exponential (ratio 1.0) ..................... .92 .89 .87 .81
 *   k low .04 .......................................... .96 .94 .93 .95  (waits early: a "later" schedule would gain; V4 forbids)
 *   k high .19 ......................................... .83 .75 .72 .77  (waits late: the ladder is too long for fast lessons)
 *   strengthen low .35 / high .60 ...................... .92 .92 .93 .96 / .92 .87 .82 .83
 * After a miss at the 7-day step with k reset to .08 (E1 base, "k multiplier after a relearned miss" 1.0), the
 * fixed schedule's repeated 7-day wait predicts kept .57; the candidate's 1 day predicts .92. At E1's low end
 * for that row (Kornell 2015 [A]: a relearned miss counts like a success) the 1-day return is earlier than
 * needed: it costs a new-card slot and is never later. The candidate's whole case rests on that row, which E1
 * marks low confidence.
 */

export type EvidenceMark = {
  /** E1 rows or sections the value rests on, with their marks ([F], [F-r], [A], [S], [R], derived). */
  source: string;
  confidence: "high" | "medium" | "low-medium" | "low";
};

export type RtcValue<T> = {
  value: T;
  /** One sentence, the reason for this value. */
  why: string;
  evidence: EvidenceMark;
  /** True if this value can bring a lesson back later than the fixed schedule (V4). All false in rtc-v1. */
  laterThanFixed: boolean;
};

export type ReviewTimingCurves = {
  version: "rtc-v1";
  /** Change line in company/decisions/2026-10-16-personalization-model-v0.md. */
  decision: "company/decisions/2026-10-16-personalization-model-v0.md";
  /** Wait in days before the next return, indexed by `streak` (0..3). */
  waitDays: { values: readonly [number, number, number, number]; why: string; evidence: EvidenceMark; laterThanFixed: boolean };
  /** Wait in days after a miss (latest result incorrect), whatever the streak before it. */
  postMissWaitDays: RtcValue<number>;
  /** A lesson whose trailing streak reaches this is never returned again. */
  retireAfterStreak: RtcValue<number>;
  /** How the returned list is ordered (see header). */
  order: RtcValue<"fixedDue-first-then-most-overdue">;
  /** Inputs read; also the V4 / privacy record. */
  inputsRead: readonly ("now" | "completedAt" | "recalls" | "slots" | "fixedDue")[];
  /** Inputs deliberately not read, with the reason. */
  notRead: { predictedCorrectly: string; dims: string };
};

export const REVIEW_TIMING_CURVES: ReviewTimingCurves = {
  version: "rtc-v1",
  decision: "company/decisions/2026-10-16-personalization-model-v0.md",
  waitDays: {
    values: [1, 3, 7, 21],
    why: "At E1's base values the fixed waits already bring a lesson back at a predicted kept .87-.92, inside the .86-.94 target recall where adaptive practice beat fixed, so the evidence gives no reason to move an average lesson.",
    evidence: {
      source: "E1 ranges table: forgetRate k .08 (McGillivray 2015 [F], Fastrich 2018 [F]); revisitStrengthen .50 (Fazio 2010 [F], Latimier [F-r], scheduler multipliers [R]); shape ratio .27 (Murre & Dros 2015 [F]); target .86-.94 (Eglington & Pavlik 2020 [F]); derived, my arithmetic in the header",
      confidence: "low",
    },
    laterThanFixed: false,
  },
  postMissWaitDays: {
    value: 1,
    why: "A miss is followed by the answer and a why line, so a relearned miss is a fresh encoding at the learner's own forgetting rate, and a fresh encoding's first wait is 1 day, not the repeated longer wait the fixed schedule uses.",
    evidence: {
      source: "E1 rows `relearn` .70 (Metcalfe 2012/2015 [F], Fazio & Marsh 2009 [F]) and `k multiplier after a relearned miss` base 1.0 (Kornell 2015 [A], Tabibian 2019 [F]); direction: memo §4 and Disagreement 4 (Mettler 2016 enforced short delay [F], Tabibian failure term [F]); value derived as equal to waitDays[0]",
      confidence: "low",
    },
    laterThanFixed: false,
  },
  retireAfterStreak: {
    value: 4,
    why: "If a miss resets a lesson's strength, the four successes that retire it must come after its last miss, so a missed lesson keeps coming back until it has four in a row.",
    evidence: {
      source: "E1 row `k multiplier after a relearned miss` base 1.0 (Kornell 2015 [A] is the low end, which would count all successes); 4 itself is the product's `REVISIT_SCHEDULE_DAYS.length` (src/kit/progress.ts), not an E1 number",
      confidence: "low",
    },
    laterThanFixed: false,
  },
  order: {
    value: "fixedDue-first-then-most-overdue",
    why: "Serving the baseline's due list first keeps every revisit at or before the fixed schedule (AMD-008 F2, V4), and among extra returns the one furthest past its wait has the lowest predicted recall when waits are set to a common target.",
    evidence: {
      source: "rule, not an E1 number: §I.5 and batch 3 V4 for the first part; the second part follows from waitDays aiming at one target recall (E1 Eglington & Pavlik 2020 [F]), derived",
      confidence: "low",
    },
    laterThanFixed: false,
  },
  inputsRead: ["now", "completedAt", "recalls", "slots", "fixedDue"],
  notRead: {
    predictedCorrectly: "E1 gives no number linking a correct prediction to slower forgetting, and at E1's base prior .20, with the revisit guess floor .22 as a stand-in for the prediction's, about half of correct predictions are guesses (.20 / (.20 + .80 × .22) = .53, derived), so it moves no wait.",
    dims: "E1 says forgetting rates differ across materials (Sense 2016 [A]) but gives no rate per level, domain or misconception strength, so no dim moves a wait.",
  },
};
