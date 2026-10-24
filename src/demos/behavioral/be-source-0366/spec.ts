import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0366", "title": "Simplify the notice", "op": "search", "labels": ["Options", "Attributes", "Seconds"], "outputs": ["Checks"], "a": [4.0, 5.0, 10.0], "b": [4.0, 2.0, 10.0], "question": "A toy decision inspects 5 attributes for each of 4 options, spending 10 seconds per check. What total time is needed?", "questionTemplate": "A toy decision inspects {Attributes} attributes for each of {Options} options, spending {Seconds} seconds per check. What total time is needed?", "explain": "Decision cost depends on both the number of options and the dimensions compared. A smaller interface can change this cost without removing alternatives.", "lens": "the explicit reading burden of a form", "kind": "timeline", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
