import { createContext, useCallback, useContext, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Toast, ToastRegion } from './Toast';
import type { ToastPosition, ToastTone } from './Toast';

export interface ToastInput {
  message: ReactNode;
  tone?: ToastTone;
  action?: ReactNode;
  /** Overrides the default timeout. Ignored for warning and danger. */
  duration?: number;
}

type ToastRecord = ToastInput & { id: number };

const ToastContext = createContext<((toast: ToastInput) => void) | null>(null);

/** Confirmations are gone before they are in the way; problems are not. */
const DEFAULT_DURATION = 5000;

export interface ToastProviderProps {
  children: ReactNode;
  position?: ToastPosition;
}

export function ToastProvider({ children, position = 'bottom-center' }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  const push = useCallback((toast: ToastInput) => {
    const id = nextId.current++;
    setToasts((current) => [...current, { ...toast, id }]);

    // A warning or an error stays until someone has dealt with it. Timing out
    // the only account of what went wrong is how a problem gets missed.
    const persists = toast.tone === 'warning' || toast.tone === 'danger';
    if (!persists) {
      window.setTimeout(() => dismiss(id), toast.duration ?? DEFAULT_DURATION);
    }
  }, [dismiss]);

  return (
    <ToastContext.Provider value={push}>
      {children}
      <ToastRegion position={position}>
        {toasts.map((t) => (
          <Toast key={t.id} tone={t.tone} action={t.action} onDismiss={() => dismiss(t.id)}>
            {t.message}
          </Toast>
        ))}
      </ToastRegion>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const push = useContext(ToastContext);
  if (!push) throw new Error('useToast needs a <ToastProvider> above it in the tree.');
  return push;
}
