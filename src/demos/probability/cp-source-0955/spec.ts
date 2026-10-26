import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0955", "title": "Correlation changes spectral power", "op": "arpsd", "labels": ["Variance", "Rho", "Frequency"], "outputs": ["Power"], "a": [1.0, 0.0, 0.1], "b": [1.0, 0.8, 0.1], "question": "A toy AR(1) has innovation Variance 1, coefficient Rho 0. What spectral density per cycle occurs at Frequency 0.1?", "questionTemplate": "A toy AR(1) has innovation Variance {Variance}, coefficient Rho {Rho}. What spectral density per cycle occurs at Frequency {Frequency}?", "explain": "The autocovariance sequence and spectrum encode the same second-order structure for this stationary model.", "lens": "the AR coefficient linking autocovariance and spectrum", "kind": "curve", "answerPosition": 1, "plot": [2, 0, 0.5]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
