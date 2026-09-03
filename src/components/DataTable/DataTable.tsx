import type { ReactNode } from 'react';
import './data-table.css';

export interface Column {
  key: string;
  label: string;
  /** Right-aligns and sets tabular figures. Use for anything countable. */
  numeric?: boolean;
  /** Sets JetBrains Mono. Only where characters must line up: IDs, codes, hashes. */
  mono?: boolean;
}

export type Row = Record<string, ReactNode>;

export interface DataTableProps {
  columns: Column[];
  rows: Row[];
  /** Says where the numbers come from. Every table of real figures needs one. */
  caption?: string;
}

export function DataTable({ columns, rows, caption }: DataTableProps) {
  return (
    <div className="hub-table-scroll">
      <table className="hub-table">
        {caption ? <caption className="hub-table__caption">{caption}</caption> : null}
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} scope="col" className={c.numeric ? 'is-num' : undefined}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {columns.map((c) => (
                <td
                  key={c.key}
                  className={[c.numeric ? 'is-num' : null, c.mono ? 'is-mono' : null]
                    .filter(Boolean).join(' ') || undefined}
                >
                  {row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
