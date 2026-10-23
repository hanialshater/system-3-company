# Module map (interface module-map, the architect's)

| Namespace | File | Owner | Exports |
|---|---|---|---|
| ccc.main | src/ccc/main.clj | architect | -main (single file, --batch) |
| ccc.ast | src/ccc/ast.clj | architect | the AST constructors |
| ccc.ir | src/ccc/ir.clj | architect | the IR constructors |
| ccc.frontend.lexer | src/ccc/frontend/lexer.clj | frontend | lex |
| ccc.frontend.parser | src/ccc/frontend/parser.clj | frontend | parse |
| ccc.sema.lower | src/ccc/sema/lower.clj | semantics | lower |
| ccc.backend.x86 | src/ccc/backend/x86.clj | backend | emit |
