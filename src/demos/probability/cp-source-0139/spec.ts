import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0139", "title": "Compare explicit expected harms", "op": "risk", "labels": ["Cases", "ActionRisk", "InactionRisk"], "outputs": ["Difference"], "a": [1000.0, 0.02, 0.05], "b": [1000.0, 0.06, 0.05], "question": "Across 1000 toy cases, action risk is 0.02 and inaction risk 0.05. How many fewer expected harms come with action?", "questionTemplate": "Across {Cases} toy cases, action risk is {ActionRisk} and inaction risk {InactionRisk}. How many fewer expected harms come with action?", "explain": "Count both action and inaction using the same population. These are specified risks in a toy comparison.", "lens": "the stipulated risks in a decision tree", "kind": "bars", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
