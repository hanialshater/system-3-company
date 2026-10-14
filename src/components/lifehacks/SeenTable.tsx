"use client";

// Life Hacks engines v2 (W-608): the "Seen" table. One column per compared mode (plus "Yours" where the
// family has an exploration control). A column fills the first time its mode is pressed and is never
// cleared; the column in effect gets a bold header and a ▸ marker as a second cue besides the button.

import t from "./SeenTable.module.css";

export interface SeenColumn { head: string; current: boolean }
export interface SeenRow { label: string; cells: string[] }

export function SeenTable({ columns, rows, label, labelWidth = "34%" }: { columns: SeenColumn[]; rows: SeenRow[]; label: string; labelWidth?: string }) {
  return <table className={t.table} aria-label={label} data-seen-table="">
    <colgroup><col style={{ width: labelWidth }} />{columns.map((c) => <col key={c.head} />)}</colgroup>
    <thead><tr><td />{columns.map((c) => <th scope="col" key={c.head} className={c.current ? t.current : undefined}>
      {c.current && <span aria-hidden="true">▸ </span>}{c.head}{c.current && <span className={t.sr}> (showing)</span>}
    </th>)}</tr></thead>
    <tbody>{rows.map((r) => <tr key={r.label}><th scope="row">{r.label}</th>
      {r.cells.map((cell, i) => <td key={i} className={columns[i]?.current ? t.current : undefined}>{cell}</td>)}</tr>)}</tbody>
  </table>;
}
