import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0499", "title": "Replication needs a denominator", "op": "replication", "labels": ["Positive", "Studies"], "outputs": ["Share"], "a": [4.0, 6.0], "b": [4.0, 12.0], "question": "A toy replication set has 4 positive results among 6 studies. What percentage is positive?", "questionTemplate": "A toy replication set has {Positive} positive results among {Studies} studies. What percentage is positive?", "explain": "The observed share is a descriptive count. Designs, precision and selection still matter before generalizing from that count.", "lens": "the descriptive success share without a universal-effect claim", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
