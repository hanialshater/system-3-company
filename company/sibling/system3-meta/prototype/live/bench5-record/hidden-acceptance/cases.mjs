// Hidden tests for Benchmark 4. Each case: wave, category, steps [[cell, text], ...], expect {cell: value}.
// Agents only ever see the failure categories and counts, never these cases.
const C = [];
const add = (w, cat, steps, expect) => C.push({ w, cat, steps, expect });
const f = (w, cat, formula, value) => add(w, cat, [["A1", formula]], { A1: value });

// Wave 1: literals, arithmetic, precedence, strings, comparisons, simple errors.
for (const [s, v] of [["1", 1], ["0", 0], ["-3", -3], ["2.5", 2.5], [".5", 0.5], ["hello", "hello"], ["  7 ", 7], ["12abc", "12abc"]]) add(1, "literal", [["A1", s]], { A1: v });
for (const [s, v] of [["=1+2", 3], ["=2*3+4", 10], ["=2+3*4", 14], ["=(2+3)*4", 20], ["=10-4-3", 3], ["=100/10/5", 2], ["=2^3", 8], ["=2^3^2", 512], ["=-2^2", 4], ["=-(2+3)", -5], ["=--4", 4], ["=+5", 5], ["=7/2", 3.5], ["=1.5*4", 6], ["=0.1+0.2", 0.3], ["= 1 +  2 ", 3], ["=((((1))))", 1], ["=2*(3+(4-1))", 12], ["=8-2*3^2", -10], ["=6/3*2", 4], ["=1-1-1", -1], ["=2^-1", 0.5], ["=3*-2", -6], ["=10/4", 2.5]]) f(1, "arithmetic", s, v);
for (const [s, v] of [['="ab"&"cd"', "abcd"], ['="n="&5', "n=5"], ['=1&2', "12"], ['=""&""', ""], ['="x"&TRUE', "xTRUE"], ['="a"&(1+1)', "a2"]]) f(1, "strings", s, v);
for (const [s, v] of [["=1<2", true], ["=2<1", false], ["=2=2", true], ["=2<>2", false], ["=3>=3", true], ["=3<=2", false], ['="a"="A"', true], ['="b">"a"', true], ["=1+1=2", true], ["=TRUE", true], ["=FALSE", false], ["=true", true]]) f(1, "compare", s, v);
for (const [s, v] of [["=1/0", "#DIV/0!"], ["=5/(2-2)", "#DIV/0!"], ['="a"+1', "#VALUE!"], ['=-"x"', "#VALUE!"], ["=1+", "#VALUE!"], ["=(1+2", "#VALUE!"], ["=1 2", "#VALUE!"], ["=)", "#VALUE!"], ['="open', "#VALUE!"], ["=1$2", "#VALUE!"], ["=", "#VALUE!"], ["=FOO(1)", "#NAME?"], ["=1/0+1", "#DIV/0!"], ['=("a"+1)/0', "#VALUE!"]]) f(1, "errors", s, v);

// Wave 2: references, ranges, functions, recalculation.
add(2, "refs", [["A1", "5"], ["B1", "=A1*2"]], { B1: 10 });
add(2, "refs", [["B1", "=A1+1"]], { B1: 1, A1: "" });
add(2, "refs", [["A1", "3"], ["A2", "=A1+1"], ["A3", "=A2+1"], ["A4", "=A3*A1"]], { A4: 15 });
add(2, "refs", [["a1", "4"], ["b2", "=a1^2"]], { B2: 16 });
add(2, "refs", [["A1", "hi"], ["B1", "=A1"]], { B1: "hi" });
add(2, "refs", [["A1", "hi"], ["B1", "=A1+1"]], { B1: "#VALUE!" });
add(2, "refs", [["A1", "=AA1"]], { A1: "#REF!" });
add(2, "refs", [["A1", "=A100"]], { A1: "#REF!" });
add(2, "refs", [["A1", "=A0"]], { A1: "#REF!" });
add(2, "refs", [["Z99", "9"], ["A1", "=Z99"]], { A1: 9 });
add(2, "refs", [["A1", "=B1&\"!\""], ["B1", "go"]], { A1: "go!" });
for (let n = 2; n <= 9; n++) add(2, "refs", [["A1", String(n)], ["B1", `=A1*${n}`]], { B1: n * n });
// recalculation after edits
add(2, "recalc", [["A1", "1"], ["B1", "=A1+1"], ["A1", "10"]], { B1: 11 });
add(2, "recalc", [["A1", "1"], ["B1", "=A1+1"], ["C1", "=B1*2"], ["A1", "4"]], { C1: 10 });
add(2, "recalc", [["A1", "1"], ["B1", "=A1"], ["A1", ""]], { B1: "", A1: "" });
add(2, "recalc", [["A1", "=1/0"], ["B1", "=A1+1"], ["A1", "2"]], { B1: 3 });
add(2, "recalc", [["A1", "5"], ["B1", "=A1"], ["B1", "7"]], { B1: 7 });
add(2, "recalc", [["A1", "5"], ["B1", "=A1"], ["B1", "=A1*3"]], { B1: 15 });
add(2, "recalc", [["A1", "x"], ["A1", "=2"], ["B1", "=A1+1"]], { B1: 3 });
for (let n = 1; n <= 8; n++) add(2, "recalc", [["A1", "1"], ["A2", "=A1*2"], ["A3", "=A2+A1"], ["A1", String(n)]], { A3: 3 * n });
// functions
const nums = [["A1", "1"], ["A2", "2"], ["A3", "3"], ["A4", "4"]];
for (const [s, v] of [["=SUM(A1:A4)", 10], ["=SUM(A4:A1)", 10], ["=MIN(A1:A4)", 1], ["=MAX(A1:A4)", 4], ["=AVERAGE(A1:A4)", 2.5], ["=COUNT(A1:A4)", 4], ["=SUM(A1:A4,10)", 20], ["=SUM(A1,A3)", 4], ["=sum(a1:a4)", 10], ["=SUM(A1:A4)*2", 20], ["=MAX(A1:A4)-MIN(A1:A4)", 3], ["=SUM(A1:B4)", 10], ["=COUNT(A1:A9)", 4], ["=AVERAGE(A1:A9)", 2.5], ["=SUM(A5:A9)", 0], ["=MIN(A5:A9)", 0], ["=AVERAGE(A5:A9)", "#DIV/0!"], ["=SUM()", 0], ["=SUM(1,2,3)", 6], ["=MAX(-1,-5)", -1]]) add(2, "functions", [...nums, ["C1", s]], { C1: v });
add(2, "functions", [["A1", "1"], ["A2", "word"], ["A3", "3"], ["C1", "=SUM(A1:A3)"]], { C1: 4 });
add(2, "functions", [["A1", "1"], ["A2", "word"], ["A3", "3"], ["C1", "=COUNT(A1:A3)"]], { C1: 2 });
add(2, "functions", [["A1", "word"], ["C1", "=SUM(A1)"]], { C1: "#VALUE!" });
add(2, "functions", [["A1", "1"], ["A2", "=1/0"], ["C1", "=SUM(A1:A2)"]], { C1: "#DIV/0!" });
add(2, "functions", [["C1", "=SUM(A1:AA2)"]], { C1: "#REF!" });
for (const [s, v] of [["=IF(1,2,3)", 2], ["=IF(0,2,3)", 3], ["=IF(1<2,\"y\",\"n\")", "y"], ["=IF(FALSE,1)", false], ["=IF(1)", "#VALUE!"], ["=IF(1,2,3,4)", "#VALUE!"], ["=IF(1,2,1/0)", 2], ["=IF(0,1/0,5)", 5], ["=IF(1/0,1,2)", "#DIV/0!"], ["=ABS(-3)", 3], ["=ABS(2,3)", "#VALUE!"], ["=ROUND(2.567,2)", 2.57], ["=ROUND(2.5)", 3], ["=ROUND(1234,-2)", 1200], ["=LEN(\"abc\")", 3], ["=LEN(12345)", 5], ["=LEN(\"\")", 0], ["=LEN()", "#VALUE!"], ["=NOPE()", "#NAME?"], ["=if(1,2,3)", 2]]) f(2, "functions", s, v);
add(2, "functions", [["A1", "-4"], ["B1", "=ABS(A1)+IF(A1<0,1,0)"]], { B1: 5 });
add(2, "functions", [["A1", "hello"], ["B1", "=LEN(A1)"]], { B1: 5 });
add(2, "functions", [["B1", "=LEN(A1)"]], { B1: 0 });
for (let n = 1; n <= 10; n++) { const st = []; for (let i = 1; i <= n; i++) st.push([`A${i}`, String(i)]); st.push(["B1", `=SUM(A1:A${n})`]); add(2, "functions", st, { B1: (n * (n + 1)) / 2 }); }

// Wave 3: cycles, error propagation, scale, clearing, deep chains.
add(3, "cycles", [["A1", "=A1"]], { A1: "#CYCLE!" });
add(3, "cycles", [["A1", "=B1"], ["B1", "=A1"]], { A1: "#CYCLE!", B1: "#CYCLE!" });
add(3, "cycles", [["A1", "=B1+1"], ["B1", "=C1+1"], ["C1", "=A1+1"]], { A1: "#CYCLE!", B1: "#CYCLE!", C1: "#CYCLE!" });
add(3, "cycles", [["A1", "=B1"], ["B1", "=A1"], ["C1", "=A1+1"]], { C1: "#CYCLE!" });
add(3, "cycles", [["A1", "=B1"], ["B1", "=A1"], ["B1", "5"]], { A1: 5, B1: 5 });
add(3, "cycles", [["A1", "=SUM(A1:A3)"]], { A1: "#CYCLE!" });
add(3, "cycles", [["A2", "=SUM(A1:A3)"], ["A1", "1"]], { A2: "#CYCLE!", A1: 1 });
add(3, "cycles", [["A1", "1"], ["B1", "=A1+1"], ["A1", "=B1"]], { A1: "#CYCLE!", B1: "#CYCLE!" });
add(3, "cycles", [["A1", "=IF(1,5,A1)"]], { A1: "#CYCLE!" });
add(3, "cycles", [["A1", "=B1"], ["B1", "=A1"], ["A1", ""]], { A1: "", B1: "" });
for (let n = 2; n <= 9; n++) { const st = []; for (let i = 1; i < n; i++) st.push([`A${i}`, `=A${i + 1}`]); st.push([`A${n}`, "=A1"]); add(3, "cycles", st, { A1: "#CYCLE!", [`A${n}`]: "#CYCLE!" }); }
for (let n = 2; n <= 9; n++) { const st = [["B1", "=B2"], ["B2", "=B1"]]; for (let i = 1; i <= n; i++) st.push([`C${i}`, i === 1 ? "7" : `=C${i - 1}+1`]); add(3, "cycles", st, { [`C${n}`]: 6 + n, B1: "#CYCLE!" }); }
// error propagation
add(3, "propagate", [["A1", "=1/0"], ["B1", "=A1*2"], ["C1", "=B1+1"]], { C1: "#DIV/0!" });
add(3, "propagate", [["A1", "=FOO()"], ["B1", "=A1&\"x\""]], { B1: "#NAME?" });
add(3, "propagate", [["A1", "=1/0"], ["B1", "=A1=A1"]], { B1: "#DIV/0!" });
add(3, "propagate", [["A1", "=AA1"], ["B1", "=ABS(A1)"]], { B1: "#REF!" });
add(3, "propagate", [["A1", "=1/0"], ["B1", "=LEN(A1)"]], { B1: "#DIV/0!" });
add(3, "propagate", [["A1", "=1/0"], ["B1", "=IF(A1,1,2)"]], { B1: "#DIV/0!" });
add(3, "propagate", [["A1", "=B1"], ["B1", "=A1"], ["C1", "=SUM(A1:B1)"]], { C1: "#CYCLE!" });
add(3, "propagate", [["A1", "=1/0"], ["A2", "=FOO()"], ["B1", "=A1+A2"]], { B1: "#DIV/0!" });
add(3, "propagate", [["A1", "=1/0"], ["A2", "=FOO()"], ["B1", "=A2+A1"]], { B1: "#NAME?" });
// scale and deep chains
for (const n of [20, 50, 99]) { const st = [["A1", "1"]]; for (let i = 2; i <= n; i++) st.push([`A${i}`, `=A${i - 1}+1`]); add(3, "scale", st, { [`A${n}`]: n }); }
{ const st = []; for (let c = 0; c < 26; c++) for (let r = 1; r <= 10; r++) st.push([String.fromCharCode(65 + c) + r, String(r)]); st.push(["Z99", "=SUM(A1:Z10)"]); add(3, "scale", st, { Z99: 26 * 55 }); }
{ const st = [["A1", "2"]]; for (let c = 1; c < 26; c++) st.push([String.fromCharCode(65 + c) + "1", `=${String.fromCharCode(64 + c)}1*1`]); st.push(["A1", "3"]); add(3, "scale", st, { Z1: 3 }); }
// clearing and odd input
add(3, "edges", [["A1", "5"], ["A1", ""], ["B1", "=A1*2"]], { B1: 0 });
add(3, "edges", [["A1", "=\"\""], ["B1", "=A1&\"x\""]], { B1: "x" });
add(3, "edges", [["A1", "TRUE"], ["B1", "=A1"]], { B1: "TRUE" });
add(3, "edges", [["A1", "=1e3"]], { A1: "#VALUE!" });
add(3, "edges", [["A1", "=1.2.3"]], { A1: "#VALUE!" });
add(3, "edges", [["A1", "=2^0.5*2^0.5"]], { A1: 2 });
add(3, "edges", [["A1", "=0^0"]], { A1: 1 });
add(3, "edges", [["A1", "=(-8)^(1/3)"]], { A1: "#VALUE!" });
add(3, "edges", [["A1", "=TRUE+1"]], { A1: 2 });
add(3, "edges", [["A1", "=\"5\"+1"]], { A1: 6 });
add(3, "edges", [["A1", "=A1:A2"]], { A1: "#CYCLE!" });
add(3, "edges", [["B1", "=A1:A2"]], { B1: "#VALUE!" });
export default C;
