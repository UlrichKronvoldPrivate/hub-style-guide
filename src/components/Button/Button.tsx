import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './button.css';

export type ButtonVariant = 'primary' | 'ghost' | 'quiet' | 'danger';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Primary is the one action the screen exists for. At most one per view. */
  variant?: ButtonVariant;
  children: ReactNode;
}

export function Button({ variant = 'ghost', className, children, ...rest }: ButtonProps) {
  const classes = ['hub-btn', `hub-btn--${variant}`, className].filter(Boolean).join(' ');
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
