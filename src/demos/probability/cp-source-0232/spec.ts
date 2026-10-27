import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0232", "title": "A tiny effect with a huge sample", "op": "zscore", "labels": ["Difference", "SD", "N"], "outputs": ["Z"], "a": [0.01, 1.0, 100.0], "b": [0.01, 1.0, 1000000.0], "question": "A toy mean difference is 0.01, known observation SD 1, and sample size 100. Using SE=SD/sqrt(N), what z score results?", "questionTemplate": "A toy mean difference is {Difference}, known observation SD {SD}, and sample size {N}. Using SE=SD/sqrt(N), what z score results?", "explain": "A fixed small effect can have a large standardized test statistic at large N. Statistical separation does not establish practical importance.", "lens": "the standard error behind statistical separation", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
