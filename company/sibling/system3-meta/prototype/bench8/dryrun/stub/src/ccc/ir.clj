(ns ccc.ir
  "The IR (interface `ir`, the architect's): a program is a vector of functions, each a vector of instructions.")

(defn function [name insts] {:name name :insts (vec insts)})
(defn ret [v] [:ret v])
