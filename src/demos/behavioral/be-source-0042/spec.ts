import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0042", "title": "A result across laboratories", "op": "replication", "labels": ["Positive", "Studies"], "outputs": ["Share"], "a": [28.0, 36.0], "b": [20.0, 36.0], "question": "A toy replication set has 28 positive results among 36 studies. What percentage is positive?", "explain": "The observed share is a descriptive count. Designs, precision and selection still matter before generalizing from that count.", "lens": "counting replications without inferring universality", "kind": "grid", "answerPosition": 0, "questionTemplate": "A toy replication set has {Positive} positive results among {Studies} studies. What percentage is positive?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
