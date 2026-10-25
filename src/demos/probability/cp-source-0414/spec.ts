import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0414", "title": "Choose weights to hit one target mean", "op": "balanceweight", "labels": ["Target", "Low", "High"], "outputs": ["HighWeight"], "a": [40.0, 20.0, 60.0], "b": [50.0, 20.0, 60.0], "question": "Mix toy values Low 20 and High 60 to obtain Target mean 40. What weight on High is required?", "questionTemplate": "Mix toy values Low {Low} and High {High} to obtain Target mean {Target}. What weight on High is required?", "explain": "Matching a mean can be solved algebraically when the target lies inside the support. Matching that moment does not guarantee every distributional or causal property.", "lens": "the support and moment constraint of a two-point balance", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
