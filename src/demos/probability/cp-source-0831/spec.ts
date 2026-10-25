import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0831", "title": "Pairing removes shared variation", "op": "paired", "labels": ["SDA", "SDB", "Rho", "N"], "outputs": ["SE"], "a": [2.0, 2.0, 0.0, 20.0], "b": [2.0, 2.0, 0.8, 20.0], "question": "Paired toy measurements have SDs 2,2, correlation 0, N 20 pairs. What standard error of the mean difference results?", "questionTemplate": "Paired toy measurements have SDs {SDA},{SDB}, correlation {Rho}, N {N} pairs. What standard error of the mean difference results?", "explain": "Positive within-pair covariance can remove noise from a difference. Carryover, ordering and pairing validity need separate design checks.", "lens": "the covariance term in a paired mean-difference standard error", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
