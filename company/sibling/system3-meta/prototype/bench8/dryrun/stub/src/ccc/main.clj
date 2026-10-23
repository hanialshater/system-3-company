(ns ccc.main
  "The driver (interface `driver`, the architect's): the contract's single-file and --batch modes."
  (:require [ccc.frontend.parser :as parser]
            [ccc.sema.lower :as lower]
            [ccc.backend.x86 :as x86]
            [clojure.java.io :as io]
            [clojure.string :as str])
  (:gen-class))

(defn compile-file [in out]
  (let [asm (-> (slurp in) parser/parse lower/lower x86/emit)]
    (spit out asm)))

(defn- one [in out]
  (try (compile-file in out) true
       (catch Throwable e
         (.delete (io/file out))
         (binding [*out* *err*] (println "ccc:" in ":" (.getMessage e)))
         false)))

(defn -main [& args]
  (let [args (vec args)
        batch (some #(when (= (nth args %) "--batch") (nth args (inc %) nil)) (range (count args)))]
    (if batch
      (do (doseq [l (str/split-lines (slurp batch)) :when (not (str/blank? l))]
            (let [[in out] (str/split (str/trim l) #"\s+")] (one in out)))
          (System/exit 0))
      (let [o (.indexOf args "-o")
            out (nth args (inc o))
            in (last (remove #{out "-o" "-I"} (remove #(= % (nth args (inc (.indexOf args "-I")) nil)) args)))]
        (System/exit (if (one in out) 0 1))))))
