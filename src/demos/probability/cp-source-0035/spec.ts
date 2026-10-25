import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0035", "title": "Count orders on a logarithmic scale", "op": "logfactorial", "labels": ["Cards"], "outputs": ["Log10Orders"], "a": [52.0], "b": [20.0], "question": "A toy deck has 52 distinct cards. What is log10 of the number of possible orders?", "questionTemplate": "A toy deck has {Cards} distinct cards. What is log10 of the number of possible orders?", "explain": "The factorial counts permutations of distinct cards. A logarithmic output keeps a huge exact count within a readable numeric range.", "lens": "the factorial number of distinct permutations", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
