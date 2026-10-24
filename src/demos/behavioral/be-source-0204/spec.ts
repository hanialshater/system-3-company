import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0204", "title": "A small change over years", "op": "cost", "labels": ["Annual", "Years", "SwitchCost"], "outputs": ["Saving"], "a": [2.0, 5.0, 0.0], "b": [2.0, 1.0, 0.0], "question": "A toy switch saves 2 per year for 5 years and costs 0 now. Ignoring discounting, what is its net saving?", "explain": "Include the switching cost and horizon. Inertia may have a financial cost, but this model alone cannot explain real choices.", "lens": "the duration of a persistent annual saving", "kind": "bars", "answerPosition": 0, "questionTemplate": "A toy switch saves {Annual} per year for {Years} years and costs {SwitchCost} now. Ignoring discounting, what is its net saving?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
