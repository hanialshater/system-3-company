import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0830", "title": "Uncertainty affects an acquisition score", "op": "ucb", "labels": ["Mean", "SD", "Beta"], "outputs": ["Score"], "a": [1.0, 0.1, 2.0], "b": [1.0, 1.0, 2.0], "question": "A toy acquisition rule scores a point by Mean 1+Beta 2×SD 0.1. What score results?", "questionTemplate": "A toy acquisition rule scores a point by Mean {Mean}+Beta {Beta}×SD {SD}. What score results?", "explain": "Increasing the uncertainty weight can favor less explored points. A UCB score is a decision rule, not itself a calibrated probability.", "lens": "the uncertainty bonus in one adaptive measurement choice", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
