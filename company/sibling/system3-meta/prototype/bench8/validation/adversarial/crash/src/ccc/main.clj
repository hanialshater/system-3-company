(ns ccc.main (:require [clojure.string :as str]))
;; validation: writes a stub .s, but the JVM dies (exit 3) on every input whose name ends in 0.c (t0010.c, t0020.c, ...)
(defn -main [& args]
  (doseq [l (str/split-lines (slurp (last args))) :let [[in out] (str/split l #" ")]]
    (when (str/ends-with? in "0.c") (System/exit 3))
    (spit out "\t.globl main\nmain:\n\tmovl $0, %eax\n\tret\n")))
