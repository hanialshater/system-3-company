import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0119", "title": "Two gains, one account", "op": "groupvalue", "labels": ["First", "Second", "Lambda"], "outputs": ["Separate"], "a": [100.0, 100.0, 2.0], "b": [200.0, 0.0, 2.0], "question": "Two toy changes 100 and 100 are valued separately by signed square root, with loss weight 2. What is their combined model value?", "explain": "Combining outcomes before valuation and valuing them separately need not agree under a curved value function.", "lens": "valuing separate and combined changes on a curved scale", "kind": "curve", "answerPosition": 2, "questionTemplate": "Two toy changes {First} and {Second} are valued separately by signed square root, with loss weight {Lambda}. What is their combined model value?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
