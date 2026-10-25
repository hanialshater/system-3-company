import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0631", "title": "The same standardized latent coordinate", "op": "noncenter", "labels": ["V", "Z"], "outputs": ["X", "SD"], "a": [-4.0, 1.0], "b": [2.0, 1.0], "question": "A toy funnel coordinate is X=exp(V/2)×Z. With V -4, Z 1, what X results?", "questionTemplate": "A toy funnel coordinate is X=exp(V/2)×Z. With V {V}, Z {Z}, what X results?", "explain": "The same standardized coordinate maps into very different scales across the funnel. Reparameterizing changes geometry without creating new data.", "lens": "the nonlinear scale mapping in a noncentered parameterization", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
