import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0947", "title": "Noise colors have different slopes", "op": "spectrum", "labels": ["Frequency", "Exponent"], "outputs": ["Power"], "a": [2.0, 0.0], "b": [2.0, 2.0], "question": "A stipulated toy power spectrum is frequency^(-Exponent 0). What power occurs at Frequency 2?", "questionTemplate": "A stipulated toy power spectrum is frequency^(-Exponent {Exponent}). What power occurs at Frequency {Frequency}?", "explain": "White, pink and Brown-like slopes differ in their frequency weighting. A plotted spectrum alone is not synthesized audio.", "lens": "the frequency exponent of a stipulated power spectrum", "kind": "curve", "answerPosition": 2, "plot": [0, 0.1, 5]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
