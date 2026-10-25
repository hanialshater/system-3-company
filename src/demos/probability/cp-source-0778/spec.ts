import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0778", "title": "A direct stock linkage is conditional", "op": "partialcorr", "labels": ["DiagA", "Off", "DiagB"], "outputs": ["Correlation"], "a": [3.0, -1.0, 3.0], "b": [3.0, -2.0, 3.0], "question": "A toy Gaussian precision block has diagonals 3,3, off-diagonal -1. What partial correlation is implied?", "questionTemplate": "A toy Gaussian precision block has diagonals {DiagA},{DiagB}, off-diagonal {Off}. What partial correlation is implied?", "explain": "A zero precision entry encodes conditional independence in a nonsingular Gaussian model. Correlation is not a causal direction.", "lens": "the Gaussian conditional correlation of a supplied precision block", "kind": "bars", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
