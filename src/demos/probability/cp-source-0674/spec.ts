import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0674", "title": "A return changes the variance", "op": "volupdate", "labels": ["Return", "Variance", "Weight"], "outputs": ["Variance"], "a": [1.0, 1.0, 0.2], "b": [4.0, 1.0, 0.2], "question": "Update toy variance 1 toward squared Return 1, giving it Weight 0.2. What new variance results?", "questionTemplate": "Update toy variance {Variance} toward squared Return {Return}, giving it Weight {Weight}. What new variance results?", "explain": "A large squared return increases this explicit volatility estimate. This recurrence is not a fitted stochastic-volatility posterior.", "lens": "the squared-return contribution to a volatility update", "kind": "bars", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
