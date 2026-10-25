import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0676", "title": "Which detection belongs to which dot?", "op": "assignment", "labels": ["TrackA", "TrackB", "DetectA", "DetectB"], "outputs": ["CostGap", "Straight", "Swapped"], "a": [0.0, 10.0, 1.0, 9.0], "b": [0.0, 10.0, 9.0, 1.0], "question": "Two toy tracks are 0,10; detections 1,9. What is straight assignment squared error minus swapped assignment squared error?", "questionTemplate": "Two toy tracks are {TrackA},{TrackB}; detections {DetectA},{DetectB}. What is straight assignment squared error minus swapped assignment squared error?", "explain": "The lower-cost association depends on both locations. This is one association step, not a multi-target tracker.", "lens": "the squared-distance association cost", "kind": "bars", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
