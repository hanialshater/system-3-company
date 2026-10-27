import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0151", "title": "Time ahead need not be evenly split", "op": "arcsine", "labels": ["Fraction"], "outputs": ["CDF"], "a": [0.1], "b": [0.5], "question": "In the stated limiting arcsine model, the fraction of time ahead has CDF (2/pi)asin(sqrt(u)). At u=0.1, what is this CDF?", "questionTemplate": "In the stated limiting arcsine model, the fraction of time ahead has CDF (2/pi)asin(sqrt(u)). At u={Fraction}, what is this CDF?", "explain": "The limiting occupation-time distribution concentrates near the ends. It is not the same as a uniform share or an exact finite-game formula.", "lens": "the limiting occupation-time distribution", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
