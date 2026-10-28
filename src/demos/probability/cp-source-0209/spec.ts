import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0209", "title": "A predictable next character", "op": "bitsurprise", "labels": ["P"], "outputs": ["Bits"], "a": [0.5], "b": [0.9], "question": "A specified toy outcome has probability 0.5. How many bits of surprisal does -log2(P) assign it?", "questionTemplate": "A specified toy outcome has probability {P}. How many bits of surprisal does -log2(P) assign it?", "explain": "Surprisal measures one outcome; entropy averages over possible outcomes. Neither measures the semantic importance of the event.", "lens": "surprisal in a stated next-character model", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
