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
export type Suggestion = { criterion: string; a: string; b: string; overlap: number; direct: number; score: number };
export type Leaderboard = {
  totalRecords: number;
  blindRecords: number;
  lastRecordDate: string | null;
  judges: string[];
  criteria: { id: string; name: string }[];
  scopes: { id: string; name: string; records: number; items: number; disconnected: number }[];
  rows: Row[];
  agreement: { comparable: number; agree: number; rate: number | null; byJudgePair: { judges: string[]; n: number; agree: number; rate: number }[] };
  suggestions: Suggestion[];
  errors: string[];
  method?: string;
};
