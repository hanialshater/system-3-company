import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0779", "title": "One latent source links symptoms", "op": "commonfactor", "labels": ["Common", "NoiseA", "NoiseB"], "outputs": ["Correlation"], "a": [1.0, 1.0, 1.0], "b": [4.0, 1.0, 1.0], "question": "Two toy measurements share variance Common 1 and have independent noise variances 1,1. What correlation results?", "questionTemplate": "Two toy measurements share variance Common {Common} and have independent noise variances {NoiseA},{NoiseB}. What correlation results?", "explain": "A shared latent component induces association without a direct edge between measurements. This covariance construction does not identify the latent cause from data.", "lens": "the shared variance inducing a measurement correlation", "kind": "bars", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
