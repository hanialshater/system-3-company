import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0442", "title": "Observed activity reinforces exposure", "op": "feedback", "labels": ["Initial", "Amplification", "Steps"], "outputs": ["Level"], "a": [10.0, 1.2, 10.0], "b": [10.0, 1.0, 10.0], "question": "A toy feedback process starts at 10; each step multiplies the current level by 1.2. What level follows 10 steps?", "questionTemplate": "A toy feedback process starts at {Initial}; each step multiplies the current level by {Amplification}. What level follows {Steps} steps?", "explain": "A self-reinforcing measurement process can amplify its starting differences. The recurrence is assumed and does not separate true underlying need from observed activity.", "lens": "the amplification assumed in a feedback recurrence", "kind": "timeline", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
