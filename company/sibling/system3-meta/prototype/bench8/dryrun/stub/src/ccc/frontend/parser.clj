(ns ccc.frontend.parser
  "The parser (module frontend): a stub that finds the function definitions at file scope."
  (:require [ccc.frontend.lexer :as lexer]
            [ccc.ast :as ast]))

(defn parse [src]
  (loop [ts (vec (lexer/lex src)) i 0 depth 0 out []]
    (if (>= i (count ts))
      (ast/unit out)
      (let [t (ts i)]
        (cond
          (= t "{") (recur ts (inc i) (inc depth) out)
          (= t "}") (recur ts (inc i) (dec depth) out)
          (and (zero? depth) (re-matches #"[A-Za-z_]\w*" t) (= "(" (get ts (inc i))))
          (let [close (loop [j (+ i 2) d 1] (cond (>= j (count ts)) j (= (ts j) "(") (recur (inc j) (inc d)) (= (ts j) ")") (if (= d 1) j (recur (inc j) (dec d))) :else (recur (inc j) d)))]
            (if (= "{" (get ts (inc close)))
              (recur ts (inc close) depth (conj out (ast/func t [])))
              (recur ts (inc close) depth out)))
          :else (recur ts (inc i) depth out))))))
