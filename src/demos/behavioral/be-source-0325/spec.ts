import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0325", "title": "A small explained share", "op": "rsquared", "labels": ["R"], "outputs": ["Percent"], "a": [0.0316227766], "b": [0.1], "question": "In a toy simple linear regression with an intercept and correlation R 0.0316228, what percent of outcome variation is R squared?", "questionTemplate": "In a toy simple linear regression with an intercept and correlation R {R}, what percent of outcome variation is R squared?", "explain": "Squaring a correlation gives the explained share in this simple linear setting. It is neither a causal effect nor an individual prediction guarantee.", "lens": "the difference between correlation and explained variation", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
