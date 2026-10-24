# Benchmark 12: record the SQL of one SQLite test file in order, without running it. Stands in for tester.tcl and the
# sqlite3 Tcl extension: `sqlite3 db file` and `db eval/one/close`, execsql, catchsql, do_execsql_test,
# do_catchsql_test and do_test (whose bodies run, so their execsql calls are recorded). Every reopen or delete of the
# database starts a new segment (a fresh database). Output: one JSON-ish record per line on stdout:
#   RESET            a fresh database
#   SQL <tcl-list-escaped sql>
#   TEST <name> <expected as a Tcl list, when the test states one literally>
set ::seg 0
proc out {args} { puts [join $args " "] }
proc record_sql {sql} { out SQL [list $sql] }
proc reset_db {} { out RESET }
# the database command
proc dbcmd {name args} {
  set sub [lindex $args 0]
  switch -- $sub {
    eval - one - exists - onecolumn { record_sql [lindex $args 1]; return "" }
    close { return "" }
    default { return "" }
  }
}
proc sqlite3 {name args} { reset_db; interp alias {} $name {} dbcmd $name; return "" }
proc execsql {sql {db db}} { record_sql $sql; return "" }
proc catchsql {sql {db db}} { record_sql $sql; return {0 {}} }
proc do_execsql_test {name sql {expected ""}} { out TEST [list $name] [list $expected]; record_sql $sql }
proc do_catchsql_test {name sql {expected ""}} { out TEST [list $name] [list $expected]; record_sql $sql }
proc do_test {name body {expected ""}} { out TEST [list $name] [list $expected]; catch {uplevel 1 $body} }
proc do_eqp_test {args} {} ; proc do_timed_execsql_test {args} {}
proc ifcapable {expr code args} {
  # capabilities this build lacks (bench10/material/opts.txt)
  foreach c {wal load_ext shared_cache deprecated progress autoinit tclvar} { if {[string match "*$c*" $expr]} { if {[llength $args] >= 2} { uplevel 1 [lindex $args 1] }; return } }
  uplevel 1 $code
}
proc finish_test {} {} ; proc forcedelete {args} { reset_db } ; proc forcecopy {args} {} ; proc db_save {args} {} ; proc db_restore {args} {}
proc reset_db_cmd {} { reset_db }
proc capable {args} { return 1 } ; proc optimization_control {args} {} ; proc sqlite3_db_config {args} {} ; proc permutation {} { return "" }
proc do_test_suite {args} {} ; proc test_suite {args} {} ; proc faultsim_save_and_close {args} {} ; proc faultsim_restore_and_reopen {args} { reset_db }
proc unknown {args} { return "" }
set testdir [file dirname [lindex $argv 0]]
rename source _real_source
proc source {f} { if {[regexp {(tester|malloc_common|lock_common|wal_common|fts3_common|thread_common)\.tcl$} $f]} return ; catch {uplevel #0 [list _real_source $f]} }
sqlite3 db test.db
if {[catch {_real_source [lindex $argv 0]} err]} { out ERROR [list $err] }
