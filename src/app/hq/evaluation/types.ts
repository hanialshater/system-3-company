// Shape of leaderboard.generated.json (written by tools/eval/bt.mjs; `npm run eval`).
export type Row = {
  criterion: string;
  item: string;
  slug: string;
  version: number;
  title: string;
  domain: string | null;
  status: string | null;
  strand: string | null;
  currentVersion: number | null;
  known: boolean;
  rating: number;
  lo: number;
  hi: number;
  comparisons: number;
  wins: number;
  losses: number;
  ties: number;
  opponents: number;
  disconnected: boolean;
};
export type Flag = { criterion: string; text: string; records?: string; round?: string; detail?: string; source?: string };
export type Scope = {
  id: string;
  name: string;
  records: number;
  items: number;
  disconnected: number;
  // schema 2 (tools/eval E2-E4); optional so an older generated file still loads.
  diagnostic?: boolean;
  resampleUnit?: "record" | "judgement";
  judgements?: number;
  excluded?: number;
  ties?: number;
  tieRate?: number | null;
  aWinRate?: number | null;
  flags?: Flag[];
  note?: string;
};
export type Exclusion = { id: string; reason: string; round: string | null; criterion: string; judge: string };
export type Suggestion = { criterion: string; a: string; b: string; overlap: number; direct: number; score: number };
export type Leaderboard = {
  totalRecords: number;
  blindRecords: number;
  lastRecordDate: string | null;
  judges: string[];
  // The criteria a leaderboard may be shown for. Older files also listed "overall" here; HQ never shows it.
  criteria: { id: string; name: string }[];
  // One entry per fitted scope, including the diagnostic "overall" (diagnostic: true; never rendered).
  scopes: Scope[];
  diagnosticScopes?: string[];
  flags?: Flag[];
  exclusions?: { applied: Exclusion[]; unmatched: string[]; invalid: string[] };
  fittedRecords?: number;
  warnings?: string[];
  rows: Row[];
  agreement: { comparable: number; agree: number; rate: number | null; byJudgePair: { judges: string[]; n: number; agree: number; rate: number }[] };
  suggestions: Suggestion[];
  errors: string[];
  method?: string;
};
