import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0137", "title": "An equivalent plan costs less", "op": "cost", "labels": ["Annual", "Years", "SwitchCost"], "outputs": ["Saving"], "a": [300.0, 3.0, 50.0], "b": [300.0, 1.0, 50.0], "question": "A toy switch saves 300 per year for 3 years and costs 50 now. Ignoring discounting, what is its net saving?", "explain": "Include the switching cost and horizon. Inertia may have a financial cost, but this model alone cannot explain real choices.", "lens": "the horizon of avoidable plan costs", "kind": "bars", "answerPosition": 2, "questionTemplate": "A toy switch saves {Annual} per year for {Years} years and costs {SwitchCost} now. Ignoring discounting, what is its net saving?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
