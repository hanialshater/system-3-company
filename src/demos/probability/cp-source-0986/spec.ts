import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0986", "title": "A barrier makes escape much slower", "op": "escape", "labels": ["Barrier", "Noise"], "outputs": ["TimeScale"], "a": [2.0, 1.0], "b": [4.0, 1.0], "question": "A toy escape-time scale is exp(Barrier 2/Noise 1), with prefactor one. What scale results?", "questionTemplate": "A toy escape-time scale is exp(Barrier {Barrier}/Noise {Noise}), with prefactor one. What scale results?", "explain": "The stipulated exponential captures strong barrier sensitivity. A physical escape-time approximation also needs a justified prefactor and regime.", "lens": "the exponential barrier-to-noise ratio with unit prefactor", "kind": "bars", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
