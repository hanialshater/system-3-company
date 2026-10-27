import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0466", "title": "Regress residual on residual", "op": "residuals", "labels": ["T1", "Y1", "T2", "Y2"], "outputs": ["Slope"], "a": [1.0, 2.0, -1.0, -2.0], "b": [1.0, 3.0, -1.0, -3.0], "question": "Two toy residual pairs are T/Y=1/2 and -1/-2. What zero-intercept residual-on-residual regression slope results?", "questionTemplate": "Two toy residual pairs are T/Y={T1}/{Y1} and {T2}/{Y2}. What zero-intercept residual-on-residual regression slope results?", "explain": "Residualization removes the fitted nuisance components in this calculation. A causal DML interpretation additionally needs identification, nuisance-rate and sample-splitting assumptions.", "lens": "the residual projection ingredient of a causal estimator", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
