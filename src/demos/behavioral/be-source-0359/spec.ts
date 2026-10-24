import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0359", "title": "A gym commitment horizon", "op": "cost", "labels": ["Annual", "Years", "SwitchCost"], "outputs": ["Saving"], "a": [20.0, 12.0, 50.0], "b": [20.0, 1.0, 50.0], "question": "A toy switch saves 20 per year for 12 years and costs 50 now. Ignoring discounting, what is its net saving?", "questionTemplate": "A toy switch saves {Annual} per year for {Years} years and costs {SwitchCost} now. Ignoring discounting, what is its net saving?", "explain": "Include the switching cost and horizon. Inertia may have a financial cost, but this model alone cannot explain real choices.", "lens": "the horizon over which a commitment cost is evaluated", "kind": "bars", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
