import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0023", "title": "The coin does not owe you tails", "op": "nextiid", "labels": ["P", "PastHeads"], "outputs": ["NextHead"], "a": [0.5, 5.0], "b": [0.5, 20.0], "question": "Independent toy flips have fixed heads probability 0.5. After 5 heads, what is the next-head probability?", "questionTemplate": "Independent toy flips have fixed heads probability {P}. After {PastHeads} heads, what is the next-head probability?", "explain": "Independence keeps the next-trial probability fixed. Learning an unknown bias from data is a different model.", "lens": "independence after a specified streak", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
