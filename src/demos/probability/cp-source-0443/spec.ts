import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0443", "title": "Popularity feeds the next exposure", "op": "feedback", "labels": ["Initial", "Amplification", "Steps"], "outputs": ["Level"], "a": [10.0, 1.5, 5.0], "b": [10.0, 1.0, 5.0], "question": "A toy feedback process starts at 10; each step multiplies the current level by 1.5. What level follows 5 steps?", "questionTemplate": "A toy feedback process starts at {Initial}; each step multiplies the current level by {Amplification}. What level follows {Steps} steps?", "explain": "A self-reinforcing measurement process can amplify its starting differences. The recurrence is assumed and does not separate true underlying need from observed activity.", "lens": "the recursive exposure rule in a toy popularity loop", "kind": "timeline", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
