import { load, category, THROWS } from "./kit.mjs";
const m = await load("TOKENIZER", "tokenize.mjs");
const tk = (s) => m.tokenize(s);
const T = (type, value) => ({ type, value });
category(m, "numbers", [["3", [T("num", 3)]], ["2.5", [T("num", 2.5)]], [".5", [T("num", 0.5)]], ["7.", [T("num", 7)]], ["  42 ", [T("num", 42)]], ["1e3", [T("num", 1), T("id", "E3")]]], tk);
category(m, "strings", [['"ab"', [T("str", "ab")]], ['""', [T("str", "")]], ['"a b"&"c"', [T("str", "a b"), T("op", "&"), T("str", "c")]]], tk);
category(m, "identifiers", [["a1", [T("id", "A1")]], ["Sum(", [T("id", "SUM"), T("op", "(")]], ["x_2", [T("id", "X_2")]], ["true", [T("id", "TRUE")]]], tk);
category(m, "operators", [["1<=2", [T("num", 1), T("op", "<="), T("num", 2)]], ["a<>b", [T("id", "A"), T("op", "<>"), T("id", "B")]], ["A1:B2", [T("id", "A1"), T("op", ":"), T("id", "B2")]], ["(1,2)^-3", [T("op", "("), T("num", 1), T("op", ","), T("num", 2), T("op", ")"), T("op", "^"), T("op", "-"), T("num", 3)]], [">=<>", [T("op", ">="), T("op", "<>")]], ["", []]], tk);
category(m, "bad input throws", [["1.2.3", THROWS], ['"open', THROWS], ["1$2", THROWS], ["a#b", THROWS], ["..", THROWS]], (s) => { m.tokenize(s); return "returned"; });
