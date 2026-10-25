import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0413", "title": "A matching procedure can worsen balance", "op": "stdgap", "labels": ["MeanA", "MeanB", "SD"], "outputs": ["Difference"], "a": [50.0, 49.0, 10.0], "b": [50.0, 40.0, 10.0], "question": "Toy covariate means are 50 and 49, with chosen reference SD 10. What is their standardized mean difference?", "questionTemplate": "Toy covariate means are {MeanA} and {MeanB}, with chosen reference SD {SD}. What is their standardized mean difference?", "explain": "Balance diagnostics describe observed covariates on a common scale. Observed balance cannot demonstrate balance of every unmeasured cause.", "lens": "the realized covariate balance rather than a method label", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
