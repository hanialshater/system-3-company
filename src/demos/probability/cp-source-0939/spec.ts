import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0939", "title": "A waiting stage delays infectiousness", "op": "preempt", "labels": ["TimeA", "TimeB"], "outputs": ["FirstTime", "Cause"], "a": [2.0, 5.0], "b": [4.0, 5.0], "question": "Two toy sufficient events would arrive at times 2,5; the first ends the process. At what time does the outcome occur?", "questionTemplate": "Two toy sufficient events would arrive at times {TimeA},{TimeB}; the first ends the process. At what time does the outcome occur?", "explain": "Timing can distinguish the event that actually occurs first from a backup that would have sufficed later. The structural stopping rule is part of the model.", "lens": "a stipulated incubation time before a full SEIR trajectory", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
