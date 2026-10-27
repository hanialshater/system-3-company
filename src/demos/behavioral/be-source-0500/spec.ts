import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0500", "title": "A correlation of fifteen hundredths", "op": "rsquared", "labels": ["R"], "outputs": ["Percent"], "a": [0.15], "b": [0.5], "question": "In a toy simple linear regression with an intercept and correlation R 0.15, what percent of outcome variation is R squared?", "questionTemplate": "In a toy simple linear regression with an intercept and correlation R {R}, what percent of outcome variation is R squared?", "explain": "Squaring a correlation gives the explained share in this simple linear setting. It is neither a causal effect nor an individual prediction guarantee.", "lens": "the explained share in a specified simple linear model", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
