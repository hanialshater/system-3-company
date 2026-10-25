import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0369", "title": "The earlier event happens first", "op": "preempt", "labels": ["TimeA", "TimeB"], "outputs": ["FirstTime", "Cause"], "a": [2.0, 5.0], "b": [5.0, 2.0], "question": "Two toy sufficient events would arrive at times 2,5; the first ends the process. At what time does the outcome occur?", "questionTemplate": "Two toy sufficient events would arrive at times {TimeA},{TimeB}; the first ends the process. At what time does the outcome occur?", "explain": "Timing can distinguish the event that actually occurs first from a backup that would have sufficed later. The structural stopping rule is part of the model.", "lens": "the timing rule that distinguishes a backup cause", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
