import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0497", "title": "A trial contrast in standardized units", "op": "stdgap", "labels": ["MeanA", "MeanB", "SD"], "outputs": ["Difference"], "a": [50.0, 40.0, 10.0], "b": [50.0, 40.0, 20.0], "question": "Toy covariate means are 50 and 40, with chosen reference SD 10. What is their standardized mean difference?", "questionTemplate": "Toy covariate means are {MeanA} and {MeanB}, with chosen reference SD {SD}. What is their standardized mean difference?", "explain": "Balance diagnostics describe observed covariates on a common scale. Observed balance cannot demonstrate balance of every unmeasured cause.", "lens": "the outcome spread behind a standardized estimate", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
