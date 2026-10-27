import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0025", "title": "Uniform shuffles allow repeats", "op": "sameartist", "labels": ["A", "B"], "outputs": ["Repeat"], "a": [5.0, 5.0], "b": [9.0, 1.0], "question": "Uniformly shuffle 5 songs by artist A and 5 by artist B. What is the chance the first two songs have the same artist?", "questionTemplate": "Uniformly shuffle {A} songs by artist A and {B} by artist B. What is the chance the first two songs have the same artist?", "explain": "Uniform shuffling permits adjacent repeats. Removing repeats imposes a different distribution rather than demonstrating that uniform randomness was defective.", "lens": "adjacent artist repeats under uniform shuffling", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
