import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0857", "title": "A test draws on shared inventory", "op": "stock", "labels": ["Initial", "In", "Out", "Time"], "outputs": ["Stock"], "a": [100.0, 0.0, 10.0, 5.0], "b": [100.0, 0.0, 20.0, 5.0], "question": "A toy stock starts at 100, receives 0 per time and loses 10 per time over 5. Reflected at zero, what remains?", "questionTemplate": "A toy stock starts at {Initial}, receives {In} per time and loses {Out} per time over {Time}. Reflected at zero, what remains?", "explain": "Inflows and outflows jointly determine the buffer. This fluid inventory model omits randomness and any feedback after depletion.", "lens": "the depletion rate of a common stock buffer", "kind": "timeline", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
