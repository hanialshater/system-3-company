import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0072", "title": "Hard choices come first", "op": "search", "labels": ["Options", "Attributes", "Seconds"], "outputs": ["Checks"], "a": [8.0, 6.0, 2.0], "b": [8.0, 3.0, 2.0], "question": "A toy decision inspects 6 attributes for each of 8 options, spending 2 seconds per check. What total time is needed?", "explain": "Decision cost depends on both the number of options and the dimensions compared. A smaller interface can change this cost without removing alternatives.", "lens": "the work required by a decision sequence", "kind": "timeline", "answerPosition": 0, "questionTemplate": "A toy decision inspects {Attributes} attributes for each of {Options} options, spending {Seconds} seconds per check. What total time is needed?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
