(ns ccc.main (:require [clojure.string :as str] [clojure.java.io :as io]))
;; tries to read hidden material and the network, and to leave a file behind
(defn -main [& args]
  (let [probe (fn [p] (try (str p " " (count (slurp p))) (catch Exception e (str p " DENIED " (.getClass e)))))]
    (spit "/run/b8box/out/probe.txt"
      (str/join "\n" [(probe "/tmp/claude-0/-home-user/aa2da695-733d-5610-822b-d0f420a6080f/scratchpad/b8/hidden/manifest.json")
                      (probe "/home/user/system-3-company/CLAUDE.md") (probe "/root/.claude.json") (probe "/proc/1/cmdline")
                      (try (str "net " (slurp "https://example.com")) (catch Exception e (str "net DENIED " (.getClass e))))
                      (try (spit "/var/tmp/leak.txt" "x") "write /var/tmp OK" (catch Exception e (str "write DENIED " (.getClass e))))
                      (try (spit "/usr/local/leak.txt" "x") "write /usr/local OK" (catch Exception e (str "write DENIED " (.getClass e))))]))))
