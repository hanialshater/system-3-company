import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0179", "title": "Where do coworkers set the bar?", "op": "reference", "labels": ["Outcome", "Reference", "Lambda"], "outputs": ["Value"], "a": [50.0, 40.0, 1.0], "b": [50.0, 60.0, 1.0], "question": "An outcome is 50, its reference is 40, and negative differences count 1 times positive ones. What is its signed model value?", "explain": "The same outcome changes sign when its reference crosses it. The reference is a stated assumption, not a measure of anyone’s feelings.", "lens": "the comparison wage rather than the absolute wage", "kind": "timeline", "answerPosition": 2, "questionTemplate": "An outcome is {Outcome}, its reference is {Reference}, and negative differences count {Lambda} times positive ones. What is its signed model value?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
