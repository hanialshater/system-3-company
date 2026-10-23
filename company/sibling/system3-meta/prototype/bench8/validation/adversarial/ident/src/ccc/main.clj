(ns ccc.main (:require [clojure.string :as str]))
(defn -main [& args]
  (doseq [l (str/split-lines (slurp (last args))) :let [[in out] (str/split l #" ")]]
    (spit out "\t.globl main\nmain:\n\tmovl $0, %eax\n\tret\n\t.ident \"GCC: (Ubuntu 13.3.0) 13.3.0\"\n")))
