import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0759", "title": "The next record becomes rarer", "op": "recordchance", "labels": ["N"], "outputs": ["Probability"], "a": [10.0], "b": [100.0], "question": "For N 10 independent identically distributed continuous observations, what chance is the last a new upper record?", "questionTemplate": "For N {N} independent identically distributed continuous observations, what chance is the last a new upper record?", "explain": "Exchangeability makes every observation equally likely to be the largest. Trend and ties can break this argument.", "lens": "the observation count under iid continuous sampling", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
