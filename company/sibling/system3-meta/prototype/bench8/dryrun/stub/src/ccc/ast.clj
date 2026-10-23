(ns ccc.ast
  "The AST (interface `ast`, the architect's). A translation unit is a vector of top-level nodes.")

(defn func [name params] {:kind :func :name name :params params})
(defn unit [items] {:kind :unit :items (vec items)})
