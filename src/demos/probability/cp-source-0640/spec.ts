import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0640", "title": "Rare ad clicks meet prior counts", "op": "betamean", "labels": ["Alpha", "Beta", "Wins", "Losses"], "outputs": ["Mean"], "a": [2.0, 98.0, 1.0, 9.0], "b": [2.0, 98.0, 100.0, 900.0], "question": "A toy coin has Beta(2,98) prior and independent data of 1 wins and 9 losses. What is the posterior predictive win probability?", "questionTemplate": "A toy coin has Beta({Alpha},{Beta}) prior and independent data of {Wins} wins and {Losses} losses. What is the posterior predictive win probability?", "explain": "Prior counts and observed counts add under this model. The posterior mean also gives the next-trial predictive probability.", "lens": "the conjugate predictive mean for a supplied campaign prior", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
