import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0594", "title": "A higher slice leaves a narrower set", "op": "slice", "labels": ["Height"], "outputs": ["Width"], "a": [0.1], "b": [0.9], "question": "For unnormalized toy density exp(-x²/2), choose slice Height 0.1 in (0,1). What is the full width of the retained horizontal slice?", "questionTemplate": "For unnormalized toy density exp(-x²/2), choose slice Height {Height} in (0,1). What is the full width of the retained horizontal slice?", "explain": "Conditioning on a height turns this density level set into an interval. A full slice sampler must also sample its height and position correctly.", "lens": "the normal-density level set in a slice-sampling step", "kind": "curve", "answerPosition": 0, "plot": [0, 0.001, 0.999]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
