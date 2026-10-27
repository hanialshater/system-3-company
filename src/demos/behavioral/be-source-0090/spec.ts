import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0090", "title": "Tonight's film and next week's", "op": "hyperbolic", "labels": ["Amount", "K", "Delay"], "outputs": ["Value"], "a": [10.0, 0.1, 0.0], "b": [10.0, 0.1, 7.0], "question": "A toy delayed amount 10 is discounted by dividing by 1 + 0.1 × delay 0. What is its value now?", "explain": "The same added delay has a larger proportional effect near the present under this hyperbolic rule.", "lens": "the time assigned to a delayed reward", "kind": "curve", "answerPosition": 0, "questionTemplate": "A toy delayed amount {Amount} is discounted by dividing by 1 + {K} × delay {Delay}. What is its value now?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
