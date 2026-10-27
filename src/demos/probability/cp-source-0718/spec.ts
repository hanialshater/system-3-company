import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0718", "title": "The maximum selects positive noise", "op": "maxnoise", "labels": ["Arms", "Scale"], "outputs": ["Bias"], "a": [2.0, 1.0], "b": [8.0, 1.0], "question": "Each of 2 equal-value arms has independent noise ±Scale 1, each equally likely. What is the expected maximum estimation error?", "questionTemplate": "Each of {Arms} equal-value arms has independent noise ±Scale {Scale}, each equally likely. What is the expected maximum estimation error?", "explain": "Taking a maximum selects positive noise unless every estimate is low. Independent evaluation avoids this selection in the stated symmetric model.", "lens": "the number of noisy equal-valued actions", "kind": "bars", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
