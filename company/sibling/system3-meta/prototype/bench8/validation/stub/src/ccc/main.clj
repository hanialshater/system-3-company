(ns ccc.main
  (:require [clojure.string :as str]))
;; Benchmark 8 stub: the null compiler. Every program becomes `int main(void) { return 0; }`.
(def asm "\t.text\n\t.globl main\nmain:\n\txorl %eax, %eax\n\tret\n\t.section .note.GNU-stack,\"\",@progbits\n")
(defn compile-file [in out] (slurp in) (spit out asm))
(defn -main [& args]
  (let [args (vec args)
        args (loop [a args acc []] (cond (empty? a) acc (= "-I" (first a)) (recur (drop 2 a) acc) :else (recur (rest a) (conj acc (first a)))))]
    (if (= "--batch" (first args))
      (doseq [line (str/split-lines (slurp (second args))) :when (not (str/blank? line))]
        (let [[in out] (str/split (str/trim line) #"\s+")]
          (try (compile-file in out) (catch Exception e (binding [*out* *err*] (println "error:" in (.getMessage e)))))))
      (let [[in _ out] args] (compile-file in out)))))
