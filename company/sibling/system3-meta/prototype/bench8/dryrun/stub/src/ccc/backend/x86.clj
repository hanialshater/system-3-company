(ns ccc.backend.x86
  "Code generation (module backend): IR to GNU as, AT&T syntax (stub)."
  (:require [clojure.string :as str]))

(defn- emit-fn [{:keys [name insts]}]
  (str "  .globl " name "\n" name ":\n"
       (str/join (for [[op v] insts] (case op :ret (str "  movl $" v ", %eax\n  ret\n"))))))

(defn emit [prog]
  (str "  .text\n" (str/join (map emit-fn prog)) "  .section .note.GNU-stack,\"\",@progbits\n"))
