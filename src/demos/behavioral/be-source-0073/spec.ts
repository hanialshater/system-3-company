import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0073", "title": "Make a choice easier", "op": "search", "labels": ["Options", "Attributes", "Seconds"], "outputs": ["Checks"], "a": [5.0, 4.0, 3.0], "b": [5.0, 4.0, 1.0], "question": "A toy decision inspects 4 attributes for each of 5 options, spending 3 seconds per check. What total time is needed?", "explain": "Decision cost depends on both the number of options and the dimensions compared. A smaller interface can change this cost without removing alternatives.", "lens": "the action cost in an illustrative convenience nudge", "kind": "timeline", "answerPosition": 1, "questionTemplate": "A toy decision inspects {Attributes} attributes for each of {Options} options, spending {Seconds} seconds per check. What total time is needed?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
