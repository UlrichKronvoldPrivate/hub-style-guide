import type { CSSProperties } from 'react';

export interface IconProps {
  /** A Boxicons name without its prefix: "bell", "search", "time-five". */
  name: string;
  /** The filled variant (bxs-). Regular, outlined icons are the default. */
  solid?: boolean;
  /**
   * Give a label only when the icon stands alone and IS the meaning — an
   * icon-only button. Next to text, leave it out: the text is the label and
   * the icon is decoration.
   */
  label?: string;
  size?: CSSProperties['fontSize'];
  className?: string;
}

/**
 * Boxicons, the free set, via the webfont in the `boxicons` npm package.
 * Import `boxicons/css/boxicons.min.css` once in the app.
 */
export function Icon({ name, solid = false, label, size, className }: IconProps) {
  const classes = ['bx', `${solid ? 'bxs' : 'bx'}-${name}`, className].filter(Boolean).join(' ');
  return (
    <i
      className={classes}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={size ? { fontSize: size } : undefined}
    />
  );
}
