import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0377", "title": "A colder thermostat default", "op": "update", "labels": ["Prior", "News", "Weight"], "outputs": ["Posterior"], "a": [22.0, 21.0, 0.38], "b": [22.0, 21.0, 1.0], "question": "A toy belief starts at 22, receives estimate 21, and moves fraction 0.38 toward it. What belief results?", "questionTemplate": "A toy belief starts at {Prior}, receives estimate {News}, and moves fraction {Weight} toward it. What belief results?", "explain": "Different update weights can create asymmetric learning from equally informative news. The toy rule is an assumption, not a psychological measurement.", "lens": "the assumed pass-through from default to selected setting", "kind": "bars", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
