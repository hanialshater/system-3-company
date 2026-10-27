import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0992", "title": "Three velocity components give a speed", "op": "maxwell", "labels": ["Speed", "Scale"], "outputs": ["Density"], "a": [1.0, 1.0], "b": [2.0, 1.0], "question": "Three independent velocity components are Normal(0,Scale² 1). What speed density occurs at Speed 1?", "questionTemplate": "Three independent velocity components are Normal(0,Scale² {Scale}). What speed density occurs at Speed {Speed}?", "explain": "Taking the magnitude of three Gaussian components produces the Maxwell speed law. The thermal interpretation requires an equilibrium model.", "lens": "the speed coordinate in a Maxwell distribution", "kind": "curve", "answerPosition": 2, "plot": [0, 0, 6]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
