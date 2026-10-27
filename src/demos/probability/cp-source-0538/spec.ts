import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0538", "title": "Idle drivers are an inflow-outflow stock", "op": "stock", "labels": ["Initial", "In", "Out", "Time"], "outputs": ["Stock"], "a": [100.0, 30.0, 50.0, 2.0], "b": [100.0, 45.0, 50.0, 2.0], "question": "A toy stock starts at 100, receives 30 per time and loses 50 per time over 2. Reflected at zero, what remains?", "questionTemplate": "A toy stock starts at {Initial}, receives {In} per time and loses {Out} per time over {Time}. Reflected at zero, what remains?", "explain": "Inflows and outflows jointly determine the buffer. This fluid inventory model omits randomness and any feedback after depletion.", "lens": "the assumed returns and request rates of an idle-driver buffer", "kind": "timeline", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
