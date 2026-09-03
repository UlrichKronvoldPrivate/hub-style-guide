# Component recipes

Every component reads semantic or component tokens only. If a value has no
token, add one rather than inlining it.

## Button

Three variants and no more. Primary is the one action on the screen that the
page exists for; there is at most one per view.

```css
.hub-btn {
  font: var(--hub-text-label);
  letter-spacing: var(--hub-tracking-label);
  padding: var(--hub-button-pad);
  border-radius: var(--hub-button-radius);
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color var(--hub-duration-fast) var(--hub-ease),
              border-color var(--hub-duration-fast) var(--hub-ease);
}
.hub-btn--primary {
  background: var(--hub-button-primary-bg);
  color: var(--hub-button-primary-ink);
}
.hub-btn--ghost {
  background: transparent;
  color: var(--hub-button-ghost-ink);
  border-color: var(--hub-button-ghost-border);
}
.hub-btn--quiet {           /* text-only, for tertiary actions in dense UI */
  background: transparent;
  color: var(--hub-color-action);
  border-color: transparent;
  padding-inline: var(--hub-space-2);
}
.hub-btn--danger { background: var(--hub-color-danger); color: #fff; }
.hub-btn:disabled { opacity: .45; cursor: not-allowed; }
```

No icon-plus-arrow suffixes. The verb already says what happens.

## Input and field

```css
.hub-field { display: flex; flex-direction: column; gap: var(--hub-space-2); }
.hub-label { font: var(--hub-text-label); letter-spacing: var(--hub-tracking-label); }
.hub-input {
  font: var(--hub-text-body-sm);
  color: var(--hub-color-ink);
  background: var(--hub-input-bg);
  border: 1px solid var(--hub-input-border);
  border-radius: var(--hub-radius-control);
  padding: 9px var(--hub-space-3);
}
.hub-input::placeholder { color: var(--hub-input-ink-placeholder); }
.hub-input:focus-visible { border-color: var(--hub-input-border-focus); }
.hub-help { font: var(--hub-text-caption); color: var(--hub-color-ink-muted); }
.hub-field[data-invalid] .hub-input { border-color: var(--hub-color-danger); }
.hub-field[data-invalid] .hub-help { color: var(--hub-color-danger); }
```

Labels sit above their input, always visible. No placeholder-as-label. Helper
text is present from the start where a format is required, not revealed on
error.

## Plate

The one container. A plate is an object you could pick up.

```css
.hub-plate {
  background: var(--hub-plate-bg);
  border: 1px solid var(--hub-plate-border);
  border-radius: var(--hub-plate-radius);
  box-shadow: var(--hub-plate-shadow);
  padding: var(--hub-space-5);
}
.hub-plate--flat  { box-shadow: none; }                              /* hairline only */
.hub-plate--glaze { background: var(--hub-color-glaze-1);            /* flat field   */
                    border-color: transparent; box-shadow: none;
                    color: var(--hub-color-ink-on-glaze); }
```

Pick one separation per object type on a screen. A page where some cards are
lifted and others are glazed, for the same kind of content, is a mistake.

## Chip and status

Pills are for status only, never for buttons or filters that toggle.

```css
.hub-chip {
  display: inline-flex; align-items: center; gap: 6px;
  font: var(--hub-text-caption); font-weight: 600;
  padding: 3px 10px; border-radius: var(--hub-chip-radius);
  background: var(--hub-color-surface-sunken);
  color: var(--hub-color-ink-muted);
}
.hub-chip--ok    { background: var(--hub-color-success-soft); color: var(--hub-color-success); }
.hub-chip--warn  { background: var(--hub-color-warning-soft); color: var(--hub-color-warning); }
.hub-chip--fail  { background: var(--hub-color-danger-soft);  color: var(--hub-color-danger); }
```

State reads in form as well as colour — a dot, a shape, or the word itself, so
it survives a greyscale print and colour-blind vision.

## Table

```css
.hub-table { width: 100%; border-collapse: collapse; font: var(--hub-text-body-sm); }
.hub-table th {
  text-align: left; font: var(--hub-text-caption); font-weight: 600;
  color: var(--hub-color-ink-muted);
  padding: 12px var(--hub-space-4);
  border-bottom: 1px solid var(--hub-color-line);
  white-space: nowrap;
}
.hub-table td {
  padding: 12px var(--hub-space-4);
  border-bottom: 1px solid var(--hub-color-line);
}
.hub-table tbody tr:last-child td { border-bottom: 0; }
.hub-table .num { font-variant-numeric: tabular-nums; text-align: right; }
```

No zebra striping — the hairline already separates rows. Numeric columns are
right-aligned and tabular. Wrap wide tables in a container with
`overflow-x: auto` so the page body never scrolls sideways.

## Empty state

An empty screen is an invitation to act, not a shrug. A glaze field, one line
saying what will live here, one action.

```html
<div class="hub-plate hub-plate--glaze">
  <p class="hub-title">No graphs yet</p>
  <p>A graph connects a data source to whatever reads it. Start with a source.</p>
  <button class="hub-btn hub-btn--primary">Add a source</button>
</div>
```

No illustration, no apology, no "Oops".

## Error state

Errors explain what went wrong and how to fix it, in the interface's voice.
Never an apology, never vague.

```html
<div class="hub-plate hub-plate--flat" data-tone="danger">
  <p class="hub-label">Statbank did not respond</p>
  <p>The request timed out after 30 seconds. The table may be large — try a
     narrower region filter, or retry.</p>
  <button class="hub-btn hub-btn--ghost">Retry</button>
</div>
```

## Page shell

```
header   60px, sticky, hairline underneath, ground background
main     max-width 1080px, padding-inline var(--hub-space-5)
section  padding-top var(--hub-space-9), opens with a hairline + heading row
```

The section heading row pairs the heading with something true on the right —
a token namespace, a count, a timestamp. Not a decorative label.
