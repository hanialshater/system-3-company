(ns ccc.sema.lower
  "Lowering (module semantics): AST to IR (stub: every function returns 0)."
  (:require [ccc.ir :as ir]))

(defn lower [unit]
  (vec (for [f (:items unit) :when (= :func (:kind f))] (ir/function (:name f) [(ir/ret 0)]))))
