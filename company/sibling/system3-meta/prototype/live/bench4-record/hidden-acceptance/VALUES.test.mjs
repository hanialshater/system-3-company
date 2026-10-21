import { load, category, CYC } from "./kit.mjs";
const m = await load("VALUES", "values.mjs");
category(m, "error values", [["DIV0", "#DIV/0!"], ["REF", "#REF!"], ["NAME", "#NAME?"], ["VALUE", "#VALUE!"], ["CYCLE", CYC]], (k) => m.ERRORS[k]);
category(m, "isError", [["#DIV/0!", true], [CYC, true], ["#VALUE!", true], ["hello", false], [5, false], ["", false], ["#FOO!", false]], (v) => m.isError(v));
category(m, "toNumber", [["", 0], [true, 1], [false, 0], [7, 7], [" -2.5 ", -2.5], ["+3", 3], ["abc", "#VALUE!"], ["12abc", "#VALUE!"], ["#REF!", "#REF!"], [".5", 0.5]], (v) => m.toNumber(v));
category(m, "toText", [["", ""], [true, "TRUE"], [false, "FALSE"], [2.5, "2.5"], ["x", "x"]], (v) => m.toText(v));
category(m, "parseLiteral", [["5", 5], [" 7 ", 7], ["-1.5", -1.5], ["hello", "hello"], ["TRUE", "TRUE"], ["12abc", "12abc"]], (v) => m.parseLiteral(v));
