import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0143", "title": "A fair walk between two walls", "op": "walls", "labels": ["Left", "Right"], "outputs": ["Steps", "HitRight"], "a": [10.0, 10.0], "b": [20.0, 10.0], "question": "A fair unit-step toy walk starts at 0, stops at -10 or +10. What is the expected number of steps until stopping?", "questionTemplate": "A fair unit-step toy walk starts at 0, stops at -{Left} or +{Right}. What is the expected number of steps until stopping?", "explain": "Finite absorbing boundaries make this hitting-time expectation finite. The two boundary distances jointly determine it.", "lens": "the boundary distances in an absorption time", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
