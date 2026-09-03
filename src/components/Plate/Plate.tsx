import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import './plate.css';

export type PlateVariant = 'lifted' | 'flat' | 'glaze';
export type PlateTone = 'success' | 'warning' | 'danger';
export type Glaze = 1 | 2 | 3 | 4 | 5 | 6;

export interface PlateProps extends HTMLAttributes<HTMLDivElement> {
  /** How this plate separates from the ground: by lift, by hairline, or by material. */
  variant?: PlateVariant;
  /** Which glaze fills the plate. Only meaningful when variant is "glaze". */
  glaze?: Glaze;
  /** A semantic edge for state. Never used to carry emphasis. */
  tone?: PlateTone;
  children: ReactNode;
}

export function Plate({ variant = 'lifted', glaze = 1, tone, className, style, children, ...rest }: PlateProps) {
  const classes = [
    'hub-plate',
    variant !== 'lifted' ? `hub-plate--${variant}` : null,
    className,
  ].filter(Boolean).join(' ');

  const glazeStyle: CSSProperties | undefined = variant === 'glaze'
    ? ({ ...style, '--hub-glaze': `var(--hub-color-glaze-${glaze})` } as CSSProperties)
    : style;

  return (
    <div className={classes} data-tone={tone} style={glazeStyle} {...rest}>
      {children}
    </div>
  );
}
