import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0565", "title": "Absorption time in a finite toy board", "op": "walls", "labels": ["Left", "Right"], "outputs": ["Steps", "HitRight"], "a": [3.0, 5.0], "b": [6.0, 5.0], "question": "A fair unit-step toy walk starts at 0, stops at -3 or +5. What is the expected number of steps until stopping?", "questionTemplate": "A fair unit-step toy walk starts at 0, stops at -{Left} or +{Right}. What is the expected number of steps until stopping?", "explain": "Finite absorbing boundaries make this hitting-time expectation finite. The two boundary distances jointly determine it.", "lens": "the expected stopping time between two absorbing boundaries", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
