import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0923", "title": "Immunity changes reproduction", "op": "herd", "labels": ["R0"], "outputs": ["Threshold"], "a": [3.0], "b": [2.0], "question": "In a homogeneous toy transmission model with R0 3 and perfect immunity, what immune share makes effective reproduction at most one?", "questionTemplate": "In a homogeneous toy transmission model with R0 {R0} and perfect immunity, what immune share makes effective reproduction at most one?", "explain": "The threshold uses homogeneous mixing and perfect protection. It is not the final epidemic size or a current vaccination recommendation.", "lens": "the homogeneous perfect-immunity threshold", "kind": "bars", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
