import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0376", "title": "A small initial difference grows", "op": "feedback", "labels": ["Initial", "Amplification", "Steps"], "outputs": ["Level"], "a": [0.001, 2.0, 10.0], "b": [0.002, 2.0, 10.0], "question": "A toy feedback process starts at 0.001; each step multiplies the current level by 2. What level follows 10 steps?", "questionTemplate": "A toy feedback process starts at {Initial}; each step multiplies the current level by {Amplification}. What level follows {Steps} steps?", "explain": "A self-reinforcing measurement process can amplify its starting differences. The recurrence is assumed and does not separate true underlying need from observed activity.", "lens": "the amplification assumed in a divergent toy recurrence", "kind": "timeline", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
