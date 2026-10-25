import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0586", "title": "A curved target has a different energy", "op": "bananapotential", "labels": ["X", "Y", "Bend"], "outputs": ["Energy"], "a": [2.0, 0.0, 1.0], "b": [2.0, 0.0, 0.0], "question": "A toy banana potential is x²/2+[y-Bend×(x²-1)]²/2. At X 2, Y 0, Bend 1, what energy results?", "questionTemplate": "A toy banana potential is x²/2+[y-Bend×(x²-1)]²/2. At X {X}, Y {Y}, Bend {Bend}, what energy results?", "explain": "A curved high-density region changes the geometry a sampler must navigate. Energy at one point does not measure full-chain mixing.", "lens": "the energy cross-section of a stipulated banana density", "kind": "curve", "answerPosition": 1, "plot": [0, -3, 3]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
