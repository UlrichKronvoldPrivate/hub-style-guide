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

export function EmptyState({ title, body, action, glaze = 2 }: EmptyStateProps) {
  return (
    <Plate variant="glaze" glaze={glaze} style={{ maxWidth: '52ch' }}>
      <p className="hub-subtitle">{title}</p>
      <p className="hub-body-sm">{body}</p>
      {action}
    </Plate>
  );
}
