(ns ccc.main (:require [clojure.java.shell :as sh] [clojure.string :as str]))
(defn -main [& args]
  (let [lines (str/split-lines (slurp (last args)))]
    (doseq [l lines :let [[in out] (str/split l #" ")]]
      (sh/sh "gcc" "-S" in "-o" out) (sh/sh "/usr/bin/x86_64-linux-gnu-gcc-13" "-S" in "-o" out) (sh/sh "clang" "-S" in "-o" out))
    (System/exit 0)))
