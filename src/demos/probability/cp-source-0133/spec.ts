import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0133", "title": "A higher threshold means more waiting", "op": "offerthreshold", "labels": ["Maximum", "Threshold"], "outputs": ["AcceptedMean", "Wait"], "a": [100.0, 50.0], "b": [100.0, 90.0], "question": "Independent toy offers are uniform from 0 to 100. Accept the first above 50, ignoring waiting costs. What is the mean accepted offer?", "questionTemplate": "Independent toy offers are uniform from 0 to {Maximum}. Accept the first above {Threshold}, ignoring waiting costs. What is the mean accepted offer?", "explain": "A higher threshold raises the conditional offer but also raises expected waiting time. A complete stopping decision must price that delay.", "lens": "the accepted-offer mean and waiting tradeoff", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
