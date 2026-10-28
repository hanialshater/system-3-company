import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0298", "title": "Equal distances at unequal speeds", "op": "harmonic", "labels": ["Out", "Back"], "outputs": ["Speed"], "a": [30.0, 60.0], "b": [40.0, 40.0], "question": "Travel equal distances at toy speeds 30 out and 60 back. What is total distance divided by total time?", "questionTemplate": "Travel equal distances at toy speeds {Out} out and {Back} back. What is total distance divided by total time?", "explain": "Equal distances give a harmonic rather than arithmetic mean of speeds. The slower leg occupies more time.", "lens": "time weighting of an out-and-back speed", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
