import type { HTMLAttributes, ReactNode } from 'react';
import './chip.css';

export type ChipStatus = 'neutral' | 'ok' | 'warn' | 'fail';

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  status?: ChipStatus;
  children: ReactNode;
}

export function Chip({ status = 'neutral', className, children, ...rest }: ChipProps) {
  return (
    <span className={['hub-chip', `hub-chip--${status}`, className].filter(Boolean).join(' ')} {...rest}>
      <span className="hub-chip__dot" aria-hidden="true" />
      {children}
    </span>
  );
}
