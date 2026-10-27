import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0084", "title": "One more day of waiting", "op": "hyperbolic", "labels": ["Amount", "K", "Delay"], "outputs": ["Value"], "a": [100.0, 0.1, 1.0], "b": [100.0, 0.1, 30.0], "question": "A toy delayed amount 100 is discounted by dividing by 1 + 0.1 × delay 1. What is its value now?", "explain": "The same added delay has a larger proportional effect near the present under this hyperbolic rule.", "lens": "the delay under a hyperbolic discount rule", "kind": "curve", "answerPosition": 0, "questionTemplate": "A toy delayed amount {Amount} is discounted by dividing by 1 + {K} × delay {Delay}. What is its value now?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
