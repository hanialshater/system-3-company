import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0476", "title": "Unequal attention to applications", "op": "search", "labels": ["Options", "Attributes", "Seconds"], "outputs": ["Checks"], "a": [10.0, 5.0, 10.0], "b": [10.0, 2.0, 10.0], "question": "A toy decision inspects 5 attributes for each of 10 options, spending 10 seconds per check. What total time is needed?", "questionTemplate": "A toy decision inspects {Attributes} attributes for each of {Options} options, spending {Seconds} seconds per check. What total time is needed?", "explain": "Decision cost depends on both the number of options and the dimensions compared. A smaller interface can change this cost without removing alternatives.", "lens": "the reading time in a specified review process", "kind": "timeline", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
