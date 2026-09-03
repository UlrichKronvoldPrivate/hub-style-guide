import { useEffect, useId, useRef } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import './dialog.css';

export interface DialogProps {
  open: boolean;
  /** Names the decision, and names the thing. "Delete \"Population by region\"?" */
  title: string;
  /** What happens and what it costs. Never "Are you sure?". */
  children: ReactNode;
  /** The action row. Primary first, matching every other row in the system. */
  actions: ReactNode;
  /** Called on Esc, on a backdrop click, and whenever the dialog closes. */
  onClose: () => void;
  /**
   * Whether a backdrop click dismisses. Turn it off for a decision worth a
   * deliberate answer, such as deleting something. Esc always works.
   */
  dismissible?: boolean;
}

export function Dialog({ open, title, children, actions, onClose, dismissible = true }: DialogProps) {
  const id = useId();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  // Padding sits on the inner wrapper, so a click on the dialog element itself
  // can only have landed on the backdrop.
  const handleClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (dismissible && e.target === ref.current) onClose();
  };

  return (
    <dialog
      ref={ref}
      className="hub-dialog"
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-text`}
      onClose={onClose}
      onClick={handleClick}
    >
      <div className="hub-dialog__inner">
        <h2 className="hub-dialog__title" id={`${id}-title`}>{title}</h2>
        <div className="hub-dialog__text" id={`${id}-text`}>{children}</div>
        <div className="hub-dialog__actions">{actions}</div>
      </div>
    </dialog>
  );
}
