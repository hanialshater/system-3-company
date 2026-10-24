import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0143", "title": "How complex is the menu?", "op": "search", "labels": ["Options", "Attributes", "Seconds"], "outputs": ["Checks"], "a": [10.0, 8.0, 2.0], "b": [10.0, 2.0, 2.0], "question": "A toy decision inspects 8 attributes for each of 10 options, spending 2 seconds per check. What total time is needed?", "explain": "Decision cost depends on both the number of options and the dimensions compared. A smaller interface can change this cost without removing alternatives.", "lens": "the dimensions compared rather than option count alone", "kind": "timeline", "answerPosition": 2, "questionTemplate": "A toy decision inspects {Attributes} attributes for each of {Options} options, spending {Seconds} seconds per check. What total time is needed?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
