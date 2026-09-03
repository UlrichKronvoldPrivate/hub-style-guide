import { useId } from 'react';
import type { SelectHTMLAttributes } from 'react';
import '../Field/field.css';
import './select.css';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id' | 'children'> {
  /** Always visible, above the control. Never a placeholder standing in for a label. */
  label: string;
  options: SelectOption[];
  /** Shown as the first option when nothing is chosen yet. Names the choice, not the act. */
  placeholder?: string;
  help?: string;
  invalid?: boolean;
}

export function Select({ label, options, placeholder, help, invalid, className, ...rest }: SelectProps) {
  const id = useId();
  const helpId = help ? `${id}-help` : undefined;

  return (
    <div className={['hub-field', className].filter(Boolean).join(' ')} data-invalid={invalid || undefined}>
      <label className="hub-field__label" htmlFor={id}>{label}</label>
      <span className="hub-select-shell">
        <select
          id={id}
          className="hub-select"
          aria-describedby={helpId}
          aria-invalid={invalid || undefined}
          defaultValue={placeholder && rest.value === undefined && rest.defaultValue === undefined ? '' : undefined}
          {...rest}
        >
          {placeholder ? <option value="" disabled>{placeholder}</option> : null}
          {options.map((o) => (
            <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>
          ))}
        </select>
      </span>
      {help ? <p className="hub-field__help" id={helpId}>{help}</p> : null}
    </div>
  );
}
