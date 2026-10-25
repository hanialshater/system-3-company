import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0102", "title": "A strong prior takes more data", "op": "betamean", "labels": ["Alpha", "Beta", "Wins", "Losses"], "outputs": ["Mean"], "a": [50.0, 50.0, 8.0, 2.0], "b": [1.0, 1.0, 8.0, 2.0], "question": "A toy coin has Beta(50,50) prior and independent data of 8 wins and 2 losses. What is the posterior predictive win probability?", "questionTemplate": "A toy coin has Beta({Alpha},{Beta}) prior and independent data of {Wins} wins and {Losses} losses. What is the posterior predictive win probability?", "explain": "Prior counts and observed counts add under this model. The posterior mean also gives the next-trial predictive probability.", "lens": "prior strength under identical observations", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
