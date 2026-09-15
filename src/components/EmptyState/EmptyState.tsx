import type { ReactNode } from 'react';
import { Plate } from '../Plate/Plate';
import type { Glaze } from '../Plate/Plate';

export interface EmptyStateProps {
  /** What is missing, named as a thing rather than as an absence. */
  title: string;
  /** What will live here and why it is worth adding. One or two sentences. */
  body: string;
  /** Exactly one way to start. An empty screen with no action is a dead end. */
  action?: ReactNode;
  glaze?: Glaze;
}

export function EmptyState({ title, body, action, glaze }: EmptyStateProps) {
  // Sunken paper by default; a glaze only when the caller names one.
  return (
    <Plate variant={glaze ? 'glaze' : 'flat'} glaze={glaze ?? 1} style={{ maxWidth: '52ch' }}>
      <p className="hub-subtitle">{title}</p>
      <p className="hub-body-sm">{body}</p>
      {action}
    </Plate>
  );
}
