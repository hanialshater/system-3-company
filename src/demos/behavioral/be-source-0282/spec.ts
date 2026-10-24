import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0282", "title": "Across the left digit", "op": "digitgap", "labels": ["PriceA", "PriceB"], "outputs": ["CashGap", "IntegerGap"], "a": [2.99, 3.0], "b": [4.0, 4.01], "question": "Toy prices are 2.99 and 3. What is the cash difference, PriceB minus PriceA?", "questionTemplate": "Toy prices are {PriceA} and {PriceB}. What is the cash difference, PriceB minus PriceA?", "explain": "The cash gap and the change in the integer part are separate quantities. This display does not measure how large the difference feels.", "lens": "equal cash gaps with unequal integer-part changes", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
