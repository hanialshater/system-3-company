import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0134", "title": "Count both routes to harm", "op": "risk", "labels": ["Cases", "ActionRisk", "InactionRisk"], "outputs": ["Difference"], "a": [10000.0, 0.001, 0.01], "b": [10000.0, 0.001, 0.001], "question": "Across 10000 toy cases, action risk is 0.001 and inaction risk 0.01. How many fewer expected harms come with action?", "explain": "Count both action and inaction using the same population. These are specified risks in a toy comparison.", "lens": "a common denominator for acting and not acting", "kind": "bars", "answerPosition": 2, "questionTemplate": "Across {Cases} toy cases, action risk is {ActionRisk} and inaction risk {InactionRisk}. How many fewer expected harms come with action?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
