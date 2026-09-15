import type { CSSProperties } from 'react';
import { Icon } from '../Icon/Icon';
import './stat-row.css';

export interface Stat {
  /** What is being counted, in the reader's words. */
  label: string;
  /** Pre-formatted for the locale — the component does not format. */
  value: string;
  /** How it moved, and against what: "+6 vs yesterday". A number with no frame is trivia. */
  note?: string;
  /** A Boxicons name without the prefix, e.g. "time-five". Shown in a disc. */
  icon?: string;
  /** 0–1. Draws the arc gauge; the figure sits beneath it. */
  gauge?: number;
  /** The figure a page leads with. At most one. */
  hero?: boolean;
  /**
   * Colours the figure with the danger tone. At most one per row, and only
   * when the figure asks someone to do something.
   */
  attention?: boolean;
}

/* Semicircle, centre (60,60), radius 48, drawn over the top from left to right. */
function arcEnd(fraction: number) {
  const f = Math.max(0, Math.min(1, fraction));
  const theta = Math.PI * (1 - f);
  return { x: 60 + 48 * Math.cos(theta), y: 60 - 48 * Math.sin(theta) };
}

function Gauge({ fraction, value }: { fraction: number; value: string }) {
  const end = arcEnd(fraction);
  const arc = `M12 60A48 48 0 0 1 ${end.x.toFixed(1)} ${end.y.toFixed(1)}`;
  return (
    <div className="hub-stat__gauge">
      <svg viewBox="0 0 120 68" aria-hidden="true">
        <path className="hub-stat__track" d="M12 60A48 48 0 0 1 108 60" />
        <path className="hub-stat__arc" d={arc} />
        <circle className="hub-stat__cap" cx="12" cy="60" r="3" />
        <circle className="hub-stat__cap" cx="108" cy="60" r="3" />
        <circle className="hub-stat__needle" cx={end.x.toFixed(1)} cy={end.y.toFixed(1)} r="4" />
      </svg>
      <span className="hub-stat__value">{value}</span>
    </div>
  );
}

export function StatRow({ stats }: { stats: Stat[] }) {
  const style = { '--hub-stats-count': stats.length } as CSSProperties;

  return (
    <div className="hub-stats" style={style}>
      {stats.map((s) => (
        <div
          key={s.label}
          className={[
            'hub-stat',
            s.attention ? 'hub-stat--attention' : null,
            s.hero ? 'hub-stat--hero' : null,
          ].filter(Boolean).join(' ')}
        >
          <div className="hub-stat__head">
            <div>
              <span className="hub-stat__label">{s.label}</span>
              {s.note ? <span className="hub-stat__note">{s.note}</span> : null}
            </div>
            {s.icon ? <span className="hub-stat__icon"><Icon name={s.icon} /></span> : null}
          </div>
          {typeof s.gauge === 'number'
            ? <Gauge fraction={s.gauge} value={s.value} />
            : <span className="hub-stat__value">{s.value}</span>}
        </div>
      ))}
    </div>
  );
}
