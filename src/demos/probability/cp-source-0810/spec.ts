import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0810", "title": "Noisier inputs get wider bands", "op": "predwidth", "labels": ["SD", "N", "Z", "Prediction"], "outputs": ["HalfWidth"], "a": [1.0, 20.0, 2.0, 1.0], "b": [3.0, 20.0, 2.0, 1.0], "question": "Known toy SD 1, N 20, Z multiplier 2. Prediction 1=1 targets a new observation, 0 the mean. What normal interval half-width results?", "questionTemplate": "Known toy SD {SD}, N {N}, Z multiplier {Z}. Prediction {Prediction}=1 targets a new observation, 0 the mean. What normal interval half-width results?", "explain": "An individual prediction includes irreducible observation noise. These normal intervals assume a known variance and independent data.", "lens": "the local observation spread in a toy prediction interval", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
