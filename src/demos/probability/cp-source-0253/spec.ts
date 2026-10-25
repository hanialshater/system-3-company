import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0253", "title": "Multiply ranges in a Fermi estimate", "op": "productrange", "labels": ["LowA", "HighA", "LowB", "HighB"], "outputs": ["Lower", "Upper"], "a": [100.0, 200.0, 2.0, 5.0], "b": [100.0, 500.0, 2.0, 5.0], "question": "Two positive toy factors range from 100 to 200, and 2 to 5. What is the smallest product allowed by these bounds?", "questionTemplate": "Two positive toy factors range from {LowA} to {HighA}, and {LowB} to {HighB}. What is the smallest product allowed by these bounds?", "explain": "Range propagation is not a probability interval. The endpoints describe allowed combinations under the stated positive-factor bounds.", "lens": "positive-factor bounds rather than a confidence interval", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
