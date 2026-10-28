import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0387", "title": "Benefits and recent reference pay", "op": "reference", "labels": ["Outcome", "Reference", "Lambda"], "outputs": ["Value"], "a": [80.0, 100.0, 2.0], "b": [80.0, 70.0, 2.0], "question": "An outcome is 80, its reference is 100, and negative differences count 2 times positive ones. What is its signed model value?", "questionTemplate": "An outcome is {Outcome}, its reference is {Reference}, and negative differences count {Lambda} times positive ones. What is its signed model value?", "explain": "The same outcome changes sign when its reference crosses it. The reference is a stated assumption, not a measure of anyone’s feelings.", "lens": "the reference wage behind a stated value comparison", "kind": "timeline", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
