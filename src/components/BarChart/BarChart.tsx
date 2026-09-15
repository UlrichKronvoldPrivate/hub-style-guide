import type { CSSProperties } from 'react';
import './bar-chart.css';

const BAR = 22;
const STEP = 30;
const PLOT_H = 140;
const DASH = 3;

export interface BarChartProps {
  /** One value per column. Nulls are missing data and draw no dash. */
  data: (number | null)[];
  /**
   * Sparse labels by column index, e.g. `{ 0: 'Mon', 6: 'Sun' }`.
   * Rendered as HTML beneath the plot, never as SVG text.
   */
  labels?: Record<number, string>;
  /** The one mark that carries the point. Everything else stays ink. */
  accentIndex?: number;
  /**
   * Describes the shape and the outliers for anyone who cannot see it.
   * Required — a chart with no text alternative is not finished.
   */
  ariaLabel: string;
}

export function BarChart({ data, labels = {}, accentIndex, ariaLabel }: BarChartProps) {
  const width = data.length * STEP - (STEP - BAR);
  const max = Math.max(1, ...data.map((v) => v ?? 0));
  const style = { gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))` } as CSSProperties;

  return (
    <div className="hub-chart">
      <svg className="hub-chart__plot" viewBox={`0 0 ${width} ${PLOT_H}`} role="img" aria-label={ariaLabel}>
        {data.map((value, i) => {
          const x = i * STEP;
          const accent = i === accentIndex;
          const y = value === null ? null : PLOT_H - DASH - Math.round(((value) / max) * (PLOT_H - DASH));
          return (
            <g key={i}>
              <rect
                className={accent ? 'hub-chart__band hub-chart__band--accent' : 'hub-chart__band'}
                x={x} y="0" width={BAR} height={PLOT_H} rx="6"
              />
              {y === null ? null : (
                <rect
                  className={[
                    'hub-chart__dash',
                    accent ? 'hub-chart__dash--accent' : null,
                    value === 0 ? 'hub-chart__dash--zero' : null,
                  ].filter(Boolean).join(' ')}
                  x={x + 3} y={y} width={BAR - 6} height={DASH} rx="1.5"
                />
              )}
            </g>
          );
        })}
      </svg>

      <div className="hub-chart__labels" style={style} aria-hidden="true">
        {Object.entries(labels).map(([index, text]) => (
          <span key={index} style={{ gridColumn: Number(index) + 1 }}>{text}</span>
        ))}
      </div>
    </div>
  );
}
