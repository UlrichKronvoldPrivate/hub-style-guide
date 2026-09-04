import type { CSSProperties } from 'react';
import './bar-chart.css';

const BAR = 16;
const STEP = 24;
const PLOT_H = 120;

export interface BarChartProps {
  /** One value per bar. Nulls are missing data and draw nothing. */
  data: (number | null)[];
  /**
   * Sparse labels by bar index, e.g. `{ 0: '21 Aug', 13: 'Today' }`.
   * Rendered as HTML beneath the plot, never as SVG text.
   */
  labels?: Record<number, string>;
  /** The one mark that carries the point. Everything else recedes. */
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
      <svg
        className="hub-chart__plot"
        viewBox={`0 0 ${width} ${PLOT_H + 2}`}
        role="img"
        aria-label={ariaLabel}
      >
        <line
          className="hub-chart__axis"
          x1="0" y1={PLOT_H + 0.5} x2={width} y2={PLOT_H + 0.5}
        />
        {data.map((value, i) => {
          if (value === null) return null;
          const h = value === 0 ? 2 : Math.round((value / max) * PLOT_H);
          const cls = value === 0
            ? 'hub-chart__bar hub-chart__bar--zero'
            : i === accentIndex
              ? 'hub-chart__bar hub-chart__bar--accent'
              : 'hub-chart__bar';
          return (
            <rect key={i} className={cls} x={i * STEP} y={PLOT_H - h} width={BAR} height={h} />
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
