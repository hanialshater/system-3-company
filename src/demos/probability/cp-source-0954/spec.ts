import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0954", "title": "Reversion sets a spectral bend", "op": "oupsd", "labels": ["Frequency", "K", "Sigma"], "outputs": ["Power"], "a": [0.2, 1.0, 1.0], "b": [0.2, 3.0, 1.0], "question": "A stationary toy OU process has reversion K 1, diffusion Sigma 1. What two-sided spectral density occurs at cycles-per-time Frequency 0.2?", "questionTemplate": "A stationary toy OU process has reversion K {K}, diffusion Sigma {Sigma}. What two-sided spectral density occurs at cycles-per-time Frequency {Frequency}?", "explain": "The reversion rate sets the spectral bend. This convention uses a two-sided density in ordinary frequency units.", "lens": "the reversion rate in a stationary OU spectrum", "kind": "curve", "answerPosition": 0, "plot": [0, 0, 3]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
