import { useEffect, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Reads token values off the live document rather than restating them, so these
 * docs can never drift from tokens.css — and so they show the true value in
 * whichever theme the toolbar is set to.
 */
function useTokens(names: string[]): Record<string, string> {
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const read = () => {
      const style = getComputedStyle(document.documentElement);
      const next: Record<string, string> = {};
      for (const n of names) next[n] = style.getPropertyValue(n).trim();
      setValues(next);
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
    return () => observer.disconnect();
    // names is a literal array at every call site
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [names.join(',')]);

  return values;
}

const grid = (min: string): CSSProperties => ({
  display: 'grid',
  gridTemplateColumns: `repeat(auto-fit, minmax(${min}, 1fr))`,
  gap: 'var(--hub-space-3)',
});

export function Swatches({ tokens }: { tokens: [name: string, role: string][] }) {
  const values = useTokens(tokens.map(([n]) => n));
  return (
    <div style={grid('220px')}>
      {tokens.map(([name, role]) => (
        <div
          key={name}
          style={{
            display: 'flex', alignItems: 'center', gap: 'var(--hub-space-3)',
            background: 'var(--hub-color-surface)',
            border: '1px solid var(--hub-color-line)',
            borderRadius: 'var(--hub-radius-plate)',
            padding: 'var(--hub-space-3)',
          }}
        >
          <span
            style={{
              width: 40, height: 40, flex: 'none',
              background: `var(${name})`,
              border: '1px solid var(--hub-color-line)',
              borderRadius: 'var(--hub-radius-control)',
            }}
          />
          <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <span className="hub-label">{role}</span>
            <span className="hub-code hub-subtle" style={{ whiteSpace: 'nowrap' }}>
              {values[name] || name}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

const GLAZES = ['glacier', 'lichen', 'dusk', 'rhubarb', 'rye', 'clay'];
const CATEGORIES = ['Source', 'Transform', 'Logic', 'Model', 'Storage', 'Note'];

export function GlazeGrid() {
  const names = GLAZES.map((_, i) => `--hub-color-glaze-${i + 1}`);
  const values = useTokens(names);
  return (
    <div style={grid('150px')}>
      {GLAZES.map((glaze, i) => (
        <div
          key={glaze}
          style={{
            background: `var(--hub-color-glaze-${i + 1})`,
            color: 'var(--hub-color-ink-on-glaze)',
            borderRadius: 'var(--hub-radius-plate)',
            padding: 'var(--hub-space-3)',
            height: 108,
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}
        >
          <span className="hub-label">{glaze}</span>
          <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span className="hub-code" style={{ opacity: .8 }}>{values[names[i]]}</span>
            <span className="hub-caption" style={{ color: 'inherit', opacity: .6 }}>{CATEGORIES[i]}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

const SCALE: [step: string, css: string, tracking: string, use: string][] = [
  ['display-1', 'var(--hub-text-display-1)', 'var(--hub-tracking-display-1)', 'Page opener, one per screen'],
  ['display-2', 'var(--hub-text-display-2)', 'var(--hub-tracking-display-2)', 'Section heads'],
  ['title', 'var(--hub-text-title)', 'var(--hub-tracking-title)', 'Card and dialog titles'],
  ['subtitle', 'var(--hub-text-subtitle)', 'var(--hub-tracking-subtitle)', 'Group headings'],
  ['body', 'var(--hub-text-body)', 'normal', 'Running text, 66ch maximum'],
  ['body-sm', 'var(--hub-text-body-sm)', 'normal', 'Dense UI, table cells'],
  ['label', 'var(--hub-text-label)', 'var(--hub-tracking-label)', 'Buttons, tabs, form labels'],
  ['caption', 'var(--hub-text-caption)', 'normal', 'Helper and meta text'],
  ['code', 'var(--hub-text-code)', 'normal', 'JetBrains Mono only'],
];

export function TypeScale() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {SCALE.map(([step, font, tracking, use]) => (
        <div
          key={step}
          style={{
            display: 'flex', alignItems: 'baseline', gap: 'var(--hub-space-5)',
            padding: 'var(--hub-space-4) 0',
            borderBottom: '1px solid var(--hub-color-line)',
            flexWrap: 'wrap',
          }}
        >
          <span className="hub-code hub-subtle" style={{ width: 90, flex: 'none' }}>{step}</span>
          <span style={{ font, letterSpacing: tracking, flex: '1 1 auto', minWidth: 0 }}>
            Kaare Klint
          </span>
          <span className="hub-caption" style={{ flex: 'none' }}>{use}</span>
        </div>
      ))}
    </div>
  );
}

export function SpaceRamp() {
  const steps = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const names = steps.map((s) => `--hub-space-${s}`);
  const values = useTokens(names);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--hub-space-2)', flexWrap: 'wrap' }}>
      {steps.map((s, i) => (
        <span key={s} style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start' }}>
          <span
            style={{
              width: `var(--hub-space-${s})`,
              height: 16 + s * 4,
              background: 'var(--hub-color-action-soft)',
              border: '1px solid var(--hub-color-action)',
              borderRadius: 2,
              display: 'block',
            }}
          />
          <span className="hub-code hub-subtle">{values[names[i]]}</span>
        </span>
      ))}
    </div>
  );
}

export function Shapes() {
  const box: CSSProperties = {
    width: 72, height: 48, display: 'block',
    background: 'var(--hub-color-surface-sunken)',
    border: '1px solid var(--hub-color-line-strong)',
  };
  const items: [ReactNode, string][] = [
    [<span key="cell" style={{ ...box, borderRadius: 'var(--hub-radius-cell)' }} />, '0 cell in a sheet'],
    [<span key="c" style={{ ...box, borderRadius: 'var(--hub-radius-control)' }} />, '8px control'],
    [<span key="p" style={{ ...box, borderRadius: 'var(--hub-radius-sheet)' }} />, '14px sheet'],
    [<span key="s" style={{ ...box, width: 88, height: 28, borderRadius: 'var(--hub-radius-pill)' }} />, 'pill button, status'],
  ];
  return (
    <div className="hub-row" style={{ gap: 'var(--hub-space-5)', alignItems: 'flex-end' }}>
      {items.map(([node, label]) => (
        <span key={label} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {node}
          <span className="hub-code hub-subtle">{label}</span>
        </span>
      ))}
    </div>
  );
}
