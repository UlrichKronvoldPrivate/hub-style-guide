import type { ReactNode } from 'react';
import { Button } from '../Button/Button';
import './toast.css';

export type ToastTone = 'neutral' | 'success' | 'warning' | 'danger';

export type ToastPosition = 'bottom-center' | 'bottom-right' | 'top-center' | 'top-right';

export interface ToastProps {
  /** Warning and danger persist until dismissed; neutral and success time out. */
  tone?: ToastTone;
  /**
   * Names the outcome in the same words as the action that caused it:
   * "Publish" produces "Published". Never "Success!".
   */
  children: ReactNode;
  /** At most one, and only where there is something to undo or go to. */
  action?: ReactNode;
  onDismiss?: () => void;
}

export function Toast({ tone = 'neutral', children, action, onDismiss }: ToastProps) {
  // Warnings and errors interrupt; confirmations wait their turn.
  const assertive = tone === 'warning' || tone === 'danger';

  return (
    <div className="hub-toast" data-tone={tone} role={assertive ? 'alert' : 'status'}>
      <p className="hub-toast__message">{children}</p>
      {action || onDismiss ? (
        <span className="hub-toast__actions">
          {action}
          {onDismiss ? (
            <Button variant="quiet" onClick={onDismiss}>Dismiss</Button>
          ) : null}
        </span>
      ) : null}
    </div>
  );
}

export interface ToastRegionProps {
  position?: ToastPosition;
  children?: ReactNode;
}

/**
 * Always rendered, even with nothing in it, so a screen reader is already
 * watching the region when the first toast arrives.
 */
export function ToastRegion({ position = 'bottom-center', children }: ToastRegionProps) {
  return (
    <div className="hub-toast-region" data-position={position}>
      {children}
    </div>
  );
}
