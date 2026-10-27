import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0542", "title": "Thin, then merge independent streams", "op": "poissonstreams", "labels": ["Rate", "Share", "Added"], "outputs": ["Rate"], "a": [10.0, 0.3, 2.0], "b": [10.0, 0.8, 2.0], "question": "Thin a toy Poisson stream of Rate 10 independently with Share 0.3, then merge an independent Poisson stream of rate 2. What rate results?", "questionTemplate": "Thin a toy Poisson stream of Rate {Rate} independently with Share {Share}, then merge an independent Poisson stream of rate {Added}. What rate results?", "explain": "Independent thinning and superposition preserve Poisson structure. Dependence between streams can invalidate that process-level conclusion.", "lens": "independent thinning and superposition rates", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
