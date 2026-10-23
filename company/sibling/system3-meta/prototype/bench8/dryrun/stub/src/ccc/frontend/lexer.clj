(ns ccc.frontend.lexer
  "The lexer (module frontend): identifiers, numbers, strings and punctuation; preprocessor lines skipped (stub).")

(defn lex [src]
  (let [src (clojure.string/replace src #"(?m)^\s*#.*$" "")
        src (clojure.string/replace src #"(?s)/\*.*?\*/|//[^\n]*" " ")]
    (re-seq #"[A-Za-z_]\w*|\d+|\"(?:[^\"\\]|\\.)*\"|'(?:[^'\\]|\\.)*'|[{}()\[\];,]|[^\s\w]" src)))
