import { useId, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import './tabs.css';

export interface TabItem {
  id: string;
  /** Names the content, not the act of viewing it. "Runs", not "View runs". */
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  /** Uncontrolled starting tab. Defaults to the first enabled one. */
  defaultId?: string;
  /** Pass with onChange to control selection from outside. */
  value?: string;
  onChange?: (id: string) => void;
  /** Labels the tablist for screen readers when the surrounding heading does not. */
  label?: string;
}

export function Tabs({ items, defaultId, value, onChange, label }: TabsProps) {
  const uid = useId();
  const first = items.find((i) => !i.disabled)?.id ?? items[0]?.id ?? '';
  const [internal, setInternal] = useState(defaultId ?? first);
  const selected = value ?? internal;
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const select = (id: string) => {
    if (value === undefined) setInternal(id);
    onChange?.(id);
  };

  // Automatic activation: moving focus selects, which is the right trade-off
  // when panels are local and cheap to render.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const enabled = items.filter((i) => !i.disabled);
    if (enabled.length === 0) return;
    const at = enabled.findIndex((i) => i.id === selected);
    let next = -1;

    if (e.key === 'ArrowRight') next = (at + 1) % enabled.length;
    else if (e.key === 'ArrowLeft') next = (at - 1 + enabled.length) % enabled.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = enabled.length - 1;
    if (next < 0) return;

    e.preventDefault();
    const id = enabled[next].id;
    select(id);
    refs.current[id]?.focus();
  };

  const active = items.find((i) => i.id === selected) ?? items[0];

  return (
    <div className="hub-tabs">
      <div className="hub-tablist" role="tablist" aria-label={label} onKeyDown={onKeyDown}>
        {items.map((item) => {
          const isSelected = item.id === selected;
          return (
            <button
              key={item.id}
              ref={(el) => { refs.current[item.id] = el; }}
              type="button"
              role="tab"
              id={`${uid}-tab-${item.id}`}
              className="hub-tab"
              aria-selected={isSelected}
              aria-controls={`${uid}-panel-${item.id}`}
              tabIndex={isSelected ? 0 : -1}
              disabled={item.disabled}
              onClick={() => select(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {active ? (
        <div
          role="tabpanel"
          id={`${uid}-panel-${active.id}`}
          aria-labelledby={`${uid}-tab-${active.id}`}
          className="hub-tabpanel"
          tabIndex={0}
        >
          {active.content}
        </div>
      ) : null}
    </div>
  );
}
