import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0135", "title": "Action and inaction in one table", "op": "risk", "labels": ["Cases", "ActionRisk", "InactionRisk"], "outputs": ["Difference"], "a": [1000.0, 0.02, 0.04], "b": [1000.0, 0.04, 0.02], "question": "Across 1000 toy cases, action risk is 0.02 and inaction risk 0.04. How many fewer expected harms come with action?", "explain": "Count both action and inaction using the same population. These are specified risks in a toy comparison.", "lens": "the arithmetic before assigning blame", "kind": "bars", "answerPosition": 0, "questionTemplate": "Across {Cases} toy cases, action risk is {ActionRisk} and inaction risk {InactionRisk}. How many fewer expected harms come with action?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
