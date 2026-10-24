import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0437", "title": "Income beside the neighbor's income", "op": "reference", "labels": ["Outcome", "Reference", "Lambda"], "outputs": ["Value"], "a": [100.0, 80.0, 2.0], "b": [100.0, 120.0, 2.0], "question": "An outcome is 100, its reference is 80, and negative differences count 2 times positive ones. What is its signed model value?", "questionTemplate": "An outcome is {Outcome}, its reference is {Reference}, and negative differences count {Lambda} times positive ones. What is its signed model value?", "explain": "The same outcome changes sign when its reference crosses it. The reference is a stated assumption, not a measure of anyone’s feelings.", "lens": "the comparison reference with fixed own resources", "kind": "timeline", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
