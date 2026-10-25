import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0878", "title": "Balance the region of common support", "op": "balanceweight", "labels": ["Target", "Low", "High"], "outputs": ["HighWeight"], "a": [0.5, 0.0, 1.0], "b": [0.8, 0.0, 1.0], "question": "Mix toy values Low 0 and High 1 to obtain Target mean 0.5. What weight on High is required?", "questionTemplate": "Mix toy values Low {Low} and High {High} to obtain Target mean {Target}. What weight on High is required?", "explain": "Matching a mean can be solved algebraically when the target lies inside the support. Matching that moment does not guarantee every distributional or causal property.", "lens": "the balancing weight before overlap-weighted causal estimation", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
