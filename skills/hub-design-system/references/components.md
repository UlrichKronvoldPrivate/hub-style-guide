# Component recipes

Every component reads semantic or component tokens only. If a value has no
token, add one rather than inlining it. There are no shadows and no gradients
in any recipe below.

## Button

Pills. Four variants and no more. **Primary is the ink block** — the one
action the screen exists for, the darkest thing on it, at most one per view.
The action colour is not a button fill.

```css
.hub-btn {
  font: var(--hub-text-label);
  padding: var(--hub-button-pad);
  border-radius: var(--hub-button-radius);   /* pill */
  border: 1px solid transparent;
  display: inline-flex; align-items: center; gap: var(--hub-space-2);
  cursor: pointer;
}
.hub-btn--primary { background: var(--hub-button-primary-bg); color: var(--hub-button-primary-ink); }
.hub-btn--ghost   { background: var(--hub-button-ghost-bg); border-color: var(--hub-button-ghost-border); }
.hub-btn--quiet   { background: transparent; color: var(--hub-button-quiet-ink); padding-inline: var(--hub-space-2); }
.hub-btn--danger  { background: var(--hub-color-danger); color: var(--hub-color-ink-on-action); }
/* a round icon button: bell, messages, "more". needs aria-label. */
.hub-btn--round   { width: 38px; height: 38px; padding: 0; border-radius: 50%;
                    background: var(--hub-button-ghost-bg); border-color: var(--hub-button-ghost-border); }
```

No arrow suffixes. The verb already says what happens.

## Icon

Boxicons, the free set (`boxicons` on npm). Import
`boxicons/css/boxicons.min.css` once.

```html
<!-- beside text: decoration -->
<button class="hub-btn hub-btn--primary"><i class="bx bx-upload" aria-hidden="true"></i>New upload</button>
<!-- alone: a control, so it has a name -->
<button class="hub-btn hub-btn--round" aria-label="Notifications"><i class="bx bx-bell" aria-hidden="true"></i></button>
<!-- in a disc, on a KPI cell or a list row -->
<span class="hub-disc"><i class="bx bx-time-five" aria-hidden="true"></i></span>
```

```css
.hub-disc {
  width: 36px; height: 36px; border-radius: 50%;
  background: var(--hub-icon-disc-bg); border: 1px solid var(--hub-icon-disc-border);
  display: grid; place-content: center; color: var(--hub-color-ink);
}
```

Regular (outlined) by default; `bxs-` solid only for a filled state. One
vocabulary per app.

## Field and select

Sunken paper with a hairline; focus is the action colour.

```css
.hub-input, .hub-select {
  font: var(--hub-text-body-sm); color: var(--hub-color-ink);
  background: var(--hub-input-bg);
  border: 1px solid var(--hub-input-border);
  border-radius: var(--hub-radius-control);
  padding: 9px var(--hub-space-3);
}
.hub-input:focus-visible { border-color: var(--hub-input-border-focus); }
```

Labels sit above their input, always visible. Helper text is present from the
start where a format is required. A `<select>` stays native; only the shell is
ours, with a chevron drawn from a rotated border corner.

## Checkbox

The input **is** the box: `appearance: none` on the real element, 6px radius,
ink fill when checked. Indeterminate is a bar, not a faded tick. A checkbox
labels a choice, so its label takes `body-sm`; the 500-weight `label` step
belongs on the `<legend>` above a group.

## Tabs

The ARIA pattern in full: `role="tablist"` / `tab` / `tabpanel`, roving
tabindex, arrow keys, Home and End, automatic activation. The indicator is a
2px ink underline sitting on the tablist hairline — the selected tab is drawn
joined to its panel.

## Plate

The standalone container: paper, a hairline, 14px corners. **Inside a sheet,
do not use plates** — use regions divided by hairlines (`.hub-region` in
`layout.css`). A plate is for the case where something genuinely stands alone
on the ground: a dialog, a toast, a component in isolation.

```css
.hub-plate { background: var(--hub-plate-bg); border: 1px solid var(--hub-plate-border);
             border-radius: var(--hub-plate-radius); padding: var(--hub-space-5); }
.hub-plate--flat  { background: var(--hub-color-surface-sunken); border-color: transparent; }  /* a well */
```

## Stat cell

The summary at the top of a dashboard: one instrument, N cells that touch.

```css
.hub-stats { display: grid; grid-template-columns: repeat(var(--hub-stats-count, 4), minmax(0, 1fr)); }
.hub-stat  { padding: var(--hub-space-4) var(--hub-space-5); border-right: 1px solid var(--hub-color-line); }
.hub-stat:last-child { border-right: 0; }
.hub-stat__label { font: var(--hub-text-subtitle); font-size: 1rem; }
.hub-stat__note  { font: var(--hub-text-caption); color: var(--hub-color-ink-muted); }   /* "+6 vs yesterday" */
.hub-stat__value { font: var(--hub-text-figure); letter-spacing: var(--hub-tracking-figure); }
.hub-stat--attention .hub-stat__value { color: var(--hub-color-danger); }
```

The gauge: a semicircle, centre (60,60), radius 48, in a 120×68 viewBox — a
10px track in `--hub-gauge-track`, a 2px arc in `--hub-gauge-arc` to the
fraction, 3px end dots, a 4px needle ring. The value sits beneath it at
`figure` size. The note goes under the label, not the number. At most one cell
per row takes colour, and only when the figure asks for action.

## Chip and status

Pills, soft fill, tone text. Status only, never a button or a filter toggle.
The dot changes shape with the status so state survives greyscale.

```css
.hub-chip { font: var(--hub-text-caption); font-weight: 500; padding: 4px 10px;
            border-radius: var(--hub-chip-radius); background: var(--hub-color-surface-sunken); }
.hub-chip--ok   { background: var(--hub-color-success-soft); color: var(--hub-color-success); }
.hub-chip--info { background: var(--hub-color-info-soft);    color: var(--hub-color-info); }
.hub-chip--warn { background: var(--hub-color-warning-soft); color: var(--hub-color-warning); }
.hub-chip--fail { background: var(--hub-color-danger-soft);  color: var(--hub-color-danger); }
```

## Dialog

Native `<dialog>` with `showModal()`: focus trap, Esc, top layer and inert
background come from the platform. A sheet over a scrim — paper, hairline,
14px, no shadow. Padding on an inner wrapper so a backdrop click is
unambiguous. Title names the decision and the thing; actions are primary
first; a destructive dialog sets `dismissible={false}`.

## Toast

Paper, hairline, 14px, a 3px tone edge on the left. Confirms an outcome in the
same words as the action. Neutral and success time out after five seconds;
warning and danger stay until dismissed. `role="status"` / `role="alert"`.
Defaults to bottom-centre because React Flow owns both bottom corners.

## Table

```css
.hub-table th { font: var(--hub-text-caption); font-weight: 500; color: var(--hub-color-ink-subtle);
                padding: 8px; border-bottom: 1px solid var(--hub-color-line); }
.hub-table td { padding: 14px 8px; border-bottom: 1px solid var(--hub-color-line); }
.hub-table .is-num { text-align: right; font-weight: 600; font-variant-numeric: tabular-nums; }
```

No zebra striping. Numeric columns right-aligned and tabular. A "who" column
gets an initials disc (`.hub-avatar`). Wide tables scroll inside their own
container.

## Bar chart

A light column for the range, an ink dash at the value; the one mark that
carries the point takes the action colour and its column is lifted a step.
Labels are HTML in a grid, never SVG text. A zero is a dash on the floor;
missing data draws no dash.

## Empty state

A sunken well, one line saying what will live here, one action.

```html
<div class="hub-plate hub-plate--flat">
  <p class="hub-subtitle">No graphs yet</p>
  <p>A graph connects a data source to whatever reads it. Start with a source.</p>
  <button class="hub-btn hub-btn--primary">Add a source</button>
</div>
```

## Error state

Errors explain what went wrong and how to fix it. Never an apology, never
vague. A plate with `data-tone="danger"` gets a 3px danger edge on the left.
