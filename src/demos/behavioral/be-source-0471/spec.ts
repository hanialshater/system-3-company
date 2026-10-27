import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0471", "title": "Reflection and a correlated attitude", "op": "rsquared", "labels": ["R"], "outputs": ["Percent"], "a": [0.2], "b": [0.5], "question": "In a toy simple linear regression with an intercept and correlation R 0.2, what percent of outcome variation is R squared?", "questionTemplate": "In a toy simple linear regression with an intercept and correlation R {R}, what percent of outcome variation is R squared?", "explain": "Squaring a correlation gives the explained share in this simple linear setting. It is neither a causal effect nor an individual prediction guarantee.", "lens": "the explained share under a stated simple linear association", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
