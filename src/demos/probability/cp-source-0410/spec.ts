import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0410", "title": "Coarsen ages into explicit bands", "op": "band", "labels": ["Age", "Width"], "outputs": ["Group"], "a": [37.0, 10.0], "b": [37.0, 5.0], "question": "Coarsen toy Age 37 into bands of positive Width 10, starting at zero. What zero-based band index is assigned?", "questionTemplate": "Coarsen toy Age {Age} into bands of positive Width {Width}, starting at zero. What zero-based band index is assigned?", "explain": "Coarsening makes an exact match within a band possible but does not make all people in that band identical. Boundary choices affect membership.", "lens": "the grouping boundary used for a coarsened match", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
