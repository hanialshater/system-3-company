import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0605", "title": "Curvature gives a local Gaussian scale", "op": "laplace", "labels": ["Mode", "Curvature"], "outputs": ["Variance", "SD"], "a": [0.0, 2.0], "b": [0.0, 0.5], "question": "At toy mode 0, the negative log-posterior has positive curvature 2. What local Gaussian variance does the Laplace approximation use?", "questionTemplate": "At toy mode {Mode}, the negative log-posterior has positive curvature {Curvature}. What local Gaussian variance does the Laplace approximation use?", "explain": "Local curvature gives a Gaussian scale around one mode. Skewness, tails and other modes can make that local approximation inadequate globally.", "lens": "the inverse-curvature approximation around one mode", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
