import type { CSSProperties } from 'react';
import './stat-row.css';

export interface Stat {
  /** What is being counted, in the reader's words. */
  label: string;
  /** Pre-formatted for the locale — the component does not format. */
  value: string;
  /** What the figure is measured against. A number with no frame is trivia. */
  note?: string;
  /**
   * Takes flare. At most one per row, and only when the figure asks someone to
   * do something — flare appears once on a screen, or not at all.
   */
  attention?: boolean;
}

export function StatRow({ stats }: { stats: Stat[] }) {
  const style = { '--hub-stats-count': stats.length } as CSSProperties;

  return (
    <div className="hub-stats" style={style}>
      {stats.map((s) => (
        <div
          key={s.label}
          className={['hub-stat', s.attention ? 'hub-stat--attention' : null]
            .filter(Boolean).join(' ')}
        >
          <span className="hub-stat__label">{s.label}</span>
          <span className="hub-stat__value">{s.value}</span>
          {s.note ? <span className="hub-stat__note">{s.note}</span> : null}
        </div>
      ))}
    </div>
  );
}
