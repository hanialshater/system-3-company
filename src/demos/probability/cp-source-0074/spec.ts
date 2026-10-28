import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0074", "title": "Wins sharpen an explicit prior", "op": "betamean", "labels": ["Alpha", "Beta", "Wins", "Losses"], "outputs": ["Mean"], "a": [1.0, 1.0, 7.0, 3.0], "b": [1.0, 1.0, 70.0, 30.0], "question": "A toy coin has Beta(1,1) prior and independent data of 7 wins and 3 losses. What is the posterior predictive win probability?", "questionTemplate": "A toy coin has Beta({Alpha},{Beta}) prior and independent data of {Wins} wins and {Losses} losses. What is the posterior predictive win probability?", "explain": "Prior counts and observed counts add under this model. The posterior mean also gives the next-trial predictive probability.", "lens": "prior counts and observed coin data", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
