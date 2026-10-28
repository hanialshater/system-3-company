import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0777", "title": "A precision entry sets partial linkage", "op": "partialcorr", "labels": ["DiagA", "Off", "DiagB"], "outputs": ["Correlation"], "a": [2.0, -1.0, 2.0], "b": [2.0, 0.0, 2.0], "question": "A toy Gaussian precision block has diagonals 2,2, off-diagonal -1. What partial correlation is implied?", "questionTemplate": "A toy Gaussian precision block has diagonals {DiagA},{DiagB}, off-diagonal {Off}. What partial correlation is implied?", "explain": "A zero precision entry encodes conditional independence in a nonsingular Gaussian model. Correlation is not a causal direction.", "lens": "the off-diagonal precision entry in a Gaussian graph", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
