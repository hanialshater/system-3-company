import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0800", "title": "A forecast band widens with its level", "op": "predwidth", "labels": ["SD", "N", "Z", "Prediction"], "outputs": ["HalfWidth"], "a": [2.0, 20.0, 1.0, 1.0], "b": [2.0, 20.0, 2.0, 1.0], "question": "Known toy SD 2, N 20, Z multiplier 1. Prediction 1=1 targets a new observation, 0 the mean. What normal interval half-width results?", "questionTemplate": "Known toy SD {SD}, N {N}, Z multiplier {Z}. Prediction {Prediction}=1 targets a new observation, 0 the mean. What normal interval half-width results?", "explain": "An individual prediction includes irreducible observation noise. These normal intervals assume a known variance and independent data.", "lens": "the normal multiplier of a prediction band", "kind": "bars", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
