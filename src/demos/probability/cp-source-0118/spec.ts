import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0118", "title": "Three heads with a finite prior", "op": "betamean", "labels": ["Alpha", "Beta", "Wins", "Losses"], "outputs": ["Mean"], "a": [1.0, 1.0, 3.0, 0.0], "b": [10.0, 10.0, 3.0, 0.0], "question": "A toy coin has Beta(1,1) prior and independent data of 3 wins and 0 losses. What is the posterior predictive win probability?", "questionTemplate": "A toy coin has Beta({Alpha},{Beta}) prior and independent data of {Wins} wins and {Losses} losses. What is the posterior predictive win probability?", "explain": "Prior counts and observed counts add under this model. The posterior mean also gives the next-trial predictive probability.", "lens": "the prior behind a prediction after a short streak", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
