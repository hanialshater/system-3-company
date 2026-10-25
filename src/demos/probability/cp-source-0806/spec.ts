import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0806", "title": "An honest report minimizes expected loss", "op": "expectedbrier", "labels": ["Belief", "Report"], "outputs": ["Loss", "Regret"], "a": [0.7, 0.7], "b": [0.7, 0.5], "question": "Your toy belief is 0.7; you report 0.7. What expected Brier loss follows under that belief?", "questionTemplate": "Your toy belief is {Belief}; you report {Report}. What expected Brier loss follows under that belief?", "explain": "Expected squared probability error is minimized by reporting the belief itself. The belief need not equal the true event rate.", "lens": "the reported probability under a stipulated belief", "kind": "curve", "answerPosition": 2, "plot": [1, 0, 1]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
