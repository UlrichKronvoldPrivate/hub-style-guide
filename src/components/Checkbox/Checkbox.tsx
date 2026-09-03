import { useEffect, useId, useRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import './checkbox.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'> {
  /** Names the choice, in sentence case. Not "Enable X" — just "X". */
  label: string;
  /** One line on what choosing this actually does, where that is not obvious. */
  help?: string;
  /**
   * A third state, not a weaker checked — use it on a "select all" that governs
   * a partly-selected list. Set through the DOM property, which is why it needs a ref.
   */
  indeterminate?: boolean;
}

export function Checkbox({ label, help, indeterminate = false, className, ...rest }: CheckboxProps) {
  const id = useId();
  const helpId = help ? `${id}-help` : undefined;
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <div className={['hub-checkbox', className].filter(Boolean).join(' ')}>
      <input
        ref={ref}
        id={id}
        type="checkbox"
        className="hub-checkbox__box"
        aria-describedby={helpId}
        {...rest}
      />
      <span className="hub-checkbox__text">
        <label className="hub-checkbox__label" htmlFor={id}>{label}</label>
        {help ? <p className="hub-checkbox__help" id={helpId}>{help}</p> : null}
      </span>
    </div>
  );
}
