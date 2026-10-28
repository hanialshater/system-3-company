import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0166", "title": "Add uncertain task times correctly", "op": "sumvariance", "labels": ["MeanA", "VarA", "MeanB", "VarB"], "outputs": ["Mean", "SD"], "a": [5.0, 4.0, 7.0, 9.0], "b": [5.0, 16.0, 7.0, 36.0], "question": "Two independent toy task times have means 5,7 and variances 4,9. What is their total expected duration?", "questionTemplate": "Two independent toy task times have means {MeanA},{MeanB} and variances {VarA},{VarB}. What is their total expected duration?", "explain": "Independent variances add, as do means. A high-reliability deadline requires more information than simply the total expectation.", "lens": "expected duration versus a high-reliability deadline", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
